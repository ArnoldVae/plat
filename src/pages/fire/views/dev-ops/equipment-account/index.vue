<template>
  <div class="docFire">
    <ElDialog
      style="left: 15vw; top:-4vh;text-align: center"
      :visible.sync="dialogVisible"
      center
      :before-close="handleClose"
    >
      <!-- <img src="./lan.png" style="position: relative;top:-120px;left: -50px; width: 107%;" alt> -->
      <span
        style="color: #fff;font-size:30px;position:relative;top: -3.5rem;left: 15rem;font-weight: bold"
      >设备详情</span>

      <div class="diaSpan" style="position: relative;top:-40px">
        <el-row style="color: #ffffff;">
					<el-col :span="12">
						<span>变电站:</span>
						<span style="margin-left:50px;color:#47b2fe">{{ forData.unitName }}</span>
					</el-col>
					<el-col :span="12">
						<span>设备名称:</span>
						<span style="margin-left:50px;color:#47b2fe">{{ forData.vcName }}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>设备类型:</span>
						<span style="margin-left:41px;color:#47b2fe">{{ forData.devTypeName }}</span>
					</el-col>
					<el-col :span="12">
						<span>所属子系统:</span>
						<span style="margin-left:38px;color:#47b2fe">{{ forData.subName }}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>定置点编号:</span>
						<span style="margin-left:24px;color:#47b2fe">{{ forData.num }}</span>
					</el-col>
					<el-col :span="12">
						<span>规格型号:</span>
						<span style="margin-left:51px;color:#47b2fe">{{ forData.vcCode }}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>有效日期:</span>
						<span style="margin-left:38px;color:#47b2fe">{{ forData.beginTime }}</span>
					</el-col>
					<el-col :span="12">
						<span>保管责任人:</span>
						<span style="margin-left:34px;color:#47b2fe">{{ forData.userId }}</span>
					</el-col>
				</el-row>
				<el-row style="color: #ffffff">
					<el-col :span="12">
						<span>安装位置:</span>
						<span style="margin-left:36px;color:#47b2fe">{{ forData.vcLocal }}</span>
					</el-col>
					<el-col :span="12">
						<span>备注:</span>
						<span style="margin-left:83px;color:#47b2fe">{{ forData.vcMemo }}</span>
					</el-col>
				</el-row>
      </div>
      <span slot="footer" class="dialog-footer">
		  <el-button class="blue-btn" type="text" @click="comfir">确 定</el-button>
        <el-button class="yellow-btn" @click="comfir" type="text">取 消</el-button>
        
      </span>
    </ElDialog>

    <el-form class="formSize" :inline="true" size="mini" :model="search">
      <el-form-item label="设备名称:" style="margin-right: 20px">
        <el-input v-model="search.eqName" placeholder="请输入设备名称"></el-input>
      </el-form-item>
      <el-form-item label="设备类型:" style="margin-right: 20px">
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
	  <el-form-item label="定置点编号:" style="margin-right: 20px">
        <el-input v-model="search.Num" placeholder="请输入定置点编号"></el-input>
      </el-form-item>
      <el-form-item label="所属子系统:" style="margin-right: 26px">
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
      <el-form-item label="保管责任人:" >
        <el-input v-model="search.keeperName" placeholder="请输入保管责任人"></el-input>
      </el-form-item>
      <br>
      <el-form-item class="taining-button">
        <div style="margin-bottom: 10px">
          <el-button class="blue-btn" type="text" @click="doSearch()">查询</el-button>
          <el-button class="blue-btn" @click="leadTo" type="text">查看</el-button>
          <el-button class="yellow-btn" @click="exportInfo" type="text">导入</el-button>
        </div>
        <!-- <div style>
					<el-button style="margin: 0" class="yellow-btn" type="text">删 除</el-button>
					<el-button class="import-btn" type="text">导 入</el-button>
					<el-button class="import-btn" type="text">导 出</el-button>
        </div>-->
      </el-form-item>
    </el-form>
    <!-- table -->
    <div class="table">
      <el-table
        :data="maintainDatas"

        @selection-change="handleSelectionChange"
		@row-click="rowClick"
        style="width: 100%;"
		height="400"
		border
      >
        <el-table-column prop="unitName" align="center" label="变电站名称" width="160"></el-table-column>
        <el-table-column prop="vcName" align="center" label="设备名称" width='250' show-overflow-tooltip></el-table-column>
        <el-table-column prop="devTypeName" align="center" label="设备类型" width='120'></el-table-column>
        <el-table-column prop="subName" align="center" label="所属子系统" width='150'></el-table-column>
        <el-table-column prop="num" align="center" label="定置点编号" width='140'></el-table-column>
        <el-table-column prop="vcCode" align="center" label="型号规格" width='150'></el-table-column>
        <el-table-column prop="beginTime" align="center" label="有效期" width='120'></el-table-column>
        <el-table-column prop="userId" align="center" label="保管责任人" width='110'></el-table-column>
        <el-table-column prop="vcLocal" align="center" label="安装位置" width='179'></el-table-column>
        <el-table-column prop="vcMemo" align="center" label="备注" ></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        ref="pages"
        background
        layout="total,  prev, pager, next,sizes, jumper"
        :current-page="curIndex"
		 @size-change="handleSizeChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total="totals"
        @current-change="changePage"
      ></el-pagination>
    </div>
	<!-- 导入弹框 -->
		<el-dialog title="导入文件" :visible.sync="DaoShow" width="50%" class="Daoshow" :before-close="Close">
			<el-upload
				class="upload-demo"
				action="https://jsonplaceholder.typicode.com/posts/"
				:on-preview="handlePreview"
				:on-remove="handleRemove"
				:before-remove="beforeRemove"
				:limit="3"
				:on-exceed="handleExceed"
				:file-list="fileList"
			>
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">只能上传elx格式文件</div>
			</el-upload>
		</el-dialog>
  </div>
