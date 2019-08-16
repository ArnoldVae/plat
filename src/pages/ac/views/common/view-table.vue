<template>
	<div class="view-table">
		<div class="table-wrap">
			<!-- 表格 -->
			<el-table
				v-if="tableReset"
				:span-method="objectSpanMethod"
				highlight-current-row
				@current-change="handleCurrentChange"
				:data="tableData"
				height="500"
				v-loading="loading"
			>
				<el-table-column label="设备" align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.devName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="节点" align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.nodeName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="报警等级" align="center">
					<template slot-scope="scope">
						<template v-for="item in alarmLevelList">
							<span
								:key="item.value"
								v-if="item.value == scope.row.i_AlarmLevel"
								style="margin-left: 10px"
								>{{ item.label }}</span
							>
						</template>
					</template>
				</el-table-column>
				<el-table-column label="状态/值" align="center">
					<template slot-scope="scope">
						<!-- <span style="margin-left: 10px">{{ vc_ValueDesc | getLabel(scope.row.f_Value) }}/{{ scope.row.f_Value }}</span> -->
						<span style="margin-left: 10px">{{ scope.row.desc }}</span>
						<!-- <el-popover trigger="hover" placement="top">
							<p>姓名: {{ scope.row.name }}</p>
							<p>住址: {{ scope.row.address }}</p>
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium">{{ scope.row.name }}</el-tag>
							</div>
						</el-popover> -->
					</template>
				</el-table-column>
				<el-table-column label="远方控制" align="center">
					<template slot-scope="scope">
						<div class="control-wrap" v-if="scope.row.i_NodeType == 3 || scope.row.i_NodeType == 4">
							<template v-for="item in transFunction(scope.row.vc_ValueDesc)">
								<el-button size="mini" @click="handleControl(item.id, scope.row)">{{
									item.label
								}}</el-button>
							</template>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleViewHistory(scope.row)">历史数据</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页 -->
			<div class="page-wrap">
				<Page
					@on-change="handleChangePage"
					@on-page-size-change="handleChangeSize"
					:total="total"
					:current="currentPage"
					:page-size="pageSize"
					show-sizer
					show-elevator
					show-total
				/>
			</div>
		</div>
		<ocx-modal
			:mask="false"
			title="提醒"
			v-model="confirmModalShow"
			@on-ok="confirmModalOk"
			@on-cacel="confirmModalCacel"
		>
			<p>确认执行该操作？</p>
		</ocx-modal>
		<!-- 历史曲线 -->
		<ocx-modal
			:styles="{ top: '0px' }"
			title="历史记录"
			:mask="false"
			@on-cancel="handleCloseHistoryModal"
			class="historyModal"
			v-model="historyModal"
			scrollable
		>
			<!-- <div class="slot:header"></div> -->
			<div class="history-body">
				<div class="selectionTime">
					<Form
						label-position="right"
						ref="formValidate"
						:model="formValidate"
						:rules="ruleValidate"
						:label-width="100"
					>
						<FormItem label="选择时间段" prop="date">
							<DatePicker
								@on-ok="handleSelectTime"
								type="daterange"
								confirm
								placement="bottom-end"
								split-panels
								placeholder="请单击选择时间段"
								v-model="formValidate.date"
							></DatePicker>
						</FormItem>
					</Form>
				</div>
				<!-- <div class="name">设备-节点</div> -->
				<div class="chart" ref="view-table-chart"></div>
			</div>
			<div slot="footer"></div>
		</ocx-modal>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import confirmModal from '@/components/native/confirm-modal/confirm-modal'
