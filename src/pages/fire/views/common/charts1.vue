<template>
	<div class="ac-history-modal">
		<ocx-modal
			:styles="{ top: '100px' }"
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
						<Radio label="一小时"></Radio>
						<Radio label="一天"></Radio>
						<Radio label="三天"></Radio>
						<Radio label="一周"></Radio>
					</RadioGroup>
				</div>
				<div id="charts" ref="charts"></div>
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
			ydata: [],
			myChart: null
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
		// this.handleDay('一天')
		this.myChart = this.$_echarts.init(this.$refs['charts'])
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		handleCloseHistoryModal() {
			this.myChart.clear()
		},
		handleDay(type) {
			let time =
				type == '一小时'
					? 3600
					: type == '一天'
					? 86400
					: type == '三天'
					? 259200
					: type == '一周'
					? 604800
					: 86400
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
			this.$_api.maintaining.getNodeChart(params).then(res => {
				if (res.code == 200 && res.data) {
					// console.log(res)
					let tempList = []
					let timeList = []
					res.data.forEach(item => {
						tempList.push(item.f_Value)
						timeList.push(this.strToymd(item.i_DataTime))
					})
					this.setEcharts(tempList, timeList, this.unit, this.subTitle)
				}
			})
		},
		setEcharts(data, time, unit, name) {
			// 基于准备好的dom，初始化echarts实例
			// this.myChart = this.$_echarts.init(document.getElementById('charts'))

			// 指定图表的配置项和数据
			var option = {
				title: {
					text: name,
					textStyle: {
						color: '#fff',
						fontWeight: 400,
						fontSize: 40
					},
					left: 30,
					top: -10
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
					},
					textStyle: {
						color: '#85c9ee',
						fontSize: 33
					}
				},
				grid: {
					//设置表格大小位置的
					// top: '5%',
					// left: '10%',
					// right: '8%',
					bottom: '10%',
					containLabel: true
				},

				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: time,
						axisLine: {
							show: true,
							lineStyle: {
								color: '#0091e8',
								width: 2
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize: 35
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
								color: '#0091e8',
								width: 2
							}
						},
						splitLine: {
							lineStyle: {
								color: '#2d3650'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize: 35
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
						data: data,
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
						height: 20,
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
			this.myChart.setOption(option)
			this.myChart.resize()
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
        background: #141a26 !important;
        border: 1PX solid #fff;
        height: 800px !important;

        .ivu-modal-header {
          text-align: center;

          .ivu-modal-header-inner {
            color: #000;
            font-size: 25px;
            font-weight: bold;
            height: 25px;
            line-height: 25px;
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
            height: 700px;

            .btn-box {
              width: 350px;
              height: 55px;
              margin-left: 74%;
            }

            #charts {
              width: 100%;
              height: calc(100% - 50px);
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

/deep/ .ivu-radio-group-button.ivu-radio-group-large .ivu-radio-wrapper {
  font-size: 20px;
}

/deep/.ivu-radio-wrapper-checked {
  background-color: #0173bb;
  border: 1px solid #0173bb;
  color: #000;
}
</style>
