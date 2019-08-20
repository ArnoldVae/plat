<template>
	<div class="task-order">
		<ocx-modal v-model="selectTree" :width="1485"  footer-hide @on-cancel="closeAddTask" :styles="{top: '100px'}"><!-- ok-text="巡检成票" -->
			<!-- 左侧的树 -->
			<div class="main">
				<div class="left-content">
					<div class="select-type">
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
					</div>
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

					<div class="list-con" ref="list1">
						<div class="title">设备区域：</div>
						<div class="select">
							<el-checkbox
								:indeterminate="isdeviceAreaList"
								v-model="checkdeviceAreaListAll"
								@change="handleCheckAllDeviceAreaListChange"
							>全部</el-checkbox>
							<el-checkbox-group
                :style="{'height': h1,'overflow': overflow1}"
								v-model="checkedDeviceAreaList"
								@change="handleCheckedDeviceAreaListChange"
							>
								<el-checkbox v-for="item in deviceAreaList" :label="item" :key="item.id">{{ item.typeName }}</el-checkbox>
							</el-checkbox-group>
						</div>
            <span @click="handleShowMore1(val1)" ref="more1">展开更多</span>
					</div>
					<div class="list-con" ref="list2">
						<div class="title">设备类型：</div>
						<div class="select">
							<el-checkbox
								:indeterminate="isDeviceType"
								v-model="checkedDeviceTypeAll"
								@change="handleCheckDeviceTypeAllChange"
							>全部</el-checkbox>
							<el-checkbox-group v-model="checkedDeviceType" :style="{'height': h2,'overflow': overflow2}" @change="handleCheckedDeviceTypeChange">
								<el-checkbox
									v-for="item in deviceType"
									:label="item"
									:key="item.id"
									v-model="item.vcFlag"
								>{{ item.typeName }}</el-checkbox>
							</el-checkbox-group>
						</div>
            <span @click="handleShowMore2(val2)" ref="more2">展开更多</span>
					</div>
					<div class="list-con"  ref="list3">
						<div class="title">识别类型：</div>
						<div class="select">
							<el-checkbox
								:indeterminate="isRecognitionType"
								v-model="checkRecognitionTypeAll"
								@change="handleCheckAllRecognitionTypeChange"
							>全部</el-checkbox>
							<el-checkbox-group
               :style="{'height': h3,'overflow': overflow3}"
								v-model="checkedRecognitionType"
								@change="handleCheckedRecognitionTypeChange"
							>
								<el-checkbox
									v-for="item in recognitionType"
									:label="item"
									:key="item.id"
								>{{ item.typeName }}</el-checkbox>
							</el-checkbox-group>
						</div>
            <span @click="handleShowMore3(val3)" ref="more3">展开更多</span>
					</div>
					<div class="list-con" ref="list4">
						<div class="title">表计类型：</div>
						<div class="select">
							<el-checkbox
								:indeterminate="isMeterType"
								v-model="checkMeterTypeAll"
								@change="handleCheckAllMeterTypeChange"
							>全部</el-checkbox>
							<el-checkbox-group v-model="checkedMeterType" :style="{'height': h4,'overflow': overflow4}" @change="handleCheckedMeterTypeChange">
								<el-checkbox v-for="item in meterType" :label="item" :key="item.id">{{ item.typeName }}</el-checkbox>
							</el-checkbox-group>
						</div>
            <span @click="handleShowMore4(val4)" ref="more4">展开更多</span>
					</div>
					<div class="list-con" ref="list5">
						<div class="title">设备外观类型：</div>
						<div class="select">
							<el-checkbox
								:indeterminate="isAppearanceType"
								v-model="checkedAppearanceTypeAll"
								@change="handleCheckAppearanceTypeAllChange"
							>全部</el-checkbox>
							<el-checkbox-group
              :style="{'height': h5,'overflow': overflow5}"
								v-model="checkedAppearanceType"
								@change="handleCheckedAppearanceTypeChange"
							>
								<el-checkbox v-for="item in appearanceType" :label="item" :key="item.id">{{ item.typeName }}</el-checkbox>
							</el-checkbox-group>
						</div>
            <span @click="handleShowMore5(val5)" ref="more5">展开更多</span>
					</div>
				</div>
				<div class="right-tree">
					<!-- <el-filter-tree
            placeholder="输入关键字进行过滤"
            ref="elFilterTree"
            v-model="filterText"
            :data="treeData"
            show-checkbox
            :props="defaultProps"
            :filter-node-method="filterNode"
            highlight-current
            node-key="id"
					></el-filter-tree>-->
					<el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

					<el-tree
						class="filter-tree"
						:data="treeData"
						:props="defaultProps"
            show-checkbox
						:filter-node-method="filterNode"
						ref="tree"
					></el-tree>
				</div>
			</div>
      <div class="task-order-btn">
				<input type="button" value="巡检成票" class="btn" @click="inspectionAticketClick" />
				<input type="button" value="取消" class="btn cancel" @click="closeAddTask" />
			</div>
		</ocx-modal>
	</div>
