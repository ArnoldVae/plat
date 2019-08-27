<template>
	<div class="anti-theft-customization">
		<div class="left-video">
			<div class="ft"></div>
			<div class="rb"></div>
			<ocxVideo :videoConfig="videoConfig"></ocxVideo>
		</div>
		<div class="right-list">
			<div class="list-title">门禁控制设备</div>
			<ul>
				<template v-for="(item, index) in listData">
					<li :key="index">
						<div class="list-item-left">
							<!-- <div :class="{ ddmg: item.ddg, ddmk: item.ddk, mjg: item.mjg, mjk: item.mjk }"></div> -->
							<img v-if="item.fvalue == 1" src="../../assets/img/anti-theft/mjk.png" />
							<img v-else src="../../assets/img/anti-theft/mjg.png" />
						</div>
						<div class="list-item-right">
							<span>{{ item.vcName }}</span>
							<div class="list-item-btn">
								<span v-for="(ite, idx) in item.btnArr" :key="idx" @click="handleClick(item, ite)">
									{{
									ite.btnTitle
									}}
								</span>
								<div class="video-box">
									<i v-if="item.videoUrl != ''" class="el-icon-video-play" @click="changeVideo(item)"></i>
									<Icon v-if="item.videoUrl == ''" type="md-eye-off" class="noVideo" />
								</div>
							</div>
						</div>
					</li>
				</template>
			</ul>
		</div>
		<!-- <confirm-modal
			title="提醒"
			text="确认执行该操作？"
			v-model="modalShow"
			@on-ok="handleConfirm"
			@on-cacel="handleCancel"
		></confirm-modal>
		<tool-tip createIframe v-model="tipShow" type="success" title="命令下发成功"></tool-tip>-->
		<ocx-modal title="提醒" v-model="modalShow" @on-ok="handleConfirm" @on-cacel="handleCancel">
			<p>确认执行该操作？</p>
		</ocx-modal>
	</div>
