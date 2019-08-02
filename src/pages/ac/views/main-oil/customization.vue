<template>
  <div class="main-oil-customization">
    <div class="oil-main-item" v-for="(mainitem,index) in dataList" :key="index">
      <div class="item-title">{{index+1}}号主变</div>
      <div v-for="(childitem,childindex) in mainitem" class="child-item-wrap" :key="childindex">
        <div
          class="child-item-title"
        >{{childindex == 0 ? 'A相' : childindex == 1 ? 'B相' : childindex == 2 ? 'C相' : ''}}</div>
        <div class="child-item-detail">
          <!-- <div class="icon"></div> -->
          <div v-for="(detailitem,idx) in childitem" class="detail" :key="idx">
            <div
              @click="showHistoryHandler(detailitem)"
              :class="['detail-img',detailitem.className]"
            ></div>
            <div class="detail-content">
              <!-- <span>`${{detailitem.fvalue}}{{detailitem.vcUnit}}`</span> -->
              <div>
                <span>{{detailitem.fvalue}}</span>
                <span>{{detailitem.vcUnit}}</span>
              </div>
              <span>{{detailitem.nodeName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="historyModal" v-show="historyModal">
      <div class="modal-title">
        {{chartTitle}}
        <span class="closeModal" @click="closeHistoryModal">×</span>
      </div>
      <div class="history-select-time">
      </div>
      <div class="modal-ctnBox">
        <div class="modal-ctn">
          <div id="historyChart" ref="historyChart"></div>
        </div>
      </div>
    </div>-->
    <charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
    <!-- <ac-history-modal v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></ac-history-modal> -->
  </div>
</template>
<script>
import qs from 'qs'
import moment from 'moment'
import charts from './charts'
export default {
	name: 'main-oil-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			dataList: [],
			topic: 'qif/service/realdata/rcu/',
			historyModal: false,
			chartTitle: '',
			nodeId: '',
			unit: '',
			xData: [],
			yData: [],
			chart: null,
			chartTimeOptions: [
				{ title: '一天', key: 'oneDay' },
				{ title: '三天', key: 'Trid' },
				{ title: '一周', key: 'aWeek' }
			],
			currentTime: 'oneDay',
			currentHistoryParams: null
		}
	},
	computed: {
		getunitId: function() {
			return this.$store.getters.unitId
		},
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		}
	},
	filters: {},
	watch: {
		getunitId: {
			handler(newValue) {
				this.unitId = newValue
				// this.topicStr = this.topicArr[0] + this.unitId
			}
		}
	},
	created() {},
	mounted() {
		// this.chart = this.$_echarts.init(this.$refs['historyChart'])
		this.getOilList()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getOilList() {
			// this.$api.AssistCenter.findSystemNode({
			// 	stationId: this.getStationId,
			// 	subSystemId: 8,
			// 	equName: '',
			// 	typeId: 35,
			// 	rows: 1000,
			// 	page: 1
			// }).then(res => {
			this.$_api.getStaticData('./simulation-data/main-oil.json').then(res => {
				let dataList = [[[], [], []], [[], [], []], [[], [], []]]
				res.data.rows.map(item => {
					item.nodeName = item.nodeName.substring(6, item.nodeName.length)

					if (item.nodeName.indexOf('一氧化碳') > -1) {
						item.className = 'co'
					} else if (item.nodeName.indexOf('乙炔值') > -1) {
						item.className = 'c2h2'
					} else if (item.nodeName.indexOf('乙烯') > -1) {
						item.className = 'c2h4'
					} else if (item.nodeName.indexOf('乙烷') > -1) {
						item.className = 'c2o6'
					} else if (item.nodeName.indexOf('二氧化碳') > -1) {
						item.className = 'co2'
					} else if (item.nodeName.indexOf('总烃值') > -1) {
						item.className = 'cxhy'
					} else if (item.nodeName.indexOf('氢气') > -1) {
						item.className = 'h2'
					} else if (item.nodeName.indexOf('甲烷') > -1) {
						item.className = 'ch4'
					}

					switch (item.iParam2) {
						case '1001':
							dataList[0][0].push(item)
							break
						case '1002':
							dataList[0][1].push(item)
							break
						case '1003':
							dataList[0][2].push(item)
							break
						case '2001':
							dataList[1][0].push(item)
							break
						case '2002':
							dataList[1][1].push(item)
							break
						case '2003':
							dataList[1][2].push(item)
							break
						case '3001':
							dataList[2][0].push(item)
							break
						case '3002':
							dataList[2][1].push(item)
							break
						case '3003':
							dataList[2][2].push(item)
							break
					}
				})
				this.dataList = dataList
			})
		},
		getTitle(index) {
			return index + 1 + '号主变'
		},
		showHistoryHandler(node) {
			// console.log(node)
			this.nodeId = node.nodeId
			this.unit = node.vcUnit
			this.chartTitle = node.equName + ' - ' + node.nodeName
			this.historyModal = true

			// this.historyModal = true
			// this.chartTitle = node.nodeName + '历史数据'

			// let params = {
			// 	startTime: moment()
			// 		.subtract(24, 'hours')
			// 		.unix(),
			// 	endTime: moment().unix(),
			// 	eNodeId: node.nodeId
			// }

			// this.currentHistoryParams = params
			// this.drawChart(params)
		},
		drawChart(params) {
			/* 请求数据接口 */
			this.$api.dsqIntelligent
				.getHistory(qs.stringify(params))
				.then(res => {
					if (res.ret == '0') {
						let xData = [],
							yData = []
						res.data.forEach(item => {
							xData.push(moment(item.dataTime * 1000).format('MM-DD HH:mm'))
							yData.push(item.fValue)
						})

						const htmlFontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
						const option = {
							title: {
								text: `单位：µL/L`,
								textStyle: {
									color: '#fff',
									// fontFamily: "DS-DIGI",
									fontSize: 0.2 * htmlFontSize
								},
								align: 'center'
							},
							xAxis: {
								type: 'category',
								boundaryGap: false,
								data: xData,
								axisLine: {
									lineStyle: {
										color: '#fff',
										width: 2
									}
								},
								axisLabel: {
									color: '#fff',
									show: true,
									textStyle: {
										fontSize: htmlFontSize * 0.2
									}
								}
							},
							yAxis: {
								// name: node.nodeName + "(µL/L)",
								type: 'value',
								axisLine: {
									lineStyle: {
										color: '#fff',
										width: 2
									}
								},
								splitLine: {
									show: false
								},
								nameTextStyle: {
									fontSize: 0.22 * htmlFontSize
								},
								axisLabel: {
									textStyle: {
										color: '#fff',
										fontSize: 0.22 * htmlFontSize
									}
								}
							},
							tooltip: {
								trigger: 'axis',
								// formatter(params) {
								//     let  x = params[0].value == 0 ? '正常' : '触发';
								//     let y = params[0].name;
								//     return '时间：' + y + '<br />' + '水浸状态：' + x ;
								// },
								// axisPointer: {
								//     label: {
								//         backgroundColor: "#08304a"
								//     }
								// },
								textStyle: {
									fontSize: htmlFontSize * 0.2
								}
							},
							series: [
								{
									name: this.chartTitle,
									data: yData,
									type: 'line',
									smooth: true,
									symbol: 'none',
									connectNulls: true,
									lineStyle: {
										color: 'yellow',
										width: 3
									}
								}
							],
							grid: {
								top: '10%',
								left: '5%',
								right: '8%',
								bottom: '5%',
								containLabel: true
							},
							dataZoom: [
								{
									type: 'inside',
									minValueSpan: 7,
									minSpan: 20,
									start: 90,
									end: 100
								},
								{
									showDetail: false,
									height: 0.15 * htmlFontSize,
									bottom: 0
									// borderColor: "rgba(1,37,59,0.5)",
									// backgroundColor: "rgba(1,37,59,0.5)",
									// dataBackgroundColor: "rgba(47,126,181,0.9)",
									// fillerColor: "rgba(1,138,225,0.5)",
									// handleColor: "rgba(1,37,59,0.8)"
									// borderColor: "transparent",
									// backgroundColor: "transparent",
									// dataBackgroundColor: "transparent",
									// fillerColor: "transparent",
									// handleColor: "transparent"
								}
							]
						}
						this.chart.setOption(option)
						this.chart.resize()

						window.onresize = () => {
							this.chart.resize()
						}
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		closeHistoryModal() {
			this.historyModal = false
			// this.chart_title = "";
			// if(this.myChart != null){
			//     this.myChart.clear();
			// }
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
<style lang='stylus' scoped>
.main-oil-customization {
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 50px 25px 50px;

  .oil-main-item {
    width: 33%;
    height: 100%;
    border: 1px solid #0173bb;

    .item-title {
      width: 100%;
      height: 30px;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      text-align: center;
      background-color: rgba(36, 64, 88, 1);
      border: 1px solid #26636c;
    }

    .child-item-wrap {
      width: 100%;
      height: 31%;
      margin-bottom: 9px;
      display: flex;

      .child-item-title {
        width: 54px;
        line-height: 220px;
        background: #13283a;
        text-align: center;
        color: #fff;
        font-size: 24px;
        border-left: 1px solid #26636c;
        border-top: 1px solid #26636c;
        border-bottom: 1px solid #26636c;
      }

      .child-item-detail {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        background-color: rgba(36, 64, 88, 0.48);
        color: #fff;
        border: 1px solid #26636c;
        position: relative;
        padding-left: 5px;

        .icon {
          width: 25px;
          height: 25px;
          position: absolute;
          background-image: url('../../assets/img/main-oil/history.png');
          background-size: 100% 100%;
          right: 10px;
          top: 10px;

          &:hover {
            cursor: pointer;
          }
        }

        .detail {
          width: 33%;
          display: flex;
          // flex-direction: column;
          // justify-content: center;
          align-items: center;

          // > div {
          // // margin-left:px2rem(6);
          // }
          .detail-img {
            width: 50px;
            height: 50px;
            background-size: 100% 100%;

            &:hover {
              cursor: pointer;
            }
          }

          .c2h2 {
            background-image: url('../../assets/img/main-oil/c2h2.png');
          }

          .c2h4 {
            background-image: url('../../assets/img/main-oil/c2h4.png');
          }

          .c2o6 {
            background-image: url('../../assets/img/main-oil/c2o6.png');
          }

          .ch4 {
            background-image: url('../../assets/img/main-oil/ch4.png');
          }

          .co {
            background-image: url('../../assets/img/main-oil/co.png');
          }

          .co2 {
            background-image: url('../../assets/img/main-oil/co2.png');
          }

          .cxhy {
            background-image: url('../../assets/img/main-oil/cxhy.png');
          }

          .h2 {
            background-image: url('../../assets/img/main-oil/h2.png');
          }

          .detail-content {
            display: flex;
            flex-direction: column;
            margin-left: 5px;

            :nth-child(1) {
              color: #48f702;
              background: #000;
              border-radius: 5px;
              width: 90px;
              height: 30px;
              margin-top: 5px;
              line-height: 30px;
              text-align: center;

              :nth-of-type(1) {
                font-family: 'DS-DIGI';
                font-size: 22px;
              }

              :nth-of-type(2) {
                font-family: 'Microsoft YaHei';
                font-size: 14px;
              }
            }

            :nth-child(2) {
              font-size: 16px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>