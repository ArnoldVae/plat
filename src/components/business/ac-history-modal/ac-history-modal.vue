<template>
	<div class="ac-history-modal">
		<ocx-modal
			:styles="{ top: '0px' }"
			title="历史记录"
			:mask="false"
			@on-cancel="handleCloseHistoryModal"
			class="historyModal-wrap"
			:value="value"
			scrollable
			v-bind="$attrs"
			v-on="$listeners"
		>
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
				<div class="chart" ref="view-table-chart"></div>
			</div>
			<div slot="footer"></div>
		</ocx-modal>
	</div>
</template>
<script>
import { getDataType } from '@/libs/assist'
import moment from 'moment'
export default {
	name: 'ac-history-modal',
	components: {},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		subTitle: {
			type: String,
			default: ''
		},
		nodeId: {
			type: String,
			default: ''
		},
		unit: {
			type: String,
			default: ''
		}
	},
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
			formatstr: ''
		}
	},
	computed: {},
	filters: {},
	watch: {
		value: {
			handler(val) {
				if (val) {
					this.eNodeId = this.nodeId
					this.$nextTick(() => {
						this.handleViewHistory()
					})
				}
			},
			immediate: true
		}
	},
	created() {},
	mounted() {
		// this.eNodeId = this.nodeId
		// this.$nextTick(() => {
		// 	this.handleViewHistory()
		// })
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
		async handleViewHistory() {
			// console.log(row)
			// this.nodeTitle = `${row.devName}设备 ${row.nodeName}节点 状态分布`

			this.formatstr = this.unit

			// this.axisLabelData = row.valueDesc.split('|')
			// if (!!row.valueDesc && row.nodeName != '水位') {
			// 	this.axisLabelData = row.valueDesc.split('|')
			// } else {
			// 	this.axisLabelData = []
			// }

			this.eNodeId = this.nodeId

			// 设置默认时间 风速 风向 数据量过大 只取一小时
			this.$set(this.formValidate.date, 0, new Date(Date.now() - 24 * 60 * 60 * 1000))
			this.$set(this.formValidate.date, 1, new Date(Date.now()))
			this.zStart = 0
			// if (row.nodeName == '风速' || row.nodeName == '风向' || row.nodeName == '风级') {
			// 	this.$set(this.formValidate.date, 0, new Date(Date.now() - 1 * 60 * 60 * 1000))
			// 	this.$set(this.formValidate.date, 1, new Date(Date.now()))
			// 	this.zStart = 99
			// }

			await this.getHistoryByNodeId()

			this.EchartsReady()
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
					text: this.subTitle,
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
.ac-history-modal{}
.historyModal-wrap {
	/deep/ .ivu-modal-wrap {

		.ivu-modal {
			width: 53.333rem !important;

			.ivu-modal-content {

				.ivu-modal-header {
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
					display: none;
				}
			}
		}
	}
}
</style>
