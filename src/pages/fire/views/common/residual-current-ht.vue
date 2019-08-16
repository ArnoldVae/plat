<template>
	<div ref="view-main" id="main" class="fireControlHt"></div>
</template>
<script>
import { CLIENT_RENEG_LIMIT, CLIENT_RENEG_WINDOW } from 'tls';
import { setTimeout } from 'timers';
export default {
	name: 'ht-common',
	data() {
		return {
			localHt: null,
			dataModel: null,
            graphView: null,
            residualNodes:[],
			deviceid:'',
			nodeValue:''
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
        this.init();
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
            console.log(data)
			if (data.cmd == 1001) {
				this.deviceid = data.devid
				this.nodeValue=data.value
                let tag = global.dataModel.getDataByTag(this.deviceid)
                console.log(tag);
				//给图元添加下方文字
				if (tag != undefined) {
					if(tag.getTag()==this.deviceid){
						tag.a("value",this.nodeValue)
						// tag.setStyle('label.color', '#fff')
						// tag.setStyle('label.font', '10px sans-serif')
						// tag.setStyle('label.position', 31)
						// tag.setStyle('label.toggleable', false)
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
				var http = `${$_production.request.location}/${$_production.request.javaModule}${this.residualUrl}`
			}
			if (process.env.NODE_ENV == 'development') {
				var http = `${$_development.request.location}/${$_development.request.javaModule}${this.residualUrl}`
			}
			ht.Default.xhrLoad(http, res => {
				let json = ht.Default.parse(res)
				dataModel.deserialize(json)
				graphView.fitContent(true)
			})

			// graphView.addInteractorListener(e => {
			// 	let eType = e.kind,
			// 		eData = e.data,
			// 		part = e.part,
			// 		event = e.event
			// 	//判断当前节点是否有动画
			// 	if (eData && !eData._animation) {
			// 		if (eType == 'onEnter') {
			// 			if (e.data.a('vc_SourceID')) {
			// 				//添加图元下文字
			// 				eData.setStyle('label', eData._name)
			// 				eData.setStyle('label.color', '#fff')
			// 				// eData.setStyle('label.font', '10px sans-serif')
			// 				eData.setStyle('label.position', 31)
			// 				eData.setStyle('label.toggleable', false)
			// 			}
			// 		}
			// 		if (eType == 'onLeave') {
			// 			if (e.data.a('vc_SourceID')) {
			// 				//删除图元下文字
			// 				eData.setStyle('label', null)
			// 			}
			// 		}
			// 	}

			// 	if (eData && eData._animation) {
			// 		if (eType == 'clickData') {
			// 			if (e.data.a('vc_SourceID')) {
			// 				let targetTag = eData.getTag()
			// 				this.$emit('getDevId', targetTag)
			// 			}
			// 		}
			// 	}
            // })
            this.getNode();
        },
        getNode(){
            let params = {
				pageId: this.residualObj.pageId,
				unitId: '8177a787a28b4f86a103fac9a023db05'
            }
            this.$_api.statusCheck.getHtNode(params).then(res=>{
                console.log(res)
                if(res.code==200){
                    this.residualNodes=res.data
                    this.residualNodes.length && this.residualNodes.map( item =>{
                        setTimeout(()=>{
                            let node = new this.localHt.Node()
                            node.setImage('ht/storage/symbols/txtIcon.json')
                            node.setTag(item.vcSourceId)
                            node.setId(item.vcSourceId)
                            node.setPosition(parseFloat(item.fPageX)+2, parseFloat(item.fPageY))
                            node.setName(item.vcName)
							// node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
							node.setSize(10,10)
                            node.setStyle('interactive', true)
                            node.a('vc_SourceID', item.vcSourceId)
                            node.a('vc_Path', item.vcPath)
                            node.a('i_NodeType', item.iNodeType)
                            node.a('pageId', this.residualObj.pageId)
                            // node.a('sort', item.iOrder)
                            // node.a('iParam1', item.iParam1)
                            // node.a('iParam2', item.iParam2)
                            // node.a('iParam3', item.iParam3)
                            node.setLayer(1)
                            node.s('label', '')
                            this.dataModel.add(node);
                            this.dataModel.each(data=>{
								let valueNum= item.devNodes.length>0 ? item.devNodes[0] : '--'
								data.a('value', valueNum)
								// if(data.getTag()=='12e1638920ca4ce0a5ace94d87e005eb'){
								// 	// console.log(data)
								// }
                            })
                        },800)
                    })
                }
            })
            
        },
		//ht
		mapHt() {
			let localHt = (this.localHt = window.ht)
			let dataModel = (this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))
			let mapHT = this.$refs['view-main']
			graphView.addToDOM(mapHT)
			graphView.setMovableFunc(function() {
				return false
			})
			graphView.getSelectWidth = function() {
				return 0
			}
			graphView.setScrollBarSize(0)
			graphView.fitContent(true)
			graphView.setSelectableFunc(() => {
				return false
			})
			// graphView.adjustZoom = () => {
			//     return 1;
			// };
			//添加背景
			localHt.Default.setImage('mapBg', 'ht/storage/assets/svg/residual-current.svg') // 背景
			localHt.Default.setImage('arrow-orange', 'ht/storage/assets/svg/residual-current.svg') // 箭头
			let width = graphView.getWidth()
			let height = graphView.getHeight()
			// 添加背景图片
			const MAPBG = new localHt.Node()
			MAPBG.setRect(0, 0, width, height)
			MAPBG.setImage('mapBg')
			dataModel.add(MAPBG)
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
  margin-top: 20px;
  width: 100%;
  height: 880px;
  position: relative;
}
</style>


