<template>
  <div class="arrester-monitor-htcustomization">
    <div class="top">
      <span v-for="(item, index) in htUrl"
            :key="index"
            :class="{switch: item.id == htSwitch }"
            @click="clickSwitch(item)">{{item.name}}</span>
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
	name: 'arrester-monitor-htcustomization',
	components: { charts },
	props: {},
	data() {
		return {
			htUrl: [
				{ id: 1, name: '1号主变', url: 'hzb1-blq' },
				{ id: 2, name: '2号主变', url: 'hzb2-blq' },
				{ id: 3, name: '3号主变', url: 'hzb3-blq' },
				{ id: 4, name: '线路', url: 'xianlu-blq' }
			],
			htSwitch: 1,
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
	computed: {},
	filters: {},
	watch: {
		htSwitch(newVal) {
			this.dataModel.clear()
			var el = this.$refs['arresterMonitorHt']

			var childs = el.childNodes
			for (var i = childs.length - 1; i >= 0; i--) {
				el.removeChild(childs[i])
			}
			this.init(this.htUrl[newVal - 1])
		}
	},
	created() {
		this.getDevList()
	},
	mounted() {
		// this.start()
		this.init(this.htUrl[0])

		this.topicStr = this.topicArr[0] + this.unitId
		console.log(this.topicStr)
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
	computed: {
		getunitId: function() {
			return this.$store.getters.unitId
		},
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		}
	},
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
					// console.log(res)
				}
			})
		},
		//点击事件
		clickSwitch(val) {
			this.htSwitch = val.id
		},
		init(val) {
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

			if (val.id != 4) {
				global.ht.Default.xhrLoad(`symbols/zf/${val.url}.json`, res => {
					let json = ht.Default.parse(res)
					dataModel.deserialize(json)
					graphView.fitContent(true)
				})
				
			} else {
				graphView.deserialize(`symbols/zf/${val.url}.json`, function(json, dm, gv, datas) {
					var validateHandler = function(e) {
						if (e.kind === 'validate') {
							var cWidth = graphView.getContentRect().width
							var vWidth = graphView.getView().clientWidth
							var zoom = vWidth / (cWidth * 1.11)

							graphView.setZoom(zoom)
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
			}

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
			this.historyModal = true
			let val = data.a('item')
			console.log(val)

			let index = val.devNodesList.findIndex(item => item.functionCode == functionCode)
			let list = val.devNodesList[index]
			this.nodeId = list.nodeId
			this.unit = list.vcUnit
			this.chartTitle = `${val.vcName}-${list.vcName}`
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
.arrester-monitor-htcustomization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 55px 25px 67px;

  .top {
    widows: 100%;
    height: 40px;

    >span {
      padding: 4px;
      border: 1px solid #0c79b9;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      margin-left: 10px;
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