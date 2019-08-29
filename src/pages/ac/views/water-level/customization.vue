<template>
	<div class="water-level-customization">
		<div class="header">
			<div class="left">
				<div class="table-wrap">
					<!-- 表格 -->
					<el-table
						highlight-current-row
						@current-change="handleCurrentChange"
						:data="tableData"
						height="500"
						row-key="NodeID"
						:current-row-key="nodeId"
					>
						<el-table-column label="设备" align="center">
							<template slot-scope="scope">
								<i class="el-icon-timer"></i>
								<span style="margin-left: 10px">{{ scope.row.nodeName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="当前水位值" align="center">
							<template slot-scope="scope">
								<span style="margin-left: 10px">{{ scope.row.desc }}</span>
							</template>
						</el-table-column>
						<el-table-column label="视频" align="center">
							<template slot-scope="scope">
								<el-button
									icon="el-icon-video-camera"
									size="mini"
									@click="handlePlayVideo(scope.row)"
								></el-button>
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
			</div>
			<div class="right">
				<div class="border-lt"></div>
				<div class="border-rb"></div>
				<ocx-video :videoConfig="videoConfig"></ocx-video>
			</div>
		</div>
		<div class="chart" ref="water-level-chart"></div>
	</div>
</template>
<script>
import ocxVideo from '@/components/native/video/OcxVideo'
import { findComponentUpward } from '@/libs/assist'
import moment from 'moment'
export default {
	name: 'water-level-customization',
	components: {
		'ocx-video': ocxVideo
	},
	props: {},
	data() {
		return {
			tableData: [],
			total: 0,
			currentPage: 1,
			pageSize: 20,
			videoConfig: {
				isAutoPlay: true,
				// serviceInfo: '1$172.26.1.128$6800$admin$admin',
				// deviceInfo: '2|172.26.1.28:37777|admin:admin123|2',
				// deviceInfo: '2|172.26.1.28:37777|admin:admin123|0',
				serviceInfo: '1$153.3.56.162$6800$admin$admin',
				deviceInfo: '64bae7e19e3011e9ac508cec4b8f5477',
				hideTool: true
			},
			echarts: null,
			xAxisData: [],
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
					top: '10%',
					left: '3%',
					right: '4%',
					bottom: '4%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: [],
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
				series: [
					{
						data: [],
						type: 'line',
						areaStyle: {},
						symbol: 'none',
						areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
						lineStyle: { normal: { color: '#04a3ff' } } //折线颜色
					}
				]
			},
			nodeId: '',
			axisLabelData: [],
			formatstr: '',
			series: [],
			nodeStateHistory: [],
			zStart: 0,
			nodeTitle: ''
		}
	},
	computed: {
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		}
	},
	filters: {},
	watch: {
		nodeId: {
			handler() {
				// console.log('更新历史数据')
				this.getHistoryByNodeId()
			}
		}
	},
	created() {
		
	},
	mounted() {
		// 获取 echarts
		// this.echarts = this.$_echarts.init(this.$refs['water-level-chart'])
		// this.echarts.setOption(this.option)
		// 初始化
		this.init()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 获取所有设备信息
		async getNodesInfo() {
			let result = await this.$_api.frame.getNodesInfo({
				unitId: this.$store.getters.unitId,
				devTypeId: this.activeDeviceTypeId,
				page: {
					currentPage: this.currentPage,
					pageSize: this.pageSize
				}
			})
			if (result.success) {
				this.tableData = result.data.lists
				this.total = result.data.page.totalNum

				// 默认选中第一个节点 曲线 视频
				if (this.tableData.length > 0 && this.tableData[0]['NodeID']) {
					this.handleCurrentChange(this.tableData[0])
					this.handlePlayVideo(this.tableData[0])
				}
			} else {
				this.tableData = []
				this.total = 0
			}
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
		handlePlayVideo(row) {
			let videoLinkArr = []
			row.linkDevInfo.forEach(node => {
				videoLinkArr.push(node.vc_Params1)
			})
			let firstUrl = ''
			let firstUrlIndex = videoLinkArr.findIndex(url => {
				return url
			})
			firstUrl = videoLinkArr[firstUrlIndex]

			this.$set(this.videoConfig, 'deviceInfo', firstUrl)

			// if ((row.linkDevInfo.length >) 0 && (row.linkDevInfo[0] != '')) {
			// 	currentLink = row.linkDevInfo[0]
			// }
		},
		handleCurrentChange(row) {
			// console.log(row)
			this.formatstr = row.vc_Unit
			this.nodeTitle = `${row.devName}设备 ${row.nodeName}节点 状态分布`
			this.nodeId = row.NodeID
		},
		// 获取设备节点历史数据
		async getHistoryByNodeId() {
			let current = new Date().getTime()
			let start = parseInt((current - 1 * 3600 * 24 * 1000) / 1000)
			let result = await this.$_api.frame.getHistoryByNodeId({
				// startTime: start,
				startTime: start,
				endTime: parseInt(current / 1000),
				nodeId: this.nodeId
			})
			if (result.success) {
				this.echartsLoad(result.data)
				this.echartsUpdate()
			} else {
			}
		},
		// 处理Echarts数据
		echartsLoad(result) {
			this.xAxisData = []
			this.series = []
			this.nodeStateHistory = result || []
			this.nodeStateHistory.map(item => {
				this.xAxisData.push(moment(item.i_DataTime * 1000).format('YYYY-MM-DD HH:mm:ss'))
				if (item.f_Value == null) {
					this.series.push(0)
				} else {
					this.series.push(item.f_Value)
				}
			})
		},
		echartsUpdate() {
			let _this = this
			let option = {
				title: {
					text: this.nodeTitle,
					textStyle: {
						color: '#0af'
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
					top: '15%',
					left: '3%',
					right: '5%',
					bottom: '10%',
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
						height: 7,
						bottom: 17,
						borderColor: 'rgba(1,37,59,0.5)',
						backgroundColor: 'rgba(1,37,59,0.5)',
						dataBackgroundColor: 'rgba(47,126,181,0.9)',
						fillerColor: 'rgba(1,138,225,0.5)',
						handleColor: 'rgba(1,37,59,0.8)'
					}
				]
			}
			this.$_echarts.init(this.$refs['water-level-chart']).setOption(option)
		},
		async init() {
			await this.getNodesInfo()
			this.getHistoryByNodeId()
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

.water-level-customization {
	width: 1590px;
	height: 100%;
	background: url('~@/assets/img/common/bg-border.png') no-repeat;
	background-size: 1590px 100%;
	padding: 30px 52px;
	// overflow: auto;
	// overflow: hidden;

	.header {
		width: 100%;
		height: 369px;
		/* background: #0af; */
		display: flex;
		justify-content: space-between;

		.left {
			width: 815px;
			height: 100%;
			/* background: #333; */
			/* height: 100%; */
			overflow: auto;
			/* background: #fff; */
			/deep/ .table-wrap {
				height: 100%;

				/deep/ .el-table {
					width: 100%;
					height: calc(100% - 45px)!important;
					background: transparent;
					color: #fff;

					view-table('~@ac/assets/img/view-table/header.png')
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

			/deep/ .el-tag, /deep/ .el-button {
				background-color: transparent;
    			border-color: #384d63;
			}

		}

		.right {
			width: 645px;
			height: 100%;
			/* background: #999; */
			position: relative;

			.border-lt {
				position: absolute;
				top: -5.5px;
				left: -5.5px;
				width: 28px;
				height: 24px;
				background: url('~@/assets/img/common/border-lt.png') no-repeat;
				background-size: 28px 24px;
			}

			.border-rb {
				position: absolute;
				bottom: -5.5px;
				right: -5.2px;
				width: 28px;
				height: 24px;
				background: url('~@/assets/img/common/border-rb.png') no-repeat;
				background-size: 28px 24px;
			}
		}
	}
	.chart {
		width: 100%;
		height: 263px;
		padding-top: 10px;
		padding-left: 10px;
		background: url('~@/assets/img/common/bg-border2.png') no-repeat;
		background-size: 100% 263px;
	}
}
</style>
