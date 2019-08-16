<template>
	<div class="cabinet-customization">
		<div class="cabinet-item" v-for="(cabinet, index) in list" :key="index">
			<div class="item-title">{{ cabinet.equName }}</div>
			<div class="cabinet-content-wrap">
				<div class="cabinet-item-kj" v-if="getIsShow(cabinet, 'apollo')">
					<div class="cabinet-item-kj-nodes">
						<div class="cabinet-item-kj-node" v-for="(kjitem, kjIndex) in cabinet.apollo" :key="kjIndex">
							<div @click="showHistoryHandler(kjitem)" class="cabinet-item-kj-node-icon"></div>
							<div class="cabinet-item-kj-content">
								<div>
									<span>{{ kjitem.fvalue }}</span>
									<span>{{ kjitem.vcUnit }}</span>
								</div>
								<div class="cabinet-item-kj-nodename">{{ kjitem.nodeName }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cabinet-item-xl" v-if="getIsShow(cabinet, 'kk')">
					<div class="cabinet-item-xl-eqps">
						<div class="cabinet-item-xl-eqp" v-for="(eqp, index) in cabinet.kk" :key="index">
							<div class="cabinet-item-xl-eqpname">{{ eqp[0].nodeName }}</div>
							<div class="cabinet-item-xl-node-wrap">
								<div v-for="(node, nindex) in eqp" class="cabinet-item-xl-node" :key="nindex">
									<div class="cabinet-item-xl-nodevalue" @click="showHistoryHandler(node)">
										<span>{{ node.fvalue }}</span>
										<span>{{ node.vcUnit }}</span>
									</div>
									<div class="cabinet-item-xl-nodename">
										<span>{{ node.nodeName }}</span>
									</div>
								</div>
							</div>
						</div>
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
import charts from '../main-oil/charts1'
export default {
	name: 'cabinet-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			chartTimeOptions: [
				{ title: '一天', key: 'oneDay' },
				{ title: '三天', key: 'Trid' },
				{ title: '一周', key: 'aWeek' }
			],
			chart: null,
			historyModal: false,
			chartTitle: '',
			nodeId: '',
			unit: '',
			currentTime: 'oneDay',
			currentHistoryParams: null,
			topic: 'qif/service/realdata/rcu/',
			list: []
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
	created() {
		this.getList()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getList() {
			// this.$api.dsqIntelligent
			// 	.getCabinetData({
			// 		stationId: this.getStationId,
			// 		systemId: 8,
			// 		smType: 2001
			// 	})
			// 	.then(res => {
			this.$_api.getStaticData('./simulation-data/cabinet.json').then(res => {
				// if (res.ret === '0') {
				// console.log(res)
				this.list = res.data.data
				let testData = JSON.parse(JSON.stringify(res.data.data))
				console.log(testData)

				// }
			})
		},
		getIsShow(item, attr) {
			return item[attr].length > 0 ? true : false
		},
		showHistoryHandler(node) {
			this.nodeId = node.nodeId
			this.unit = node.vcUnit
			this.chartTitle = node.equName + ' - ' + node.nodeName
			this.historyModal = true
			// this.historyModal = true
			// this.unit = node.vcUnit
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
.cabinet-customization {
  // width: calc(100% - 20px);
  // height: 100%;
  // padding-bottom: 5px;
  color: #fff;
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 55px 25px 67px;
  overflow: auto;

  .cabinet-item {
    box-sizing: border-box;
    float: left;
    width: calc(50% - 20px);
    height: 50%;
    margin-left: 10px;
    margin-bottom: 15px;
    background: rgba(19, 40, 58, 0.5);
    border: 1px solid #26636c;
    // border-top: none;
    position: relative;

    .item-title {
      width: 100%;
      height: 30px;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      text-align: center;
      background-color: rgba(36, 64, 88, 1);
      border-bottom: 1px solid #26636c;
    }

    .container {
      // border:px2rem(2) solid #fff;
      padding-bottom: 10px;
    }

    .cabinet-content-wrap {
      height: 300px;
      overflow: auto;
    }

    .cabinet-item-kj {
      display: flex;
      margin-bottom: 10px;
      padding: 0 10px;

      .cabinet-item-kj-title {
        width: 40px;
        height: 300px;
        box-sizing: border-box;
        font-size: 22px;
        text-align: center;
        border-right: none;
        background: #13283a;
        border: 2px solid #26636c;
        border-right: 0;
        padding-top: 100px;
      }

      .cabinet-item-kj-nodes {
        width: 100%;
        // height:300px;
        // overflow:auto;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;

        // border:2px solid #26636c;
        .cabinet-item-kj-node {
          display: flex;
          width: calc(50% - 20px);
          height: 100px;
          align-items: center;
          margin-left: 20px;

          // justify-content: space-between;
          .cabinet-item-kj-node-icon {
            width: 55px;
            height: 55px;
            background-image: url('~@ac/assets/img/cabinet/pinggui.png');
            background-size: 100% 100%;

            &:hover {
              cursor: pointer;
            }
          }

          .cabinet-item-kj-content {
            display: flex;
            flex-direction: column;
            margin-left: 10px;

            > div:nth-of-type(1) {
              font-size: 20px;

              > span:nth-of-type(1) {
                font-family: 'DS-DIGI';
                color: #48f702;
                border-radius: 5px;
                font-size: 26px;
                background: #0f0d0e;
                padding: 4px 20px;
                margin-right: 10px;
              }
            }

            .cabinet-item-kj-nodename {
              font-size: 18px;
            }
          }
        }
      }
    }

    .cabinet-item-xl {
      display: flex;
      margin-top: 10px;
      padding: 0 10px;

      .cabinet-item-xl-title {
        width: 40px;
        height: 300px;
        padding-top: 100px;
        box-sizing: border-box;
        font-size: 22px;
        text-align: center;
        border-right: none;
        background: #13283a;
        border: 2px solid #26636c;
        border-right: 0;
      }

      .cabinet-item-xl-eqps {
        width: 100%;
        // height:300px;
        padding-bottom: 10px;
        // display:flex;
        // flex-direction:column;
        // justify-content:space-around;
        // align-items:center;
        // border:2px solid #26636c;
        // overflow:auto;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        // flex-direction:column;
        justify-content: center;

        .cabinet-item-xl-eqp {
          display: flex;
          width: 100%;
          height: 100px;
          margin-top: 10px;
          justify-content: center;

          .cabinet-item-xl-eqpname {
            width: 220px;
            height: 100px;
            // line-height:px2rem(60);
            text-align: center;
            background: #13283a;
            border: 2px solid #26636c;
            font-size: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .cabinet-item-xl-node-wrap {
            display: flex;
            height: 100px;
            // justify-content:space-around;
            width: 570px;
            border: 2px solid #26636c;
            border-left: none;

            .cabinet-item-xl-node {
              width: 350px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              font-size: 20px;
              margin-left: 5px;

              .cabinet-item-xl-nodevalue {
                span:nth-of-type(1) {
                  font-family: 'DS-DIGI';
                  border-radius: 5px;
                  font-size: 26px;
                  background: #0f0d0e;
                  padding: 4px 20px;
                  margin-right: 10px;
                  color: #48f702;

                  &:hover {
                    cursor: pointer;
                  }
                }
              }

              .cabinet-item-xl-nodename {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
