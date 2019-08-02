<template>
	<div class="systemView">
		<dialogs :dialog-visible="dialogVisible" @handleClose="handleClose"></dialogs>
		<div class="mian-taining">
			<el-form :inline="true" size="mini" :model="search">
				<el-form-item label="开始日期:">
					<el-date-picker
						popper-class="dateDrop"
						suffix-icon="el-icon-date"
						v-model="search.starTime"
						type="date"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="结束日期:">
					<el-date-picker v-model="search.endTime" type="date"></el-date-picker>
				</el-form-item>
				<el-form-item label="时间段:">
					<el-select v-model="search.region" placeholder>
						<el-option label="全部" value="nullValue"></el-option>
						<el-option label="一周" value="week"></el-option>
						<el-option label="一月" value="month"></el-option>
						<el-option label="一年" value="year"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="维保单位:">
					<el-select v-model="search.maintenanceUnit" placeholder>
						<el-option label="全部" value="nullValue"></el-option>
						<el-option
							v-for="item in maintenanceUnits"
							:key="item.MtcCoID"
							:label="item.vc_Name"
							:value="item.MtcCoID"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="状态:">
					<el-checkbox-group v-model="search.stute">
						<el-checkbox v-for="i in stutes" :key="i.id" :label="i.id">{{ i.name }}</el-checkbox>
						<!-- <el-checkbox label="1">正在执行</el-checkbox>
            <el-checkbox label="2">已结束</el-checkbox>-->
					</el-checkbox-group>
				</el-form-item>

				<el-form-item class="taining-button">
					<el-button class="blue-btn" @click="searchInfo" type="text">查&nbsp找</el-button>
					<el-button class="yellow-btn" @click="leadTo" type="text">导&nbsp入</el-button>
					<el-button class="yellow-btn" @click="exportInfo" type="text">导&nbsp出</el-button>
				</el-form-item>
			</el-form>
			<!-- table -->
			<div>
				<el-table :header-cell-style="{ background: 'none' }" :data="maintainData" style="width: 100%">
					<el-table-column prop="mtcName" align="center" label="维保单位"></el-table-column>
					<el-table-column prop="unitName" align="center" label="变电站"></el-table-column>
					<el-table-column
						prop="vc_Context"
						align="center"
						label="维护内容"
						show-overflow-tooltip
					></el-table-column>
					<el-table-column prop="i_BeginTime" align="center" label="计划开始时间"></el-table-column>
					<el-table-column prop="i_EndTime" align="center" label="计划结束时间"></el-table-column>
					<el-table-column prop="vc_PowerOffScene" align="center" label="停电场所"></el-table-column>
					<el-table-column prop="vc_PowerLevel" align="center" label="电压等级"></el-table-column>
					<el-table-column prop="vc_People" align="center" label="负责人"></el-table-column>
					<el-table-column prop="vc_Telephone" align="center" label="联系电话"></el-table-column>
					<el-table-column prop="date" align="center" label="当前状态">
						<template slot-scope="scope">
							<span v-if="scope.row.iStatus == '未执行'" style="color:red;">{{ scope.row.iStatus }}</span>
							<span v-if="scope.row.iStatus == '正在执行'" style="color:green;">{{
								scope.row.iStatus
							}}</span>
							<span v-if="scope.row.iStatus == '已结束'" style="color:blue;">{{
								scope.row.iStatus
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="执行" align="center" width="250">
						<template>
							<div>
								<el-button class="blue-btn" @click="lookInfo" size="mini" type="text"
									>查看详情</el-button
								>
								<el-button class="yellow-btn" @click="outRow" size="mini" type="text">导出</el-button>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>
<script>
import dialogs from '../dialog'
export default {
	name: 'main-taining',
	data() {
		return {
			dialogVisible: false,
			nullValue: null,
			search: {
				starTime: '',
				endTime: '',
				user: '',
				maintenanceUnit: '',
				stute: []
			},
			stutes: [{ id: 0, name: '未执行' }, { id: 1, name: '正在执行' }, { id: 2, name: '已结束' }],
			maintenanceUnits: [],
			maintainData: []
		}
	},
	components: {
		dialogs
	},
	created() {
		this.init()
		this.searchInfo()
	},
	methods: {
		async init() {
			let result = await this.$_api.maintaining.getMaintenance()
			if (result.success) {
				console.log(result.data, 'ssssss')
				this.maintenanceUnits = result.data
			} else {
				// this.maintainData = []
			}
		},

		async searchInfo() {
			let res = await this.$_api.maintaining.getfindPlanRecord({
				startTime: this.search.starTime,
				endTime: this.search.endTime,
				mtcCoID: this.search.maintenanceUnit,
				iStatus: this.search.stute
			})
			if (res.success) {
				this.maintainData = res.data
			} else {
				this.maintainData = []
			}
		},
		leadTo() {},
		exportInfo() {},
		outRow() {},
		lookInfo() {
			this.dialogVisible = true
		},
		handleClose(value) {
			this.dialogVisible = value
		}
	}
}
</script>

<style lang="stylus">
.mian-taining {
  padding: 1.66667rem;
	margin-top: -20px

  /deep/.el-popper[x-placement^=bottom] {
    margin-top: 0.53333rem;
    background: #1A587F !important;
    border: none !important;
    color: wheat;
  }

  /deep/.el-date-picker {
    background: #1A587F;
  }

  .el-form--inline {
    /deep/.el-form-item__label {
      color: #6292B2;
    }

    .el-input {
      /deep/.el-input__inner {
        border: none;
      }
    }

    .el-select {
      /deep/.el-input__inner {
        border: none;
      }
    }
  }

  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }

  el-table th, .el-table tr {
    background-color: transparent;
  }

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
    height: 0px;
  }

  .el-table {
    /deep/.has-gutter {

      height: 0px;
      color: #1589F2;
    }
  }

  .blue-btn {
    width: 3.8rem;
    background: url('~@fire/assets/img/alarm-now/comfim.png') no-repeat;
    background-size: 100% 100%;
  }

  .yellow-btn {
    width: 3.8rem;
    color: #F6CE69;
    background: url('~@fire/assets/img/alarm-now/fasle.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 15px;
  }
}
</style>
