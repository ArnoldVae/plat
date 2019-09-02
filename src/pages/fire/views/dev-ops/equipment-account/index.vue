<template>
	<div class="docFire">
		<ElDialog
			style="left: 17vw; top:8vh;text-align: center"
			:visible.sync="dialogVisible"
			center
			:before-close="handleClose"
		>
			<img src="./lan.png" style="position: relative;top:-120px;left: -50px; width: 107%;" alt />
			<span
				style="color: #000000;font-size:44PX;position:relative;top: -3.9rem;left: 15rem;font-weight: bold"
			>设备详情</span>

			<div class="diaSpan" style="position: relative;top:-40px">
				<el-row style="color: #ffffff;">
					<el-col :span="12">
						<span>变电站：</span>
						<span>{{forData.itemData1}}</span>
					</el-col>
					<el-col :span="12">
						<span>设备名称：</span>
						<span>{{forData.itemData2}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>设备编号：</span>
						<span>{{forData.itemData3}}</span>
					</el-col>
					<el-col :span="12">
						<span>所属子系统：</span>
						<span>{{forData.itemData4}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>设备类型：</span>
						<span>{{forData.itemData5}}</span>
					</el-col>
					<el-col :span="12">
						<span>设备子系统：</span>
						<span>{{forData.itemData6}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>设备种类：</span>
						<span>{{forData.itemData7}}</span>
					</el-col>
					<el-col :span="12">
						<span>设备型号：</span>
						<span>{{forData.itemData8}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>设备型式：</span>
						<span>{{forData.itemData9}}</span>
					</el-col>
					<el-col :span="12">
						<span>设备材质：</span>
						<span>{{forData.itemData10}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>设备参数：</span>
						<span>{{forData.itemData11}}</span>
					</el-col>
					<el-col :span="12">
						<span>安装位置：</span>
						<span>{{forData.itemData12}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>功率：</span>
						<span>{{forData.itemData12}}</span>
					</el-col>
					<el-col :span="12">
						<span>回路数：</span>
						<span>{{forData.itemData14}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>编码地址：</span>
						<span>{{forData.itemData15}}</span>
					</el-col>
					<el-col :span="12">
						<span>投运日期：</span>
						<span>{{forData.itemData16}}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="20">
						<span>单位：</span>
						<span>{{forData.itemData17}}</span>
					</el-col>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button class="yellow-btn" @click="dialogVisible = false" type="text">取 消</el-button>
				<el-button class="blue-btn" type="text" @click="dialogVisible = false">确 定</el-button>
			</span>
		</ElDialog>

		<el-form class="formSize" :inline="true" size="mini" :model="search">
			<el-form-item label="设备名称:" style="margin-right: 45px">
				<el-input v-model="search.eqName" placeholder="请输入设备名称"></el-input>
			</el-form-item>
			<el-form-item label="设备类型:" style="margin-right: 45px">
				<el-select v-model="search.devType" placeholder="请选择设备类型">
					<el-option label="全部" value="nullValue"></el-option>
					<el-option
						v-for="(item, index) in eqcnameS"
						:key="index"
						:label="item.vcName"
						:value="item.vcName"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属子系统:" style="margin-right: 50px">
				<el-select v-model="search.maintenanceUnit" placeholder="请选择所属子系统">
					<el-option label="全部" value="nullValue"></el-option>
					<el-option
						v-for="(item, index) in eqctypeS"
						:key="index"
						:label="item.vcName"
						:value="item.vcName"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="定置点编号:" style="margin-right: 45px">
				<el-input v-model="search.Num" placeholder="请输入定置点编号"></el-input>
			</el-form-item>
			
			<el-form-item label="保管责任人:">
				<el-input v-model="search.keeperName" placeholder="请输入保管责任人"></el-input>
			</el-form-item>
			<br />
			<!-- <el-form-item label="设备材质:" style="margin-right: 120px">
				<el-select v-model="search.eqcaizhi" placeholder>
					<el-option label="全部" value="nullValue"></el-option>
					<el-option
							v-for="(item,index) in materias"
							:key="index"
							:label="item.vc_Name"
							:value="item.MtcCoID"
					></el-option>
				</el-select>
			</el-form-item>-->

			<!-- <el-form-item label="设备状态:" label-width="200px">
				<el-select v-model="search.subTypes" placeholder>
					<el-option label="全部" value="nullValue"></el-option>
					<el-option
							v-for="(item,index) in subModels"
							:key="index"
							:label="item.vc_Name"
							:value="item.MtcCoID"
					></el-option>
				</el-select>
			</el-form-item>-->
			<!-- <el-form-item label="设备名称:" label-width="300px">
				<el-select v-model="search.subModelsh" placeholder>
					<el-option label="全部" value="nullValue"></el-option>
					<el-option
							v-for="(item,index) in subModelshs"
							:key="index"
							:label="item.vc_Name"
							:value="item.MtcCoID"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="安装位置:" label-width="270px">
				<el-select v-model="search.materias" placeholder>
					<el-option label="全部" value="nullValue"></el-option>
					<el-option
							v-for="(item,index) in subpostions"
							:key="index"
							:label="item.vc_Name"
							:value="item.MtcCoID"
					></el-option>
				</el-select>
			</el-form-item>-->

			<el-form-item class="taining-button" style="position: relative;top:-90px">
				<div style="margin-bottom: 10px">
					<el-button class="blue-btn" type="text" @click="doSearch()">查询</el-button>
					<!-- <el-button class="blue-btn" @click="leadTo" type="text">查看</el-button>
					<el-button class="blue-btn" @click="exportInfo" type="text">导入</el-button> -->
				</div>
				<!-- <div style>
					<el-button style="margin: 0" class="yellow-btn" type="text">删 除</el-button>
					<el-button class="import-btn" type="text">导 入</el-button>
					<el-button class="import-btn" type="text">导 出</el-button>
				</div>-->
			</el-form-item>
		</el-form>
		<!-- table -->
		<div>
			<el-table
				:header-cell-style="{background:'none'}"
				:data="maintainDatas"
				:row-style="tableColor"
				@selection-change="handleSelectionChange"
				height="1380"
				style="width: 100%;position: relative;top: -57px;"
			>
				<el-table-column prop="unitName" align="center" label="变电站名称" width="300"></el-table-column>
				<el-table-column prop="vcName" align="center" label="设备名称" width="600" ></el-table-column>
				<el-table-column prop="devTypeName" align="center" label="设备类型" width='300'></el-table-column>
				<el-table-column prop="subName" align="center" label="所属子系统" width="300"></el-table-column>
				<el-table-column prop="num" align="center" label="定置点编号" width="220"></el-table-column>
				<el-table-column prop="vcCode" align="center" label="型号规格" width="350"></el-table-column>
				<el-table-column prop="beginTime" align="center" label="有效期"></el-table-column>
				<el-table-column prop="userId" align="center" label="保管责任人"></el-table-column>
				<el-table-column prop="vcLocal" align="center" label="安装位置" width="450"></el-table-column>
				<el-table-column prop="vcMemo" align="center" label="备注"></el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
			    ref="pages"
				background
				:page-size="pageSize"
				layout="prev, pager, next"
				@current-change="handleCurrentChange"
				@prev-click="searchItem('page')"
				@next-click="searchItem('page')"
				:total="pageTotal"
			></el-pagination>
		</div>
	</div>
</template>
<script>
export default {
	name: 'docFire',
	data() {
		return {
			pageTotal: 0,
			pageSize: 10,
			currentPage: 1,
			pagenation: {},
			forData: [
				{
					itemData1: '',
					itemData2: '',
					itemData3: '',
					itemData4: '',
					itemData5: '',
					itemData6: '',
					itemData7: '',
					itemData8: '',
					itemData9: '',
					itemData10: '',
					itemData11: '',
					itemData12: '',
					itemData13: '',
					itemData14: '',
					itemData15: '',
					itemData16: '',
					itemData17: ''
				}
			],

			eqnameS: [
				{ MtcCoID: 1, vc_Name: '火灾传输装置' },
				{ MtcCoID: 2, vc_Name: '细水灭火指示灯' },
				{ MtcCoID: 3, vc_Name: '消防供水系统' },
				{ MtcCoID: 4, vc_Name: '火灾自动报警系统' }
			],

			eqcnameS: [
				{ MtcCoID: 1, vc_Name: '火灾自动报警控制主机' },
				{ MtcCoID: 2, vc_Name: '释放指示灯' },
				{ MtcCoID: 3, vc_Name: '细水雾喷头' },
				{ MtcCoID: 4, vc_Name: '消防专门电话' },
				{ MtcCoID: 5, vc_Name: '液位显示装置' },
				{ MtcCoID: 2, vc_Name: '释放指示灯' },
				{ MtcCoID: 6, vc_Name: '输入输出模块' }
			],
			eqctypeS: [{ MtcCoID: 1, vc_Name: '消防子系统' }],
			subnames: [],
			eqcaizhi: [
				{ MtcCoID: 1, vc_Name: '火灾传输装置' },
				{ MtcCoID: 2, vc_Name: '细水灭火指示灯' },
				{ MtcCoID: 2, vc_Name: '消防供水系统' }
			],
			materias: [],
			subTypes: [
				{ MtcCoID: 1, vc_Name: '火灾传输装置' },
				{ MtcCoID: 2, vc_Name: '细水灭火指示灯' },
				{ MtcCoID: 2, vc_Name: '消防供水系统' }
			],
			subModels: [{ MtcCoID: 1, vc_Name: '正常' }, { MtcCoID: 2, vc_Name: '异常' }],

			subpostions: [],
			subModelshs: [],
			dialogVisible: false,
			nullValue: null,
			data: '',
			search: {
				eqName: '', //设备名称
				devType: '', //设备类型
				Num: '', //定置点编号
				maintenanceUnit: '', //所属子系统
				keeperName: '' //保管责任人
			},
			stutes: [{ id: 0, name: '未执行' }, { id: 1, name: '正在执行' }, { id: 2, name: '已结束' }],

			maintainDatas: [
				{
					substatio: '550kv东善桥变电站',
					numID: 'BJ-263',
					eqname: '火灾传输装置',
					eqtype: '火灾自动报警系统',
					eqctype: '火灾报警控制主机',
					subname: '消防子系统',
					type_name: '灭火',
					type_code: 'JK-S-01',
					subModelsh: '————',
					materia: '',
					subnum: '',
					substute: '正常',
					subpostion: '主控楼一楼过道'
				},
				{
					substatio: '550kv东善桥变电站',
					numID: 'NJ-2',
					eqname: '细水灭火指示灯',
					eqtype: '细水灭火装置',
					eqctype: '释放指示灯',
					subname: '消防子系统',
					type_name: '报警',
					type_code: '2008系列',
					subModelsh: '————',
					materia: '',
					subnum: '',
					substute: '正常',
					subpostion: '一号主变区域'
				},
				{
					substatio: '550kv东善桥变电站',
					numID: 'NJ-266',
					eqname: '火灾传输装置',
					eqtype: '火灾自动报警系统',
					eqctype: '火灾报警控制主机',
					subname: '消防子系统',
					type_name: '报警',
					type_code: 'QM600',
					subModelsh: '————',
					materia: '',
					subnum: '',
					substute: '正常',
					subpostion: '一号主变区域'
				}
			],
			modalShow: false
		}
	},
	mounted() {
		// this.searchItem()
	},

	created() {
		this.getData()
		this.searchItem()
	},

	watch: {},
	methods: {
		//获取设备和子系统数据
		getData() {
			this.$_api.devOps
				.geteqData({
					dictGroupID: 9003
				})
				.then(res => {
					if (res.code == 200) {
						this.eqcnameS = res.data
					}
				})
			this.$_api.devOps
				.getChildData({
					type: '10060003'
				})
				.then(res => {
					if (res.code == 200) {
						this.eqctypeS = res.data.lists
					}
				})
		},
		tableColor({ row, column, rowIndex, columnIndex }) {
			let index = rowIndex
			if (index % 2 != 0) {
				return 'background-color: #29455a;'
			} else {
				return 'background-color: #132332;'
			}
		},
		handleCurrentChange(val) {
			// console.log(val)
			this.currentPage = val
			this.searchItem('index')
		},
		doSearch(){
			this.searchItem()
			// 重置页码为1
			this.$nextTick(() => {
				this.$refs['pages'].internalCurrentPage = 1
			})
		},
		async searchItem(target) {
			
			if (!target) this.currentPage = 1
			let result = await this.$_api.devOps.getAcountList({
				vcName: this.search.eqName,
				devTypeName: this.search.devType,
				num: this.search.Num,
				subName: this.search.maintenanceUnit,
				userId: this.search.keeperName,
				pageSize: 12,
				currentPage: this.currentPage
			})
			if (result.success) {
					this.search= {
					eqName: '', //设备名称
					devType: '', //设备类型
					Num: '', //定置点编号
					maintenanceUnit: '', //所属子系统
					keeperName: '' //保管责任人
				}
				if (result.data && result.data) {
					this.pageTotal = result.data.total
					this.pageSize = result.data.pageSize
					this.maintainDatas = result.data.list
					this.currentPage = result.data.nextPage
					this.pagenation = result.data
					this.maintainDatas.forEach(item => {
						
						for (name in item) {
							// console.log(item[name])
							if (item[name] == null ) {
								item[name] = '--'
							}
						}
					       if(item['vcMemo']=='--')item.vcMemo=''
							
					})
				}
				// 重置页码为1
				// this.$nextTick(() => {
				// 	this.$refs['pages'].internalCurrentPage = 1
				// })
			}
		},

		// lookImG(){
		//             let url="http://26.47.189.184:8085/webshare/pdf/xxx.docx"
		//             window.open('http://26.47.189.183:8012/onlinePreview?url='+encodeURIComponent(url));
		//         },
		searchInfo() {
			// this.dialogVisible = true
			this.forData.itemData1 = this.data[0].substatio
			this.forData.itemData2 = this.data[0].numID
			this.forData.itemData3 = this.data[0].eqname
			this.forData.itemData4 = this.data[0].eqtype
			this.forData.itemData5 = this.data[0].eqctype
			this.forData.itemData6 = this.data[0].subname
			this.forData.itemData7 = this.data[0].subType
			this.forData.itemData8 = this.data[0].subModel
			this.forData.itemData9 = this.data[0].subModelsh
			this.forData.itemData10 = this.data[0].materia
			this.forData.itemData11 = this.data[0].subnum
			this.forData.itemData12 = this.data[0].substute
			this.forData.itemData13 = this.data[0].subpostion
		},
		leadTo() {},
		exportInfo() {},
		infoModal() {
			this.modalShow = true
		},
		handleClose() {
			this.dialogVisible = false
		},
		handleSelectionChange(val) {
			this.data = val
		}
	}
}
</script>

<style lang="stylus">
@import './input.css';

.el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next {
  height: 60PX;
  background-color: #141a26;
}

.el-pagination.is-background .el-pager li {
  color: white;
  background-color: #141a26;
  font-size: 40PX;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #3a4f65;
  color: #FFF;
}

.docFire {
  width: 100%;
  height: 99%;
  margin-top: 5px;
  padding: 0 50px;
  background-color: #141a26;
  overflow: hidden;

  .el-row {
    left: 7%;
    font-size: 0.7rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .el-dialog {
    background: #141a26;
    border: 1PX solid #d3dee6;

    .el-dialog__header {
      background: url('../../../assets/img/main/lan.png');
      background-repeat: no-repeat;
      font-weight: bold;
      font-size: 44PX;
      height: 71PX;
      line-height: 30px;
      width: 100%;
      background-size: 100% 100%;
      -moz-background-size: 100% 100%;
      text-align: center;
      color: black;
    }
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }

  /deep/ .el-form--inline {
    margin-top: 10px;
  }

  /deep/ .el-popper[x-placement^=bottom] {
    margin-top: 0.53333rem;
    background: #1A587F !important;
    border: none !important;
    color: wheat;
  }

  /deep/ .el-date-picker {
    background: #1A587F !important;
  }

  /deep/ .el-picker-panel, el-date-picker, el-popper {
    background: #1A587F !important;
  }

  .el-form--inline {
    .el-input {
      width: 180px;

      /deep/ .el-input__inner {
        border: 1PX solid #0c4e75;
        background: #11344A;
        font-size: 16px;
      }
    }

    .el-input--mini .el-input__inner {
      height: 40px;
    }

    .el-select {
      /deep/ .el-input__inner {
        /* background: none; */
        border: 1PX solid #0c4e75;
      }
    }
  }
	.el-form-item{
		margin-bottom:10px !important;
	}
  /deep/ .el-form-item__label {
    color: #ffffff !important;
    font-size: 40PX !important;
	margin-top:5px;
  }

  .el-checkbox__label {
    color: #94e0ff;
  }

  /deep/ .el-checkbox__inner {
    background: transparent;
    border: 1PX solid #0c4e75;
  }

  .el-table, .el-table__expanded-cell {
    background-color: transparent;
  }

  el-table th, .el-table tr {
    background-color: transparent;
  }

  .formSize label {
    font-size: 36PX;
  }

  .el-table td div {
    font-size: 36PX;
  }

  .has-gutter {
    background: transparent;
    background: url('../../../assets/img/tainingTitle.png');
  }

  .el-table th div {
    font-size: 36PX;
  }

  .el-table__row {
    color: white;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #081437 !important;
  }

  .el-table__row > td {
    border: none;
  }

  .el-table::before { // 去掉最下面的那一条线
    height: 0px;
  }

  .el-table {
    /deep/ .has-gutter {
      height: 0px;
      color: #fff;
      background-color: #0a3449;
      border-bottom: 0px;
    }
  }

  .blue-btn {
    width: 3.8rem;
    color: #FFFFFF;
    background: url('~@fire/assets/img/comfim.png') no-repeat;
    background-size: 100% 100%;
  }

  .import-btn {
    width: 3.8rem;
    color: #F6CE69;
    background: url('~@fire/assets/img/import.png') no-repeat;
    background-size: 100% 100%;
  }

  .yellow-btn {
    width: 3.8rem;
    color: #FFFFFF;
    background: url('~@fire/assets/img/fasle.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 15px;
  }

  .item-zt {
    width: 570px;
    padding-left: 240px;
  }

  .taining-button {
    float: right;
  }

  .taining-button button {
    font-size: 36PX;
  }
}

/deep/ .el-picker-panel {
  background-color: #1A587F !important;
}

/deep/ .el-table__body-wrapper {
  margin-top: -20px;
}

.pagination {
  text-align: center;
  position: absolute;
  left: 36%;
  bottom: 4%;
}
</style>


