<template>
  <div class="intelligent-lighting-customization">
    <div class="lighting-left">
      <div class="ft"></div>
      <div class="rb"></div>
      <ocxVideo :videoConfig="videoConfig"></ocxVideo>
    </div>
    <div class="lighting-right">
      <div class="lighting-list">
        <div class="list-title">
          <p>灯控设备开关</p>
          <span>
            总 :
            <i>{{total}}</i>&nbsp;&nbsp;&nbsp;开 :
            <i>{{openTotal}}</i>&nbsp;&nbsp;&nbsp;关 :
            <b>{{offTotal}}</b>
          </span>
        </div>
        <ul>
          <li v-for="(item,index) in lightingList" :key="index">
            <div class="li-left">
              <img
                v-if="item.fvalue == 1"
                src="../../assets/img/intelligent-lighting/lamplight-open-s.png"
              />
              <!-- <img
                v-if="item.f_Value == 0"
                src="../../assets/img/intelligent-lighting/lamplight-close-s.png"
              />-->
              <img v-else src="../../assets/img/intelligent-lighting/lamplight-close-s.png" />
            </div>
            <div class="li-right">
              <div class="li-title">{{item.vcName}}</div>
              <div class="li-btn">
                <span @click="handleSwitch('open',item)">开</span>
                <span @click="handleSwitch('off',item)" class="closeBtn">关</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ocx-modal title="提醒" v-model="modalShow" @on-ok="handleConfirm" @on-cacel="handleCancel">
      <p>确认执行该操作？</p>
    </ocx-modal>
  </div>
