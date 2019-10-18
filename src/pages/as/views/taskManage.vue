<template>
	<!-- 任务管理 -->
	<div class="taskManage">
		<div class="search-bar">
			<div class="search">
				<label for>任务名称：</label>
				<el-input class="ipt" v-model="taskName" placeholder="请输入任务名称" />
			</div>
			<div class="search">
				<label for>任务类型：</label>
				<el-select class="ipt" v-model="value" placeholder="请选择" @change="handleChangeTaskType">
					<el-option
						v-for="item in taskType"
						:key="item.dictID"
						:label="item.vcName"
						:value="item.dictID"
					></el-option>
				</el-select>
			</div>
			<div class="search">
				<label for>任务子类型：</label>
				<el-select class="ipt" v-model="value2" placeholder="请选择" @change="handleChangeTaskSubType">
					<el-option
						v-for="item in taskSubType"
						:key="item.dictID"
						:label="item.vcName"
						:value="item.dictID"
					></el-option>
				</el-select>
			</div>
			<div class="search">
				<label for>状态：</label>
				<el-select class="ipt" v-model="value3" placeholder="请选择" @change="handleChangeStatus">
					<el-option
						v-for="item in status"
						:key="item.dictID"
						:label="item.vcName"
						:value="item.dictID"
					></el-option>
				</el-select>
			</div>
			<el-button type="primary" class="btn searchbtn" @click="getTaskList">查询</el-button>
			<el-button type="primary" class="btn addTaskBtn" @click="addTask">新增</el-button>
			<el-button type="primary" class="btn delTaskBtn" @click="delMoreTask">批量删除</el-button>
		</div>
		<div class="list">
			<el-table
				border
				:data="taskList"
				v-loading="taskLoading"
				highlight-current-row
				element-loading-text="正在加载中"
				element-loading-background="rgba(0, 0, 0, 0)"
				:row-style="tableRowStyle"
				:header-cell-style="tableHeaderColor"
				@selection-change="handleSelectionChange"
				style="width: 100%"
				height="710"
			>
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column label="任务名称" align="center" width="500">
					<template slot-scope="scope">{{ scope.row.taskName }}</template>
				</el-table-column>
				<el-table-column label="任务类型" align="center">
					<template slot-scope="scope">{{ scope.row.strType }}</template>
				</el-table-column>
				<el-table-column align="center" label="任务子类型">
					<template slot-scope="scope">{{ scope.row.strSubType }}</template>
				</el-table-column>
				<el-table-column align="center" label="状态">
					<template slot-scope="scope">{{ scope.row.statusName }}</template>
				</el-table-column>
				<el-table-column align="center" label="最后执行时间">
					<template slot-scope="scope">{{ scope.row.updateTime }}</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template slot-scope="scope">
						<el-button type="primary" class="btn del" @click="delOneTask(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<!-- 分页 -->
		<div class="page-wrap" v-show="taskList.length > 0">
			<Page
				@on-change="handleChangePage"
				@on-page-size-change="handleChangeSize"
				:total="total"
				:current="page"
				:page-size="pageSize"
				show-sizer
				show-elevator
			/>
		</div>
		<ocx-modal
			v-model="addTaskModal"
			:width="1430"
			footer-hide
			:title="addTaskTitle"
			@on-cancel="closeAddTask"
			:styles="{ top: '0' }"
			draggable
		>
			<taskOrder
				ref="taskOrder"
				@closeAddTask="closeAddTask"
				@inspectionAticketClick="inspectionAticketClick"
			></taskOrder>
		</ocx-modal>
		<ocx-modal
			v-model="addTaskNext"
			:width="1430"
			:title="inspectionTaskFormTitle"
			footer-hide
			@on-cancel="closeAddTaskNext"
			:styles="{ top: '0' }"
			draggable
		>
			<inspectionTaskList
				ref="inspectionTaskList"
				:element-loading-text="addTaskLoadingText"
				element-loading-background="#061638"
				@closeAddTaskNext="closeAddTaskNext"
				@saveClick="saveClick"
				@lastStepClick="lastStepClick"
				@getTableDataArr="getTableDataArr"
				@taskNodesDataArr="taskNodesDataArr"
				v-show="inspectionFlag"
			></inspectionTaskList>
			<!-- v-loading="inspectionTaskListLoading" -->
			<div class="taskListMark" v-show="inspectionMark">
				<img src="../assets/img/monitor/xunjiangif.gif" alt="" />
			</div>
		</ocx-modal>

		<div class="addTaskLoading" v-show="addImgFlag">
			<img src="../assets/img/monitor/xunjiangif.gif" alt="" />
		</div>
	</div>
