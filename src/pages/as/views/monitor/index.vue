<template>
  <div class="monitor">
    <!-- 头部 -->
    <div class="monitor-top">
      <!-- 左边 -->
      <div class="monitor-left">
        <el-filter-tree
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          ref="elFilterTree"
          :data="unitTreeData"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          highlight-current
          @node-click="handleClickNode"
        ></el-filter-tree>
      </div>
      <!-- 右边 -->
      <div class="monitor-right">
        <div class="right-top">
          <!-- 巡检图 -->
          <div class="nInspection">
            <span>
              当前巡检区域：
              <i @click="handleDeviceSelected">请选择巡检区域</i>
            </span>
          </div>
          <div class="inspection-map">
            <Tabs :animated="false" type="card" @on-click="handelTabCkick">
              <!-- <Tab-pane label="室内巡检图"> -->
              <div class="entity">
                <monitorCurrent :unitId="stationId"></monitorCurrent>
              </div>
              <!-- </Tab-pane> -->
              <!-- <Tab-pane label="场地巡检图">
								<div class="entity">
									<monitorCurrent :unitId='stationId'></monitorCurrent>
								</div>
              </Tab-pane>-->
            </Tabs>
          </div>
          <!-- 视频 -->
          <div class="video">
            <div class="videoTitle">
              <span
                v-for="(item, index) in tableList"
                :key="index"
                :class="tabIdx === index ? 'spanActive' : ''"
                @click="selectTab(item, index)"
              >{{ item.vcName }}</span>
            </div>
            <div class="videoBox">
              <!-- 边角 -->
              <div class="border-lt"></div>
              <div class="border-rb"></div>
              <div class="video1">
                <cvideo :videoConfig="video1"></cvideo>
              </div>
              <div class="video2">
                <cvideo :videoConfig="video2"></cvideo>
              </div>
            </div>
          </div>
        </div>
        <div class="right-bottom">
          <!-- 底部tab切换 -->
          <div class="tab-bar">
            <Tabs :animated="false" type="card">
              <!-- 实时信息 -->
              <Tab-pane label="实时信息">
                <div class="list-content">
                  <el-table
                    :data="realTimeInfo"
                    style="width: 100%"
                    height="160"
                    :row-style="tableRowStyle"
                    :header-cell-style="tableHeaderColor"
                  >
                    <el-table-column prop="time" label="时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="name" label="点位" align="center" width="180"></el-table-column>
                    <el-table-column prop="address" align="center" label="数据来源"></el-table-column>
                    <el-table-column prop="address" align="center" label="识别结果"></el-table-column>
                    <el-table-column prop="alarmlevel" align="center" label="报警等级"></el-table-column>
                    <el-table-column align="center" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          class="operation"
                          @click="handleTimeInfoModal(scope.row)"
                          type="text"
                          size="small"
                        >查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
              <!-- 实时报警 -->
              <Tab-pane label="实时报警">
                <div class="list-content">
                  <el-table
                    :data="tableData"
                    style="width: 100%"
                    height="160"
                    :row-style="tableRowStyle"
                    :header-cell-style="tableHeaderColor"
                  >
                    <el-table-column prop="date" label="时间" align="center" width="180"></el-table-column>
                    <el-table-column prop="name" label="点位" align="center" width="180"></el-table-column>
                    <el-table-column prop="address" align="center" label="数据来源"></el-table-column>
                    <el-table-column prop="address" align="center" label="识别结果"></el-table-column>
                    <el-table-column prop="address" align="center" label="报警等级"></el-table-column>
                    <el-table-column align="center" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          class="operation"
                          @click="handleAlarmModal(scope.row)"
                          type="text"
                          size="small"
                        >查看</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </Tab-pane>
            </Tabs>
          </div>
          <div class="env">
            <!-- 站端环境 -->
            <div class="station-env">
              <p>站端环境</p>
              <div class="content">
                <i></i>
                温度：
                <span>{{ temperature }}℃</span>
              </div>
              <div class="content">
                <i></i>
                湿度：
                <span>{{ humidity }}%</span>
              </div>
              <div class="content">
                <i></i>
                风速：
                <span>{{ windSpeed }}m/s</span>
              </div>
            </div>
            <!-- 机器人状态 -->
            <div class="robot-status">
              <p>设备运行状态</p>
              <div class="content">
                <i></i>
                <p>室外机器人：</p>
                <span>运行</span>
              </div>
              <div class="content">
                <i></i>
                <p>室内机器人：</p>
                <span>运行</span>
              </div>
              <div class="content">
                <i></i>
                <p>轨道机器人：</p>
                <span>运行</span>
              </div>
              <div class="content">
                <i></i>
                <p>高清视频：</p>
                <span>运行</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="monitor-bottom">
      <statistics></statistics>
    </div>
    <!-- 报警模态框 -->
    <ocx-modal title="Title" v-model="alarmRecordFlag" :width="1600" :mask-closable="false">
      <!-- 报警详情 -->
      <div class="alarm-detail">
        <!-- 详细信息 -->
        <div class="detail-info">
          <div class="datawrap">
            <span class="name">
              <i></i>运维班
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>变电站
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>区域
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>间隔
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>设备
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>设备小类
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>部位
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>识别类型
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>标记类型
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>发热类型
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>巡检结果
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>数据来源
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>报告级别
            </span>
            <span class="content">殷巷运维班</span>
          </div>
          <div class="datawrap">
            <span class="name">
              <i></i>报告类型
            </span>
            <span class="content">殷巷运维班</span>
          </div>
        </div>
        <div class="map-video">
          <div class="video"></div>
          <div class="map">
            <div class="map-content">
              <div class="chart" ref="chart2"></div>
            </div>
            <div class="modal-btn-group">
              <div class="btn">历史数据</div>
              <div class="btn">确认报警</div>
              <div class="btn">误报</div>
              <div class="btn">跟踪</div>
            </div>
          </div>
        </div>
      </div>
    </ocx-modal>

    <!-- 实时信息详情弹框 -->
    <ocx-modal v-model="timeInfoFlag" :width="1600" :mask-closable="false">
      <div class="time-info">
        <div class="modal-img">
          <img class="img-content" src alt />
        </div>
      </div>
      <div class="line-map">
        <div class="chart" ref="chart1"></div>
      </div>
    </ocx-modal>

    <!-- 选择设备弹框 -->
    <ocx-modal v-model="selectDeviceFlag" :width="1600" :mask-closable="false" footer-hide>
      <div class="inspection-type">
        <div class="select-type">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="巡检类型">
              <el-radio-group v-model="form.inspection" @change="handleSelectInspType">
                <el-radio
                  :label="item.typeCode"
                  v-for="item in inspectionType"
                  :key="item.id"
                >{{item.typeName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="sub-type" v-show="form.inspection == 165">
          <el-form ref="subTypeForm" :model="specSubTypeForm" label-width="100px">
            <el-form-item label=" ">
              <el-radio-group v-model="specSubTypeForm.subType">
                <el-radio
                  :label="item.id"
                  v-for="item in espInspSubType"
                  :key="item.id"
                >{{item.typeName}}</el-radio>
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
                >{{item.typeName}}</el-radio>
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
            >全部</el-checkbox>
            <el-checkbox-group
              v-model="checkedDeviceAreaList"
              @change="handleCheckedDeviceAreaListChange"
            >
              <el-checkbox
                v-for="item in deviceAreaList"
                :label="item"
                :key="item.id"
              >{{item.typeName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="list-con">
          <div class="title">设备类型：</div>
          <div class="select">
            <el-checkbox
              :indeterminate="isDeviceType"
              v-model="checkedDeviceTypeAll"
              @change="handleCheckDeviceTypeAllChange"
            >全部</el-checkbox>
            <el-checkbox-group v-model="checkedDeviceType" @change="handleCheckedDeviceTypeChange">
              <el-checkbox v-for="item in deviceType" :label="item" :key="item.id" v-model="item.vcFlag">{{item.typeName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="list-con">
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
              <el-checkbox
                v-for="item in recognitionType"
                :label="item"
                :key="item.id"
              >{{item.typeName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="list-con">
          <div class="title">表计类型：</div>
          <div class="select">
            <el-checkbox
              :indeterminate="isMeterType"
              v-model="checkMeterTypeAll"
              @change="handleCheckAllMeterTypeChange"
            >全部</el-checkbox>
            <el-checkbox-group v-model="checkedMeterType" @change="handleCheckedMeterTypeChange">
              <el-checkbox v-for="item in meterType" :label="item" :key="item.id">{{item.typeName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="list-con">
          <div class="title">设备外观类型：</div>
          <div class="select">
            <el-checkbox
              :indeterminate="isAppearanceType"
              v-model="checkedAppearanceTypeAll"
              @change="handleCheckAppearanceTypeAllChange"
            >全部</el-checkbox>
            <el-checkbox-group v-model="checkedAppearanceType" @change="handleCheckedAppearanceTypeChange">
              <el-checkbox
                v-for="item in appearanceType"
                :label="item"
                :key="item.id"

              >{{item.typeName}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="type-bottom">
          <!-- <div class="selected-num">
            当前已选择：
            <span></span>个测点
          </div> -->
          <div class="task-order">
            <input type="button" value="巡检成票" class="btn" @click="inspectionAticketClick" />
            <input type="button" value="取消" class="btn" @click="cancel" />
          </div>
        </div>
      </div>
    </ocx-modal>

    <!-- 巡检成票 -->
    <ocx-modal
      v-model="inspectionAticket"
      :width="1600"
      :mask-closable="false"
      footer-hide
      @on-cancel="closeInspectionTicket"
    >
      <div class="inspectionTicket">
        <el-table
          :data="inspectionAticketData"
          max-height="600"
          :span-method="objectSpanMethod"
          :header-cell-style="{ background: '#161d38', color: '#3299ff' }"
        >
          <el-table-column prop="area" label="区域" align="center"></el-table-column>
          <el-table-column prop="interval" label="子区域" align="center"></el-table-column>
          <el-table-column prop="devTitle" label="设备" align="center"></el-table-column>
          <el-table-column prop="dian" label="巡检点位" align="center"></el-table-column>
          <el-table-column label="室外机器人" align="center" width="122">
            <template slot-scope="scope">
              <img
                src="../../assets/img/common/dui.png"
                alt
                style="width: 15px;height: 15px;"
                v-show="scope.row.outR"
              />
            </template>
          </el-table-column>
          <el-table-column label="高清视频" align="center" width="120">
            <template slot-scope="scope">
              <img
                src="../../assets/img/common/dui.png"
                alt
                style="width: 15px;height: 15px;"
                v-show="scope.row.video"
              />
            </template>
          </el-table-column>
          <el-table-column label="室内机器人" align="center" width="122">
            <template slot-scope="scope">
              <img
                src="../../assets/img/common/dui.png"
                alt
                style="width: 15px;height: 15px;"
                v-show="scope.row.doorR"
              />
            </template>
          </el-table-column>
          <el-table-column label="智辅系统" align="center" width="120">
            <template slot-scope="scope">
              <img
                src="../../assets/img/common/dui.png"
                alt
                style="width: 15px;height: 15px;"
                v-show="scope.row.zhifu"
              />
            </template>
          </el-table-column>
          <el-table-column label="无人机" align="center" width="120">
            <template slot-scope="scope">
              <img
                src="../../assets/img/common/dui.png"
                alt
                style="width: 15px;height: 15px;"
                v-show="scope.row.wuren"
              />
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部 按钮 -->
        <div class="modalFooterBtn">
          <input type="button" value="执行任务" class="btn" @click='executeTaskClick' />
          <input type="button" value="取消" class="btn" @click='closeInspectionTicket' />
        </div>
      </div>
    </ocx-modal>
  </div>
</template>
<script>
import cvideo from '@/components/native/video/OcxVideo'
import { debuglog } from 'util'
import monitorCurrent from '../common/monitor-current.vue'
import moment from 'moment'
export default {
  name: 'monitor',
  props: {},
  data() {
    return {
      checkMeterTypeAll: false,//表计全选
      checkRecognitionTypeAll: false,//识别类型全选
      checkdeviceAreaListAll: false,//设备区域全选
      checkedDeviceTypeAll: false,//设备类型全选
      checkedAppearanceTypeAll: false,//设备外观类型全选
      checkedMeterType: [],//默认选中表计类型
      checkedRecognitionType: [],//默认选中识别类型
      checkedDeviceAreaList: [],//默认选中设备区域
      checkedDeviceType: [],//默认选中设备类型
      checkedAppearanceType: [],//默认选中设备外观类型

      isIndeterminate: true,
      isMeterType: true,
      isRecognitionType: true,
      isdeviceAreaList: true,
      isDeviceType: true,
      isAppearanceType: true,

      axios: this.$_api.monitorData,
      // 任务相关
      currentTaskInfo: null, // 当前活动的 任务
      typeTaskList: [], // 类型列表
      areaTaskList: [
        {
          AreaID: '19f279a9d206423dad8cdb724f32026e',
          ParentAreaID: '0',
          StationID: '42389edde72d41f4bcd978b574eefbae',
          SvgID: null,
          T3DID: null,
          i_AreaMainType: 150001,
          i_AreaType: null,
          i_Flag: null,
          i_PowerLevel: null,
          i_SortID: 1,
          i_SubsystemID: null,
          vc_Code: null,
          vc_Memo: null,
          vc_Name: '1号主变设备区'
        },
        {
          AreaID: '833039f918e744389468b61670599b13',
          ParentAreaID: '0',
          StationID: '42389edde72d41f4bcd978b574eefbae',
          SvgID: null,
          T3DID: null,
          i_AreaMainType: 150001,
          i_AreaType: null,
          i_Flag: null,
          i_PowerLevel: null,
          i_SortID: 2,
          i_SubsystemID: null,
          vc_Code: null,
          vc_Memo: null,
          vc_Name: '2号主变设备区'
        },
        {
          AreaID: '51a0f2f8ae3b4ef0b3c2291b486829fc',
          ParentAreaID: '0',
          StationID: '42389edde72d41f4bcd978b574eefbae',
          SvgID: null,
          T3DID: null,
          i_AreaMainType: 150001,
          i_AreaType: null,
          i_Flag: null,
          i_PowerLevel: null,
          i_SortID: 3,
          i_SubsystemID: null,
          vc_Code: null,
          vc_Memo: null,
          vc_Name: '3号主变设备区'
        }
      ], // 区域列表
      delTaskConfimShow: false,
      topicArr: ['qif/xj/app/data/'],
      topicStr: '',
      msg: '',
      alarmRecordFlag: false, //实时报警弹框开关
      timeInfoFlag: false, //实时信息弹框开关
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      realTimeInfo: [], //实时信息列表
      // 保存stationId
      stationId: '',
      // 视频tab头
      tabIdx: -1,
      typeCode: '',
      tableList: [],
      tabFirstData: [],
      inspectionType: [],
      specInspSubType: [],//专项巡检子类型表
      espInspSubType: [],//特殊巡检子类型表
      deviceAreaList: [],//设备区域表
      deviceType: [],//设备类型表
      recognitionType: [],//识别类型表
      meterType: [],//表计类型
      appearanceType: [],//设备外观类型

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

      video1: {
        deviceInfo: '',
        isAutoPlay: true,
        serviceInfo: '',
        hideTool: true
      },
      video2: {
        deviceInfo: '',
        isAutoPlay: true,
        serviceInfo: '',
        hideTool: true
      },
      areaInspectionList: [], //巡检区域数据
      inspectionTypeList: [], //巡检类型数据
      specialIns: [],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            },
            triggerTooltip: {}
          }
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2019.7.11', '2019.7.12', '2019.7.13', '2019.7.14', '2019.7.15', '2019.7.16', '2019.7.17'],
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: '#2d3650'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [
          {
            data: [1, 3, 4, 3, 3, 1, 7],
            type: 'line',
            areaStyle: {},
            symbol: 'none',
            areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
            lineStyle: { normal: { color: '#04a3ff' } } //折线颜色
          }
        ]
      },
      unitTreeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      filterText: '',
      temperature: '', //温度
      humidity: '', //湿度
      windSpeed: '', //风速
      selectDeviceFlag: false,//选择设备弹框开关 
      inspectionAticket: false, //巡检成票弹框开关
      inspectionAticketData: [//巡检成票表格数据
        { area: '某区域', interval: '某间隔', devTitle: '1号主变A避雷器', dian: '1', outR: true, video: false, doorR: false, zhifu: false, wuren: false },
        { area: '某区域', interval: '某间隔', devTitle: '1号主变A避雷器', dian: '2', outR: true, video: false, doorR: false, zhifu: false, wuren: false },
        { area: '某区域', interval: '某间隔', devTitle: '1号主变A避雷器', dian: '3', outR: true, video: false, doorR: false, zhifu: false, wuren: false },
      ]

    }
  },
  computed: {},
  filters: {},
  watch: {
    filterText(val) {
      this.$refs.elFilterTree.$refs['el-tree'].filter(val)
    }
  },
  components: {
    cvideo,
    monitorCurrent
  },
  created() {
    this.stationId = this.$route.params.stationId
    this.topicStr = this.topicArr[0] + this.stationId
    this.getTabs()
    this.selectTab(this.tabFirstData, 0)
    this.findAsAreaData()
    this.getNuitTreeData()
    this.getStationInfo()
    this.getDeviceType()
  },
  mounted() {
    //console.log(this.$route.params.stationId) //变电站id
    let _this = this
    _this.subscribe(_this.topicStr)
    this.$_mqtt.on('message', function (topic, message, packet) {
      let data = ''
      let dataObj = []
      dataObj = message
      //转码
      dataObj.forEach(item => {
        data += String.fromCharCode(item)
      })
      if (topic == _this.topicStr) {
        let msgData = JSON.parse(data)
        if (msgData.cmd == 2001) {
          msgData.time = moment(msgData.time * 1000).format('YYYY-MM-DD hh:mm:ss')
          _this.realTimeInfo.unshift(msgData)
          console.log(_this.realTimeInfo, 'timeinfo')
          // 如果长度超过一百 就删除最初的一个数据
          if (_this.realTimeInfo.length > 100) {
            _this.realTimeInfo.shift()
          }
        }
      }
    }),
      this.$_echarts.init(this.$refs['chart1']).setOption(this.option)
    this.$_echarts.init(this.$refs['chart2']).setOption(this.option)
  },
  activited() { },
  update() { },
  beforeDestory() { },
  methods: {
    //选择巡检类型
    handleSelectInspType(val){
      this.typeCode = val
      this.getDeviceType()
    },
    getDeviceType() {
      var ctx = this
      ctx.axios.getInspectionType({
        typeCode: ctx.typeCode,
        // unitId: ctx.stationId
        unitId: '192fe4cec3ec4d3fb81c0d05f82bde41'
      }).then((res) => {
        console.log(res.data, 'res');
        var data = res.data;
        if (res.code == 200) {
          ctx.inspectionType = data.asType1List
          ctx.espInspSubType = data.asType1List3
          ctx.specInspSubType = data.asType1List2
          ctx.deviceAreaList = data.asDevAreaList
          ctx.meterType = data.asMeterType1List
          ctx.recognitionType = data.asDiscernTypeList
          ctx.deviceType = data.asDevTypeList
          ctx.appearanceType = data.asOutwardList
          ctx.deviceAreaList.map(item => {
            if(item.vcFlag){
              ctx.checkedDeviceAreaList.push(item)
            }
          })
          ctx.deviceType.map(item => {
            if(item.vcFlag){
              ctx.checkedDeviceType.push(item)
            }
          })
          ctx.recognitionType.map(item => {
            if(item.vcFlag){
              ctx.checkedRecognitionType.push(item)
            }
          })
          ctx.meterType.map(item => {
            if(item.vcFlag){
              ctx.checkedMeterType.push(item)
            }
          })
          ctx.appearanceType.map(item => {
            if(item.vcFlag){
              ctx.checkedAppearanceType.push(item)
            }
          })
        }

      }).catch((err) => {
        console.log(err);
      });
    },
    //点击取消按钮关闭选择设备区域弹框
    cancel() {
      this.selectDeviceFlag = false
    },
    
	//点击巡检成票按钮
		inspectionAticketClick() {
			this.selectDeviceFlag = false
			this.inspectionAticket = true
		},

    //点击请选择巡检区域
    handleDeviceSelected() {
      this.selectDeviceFlag = true
    },
  
    //全选表计类型
    handleCheckAllMeterTypeChange(val) {
      this.checkedMeterType = val ? this.meterType : []
      this.isMeterType = false;
    },
    //全选识别类型
    handleCheckAllRecognitionTypeChange(val) {
      this.checkedRecognitionType = val ? this.recognitionType : []
      this.isRecognitionType = false
    },
    //全选设备区域
    handleCheckAllDeviceAreaListChange(val) {
      this.checkedDeviceAreaList = val ? this.deviceAreaList : []
      this.isdeviceAreaList = false;
    },
    //全选设备类型
    handleCheckDeviceTypeAllChange(val){
       this.checkedDeviceType = val ? this.deviceType : []
        this.isDeviceType = false;
    },
    //全选设备外观类型
    handleCheckAppearanceTypeAllChange(val){
      this.checkedAppearanceType = val ? this.appearanceType : []
      this.isAppearanceType = false;
    },
    //选择设备外观类型
    handleCheckedAppearanceTypeChange(value){
      console.log(value,'设备外观类型')
      let checkedCount = value.length;
      this.checkedAppearanceTypeAll = checkedCount === this.appearanceType.length;
      this.isAppearanceType = checkedCount > 0 && checkedCount < this.appearanceType.length;
    },
    //选择设备类型
    handleCheckedDeviceTypeChange(value) {
      console.log(value,'设备类型')
      let checkedCount = value.length;
      this.checkedDeviceTypeAll = checkedCount === this.deviceType.length;
      this.isDeviceType = checkedCount > 0 && checkedCount < this.deviceType.length;
    },
    //选择设备区域
    handleCheckedDeviceAreaListChange(value) {
      console.log(value, '区域')
      let checkedCount = value.length;
      this.checkdeviceAreaListAll = checkedCount === this.deviceAreaList.length;
      this.isdeviceAreaList = checkedCount > 0 && checkedCount < this.deviceAreaList.length;
    },
    //选择表计类型
    handleCheckedMeterTypeChange(value) {
      console.log(value, '表计')
      let checkedCount = value.length;
      this.checkMeterTypeAll = checkedCount === this.meterType.length;
      this.isMeterType = checkedCount > 0 && checkedCount < this.meterType.length;
    },
    //选择识别类型
    handleCheckedRecognitionTypeChange(value) {
      console.log(value, '识别')
      let checkedCount = value.length;
      this.checkRecognitionTypeAll = checkedCount === this.recognitionType.length;
      this.isRecognitionType = checkedCount > 0 && checkedCount < this.recognitionType.length;
    },
    _forEach: function (data, isTrue, callback) {
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
    subscribe(topicArr) {
      // this.$_mqtt.connected
      if (true) {
        this.$_mqtt.unsubscribe(topicArr, err => {
          if (err) {
            console.log('取消MQTT订阅失败')
          } else {
            console.log('取消MQTT订阅成功')
            this.$_mqtt.subscribe(topicArr, err => {
              if (err) {
                console.log('订阅失败!')
              } else {
                console.log('订阅成功!')
              }
            })
          }
        })
      } else {
        console.log('MQTT连接失败')
      }
    },
    stop() {
      // this.$_mqtt.end()
      this.$_mqtt.unsubscribe(this.testTopicArr, err => {
        if (err) {
          console.log('取消MQTT订阅失败')
        } else {
          console.log('取消MQTT订阅成功')
        }
      })
    },
    //合并单元格的方法
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.desData('area', this.inspectionAticketData)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = this.desData('interval', this.inspectionAticketData)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex == 2) {
        const _row = this.desData('devTitle', this.inspectionAticketData)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    // 核心处理 数据方法
    desData(key, data) {
      let contactDot = 0
      let spanArr = []
      data.forEach((item, index) => {
        item.index = index
        if (index === 0) {
          spanArr.push(1)
        } else {
          if (item[key] === data[index - 1][key]) {
            spanArr[contactDot] += 1
            spanArr.push(0)
          } else {
            spanArr.push(1)
            contactDot = index
          }
        }
      })
      return spanArr;
    },
    handleReachBottom() {
      return new Promise(resolve => {
        setTimeout(() => {
          const last = this.presetInspectionList[this.presetInspectionList.length - 1]
          for (let i = 1; i < 11; i++) {
            this.presetInspectionList.push(last + i)
          }
          resolve()
        }, 2000)
      })
    },
    //报警弹框
    handleAlarmModal(row) {
      this.alarmRecordFlag = true
      console.log(row)
    },
    //实时信息弹框
    handleTimeInfoModal(row) {
      this.timeInfoFlag = true
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return 'color: #fff;'
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#161c38;color: #3299ff;font-weight: 500;'
      }
    },
    getTabs() {
      this.$_api.monitorData
        .getTitleData({
          unitId: '42389edde72d41f4bcd978b574eefbae'
        }) //测试传固定id
        // this.$_api.monitorData.getTitleData({unitId:this.stationId})
        .then(res => {
          if (res.success) {
            this.tableList = res.data
            this.tabFirstData = res.data[0]
          } else {
            console.log(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    //  选择tab页签加载视频
    selectTab(item, idx) {
      this.tabIdx = idx
      let params = {
        robotId: item.robotId,
        serviceId: item.serviceId,
        unitId: item.unitId
      }
      // 请求接口获取机器人红外和可见光的视频地址
      this.$_api.monitorData
        .getVideoData(params)
        .then(res => {
          if (res.success) {
            this.video1.deviceInfo = res.data[0].deviceInfo
            this.video2.deviceInfo = res.data[1].deviceInfo
          } else {
            console.log(res.msg)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //点击 执行任务 按钮
		executeTaskClick() {
			console.log( '666' )
		},
		//关闭巡检任务单弹框
		closeInspectionTicket() {
			this.inspectionAticket = false
		},
    //tabs切换
    handelTabCkick(name) {
      console.log(name)
    },
    //发送获取巡检区域请求
    findAsAreaData() {
      this.axios
        .findAsArea({
          unitid: this.stationId
        })
        .then(res => {
          if (res.code == 200) {
            this.areaInspectionList = res.data
          }
        })
    },
    //获取站端信息
    getStationInfo() {
      var ctx = this
      ctx.$_api.monitorData
        .getStationInfo({
          unitID: this.stationId
        })
        .then(res => {
          var data = res.data
          for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].type == 1) {
              ctx.temperature = data[i].value
            } else if (data[i].type == 2) {
              ctx.humidity = data[i].value
            } else if (data[i].type == 3) {
              ctx.windSpeed = data[i].value
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取变电站数数据
    getNuitTreeData() {
      this.axios.getUnitTreeData({ iFlag: 1 }).then(res => {
        if (res.code == 200) {
          this.unitTreeData = res.data
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.indexOf(value) !== -1
    },
    // 点击树节点
    handleClickNode(data, node, root) {
      // 更新当前模块单元id
      //this.$store.commit('UPDATE_UNITID', data.id)
      // console.log(this.$store.getters.unitId)
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
.monitor {
  width: 100%;
  height: 100%;

  .taskGroupImg {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    left: 280px;
    top: 10px;
  }

  .monitor-top {
    width: 100%;
    height: 78%;

    .monitor-left {
      float: left;
      width: 15%;
      height: 100%;

      .unitTreeBox {
        width: 100%;
        height: 825px;
        background: #09112f;
        overflow: auto;
        padding: 0 15px;
        margin: 0 15px;
      }

      .slide-fade-enter-active {
        transition: all 0.3s ease;
      }

      .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
      }

      .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(-10px);
        opacity: 0;
      }

      .task-group {
        width: 320px;
        height: 800px;
        position: absolute;
        left: 300px;
        top: 70px;
        background: #09112f;
        z-index: 1;

        // #09112f
        /deep/.ivu-tabs-bar {
          .ivu-tabs-tab {
            width: 76%;
            text-align: center;
            background: url('~@/assets/img/common/bg540.png') no-repeat;
            background-size: 100% 100%;
            color: #fff;
            border: none;
          }

          .ivu-tabs-tab-active {
            color: #ffd36a;
          }
        }

        .temporary-inspection {
          height: 710px;
          padding-left: 15px;

          p {
            display: inline;
            font-size: 15px;
            color: green;
            line-height: 25px;
            padding-left: 10px;
          }

          .inFirst {
            max-height: 200px;
            overflow: auto;

            ul li {
              list-style: none;
              font-size: 15px;
              color: #fff;
              line-height: 40px;
              margin-left: 20px;
              cursor: pointer;
            }

            ul li:hover {
              background: #38b0de;
            }
          }

          .inSencond {
            .special {
              p {
                color: #fff;
                font-size: 15px;
              }
            }

            li {
              color: #fff;
              font-size: 15px;
              line-height: 40px;
              margin-left: 20px;
              cursor: pointer;

              /deep/ .el-button {
                width: 40px;
                height: 25px;
                float: right;
                margin-right: 20px;
                padding: 0;
                background: url('../../assets/img/monitor/bg17.png') no-repeat;
                background-size: 100% 100%;
              }
            }
          }
        }

        .preset-inspection {
          height: 710px;

          /deep/.ivu-card-bordered {
            border: none;
            background: none;
            color: #fff;
            text-align: center;
          }
        }

        i {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      }

      .button-group {
        height: 10%;
        width: 100%;

        .btn {
          float: left;
          width: 40%;
          height: 40%;
          margin-left: 10px;
          font: 100 16px / 30px '';
          background: url('~@/assets/img/common/bg17.png') no-repeat;
          text-align: center;
          color: #fff;
          background-size: 100% 100%;
        }
      }
    }

    .monitor-right {
      float: left;
      width: 85%;
      height: 100%;
      background: url('~@/assets/img/common/bg-border.png') no-repeat center;
      background-size: 95% 100%;

      .right-top {
        width: 100%;
        height: 73%;

        .nInspection {
          padding: 13px;

          span {
            margin-left: 100px;
            color: #90d9ff;

            i {
              color: #ffd36a;
              cursor: pointer;
            }
          }
        }

        .inspection-map {
          float: left;
          width: 65%;
          height: 90%;
          border: 1px solid #063765;
          margin-left: 87px;

          // margin-top: 15px;
          .entity {
            width: 100%;
            height: 100%;
            // background: pink;
            margin: 10px;
          }

          /deep/.ivu-tabs-bar {
            margin: 10px 0 0 10px;

            .ivu-tabs-tab {
              width: 70%;
              text-align: center;
              background: url('~@/assets/img/common/bg540.png') no-repeat;
              background-size: 100% 100%;
              color: #fff;
              border: none;
            }

            .ivu-tabs-tab-active {
              color: #ffd36a;
            }
          }
        }

        .video {
          float: left;
          width: 24%;
          height: 90%;
          // margin-top: 40px;
          margin-left: 10px;

          .videoTitle {
            width: 100%;
            margin-bottom: 10px;

            span {
              display: inline-block;
              height: 28px;
              line-height: 28px;
              text-align: center;
              color: #fff;
              padding: 0 5px;
              margin-right: 10px;
              border-radius: 4px;
              cursor: pointer;
              background: url('~@/assets/img/common/bg540.png') no-repeat;
              background-size: 100% 100%;
            }

            .spanActive {
              color: #f8cf66;
            }
          }

          .videoBox {
            width: 100%;
            height: 514px;

            .border-lt {
              position: absolute;
              top: -7px;
              left: -7px;
              width: 35px;
              height: 30px;
              background: url('~@/assets/img/common/border-lt.png') no-repeat;
              background-size: 35px 30px;
            }

            .border-rb {
              position: absolute;
              bottom: -7px;
              right: -7px;
              width: 35px;
              height: 30px;
              background: url('~@/assets/img/common/border-rb.png') no-repeat;
              background-size: 35px 30px;
            }

            .video1, .video2 {
              width: 100%;
              height: 250px;
            }

            .video1 {
              margin-bottom: 12px;
            }
          }
        }
      }

      .right-bottom {
        width: 100%;
        margin-top: -17px;
        height: 228px;

        .tab-bar {
          float: left;
          height: 96%;
          width: 65%;
          margin-left: 87px;
          background: url('../../assets/img/monitor/bigBg2.png') no-repeat;
          background-size: 100% 100%;

          /deep/.ivu-tabs-bar {
            margin: 10px 0 0 10px;

            .ivu-tabs-tab {
              width: 76%;
              text-align: center;
              background: url('~@/assets/img/common/bg540.png') no-repeat;
              background-size: 100% 100%;
              color: #fff;
              border: none;
            }

            .ivu-tabs-tab-active {
              color: #ffd36a;
            }
          }

          .list-content {
            height: 165px;
            width: 95%;
            margin: 0 auto;
          }

          .operation {
            width: 48px;
            height: 26px;
            text-align: center;
            line-height: 8px;
            color: #6298bb;
            background: url('~@/assets/img/common/bg17.png') no-repeat;
            background-size: 100% 100%;
          }

          /deep/.el-table td, /deep/.el-table th {
            padding: 7px 0;
          }
        }

        .env {
          float: left;
          width: 24%;
          height: 89%;
          margin: 10px 0 0 10px;
          border: 1px solid #063765;

          p {
            height: 30px;
            font: 100 18px / 30px '';
            color: #fff;
          }

          span {
            color: #49ff01;
          }

          .content {
            height: 30px;
            font: 100 16px / 30px '';
            color: #fff;
            margin: 8px 0;

            i {
              display: inline-block;
              width: 15px;
              height: 15px;
              margin: -2px 6px;
            }

            p {
              display: inline-block;
              width: 110px;
            }
          }

          .station-env {
            float: left;
            width: 45%;

            .content:nth-of-type(1) i {
              background: url('../../assets/img/monitor/temperature.png') no-repeat center;
              background-size: 100% 100%;
            }

            .content:nth-of-type(2) i {
              background: url('../../assets/img/monitor/humidity.png') no-repeat center;
              background-size: 100% 100%;
            }

            .content:nth-of-type(3) i {
              background: url('../../assets/img/monitor/wind-speed.png') no-repeat center;
              background-size: 100% 100%;
            }
          }
        }

        .robot-status {
          float: left;
          width: 45%;

          .content:nth-of-type(1) i {
            background: url('../../assets/img/monitor/robot-out.png') no-repeat center;
            background-size: 100% 100%;
          }

          .content:nth-of-type(2) i {
            background: url('../../assets/img/monitor/robot-in.png') no-repeat center;
            background-size: 100% 100%;
          }

          .content:nth-of-type(3) i {
            background: url('../../assets/img/monitor/robot-pathway.png') no-repeat center;
            background-size: 100% 100%;
          }

          .content:nth-of-type(4) i {
            background: url('../../assets/img/monitor/video.png') no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}

.alarm-detail {
  width: 100%;
  height: 900px;
  background: url('../../assets/img/common/bg.png') no-repeat center;
  background-size: 100% 100%;

  .detail-info {
    float: left;
    width: 374px;
    height: 800px;
    background: url('../../assets/img/monitor/border.png') no-repeat;
    background-size: 100% 100%;
    margin: 64px 0 0 45px;

    .datawrap {
      width: 100%;
      height: 50px;
      font: 900 16px / 50px '';

      .name {
        float: left;
        width: 140px;
        margin-left: 48px;
        color: #fff;
        text-indent: 24px;

        i {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #5990fe;
          margin-right: 24px;
        }
      }

      .content {
        float: left;
        width: 160px;
        margin-left: 10px;
        color: #2e70a9;
      }
    }
  }

  .map-video {
    float: left;
    width: 1100px;
    margin-left: 15px;

    .video {
      height: 386px;
      margin-top: 65px;
    }

    .map {
      height: 384px;
      margin-top: 27px;

      .map-content {
        float: left;
        width: 878px;
        height: 100%;
        background: url('~@/assets/img/common/bg-border2.png') no-repeat;
        background-size: 100% 100%;

        .chart {
          width: 800px;
          height: 300px;
          margin: 30px 0 0 20px;
        }
      }

      .modal-btn-group {
        float: left;
        width: 180px;
        height: 358px;
        margin: 18px 0 0 15px;
        border: 1px solid #06335f;

        .btn {
          width: 150px;
          height: 36px;
          background: url('~@/assets/img/common/bg540.png') no-repeat center;
          background-size: 100% 100%;
          border-radius: 3px;
          text-align: center;
          margin: 40px 0 0 15px;
          font: 100 14px / 30px '';
          color: #fff;
        }
      }
    }
  }
}

.inspectionTicket {
  height: 700px;
  padding-top: 20px;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

  /deep/.el-table {
    margin-left: 50px;
    width: calc(100% - 100px);
    border-collapse: collapse !important;

    /deep/td, /deep/th.is-leaf {
      border: 1px solid #0098ff !important;
      font-size: 20px;
      color: #fff;
    }
  }

  .modalFooterBtn {
    // padding-left: 1200px;
    // float: right;
    // margin-right: 50px;
    // margin-top: 20px;
    position: absolute;
    right: 50px;
    bottom: 60px;

    .btn {
      width: 130px;
      height: 30px;
      background: url('../../../../assets/img/common/bg540.png') no-repeat center;
      background-size: 100% 100%;
      border-radius: 3px;
      text-align: center;
      margin: 5px;
      border: 0;
      color: #fff;
      font: 100 16px / 30px '';
      cursor: pointer;
    }

    .btn:active {
      color: #fff902;
    }
  }
}

.time-info {
  width: 100%;

  .modal-img {
    height: 400px;
    width: 100%;

    .img-content {
      display: inline-block;
      width: 400px;
      height: 400px;
    }
  }
}

.line-map {
  width: 100%;
  height: 384px;

  .chart {
    width: 800px;
    height: 320px;
    padding-top: 30px;
    background: url('~@/assets/img/common/bg-border2.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 300px;
  }
}

.inspection-type {
  height: 900px;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;

  .select-type {
    width: 1462px;
    height: 60px;
    background: #0c1b3b;
    margin-left: 50px;
    margin-top: 15px;

    /deep/.el-form {
      margin-left: 25px;
    }

    /deep/.el-form-item__label, .el-radio {
      font: 100 16px / 60px '';
      color: #35a2ff;
    }

    /deep/.el-radio__label {
      font-size: 16px;
    }

    /deep/.el-form-item__label {
      font-size: 16px;
    }
  }

  .sub-type {
    width: 1462px;
    height: 40px;
    background: #0c1b3b;
    margin-left: 52px;

    /deep/.el-form-item__label, .el-radio {
      font: 100 14px / 40px '';
      color: #35a2ff;
    }

    /deep/.el-radio__label {
      font-size: 14px;
    }
  }

  .list-con {
    overflow: auto;
    margin: 30px 0;
    height: 100px;

    .title {
      float: left;
      width: 150px;
      height: 30px;
      font: 100 18px / 30px '';
      color: #8fd8fe;
      margin: 20px 0 0 74px;
    }

    .select {
      float: left;
      width: 1240px;

      /deep/.el-checkbox {
        float: left;
        margin-top: 20px;
      }

      /deep/.el-checkbox-group {
        float: left;
        margin-left: 20px;
        width: 1080px;
      }
    }

    /deep/.el-checkbox__label {
      font: 100 18px / 30px '';
      color: #8fd8fe;
    }
  }

  .type-bottom {
    height: 66px;

    .selected-num {
      float: left;
      height: 100%;
      font: 100 16px / 66px '';
      color: #fff;
      margin-left: 80px;

      span {
        color: #ffff7a;
      }
    }
  }

  .task-order {
    float: right;
    margin: 15px 70px 0 0;

    .btn {
      width: 130px;
      height: 30px;
      background: url('~@/assets/img/common/bg540.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
      margin: 5px;
      cursor: pointer;
      border: 0;
      color: #d8c50e;
      font: 100 16px / 30px '';
    }
  }
}

/deep/.ivu-tabs-bar {
  border: none;
}

/deep/.ivu-modal {
  top: 0;
}

/deep/.ivu-modal-content {
  background: url('~@/assets/img/navigation/background.png') no-repeat;
  background-size: 100% 100%;
}

/deep/.ivu-modal-header, /deep/.ivu-modal-footer {
  border: 0;
}

/deep/.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
  border-radius: 5px;
}

/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

/deep/.el-table td, /deep/.el-table th.is-leaf {
  border: none;
}

/deep/.el-table, /deep/.el-table__expanded-cell {
  background: none;
}

/deep/.el-table tbody tr:hover>td {
  background: none;
}

/deep/.el-table th, /deep/.el-table tr {
  background: none;
}
</style>