import { getDataType } from '@/libs/assist'
import moment from 'moment'
export default {
	name: 'view-table',
	components: { confirmModal },
	props: {},
	data() {
		const validateDate = (rule, value, callback) => {
			value.forEach(item => {
				if (item === '') {
					return callback(new Error('请选择日期时间'))
				}
				if (getDataType(item) !== 'Date') {
					return callback(new Error('请重新选择日期'))
				}
				callback()
			})
		}
		return {
			tableData: [],
			total: 0,
			currentPage: 1,
			pageSize: 20,
			alarmLevelList: [],
			nodeId: '',
			confirmModalShow: false,
			// 当前的命令值
			controlValue: null,
			// 当前行信息
			currentRowInfo: null,
			// 合并单元格参数
			statistics: null,
			spanArr: [],
			position: 0,
			guidList: ['11', '22', '33'],
			historyModal: false,
			formValidate: {
				date: ['2019-07-14', '2019-07-24']
			},
			ruleValidate: {
				date: [{ validator: validateDate, trigger: 'blur' }]
			},
			eNodeId: '',
			xAxisData: [],
			axisLabelData: [],
			series: [],
			nodeStateHistory: [],
			zStart: 0,
			formatstr: '',
			tableReset: true,
			loading: false
		}
	},
	computed: {
		/*activeDeviceInfoList() {
			return findComponentUpward(this, 'intelligent').deviceInfoList
		},*/
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		}
	},
	filters: {
		// 获取当前值
		getLabel: function(descInfo, id) {
			let fValueList = []
			if (descInfo) {
				let arr = descInfo.split('|') || []
				for (var i = 0; i < arr.length; i++) {
					let key = arr[i].split(' ')[0]
					let label = arr[i].split(' ')[1]
					fValueList.push({
						id: key,
						label: label
					})
				}
			}
			let label = ''
			fValueList.forEach(item => {
				if (item.id == id) {
					label = item.label
				}
			})
			return label
		}
	},
	watch: {
		/*activeDeviceInfoList: {
			handler(val) {
				this.tableData = val
				console.log('子集', this.tableData)
			},
			immediate: true
		},*/
		activeDeviceTypeId: {
			handler(val) {
				this.currentPage = 1
				this.getNodesInfo()
			},
			immediate: true
		},
		nodeId: {
			handler() {
				// 更新历史数据
			}
		}
	},
	created() {
		this.getDeviceTypeMap()
	},
	mounted() {
		this.listenMqttMessage()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 选择日期
		async handleSelectTime() {
			await this.getHistoryByNodeId()
			this.EchartsReady()
		},
		// 关闭历史界面
		handleCloseHistoryModal() {
			// console.log('关闭')
			this.eNodeId = ''
			this.xAxisData = []
			this.axisLabelData = []
			this.series = []
			this.nodeStateHistory = []
			this.formatstr = ''
		},
		// 合并单元格
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			// console.log('row', row)
			// console.log('column', column)
			// console.log('rowIndex', rowIndex)
			// console.log('columnIndex', columnIndex)

			// for (let key in this.statistics) {
			// 	if (columnIndex === 0 && rowIndex === 0) {
			// 		if (row['DevID'] === key) {
			// 			return {
			// 				rowspan: this.statistics[key],
			// 				colspan: 1
			// 			}
			// 		} else {
			// 			return {
			// 				rowspan: 1,
			// 				colspan: 1
			// 			}
			// 		}
			// 	}
			// }

			// for (let key in this.statistics) {
			if (columnIndex === 0) {
				const _row = this.spanArr[rowIndex]
				const _col = _row > 0 ? 1 : 0
				return {
					rowspan: _row,
					colspan: _col
				}
			}
			// }
		},
		transFunction(descInfo) {
			let fValueList = []
			if (descInfo) {
				let arr = descInfo.split('|') || []
				for (var i = 0; i < arr.length; i++) {
					let key = arr[i].split(' ')[0]
					let label = arr[i].split(' ')[1]
					fValueList.push({
						id: key,
						label: label
					})
				}
			}
			return fValueList
		},
		async handleViewHistory(row) {
			// console.log(row)
			this.historyModal = true
			this.nodeTitle = `${row.devName}设备 ${row.nodeName}节点 状态分布`

			this.formatstr = row.vc_Unit

			// this.axisLabelData = row.valueDesc.split('|')
			// if (!!row.valueDesc && row.nodeName != '水位') {
			// 	this.axisLabelData = row.valueDesc.split('|')
			// } else {
			// 	this.axisLabelData = []
			// }

			this.eNodeId = row.NodeID

			// 设置默认时间 风速 风向 数据量过大 只取一小时
			this.$set(this.formValidate.date, 0, new Date(Date.now() - 24 * 60 * 60 * 1000))
			this.$set(this.formValidate.date, 1, new Date(Date.now()))
			this.zStart = 0
			if (row.nodeName == '风速' || row.nodeName == '风向' || row.nodeName == '风级') {
				this.$set(this.formValidate.date, 0, new Date(Date.now() - 1 * 60 * 60 * 1000))
				this.$set(this.formValidate.date, 1, new Date(Date.now()))
				this.zStart = 99
			}

			await this.getHistoryByNodeId()

			this.EchartsReady()
		},
		// 获取报警等级枚举
		async getDeviceTypeMap() {
			let { data } = await this.$_api.getStaticData()
			this.alarmLevelList = data.alarmLevel
		},
		// 获取所有设备信息
		async getNodesInfo() {
			this.loading = true
			try {
				let result = await this.$_api.frame.getNodesInfo({
					unitId: this.$store.getters.unitId,
					devTypeId: this.activeDeviceTypeId,
					page: {
						currentPage: this.currentPage,
						pageSize: this.pageSize
					}
				})
				// console.log('获取所有设备信息', result)
				if (result.success) {
					this.spanArr = []
					this.position = 0
					this.tableData = result.data.lists
					console.log(this.tableData)
					this.total = result.data.page.totalNum

					this.rowFn()

					// this.tableReset = false

					// this.$nextTick(() => {
					// 	this.tableReset = true
					// })
				} else {
					this.tableData = []
					this.total = 0
				}
				this.loading = false
			} catch (e) {
				this.$ocxMessage.error(`${e}`)
				this.loading = false
			}
		},
		rowFn() {
			this.tableData.forEach((item, index) => {
				if (index === 0) {
					this.spanArr.push(1)
					this.position = 0
				} else {
					if (item.DevID === this.tableData[index - 1].DevID) {
						this.spanArr[this.position] += 1
						this.spanArr.push(0)
					} else {
						this.spanArr.push(1)
						this.position = index
					}
				}
			})
		},
		spanA() {
			let arr = []
			this.tableData.map(item => {
				item.devName && arr.push(item.DevID)
			})

			this.statistics = {}
			for (var i = 0; i < arr.length; i++) {
				var cname = arr[i]
				if (this.statistics[cname]) {
					this.statistics[cname]++
				} else {
					this.statistics[cname] = 1
				}
			}
			// console.log(this.statistics)
		},
		// 分页跳转
		handleChangePage(page) {
			this.currentPage = page
			this.getNodesInfo()
		},
		// 改变分页大小
		handleChangeSize(size) {
			this.pageSize = size
			this.getNodesInfo()
		},
		// 获取设备节点历史数据
		async getHistoryByNodeId() {
			this.xAxisData = []
			this.series = []
			// 展示弹窗(封装)
			let result = await this.$_api.frame.getHistoryByNodeId({
				startTime: parseInt(moment(new Date(this.formValidate['date'][0])).valueOf() / 1000),
				endTime: parseInt(moment(new Date(this.formValidate['date'][1])).valueOf() / 1000),
				nodeId: this.eNodeId
			})
			// console.log('获取历史数据', result)
			if (result.success) {
				this.nodeStateHistory = result.data || []
				this.nodeStateHistory.map(item => {
					this.xAxisData.push(moment(item.i_DataTime * 1000).format('YYYY-MM-DD HH:mm:ss'))
					if (item.f_Value == null) {
						this.series.push(0)
					} else {
						this.series.push(item.f_Value)
					}
				})
			} else {
				// this.tableData = []
				// this.total = 0
			}
		},
		EchartsReady() {
			let EchartsDom = this.$_echarts.init(this.$refs['view-table-chart'])
			let _this = this
			let option = {
				title: {
					text: this.nodeTitle,
					textStyle: {
						color: '#fff'
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						},
						triggerTooltip: {}
					},
					formatter: function(params) {
						// console.log(params)
						let name = params[0].name
						let data = params[0].data
						let marker = params[0].marker
						if (_this.axisLabelData.length == 0 && data != null) {
							return `时间：${name} <br /> ${marker}节点变化值：${data}${_this.formatstr}`
						}

						for (let i = 0; i < _this.axisLabelData.length; i++) {
							let theName = _this.axisLabelData[i].split(' ')
							if (data == theName[0]) {
								return `时间：${name}<br />${marker}节点变化值：${theName[1]}`
							}
						}
					}
				},
				grid: {
					top: '8%',
					left: '5%',
					right: '6%',
					bottom: '8%',
					containLabel: true
				},
				toolbox: {
					show: true,
					feature: {
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.xAxisData,
					axisLine: {
						show: false,
						lineStyle: {
							color: '#999'
						}
					},
					axisLabel: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						formatter: function(name) {
							if (_this.axisLabelData.length == 0) return name + _this.formatstr
							if (_this.series[0] == null) return name + _this.formatstr
							for (var i = 0; i < _this.axisLabelData.length; i++) {
								let arr = _this.axisLabelData[i].split(' ')
								switch (name) {
									case parseInt(arr[0]):
										return arr[1]
								}
							}
						},
						textStyle: {
							color: '#fff'
						}
					},
					axisPointer: {
						// snap: true
					},
					axisLine: {
						lineStyle: {
							color: '#2d3650'
						}
					},
					splitLine: {
						lineStyle: {
							color: '#2d3650'
						}
					}
				},
				series: [
					{
						name: '节点变化值',
						areaStyle: {},
						type: 'line',
						smooth: true,
						data: this.series,
						connectNulls: true,
						areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
						lineStyle: { normal: { color: '#04a3ff' } }, //折线颜色
						connectNulls: true
					}
				],
				// dataZoom: [
				// 	{
				// 		type: 'inside',
				// 		xAxisIndex: 0,
				// 		filterMode: 'empty',
				// 		start: 0,
				// 		end: 100
				// 	},
				// 	{
				// 		type: 'slider',
				// 		xAxisIndex: 0,
				// 		filterMode: 'empty',
				// 		start: this.zStart,
				// 		end: this.zEnd
				// 	}
				// ],
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
						height: 15,
						bottom: 10,
						borderColor: 'rgba(1,37,59,0.5)',
						backgroundColor: 'rgba(1,37,59,0.5)',
						dataBackgroundColor: 'rgba(47,126,181,0.9)',
						fillerColor: 'rgba(1,138,225,0.5)',
						handleColor: 'rgba(1,37,59,0.8)'
					}
				]
			}
			EchartsDom.setOption(option)
		},
		handleCurrentChange(row) {
			this.nodeId = row.NodeID
		},
		handleControl(value, row) {
			this.controlValue = value
			this.currentRowInfo = row
			this.confirmModalShow = true
		},
		// 监听消息
		listenMqttMessage() {
			this.$_listen(this.$options.name, (topic, message, packet) => {
				// 数据转换
				let oMessage = JSON.parse(message.toString())
				// console.log(oMessage)

				// 实时数据
				if (oMessage.cmd == '1001' && oMessage.unitid == this.$store.getters.unitId) {
					console.log('Table-实时数据', oMessage)
					// 处理空调实时消息
					this.handleRealMessage(oMessage)
				}

				// 实时结果
				if (oMessage.cmd == '1004' && this.guidList.indexOf(oMessage.serial) != -1) {
					console.log('Table-实时结果', oMessage)
					// 处理控制结果解析
					this.handleRealResult(oMessage)
				}

				// 实时报警
				if (oMessage.cmd == '1002' && oMessage.unitid == this.$store.getters.unitId) {
					console.log('Table-实时报警', oMessage)
					// 处理控制结果解析
					this.handleRealAlarm(oMessage)
				}
			})
		},
		// 实时数据
		handleRealMessage(msg) {
			this.tableData.forEach(deviceNode => {
				if (msg.nodeid == deviceNode.NodeID) {
					deviceNode.f_Value = msg.value
					deviceNode.desc = msg.desc
				}
			})
		},
		// 实时报警
		handleRealAlarm(msg) {
			this.tableData.forEach(deviceNode => {
				if (msg.nodeid == deviceNode.NodeID) {
					deviceNode.f_Value = msg.value
					deviceNode.desc = msg.desc
					deviceNode.i_AlarmLevel = msg.level
				}
			})
		},
		// 实时结果
		handleRealResult(msg) {
			if (msg.result == '1') {
				this.$ocxMessage.info('操作成功')
			} else {
				this.$ocxMessage.info('操作失败')
			}
			let guidIndex = this.guidList.findIndex(item => {
				return item == msg.serial
			})
			// 清除guid标识
			this.guidList.splice(guidIndex, 1)
		},
		// 二次确认框确认与取消
		confirmModalOk() {
			function guid() {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = (Math.random() * 16) | 0,
						v = c == 'x' ? r : (r & 0x3) | 0x8
					return v.toString(16)
				})
			}
			// 智辅 mqtt 控制命令报文
			let currentGuid = guid()
			let message = {
				cmd: 1003,
				type: 'req',
				srcid: '',
				serial: currentGuid,
				time: parseInt(new Date().getTime() / 1000),
				nodes: [
					{
						devid: this.currentRowInfo.DevID,
						nodeid: this.currentRowInfo.NodeID,
						value: this.controlValue
					}
				]
			}
			// console.log(`qif/zf/app/control/${this.$store.getters.unitId}`)
			// console.log(message)
			this.$_mqtt.publish(`qif/zf/app/control/${this.$store.getters.unitId}`, JSON.stringify(message), {
				qos: 0,
				retain: false
			})
			// 追加标识id
			this.guidList.push(currentGuid)
		},
		confirmModalCacel() {
			this.controlValue = null
			this.currentRowInfo = null
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
@import '~@/assets/style/component/index.styl'

.view-table {
	height: 100%;
	overflow: auto;
	padding-right: 20px;

	/deep/ .el-loading-mask {
		background-color: #0e224c;
	}

	/deep/ .table-wrap {
		height: 100%;

		/deep/ .el-table {
			width: 100%;
			height: calc(100% - 45px)!important;
			background: transparent;
			color: #fff;

			view-table('~@ac/assets/img/view-table/header.png')

			.control-wrap {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
			}

			.el-button+.el-button {
				margin-left: initial;
				margin: 2.5px;
			}

			.el-button {
				margin: 2.5px;
				background: transparent;
				border-color: #2d8cf0;
				color: #2d8cf0;
				position: relative;

				&:hover {
					background: #09102f;
				}

				&:active {
					top: 1px;
					left: 1px;
				}

			}
		}

		.page-wrap {
			margin-top: 10px;
			display: flex;
			justify-content: center;

			.ivu-page {
				iview-page()
			}
		}
	}

	/deep/ .ivu-modal {
		width: 400px!important;
	}
}

.historyModal {
	/deep/ .ivu-modal-wrap {

		.ivu-modal {
			width: 53.333rem !important;

			.ivu-modal-content {
				background: url('~@/assets/img/common/modal-bg.png') no-repeat;
				background-size: 100% 100%;

				.ivu-modal-header {
					border-color: rgba(36, 108, 169, 0.48);
					text-align: center;

					.ivu-modal-header-inner {
						color: #0af;
						font-size: 20px;
					}

					.ivu-modal-close {

						i {
							font-size: 40px;
							color: #fff;
						}
					}
				}

				.ivu-modal-body {
					color: #b0e1f9;

					.history-body {

						.ivu-form .ivu-form-item-label {
							font-size: 16px;
							color: #99e5ff;
							display: flex;
							justify-content: center;
						}

						.chart {
							width: 100%;
							height: 600px;
						}

						.ivu-input-wrapper {
							width: 190px;

							.ivu-input {
								background: #162e4d;
								color: #44adf7;
								border: 0.01rem solid #015e9a !important;
							}
						}

						.ivu-picker-panel-body {
							color: #888;

							.ivu-date-picker-cells-cell-range:before {
								background: #143e6f7a;
							}
						}

						.ivu-select-dropdown {
							background: #162e4d;
						}
						.ivu-btn-text {
							color: #99e5ff;
						}
						.ivu-select-selection {
							border: 0.01rem solid #015e9a;
						}
						.ivu-select-selection {
							background: #162e4d;
						}
						.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
						.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
							color: #44adf7;
						}
						.ivu-select-item-focus {
							background: #125c92;
							color: #44adf7 !important;
						}
						.ivu-select-dropdown-list li {
							&:hover {
								background: #125c92;
								color: #2d8cf0;
							}
						}
						.ivu-select-item {
							color: #8bd3ec;
						}

						.ivu-btn.ivu-btn-text.ivu-btn-large {
							&:hover {
								background-color: #162f63;
							}
						}
						.ivu-btn-primary {
							background-color: #093c71;
							border-color: #093c71;
						}
						.ivu-btn.ivu-btn-primary.ivu-btn-large {
							&:hover {
								background-color: #194c82;
								border-color: #194c82;
							}
						}

					}
				}

				.ivu-modal-footer {
					border-color: rgba(36, 108, 169, 0.48);
					display: none;

					.ivu-btn-text {
						color: #8895ad;

						&:hover {
							color: #57a3f3;
							background-color: #183e6f;
							border-color: transparent;
						}
					}
					.ivu-btn-primary {
						background-color: transparent;
						color:#73a6c3;
						border-color: #0f3047;

						&:hover {
							color: #47b2fe;
							// background-color: #47b2fe ;
							border-color: #2d8cf0;
						}
					}
				}
			}
		}
	}
}
</style>