</template>
<script>
export default {
  name: 'task-order',
  components: {},
  props: {},
  data() {
    return {
      selectTree: true,
      treeData: [],
      axios: this.$_api.monitorData,
      defaultProps: {
        children: 'children',
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
      h1: '30px',
      overflow1: 'hidden',
      h2: '30px',
      overflow2: 'hidden',
      h3: '30px',
      overflow3: 'hidden',
      h4: '30px',
      overflow4: 'hidden',
      h5: '30px',
      overflow5: 'hidden',
      val1: 0,
      val2: 0,
      val3: 0,
      val4: 0,
      val5: 0,
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
    }
  },
  computed: {},
  filters: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getDeviceType()
    this.$_api.getStaticData('./simulation-data/response.json').then(res => {
      // console.log(res, '11');
      this.treeData = res.data
    })
  },
  mounted() { },
  activited() { },
  update() { },
  beforeDestory() { },
  methods: {
    //关闭弹框
			closeAddTask() {
				this.$emit( 'closeAddTask' )
			},
			//点击巡检成票
			inspectionAticketClick() {
				this.$emit( 'inspectionAticketClick' )
			},
    handleShowMore1(value){
      if(value == 0){
        this.$refs.list1.style.height = '200px'
        this.h1 = '200px'
        this.overflow1 = 'auto'
        this.$refs.more1.innerHTML = '收起'
        this.val1 = 1
      }else if(value == 1){
        this.$refs.list1.style.height = '60px'
        this.h1 = '30px'
        this.overflow1 = 'hidden'
        this.$refs.more1.innerHTML = '展开更多'
        this.val1 = 0
      }
    },
    handleShowMore2(value){
      if(value == 0){
        this.$refs.list2.style.height = '200px'
        this.h2 = '200px'
        this.overflow2 = 'auto'
        this.$refs.more2.innerHTML = '收起'
        this.val2 = 1
      }else if(value == 1){
        this.$refs.list2.style.height = '60px'
        this.h2 = '30px'
        this.overflow2 = 'hidden'
        this.$refs.more2.innerHTML = '展开更多'
        this.val2 = 0
      }
    },
    handleShowMore3(value){
      if(value == 0){
        this.$refs.list3.style.height = '200px'
        this.h3 = '200px'
        this.overflow3 = 'auto'
        this.$refs.more3.innerHTML = '收起'
        this.val3 = 1
      }else if(value == 1){
        this.$refs.list3.style.height = '60px'
        this.h3 = '30px'
        this.overflow3 = 'hidden'
        this.$refs.more3.innerHTML = '展开更多'
        this.val3 = 0
      }
    },
    handleShowMore4(value){
      if(value == 0){
        this.$refs.list4.style.height = '200px'
        this.h4 = '200px'
        this.overflow4 = 'auto'
        this.$refs.more4.innerHTML = '收起'
        this.val4 = 1
      }else if(value == 1){
        this.$refs.list4.style.height = '60px'
        this.h4 = '30px'
        this.overflow4 = 'hidden'
        this.$refs.more4.innerHTML = '展开更多'
        this.val4 = 0
      }
    },
    handleShowMore5(value){
      if(value == 0){
        this.$refs.list5.style.height = '200px'
        this.h5 = '200px'
        this.overflow5 = 'auto'
        this.$refs.more5.innerHTML = '收起'
        this.val5 = 1
      }else if(value == 1){
        this.$refs.list5.style.height = '60px'
        this.h5 = '30px'
        this.overflow5 = 'hidden'
        this.$refs.more5.innerHTML = '展开更多'
        this.val5 = 0
      }
      
    },
    getDeviceType() {
      this.isMeterType = false,
      this.isRecognitionType = false,
      this.isdeviceAreaList = false,
      this.isDeviceType = false,
      this.isAppearanceType = false,
      this.checkedMeterType = [],
      this.checkedRecognitionType = [],
      this.checkedDeviceAreaList = [],
      this.checkedDeviceType = [],
      this.checkedAppearanceType = [],
      this.axios
        .getInspectionType({
          typeCode: this.typeCode,
          unitId: this.stationId
          // unitId: '192fe4cec3ec4d3fb81c0d05f82bde41'
        })
        .then(res => {
          //console.log(res.data, 'res')
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
    //过滤树节点数据
    filterNode(value, data) {
      if (!value) return true
      return data.text.indexOf(value) !== -1
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
    },
    //全选识别类型
    handleCheckAllRecognitionTypeChange(val) {
      this.checkedRecognitionType = val ? this.recognitionType : []
      this.isRecognitionType = false
      if (val == true) {
        this.selectRegType = this.recognitionType
      }
    },
    //全选设备区域
    handleCheckAllDeviceAreaListChange(val) {
      console.log(val, 'val')
      this.checkedDeviceAreaList = val ? this.deviceAreaList : []
      this.isdeviceAreaList = false
      if (val == true) {
        this.selectAreaList = this.deviceAreaList
      }
    },
    //全选设备类型
    handleCheckDeviceTypeAllChange(val) {
      this.checkedDeviceType = val ? this.deviceType : []
      this.isDeviceType = false
      if (val == true) {
        this.selectDevType = this.deviceType
      }
    },
    //全选设备外观类型
    handleCheckAppearanceTypeAllChange(val) {
      this.checkedAppearanceType = val ? this.appearanceType : []
      this.isAppearanceType = false
      if (val == true) {
        this.selectAppearanceType = this.appearanceType
      }
    },
    //选择设备外观类型
    handleCheckedAppearanceTypeChange(value) {
      console.log(value, '设备外观类型')
      let checkedCount = value.length
      this.checkedAppearanceTypeAll = checkedCount === this.appearanceType.length
      // this.isAppearanceType = checkedCount > 0 && checkedCount < this.appearanceType.length
      this.selectAppearanceType = value
    },
    //选择设备类型
    handleCheckedDeviceTypeChange(value) {
      console.log(value, '设备类型')
      let checkedCount = value.length
      this.checkedDeviceTypeAll = checkedCount === this.deviceType.length
      // this.isDeviceType = checkedCount > 0 && checkedCount < this.deviceType.length
      this.selectDevType = value
    },
    //选择设备区域
    handleCheckedDeviceAreaListChange(value) {
      console.log(value, '区域')
      let checkedCount = value.length
      this.checkdeviceAreaListAll = checkedCount === this.deviceAreaList.length
      // this.isdeviceAreaList = checkedCount > 0 && checkedCount < this.deviceAreaList.length
      this.selectAreaList = value
    },
    //选择表计类型
    handleCheckedMeterTypeChange(value) {
      console.log(value, '表计')
      let checkedCount = value.length
      this.checkMeterTypeAll = checkedCount === this.meterType.length
      // this.isMeterType = checkedCount > 0 && checkedCount < this.meterType.length
      this.selectMeterType = value
    },
    //选择识别类型
    handleCheckedRecognitionTypeChange(value) {
      console.log(value, '识别')
      let checkedCount = value.length
      this.checkRecognitionTypeAll = checkedCount === this.recognitionType.length
      // this.isRecognitionType = checkedCount > 0 && checkedCount < this.recognitionType.length
      this.selectRegType = value
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
<style lang='stylus' scoped>
.task-order {
}

.main {
  overflow: hidden;

  .left-content {
    float: left;
    width: 1040px;
    height: 500px;
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
      margin: 15px 0;
      height: 60px;
      width: 1010px;
      position: relative;

      .title {
        float: left;
        width: 145px;
        height: 30px;
        font-size: 18px;
        line-height: 30px;
        color: #8fd8fe;
        // margin: 20px 0 0 74px;
      }

      .select {
        position: absolute;
        float: left;
        width: 865px;
        // margin: -50px 0 0 140px;
        left: 150px;
        // top: -20px;

        /deep/.el-checkbox {
          float: left;
          margin-bottom: 20px;
          width: 212px;
        }

        /deep/.el-checkbox-group {
          float: left;
          margin-left: 117px;
          margin-top: -49px;
          height: 30px;
          overflow: hidden;
          width: 740px;
        }
      }

      /deep/.el-checkbox__label {
        font-size: 18px;
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
      background: #0d1841;
    }
  }

  .right-tree {
    float: left;
    width: 385px;
    margin-top: 30px;
    margin-left: 20px;

    /deep/.el-tree {
      height: 500px;
      width: 100%;
      overflow: auto;
      background: transparent;
		  color: #fff;

      /deep/.el-input{
        background: rgba(9,32,47,0.6);
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
        font-size: 18px;
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
					node-icon('~@/assets/img/common/station-icon.png')
				}
				.company {
					node-icon('~@/assets/img/common/company-icon.png')
				}
				.team {
					node-icon('~@/assets/img/common/team-icon.png')
				}
				.substation {
					node-icon('~@/assets/img/common/substation-icon.png')
				}
				.circuit {
					node-icon('~@/assets/img/common/circuit-icon.png')
				}
			}
		}
    }
  }
}
	.task-order-btn {
    /* float: right;
    margin: -30px 20px 0 0; */
		position: absolute;
		right: 50px;
		bottom: 30px;

    .btn {
      width: 100px;
      height: 30px;
      background: url('~@/assets/img/common/bg540.png') no-repeat;
      background-size: 100% 100%;
			border-radius: 3px;
      text-align: center;
      margin: 5px;
      cursor: pointer;
      border: 0;
      color: #d8c50e;
      font-size: 18px;
    }

    .cancel {
      color: #fff;
    }
  }

.el-tree-node:focus>.el-tree-node__content {
			background-color: #0757b1b3 !important;
			color: #fa0 !important;
		}

		.el-tree-node.is-current.is-focusable {
			.el-tree-node__content {
				background-color: #0757b1b3 !important;
				color: #fa0 !important;
			}
		}
    
   
</style>