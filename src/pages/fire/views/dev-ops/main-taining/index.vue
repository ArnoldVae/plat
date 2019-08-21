<template>
	<div class="mian-taining">
		<el-form :inline="true" size="mini" :model="search">
			<el-form-item label="开始日期:" style="margin-right:25px">
				<el-date-picker
					v-model="search.starTime"
					@change="opoentime"
					value-format="timestamp"
					type="date"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="结束日期:"  style="margin-right:25px">
				<el-date-picker
					v-model="search.endTime"
					@change="opoentime"
					value-format="timestamp"
					type="date"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="时间段:"  style="margin-right:25px">
				<el-select v-model="search.timeQuantum" @change="opoentimeB" placeholder>
					<el-option label="自定义" :value="nullValue"></el-option>
					<el-option label="三天内" value="threeDay"></el-option>
					<el-option label="本周" value="week"></el-option>
					<el-option label="本月" value="month"></el-option>
					<el-option label="本年" value="year"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="维保单位:"  style="margin-right:25px">
				<el-select v-model="search.maintenanceUnit" placeholder>
					<el-option label="全部" value="nullValue"></el-option>
					<el-option
						v-for="item in maintenanceUnits"
						:key="item.mtcCoId"
						:label="item.vcFileFullName"
						:value="item.mtcCoId"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="状态:" class="item-zt">
				<el-checkbox-group v-model="search.stute">
					<el-checkbox v-for="i in stutes" :key="i.id" :label="i.id">{{ i.name }}</el-checkbox>
					<!-- <el-checkbox label="1">正在执行</el-checkbox>
					<el-checkbox label="2">已结束</el-checkbox>-->
				</el-checkbox-group>
			</el-form-item>

			<!-- <el-button class="blue-btn" style=" line-height: 21PX;" @click="searchInfo" type="text">查&nbsp找</el-button> -->
			<el-form-item class="taining-button">
				<el-button class="blue-btn" v-if="searchIS" @click="searchInfo" type="text">查找</el-button>
				<el-button class="blue-btn" v-if="!searchIS" @click="searchInfos" type="text">查找</el-button>
				<el-button class="yellow-btn" @click="leadTo" type="text">导入</el-button>
				<el-button class="yellow-btn" @click="exportInfo" type="text">导出</el-button>
			</el-form-item>
		</el-form>
		<!-- table -->
		<div class="table">
			<el-table
				:header-cell-style="{ background: '#0d2351' }"
				:row-style="tableColor"
				:data="maintainData"
				style="width: 100%;"
				height="630"
			>
				<el-table-column prop="coName" align="center" label="维保单位" width='100'></el-table-column>
				<el-table-column prop="unitName" align="center" label="变电站" width='130'></el-table-column>
				<el-table-column prop="context" align="center" label="维护内容"  width='200' show-overflow-tooltip ></el-table-column>
				<el-table-column prop="beginTime" align="center" label="计划开始时间" width='130'></el-table-column>
				<el-table-column prop="endTime" align="center" label="计划结束时间" width='130'></el-table-column>
				<el-table-column prop="vc_PowerOffScene" align="center" label="停电场所" width='100'></el-table-column>
				<el-table-column prop="vc_PowerLevel" align="center" label="电压等级" width='100' ></el-table-column>
				<el-table-column prop="presetName" align="center" label="负责人" width='100'></el-table-column>
				<el-table-column prop="telePhone" align="center" label="联系电话" width='120'></el-table-column>
				<el-table-column prop="presetName" align="center" label="负责人" width='100'></el-table-column>
				<el-table-column prop="status" align="center" label="当前状态"  width='150'>
					<!-- <template slot-scope="scope">
						<span v-if="scope.row.status=='未执行'" style="color:red;">{{scope.row.status}}</span>
						<span v-if="scope.row.status=='正在执行'" style="color:green;">{{scope.row.status}}</span>
						<span v-if="scope.row.status=='已结束'" style="color:blue;">{{scope.row.status}}</span>
					</template>-->
				</el-table-column>
				<el-table-column label="执行" align="center" width="130">
					<template slot-scope="scope">
						<div>
							<el-button class="blue-btn" @click="infoModals(scope.row)" size="mini" type="text"
								>查看详情</el-button
							>
							<!-- <el-button class="yellow-btn" @click="searchInfo" size="mini" type="text">导出</el-button> -->
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		 <div class="pagination">
      <el-pagination
        ref="pages"
        background
        layout="total,  prev, pager, next,sizes, jumper"
        :current-page="curIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
				@size-change="handleSizeChange"
        :total="totals"
        @current-change="changePage"
      ></el-pagination>
    </div>
		<infoModal :dialogVisible="modalShow" :delitail="detileData" @handleClose="handleClose"></infoModal>
	</div>
