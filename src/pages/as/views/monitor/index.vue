<template>
  <div class="monitor">
    <!-- 头部 -->
    <!-- <img src="../../assets/img/monitor/switchover.png" alt="" @click="imgClick" class="taskGroupImg" /> -->
    <div class="monitor-top">
      <!-- 左边 -->
      <div class="monitor-left">
        <!-- <div class="unitTreeBox">
        <div class="tree-content">-->
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

        <!-- </div>
        </div>-->
        <!-- <transition name="slide-fade">
					<div class="task-group" v-if="show">
						<Tabs :animated="false" type="card">
							<Tab-pane label="临时特巡">
								<div class="temporary-inspection">
									<Icon type="ios-arrow-down" />
									<p>巡检区域</p>
									<div class="inFirst">
										<ul>
											<li
												v-for="(item, index) in areaInspectionList"
												:key="index"
												@click="areaInClick(item.areaId, item.vcName)"
											>
												{{ item.vcName }}
											</li>
										</ul>
									</div>
									<Icon type="ios-arrow-down" />
									<p>巡检类型</p>
									<div class="inSencond">
										<ul>
											<li class="special" v-if="specialIns.length != 0">
												<p>特殊巡视</p>
												<ul>
													<li v-for="(item, index) in specialIns" :key="index">
														{{ item.subTaskTypeName }}
														<el-button type="primary" @click="detailClick(item)"
															>详情</el-button
														>
													</li>
												</ul>
											</li>
											<li v-for="(item, index) in inspectionTypeList" :key="index">
												{{ item.name }}
												<el-button type="primary" @click="detailClick(item)">详情</el-button>
											</li>
										</ul>
									</div>
								</div>
							</Tab-pane>
							<Tab-pane label="预置巡检">
								<div class="preset-inspection">
									<Scroll :on-reach-bottom="handleReachBottom" height="710">
										<Card
											dis-hover
											v-for="(item, index) in presetInspectionList"
											:key="index"
											style="margin: 10px 0; text-align: left;"
										>
											<i :style="{ background: item.bgColor }"></i>
											{{ item.vcName }}
										</Card>
									</Scroll>
								</div>
							</Tab-pane>
						</Tabs>
						<div class="button-group">
							<div class="btn">执行任务</div>
							<div class="btn">停止任务</div>
						</div>
					</div>
        </transition>-->
      </div>
      <!-- 右边 -->
      <div class="monitor-right">
        <div class="right-top">
          <!-- 巡检图 -->
          <div class="nInspection">
            <span>
              当前巡检区域：
              <i @click='handleDeviceSelected'>请选择巡检区域</i>
            </span>
            <span>
              当前巡检类型：
              <i>全面巡检</i>
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
    <Modal title="Title" v-model="alarmRecordFlag" :width="1600" :mask-closable="false">
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
    </Modal>

    <!-- 实时信息详情弹框 -->
    <Modal v-model="timeInfoFlag" :width="1600" :mask-closable="false">
      <div class="time-info">
        <div class="modal-img">
          <img class="img-content" src alt />
        </div>
      </div>
      <div class="line-map">
        <div class="chart" ref="chart1"></div>
      </div>
    </Modal>

    <!-- 选择设备弹框 -->
    <Modal v-model="selectDeviceFlag" :width="1600" :mask-closable="false" footer-hide>
      <div class="inspection-type">
        <div class="select-type">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="巡检类型">
              <el-radio-group v-model="form.inspection">
                <el-radio label="1">全面巡检</el-radio>
                <el-radio label="2">例行巡检</el-radio>
                <el-radio label="3">专项巡检</el-radio>
                <el-radio label="4">特殊巡检</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class="sub-type" v-show='form.inspection == 3'>
          <el-form ref="subTypeForm" :model="subTypeForm" label-width="100px">
            <el-form-item label=" ">
              <el-radio-group v-model="subTypeForm.subtype">
                <el-radio label="1">子类型1</el-radio>
                <el-radio label="2">子类型2</el-radio>
                <el-radio label="3">子类型3</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
        <div class='list-con'>
          <div class='title'>设备区域：</div>
          <div class="select">
            <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全部</el-checkbox>
          <!-- <div style="margin: 15px 0;"></div> -->
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          </div>
          
        </div>
         <div class='list-con'>
          <div class='title'>设备类型：</div>
          <div class="select">
            <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全部</el-checkbox>
          <!-- <div style="margin: 15px 0;"></div> -->
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          </div>
          
        </div>
         <div class='list-con'>
          <div class='title'>识别类型：</div>
          <div class="select">
            <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全部</el-checkbox>
          <!-- <div style="margin: 15px 0;"></div> -->
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          </div>
          
        </div>
         <div class='list-con'>
          <div class='title'>表计类型：</div>
          <div class="select">
            <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全部</el-checkbox>
          <!-- <div style="margin: 15px 0;"></div> -->
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          </div>
          
        </div>
         <div class='list-con'>
          <div class='title'>设备外观类型：</div>
          <div class="select">
            <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全部</el-checkbox>
          <!-- <div style="margin: 15px 0;"></div> -->
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
          </div>
          
        </div>
        <div class="type-bottom">
          <div class="selected-num">
            当前已选择：
            <span></span>个测点
          </div>
          <div class="task-order">
            <input type="button" value="巡检成票" class="btn" />
            <input type="button" value="取消" class="btn" />
          </div>
        </div>
      </div>
    </Modal>
		
		<!-- 巡检成票 -->
		<Modal v-model="inspectionAticket" :width="1600" :mask-closable="false" footer-hide>
			<div class="inspectionTicket">
				<el-table
					:data="inspectionAticketData"
					max-height="600"
					:span-method="objectSpanMethod"   
					border
					:header-cell-style="{ background: '', color: '#90d9ff' }"
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
					<span @click="executeClick">执行任务</span>
					<span @click="cancelClick">取消</span>
				</div>
			</div>
		</Modal>
		
  </div>
