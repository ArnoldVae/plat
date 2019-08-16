<template>
	<div class="arrester-monitor-customization">
		<div class="arrester">
			<!-- 主变区域Start -->
			<div class="main-content" v-for="main in mainList" :key="main.title">
				<div class="title">{{ main.title }}</div>
				<div class="level-bottom">
					<div class="level" v-for="level in main.main" :key="level.title">
						<div class="title">{{ level.title }}</div>
						<div class="item-box" v-for="(phase, index) in level.level" :key="index">
							<div class="left-title">
								{{
									phase.vcName.indexOf('A相') != -1
										? 'A相'
										: phase.vcName.indexOf('B相') != -1
										? 'B相'
										: 'C相'
								}}
							</div>
							<div class="item" v-for="node in phase.devNodesList" :key="node.nodeId">
								<div class="item-top">
									<div class="top-left">{{ node.vcName }}</div>
									<div class="top-right">
										<img
											src="../../assets/img/arrester-monitor/ls.png"
											@click="showHistory(node, phase.vcName)"
											alt
										/>
									</div>
								</div>
								<div class="item-bottom">
									<div class="bottom-left">值({{ node.vcUnit }})</div>
									<div class="bottom-right">{{ node.fvalue }}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 主变区域end -->
			<!-- 非主变区域Start -->
			<div class="other-content" v-for="dev in devList" :key="dev.devId">
				<div class="title">{{ dev.vcName }}</div>
				<div class="other-list">
					<div class="other-item" v-for="item in dev.devNodesList" :key="item.nodeId">
						<div class="item-top">
							<div class="logo">
								<img
									src="../../assets/img/arrester-monitor/dianliu.png"
									v-if="item.functionCode == 1003.0007"
									alt
								/>
								<img
									src="../../assets/img/arrester-monitor/leiji.png"
									v-if="item.functionCode == 1003.0011"
									alt
								/>
								<img
									src="../../assets/img/arrester-monitor/zuxing.png"
									v-if="item.functionCode == 1003.0008"
									alt
								/>
							</div>
							<div class="top-left">{{ item.vcName }}</div>
							<div class="top-right">
								<img
									src="../../assets/img/arrester-monitor/ls.png"
									@click="showHistory(item, dev.vcName)"
									alt
								/>
							</div>
						</div>
						<div class="item-bottom">
							<div class="bottom-left">值({{ item.vcUnit }})</div>
							<div class="bottom-right">{{ item.fvalue }}</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 非主变区域end -->
		</div>
		<charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import charts from '../main-oil/charts1'
