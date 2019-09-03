<template>
	<div class="task-order">
		<!-- <ocx-modal v-model="selectTree" :width="1485"  footer-hide @on-cancel="closeAddTask" :styles="{top: '100px'}"> -->
		<!-- 左侧的树 -->
		<div class="main">
			<div class="left-content">
				<!-- <div class="select-type">
						<el-form ref="form" :model="form" label-width="130px">
							<el-form-item label="巡检类型">
								<el-radio-group v-model="form.inspection" @change="handleSelectInspType">
									<el-radio :label="item.typeCode" v-for="item in inspectionType" :key="item.id">
										{{
										item.typeName
										}}
									</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-form>
				</div>-->
				<div class="sub-type" v-show="form.inspection == 165">
					<el-form ref="subTypeForm" :model="specSubTypeForm" label-width="100px">
						<el-form-item label=" ">
							<el-radio-group v-model="specSubTypeForm.subType">
								<el-radio :label="item.id" v-for="item in espInspSubType" :key="item.id">
									{{
									item.typeName
									}}
								</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>

				<div class="sub-type" v-show="form.inspection == 250">
					<el-form ref="subTypeForm" :model="espSubTypeForm" label-width="100px">
						<el-form-item label=" ">
							<el-radio-group v-model="espSubTypeForm.subType">
								<el-radio
									:label="item.id"
									v-for="item in specInspSubType"
									:key="item.id"
								>{{ item.typeName }}</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>
				<div class="list-con" style="height:100px;">
					<div class="title">设备区域：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isdeviceAreaList"
							v-model="checkdeviceAreaListAll"
							@change="handleCheckAllDeviceAreaListChange"
						>全部</el-checkbox>
						<el-checkbox-group
							v-model="checkedDeviceAreaList"
							@change="handleCheckedDeviceAreaListChange"
						>
							<el-scrollbar style="height: 100%">
								<el-checkbox v-for="item in deviceAreaList" :label="item" :key="item.id">{{ item.typeName }}</el-checkbox>
							</el-scrollbar>
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore1(val1)" v-if="deviceAreaList.length > 3">展开更多</span> -->
				</div>
				<div class="list-con" style="height:220px;">
					<div class="title">设备类型：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isDeviceType"
							v-model="checkedDeviceTypeAll"
							@change="handleCheckDeviceTypeAllChange"
						>全部</el-checkbox>
						<el-checkbox-group v-model="checkedDeviceType" @change="handleCheckedDeviceTypeChange">
							<!-- <el-scrollbar style="height: 100%"> -->
								<el-checkbox
									v-for="item in deviceType"
									:label="item"
									:key="item.id"
									v-model="item.vcFlag"
								>{{ item.typeName }}</el-checkbox>
							<!-- </el-scrollbar> -->
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore2(val2)" ref="more2" v-if="deviceType.length > 3">展开更多</span> -->
				</div>
				<div class="list-con" style="height:50px;">
					<div class="title">识别类型：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isRecognitionType"
							v-model="checkRecognitionTypeAll"
							@change="handleCheckAllRecognitionTypeChange"
						>全部</el-checkbox>
						<el-checkbox-group
							v-model="checkedRecognitionType"
							@change="handleCheckedRecognitionTypeChange"
						>
							<el-scrollbar style="height: 100%">
								<el-checkbox
									v-for="item in recognitionType"
									:label="item"
									:key="item.id"
								>{{ item.typeName }}</el-checkbox>
							</el-scrollbar>
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore3(val3)" ref="more3" v-if="recognitionType.length > 3">展开更多</span> -->
				</div>
				<div class="list-con" style="height:100px;">
					<div class="title">表计类型：</div>
					<div class="select">
						<el-checkbox
							:indeterminate="isMeterType"
							v-model="checkMeterTypeAll"
							@change="handleCheckAllMeterTypeChange"
						>全部</el-checkbox>
						<el-checkbox-group v-model="checkedMeterType" @change="handleCheckedMeterTypeChange">
							<el-scrollbar style="height: 100%">
								<el-checkbox v-for="item in meterType" :label="item" :key="item.id">{{ item.typeName }}</el-checkbox>
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
						>全部</el-checkbox>
						<el-checkbox-group
							v-model="checkedAppearanceType"
							@change="handleCheckedAppearanceTypeChange"
						>
							<el-scrollbar style="height: 100%">
								<el-checkbox v-for="item in appearanceType" :label="item" :key="item.id">{{ item.typeName }}</el-checkbox>
							</el-scrollbar>
						</el-checkbox-group>
					</div>
					<!-- <span @click="handleShowMore5(val5)" ref="more5" v-if="appearanceType.length > 3">展开更多</span> -->
				</div>
			</div>
			<div class="right-tree">
				<!-- <el-input placeholder="输入关键字进行过滤" @change="filterByKeyWord" v-model="filterText"></el-input> -->

				<div
					class="tree-wrap"
					v-loading="loading"
					element-loading-text="正在加载树"
					element-loading-background="#0a2e63"
				>
					<ztree ref="tree" :nodes="treeData" :setting="setting" @onCreated="handleCreated" />
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
import ztree from 'vue-giant-tree'
export default {
	name: 'task-order',
	components: {
		ztree
	},
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
					expandSpeed: 'fast'
				}
			},
			ztreeObj: null,
			isFilter: false,
			hiddenNodes: []
		}
	},
	computed: {},
	filters: {},
	watch: {
		// filterText(val) {
		// 	this.$refs.tree.filter(val)
		// },
		// treeData() {
		// 	this.handleCheckChange()
		// }
	},
	created() {
		//console.log('init')
		this.getDeviceType()
		//this.getStaticTreeData()
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
			//this.clearFilter()
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

			this.$emit('inspectionAticketClick', nodesArr)
		},
		getStaticTreeData(area, devType, regType, meterType, appearanceType, selectStr) {
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

							//标识为过滤用
							this.isFilter = true
							// console.log(1);
							//this.treeDataStr = JSON.stringify(res.data)
							// let arr = []
							// this.treeData.forEach(item => {
							// 	arr.push(item.id)
							// })
							// this.$refs.tree.setCheckedKeys(arr)
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		},
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
			// this.isdeviceAreaList = checkedCount > 0 && checkedCount < this.deviceAreaList.length
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
			let area = ''
			this.selectAreaList.map(item => {
				area += item.vcCode + ','
			})
			area = area.substring(0, area.length - 1)

			//设备类型
			let deviceType = ''
			this.selectDevType.map(item => {
				// deviceType.push(item.typeCode)
				deviceType += item.typeCode + ','
			})
			deviceType = deviceType.substring(0, deviceType.length - 1)

			//识别类型
			let regType = ''
			this.selectRegType.map(item => {
				regType += item.typeCode + ','
			})
			regType = regType.substring(0, regType.length - 1)

			//表计类型
			let meterType = ''
			this.selectMeterType.map(item => {
				meterType += item.typeCode + ','
			})
			meterType = meterType.substring(0, meterType.length - 1)

			//设备外观类型
			let appearanceType = ''
			this.selectAppearanceType.map(item => {
				appearanceType += item.typeCode + ','
			})
			appearanceType = appearanceType.substring(0, appearanceType.length - 1)

			this.getStaticTreeData(area, deviceType, regType, meterType, appearanceType, true)
		},
		handleCreated(ztreeObj) {
			//ztree初始化加载

			this.ztreeObj = ztreeObj
			if (this.isFilter) {
				//当前使用过滤时，需要选中节点
				this.ztreeObj.checkAllNodes(true)

				//展开区域一级
				let areaNodes = this.ztreeObj.getNodesByParam('type', 1, null)
				areaNodes.map(item => {
					this.ztreeObj.expandNode(item, true, false, false)
				})
			}
		},
		// filterFunc(node){
		// 	var _keywords=$("#keyword").val();
		// 	if(node.isParent||node.name.indexOf(_keywords)!=-1) return false;
		// 	return true;
		// };
		filterByKeyWord() {
			let nodes = this.ztreeObj.getNodesByFilter(node => {
				return node.name.indexOf(this.filterText) == -1
			})
			// console.log(nodes);
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
<style lang='stylus' scoped>
.task-order {
}

.main {
  overflow: hidden;
  height: 600px;
  background: #082053;

  .left-content {
    float: left;
    /* width: 1060px; */
    width: 1400px;
    height: 740px;
    overflow: auto;

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
      height: 140px;
      width: 1415px;
      margin: 5px;
      position: relative;
      background: #063e7a;
      padding-left: 15px;
      padding-top: 10px;

      .title {
        float: left;
        width: 130px;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        color: #fff;
      }

      .select {
        position: absolute;
        float: left;
        width: 1225px;
        left: 150px;

        /deep/.el-checkbox {
          float: left;
          margin-bottom: 14px;
          width: 164px;

          /deep/.el-checkbox__inner {
            background: none;
            border: 2px solid #409eff;
            width: 20px;
            height: 20px;
          }

          /deep/.el-checkbox__inner::after {
            border-color: yellow;
            width: 6px;
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
    float: left;
    width: 325px;
    height: 550px;
    margin-top: 20px;
    margin-left: 20px;
    background: url('../../assets/img/common/tree.png') no-repeat;
    background-size: 100% 100%;

    /deep/.el-tree {
      height: 630px;
      width: 100%;
      overflow: auto;
      background: transparent;
      color: #fff;
      margin-top: 5px;

      /deep/.el-input {
        background: rgba(9, 32, 47, 0.6);
      }

      .el-tree-node__content {
        height: 50px;
        background: none;

        &:hover {
          background-color: #0757b1b3 !important;
          color: #fa0 !important;
        }

        &:active {
          background-color: #0757b1b3 !important;
          color: #fa0 !important;
        }

        .el-tree-node__label {
          font-size: 20px;
          color: #8fd8fe;
        }

        .custom-tree-node {
          node-icon(img-url) {
            display: inline-block;
            width: 17px;
            height: 17px;
            background: url(img-url) no-repeat;
            background-size: 17px 17px;
            position: relative;
            top: 3px;
            margin-right: 3px;
          }

          .station {
            node-icon('~@/assets/img/common/station-icon.png');
          }

          .company {
            node-icon('~@/assets/img/common/company-icon.png');
          }

          .team {
            node-icon('~@/assets/img/common/team-icon.png');
          }

          .substation {
            node-icon('~@/assets/img/common/substation-icon.png');
          }

          .circuit {
            node-icon('~@/assets/img/common/circuit-icon.png');
          }
        }
      }
    }

    /deep/ .ztree {
      li a {
        height: 40px;
        line-height: 40px;
        color: #8fd8fe;
        font-size: 16px;
        background: none;
      }

      .button.chk {
        width: 20px;
        height: 20px;
        background: none;
        border: 2px solid #409eff;
      }

      .button.chk.checkbox_true_full:after {
        position: absolute;
        top: 1px;
        left: 4px;
        width: 7px;
        height: 11px;
        border-right: 3px solid yellow;
        border-bottom: 3px solid yellow;
      }

      .line:before {
        border: none;
      }
    }

    .tree-wrap {
      height: 100%;
      overflow: auto;
      padding: 0 10px;
    }
  }
}

/deep/.ztree .button.checkbox_true_part:after, /deep/.ztree .button.checkbox_true_part_focus:after {
  top: 6px;
  left: 3px;
  width: 10px;
  height: 1px;
  border-color: yellow;
  -webkit-transform: rotate(0deg) scale(1);
  /* transform: rotate(0deg) scale(1); */
  border-right: 0;
}

/deep/.button.chk.checkbox_true_full_focus:after {
  position: absolute;
  top: 1px;
  left: 4px;
  width: 7px;
  height: 11px;
  border-right: 3px solid yellow;
  border-bottom: 3px solid yellow;
  transform: rotate(45deg);
}

/deep/.ztree .center_docu:after, /deep/.ztree .center_docu:before, /deep/.ztree .bottom_docu:before, /deep/.ztree .bottom_docu:after {
  border: none;
}

.task-order-btn {
  /* float: right;
  margin: -30px 20px 0 0; */
  widht: 100%;
  height: 50px;
  position: relative;
  background: #063e7a;
  padding: 22px 0 50px 0;
  border-radius: 0 0 10px 10px;

  // right: 50px;
  // bottom: 30px;
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
    color: #d8c50e;
    font-size: 18px;
  }

  .cancel {
    color: #fff;
  }
}

.task-order-btn .btn:nth-of-type(1) {
  margin-left: 1415px;
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
</style>