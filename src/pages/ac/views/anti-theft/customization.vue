<template>
  <div class="anti-theft-customization">
    <div class="left-video">
      <div class="ft"></div>
      <div class="rb"></div>
      <ocxVideo :videoConfig="videoConfig"></ocxVideo>
    </div>
    <div class="right-list">
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
                <span
                  v-for="(ite, idx) in item.btnArr"
                  :key="idx"
                  @click="handleClick(item, ite)"
                >{{ ite.btnTitle }}</span>
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
      devItem:{},
			nodeData: {},
			lightingFlag: 'open',
			videoConfig: {
				isAutoPlay: true,
				// serviceInfo: '1$172.26.1.128$6800$admin$admin',
				// deviceInfo: '2|172.26.1.28:37777|admin:admin123|0',
				serviceInfo: '1$153.3.56.162$6800$admin$admin',
				deviceInfo: '64bae7e19e3011e9ac508cec4b8f5477',
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
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.antiTheft.getDevList(params).then(res => {
				res.data.lists.forEach(item => {
					item.btnArr = []
					if (item.devNodesList && item.devNodesList.length > 0) {
						item.devNodesList.forEach(element => {
							element.btnTitle = ''
							if (element.nodeType == 3 || (element.nodeType == 4 && element.vcValueDesc)) {
								item.ctrlNodeId = element.nodeId
								element.btnTitle = element.vcValueDesc.split(' ')[1]
								item.btnArr.push(element)
							}
							if (element.nodeType == 2) {
								item.fvalue = element.fvalue
							}
						})
					}
				})
				this.listData = res.data.lists
				this.getFirstVideo(this.listData)
			})
		},
		//获取第一条视频
		getFirstVideo(data) {
			for (let i = 0; i < data.length; i++) {
				if (data[i].devNodesList && data[i].devNodesList.length > 0 && !!data[i].devNodesList[0].vcParam1) {
					this.videoConfig.deviceInfo = data[i].devNodesList[0].vcParam1
					break
				}
			}
		},
		//获取流媒体服务
		getVideoServe() {
			this.$_api.antiTheft.getVideoServe().then(res => {
				if (res.code == 200 && res.data) {
					// this.videoConfig.serviceInfo = res.data.ServiceID
					this.videoConfig.serviceInfo = res.data.vc_Address
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
			if (
				this.devItem.devNodesList &&
				this.devItem.devNodesList.length > 0 &&
				!!this.devItem.devNodesList[0].vcParam1
			) {
				this.videoConfig.deviceInfo = this.devItem.devNodesList[0].vcParam1
			}
		},
		//弹窗取消
		handleCancel() {
		},
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
					if (msgData.cmd == 1001) {
						console.log(msgData)
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

  .right-list {
    width: 555px;
    margin-left: 10px;
    box-sizing: border-box;
    height: 100%;
    float: left;
    padding: 20px 50px 52px 0;

    ul {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-left: 10px;
      padding-top: 20px;
      background-color: rgba(12, 27, 58, 0.7);

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

          > span {
            font-size: 16px;
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
              color: #0ef6ff;
              background: url('../../assets/img/intelligent-lighting/btnBg.png');
              background-size: 100% 100%;
              cursor: pointer;
              height: 30px;
              line-height: 30px;
              padding: 0 10px;
              margin-bottom: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
