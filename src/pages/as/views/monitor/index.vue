<template>
	<div class="monitor">
		<!-- 头部 -->
		<div class="monitor-top">
			<!-- 右边 -->
			<div class="monitor-right">
				<div class="right-top">
					<div class="right-top-box">
						<div class="content-left">
							<div class="left-top">
								<p>
									预置巡检任务
								</p>
								<ul>
									<li v-for="( item , index ) in presetInspectionArr" :key='index' @click="handelInspecClick(item,index)" :class="{checkedInspection:recordIndex==index}">
										<div :class="item.i_Status == 0 ? 'checkedInspectionStatus2' : 'checkedInspectionStatus1'"></div>
										<p>{{item.vc_Name}}</p>
									</li>
								</ul>
							</div>
							<div class="left-bottom-btn">
								<input type="button" value="巡检成票" class="bottom-btn" @click="inspectionAticketBtn"/>
								<input type="button" value="新增任务" class="bottom-btn" @click='addTaskClick'/>
								<input type="button" value="执行任务" class="bottom-btn" />
								<input type="button" value="停止任务" class="bottom-btn" />
							</div>
							<div class="left-bottom-state">
								<p>
									<i></i>正在执行
								</p>
								<p>
									<i></i>未执行
								</p>
							</div>
						</div>
						<div class="content-right">
							<Tabs :animated="false" type="card" v-model='currentTab'>
								<Tab-pane label="巡检总览" name='inspectionPandect'>
									<div class="inspection-map">
										<img src="../../assets/img/monitor/station-all-img.png" alt="">
									</div>
								</Tab-pane>
								<Tab-pane label="巡检任务单" name='inspectionTask' v-loading="inspectionTaskTableDataLoad" element-loading-background="rgba(7, 42, 115)" :disabled='tabsDisable'>
									<div class="progress-box">
										<Progress :percent="percentage" stroke-color='#00c6ff' /><span>本次巡检共包含目标{{inspectionTarget}}个,已完成0个，剩余{{inspectionTarget}}个</span>
									</div>
									<el-table :data="inspectionTaskTableData" max-height="520" :span-method="objectSpanMethod" :header-cell-style="{ background: '#0d2a68', color: '#2c87e6' , fontSize: '14px' }">
										<!-- @cell-click="rowCliCk" -->
										<el-table-column prop="area" label="区域" align="center" width="80"></el-table-column>
										<el-table-column prop="interval" label="间隔" align="center" width="80"></el-table-column>
										<el-table-column prop="dev" label="设备" align="center" width="80"></el-table-column>
										<el-table-column prop="node" label="巡检点位" align="center"></el-table-column>
										<el-table-column v-for="( item , index ) in workOrderTableHeaderData" :key=index :label="inspectionTaskHeaderText( item )"
										 align="center" width="70">
											<template slot-scope="scope">
												<img src="../../assets/img/common/dui.png" alt style="width: 15px;height: 15px;" v-if="handelCheck( scope.row.robotIDS , item.robotID )" />
											</template>
										</el-table-column>
										<el-table-column label="状态" align="center" width="50">
											<template slot-scope="scope">

											</template>
										</el-table-column>
									</el-table>
								</Tab-pane>
							</Tabs>

						</div>
						<div class="content-bottom">
							<!-- 底部tab切换 -->
							<div class="tab-bar">
								<Tabs :animated="false" type="card">
									<!-- 实时信息 -->
									<Tab-pane label="实时信息">
										<div class="list-content">
											<el-table :data="realTimeInfo" style="width: 100%,back" height="160" :row-style="tableRowStyle"
											 :header-cell-style="tableHeaderColor" @row-click="handleTimeInfoModal">
												<el-table-column prop="date" label="时间" align="center" width="180"></el-table-column>
												<el-table-column prop="name" label="点位" align="center"></el-table-column>
												<el-table-column prop="address" align="center" label="数据来源" width="150"></el-table-column>
												<el-table-column prop="address" align="center" label="识别结果" width="150"></el-table-column>
											</el-table>
										</div>
									</Tab-pane>
									<!-- 设备报警 -->
									<Tab-pane label="设备报警">
										<div class="list-content">
											<el-table :data="tableData" style="width: 100%" height="160" :row-style="tableRowStyle" :header-cell-style="tableHeaderColor"
											 @row-click="handleAlarmModal">
												<el-table-column prop="date" label="时间" align="center" width="180"></el-table-column>
												<el-table-column prop="name" label="点位" align="center"></el-table-column>
												<el-table-column prop="address" align="center" label="数据来源" width="150"></el-table-column>
												<el-table-column prop="address" align="center" label="识别结果" width="150"></el-table-column>
												<el-table-column prop="alarm" align="center" label="报警等级" width="120"></el-table-column>
											</el-table>
										</div>
									</Tab-pane>
								</Tabs>
							</div>
						</div>
					</div>
					<!-- 视频 -->
					<div class="video">
						<div class="videoTitle">
							<span v-for="(item, index) in tableList" :key="index" :class="tabIdx === index ? 'spanActive' : ''" @click="selectTab(item, index)">{{ item.vcName }}</span>
						</div>
						<div class="videoBox">
							<!-- 边角 -->
							<div class="border-lt"></div>
							<div class="border-rb"></div>
							<div class="video1">
								<cvideo :videoConfig="video1"></cvideo>
							</div>
							<div class="video2">
								<cvideo :videoConfig="video2"></cvideo>
							</div>
							<div class="env">
								<!-- 站端环境 -->
								<div class="station-env">
									<p>站端环境</p>
									<div class="env-flex">
										<div class="content">
											<i></i>
											温度：
											<span>{{ temperature }}</span>
										</div>
										<div class="content">
											<i></i>
											湿度：
											<span>{{ humidity }}</span>
										</div>
										<div class="content">
											<i></i>
											风速：
											<span>{{ windSpeed }}</span>
										</div>
									</div>
								</div>
								<!-- 机器人状态 -->
								<div class="robot-status">
									<p>设备运行状态</p>
									<div class="env-flex">
										<div class="content">
											<i></i>
											<p>室外机器人：</p>
											<span>停止</span>
										</div>
										<div class="content">
											<i></i>
											<p>室内机器人：</p>
											<span>停止</span>
										</div>
										<div class="content">
											<i></i>
											<p>轨道机器人：</p>
											<span>停止</span>
										</div>
										<div class="content">
											<i></i>
											<p>高清视频：</p>
											<span>停止</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
		
		<!-- 实时报警 -->
		<ocx-modal v-model="alarmRecordFlag" :width="1000" footer-hide>
			<div class="alarm-detail">
				<img class="img-content" src alt />
				<div class="result">识别结果:</div>
				<div class="btn-group">
					<input type="button" class="btn confirm" value="确定" @click="closeModal" />
					<input type="button" class="btn cancel" value="取消" @click="closeModal" />
				</div>
			</div>
		</ocx-modal>
		<ocx-modal v-model="timeInfoFlag" :width="1000" footer-hide>
			<div class="alarm-detail">
				<img class="img-content" src alt />
				<div class="result">识别结果:</div>
				<div class="btn-group">
					<input type="button" class="btn confirm" value="确定" @click="closeModal" />
					<input type="button" class="btn cancel" value="取消" @click="closeModal" />
				</div>
			</div>
		</ocx-modal>

		<ocx-modal v-model="affirmTicket" :width='350' :mask-closable="false" footer-hide class='affirm'>
			<p style="padding-top: 10px;">确认</p>
			<p style="margin-left: 30px;margin-top: 10px;margin-bottom: 30px;">是否执行巡检成票？</p>
			<div class="modalFooterBtn">
				<input type="button" value="取消" class="btn" @click="affirmTicketNo" />
				<input type="button" value="确定" class="btn cancel"  @click="affirmTicketYes" />
			</div>
		</ocx-modal>
		

		<taskOrder v-if='addTask' @closeAddTask='closeAddTask' @inspectionAticketClick='inspectionAticketClick'></taskOrder>
		
		<ocx-modal v-model="addTaskNext" :width='1000' :mask-closable="false" footer-hide  @on-cancel="closeAddTaskNext">
			<inspectionTaskList :modalInspectionTaskTableData='modalInspectionTaskTableData' :modalWorkOrderTableHeaderData='modalWorkOrderTableHeaderData'
				v-loading="inspectionTaskListLoading" element-loading-text="巡检资源加载中..." element-loading-background="#061638" @closeAddTaskNext='closeAddTaskNext'></inspectionTaskList>
		</ocx-modal>

	</div>
