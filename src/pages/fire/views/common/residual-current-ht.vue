<template>
	<div>
		<div ref="view-main" id="main" class="fireControlHt"></div>
		<div class="btnBox">
			<div class="btnTitle">图例:</div>
			<div class="btnCon">
				<div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/shengyu.png" alt />
					</div>
					<div class="con" @click="residueDian()">剩余电流</div>
				</div>
				<div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/kaizhuang.png" alt />
					</div>
					<div class="con" @click="kaiDian()">铠装电流</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { CLIENT_RENEG_LIMIT, CLIENT_RENEG_WINDOW } from 'tls'
import { setTimeout } from 'timers'
export default {
	name: 'ht-common',
	data() {
		return {
			localHt: null,
			dataModel: null,
			graphView: null,
			residualNodes: [],
			deviceid: '',
			nodeValue: ''
		}
	},
	props: {
		residualUrl: {
			type: String
		},
		residualObj: {
			type: Object
		},
		mqttData: {
			type: Object
		}
	},
	created() {},
	mounted() {
		// this.mapHt()
		this.init()
	},
	watch: {
		residualUrl(url) {
			// console.log(url)
			this.dataModel.clear()
			var el = this.$refs['view-main']
			var childs = el.childNodes
			for (var i = childs.length - 1; i >= 0; i--) {
				el.removeChild(childs[i])
			}
			this.init()
		},
		mqttData(data) {
			// console.log(data)/
			if (data.cmd == 1001) {
				this.deviceid = data.devid
				this.nodeValue = data.value
				let tag = global.dataModel.getDataByTag(this.deviceid)
				// console.log(tag)
				//给图元添加下方文字
				if (tag != undefined) {
					if (tag.getTag() == this.deviceid) {
						tag.a('value', this.nodeValue)
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
			let dom = this.$refs['view-main']
			graphView.addToDOM(dom)

			// dataModel.enableAnimation() //启用动画

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
			if (!this.residualUrl.length) return
			if (process.env.NODE_ENV == 'production') {
				var http = `${$_production.javaRequest.location}/${$_production.javaRequest.javaModule}${this.residualUrl}`
			}
			if (process.env.NODE_ENV == 'development') {
				var http = `${$_development.javaRequest.location}/${$_development.javaRequest.javaModule}${this.residualUrl}`
			}
			ht.Default.xhrLoad(http, res => {
				let json = ht.Default.parse(res)
				dataModel.deserialize(json)
				graphView.fitContent(true)
				// graphView.setZoom(6,true,{x:0,y:0})
			})
			this.getNode()
		},
		getNode() {
			let params = {
				pageId: this.residualObj.pageId,
				unitId: '8177a787a28b4f86a103fac9a023db05'
			}
			this.$_api.statusCheck.getHtNode(params).then(res => {
				// console.log(res)
				if (res.code == 200) {
					this.residualNodes = res.data
					this.residualNodes.length &&
						this.residualNodes.map(item => {
							setTimeout(() => {
								let node = new this.localHt.Node()
								node.setImage('ht/storage/symbols/txtIcon.json')
								node.setTag(item.vcSourceId)
								node.setId(item.vcSourceId)
								node.setPosition(parseFloat(item.fPageX) + 2, parseFloat(item.fPageY))
								node.setName(item.vcName)
								// node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
								node.setSize(40, 20)
								node.setStyle('interactive', true)
								node.a('vc_SourceID', item.vcSourceId)
								node.a('vc_Path', item.vcPath)
								node.a('i_NodeType', item.iNodeType)
								node.a('pageId', this.residualObj.pageId)
								node.a('devtypeId',item.devNodes[0].devTypeId)
								node.setLayer(1)
								node.s('label', '')
								this.dataModel.add(node)
								this.dataModel.each(data => {
									let valueNum = item.devNodes[0].f_Value !=null ? item.devNodes[0].f_Value : '---'
									data.a('value', valueNum)
									// if(data.getTag()=='12e1638920ca4ce0a5ace94d87e005eb'){
									// 	// console.log(data)
									// }
								})
							}, 100)
						})
				}
			})
		},
		//剩余电流的点击 显示与隐藏
		residueDian() {
			this.dataModel.each(data => {
					if (data.a('devtypeId')==1080) {
						if (data.getStyle('2d.visible') == true) {
							data.setStyle('2d.visible', false)
						} else {
							data.setStyle('2d.visible', true)
						}
					}
				
				if (data.getTag() == 'sy-bg-shengyu') {
					if (data.getStyle('2d.visible') == true) {
						data.setStyle('2d.visible', false)
					} else {
						data.setStyle('2d.visible', true)
					}
				}
			})
		},
		//铠装电流的点击 显示与隐藏
		kaiDian() {
			this.dataModel.each(data => {
				if (data.a('devtypeId')==1082) {
						if (data.getStyle('2d.visible') == true) {
							data.setStyle('2d.visible', false)
						} else {
							data.setStyle('2d.visible', true)
						}
				}
				if (data.getTag() == 'sy-bg-kai') {
					if (data.getStyle('2d.visible') == true) {
						data.setStyle('2d.visible', false)
					} else {
						data.setStyle('2d.visible', true)
					}
				}
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
/deep/.wrapper {
  background: #F0EFEE;
  border: 1px solid red;
  margin: 0;
  padding: 8px 20px;
}

.fireControlHt {
  // margin-left 20px
//   margin-top: 20px;
  width: 100%;
  height: 800px;
  position: relative;
}

.btnBox {
  position: absolute;
  bottom: 20px;
  right: 30px;
  width: 250px;
  height: 150px;
  color: #fff;
  font-size: 25px;

  .btnCon {
    margin-left: 30px;
    cursor: pointer;
    user-select: none;
	.btnConItem{
		display flex;
		cursor pointer;
        user-select none;
		.con{
			margin-left 20px;
		}
	}
  }
}
</style>
