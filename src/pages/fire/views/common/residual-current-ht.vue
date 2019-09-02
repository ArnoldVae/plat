<template>
	<div>
		<div ref="view-main" id="main" class="fireControlHt"></div>
		<div class="btnBox">
			<div class="btnTitle">图例:</div>
			<div class="btnCon">
				<div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/kaizhuang.png" alt />
					</div>
					<div class="con" @click="kaiDian()">铠装电流(mA)</div>
				</div>
				<div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/shengyu.png" alt />
					</div>
					<div class="con" @click="residueDian()">剩余电流(mA)</div>
				</div>
				<!-- <div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/shengyu.png" alt />
					</div>
					<div class="con" @click="Videoclick()">视频</div>
				</div> -->
			</div>
		</div>
		<!-- 视频弹框 -->
		<ElDialog
			id="dialogs"
			:title="'视频'"
			center
			:visible.sync="vidoeShow"
			v-if="vidoeShow"
			width="100%"
			@close="handleClose()"
			style="top:-75vh;left: 18vw"
		>
			<div class="video" v-for="(videoItem,index) in newVideoConfig" :key="index">
					<OcxVideo :videoConfig="videoItem"></OcxVideo>
			</div>
		</ElDialog>
		<!-- 历史曲线弹框 -->
			<charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
	</div>
