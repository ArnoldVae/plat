<template>
  <div class="view-ht-web">
    <div class="top"
         v-if="htUrl.length > 1">
      <span v-for="(item, index) in htUrl"
            :key="index"
            :class="{switch: item.pageId == htSwitch }"
            @click="clickSwitch(item)">{{item.vcName}}</span>
    </div>
    <div id="arresterMonitorHt"
         class="arresterMonitorHt"
         ref="arresterMonitorHt"></div>
    <charts v-model="historyModal"
            :node-id="nodeId"
            :sub-title="chartTitle"
            :unit="unit"></charts>
  </div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import charts from '../main-oil/charts-modal'
import { log } from 'util'
import { setTimeout } from 'timers'
import { constants } from 'crypto'
export default {
	name: 'view-ht-web',
	components: { charts },
	props: {},
	data() {
		return {
			htUrl: [
				// { id: 1, name: '一号主变', url: '1号主变' },
				// { id: 2, name: '二号主变', url: '2号主变' },
				// { id: 3, name: '三号主变', url: '3号主变' },
				// { id: 4, name: '线路', url: '线路' }
			],
			htSwitch: '',
			localHt: null,
			dataModel: null,
			graphView: null,
			unitId: this.$store.getters.unitId,
			mainDevList: [],
			historyModal: false,
			chartTitle: '',
			nodeId: '',
			unit: '',
			topicStr: '',
			topicArr: ['qif/zf/app/']
		}
	},
	filters: {},
	computed: {
		getunitId: function() {
			return this.$store.getters.unitId
		},
		activeDeviceType() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		},
		activeTypeMapList() {
			return findComponentUpward(this, 'intelligent').deviceTypeMapList
		},
		activeTypeMapLists() {
			return findComponentUpward(this, 'intelligent').currentModeInfo
		}
	},
	watch: {
		htSwitch(newVal) {
			this.dataModel.clear()
			var el = this.$refs['arresterMonitorHt']

			var childs = el.childNodes
			for (var i = childs.length - 1; i >= 0; i--) {
				el.removeChild(childs[i])
			}
			let index = this.htUrl.findIndex(item => item.pageId == newVal)
			this.init(this.htUrl[index])
		},
		activeDeviceType: {
			handler(val) {
				// console.log('activeDeviceTypeId', val)
				this.getDevList()
				this.getDisplay(val)
			},
			immediate: true
		}
	},
	created() {
		// this.getDevList()
	},
	mounted() {
		// this.getList()

		this.topicStr = this.topicArr[0] + this.unitId
		//实时数据回调
		const _this = this
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				//将json字符串转为数组
				let msgData = JSON.parse(message.toString())

				if (msgData.cmd == 1001 && msgData.unitid == this.$store.getters.unitId) {
					let tag = this.dataModel.getDataByTag(msgData.devid)
					if (tag != undefined) {
						tag.a(msgData.functionCode, msgData.value ? msgData.value : 0)
					}
				}
			}
		})
	},
	activited() {},
	update() {},
	beforeDestory() {},

	methods: {
		async getDisplay(id) {
			try {
				let result = await this.$_api.frame.getDisplayModeBytypeId({
					devTypeName: '',
					devTypeId: id
				})
				if (result.success) {
					// console.log(result)
					// return result.data.lists[0] || []
					this.getList(result.data.lists[0])
				}
			} catch (e) {
				// return {}
				this.$ocxMessage.error(`${e}`)
			}
		},

		//获取图纸列表信息
		getList(val) {
			if (val.devTypeShowModes == undefined || val.devTypeShowModes == null) {
				this.$ocxMessage.error('数据丢失！！！')
				return
			}
			let index = val.devTypeShowModes.findIndex(item => item.icon == 'picture')
			if (index != -1) {
				let data = val.devTypeShowModes[index]
				// console.log('data', data)
				let iSubType
				if (data.iParam1 != null) {
					iSubType = data.iParam1
				} else {
					this.$ocxMessage.error('请配置参数！！！')
				}

				//获取图纸信息
				let params = {
					unitId: this.unitId,
					iSubType
				}
				this.$_api.humiture.getHtDrawing(params).then(res => {
					if (res.code == 200) {
						this.list = res.data
						if (res.data.length) {
							this.htUrl = res.data
							// this.blueprintObj = res.data[0]
							// this.blueprintUrl = res.data[0].vcUrl
							this.htSwitch = res.data[0].pageId

							this.init(this.htUrl[0])
						}
					}
				})
			}
		},
		//获取设备列表
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceType,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.humiture.getDevList(params).then(res => {
				if (res.code == 200 && res.data) {
					this.mainDevList = JSON.parse(JSON.stringify(res.data.lists))
					// console.log(res)
				}
			})
		},
		//点击事件
		clickSwitch(val) {
			if (this.htSwitch != val.pageId) {
				this.htSwitch = val.pageId
			}
		},
		init(dataList) {
			// let dataModel = this.dataModel
			// let graphView = this.graphView

			let localHt = (this.localHt = global.ht)
			let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))

			let dom = this.$refs['arresterMonitorHt']
			graphView.addToDOM(dom)

			dataModel.enableAnimation() //启用动画

			let _this = this
			//ht添加的点击事件的接收函数
			global.htModel = function(data, functionCode) {
				_this.chartsModal(data, functionCode)
			}

			//监听窗口大小变化
			window.addEventListener('resize', e => {
				graphView.fitContent(false)
			})

			//设置图元选中时 边框的宽度
			graphView.getSelectWidth = function(data) {
				return 0
			}
			//图元移动时的回调
			graphView.setMovableFunc(data => {
				// console.log("移动" + data);
				return false
			})

			// if (dataList.vcName.search('线路') == -1) {
			// 	this.$_api.humiture
			// 		.getHtControl(dataList.vcUrl)
			// 		.then(res => {
			// 			let json = ht.Default.parse(res)
			// 			dataModel.deserialize(json)
			// 			graphView.fitContent(true, 0)
			// 			return
			// 		})
			// 		.catch(err => {
			// 			this.$ocxMessage.error('图纸丢失！！！')
			// 			this.disTable()
			// 			return
			// 		})

			// } else {
			this.$_api.humiture
				.getHtControl(dataList.vcUrl)
				.then(res => {
					graphView.deserialize(res, function(json, dm, gv, datas) {
						var validateHandler = function(e) {
							if (e.kind === 'validate') {
								var cWidth = graphView.getContentRect().width
								var vWidth = graphView.getView().clientWidth
								var zoom = vWidth / (cWidth * 1)

								graphView.setZoom(zoom)
								// graphView.adjustZoom(zom)
								graphView.adjustTranslateX()
								// graphView.tx(-160)
								// graphView.ty(-85)
								graphView.tx(0)
								graphView.ty(0)
								graphView.adjustZoom = function() {
									return zoom
								}
								graphView.removeViewListener(validateHandler)
								graphView.iv()
							}
						}

						graphView.addViewListener(validateHandler)
					})

					let scrollFunc = function(e) {
						e = e || window.event
						if (e.wheelDelta) {
							//判断浏览器IE，谷歌滑轮事件
							if (e.wheelDelta > 0) {
								//当滑轮向上滚动时
								let zoom = graphView.getZoom()
								graphView.setTranslateY(graphView.getTranslateY() + e.wheelDelta * zoom)
							}
							if (e.wheelDelta < 0) {
								//当滑轮向下滚动时
								let zoom = graphView.getZoom()
								graphView.setTranslateY(graphView.getTranslateY() + e.wheelDelta * zoom)
							}
						} else if (e.detail) {
							//Firefox滑轮事件
							if (e.detail > 0) {
								//当滑轮向下滚动时
								let zoom = graphView.getZoom()
								graphView.setTranslateY(graphView.getTranslateY() + e.wheelDelta * zoom)
							}
							if (e.detail < 0) {
								//当滑轮向上滚动时
								let zoom = graphView.getZoom()
								graphView.setTranslateY(graphView.getTranslateY() + e.wheelDelta * zoom)
							}
						}
					}
					/*IE、Opera注册事件*/
					if (document.attachEvent) {
						document.attachEvent('onmousewheel', scrollFunc)
					}
					//Firefox使用addEventListener添加滚轮事件
					if (document.addEventListener) {
						//firefox
						document.addEventListener('DOMMouseScroll', scrollFunc, false)
					}
					//Safari与Chrome属于同一类型
					window.onmousewheel = document.onmousewheel = scrollFunc
				})
				.catch(err => {
					this.$ocxMessage.error('图纸丢失！！！')
					this.disTable()
					return
				})
			// }

			// graphView.mi(e => {
			// 	let eType = e.kind,
			// 		eData = e.data,
			// 		part = e.part,
			// 		event = e.event
			// 		if(eType == 'onClick'){
			// 			console.log(e);
			// 		}

			// })
			setTimeout(() => {
				if (this.mainDevList.length == 0) {
					let params = {
						devTypeId: this.activeDeviceTypeId,
						isPage: 1,
						isFindNodes: 1,
						unitId: this.unitId
					}
					this.$_api.humiture.getDevList(params).then(res => {
						if (res.code == 200 && res.data) {
							this.mainDevList = JSON.parse(JSON.stringify(res.data.lists))
							// console.log(res)
							if (res.data.lists.length) {
								for (let i = 0; i < res.data.lists.length; i++) {
									let item = res.data.lists[i]
									let tag = dataModel.getDataByTag(item.devId)
									if (tag != undefined) {
										for (let j = 0; j < item.devNodesList.length; j++) {
											tag.a(
												item.devNodesList[j].functionCode,
												item.devNodesList[j].fvalue ? item.devNodesList[j].fvalue : 0
											)
										}
										tag.a('item', item)
									}

									// console.log(tag)
								}
							}
						}
					})
				} else {
					if (this.mainDevList.length) {
						for (let i = 0; i < this.mainDevList.length; i++) {
							let item = this.mainDevList[i]
							let tag = dataModel.getDataByTag(item.devId)
							if (tag != undefined) {
								for (let j = 0; j < item.devNodesList.length; j++) {
									tag.a(
										item.devNodesList[j].functionCode,
										item.devNodesList[j].fvalue ? item.devNodesList[j].fvalue : 0
									)
								}
								tag.a('item', item)
							}
						}
					}
				}
			}, 500)
		},
		chartsModal(data, functionCode) {
			let val = data.a('item')
			if (val != undefined) {
				let index = val.devNodesList.findIndex(item => item.functionCode == functionCode)
				if (index != -1) {
					let list = val.devNodesList[index]
					this.historyModal = true
					this.nodeId = list.nodeId
					this.unit = list.vcUnit
					this.chartTitle = `${val.vcName}-${list.vcName}`
				} else {
					this.$ocxMessage.error('数据丢失！！！')
				}
			} else {
				this.$ocxMessage.error('数据丢失！！！')
			}
		},
		// 展示表格类型
		disTable() {
			let result = this.getDisplayModeBytypeId(this.activeDeviceTypeId)
			let index = result.findIndex(item => item.name == 'table')
			setTimeout(() => {
				findComponentUpward(this, 'intelligent').handleChangeDisplayMode(result[index], index)
			}, 300)
		},
		// 根据typeId查询显示类型
		getDisplayModeBytypeId(id) {
			let modeList = []
			this.activeTypeMapList.forEach(item => {
				if (item.typeId == id) {
					modeList = item.mode
				}
			})
			return modeList
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
.view-ht-web {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px 50px 25px 50px;

  .top {
    widows: 100%;
    height: 40px;

    >span {
      padding: 4px;
      border: 1px solid #0c79b9;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      margin-right: 8px;
    }

    .switch {
      color: #ffd36a;
    }
  }

  .arresterMonitorHt {
    position: relative;
    widows: 100%;
    height: calc(100% - 40px);
  }
}
</style>