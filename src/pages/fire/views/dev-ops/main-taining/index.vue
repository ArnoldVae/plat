<template>
	<div class="mian-taining">
		<!-- 新增弹窗 -->
		<ElDialog
			style="left: 15vw; top:-4vh;text-align: center;"
			:visible.sync="dialogAddVisible"
			center
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
				<!-- 维保单位 -->
				<FormItem label="维保单位" prop="coName">
					<!-- <Input v-model="addFormData.coName" placeholder="请输入..." style="width: 370px" /> -->
					<el-select v-model="addFormData.coName" placeholder style="width: 370px">
						<el-option label="全部" value="nullValue"></el-option>
						<el-option
							v-for="item in maintenanceUnits"
							:key="item.mtcCoId"
							:label="item.vcFileFullName"
							:value="item.mtcCoId"
						></el-option>
					</el-select>
				</FormItem>
				<!-- 变电站 -->
				<!-- <FormItem label="变电站" prop="unitName">
					<Input v-model="addFormData.unitName" placeholder="请输入..." style="width: 370px" />
				</FormItem>-->
				<!-- 维护内容 -->
				<FormItem label="维护内容" prop="context">
					<Input type="textarea" v-model="addFormData.context" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 维保时间 -->
				<FormItem label="维保时间" prop="beginTime">
					<el-date-picker v-model="addFormData.beginTime" type="date" style="width: 370px;"></el-date-picker>
				</FormItem>
				<!-- 工作条件 -->
				<FormItem label="工作条件" prop="vc_PowerOffScene">
					<Input v-model="addFormData.vc_PowerOffScene" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 电压等级 -->
				<FormItem label="电压等级" prop="vc_PowerLevel">
					<Input v-model="addFormData.vc_PowerLevel" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 工作票号 -->
				<FormItem label="工作票号" prop="workTicketNum">
					<Input v-model="addFormData.workTicketNum" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 负责人 -->
				<FormItem label="负责人" prop="presetName">
					<Input v-model="addFormData.presetName" placeholder="请输入..." style="width: 370px" />
					<!-- <el-select v-model="addFormData.presetName" placeholder style="width: 370px">
						<el-option label="全部" value="nullValue"></el-option>
						<el-option
							v-for="item in presetName"
							:key="item.mtcCoId"
							:label="item.vcFileFullName"
							:value="item.mtcCoId"
						></el-option>
					</el-select> -->
				</FormItem>
				<!-- 联系电话 -->
				<FormItem label="联系电话" prop="telePhone">
					<Input v-model="addFormData.telePhone" placeholder="请输入..." style="width: 370px" />
				</FormItem>
				<!-- 当前状态 -->
				<!-- <FormItem label="当前状态" prop="status">
					<Input v-model="addFormData.status" placeholder="请输入..." style="width: 370px" />
				</FormItem> -->
			</Form>
			<span slot="footer" class="dialog-footer">
				<el-button class="blue-btn" type="text" @click="addInfo">确 定</el-button>
				<el-button class="yellow-btn" @click="handleClose" type="text">取 消</el-button>
			</span>
		</ElDialog>

		<el-form :inline="true" size="mini" :model="search">
			<el-form-item label="开始日期:" style="margin-right:25px">
				<el-date-picker
					v-model="search.starTime"
					@change="opoentime"
					value-format="timestamp"
					type="date"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="结束日期:" style="margin-right:25px">
				<el-date-picker
					v-model="search.endTime"
					@change="opoentime"
					value-format="timestamp"
					type="date"
				></el-date-picker>
			</el-form-item>
			<el-form-item label="时间段:" style="margin-right:25px">
				<el-select v-model="search.timeQuantum" @change="opoentimeB" placeholder>
					<el-option label="自定义" :value="nullValue"></el-option>
					<el-option label="三天内" value="threeDay"></el-option>
					<el-option label="本周" value="week"></el-option>
					<el-option label="本月" value="month"></el-option>
					<el-option label="本年" value="year"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="维保单位:" style="margin-right:25px">
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
				<!-- <el-button class="blue-btn" type="text" @click="showAdd(0,{})">新增</el-button> -->
				<el-button class="blue-btn" @click="dosearch" type="text">查找</el-button>
				<!-- <el-button class="blue-btn" v-if="!searchIS" @click="searchInfos" type="text">查找</el-button> -->
				<el-button class="yellow-btn" @click="leadTo" type="text">导入</el-button>
				<el-button class="yellow-btn" @click="exportInfo" type="text">导出</el-button>
			</el-form-item>
		</el-form>
		<!-- table -->
		<div class="table">
			<el-table :data="maintainData" style="width: 100%;" height="630" border>
				<el-table-column prop="coName" align="center" label="维保单位" width="90"></el-table-column>
				<el-table-column prop="unitName" align="center" label="变电站" width="130"></el-table-column>
				<el-table-column prop="context" align="center" label="维护内容" width="320" show-overflow-tooltip></el-table-column>
				<el-table-column prop="beginTime" align="center" label="维保时间" width="110"></el-table-column>
				<!-- <el-table-column prop="endTime" align="center" label="计划结束时间" width='130'></el-table-column> -->
				<el-table-column prop="vc_PowerOffScene" align="center" label="工作条件" width="100"></el-table-column>
				<el-table-column prop="vc_PowerLevel" align="center" label="电压等级" width="90"></el-table-column>
				<el-table-column prop="workTicketNum" align="center" label="工作票号" width="110"></el-table-column>
				<el-table-column prop="presetName" align="center" label="负责人" width="80"></el-table-column>
				<el-table-column prop="telePhone" align="center" label="联系电话" width="120"></el-table-column>
				<el-table-column prop="status" align="center" label="当前状态" width="90">
					<!-- <template slot-scope="scope">
						<span v-if="scope.row.status=='未执行'" style="color:red;">{{scope.row.status}}</span>
						<span v-if="scope.row.status=='正在执行'" style="color:green;">{{scope.row.status}}</span>
						<span v-if="scope.row.status=='已结束'" style="color:blue;">{{scope.row.status}}</span>
					</template>-->
				</el-table-column>
				<el-table-column label="操作" align="center" width="250">
					<template slot-scope="scope">
						<div>
							<el-button
								class="info-btn"
								@click="infoModals(scope.row)"
								size="mini"
								type="text"
								style="width:3.0rem;"
								:disabled="scope.row.status=='未执行'? true:false"
							>详情</el-button>
							<el-button
								class="info-btn"
								@click="recordModals(scope.row)"
								size="mini"
								type="text"
								style="width:3.0rem;"
							>记录</el-button>
							<!-- <el-button
								class="edit-btn"
								@click="showAdd(1,scope.row)"
								size="mini"
								type="text"
								style="width:3.0rem;"
							>编辑</el-button> -->
							<el-button
								class="del-btn"
								@click="removeInfo(1,scope.row)"
								size="mini"
								type="text"
								style="width:3.0rem;"
							>删除</el-button>
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
		<infoModal :dialogVisible="modalShow" :delitail="detileData" @handleClose="hClose" class="modals"></infoModal>

		<ocx-modal
			v-model="recordShow"
			:mask-closable="false"
			footer-hide
			:styles="{'text-align':'center','color': '#303133'}"
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

		<!-- 导入弹框 -->
		<!-- <el-dialog title="导入文件" :visible.sync="DaoShow" width="50%" class="Daoshow" :before-close="Close">
			<el-upload
				class="upload-demo"
				ref="upload"
				action="http://172.26.1.233:8085/xdq/file/wordToPdf"
				:on-remove="handleRemove"
				:auto-upload="false"
				:file-list="fileList"
			>
		<el-button size="small" type="primary">点击上传</el-button>-->
		<!-- <div slot="tip" class="el-upload__tip">只能上传elx格式文件</div> -->
		<!-- </el-upload>
		</el-dialog>-->

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
				<Button icon="md-cloud-download" type="success" size="large" @click="downloadTemplate" style="float:left">模板下载</Button>
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
import infoModal from '../dialog'
export default {
	name: 'mian-taining',
	components: { infoModal },
	data() {
		//手机号码自定义验证
		const validatePass = (rule, value, callback) => {
			let telephone = /^1[3456789]\d{9}$/
			if (telephone.test(value)) {
				return callback()
			} else {
				callback(new Error('请输入合法的手机号码'))
			}
		}

		return {
			//导入文件
			Daoshow: false,
			step: 0,
			file: null,
			loadingStatus: false,
			accept: '.xlsx',
			Format: ['.xlsx'],
			isAdd: true, // 判断新增还是修改 设置禁用
			modalTitle: '新增',
			//新增表单对象
			addFormData: {
				mtcPlanId: '',
				coName: '',
				context: '',
				beginTime: '',
				vc_PowerOffScene: '',
				vc_PowerLevel: '',
				workTicketNum: '',
				presetName: '',
				telePhone: '',
				status: '',
				unitId: this.$store.getters.unitId
			},
			dialogAddVisible: false,
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
			// 分页相关数据
			curIndex: 1,
			pageSize: 10,
			totals: 3,
			unitId: this.$store.getters.unitId,
			starTim: '',
			endTim: '',

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
				coName: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				],
				context: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				],
				// beginTime: [
				// 	{ required: true, message: '该项为必填项', trigger: 'blur' },
				// 	{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				// ],
				vc_PowerOffScene: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				],
				vc_PowerLevel: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				],
				workTicketNum: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				],
				presetName: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				],
				telePhone: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ validator: validatePass, trigger: 'blur' }
				],
				status: [
					{ required: true, message: '该项为必填项', trigger: 'blur' },
					{ pattern: /^.{0,100}$/, message: '最多输入100字', trigger: 'change' }
				]
			}
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
		},
		activeUnitId: {
			handler(val) {
				this.unitId = val
				this.searchInfo()
			}
		}
	},
	computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	},
	methods: {
		// 删除
		removeInfo(data, params) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除该数据?',
				onOk: () => {
					this.$_api.maintaining
						.delMainDate({ unitId: this.activeUnitId, mtcPlanId: params.mtcPlanId })
						.then(res => {
							if (res.code == 200) {
								this.$Message.success('删除成功')
								if ((this.totals - 1) % this.pageSize == 0) {
									this.curIndex -= 1
								}
								this.searchInfo()
							} else {
								this.$Message.warning(res.msg)
							}
						})
				},
				onCancel: () => {}
			})
		},
		// // 新增、修改确认
		// addInfo() {
		// 	let params = {}
		// 	if (this.isAdd) {
		// 		// 新增
		// 		this.$refs.addFormRef.validate(async valid => {
		// 			if (!valid) return
		// 			//验证成功，掉接口提交数据
		// 			params = JSON.parse(JSON.stringify(this.addFormData))
		// 			let res = await this.$_api.maintaining.addMainDate(params)
		// 			if (res.success) {
		// 				this.searchInfo()
		// 				this.modalAddShow = false
		// 			}
		// 		})
		// 	} else {
		// 		// 修改
		// 		this.$refs.addFormRef.validate(async valid => {
		// 			if (!valid) return
		// 			//验证成功，掉接口提交数据
		// 			params = JSON.parse(JSON.stringify(this.addFormData))
		// 			let res = await this.$_api.maintaining.addMainDate(params)
		// 			if (res.success) {
		// 				this.searchInfo()
		// 				this.modalAddShow = false
		// 			}
		// 		})
		// 	}
		// },
		// // 显示新增/修改弹框
		// showAdd(data, params) {
		// 	data == 0 ? (this.modalTitle = '新增') : (this.modalTitle = '修改')
		// 	data == 0 ? (this.isAdd = true) : (this.isAdd = false)
		// 	if (data == 1) {
		// 		this.addFormData = JSON.parse(JSON.stringify(params))
		// 	}
		// 	this.dialogAddVisible = true
		// },
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
			// console.log(curIndex)
		},
		opoentime() {
			this.searchIS = true
		},
		opoentimeB() {
			// this.searchIS = false
		},
		dosearch() {
			this.starTim = parseInt(this.search.starTime / 1000) == 0 ? '' : parseInt(this.search.starTime / 1000)
			this.endTim = parseInt(this.search.endTime / 1000) == 0 ? '' : parseInt(this.search.endTime / 1000)
			console.log(this.search.starTime)
			this.searchInfo()
		},
		async searchInfo() {
			let res = await this.$_api.maintaining.getfindPlanRecord({
				beginTime: this.starTim,
				endTime: this.endTim,
				mtcCoID: this.search.maintenanceUnit,
				iStatus: this.search.stute,
				pageSize: this.pageSize,
				currentPage: this.curIndex,
				unitId: this.unitId
			})
			if (res.code == '200') {
				this.totals = res.data.total
				this.maintainData = res.data.list
				// console.log(this.maintainData)
			} else {
				this.maintainData = []
			}
			// 重置页码为1
			this.$nextTick(() => {
				this.$refs['pages'].internalCurrentPage = 1
			})
		},
		//分页
		changePage(curIndex) {
			this.curIndex = curIndex
			this.searchInfo()
		},
		handleSizeChange(pagesize) {
			this.pageSize = pagesize
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

		//模板下载
		downloadTemplate() {

		},

		//导出
		exportInfo() {

		},

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
			// console.log(row)
			this.detileData = row.mtcPlanId
			this.modalShow = true
		},

		//导入弹框的逻辑
		leadTo() {
			this.Daoshow = true
		},
		// 弹窗取消
		close() {
			this.Daoshow = false
			this.loadingStatus = false
			this.removeFile()
		},

		hClose() {
			this.modalShow = false
		},

		handleClose() {
			this.$refs.addFormRef.resetFields()
			this.dialogAddVisible = false
			this.addFormData.coName = ''
			this.addFormData.context = ''
			this.addFormData.beginTime = ''
			this.addFormData.vc_PowerOffScene = ''
			this.addFormData.vc_PowerLevel = ''
			this.addFormData.workTicketNum = ''
			this.addFormData.presetName = ''
			this.addFormData.telePhone = ''
			this.addFormData.status = ''
			this.addFormData.unitId = this.unitId
		},
		recordModals(row) {
			// this.recordData = row.mtcPlanId
			this.fileDate = row.fileName
			// console.log(this.fileDate)
			console.log(row)
			this.recordShow = true
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
		//导出模板文件
		exportTemplate() {

		},
		// 上传提交
		upload() {
			// 点击上传
			if (this.isFile) {
				if (
					this.file.name.substring(this.file.name.length - 4) == 'xlsx' ||
					this.file.name.substring(this.file.name.length - 4) == 'XLSX'
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
					this.$Message.warning('请选择.xlsx格式的文件')
				}
			} else {
				this.$Message.warning('请选择需要导入的文件')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import './input.css';
@import '~@/assets/style/component/index.styl';

.mian-taining {
  // padding: 1.66667rem;
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
      height: calc(100% - 45px) !important;
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

      .info-btn {
        color: #45adf7;
        font-size: 16px;
        background: url('~@fire/assets/img/seach_blue.png') no-repeat!important;
        background-size: 100% 100%!important;
        border: none;
      }

      .info-btn:hover {
        background: url('~@fire/assets/img/common/detail-hover.png') no-repeat !important;
        background-size: 100% 100% !important;
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
        margin: 2.5px;
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
        border: 1px solid #0d7ec5 !important;
        font-size: 16px;
        background: #07225e;
      }
    }

    .el-select {
      /deep/.el-input__inner {
        border: 1px solid #0c4e75;
      }
    }
  }

  .el-input__prefix {
    right: 0;
    text-align: right;
    top: 3.5px !important;
    cursor: pointer;
  }

  .el-checkbox__label {
    color: #ffffff;
    font-size: 36PX;
  }

  /deep/.el-checkbox__inner {
    background: transparent;
    border: 1PX solid #0c4e75;
  }

  // 分页样式的修改
  /deep/ .pagination {
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
        border-color: #0d7ec5;
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
    color: #45adf7;
    width: 100px;
    font-size: 16px;
    background: url('~@fire/assets/img/seach_blue.png') no-repeat;
    background-size: 100% 100%;
  }

  .blue-btn:hover {
    background: url('~@fire/assets/img/common/detail-hover.png') no-repeat !important;
    background-size: 100% 100% !important;
  }

  .btnClick {
    color: #f6ce69;
  }

  .yellow-btn {
    width: 100px;
    color: #F6CE69;
    font-size: 16px;
    background: url('~@fire/assets/img/seach_yellow.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 10px;
  }

  .yellow-btn:hover {
    background: url('~@fire/assets/img/common/export-hover.png') no-repeat !important;
    background-size: 100% 100% !important;
  }

  .item-zt {
    .el-checkbox__label {
      font-size: 16px;
      color: #90d9ff;
    }
  }

  .taining-button {
    float: right;
    margin-right: 40px;
  }
}

/deep/.el-picker-panel {
  background-color: #1A587F !important;
}

/deep/.el-table__body-wrapper {
  margin-top: -20px;
}

/deep/ .ivu-modal {
  top: 1px !important;
  left: 0;
  width: 100% !important;
}

.ivu-modal-mask {
  top: -137px;
}

.iframeCal {
  left: 0 !important;
  height: 39.6rem;
  top: 0 !important;
}

.ivu-modal-content {
  // top: -122px;
  height: 39rem !important;
}

/deep/ .ivu-modal-wrap {
  height: 42rem !important;
  top: 2px;
  width: 99.6% !important;
}

.iframw-view {
  height: 930px !important;
}

/deep/ .el-table__body-wrapper {
  margin-top: 0 !important;
}

/deep/ .el-dialog {
  background: url('~@/assets/img/common/modal-bg.png') no-repeat;
  background-size: 100% 100%;
}

/deep/ .el-input__inner {
  border-color: #fff;
  cursor: pointer;
}

/deep/ .Daoshow {
  .el-dialog {
    height: 500px;
    border: none;
    background: url('../../../assets/img/dialog.png') no-repeat;
    background-size: 100% 100%;

    .el-dialog__header {
      text-align: center;
    }

    .el-dialog__title {
      color: #fff;
      font-size: 30px;
    }

    .el-dialog__close {
      font-size: 30px;
    }

    .el-upload__tip {
      color: #fff;
      font-size: 25px;
    }

    /deep/ .el-upload-list__item-name {
      color: #fff !important;
      font-size: 20px !important;
    }

    /deep/ .el-upload-list__item:hover {
      background: #054598;
    }
  }
}

/deep/ .el-icon-close {
  color: #fff;
}

/deep/ .el-dialog__headerbtn:hover .el-dialog__close {
  color: #fff;
}

/deep/ .el-dialog__wrapper {
  overflow: auto;
  // z-index: 2029
}

#dialogs {
  // overflow: auto;
  margin-top: 13px;
  height: 796px;
}

/deep/ .modals .el-dialog--center .el-dialog__body {
  padding: 0 1.1111rem;
  height: 763px;
  border: none !important;
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

// .ivu-btn-text {
// color: #fff;
// }
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

.ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner span, .ivu-steps-item.ivu-steps-status-wait .ivu-steps-head-inner>.ivu-steps-icon {
  color: black !important;
}

.import-btn {
  height: 32px;
  width: 61.17px;
  border: none;
  color: #F6CE69 !important;
  background: url('~@fire/assets/img/seach_red.png') no-repeat !important;
  background-size: 100% 100% !important;
}
</style>
