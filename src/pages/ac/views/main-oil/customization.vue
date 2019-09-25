<template>
	<div class="main-oil-customization">
		<div class="oil-main-item" v-for="(mainitem, index) in dataList" :key="index">
			<div class="item-title">{{ index + 1 }}号主变</div>
			<div v-for="(childitem, childindex) in mainitem" class="child-item-wrap" :key="childindex">
				<div
					class="child-item-title"
				>{{ childindex == 0 ? 'A相' : childindex == 1 ? 'B相' : childindex == 2 ? 'C相' : '' }}</div>
				<div class="child-item-detail">
					<div v-for="(detailitem, idx) in childitem.devNodesList" class="detail" :key="idx">
						<div @click="showHistoryHandler(detailitem)" :class="['detail-img', detailitem.className]"></div>
						<div class="detail-content">
							<div class="detail-top">
								<span class="detail-value">{{ detailitem.fvalue }}</span>
								<span>{{ detailitem.vcUnit }}</span>
							</div>
							<span class="detail-bottom">{{ detailitem.vcName }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
	</div>
</template>
<script>
import qs from 'qs'
import moment from 'moment'
import charts from './charts-modal'
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'main-oil-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/'],
			topicStr: '',
			dataList: [],
			historyModal: false,
			chartTitle: '',
			nodeId: '',
			unit: ''
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
				this.topicStr = this.topicArr[0] + this.unitId
			}
		}
	},
	created() {
		this.getDevList()
	},
	mounted() {
		this.topicStr = this.topicArr[0] + this.unitId
		// console.log(this.topicStr)
		//实时数据回调
		const _this = this
		// this.$_mqtt.on('message', function(topic, message, packet) {
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				//将json字符串转为数组
				let msgData = JSON.parse(message.toString())
				if (msgData.cmd == 1001) {
					console.log(msgData)
					for (let i = 0; i < this.dataList.length; i++) {
						this.dataList[i].forEach(item => {
							item.devNodesList.forEach(element => {
								if (element.nodeId == msgData.nodeid) {
									element.fvalue = msgData.value
								}
							})
						})
					}
				}
			}
		})
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getDevList(DevID) {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.mainOil.getDevList(params).then(res => {
				let dataList = [[], [], []]
				res.data.lists.forEach(item => {
					if (item.vcName.indexOf('1号主变') != -1 || item.vcName.indexOf('一号主变') != -1) {
						item.devNodesList.forEach(element => {
							element.className = this.setClass(element)
						})
						dataList[0].push(item)
					} else if (item.vcName.indexOf('2号主变') != -1 || item.vcName.indexOf('二号主变') != -1) {
						item.devNodesList.forEach(element => {
							element.className = this.setClass(element)
						})
						dataList[1].push(item)
					} else if (item.vcName.indexOf('3号主变') != -1 || item.vcName.indexOf('三号主变') != -1) {
						item.devNodesList.forEach(element => {
							element.className = this.setClass(element)
						})
						dataList[2].push(item)
					}
				})
				this.dataList = dataList
			})
		},
		setClass(data) {
			if (data.vcName.indexOf('一氧化碳') > -1) {
				return 'co'
			} else if (data.vcName.indexOf('乙炔值') > -1) {
				return 'c2h2'
			} else if (data.vcName.indexOf('乙烯') > -1) {
				return 'c2h4'
			} else if (data.vcName.indexOf('乙烷') > -1) {
				return 'c2o6'
			} else if (data.vcName.indexOf('二氧化碳') > -1) {
				return 'co2'
			} else if (data.vcName.indexOf('总烃值') > -1) {
				return 'cxhy'
			} else if (data.vcName.indexOf('氢气') > -1) {
				return 'h2'
			} else if (data.vcName.indexOf('甲烷') > -1) {
				return 'ch4'
			}
		},
		showHistoryHandler(node) {
			console.log(node)
			this.nodeId = node.nodeId
			this.unit = node.vcUnit
			this.chartTitle = node.vcName
			this.historyModal = true
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
<style lang="stylus" scoped>
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
    width: 32.5%;
    height: 100%;

    // border: 1px solid #0173bb;
    .item-title {
      width: 100%;
      height: 30px;
      color: #fff;
      font-size: 18px;
      line-height: 30px;
      text-align: center;
      background-color: #0e88e3;
      border: 1px solid #0e88e3;
    }

    .child-item-wrap {
      width: 100%;
      height: 31%;
      margin-bottom: 9px;
      display: flex;
      background-color: rgba(50, 153, 255, 0.1);

      .child-item-title {
        width: 54px;
        line-height: 220px;
        // background: #13283a;
        text-align: center;
        color: #fff;
        font-size: 18px;
        border-left: 1px solid #0e88e3;
        border-top: 1px solid #0e88e3;
        border-bottom: 1px solid #0e88e3;
      }

      .child-item-detail {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        // background-color: rgba(36, 64, 88, 0.48);
        color: #fff;
        border: 1px solid #0e88e3;
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

            .detail-top {
              width: 90px;
              height: 30px;
              margin-top: 5px;
              line-height: 30px;
              text-align: center;

              span {
                width: 30px;
                height: 100%;
                display: block;
                float: left;
                font-size: 12px;
              }

              .detail-value {
                width: calc(100% - 30px);
                height: 100%;
                background: #3d3d3d;
                border: 1px solid #3299ff;
                color: #01fa5d;
                border-radius: 3px;
                font-size: 14px;
              }
            }

            .detail-bottom {
              font-size: 14px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
