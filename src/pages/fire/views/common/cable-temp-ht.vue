<template>
	<div>
		<div ref="view-main" id="main" class="fireControlHt"></div>
		<div class="btnBox">
			<div class="btnTitle">图例:</div>
			<div class="btnCon">
				<div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/opticalBg.png" alt />
					</div>
					<div class="con" @click="optical()">光纤测温(℃)</div>
				</div>

				<div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/fireQi.png" alt />
					</div>
					<div class="con" @click="fireQiClick()">探火管</div>
				</div>
				<div class="btnConItem">
					<div>
						<img src="../../assets/img/elec-fire/fireDan.png" alt />
					</div>
					<div class="con" @click="fieDanClick()">灭火弹</div>
				</div>
			</div>
		</div>
		<!-- 历史曲线弹框 -->
		<charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
		<!-- 报警内容 -->
		<Modal v-model="modal" title="报警" @on-cancel="cancel">
			<div class="fireCon">
				<div class="video">
					<div class="videoTitle">报警视频</div>
					<div class="ocxVideo" v-if="modal">
						<ocx-video :videoConfig="videoConfig[0]"></ocx-video>
					</div>
				</div>
				<div class="firewarp">
					<div class="fire-alarmInfo">
						<div class="alarmInfo-title">报警信息</div>
						<div class="alarmInfo-list">
							<ul>
								<li v-for="(item,index) in alarmInfoList" :key="index">
									<div class="name">{{item.name}}</div>
									<div :class="['value' ,index%2==0 ?'valueColor1':'valueColor2']">{{item.value}}</div>
								</li>
							</ul>
						</div>
					</div>
					<!-- <div class="fire-alarmImg">
						<div class="alarmImg-title">图片</div>
						<div class="alarmImg">
							<img src="../../assets/img/status/spw.png" alt />
						</div>
					</div> -->
				</div>
			</div>
			<!-- <div class='fireChart'>
				<div class="chartTitle">历史数据</div>
				<div id="charts" ref="charts"></div>
			</div> -->
		</Modal>
	</div>
