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
						<i>{{ total }}</i>&nbsp;&nbsp;&nbsp;开 :
						<i>{{ openTotal }}</i>&nbsp;&nbsp;&nbsp;关 :
						<b>{{ offTotal }}</b>
						<!-- &nbsp;&nbsp;&nbsp;未知:
						<b>{{ unknown }}</b>-->
					</span>
				</div>
				<ul
					v-loading="listLoading"
					element-loading-text="数据加载中"
					element-loading-background="rgba(0, 0, 0, 0)"
				>
					<li v-for="(item, index) in lightingList" :key="index">
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
							<Tooltip :content="item.vcName" class="tooltip" placement="right">
								<div class="li-title">{{ item.vcName }}</div>
							</Tooltip>
							<div class="video-box">
								<i v-if="item.videoUrl != ''" class="el-icon-video-play" @click="changeVideo(item)"></i>
								<Icon v-if="item.videoUrl == ''" type="md-eye-off" class="noVideo" />
							</div>
							<div class="li-btn">
								<!-- <span @click="handleSwitch('open', item)">开</span> -->
								<!-- <span @click="handleSwitch('off', item)" class="closeBtn">关</span> -->
								<span
									v-for="node in item.btnArr"
									:key="node.nodeId+node.fvalue"
									@click="handleSwitch(node,item)"
								>{{node.btnTitle}}</span>
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
import { setTimeout } from 'timers'
export default {
	name: 'intelligent-lighting-customization',
	components: { ocxVideo },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			listLoading: false,
			topicArr: ['qif/zf/app/', 'qif/zf/app/control/'],
			topicStr: '',
			topicStr2: '',
			total: '',
			lightItem: {},
			guids: [],
			openTotal: '',
			offTotal: '',
			unknown: 0,
			modalShow: false,
			tipShow: false,
			lightingFlag: 'open',
			videoConfig: {
				isAutoPlay: true,
				// serviceInfo: '1$172.26.1.128$6800$admin$admin',
				// deviceInfo: '2|172.26.1.28:37777|admin:admin123|0',
				serviceInfo: '',
				deviceInfo: '',
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
				// this.total = this.lightingList.length
				this.getFirstVideo(this.lightingList)
			})
		},
		getDevList() {
			this.listLoading = true
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				findFlag: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.intelligentLightin
				.getDevList(params)
				.then(res => {
					if (res.code == 200 && res.data.lists) {
						res.data.lists.forEach(item => {
							item.videoUrl = item.linkDevInfo ? item.linkDevInfo : ''
							item.btnArr = []
							item.devNodesList.forEach(element => {
								if (element.functionCode == 1020.0001) {
									item.fvalue = element.fvalue
								}
								if (element.functionCode == 1020.0002) {
									item.ctrlNodeId = element.nodeId
									let bta1 = element.vcValueDesc.split('|')
									let param = {}
									bta1.map(ite => {
										param = {}
										param.btnTitle = ite.split(' ')[1]
										param.fvalue = ite.split(' ')[0]
										param.devId = element.devId
										param.nodeId = element.nodeId
										item.btnArr.unshift(param)
									})
								}
							})
						})
						this.lightingList = res.data.lists
						this.listLoading = false
						// console.log(this.lightingList)
						// this.openTotal = res.data.openCount
						// this.offTotal = res.data.closeCount
						this.total = this.lightingList.length
						// this.unknown = this.total - this.openTotal - this.offTotal
						// this.unknown = isNaN(this.unknown) ? this.total : this.unknown
						this.getFirstVideo(this.lightingList)
					}
				})
				.catch(error => {
					this.listLoading = false
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
			// console.log(data)
			for (let i = 0; i < data.length; i++) {
				// if (data[i].devNodesList && data[i].devNodesList.length > 0 && !!data[i].devNodesList[0].devId) {
				// 	this.videoConfig.deviceInfo = data[i].devNodesList[0].devId
				// 	break
				// }
				if (data[i].videoUrl && data[i].videoUrl != '') {
					this.videoConfig.deviceInfo = data[i].videoUrl
					break
				}
			}
			console.log(this.videoConfig)
		},
		//获取开关数量
		getSwitch() {
			// console.log(this.$_api.intelligentLightin)
			this.$_api.intelligentLightin.getSwitch({ unitId: this.unitId }).then(res => {
				// console.log(res)

				if (res.code == 200 && res.data) {
					if (res.data.openCount + res.data.closeCount == 0) {
						this.openTotal = '未知'
						this.offTotal = '未知'
					} else {
						this.openTotal = res.data.openCount
						this.offTotal = res.data.closeCount
					}

					// this.total = this.openTotal + this.offTotal
				}
			})
		},
		//获取流媒体服务
		getVideoServe() {
			this.$_api.intelligentLightin.getVideoServe().then(res => {
				if (res.code == 200 && res.data) {
					// this.videoConfig.serviceInfo = res.data.ServiceID
					// this.videoConfig.serviceInfo = res.data.vc_Address
					let obj = res.data
					this.videoConfig.serviceInfo = obj.ServiceID + '$' + obj.vc_IP + '$' + obj.i_Port + '$admin$admin'
				}
			})
		},
		//点击开关按钮
		handleSwitch(node, item) {
			// console.log(node)
			this.modalShow = true
			this.nodeData = JSON.parse(JSON.stringify(node))
			this.lightItem = item
			// console.log(this.nodeData)
			// console.log(this.lightItem)
			// if (item.ctrlNodeId) {
			// 	if (type == 'open') {
			// 		this.modalShow = true
			// 		this.nodeData = JSON.parse(JSON.stringify(item))
			// 		this.nodeData.f_Value = '1'
			// 	} else {
			// 		this.modalShow = true
			// 		this.nodeData = JSON.parse(JSON.stringify(item))
			// 		this.nodeData.f_Value = '0'
			// 	}
			// 	this.lightItem = item
			// } else {
			// 	this.$ocxMessage.info('控制节点未配置')
			// }
		},
		//点击确定
		handleConfirm() {
			let nowDate = new Date().getTime()
			let startTime = Math.ceil(nowDate / 1000)
			let guid = this.guid()
			this.guids.push({ guid: guid, devId: this.nodeData.devId, value: this.nodeData.fvalue })
			let params = {
				cmd: '1003',
				type: 'req',
				serial: guid,
				time: startTime,
				nodes: [
					{
						devid: this.nodeData.devId,
						nodeid: this.nodeData.nodeId,
						value: this.nodeData.fvalue
					}
				]
			}
			this.topicStr2 = this.topicArr[1] + this.unitId
			//下发控制命令
			this.$_mqtt.publish(this.topicStr2, JSON.stringify(params), { qos: 0, retain: false })
			//判断当前节点是否有视频 有就切换视频
			// if (
			// 	this.lightItem.devNodesList &&
			// 	this.lightItem.devNodesList.length > 0 &&
			// 	!!this.lightItem.devNodesList[0].devId
			// ) {
			// 	this.videoConfig.deviceInfo = this.lightItem.devNodesList[0].devId
			// }
			if (this.lightItem.videoUrl && this.lightItem.videoUrl != '') {
				this.videoConfig.deviceInfo = this.lightItem.videoUrl
			}
		},
		//取消
		handleCancel() {
			console.log('cancel')
		},
		//切换视频
		changeVideo(data) {
			this.videoConfig.deviceInfo = data.videoUrl
			console.log(this.videoConfig)
		},
		//实时数据回调
		getMqtt() {
			this.topicStr = this.topicArr[0] + this.unitId
			this.topicStr2 = this.topicArr[1] + this.unitId
			this.$_listen(this.$options.name, (topic, message, packet) => {
				if (topic == this.topicStr || topic == this.topicStr2) {
					let msgData = JSON.parse(message.toString())
					if (msgData.cmd == 1001 && msgData.unitid == this.$store.getters.unitId) {
						this.lightingList.forEach(element => {
							// console.log(element)
							if (msgData.devid == element.devId) {
								element.devNodesList.forEach(item => {
									if (item.functionCode == 1020.0001 && msgData.nodeid == item.nodeId) {
										item.fvalue = msgData.value
										element.fvalue = msgData.value
										if (msgData.value == 0) {
											this.openTotal = this.openTotal - 1
											this.offTotal = this.offTotal + 1
										} else if (msgData.value == 1) {
											this.openTotal = this.openTotal + 1
											this.offTotal = this.offTotal - 1
										}
									}
								})
								return
							}
						})
					} else if (msgData.cmd == 1003) {
						console.log(msgData)
						console.log(this.guids)
						this.guids.forEach(item => {
							if (item.guid == msgData.serial) {
								this.$ocxMessage.info('命令下发成功')
								this.getSwitch()
							}
						})
					}
					if (msgData.cmd == 1004) {
						console.log(JSON.stringify(msgData))
						this.guids.forEach((item, index) => {
							if (item.guid == msgData.serial) {
								if (msgData.result == 0) {
									this.$ocxMessage.success('命令执行成功')
									// this.lightingList.forEach(element => {
									// 	if (element.devId == item.devId) {
									// 		element.fvalue = item.value
									// 	}
									// })
									this.guids.splice(index, 1)
									// this.getSwitch()
								} else {
									this.$ocxMessage.error('命令执行失败')
									this.guids.splice(index, 1)
									// this.getSwitch()
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
<style lang="stylus" scoped>
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
      border: 2px solid #175a9e;

      .list-title {
        width: 100%;
        height: 50px;
        font-size: 18px;
        line-height: 50px;
        background: #175a9e;
        color: #fff;

        p {
          width: 40%;
          padding-left: 30px;
          float: left;
        }

        span {
          width: 60%;
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
        margin-top: 10px;
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

            .tooltip {
              width: 80%;
              float: left;

              .ivu-tooltip-rel {
                width: 100%;

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
              }
            }

            .vidoe-box {
              width: 20%;
              float: left;
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

.top, .bottom {
  text-align: center;
}

.center {
  width: 300px;
  margin: 10px auto;
  overflow: hidden;
}

.center-left {
  float: left;
}

.center-right {
  float: right;
}

/deep/.ivu-tooltip-rel {
  width: 100% !important;
}

/deep/.el-icon-video-play:before {
  font-size: 24px;
  line-height: 40px;
  color: #19be6b;
  cursor: pointer;
}

.noVideo {
  font-size: 24px;
  line-height: 40px;
  color: #c5c8ce;
}
</style>
