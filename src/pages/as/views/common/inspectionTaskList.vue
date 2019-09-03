<template>
	<div class="inspectionTaskList">
		<div class="inspectionTicket">
			<div class="headerInfo">
				<el-form
					:model="ruleForm"
					:rules="rules"
					ref="ruleForm"
					label-width="100px"
					class="demo-ruleForm"
					size="medium"
				>
					<el-form-item label="任务名称" prop="taskName" label-width="120px">
						<el-input v-model="ruleForm.taskName" placeholder="请输入任务名称"></el-input>
					</el-form-item>
				</el-form>
				<p>本次巡检共巡检点位{{ inspectionNodeNum }}个</p>
			</div>
			
			<el-table
				:data="nodesTableData"
				max-height="560"
				:span-method="objectSpanMethod"
				border
				:header-cell-style="{
					background: '#1d63b9',
					color: '#fff',
					fontSize: '16px',
					paddingTop: '5px',
					paddingBottom: '5px',
					fontWeight: 500
				}"
			>
				<el-table-column prop="area" label="区域" align="center" width="150"></el-table-column>
				<el-table-column prop="interval" label="间隔" align="center" width="150"></el-table-column>
				<el-table-column prop="dev" label="设备" align="center" width="150"></el-table-column>
				<el-table-column prop="node" label="巡检点位" align="center"></el-table-column>
				<el-table-column
					v-for="(item, index) in modalWorkOrderTableHeaderData"
					:key="index"
					:label="inspectionTaskHeaderText(item)"
					align="center"
					width="140"
				>
					<!-- <template slot-scope="scope">
						<img src="../../assets/img/common/dui.png" alt style="width: 15px;height: 15px;" v-if="handelCheck( scope.row.robotIDS , item.robotID )" />
					</template> -->
					<template slot-scope="scope">
						<div
							:class="scope.row.customType"
							v-if="handelCheck(scope.row.robotIDS, item.robotID)"
							@click="tableTdClick(scope.row, item.robotID)"
						></div>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-box">
				<Page
					:total="total"
					show-elevator
					:current.sync="pageNum"
					:page-size="pageSize"
					@on-change="handleChangePage"
				/>
			</div>
			<!-- 底部 按钮 -->
			<div class="modalFooterBtn">
				<input type="button" value="上一步" class="btn" @click="lastStepClick('ruleForm')" />
				<input type="button" value="生成任务" class="btn" @click="saveClick('ruleForm')" />
				<input type="button" value="取消" class="btn" @click="closeClick('ruleForm')" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'inspectionTaskList',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$_api.monitorData,
			modalInspectionTaskTableData: [],
			modalWorkOrderTableHeaderData: [],
			devOrInspec: false,
			//巡检成票表格数据
			inspectionAticketData: [],
			ruleForm: {
				taskName: ''
			},
			rules: {
				taskName: [{ required: true, message: '任务名称为必填项', trigger: 'blur' }]
			},
			nodesTableData: [],
			total: 1,
			inspectionNodeNum: 0,
			pageNum: 1, //当前页
			pageSize: 10,//每页条数
			nodesArr: []
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
		//获取表格所有数据
		getTableDataAll(addInfos) {
			this.nodesArr = []
			this.nodesTableData = []
			this.modalWorkOrderTableHeaderData = []
			this.modalInspectionTaskTableData = []
			this.axios.getInspectionWorkOrderData(addInfos).then(response => {
				if (response.success) {
					this.$emit('getTableDataArr')
					this.modalWorkOrderTableHeaderData = response.data.asRobots
					this.modalInspectionTaskTableData = response.data.asTaskNodes

					this.total = this.modalInspectionTaskTableData.length || 1
					this.inspectionNodeNum = this.modalInspectionTaskTableData.length || 0

					let arr = this.modalInspectionTaskTableData.slice(0, this.pageSize)
					arr.forEach(item => {
						this.$set(item, 'customType', 'tableTdSelect')
					})
					this.nodesTableData = arr

					response.data.asTaskNodes.forEach(item => {
						item.nodeGuidIDS.forEach(ite => {
							this.nodesArr.push({
								nodeid: item.nodeID,
								nodeguid: ite,
								sortid: 0
							})
						})
					})
					this.$emit('taskNodesDataArr', this.nodesArr)
				}
			})
		},
		tableTdClick(rowInfo, id) {
			if (rowInfo.robotIDS.indexOf(id) !== -1) {
				if (rowInfo.customType == 'tableTdSelect') {
					this.$set(rowInfo, 'customType', 'tabletdSelectN')
				} else if (rowInfo.customType == 'tabletdSelectN') {
					this.$set(rowInfo, 'customType', 'tableTdSelect')
				}
			}
		},
		//分页
		handleChangePage(page) {
			let crr = []
			this.nodesTableData = []
			crr = this.modalInspectionTaskTableData.slice((page - 1) * this.pageSize, (page - 1) * this.pageSize + this.pageSize)
			crr.forEach(item => {
				this.$set(item, 'customType', 'tableTdSelect')
			})
			this.nodesTableData = crr
		},
		inspectionTaskHeaderText(info) {
			let str = ''
			return (str = `${info.r_vc_Name} \n (${info.count})`)
		},
		handelCheck(arr, id) {
			if (arr.indexOf(id) !== -1) {
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
		//点击上一步
		lastStepClick(formName) {
			this.pageNum = 1
			this.$refs[formName].resetFields()
			this.$emit('lastStepClick')
		},
		//点击生成任务按钮
		saveClick(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let name = this.ruleForm.taskName
					this.$emit('saveClick', name)
					this.$refs[formName].resetFields()
				}
			})
		},
		//点击取消按钮
		closeClick(formName) {
			this.pageNum = 1
			this.$refs[formName].resetFields()
			this.$emit('closeAddTaskNext')
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
@import '~@/assets/style/component/iview-page/index.styl'
.inspectionTaskList {
	.inspectionTicket {
		height: 760px;
		background-size: 100% 100%;
		border-radius: 0;
		padding-top: 1px;
		
		.headerInfo{
			width: 100%;
			height: 50px;
			padding-top: 10px;
			
			.el-form{
				float: left;
				margin-top: 0;
			}
			
			p{
				margin-left: 10px;
				display: inline-block;
				float: left;
				margin-left: 450px;
				line-height: 50px;
			}
		}
		
		

		/deep/.el-table {
			margin-left: 10px;
			margin-top: 10px;
			width: calc(100% - 20px);
			border-color: #0098ff;
			
			/deep/td, /deep/th.is-leaf {
			  color: #fff;
			  border-color: #0098ff;
			  
			}
			
			/deep/th {
				padding: 0;
			}

			/deep/.el-table__body-wrapper{

				/deep/.cell {
					padding: 0;
					height: 100%;
					font-size: 16px;
				}
			}

			/deep/td,
			/deep/th.is-leaf {
				font-size: 18px;
				color: #fff;
			}

			/deep/td {
				height: 50px;
				vertical-align: top;
				.cell{
					display: flex;
					justify-content: center;
					align-items: center;
				}
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

		.page-box{
			width: 100%;
			height: 32px;
			margin-top: 10px;
			display: flex;
			justify-content: center;
			position: absolute;
			left: 0;
			bottom: 70px;

			/deep/.ivu-page {
				iview-page()
			}
		}
		.modalFooterBtn .btn:nth-of-type(1){
			margin-left: 1100px;
		}
		.modalFooterBtn {
			// position: absolute;
			// right: 50px;
			// bottom: 15px;
			width: 100%;
			height: 50px;
			position: absolute;
			background: #063e7a;
			bottom: 0px;
			left:0;
			padding: 15px 0 50px 0;
 			border-radius: 0 0 10px 10px;


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

		/deep/.el-form{
			width: 50%;
			margin-top: 20px;
			/deep/.el-form-item__label{
				color:#fff;
				font-size: 20px;
				line-height: 45px;
			}
			/deep/.el-input__inner{
				height: 45px;
			}
		}


		.tableTdSelect{
			width: 20px;
			height: 20px;
			background: url('../../assets/img/common/dui.png') no-repeat center;
			background-size: 15px 15px;
			border: 2px solid #0098ff;
			margin-top: auto;
		}
		.tabletdSelectN{
			width: 20px;
			height: 20px;
			border: 2px solid #0098ff;
			margin-top: auto;
		}




	}
}
</style>