export default {
	name: 'arrester-monitor-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/'],
			topicStr: '',
			mainDevList: [],
			mainList: [],
			devList: [],
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
		console.log(this.topicStr)
		//实时数据回调
		const _this = this
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				//将json字符串转为数组
				let msgData = JSON.parse(message.toString())
				if (msgData.cmd == 1001) {
					//循环主变还是非主变的flag
					let devFlag = true
					//非主变
					_this.devList.forEach(item => {
						if (msgData.devid == item.devId) {
							item.devNodesList.forEach(element => {
								if (msgData.nodeid == element.nodeId) {
									element.fvalue = msgData.value
									devFlag = false
									return
								}
							})
						}
					})
					//主变
					if (devFlag) {
						_this.mainList.forEach(item1 => {
							item1.main.forEach(item2 => {
								item2.level.forEach(item3 => {
									if (item3.devId == msgData.devid) {
										item3.devNodesList.forEach(item4 => {
											if (msgData.nodeid == item4.nodeId) {
												item4.fvalue = msgData.value
												return
											}
										})
									}
								})
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
		//获取设备列表
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.humiture.getDevList(params).then(res => {
				if (res.code == 200 && res.data) {
					this.mainDevList = JSON.parse(JSON.stringify(res.data.lists))
					this.setMainList()
				}
			})
		},
		//处理设备接口返回的数据
		setMainList() {
			this.mainList = []
			let mainDev = []
			//区分主变和非主变
			this.mainDevList.forEach(item => {
				if (item.vcName.indexOf('主变') != -1) {
					mainDev.push(item)
				} else {
					this.devList.push(item)
				}
			})
			//定义三个主变 根据name判断插入
			let mainList = [[], [], []]
			for (let i = 0; i < mainDev.length; i++) {
				for (let j = 0; j < mainDev.length; j++) {
					if (mainDev[i].vcName.indexOf(j + 1 + '号主变') != -1) {
						mainList[j].push(mainDev[i])
					}
				}
			}
			//去除空主变
			mainList = this.setArray(mainList)
			//调用方法将生成的主变集合插入到数组内 主变内细分电压等级
			mainList.forEach(item => {
				this.mainList.push(this.getMainDev(item))
			})
		},
		//生成一个主变 且内部细分电压等级
		getMainDev(array) {
			let mainArr = {
				title: '',
				main: [{ title: '', level: [] }, { title: '', level: [] }, { title: '', level: [] }]
			}
			array.forEach(element => {
				if (element.vcName.indexOf('35kV') != -1) {
					mainArr.main[0].title = '35kV'
					mainArr.main[0].level.push(element)
				} else if (element.vcName.indexOf('220kV') != -1) {
					mainArr.main[1].title = '220kV'
					mainArr.main[1].level.push(element)
				} else if (element.vcName.indexOf('500kV') != -1) {
					mainArr.main[2].title = '500kV'
					mainArr.main[2].level.push(element)
				}
				mainArr.title =
					element.vcName.indexOf('1号') != -1
						? '1号主变'
						: element.vcName.indexOf('2号') != -1
						? '2号主变'
						: '3号主变'
			})
			for (let k = 0; k < mainArr.main.length; k++) {
				if (mainArr.main[k].level.length == 0) {
					mainArr.main.splice(k, 1)
					k = k - 1
				}
			}
			return mainArr
		},
		//去空
		setArray(array) {
			for (let k = 0; k < array.length; k++) {
				if (array[k].length == 0) {
					array.splice(k, 1)
					k = k - 1
				}
			}
			return array
		},
		//历史数据弹窗
		showHistory(node, name) {
			this.nodeId = node.nodeId
			this.unit = node.vcUnit
			this.chartTitle = name + ' - ' + node.vcName
			this.historyModal = true
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
.arrester-monitor-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 55px 25px 67px;

  .arrester {
    width: 100%;
    height: 100%;
    overflow: auto;

    .main-content {
      width: 100%;
      height: 500px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border: 1px solid #3299ff;

      .level-bottom {
        width: 100%;
        height: calc(100% - 40px);
        margin-top: 5px;
        display: flex;
        justify-content: space-around;

        .level {
          box-sizing: border-box;
          width: calc(33.33% - 15px);
          height: 100%;
          border: 1px solid #3299ff;
          background-color: rgba(50, 153, 255, 0.1);

          .item-box {
            width: 100%;
            height: calc(33% - 30px);
            margin-top: 15px;
            border-top: 1px solid #3299ff;
            border-bottom: 1px solid #3299ff;

            .left-title {
              width: 35px;
              height: 80px;
              float: left;
              margin-top: 20px;
              line-height: 90px;
              color: #fff;
              text-align: center;
              font-size: 18px;
            }

            .item {
              width: calc(33% - 15px);
              margin-left: 3px;
              height: 80px;
              border: 1px solid #3299ff;
              margin-top: 20px;
              float: left;
              // border-top-left-radius: 15px;
              // border-top-right-radius: 15px;
              border-radius: 10px;
              overflow: hidden;

              .item-top {
                width: 100%;
                height: 50%;
                border-bottom: 1px solid #3299ff;

                // background-color: #0e88e3;
                .top-left {
                  width: 75%;
                  height: 100%;
                  line-height: 40px;
                  color: #fff;
                  text-align: center;
                  float: left;
                }

                .top-right {
                  width: 25%;
                  height: 100%;
                  float: left;

                  img {
                    width: 80%;
                    margin-left: 0px;
                    margin-top: 5px;
                    cursor: pointer;
                  }
                }
              }

              .item-bottom {
                background-color: #13283a;
                height: 50%;
                line-height: 40px;
                color: #fff;
                text-align: center;

                .bottom-left {
                  float: left;
                  width: 50%;
                  height: 100%;
                }

                .bottom-right {
                  float: left;
                  width: 45%;
                  color: #4dff00;
                  font-family: 'DS-DIGI';
                  font-size: 22px;
                  height: 100%;
                  background: radial-gradient(rgb(75, 17, 17), #000);
                }
              }
            }
          }
        }
      }
    }

    .title {
      width: 100%;
      height: 30px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
      background-color: #0e88e3;
      border: 1px solid #0e88e3;
    }

    .other-content {
      width: calc(50% - 10px);
      margin-right: 10px;
      margin-top: 10px;
      height: 150px;
      float: left;
      border: 1px solid #0e88e3;

      .other-list {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;

        .other-item {
          width: calc(33.33% - 10px);
          height: calc(100% - 40px);
          margin-top: 5px;
          float: left;
          border: 1px solid #0e88e3;
          border-radius: 10px;
          overflow: hidden;
          background-color: rgba(50, 153, 255, 0.1);

          .item-top {
            width: 100%;
            height: 50%;
            border-bottom: 1px solid #0e88e3;

            // background-color #0e88e3;
            .logo {
              width: 20%;
              height: 100%;
              float: left;

              img {
                width: 70%;
                display: block;
                margin-left: 10px;
                margin-top: 10px;
              }
            }

            .top-left {
              width: 60%;
              height: 100%;
              line-height: 50px;
              font-size: 16px;
              color: #fff;
              text-align: center;
              float: left;
            }

            .top-right {
              width: 20%;
              height: 100%;
              float: left;

              img {
                width: 60%;
                margin-left: 8px;
                margin-top: 10px;
                cursor: pointer;
              }
            }
          }

          .item-bottom {
            background-color: #13283a;
            height: 50%;
            line-height: 50px;
            color: #fff;
            text-align: center;

            .bottom-left {
              float: left;
              width: 50%;
              font-size: 18px;
              height: 100%;
            }

            .bottom-right {
              float: left;
              width: 45%;
              color: #4dff00;
              font-family: 'DS-DIGI';
              font-size: 36px;
              height: 100%;
              background: radial-gradient(rgb(75, 17, 17), #000);
            }
          }
        }
      }
    }
  }
}
</style>