</template>
<script>
import ocxVideo from '@/components/native/video/OcxVideo'
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'anti-theft-customization',
	components: { ocxVideo },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/', 'qif/zf/app/control/'],
			topicStr: '',
			guids: [],
			modalShow: false,
			tipShow: false,
			accessData: [],
			listData: [],
			devItem: {},
			nodeData: {},
			lightingFlag: 'open',
			videoConfig: {
				isAutoPlay: true,
				// serviceInfo: '1$172.26.1.128$6800$admin$admin',
				// deviceInfo: '2|172.26.1.28:37777|admin:admin123|0',
				serviceInfo: '',
				deviceInfo: '',
				hideTool: true
			}
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
		this.getVideoServe()
		this.getEqList()
	},
	mounted() {
		this.getMqtt()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//获取列表
		getEqList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				findFlag: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.antiTheft.getDevList(params).then(res => {
				res.data.lists.forEach(item => {
					item.btnArr = []
					if (item.devNodesList && item.devNodesList.length > 0) {
						item.devNodesList.forEach(element => {
							item.videoUrl = item.linkDevInfo.length > 0 ? item.linkDevInfo[0].DevID : ''
							if (element.nodeType == 3 || (element.nodeType == 4 && element.vcValueDesc)) {
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
							if (element.nodeType == 2) {
								item.fvalue = element.fvalue
							}
						})
					} else {
						item.videoUrl = false
					}
				})
				this.listData = res.data.lists
				console.log(this.listData)
				this.getFirstVideo(this.listData)
			})
		},
		//获取第一条视频
		getFirstVideo(data) {
			// for (let i = 0; i < data.length; i++) {
			// 	if (data[i].devNodesList && data[i].devNodesList.length > 0 && !!data[i].devNodesList[0].devId) {
			// 		// this.videoConfig.deviceInfo = data[i].devNodesList[0].vcParam1
			// 		this.videoConfig.deviceInfo = data[i].devNodesList[0].devId
			// 		break
			// 	}
			// }
			for (let i = 0; i < data.length; i++) {
				if (data[i].videoUrl && data[i].videoUrl != '') {
					this.videoConfig.deviceInfo = data[i].videoUrl
					break
				}
			}
			// console.log(this.videoConfig)
		},
		//获取流媒体服务
		getVideoServe() {
			this.$_api.antiTheft.getVideoServe().then(res => {
				if (res.code == 200 && res.data) {
					// this.videoConfig.serviceInfo = res.data.vc_Address
					let obj = res.data
					this.videoConfig.serviceInfo = obj.ServiceID + '$' + obj.vc_IP + '$' + obj.i_Port + '$admin$admin'
				}
			})
		},
		//点击控制按钮
		handleClick(item, ite) {
			this.devItem = item
			this.nodeData = JSON.parse(JSON.stringify(ite))
			this.modalShow = true
		},
		//弹窗确认
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
						nodeid: this.nodeData.nodeId,
						value: this.nodeData.fvalue
					}
				]
			}
			this.topicStr = this.topicArr[1] + this.unitId
			//下发控制命令
			this.$_mqtt.publish(this.topicStr, JSON.stringify(params), { qos: 0, retain: false })
			//判断当前节点是否有视频 有就切换视频
			// if (
			// 	this.devItem.devNodesList &&
			// 	this.devItem.devNodesList.length > 0 &&
			// 	!!this.devItem.devNodesList[0].devId
			// ) {
			// 	this.videoConfig.deviceInfo = this.devItem.devNodesList[0].devId
			// }
			if (this.devItem.videoUrl && this.devItem.videoUrl != '') {
				this.videoConfig.deviceInfo = this.devItem.videoUrl
			}
			console.log(this.videoConfig)
			// console.log(this.guids)
		},
		changeVideo(data) {
			this.videoConfig.deviceInfo = data.videoUrl
			console.log(this.videoConfig)
		},
		//弹窗取消
		handleCancel() {},
		//生成guId
		guid() {
			return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				let r = (Math.random() * 16) | 0,
					v = c == 'x' ? r : (r & 0x3) | 0x8
				return v.toString(16)
			})
		},
		//实时数据回调
		getMqtt() {
			this.topicStr = this.topicArr[0] + this.unitId
			console.log(this.topicStr)
			this.topicStr2 = this.topicArr[1] + this.unitId
			this.$_listen(this.$options.name, (topic, message, packet) => {
				if (topic == this.topicStr || topic == this.topicStr2) {
					let msgData = JSON.parse(message.toString())
					if (msgData.cmd == 1001 && msgData.unitid == this.$store.getters.unitId) {
						// console.log(msgData)
						this.listData.forEach(element => {
							element.devNodesList.forEach(item => {
								if (msgData.nodeid == item.nodeId) {
									if (item.nodeType == 3 || item.nodeType == 4) {
										item.fvalue = msgData.value
										if (
											item.vcValueDesc.split(' ')[1] == '开门' ||
											item.vcValueDesc.split(' ')[1] == '关门'
										) {
											element.fvalue = msgData.value
										}
									}
								}
							})
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
								} else {
									this.$ocxMessage.error('命令执行失败')
									this.guids.splice(index, 1)
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
.anti-theft-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;

  .left-video {
    width: calc(100% - 565px);
    height: 100%;
    float: left;
    padding: 20px 6px 50px 50px;
    position: relative;
  }

  .right-list {
    width: 555px;
    margin-left: 10px;
    box-sizing: border-box;
    height: 100%;
    float: left;
    padding: 0 50px 52px 0;

    .list-title {
      width: 100%;
      height: 50px;
      font-size: 18px;
      line-height: 50px;
      padding-left: 10px;
      background: #175a9e;
      margin-top: 20px;
      color: #fff;
    }

    ul {
      width: 100%;
      height: calc(100% - 70px);
      overflow: auto;
      border: 2px solid #175a9e;
      padding-left: 10px;
      padding-top: 10px;

      li {
        float: left;
        list-style: none;
        display: flex;
        width: calc(50% - 10px);
        height: 120px;
        border: 2px solid #26636c;
        margin-bottom: 20px;
        margin-right: 5px;
        border-radius: 5px;
        background-color: rgba(12, 27, 58, 0.7);

        .list-item-left {
          width: 25%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 2px solid #26636c;
          background: url('~@ac/assets/img/anti-theft/boxbg.png');

          img {
            display: block;
            width: 80%;
            height: 50%;
          }
        }

        .list-item-right {
          width: 75%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          color: #fff;
          position: relative;

          > span {
            margin-top: 15px;
            font-size: 16px;
            text-align: center;
          }

          .video-box {
            position: absolute;
            top: 2px;
            right: 2px;
          }

          .list-item-btn {
            width: 100%;
            display: flex;
            // flex-direction: column;
            justify-content: space-around;
            flex-wrap: wrap;
            font-size: 16px;
            overflow: auto;

            > span {
              display: inline-block;
              min-width: 75px;
              color: #0ef6ff;
              background: url('../../assets/img/intelligent-lighting/btnBg.png');
              background-size: 100% 100%;
              cursor: pointer;
              height: 30px;
              line-height: 30px;
              text-align: center;
            //   padding: 0 5px;
              margin-bottom: 4px;
            }
          }
        }
      }
    }
  }
}

/deep/.el-icon-video-play:before {
  font-size: 22px;
  color: #19be6b;
  cursor: pointer;
}

.noVideo {
  font-size: 22x;
  color: #c5c8ce;
}
</style>