</template>
<script>
import { CLIENT_RENEG_LIMIT, CLIENT_RENEG_WINDOW } from 'tls'
import { setTimeout } from 'timers'
import OcxVideo from '@/components/native/video/OcxVideo'
import charts from '../common/charts1'
export default {
	name: 'ht-common',
	data() {
		return {
			localHt: null,
			dataModel: null,
			graphView: null,
			residualNodes: [],
			deviceid: '',
			nodeValue: '',
			vidoeShow: false,
			newVideoConfig:[
				{
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '2|22.46.34.114:37781|admin:admin123|2',
					presetVal: 0,
					hideTool: true
				}
			],
			// 历史曲线
			historyModal:false,
			chartTitle: '',
			nodeId: '',
			unit: ''
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
	components: {
		OcxVideo,
		charts
	},
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
			// console.log(data)
			if (data.cmd == 1001) {
				this.deviceid = data.devid
				this.nodeValue = data.value
				let tag = global.dataModel.getDataByTag(this.deviceid)
				// console.log(tag)
				//给图元添加下方文字
				if (tag != undefined) {
					// debugger
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
				// graphView.fitContent(true)
				graphView.setZoom(10.5, true, { x: 560, y: 450 })
				this.dataModel.each(data => {
					if (data.getTag() == 'sy-bg-shengyu' || data.getTag() == 'sy-bg-kai') {
						if (data.getStyle('2d.visible') == true) {
							data.setStyle('2d.visible', false)
						}
					}
				})
			})
			this.getNode();
			this.clickTextNodeHistory()
			// this.clickVideoNode();//视频点击
		},
		getNode() {
			let params = {
				pageId: this.residualObj.pageId,
				unitId: '8177a787a28b4f86a103fac9a023db05'
			}
			this.$_api.statusCheck.getHtNode(params).then(res => {
				if (res.code == 200) {
					this.residualNodes = res.data				
					this.residualNodes.length &&
						this.residualNodes.map((item,index) => {
								// console.log(item.devNodes[0].devTypeId)
							setTimeout(()=>{
									let node = new this.localHt.Node()
							    if(item.devNodes[0].devTypeId==1080 || item.devNodes[0].devTypeId==1082){
									node.setImage('ht/storage/symbols/txtIcon.json')
									node.setTag(item.vcSourceId)
									node.setId(item.vcSourceId)
									node.setPosition(parseFloat(item.fPageX) + 2, parseFloat(item.fPageY))
									node.setName(item.vcName)
									node.setSize(25, 12)
									// node.setStyle('interactive', true)
									node.setStyle('font', 'DS-DIGI')
									node.a('vc_SourceID', item.vcSourceId)
									node.a('vc_Path', item.vcPath)
									node.a('nodeID',item.devNodes[0].NodeID)
									node.a('i_NodeType', item.iNodeType)
									node.a('pageId', this.residualObj.pageId)
									node.a('devtypeId', item.devNodes[0].devTypeId)
									node.setLayer(1)
									node.s('label', '')
									if(item.devNodes[0].NodeID=="d4b6b41b574c470ea14aa328f23fd24e"){
										item.devNodes[0]['f_Value']=item.devNodes[0].f_Value/100
									}else if(item.devNodes[0].NodeID=="2c9dde06ef014dbb8acee871f81759cf"){
											item.devNodes[0]["f_Value"]=item.devNodes[0].f_Value/100
									}
									let NumValue  =item.devNodes[0].f_Value == '65535' ? ' --' : item.devNodes[0].f_Value
									node.a('value', NumValue.toFixed(1))
									node.setStyle('2d.visible', false)
								}
								// else if(item.devNodes[0].devTypeId==1044){
								// 	node.setImage('ht/storage/assets/svg/Dark_icons_qiujiOnline.png')
								// 	node.setTag("视频")
								// 	node.setId(item.vcSourceId)
								// 	node.setPosition(parseFloat(item.fPageX) + 2, parseFloat(item.fPageY))
								// 	node.setSize(5, 5)
								// 	node.a('devtypeId', item.devNodes[0].devTypeId)
								// 	node.a('devid',item.devNodes[0].DevID)
								// 	node.setStyle('2d.visible', false)
								// }
								
								
								//								end
								this.dataModel.add(node)
							},300)
							
						})
				}
			})
		},
		//剩余电流的点击 显示与隐藏
		residueDian() {
			this.dataModel.each(data => {
				if (data.a('devtypeId') == 1080) {
					// console.log(data)
					if (data.getStyle('2d.visible') == false) {
						data.setStyle('2d.visible', true)
					} else {
						data.setStyle('2d.visible', false)
					}
				}
				// if (data.getName() != undefined) {
				// 	if (data.getName().indexOf('剩余电流')>0 ) {
				// 		// data.a('value','12')
				// 		if (data.getStyle('2d.visible') == true) {
				// 			data.setStyle('2d.visible', false)
				// 		} else {
				// 			data.setStyle('2d.visible', true)
				// 		}
				// 	}
				// }
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
				if (data.a('devtypeId') == 1082) {
					// console.log(data)
					if (data.getStyle('2d.visible') == false) {
						data.setStyle('2d.visible', true)
					} else {
						data.setStyle('2d.visible', false)
					}
				}
				// if (data.getName() != undefined) {
				// 	if (data.getName().indexOf('铠接地电流') > 0) {
				// 		console.log(data)
				// 		if (data.getStyle('2d.visible') == true) {
				// 			data.setStyle('2d.visible', false)
				// 		} else {
				// 			data.setStyle('2d.visible', true)
				// 		}
				// 	}
				// }
				if (data.getTag() == 'sy-bg-kai') {
					if (data.getStyle('2d.visible') == true) {
						data.setStyle('2d.visible', false)
					} else {
						data.setStyle('2d.visible', true)
					}
				}
			})
		},
		//点击视频的显示与隐藏
		Videoclick() {
			this.dataModel.each(data => {
				if (data.getTag() == '视频') {
					if (data.getStyle('2d.visible') == true) {
						data.setStyle('2d.visible', false)
					} else {
						data.setStyle('2d.visible', true)
					}
				}
			})
		},
		//视频点击
		clickVideoNode(){
			this.graphView.mi(e=>{
				if(e.kind === 'clickData'){
					this.vidoeShow=true
					  this.newVideoConfig[0].deviceInfo=e.data.a('devid')
				}
			})
		},
		handleClose(){
			this.newVideoConfig=[
				{
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '',
					presetVal: 0,
					hideTool: true
				}
			]
				this.vidoeShow=false
		},
		//历史曲线
		clickTextNodeHistory(){
				this.graphView.mi(e=>{
					if(e.kind === 'clickData'){
						if(e.data.a('nodeID')){
							this.historyModal=true
							// console.log(e.data)
						  this.nodeId=e.data.a('nodeID')
						  this.chartTitle=e.data.getName()
						  this.unit='mA'
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
  width: 100%;
  height: 845px;
  position: relative;
}

.btnBox {
  position: absolute;
  bottom: 0;
  right: -20PX;
  width: 12.88889rem;
  height: 150px;
  color: #fff;
  font-size: 58PX;

  .btnCon {
    margin-left: 30px;
    cursor: pointer;
    user-select: none;

    .btnConItem {
      display: flex;
      cursor: pointer;
      user-select: none;

      img {
        width: 70PX;
        height: 70PX;
        margin-right: 25PX;
      }

      .con {
        margin-left: 0.1rem;
      }
    }
  }
}

#dialogs {
  width: 60% !important;

  /deep/ .el-dialog__header .el-dialog__title {
    font-size: 25px;
  }
  /deep/ .el-dialog--center .el-dialog__body{
	  padding:0 5px !important;
	  margin-top:20px;
	
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close{
	  font-size:25px
   }
  .video{
	  width: 100%;
      height: 680px;
	//   border:1px solid red;
	//   .ocxVideo .videoEl{
	// 	  width:99%;
	//   }
  }
}
</style>
