<template>
	<!-- 巡检记录 -->
	<div
		class="report"
		v-loading="exportingLoading"
		element-loading-text="正在导出..."
		element-loading-background="rgba(0, 0, 0, 0.6)"
	>
		<div class="report-view">
			<div class="search-bar">
				<div class="search">
					<label for>巡检时间：</label>
					<el-select class="ipt" v-model="value" placeholder="请选择" @change="changeTimeHandle">
						<el-option
							v-for="item in timeOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</div>
				<div class="search">
					<label for>任务状态：</label>
					<el-select class="ipt" v-model="value2" placeholder="请选择" @change="changeStatusHandle">
						<el-option
							v-for="item in statusOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</div>
				<div class="search">
					<label for>是否报警：</label>
					<el-select class="ipt" v-model="value3" placeholder="请选择" @change="changeAlarmHandle">
						<el-option
							v-for="item in alarmOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</div>
				<el-button type="primary" class="btn searchbtn" @click="getList">查询</el-button>
				<el-button type="primary" class="btn exportbtn" @click="exportList">导出</el-button>
			</div>
			<!-- 任务表 -->
			<div class="list">
				<el-table
					border
					v-loading="recordLoading"
					element-loading-text="正在加载中"
					element-loading-background="rgba(0, 0, 0, 0)"
					:data="inspectionRecordList"
					:row-style="tableRowStyle"
					:header-cell-style="tableHeaderColor"
					highlight-current-row
					style="width: 100%"
					height="706"
				>
					<el-table-column label="任务" align="center" width="200">
						<template slot-scope="scope">{{ scope.row.taskName }}</template>
					</el-table-column>
					<el-table-column label="任务类型" align="center" width="110">
						<template slot-scope="scope">{{ scope.row.taskType }}</template>
					</el-table-column>
					<el-table-column align="center" label="状态" width="100">
						<template slot-scope="scope">
							<span :class="{ abnormal: scope.row.iStatusName == '异常终止' }">{{
								scope.row.iStatusName
							}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="启动原因" width="110">
						<template slot-scope="scope">{{ scope.row.iStartReason }}</template>
					</el-table-column>
					<el-table-column align="center" label="结束原因" width="110">
						<template slot-scope="scope">{{ scope.row.iStopReason }}</template>
					</el-table-column>
					<el-table-column align="center" label="启动时间" width="170">
						<template slot-scope="scope">{{ scope.row.iStartTime }}</template>
					</el-table-column>
					<el-table-column align="center" label="结束时间" width="170">
						<template slot-scope="scope">{{ scope.row.iStopTime }}</template>
					</el-table-column>
					<el-table-column align="center" label="总巡检点数" width="90">
						<template slot-scope="scope">{{ scope.row.allTaskNode }}</template>
					</el-table-column>
					<el-table-column align="center" label="报警点数" width="80">
						<template slot-scope="scope">{{ scope.row.allAlarm }}</template>
					</el-table-column>
					<el-table-column align="center" label="失败点数" width="80">
						<template slot-scope="scope">{{ scope.row.failnodes }}</template>
					</el-table-column>
					<el-table-column align="center" label="未巡检点数" width="80">
						<template slot-scope="scope">{{ scope.row.unExecNodes }}</template>
					</el-table-column>
					<el-table-column prop align="center" label="操作">
						<template slot-scope="scope">
							<span class="operation detail" @click="goDetail(scope.row)">详细</span>
							<span class="operation export" @click="exportRow(scope.row)">导出</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- 分页 -->
			<div class="page-wrap" v-show="inspectionRecordList.length > 0">
				<Page
					@on-change="handleChangePage"
					@on-page-size-change="handleChangeSize"
					:total="total"
					:current="currentPage"
					:page-size="pageSize"
					show-sizer
					show-elevator
				/>
			</div>
		</div>
		<ocx-modal v-model="detailFlag" fullscreen footer-hide :styles="{ top: '0' }" @on-cancel="closeDetail">
			<div class="detail">
				<div class="detail-content">
					<div class="info">
						<div class="info-left">
							<span class="txt">任务名称：{{ taskName }}</span>
							<span class="txt">启动原因：{{ startReason }}</span>
							<span class="txt">结束原因：{{ stopReason }}</span>
						</div>
						<div class="info-right">
							<i class="count inspect"></i>
							<span
								class="txt detailedTab"
								:class="[detailedTabX == 1 ? 'clickItem' : '']"
								@click="detailedTabClick('viewPoints')"
							>
								巡检点数:
								<span>{{ viewPoints }}</span>
							</span>
							<i class="count police"></i>
							<span
								class="txt detailedTab"
								:class="[detailedTabX == 2 ? 'clickItem' : '']"
								@click="detailedTabClick('alarmPoints')"
							>
								报警点数:
								<span>{{ alarmPoints }}</span>
							</span>
							<i class="count fail"></i>
							<span
								class="txt detailedTab"
								:class="[detailedTabX == 3 ? 'clickItem' : '']"
								@click="detailedTabClick('failPoints')"
							>
								失败点数:
								<span>{{ failPoints }}</span>
							</span>
							<i class="count normal"></i>
							<span class="txt">
								未巡检点数:
								<span>{{ endViewPoints }}</span>
							</span>
						</div>
					</div>
					<div class="time">
						<div class="start-time">
							<div class="time-content">{{ startTime }}</div>
							<div class="time-des">开始时间</div>
						</div>
					</div>
					<el-scrollbar>
						<div
							class="steps"
							v-loading="stepDetail"
							element-loading-text="正在加载中"
							element-loading-background="#061638"
						>
							<div class="steps-content" v-for="item in filterNodeList" :key="item.index">
								<div class="circle-out skip-out" :style="{ background: item.outBgColor }">
									<div class="circle-in skip-in" :style="{ background: item.inBgColor }">
										{{ item.status }}
									</div>
									<i class="bd-top"></i>
									<i class="bd-bt"></i>
								</div>
								<div class="node-info">
									<ul>
										<li>
											<span>巡检对象：</span>
											<i>{{ item.nodeName }}</i>
										</li>
										<li>
											分析结果：
											<span>{{ item.status == '失败' ? '--' : item.vcResult }}</span>
										</li>
										<li>环境信息：{{ item.fTemperatureData }}，{{ item.fHumidityData }}</li>
										<li>
											报警状态：
											<span :class="{ errInfo: item.iIsAlarm === '报警' }">{{
												item.status == '失败' ? '--' : item.iIsAlarm
											}}</span>
										</li>
									</ul>
									<div class="history-rcord" @click="openHistoryWin(item.nodeId, item.nodeName)">
										历史记录
									</div>
								</div>
								<div class="img-content">
									<img
										v-if="item.vcInfraPicturePath"
										:src="item.vcInfraPicturePath"
										alt
										@click="handleImgModal(item.vcInfraPicturePath)"
									/>
									<img
										v-if="item.vcNormalPicturePath"
										:src="item.vcNormalPicturePath"
										alt
										@click="handleImgModal(item.vcNormalPicturePath)"
									/>
								</div>
								<i class="line"></i>
								<i class="dot"></i>
								<span class="node-time">{{ item.iUpdateTime || '--' }}</span>
								<span class="node-point">{{ item.nodeParentName }}</span>
							</div>
						</div>
					</el-scrollbar>
					<div class="detail-name">
						<i class="bg-lf"></i>
						<i class="bg-rg"></i>
						查看任务详情
					</div>
				</div>
			</div>
		</ocx-modal>
		<ocx-modal v-model="imgFlag" title="查看图片" :width="1000" footer-hide draggable :z-index="9999">
			<vue-photo-zoom-pro :url="imgUrl" :width="400" type="circle" class="bigImg"></vue-photo-zoom-pro>
		</ocx-modal>
		<!-- <ocx-modal v-model="imgFlag" title="查看图片" :width="1000" footer-hide>
			<vue-photo-zoom-pro :url="imgUrl" :width="400" type="circle" class="bigImg"></vue-photo-zoom-pro>
		</ocx-modal>
		</ocx-modal>-->
		<!-- 历史记录弹框 begin -->
		<ocx-modal v-model="historyDialog" title="历史记录" :width="1200" footer-hide draggable @on-cancel="closeClick">
			<!-- <div class="histroy-modal-wrap">
				<div class="header">
					<div>
						<span>时间范围：</span>
						<DatePicker
							type="date"
							placeholder=""
							style="width: 200px"
							v-model="histroyBeginTime"
						></DatePicker>

						<span> - </span>
						<DatePicker
							type="date"
							placeholder=""
							style="width: 200px"
							v-model="histroyEndTime"
						></DatePicker>

						<el-button
							type="primary"
							style="margin-left:10px"
							size="small"
							class="btn searchbtn"
							@click="drawChart"
							>查询</el-button
						>
					</div>
					<div class="count">
						<i class="icon alarm"></i>
						<span>报警点数：{{ historyAlarmNode }}</span>
						<i class="icon fail"></i>
						<span>失败点数：{{ historyFailNode }}</span>
					</div>
				</div>
				<div class="content">
					<div class="no-data" v-show="nodata">
						<img src="../assets/img/record/nodata.png" alt />
					</div>
					<div v-show="!nodata">
						<div class="history-data">
							<div id="histroyChart"></div>
						</div>
						<div class="img-container">
							<img @click="showBigPic(normalImgPath)" :src="normalImgPath" alt />
							<img @click="showBigPic(normalImgPath)" :src="infraImgPath" alt />
						</div>
					</div>
				</div>
			</div> -->
			<historyNotes ref="historyNotes" :nodeInfo="nodeInfo"></historyNotes>
		</ocx-modal>
		<!--历史记录弹框 end -->
	</div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import echarts from 'echarts/dist/echarts.min.js'
import historyNotes from './common/history-notes.vue'
export default {
	name: 'report',
	components: {
		historyNotes
	},
	props: {},
	data() {
		return {
			recordId: '',
			taskId: '',
			unitId: '',
			taskName: '', //任务名称
			startReason: '', //启动原因
			stopReason: '', //停止原因
			skipPoints: '', //跳过点数
			failPoints: '', //失败点数
			alarmPoints: '', //报警点数
			normalPoints: '', //正常点数
			viewPoints: '', //巡检点数
			endViewPoints: '', //未巡检点数
			planTime: '', //计划时间
			startTime: '', //开始时间
			nodeList: [], //节点列表所有数据
			filterNodeList: [], //节点过滤数据
			detailedTabX: 1,
			imgFlag: false,
			imgUrl: '',
			stepDetail: true,
			axios: this.$_api.recordData,
			inspectionRecordList: [], //任务记录列表
			timeOptions: [
				{
					value: '6',
					label: '全部'
				},
				{
					value: '1',
					label: '一天'
				},
				{
					value: '3',
					label: '三天'
				},
				{
					value: '7',
					label: '一周'
				}
			],
			statusOptions: [
				{
					value: '',
					label: '全部'
				},
				{
					value: '70140002',
					label: '正常结束'
				},
				{
					value: '70140001',
					label: '正在执行'
				},
				{
					value: '70140003',
					label: '异常终止'
				}
			],
			alarmOptions: [
				{
					value: '',
					label: '全部'
				},
				{
					value: '1',
					label: '报警'
				},
				{
					value: '0',
					label: '无报警'
				}
			],
			value: '6', //默认查询的字段
			value2: '', //默认查询的字段
			value3: '', //默认查询的字段
			iIsAlarm: '', //是否报警
			iStatus: '', //任务状态
			dateId: '6', //时间
			pageSize: 10, //每页显示条数
			currentPage: 1, //当前页码
			total: 0,
			javaUrl: '',
			netUrl: '',
			detailFlag: false,
			recordLoading: false,

			//导出
			exportingLoading: false, //导出时的等待提示

			//历史记录弹框
			selectNode: '',
			selectNodeName: '',
			historyDialog: false,
			// histroyBeginTime: new Date(
			// 	moment()
			// 		.add(-7, 'days')
			// 		.calendar()
			// ).getTime(),
			// histroyEndTime: new Date().getTime(),
			histroyBeginTime: new Date(
				moment()
					.add(-7, 'days')
					.calendar()
			),
			histroyEndTime: new Date(),
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					}
				]
			},
			historyChart: null,
			historyTotalNode: 0,
			historyAlarmNode: 0,
			historyFailNode: 0,
			normalImgPath: '',
			infraImgPath: '',
			nodata: true,

			nodeInfo: {}
		}
	},
	computed: {
		stationId() {
			return this.$store.getters.stationId
		}
	},
	filters: {},
	watch: {
		stationId: {
			handler(val) {
				console.log(val)
				// this.stationId = val
				this.getList()
			}
		}
	},
	created() {
		this.javaUrl =
			// process.env.NODE_ENV === 'development'
			// 	? $_development.javaRequest.location + '/' + $_development.javaRequest.javaModule
			// 	: $_production.javaRequest.location + '/' + $_production.netRequest.javaModule
			this.javaUrl = $_development.javaRequest.location + '/' + $_development.javaRequest.javaModule
		this.netUrl =
			process.env.NODE_ENV === 'development'
				? $_development.netRequest.location + '/' + $_development.netRequest.netModule
				: $_development.netRequest.location + '/' + $_development.netRequest.netModule
	},
	mounted() {
		this.getList()
		// this.historyChart = this.$_echarts.init(document.getElementById('histroyChart'))
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		closeClick() {
			this.$refs.historyNotes.closeItem()
		},
		detailedTabClick(str) {
			this.filterNodeList = []
			if (str == 'viewPoints') {
				this.detailedTabX = 1
				this.filterNodeList = this.nodeList
			} else if (str == 'alarmPoints') {
				this.detailedTabX = 2
				this.nodeList.forEach(item => {
					if (item.iIsAlarm == '报警') {
						this.filterNodeList.push(item)
					}
				})
			} else if (str == 'failPoints') {
				this.detailedTabX = 3
				this.nodeList.forEach(item => {
					if (item.iIsOverlap == 1 || item.iIsOverlap == null) {
						this.filterNodeList.push(item)
					}
				})
			}
		},
		closeDetail() {
			this.detailFlag = false
			this.detailedTabX = 1
			this.filterNodeList = []
		},
		changeTimeHandle(value) {
			this.dateId = value
		},
		changeStatusHandle(value) {
			this.iStatus = value
		},
		changeAlarmHandle(value) {
			this.iIsAlarm = value
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
		//获取记录列表
		async getList() {
			this.recordLoading = true
			this.axios
				.getRecordList({
					unitId: this.stationId,
					iIsAlarm: this.iIsAlarm,
					iStatus: this.iStatus,
					dateId: this.dateId,
					currentPage: this.currentPage,
					pageSize: this.pageSize
				})
				.then(res => {
					if (res.code == 200) {
						let data = res.data.lists.map(item => {
							return item
						})
						data.forEach(item => {
							if (item.iStartTime) {
								item.iStartTime = moment(item.iStartTime * 1000).format('YYYY-MM-DD HH:mm:ss')
							} else {
								item.iStartTime = ''
							}
							if (item.iStopTime) {
								item.iStopTime = moment(item.iStopTime * 1000).format('YYYY-MM-DD HH:mm:ss')
							} else {
								item.iStopTime = ''
							}
						})
						this.inspectionRecordList = data
						this.total = res.data.page.totalNum
						this.recordLoading = false
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		//详情
		goDetail(row) {
			this.recordId = row.recordId
			this.unitId = this.stationId
			this.taskId = row.taskId
			this.detailFlag = true
			this.taskName = row.taskName
			this.startReason = row.iStartReason
			this.stopReason = row.iStopReason
			this.failPoints = row.failnodes
			this.endViewPoints = row.unExecNodes
			this.alarmPoints = row.allAlarm
			this.normalPoints = row.successNode
			this.viewPoints = row.allTaskNode
			this.startTime = row.iStartTime
			this.getStepsDetail()
		},
		//导出
		exportList() {
			var time = moment().format('YYYYMMDDHHmmss')
			window.location.href =
				this.javaUrl +
				'/report/export?unitId=' +
				this.stationId +
				'&iIsAlarm=' +
				this.iIsAlarm +
				'&iStatus=' +
				this.iStatus +
				'&dateId=' +
				this.dateId +
				'&filename=' +
				time
		},

		//每行导出
		async exportRow(row) {
			// var time = moment().format('YYYYMMDDHHmmss')
			// window.location.href = this.netUrl + 'As/ExportTaskReport?RecordID='
			// + row.recordId + '&filename=' + time + '.docx&isCache=true'
			// let params = {
			// 	RecordID: row.recordId,
			// 	filename: time + '.docx',
			// 	isCache: true
			// }
			// this.axios
			// 	.exportRow(params)
			// 	.then(res => {
			// 		if (res.success == true) {
			// 			window.location.href = this.netUrl + res.data
			// 		}
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 	})

			// console.log(row)
			this.exportingLoading = true
			var time = moment().format('YYYYMMDDHHmmss')
			var id = row.recordId
			let params = {
				recordId: id,
				fileName: id
			}
			this.axios.exportRow(params).then(res => {
				this.exportingLoading = false
				if (res.code == 200) {
					//window.location.href = res.data
					window.open(res.data)
				} else {
					this.$ocxMessage.success({
						content: '导出失败',
						duration: 5
					})
				}
			})
		},
		handleChangePage(page) {
			this.currentPage = page
			this.getList()
		},
		handleChangeSize(size) {
			this.pageSize = size
			this.getList()
		},
		// 获取详情
		async getDetail() {
			this.axios
				.getDetail({
					recordId: this.recordId,
					unitId: this.unitId,
					taskId: this.taskId
				})
				.then(res => {
					var data = res.data
					// console.log(res, 'data')
					this.taskName = data.taskName
					this.startReason = data.startReason
					this.stopReason = data.stopReason
					this.failPoints = data.failPoints
					this.alarmPoints = data.alarmPoints
					this.normalPoints = data.normalPoints
					this.viewPoints = data.viewPoints
					this.startTime = moment(data.startTime * 1000).format('YYYY-MM-DD HH:mm:ss')
				})
				.catch(err => {
					console.log(err)
				})
		},
		//获取进度详情
		async getStepsDetail() {
			this.stepDetail = true
			this.axios
				.getStepDetail({
					unitId: this.unitId,
					taskId: this.taskId,
					recordId: this.recordId
				})
				.then(res => {
					// console.log(res, 'step')
					var data = res.data
					for (var i = 0, len = data.length; i < len; i++) {
						if (data[i].iIsAlarm == 0) {
							data[i].iIsAlarm = '正常'
						} else if (data[i].iIsAlarm == 1) {
							data[i].iIsAlarm = '报警'
						}
						if (data[i].iIsOverlap == null) {
							data[i].status = '未到达'
							data[i].outBgColor = '#6abfed'
							data[i].inBgColor = '#1773a7'
						} else if (data[i].iIsOverlap == 0) {
							data[i].status = '已到达'
							data[i].outBgColor = '#5ae8f8'
							data[i].inBgColor = '#1895a3'
						} else if (data[i].iIsOverlap == 1) {
							data[i].status = '失败'
							data[i].outBgColor = '#6aa4b0'
							data[i].inBgColor = '#4f6570'
						}
						data[i].fHumidityData = data[i].fHumidityData ? data[i].fHumidityData + '%' : '--'
						data[i].fTemperatureData = data[i].fTemperatureData ? data[i].fTemperatureData + '℃' : '--'
						data[i].iUpdateTime = data[i].iUpdateTime
							? moment(data[i].iUpdateTime * 1000).format('HH:mm:ss')
							: '--'
					}
					this.nodeList = data
					this.filterNodeList = data
					this.stepDetail = false
				})
				.catch(err => {
					console.log(err)
				})
		},
		//点击图片
		handleImgModal(val) {
			this.imgFlag = true
			this.imgUrl = val
		},
		//关闭模态框
		closeModal() {
			this.imgFlag = false
		},
		openHistoryWin(node, nodeName) {
			// this.histroyBeginTime = new Date(
			// 	moment()
			// 		.add(-7, 'days')
			// 		.calendar()
			// )
			// this.histroyEndTime = new Date()
			// this.selectNode = node
			// this.selectNodeName = nodeName
			this.historyDialog = true
			this.nodeInfo = {
				nodeData: node,
				nodeNameData: nodeName
			}
			console.log(this.nodeInfo)
			//this.drawChart()
		},

		// drawChart() {
		// 	// console.log(this.histroyBeginTime,this.histroyEndTime);

		// 	if (this.historyChart) {
		// 		this.historyChart.clear()
		// 		this.historyChart.off('click')
		// 	}
		// 	this.axios
		// 		.getHistoryData({
		// 			// nodeId:'4c0529a1dc52477b9cc9a68baad5ee4d',
		// 			// startTime: '1566428555',
		// 			// endTime: '1570788841',

		// 			nodeId: this.selectNode,
		// 			startTime: parseInt(new Date(this.histroyBeginTime).getTime() / 1000),
		// 			endTime: parseInt(new Date(this.histroyEndTime).getTime() / 1000)
		// 		})
		// 		.then(res => {
		// 			if (res.success) {
		// 				let { alarmNum, unSuccessNum, chartData, unit } = res.data
		// 				this.historyAlarmNode = alarmNum
		// 				this.historyFailNode = unSuccessNum

		// 				if (chartData.length == 0) {
		// 					// this.$ocxMessage.success({
		// 					// 	content: '当前时间范围没有历史数据',
		// 					// 	duration: 2
		// 					// })
		// 					this.nodata = true
		// 					return
		// 				}
		// 				this.nodata = false
		// 				let xData = [],
		// 					yData = []
		// 				chartData.map(item => {
		// 					xData.push(moment(item.time * 1000).format('MM-DD HH:mm'))
		// 					yData.push(item.value)
		// 				})
		// 				let option = {
		// 					title: {
		// 						text: this.selectNodeName + '历史曲线',
		// 						textStyle: {
		// 							color: '#ffea00'
		// 						}
		// 					},
		// 					tooltip: {
		// 						trigger: 'axis'
		// 					},
		// 					dataZoom: [
		// 						{
		// 							show: true,
		// 							realtime: true,
		// 							start: 90,
		// 							end: 100
		// 						},
		// 						{
		// 							type: 'inside',
		// 							realtime: true,
		// 							start: 90,
		// 							end: 100
		// 						}
		// 					],
		// 					xAxis: {
		// 						type: 'category',
		// 						data: xData,
		// 						axisLabel: {
		// 							color: '#fff'
		// 						}
		// 					},
		// 					yAxis: {
		// 						name: unit,
		// 						type: 'value',
		// 						axisLine: {
		// 							show: true,
		// 							lineStyle: {
		// 								color: '#fff'
		// 							}
		// 						},
		// 						axisLabel: {
		// 							color: '#fff'
		// 						},
		// 						nameTextStyle: {
		// 							color: '#fff'
		// 						}
		// 					},
		// 					series: [
		// 						{
		// 							data: yData,
		// 							type: 'line',
		// 							smooth: true
		// 						}
		// 					]
		// 				}
		// 				let year = new Date().getFullYear()
		// 				setTimeout(() => {
		// 					this.historyChart = this.$_echarts.init(document.getElementById('histroyChart'))
		// 					this.historyChart.setOption(option)
		// 					this.historyChart.resize()
		// 					this.historyChart.on('click', params => {
		// 						this.getHistoryImg(new Date(year + '-' + params.name).getTime() / 1000)
		// 					})
		// 				}, 100)

		// 				// window.addEventListener('resize',()=>{
		// 				// 		this.historyChart.resize()
		// 				// })
		// 				this.getHistoryImg(new Date(year + '-' + xData[xData.length - 1]).getTime() / 1000)
		// 			}
		// 		})
		// },
		getHistoryImg(updateTime) {
			this.axios
				.getHistoryImg({
					nodeId: this.selectNode,
					// nodeId: '7a000c45c9594624bf160173fa2e9ab6',
					iUpdateTime: updateTime
				})
				.then(res => {
					if (res.success && res.data.length > 0) {
						this.normalImgPath = res.data[0].vcNormalVideoPath
						this.infraImgPath = res.data[0].vcInfraPicturePath
					}
				})
		},
		showBigPic(path) {
			if (path != '' && path != null) {
				this.imgUrl = path
				this.imgFlag = true
			}
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
.report {
  width: 1590px;
  height: 1080px;
  background: url('~@/assets/img/navigation/background.png') no-repeat;
  background-size: 100% 1080px;
  user-select: none;

  .report-view {
    width: 100%;
    height: 860px;
    overflow: hidden;
    background: url('~@/assets/img/common/bg-border.png') no-repeat;
    background-size: 100% 100%;
  }

  .search-bar {
    margin: 18px 0 0 40px;
    height: 50px;

    .search {
      display: inline-block;
      height: 40px;
      color: #90d9ff;
      margin: 5px 0 0 30px;

      .ipt {
        width: 190px;
        height: 100%;
      }
    }

    .btn {
      display: inline-block;
      border: none;
      background: url('~@/assets/img/common/bg17.png') no-repeat;
      background-size: 100% 100%;
      color: #ffd36a;
      margin-left: 40px;
      margin-top: 2px;
      width: 80px;
    }

    .searchbtn {
      background: url('../assets/img/record/detail.png') no-repeat;
      background-size: 100% 100%;
      color: #fff;
    }

    .searchbtn:hover, .searchbtn:active {
      background: url('../assets/img/record/detail-hover.png') no-repeat;
      background-size: 100% 100%;
    }

    .exportbtn {
      background: url('../assets/img/record/export.png') no-repeat;
      background-size: 100% 100%;
      color: #bca062;
    }

    .exportbtn:hover, .exportbtn:active {
      background: url('../assets/img/record/export-hover.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .list {
    height: 700px;
    width: 1510px;
    margin-left: 40px;

    /deep/.el-table {
      background: none;
      width: 1980px;
      overflow: auto;
	  border: 2px solid #054598;

      /deep/tr {
        background: none;
      }
    }

    /deep/.el-table--border {
    //   border-right: 2px solid #054598;
    //   border-bottom: 2px solid #054598;
	border: 2px solid #054598;
    }
	//大屏
	/deep/.el-table td, /deep/.el-table th.is-leaf {
                // border: none;
                border-color: #054598;
				border: 1px solid #054598;
              }

    .operation {
      display: inline-block;
      cursor: pointer;
      color: #3299ff;
      width: 80px;
      height: 1.4rem;
      line-height: 1.4rem;
    }

    .detail {
      background: url('../assets/img/record/detail.png') no-repeat;
      background-size: 100% 100%;
      color: #fff;
    }

    .detail:hover, .detail:active {
      background: url('../assets/img/record/detail-hover.png') no-repeat;
      background-size: 100% 100%;
    }

    .export {
      background: url('../assets/img/record/export.png') no-repeat;
      background-size: 100% 100%;
      color: #bca062;
      margin-left: 8px;
    }

    .export:hover, .export.active {
      background: url('../assets/img/record/export-hover.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .abnormal {
    color: #dfbd6d;
  }

  /deep/.page-wrap {
    margin-top: 30px;
    display: flex;
    justify-content: center;

    .ivu-page {
      .ivu-page-total, .ivu-page-prev a, .ivu-page-item a, .ivu-page-next a, .ivu-page-item-jump-next::after, .ivu-page-item-jump-prev::after, .ivu-select-item, .ivu-page-options-elevator, .ivu-page-options-elevator input {
        color: #73a6c3;
      }

      .ivu-page-disabled a {
        color: #444;
      }

      .ivu-page-item-active a, .ivu-select-selected-value {
        color: #47b2fe !important;
      }

      /* 背景色 */
      .ivu-page-prev, .ivu-page-item, .ivu-page-next, .ivu-select-selection, .ivu-page-options-elevator input {
        // background: #000d16;
        background: transparent;
      }

    //   .ivu-select-dropdown {
    //     // background: #042234;
    //     background: transparent;
    //   }

      .ivu-select-item:hover {
        background: #123854;
      }

      .ivu-select-item-focus {
        background: #1f4f73;
      }

      /* 边框色 */
      .ivu-page-prev, .ivu-page-item, .ivu-page-next, .ivu-select-selection, .ivu-page-options-elevator input {
        border-color: #104095;
      }

      .ivu-page-prev:hover, .ivu-page-item:hover, .ivu-page-next:hover, .ivu-select-selection:hover, .ivu-page-options-elevator input:hover, .ivu-page-item-active {
        border-color: #2d8cf0 !important;
      }
    }
  }

  .txt {
    width: 300px;
  }
}

label {
  color: #93dcfe;
  font-size: 16px;
}

/deep/::-webkit-scrollbar {
  width: 0.17778rem;
  height: 6px;
  border-radius: 3px;
  background: #0173bb;
}

/deep/.el-table__fixed-right::before, .el-table__fixed::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.04444rem;
  background: none;
  z-index: 4;
}

/deep/.el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
  padding-left: 0;
}

/deep/.el-select .el-input__inner {
  height: 34px;
  color: #fff;
}

/deep/ .el-table {
  font-size: 16px;
  border-color: #054598;
}

/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

/deep/.el-table__body tr.hover-row>td {
  background: none;
}

/deep/.el-table td, /deep/.el-table th.is-leaf {
  // border: none;
  border-color: #054598;
}

/deep/.el-table tbody tr:hover>td {
  background: rgba(35, 118, 220, 0.21);
}

/deep/.el-table__body tr.current-row>td {
  background: rgba(35, 118, 220, 0.21);
}

/deep/.el-table--border::after, /deep/.el-table--group::after, .el-table::before {
  background: none;
}

/deep/.el-table .cell, /deep/.el-table th div {
  padding-right: 0;
}

.detail {
  width: 1920px;
  height: 922px;
  background: url('~@/assets/img/navigation/background.png') no-repeat;
  background-size: 100% 1080px;

  // position: relative;
  .back {
    color: #90d9ff;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 100px;
    border: 1px solid #0173bb;
    background: url('~@/assets/img/common/bg17.png') no-repeat;
    background-size: 100% 100%;
  }

  .detail-content {
    height: 910px;
    width: 95%;
    margin: 0 auto;
    position: relative;
    background: url('../assets/img/common/bg.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;

    .look-detail {
      width: 100%;
      height: 30px;
      font: 100 20px / 30px '';
      color: #3fd4e0;
    }

    .info {
      height: 50px;
      width: 80%;
      margin-left: 300px;
      border: 1px solid #3bacf3;
      font: 100 16px / 30px '';
      box-shadow: 2px 1px 2px #3e9589;
      position: relative;
      top: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;

      .txt {
        color: #90d9ff;
        margin-left: 10px;
      }

      .info-left {
        float: left;
      }

      .info-right {
        float: right;

        .count {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 2px 5px;
        }

        .inspect {
          background: #109ae7;
        }

        .skip {
          background: #636963;
        }

        .fail {
          background: #cdc200;
        }

        .police {
          background: #ef2829;
        }

        .normal {
          //background: #08e310;
		  background: #808080;
        }

        .txt {
          display: inline-block;
          margin: 0 5px;
        }
		.detailedTab{
	  		cursor: pointer;
  		}
      }
    }

    .time {
      margin: 47px 0 0 173px;

      .plan-time {
        width: 200px;
        height: 90px;
        position: relative;
        text-align: center;
        background: url('../assets/img/record/plan-time.png') no-repeat;
        background-size: 96px 82px;
      }

      .start-time {
        width: 200px;
        height: 90px;
        position: relative;
        text-align: center;
        margin-top: 20px;
        background: url('../assets/img/record/start-time.png') no-repeat;
        background-size: 96px 82px;
      }

      .time-content {
        width: 96px;
        height: 14px;
        position: absolute;
        top: 29px;
        color: #74ffff;
        font-size: 14px;
      }

      .time-des {
        position: absolute;
        top: 65px;
        left: 21px;
        color: #6194b7;
        font-size: 16px;
      }
    }

    .steps {
      height: 693px;
      width: 1590px;
      overflow: auto;
      margin: 10px 0 0 171px;
      position: relative;

      .steps-content {
        width: 100%;
        height: 145px;
        position: relative;
        z-index: 100;
        margin-top: 10px;

        .circle-out {
          position: relative;
          float: left;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-top: 15px;

          .circle-in {
            position: absolute;
            width: 70px;
            height: 70px;
            margin: 15px 0 0 15px;
            border-radius: 50%;
            text-align: center;
            line-height: 70px;
            color: #fff;
          }

          .bd-top {
            position: absolute;
            width: 1px;
            height: 36px;
            top: -36px;
            left: 50px;
            background: #b0ffff;
          }

          .bd-bt {
            position: absolute;
            width: 1px;
            height: 50px;
            top: 99px;
            left: 50px;
            background: #b0ffff;
          }
        }

        .skip-out {
          background: #6aa4b0;

          .skip-in {
            background: #4f6570;
          }
        }

        .unarrive-out {
          background: #6abfed;

          .unarrive-in {
            background: #1773a7;
          }
        }

        .arrive-out {
          background: #5ae8f8;

          .arrive-in {
            background: #1895a3;
          }
        }

        .node-info {
          float: left;
          width: 940px;
          height: 100%;
          margin-left: 220px;
          background: url('../assets/img/record/border.png') no-repeat;
          background-size: 100% 100%;

          ul {
            width: 100%;
            height: 100%;

            li {
              float: left;
              height: 60px;
              font: 100 18px / 30px '';
              color: #5ff6fb;
              margin: 5px;
              text-indent: 56px;
            }

            li:nth-of-type(1) {
              width: 520px;
              background: url('../assets/img/record/object.png') no-repeat 30px 9px;
              background-size: 14px 14px;
              text-indent: 0;

              span {
                float: left;
                width: 90px;
                margin-left: 56px;
                height: 100%;
              }

              i {
                float: left;
                width: 370px;
                height: 100%;
              }
            }

            li:nth-of-type(2) {
              width: 250px;
              background: url('../assets/img/record/result.png') no-repeat 30px 9px;
              background-size: 14px 14px;
            }

            li:nth-of-type(3) {
              width: 350px;
              background: url('../assets/img/record/env-info.png') no-repeat 30px 9px;
              background-size: 14px 14px;
              margin-top: 43px;
            }

            li:nth-of-type(4) {
              width: 250px;
              background: url('../assets/img/record/alarm-status.png') no-repeat 30px 9px;
              background-size: 14px 14px;
              margin: 43px 0 0 175px;
            }
          }

          .history-rcord {
            width: 130px;
            height: 30px;
            font: 100 16px / 30px '';
            color: #fff;
            margin: -40px 0 0 780px;
            background: url('~@/assets/img/common/bg17.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            cursor: pointer;
          }
        }

        .img-content {
          float: left;
          width: 300px;
          height: 100%;

          // margin-left: 20px;
          img {
            display: inline-block;
            width: 145px;
            height: 80%;
            margin: 20px 0 0 5px;
            cursor: pointer;
          }

          /deep/.pic-img {
            display: inline-block;
            width: 138px;
            height: 100%;
            margin-left: 10px;

            .img-container {
              height: 100%;

              img {
                height: 100%;
              }
            }
          }
        }

        /deep/.img-container img {
          height: 180px;
        }

        .line {
          position: absolute;
          width: 200px;
          height: 2px;
          background: #7fc1e6;
          z-index: 100;
          left: 100px;
          top: 62px;
        }

        .dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7fc1e6;
          left: 300px;
          top: 58px;
        }

        .node-time {
          width: 200px;
          height: 37px;
          color: #80ffff;
          font: 100 16px / 37px '';
          position: absolute;
          top: 20px;
          left: 100px;
          text-align: center;
        }

        .node-point {
          position: absolute;
          width: 200px;
          height: 28px;
          font: 100 16px / 28px '';
          color: #9decfa;
          top: 70px;
          left: 100px;
          text-align: center;
        }
      }
    }

    .detail-name {
      position: absolute;
      width: 1085px;
      height: 54px;
      top: -3px;
      left: 375px;
      text-align: center;
      font: 100 16px / 54px '';
      color: #297ed3;

      .bg-lf {
        width: 55px;
        height: 23px;
        position: absolute;
        left: 415px;
        top: 15px;
        background: url('../assets/img/record/bd-lf.png') no-repeat;
        background-size: 100% 100%;
      }

      .bg-rg {
        width: 55px;
        height: 23px;
        position: absolute;
        top: 15px;
        left: 620px;
        background: url('../assets/img/record/bd-rg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  /deep/.el-scrollbar__wrap {
    overflow-y: hidden;
    overflow-x: hidden;
    margin-right: initial !important;
    margin-bottom: initial !important;

    /deep/.el-scrollbar__view {
      display: flex;
    }
  }

  ::-webkit-scrollbar, ::-webkit-scrollbar:hover, ::-webkit-scrollbar-track {
    background-color: #3299ff !important;
    width: 6px;
    height: 0;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-corner, ::-webkit-scrollbar-thumb {
    background: rgba(36, 64, 88, 0.48);
    border-radius: 3px;
    height: 100px;
  }

  /deep/.el-scrollbar__thumb {
    border-radius: 3px;
    background-color: #3299ff !important;

    &:hover {
      background-color: #3299ff !important;
    }
  }
}

/deep/img {
  display: block;
  width: 800px;
  height: 600px;
  margin: 0 auto;
}

.btn-group {
  height: 40px;

  .btn {
    width: 150px;
    height: 40px;
    background: url('../../../assets/img/common/bg540.png') no-repeat center;
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
    margin-left: 990px;
  }

  .cancel {
    color: #fff;
  }
}

/deep/.el-loading-text {
  font-size: 20px;
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

.errInfo {
  color: red;
}



/deep/.ivu-select-dropdown{
	background: #09204e !important;
	font-size: 14px;
}
/deep/ .ivu-date-picker-focused input{
	background: #081a3f !important;
}


.clickItem{
	background: #063783;
	border: 2px solid #054598;
	padding: 0 5px;
}
</style>
