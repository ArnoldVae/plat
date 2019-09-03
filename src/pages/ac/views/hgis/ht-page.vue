<template>
  <div class='ht-page'>
    <div class="ht"
         ref="ht-page"></div>
    <charts v-model="historyModal"
            :node-id="nodeId"
            :sub-title="chartTitle"
            :unit="unit"></charts>
  </div>

</template>
<script>
import charts from '../main-oil/charts1'
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'ht-page',
	components: { charts },
	props: {
		dataList: {
			type: Array,
			default: []
		},
		pitchOn: {
			type: String,
			default: ''
		},
		mainDevList: {
			type: Array,
			default: []
		},
		msgData: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			presentData: '',
			localHt: null,
			dataModel: null,
			graphView: null,
			historyModal: false,
			chartTitle: '',
			nodeId: '',
			unit: '',
			mainDevData: []
		}
	},
	computed: {
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		},
		activeTypeMapList() {
			return findComponentUpward(this, 'intelligent').deviceTypeMapList
		}
	},
	filters: {},
	watch: {
		pitchOn(newVal) {
			if (this.presentData.length != 0) {
				let index = this.dataList.findIndex(item => item.pageId == newVal)
				this.presentData = this.dataList[index]
				this.dataModel.clear()
				var el = this.$refs['ht-page']
				var childs = el.childNodes
				for (var i = childs.length - 1; i >= 0; i--) {
					el.removeChild(childs[i])
				}
				this.init()
			} else {
				let index = this.dataList.findIndex(item => item.pageId == newVal)
				this.presentData = this.dataList[index]
				this.init()
			}
		},
		msgData(newVal) {
			let tag = this.dataModel.getDataByTag(newVal.devid)
			if (tag != undefined) {
				tag.a(newVal.functionCode, newVal.value ? newVal.value : 0)
			}
		},
		mainDevList(newVal) {
			this.mainDevData = newVal
			this.addData()
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		init() {
			let localHt = (this.localHt = global.ht)
			let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))

			let dom = this.$refs['ht-page']
			graphView.addToDOM(dom)

			dataModel.enableAnimation() //启用动画

			//监听窗口大小变化
			window.addEventListener('resize', e => {
				graphView.fitContent(true, 0)
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

			if (!this.presentData.vcUrl.length) return

			//获取图纸
			this.$_api.hgis
				.getHtControl(this.presentData.vcUrl)
				.then(res => {
					let json = localHt.Default.parse(res)
					dataModel.deserialize(json)
					//重置图纸位置
					graphView.fitContent(true, 0)
					this.addData()
				})
				.catch(err => {
					this.$ocxMessage.error('图纸丢失！！！')
					this.disTable()
					return
				})

			let _this = this
			//ht添加的点击事件的接收函数
			global.htModel = function(data, functionCode) {
				_this.chartsModal(data, functionCode)
			}
		},
		//添加数据
		addData() {
			if (this.mainDevData.length != 0) {
				for (let i = 0; i < this.mainDevData.length; i++) {
					let item = this.mainDevData[i]

					let tag = this.dataModel.getDataByTag(item.devId)
					// console.log(tag)

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
		},
		//弹窗
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
.ht-page {
  width: calc(100% - 6px);
  height: calc(100% - 10px);
  margin: 0 3px;

  .ht {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>