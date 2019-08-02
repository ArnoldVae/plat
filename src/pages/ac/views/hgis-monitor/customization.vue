<template>
  <div class="hgis-monitor-customization">
    <div class="pressure_main_item" v-for="(pressureItem,index) in pressureList" :key="index">
      <div class="item-title">{{pressureItem.tilte}}</div>
      <div class="item_con" v-for="(itemChildren,idx) in pressureItem " :key="idx">
        <div class="item_detail" v-for="(items,idxs) in itemChildren" :key="idxs">
          <div :class="['item_img',items.className]" @click="showHistory(items)"></div>
          <div class="item_concent">
            <div>
              <span>{{items.fvalue}}</span>
              <span>{{items.vcUnit}}</span>
            </div>
            <span>{{items.nodeName}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <ac-history-modal v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></ac-history-modal> -->
    <charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
  </div>
</template>
<script>
import qs from 'qs'
import moment from 'moment'
import charts from '../main-oil/charts'
export default {
	name: 'hgis-monitor-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topic: 'qif/service/realdata/rcu/',
			historyModal: false,
			chartTitle: '',
			nodeId: '',
			unit: '',
			pressureParamter: null, //参数
			xData: [],
			yData: [],
			pChart: null,
			chartTimeOptions: [
				{ title: '一天', key: 'oneDay' },
				{ title: '三天', key: 'Trid' },
				{ title: '一周', key: 'aWeek' }
			],
			currentTime: 'oneDay',
			currentHistoryParams: null,
			pressureList: [],
			nodeTitle: null
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
		// this.pChart = echarts.init(this.$refs.pressureChart)
		this.getPressureList()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getPressureList() {
			// this.$api.AssistCenter.findSystemNode({
			// 	stationId: this.getStationId,
			// 	subSystemId: 8,
			// 	equName: '',
			// 	typeId: 2002,
			// 	rows: 1000,
			// 	page: 1
			// }).then(res => {
			this.$_api.getStaticData('./simulation-data/hgis-monitor.json').then(res => {
				console.log(res)
				// if (res.ret == 0) {
				let newList2 = [[[]], [[]], [[]], [[]], [[]], [[]], [[]], [[]], [[]]]
				res.data.rows.map(item => {
					// console.log(item);
					if (item.nodeName.indexOf('SF6压力') > -1) {
						item.className = 'yali'
					} else if (item.nodeName.indexOf('SF6密度') > -1) {
						item.className = 'midu'
					} else if (item.nodeName.indexOf('SF6微水') > -1) {
						item.className = 'weishui'
					} else if (item.nodeName.indexOf('SF6温度') > -1) {
						item.className = 'wendu'
					} else if (item.nodeName.indexOf('SF6露点') > -1) {
						item.className = 'ludian'
					}
					this.pressureList = []
					switch (item.equId) {
						case 'a79248396cb94e88844ebba70e2a1de2':
							newList2[0][0].push(item)
							newList2[0].tilte = item.equName
							break
						case '71a734b0ea9046bd85b2859acc49e03f':
							newList2[1][0].push(item)
							newList2[1].tilte = item.equName
							break
						case '1107af77580b42d3bab59db8255f9fd9':
							newList2[2][0].push(item)
							newList2[2].tilte = item.equName
							break
						case 'b4239a410a5f442dab6412535e7247e6':
							newList2[3][0].push(item)
							newList2[3].tilte = item.equName
							break
						case '40bb15c2e9c543faa13218138421f22a':
							newList2[4][0].push(item)
							newList2[4].tilte = item.equName
							break
						case 'e9ef40885d7d4fc08d4c850441140d36':
							newList2[5][0].push(item)
							newList2[5].tilte = item.equName
							break
						case '13759cdcb11d43daa8079afdb36d8262':
							newList2[6][0].push(item)
							newList2[6].tilte = item.equName
							break
						case 'bae19dece1804a2bbb3c8991172fd0d5':
							newList2[7][0].push(item)
							newList2[7].tilte = item.equName
							break
						case 'a4413886aee143dab39d40e9921114ae':
							newList2[8][0].push(item)
							newList2[8].tilte = item.equName
							break
					}
					//    this.pressureList =  newList2;
				})
				this.pressureList = newList2
				// this.pressureList.forEach(item => {
				//   item.forEach((its, index) => {
				//     console.log(its);
				//   });
				// });
				// }
			})
		},
		showHistory(node) {
			this.nodeId = node.nodeId
			this.unit = node.vcUnit
			this.chartTitle = node.equName + ' - ' + node.nodeName
			this.historyModal = true

			// let params = {
			// 	startTime: moment()
			// 		.subtract(24, 'hours')
			// 		.unix(),
			// 	endTime: moment().unix(),
			// 	eNodeId: node.nodeId
			// }

			// this.currentHistoryParams = params
			// this.pressureChart(params)
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
.hgis-monitor-customization {
  width: calc(100% - 20px);
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 2px;
  overflow-y: auto;
  justify-content: flex-start;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 50px 25px 50px;

  .pressure_main_item {
    width: 32.5%;
    height: 31%;
    margin-left: 10px;
    margin-bottom: 10px;
    background: rgba(19, 40, 58, 0.5);
    border: 1px solid #26636c;

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

    .item_con {
      // width: px2rem(500);
      height: 180px;
      // border: 1px solid red;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding-left: 10px;

      .item_detail {
        width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;

        .item_img {
          width: 50px;
          height: 50px;
          background-size: 100% 100% !important;
          cursor: pointer;
        }

        .ludian {
          // background: url("../../assets/img/hgis-monitor/SF6loudian.png")
          // no-repeat;
          background: url('../../assets/img/hgis-monitor/SF6loudian.png') no-repeat;
        }

        .midu {
          background: url('../../assets/img/hgis-monitor/SF6midu.png') no-repeat;
        }

        .weishui {
          background: url('../../assets/img/hgis-monitor/SF6weishui.png') no-repeat;
        }

        .weishui1 {
          background: url('../../assets/img/hgis-monitor/SF6weishui1.png') no-repeat;
        }

        .wendu {
          background: url('../../assets/img/hgis-monitor/SF6wendu.png') no-repeat;
        }

        .yali {
          background: url('../../assets/img/hgis-monitor/SF6yali.png') no-repeat;
        }

        .item_concent {
          display: flex;
          flex-direction: column;
          margin-left: 5px;

          :nth-child(1) {
            // font-family: led;
            color: #48f702;
            background: #000;
            border-radius: 5px;
            width: 100px;
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
</style>