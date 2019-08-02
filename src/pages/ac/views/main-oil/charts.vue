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
			xdata: [5, 2, 3, 5, 1, 6, 7, 3, 2, 1, 7, 2, 1, 3, 5, 7, 4, 2, 1, 3],
			ydata: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			units: '%'
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
					setTimeout(() => {
						this.handleDay('一天')
					}, 500)
				} else {
					this.xData = []
					this.yData = []
					this.subTitle = ''
					this.nodeId = ''
					this.unit = ''
					this.button4 = '一天'
					this.endTime = ''
					this.startTime = ''
					this.units = ''
				}
			}
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		handleCloseHistoryModal() {},
		handleDay(type) {
			let time = type == '一天' ? 86400 : type == '三天' ? 259200 : type == '七天' ? 604800 : 86400
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
			console.log(params)
			this.$_api.humiture.getNodeChart(params).then(res => {
				if (res.code == 200 && res.data) {
					this.xData = []
					this.yData = []
					res.data.forEach(item => {
						this.yData.push(item.f_Value)
						this.xData.push(this.strToymd(item.i_DataTime))
					})
					// this.chartData = tempList
					// this.timeData = timeList
					this.setEcharts(this.xdata, this.ydata, this.units, this.subTitle)
				}
			})
		},
		setEcharts(data, time, unit, name) {
			console.log('setEcharts')
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
						data: time,
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
							}
							// formatter: `{value} ${unit}`
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
				]
			}

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
			myChart.resize()
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