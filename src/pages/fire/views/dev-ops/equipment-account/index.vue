<template>
	<div class="docFire">
		<ElDialog
			style="left: 15vw; top:-4vh;text-align: center"
			:visible.sync="dialogVisible"
			center
			:before-close="hClose"
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
						<span style="margin-left:34px;color:#47b2fe">{{ forData.userName }}</span>
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
		<!-- 新增弹窗 -->
		<ElDialog
			style="left: 15vw; top:-4vh;text-align: center;"
			:visible.sync="dialogAddVisible"
			center
			class="add"
			:title="modalTitle"
			@closed="handleClose"
		>
			<Form
				ref="addFormRef"
				:rules="ruleValidate"
				:model="addFormData"
				:label-width="200"
				label-position="right"
			>
				<!-- 变电站 -->
				<!-- <FormItem label="变电站" prop="unitName">
					<Input v-model="addFormData.unitName" placeholder="请输入..." style="width: 370px" />
				</FormItem>-->
				<!-- 设备名称 -->
				<FormItem label="设备名称" prop="vcName">
					<Input v-model="addFormData.vcName" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 设备类型 -->
				<FormItem label="设备类型" prop="devTypeId">
					<el-select v-model="addFormData.devTypeId" placeholder="请选择设备类型" style="width: 370px">
						<el-option
							v-for="(item, index) in eqcnameS"
							:key="index"
							:label="item.vcName"
							:value="item.dictID"
						></el-option>
					</el-select>
				</FormItem>
				<!-- 所属子系统 -->
				<FormItem label="所属子系统" prop="subId">
					<el-select v-model="addFormData.subId" placeholder="请选择所属子系统" style="width: 370px">
						<el-option
							v-for="(item, index) in eqctypeS"
							:key="index"
							:label="item.vcName"
							:value="item.subSystemId"
						></el-option>
					</el-select>
				</FormItem>
				<!-- 定置点编号 -->
				<FormItem label="定置点编号" prop="num">
					<Input v-model="addFormData.num" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 规格型号 -->
				<FormItem label="规格型号" prop="vcCode">
					<Input v-model="addFormData.vcCode" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 有效日期 -->
				<FormItem label="有效日期" prop="beginTime">
					<!-- <Input v-model="addFormData.beginTime" placeholder="请输入..." style="width: 370px" /> -->
					<el-date-picker v-model="addFormData.beginTime" type="date" style="width: 370px;"></el-date-picker>
				</FormItem>
				<!-- 保管责任人 -->
				<FormItem label="保管责任人" prop="userId">
					<!-- <Input v-model="addFormData.userId" placeholder="请输入..." style="width: 370px" /> -->
					<el-select v-model="addFormData.userId" placeholder="请选择保管责任人" style="width: 370px">
						<el-option
							v-for="(item, index) in keeperNames"
							:key="index"
							:label="item.userName"
							:value="item.code"
						></el-option>
					</el-select>
				</FormItem>
				<!-- 安装位置 -->
				<FormItem label="安装位置" prop="vcLocal">
					<Input v-model="addFormData.vcLocal" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 备注 -->
				<FormItem label="备注" prop="vcMemo">
					<Input type="textarea" v-model="addFormData.vcMemo" placeholder="请输入..." style="width: 370px" />
				</FormItem>
			</Form>
			<span slot="footer" class="dialog-footer">
				<el-button class="blue-btn" type="text" @click="addInfo">确 定</el-button>
				<el-button class="yellow-btn" @click="handleClose" type="text">取 消</el-button>
			</span>
		</ElDialog>

		<el-form class="formSize" :inline="true" size="mini" :model="search">
			<el-form-item label="设备名称:" style="margin-right: 20px">
				<el-input v-model="search.eqName" placeholder="请输入"></el-input>
			</el-form-item>
			<el-form-item label="设备类型:" style="margin-right: 20px">
				<el-select v-model="search.devType" placeholder="请选择">
					<el-option
						v-for="(item, index) in eqcnameS"
						:key="index"
						:label="item.vcName"
						:value="item.dictID"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="所属子系统:" style="margin-right: 26px">
				<el-select v-model="search.maintenanceUnit" placeholder="请选择">
					<el-option
						v-for="(item, index) in eqctypeS"
						:key="index"
						:label="item.vcName"
						:value="item.subSystemId"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="定置点编号:" style="margin-right: 20px">
				<el-input v-model="search.Num" placeholder="请输入"></el-input>
			</el-form-item>

			<el-form-item label="保管责任人:">
				<el-select v-model="search.keeperName" placeholder="请选择">
					<el-option
						v-for="(item, index) in keeperNames"
						:key="index"
						:label="item.userName"
						:value="item.personId"
					></el-option>
				</el-select>
			</el-form-item>
			<br />
			<el-form-item class="taining-button">
				<div>
					<el-button class="blue-btn" type="text" @click="showAdd(0,{})">新增</el-button>
					<el-button class="blue-btn" type="text" @click="doSearch()">查询</el-button>
					<el-button class="blue-btn" @click="leadTo" type="text">查看</el-button>
					<el-button class="yellow-btn" @click="exportInfo" type="text">导入</el-button>
					<!-- <el-button class="yellow-btn" @click="exportList" type="text">导 出</el-button> -->
				</div>
			</el-form-item>
		</el-form>
		<!-- table -->
		<div class="table">
			<el-table
				:data="maintainDatas"
				@selection-change="handleSelectionChange"
				@row-click="rowClick"
				:highlight-current-row="isCurrent"
				style="width: 100%;height:565px!important"
				height="576"
				border
			>
				<el-table-column prop="unitName" align="center" label="变电站名称" width="130"></el-table-column>
				<el-table-column prop="vcName" align="center" label="设备名称" width="210" show-overflow-tooltip></el-table-column>
				<el-table-column prop="devTypeName" align="center" label="设备类型" width="150"></el-table-column>
				<el-table-column prop="subName" align="center" label="所属子系统" width="140"></el-table-column>
				<el-table-column prop="num" align="center" label="定置点编号" width="90"></el-table-column>
				<el-table-column prop="vcCode" align="center" label="型号规格" width="120"></el-table-column>
				<el-table-column prop="beginTime" align="center" label="有效期" width="110"></el-table-column>
				<el-table-column prop="userName" align="center" label="保管责任人" width="90"></el-table-column>
				<el-table-column prop="vcLocal" align="center" label="安装位置" width="140"></el-table-column>
				<el-table-column prop="vcMemo" align="center" label="备注" width="120"></el-table-column>
				<el-table-column prop align="center" label="操作" width="190">
					<template slot-scope="scope">
						<el-button class="edit-btn" size="min" @click.stop="showAdd(1,scope.row)">编辑</el-button>
						<el-button class="del-btn" size="min" @click.stop="removeInfo(1,scope.row)">删除</el-button>
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
				@size-change="handleSizeChange"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="pageSize"
				:total="totals"
				@current-change="changePage"
			></el-pagination>
		</div>
		<!-- 导入弹框 -->
		<el-dialog title="导入文件" :visible.sync="Daoshow" width="50%" :before-close="close">
			<div class="upload-content">
				<Steps class="steps" :current="step" title="文件导入步骤">
					<Step title="步骤一" content="选择导入文件 (支持.xlsx格式的文件)"></Step>
					<Step title="步骤二" content="选择完毕后点击 '导入' 按钮进行导入"></Step>
					<Step title="步骤三" content="等待导入完成"></Step>
				</Steps>
				<Upload type="drag" :before-upload="handleUpload" action :accept="accept" :format="Format">
					<div style="padding: 20px 0">
						<Icon type="ios-add-circle-outline" size="52" style="color: #3399ff"></Icon>
						<p>选择导入文件</p>
					</div>
				</Upload>
				<div v-if="file !== null" class="up-box">
					待导入文件:
					<span>
						<div class="del" @click="removeFile">
							<!-- <Icon type="md-trash" /> -->
							<i class="el-icon-delete"></i>
						</div>
						{{ file.name }}
					</span>
				</div>
			</div>
			<div slot="footer">
				<Button
					icon="md-cloud-download"
					type="success"
					size="large"
					@click="downloadTemplate"
					style="float:left"
				>模板下载</Button>
				<Button type="text" size="large" @click="close">取消</Button>
				<Button
					class="btn2"
					type="success"
					size="large"
					icon="md-cloud-upload"
					@click="upload"
					:loading="loadingStatus"
				>
					{{
					loadingStatus ? '文件导入中 请稍后...' : '导入'
					}}
				</Button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	name: 'docFire',
	data() {
		return {
			keeperNames: [],
			isCurrent: true,
			//导入文件
			Daoshow: false,
			step: 0,
			file: null,
			loadingStatus: false,
			accept: '.xls',
			Format: ['.xls'],
			isAdd: true, // 判断新增还是修改 设置禁用
			modalTitle: '新增',
			//新增表单对象
			addFormData: {
				accountId: '',
				vcName: '',
				devTypeId: '',
				subId: '',
				num: '',
				vcCode: '',
				beginTime: '',
				userId: '',
				vcLocal: '',
				vcMemo: '',
				unitId: this.$store.getters.unitId
			},
			forData: [],

			eqnameS: [
				// { MtcCoID: 1, vc_Name: '火灾传输装置' },
				// { MtcCoID: 2, vc_Name: '细水灭火指示灯' },
				// { MtcCoID: 3, vc_Name: '消防供水系统' },
				// { MtcCoID: 4, vc_Name: '火灾自动报警系统' }
			],

			eqcnameS: [
				// { MtcCoID: 1, vc_Name: '火灾自动报警控制主机' },
				// { MtcCoID: 2, vc_Name: '释放指示灯' },
				// { MtcCoID: 3, vc_Name: '细水雾喷头' },
				// { MtcCoID: 4, vc_Name: '消防专门电话' },
				// { MtcCoID: 5, vc_Name: '液位显示装置' },
				// { MtcCoID: 2, vc_Name: '释放指示灯' },
				// { MtcCoID: 6, vc_Name: '输入输出模块' }
			],
			eqctypeS: [],
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
			dialogAddVisible: false,
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
				// {
				// 	unit_name: '550kv东善桥变电站',
				// 	dev_name: 'BJ-263',
				// 	dev_type: '火灾传输装置',
				// 	dev_subsytem: '火灾自动报警系统',
				// 	dev_num: 1,
				// 	vc_Code: '火灾报警控制主机',
				// 	i_BeginTime: '消防子系统',
				// 	vc_User: '灭火',
				// 	vc_Local: 'JK-S-01',
				// 	vc_remark: '正常'
				// },
				// {
				// 	unit_name: '550kv东善桥变电站',
				// 	dev_name: 'BJ-263',
				// 	dev_type: '火灾传输装置',
				// 	dev_subsytem: '火灾自动报警系统',
				// 	dev_num: 1,
				// 	vc_Code: '火灾报警控制主机',
				// 	i_BeginTime: '消防子系统',
				// 	vc_User: '灭火',
				// 	vc_Local: 'JK-S-01',
				// 	vc_remark: '正常'
				// },
				// {
				// 	unit_name: '550kv东善桥变电站',
				// 	dev_name: 'BJ-263',
				// 	dev_type: '火灾传输装置',
				// 	dev_num: 1,
				// 	dev_subsytem: '火灾自动报警系统',
				// 	vc_Code: '火灾报警控制主机',
				// 	i_BeginTime: '消防子系统',
				// 	vc_User: '灭火',
				// 	vc_Local: 'JK-S-01',
				// 	vc_remark: '正常'
				// },
				// {
				// 	unit_name: '550kv东善桥变电站',
				// 	dev_name: 'BJ-263',
				// 	dev_type: '火灾传输装置',
				// 	dev_subsytem: '火灾自动报警系统',
				// 	dev_num: 1,
				// 	vc_Code: '火灾报警控制主机',
				// 	i_BeginTime: '消防子系统',
				// 	vc_User: '灭火',
				// 	vc_Local: 'JK-S-01',
				// 	vc_remark: '正常'
				// },
				// {
				// 	unit_name: '550kv东善桥变电站',
				// 	dev_name: 'BJ-263',
				// 	dev_type: '火灾传输装置',
				// 	dev_subsytem: '火灾自动报警系统',
				// 	dev_num: 1,
				// 	vc_Code: '火灾报警控制主机',
				// 	i_BeginTime: '消防子系统',
				// 	vc_User: '灭火',
				// 	vc_Local: 'JK-S-01',
				// 	vc_remark: '正常'
				// },
				// {
				// 	unit_name: '550kv东善桥变电站',
				// 	dev_name: 'BJ-263',
				// 	dev_type: '火灾传输装置',
				// 	dev_subsytem: '火灾自动报警系统',
				// 	dev_num: 1,
				// 	vc_Code: '火灾报警控制主机',
				// 	i_BeginTime: '消防子系统',
				// 	vc_User: '灭火',
				// 	vc_Local: 'JK-S-01',
				// 	vc_remark: '正常'
				// },
				// {
				// 	unit_name: '550kv东善桥变电站',
				// 	dev_name: 'BJ-263',
				// 	dev_type: '火灾传输装置',
				// 	dev_subsytem: '火灾自动报警系统',
				// 	dev_num: 1,
				// 	vc_Code: '火灾报警控制主机',
				// 	i_BeginTime: '消防子系统',
				// 	vc_User: '灭火',
				// 	vc_Local: 'JK-S-01',
				// 	vc_remark: '正常'
				// }
			],
			modalShow: false,
			// 分页相关数据
			curIndex: 1,
			pageSize: 10,
			totals: 3,
			unitId: this.$store.getters.unitId,

			// fileList: [
			// {
			// 	name: 'food.jpeg',
			// 	url:
			// 		'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
			// },
			// {
			// 	name: 'food2.jpeg',
			// 	url:
			// 		'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
			// }
			// ],
			// 表单验证
			ruleValidate: {
				vcName: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				devTypeId: [{ required: true, message: '该项为必填项', trigger: 'change', type: 'number' }],
				subId: [{ required: true, message: '该项为必填项', trigger: 'change', type: 'number' }],
				vcCode: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				userId: [{ required: true, message: '该项为必填项', trigger: 'change' }],
				vcLocal: [{ required: true, message: '该项为必填项', trigger: 'blur' }],
				num: [{ required: true, message: '该项为必填项', trigger: 'blur' }]
				// beginTime: [
				// 	{ required: true, message: '该项为必填项', trigger: 'change', type: 'date' }
				// ]
			}
		}
	},
	mounted() {},
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
		//模板下载
		downloadTemplate() {
			window.location.href = 'http://172.26.1.109:8080/webshare/DONGSHANQIAN/FIRE/WORD/TEMP/xftz.xls'
		},
		//导出
		exportList() {
			// var time = moment().format('YYYYMMDDHHmmss')
			// window.location.href = this.javaUrl + '/report/export?unitId=' + this.stationId +
			//   '&iIsAlarm=' +
			//   this.iIsAlarm +
			//   '&iStatus=' +
			//   this.iStatus +
			//   '&dateId=' +
			//   this.dateId +
			//   '&filename=' +
			//   time
		},

		//删除
		removeInfo(data, params) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除该数据?',
				onOk: () => {
					this.$_api.devOps
						.delEquipmentDate({ unitId: this.activeUnitId, accountId: params.accountId })
						.then(res => {
							if (res.code == 200) {
								this.$Message.success('删除成功')
								if ((this.totals - 1) % this.pageSize == 0) {
									this.curIndex -= 1
								}
								this.searchItem()
							} else {
								this.$Message.warning(res.msg)
							}
						})
				},
				onCancel: () => {}
			})
		},
		//新增、修改确定提交
		addInfo() {
			let params = {}
			if (this.isAdd) {
				// 新增
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					//验证成功，掉接口提交数据
					// this.addFormData.beginTime = new Date(this.addFormData.beginTime)
					this.addFormData.beginTime = +new Date(this.addFormData.beginTime)/1000
					params = JSON.parse(JSON.stringify(this.addFormData))
					// console.log(params)
					let res = await this.$_api.devOps.addEquipmentDate(params)
					if (res.success) {
						this.searchItem()
						this.dialogAddVisible = false
					}
				})
			} else {
				// 修改
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					//验证成功，掉接口提交数据
					this.addFormData.beginTime = +new Date(this.addFormData.beginTime)/1000
					params = JSON.parse(JSON.stringify(this.addFormData))
					params.unitId = this.unitId
					// console.log(params)
					let res = await this.$_api.devOps.addEquipmentDate(params)
					if (res.success) {
						this.searchItem()
						this.dialogAddVisible = false
					}
				})
			}
		},
		// 显示新增、修改弹框
		showAdd(data, params) {
			data == 0 ? (this.modalTitle = '新增') : (this.modalTitle = '修改')
			data == 0 ? (this.isAdd = true) : (this.isAdd = false)
			if (data == 1) {
				this.addFormData = JSON.parse(JSON.stringify(params))
				// console.log(this.addFormData)
			}
			this.dialogAddVisible = true
		},
		//获取设备和子系统数据和责任人列表
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
			this.$_api.devOps.getPersonData().then(res => {
				if (res.code == 200) {
					this.keeperNames = res.data
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
		doSearch() {
			// 重置页码为1
			// this.$nextTick(() => {
			// 	this.$refs['pages'].internalCurrentPage = 1
			// })
			this.curIndex = 1
			this.searchItem()
		},
		async searchItem() {
			this.forData = []
			let result = await this.$_api.devOps.getAcountList({
				vcName: this.search.eqName,
				devTypeId: this.search.devType,
				num: this.search.Num,
				subId: this.search.maintenanceUnit,
				userId: this.search.keeperName,
				pageSize: this.pageSize,
				currentPage: this.curIndex,
				unitId: this.unitId
			})
			if (result.success) {
				this.search = {
					eqName: '', //设备名称
					devType: '', //设备类型
					Num: '', //定置点编号
					maintenanceUnit: '', //所属子系统
					keeperName: '' //保管责任人
				}
				if (result.data && result.data) {
					this.totals = result.data.total
					this.maintainDatas = result.data.list
					this.maintainDatas.forEach(item => {
						for (name in item) {
							if (item[name] == null) {
								item[name] = '--'
							}
						}
						if (item['vcMemo'] == '--') item.vcMemo = ''
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
			this.curIndex = curIndex
			this.searchItem()
		},
		handleSizeChange(pagesize) {
			this.pageSize = pagesize
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
			// console.log(this.forData.length);
			// return
			if (this.forData.length == 0) {
				this.$Message.info({
					content: '请点击列表信息!!!',
					duration: 3
				})
			} else {
				this.dialogVisible = true
			}
		},
		infoModal() {
			this.modalShow = true
		},
		rowClick(row) {
			// this.isCurrent = true
			// console.log(row)
			this.forData = row
		},
		comfir() {
			// this.forData = []
			this.dialogVisible = false
			// this.isCurrent = false
		},

		//导入弹框的逻辑
		exportInfo() {
			this.Daoshow = true
		},
		// 弹窗取消
		close() {
			this.Daoshow = false
			this.loadingStatus = false
			this.removeFile()
		},

		hClose() {
			this.dialogVisible = false
			// this.isCurrent = false
		},

		handleClose() {
			this.$refs.addFormRef.resetFields()
			this.dialogAddVisible = false
			this.addFormData.accountId = ''
			this.addFormData.vcName = ''
			this.addFormData.devTypeId = ''
			this.addFormData.subId = ''
			this.addFormData.num = ''
			this.addFormData.vcCode = ''
			this.addFormData.beginTime = ''
			this.addFormData.userId = ''
			this.addFormData.vcLocal = ''
			this.addFormData.vcMemo = ''
			this.addFormData.unitId = this.unitId
		},
		handleSelectionChange(val) {
			this.data = val
		},

		// 选择文件
		handleUpload(file) {
			// 添加文件
			this.file = file
			this.step = 1
			this.isFile = true
			return false
		},
		// 移除文件
		removeFile() {
			this.file = null
			this.step = 0
			this.isFile = false
			this.loadingStatus = false
		},

		// 上传提交
		upload() {
			// 点击上传
			if (this.isFile) {
				if (
					this.file.name.substring(this.file.name.length - 3) == 'xls' ||
					this.file.name.substring(this.file.name.length - 3) == 'XLS'
				) {
					this.loadingStatus = true
					this.step = 2
					let params = new FormData() // 创建form对象
					params.append('xfile', this.file) // 通过append向form对象添加数据
					params.append('unitID', this.$store.getters.unitId) // 添加变电站id
					// let config = {
					// 	header: { 'Content-Type': 'multipart/form-data' }
					// }
					this.$_api.devOps.importFile(params).then(res => {
						if (res.code == 200) {
							this.file = null
							this.loadingStatus = false
							this.$Message.success({ duration: 3, content: '文件导入成功' })
							this.Daoshow = false
							this.searchItem()
							this.step = 1
						} else {
							this.$Message.error(res.msg)
						}
					})
				} else {
					this.file = null
					this.isFile = false
					this.step = 0
					this.$Message.warning('请选择.xls格式的文件')
				}
			} else {
				this.$Message.warning('请选择需要导入的文件')
			}
		}
	}
}
</script>

<style lang="stylus" >
@import './input.css';
@import '~@/assets/style/component/index.styl';

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
      background: transparent;
      color: #fff;
      border: 1px solid #054598 !important;
      view-table('~@fire/assets/img/view-table/header.png');

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

      .edit-btn {
        background: url('~@fire/assets/img/seach_yellow.png') no-repeat !important;
        background-size: 100% 100% !important;
        border: none;
        color: #f6ce69 !important;
      }

      .edit-btn:hover {
        background: url('~@fire/assets/img/common/export-hover.png') no-repeat !important;
        background-size: 100% 100% !important;
      }

      .del-btn {
        background: url('~@fire/assets/img/common/del.png') no-repeat !important;
        background-size: 100% 100% !important;
        border: none;
        color: #fff !important;
      }

      .del-btn:hover {
        background: url('~@fire/assets/img/common/del-hover.png') no-repeat !important;
        background-size: 100% 100% !important;
      }

      .el-button {
        height: 30px;
        line-height: 6px;
        margin: 0 2.5px;
        background: transparent;
        border-color: #2d8cf0;
        color: #2d8cf0;
        position: relative;
        font-size: 16px;

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
        iview-page();
      }
    }
  }

  .el-row {
    left: 7%;
    font-size: 0.7rem;
    font-weight: bold;
    margin-bottom: 20px;
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

  /deep/ .el-input__inner {
    border-color: #fff;
    cursor: pointer;
  }

  .el-form--inline {
    .el-input {
      // width: 180px;
      /deep/ .el-input__inner {
        border: 1px solid #0d7ec5 !important;
        background: #081e4d;
        font-size: 16px;
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
    font-size: 18px;
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

      .el-pager {
        margin-top: 4px;
      }

      .btn-prev, .btn-next {
        border: 1px solid #0f3047;
        background-color: transparent;
        color: #444;
        cursor: pointer;
      }

      /deep/ .el-pager li {
        color: #2d8cf0 !important;
        background: transparent;
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
    width: 100px;
    font-size: 16px !important;
    background: url('~@fire/assets/img/seach_blue.png') no-repeat;
    background-size: 100% 100%;
    color: #45adf7;
    margin-left: 10px;
  }

  .blue-btn:hover {
    background: url('~@fire/assets/img/common/detail-hover.png') no-repeat !important;
    background-size: 100% 100% !important;
  }

  .import-btn {
    border: none;
    color: #F6CE69 !important;
    background: url('~@fire/assets/img/seach_red.png') no-repeat !important;
    background-size: 100% 100% !important;
  }

  .yellow-btn {
    border: none;
    width: 100px;
    color: #f6ce69 !important;
    font-size: 16px !important;
    background: url('~@fire/assets/img/seach_yellow.png') no-repeat !important;
    background-size: 100% 100% !important;
    margin-left: 10px;
  }

  .yellow-btn:hover {
    background: url('~@fire/assets/img/common/export-hover.png') no-repeat !important;
    background-size: 100% 100% !important;
  }

  .item-zt {
    width: 570px;
    padding-left: 240px;
  }

  .taining-button {
    float: right;
  }

  .taining-button button {
    font-size: 20px;
  }
}

/deep/ .el-picker-panel {
  background-color: #1A587F !important;
}

.el-table .cell {
  padding-left: 0;
}

.ivu-form .ivu-form-item-label {
  color: #fff !important;
}

.ivu-input {
  background-color: #081e4d !important;
  color: #fff;
}

.el-dialog__title {
  color: #fff;
}

.el-input__inner {
  background-color: #081e4d !important;
  color: #fff;
}

.add .el-input__prefix {
  top: 0 !important;
  left: 0 !important;
}

.ivu-modal-content {
  // height: 160px;
  // width: 480px;
  // left: 800px;
  // top: 200px;
}

.ivu-modal-content {
  // background-color: #081e4d!important;
}

.el-month-table td .cell {
  color: #fff;
}

.ivu-steps-item.ivu-steps-status-wait .ivu-steps-title {
  color: #fff !important;
}

.ivu-steps-horizontal .ivu-steps-content {
  color: #fff !important;
}

.ivu-btn {
  margin: 0 5px;
}

.ivu-upload-drag {
  background: none;
  color: #fff;
}

.upload-content {
  width: 100%;
  height: 100%;
  position: relative;

  .steps {
    margin-left: 100px;
    margin-bottom: 30px;
  }

  .up-box {
    margin-left: 50px;
    font-size: 16px;
    color: #fff;
    margin-top: 30px;

    span {
      font-size: 16px;
      margin-top: 10px;
      color: #fff;
      font-weight: 700;
      display: block;

      .del {
        float: left;
        display: inline-block;
        width: 30px;
        text-align: center;
        font-size: 18px;
        line-height: 100%;
        color: #2b85e4;
        cursor: pointer;

        &:hover {
          color: #ed4014;
        }
      }
    }
  }

  .btn1 {
    width: 400px;
    margin: 10px 10px 10px 50px;
  }
}

.ivu-modal-content {
  background: url('../../../assets/img/dialog.png') no-repeat !important;
  background-size: 100% 100% !important;
}

.ivu-modal-confirm-head-title {
  color: #fff;
}

.ivu-modal-confirm-body {
  color: #fff;
}

.ivu-btn-text {
  color: #fff;
}

.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span, .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner>.ivu-steps-icon {
  color: black !important;
}

.docFire .el-form--inline .el-select /deep/ .el-input__inner {
  width: 180px;
}

.docFire .el-form--inline .el-input /deep/ .el-input__inner {
  width: 180px;
}
</style>