</template>
<script>
export default {
	name: 'docFire',
	data() {
		return {
			forData: [],

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
				eqName: '',//设备名称
				devType:'',//设备类型
				Num:'',//定置点编号
				maintenanceUnit: '',//所属子系统
				keeperName: '',//保管责任人
				
			},
			stutes: [{ id: 0, name: '未执行' }, { id: 1, name: '正在执行' }, { id: 2, name: '已结束' }],

			maintainDatas: [
				{
					unit_name: '550kv东善桥变电站',
					dev_name: 'BJ-263',
					dev_type: '火灾传输装置',
					dev_subsytem: '火灾自动报警系统',
					dev_num:1,
					vc_Code: '火灾报警控制主机',
					i_BeginTime: '消防子系统',
					vc_User: '灭火',
					vc_Local: 'JK-S-01',
					vc_remark: '正常'
				},
				{
					unit_name: '550kv东善桥变电站',
					dev_name: 'BJ-263',
					dev_type: '火灾传输装置',
					dev_subsytem: '火灾自动报警系统',
					dev_num:1,
					vc_Code: '火灾报警控制主机',
					i_BeginTime: '消防子系统',
					vc_User: '灭火',
					vc_Local: 'JK-S-01',
					vc_remark: '正常'
				},
				{
					unit_name: '550kv东善桥变电站',
					dev_name: 'BJ-263',
					dev_type: '火灾传输装置',
					dev_num:1,
					dev_subsytem: '火灾自动报警系统',
					vc_Code: '火灾报警控制主机',
					i_BeginTime: '消防子系统',
					vc_User: '灭火',
					vc_Local: 'JK-S-01',
					vc_remark: '正常'
				},
				{
					unit_name: '550kv东善桥变电站',
					dev_name: 'BJ-263',
					dev_type: '火灾传输装置',
					dev_subsytem: '火灾自动报警系统',
					dev_num:1,
					vc_Code: '火灾报警控制主机',
					i_BeginTime: '消防子系统',
					vc_User: '灭火',
					vc_Local: 'JK-S-01',
					vc_remark: '正常'
				},
				{
					unit_name: '550kv东善桥变电站',
					dev_name: 'BJ-263',
					dev_type: '火灾传输装置',
					dev_subsytem: '火灾自动报警系统',
					dev_num:1,
					vc_Code: '火灾报警控制主机',
					i_BeginTime: '消防子系统',
					vc_User: '灭火',
					vc_Local: 'JK-S-01',
					vc_remark: '正常'
				},
				{
					unit_name: '550kv东善桥变电站',
					dev_name: 'BJ-263',
					dev_type: '火灾传输装置',
					dev_subsytem: '火灾自动报警系统',
					dev_num:1,
					vc_Code: '火灾报警控制主机',
					i_BeginTime: '消防子系统',
					vc_User: '灭火',
					vc_Local: 'JK-S-01',
					vc_remark: '正常'
				},
		        {
					unit_name: '550kv东善桥变电站',
					dev_name: 'BJ-263',
					dev_type: '火灾传输装置',
					dev_subsytem: '火灾自动报警系统',
					dev_num:1,
					vc_Code: '火灾报警控制主机',
					i_BeginTime: '消防子系统',
					vc_User: '灭火',
					vc_Local: 'JK-S-01',
					vc_remark: '正常'
				}
			],
			modalShow: false,
			// 分页相关数据
			curIndex: 1,
			pageSize: 10,
			totals: 3,
			unitId:this.$store.getters.unitId,
			//导入文件
			DaoShow: false,
			fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
		}
	},
	mounted() {
		
	},
	created() {
		this.getData()
		this.searchItem()
		// console.log(this.$store.getters.unitId,'zhes');
	},
computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	},
	watch: {
		activeUnitId: {
			handler(val) {
				this.unitId = val
				this.searchItem()
			}
		}
	},
	methods: {
		//获取设备和子系统数据
		getData(){
			 this.$_api.devOps.geteqData({
					dictGroupID:9003
			}).then(res=>{
				if(res.code==200){
					this.eqcnameS=res.data
				}
			})
			this.$_api.devOps.getChildData({
				type:'10060003'
			}).then(res=>{
				if(res.code==200){
					this.eqctypeS=res.data.lists
				}
			})
			
		},
		tableColor({ row, column, rowIndex, columnIndex }) {
			let index = rowIndex
			if (index % 2 != 0) {
				return 'background-color: transparent;'
			} else {
				return 'background-color: transparent;'
			}
		},
		doSearch(){
			this.searchItem()
			// 重置页码为1
			this.$nextTick(() => {
				this.$refs['pages'].internalCurrentPage = 1
			})
		},
		async searchItem() {
			let result = await this.$_api.devOps.getAcountList({
				vcName:this.search.eqName,
				devTypeName:this.search.devType,
				num:this.search.Num,
				subName:this.search.maintenanceUnit,
				userId:this.search.keeperName,
				pageSize:this.pageSize,
				currentPage:this.curIndex,
				unitId:this.unitId
			})
			if (result.success) {
				if (result.data && result.data) {
					this.totals = result.data.total
					this.maintainDatas = result.data.list
					this.maintainDatas.forEach(item => {
						for (name in item) {
							if (item[name] == null) {
								item[name] = '--'
							}
						}
						 if(item['vcMemo']=='--')item.vcMemo=''
					})
				}
			}
			// 重置页码为1
			// this.$nextTick(() => {
			// 	this.$refs['pages'].internalCurrentPage = 1
			// })
		},
		//分页
		changePage(curIndex) {
			this.curIndex=curIndex;
			this.searchItem()
		},
		handleSizeChange(pagesize){
			this.pageSize=pagesize
			this.searchItem()
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
		leadTo() {
				this.dialogVisible = true
		},		
		infoModal() {
			this.modalShow = true
		},
		rowClick(row) {
			// console.log(row)
			this.forData = row
		},
		comfir() {
			this.forData = []
			this.dialogVisible = false
		},
		//导入弹框的逻辑
		exportInfo() {
			// this.DaoShow = true
			 this.Message({
          message: '警告哦，这是一条警告消息',
          type: 'warning'
        });
		},
		Close() {
			this.DaoShow = false
		},
		handleRemove(file, fileList) {
			console.log(file, fileList)
		},
		handlePreview(file) {
			console.log(file)
		},
		handleClose() {
			this.dialogVisible = false
		},
		handleSelectionChange(val) {
			this.data = val
		},
		handleExceed(files, fileList) {
			// this.$ocxMessage.info('命令下发成功')
			this.$ocxMessage.warning(
				`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length +
					fileList.length} 个文件`
			)
		},
		beforeRemove(file, fileList) {
			console.log("一处")
			// return this.$confirm(`确定移除 ${file.name}？`)
		}
	}
}
</script>

