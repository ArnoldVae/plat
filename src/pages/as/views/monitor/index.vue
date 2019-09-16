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
								<p>预置巡检任务</p>
								<ul>
									<li
										v-for="(item, index) in presetInspectionArr"
										:key="index"
										@click="handelInspecClick(item, index)"
										:class="{ checkedInspection: recordIndex == index }"
									>
										<!-- <div :class="item.i_Status == 70140001? 'checkedInspectionStatus1': 'checkedInspectionStatus2'"></div> -->
										<!-- <p>{{ item.vc_Name }}</p> -->
										<div
											:class="
												item.intStatus == 70140001
													? 'checkedInspectionStatus1'
													: 'checkedInspectionStatus2'
											"
										></div>
										<p>{{ item.taskName }}</p>
									</li>
								</ul>
							</div>
							<div class="left-bottom-btn">
								<input type="button" value="新增任务" class="bottom-btn" @click="addTaskClick" />
								<input
									type="button"
									value="巡检成票"
									class="bottom-btn"
									@click="inspectionAticketBtn"
								/>
								<input
									type="button"
									value="执行任务"
									class="bottom-btn"
									@click="executeTaskClick('start')"
								/>
								<input
									type="button"
									value="停止任务"
									class="bottom-btn"
									@click="executeTaskClick('stop')"
								/>
							</div>
							<div class="left-bottom-state">
								<p><i></i>正在执行</p>
								<p><i></i>未执行</p>
							</div>
						</div>
						<div class="content-right">
							<Tabs :animated="false" type="card" v-model="currentTab">
								<Tab-pane label="巡检总览" name="inspectionPandect">
									<div class="inspection-map">
										<img src="../../assets/img/monitor/station-all-img.png" alt />
									</div>
								</Tab-pane>
								<Tab-pane
									label="巡检任务单"
									name="inspectionTask"
									v-loading="inspectionTaskTableDataLoad"
									element-loading-background="rgba(7, 42, 115)"
									element-loading-text="巡检数据加载中"
									:disabled="tabsDisable"
								>
									<div class="progress-box">
										<Progress :percent="percentage" stroke-color="#00c6ff" />
										<span>
											本次巡检共包含目标{{ inspectionTarget }}个,已完成{{ finishNum }}个，剩余{{
												residueNum
											}}个
										</span>
									</div>
									<el-table
										ref="inspecAticketTable"
										id="ticketTableScroll"
										:data="inspectionTaskTableData"
										max-height="475"
										:span-method="objectSpanMethod"
										border
										:header-cell-style="{
											background: '#1d63b9',
											color: '#fff',
											fontSize: '14px',
											fontWeight: 500
										}"
									>
										<el-table-column
											prop="area"
											label="区域"
											align="center"
											width="80"
										></el-table-column>
										<el-table-column
											prop="interValue"
											label="间隔"
											align="center"
											width="80"
										></el-table-column>
										<el-table-column
											prop="dev"
											label="设备"
											align="center"
											width="110"
										></el-table-column>
										<el-table-column prop="node" label="巡检点位" align="center"></el-table-column>
										<el-table-column
											v-for="(item, index) in workOrderTableHeaderData"
											:key="index"
											:label="inspectionTaskHeaderText(item)"
											align="center"
											width="80"
										>
											<template slot-scope="scope">
												<img
													src="../../assets/img/common/dui.png"
													alt
													style="width: 15px;height: 15px;"
													v-if="handelCheck(scope.row.robotIds, item.id)"
												/>
											</template>
										</el-table-column>
										<el-table-column label="状态" align="center" width="55">
											<template slot-scope="scope">
												<i
													:class="
														scope.row.status == '0'
															? 'statePageTab'
															: scope.row.status == '1'
															? 'statePageTabErr'
															: ''
													"
												></i>
											</template>
										</el-table-column>
									</el-table>
									<div class="pageBox">
										<Page
											:total="totalNum"
											show-elevator
											:current.sync="pageNum"
											:page-size="pageSize"
											@on-change="handleChangePage"
										/>
									</div>
								</Tab-pane>
							</Tabs>
						</div>
						<div class="content-bottom">
							<!-- 底部tab切换 -->
							<div class="tab-bar">
								<Tabs :animated="false" type="card" v-model="name">
									<!-- 实时信息 -->
									<Tab-pane label="实时信息" name="info">
										<div class="list-content">
											<el-table
												border
												:data="realTimeInfo"
												style="width: 100%,back"
												height="153"
												:row-style="tableRowStyle"
												:header-cell-style="tableHeaderColor"
												@row-click="handleTimeInfoModal"
											>
												<el-table-column
													prop="time"
													label="时间"
													align="center"
													width="190"
												></el-table-column>
												<el-table-column
													prop="tasksresult.nodefullname"
													label="点位"
													align="center"
												></el-table-column>
												<el-table-column
													prop="tasksresult.source"
													align="center"
													label="数据来源"
													width="150"
												></el-table-column>
												<el-table-column
													prop="tasksresult.result"
													align="center"
													label="识别结果"
													width="150"
												></el-table-column>
											</el-table>
										</div>
									</Tab-pane>
									<!-- 设备报警 -->
									<Tab-pane :label="label" name="alarm">
										<div class="list-content">
											<el-table
												border
												:data="alarmTable"
												style="width: 100%"
												height="153"
												:row-style="tableRowStyle"
												:header-cell-style="tableHeaderColor"
												@row-click="handleAlarmModal"
											>
												<el-table-column
													prop="time"
													label="时间"
													align="center"
													width="190"
												></el-table-column>
												<el-table-column
													prop="tasksresult.nodefullname"
													label="点位"
													align="center"
												></el-table-column>
												<el-table-column
													prop="tasksresult.source"
													align="center"
													label="数据来源"
													width="150"
												></el-table-column>
												<el-table-column
													prop="tasksresult.result"
													align="center"
													label="识别结果"
													width="150"
												></el-table-column>
												<el-table-column
													prop="tasksresult.alarmlevel"
													align="center"
													label="报警等级"
													width="120"
												></el-table-column>
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
							<el-scrollbar style="height:100%">
								<span
									v-for="(item, index) in tableList"
									:key="index"
									:class="tabIdx === index ? 'spanActive' : ''"
									@click="selectTab(item, index)"
									>{{ item.vcName }}</span
								>
							</el-scrollbar>
						</div>
						<div class="videoBox">
							<!-- 边角 -->
							<div class="border-lt"></div>
							<div class="border-rb"></div>
							<div class="video1">
								<cvideo v-if="showVideo" :videoConfig="video1"></cvideo>
							</div>
							<div class="video2">
								<cvideo v-if="showVideo" :videoConfig="video2"></cvideo>
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
										<div class="content" v-for="(item, index) in tableList" :key="index">
											<i
												:class="{
													'robot-out': item.vcName.substr(0, 2) == '室外',
													'robot-in': item.vcName.substr(0, 2) == '室内',
													hvideo: item.vcName.substr(0, 2) == '高清'
												}"
											></i>
											<p>{{ item.vcName }}：</p>
											<span :class="{ yellow: item.statusName == null }">
												{{ item.statusName == null ? '停止' : item.statusName }}
											</span>
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
		<ocx-modal v-model="alarmRecordFlag" title="报警信息" :width="1020" footer-hide :styles="{ top: '0' }">
			<div class="alarm-detail">
				<div class="result">
					识别结果：<span>{{ alarmResult }}</span>
				</div>
				<div :class="alarmPicUrl2.length > 0 ? 'imgBox2' : 'imgBox'" ref="imgBox">
					<!-- <img class="img-content" :src="alarmPicUrl" alt /> -->
					<vue-photo-zoom-pro
						class="img-content"
						v-show="alarmPicUrl1.length > 0"
						:url="alarmPicUrl1"
						type="circle"
						:width="400"
					></vue-photo-zoom-pro>
					<vue-photo-zoom-pro
						class="img-content"
						v-show="alarmPicUrl2.length > 0"
						:url="alarmPicUrl2"
						type="circle"
						:width="400"
					></vue-photo-zoom-pro>
				</div>
				<div class="btn-group">
					<input type="button" class="btn" value="确定" @click="closeModal" />
					<input type="button" class="btn" value="取消" @click="closeModal" />
				</div>
			</div>
		</ocx-modal>
		<!-- 实时信息 -->
		<ocx-modal v-model="timeInfoFlag" title="实时信息详情" :width="1600" footer-hide :styles="{ top: '0' }">
			<div class="alarm-detail">
				<div class="result">
					识别结果：<span>{{ timeInfoResult }}</span>
				</div>
				<div class="img">
					<!-- <img class="img-content" :src="timeInfoPicUrl" alt /> -->
					<vue-photo-zoom-pro
						class="img-content"
						v-if="timeInfoPicUrl1"
						:url="timeInfoPicUrl1"
						type="circle"
						:width="400"
					></vue-photo-zoom-pro>
					<vue-photo-zoom-pro
						class="img-content"
						v-if="timeInfoPicUrl2"
						:url="timeInfoPicUrl2"
						type="circle"
						:width="400"
					></vue-photo-zoom-pro>
				</div>
				<div class="btn-group">
					<input type="button" class="btn confirm" value="确定" @click="closeModal" />
					<input type="button" class="btn cancel" value="取消" @click="closeModal" />
				</div>
			</div>
		</ocx-modal>

		<ocx-modal
			v-model="addTask"
			:width="1765"
			:title="addTaskTitle"
			footer-hide
			@on-cancel="closeAddTask"
			:styles="{ top: '0' }"
		>
			<taskOrder
				ref="taskOrder"
				@closeAddTask="closeAddTask"
				@inspectionAticketClick="inspectionAticketClick"
			></taskOrder>
		</ocx-modal>

		<ocx-modal
			v-model="addTaskNext"
			:width="1485"
			:title="inspectionTaskFormTitle"
			footer-hide
			@on-cancel="closeAddTaskNext"
			:styles="{ top: '0px' }"
		>
			<inspectionTaskList
				ref="inspectionTaskList"
				v-loading="inspectionTaskListLoading"
				:element-loading-text="addTaskLoadingText"
				element-loading-background="#061638"
				@closeAddTaskNext="closeAddTaskNext"
				@saveClick="saveClick"
				@lastStepClick="lastStepClick"
				@getTableDataArr="getTableDataArr"
				@taskNodesDataArr="taskNodesDataArr"
			></inspectionTaskList>
		</ocx-modal>
	</div>
