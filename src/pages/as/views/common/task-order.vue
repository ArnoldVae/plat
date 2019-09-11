<template>
	<div class="task-order">
		<!-- 左侧的树 -->
		<div class="main">
			<div class="left-content">
				<div class="sub-type" v-show="form.inspection == 165">
					<el-form ref="subTypeForm" :model="specSubTypeForm" label-width="100px">
						<el-form-item label=" ">
							<el-radio-group v-model="specSubTypeForm.subType">
								<el-radio :label="item.id" v-for="item in espInspSubType" :key="item.id">
									{{ item.typeName }}
								</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>

				<div class="sub-type" v-show="form.inspection == 250">
					<el-form ref="subTypeForm" :model="espSubTypeForm" label-width="100px">
						<el-form-item label=" ">
							<el-radio-group v-model="espSubTypeForm.subType">
								<el-radio :label="item.id" v-for="item in specInspSubType" :key="item.id">{{
									item.typeName
								}}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
				<div class="list-con">
					<div class="title">设备区域：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isdeviceAreaList"
							v-model="checkdeviceAreaListAll"
							@change="handleCheckAllDeviceAreaListChange"
							>全部</el-checkbox
						>
						<el-checkbox-group v-model="checkedDeviceAreaList" @change="handleCheckedDeviceAreaListChange">
							<el-scrollbar style="height: 100%">
								<el-checkbox v-for="item in deviceAreaList" :label="item" :key="item.id">{{
									item.typeName
								}}</el-checkbox>
							</el-scrollbar>
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore1(val1)" v-if="deviceAreaList.length > 3">展开更多</span> -->
				</div>
				<div class="list-con">
					<div class="title">设备类型：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isDeviceType"
							v-model="checkedDeviceTypeAll"
							@change="handleCheckDeviceTypeAllChange"
							>全部</el-checkbox
						>
						<el-checkbox-group v-model="checkedDeviceType" @change="handleCheckedDeviceTypeChange">
							<!-- <el-scrollbar style="height: 100%"> -->
							<el-checkbox
								v-for="item in deviceType"
								:label="item"
								:key="item.id"
								v-model="item.vcFlag"
								>{{ item.typeName }}</el-checkbox
							>
							<!-- </el-scrollbar> -->
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore2(val2)" ref="more2" v-if="deviceType.length > 3">展开更多</span> -->
				</div>
				<div class="list-con">
					<div class="title">识别类型：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isRecognitionType"
							v-model="checkRecognitionTypeAll"
							@change="handleCheckAllRecognitionTypeChange"
							>全部</el-checkbox
						>
						<el-checkbox-group
							v-model="checkedRecognitionType"
							@change="handleCheckedRecognitionTypeChange"
						>
							<el-scrollbar style="height: 100%">
								<el-checkbox v-for="item in recognitionType" :label="item" :key="item.id">{{
									item.typeName
								}}</el-checkbox>
							</el-scrollbar>
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore3(val3)" ref="more3" v-if="recognitionType.length > 3">展开更多</span> -->
				</div>
				<div class="list-con">
					<div class="title">表计类型：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isMeterType"
							v-model="checkMeterTypeAll"
							@change="handleCheckAllMeterTypeChange"
							>全部</el-checkbox
						>
						<el-checkbox-group v-model="checkedMeterType" @change="handleCheckedMeterTypeChange">
							<el-scrollbar style="height: 100%">
								<el-checkbox v-for="item in meterType" :label="item" :key="item.id">{{
									item.typeName
								}}</el-checkbox>
							</el-scrollbar>
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore4(val4)" ref="more4" v-if="meterType.length > 3">展开更多</span> -->
				</div>
				<div class="list-con">
					<div class="title">设备外观类型：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isAppearanceType"
							v-model="checkedAppearanceTypeAll"
							@change="handleCheckAppearanceTypeAllChange"
							>全部</el-checkbox
						>
						<el-checkbox-group v-model="checkedAppearanceType" @change="handleCheckedAppearanceTypeChange">
							<el-scrollbar style="height: 100%">
								<el-checkbox v-for="item in appearanceType" :label="item" :key="item.id">{{
									item.typeName
								}}</el-checkbox>
							</el-scrollbar>
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore5(val5)" ref="more5" v-if="appearanceType.length > 3">展开更多</span> -->
				</div>
			</div>
			<div
				class="right-tree"
				v-loading="loading"
				element-loading-text="正在加载树"
				element-loading-background="#0a2e63"
			>
				<el-input placeholder="输入关键字进行过滤" v-model="filterText">
					<el-button slot="append" icon="el-icon-search" @click="filterByKeyWord"></el-button>
				</el-input>

				<div class="tree-wrap">
					<ul :id="ztreeId" ref="ztree" class="ztree"></ul>
				</div>
			</div>
		</div>
		<div class="task-order-btn">
			<input type="button" value="巡检成票" class="btn" @click="inspectionAticketClick" />
			<input type="button" value="取消" class="btn cancel" @click="closeAddTask" />
		</div>
		<!-- </ocx-modal> -->
	</div>
