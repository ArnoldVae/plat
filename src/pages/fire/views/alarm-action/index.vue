<template>
    <div class="alarm-now">
        <div>
            <div class="noAlarm" v-show="alarmHide"></div>
            <!--        当前页面-->
            <div class="alarmList" v-show="comfireAlarm">
                <div class="alarmNow-title">当前报警信息</div>
                <div class="alarm-now-header">
                    <div class="alarm-now-header-items">
                        <div
                                v-for="(item, index) in labelList"
                                :class="item.selected ? 'alarm-now-header-item-selected' : 'alarm-now-header-item'"
                                :key="index"
                                @click="showItemDetail(item);changeColor(item)"
                        >
                            <ul>
                                <li>
                                    <span class="icon">●</span>
                                    <span>{{ item.unitName }}</span>
                                </li>
                                <li>
                                    <span class="icon">●</span>
                                    <span>{{ item.araeName }}</span>
                                </li>
                                <li>
                                    <span class="icon">●</span>
                                    <span>{{ item.devName }}</span>
                                </li>
                                <li>
                                    <span class="icon">●</span>
                                    <span>{{ item.beginTime }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="alarmContainer" v-show="comfireAlarm">
                <div class="container">
                    <div class="unitTitle">
                        <span>{{ alarmData.unitName }}</span>
                    </div>
                    <div class="alarm-now-video" v-if="comfireAlarm">
                        <div class="alarm-now-video-item" style="margin-right: 18px;height: 102%">
                            <OcxVideo :videoConfig="alarmData.videoList[0]" style="width: 753px"></OcxVideo>
                        </div>
                        <div class="alarm-now-video-item">
                            <OcxVideo :videoConfig="alarmData.videoList[1]" style="height: 102%"></OcxVideo>
                        </div>
                    </div>
                    <div class="alarm-now-chart">
                        <div class="chart-container" ref="envChart"></div>
                        <div class="infoWarp-top">

                            <div class="alarmInfo-box">
                                <div class="newTitle">报警信息</div>
                                <div class="info-wrap">
                                    <ul>
                                        <li>
                                            <div class="name">防护区</div>
                                            <div class="valueColor1">
                                                {{ alarmData.areaName }}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">设备名称</div>
                                            <div class="valueColor2">
                                                {{ alarmData.devName }}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">报警节点</div>
                                            <div class="valueColor1">
                                                {{ alarmData.nodeName }}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="name">报警时间</div>
                                            <div class="valueColor2">
                                                {{ alarmData.time }}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="infoWarp-bottom">
                            <div class="newTitle">站内气象</div>
                            <div class="weatherInfo">
                                <ul>
                                    <li v-for="(item, index) in weatherList" :key="index">
                                        <el-row>
                                            <el-col :span="2" class="icon">
                                                <img :src="item.icon" alt>
                                            </el-col>
                                            <el-col :span="6">
                                                <div class="name">{{item.name}}</div>
                                            </el-col>
                                            <el-col :span="16">
                                                <div class="value">{{item.value}}{{item.vcUnit}}</div>
                                            </el-col>
                                        </el-row>
                                    </li>
                                </ul>
                            </div>

                            <div class="alarm-btn">
                                <button class="btn confirm" @click="alarmShow()">确定</button>
                                <button class="btn false">误报</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--        确定页面-->
            <ocx-modal v-model="ocxModel" :width="360" :styles="{ top: '0',width:'360' }" scrollable :mask="true"
                       :mask-closable="true">
                <div slot="header" class="ocx-modal-header">
                    {{ alarmTitle }}消防报警应急预案
                </div>
                <div class="waring-body">
                    <div class="waring-body-msg">
                        <span class="color-fontKey">当前报警变电站：</span> <span class="color-fontValue">{{alarmTitle}}</span>
                        <span class="color-fontKey">防护区：</span> <span
                            class="color-fontValue">{{alarmDetail.areaName}}</span>
                        <span class="color-fontKey">设备名称：</span> <span
                            class="color-fontValue">{{alarmDetail.devName}}</span>
                        <span class="color-fontKey">报警节点：</span> <span
                            class="color-fontValue">{{alarmDetail.nodeName}}</span>
                        <span class="color-fontKey">报警时间：</span> <span
                            class="color-fontValue">{{alarmDetail.beginTime}}</span>
                    </div>
                    <el-container>
                        <el-aside width="76%">
                            <div class="modal-video">
                                <div class="modal-video-single video-left">
                                    <OcxVideo :videoConfig="alarmData.videoList[0]"></OcxVideo>
                                </div>
                                <div class="modal-video-single video-right">
                                    <OcxVideo :videoConfig="alarmData.videoList[1]"></OcxVideo>
                                </div>
                            </div>
                            <div class="modal-map">
                                <div class="newTitle">外部救援</div>
                                <fireMap
                                        ref="map"
                                        @clickRcuImg="clickRcuImg"
                                        :moduleNames="'fireMap'"
                                        :javainterface="javainterface">

                                </fireMap>

                            </div>
                            <div class="modal-source">
                                <div class="newTitle">灭火资源</div>
                                <div class="htCon">
                                    <img :src="imgUrl" alt="">
                                </div>

                            </div>

                        </el-aside>
                        <el-main>
                            <div class="con-right">
                                <div class="newTitle"><span></span>应急处置流程
                                    <a-button-group style="float: right;margin-right: 15px;">
                                        <a-button
                                                v-for="(mode, index) in caseTab"
                                                :key="index"
                                                @click="handleChangeDisplayMode(mode, index)"
                                                :icon="mode.icon"
                                                :class="{ current: caseTabCode == index }"
                                        ></a-button>
                                    </a-button-group>
                                </div>
                                <div class="con-right-List" v-show="caseTabCode">
                                    <ul>
                                        <li v-for="(disposeItem, index) in disposeList" :key="index">
                                            <div class="flag">{{ index + 1 }}</div>
                                            <p class="con">{{ disposeItem.itemContext }}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="con-right-List" v-show="!caseTabCode">
                                    <img :src="mapImgUrl" alt="">

                                </div>
                            </div>
                        </el-main>
                    </el-container>

                </div>


                <div slot="footer">

                </div>

            </ocx-modal>
        </div>
    </div>
</template>

<script>
    import OcxVideo from '@/components/native/video/OcxVideo'

    // import htCommon from '@fire/views/common/ht-common'
    import moment from 'moment'
    import fireMap from '@/components/native/fireMap/fireMap.vue'

    export default {
        name: 'alarm-now',
        components: {
            OcxVideo,
            fireMap
        },
        props: {
            node: {
                type: String,
                require: false,
                default: ''
            },
            pageType: {
                type: Boolean,
                require: false
            }
        },
        data() {
            return {
                alarmData: {
                    videoList: [
                        {
                            isAutoPlay: true,
                            serviceInfo: '1$22.46.34.114$6800$admin$admin',
                            deviceInfo: '1|22.46.34.114:8001|admin:admin123|1',
                            hideTool: true
                        },
                        {
                            isAutoPlay: true,
                            serviceInfo: '1$22.46.34.114$6800$admin$admin',
                            deviceInfo: '2|22.46.34.114:37781|admin:admin123|2',
                            hideTool: true
                        }
                    ],
                },
                defaultMapConfig: {
                    center: {lng: 118.79288, lat: 31.88029},
                    zoom: 10,
                    scrollWheelZoom: true,
                    minZoom: 8,
                    maxZoom: 15
                },
                ocxModel: false,
                imgUrl: '',
                cfgName: '',
                moreFlag: false,
                modal1: false,
                caseTab: [{name: "ichnography", icon: "picture", title: "流程图"}, {
                    name: "table",
                    icon: "table",
                    title: "文字"
                }],
                caseTabCode: 0,
                mapImgUrl: "",
                javainterface: {
                    allStation: {
                        subModuleName: 'systemView',
                        interfaceName: 'getAllStation',
                        param: {iType: 10060003}
                    }
                },
                alarmDetail: {},
                labelList: [],
                subLabelList: [],
                showLabelList: [],
                //chart
                envChart: null,
                timeData: [
                    '2019-07-25 07:08',
                    '2019-07-25 07:16',
                    '2019-07-25 07:23',
                    '2019-07-25 07:30',
                    '2019-07-25 07:45',
                    '2019-07-25 07:50',
                    '2019-07-25 07:55',
                    '2019-07-25 08:08',
                    '2019-07-25 08:16',
                    '2019-07-25 08:20'
                ],
                chartData: ['30', '38', '34', '33.5', '34', '36', '33.9', '40', '33.2', '32.3'],
                chartData2: ['8', '34', '33.2', '60', '33.5', '31.3', '31.4', '20', '34.6', '10'],
                categorName: ['温度', '湿度'],
                weatherImg: require('@/assets/img/common/sun.png'),
                weatherList: [
                    {icon: require('@fire/assets/img/alarm-now/wendu.png'), name: '温度:', value: '34'},
                    {icon: require('@fire/assets/img/alarm-now/fengsu.png'), name: '风速:', value: '4'},
                    {icon: require('@fire/assets/img/alarm-now/shidu.png'), name: '湿度:', value: '65'},
                    {icon: require('@fire/assets/img/alarm-now/fengxiang.png'), name: '风向:', value: '东南'}
                ],
                obj: {},
                alarmListInfo: [
                    {name: '防护区:', value: '1号主变防护区'},
                    {name: '设备名称:', value: '1#烟感探测器'},
                    {name: '报警节点:', value: '1#烟感探测器报警'},
                    {name: '报警时间:', value: '2019-7-22 10:00'}
                ],
                alarmHide: false,
                confirHide: false,
                comfireAlarm: true,
                unitTitle: '500kV东善桥变电站',
                alarmTitle: '500kV东善变',
                untiID: this.$store.getters.unitId,
                protectAreaId: '',
                htInfoList: [
                    {
                        name: '火情点最近灭火器设备',
                        value: [{listName: '装置类型', listValue: '泡沫灭火器'}, {listName: '装置数量', listValue: '8'}]
                    },
                    {
                        name: '火情点最近灭火器设备',
                        value: [
                            {listName: '装置类型', listValue: '泡沫灭火器'},
                            {listName: '装置数量', listValue: '20'}
                        ]
                    }
                ],
                disposeList: [],
                idListObj: {
                    arr1: [],
                    arr2: [],
                    arr3: []
                },
                hturl: ''
            }
        },
        computed: {
            getStationId: function () {
                return this.$store.getters.stationId
            }
        },
        filters: {},
        watch: {
            getStationId: {
                handler(val) {
                }
            },
            node(val) {
                this.node = val
            }
        },
        created() {
        },
        mounted() {
            this.envChart = this.$_echarts.init(this.$refs['envChart'])
            this.getAlarmList()
        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            clickRcuImg() {
            },
            mapSuccess() {

            },
            /**
             * 应急预案切换方案
             */
            handleChangeDisplayMode(mode, index) {
                this.caseTabCode = index
            },
            /**
             *弹窗关闭事件
             */
            closeModal() {
                this.modal1 = false
            },
            initAlam(item) {
                this.getAlarmList(item)
            },

            /**
             *获取报警信息列表 列表初始化调用
             *
             */
            getAlarmList(item) {
                console.log(this)
                this.$_api.alarmAction
                    .getAlarmList({
                        unitId: this.$store.getters.unitId || '0'
                        // alarmId: '1'
                    })
                    .then(res => {
                        if (res.code == 200) {
                            if (res.data) {
                                console.log(this)
                                this.labelList = []
                                this.labelList = res.data
                                this.labelList.forEach((im, i) => {
                                    im.index = i + 1
                                    im.beginTime = moment(im.beginTime * 1000).format('YYYY-MM-DD HH:mm')
                                })


                                this.alarmData.unitName = res.data[0].unitName
                                if (item) {
                                    this.showItemDetail(item)
                                } else {
                                    this.showItemDetail(res.data[0])
                                }
                            }
                        }
                    })
            },

            /**
             * 点击显示报警信息显示详情渲染视图
             * param：item为当前勾选对象
             */
            async showItemDetail(item) {
                let num = 0

                this.labelList.forEach(i => {
                    if (item.alarmId == i.alarmId) {
                        i.selected = true
                        num++
                    } else {
                        i.selected = false
                    }
                })
                if (!num && this.labelList.length > 0) {
                    this.labelList[0].selected = true
                    item = this.labelList[0]
                }
                if (item.unitId) {
                    this.$store.dispatch('updateUnitId', item.unitId)
                }

                this.unitTitle = this.alarmTitle = item.unitName
                debugger
                let result = await this.$_api.alarmAction.getAlarmData({
                    unitId: item.unitId || '',
                    alarmId: item.alarmId || item.alarmid
                })
                if (result.success) {
                    //报警信息赋值操作
                    this.alarmData.araeName = result.data.araeName
                    this.alarmData.devName = result.data.devName
                    this.alarmData.nodeName = result.data.nodeName
                    this.alarmData.time = moment(result.data.beginTime * 1000).format('YYYY-MM-DD HH:mm')
                    this.alarmDetail = result.data
                    this.alarmDetail.beginTime = moment(result.data.beginTime * 1000).format('YYYY-MM-DD HH:mm')
                    this.protectAreaId = result.data.protectAreaId

                    //

                    this.getAreaData()
                    const obj = {
                        unitId: this.$store.getters.unitId || '',
                        areaId: this.protectAreaId
                    }
                    //报警联动视频赋值逻辑
                    if (result.data.videoList && result.data.videoList.length > 0) {
                        result.data.videoList.forEach((item, index) => {
                            this.alarmData.videoList[index].deviceInfo = item.vcParams1
                        })
                    }
                    // this.videoConfig[0].deviceInfo = result.data.[0].vcParams1
                    this.getReserve(obj)
                    //                    获取图例
                    this.imgUrl = result.data.svgList[0].vcMemo
                }
            },
            /**
             * 查询预案接口（应急预警处置）
             */
            async getReserve(item) {
                let result = await this.$_api.alarmAction.getReserve({
                    unitId: item.unitId || '',
                    areaId: item.areaId || '19ba44379e6f42fc88fa26226dc14334'
                })
                if (result.success) {
                    this.cfgName = result.data.cfgName
                    this.disposeList = result.data.list
                    this.mapImgUrl = result.data.vcPicture
                }
            },
            //charts表渲染
            getEnvChart(obj) {
                // 如果湿度没有值则添加值
                if (obj.arr3.length > 0) {
                    obj.arr3.forEach((item, index) => {
                        obj.arr2[index] = obj.arr2[index] ? obj.arr2[index] : '70'
                        obj.arr1[index] = obj.arr1[index] ? obj.arr1[index] : '30'
                    })
                }
                let option = {
                    title: {
                        show: true,
                        text: '',
                        textStyle: {
                            color: '#85c9ee',
                            // fontFamily: "DS-DIGI",
                            fontSize: 36,
                            align: 'center'
                        },
                        top: 10,
                        left: 20
                    },
                    legend: {
                        data: this.categorName,
                        top: 20,
                        right: 50,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        }
                    },
                    color: ['#47b2fe', '#5d6040'],
                    grid: [
                        {
                            containLabel: true
                        }
                    ],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: obj.arr3,
                        axisLine: {
                            lineStyle: {
                                color: '#85c9ee',
                                width: 2
                            }
                        },
                        axisLabel: {
                            color: '#85c9ee',
                            show: true,
                            textStyle: {
                                fontSize: 16
                            }
                        },
                        areaStyle: {
                            color: '#fff'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#85c9ee',
                                width: 2
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            color: '#85c9ee',
                            show: true,
                            textStyle: {
                                fontSize: 16
                            }
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#08304a',
                                fontSize: 16
                            }
                        },
                        textStyle: {
                            color: '#85c9ee',
                            fontSize: 16
                        }
                    },
                    series: [
                        {
                            name: this.categorName[0],
                            data: obj.arr1,
                            type: 'line',
                            areaStyle: {
                                color: 'none'
                            },
                            itemStyle: {
                                color: '#eb6100'
                            },
                            lineStyle: {
                                color: 'red'
                            },
                            smooth: true,
                            markLine: {
                                silent: true,
                                lineStyle: {
                                    normal: {
                                        color: '#01fef9' // 这儿设置安全基线颜色
                                    }
                                },
                                data: [{name: '', yAxis: 150, type: 'min'}]
                            }
                        },
                        {
                            name: this.categorName[1],
                            data: obj.arr2,
                            type: 'line',
                            areaStyle: {
                                color: 'none'
                            },
                            itemStyle: {
                                color: '#01fef9'
                            },
                            lineStyle: {
                                color: '#00ccff'
                            },
                            smooth: true,
                            markLine: {
                                silent: true,

                                lineStyle: {
                                    normal: {
                                        color: '#01fef9' // 这儿设置安全基线颜色
                                    }
                                },
                                data: [{name: '', yAxis: 150, type: 'min'}]
                            }
                        }
                    ],
                    dataZoom: [
                        {
                            type: 'inside',
                            minValueSpan: 7,
                            minSpan: 20,
                            start: 50,
                            end: 100
                        },
                        {
                            showDetail: false,
                            height: 8,
                            bottom: 20,
                            borderColor: 'red',
                            backgroundColor: 'rgba(1,37,59,0.5)',
                            dataBackgroundColor: 'rgba(47,126,181,0.9)',
                            fillerColor: 'rgba(1,138,225,0.5)',
                            handleColor: 'rgba(1,37,59,0.8)'
                        }
                    ]
                }
                this.envChart.setOption(option)
            },
            //天气参数获取
            getAreaData() {
                this.$_api.alarmAction
                    .getAreaData({
                        unitId: this.$store.getters.unitId || '',
                        areaId: this.protectAreaId,
                        devTypeId: '1010'
                    })
                    .then(res => {
                        res.data.forEach(item => {
                            if (item.functioinId == 155) {
                                this.weatherList[1].value = item.fValue
                                this.weatherList[1].vcUnit = item.vcUnit
                            }
                            if (item.functioinId == 156) {
                                this.weatherList[3].value = item.fValue
                                this.weatherList[3].vcUnit = item.vcUnit
                            }
                            if (item.functioinId == 157) {
                                this.weatherList[0].value = item.fValue
                                this.weatherList[0].vcUnit = item.vcUnit
                                this.getEchartData(item.nodeId, item.functioinId)
                            }
                            if (item.functioinId == 158) {
                                this.weatherList[2].value = item.fValue
                                this.weatherList[2].vcUnit = item.vcUnit
                                this.getEchartData(item.nodeId, item.functioinId)
                            }
                        })
                    })
            },
            //echarts数据
            getEchartData(id, target) {
                this.$_api.alarmAction
                    .getEchartData({
                        nodeId: id,
                        startTime: Math.round(new Date().getTime() / 1000) - 604800,
                        endTime: Math.round(new Date().getTime() / 1000)
                    })
                    .then(res => {
                        const newArr = [],
                            dateArr = []
                        //转换时间格式成需要的
                        res.data.forEach(i => {
                            newArr.push(i.f_Value)
                            dateArr.push(moment(i.i_DataTime * 1000).format('YYYY-MM-DD hh:mm:ss'))
                        })
                        if (target == 157) {
                            this.idListObj.arr1 = newArr
                            this.idListObj.arr3 = dateArr
                        } else if (target == 158) {
                            this.idListObj.arr2 = newArr
                        }
                        if (this.idListObj.arr1.length > 0 && this.idListObj.arr2.length > 0) {
                            this.getEnvChart(this.idListObj)
                        }
                    })
            },
            //            改变选中颜色
            changeColor(item) {
                this.labelList.forEach(i => {
                    i.selected = false
                })
                item.selected = true
            },
            //应急方案切换
            changeMenu(item) {
                this.caseTab.forEach(i => {
                    i.selected = false
                })
                item.selected = true
                this.caseTabCode = item.code
            },
            //获取ht接口数据
            getHtMap() {
                this.$_api.alarmAction
                    .getHtMap({
                        unitId: this.$store.getters.stationId,
                        subIdsStr: '90010001'
                    })
                    .then(res => {
                        if (res.code == 200) {
                            this.hturl = res.data[0].vcUrl
                        }
                    })
            },
            alarmShow() {
                this.ocxModel = true
                let that = this
                //点位地图
                setTimeout(() => {
                    // center: {lng: 118.79288, lat: 31.88029},
                    that.$refs.map.location({dMapx: 118.79288, dMapy: 31.88029})
                }, 200)
                this.getReserve(this.alarmData)
                // this.confirHide = this.pageType ? false : true
                // this.comfireAlarm = this.pageType ? true : false
                //
                // this.modal1 = true
                // this.getHtMap()
            },
            close() {
                this.comfireAlarm = true
                this.confirHide = false
            },
            //确认报警删除条目操作
            delAlarm(node) {
                debugger
                this.labelList.forEach((item, index) => {
                    if (item.alarmId == node.alarmId) {
                        this.labelList.splice(index, 1)
                    }
                })
                this.showItemDetail(this.labelList[0])
            },
            init(node) {
                if (node) {
                    this.alarmData = node
                    //左侧条目操作赋值操作
                    if (this.labelList.length > 0) {
                        this.labelList.forEach(item => {
                            item.selected = false
                        })
                    }
                    this.labelList.push({
                        unitName: node.unitName,
                        araeName: node.areaName,
                        devName: node.devName,
                        beginTime: node.time,
                        unitId: node.unitId,
                        alarmId: node.alarmId,
                        selected: true
                    })
                    //站内气象赋值操作
                    if (node.wqxList && node.wqxList.length > 0) {
                        node.wqxList.forEach(item => {
                            if (item.functioinId == 155) {
                                this.weatherList[1].value = item.fValue
                                this.weatherList[1].vcUnit = item.vcUnit
                            }
                            if (item.functioinId == 156) {
                                this.weatherList[3].value = item.fValue
                                this.weatherList[3].vcUnit = item.vcUnit
                            }
                            if (item.functioinId == 157) {
                                this.weatherList[0].value = item.fValue
                                this.weatherList[0].vcUnit = item.vcUnit
                                this.getEchartData(item.nodeId, item.functioinId)
                            }
                            if (item.functioinId == 158) {
                                this.weatherList[2].value = item.fValue
                                this.weatherList[2].vcUnit = item.vcUnit
                                this.getEchartData(item.nodeId, item.functioinId)
                            }
                        })
                    }
                    // 曲线赋值
                    if (node.nodeList && node.nodeList.length > 0) {
                        node.nodeList.forEach(item => {
                            if (item.functionid == 157) {
                                this.idListObj.arr1.push(item.f_value)
                                this.idListObj.arr3.push(moment(Number(item.i_datatime) * 1000).format('YYYY-MM-DD HH:mm'))
                            } else {
                                this.idListObj.arr2.push(item.f_value)
                            }


                        })
                        //绘画
                        this.getEnvChart(this.idListObj)
                    }
                    //    灭火资源赋值
                    this.imgUrl = node.svgList[0].vcmemo

                }
                console.log(this.alarmData)

                // this.getAlarmList(node)
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
<style>
    .font-time {
        font-family: 'DS-DIGI';
    }

    .color-fontKey {
        color: #47b2fe;
        margin-right: 10px;
    }

    .color-fontValue {
        color: yellow;
        margin-right: 16px;
    }
</style>

<style lang="stylus" scoped>
    //弹窗处理----------------------------------------------------------start-----------------------------------------------------------
    /deep/ .ivu-modal {
        top: 0.04444rem !important;
        left: auto;
        width: 100% !important;
    }

    /deep/ .ivu-modal-mask {
        background none !important
    }

    .waring-body {
        .waring-body-msg {
            height 40px
            color white
            font-size 14px
        }

        .el-container {
            .el-aside {
                padding 0

                .modal-video {
                    height 450px

                    .video-left {
                        margin-right: 16px;
                    }

                    .modal-video-single {
                        width 49%
                        float left

                        .ocxVideo {
                            width 710px !important
                            height 450px !important

                        }
                    }

                }

                .modal-map {
                    float left
                    width 710px
                    border 1px solid #195891
                    margin-top 10px
                    height 345px
                    margin-right 8px

                    .mapContanier {
                        height 292px

                    }
                }

                .modal-source {
                    float left
                    width 710px
                    border 1px solid #195891
                    margin-top 10px
                    height 345px
                }
            }

            .el-main {
                padding 0

                .con-right {
                    height: 35.8rem;
                    border 1px solid #195a9e
                    border-top-left-radius 4px
                    border-top-right-radius 4px
                    margin-left 10px

                    h4 {
                        font-size 16px
                        margin-top 20px
                        color #32e611

                    }

                    .tab-change {
                        height 30 pxW
                        line-height 30px

                        .tab {
                            border 0.04444rem solid #3ea1aa
                            width 50%
                            float left
                            text-align center
                            cursor pointer
                            color white
                        }

                        .tab-active {
                            background: rgba(15, 33, 69, 0.7);
                            color: #ffd36a;
                        }
                    }

                    .con-right-title {
                        color: #fff;
                        font-size: 20px;
                        margin 10px 0

                        .ant-btn {
                            background-color: #054166;
                            border-color: #000;

                            &.current {
                                background-color: #0291ed;
                                border-color: #013351;
                            }
                        }

                        span {
                            width 20px;
                            height 20px;
                            display inline-block;
                            background: url('~@fire/assets/img/alarm-now/star.png') no-repeat;
                            background-size: 100% 100%;
                            margin-right 5px;
                        }
                    }

                    .con-right-List {
                        width: 399px;
                        height: 28.55556rem
                        margin-top: 20px;
                        overflow-y: auto;
                        overflow-x hidden

                        li {
                            width: 400px;
                            color: #fff;
                            font-size: 17px;
                            // margin: 5px auto;
                            position relative;
                            overflow hidden;
                            border 1px solid #093774;
                            padding-bottom 10px;

                            .flag {
                                position absolute;
                                top 0;
                                left 0;
                                background: url('~@fire/assets/img/alarm-now/flag.png') no-repeat;
                                background-size: 100% 100%;
                                text-align center;
                                color #fff;
                                width 35px;
                                height 25px;
                            }

                            .con {
                                width 380px;
                                // border 1px solid red;
                                margin 15px 0 0 20px;
                                text-indent 20px;
                                padding-right 10px
                            }
                        }
                    }
                }
            }
        }
    }

    /deep/ .ivu-modal-header {
        background #185a9e
        color white
        height 50px
        font-size 16px
        border-top-left-radius 4px
        border-top-right-radius 4px
    }

    //弹窗处理----------------------------------------------------------end-----------------------------------------------------------
    .newTitle {
        width: 100%;
        height: 50px;
        line-height 50px
        background #185a9e
        border-top-left-radius 4px
        border-top-right-radius 4px
        color: #fff;
        padding-left 16px

        .ant-btn {
            background-color: #054166;
            border-color: #000;

            &.current {
                background-color: #0291ed;
                border-color: #013351;
            }
        }
        font-size: 18px;
    }

    .modal-header {
        color red
    }

    .el-button--text {
        color white
    }

    .alarm-now {
        width: 100%;
        margin: 0;
        padding: 0;
        height: 100%;
        margin-top: 20px;
        margin-left: 10px;
        display: flex;

        .noAlarm {
            width 1900px;
            height 885px;
            background: url('~@fire/assets/img/alarm-now/noAlarm.png') no-repeat;
            background-size: 100% 100%;
        }

        .alarmList {
            width: 290px;
            height: 930px;
            margin-top -75px
            float left
            padding 10px 0 0 10px
            background url('../../assets/img/common/tree-bg.png')

            .alarmNow-title {
                width: 100%;
                height: 30px;
                color: #ffd36a;
                font-size: 16px;
            }

            .alarm-now-header {
                width: 94.5%;
                height: 95%;
                overflow-y: auto;

                .alarm-now-header-items {
                    cursor: pointer;

                    .alarm-now-header-item-selected {

                        margin: 10px 10px 0px 10px;
                        padding: 10px 0 10px 10px;
                        width: 240px;
                        cursor pointer
                        background: url('~@fire/assets/img/alarm-now/select-warning2.png') no-repeat;
                        background-size: 100% 100%;
                        -moz-background-size: 100% 100%

                        ul li {
                            color white

                            .icon {
                                color red
                                margin-right 6px
                            }
                        }

                    }


                    .alarm-now-header-item {
                        margin: 10px 10px 0px 10px;
                        padding: 10px 0 10px 10px;
                        width: 240px;
                        background: url('~@fire/assets/img/alarm-now/nowAlarmbg.png') no-repeat;
                        background-size: 100% 100%;

                        ul li {
                            color white

                            .icon {
                                color red
                                margin-right 6px

                            }

                        }
                    }
                }
            }
        }

        .alarmContainer {
            width: 83.7%;
            height: 100%;
            margin-top -10px
            float left
            background: url('~@fire/assets/img/hull.png') no-repeat;
            background-size: 100% 100%;
            margin-left: 10px;

            .container {
                width: 1600px;
                overflow: hidden;
                height: 38.8rem;

                .unitTitle {
                    width: 400px;
                    height: 30px;
                    line-height: 30px;
                    margin-left: 40px;
                    color: #5987a5;
                    font-size: 20px;
                    padding-top: 10px;

                    > span {
                        color: #ffd36a;
                    }
                }

                .alarm-now-video {
                    width: 95%;
                    height 22rem
                    padding: 15px 0;
                    margin: 0px 0 5px 36px;

                    .alarm-now-video-item {
                        width: 49%;
                        height: 100%;
                        float: left;
                    }
                }

                .alarm-now-chart {
                    width: 1528px;
                    height: 300px;
                    margin-left: 36px;
                    display flex;

                    .chart-container {
                        width: 850px;
                        height: 320px;
                        border-top-left-radius 4px
                        border-top-right-radius 4px
                        border 1px solid #195891
                        margin-right 10px
                    }

                    .infoWarp-top {
                        width: 400px;
                        margin-right 10px
                        height: 320px;
                        border-top-left-radius 4px
                        border-top-right-radius 4px
                        border 1px solid #195891
                        padding: 0px 0px 0 0px;
                        box-sizing: border-box;

                        .title {
                            width: 100%;
                            height: 50px;
                            line-height 50px
                            background #185a9e
                            color: #fff;
                            padding-left 16px
                            font-size: 18px;
                        }

                        .weather {
                            width: 120px;
                            height: 120px;
                            margin: 30px auto;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .alarmInfo-box {
                            width: 100%;

                            border-top-left-radius 4px
                            border-top-right-radius 4px
                            background-size: 100% 100%;
                            box-sizing: border-box;

                            .title {
                                width: 100%;
                                height: 50px;
                                line-height 50px
                                background #185a9e
                                color: #fff;
                                padding-left 16px
                                font-size: 18px;
                            }

                            .info-wrap {
                                width: 100%;
                                height: 300px;
                                margin-top: 42px;
                                margin-left: 25px;
                                overflow-y: auto;

                                ul {
                                    overflow: hidden;

                                    li {
                                        color: #fff;
                                        font-size: 18px;
                                        margin-bottom: 15px;
                                        width: 100%;
                                        height: 30px;

                                        .name, .value {
                                            width: 120px;
                                            height: 30px;
                                            float: left;
                                            font-size 16px
                                            text-align: left;
                                        }

                                        .value {
                                            width: 180px;
                                        }

                                        .valueColor1 {
                                            color: #49ff01;
                                        }

                                        .valueColor2 {
                                            color: #ffd36a;
                                        }
                                    }
                                }
                            }
                        }

                    }

                    .infoWarp-bottom {
                        width: 450px;
                        height: 280px;
                        margin-right 10px
                        border 1px solid #195891

                        .weatherInfo {

                            padding: 10px;
                            padding-left 25px
                            left: 16%;
                            position: relative;
                            top: 10%;

                            ul {
                                li {
                                    .el-row {
                                        width 100%
                                    }
                                    height: 30px;
                                    display: flex;

                                    font-size 16px
                                    margin-right: 20px;
                                    margin-bottom: 10px;

                                    .icon {
                                        width: 20px;
                                        height: 20px;

                                        img {
                                            width: 100%;
                                            height: 100%;
                                        }
                                    }

                                    .name {
                                        color: #fff;
                                        margin-left: 10px;
                                        line-height: 25px;
                                    }

                                    .value {
                                        color: #49ff01;
                                        margin-left: 10px;
                                        line-height: 26px;
                                        font-family: 'DS-DIGI';

                                    }

                                    .com {
                                        color: #49ff01;
                                        line-height: 25px;
                                    }
                                }

                                li:nth-child(2n) {
                                    margin-right: 0;
                                }
                            }
                        }

                    }

                    .alarm-btn {
                        width: 95%;
                        height: 50px;
                        text-align: center;
                        margin-top 56px

                        .btn {
                            width: 45%;
                            height: 30px;
                            color: #fff;
                            font-size: 16px;
                            border: none;
                            cursor: pointer;
                        }

                        .confirm {
                            background: url('~@fire/assets/img/alarm-now/comfim.png') no-repeat;
                            background-size: 100% 100%;
                        }

                        .false {
                            background: url('~@fire/assets/img/alarm-now/fasle.png') no-repeat;
                            background-size: 100% 100%;
                            margin-left: 15px;
                        }
                    }
                }
            }

            .container-right {
                width: 25%;
                margin-left: 10px;
                padding: 8px 2px 5px 1px;
                box-sizing: border-box;
            }
        }

        .alarmPlanBox {
            width: 100%;
            height: 38rem;
            background: url('~@fire/assets/img/alarm-now/alarmBoxBg.png') no-repeat;
            background-size: 100% 100%;
            position: relative;
            left 3.5%

            .close {
                width: 25px;
                height: 25px;
                position: absolute;
                top: 20px;
                right: 30px;
                background: url('~@fire/assets/img/alarm-now/close.png') no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
            }

            .title {
                width: 400px;
                height: 30px;
                color: #3299ff;
                position: relative;
                left: 38%
                font-size: 19px;
                background: url('~@fire/assets/img/alarm-now/alarmTiltle.png') no-repeat;
                background-size: 100% 100%;
                text-align: center;
            }

            .alarmPlanCon {
                width: 95%;
                margin-top 1rem
                height: 720px;
                display: flex;
                margin-left: 32px;
                padding: 20px;
                box-sizing: border-box;

                .con-left {
                    width: 76%;
                    height: 34.1rem;
                    margin-right 10px

                    // border 1px solid red;

                    .left-topCon {
                        width: 100%;
                        height: 55%;
                        display: flex;
                        margin-bottom: 5px;

                        .videoAlarm {
                            width: 50%;
                            height: 100%;
                        }
                    }

                    .left-bottomCon {
                        width: 100%;
                        height: 50%;
                        display: flex;
                        margin-top 9px

                        .left-bottomCon-left {
                            width: 400px;
                            height: 350px;
                            margin-right 10px

                            .alarmInfo-box {
                                width: 100%;
                                height: 339px;
                                border-top-left-radius 4px
                                border-top-right-radius 4px
                                border 1px solid #195a9e
                                box-sizing: border-box;
                                font-size 16px

                                .info-wrap {
                                    width: 100%;
                                    height: 300px;
                                    margin: 25px 0 0 50px;

                                    ul {
                                        overflow: hidden;

                                        li {
                                            color: #fff;
                                            font-size 16px
                                            margin-bottom: 20px;
                                            width: 100%;
                                            height: 30px;

                                            .name, .value {
                                                width: 150px;
                                                height: 30px;
                                                float: left;
                                                text-align: left;
                                            }

                                            .value {
                                                width 180px;
                                            }

                                            .valueColor1 {
                                                color: #49ff01;
                                            }

                                            .valueColor2 {
                                                color: #ffd36a;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        .left-bottomCon-center {
                            width: 330px;
                            height: 340px;
                            border 1px solid #195a9e
                            border-top-left-radius 4px
                            border-top-right-radius 4px
                            box-sizing: border-box;
                            margin-right 10px

                            .areatitle {
                                width: 100%;
                                height: 20px;
                                color: #fff;
                                font-size: 16px;
                            }

                            .weather {
                                width: 120px;
                                height: 120px;
                                margin: 45px auto;

                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .weatherInfo {
                                height: 90px;
                                margin-left 25px
                                left: 16%;
                                position: relative;
                                top: 16%;


                                ul {
                                    li {
                                        .el-row {
                                            width 100%
                                        }

                                        height: 30px;
                                        display: flex;

                                        font-size 16px
                                        margin-bottom: 10px;

                                        .icon {
                                            width: 20px;
                                            height: 20px;

                                            img {
                                                width: 100%;
                                                height: 100%;
                                            }
                                        }

                                        .name {
                                            color: #fff;
                                            margin-left: 10px;
                                            line-height: 25px;
                                        }

                                        .value {
                                            color: #49ff01;
                                            margin-left: 10px;
                                            line-height: 26px;
                                            font-family: 'DS-DIGI';

                                        }

                                        .com {
                                            color: #49ff01;
                                            line-height: 25px;
                                        }
                                    }

                                    li:nth-child(2n) {
                                        margin-right: 0;
                                    }
                                }
                            }
                        }

                        .left-bottomCon-right {
                            width: 560px;
                            height: 340px;
                            border 1px solid #195a9e
                            border-top-left-radius 4px
                            border-top-right-radius 4px
                            box-sizing: border-box;

                            .htCon {
                                img {
                                    width 22rem
                                    height 11rem
                                    margin 16px
                                }
                            }
                        }
                    }
                }

                .con-right {
                    width: 25%;
                    height: 34.2rem;
                    border 1px solid #195a9e
                    border-top-left-radius 4px
                    border-top-right-radius 4px
                    margin-left 10px
                    margin-left: 0px;

                    h4 {
                        font-size 16px
                        margin-top 20px
                        color #32e611

                    }

                    .tab-change {
                        height 30 pxW
                        line-height 30px

                        .tab {
                            border 0.04444rem solid #3ea1aa
                            width 50%
                            float left
                            text-align center
                            cursor pointer
                            color white
                        }

                        .tab-active {
                            background: rgba(15, 33, 69, 0.7);
                            color: #ffd36a;
                        }
                    }

                    .con-right-title {
                        color: #fff;
                        font-size: 20px;
                        margin 10px 0

                        .ant-btn {
                            background-color: #054166;
                            border-color: #000;

                            &.current {
                                background-color: #0291ed;
                                border-color: #013351;
                            }
                        }

                        span {
                            width 20px;
                            height 20px;
                            display inline-block;
                            background: url('~@fire/assets/img/alarm-now/star.png') no-repeat;
                            background-size: 100% 100%;
                            margin-right 5px;
                        }
                    }

                    .con-right-List {
                        width: 399px;
                        height: 28.55556rem
                        margin-top: 20px;
                        overflow-y: auto;
                        overflow-x hidden

                        li {
                            width: 400px;
                            color: #fff;
                            font-size: 17px;
                            // margin: 5px auto;
                            position relative;
                            overflow hidden;
                            border 1px solid #093774;
                            padding-bottom 10px;

                            .flag {
                                position absolute;
                                top 0;
                                left 0;
                                background: url('~@fire/assets/img/alarm-now/flag.png') no-repeat;
                                background-size: 100% 100%;
                                text-align center;
                                color #fff;
                                width 35px;
                                height 25px;
                            }

                            .con {
                                width 380px;
                                // border 1px solid red;
                                margin 15px 0 0 20px;
                                text-indent 20px;
                                padding-right 10px
                            }
                        }
                    }
                }
            }
        }

    }
</style>