</template>
<script>
import infoModal from '../dialog'
export default {
	name: 'mian-taining',
	components: { infoModal },
	data() {
		return {
			nullValue: null,
			search: {
				starTime: '',
				endTime: '',
				user: '',
				timeQuantum: '',
				maintenanceUnit: '',
				stute: []
			},
			searchb: {
				starTime: '',
				endTime: ''
			},

			stutes: [{ id: 0, name: '未执行' }, { id: 1, name: '正在执行' }, { id: 2, name: '已结束' }],
			maintenanceUnits: [],
			maintainData: [],
			modalShow: false,
			detileData: '',
			searchIS: false,
			// 分页相关数据
			curIndex: 1,
			pageSize: 10,
			totals: 3
		}
	},
	mounted() {},

	created() {
		this.init()
		this.searchInfo()
	},

	watch: {
		'search.timeQuantum'(val) {
			switch (val) {
				case 'week':
					// const endw =this.getThisWeek(new Date())[this.getThisWeek(new Date()).length-1].getTime()
					const endw = new Date()
					const startw = this.getThisWeek(new Date())[0].getTime()
					// startw.setTime(startw.getTime() - 3600 * 1000 * 24 * 7)
					this.search.starTime = Date.parse(new Date(startw))
					this.search.endTime = endw.getTime()

					this.searchb.starTime =
						Date.parse(new Date(startw))
							.toString()
							.substring(0, 10) * 1
					this.searchb.endTime =
						endw
							.getTime()
							.toString()
							.substring(0, 10) * 1
					break
				case 'month':
					const dayNo = 1 - new Date().getDate()
					const endm = new Date()
					const startm = this.getTargetDate(0, 0, dayNo).getTime()
					this.search.starTime = Date.parse(new Date(startm))
					this.search.endTime = endm
					this.searchb.starTime =
						Date.parse(new Date(startm))
							.toString()
							.substring(0, 10) * 1
					this.searchb.endTime =
						endm
							.getTime()
							.toString()
							.substring(0, 10) * 1
					break
				case 'year':
					const endy = new Date(),
						nowDay = 1 - new Date().getDate(),
						nowMonth = 0 - new Date().getMonth()
					const starty = this.getTargetDate(0, nowMonth, nowDay)
					this.search.starTime = Date.parse(new Date(starty))
					this.search.endTime = endy
					this.searchb.starTime =
						Date.parse(new Date(starty))
							.toString()
							.substring(0, 10) * 1
					this.searchb.endTime =
						endy
							.getTime()
							.toString()
							.substring(0, 10) * 1
					break
				case 'threeDay':
					const endy1 = new Date()
					const starty1 = this.getTargetDate(0, 0, -2)

					this.search.starTime = Date.parse(new Date(starty1))
					this.search.endTime = endy1

					this.searchb.starTime =
						Date.parse(new Date(starty1))
							.toString()
							.substring(0, 10) * 1
					this.searchb.endTime =
						endy1
							.getTime()
							.toString()
							.substring(0, 10) * 1
					break
				case null:
					this.search.starTime = ''
					this.search.endTime = ''
					break
				default:
					break
			}
		}
	},
	methods: {
		async init() {
			let result = await this.$_api.maintaining.getMaintenance()
			if (result.success) {
				this.maintenanceUnits = result.data
			} else {
				// this.maintainData = []
			}
		},
		//分页
		changePage(curIndex) {
			console.log(curIndex)
		},
		opoentime() {
			this.searchIS = true
		},
		opoentimeB() {
			this.searchIS = false
		},
		async searchInfo() {
			let res = await this.$_api.maintaining.getfindPlanRecord({
				startTime: this.search.starTime,
				endTime: this.search.endTime,
				mtcCoID: this.search.maintenanceUnit,
				iStatus: this.search.stute,
				pageSize:this.pageSize,
				currentPage:this.curIndex
			})
			if (res.code == '200') {
				this.totals=res.data.total
				this.maintainData = res.data.list
			} else {
				this.maintainData = []
			}
		},
	//分页
		changePage(curIndex) {
			this.curIndex=curIndex;
			this.searchInfo()
		},
		handleSizeChange(pagesize){
			this.pageSize=pagesize
			this.searchInfo()
		},
		// async searchInfos() {
		// 	let res = await this.$_api.maintaining.getfindPlanRecord({
		// 		startTime: this.searchb.starTime,
		// 		endTime: this.searchb.endTime,
		// 		mtcCoID: this.search.maintenanceUnit,
		// 		iStatus: this.search.stute,
				
		// 	})
		// 	if (res.code == '200') {
		// 		this.maintainData = res.data.list
		// 	} else {
		// 		this.maintainData = []
		// 	}
		// },
		leadTo() {},
		exportInfo() {},
		getThisWeek(currentTime) {
			var currentDate = new Date(currentTime)
			var timesStamp = currentDate.getTime()
			var currenDay = currentDate.getDay()
			var dates = []
			for (var i = 0; i < 7; i++) {
				dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - ((currenDay + 6) % 7))))
				// dates.push(new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(/\//g, '-'));
			}
			return dates
		},
		getTargetDate(oF, oM, oD) {
			let _date = new Date()
			_date.setFullYear(_date.getFullYear() + oF)
			_date.setMonth(_date.getMonth() + oM)
			_date.setDate(_date.getDate() + oD)
			return _date
		},
		tableColor({ row, column, rowIndex, columnIndex }) {
			let index = rowIndex
			if (index % 2 != 0) {
				return 'background-color: transparent;'
			} else {
				return 'background-color: transparent;'
			}
		},
		infoModals(row) {
			this.detileData = row.mtcPlanId
			this.modalShow = true
		},
		handleClose() {
			this.modalShow = false
		}
	}
}
</script>

