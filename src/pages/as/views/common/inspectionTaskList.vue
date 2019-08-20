<template>
	<div class="inspectionTaskList">
		<div class="inspectionTicket">
			<el-table :data="modalInspectionTaskTableData" max-height="630" :span-method="objectSpanMethod" :header-cell-style="{ background: '#0d2a68', color: '#2c87e6' , fontSize: '14px' }">
				<el-table-column prop="area" label="区域" align="center" width="80"></el-table-column>
				<el-table-column prop="interval" label="间隔" align="center" width="80"></el-table-column>
				<el-table-column prop="dev" label="设备" align="center" width="80"></el-table-column>
				<el-table-column prop="node" label="巡检点位" align="center"></el-table-column>
				<el-table-column v-for="( item , index ) in modalWorkOrderTableHeaderData" :key=index :label="inspectionTaskHeaderText( item )"
				 align="center" width="70">
					<template slot-scope="scope">
						<img src="../../assets/img/common/dui.png" alt style="width: 15px;height: 15px;" v-if="handelCheck( scope.row.robotIDS , item.robotID )" />
					</template>
				</el-table-column>
			</el-table>
			</el-table>
			<!-- 底部 按钮 -->
			<div class="modalFooterBtn">
				<input type="button" value="执行任务" class="btn"/>
				<input type="button" value="取消" class="btn" @click="closeClick"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'inspectionTaskList',
	components: {},
	props: {
		modalInspectionTaskTableData: {
			type: Array
		},
		modalWorkOrderTableHeaderData: {
			type: Array
		}
	},
	data() {
		return {
			devOrInspec: false,
			//巡检成票表格数据
			inspectionAticketData: []
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		inspectionTaskHeaderText( info ) {
			let str = ''
			return str = `${info.r_vc_Name} \n (${info.count})`
		},
		handelCheck(arr, id) {
			if (arr.indexOf(id) == 0) {
				return true
			}
		},
		//合并单元格的方法
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				const _row = this.desData('mainArea', this.modalInspectionTaskTableData)[rowIndex]
				const _col = _row > 0 ? 1 : 0
				return {
					rowspan: _row,
					colspan: _col
				}
			}
			if (columnIndex === 1) {
				const _row = this.desData('subArea', this.modalInspectionTaskTableData)[rowIndex]
				const _col = _row > 0 ? 1 : 0
				return {
					rowspan: _row,
					colspan: _col
				}
			}
			if (columnIndex == 2) {
				const _row = this.desData('devName', this.modalInspectionTaskTableData)[rowIndex]
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
		//点击取消按钮
		closeClick() {
			this.$emit( 'closeAddTaskNext' )
		},
		//点击 执行任务 按钮
		executeTaskClick() {
			this.$refs['area'].innerHTML = this.selectAreaList.length
				? this.selectAreaList[0].typeName
				: '请选择巡检区域'
			// console.log('666')
			let data = {
				cmd: '2202',
				type: 'req',
				srcid: '',
				destid: '',
				serial: '',
				unitid: this.stationId,
				time: new Date().getTime() / 1000,
				tasknode: [
					{
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
.inspectionTaskList {
	.inspectionTicket {
		height: 750px;
		padding-top: 20px;
		background-size: 100% 100%;

		/deep/.el-table {
			margin-left: 10px;
			margin-top: 20px;
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
		
		}
		
		/deep/.el-table{
			// 滚动条的宽度
			::-webkit-scrollbar {
				width: 4px;
				height: 10px;
			}
			// 滚动条的滑块
			::-webkit-scrollbar-thumb {
				background-color: #a1a3a9;
			}
		}

		/deep/.el-table__body-wrapper {
			position: relative;
		}

		.modalFooterBtn {
			position: absolute;
			right: 50px;
			bottom: 30px;

			.btn {
				width: 100px;
				height: 30px;
				background: url('../../../../assets/img/common/bg540.png') no-repeat center;
				background-size: 100% 100%;
				border-radius: 3px;
				text-align: center;
				margin: 5px;
				border: 0;
				color: #fff;
				font-size: 16px;
				cursor: pointer;
			}

			.cancel {
				color: #fff;
			}
			.btn:active{
				color: #d8c50e;
			}
			
		}

		.devIdBox {
			display: flex;
		}

		.devIdB:nth-of-type(1) {
			width: 660px;
			height: 50px;
			padding-left: 30px;
		}

		.devIdB:nth-of-type(2) {
			width: 635px;
			height: 50px;
			padding-left: 20px;
		}

		.devIdB:nth-of-type(3) {
			width: 270px;
			height: 50px;
			display: flex;

			div {
				width: 85px;
				display: flex;
			}

			i {
				margin-top: 5px;
				width: 20px;
				height: 20px;
				display: block;
				border-radius: 50%;
				margin-right: 10px;
			}

			span {
				margin-right: 15px;
			}
		}
	}
}
</style>
