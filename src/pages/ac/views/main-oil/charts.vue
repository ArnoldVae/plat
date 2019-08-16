<template>
	<div class="ac-history-modal">
		<ocx-modal
			:styles="{ top: '0px' }"
			title="历史记录"
			:mask="false"
			@on-cancel="handleCloseHistoryModal"
			class="historyModal-wrap"
			:value="value"
			scrollable
			v-bind="$attrs"
			v-on="$listeners"
		>
			<div class="modal-content">
				<div class="btn-box">
					<RadioGroup v-model="button4" type="button" size="large">
						<Radio label="一天"></Radio>
						<Radio label="三天"></Radio>
						<Radio label="一周"></Radio>
					</RadioGroup>
				</div>
				<div id="charts"></div>
			</div>

			<div slot="footer"></div>
		</ocx-modal>
	</div>
</template>
<script>
import { setTimeout } from 'timers'
export default {
	name: '',
	components: {},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		subTitle: {
			type: String,
			default: ''
		},
		nodeId: {
			type: String,
			default: ''
		},
		unit: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			button4: '一天',
			endTime: '',
			startTime: '',
			xdata: [],
			ydata: []
		}
	},
	computed: {},
	filters: {},
	watch: {
		button4(val) {
			this.handleDay(val)
		},
		value: {
			handler(newVal) {
				if (newVal) {
					// setTimeout(() => {
					this.handleDay('一天')
					// }, 500)
				} else {
					this.button4 = '一天'
					this.endTime = ''
					this.startTime = ''
				}
			}
		}
	},
	created() {},
	mounted() {
		this.getTimeArr(24)
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		handleCloseHistoryModal() {},
		handleDay(type) {
			let time = type == '一天' ? 86400 : type == '三天' ? 259200 : type == '一周' ? 604800 : 86400
			let day = type == '一天' ? 24 : type == '三天' ? 72 : type == '一周' ? 168 : 24
			this.xData = this.getTimeArr(day)
			let nowDate = new Date().getTime()
			let endTime = Math.ceil(nowDate / 1000)
			let startTime = endTime - time
			let params = {
				nodeId: this.nodeId,
				startTime: startTime,
				endTime: endTime
			}
			this.getChartsData(params)
		},
		getChartsData(params) {
			// console.log(params)
			this.$_api.humiture.getNodeChart(params).then(res => {
				if (res.code == 200 && res.data) {
					// this.xData = []
					// this.yData = []
					// res.data.forEach(item => {
					// 	this.yData.push(item.f_Value)
					// 	this.xData.push(this.strToymd(item.i_DataTime))
					// })
					// this.chartData = tempList
					// this.timeData = timeList
					this.setEcharts(this.xdata, this.ydata, this.unit, this.subTitle)
				}
			})
		},
		setEcharts(data, time, unit, name) {
			let yData = []
			let xData = []
			for (let i = 0; i < this.xData.length; i++) {
				yData.push(this.randomNum(20, 40))
			}
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$_echarts.init(document.getElementById('charts'))

			// 指定图表的配置项和数据
			var option = {
				title: {
					text: name,
					textStyle: {
						color: '#fff',
						fontWeight: 400,
						fontSize: 22
					},
					left: 100,
					top: 0
				},
				tooltip: {
					trigger: 'axis',
					formatter: `&nbsp;{b0}<br/> &nbsp;{a0}: {c0}&nbsp;${unit}`,
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						},
						triggerTooltip: {}
					}
				},
				grid: {
					//设置表格大小位置的
					// top: '5%',
					// left: '10%',
					// right: '8%',
					bottom: '18%',
					containLabel: true
				},

				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: this.xData,
						axisLine: {
							show: true,
							lineStyle: {
								color: '#0091e8'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff'
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								color: '#0091e8'
							}
						},
						splitLine: {
							lineStyle: {
								color: '#2d3650'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff'
							},
							formatter: `{value} ${unit}`
						}
					}
				],
				series: [
					{
						name: name,
						type: 'line',
						symbol: 'none',
						areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
						lineStyle: { normal: { color: '#04a3ff' } }, //折线颜色
						data: yData,
						connectNulls: true //这个是重点，将断点连接
					}
				],
				dataZoom: [
					{
						type: 'inside',
						minValueSpan: 7,
						minSpan: 20,
						start: 0,
						end: 100
					},
					{
						showDetail: true,
						height: 15,
						bottom: 50,
						borderColor: 'rgba(1,37,59,0.5)',
						backgroundColor: 'rgba(1,37,59,0.5)',
						dataBackgroundColor: 'rgba(47,126,181,0.9)',
						fillerColor: 'rgba(1,138,225,0.5)',
						handleColor: 'rgba(1,37,59,0.8)'
					}
				]
			}

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
			myChart.resize()
		},
		randomNum(minNum, maxNum) {
			switch (arguments.length) {
				case 1:
					return parseInt(Math.random() * minNum + 1, 10)
					break
				case 2:
					return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
					break
				default:
					return 0
					break
			}
		},
		getTimeArr(day) {
			let nowDate = new Date().getTime() / 1000
			let time = []
			for (let i = 0; i < day; i++) {
				time.push(this.strToymd(nowDate))
				nowDate = nowDate - 3600
			}
			return time.reverse()
		},
		strToymd(time) {
			// 遍历时间 处理格式
			let date = new Date(time * 1000)
			let Y = date.getFullYear() + '-'
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
			let D = date.getDate() + ' '
			let h = date.getHours() + ':'
			let m = date.getMinutes() + ':'
			let s = date.getSeconds()
			let b = M + D + h + m + s
			return b
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		next()
	}
}
</script>
<style lang="stylus" scoped>
.ac-history-modal {
}

.historyModal-wrap {
  /deep/ .ivu-modal-wrap {
    .ivu-modal {
      width: 53.333rem !important;

      .ivu-modal-content {
        .ivu-modal-header {
          text-align: center;

          .ivu-modal-header-inner {
            color: #0af;
            font-size: 20px;
          }

          .ivu-modal-close {
            i {
              font-size: 40px;
              color: #fff;
            }
          }
        }

        .ivu-modal-body {
          color: #b0e1f9;

          .modal-content {
            width: 100%;
            height: 500px;

            .btn-box {
              width: 200px;
              height: 50px;
              margin-left: 80%;
            }

            #charts {
              width: 100%;
              height: 100%;
            }
          }
        }

        .ivu-modal-footer {
          display: none;
        }
      }
    }
  }
}

/deep/.ivu-radio-wrapper, .ivu-radio-group-item, .ivu-radio-default {
  background-color: #0a1736;
  border: 1px solid #0c79b9;
  color: #fff;
}

/deep/.ivu-radio-wrapper-checked {
  background-color: #0173bb;
  border: 1px solid #0173bb;
  color: #000;
}
</style>