</template>
<script>
import cvideo from '@/components/native/video/OcxVideo'
import { debuglog } from 'util'
import monitorCurrent from '../common/monitor-current.vue'
import moment from 'moment'
import taskOrder from '../common/task-order.vue'
import inspectionTaskList from '../common/inspection-taskList.vue'
import qs from 'qs'
import { clearTimeout } from 'timers';
export default {
	name: 'monitor',
	props: {},
	data() {
		return {
			axios: this.$_api.monitorData,
			// 任务相关
			currentTaskInfo: null, // 当前活动的 任务
			topicArr: [`qif/xj/app/control/`, `qif/xj/app/data/`], //控制命令，任务上报
			topicStr: '',
			msg: '',
			alarmRecordFlag: false, //实时报警弹框开关
			timeInfoFlag: false, //实时信息弹框开关
			realTimeInfo: [], //实时信息列表
			alarmTable: [],
			// 保存stationId
			stationId: this.$store.getters.stationId,
			// 视频tab头
			tabIdx: -1,
			tableList: [],
			tabFirstData: [],
			video1: {
				deviceInfo: '2|22.46.34.114:37779|admin:admin123|22',
				isAutoPlay: false,
				serviceInfo: '1$22.46.34.114$6801$admin$admin',
				hideTool: true
			},
			video2: {
				deviceInfo: '2|22.46.34.114:37779|admin:admin123|21',
				isAutoPlay: false,
				serviceInfo: '1$22.46.34.114$6801$admin$admin',
				hideTool: true
			},
			defaultProps: {
				children: 'children',
				label: 'vcName'
			},
			temperature: '', //温度
			humidity: '', //湿度
			windSpeed: '', //风速
			inspectionAticket: false, //巡检成票弹框开关
			isLoading: false,
			alarmPicUrl1: '', //报警图片地址
			alarmPicUrl2: '',
			alarmResult: '', //报警识别结果
			timeInfoPicUrl1: '', //实时信息图片地址
			timeInfoPicUrl2: '',
			timeInfoResult: '', //实时信息识别结果

			//预置巡检数组
			presetInspectionArr: [],
			recordIndex: 0,
			affirmTicket: false, //巡检成票确认
			presetInspectionTaskId: '', //任务id

			//巡检总览、任务单相关
			currentTab: 'inspectionPandect',
			tabsDisable: true, //初始化时巡检任务单不可点
			workOrderTableHeaderData: [], //巡检任务单表头
			inspectionTaskTableDataAll: [], //巡检任务单表所有数据
			inspectionTaskTableData: [], //巡检任务单表数据
			inspectionTaskTableDataLoad: false, //巡检任务单loading
			inspectionTarget: 0, //巡检目标总数
			finishNum: 0, //完成数量
			residueNum: 0, //剩余数量
			percentage: 0, //已完成百分比
			totalNum: 0, //数据所有条数
			pageSize: 10, //每页条数
			pageNum: 1, //当前页
			//signForm: false,//页面巡检成票标记
			addTaskTimer:null, //新增任务定时器

			//ocx
			ocxTimer: null, //切换模块时，ocx的渲染添加定时器
			showVideo: true, //用于切换模块时，控制视频的渲染，防止黑屏的问题

			//新增任务相关
			addTask: false,
			addTaskNext: false,
			inspectionTaskListLoading: false,
			modalWorkOrderTableHeaderData: [],
			modalInspectionTaskTableData: [],
			addTaskNodesArr: [],
			isActiveTask: false, //是否点击执行任务
			addTaskTitle: '新增任务',
			inspectionTaskFormTitle: '巡检任务单',
			addTaskLoadingText: '正在生成巡检任务单',
			name: 'info',
			alarmCount: 0,
			label: h => {
				return h('div', [h('span', '设备报警'), h('i', '(' + this.alarmCount + ')')])
			}
		}
	},
	computed: {
		globalTasks() {
			return this.$store.getters.inspectionTaskList
		}
	},
	filters: {},
	watch: {
		pageSize() {
			this.inspectionTaskTableData = this.inspectionTaskTableDataAll.slice(0, this.pageSize)
		},
		stationId() {
			this.getTabs()
			this.getStationInfo()
			this.getPresetInspectionData()
		},
		globalTasks() {
			this.presetInspectionArr = this.globalTasks
		}
	},
	components: {
		cvideo,
		monitorCurrent,
		inspectionTaskList,
		taskOrder
	},
	created() {
		this.getTabs()
		this.getStationInfo()
		//获取预置巡检数据
		this.getPresetInspectionData()
		// this.topicArr.forEach(item=>{
		// 	item = item + this.stationId;
		// })
		let temp = []
		this.topicArr.forEach(item => {
			temp.push(item + this.stationId)
		})
		this.topicArr = temp
	},
	mounted() {
		//this.subscribe()
		this.topicStr = this.topicArr[1]
		this.registerListen()
	},
	activated() {
		//使用keep-alive之后，activated和deactivated会被触发，destory不会被触发
		//重新添加回调事件
		this.registerListen()
		clearTimeout(this.ocxTimer)

		//为了防止切换时，视频打不开，导致卡顿，无法立即切换，添加定时器，在页面切换成功之后，再显示视频
		this.ocxTimer = setTimeout(() => {
			this.showVideo = true
		}, 500)
	},
	deactivated() {
		//取消回调事件
		this.$_stop('inspectionmonitor')
		this.showVideo = false
	},
	update() {
		console.log('ipdate')
	},
	methods: {
		registerListen() {
			this.$_listen('inspectionmonitor', (topic, message, packet) => {
				let data = ''
				let dataObj = []
				data = message.toString()
				let msgData = JSON.parse(data)
				console.log(msgData)
				if (topic == this.topicStr) {
					//巡检结果
					if (msgData.cmd === 2104) {
						msgData.time = moment(msgData.time * 1000).format('YYYY-MM-DD HH:mm:ss')
						this.getNodeIdData(msgData.tasksresult.nodeid, msgData.tasksresult.alarmlevel)

						this.finishNum = parseInt(++this.finishNum)
						this.residueNum = parseInt(this.inspectionTarget - this.finishNum)
						this.finishNum = parseInt(this.finishNum)
						this.inspectionTarget = parseInt(this.inspectionTarget)
						this.percentage = parseFloat(((this.finishNum / this.inspectionTarget) * 100).toFixed(2))
						msgData.tasksresult.result =
							msgData.tasksresult.result === '' ? msgData.tasksresult.fdata : msgData.tasksresult.result

						if (msgData.tasksresult.alarmlevel > 0) {
							if (msgData.tasksresult.alarmlevel === 1) {
								msgData.tasksresult.alarmlevel = '一般报警'
							} else if (msgData.tasksresult.alarmlevel === 2) {
								msgData.tasksresult.alarmlevel = '严重报警'
							} else {
								msgData.tasksresult.alarmlevel = '危急报警'
							}
							this.alarmTable.unshift(msgData)
							this.name = 'alarm'
							this.alarmCount++

							// 如果长度超过一百 就删除最初的一个数据
							if (this.alarmTable.length > 100) {
								this.alarmTable.shift()
							}
						} else {
							this.realTimeInfo.unshift(msgData)
							// 如果长度超过一百 就删除最初的一个数据
							if (this.realTimeInfo.length > 100) {
								this.realTimeInfo.shift()
							}
						}
					} else if (msgData.cmd === 2203) {
						//增加任务回复
						this.inspectionTaskListLoading = true
						this.addTaskNext = false
						this.getPresetInspectionData()
						this.addTaskLoadingText = '正在生成巡检任务单'
					} else if (msgData.cmd === 2103) {
						//巡检进度，切换视频
						let robotIndex = -1
						this.tableList.forEach((item, index) => {
							if (item.robotId === msgData.taskrate.robotid) {
								robotIndex = index
							}
						})

						if (robotIndex === this.tabIdx) {
							//当前选中的机器人与实时数据想通过时，才切换视频
							if (msgData.taskrate.normalvideoid != '') {
								this.video1.deviceInfo = msgData.taskrate.normalvideoid
							}
							if (msgData.taskrate.infravideoid != '') {
								this.video2.deviceInfo = msgData.taskrate.infravideoid
							}
						}
					} else if (msgData.cmd === 2101) {
						//机器人状态
						this.tableList.map(item => {
							if (
								item.robotId == msgData.robotstatus.robotid &&
								item.serviceId === msgData.robotstatus.serviceid
							) {
								console.log(item, msgData.robotstatus)
								item.statusName = msgData.robotstatus.status
							}
						})
					} else if (msgData.cmd === 2102) {
						//任务状态
						this.presetInspectionArr.map(item => {
							if (item.taskId === msgData.taskstatus.taskid) {
								item.intStatus = msgData.taskstatus.status
							}
							/* if (item.taskID === msgData.taskstatus.taskid) {
								item.i_Status = msgData.taskstatus.status
							} */
						})
					} else if (msgData.cmd === 2205) {
						//任务控制回复
						this.$ocxMessage.success({
							content: '任务下发成功',
							duration: 5
						})
					}
				}
			})
		},
		//页面 巡检任务单 测点推送
		getNodeIdData(nodeid, alarmlevel) {
			if (nodeid) {
				if (this.$refs['inspecAticketTable']) {
					let index = this.inspectionTaskTableDataAll.findIndex(node => {
						return node.nodeID == nodeid
					})
					if (index === -1) {
						return
					}
					let pages = parseInt(index / this.pageSize) + 1
					this.handleChangePage(pages, nodeid, alarmlevel)

					let num = this.inspectionTaskTableData.findIndex(node => {
						return node.nodeID == nodeid
					})
					this.$nextTick(() => {
						let targetTr = document.querySelectorAll('#ticketTableScroll .el-table__body-wrapper tr')[num]
						//console.log(num)
						let targetTable = document.querySelector('#ticketTableScroll .el-table__body-wrapper')
						if (targetTr && targetTable) {
							targetTable.scrollTop = targetTr.offsetTop
						}
					})
				}
			}
		},
		//分页操作
		handleChangePage(page, nodeid, alarmlevel) {
			//console.log( page )
			this.pageNum = page

			let brr = this.inspectionTaskTableDataAll.slice(
				(page - 1) * this.pageSize,
				(page - 1) * this.pageSize + this.pageSize
			)
			brr.forEach(item => {
				if (nodeid == item.nodeID) {
					if (alarmlevel == 0) {
						this.$set(item, 'status', '0')
					} else if (alarmlevel > 0) {
						this.$set(item, 'status', '1')
					}
				}
			})
			this.inspectionTaskTableData = brr
		},
		getTableDataArr() {
			this.inspectionTaskListLoading = false
		},
		taskNodesDataArr(arr) {
			this.addTaskNodesArr = arr
		},
		//点击新增任务
		addTaskClick() {
			this.addTask = true
			setTimeout(() => {
				this.$refs.taskOrder.getStaticTreeData('', '', '', '', '')
			}, 100)
		},
		//关闭新增任务弹框
		closeAddTask() {
			//this.$refs.taskOrder.clearFilter()
			this.addTask = false
		},
		//点击新增任务弹框的 巡检成票 按钮
		inspectionAticketClick(arr) {
			this.addTaskNodesArr = []

			this.addTask = false
			this.addTaskNext = true
			let addInfos = {
				unitId: this.stationId,
				nodeIds: arr.join(',')
			}
			/* let addInfos = {
				IsThread: true,
				Nodes: arr.join(',')
			} */
			this.inspectionTaskListLoading = true
			this.$refs.inspectionTaskList.getTableDataAll(addInfos)
		},
		//新增任务 上一步 按钮
		lastStepClick() {
			this.addTaskNext = false
			this.addTask = true
		},
		//新增任务 生成任务 按钮
		saveClick(name) {
			this.addTaskLoadingText = '正在生成任务...'
			this.inspectionTaskListLoading = true
			let obj = {
				cmd: 2202,
				type: 'req',
				srcid: '',
				destid: '',
				serial: '',
				time: '',
				task: {
					unitid: this.stationId,
					name: name,
					tasktype: '70100004',
					tasksubtype: '70110008',
					executetype: '70120100',
					executetime: '0000',
					startdate: '0000',
					stopdate: '0000',
					userid: '',
					tasknode: this.addTaskNodesArr
				}
			}
			obj.time = new Date().valueOf()
			this.$_mqtt.publish(this.topicArr[0], JSON.stringify(obj))
			
			//不论新增任务是否成功，30秒后都关闭窗口
			clearTimeout(this.addTaskTimer);
			this.addTaskTimer = setTimeout(() => {
				this.addTaskNext = false
				this.inspectionTaskListLoading = true
				this.addTaskLoadingText = '正在生成巡检任务单'
			}, 30000);
		},
		//关闭新增任务 巡检成票 弹框
		closeAddTaskNext() {
			this.addTaskNext = false
			this.modalInspectionTaskTableData = []
			this.modalWorkOrderTableHeaderData = []
			// this.$refs.taskOrder.clearFilter()
		},
		//点击左侧 巡检成票
		inspectionAticketBtn() {
			//判断是否执行
			// this.affirmTicket = true
			if (this.presetInspectionTaskId == '') {
				this.$ocxModal.confirm({
					title: '确认',
					content: '请选择巡检任务'
				})
			} else {
				this.$ocxModal.confirm({
					title: '确认',
					content: '是否执行巡检成票？',
					onOk: () => {
						// this.signForm = true
						this.affirmTicketYes()
					}
				})
			}
		},
		//执行左侧 巡检成票(java)
		affirmTicketYes() {
			if (this.presetInspectionTaskId == '') {
				return
			} else {
				this.currentTab = 'inspectionTask'
				this.affirmTicket = false
				this.inspectionTaskTableDataLoad = true

				let infos = {
					unitId: this.stationId,
					taskId: this.presetInspectionTaskId
				}
				this.workOrderTableHeaderData = []
				this.inspectionTaskTableDataAll = []
				this.axios.CheckingIntoAticket(infos).then(res => {
					if (res.code == 200) {
						this.tabsDisable = false
						this.workOrderTableHeaderData = res.data[0].robotStatistics
						this.inspectionTaskTableDataAll = res.data[0].robotNodeTree
						this.inspectionTaskTableData = res.data[0].robotNodeTree.slice(0, this.pageSize)

						this.inspectionTarget = res.data[0].robotNodeTree.length
						this.finishNum = 0
						this.residueNum = res.data[0].robotNodeTree.length
						this.percentage = 0

						this.totalNum = res.data[0].robotNodeTree.length
						this.pageNum = 1
						this.inspectionTaskTableDataLoad = false
					}
				})
			}
		},
		//执行左侧 巡检成票(net)
		// 		affirmTicketYes() {
		// 			if (this.presetInspectionTaskId == '') {
		// 				return
		// 			} else {
		// 				this.currentTab = 'inspectionTask'
		// 				this.affirmTicket = false
		// 				this.inspectionTaskTableDataLoad = true
		//
		// 				let infos = {
		// 					TaskID: this.presetInspectionTaskId,
		// 					UnitID: this.stationId
		// 				}
		// 				this.workOrderTableHeaderData = []
		// 				this.inspectionTaskTableDataAll = []
		// 				this.axios.getInspectionWorkOrderDataN(infos).then(res => {
		// 					if (res.success) {
		// 						this.tabsDisable = false
		// 						this.workOrderTableHeaderData = res.data.asRobots
		// 						this.inspectionTaskTableDataAll = res.data.asTaskNodes
		// 						this.inspectionTaskTableData = res.data.asTaskNodes.slice(0, this.pageSize)
		//
		// 						this.inspectionTarget = res.data.asTaskNodes.length
		// 						this.finishNum = 0
		// 						this.residueNum = res.data.asTaskNodes.length
		// 						this.percentage = 0
		//
		// 						this.totalNum = res.data.asTaskNodes.length
		// 						this.pageNum = 1
		// 						this.inspectionTaskTableDataLoad = false
		// 					}
		// 				})
		// 			}
		// 		},
		//不执行左侧 巡检成票
		affirmTicketNo() {
			this.affirmTicket = false
		},
		inspectionTaskHeaderText(info) {
			let str = ''
			let startTop = info.robotName.substr(0, 2)
			let stopTop = info.robotName.substr(2)
			if (info.robotName.length > 3) {
				return (str = `${startTop} \n ${stopTop} \n (${info.total})`)
			} else {
				return (str = `${info.robotName} \n (${info.total})`)
			}
			// let str = ''
			// let startTop = info.r_vc_Name.substr(0, 2)
			// let stopTop = info.r_vc_Name.substr(2)
			// if (info.r_vc_Name.length > 3) {
			// 	return (str = `${startTop} \n ${stopTop} \n (${info.count})`)
			// } else {
			// 	return (str = `${info.r_vc_Name} \n (${info.count})`)
			// }
		},
		//巡检任务单勾选功能
		handelCheck(arr, id) {
			if (arr.indexOf(id) == 0) {
				return true
			}
		},
		//获取预置巡检数据
		getPresetInspectionData() {
			//java
			let obj = {
				unitId: this.stationId,
				isPage: 1
			}
			this.axios.getPresetInspectionData(obj).then(res => {
				if (res.code == 200 && res.data.length > 0) {
					this.presetInspectionArr = res.data
					this.presetInspectionTaskId = res.data[0].taskId
				}
			})

			//(net)
			/* let str = {
				UnitID: this.stationId,
				isThread: true
			  }
			this.axios.getPresetInspectionInfo(str).then(res => {
				if (res.success && res.data.rows.length > 0) {
				  this.presetInspectionArr = res.data.rows
				  this.presetInspectionTaskId = res.data.rows[0].taskID
				}
			}) */
		},
		//点击预置巡检
		handelInspecClick(info, index) {
			this.recordIndex = index
			//console.log(info)
			//this.presetInspectionTaskId = info.taskID
			this.presetInspectionTaskId = info.taskId
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
						//console.log(targetTr)
						let targetTable = document.querySelector('#ticketTables .el-table__body-wrapper')
						if (targetTr && targetTable) {
							targetTable.scrollTop = targetTr.offsetTop
						}
					})
				}
			}
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
		subscribe() {
			if (this.$_mqtt.connected) {
				this.$_mqtt.unsubscribe(this.topicArr, err => {
					if (err) {
						console.log('取消MQTT订阅失败')
					} else {
						console.log('取消MQTT订阅成功')
						this.$_mqtt.subscribe(this.topicArr, err => {
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
		unsubscribe(callback) {
			// this.$_mqtt.end()
			this.$_mqtt.unsubscribe(this.topicArr, err => {
				if (err) {
					console.log('取消MQTT订阅失败')
				} else {
					console.log('取消MQTT订阅成功')
					callback()
				}
			})
		},
		//合并单元格的方法
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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
			this.alarmPicUrl1 = row.tasksresult.normalpicpath
			this.alarmPicUrl2 = row.tasksresult.infrapicpath
			this.alarmResult = row.tasksresult.result
		},
		//实时信息弹框
		handleTimeInfoModal(row) {
			this.timeInfoFlag = true
			this.timeInfoPicUrl1 = row.tasksresult.normalpicpath
			this.timeInfoPicUrl2 = row.tasksresult.infrapicpath
			this.timeInfoResult = row.tasksresult.result
		},
		// 修改table tr行的背景色
		tableRowStyle({ row, rowIndex }) {
			return 'color: #fff;'
		},
		// 修改table header的背景色
		tableHeaderColor({ row, column, rowIndex, columnIndex }) {
			if (rowIndex === 0) {
				return 'background:#1d63b9;color: #fff;font-weight: 500;border: none;'
			}
		},
		//关闭模态框
		closeModal() {
			this.alarmRecordFlag = false
			this.timeInfoFlag = false
		},
		getTabs() {
			this.$_api.monitorData
				.getTitleData({
					unitId: this.stationId
				})
				.then(res => {
					if (res.success) {
						this.tableList = res.data
						// this.tabFirstData = res.data[0]
						this.selectTab(res.data[0], 0)
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
			// if(this.tabIdx === idx){
			//当前机器人不需要切换时，直接切换视频
			// if(normalVideo && normalVideo != ''){
			//     this.video1.deviceInfo =normalVideo;
			// }

			//  if(infrateVideo && infrateVideo != ''){
			//     this.video1.deviceInfo =infrateVideo;
			// }
			//   return;
			// }
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
					if (res.success && res.data.length > 0) {
						this.video1.deviceInfo = res.data[0].strNormal
						this.video1.isAutoPlay = true
						this.video2.deviceInfo = res.data[0].strInfra
						this.video2.isAutoPlay = true
					} else {
						console.log(res.msg)
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//点击 执行/停止任务 按钮
		executeTaskClick(params) {
			let data = {
				cmd: 2204,
				type: 'req',
				srcid: '',
				serial: '',
				time: parseInt(new Date().getTime() / 1000),
				tasks: {
					unitid: this.stationId,
					taskid: this.presetInspectionTaskId,
					control: params,
					userid: '',
					type: ''
				}
			}
			if (params == 'start') {
				if (this.presetInspectionTaskId == '') {
					this.$ocxModal.warning({
						title: '确认',
						content: '<p>请选择巡检任务</p>'
					})
				} else {
					// if( this.signForm ) {
					this.isActiveTask = true
					//this.signForm = false
					this.$ocxModal.confirm({
						title: '确认',
						content: '<p>确认执行该任务</p>',
						onOk: () => {
							this.$_mqtt.publish(this.topicArr[0], JSON.stringify(data))
							//临时代码，勿动
							// this.presetInspectionArr.forEach( item => {
							//   if( item.taskID == this.presetInspectionTaskId ) {
							//     this.$set( item , 'i_Status' , 1 )
							//   }
							// })
							this.affirmTicketYes()
							this.inspectionAticket = false
						}
					})
					// }
					// else{
					// this.$ocxModal.warning({
					//   title: '提示',
					//   content: '<p>请先执行巡检成票</p>'
					// })
					// }
				}
			}
			if (params == 'stop') {
				this.$ocxModal.confirm({
					title: '确认',
					content: '<p>确认停止该任务</p>',
					onOk: () => {
						this.isActiveTask = false
						this.$_mqtt.publish(this.topicArr[0], JSON.stringify(data))
						this.inspectionAticket = false
					}
				})
			}
		},
		//获取站端信息
		getStationInfo() {
			this.$_api.monitorData
				.getStationInfo({
					unitID: this.stationId
				})
				.then(res => {
					var data = res.data
					for (let i = 0, len = data.length; i < len; i++) {
						if (data[i].type == 70200001) {
							this.temperature = data[i].value ? data[i].value + '℃' : '--'
						} else if (data[i].type == 70200003) {
							this.humidity = data[i].value ? data[i].value + '%' : '--'
						} else if (data[i].type == 70200002) {
							this.windSpeed = data[i].value ? data[i].value + 'm/s' : '--'
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
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
@import '~@/assets/style/component/iview-page/index.styl';

// @import '~@/assets/style/component/index.styl'
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

      .slide-fade-enter, .slide-fade-leave-to {
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
        width: 1600px;
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
          // border: 1px solid #063765;
          margin-top: 20px;
          margin-left: 40px;

          .content-left {
            width: 223px;
            height: 615px;
            border: 2px solid #1c5892;
            float: left;

            // padding-top: 7px;
            .left-top {
              width: 220px;
              height: 477px;

              p {
                font-size: 16px;
                color: #fff;
                background: #17579a;
                padding: 11px 0 12px 17px;
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
                    // background: #5990fe;
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
                    // margin-left: 10px;
                    background: none;
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
                  color: #fff;
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
                font-size: 14px;
              }

              .bottom-btn:active {
                color: #ffd36a;
              }
            }

            .left-bottom-state {
              width: 219px;
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
            border: 2px solid #1c5892;
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

            /deep/.ivu-tabs-content {
              height: 570px;

              /deep/.ivu-tabs-tabpane {
                height: 100%;
              }
            }

            /deep/.ivu-tabs-bar {
              margin-bottom: 0;

              .ivu-tabs-tab {
                width: 100px;
                text-align: center;
                background: url('~@/assets/img/common/bg540.png') no-repeat;
                background-size: 100% 100%;
                color: #fff;
                border: none;
                margin-left: 12px;
                font-size: 14px;
                line-height: 30px;
                height: 30px;
              }

              .ivu-tabs-tab-active {
                color: #ffd36a;
              }
            }

            /deep/.el-loading-mask {
              margin-top: 0;
              background: #072a73;
              z-index: 0;
            }

            /deep/.el-table {
              margin-left: 10px;
              margin-top: 6px;
              width: calc(100% - 20px);
              border-left-color: #054598;
              border-top-color: #054598;

              /deep/td {
                height: 40px;
                vertical-align: top;
                padding: 0;

                .cell {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }

              /deep/th {
                padding: 0;
              }

              /deep/.el-table__body-wrapper {
                /deep/.cell {
                  padding: 0;
                  height: 100%;
                }
              }

              /deep/td, /deep/th.is-leaf {
                font-size: 14px;
                color: #fff;
                border-color: #054598;
              }

              .statePageTab {
                width: 15px;
                height: 15px;
                display: inline-block;
                background: #009dff;
                border-radius: 50%;
                vertical-align: middle;
              }

              .statePageTabErr {
                width: 15px;
                height: 15px;
                display: inline-block;
                background: red;
                border-radius: 50%;
                vertical-align: middle;
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

            /deep/.el-table {
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

            .pageBox {
              width: 100%;
              height: 32px;
              margin-top: 10px;
              display: flex;
              justify-content: center;
              position: absolute;
              left: 0px;
              bottom: 5px;

              /deep/.ivu-page {
                iview-page();
              }
            }
          }

          .content-bottom {
            width: 1108px;
            height: 210px;
            float: left;
            margin-top: 10px;

            .tab-bar {
              float: left;
              height: 210px;
              width: 100%;
              border: 2px solid #1c5892;

              // background: url('../../assets/img/monitor/bigBg2.png') no-repeat;
              // background-size: 100% 100%;
              /deep/.ivu-tabs-bar {
                margin: 10px 0 0 10px;

                /deep/i {
                  color: #f00;
                }

                .ivu-tabs-tab {
                  width: 100%;
                  height: 1.4rem;
                  line-height: 1.4rem;
                  text-align: center;
                  background: url('~@/assets/img/common/bg17.png') no-repeat;
                  background-size: 100% 100%;
                  color: #fff;
                  border: none;
                  font-size: 14px;
                }

                .ivu-tabs-tab-active {
                  color: #ffd36a;
                }

                .ivu-tabs-nav-scroll {
                  height: 32px;
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

              /deep/.el-table td, /deep/.el-table th {
                padding: 7px 0;
              }

              /deep/ .el-table {
                font-size: 16px;
                border-color: #054598;
              }

              /deep/.el-table td, /deep/.el-table th.is-leaf {
                // border: none;
                border-color: #054598;
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
          margin-left: 5px;

          .videoTitle {
            width: 98%;
            margin-bottom: 10px;
            margin-top: -38px;
            height: 30px;
            overflow: auto;

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
              font-size: 14px;
            }

            .spanActive {
              color: #f8cf66;
            }
          }

          .videoBox {
            width: 100%;
            height: 615px;
            position: relative;

            .border-lt {
              position: absolute;
              top: -6px;
              left: -7px;
              width: 35px;
              height: 30px;
              // background: url('~@/assets/img/common/border-lt.png') no-repeat;
              background-size: 35px 30px;
            }

            .border-rb {
              position: absolute;
              bottom: 32px;
              right: 27px;
              width: 35px;
              height: 30px;
              // background: url('~@/assets/img/common/border-rb.png') no-repeat;
              background-size: 35px 30px;
            }

            .video1, .video2 {
              width: 400px;
              height: 280px;

              .ocxVideo {
                width: 400px;
              }
            }

            .video1 {
              margin-bottom: 12px;
            }

            .env {
              // float: left;
              width: 403px;
              height: 210px;
              margin: 10px 0 0 0;
              border: 2px solid #1c5892;

              // padding-left: 10px;
              // padding-top: 2px;
              .env-flex {
                height: 158px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                padding-left: 3px;

                .content {
                  // height: 25px;
                  font-size: 14px;
                  line-height: 25px;
                  color: #fff;

                  i {
                    display: inline-block;
                    width: 17px;
                    height: 17px;
                    margin: -2px 6px;
                  }

                  p {
                    display: inline-block;
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    background: none;
                    padding-left: 0;
                    font-size: 14px;
                  }
                }
              }

              p {
                width: 100%;
                height: 30px;
                font-size: 16px;
                line-height: 30px;
                color: #fff;
              }

              span {
                display: inline-block;
                color: #49ff01;
                font-size: 14px;
              }

              .yellow {
                color: yellow;
              }

              .robot-status {
                float: left;
                width: 60%;

                p {
                  width: 100%;
                  background: #17579a;
                  padding-left: 25px;
                  height: 50px;
                  line-height: 50px;
                }
              }

              .station-env {
                float: left;
                width: 40%;
                border-right: 2px solid #17579a;

                p {
                  padding-left: 25px;
                  background: #17579a;
                  height: 50px;
                  line-height: 50px;
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

  // background: url('../../assets/img/common/bg.png') no-repeat center;
  .result {
    font-size: 16px;
    line-height: 55px;
    height: 55px;
    margin-left: 25px;

    span {
      color: #ffd36a;
    }
  }

  .imgBox {
    margin-left: 10px;
    width: calc(100% - 20px);

    .img-content {
      /deep/.img-container {
        img {
          width: 1000px;
          height: 720px;
        }
      }
    }
  }

  .imgBox2 {
    margin-left: 10px;
    width: calc(100% - 20px);

    .img-content {
      display: inline-block;

      /deep/.img-container {
        img {
          width: 495px !important;
          height: 357px;
        }
      }
    }

    .img-content:nth-of-type(2) {
      margin-left: 10px;
    }
  }

  .btn-group {
    width: 100%;
    height: 50px;
    background: #063e7a;
    position: relative;
    left: 0;
    bottom: 0;
    border-radius: 0 0 10px 10px;
    margin-top: 10px;
    padding-right: 10px;

    .btn {
      width: 110px;
      height: 30px;
      background: url('../../../../assets/img/common/bg540.png') no-repeat center;
      background-size: 100% 100%;
      border-radius: 3px;
      text-align: center;
      margin: 5px;
      border: 0;
      color: #fff;
      font-size: 14px;
      float: right;
      cursor: pointer;
      margin-top: 10px;
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

/deep/.el-checkbox__inner {
  width: 16px;
  height: 16px;
  margin-top: -5px;
}

/deep/.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 5px;
  padding: 0;
}

/deep/.el-table_3_column_10, /deep/.el-table_3_column_11 {
  vertical-align: top;
}

/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

/deep/.el-table__empty-block {
  border-bottom: 1px solid #104095;
  border-right: 1px solid #104095;
}

/deep/.el-table, /deep/.el-table__expanded-cell {
  background: none;
}

/deep/.el-table tbody tr:hover>td {
  background: none;
}

/deep/.el-table th, /deep/.el-table tr {
  background: none;
  cursor: pointer;
}

/deep/.el-table .cell {
  white-space: pre-line;
}

/deep/.ivu-modal {
  /deep/.ivu-modal-body {
    padding-top: 0 !important;
    border-radius: 0 0 10px 10px;
    background: #082051;
    padding: 0;
    border-radius: 0 0 10px 10px;
  }

  /deep/.ivu-modal-header {
    padding: 7px 0 7px 25px !important;
    background: #17579a;
    border-radius: 10px 10px 0 0;
    border: 0;

    /deep/.ivu-modal-header-inner {
      font-size: 16px !important;
      height: 35px;
      line-height: 35px;
      color: #e9edf3 !important;
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

  .btn:active {
    color: #fff902;
  }
}

.textTop {
  display: inline-block;
  vertical-align: top;
}

/deep/ .el-scrollbar {
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}

/deep/ .el-scrollbar__wrap {
  overflow-y: scroll !important;
}

/deep/ .el-scrollbar__thumb {
  background-color: #2cbfdf !important;

  &:hover {
    background-color: #2cbfdf !important;
  }
}

/deep/ .el-scrollbar__view {
  display: flex;
  flex-wrap: wrap;
}

/deep/.ivu-badge-count {
  font-family: 'Monospaced Number';
  line-height: 1;
  vertical-align: middle;
  position: absolute;
  transform: translateX(50%);
  top: -17px;
  right: 0;
  left: -1px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  min-width: 0.88889rem;
  background: #ed4014;
  border: 0.04444rem solid transparent;
  color: #fff;
  line-height: 24px;
  text-indent: -3px;
  text-align: center;
  padding: 0 0.26667rem;
  font-size: 16px;
  white-space: nowrap;
  transform-origin: -10% center;
  z-index: 10;
  box-shadow: none;
}

/deep/.el-table--border::after, /deep/.el-table--group::after, /deep/.el-table::before {
  background: none;
}

.robot-out {
  background: url('../../assets/img/monitor/robot-out.png') no-repeat center;
  background-size: 100% 100%;
}

.robot-in {
  background: url('../../assets/img/monitor/robot-in.png') no-repeat center;
  background-size: 100% 100%;
}

.hvideo {
  background: url('../../assets/img/monitor/video.png') no-repeat center;
  background-size: 100% 100%;
}
</style>
