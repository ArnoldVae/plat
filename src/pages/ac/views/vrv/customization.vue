<template>
	<div class="vrv-customization">
		<div class="vrv-item-wrap">
			<template v-for="(item, devIndex) in deviceData">
				<div :key="item.devId" class="vrv-item">
					<div class="vrv-item-content">
						<div class="header">
							<div class="left">
								<div class="status">
									<div :class="['icon-off', { 'icon-on': getStatus(item) }]"></div>
									<div :class="['name-off', { 'name-on': getStatus(item) }]">
										{{ getStatus(item) ? '开启' : '关闭' }}
									</div>
								</div>
								<div class="mode">
									<div :class="`${getMode(item)[0]}`"></div>
									<div class="name">{{ getMode(item)[1] }}</div>
								</div>
							</div>
							<div class="center">
								<div
									:class="['vrv-off', { 'vrv-on': getStatus(item) }]"
									@click="handleToggle(item, devIndex)"
								></div>
							</div>
							<div class="right">
								<div class="temp">
									<div class="icon"></div>
									<div class="name">{{ getTemperature(item) }}</div>
								</div>
								<div class="hum">
									<div class="icon"></div>
									<div class="name">{{ getHumidity(item) }}</div>
								</div>
							</div>
						</div>
						<div class="function">
							<div class="cool">
								<div class="icon"></div>
								<div class="fbtn-wrap">
									<el-scrollbar style="height:100%">
										<!-- :class="{current: coolId == citem.id}"  -->
										<div
											class="btn-item"
											v-for="(citem, index) in getFunList(item, '制冷')"
											:key="citem.id"
											@click="handleControlVRV(citem, item, devIndex)"
											:class="{ disabled: citem.disable }"
										>
											{{ citem.label }}
										</div>
									</el-scrollbar>
								</div>
							</div>
							<div class="heating">
								<div class="icon"></div>
								<div class="fbtn-wrap">
									<el-scrollbar style="height:100%">
										<div
											class="btn-item"
											v-for="(citem, index) in getFunList(item, '制热')"
											:key="citem.id"
											@click="handleControlVRV(citem, item, devIndex)"
											:class="{ disabled: citem.disable }"
										>
											{{ citem.label }}
										</div>
									</el-scrollbar>
								</div>
							</div>
							<div class="dehumidify">
								<div class="icon"></div>
								<div class="fbtn-wrap">
									<el-scrollbar style="height:100%">
										<div
											class="btn-item"
											v-for="(citem, index) in getFunList(item, '除湿')"
											:key="citem.id"
											@click="handleControlVRV(citem, item, devIndex)"
											:class="{ disabled: citem.disable }"
										>
											{{ citem.label }}
										</div>
									</el-scrollbar>
								</div>
							</div>
						</div>
					</div>
					<div class="vrv-item-name">{{ item.vcName }}</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'vrv-customization',
	components: {},
	props: {},
	data() {
		return {
			// 设备信息相关
			deviceData: [],
			coolId: '',
			vrvIsOn: false,
			guidList: ['111222', '333444', '555666']
		}
	},
	computed: {
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		},
		modeCls() {
			return [
				'vrv-off',
				{
					'vrv-on': this.vrvIsOn
				}
			]
		}
	},
	filters: {},
	watch: {},
	created() {
		// this.getNodesInfo()
		this.getDeviceInfo()
	},
	mounted() {
		this.listenMqttMessage()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 监听消息
		listenMqttMessage() {
			this.$_listen(this.$options.name, (topic, message, packet) => {
				// 数据转换
				let oMessage = JSON.parse(message.toString())
				// 实时数据
				if (oMessage.cmd == '1001' && oMessage.unitid == this.$store.getters.unitId) {
					console.log('空调-实时数据', oMessage)
					// 处理空调实时消息
					this.handleRealMessage(oMessage)
				}
				// 实时结果
				if (oMessage.cmd == '1004' && this.guidList.indexOf(oMessage.serial) != -1) {
					console.log('空调-实时结果', oMessage)
					// 处理控制结果解析
					this.handleRealResult(oMessage)
				}

				// 报警数据
			})
		},
		// 实时数据
		handleRealMessage(msg) {
			// let targetDevice = {}
			this.deviceData.forEach(device => {
				// console.log(msg.devid)
				// console.log(device.devId)
				// console.log(msg.devid == device.devId)
				if (msg.devid == device.devId) {
					device.devNodesList.forEach(node => {
						// console.log(node.nodeId)
						// console.log(msg.nodeid)
						// console.log(node.nodeId == msg.nodeid)
						if (node.nodeId == msg.nodeid) {
							node.fvalue = msg.value
							node.desc = msg.desc
							// console.log(node.fvalue)
							// console.log(node.desc)
							// console.log(this.deviceData)
						}
					})
				}
			})
		},
		// 实时结果
		handleRealResult(msg) {
			if (msg.result == '1') {
				this.$ocxMessage.info('操作成功')
			} else {
				this.$ocxMessage.info('操作失败')
			}
			let guidIndex = this.guidList.findIndex(item => {
				return item == msg.serial
			})
			// 清除guid标识
			this.guidList.splice(guidIndex, 1)
		},
		// 获取温度信息
		getTemperature(vrv) {
			let temperature = ''
			vrv.devNodesList.map(item => {
				if (item.functionCode == '1016.0008') {
					temperature = item.desc
				}
			})
			return temperature
		},
		// 获取湿度信息
		getHumidity(vrv) {
			let humidity = ''
			vrv.devNodesList.map(item => {
				if (item.functionCode == '1016.0009') {
					humidity = item.desc
				}
			})
			return humidity
		},
		// 获取功能列表
		getFunList(vrv, text) {
			let descInfo = ''
			let nodeInfo = {}
			vrv.devNodesList.map(item => {
				if (item.vcName.indexOf(text) != -1 && item.vcValueDesc != '') {
					;(descInfo = item.vcValueDesc), (nodeInfo = item)
				}
			})
			let fValueList = []
			if (descInfo) {
				let arr = descInfo.split('|') || []
				for (var i = 0; i < arr.length; i++) {
					let key = arr[i].split(' ')[0]
					let label = arr[i].split(' ')[1]
					fValueList.push({
						value: key,
						label: label,
						// id: 'cool-' + Math.random().toString(16).substr(2, 8),
						id: 'cool-' + nodeInfo.devId + i,
						nodeInfo,
						disable: false
					})
				}
			}
			// console.log(fValueList)
			let temp = [
				{
					id: 1,
					label: '16℃',
					value: 1,
					nodeInfo: {},
					disable: true
				},
				{
					id: 2,
					label: '18℃',
					value: 2,
					nodeInfo: {},
					disable: true
				},
				{
					id: 3,
					label: '20℃',
					value: 3,
					nodeInfo: {},
					disable: true
				},
				{
					id: 4,
					label: '22℃',
					value: 4,
					nodeInfo: {},
					disable: true
				},
				{
					id: 5,
					label: '24℃',
					value: 5,
					nodeInfo: {},
					disable: true
				},
				{
					id: 6,
					label: '26℃',
					value: 6,
					nodeInfo: {},
					disable: true
				}
			]
			if (fValueList.length == 0) {
				return temp
			} else {
				return fValueList
			}
		},
		// 获取空调状态信息
		getStatus(vrv) {
			let status = false
			let statusCode = null
			vrv.devNodesList.map(item => {
				if (item.functionCode == '1016.0004') {
					statusCode = item.fvalue
				}
			})

			// console.log(statusCode)

			if (statusCode == 1) {
				return true
			} else {
				return false
			}
		},
		// 控制空调开关
		handleToggle(devInfo, index) {
			// console.log(devInfo)
			let nodeIndex = devInfo.devNodesList.findIndex(item => {
				return item.functionCode == '1016.0001'
			})
			if (nodeIndex == -1) {
				return
			}
			// this.$set(this.deviceData[2]['devNodesList'][1], 'fvalue', 1)
			let sendVal = ''
			if (this.deviceData[index]['devNodesList'][nodeIndex]['fvalue'] != 1) {
				sendVal = '1'
				// 只要提示，不要主动触发，状态走模型统一
				// this.$set(this.deviceData[index]['devNodesList'][nodeIndex], 'fvalue', 1)
			} else {
				sendVal = '0'
				// this.$set(this.deviceData[index]['devNodesList'][nodeIndex], 'fvalue', 0)
			}

			function guid() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (Math.random() * 16) | 0,
						v = c == 'x' ? r : (r & 0x3) | 0x8
					return v.toString(16)
				})
			}
			let currentGuid = guid()
			// 智辅 mqtt 控制命令报文
			let message = {
				cmd: 1003,
				type: 'req',
				srcid: '',
				serial: currentGuid,
				time: parseInt(new Date().getTime() / 1000),
				nodes: [
					{
						devid: devInfo.devId,
						nodeid: this.deviceData[index]['devNodesList'][nodeIndex]['nodeId'],
						value: sendVal
					}
				]
			}
			console.log('下发数据', message)
			// console.log(`qif/zf/app/control/${this.$store.getters.unitId}`)
			this.$_mqtt.publish(`qif/zf/app/control/${this.$store.getters.unitId}`, JSON.stringify(message), {
				qos: 0,
				retain: false
			})
			// 追加标识id
			this.guidList.push(currentGuid)

			// this.vrvIsOn = !this.vrvIsOn
		},
		// 获取空调当前模式
		getMode(vrv) {
			let mode = ''
			let statusCode = null
			vrv.devNodesList.map(item => {
				if (item.functionCode == '1016.0002') {
					statusCode = item.fvalue
				}
			})

			if (statusCode == 0) {
				return ['mode-cool', '制冷']
			} else if (statusCode == 1) {
				return ['mode-heating', '制热']
			} else if (statusCode == 2) {
				return ['', '通风']
			} else if (statusCode == 3) {
				return ['mode-dehumidify', '除湿']
			} else if (statusCode == 4) {
				return ['', '自动']
			} else {
				return ['', '未知']
			}
		},
		// 控制空调功能
		handleControlVRV(nodeInfo, devInfo, devIndex) {
			// console.log(nodeInfo)
			if (nodeInfo.disable) return
			// console.log(nodeInfo)
			// console.log(devInfo)
			// console.log(devIndex)
			// this.coolId = nodeInfo.id
			/*let nodeIndex = devInfo.devNodesList.findIndex( item => {
				return item.functionCode == '1016.0002'
			})
			if (nodeIndex == -1) {
				return 
			}
			if (nodeInfo.nodeInfo.vcName.indexOf('制冷') != -1) {
				this.$set(this.deviceData[devIndex]['devNodesList'][nodeIndex], 'fvalue', 0)
			} else if (nodeInfo.nodeInfo.vcName.indexOf('制热') != -1) {
				this.$set(this.deviceData[devIndex]['devNodesList'][nodeIndex], 'fvalue', 1)
			} else if (nodeInfo.nodeInfo.vcName.indexOf('除湿') != -1) {
				this.$set(this.deviceData[devIndex]['devNodesList'][nodeIndex], 'fvalue', 3)
			} else {
				this.$set(this.deviceData[devIndex]['devNodesList'][nodeIndex], 'fvalue', 4)
			}*/
			function guid() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (Math.random() * 16) | 0,
						v = c == 'x' ? r : (r & 0x3) | 0x8
					return v.toString(16)
				})
			}
			let currentGuid = guid()
			// 智辅 mqtt 控制命令报文
			let message = {
				cmd: 1003,
				type: 'req',
				srcid: '',
				serial: currentGuid,
				time: parseInt(new Date().getTime() / 1000),
				nodes: [
					{
						devid: devInfo.devId,
						nodeid: nodeInfo.nodeInfo.nodeId,
						value: nodeInfo.value
					}
				]
			}
			console.log('空调按钮命令', message)
			this.$_mqtt.publish(`qif/zf/app/control/${this.$store.getters.unitId}`, JSON.stringify(message), {
				qos: 0,
				retain: false
			})
			// 追加标识id
			this.guidList.push(currentGuid)
		},
		// 获取节点信息
		async getNodesInfo() {
			let result = await this.$_api.frame.getNodesInfo({
				unitId: this.$store.getters.unitId,
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				findFlag: 0
			})
			// console.log('空调设备', result)
			if (result.success) {
				// this.deviceData = result.data.lists
			} else {
				// this.deviceData = []
			}
		},
		// 获取设备信息
		async getDeviceInfo() {
			let result = await this.$_api.frame.getDeviceInfo({
				unitId: this.$store.getters.unitId,
				devTypeId: this.activeDeviceTypeId,
				isPage: 0,
				isFindNodes: 1
			})

			if (result.success) {
				this.deviceData = result.data.lists
				console.log('空调设备信息', this.deviceData)
			} else {
				this.deviceData = []
			}
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
.vrv-customization {
	width: 1590px;
	height: 100%;
	background: url('~@/assets/img/common/bg-border.png') no-repeat;
	background-size: 1590px 100%;
	/* padding: 30px 52px; */
	/* overflow: auto; */
	overflow: hidden;

	.vrv-item-wrap {
		width: 1490px;
		height: 630px;
		margin: 30px 52px;
		overflow: auto;

		display: flex;
		flex-wrap: wrap;

		.vrv-item {
			width: 220px;
			height: 380px;
			/* background: url('~@ac/assets/img/vrv/bg.png') no-repeat; */
			/* background-size: 215px 380px; */
			/* background: #0af; */
			margin: 0 12px;
			/* margin-bottom: 20px; */

			.vrv-item-content {
				width: 220px;
				height: 334px;
				background: url('~@ac/assets/img/vrv/bg.png') no-repeat;
				background-size: 220px 334px;

				.header {
					width: 220px;
					height: 132px;
					/* background: #0af; */
					padding-top: 22px;
					display: flex;
					color: #fff;

					.left {
						width: 67px;
						height: 109px;

						.status {
							margin-top: 20px;
							display: flex;
							padding-left: 10px;

							.icon-off {
								width: 17px;
								height: 17px;
								background: url('~@ac/assets/img/vrv/status-off.png') no-repeat;
								background-size: 17px 17px;
								margin-right: 5px;
							}

							.icon-on {
								width: 17px;
								height: 17px;
								background: url('~@ac/assets/img/vrv/status-on.png') no-repeat;
								background-size: 17px 17px;
								margin-right: 5px;
							}

							.name-off {
								color: #096ba5;
							}

							.name-on {
								color: #ffff00;
							}
						}

						.mode {
							margin-top: 8px;
							display: flex;
							padding-left: 9px;

							.mode-cool {
								width: 18px;
								height: 18px;
								background: url('~@ac/assets/img/vrv/mode-cool.png') no-repeat;
								background-size: 18px 18px;
								margin-right: 5px;
							}

							.mode-heating {
								width: 18px;
								height: 18px;
								background: url('~@ac/assets/img/vrv/mode-heating.png') no-repeat;
								background-size: 18px 18px;
								margin-right: 5px;
							}

							.mode-dehumidify {
								width: 18px;
								height: 18px;
								background: url('~@ac/assets/img/vrv/mode-dehumidify.png') no-repeat;
								background-size: 18px 18px;
								margin-right: 5px;
							}

							.name {
								color: #fff;
							}
						}
					}

					.center {
						width: 83px;
						height: 109px;

						&:active {
							position: relative;
							top: 1px;
							left: 1px;
						}

						.vrv-off {
							width: 83px;
							height: 84px;
							background: url('~@ac/assets/img/vrv/off.png') no-repeat;
							background-size: 83px 84px;
							cursor: pointer;
							border-radius: 50%;
						}

						.vrv-on {
							width: 83px;
							height: 84px;
							background: url('~@ac/assets/img/vrv/on.png') no-repeat;
							background-size: 83px 84px;
							cursor: pointer;
							border-radius: 50%;
						}
					}

					.right {
						width: 73px;
						height: 109px;

						.temp {
							margin-top: 18px;
							display: flex;
							padding-left: 7px;

							.icon {
								width: 13px;
								height: 22px;
								background: url('~@ac/assets/img/vrv/temp.png') no-repeat;
								background-size: 13px 22px;
								margin-right: 5px;
							}

							.name {
								color: #fff;
								position: relative;
								top: 2px;
							}
						}

						.hum {
							margin-top: 10px;
							display: flex;
							padding-left: 6px;

							.icon {
								width: 15px;
								height: 18px;
								background: url('~@ac/assets/img/vrv/hum.png') no-repeat;
								background-size: 15px 18px;
								margin-right: 5px;
							}

							.name {
								color: #fff;
								/* position: relative; */
								/* top: 2px; */
							}
						}
					}
				}

				.function{

					.cool {
						width: 100%;
						padding: 0 15px;
						padding-right: 9px;
						height: 47px;
						/* background: #0af; */
						display: flex;

						.icon {
							width: 45px;
							height: 45px;
							background: url('~@ac/assets/img/vrv/cool.png') no-repeat;
							background-size: 45px 45px;
							margin-left: 1px;
							margin-top: 1px;
						}

						.fbtn-wrap {
							padding-left: 7px;
							width: 142px;
							height: 47px;
							/* background: #fa0; */
							/* display: flex; */
							/* flex-wrap: wrap; */
							/* overflow: auto; */
							/deep/ .el-scrollbar {
								/deep/ .el-scrollbar__wrap {
									overflow-x: hidden !important;
								}
							}

							/deep/ .el-scrollbar__wrap {
								overflow-y: scroll !important;
							}

							/deep/ .el-scrollbar__thumb {
								background-color: #2cbfdf !important;
								&:hover {
									background-color: #2cbfdf !important;
								}
							}

							/deep/ .el-scrollbar__view {
								display: flex;
								flex-wrap: wrap;
							}

							.btn-item {
								width: 60px;
								height: 22px;
								margin-right: 3px;
								margin-bottom: 3px;
								background: #2cbfdf;
								border-radius: 3px;
								position: relative;

								display: flex;
								justify-content: center;
								align-items: center;
								color: #fff;
								cursor: pointer;

								&.current {
									background: #fa0;
								}

								&:hover {
									background: #219eb9;
								}

								&:active {
									top: 1px;
									left: 1px;
								}

								&.disabled {
									background: #8e8787;
									top: 0px;
									left: 0px;
								}
							}
						}
					}

					.heating {
						margin-top: 20px;
						width: 100%;
						padding: 0 15px;
						padding-right: 9px;
						height: 47px;
						/* background: #0af; */
						display: flex;

						.icon {
							width: 45px;
							height: 45px;
							background: url('~@ac/assets/img/vrv/heating.png') no-repeat;
							background-size: 45px 45px;
							margin-left: 1px;
							margin-top: 1px;
						}

						.fbtn-wrap {
							padding-left: 7px;
							width: 142px;
							height: 47px;
							/* background: #fa0; */
							/* display: flex; */
							/* flex-wrap: wrap; */
							/* overflow: auto; */

							/deep/ .el-scrollbar {
								/deep/ .el-scrollbar__wrap {
									overflow-x: hidden !important;
								}
							}

							/deep/ .el-scrollbar__wrap {
								overflow-y: scroll !important;
							}

							/deep/ .el-scrollbar__thumb {
								background-color: #2cbfdf !important;
								&:hover {
									background-color: #2cbfdf !important;
								}
							}

							/deep/ .el-scrollbar__view {
								display: flex;
								flex-wrap: wrap;
							}

							.btn-item {
								width: 60px;
								height: 22px;
								margin-right: 3px;
								margin-bottom: 3px;
								background: #2cbfdf;
								border-radius: 3px;
								position: relative;

								display: flex;
								justify-content: center;
								align-items: center;
								color: #fff;
								cursor: pointer;

								&.current {
									background: #fa0;
								}

								&:hover {
									background: #219eb9;
								}

								&:active {
									top: 1px;
									left: 1px;
								}

								&.disabled {
									background: #8e8787;
									top: 0px;
									left: 0px;
								}
							}
						}
					}

					.dehumidify {
						margin-top: 20px;
						width: 100%;
						padding: 0 15px;
						padding-right: 9px;
						height: 47px;
						/* background: #0af; */
						display: flex;

						.icon {
							width: 45px;
							height: 45px;
							background: url('~@ac/assets/img/vrv/dehumidify.png') no-repeat;
							background-size: 45px 45px;
							margin-left: 1px;
							margin-top: 1px;
						}

						.fbtn-wrap {
							padding-left: 7px;
							width: 142px;
							height: 47px;
							/* background: #fa0; */
							/* display: flex; */
							/* flex-wrap: wrap; */
							/* overflow: auto; */

							/deep/ .el-scrollbar {
								/deep/ .el-scrollbar__wrap {
									overflow-x: hidden !important;
								}
							}

							/deep/ .el-scrollbar__wrap {
								overflow-y: scroll !important;
							}

							/deep/ .el-scrollbar__thumb {
								background-color: #2cbfdf !important;
								&:hover {
									background-color: #2cbfdf !important;
								}
							}

							/deep/ .el-scrollbar__view {
								display: flex;
								flex-wrap: wrap;
							}

							.btn-item {
								width: 60px;
								height: 22px;
								margin-right: 3px;
								margin-bottom: 3px;
								background: #2cbfdf;
								border-radius: 3px;
								position: relative;

								display: flex;
								justify-content: center;
								align-items: center;
								color: #fff;
								cursor: pointer;


								&.current {
									background: #fa0;
								}

								&:hover {
									background: #219eb9;
								}

								&:active {
									top: 1px;
									left: 1px;
								}

								&.disabled {
									background: #8e8787;
									top: 0px;
									left: 0px;
								}
							}
						}
					}
				}
			}

			.vrv-item-name {
				display: flex;
				justify-content: center;
				margin-top: 10px;
				font-size: 16px;
				color: #fff;
			}
		}
	}

}
</style>
