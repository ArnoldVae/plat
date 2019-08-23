<template>
	<div class="taskManage">
		<div class="search-bar">
			<div class="search">
        <label for="">任务名称：</label>
        <el-input class="ipt" v-model="taskName" placeholder=""/>
			</div>
      <div class="search">
				<label for>任务类型：</label>
				<el-select class="ipt" v-model="value" placeholder="请选择" @change="handleChangeTaskType">
					<el-option v-for="item in taskType" :key="item.key" :label="item.value" :value="item.key"></el-option>
				</el-select>
			</div>
			<div class="search">
				<label for>任务子类型：</label>
				<el-select class="ipt" v-model="value2" placeholder="请选择" @change="handleChangeTaskSubType">
					<el-option v-for="item in taskSubType" :key="item.key" :label="item.value" :value="item.key"></el-option>
				</el-select>
			</div>
			<div class="search">
				<label for>状态：</label>
				<el-select class="ipt" v-model="value3" placeholder="请选择" @change="handleChangeStatus">
					<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<el-button type="primary" class="btn searchbtn" @click="getTaskList">查询</el-button>
			<el-button type="primary" class="btn addTaskBtn" @click="addTask">新增</el-button>
		</div>
		<div class="list">
			<el-table
				:data="taskList"
				:row-style="tableRowStyle"
				:header-cell-style="tableHeaderColor"
				style="width: 100%"
			>
				<el-table-column label="任务名称" align="center" width="500">
					<template slot-scope="scope">{{ scope.row.vc_Name }}</template>
				</el-table-column>
				<el-table-column label="任务类型" align="center">
					<template slot-scope="scope">{{ scope.row.str_Type }}</template>
				</el-table-column>
				<el-table-column align="center" label="任务子类型">
					<template slot-scope="scope">{{ scope.row.str_SubType }}</template>
				</el-table-column>
				<el-table-column align="center" label="状态">
					<template slot-scope="scope">{{scope.row.statusName}}</template>
				</el-table-column>
				<el-table-column align="center" label="最后执行时间">
					<template slot-scope="scope">{{ scope.row.updateTime }}</template>
				</el-table-column>
				<!-- <el-table-column align="center" label="机器人名称">
					<template slot-scope="scope">{{ scope.row.r_vc_Name }}</template>
				</el-table-column> -->
				<!-- <el-table-column prop align="center" label="操作">
					<template slot-scope="scope">
						<span
							class="operation detail"
							@click="goDetail(scope.row.recordId, scope.row.unitId, scope.row.taskId)"
						>详细</span>
						<span class="operation export" @click="exportRow(scope.row)">导出</span>
					</template>
				</el-table-column>-->
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
			:width="1485"
			footer-hide
			@on-cancel="closeAddTask"
			:styles="{top: '100px'}"
		>
			<taskOrder ref='taskOrder' @closeAddTask="closeAddTask" @inspectionAticketClick="inspectionAticketClick"></taskOrder>
		</ocx-modal>
		<ocx-modal
			v-model="addTaskNext"
			:width="1000"
			:mask-closable="false"
			footer-hide
			@on-cancel="closeAddTaskNext"
		>
			<inspectionTaskList
				:modalInspectionTaskTableData="modalInspectionTaskTableData"
				:modalWorkOrderTableHeaderData="modalWorkOrderTableHeaderData"
				v-loading="inspectionTaskListLoading"
				element-loading-text="巡检资源加载中..."
				element-loading-background="#061638"
				@closeAddTaskNext="closeAddTaskNext"
				@saveClick="saveClick"
				@lastStepClick="lastStepClick"
			></inspectionTaskList>
		</ocx-modal>
	</div>
