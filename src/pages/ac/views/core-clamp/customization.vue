<template>
	<div class="core-clamp-customization">
		<div class="main-dev" v-for="(item1,index,num) in mainList" :key="index">
			<div class="title">{{num+1}}号主变</div>
			<div class="dev-item" v-for="(item2,idex) in item1" :key="idex">
				<div class="phase">{{idex}}相</div>
				<div class="node node1" v-for="node in item2" :key="node.nodeId">
					<div class="logo">
						<div class="history-btn" @click="getHistory(node)"></div>
						<img v-if="node.vcName.indexOf('夹件电流') != -1" src="~@ac/assets/img/core-clamp/clamp.png" />
						<img v-if="node.vcName.indexOf('铁芯电流') != -1" src="~@ac/assets/img/core-clamp/electric.png" />
						<p v-if="node.vcName.indexOf('夹件电流') != -1">夹件电流</p>
						<p v-if="node.vcName.indexOf('铁芯电流') != -1">铁芯电流</p>
					</div>
					<div class="value">
						<div class="v-lf">值(mA)</div>
						<div class="v-rt">{{node.fvalue}}</div>
					</div>
				</div>
			</div>
		</div>
		<charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import charts from '../main-oil/charts1'
// import localData from './localData.json'
export default {
	name: 'core-clamp-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/'],
			topicStr: '',
			// localData,
			mainList: {
				M1: {
					A: [],
					B: [],
					C: []
				},
				M2: {
					A: [],
					B: [],
					C: []
				},
				M3: {
					A: [],
					B: [],
					C: []
				}
			},
			devList: [],
			historyModal: false,
			chartTitle: '',
			unit: '',
			nodeId: ''
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
		this.setMqtt()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 铁芯夹件数据
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.coreClamp.getDevList(params).then(res => {
				if (res.code == 200 && res.data) {
					// this.devList = this.localData.data.lists
					this.devList = res.data.lists
					this.setMain(this.devList)
					// console.log(this.devList)
				}
			})
		},
		//设置主变
		setMain(data) {
			data.forEach(item => {
				if (item.vcName.indexOf('1') != -1) {
					this.setPhase(item, 1)
				} else if (item.vcName.indexOf('2') != -1) {
					this.setPhase(item, 2)
				} else if (item.vcName.indexOf('3') != -1) {
					this.setPhase(item, 3)
				}
			})
		},
		//设置相位
		setPhase(data, num) {
			if (data.vcName.indexOf('A') != -1) {
				this.mainList[`M${num}`].A = this.setNode(data.devNodesList)
			} else if (data.vcName.indexOf('B') != -1) {
				this.mainList[`M${num}`].B = this.setNode(data.devNodesList)
			} else if (data.vcName.indexOf('C') != -1) {
				this.mainList[`M${num}`].C = this.setNode(data.devNodesList)
			}
		},
		//设置节点
		setNode(data) {
			let arr = []
			data.forEach(item => {
				if (item.vcName.indexOf('夹件电流') != -1) {
					arr[0] = item
				} else if (item.vcName.indexOf('铁芯电流') != -1) {
					arr[1] = item
				}
			})
			return arr
		},
		// 历史数据
		getHistory(info) {
			this.nodeId = info.nodeId
			this.chartTitle = info.vcName
			this.unit = info.vcUnit
			this.historyModal = true
		},
		setMqtt() {
			this.topicStr = this.topicArr[0] + this.unitId
			console.log(this.topicStr)
			const _this = this
			this.$_listen(this.$options.name, (topic, message, packet) => {
				//如果推送上来的数据的topic和订阅的topic一致
				if (topic == _this.topicStr) {
					let msgData = JSON.parse(message.toString())
					if (msgData.cmd == 1001 && msgData.unitid == this.$store.getters.unitId) {
						console.log(msgData)
						this.devList.forEach(item => {
							if (item.devId == msgData.devid) {
								for (let key in this.mainList) {
									for (let k in this.mainList[key]) {
										this.mainList[key][k].forEach(node => {
											if (msgData.nodeid == node.nodeId) {
												node.fvalue = msgData.value
											}
										})
									}
								}
							}
						})
					}
				}
			})
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
.core-clamp-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 30px 30px 25px 40px;
  overflow: hidden;

  .main-dev {
    width: calc(33% - 10px);
    height: 100%;
    border: 1px solid #3299ff;
    float: left;
    margin-right: 10px;

    .dev-item {
      width: calc(100% - 10px);
      height: calc(33% - 15px);
      box-sizing: border-box;
      margin-left: 5px;
      margin-top: 5px;
      border: 1px solid #3299ff;
      background-color: rgba(50, 153, 255, 0.1);

      .phase {
        width: 50px;
        height: 100%;
        color: #fff;
        float: left;
        text-align: center;
        line-height: 200px;
        font-size: 18px;
      }

      .node {
        width: calc(50% - 25px);
        height: 100%;
        float: left;
        box-sizing: border-box;
        border-left: 1px solid #3299ff;

        .logo {
          width: 100%;
          height: calc(100% - 50px);
          position: relative;

          .history-btn {
            width: 30px;
            height: 30px;
            background: #fa0;
            background: url('~@ac/assets/img/core-clamp/history.png') no-repeat;
            background-size: 30px 30px;
            border-radius: 50%;
            position: absolute;
            right: 5px;
            top: 5px;
            cursor: pointer;
          }

          img {
            width: 90px;
            height: 90px;
            margin-top: 15px;
            margin-left: 50%;
            transform: translateX(-50%);
          }

          p {
            text-align: center;
            margin-top: 2px;
            font-size: 22px;
            color: #fff;
          }
        }

        .value {
          width: 100%;
          height: 50px;
          border-top: 1px solid #3299ff;

          .v-lf {
            width: 50%;
            height: 100%;
            float: left;
            font-size: 20px;
            text-align: center;
            line-height: 50px;
            color: #fff;
          }

          .v-rt {
            float: left;
            width: 90px;
            height: 40px;
            margin: 5px;
            background: #0f0d0e;
            font-family: 'DS-DIGI';
            font-size: 34px;
            line-height: 42px;
            color: #49ff01;
            text-align: center;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .title {
    width: 100%;
    height: 30px;
    background-color: #3299ff;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }
}
</style>