<style lang="stylus">
@import './input.css';
@import '~@/assets/style/component/index.styl'


.docFire {
  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: 0 50px;
  // background-color: #141a26;
  overflow: hidden;
	.table {
		height: 77%;

		/deep/ .el-table {
			width: 100%;
			height: calc(100% - 45px)!important;
			background: transparent;
			color: #fff;

			view-table('~@fire/assets/img/view-table/header.png')

			.control-wrap {
				display: flex;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
			}

			.el-button+.el-button {
				margin-left: initial;
				margin: 2.5px;
			}

			.el-button {
				margin: 2.5px;
				background: transparent;
				border-color: #2d8cf0;
				color: #2d8cf0;
				position: relative;

				&:hover {
					background: #09102f;
				}

				&:active {
					top: 1px;
					left: 1px;
				}

			}
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


	.el-row {
    left: 7%;
    font-size: 0.7rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
.Daoshow {
    .el-dialog {
      height: 500px;
      border: none;
      background: url('../../../assets/img/dialog.png') no-repeat;
      background-size: 100% 100%;

      .el-dialog__title {
        color: #fff;
        font-size: 30px;
      }

      .el-dialog__close {
        font-size: 30px;
      }

      .el-upload__tip {
        color: #fff;
		font-size:25px;
      }
	  .el-upload-list__item-name{
		  color:#fff;
		  font-size:20px;
	  }
    }
  }
  .el-dialog {
    background: url('../../../assets/img/dialog.png') no-repeat;
    background-size: 100% 100%;

    .el-dialog__header {
      
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
	.el-dialog__close {
      font-size: 30px;
    }
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: #ffffff;
  }

  /deep/ .el-form--inline {
    margin-top: 20px;
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
        border: 1px solid #0d7ec5 !important;
        background: #081e4d;
		font-size:16px;
      }
    }

    .el-select {
      /deep/ .el-input__inner {
        /* background: none; */
        border: 1PX solid #0c4e75;
      }
    }
  }

  /deep/ .el-form-item__label {
    color: #78b8de !important;
	font-size:18px;
  }

  .el-checkbox__label {
    color: #94e0ff;
  }

  /deep/ .el-checkbox__inner {
    background: transparent;
    border: 1PX solid #0c4e75;
  }


  // 分页样式的修改
  .pagination {
    text-align: center;
    margin-top: 25px;

    .el-pagination {
      .el-pagination__total {
        color: #73a6c3;
      }
		.el-pager{
			margin-top: 4px;
		}

      .btn-prev, .btn-next {
        border: 1px solid #0f3047;
        background-color: transparent;
        color: #444;
		cursor: pointer;
      }
		/deep/ .el-pager li{
			color: #2d8cf0 !important;
			background:transparent;
		}
      .el-pagination__jump {
        color: #73a6c3;
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



  .blue-btn {
    width: 3.8rem;
    color: #FFFFFF;
    background: url('~@fire/assets/img/seach_blue.png') no-repeat;
    background-size: 100% 100%;
  }

  .import-btn {
    width: 3.8rem;
    color: #F6CE69;
    background: url('~@fire/assets/img/seach_red.png') no-repeat;
    background-size: 100% 100%;
  }

  .yellow-btn {
    width: 3.8rem;
    color: #FFFFFF;
    background: url('~@fire/assets/img/seach_yellow.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 15px;
  }

  .item-zt {
    width: 570px;
    padding-left: 240px;
  }

  .taining-button {
    float:right;
  }

  .taining-button button {
    font-size: 20px;
  }
}

/deep/ .el-picker-panel {
  background-color: #1A587F !important;
}





</style>
