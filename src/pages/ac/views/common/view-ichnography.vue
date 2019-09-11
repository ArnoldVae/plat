<template>
  <div ref="view-ichnography"
       class="view-ichnography"></div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'view-ichnography',
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
		},
		isShowName: {
			type: Boolean,
			default: false
		},
		source: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			axios: this.$_api.fireControl,
			localHt: null,
			dataModel: null,
			graphView: null,
			findNodes: [],
			isShow: true
		}
	},
	created() {},
	mounted() {
		this.init()
	},
	computed: {
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		},
		activeTypeMapList() {
			return findComponentUpward(this, 'intelligent').deviceTypeMapList
		}
	},
	watch: {
		blueprintUrl(url) {
			this.dataModel.clear()
			var el = this.$refs['view-ichnography']
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
				if (data.getTag() == val.devid) data.a('alarmLevel', val.level)
			})
		}
	},
	methods: {
		init() {
			let localHt = (this.localHt = global.ht)
			let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))

			let dom = this.$refs['view-ichnography']
			graphView.addToDOM(dom)

			dataModel.enableAnimation() //启用动画

			//监听窗口大小变化
			window.addEventListener('resize', e => {
				graphView.fitContent(true, 10)
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

			//判断是否有图纸路径
			if (!this.blueprintUrl.length) return

			this.axios
				.getHtControl(this.blueprintUrl)
				.then(res => {
					let json = ht.Default.parse(res)
					dataModel.deserialize(json)
					graphView.fitContent(true, 10)
					this.getNode()
					return
				})
				.catch(err => {
					this.$ocxMessage.error('图纸丢失！！！')
					this.disTable()
					this.isShow = false
					return
				})
			//监听交互事件
			graphView.mi(e => {
				let eType = e.kind,
					eData = e.data,
					part = e.part,
					event = e.event

				if (eType === 'clickData') {
					if (e.data.a('vc_SourceID') != undefined) {
						if (this.isNodeClick && this.isNodeClick == true) {
							// let targetTag = eData.getTag()
							this.$emit('htClick', e.data, this.findNodes)
						}
					}
				}
				if (this.isShowName && this.isShowName == true) {
					if (eType == 'onEnter') {
						if (e.data.a('vc_SourceID')) {
							//添加图元下文字
							eData.setStyle('label', eData._name)
							eData.setStyle('label.color', '#fff')
							// eData.setStyle('label.font', '12px arial, sans-serif')
							eData.setStyle('label.scale', 0.6)
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
			})
			// if (this.isShow == true) {
			// 	this.getNode()
			// }
		},

		getNode() {
			let params = {
				pageId: this.blueprintObj.pageId,
				unitId: this.$store.getters.unitId
			}
			this.axios.getHtFind(params).then(res => {
				if (res.code == 200) {
					console.log(res.data)
					this.findNodes = res.data

					let primitiveNodes = res.data

					primitiveNodes.length &&
						primitiveNodes.map(item => {
							setTimeout(() => {
								//创建ht node节点
								let node = new this.localHt.Node()
								//设置图片
								console.log(item)
								if (this.source == 'terminalBox') {
									node.setImage('symbols/zf/dzx_zc.png')
								} else if (item.icon && item.icon != '' && item.icon != 'null' && item.icon != null) {
									node.setImage(`symbols/QIF/${item.icon}.json`)
								} else {
									if (item.vcPath.indexOf('ht') == 0) {
										node.setImage(`assets/libs/${item.vcPath}`)
									} else {
										node.setImage(item.vcPath)
									}
								}

								node.setTag(item.vcSourceId) //设置tag标签名称
								node.setId(item.nodeId) //设置id
								node.setPosition(parseFloat(item.fPageX), parseFloat(item.fPageY)) //设置位置
								node.setRotation(item.fPageZ ? parseFloat(item.fPageZ) : 0) //设置旋转角度
								node.setName(item.vcName) //设置名称
								node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight)) //设置大小
								node.setStyle('interactive', true)
								node.a('vc_SourceID', item.vcSourceId) //设置自定义内容
								node.a('vc_Path', item.vcPath)
								node.a('i_NodeType', item.iNodeType)
								node.a('pageId', this.pageId)
								node.a('sort', item.iOrder)
								node.a('functionCode', item.functionCode ? item.functionCode : null )
								node.a('iParam1', item.iParam1)
								node.a('iParam2', item.iParam2)
								node.a('iParam3', item.iParam3)
								node.setLayer(1)
								node.s('label', '')
								this.dataModel.add(node) //添加到ht模型里面
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
			this.dataModel.addScheduleTask(blinkTask) //添加调度的对象
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
	}
}
</script>

<style lang="stylus" scoped>
.view-ichnography {
  width: calc(100% - 16px);
  height: calc(100% - 10px);
  margin: 0 8px;
  position: relative;
}
</style>