</template>
<script>
import moment from 'moment'
import taskOrder from '../common/task-order'
import inspectionTaskList from '../common/inspectionTaskList.vue'
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
      value: '',
      value2: '',
      value3: '',
      taskList: [],
      page: 1,
      pageSize: 10,
      total: 0,
      taskType: [],
      taskSubType: [],
      status: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '停止'
        }, {
          value: '1',
          label: '正在执行'
        }, {
          value: '2',
          label: '暂停'
        }
      ],
      i_Type: '',//任务类型
      i_SubType: '',//任务子类型
      i_Status: '',//状态
      addTaskModal: false,
      addTaskNext: false,
      inspectionTaskListLoading: false,
      modalInspectionTaskTableData: [],
      modalWorkOrderTableHeaderData: [],
      taskName: '',
      topicArr: ['qif/xj/app/control/','qif/xj/app/data/'],
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
    let temp = [];
    this.topicArr.forEach(item=>{
      temp.push(item+this.stationId);
    })
    this.topicArr = temp;
  },
  mounted() { },
  activited() { },
  update() { },
  beforeDestory() { },
  methods: {
    //获取任务列表
    getTaskList() {
      let params = `UnitID=${this.$store.getters.stationId}&Page=${this.page}&Rows=${this.pageSize}&i_Type=${this.i_Type}&i_SubType=${this.i_SubType}&i_Status=${this.i_Status}&vc_Name=${this.taskName}`
      this.axios.getTaskList(params).then((res) => {
        if (res.success) {
          res.data.rows.map((item) => {
            if (item.i_UpdateTime) {
              item.updateTime = moment(item.i_UpdateTime * 1000).format('YYYY-MM-DD hh:mm:ss')
            }
          })
          this.taskList = res.data.rows
          this.total = res.data.total
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    //获取任务类型
    getTaskType() {
      let params = `dictgroupid=7010&isneednull=true`
      this.axios.getTaskTypeOrTaskSubType(params).then((res) => {
        this.taskType = res.data
      }).catch((err) => {
        console.log(err);
      });
    },
    //获取任务子类型
    getTaskSubType() {
      let params = `dictgroupid=7011&isneednull=true`
      this.axios.getTaskTypeOrTaskSubType(params).then((res) => {
        this.taskSubType = res.data
      }).catch((err) => {
        console.log(err);
      });
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
      this.addTaskNodesArr = arr
      this.addTask = false
      this.addTaskNext = true
      //let addInfos = `Nodes=016cf78433f745c99fc38db402afd037,03721088658244ad88715a73707243a9`
      let addInfos = {
        Nodes: arr.join(',')
      }
      this.inspectionTaskListLoading = true
      this.axios.getInspectionWorkOrderData(addInfos).then(response => {
        this.inspectionTaskListLoading = false
        this.modalWorkOrderTableHeaderData = response.data.data.asRobots
        this.modalInspectionTaskTableData = response.data.data.asTaskNodes
      })

    },
    //新增任务 保存 按钮
    saveClick(name) {
      this.addTaskNext = false
      this.getTaskList()
      //临时功能
      let obj = {
        "cmd": "2202",
        "type": "req",
        "srcid": "",
        "destid": "",
        "serial": "",
        "time": "",
        "task": {
          "unitid": this.stationId,
          "name": name,
          "tasktype": "70100004",
          "tasksubtype": "70110008",
          "executetype": "70120100",
          "executetime": "0000",
          "startdate": "0000",
          "stopdate": "0000",
          "userid": "",
          "tasknode": []
        }
      }
      obj.time = (new Date()).valueOf()
      this.addTaskNodesArr.forEach(item => {
        obj.task.tasknode.push({
          "nodeid": item,
          "sortid": "0"
        })
      })
      this.$_mqtt.publish(this.topicArr[0], JSON.stringify(obj))
    },
    //新增任务 上一步 按钮
    lastStepClick() {
      this.addTaskNext = false
      this.addTask = true
    },
    //关闭新增任务 巡检成票 弹框
    closeAddTaskNext() {
      this.addTaskNext = false
    },
    closeAddTask() {
      this.addTaskModal = false
    },
    handleChangePage(page) {
      this.page = page
      this.getTaskList()
    },
    handleChangeSize(pageSize) {
      this.pageSize = pageSize
      this.getTaskList()
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #fff;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:rgba(35,40,66,.2);color: #3299ff;font-weight: 500;'
      }
    },
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
<style lang='stylus' scoped>
.taskManage {
  width: 1590px;
  height: 860px;
  overflow: hidden;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;

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
      background: url('../../assets/img/record/detail.png') no-repeat;
      background-size: 100% 100%;
      color: #fff;
    }

    .searchbtn:hover, .searchbtn:active {
      background: url('../../assets/img/record/detail-hover.png') no-repeat;
      background-size: 100% 100%;
    }

    .addTaskBtn {
      background: url('../../assets/img/record/export.png') no-repeat;
      background-size: 100% 100%;
      color: #bca062;
    }

    .addTaskBtn:hover, .exportbtn:active {
      background: url('../../assets/img/record/export-hover.png') no-repeat;
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

      /deep/tr {
        background: none;
      }
    }

    .operation {
      display: inline-block;
      cursor: pointer;
      color: #3299ff;
      width: 80px;
      height: 1.4rem;
      line-height: 1.4rem;
    }
  }

  /deep/.page-wrap {
    margin-top: 10px;
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
        border-color: #0f3047;
      }

      .ivu-page-prev:hover, .ivu-page-item:hover, .ivu-page-next:hover, .ivu-select-selection:hover, .ivu-page-options-elevator input:hover, .ivu-page-item-active {
        border-color: #2d8cf0 !important;
      }
    }
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

/deep/.el-select .el-input__inner {
  height: 34px;
  color: #fff;
}

/deep/ .el-table {
  font-size: 16px;
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
  border: none;
}

/deep/.el-table tbody tr:hover>td {
  background: #081437;
}

/deep/.el-loading-text {
	font-size: 20px;
	}

/deep/.el-table tr,/deep/.el-table th{
  background: #0d2a68;
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
</style>