<style lang="stylus">
@import './input.css';

.mian-taining {
  // padding: 1.66667rem;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: 0 50px;
  // background-color: #141a26;
  overflow: hidden;

  /deep/.el-form--inline {
    margin-top: 20px;
    // margin-left 50px;
  }

  /deep/.el-popper[x-placement^=bottom] {
    margin-top: 0.53333rem;
    background: #1A587F !important;
    border: none !important;
    color: wheat;
  }

  /deep/.el-date-picker {
    background: #1A587F !important;
  }

  /deep/.el-picker-panel, el-date-picker, el-popper {
    background: #1A587F !important;
  }

  .el-form--inline {
    /deep/.el-form-item__label {
      color: #90d9ff;
      font-size: 18px;
    }

    .el-input {
      width: 170px;
      /deep/.el-input__inner {
        border: 1px solid #0d7ec5!important;
		  background:#07225e;
      }
    }

    .el-select {
      /deep/.el-input__inner {
        border: 1PX solid #0c4e75;
      }
    }
  }

  .el-input__prefix {
  right: 0;
	text-align :right;
  // transition: all 0.3s;
  }
  .el-checkbox__label {
    color: #ffffff;
    font-size: 36PX;
  }

  /deep/.el-checkbox__inner {
    background: transparent;
    border: 1PX solid #0c4e75;
  }

  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }
	.el-table td, .el-table th.is-leaf{
		 border-bottom:none;
	 }
  el-table th, .el-table tr {
    background-color: transparent;
    font-size: 15px;
  }
	.el-table th div{
		font-size 18px;
		color #3094f7;
		font-weight 30;
		
	}
	.has-gutter{
		background transparent;
		background:url("../../../assets/img/tainingTitle.png")
	}
	/*.has-gutter tr{*/
		/*background:transparent*/
		/*background :url("../../../assets/i")*/
	//}
	.table{
		height:650px;
	}
	// 分页样式的修改
  .pagination {
    text-align: center;
    margin-top: 20px;

    .el-pagination {
      .el-pagination__total {
        color: #73a6c3;
      }

      .btn-prev, .btn-next {
        border: 1px solid #0f3047;
        background-color: transparent;
        color: #444;
      }

      .el-pagination__jump {
        color: #73a6c3;
      }
			/deep/ .el-pager li{
			color: #2d8cf0 !important;
			background:transparent;
		}
      .el-input__inner {
        background: transparent;
      }

      .el-select:hover .el-input__inner {
        border: 1px solid #2d8cf0;
      }

      .table-wrap .page-wrap .ivu-page .ivu-select-dropdown {
        background: transparent;
      }
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: transparent;
      border: 1px solid #2d8cf0;
      color: #2d8cf0;
      cursor: pointer;
    }
  }
  .el-table__row {
    color: white;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #081437 !important;
		cursor pointer
  }

  .el-table__row>td {
    border: none;
  }

  .el-table::before { // 去掉最下面的那一条线
    height: 0;
  }

  .el-table {
    /deep/.has-gutter {
      height: 0;
      // color: #1589F2;
      color: #fff;
      background-color: #0a3449;
      border-bottom: 0;
    }
  }

  .blue-btn {
	  color:#FFFFFF;
    width: 100px;
   font-size:18px;
   	background: url('~@fire/assets/img/seach_blue.png') no-repeat;
    background-size: 100% 100%;
  }

  .yellow-btn {
    width: 100px;
    color: #F6CE69;
   font-size:18px;
		background: url('~@fire/assets/img/seach_yellow.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 20px;
  }

  .item-zt {
    // width: 790px;
    // padding-left: 30PX;
		.el-checkbox__label{
			font-size:16px;
			color:#90d9ff;
		}
  }

  .taining-button {
    float: right;
		margin-right:40px;
  }
}

/deep/.el-picker-panel {
  background-color: #1A587F !important;
}

/deep/.el-table__body-wrapper {
  margin-top: -20px;
}
</style>