</template>
<script>
import moment from 'moment'
import taskOrder from './common/task-order'
import inspectionTaskList from './common/inspection-taskList.vue'
export default {
	name: 'taskManage',
	components: {
		taskOrder,
		inspectionTaskList
	},
	props: {},
	data() {
		return {
			axios: this.$_api.taskManageData,
			axiosM: this.$_api.monitorData,

			addImgFlag: false,
			inspectionFlag: false,
			inspectionMark: true,

			value: null,
			value2: null,
			value3: null,
			taskList: [],
			page: 1,
			pageSize: 10,
			total: 0,
			taskType: [],
			taskSubType: [],
			status: [],
			i_Type: '', //任务类型
			i_SubType: '', //任务子类型
			i_Status: '', //状态
			addTaskModal: false,
			addTaskNext: false,
			inspectionTaskListLoading: false,
			modalInspectionTaskTableData: [],
			modalWorkOrderTableHeaderData: [],
			taskName: '',
			topicArr: ['qif/xj/app/control/', 'qif/xj/app/data/'],
			allTasks: [], //全选任务
			addTaskTitle: '新增任务',
			inspectionTaskFormTitle: '巡检任务单',
			topicStr: '',
			addTaskLoadingText: '',
			taskLoading: true
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
				if (val) {
					this.unitId = val
					this.getTaskList()
				}
			},
			immediate: true
		}
	},
	created() {
		this.getTaskList()
		this.getTaskType()
		this.getTaskSubType()
		this.getTaskStatus()
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
	activited() {
		this.registerListen()
	},
	deactivated() {
		this.$_stop('addTask')
	},
	update() {},
	beforeDestory() {},
	methods: {
		registerListen() {
			this.$_listen('addTask', (topic, message, packet) => {
				let data = ''
				let dataObj = []
				data = message.toString()
				let msgData = JSON.parse(data)
				console.log(msgData)
				if (topic == this.topicStr) {
					//巡检结果
					if (msgData.cmd === 2203) {
						//增加任务回复
						this.inspectionTaskListLoading = true
						this.addTaskNext = false
						this.getTaskList()
						this.addTaskLoadingText = '正在生成巡检任务单'
					}
				}
			})
		},
		//获取任务列表
		async getTaskList() {
			let params = {
				unitId: this.$store.getters.stationId,
				currentPage: this.page,
				pageSize: this.pageSize,
				intType: this.i_Type,
				intSubType: this.i_SubType,
				intStatus: this.i_Status,
				taskName: this.taskName
			}
			this.axios
				.getTaskList(params)
				.then(res => {
					if (res.success) {
						res.data.lists.map(item => {
							if (item.str_UpdateTime) {
								item.updateTime = moment(item.str_UpdateTime * 1000).format('YYYY-MM-DD HH:mm:ss')
							}
						})
						this.taskList = res.data.lists
						this.total = res.data.page.totlNum
						this.page = res.data.page.currentPage
						this.pageSize = res.data.page.pageSize
						this.taskLoading = false
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		async getTaskAllList() {
			let obj = {
				unitId: this.stationId,
				isPage: 1
			}
			this.axiosM.getPresetInspectionData(obj).then(res => {
				if (res.code == 200 && res.data.length > 0) {
					this.$store.commit('CHANGE_INSPECTIONTASKLIST', {
						inspectionTaskList: res.data
					})
				}
			})
		},
		//获取任务类型
		async getTaskType() {
			let params = { dictGroupID: 7010 }
			this.axios
				.getTaskTypeOrTaskSubType(params)
				.then(res => {
					this.taskType = res[0].dictDataList
				})
				.catch(err => {
					console.log(err)
				})
		},
		//获取任务子类型
		async getTaskSubType() {
			let params = { dictGroupID: 7011 }
			this.axios
				.getTaskTypeOrTaskSubType(params)
				.then(res => {
					console.log(res)
					this.taskSubType = res[0].dictDataList
				})
				.catch(err => {
					console.log(err)
				})
		},
		// getTaskStatus(){		//获取任务状态
		async getTaskStatus() {
			//获取任务状态
			let params = { dictGroupID: 7014 }
			this.axios
				.getTaskTypeOrTaskSubType(params)
				.then(res => {
					// this.taskSubType = res.data
					this.status = res[0].dictDataList
				})
				.catch(err => {
					console.log(err)
				})
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
		getTableDataArr() {
			//this.inspectionTaskListLoading = false
			this.inspectionFlag = true
			this.inspectionMark = false
		},
		taskNodesDataArr(arr) {
			this.addTaskNodesArr = arr
		},
		//选择任务类型
		handleChangeTaskType(val) {
			this.i_Type = val
		},
		//选择任务子类型
		handleChangeTaskSubType(val) {
			this.i_SubType = val
		},
		//选择状态
		handleChangeStatus(val) {
			this.i_Status = val
		},
		//点击新增按钮
		addTask() {
			this.addTaskModal = true
			this.$refs.taskOrder.getStaticTreeData()
		},
		//点击新增任务弹框的 巡检成票 按钮
		inspectionAticketClick(arr) {
			this.addTaskNodesArr = []
			this.addTaskModal = false
			this.addTaskNext = true
			/* let addInfos = {
				IsThread: true,
				Nodes: arr.join(',')
			} */
			let addInfos = {
				unitId: this.stationId,
				nodeIds: arr.join(',')
			}
			//this.inspectionTaskListLoading = true
			this.inspectionFlag = false
			this.inspectionMark = true
			this.$refs.inspectionTaskList.getTableDataAll(addInfos)
		},
		//新增任务 保存 按钮
		saveClick(name) {
			this.addTaskLoadingText = '正在生成任务...'
			this.inspectionTaskListLoading = true
			//临时功能
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

			this.addTaskNext = false
			this.addImgFlag = true
			setTimeout(() => {
				this.addImgFlag = false
			}, 30000)

			//过30秒自动关闭添加窗口
			// setTimeout(() => {
			// 	this.inspectionTaskListLoading = true
			// 	this.addTaskNext = false
			// 	this.addTaskLoadingText = '正在生成巡检任务单'
			// }, 30000)
		},
		//新增任务 上一步 按钮
		lastStepClick() {
			this.addTaskNext = false
			this.addTaskModal = true
		},
		//关闭新增任务 巡检成票 弹框
		closeAddTaskNext() {
			this.addTaskNext = false
		},
		closeAddTask() {
			this.addTaskModal = false
		},
		handleSelectionChange(val) {
			this.allTasks = val
		},
		async delOneTask(row) {
			this.$ocxModal.confirm({
				title: '确认',
				content: '<p>确认删除此任务</p>',
				onOk: () => {
					this.axios
						.delTask({
							ids: row.id
						})
						.then(res => {
							if (res.success == true) {
								this.$ocxModal.confirm({
									content: '<p>删除成功</p>'
								})
								this.getTaskList()
								this.getTaskAllList()
							}
						})
						.catch(err => {
							console.log(err)
						})
				}
			})
		},
		async delMoreTask() {
			if (this.allTasks.length == 0) {
				this.$ocxModal.confirm({
					title: '确认',
					content: '<p>请选择要批量删除的任务</p>'
				})
			} else {
				this.$ocxModal.confirm({
					title: '确认',
					content: '<p>确认删除</p>',
					onOk: () => {
						let arr = []
						this.allTasks.map(item => {
							arr.push(item.id)
						})
						this.axios
							.delTask({
								ids: arr.join(',')
							})
							.then(res => {
								if (res.success == true) {
									this.$ocxModal.confirm({
										content: '<p>删除成功</p>'
									})
									this.getTaskList()
									this.getTaskAllList()
								}
							})
							.catch(err => {
								console.log(err)
							})
					}
				})
			}
		},
		handleChangePage(page) {
			this.page = page
			this.taskLoading = true
			this.getTaskList()
		},
		handleChangeSize(pageSize) {
			this.pageSize = pageSize
			this.taskLoading = true
			this.getTaskList()
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
.taskManage {
  width: 1590px;
  height: 860px;
  overflow: hidden;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  user-select: none;

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
      margin-left: 20px;
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

    .addTaskBtn {
      background: url('../assets/img/record/export.png') no-repeat;
      background-size: 100% 100%;
      color: #bca062;
    }

    .addTaskBtn:hover, .exportbtn:active {
      background: url('../assets/img/record/export-hover.png') no-repeat;
      background-size: 100% 100%;
    }

    .delTaskBtn {
      width: 100px;
      color: #fff;
      background: url('../assets/img/taskManage/del.png') no-repeat;
      background-size: 100% 100%;
    }

    .delTaskBtn:hover, .delTaskBtn:active {
      background: url('../assets/img/taskManage/del-hover.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .list {
    height: 700px;
    width: 1510px;
    margin-left: 40px;

    /deep/.el-table {
      background: none;
      border-color: #054598;
      width: 1980px;
      overflow: auto;
	  //大屏
	  border: 2px solid #054598;

      /deep/tr {
        background: none;
      }
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

    /deep/.el-table__body tr.hover-row>td {
      background: none;
    }

    .del {
      cursor: pointer;
      display: inline-block;
      width: 80px;
      background: url('../assets/img/taskManage/del.png') no-repeat;
      background-size: 100% 100%;
      border: none;
    }

    .del:hover, .del:active {
      background: url('../assets/img/taskManage/del-hover.png') no-repeat;
      background-size: 100% 100%;
    }

    /deep/.el-table tbody tr:hover>td {
      background: rgba(35, 118, 220, 0.21);
    }

    /deep/.el-table__body tr.current-row>td {
      background: rgba(35, 118, 220, 0.21);
    }
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

      .ivu-select-dropdown {
        // background: #042234;
        background: transparent;
      }

      .ivu-select-item:hover {
        background: #123854;
      }

      .ivu-select-item-focus {
        background: #1f4f73;
      }

      /* 边框色 */
      .ivu-page-prev, .ivu-page-item, .ivu-page-next, .ivu-select-selection, .ivu-page-options-elevator input {
        border-color: #104095;
        border-width: 1px;
      }

      .ivu-page-prev:hover, .ivu-page-item:hover, .ivu-page-next:hover, .ivu-select-selection:hover, .ivu-page-options-elevator input:hover, .ivu-page-item-active {
        border-color: #2d8cf0 !important;
      }
    }
  }

	.addTaskLoading{
		position: absolute;
		top: 300px;
		left: 855px;
	}

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

/deep/.el-input__inner {
  height: 34px;
  color: #fff;
}

/deep/ .el-table {
  font-size: 16px;
  border-color: #104095;
}

/deep/.el-table--border {
  border-right: 1px solid #054598;
  border-bottom: 1px solid #054598;
}

/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

/deep/.el-table--border::after, /deep/.el-table--group::after, .el-table::before {
  background: none;
}

/deep/.el-table td, /deep/.el-table th.is-leaf {
  // border: none;
  border-color: #104095;
}

/deep/.el-table tbody tr:hover>td {
  background: none;
}

/deep/.el-loading-text {
  font-size: 20px;
}

/deep/.el-table tr, /deep/.el-table th {
  background: #0d2a68;
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

/deep/.ivu-modal {
  /deep/.ivu-modal-body {
    padding-top: 0 !important;
    border-radius: 0 0 10px 10px;
    background: #082051;
    padding: 0;
    border-radius: 0 0 10px 10px;
  }

  /deep/.ivu-modal-header {
    padding: 7px 0 7px 35px !important;
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

/deep/.el-table .cell {
  white-space: pre-line;
}

/deep/.el-checkbox__inner, /deep/.el-checkbox__input.is-disabled .el-checkbox__inner {
  width: 16px;
  height: 16px;
  background: none;
  border: 2px solid #409eff;
}

/deep/td, /deep/th.is-leaf {
  border-color: #054598;
  font-size: 14px;
  color: #fff;
}

/deep/.el-checkbox__inner::after {
  box-sizing: content-box;
  content: '';
  border: 0.1544rem solid yellow;
  border-left: 0;
  border-top: 0;
  height: 0.32111rem;
  left: 3px;
  position: absolute;
  top: 0;
  transform: rotate(45deg) scaleY(0);
  width: 0.14333rem;
  transition: transform 0.15s ease-in 0.05s;
  transform-origin: center;
}

/deep/.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: none;
}

/deep/.el-checkbox__input.is-checked .el-checkbox__inner, /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: none;
}

/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  content: '';
  position: absolute;
  display: block;
  background-color: #FFF;
  height: 2px;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 35px;
}

.taskListMark{
	width: 1430px;
	height: 780px;
	border-radius: 0;
	padding-top: 1px;
	background: #082053;

	img{
		margin: 350px 0 0  642px;
	}

}
</style>
