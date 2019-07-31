<template>
  <div class="report">
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
      <el-button type="primary" class="btn" @click="getList">查询</el-button>
      <el-button type="primary" class="btn" @click="exportList">导出</el-button>
    </div>
    <!-- 任务表 -->
    <div class="list">
      <el-table
        :data="inspectionRecordList"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        style="width: 100%"
      >
        <el-table-column label="计划" align="center" width="250">
          <template slot-scope="scope">{{ scope.row.planName }}</template>
        </el-table-column>
        <el-table-column label="任务" align="center" width="250">
          <template slot-scope="scope">{{ scope.row.taskName }}</template>
        </el-table-column>
        <el-table-column align="center" label="任务类型" width="140">
          <template slot-scope="scope">{{ scope.row.taskType }}</template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="140">
          <template slot-scope="scope">{{ scope.row.iStatusName }}</template>
        </el-table-column>
        <el-table-column align="center" label="启动原因" width="140">
          <template slot-scope="scope">{{ scope.row.iStartReason }}</template>
        </el-table-column>
        <el-table-column align="center" label="结束原因" width="140">
          <template slot-scope="scope">{{ scope.row.iStopReason }}</template>
        </el-table-column>
        <el-table-column align="center" label="启动时间" width="210">
          <template slot-scope="scope">{{ scope.row.iStartTime }}</template>
        </el-table-column>
        <el-table-column align="center" label="结束时间" width="210">
          <template slot-scope="scope">{{ scope.row.iStopTime }}</template>
        </el-table-column>
        <el-table-column align="center" label="报警条数" width="120">
          <template slot-scope="scope">{{ scope.row.alarmNum }}</template>
        </el-table-column>
        <el-table-column align="center" label="操作人" width="150">
          <template slot-scope="scope">{{ scope.row.userId }}</template>
        </el-table-column>
        <el-table-column prop align="center" label="操作">
          <template slot-scope="scope">
            <span
              class="operation detail"
              @click="goDetail(scope.row.recordId,scope.row.unitId,scope.row.taskId)"
            >详细</span>
            <span style="margin: 0 5px;">|</span>
            <span class="operation export">导出</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="page-wrap">
      <Page
        @on-change="handleChangePage"
        @on-page-size-change="handleChangeSize"
        :total="100"
        :current=currentPage
        :page-size=pageSize
        show-sizer
        show-elevator
      />
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'report',
  components: {},
  props: {},
  data() {
    return {
      axios: this.$_api.recordData,
      inspectionRecordList: [], //任务记录列表
      timeOptions: [
        {
          value: '0',
          label: '今天'
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
          value: '70140001',
          label: '空闲'
        },
        {
          value: '70140002',
          label: '正常运行'
        },
        {
          value: '70140003',
          label: '异常停止'
        }
      ],
      alarmOptions: [
        {
          value: '1',
          label: '报警'
        },
        {
          value: '0',
          label: '无报警'
        }
      ],
      value: '今天',
      value2: '',
      value3: '',
      unitId: '', //变电站id
      iIsAlarm: '', //是否报警
      iStatus: '', //任务状态
      dateId: '', //时间
      pageSize: 10,//每页显示条数
      currentPage: 1,//当前页码
      total: ''
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {
    this.unitId = this.$route.params.stationId
    // console.log(this.$route)
  },
  mounted() {
    this.getList()
  },
  activited() { },
  update() { },
  beforeDestory() { },
  methods: {
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
        return 'background:#161c38;color: #3299ff;font-weight: 500;'
      }
    },
    //获取记录列表
    getList() {
      var ctx = this
      ctx.axios
        .getRecordList({
          // unitId: '666',
          // iIsAlarm: ctx.iIsAlarm,
          // iStatus: ctx.iStatus,
          // dateId: ctx.dateId
          "unitId":"42389edde72d41f4bcd978b574eefbae","iIsAlarm":"","iStatus":"","dateId":"50",
					currentPage: ctx.currentPage,
					pageSize: ctx.pageSize	
        })
        .then(res => {
          if (res.code == 200) {
            let data = res.data.data.lists
            for (let i = 0, len = data.length; i < len; i++) {
              data[i].iStartTime = moment(data[i].iStartTime * 1000).format('YYYY-MM-DD hh:mm:ss')
              data[i].iStopTime = moment(data[i].iStopTime * 1000).format('YYYY-MM-DD hh:mm:ss')
            }
            this.inspectionRecordList = res.data.data.lists
            // console.log(this.inspectionRecordList, 'aa')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //详情
    goDetail(recordId, unitId, taskId) {
      this.$router.push({
        name: 'detail',
        params: {
          recordId,
          unitId,
          taskId
        }
      })
    },
    //导出
    exportList() {
      var ctx = this
      window.location.href = 'http://172.26.1.82:8080/dsa5200/report/export?unitId='
        + '42389edde72d41f4bcd978b574eefbae'
        + '&iIsAlarm='
        + ctx.iIsAlarm
        + '&iStatus='
        + ctx.iStatus
        + '&dateId='
        + 40
      //'http://172.26.1.82:8080/dsa5200/report/export?unitId=42389edde72d41f4bcd978b574eefbae&iIsAlarm=&iStatus=&dateId=40'
    },
    handleChangePage(page) {
      console.log(page,'page')
      this.currentPage = page
      this.getList()
    },
    handleChangeSize(size) {
      console.log(size,'size')
      this.pageSize = size
      this.getList()
		
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
<style lang="stylus" scoped>
.report {
  width: 1920px;
  height: 1080px;
  background: url('~@/assets/img/navigation/background.png') no-repeat;
  background-size: 100% 1080px;

  .search-bar {
    height: 50px;

    .search {
      display: inline-block;
      height: 40px;
      color: #90d9ff;
      margin: 5px 0 0 30px;

      .ipt {
        width: 240px;
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
    }
  }

  .list {
    height: 750px;
    overflow: auto;
    .el-table {
      background: none;

      /deep/tr {
        background: none;
      }
    }

    .operation {
      display: inline-block;
      cursor: pointer;
      color: #3299ff;
    }
  }
  /deep/.page-wrap {
			margin-top: 10px;
			display: flex;
			justify-content: center;

			.ivu-page {
				.ivu-page-total,
	.ivu-page-prev a,
    .ivu-page-item a,
    .ivu-page-next a, 
    .ivu-page-item-jump-next::after,
    .ivu-page-item-jump-prev::after,
    .ivu-select-item,
    .ivu-page-options-elevator,
    .ivu-page-options-elevator input {
    	color: #73a6c3;
    }
    .ivu-page-disabled a {
	    color: #444;
	}
    .ivu-page-item-active a,
    .ivu-select-selected-value {
        color: #47b2fe !important;
    }
    
    /* 背景色 */
 	.ivu-page-prev, 
 	.ivu-page-item, 
 	.ivu-page-next, 
 	.ivu-select-selection,
 	.ivu-page-options-elevator input {
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
	.ivu-page-prev
	.ivu-page-item,
	.ivu-page-next,
	.ivu-select-selection,
	.ivu-page-options-elevator input {
		border-color: #0f3047;
	}
	.ivu-page-prev:hover,
	.ivu-page-item:hover,
	.ivu-page-next:hover,
	.ivu-select-selection:hover
	.ivu-page-options-elevator input:hover,
	.ivu-page-item-active {
	    border-color: #2d8cf0 !important;
	}
			}
		}

  .txt {
    width: 300px;
  }
}

label {
  color: #79af9f;
  font-size: 16px;
}

/deep/.el-select .el-input__inner {
  height: 34px;
}

/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

/deep/.el-table td, /deep/.el-table th.is-leaf {
  border: none;
}

/deep/.el-table tbody tr:hover>td {
  background: none;
}
</style>