</template>
<script>
	import cvideo from '@/components/native/video/OcxVideo'
	import {debuglog} from 'util'
	import monitorCurrent from '../common/monitor-current.vue'
	import moment from 'moment'
	import taskOrder from '../common/task-order.vue'
	import inspectionTaskList from '../common/inspectionTaskList.vue'
	export default {
		name: 'monitor',
		props: {},
		data() {
			return {
				checkMeterTypeAll: false, //表计全选
				checkRecognitionTypeAll: false, //识别类型全选
				checkdeviceAreaListAll: false, //设备区域全选
				checkedDeviceTypeAll: false, //设备类型全选
				checkedAppearanceTypeAll: false, //设备外观类型全选
				checkedMeterType: [], //默认选中表计类型
				checkedRecognitionType: [], //默认选中识别类型
				checkedDeviceAreaList: [], //默认选中设备区域
				checkedDeviceType: [], //默认选中设备类型
				checkedAppearanceType: [], //默认选中设备外观类型

				isMeterType: false,
				isRecognitionType: false,
				isdeviceAreaList: false,
				isDeviceType: false,
				isAppearanceType: false,

				//选中的数据
				selectAreaList: [], //设备区域
				selectDevType: [], //设备类型
				selectRegType: [], //识别类型
				selectAppearanceType: [], //外观类型
				selectMeterType: [], //表计类型

				axios: this.$_api.monitorData,
				// 任务相关
				currentTaskInfo: null, // 当前活动的 任务
				typeTaskList: [], // 类型列表
				areaTaskList: [{
						AreaID: '19f279a9d206423dad8cdb724f32026e',
						ParentAreaID: '0',
						StationID: '42389edde72d41f4bcd978b574eefbae',
						SvgID: null,
						T3DID: null,
						i_AreaMainType: 150001,
						i_AreaType: null,
						i_Flag: null,
						i_PowerLevel: null,
						i_SortID: 1,
						i_SubsystemID: null,
						vc_Code: null,
						vc_Memo: null,
						vc_Name: '1号主变设备区'
					},
					{
						AreaID: '833039f918e744389468b61670599b13',
						ParentAreaID: '0',
						StationID: '42389edde72d41f4bcd978b574eefbae',
						SvgID: null,
						T3DID: null,
						i_AreaMainType: 150001,
						i_AreaType: null,
						i_Flag: null,
						i_PowerLevel: null,
						i_SortID: 2,
						i_SubsystemID: null,
						vc_Code: null,
						vc_Memo: null,
						vc_Name: '2号主变设备区'
					},
					{
						AreaID: '51a0f2f8ae3b4ef0b3c2291b486829fc',
						ParentAreaID: '0',
						StationID: '42389edde72d41f4bcd978b574eefbae',
						SvgID: null,
						T3DID: null,
						i_AreaMainType: 150001,
						i_AreaType: null,
						i_Flag: null,
						i_PowerLevel: null,
						i_SortID: 3,
						i_SubsystemID: null,
						vc_Code: null,
						vc_Memo: null,
						vc_Name: '3号主变设备区'
					}
				], // 区域列表
				delTaskConfimShow: false,
				topicArr: ['qif/xj/app/data/'],
				topicStr: '',
				msg: '',
				alarmRecordFlag: false, //实时报警弹框开关
				timeInfoFlag: false, //实时信息弹框开关
				tableData: [],
				realTimeInfo: [], //实时信息列表
				// 保存stationId
				stationId: '',
				// 视频tab头
				tabIdx: -1,
				typeCode: '70100001',
				tableList: [],
				tabFirstData: [],
				inspectionType: [],
				specInspSubType: [], //专项巡检子类型表
				espInspSubType: [], //特殊巡检子类型表
				deviceAreaList: [], //设备区域表
				deviceType: [], //设备类型表
				recognitionType: [], //识别类型表
				meterType: [], //表计类型
				appearanceType: [], //设备外观类型

				//巡检类型
				form: {
					inspection: '70100001'
				},
				//专项巡检子类型
				specSubTypeForm: {
					subType: '1'
				},
				//特殊巡检子类型
				espSubTypeForm: {
					subType: '1'
				},

				video1: {
					deviceInfo: '',
					isAutoPlay: true,
					serviceInfo: '',
					hideTool: true
				},
				video2: {
					deviceInfo: '',
					isAutoPlay: true,
					serviceInfo: '',
					hideTool: true
				},
				areaInspectionList: [], //巡检区域数据
				inspectionTypeList: [], //巡检类型数据
				specialIns: [],
				option: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							},
							triggerTooltip: {}
						}
					},
					grid: {
						top: '3%',
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['2019.7.11', '2019.7.12', '2019.7.13', '2019.7.14', '2019.7.15', '2019.7.16', '2019.7.17'],
						axisLine: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: '#fff'
							}
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: false
						},
						splitLine: {
							lineStyle: {
								color: '#2d3650'
							}
						},
						axisLabel: {
							textStyle: {
								color: '#fff'
							}
						}
					},
					series: [{
						data: [1, 3, 4, 3, 3, 1, 7],
						type: 'line',
						areaStyle: {},
						symbol: 'none',
						areaStyle: {
							normal: {
								color: '#0f335f'
							}
						}, //折线区域背景色
						lineStyle: {
							normal: {
								color: '#04a3ff'
							}
						} //折线颜色
					}]
				},
				unitTreeData: [],
				defaultProps: {
					children: 'children',
					label: 'vcName'
				},
				filterText: '',
				temperature: '', //温度
				humidity: '', //湿度
				windSpeed: '', //风速
				selectDeviceFlag: false, //选择设备弹框开关
				inspectionAticket: false, //巡检成票弹框开关


				inspectionAticketModalTitle: '巡检任务单',

				isLoading: false,

				//预置巡检数组
				presetInspectionArr: [],
				recordIndex: 0,
				affirmTicket: false,//巡检成票确认
				presetInspectionTaskId: '',//任务id

				//巡检总览、任务单相关
				currentTab: 'inspectionPandect',
				tabsDisable: true,//初始化时巡检任务单不可点
				workOrderTableHeaderData: [], //巡检任务单表头
				inspectionTaskTableData: [], //巡检任务单表数据
				inspectionTarget: 0, //巡检目标总数
				inspectionTaskTableDataLoad: false, //巡检任务单loading
				percentage: 0,//已完成百分比
				
				addTask: false,
				addTaskNext: false,
				inspectionTaskListLoading: false,
				modalWorkOrderTableHeaderData: [],
				modalInspectionTaskTableData: [],
			}
		},
		computed: {},
		filters: {},
		watch: {
			filterText(val) {
				this.$refs.elFilterTree.$refs['el-tree'].filter(val)
			}
		},
		components: {
			cvideo,
			monitorCurrent,
			inspectionTaskList,
			taskOrder
		},
		created() {
			this.stationId = this.$route.params.stationId
			this.topicStr = this.topicArr[0] + this.stationId
			this.getTabs()
			this.selectTab(this.tabFirstData, 0)
			this.findAsAreaData()
			this.getNuitTreeData()
			this.getStationInfo()
			//console.log( this.stationId )
			//获取预置巡检数据
			this.getPresetInspectionData()

		},
		mounted() {
			this.subscribe(this.topicStr)
			this.$_listen('inspectionmonitor', (topic, message, packet) => {
				let data = ''
				let dataObj = []
				// dataObj = message
				// //转码
				// dataObj.forEach(item => {
				// 	data += String.fromCharCode(item)
				// })
				data = message.toString()
				let msgData = JSON.parse(data)
				if (topic == this.topicStr) {
					//巡检结果
					if (msgData.cmd === '2104') {
						if (msgData.cmd == 2001) {
							msgData.time = moment(msgData.time * 1000).format('YYYY-MM-DD hh:mm:ss')
							this.realTimeInfo.unshift(msgData)
							console.log(_this.realTimeInfo, 'timeinfo')
							// 如果长度超过一百 就删除最初的一个数据
							if (this.realTimeInfo.length > 100) {
								this.realTimeInfo.shift()
							}
						}
					} else if (msgData.cmd === '2106') {
						//任务增加返回
						let taskid = msgData.taskinfo.taskid
						let planid = msgData.taskinfo.planid
						let result = msgData.taskinfo.result

						//下发任务开始执行
						let param = {
							cmd: '2201',
							type: 'req',
							srcid: '',
							serial: '',
							unitid: this.stationId,
							time: new Date().getTime() / 1000,
							tasks: {
								control: 'start',
								serviceid: '',
								planid: planid,
								taskid: taskid,
								userid: 'admin',
								type: ''
							}
						}

						this.$_mqtt.publish(this.topicArr[0] + this.stationId, JSON.stringify(param))
					}
				}
			})
			// 	this.$_echarts.init(this.$refs['chart1']).setOption(this.option)
			// this.$_echarts.init(this.$refs['chart2']).setOption(this.option)
		},
		activited() {},
		update() {},
		beforeDestory() {},
		methods: {
			//点击新增任务
			addTaskClick() {
				this.addTask = true
			},
			//关闭新增任务弹框
			closeAddTask() {
				this.addTask = false
			},
			//点击新增任务弹框的 巡检成票 按钮
			inspectionAticketClick() {
				this.addTask = false
				this.addTaskNext = true
				let addInfos = `TreeIDs=b189f2c0284647608e6a41355108e8ad`
				this.inspectionTaskListLoading = true
				this.axios.getInspectionWorkOrderData(addInfos).then(res => {
					this.inspectionTaskListLoading = false
					this.modalWorkOrderTableHeaderData = res.data.asRobots
					this.modalInspectionTaskTableData = res.data.asTaskNodes
				})
				
				// this.isLoading = true
				// let param = {
				// 	"unitId": this.$store.getters.stationId,
				// 	// asDevAreaList: this.selectAreaList ? this.selectAreaList : this.checkedDeviceAreaList,
				// 	"devTypeId": this.selectDevType ? this.selectDevType : this.checkedDeviceType,
				// 	"intRecogType": this.selectRegType ? this.selectRegType : this.checkedRecognitionType,
				// 	"intSurfaceType": this.selectAppearanceType ? this.selectAppearanceType : this.checkedAppearanceType,
				// 	"intMeterType": this.selectMeterType ? this.selectMeterType : this.checkedMeterType
				// }
				// this.axios.getInspectionTaskTableData(param).then(res => {
				// 	if (res.code == 200) {
				// 		this.inspectionAticketData = res.data
				// 		this.devOrInspec = false
				// 		this.selectDeviceFlag = false
				// 		this.inspectionAticket = true
				// 		this.isLoading = false
				// 	}
				// })
			},
			//关闭新增任务 巡检成票 弹框
			closeAddTaskNext() {
				this.addTaskNext = false
			},
			//点击左侧 巡检成票
			inspectionAticketBtn() {
				//判断是否执行
				this.affirmTicket = true
			},
			//执行左侧 巡检成票
			affirmTicketYes() {
				if( this.presetInspectionTaskId == '' ) {
					return
				}else{
					this.currentTab = 'inspectionTask'
					this.affirmTicket = false
					this.inspectionTaskTableDataLoad = true
					let infos = `TaskID=${this.presetInspectionTaskId}&&UnitID=${this.stationId}`
					this.axios.getInspectionWorkOrderData(infos).then(res => {
						this.tabsDisable = false
						this.workOrderTableHeaderData = res.data.asRobots
						this.inspectionTaskTableData = res.data.asTaskNodes
						this.inspectionTarget = res.data.asTaskNodes.length
						this.inspectionTaskTableDataLoad = false
					})
				}
				
			},
			//不执行左侧 巡检成票
			affirmTicketNo() {
				this.affirmTicket = false
			},
			inspectionTaskHeaderText( info ) {
				let str = ''
				return str = `${info.r_vc_Name} \n (${info.count})`
			},
			//巡检任务单勾选功能
			handelCheck(arr, id) {
				if (arr.indexOf(id) == 0) {
					return true
				}
			},
			//获取预置巡检数据
			getPresetInspectionData() {
				let str = `i_PatrolType=1&&UnitID=${this.stationId}`
				this.axios.getPresetInspectionInfo(str).then(res => {
					this.presetInspectionArr = res.data
					this.presetInspectionTaskId = res.data[0].id
				})
			},
			//点击预置巡检
			handelInspecClick(info,index) {
				this.recordIndex = index
				console.log( info )
				this.presetInspectionTaskId = info.id
			},

			//获取设备ID
			getDevIdFromHt(devId) {
				if (devId) {
					this.devOrInspec = true
					this.inspectionAticket = true
					if (this.$refs['inspecAticketTable']) {
						let targetTrIndex = this.inspectionAticketData.findIndex(node => {
							return node.devId == devIds
						})
						this.$nextTick(() => {
							let targetTr = document.querySelectorAll('#ticketTables .el-table__body-wrapper tr')[
								targetTrIndex
							]
							console.log(targetTr)
							let targetTable = document.querySelector('#ticketTables .el-table__body-wrapper')
							if (targetTr && targetTable) {
								targetTable.scrollTop = targetTr.offsetTop
							}
						})
					}
				}
			},
			//选择巡检类型
			handleSelectInspType(val) {
				this.typeCode = val
				this.getDeviceType()
			},
			getDeviceType() {
				var ctx = this;
				(ctx.isMeterType = false),
				(ctx.isRecognitionType = false),
				(ctx.isdeviceAreaList = false),
				(ctx.isDeviceType = false),
				(ctx.isAppearanceType = false),
				(ctx.checkedMeterType = []),
				(ctx.checkedRecognitionType = []),
				(ctx.checkedDeviceAreaList = []),
				(ctx.checkedDeviceType = []),
				(ctx.checkedAppearanceType = []),
				ctx.axios
					.getInspectionType({
						typeCode: ctx.typeCode,
						unitId: ctx.stationId
						// unitId: '192fe4cec3ec4d3fb81c0d05f82bde41'
					})
					.then(res => {
						//console.log(res.data, 'res')
						var data = res.data
						if (res.code == 200) {
							ctx.inspectionType = data.asType1List
							ctx.espInspSubType = data.asType1List3
							ctx.specInspSubType = data.asType1List2
							ctx.deviceAreaList = data.asDevAreaList
							ctx.meterType = data.asMeterType1List
							ctx.recognitionType = data.asDiscernTypeList
							ctx.deviceType = data.asDevTypeList
							ctx.appearanceType = data.asOutwardList
							ctx.deviceAreaList.map(item => {
								if (item.vcFlag) {
									ctx.checkedDeviceAreaList.push(item)
								}
							})
							if (ctx.checkedDeviceAreaList.length == data.asDevAreaList.length) {
								ctx.checkdeviceAreaListAll = true
							} else {
								ctx.checkdeviceAreaListAll = false
							}
							ctx.deviceType.map(item => {
								if (item.vcFlag) {
									ctx.checkedDeviceType.push(item)
								}
							})
							if (ctx.checkedDeviceType.length == data.asDevTypeList.length) {
								ctx.checkedDeviceTypeAll = true
							} else {
								ctx.checkedDeviceTypeAll = false
							}
							ctx.recognitionType.map(item => {
								if (item.vcFlag) {
									ctx.checkedRecognitionType.push(item)
								}
							})
							if (ctx.checkedRecognitionType.length == data.asDiscernTypeList.length) {
								ctx.checkRecognitionTypeAll = true
							} else {
								ctx.checkRecognitionTypeAll = false
							}
							ctx.meterType.map(item => {
								if (item.vcFlag) {
									ctx.checkedMeterType.push(item)
								}
							})
							if (ctx.checkedMeterType.length == data.asMeterType1List.length) {
								ctx.checkMeterTypeAll = true
							} else {
								ctx.checkMeterTypeAll = false
							}
							ctx.appearanceType.map(item => {
								if (item.vcFlag) {
									ctx.checkedAppearanceType.push(item)
								}
							})
							if (ctx.checkedAppearanceType.length == data.asOutwardList.length) {
								ctx.checkedAppearanceTypeAll = true
							} else {
								ctx.checkedAppearanceTypeAll = false
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			
			//全选表计类型
			handleCheckAllMeterTypeChange(val) {
				this.checkedMeterType = val ? this.meterType : []
				this.isMeterType = false
				if (val == true) {
					this.selectMeterType = this.meterType
				}
			},
			//全选识别类型
			handleCheckAllRecognitionTypeChange(val) {
				this.checkedRecognitionType = val ? this.recognitionType : []
				this.isRecognitionType = false
				if (val == true) {
					this.selectRegType = this.recognitionType
				}
			},
			//全选设备区域
			handleCheckAllDeviceAreaListChange(val) {
				console.log(val, 'val')
				this.checkedDeviceAreaList = val ? this.deviceAreaList : []
				this.isdeviceAreaList = false
				if (val == true) {
					this.selectAreaList = this.deviceAreaList
				}
			},
			//全选设备类型
			handleCheckDeviceTypeAllChange(val) {
				this.checkedDeviceType = val ? this.deviceType : []
				this.isDeviceType = false
				if (val == true) {
					this.selectDevType = this.deviceType
				}
			},
			//全选设备外观类型
			handleCheckAppearanceTypeAllChange(val) {
				this.checkedAppearanceType = val ? this.appearanceType : []
				this.isAppearanceType = false
				if (val == true) {
					this.selectAppearanceType = this.appearanceType
				}
			},
			//选择设备外观类型
			handleCheckedAppearanceTypeChange(value) {
				console.log(value, '设备外观类型')
				let checkedCount = value.length
				this.checkedAppearanceTypeAll = checkedCount === this.appearanceType.length
				// this.isAppearanceType = checkedCount > 0 && checkedCount < this.appearanceType.length
				this.selectAppearanceType = value
			},
			//选择设备类型
			handleCheckedDeviceTypeChange(value) {
				console.log(value, '设备类型')
				let checkedCount = value.length
				this.checkedDeviceTypeAll = checkedCount === this.deviceType.length
				// this.isDeviceType = checkedCount > 0 && checkedCount < this.deviceType.length
				this.selectDevType = value
			},
			//选择设备区域
			handleCheckedDeviceAreaListChange(value) {
				console.log(value, '区域')
				let checkedCount = value.length
				this.checkdeviceAreaListAll = checkedCount === this.deviceAreaList.length
				// this.isdeviceAreaList = checkedCount > 0 && checkedCount < this.deviceAreaList.length
				this.selectAreaList = value
			},
			//选择表计类型
			handleCheckedMeterTypeChange(value) {
				console.log(value, '表计')
				let checkedCount = value.length
				this.checkMeterTypeAll = checkedCount === this.meterType.length
				// this.isMeterType = checkedCount > 0 && checkedCount < this.meterType.length
				this.selectMeterType = value
			},
			//选择识别类型
			handleCheckedRecognitionTypeChange(value) {
				console.log(value, '识别')
				let checkedCount = value.length
				this.checkRecognitionTypeAll = checkedCount === this.recognitionType.length
				// this.isRecognitionType = checkedCount > 0 && checkedCount < this.recognitionType.length
				this.selectRegType = value
			},
			_forEach: function(data, isTrue, callback) {
				var arr = []
				for (var i = 0; i < data.length; i++) {
					arr.push(data[i])
				}
				while (arr.length) {
					var _p = arr.shift()
					if (callback(_p) == false) {
						return
					}
					if (isTrue && _p.children) {
						for (var j = _p.children.length - 1; j >= 0; j--) {
							arr.unshift(_p.children[j])
						}
					}
				}
			},
			subscribe(topicArr) {
				// this.$_mqtt.connected
				if (true) {
					this.$_mqtt.unsubscribe(topicArr, err => {
						if (err) {
							console.log('取消MQTT订阅失败')
						} else {
							console.log('取消MQTT订阅成功')
							this.$_mqtt.subscribe(topicArr, err => {
								if (err) {
									console.log('订阅失败!')
								} else {
									console.log('订阅成功!')
								}
							})
						}
					})
				} else {
					console.log('MQTT连接失败')
				}
			},
			stop() {
				// this.$_mqtt.end()
				this.$_mqtt.unsubscribe(this.testTopicArr, err => {
					if (err) {
						console.log('取消MQTT订阅失败')
					} else {
						console.log('取消MQTT订阅成功')
					}
				})
			},
			//合并单元格的方法
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				//console.log( row )
				if (columnIndex === 0) {
					const _row = this.desData('mainArea', this.inspectionTaskTableData)[rowIndex]
					const _col = _row > 0 ? 1 : 0
					return {
						rowspan: _row,
						colspan: _col
					}
				}
				if (columnIndex === 1) {
					const _row = this.desData('subArea', this.inspectionTaskTableData)[rowIndex]
					const _col = _row > 0 ? 1 : 0
					return {
						rowspan: _row,
						colspan: _col
					}
				}
				if (columnIndex == 2) {
					const _row = this.desData('devName', this.inspectionTaskTableData)[rowIndex]
					const _col = _row > 0 ? 1 : 0
					return {
						rowspan: _row,
						colspan: _col
					}
				}
			},
			// 核心处理 数据方法
			desData(key, data) {
				let contactDot = 0
				let spanArr = []
				data.forEach((item, index) => {
					item.index = index
					if (index === 0) {
						spanArr.push(1)
					} else {
						if (item[key] === data[index - 1][key]) {
							spanArr[contactDot] += 1
							spanArr.push(0)
						} else {
							spanArr.push(1)
							contactDot = index
						}
					}
				})
				return spanArr
			},
			//点击巡检任务单某一行
			rowCliCk(row, column) {
				let str = column.label.substring(0, 2)
				if (str == '室外') {
					row.outdoor_ground = !row.outdoor_ground
				} else if (str == '室内') {
					row.indoor = !row.ndoor
				} else if (str == '高清') {
					row.camera = !row.camera
				} else if (str == '智辅') {
					row.zhifu = !row.zhifu
				} else if (str == '无人') {
					row.uav = !row.uav
				}
			},
			handleReachBottom() {
				return new Promise(resolve => {
					setTimeout(() => {
						const last = this.presetInspectionList[this.presetInspectionList.length - 1]
						for (let i = 1; i < 11; i++) {
							this.presetInspectionList.push(last + i)
						}
						resolve()
					}, 2000)
				})
			},
			//报警弹框
			handleAlarmModal(row) {
				this.alarmRecordFlag = true
				console.log(row)
			},
			//实时信息弹框
			handleTimeInfoModal(row) {
				this.timeInfoFlag = true
			},
			// 修改table tr行的背景色
			tableRowStyle({
				row,
				rowIndex
			}) {
				return 'color: #fff;'
			},
			// 修改table header的背景色
			tableHeaderColor({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (rowIndex === 0) {
					return 'background:rgba(17,46,107,.8);color: #3094f8;font-weight: 500;'
				}
			},
			//关闭模态框
			closeModal() {
				this.alarmRecordFlag = false
				this.timeInfoFlag = false
			},
			getTabs() {
				this.$_api.monitorData
				// .getTitleData({
				// 	unitId: '42389edde72d41f4bcd978b574eefbae'
				// }) //测试传固定id
				this.$_api.monitorData
					.getTitleData({
						unitId: this.stationId
					})
					.then(res => {
						if (res.success) {
							this.tableList = res.data
							this.tabFirstData = res.data[0]
						} else {
							console.log(res.msg)
						}
					})
					.catch(error => {
						console.log(error)
					})
			},

			//  选择tab页签加载视频
			selectTab(item, idx) {
				this.tabIdx = idx
				let params = {
					robotId: item.robotId,
					serviceId: item.serviceId,
					unitId: item.unitId
				}
				// 请求接口获取机器人红外和可见光的视频地址
				this.$_api.monitorData
					.getVideoData(params)
					.then(res => {
						if (res.success) {
							this.video1.deviceInfo = res.data[0].deviceInfo
							this.video2.deviceInfo = res.data[1].deviceInfo
						} else {
							console.log(res.msg)
						}
					})
					.catch(error => {
						console.log(error)
					})
			},
			//点击 执行任务 按钮
			executeTaskClick() {
				this.$refs['area'].innerHTML = this.selectAreaList.length ?
					this.selectAreaList[0].typeName :
					'请选择巡检区域'
				// console.log('666')
				let data = {
					cmd: '2202',
					type: 'req',
					srcid: '',
					destid: '',
					serial: '',
					unitid: this.stationId,
					time: new Date().getTime() / 1000,
					tasknode: [{
							nodeid: '1',
							sortid: '0'
						},
						{
							nodeid: '2',
							sortid: '0'
						}
					]
				}
				//通过mqtt下发新增任务指令
				this.$_mqtt.publish(this.topicArr[0] + this.stationId, JSON.stringify(data))
				this.inspectionAticket = false
			},
			//关闭巡检任务单弹框
			closeInspectionTicket() {
				this.inspectionAticket = false
			},
			//tabs切换
			handelTabCkick(name) {
				console.log(name)
			},
			//发送获取巡检区域请求
			findAsAreaData() {
				// this.axios
				//   .findAsArea({
				//     unitid: this.stationId
				//   })
				//   .then(res => {
				//     if (res.code == 200) {
				//       this.areaInspectionList = res.data
				//     }
				//   })
			},
			//获取站端信息
			getStationInfo() {
				var ctx = this
				ctx.$_api.monitorData
					.getStationInfo({
						unitID: this.stationId
					})
					.then(res => {
						var data = res.data
						for (let i = 0, len = data.length; i < len; i++) {
							if (data[i].type == 1) {
								ctx.temperature = data[i].value ? data[i].value + '℃' : '--'
							} else if (data[i].type == 2) {
								ctx.humidity = data[i].value ? data[i].value + '%' : '--'
							} else if (data[i].type == 3) {
								ctx.windSpeed = data[i].value ? data[i].value + 'm/s' : '--'
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			//获取变电站数数据
			getNuitTreeData() {
				this.axios.getUnitTreeData({
					iFlag: 1
				}).then(res => {
					if (res.code == 200) {
						this.unitTreeData = res.data
					}
				})
			},
			filterNode(value, data) {
				if (!value) return true
				return data.title.indexOf(value) !== -1
			},
			// 点击树节点
			handleClickNode(data, node, root) {
				// 更新当前模块单元id
				//this.$store.commit('UPDATE_UNITID', data.id)
				// console.log(this.$store.getters.unitId)
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
<style lang="stylus" scoped>
	.monitor {
		width: 100%;
		height: 1070px;

		.taskGroupImg {
			width: 20px;
			height: 20px;
			cursor: pointer;
			position: absolute;
			left: 280px;
			top: 10px;
		}

		.monitor-top {
			width: 100%;
			height: 865px;

			.monitor-left {
				float: left;
				width: 15%;
				height: 100%;

				.unitTreeBox {
					width: 100%;
					height: 825px;
					background: #09112f;
					overflow: auto;
					padding: 0 15px;
					margin: 0 15px;
				}

				.slide-fade-enter-active {
					transition: all 0.3s ease;
				}

				.slide-fade-leave-active {
					transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
				}

				.slide-fade-enter,
				.slide-fade-leave-to {
					transform: translateX(-10px);
					opacity: 0;
				}

				.task-group {
					width: 320px;
					height: 800px;
					position: absolute;
					left: 300px;
					top: 70px;
					background: #09112f;
					z-index: 1;

					// #09112f
					/deep/.ivu-tabs-bar {
						.ivu-tabs-tab {
							width: 76%;
							text-align: center;
							background: url('~@/assets/img/common/bg540.png') no-repeat;
							background-size: 100% 100%;
							color: #fff;
							border: none;
						}

						.ivu-tabs-tab-active {
							color: #ffd36a;
						}
					}

					.temporary-inspection {
						height: 710px;
						padding-left: 15px;

						p {
							display: inline;
							font-size: 15px;
							color: green;
							line-height: 25px;
							padding-left: 10px;
						}

						.inFirst {
							max-height: 200px;
							overflow: auto;

							ul li {
								list-style: none;
								font-size: 15px;
								color: #fff;
								line-height: 40px;
								margin-left: 20px;
								cursor: pointer;
							}

							ul li:hover {
								background: #38b0de;
							}
						}

						.inSencond {
							.special {
								p {
									color: #fff;
									font-size: 15px;
								}
							}

							li {
								color: #fff;
								font-size: 15px;
								line-height: 40px;
								margin-left: 20px;
								cursor: pointer;

								/deep/ .el-button {
									width: 40px;
									height: 25px;
									float: right;
									margin-right: 20px;
									padding: 0;
									background: url('../../assets/img/monitor/bg17.png') no-repeat;
									background-size: 100% 100%;
								}
							}
						}
					}

					.preset-inspection {
						height: 710px;

						/deep/.ivu-card-bordered {
							border: none;
							background: none;
							color: #fff;
							text-align: center;
						}
					}

					i {
						display: inline-block;
						width: 10px;
						height: 10px;
						border-radius: 50%;
					}
				}

				.button-group {
					height: 10%;
					width: 100%;

					.btn {
						float: left;
						width: 40%;
						height: 40%;
						margin-left: 10px;
						font: 100 16px / 30px '';
						background: url('~@/assets/img/common/bg17.png') no-repeat;
						text-align: center;
						color: #fff;
						background-size: 100% 100%;
					}
				}
			}

			.monitor-right {
				float: left;
				width: 100%;
				height: 100%;
				background: url('~@/assets/img/common/bg-border.png') no-repeat center;
				background-size: 100% 100%;

				.right-top {
					width: 100%;
					height: 100%;

					.nInspection {
						padding: 13px;

						span {
							margin-left: 100px;
							color: #90d9ff;
							font-size: 20px;

							i {
								color: #ffd36a;
								cursor: pointer;
							}
						}
					}

					.right-top-box {
						float: left;
						width: 1115px;
						height: 530px;
						//border: 1px solid #063765;
						margin-top: 20px;
						margin-left: 40px;

						.content-left {
							width: 223px;
							height: 615px;
							border: 1px solid #064886;
							float: left;

							//padding-top: 7px;
							.left-top {
								width: 220px;
								height: 469px;

								p {
									font-size: 16px;
									color: #fff;
									margin: 10px 0 10px 17px;
								}

								ul {
									display: block;
									width: 100%;
									height: 430px;
									overflow-y: auto;

									li {
										padding: 5px 0 0px 20px;
										color: #fff;
										cursor: pointer;

										div {
											display: inline-block;
											width: 14px;
											height: 14px;
											//background: #5990fe;
											border-radius: 10px;
											margin-right: 5px;
											vertical-align: middle;
										}

										p {
											display: inline-block;
											width: 155px;
											height: 100%;
											font-size: 14px;
											vertical-align: middle;
											margin-left: 10px;
										}
									}
								}


								/deep/.ivu-tabs-bar {
									.ivu-tabs-tab {
										width: 90px;
										text-align: center;
										background: url('~@/assets/img/common/bg540.png') no-repeat;
										background-size: 100% 100%;
										color: #fff;
										border: none;
										margin-left: 12px;
									}

									.ivu-tabs-tab-active {
										color: #ffd36a;
									}
								}

								.ivu-collapse {
									background: none;
									border: none;
								}

								/deep/.ivu-collapse-content {
									background: none;

									.ivu-collapse-content-box {
										padding: 0;
									}
								}

								/deep/.ivu-collapse-header {
									border-bottom: none;
									color: #90d9ff;

									i {
										color: #fff
									}
								}

								.ivu-collapse-item {
									border-top: none;
								}

								.inspection-area {
									div {
										display: inline-block;
										width: 10px;
										height: 10px;
										background: #5990fe;
										border-radius: 10px;
										margin-right: 5px;
									}

									li {
										color: #e9ebee;
										font-size: 14px;
										line-height: 30px;
										margin-left: 20px;
										cursor: pointer;
									}

								}

							}


							.left-bottom-btn {
								width: 220px;
								height: 80px;
								margin-top: 4px;

								.bottom-btn {
									background: url('~@/assets/img/common/bg17.png') no-repeat;
									background-size: 100% 100%;
									width: 90px;
									height: 30px;
									border-radius: 2px;
									text-align: center;
									margin-left: 14px;
									border: 0;
									color: #e9ebee;
									cursor: pointer;
									margin-bottom: 10px;
								}

								.bottom-btn:active {
									color: #ffd36a;
								}

							}


							.left-bottom-state {
								width: 220px;
								height: 50px;
								background: #092252;

								p {
									float: left;
									font-size: 14px;
									color: #fff;
									margin: 15px 0 0 20px;
									line-height: 20px;

									i {
										width: 14px;
										height: 14px;
										display: inline-block;
										border-radius: 50%;
										margin-right: 14px;
									}
								}

								p:nth-of-type(1) i {
									background: #58b229;
								}

								p:nth-of-type(2) i {
									background: #d59f1e;
								}

							}
						}

						.content-right {
							width: 880px;
							height: 615px;
							border: 1px solid #064886;
							float: left;
							margin-left: 5px;
							padding-top: 7px;

							.inspection-map {
								width: calc(100% - 20px);
								height: 550px;
								margin-top: 15px;
								margin-left: 10px;

								img {
									width: 100%;
									height: 100%;
								}
							}

							/deep/.ivu-tabs-bar {
								margin-bottom: 0;

								.ivu-tabs-tab {
									width: 115px;
									text-align: center;
									background: url('~@/assets/img/common/bg540.png') no-repeat;
									background-size: 100% 100%;
									color: #fff;
									border: none;
									margin-left: 12px;
								}

								.ivu-tabs-tab-active {
									color: #ffd36a;
								}
							}
							/deep/.el-loading-mask{
								margin-top: 0;
								background: #072a73;
							}
							/deep/.el-table {
								margin-left: 10px;
								margin-top: 6px;
								width: calc(100% - 20px);
								border-collapse: collapse !important;
								border: 1px solid #0098ff;

								//border-bottom: 1px solid #0098ff;
								/deep/th {
									padding: 0;
								}

								/deep/.cell {
									padding: 0;
								}

								/deep/td,
								/deep/th.is-leaf {
									border: 1px solid #0098ff !important;
									font-size: 14px;
									color: #fff;
								}

								/deep/td {
									height: 50px;
								}

								/deep/.el-table__body-wrapper {
									/deep/.el-table_1_column_1,
									/deep/.el-table_1_column_2,
									/deep/.el-table_1_column_3 {
										vertical-align: top;
									}

									/deep/.el-table_6_column_37,
									/deep/.el-table_6_column_38,
									/deep/.el-table_6_column_39 {
										vertical-align: top;
									}
								}

							}

							.progress-box {
								width: 580px;
								background: #062157;
								margin-left: 10px;
								width: calc(100% - 20px);
								height: 36px;
								margin-top: 4px;
								border: 1px solid #053d79;
								color: #ffffff;
								font-size: 14px;
								line-height: 34px;

								span {
									margin-left: 20px;
								}

								/deep/.ivu-progress-inner {
									background-color: #051535;
								}

								/deep/.ivu-progress-inner {
									border-radius: 0;
								}

								/deep/.ivu-progress-bg {
									border-radius: 0;
								}

								.ivu-progress {
									width: 370px;
									margin-left: 18px;
								}

								span {
									margin-left: 15px;
									color: #ffffff;
								}

								p {
									display: inline-block;
								}

							}
							
							/deep/.el-table{
								// 滚动条的宽度
								::-webkit-scrollbar {
									width: 5px;
									height: 10px;
								}
								// 滚动条的滑块
								::-webkit-scrollbar-thumb {
									background-color: #a1a3a9;
								}
							}

						}

						.content-bottom {
							width: 1115px;
							height: 210px;
							float: left;
							margin-top: 10px;

							.tab-bar {
								float: left;
								height: 210px;
								width: 100%;
								background: url('../../assets/img/monitor/bigBg2.png') no-repeat;
								background-size: 100% 100%;

								/deep/.ivu-tabs-bar {
									margin: 10px 0 0 10px;

									.ivu-tabs-tab {
										width: 76%;
										text-align: center;
										background: url('~@/assets/img/common/bg540.png') no-repeat;
										background-size: 100% 100%;
										color: #fff;
										border: none;
									}

									.ivu-tabs-tab-active {
										color: #ffd36a;
									}
								}

								.list-content {
									height: 165px;
									width: 98%;
									margin: 0 auto;
									margin-top: 5px;

								}

								.operation {
									width: 48px;
									height: 26px;
									text-align: center;
									line-height: 8px;
									color: #6298bb;
									background: url('~@/assets/img/common/bg17.png') no-repeat;
									background-size: 100% 100%;
								}

								/deep/.el-table td,
								/deep/.el-table th {
									padding: 7px 0;
								}
							}




						}


						.entity {
							width: 100%;
							height: 100%;
							background: pink;
							margin: 10px;
						}


					}

					.video {
						float: left;
						width: 435px;
						height: 100%;
						margin-top: 60px;
						margin-left: 10px;

						.videoTitle {
							width: 100%;
							margin-bottom: 10px;
							margin-top: -38px;

							span {
								display: inline-block;
								height: 28px;
								line-height: 28px;
								text-align: center;
								color: #fff;
								padding: 0 5px;
								margin-right: 10px;
								border-radius: 4px;
								cursor: pointer;
								background: url('~@/assets/img/common/bg540.png') no-repeat;
								background-size: 100% 100%;
							}

							.spanActive {
								color: #f8cf66;
							}
						}

						.videoBox {
							width: 100%;
							height: 615px;

							.border-lt {
								position: absolute;
								top: -7px;
								left: -7px;
								width: 35px;
								height: 30px;
								background: url('~@/assets/img/common/border-lt.png') no-repeat;
								background-size: 35px 30px;
							}

							.border-rb {
								position: absolute;
								bottom: -7px;
								right: -7px;
								width: 35px;
								height: 30px;
								background: url('~@/assets/img/common/border-rb.png') no-repeat;
								background-size: 35px 30px;
							}

							.video1,
							.video2 {
								width: 400px;
								height: 282px;

								.ocxVideo {
									width: 400px;
								}

							}

							.video1 {
								margin-bottom: 12px;
							}

							.env {
								//float: left;
								width: 410px;
								height: 198px;
								margin: 20px 0 0 0;
								border: 1px solid #063765;
								padding-left: 10px;
								padding-top: 2px;

								.env-flex {
									height: 170px;
									display: flex;
									flex-direction: column;
									justify-content: space-around;


									.content {
										height: 27px;
										font-size: 20px;
										line-height: 27px;
										color: #fff;

										i {
											display: inline-block;
											width: 17px;
											height: 17px;
											margin: -2px 6px;
										}

										p {
											display: inline-block;
											width: 140px;
										}
									}
								}

								p {
									width: 120px;
									height: 30px;
									font-size: 20px;
									line-height: 30px;
									color: #fff;
								}

								span {
									display: inline-block;
									color: #49ff01;
									font-size: 20px;
								}

								.robot-status {
									float: left;
									width: 56%;

									p {
										width: 160px;
									}

									.content:nth-of-type(1) i {
										background: url('../../assets/img/monitor/robot-out.png') no-repeat center;
										background-size: 100% 100%;
									}

									.content:nth-of-type(2) i {
										background: url('../../assets/img/monitor/robot-in.png') no-repeat center;
										background-size: 100% 100%;
									}

									.content:nth-of-type(3) i {
										background: url('../../assets/img/monitor/robot-pathway.png') no-repeat center;
										background-size: 100% 100%;
									}

									.content:nth-of-type(4) i {
										background: url('../../assets/img/monitor/video.png') no-repeat center;
										background-size: 100% 100%;
									}
								}

								.station-env {
									float: left;
									width: 44%;

									p {
										margin-left: 15px;
									}

									.content:nth-of-type(1) i {
										background: url('../../assets/img/monitor/temperature.png') no-repeat center;
										background-size: 100% 100%;
									}

									.content:nth-of-type(2) i {
										background: url('../../assets/img/monitor/humidity.png') no-repeat center;
										background-size: 100% 100%;
									}

									.content:nth-of-type(3) i {
										background: url('../../assets/img/monitor/wind-speed.png') no-repeat center;
										background-size: 100% 100%;
									}
								}
							}

						}
					}
				}


			}
		}
	}

	.alarm-detail {
		width: 100%;
		height: 700px;
		// background: url('../../assets/img/common/bg.png') no-repeat center;
		background-size: 100% 100%;

		.img-content {
			width: 800px;
			height: 500px;
			margin: 60px 0 0 90px;
		}

		.result {
			margin: 20px 0 0 50px;
			font-size: 20px;
			line-height: 30px;
			height: 30px;
		}

		.btn-group {
			height: 40px;

			.btn {
				width: 150px;
				height: 40px;
				background: url('../../../../assets/img/common/bg540.png') no-repeat center;
				background-size: 100% 100%;
				border-radius: 3px;
				text-align: center;
				margin: 5px;
				border: 0;
				color: #fff902;
				font: 100 20px / 40px '';
				cursor: pointer;
			}

			.confirm {
				margin-left: 590px;
			}

			.cancel {
				color: #fff;
			}
		}

		.detail-info {
			float: left;
			width: 374px;
			height: 800px;
			background: url('../../assets/img/monitor/border.png') no-repeat;
			background-size: 100% 100%;
			margin: 64px 0 0 45px;

			.datawrap {
				width: 100%;
				height: 50px;
				font: 900 20px / 50px '';
				margin: 5px 0;

				.name {
					float: left;
					width: 160px;
					margin-left: 10px;
					color: #fff;
					text-indent: 24px;

					i {
						display: inline-block;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background: #5990fe;
						margin-right: 24px;
					}
				}

				.content {
					float: left;
					width: 170px;
					margin-left: 20px;
					color: #2e70a9;
				}
			}
		}

		.map-video {
			float: left;
			width: 1100px;
			margin-left: 15px;

			.video {
				height: 386px;
				margin-top: 65px;
			}

			.map {
				height: 384px;
				margin-top: 27px;

				.map-content {
					float: left;
					width: 878px;
					height: 100%;
					background: url('~@/assets/img/common/bg-border2.png') no-repeat;
					background-size: 100% 100%;

					.chart {
						width: 800px;
						height: 300px;
						margin: 30px 0 0 20px;
					}
				}

				.modal-btn-group {
					float: left;
					width: 180px;
					height: 358px;
					margin: 18px 0 0 15px;
					border: 1px solid #06335f;

					.btn {
						width: 150px;
						height: 36px;
						background: url('~@/assets/img/common/bg540.png') no-repeat center;
						background-size: 100% 100%;
						border-radius: 3px;
						text-align: center;
						margin: 40px 0 0 15px;
						font: 100 14px / 30px '';
						color: #fff;
					}
				}
			}
		}
	}



	.time-info {
		width: 100%;
		height: 100%;

		.modal-img {
			height: 400px;
			width: 100%;

			.img-content {
				display: inline-block;
				width: 400px;
				height: 400px;
			}
		}
	}

	.line-map {
		width: 100%;
		height: 384px;

		.chart {
			width: 800px;
			height: 320px;
			padding-top: 30px;
			background: url('~@/assets/img/common/bg-border2.png') no-repeat;
			background-size: 100% 100%;
			margin-left: 300px;
		}
	}

	.inspection-type {
		height: 900px;
		// background: url('~@/assets/img/common/bg-border.png') no-repeat;
		background-size: 100% 100%;
		overflow: hidden;

		.select-type {
			width: 1462px;
			height: 60px;
			background: #0c1b3b;
			margin-left: 50px;
			margin-top: 15px;

			/deep/.el-form {
				margin-left: 25px;
			}

			/deep/.el-form-item__label,
			.el-radio {
				font: 100 18px / 60px '';
				color: #35a2ff;
			}

			/deep/.el-radio__label {
				font-size: 20px;
			}

			/deep/.el-form-item__label {
				font-size: 20px;
			}
		}

		.sub-type {
			width: 1462px;
			height: 40px;
			background: #0c1b3b;
			margin-left: 52px;

			/deep/.el-form-item__label,
			.el-radio {
				font: 100 20px / 40px '';
				color: #35a2ff;
			}
		}

		.list-con {
			margin: 30px 0;
			height: 100px;

			.title {
				float: left;
				width: 150px;
				height: 30px;
				font-size: 20px;
				line-height: 30px;
				color: #8fd8fe;
				margin: 20px 0 0 74px;
			}

			.select {
				float: left;
				width: 1240px;

				/deep/.el-checkbox {
					float: left;
					margin-top: 20px;
					width: 212px;
				}

				/deep/.el-checkbox-group {
					float: left;
					margin-left: 117px;
					margin-top: -49px;
					height: 100px;
					overflow: auto;
					width: 1230px;
				}
			}

			/deep/.el-checkbox__label {
				font-size: 20px;
				line-height: 30px;
				color: #8fd8fe;
			}
		}

		.list-con:nth-child(odd) {
			background: #0d1841;
		}

		.type-bottom {
			height: 66px;

			.selected-num {
				float: left;
				height: 100%;
				font: 100 16px / 66px '';
				color: #fff;
				margin-left: 80px;

				span {
					color: #ffff7a;
				}
			}
		}

		.task-order {
			float: right;
			margin: 15px 70px 0 0;

			.btn {
				width: 150px;
				height: 40px;
				background: url('~@/assets/img/common/bg540.png') no-repeat;
				background-size: 100% 100%;
				text-align: center;
				margin: 5px;
				cursor: pointer;
				border: 0;
				color: #d8c50e;
				font: 100 20px / 40px '';
			}

			.cancel {
				color: #fff;
			}
		}
	}

	/deep/.el-checkbox__inner::after {
		box-sizing: content-box;
		content: '';
		border: 0.1544rem solid #FFF;
		border-left: 0;
		border-top: 0;
		height: 0.32111rem;
		left: 0.17778rem;
		position: absolute;
		top: 1px;
		transform: rotate(45deg) scaleY(0);
		width: 0.14333rem;
		transition: transform 0.15s ease-in 0.05s;
		transform-origin: center;
	}

	.checkedInspection {
		background: #08358c;
	}

	.checkedInspectionStatus1 {
		background: #58b229;
	}

	.checkedInspectionStatus2 {
		background: #d59f1e;
	}

	/deep/.ivu-tabs-bar {
		border: none;
	}

	/deep/.ivu-modal {
		top: 0;
	}

	/deep/.el-checkbox__inner {
		width: 16px;
		height: 16px;
		margin-top: -5px;
	}

	/deep/.ivu-modal-content {
		background: url('~@/assets/img/navigation/background.png') no-repeat;
		background-size: 100% 100%;
	}


	/deep/.ivu-modal-header,
	/deep/.ivu-modal-footer {
		border: 0;
	}

	/deep/.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
		border-radius: 5px;
	}

	/deep/.el-table_3_column_10,
	/deep/.el-table_3_column_11 {
		vertical-align: top;
	}

	/deep/.el-table::before {
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0px;
	}

	/deep/.el-table td,
	/deep/.el-table th.is-leaf {
		border: none;
	}

	/deep/.el-table,
	/deep/.el-table__expanded-cell {
		background: none;
	}

	/deep/.el-table tbody tr:hover>td {
		background: none;
	}

	/deep/.el-table th,
	/deep/.el-table tr {
		background: none;
	}

	/deep/.el-table .cell {
		white-space: pre-line;
	}

	/deep/.ivu-modal {
		/deep/.ivu-modal-body {
			padding-top: 0 !important;
		}

		/deep/.ivu-modal-header {
			padding-left: 45px !important;

			/deep/.ivu-modal-header-inner {
				font-size: 23px !important;
			}
		}
	}

	/deep/.el-progress-bar__outer {
		background: #062056;
	}

	/deep/.el-loading-text {
		font-size: 20px;
	}
	
	.modalFooterBtn {
		position: absolute;
		right: 10px;
		bottom: 10px;
		
		.btn {
			width: 40px;
			height: 20px;
			background: url('../../../../assets/img/common/bg540.png') no-repeat center;
			background-size: 100% 100%;
			border-radius: 3px;
			text-align: center;
			margin: 5px;
			border: 0;
			color: #b0e1f9;
			font-size: 14px;
			cursor: pointer;
		}
		
		.btn:active{
			color: #fff902;
		}
	}
	
	.affirm{
		/deep/.ivu-modal{	
			top: 240px;
		}
	}
	/deep/.el-loading-mask{
		margin-top: 10px;
	}
	
</style>
