<template>
	<div ref="blueprint" class="mc-blueprint"></div>
</template>
<script>
export default {
	name: 'mc-blueprint',
	props: {
		blueprintUrl: {
			type: String
		},
		blueprintObj: {
			type: Object
		},
		primitiveNodes: {
			type: Array
		},
		mqttData: {
			type: Object
		},
		unitId: {
			type: String
		}
	},
	data() {
		return {
			axios: this.$_api.monitorData,
			localHt: null,
			dataModel: null,
			graphView: null,
			deviceid: '',
			iHeight: '',
			iWidth: ''
		}
	},
	created() {},
	mounted() {
		this.init()
	},
	watch: {
		blueprintUrl(url) {
			this.dataModel.clear()

			var el = this.$refs['blueprint']
			var childs = el.childNodes
			for (var i = childs.length - 1; i >= 0; i--) {
				el.removeChild(childs[i])
			}
			this.init()
		},
		primitiveNodes: {
			handler: function(val, oldVal) {
				this.getNode()
			},
			deep: true
		},
		mqttData(data) {
			if (data.cmd == 2103) {
				this.deviceid = data.taskfrate.deviceid
				let tag = global.dataModel.getDataByTag(this.deviceid)
				//给图元添加下方文字
				if (tag != undefined) {
					tag.setStyle('label', tag._name)
					tag.setStyle('label.color', '#fff')
					// tag.setStyle('label.font', '10px sans-serif')
					tag.setStyle('label.position', 31)
					tag.setStyle('label.toggleable', false)
					//添加动画
					this.animation()
				}
			} else if (data.cmd == 2104) {
				if (this.deviceid != '') {
					let tag = global.dataModel.getDataByTag(this.deviceid)
					if (tag != undefined) {
						//删除图元下方文字
						tag.setStyle('label', null)
						//删除动画
						tag.setAnimation(null)
						//重置图元宽高
						tag._width = this.iWidth
						tag._height = this.iHeight
					}
				}
			}
		}
	},
	methods: {
		init() {
			let localHt = (this.localHt = global.ht)
			let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))

			let dom = this.$refs['blueprint']
			graphView.addToDOM(dom)

			dataModel.enableAnimation() //启用动画

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
			if (!this.blueprintUrl.length) return
			if (process.env.NODE_ENV == 'production') {
				var http = `${$_production.request.location}/${$_production.request.javaModule}${this.blueprintUrl}`
			}
			if (process.env.NODE_ENV == 'development') {
				var http = `${$_development.request.location}/${$_development.request.javaModule}${this.blueprintUrl}`
			}

			ht.Default.xhrLoad(http, res => {
				let json = ht.Default.parse(res)
				dataModel.deserialize(json)
				graphView.fitContent(true)
			})

			graphView.addInteractorListener(e => {
				let eType = e.kind,
					eData = e.data,
					part = e.part,
					event = e.event
				//判断当前节点是否有动画
				if (eData && !eData._animation) {
					if (eType == 'onEnter') {
						if (e.data.a('vc_SourceID')) {
							//添加图元下文字
							eData.setStyle('label', eData._name)
							eData.setStyle('label.color', '#fff')
							// eData.setStyle('label.font', '10px sans-serif')
							eData.setStyle('label.position', 31)
							eData.setStyle('label.toggleable', false)
						}
					}
					if (eType == 'onLeave') {
						if (e.data.a('vc_SourceID')) {
							//删除图元下文字
							eData.setStyle('label', null)
						}
					}
				}

				if (eData && eData._animation) {
					if (eType == 'clickData') {
						if (e.data.a('vc_SourceID')) {
							let targetTag = eData.getTag()
							this.$emit('getDevId', targetTag)
						}
					}
				}
			})

			this.getNode()
		},

		getNode() {
			let params = {
				pageId: this.blueprintObj.pageId,
				unitId: this.unitId
			}
			this.axios.getMCFind(params).then(res => {
				if (res.code == 200) {
					let primitiveNodes = res.data

					primitiveNodes.length &&
						primitiveNodes.map(item => {
							setTimeout(() => {
								let node = new this.localHt.Node()
								node.setImage(item.vcPath)
								// node.setImage('./ht/drawingList/SF6.json')
								node.setTag(item.vcSourceId)
								node.setId(item.vcSourceId)
								node.setPosition(parseFloat(item.fPageX), parseFloat(item.fPageY))
								node.setName(item.vcName)
								node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
								node.setStyle('interactive', true)
								node.a('vc_SourceID', item.vcSourceId)
								node.a('vc_Path', item.vcPath)
								node.a('i_NodeType', item.iNodeType)
								node.a('pageId', this.pageId)
								node.a('sort', item.iOrder)
								node.a('iParam1', item.iParam1)
								node.a('iParam2', item.iParam2)
								node.a('iParam3', item.iParam3)
								node.setLayer(1)
								node.s('label', '')
								this.dataModel.add(node)

								// let blinkTask = {
								// 	interval: 300,
								// 	action: function(data) {
								// 		// console.log(data.a('alarmLevel'));
								// 		if (data.a('alarmLevel') > 0) {
								// 			data.a('blink.visible', !data.a('blink.visible'))
								// 		} else {
								// 			data.a('blink.visible', false)
								// 		}
								// 	}
								// }
								// this.dataModel.addScheduleTask(blinkTask)
							}, 1000)
						})
				}
			})
		},
		animation() {
			// 动画
			//===========================================================================================
			let tag = global.dataModel.getDataByTag(this.deviceid)

			let iWidth = (this.iWidth = tag._width)
			let iHeight = (this.iHeight = tag._height)

			tag.setAnimation({
				repeat: 3,
				//大小
				expandWidth: {
					property: 'width',
					from: iWidth,
					to: iWidth * 2,
					next: 'collapseWidth'
				},
				collapseWidth: {
					property: 'width',
					from: iWidth * 2,
					to: iWidth,
					next: 'expandWidth'
				},
				expandHeight: {
					property: 'height',
					from: iHeight,
					to: iHeight * 2,
					next: 'collapseHeight'
				},
				collapseHeight: {
					property: 'height',
					from: iHeight * 2,
					to: iHeight,
					next: 'expandHeight'
				},
				start: ['expandWidth', 'expandHeight']
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.mc-blueprint {
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
