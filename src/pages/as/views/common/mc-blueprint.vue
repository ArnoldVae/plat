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
				aaa: ''
			}
		},
		created() {},
		mounted() {
			this.init()
		},
		watch: {
			aaa(val) {
				console.log(val)
			},
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
			mqttData(val) {
				
				console.log(val)
				let tag = global.dataModel.getDataByTag(val.nodeid)
				console.log(tag)
				tag.a('alarmLevel', val.level)
	
	
				if (val.level == '1') {
					this.aaa = val.nodeid
	
					// this.animation()
				} else {
					if (this.aaa != '') {
						// let tag = global.dataModel.getDataByTag(this.aaa)
						// tag.setAnimation(null)
						// tag._width = 20
						// tag._height = 20
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
					var http = `http://${$_production.request.location}/${$_production.request.javaModule}${this.blueprintUrl}`
				}
				if (process.env.NODE_ENV == 'development') {
					var http = `http://${$_development.request.location}/${$_development.request.javaModule}${this.blueprintUrl}`
				}
	
				ht.Default.xhrLoad(http, res => {
					let json = ht.Default.parse(res)
					dataModel.deserialize(json)
					graphView.fitContent(true)
				})
	
				graphView.mi(e => {
					let eType = e.kind,
						eData = e.data,
						part = e.part,
						event = e.event
					if (eType === 'clickData') {
						if (e.data.a('vc_SourceID')) {
							let targetTag = eData.getTag()
							// console.log(targetTag)
							// console.log(e.data.a('vc_SourceID'))
							// console.log(e.data.a('i_NodeType'))
	
							//动画清除
							// if (this.aaa != '') {
							// 	let tag = global.dataModel.getDataByTag(this.aaa)
							// 	tag.setAnimation(null)
							// 	tag._width = 20
							// 	tag._height = 20
							// console.log(tag)
							// }
	
							// this.aaa = e.data.a('vc_SourceID')
							this.animation()
						}
					}
				})
	
				this.getNode()
			},
	
			getNode() {
				let params = {
					pageId: this.blueprintObj.pageId,
					unitId: this.unitId//this.$store.getters.unitId
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
	
									let blinkTask = {
										interval: 300,
										action: function(data) {
											// console.log(data.a('alarmLevel'));
											if (data.a('alarmLevel') > 0) {
												data.a('blink.visible', !data.a('blink.visible'))
											} else {
												data.a('blink.visible', false)
											}
										}
									}
									this.dataModel.addScheduleTask(blinkTask)
								}, 1000)
							})
					}
				})
			},
			animation() {
				//06ce3d8f30c14e988ec7a079dc0d5c16
				//f50098a19a5d438ab697ed4bcca6f8e3
				// 动画
				//===========================================================================================
				let tag = global.dataModel.getDataByTag(this.aaa)
				tag.setAnimation({
					repeat: 3,
					//大小
					expandWidth: {
						property: 'width',
						from: 20,
						to: 50,
						easing: 'Bounce.easeOut',
						next: 'collapseWidth'
					},
					collapseWidth: {
						property: 'width',
						from: 50,
						to: 20,
						easing: 'Bounce.easeOut',
						next: 'expandWidth'
					},
					expandHeight: {
						property: 'height',
						from: 20,
						to: 50,
						easing: 'Bounce.easeOut',
						next: 'collapseHeight'
					},
					collapseHeight: {
						property: 'height',
						from: 50,
						to: 20,
						easing: 'Bounce.easeOut',
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
	
