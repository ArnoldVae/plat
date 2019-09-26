<template>
	<div class="mian-taining">
		<el-form :inline="true" size="mini" :model="search">
			<el-form-item label="开始日期:">
				<el-date-picker
					v-model="search.starTime"
					@change="opoentime"
					value-format="timestamp"
					placeholder="请输入开始日期"
					type="date"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="结束日期:">
				<el-date-picker
					v-model="search.endTime"
					@change="opoentime"
					value-format="timestamp"
					placeholder="请输入结束日期"
					type="date"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="时间段:">
				<el-select v-model="search.timeQuantum" @change="opoentimeB" placeholder='请输入时间段'>
					<el-option label="自定义" :value="nullValue"></el-option>
					<el-option label="三天内" value="threeDay"></el-option>
					<el-option label="本周" value="week"></el-option>
					<el-option label="本月" value="month"></el-option>
					<el-option label="本年" value="year"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="维保单位:">
				<el-select v-model="search.maintenanceUnit" placeholder="请输入维保单位">
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
					<el-checkbox v-for="i in stutes" :key="i.id" :label="i.id">{{i.name}}</el-checkbox>
					<!-- <el-checkbox label="1">正在执行</el-checkbox>
					<el-checkbox label="2">已结束</el-checkbox>-->
				</el-checkbox-group>
			</el-form-item>

			<!-- <el-button class="blue-btn" style=" line-height: 21PX;" @click="searchInfo" type="text">查&nbsp找</el-button> -->
			<el-form-item class="taining-button">
				<el-button class="blue-btn" @click="dosearch" type="text">查&nbsp找</el-button>
				<!-- <el-button class="blue-btn" v-if="!searchIS" @click="searchInfos" type="text">查&nbsp找</el-button>
				<el-button class="yellow-btn" @click="leadTo" type="text">导&nbsp入</el-button>
				<el-button class="yellow-btn" @click="exportInfo" type="text">导&nbsp出</el-button> -->
			</el-form-item>
		</el-form>
		<!-- table -->
		<div>
			<el-table
				:header-cell-style="{background:'none'}"
				:row-style="tableColor"
				:data="maintainData"
				style="width: 100%;"
			>
			<el-table-column prop="coName" align="center" label="维保单位" width='200'></el-table-column>
				<el-table-column prop="unitName" align="center" label="变电站" width="300"></el-table-column>
				<el-table-column prop="context" align="center" label="维护内容" width="860"></el-table-column>
				<el-table-column prop="beginTime" align="center" label="计划开始时间" width="264"></el-table-column>
				<el-table-column prop="endTime" align="center" label="计划结束时间" width="264"></el-table-column>
				<el-table-column prop="vc_PowerOffScene" align="center" label="停电场所" width="190"></el-table-column>
				<el-table-column prop="vc_PowerLevel" align="center" label="电压等级" width="190"></el-table-column>
				<el-table-column prop="presetName" align="center" label="负责人" width="170"></el-table-column>
				<el-table-column prop="telePhone" align="center" label="联系电话" width="275"></el-table-column>
				<el-table-column prop="status" align="center" label="当前状态" width="200">
					<!-- <template slot-scope="scope">
						<span v-if="scope.row.status=='未执行'" style="color:red;">{{scope.row.status}}</span>
						<span v-if="scope.row.status=='正在执行'" style="color:green;">{{scope.row.status}}</span>
						<span v-if="scope.row.status=='已结束'" style="color:blue;">{{scope.row.status}}</span>
					</template>-->
				</el-table-column>
				<el-table-column label="操作" align="center" width="350">
					<template slot-scope="scope">
						<div>
							<!-- <el-button class="blue-btn" v-show="scope.row.status !='未执行'" @click="infoModals(scope.row)" size="mini" type="text">详情</el-button> -->
							<el-button class="blue-btn" @click="recordModals(scope.row)" size="mini" type="text">记录</el-button>
							<!-- <el-button class="yellow-btn" @click="searchInfo" size="mini" type="text">导出</el-button> -->
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination" style="left:45%;bottom:1%">
			<el-pagination
			    ref="pages"
				background
				:page-size="pageSize"
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				@prev-click="searchInfo('page')"
				@next-click="searchInfo('page')"
				:total="pageTotal"
			></el-pagination>
		</div>
		<infoModal :dialogVisible="modalShow" :delitail="detileData" @handleClose="handleClose"></infoModal>

		<ocx-modal
		center
			title="维保记录详情"
			v-model="recordShow"
			:width="1307"
			:mask-closable="false"
			footer-hide
			:styles="{top: '500px','text-align':'center','color': '#303133'}"
		>

		<iframe
			fullscreen
			class="iframeCal"
			:src="fileDate"
			height="98%"
			width="96%"
			style="position: relative;"
		></iframe>
		</ocx-modal>
	</div>