</template>
<script>
// import ztree from 'vue-giant-tree'
import '@ztree/ztree_v3/js/jquery.ztree.core.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.excheck.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.exhide.min.js'
import '@ztree/ztree_v3/demo/js/fuzzysearch'
import '@ztree/ztree_v3/css/metroStyle/metroStyle.css'
export default {
	name: 'task-order',
	props: {
		selectTreeShow: {
			type: Boolean
		}
	},
	data() {
		return {
			selectTree: true,
			treeData: [],
			treeDataStr: '',
			treeSelectKeys: [],
			axios: this.$_api.monitorData,
			defaultProps: {
				// children: 'children',
				label: 'text'
			},
			filterText: '',
			//巡检类型
			form: {
				inspection: '70100001'
			},
			//专项巡检子类型
			specSubTypeForm: {
				subType: '1'
			},
			//特殊巡检子类型
			espSubTypeForm: {
				subType: '1'
			},
			inspectionType: [],
			specInspSubType: [], //专项巡检子类型表
			espInspSubType: [], //特殊巡检子类型表
			deviceAreaList: [], //设备区域表
			deviceType: [], //设备类型表
			recognitionType: [], //识别类型表
			meterType: [], //表计类型
			appearanceType: [], //设备外观类型
			checkMeterTypeAll: false, //表计全选
			checkRecognitionTypeAll: false, //识别类型全选
			checkdeviceAreaListAll: false, //设备区域全选
			checkedDeviceTypeAll: false, //设备类型全选
			checkedAppearanceTypeAll: false, //设备外观类型全选
			checkedMeterType: [], //默认选中表计类型
			checkedRecognitionType: [], //默认选中识别类型
			checkedDeviceAreaList: [], //默认选中设备区域
			checkedDeviceType: [], //默认选中设备类型
			checkedAppearanceType: [], //默认选中设备外观类型

			isMeterType: false,
			isRecognitionType: false,
			isdeviceAreaList: false,
			isDeviceType: false,
			isAppearanceType: false,

			//选中的数据
			selectAreaList: [], //设备区域
			selectDevType: [], //设备类型
			selectRegType: [], //识别类型
			selectAppearanceType: [], //外观类型
			selectMeterType: [], //表计类型

			transmitArr: [],

			checkedNodes: [], //勾选的树数据

			loading: true,
			stationId: this.$store.getters.stationId,

			//zTree
			setting: {
				check: {
					enable: true
					// autoCheckTrigger: true
				},
				data: {
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'pid'
					}
				},
				view: {
					expandSpeed: 'fast',
					showIcon: false
				}
			},
			ztreeObj: null,
			ztreeId: '',
			isFilter: false,
			hiddenNodes: [],
		}
	},
	computed: {},
	filters: {},
	watch: {
		// filterText(){
		// 	this.filterByKeyWord();
		// }
	},
	created() {
		this.getDeviceType()
		this.getZtreeId()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		_forEach: function(data, isTrue, callback) {
			var arr = []
			for (var i = 0; i < data.length; i++) {
				arr.push(data[i])
			}
			while (arr.length) {
				var _p = arr.shift()
				if (callback(_p) == false) {
					return
				}
				if (isTrue && _p.children) {
					for (var j = _p.children.length - 1; j >= 0; j--) {
						arr.unshift(_p.children[j])
					}
				}
			}
		},
		//获取随机的ztree ID
		getZtreeId() {
			let Num = Date.now()
			this.ztreeId = 'ztree' + '_' + Num
		},
		//重新渲染树
		// applyTreeData() {
		// 	console.log( 789 )
		// 	this.treeData = JSON.parse(this.treeDataStr);
		// },
		//勾选树节点
		handleCheckChange() {
			this.checkedNodes = []
			let res = this.$refs.tree.getCheckedNodes()
			this.checkedNodes = res
		},
		//关闭弹框
		closeAddTask() {
			this.transmitArr = []
			this.$emit('closeAddTask')
		},
		//点击巡检成票
		inspectionAticketClick() {
			let nodesArr = []

			//获取选中的节点
			let checkNodes = this.ztreeObj.getCheckedNodes(true)
			checkNodes.map(item => {
				if (item.type === 4) {
					nodesArr.push(item.id)
				}
			})
			if( nodesArr.length == 0 ) {
				this.$ocxModal.warning({
				  title: '提示',
				  content: '<p>请选择测点</p>'
				})
			}else {
				this.$emit('inspectionAticketClick', nodesArr)
			}
			
		},
		//新增任务右侧树
		//(java接口)
		getStaticTreeData(area, devType, regType, meterType, appearanceType, selectStr) {
			this.isFilter = false
			if (this.treeData.length > 0 && !selectStr) {
				return
			} else if (this.treeData.length == 0 && !selectStr) {
				this.axios
					.getAddTaskTreeData({
						unitId: this.stationId,
						codeStr: area || [],
						devTypeId: devType || [],
						recogTypeId: regType || [],
						meterTypeId: meterType || [],
						surfaceTypeId: appearanceType || []
					})
					.then(res => {
						if (res.code == 200) {
							this.loading = false
							this.treeData = res.data
							$.fn.zTree.init($(this.$refs.ztree), this.setting, res.data)
							this.ztreeObj = $.fn.zTree.getZTreeObj(this.ztreeId)
						}
					})
					.catch(err => {
						console.log(err)
					})
			} else if (selectStr) {
				this.axios
					.getAddTaskTreeData({
						unitId: this.stationId,
						codeStr: area || [],
						devTypeId: devType || [],
						recogTypeId: regType || [],
						meterTypeId: meterType || [],
						surfaceTypeId: appearanceType || []
					})
					.then(res => {
						if (res.code == 200) {
							this.loading = false
							this.treeData = res.data
							$.fn.zTree.init($(this.$refs.ztree), this.setting, res.data)
							this.ztreeObj = $.fn.zTree.getZTreeObj(this.ztreeId)

							//标识为过滤用
							// this.isFilter = true

							//当前使用过滤时，需要选中节点
							// if( area.length !== this.deviceAreaList.length && area.length > 0 ) {
							// 	this.ztreeObj.checkAllNodes(true)
							// }else if( this.checkdeviceAreaListAll ) {
							// 	this.ztreeObj.checkAllNodes(true)
							// }
							// this.ztreeObj.checkAllNodes(true)
							if(area.length === 0 && this.selectAreaList.length === 0 && devType.length === 0 && regType.length === 0 && meterType.length === 0 && appearanceType.length ===0){
								
							}else{
								this.ztreeObj.checkAllNodes(true)
							}

							//展开区域一级
							//let areaNodes = this.ztreeObj.getNodeByParam('type', 1, null)
							let areaNodes = this.ztreeObj.getNodesByFilter( (node)=>{
								if(node.vcCode != null){
									node.vcCode = node.vcCode.split('.')
									if( this.checkdeviceAreaListAll || area.length === this.deviceAreaList.length || area.length === 0 ) {
										return node.pid === "0"
									}else if( !this.checkdeviceAreaListAll && area ){
										return node.vcCode.length <= 3 && node.type === 1
									}
								}
							})
							areaNodes.map(item => {
								this.ztreeObj.expandNode(item, true, false, false)
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},

		//（net接口）
		/* getStaticTreeData(area, devType, regType, meterType, appearanceType, selectStr) {
			//console.log( this.treeData.length )
			this.isFilter = false
			if (this.treeData.length > 0 && !selectStr) {
				return
			} else if (this.treeData.length == 0 && !selectStr) {
				this.axios
					.getZtreeData({
						unitId: this.stationId,
						isThread: true,
						Ischildren: false,
						vc_Code: area,
						DevTypeID: devType,
						RecogType: regType,
						MeterType: meterType,
						SurfaceType: appearanceType
					})
					.then(res => {
						if (res.success) {
							this.loading = false
							this.treeData = res.data
							$.fn.zTree.init($('#ztree'), this.setting, res.data)
							this.ztreeObj = $.fn.zTree.getZTreeObj('ztree')
						}
					})
					.catch(err => {
						console.log(err)
					})
			} else if (selectStr) {
				this.axios
					.getZtreeData({
						unitId: this.stationId,
						isThread: true,
						Ischildren: false,
						vc_Code: area,
						DevTypeID: devType,
						RecogType: regType,
						MeterType: meterType,
						SurfaceType: appearanceType
					})
					.then(res => {
						if (res.success) {
							this.loading = false
							this.treeData = res.data
							$.fn.zTree.init($('#ztree'), this.setting, res.data)
							this.ztreeObj = $.fn.zTree.getZTreeObj('ztree')

							//标识为过滤用
							// this.isFilter = true

							//当前使用过滤时，需要选中节点
							this.ztreeObj.checkAllNodes(true)

							//展开区域一级
							let areaNodes = this.ztreeObj.getNodesByParam('type', 1, null)
							areaNodes.map(item => {
								this.ztreeObj.expandNode(item, true, false, false)
							})
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		}, */
		getDeviceType() {
			this.isMeterType = false
			this.isRecognitionType = false
			this.isdeviceAreaList = false
			this.isDeviceType = false
			this.isAppearanceType = false
			this.checkedMeterType = []
			this.checkedRecognitionType = []
			this.checkedDeviceAreaList = []
			this.checkedDeviceType = []
			this.checkedAppearanceType = []
			this.axios
				.getInspectionType({
					typeCode: this.typeCode,
					unitId: this.stationId
				})
				.then(res => {
					var data = res.data
					if (res.code == 200) {
						this.inspectionType = data.asType1List
						this.espInspSubType = data.asType1List3
						this.specInspSubType = data.asType1List2
						this.deviceAreaList = data.asDevAreaList
						this.meterType = data.asMeterType1List
						this.recognitionType = data.asDiscernTypeList
						this.deviceType = data.asDevTypeList
						this.appearanceType = data.asOutwardList
						this.deviceAreaList.map(item => {
							if (item.vcFlag) {
								this.checkedDeviceAreaList.push(item)
							}
						})
						if (this.checkedDeviceAreaList.length == data.asDevAreaList.length) {
							this.checkdeviceAreaListAll = true
						} else {
							this.checkdeviceAreaListAll = false
						}
						this.deviceType.map(item => {
							if (item.vcFlag) {
								this.checkedDeviceType.push(item)
							}
						})
						if (this.checkedDeviceType.length == data.asDevTypeList.length) {
							this.checkedDeviceTypeAll = true
						} else {
							this.checkedDeviceTypeAll = false
						}
						this.recognitionType.map(item => {
							if (item.vcFlag) {
								this.checkedRecognitionType.push(item)
							}
						})
						if (this.checkedRecognitionType.length == data.asDiscernTypeList.length) {
							this.checkRecognitionTypeAll = true
						} else {
							this.checkRecognitionTypeAll = false
						}
						this.meterType.map(item => {
							if (item.vcFlag) {
								this.checkedMeterType.push(item)
							}
						})
						if (this.checkedMeterType.length == data.asMeterType1List.length) {
							this.checkMeterTypeAll = true
						} else {
							this.checkMeterTypeAll = false
						}
						this.appearanceType.map(item => {
							if (item.vcFlag) {
								this.checkedAppearanceType.push(item)
							}
						})
						if (this.checkedAppearanceType.length == data.asOutwardList.length) {
							this.checkedAppearanceTypeAll = true
						} else {
							this.checkedAppearanceTypeAll = false
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
		},

		//选择巡检类型
		handleSelectInspType(val) {
			this.typeCode = val
			this.getDeviceType()
		},
		//全选表计类型
		handleCheckAllMeterTypeChange(val) {
			this.checkedMeterType = val ? this.meterType : []
			this.isMeterType = false
			if (val == true) {
				this.selectMeterType = this.meterType
			}

			this.filterByCondition2()
		},
		//全选识别类型
		handleCheckAllRecognitionTypeChange(val) {
			this.checkedRecognitionType = val ? this.recognitionType : []
			this.isRecognitionType = false
			if (val == true) {
				this.selectRegType = this.recognitionType
			}
			this.filterByCondition2()
		},
		//全选设备区域
		handleCheckAllDeviceAreaListChange(val) {
			this.checkedDeviceAreaList = val ? this.deviceAreaList : []
			this.isdeviceAreaList = false
			if (val == true) {
				this.selectAreaList = this.deviceAreaList
			}else{
				this.selectAreaList = [];
			}
			this.filterByCondition2()
		},
		//全选设备类型
		handleCheckDeviceTypeAllChange(val) {
			this.checkedDeviceType = val ? this.deviceType : []
			this.isDeviceType = false
			if (val == true) {
				this.selectDevType = this.deviceType
			}
			this.filterByCondition2()
		},
		//全选设备外观类型
		handleCheckAppearanceTypeAllChange(val) {
			this.checkedAppearanceType = val ? this.appearanceType : []
			this.isAppearanceType = false
			if (val == true) {
				this.selectAppearanceType = this.appearanceType
			}

			this.filterByCondition2()
		},
		//选择设备外观类型
		handleCheckedAppearanceTypeChange(value) {
			let checkedCount = value.length
			this.checkedAppearanceTypeAll = checkedCount === this.appearanceType.length
			// this.isAppearanceType = checkedCount > 0 && checkedCount < this.appearanceType.length
			this.selectAppearanceType = value

			this.filterByCondition2()
		},
		//选择设备类型
		handleCheckedDeviceTypeChange(value) {
			let checkedCount = value.length
			this.checkedDeviceTypeAll = checkedCount === this.deviceType.length
			// this.isDeviceType = checkedCount > 0 && checkedCount < this.deviceType.length
			this.selectDevType = value
			//console.log(value)
			this.filterByCondition2()
		},
		//选择设备区域
		handleCheckedDeviceAreaListChange(value) {
			let checkedCount = value.length
			this.checkdeviceAreaListAll = checkedCount === this.deviceAreaList.length
			this.selectAreaList = value
			this.filterByCondition2()
		},
		//选择表计类型
		handleCheckedMeterTypeChange(value) {
			let checkedCount = value.length
			this.checkMeterTypeAll = checkedCount === this.meterType.length
			// this.isMeterType = checkedCount > 0 && checkedCount < this.meterType.length
			this.selectMeterType = value

			this.filterByCondition2()
		},
		//选择识别类型
		handleCheckedRecognitionTypeChange(value) {
			let checkedCount = value.length
			this.checkRecognitionTypeAll = checkedCount === this.recognitionType.length
			// this.isRecognitionType = checkedCount > 0 && checkedCount < this.recognitionType.length
			this.selectRegType = value

			this.filterByCondition2()
		},
		clearFilter() {
			this.checkedDeviceAreaList = []
			this.checkedMeterType = []
			this.checkedRecognitionType = []
			this.checkedDeviceType = []
			this.checkedAppearanceType = []
			this.checkdeviceAreaListAll = false
			this.checkMeterTypeAll = false
			this.checkRecognitionTypeAll = false
			this.checkedAppearanceTypeAll = false
			this.checkedDeviceTypeAll = false
			this.selectAreaList = []
			this.selectDevType = []
			this.selectRegType = []
			this.selectAppearanceType = []
			this.selectMeterType = []
		},
		filterByCondition2() {
			//调用接口进行树节点过滤
			this.loading = true
			//区域
			//let area = ''
			let area = []
			if( this.checkdeviceAreaListAll ) {
				area = []
			} else{
				this.selectAreaList.map(item => {
					//area += item.vcCode + ','
					area.push(item.vcCode)
				})
				//area = area.substring(0, area.length - 1)
			}
			

			//设备类型
			//let deviceType = ''
			let deviceType = []
			this.selectDevType.map(item => {
				//deviceType += item.typeCode + ','
				deviceType.push(item.typeCode)
			})
			//deviceType = deviceType.substring(0, deviceType.length - 1)

			//识别类型
			//let regType = ''
			let regType = []
			this.selectRegType.map(item => {
				//regType += item.typeCode + ','
				regType.push(item.typeCode)
			})
			//regType = regType.substring(0, regType.length - 1)

			//表计类型
			//let meterType = ''
			let meterType = []
			this.selectMeterType.map(item => {
				//meterType += item.typeCode + ','
				meterType.push(item.typeCode)
			})
			//meterType = meterType.substring(0, meterType.length - 1)

			//设备外观类型
			//let appearanceType = ''
			let appearanceType = []
			this.selectAppearanceType.map(item => {
				//appearanceType += item.typeCode + ','
				appearanceType.push(item.typeCode)
			})
			//appearanceType = appearanceType.substring(0, appearanceType.length - 1)
			this.getStaticTreeData(area, deviceType, regType, meterType, appearanceType, true)
		},
		filterByKeyWord() {
			this.loading = true
			setTimeout(() => {
				let nodes = this.ztreeObj.getNodesByFilter(this.filterFun)
				this.processShowNodes(nodes)
			}, 1000)
		},	
		filterFun(node) {
			var nameKey = this.ztreeObj.setting.data.key.name // get the key of the node name
			if (
				this.filterText.length === 0 ||
				(node[nameKey] && node[nameKey].toLowerCase().indexOf(this.filterText.toLowerCase()) != -1)
			) {
				this.ztreeObj.showNode(node) // show node with matching keywords
				return true // return true and show this node
			}

			this.ztreeObj.hideNode(node)
			return false
		},
		processShowNodes(nodes) {
			if (this.filterText.length > 0) {
				$.each(nodes, (n, obj) => {
					let pathOfOne = obj.getPath()
					if (pathOfOne && pathOfOne.length > 0) {
						// i < pathOfOne.length-1 process every node in path except self
						for (var i = 0; i < pathOfOne.length - 1; i++) {
							this.ztreeObj.showNode(pathOfOne[i]) // show node
							// if (pathOfOne[i].level === 0) {
							// 	this.ztreeObj.expandNode(pathOfOne[i], true, false, false) //expand node
							// }

							//当筛选点数小于200时，展开所有节点
							if(nodes.lenth <= 200){
								this.ztreeObj.expandNode(pathOfOne[i], true, false, false)
							}else if(nodes.length > 200 && nodes.length <= 500 && pathOfOne[i].level === 1){	//200-500时，只展开树等级为1的节点
								this.ztreeObj.expandNode(pathOfOne[i], true, false, false)
							}else if(pathOfOne[i].level === 0){	
								this.ztreeObj.expandNode(pathOfOne[i], true, false, false)
							}
						}
					}
				})
			} else {
				var rootNodes = this.ztreeObj.getNodesByParam('level', '0') // get all root nodes
				$.each(rootNodes, (n, obj) => {
					this.ztreeObj.expandNode(obj, true) // expand all root nodes
				})
			}
			this.loading = false
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
.task-order {
}

.main {
  overflow: hidden;
  /* height: 620px; */
  background: #082053;

  .left-content {
    float: left;
    /* width: 1060px; */
    width: 1420px;
    /* height: 740px; */
    overflow: auto;
	margin-left: 10px;

    .select-type {
      width: 100%;
      height: 60px;
      background: #0c1b3b;
      // margin-left: 50px;
      margin-top: 15px;

      /deep/.el-form {
        margin-left: 25px;
      }

      /deep/.el-form-item__label, .el-radio {
        font: 100 18px / 60px '';
        color: #35a2ff;
      }

      /deep/.el-radio__label {
        font-size: 18px;
      }

      /deep/.el-form-item__label {
        font-size: 18px;
      }
    }

    .sub-type {
      width: 1462px;
      height: 40px;
      background: #0c1b3b;
      margin-left: 52px;

      /deep/.el-form-item__label, .el-radio {
        font: 100 20px / 40px '';
        color: #35a2ff;
      }
    }

    .list-con {
      /* height: 140px; */
      width: 1415px;
      margin: 5px 5px 5px 0;
     /* position: relative; */
      background: #063e7a;
      padding-left: 15px;
      padding-top: 10px;

      .title {
        /* float: left; */
        width: 130px;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        color: #fff;
		display: inline-block;
		vertical-align: top;
      }

      .select {
        /* position: absolute; */
       /* float: left; */
        width: 1225px;
        /* left: 150px; */
		display: inline-block;

        /deep/.el-checkbox {
          float: left;
          margin-bottom: 14px;
          width: 164px;

          /deep/.el-checkbox__inner {
            background: none;
            border: 2px solid #409eff;
            width: 16px;
            height: 16px;
          }


          /deep/.el-checkbox__inner::after {
            /* border-color: #c4c335; */
           /* width: 3px; */
			   border: 2px solid #c4c335;
			   box-sizing: content-box;
			   content: "";
			   border-left: 0;
			   border-top: 0;
			   height: 7px;
			   left: 4px;
			   position: absolute;
			   top: 1px;
			   width: 3px;
          }
        }

        /deep/.el-checkbox-group {
          float: left;
          margin-left: 80px;
          margin-top: -45px;
          height: 100%;
          overflow: auto;
          width: 1168px;
        }
      }

      /deep/.el-checkbox__label {
        font-size: 16px;
        line-height: 30px;
        color: #8fd8fe;
      }

      span {
        position: absolute;
        left: 935px;
        color: #0f0;
        font-size: 18px;
        cursor: pointer;
      }
    }

    .list-con:nth-child(odd) {
      background: #082053;
    }
  }

  .right-tree {
    float: right;
    width: 325px;
    height: 590px;
    margin-top: 20px;
    margin-right: 10px;
    background: url('../../assets/img/common/tree.png') no-repeat;
    background-size: 100% 100%;

	/deep/ .tree-wrap{
		margin-top: 10px;
		height: 90.5% !important;
	}

	/deep/.el-input{
		width: calc(100% - 20px);
		margin: 10px 0 0 10px;

		/deep/.el-input__inner{
			border: 0;
		}

	}

    /deep/ .ztree {
      li {
        line-height: 40px;

        a {
          height: 40px;
          line-height: 40px;
          color: #8fd8fe;
          background: none;
          text-decoration: none;

          span {
            font-size: 16px !important;
          }
        }
      }

      .button.chk {
        width: 16px;
        height: 16px;
        border: 2px solid #409eff;
        background: none;
      }
    }

    .tree-wrap {
      height: 100%;
      overflow: auto;
      padding: 0 10px;
    }
  }
}

// ztree相关样式的覆盖
/deep/ .ztree li span.button.chk.checkbox_false_full_focus {
  cursor: pointer;
}

/deep/ .ztree li span.button.chk.checkbox_true_full, /deep/ .ztree li span.button.chk.checkbox_true_full_focus, /deep/ .ztree li span.button.chk.checkbox_true_part, /deep/.ztree li span.button.checkbox_true_part_focus {
  background: url('../../assets/img/common/dui1.png') no-repeat center !important;
  background-size: 80% 65% !important;
  cursor: pointer;
}

/deep/ .ztree li span.button.root_close, /deep/ .ztree li span.button.roots_close, /deep/ .ztree li span.button.center_close, /deep/ .ztree li span.button.bottom_close {
  background: url('../../assets/img/common/arrow.png') no-repeat center !important;
}

/deep/ .ztree li span.button.root_open, /deep/ .ztree li span.button.roots_open, /deep/ .ztree li span.button.center_open, /deep/ .ztree li span.button.bottom_open {
  background: url('../../assets/img/common/arrow.png') no-repeat center !important;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

/deep/ .el-input-group__append{
	background-color: #17579a;
	border-color:#17579a;

	i{
		color:#fff;
	}
}

.task-order-btn {
  /* float: right;
  margin: -30px 20px 0 0; */
  width: 100%;
  height: 50px;
  position: relative;
  background: #063e7a;
  padding: 11px 0 25px 0;
  border-radius: 0 0 10px 10px;
  bottom: -10px;

  .btn {
    width: 100px;
    height: 30px;
    background: url('~@/assets/img/common/bg540.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 3px;
    text-align: center;
    margin-left: 15px;
    cursor: pointer;
    border: 0;
    color: #fff;
    font-size: 16px;
	float: right;
  }

	.btn:active{
		color: #d8c50e;
	}

	.btn:nth-of-type(1){
		margin-right: 15px;
	}

}


.el-tree-node:focus>.el-tree-node__content {
  background-color: #0757b1b3 !important;

  .el-tree-node__label {
    color: #fa0 !important;
  }
}

.el-tree-node.is-current.is-focusable {
  .el-tree-node__content {
    background-color: #0757b1b3 !important;
    color: #fa0 !important;
  }
}

/deep/ .el-scrollbar {
  /deep/ .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
}

/deep/ .el-scrollbar__wrap {
  overflow-y: scroll !important;
}

/deep/ .el-scrollbar__thumb {
  background-color: #2cbfdf !important;

  &:hover {
    background-color: #2cbfdf !important;
  }
}

/deep/ .el-scrollbar__view {
  display: flex;
  flex-wrap: wrap;
}

/deep/.el-scrollbar__bar.is-vertical {
  opacity: 1;
}

/deep/.ztree .button.bottom_close:before, /deep/.ztree .button.bottom_open:before, /deep/.ztree .button.center_close:before, /deep/.ztree .button.center_open:before, /deep/.ztree .button.noline_close:before, /deep/.ztree .button.noline_open:before, /deep/.ztree .button.root_close:before, /deep/.ztree .button.root_open:before, /deep/.ztree .button.roots_close:before, /deep/.ztree .button.roots_open:before {
  border-color: transparent transparent transparent #fff;
}

::-webkit-scrollbar{
	width:10px;
	height:10px;
}

 ::-webkit-scrollbar-thumb{
	background-color:#0173bb;
}
</style>