</template>
<script>
import ocxVideo from '@/components/native/video/OcxVideo'
import lightingOpen from '../../assets/img/intelligent-lighting/lamplight-open-s.png'
import lightingClose from '../../assets/img/intelligent-lighting/lamplight-close-s.png'
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'intelligent-lighting-customization',
	components: { ocxVideo },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/', 'qif/zf/app/control/'],
			topicStr: '',
			topicStr2: '',
			total: '',
			lightItem: {},
			guids: [],
			openTotal: '',
			offTotal: '',
			modalShow: false,
			tipShow: false,
			lightingFlag: 'open',
			videoConfig: {
				isAutoPlay: true,
				// serviceInfo: '1$172.26.1.128$6800$admin$admin',
				// deviceInfo: '2|172.26.1.28:37777|admin:admin123|0',
				serviceInfo: '1$153.3.56.162$6800$admin$admin',
				deviceInfo: '64bae7e19e3011e9ac508cec4b8f5477',
				// serviceInfo: '',
				// deviceInfo: '',
				hideTool: true
			},
			nodeData: {},

			//2状态 3控制
			lightingList: []
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
		// this.getList()
		this.getDevList()
		this.getSwitch()
		this.getVideoServe()
	},
	mounted() {
		this.getMqtt()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//获取灯光列表
		getList() {
			let params = {
				// unitId: '192fe4cec3ec4d3fb81c0d05f82bde41',
				unitId: this.unitId,
				devTypeId: this.activeDeviceTypeId,
				isPage: 1
			}
			this.$_api.intelligentLightin.getList(params).then(res => {
				res.data.lists.forEach(item => {
					if (item.i_NodeType == 2) {
						this.lightingList.push(item)
					}
				})
				this.total = this.lightingList.length
				this.getFirstVideo(this.lightingList)
			})
		},
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.intelligentLightin.getDevList(params).then(res => {
				if (res.code == 200 && res.data.lists) {
					// console.log( res.data.lists)
					res.data.lists.forEach(item => {
						item.devNodesList.forEach(element => {
							if (element.functionCode == 1020.0001) {
								item.fvalue = element.fvalue
							}
							if (element.functionCode == 1020.0002) {
								item.ctrlNodeId = element.nodeId
							}
						})
					})
					this.lightingList = res.data.lists
					this.total = this.lightingList.length
					this.getFirstVideo(this.lightingList)
				}
			})
		},
		//获取第一条视频
		// getFirstVideo(data) {
		// 	console.log(data)
		// 	for (let i = 0; i < data.length; i++) {
		// 		if (data[i].linkDevInfo.length > 0 && !!data[i].linkDevInfo[0].vc_Params1) {
		// 			this.videoConfig.deviceInfo = data[i].linkDevInfo[0].vc_Params1
		// 			break
		// 		}
		// 	}
		// },
		getFirstVideo(data) {
			// for (let i = 0; i < data.length; i++) {
			// 	if (data[i].devNodesList && data[i].devNodesList.length > 0 && !!data[i].devNodesList[0].vcParam1) {
			// 		this.videoConfig.deviceInfo = data[i].devNodesList[0].vcParam1
			// 		break
			// 	}
			// }
		},
		//获取开关数量
		getSwitch() {
			this.$_api.intelligentLightin.getSwitch().then(res => {
				if (res.code == 200 && res.data) {
					this.openTotal = res.data.openCount
					this.offTotal = res.data.closeCount
				}
			})
		},
		//获取流媒体服务
		getVideoServe() {
			// this.$_api.intelligentLightin.getVideoServe().then(res => {
			// 	if (res.code == 200 && res.data) {
			// 		console.log(res)
			// 		// this.videoConfig.serviceInfo = res.data.ServiceID
			// 		this.videoConfig.serviceInfo = res.data.vc_Address
			// 	}
			// })
		},
		//点击开关按钮
		handleSwitch(type, item) {
			console.log(item)
			if (item.ctrlNodeId) {
				if (type == 'open') {
					this.modalShow = true
					this.nodeData = JSON.parse(JSON.stringify(item))
					this.nodeData.f_Value = '1'
				} else {
					this.modalShow = true
					this.nodeData = JSON.parse(JSON.stringify(item))
					this.nodeData.f_Value = '0'
				}
				this.lightItem = item
			} else {
				this.$ocxMessage.info('控制节点未配置')
			}
		},
		//点击确定
		handleConfirm() {
			let nowDate = new Date().getTime()
			let startTime = Math.ceil(nowDate / 1000)
			let guid = this.guid()
			this.guids.push(guid)
			let params = {
				cmd: '1003',
				type: 'req',
				serial: guid,
				time: startTime,
				nodes: [
					{
						devid: this.nodeData.devId,
						nodeid: this.nodeData.ctrlNodeId,
						value: this.nodeData.f_Value
					}
				]
			}
			this.topicStr = this.topicArr[1] + this.unitId
			//下发控制命令
			this.$_mqtt.publish(this.topicStr, JSON.stringify(params), { qos: 0, retain: false })
			//判断当前节点是否有视频 有就切换视频
			// if (
			// 	this.lightItem.devNodesList &&
			// 	this.lightItem.devNodesList.length > 0 &&
			// 	!!this.lightItem.devNodesList[0].vcParam1
			// ) {
			// 	this.videoConfig.deviceInfo = this.lightItem.devNodesList[0].vcParam1
			// 	console.log(this.lightItem.devNodesList[0].vcParam1)
			// 	console.log(this.videoConfig.deviceInfo)
			// }
		},
		//取消
		handleCancel() {
			console.log('cancel')
		},
		//实时数据回调
		getMqtt() {
			console.log(this.topicStr)
			this.topicStr = this.topicArr[0] + this.unitId
			this.topicStr2 = this.topicArr[1] + this.unitId
			this.$_listen(this.$options.name, (topic, message, packet) => {
				if (topic == this.topicStr || topic == this.topicStr2) {
					let msgData = JSON.parse(message.toString())
					if (msgData.cmd == 1001) {
						console.log(msgData)
						console.log(this.lightingList)
						this.lightingList.forEach(element => {
							if (msgData.nodeid == element.ctrlNodeId) {
								element.devNodesList.forEach(item => {
									if (item.functionCode == 1020.0001) {
										item.fvalue = msgData.value
										element.fvalue = msgData.value
									}
								})
							}
						})
					} else if (msgData.cmd == 1003) {
						console.log(JSON.stringify(msgData))
						this.guids.forEach(item => {
							if (item == msgData.serial) {
								this.$ocxMessage.info('命令下发成功')
							}
						})
					} else if (msgData.cmd == 1004) {
						console.log(JSON.stringify(msgData))

						this.guids.forEach((item, index) => {
							if (item == msgData.serial) {
								if (msgData.result == 0) {
									this.$ocxMessage.success('命令执行成功')
									this.guids.splice(index, 1)
									this.getSwitch()
								} else {
									this.$ocxMessage.error('命令执行失败')
								}
							}
						})
					}
				}
			})
		},
		//生成guId
		guid() {
			return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				let r = (Math.random() * 16) | 0,
					v = c == 'x' ? r : (r & 0x3) | 0x8
				return v.toString(16)
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
<style lang='stylus' scoped>
* {
  margin: 0;
  padding: 0;
}

.intelligent-lighting-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;

  .lighting-left {
    width: calc(100% - 565px);
    height: 100%;
    float: left;
    padding: 20px 6px 50px 50px;
    position: relative;

    .ft {
      width: 20px;
      height: 17px;
      position: absolute;
      top: 13px;
      left: 43px;
      background: url('~@/assets/img/common/border-lt.png') no-repeat;
      background-size: 100% 100%;
    }

    .rb {
      width: 20px;
      height: 17px;
      position: absolute;
      bottom: 44px;
      right: 0;
      background: url('~@/assets/img/common/border-rb.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .lighting-right {
    width: 555px;
    margin-left: 10px;
    box-sizing: border-box;
    height: 100%;
    float: left;
    padding: 20px 50px 52px 0;

    .lighting-list {
      width: 100%;
      height: 100%;
      background-color: rgba(12, 27, 58, 0.7);

      .list-title {
        width: 100%;
        height: 60px;
        font-size: 18px;
        line-height: 60px;
        color: #fff;

        p {
          width: 50%;
          padding-left: 30px;
          float: left;
        }

        span {
          width: 50%;
          float: left;
          font-size: 16px;
          text-align: right;
          padding-right: 20px;

          i {
            font-style: normal;
            color: #0de5f3;
          }

          b {
            font-weight: 400;
            color: #ffff00;
          }
        }
      }

      ul {
        width: 100%;
        height: calc(100% - 80px);
        overflow: auto;

        li {
          width: 225px;
          height: 80px;
          border: 2px solid #286a72;
          float: left;
          margin-left: 18px;
          margin-bottom: 13px;
          border-radius: 5px;

          .li-left {
            width: 70px;
            height: 100%;
            background: url('../../assets/img/intelligent-lighting/lamplightBg.png');
            background-size: 100% 100%;
            border-right: 2px solid #286a72;
            float: left;

            img {
              width: 50px;
              margin-top: 15px;
              margin-left: 10px;
            }
          }

          .li-right {
            width: calc(100% - 70px);
            height: 100%;
            float: left;

            .li-title {
              width: 100%;
              height: 40px;
              font-size: 14px;
              line-height: 40px;
              color: #fff;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .li-btn {
              span {
                display: block;
                width: 60px;
                height: 30px;
                float: left;
                margin-left: 10px;
                line-height: 30px;
                text-align: center;
                color: #0ef6ff;
                background: url('../../assets/img/intelligent-lighting/btnBg.png');
                background-size: 100% 100%;
                cursor: pointer;
                position: relative;

                &:active {
                  top: 1px;
                  left: 1px;
                }
              }

              .closeBtn {
                color: #fff800;
              }
            }
          }
        }
      }
    }
  }
}

/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>