</template>
<script>
import infoModal from '../dialog'
export default {
	name: 'mian-taining',
	components: { infoModal },
	data() {
		return {
			pageTotal: 0,
			pageSize: 10,
			currentPage: 1,
			pagenation: {},
			fileDate: '',
			recordShow: false,
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
			starTim:'',
			endTim:''
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
					const endm = new Date().getTime()
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
					const endy = new Date().getTime(),
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
					const endy1 = new Date().getTime()
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
		handleCurrentChange(val) {
			// console.log(val)
			this.currentPage = val
			this.searchInfo('index')
		},
		async init() {
			let result = await this.$_api.maintaining.getMaintenance()
			if (result.success) {
				this.maintenanceUnits = result.data
			} else {
				// this.maintainData = []
			}
		},

		opoentime() {
			this.searchIS = true
		},
		opoentimeB() {
			this.searchIS = false
		},
		dosearch(){
			this.starTim=parseInt(this.search.starTime/1000)==0 ? '' : parseInt(this.search.starTime/1000)
			this.endTim=parseInt(this.search.endTime/1000)==0 ? '': parseInt(this.search.endTime/1000)
			this.searchInfo()
		},
		async searchInfo(target) {
			if (!target) this.currentPage = 1
			let res = await this.$_api.maintaining.getfindPlanRecord({
				startTime: this.starTim,
				endTime: this.endTim,
				mtcCoID: this.search.maintenanceUnit,
				iStatus: this.search.stute,
				pageSize: 10,
				currentPage: this.currentPage
				// unitId:'8177a787a28b4f86a103fac9a023db05'
			})
			if (res.code == '200') {
				this.pageTotal = res.data.total
				this.pageSize = res.data.pageSize
				this.currentPage = res.data.nextPage
				this.pagenation = res.data	
				this.maintainData = res.data.list
			} else {
				this.maintainData = []
			}
		},

		// async searchInfos() {
		// 	let res = await this.$_api.maintaining.getfindPlanRecord({
		// 		startTime: this.searchb.starTime,
		// 		endTime: this.searchb.endTime,
		// 		mtcCoID: this.search.maintenanceUnit,
		// 		iStatus: this.search.stute
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
				return 'background-color: #29455a;'
			}else {
				return 'background-color: #132332;'
			}
		},
		infoModals(row) {
			this.detileData = row.mtcPlanId
			this.modalShow = true
		},
		handleClose() {
			this.modalShow = false
		},
		recordModals(row) {
			// this.recordData = row.mtcPlanId
			this.fileDate = row.fileName
			this.recordShow = true
		}
	}
}
</script>

<style lang="stylus">
@import './input.css';


.mian-taining {

  width: 100%;
  height: 99%;
  margin-top: 5px;
  padding: 0 50px;
  background-color: #141a26;
  overflow: hidden;

  /deep/.el-form--inline {
    margin-top: 10px;
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
      color: #6292B2;
      font-size: 36PX;
	  margin-top:5px;
    }

    .el-input {
      width: 180px;

      /deep/.el-input__inner {
        border: 1PX solid #0c4e75;
		  background:#11344A;
		  font-size:16px;
      }
    }
    .el-input--mini .el-input__inner {
      height: 40px;
    }
	.el-checkbox-group{
		margin-top:5px;
	}
    .el-select {
      /deep/.el-input__inner {
        border: 1PX solid #0c4e75;
      }
    }
  }

  /deep/.el-form-item__label {
    color: #FFFFFF !important;
  }
	.el-form-item{
		margin-bottom:30px !important;
	}
   .el-input__prefix {
    right: -285PX;
   transition: all 0.3s;
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

  el-table th, .el-table tr {
    background-color: transparent;
    font-size: 36PX;
  }
	.has-gutter{
		background transparent;
		background:url("../../../assets/img/tainingTitle.png")
	}
	/*.has-gutter tr{*/
		/*background:transparent*/
		/*background :url("../../../assets/i")*/
	//}
  .el-table__row {
    color: white;
  }

  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #081437 !important;
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
    width: 3.8rem;
    font-size: 36PX;
    background: url('~@fire/assets/img/comfim.png') no-repeat;
    background-size: 100% 100%;
  }

  .yellow-btn {
    width: 3.8rem;
    color: #F6CE69;
    font-size: 36PX;
    background: url('~@fire/assets/img/import.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 15px;
  }

  .item-zt {
    width: 790PX;
    // padding-left: 30PX;
  }

  .taining-button {
    float: right;
  }
}

/deep/.el-picker-panel {
  background-color: #1A587F !important;
}

/deep/.el-table__body-wrapper {
  margin-top: -20px;
}

.ivu-modal-header {
	background-color: black;
  background: url('../../../assets/img/main/lan.png') no-repeat;
  background-size: 100% 100%;
  border: none;
}
.ivu-modal-header-inner {
  font-size: 18px;
}
.ivu-icon-ios-close {
	margin-top: 15px;
	font-size: 48px!important;
	
}

.ivu-modal {
	top: 1px!important;
	left: 0;
	width: 100%!important;
}

.ivu-modal-mask {
	top: -137px;
}
.ivu-modal-mask {
	top: 0;
}
.iframeCal {
	left: 0!important;
	height: 39rem;
	top: 0!important;
}
.ivu-modal-content {
	top: 0.08889rem;
	height: 42.8rem!important;
}
.ivu-modal-wrap {
	top: 4.08889rem!important;
	height: 44rem!important;
	top: 2px;
}

.iframw-view {
	height: 930px!important;
}
</style>


