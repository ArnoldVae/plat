<template>
  <div class="ac-history-modal">
    <ocx-modal :styles="{ top: '100px' }"
               title="历史记录"
               :mask="false"
               @on-cancel="handleCloseHistoryModal"
               class="historyModal-wrap"
               :value="value"
               scrollable
               v-bind="$attrs"
               v-on="$listeners">
      <div class="modal-content">
        <div class="content-top">
          <div class="btn-switch">
            <span :class="{switch: item.NodeID == NodeID}"
                  v-for="(item, index) in nodeId"
                  :key="index"
                  @click="clickSwitch(item)">
              {{item.nodeName}}
            </span>
          </div>
          <div class="btn-box">
            <RadioGroup v-model="button4"
                        type="button"
                        size="large">
              <Radio label="一天"></Radio>
              <Radio label="三天"></Radio>
              <Radio label="一周"></Radio>
            </RadioGroup>
          </div>
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
			type: Array,
			default: []
		},
		nodeId: {
			type: Array,
			default: []
		},
		unit: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			button4: '一天',
			endTime: '',
			startTime: '',
			xdata: [],
			ydata: [],
			NodeID: '',
			chartTitle: '',
			chartUnit: ''
		}
	},
	computed: {},
	filters: {},
	watch: {
		nodeId(newVal) {
			console.log(newVal)
			if (newVal.length) {
				this.NodeID = newVal[0].NodeID
				this.chartTitle = `${newVal[0].devName}-${newVal[0].nodeName}`
				this.chartUnit = newVal[0].vc_Unit
			}
		},
		button4(val) {
			this.handleDay()
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
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		clickSwitch(val) {
			this.NodeID = val.NodeID
			this.chartTitle = `${val.devName}-${val.nodeName}`
			this.chartUnit = val.vc_Unit
			this.handleDay()
		},
		handleCloseHistoryModal() {},
		handleDay() {
			let type = this.button4
			console.log(type)

			let time = type == '一天' ? 86400 : type == '三天' ? 259200 : type == '一周' ? 604800 : 86400
			let nowDate = new Date().getTime()
			let endTime = Math.ceil(nowDate / 1000)
			let startTime = endTime - time
			this.startTime = startTime
			this.endTime = endTime
			let params = {
				nodeId: this.NodeID,
				startTime: startTime,
				endTime: endTime
			}
			console.log(params)

			this.getChartsData(params)
		},
		getChartsData(params) {
			console.log(params)
			this.$_api.humiture.getNodeChart(params).then(res => {
				if (res.code == 200 && res.data) {
					// console.log(res)
					let tempList = []
					let timeList = []
					res.data.forEach(item => {
						tempList.push(item.f_Value)
						timeList.push(this.strToymd(item.i_DataTime))
					})
					this.setEcharts(tempList, timeList)
				}
			})
		},
		setEcharts(data, time) {
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$_echarts.init(document.getElementById('charts'))

			// 指定图表的配置项和数据
			var option = {
				title: {
					text: this.chartTitle,
					textStyle: {
						color: '#fff',
						fontWeight: 400,
						fontSize: 18
					},
					left: 30,
					top: 0
				},
				tooltip: {
					trigger: 'axis',
					formatter: `&nbsp;{b0}<br/> &nbsp;{a0}: {c0}&nbsp;${this.chartUnit}`,
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
							},
							formatter: `{value} ${this.chartUnit}`
						}
					}
				],
				series: [
					{
						name: this.chartTitle,
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

            .content-top {
              width: 100%;
              height: 40px;
              display: flex;
              justify-content: space-between;

              .btn-switch {
                >span {
                  padding: 4px;
                  border: 1px solid #0c79b9;
                  border-radius: 3px;
                  color: #fff;
                  cursor: pointer;
                }

                .switch {
                  color: #ffd36a;
                }
              }

              .btn-box {
                width: 200px;
                height: 50px;
              }
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

/deep/.ivu-radio-wrapper-checked {
  background-color: #0173bb;
  border: 1px solid #0173bb;
  color: #000;
}
</style>
