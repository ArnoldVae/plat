<template>
  <div ref="blueprint"
       class="blueprintHt"></div>
</template>
<script>
export default {
	name: 'ht-blueprint',
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
		isNodeClick: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			axios: this.$_api.fireControl,
			localHt: null,
			dataModel: null,
			graphView: null
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
		mqttData(val) {
			//设备唯一时可用
			// let tag = global.dataModel.getDataByTag(val.nodeid)
			// tag.a('alarmLevel', val.level)

			//设备不唯一时可用
			this.dataModel.toDatas(function(data) {
				if (data.getTag() == val.nodeid) data.a('alarmLevel', val.level)
			})
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

			graphView.mi(e => {
				let eType = e.kind,
					eData = e.data,
					part = e.part,
					event = e.event
				if (eType === 'clickData') {
					if (e.data.a('vc_SourceID') != undefined) {
						if (this.isNodeClick && this.isNodeClick == true) {
							// let targetTag = eData.getTag()
							this.$emit('htClick', e.data)
						}
					}
				}
			})

			this.getNode()
		},

		getNode() {
			let params = {
				pageId: this.blueprintObj.pageId,
				unitId: this.$store.getters.unitId
			}
			this.axios.getHtFind(params).then(res => {
				if (res.code == 200) {
					let primitiveNodes = res.data

					primitiveNodes.length &&
						primitiveNodes.map(item => {
							setTimeout(() => {
								let node = new this.localHt.Node()
								node.setImage(item.vcPath)
								node.setTag(item.vcSourceId)
								node.setId(item.nodeId)
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
							}, 1000)
						})
				}
			})

			var blinkTask = {
				interval: 300,
				// enabled: true,
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
		}
	}
}
</script>

<style lang="stylus" scoped>
.blueprintHt {
  width: calc(100% - 16px);
  height: calc(100% - 10px);
  margin: 0 8px;
  position: relative;
}
</style>