</template>
<script>
import charts from '../common/charts1'
import ocxVideo from '@/components/native/video/OcxVideo'
import moment from 'moment'
import { log } from 'util'
export default {
	name: 'ht-common',
	data() {
		return {
			localHt: null,
			dataModel: null,
			graphView: null,
			cableNodes: [],
			deviceid: '',
			nodeValue: '',
			funId: '',
			// 历史曲线
			historyModal: false,
			chartTitle: '',
			nodeId: '',
			unit: '',
			//报警数据
			modal: false,
			videoConfig: [
				{
				 isAutoPlay: true,
				serviceInfo: '1$22.46.34.114$6800$admin$admin',
				deviceInfo: '2|22.46.34.114:37781|admin:admin123|5',
				presetVal:0,
				hideTool: true
				}
			],
			alarmInfoList: [
				{
					name: '报警通道:',
					value: '500kV场地2#通道光纤测温'
				},
				{
					name: '报警位置:',
					value: '阻49-阻49分区'
				},
				{
					name: '防护区温度:',
					value: '43.9'
				},
				{
					name: '报警时间:',
					value: '2017-9-24 10:00'
				}
			],
			nodeData: '',
			devid: '',
			alrmClear: null,
			endTime: '',
			startTime: '',
			xdata: [],
			ydata: [],
			myChart: null
		}
	},
	created() {},
	components: {
		charts,
		'ocx-video': ocxVideo
	},
	mounted() {
		this.init()
		// this.optical()
		// this.myChart = this.$_echarts.init(this.$refs['charts'])
	},
	props: {
		cablelUrl: {
			type: String
		},
		cableObj: {
			type: Object
		},
		mqttData: {
			type: Object
		},
		alarmmqttData: {
			type: Object
		}
	},
	watch: {
		cablelUrl(url) {
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
			if (data.cmd == 1001 && data.functionCode == '1079.0002') {
				// console.log(data)
				this.deviceid = data.devid
				this.nodeValue = data.value
				this.funId = data.functionCode
				let tag = global.dataModel.getDataByTag(this.deviceid)

				//给图元添加下方文字
				if (tag != undefined) {
					// console.log(tag.a('functionCode'))
					if (tag.getTag() == this.deviceid) {
						// console.log(tag)
						tag.a('value', this.nodeValue)
					}
					// if(tag.a('functionCode')==this.funId){
					// 	// console.log(this.nodeValue)
					// 		tag.a('value', this.nodeValue)
					// }
				}
			}
		},
		alarmmqttData(data) {
			// console.log(data);
			// if(data.cmd==3002){
			// 	this.nodeData=data.node
			// 	let tag = global.dataModel.getDataByTag(this.nodeData)
			// 	//给图元添加下方文字
			// 	if (tag != undefined) {
			// 		if (tag.getTag() == this.nodeData) {
			// 			if(tag.getStyle('2d.visible')==true){
			// 				let num = 0
			// 			let alarmClear = setInterval(() => {
			// 				num++
			// 				if (num % 2 == 0) {
			// 					tag.setStyle('2d.visible', false)
			// 				} else {
			// 					tag.setStyle('2d.visible', true)
			// 				}
			// 				if (num == 4) {
			// 					clearInterval(alarmClear)
			// 					tag.setStyle('2d.visible', true)
			// 				}
			// 			}, 500)
			// 			}else{
			// 				tag.setStyle('2d.visible', false)
			// 			}
			// 		}
			// 	}
			// }
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
			if (!this.cablelUrl.length) return
			if (process.env.NODE_ENV == 'production') {
				var http = `${$_production.javaRequest.location}/${$_production.javaRequest.javaModule}${this.cablelUrl}`
			}
			if (process.env.NODE_ENV == 'development') {
				var http = `${$_development.javaRequest.location}/${$_development.javaRequest.javaModule}${this.cablelUrl}`
			}
			ht.Default.xhrLoad(http, res => {
				let json = ht.Default.parse(res)
				dataModel.deserialize(json)
				// graphView.fitContent(true)
				// graphView.adjustZoom(20)
				// console.log(graphView.getLogicalPoint(event))
				graphView.setZoom(12, true, { x: 310, y: 415 })
			})
			this.getNode()
			// this.clickTextNodeHistory()
			this.clickAlarmNode()
		},
		getNode() {
			let params = {
				pageId: this.cableObj.pageId,
				unitId: '8177a787a28b4f86a103fac9a023db05'
			}
			this.$_api.statusCheck.getHtNode(params).then(res => {
				// console.log(res)
				if (res.code == 200) {
					if (res.data.length > 0) {
						this.cableNodes = res.data
						this.cableNodes.length &&
							this.cableNodes.map(item => {
								let node = new this.localHt.Node()
								// node.setImage('ht/storage/symbols/txtIcon.json')
								item.devNodes.forEach(itv => {
									console.log(itv.i_AlarmLevel);
									if(itv.functionCode == '1079.0001'){
										node.a('level', itv.i_AlarmLevel)
										if(itv.i_AlarmLevel>0){
											
											node.setImage('ht/storage/symbols/txt.json')
											node.setSize(40, 25)
										}else {
											node.setImage('ht/storage/symbols/txtIcon.json')
											node.setSize(25, 10)
										}
									}
									
									// console.log(itv.i_AlarmLevel);
									if (itv.functionCode == '1079.0002') {
										// console.log(itv)
										node.a('value', itv.f_Value)
										node.a('functionCode', itv.functionCode)
										node.a('nodeID', itv.NodeID)
										node.a('devId', itv.DevID)
										
									}
								})
								// node.setImage('text')
								// node.setStyle('body.color', "#DA70D6")
								node.setTag(item.vcSourceId)
								node.setId(item.vcSourceId)
								node.setPosition(parseFloat(item.fPageX) + 2, parseFloat(item.fPageY))
								node.setName(item.vcName)
								// node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
								
								node.setStyle('interactive', true)
								node.a('vc_SourceID', item.vcSourceId)
								node.a('vc_Path', item.vcPath)
								node.a('i_NodeType', item.iNodeType)
								node.a('pageId', this.cableObj.pageId)
								node.a('vcName',item.vcName)
								node.setLayer(1)
								node.s('label', '')
								node.setStyle('shape.background', 'red')
								node.setStyle('shape.border.color', 'red')
								if (item.devNodes.length > 0) {
									node.a('devtypeId', item.devNodes[0].devTypeId)
								}
								
								this.dataModel.add(node)
							})
					}
					this.alarmNodeShow()
				}
			})
		},
		//光纤点击
		optical() {
			// debugger
			// console.log(1111);
			this.dataModel.each(data => {
				if (data.getTag() == 'sy-bg-02') {
					// console.log(data);
					if (data.getStyle('2d.visible') == false) {
						let num = 0
						let opticalClear = setInterval(() => {
							num++
							if (num % 2 == 0) {
								data.setStyle('2d.visible', false)
							} else {
								data.setStyle('2d.visible', true)
							}
							if (num == 4) {
								clearInterval(opticalClear)
								data.setStyle('2d.visible', true)
							}
						}, 500)
						// data.setStyle('2d.visible',true)
					} else {
						data.setStyle('2d.visible', false)
					}
				}
			})
		},
		//灭火弹
		fieDanClick() {
			this.dataModel.each(data => {
				if (data.getTag() == 'sy-bg-03') {
					if (data.getStyle('2d.visible') == false) {
						let num = 0
						let fieDanClear = setInterval(() => {
							num++
							if (num % 2 == 0) {
								data.setStyle('2d.visible', false)
							} else {
								data.setStyle('2d.visible', true)
							}
							if (num == 4) {
								clearInterval(fieDanClear)
								data.setStyle('2d.visible', true)
							}
						}, 500)
					} else {
						data.setStyle('2d.visible', false)
					}
				}
			})
		},
		//探管
		fireQiClick() {
			this.dataModel.each(data => {
				if (data.getTag() == 'sy-bg-01') {
					// console.log(data);
					if (data.getStyle('2d.visible') == false) {
						let num = 0
						let fireQiClear = setInterval(() => {
							num++
							if (num % 2 == 0) {
								data.setStyle('2d.visible', false)
							} else {
								data.setStyle('2d.visible', true)
							}
							if (num == 4) {
								clearInterval(fireQiClear)
								data.setStyle('2d.visible', true)
							}
						}, 500)
					} else {
						data.setStyle('2d.visible', false)
					}
				}
			})
		},
		//历史曲线
		clickTextNodeHistory() {
			this.graphView.mi(e => {
				// if(e.data.a('nodeID')){
				if (e.kind === 'clickData') {
					if(e.data.a('level')==0){
						this.historyModal = true
					// console.log(e.data)
					this.nodeId = e.data.a('nodeID')
					this.chartTitle = e.data.getName()
					this.unit = '℃'
					}
					
				}
				// }
			})
		},
		//报警节点闪烁
		alarmNodeShow() {
			this.dataModel.each(data => {
				if (data.a('level') > 0) {
					console.log(data.get)
					if (data.getStyle('2d.visible') == true) {
						let num = 0
						this.alrmClear = setInterval(() => {
							num++
							if (num % 2 == 0) {
								data.setStyle('2d.visible', false)
							} else {
								data.setStyle('2d.visible', true)
							}
						}, 500)
					} else {
						clearInterval(this.alrmClear)
						data.setStyle('2d.visible', true)
					}
				}
			})
		},
		clickAlarmNode() {
			this.graphView.mi(e => {
				if (e.kind == 'clickData') {
					if(e.data.a('level')>0){
					this.modal = true
					this.devid = e.data.a('devId')
					this.nodeId=e.data.a('nodeID')
					this.alarmInfoList[1].value=e.data.a('vcName').substring(16)+"     "+" 距离防火墙15米"
					this.alarmInfoList[2].value=e.data.a('value')+'℃'
					this.alarmInfoList[3].value=moment(new Date()).format('YYYY-MM-DD hh:mm')
					}
					
					// this.chartTitle = e.data.getName()
					// this.unit = '℃'
					// this.alarmDatas()
					// let nowDate = new Date().getTime()
					// let endTime = Math.ceil(nowDate / 1000)
					// let startTime = endTime - 259200
					// let params = {
					// 	nodeId: this.nodeId,
					// 	startTime: startTime,
					// 	endTime: endTime
					// }
					// this.getChartsData(params)
				}
			})
		},
		alarmDatas() {
			this.$_api.statusCheck
				.getAlarmDatas({
					unitId: '8177a787a28b4f86a103fac9a023db05',
					devId: this.devid,
					alarmId: -1
				})
				.then(res => {
					if (res.code == 200) {
						console.log(res)
					}
				})
		},
		cancel() {
			this.model = false
		},
		//chart数据
		getChartsData(params) {
			// console.log(params)
			this.$_api.maintaining.getNodeChart(params).then(res => {
				if (res.code == 200 && res.data) {
					// console.log(res)
					let tempList = []
					let timeList = []
					res.data.forEach(item => {
						tempList.push(item.f_Value)
						timeList.push(this.strToymd(item.i_DataTime))
					})
					this.showEchart(tempList, timeList, this.unit, this.subTitle)
				}
			})
		},
		showEchart(data, time, unit, name){
			var option = {
				title: {
					text: name,
					textStyle: {
						color: '#fff',
						fontWeight: 400,
						fontSize: 40
					},
					left: 30,
					top: -10
				},
				tooltip: {
					trigger: 'axis',
					formatter: `&nbsp;{b0}<br/> &nbsp;{a0}: {c0}&nbsp;${unit}`,
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						},
						triggerTooltip: {}
					},
					textStyle: {
						color: '#85c9ee',
						fontSize: 33
					}
				},
				grid: {
					//设置表格大小位置的
					// top: '5%',
					// left: '10%',
					// right: '8%',
					bottom: '25%',
					containLabel: true
				},

				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: time,
						axisLine: {
							show: true,
							lineStyle: {
								color: '#0091e8',
								width: 2
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize: 35
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								color: '#0091e8',
								width: 2
							}
						},
						splitLine: {
							lineStyle: {
								color: '#2d3650'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff',
								fontSize: 35
							},
							formatter: `{value} ${unit}`
						}
					}
				],
				series: [
					{
						name: name,
						type: 'line',
						symbol: 'none',
						areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
						lineStyle: { normal: { color: '#04a3ff' } }, //折线颜色
						data: data,
						connectNulls: true //这个是重点，将断点连接
					}
				],
				dataZoom: [
					{
						type: 'inside',
						minValueSpan: 7,
						minSpan: 20,
						start: 0,
						end: 100
					},
					{
						showDetail: true,
						height: 20,
						bottom: 50,
						borderColor: 'rgba(1,37,59,0.5)',
						backgroundColor: 'rgba(1,37,59,0.5)',
						dataBackgroundColor: 'rgba(47,126,181,0.9)',
						fillerColor: 'rgba(1,138,225,0.5)',
						handleColor: 'rgba(1,37,59,0.8)'
					}
				]
			}
			this.myChart.setOption(option)
			this.myChart.resize()
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
  margin-left: 20px;
  margin-top: 20px;
  width: 98%;
  height: 880px;
  position: relative;
}