</template>
<script>
import cvideo from '@/components/native/video/OcxVideo'
import { debuglog } from 'util'
import monitorCurrent from '../common/monitor-current.vue'
import moment from 'moment'
const cityOptions = ['上海', '北京', '广州', '深圳','啊啊', '拜拜', '查重', '等等', '嗯嗯', '方法', '谷歌', '哈哈', '解决', '看看', '来了', '密码'];
export default {
  name: 'monitor',
  props: {},
  data() {
    return {
   
     checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,


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
      tableList: [],
      tabFirstData: [],
      //巡检类型
      form: {
        inspection: '1'
      },
      //子类型
      subTypeForm: {
        subtype: '1'
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
			inspectionAticketData: [
				{area: '某区域',interval: '某间隔',devTitle: '1号主变A避雷器',dian: '1',outR: true,video: false,doorR: false,zhifu: false,wuren: false},
				{area: '某区域',interval: '某间隔',devTitle: '1号主变A避雷器',dian: '2',outR: true,video: false,doorR: false,zhifu: false,wuren: false},
				{area: '某区域',interval: '某间隔',devTitle: '1号主变A避雷器',dian: '3',outR: true,video: false,doorR: false,zhifu: false,wuren: false},
				
			] //巡检成票表格数据
		
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
    handleDeviceSelected(){
      this.selectDeviceFlag = true
    },
     handleCheckAllChange(val) {
       console.log(val,'all')
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value,'group')
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
		//点击 执行任务按钮
		executeClick() {
			
		},
		//点击 取消 按钮
		cancelClick() {
			
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

.inspectionTicket{
	height: 700px;
	padding-top: 20px;
	background: url('~@/assets/img/common/bg-border.png') no-repeat;
	background-size: 100% 100%;
	overflow: hidden;

	/deep/.el-table{
		margin-left: 50px;
		width: calc( 100% - 100px );

		/deep/td, /deep/th.is-leaf {
		  border: 1px solid #90d9ff !important;
		  font-size: 20px;
		  color: #fff;
		}

	}

	.modalFooterBtn{
		//padding-left: 1200px;
		// float: right;
		// margin-right: 50px;
		// margin-top: 20px;
		position: absolute;
		right: 50px;
		bottom: 35px;
		span{
			width: 150px;
			height: 50px;
			background: url('../../../../assets/img/common/bg540.png') no-repeat center;
			background-size: 100% 100%;
			border-radius: 3px;
			text-align: center;
			margin: 0 20px 0 0;
			color: #fff;
			font-size: 20px;
			padding: 10px 40px
			cursor: pointer;
		}
		span:active{
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

    /deep/.el-form-item__label, .el-radio{
      font: 100 16px / 60px '';
      color: #35a2ff;
    }
    /deep/.el-radio__label{
      font-size: 16px;
    }

    /deep/.el-form-item__label {
      font-size: 16px;
    }
  }
  .sub-type{
     width: 1462px;
     height: 40px;
     background: #0c1b3b;
    margin-left: 52px;
    /deep/.el-form-item__label, .el-radio{
      font: 100 14px / 40px '';
      color: #35a2ff;
    }
    /deep/.el-radio__label{
      font-size: 14px;
    }
  }
  .list-con{
    overflow: hidden;
    margin: 30px 0 ;
    
    .title{
      float: left;
      width: 150px;
      height: 30px;
      font: 100 18px/30px "";
    color: #8fd8fe;
    margin:20px 0 0 74px;
    }
    .select{
      float: left;
      width: 1240px;
       /deep/.el-checkbox{
      float: left;
      margin-top: 20px;
    }
    /deep/.el-checkbox-group{
      float: left;
      margin-left: 20px;
      width: 1080px;
    }
    }
   
    /deep/.el-checkbox__label{
       font: 100 18px/30px "";
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