.btnBox {
  position: absolute;
  bottom: 120px;
  right: -40px;
  width: 300px;
  height: 50px;
  color: #fff;
  font-size: 58PX;

  .btnCon {
    margin-left: 45PX;

    .btnConItem {
      display: flex;
      cursor: pointer;
      user-select: none;

      img {
        width: 35PX;
      }

      .con {
        margin-left: 20px;
      }
    }
  }
}

/deep/ .ivu-modal {
  width: 50% !important;

  .ivu-modal-header-inner {
    text-align: center;
    font-size: 44PX;
    font-weight: bold;
  }

  .ivu-modal-footer {
    display: none;
  }

  .ivu-modal-content {
    height: 630px !important;
    background: #141a26 !important;
	top:200px;
    .ivu-icon-ios-close {
      color: #fff;
    }

    .fireCon {
      width: 100%;
      height: 550px;
      display: flex;

      .video {
        width: 65%;
        height: 550px;

        .videoTitle {
          width: 100%;
          height: 30px;
          background: url('../../assets/img/main/lan.png');
          background-size: 100% 100%;
          text-align: center;
          color: #000;
          font-size: 44PX;
          font-weight: bold;
        }

        .ocxVideo {
          width: 100% !important;
          height: calc(100% - 30px);

          .videoEl {
            height: 520px;
          }
        }
      }

      .firewarp {
        width: 38%;
        height: 550px;
        margin-left: 10px;

        .fire-alarmInfo {
          width: 100%;
          height: 100%;

          .alarmInfo-title {
            width: 100%;
            height: 30px;
            background: url('../../assets/img/main/lan.png');
            background-size: 100% 100%;
            text-align: center;
            color: #000;
            font-size: 44PX;
            font-weight: bold;
          }

          .alarmInfo-list {
            width: 100%;
            height: calc(100% - 30px);

            ul {
              overflow: hidden;
              margin: 40px 0 0 10px;

              li {
                color: #fff;
                font-size: 18px;
                margin-bottom: 40px;
                width: 100%;
                height: 30px;

                .name, .value {
                  width: 220px;
                  height: 30px;
                  float: left;
                  text-align: left;
                  color: #fff;
                }
				.name{
					width:100px;
				}
                .valueColor1 {
                  color: #49ff01;
                }

                .valueColor2 {
                  color: #ffd36a;
                }
              }
            }
          }
        }

        .fire-alarmImg {
          width: 100%;
          height: 50%;

          .alarmImg-title {
            width: 100%;
            height: 30px;
            background: url('../../assets/img/main/lan.png');
            background-size: 100% 100%;
            text-align: center;
            color: #000;
            font-size: 44PX;
            font-weight: bold;
          }

          .alarmImg {
            width: 100%;
            height: calc(100% - 30px);

            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
	.fireChart{
		width:100%;
		height:240px;
		.chartTitle{
			 width: 100%;
          height: 30px;
          background: url('../../assets/img/main/lan.png');
          background-size: 100% 100%;
          text-align: center;
          color: #000;
          font-size: 44PX;
          font-weight: bold;
		}
		#charts {
              width: 100%;
              height:230px;
            }
	}
  }
}
</style>
