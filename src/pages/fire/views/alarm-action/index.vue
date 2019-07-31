<template>

    <div class="alarm-now">
        <div class='noAlarm' v-show="alarmHide"></div>
        <div class="alarmList" v-show="comfireAlarm">
            <div class="alarmNow-title">当前报警信息</div>
            <div class="alarm-now-header">
                <div class="alarm-now-header-items">
                    <div
                            class="alarm-now-header-item"
                            v-for="(item,index) in labelList"
                            :key="index"
                            @click="showItemDetail(item)"
                    >
                        <ul>
                            <li>
                                <span class="icon">●</span>
                                <span>{{item.unitName}}</span>
                            </li>
                            <li>
                                <span class="icon">●</span>
                                <span>{{item.araeName}}</span>
                            </li>
                            <li>
                                <span class="icon">●</span>
                                <span>{{item.devName}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="alarmContainer" v-show="comfireAlarm">
            <div class="container">
                <div class="unitTitle">
                    当前报警变电站:
                    <span>{{unitTitle}}</span>
                </div>
                <div class="alarm-now-video" v-if="comfireAlarm">
                    <div class="alarm-now-video-item" v-for="(videoItem,index) in videoConfig" :key="index">
                        <OcxVideo :videoConfig="videoItem"></OcxVideo>
                    </div>
                </div>
                <div class="alarm-now-chart">
                    <div class="chart-container" ref="envChart"></div>
                    <div class="infoWarp-top">
                        <div class="title">站内气象:</div>
                        <div class="weather">
                            <img :src="weatherImg" alt>
                        </div>
                        <div class="weatherInfo">
                            <ul>
                                <li v-for="(item,index) in weatherList" :key="index">
                                    <div class="icon">
                                        <img :src="item.icon" alt>
                                    </div>
                                    <div class="name">{{item.name}}</div>
                                    <div class="value">{{item.value}}</div>
                                    <div class="com">{{item.vcUnit}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="infoWarp-bottom">
                        <div class="alarmInfo-box">
                            <div class="title">报警信息:</div>
                            <div class="info-wrap">
                                <ul>
                                    <li v-for="(infoItem,index) in alarmListInfo" :key="index">
                                        <div class="name">{{infoItem.name}}</div>
                                        <div
                                                :class="['value' ,index%2==0 ?'valueColor1':'valueColor2']"
                                        >{{infoItem.value}}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="alarm-btn">
                            <button class="btn confirm" @click="alarmShow()">确定</button>
                            <button class="btn false">误报</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="alarmPlanBox" v-if="confirHide">
            <div class="close" @click="close()"></div>
            <div class="title">
                <span>{{alarmTitle}}消防报警应急预案</span>
            </div>
            <div class="alarmPlanCon">
                <div class="con-left">
                    <div class="left-topCon" v-if="confirHide">
                        <div class="videoAlarm" v-for="(valarmItem,index) in videoConfig" :key="index">
                            <OcxVideo :videoConfig="valarmItem"></OcxVideo>
                        </div>
                    </div>
                    <div class="left-bottomCon">
                        <div class="left-bottomCon-left">
                            <div class="alarmInfo-box">
                                <div class="aInfotitle">报警信息:</div>
                                <div class="info-wrap">
                                    <ul>
                                        <li v-for="(infoItem,index) in alarmListInfo" :key="index">
                                            <div class="name">{{infoItem.name}}</div>
                                            <div
                                                    :class="['value' ,index%2==0 ?'valueColor1':'valueColor2']"
                                            >{{infoItem.value}}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="left-bottomCon-center">
                            <div class="areatitle">站内气象:</div>
                            <div class="weather">
                                <img :src="weatherImg" alt>
                            </div>
                            <div class="weatherInfo">
                                <ul>
                                    <li v-for="(item,index) in weatherList" :key="index">
                                        <div class="icon">
                                            <img :src="item.icon" alt>
                                        </div>
                                        <div class="name">{{item.name}}</div>
                                        <div class="value">{{item.value}}</div>
                                        <div class="com">{{item.vcUnit}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="left-bottomCon-right">
                            <div class="bottomCon-right-title">灭火资源:</div>
                            <div class="htCon">
                                <div class="ht">
                                    <htCommon ref="htCommon"></htCommon>
                                </div>
                                <div class="htInfo">
                                    <div class="infoList" v-for="(infoIntem,index) in htInfoList" :key="index">
                                        <div class="infoTitle">{{infoIntem.name}}</div>
                                        <div class="infoCon">
                                            <ul>
                                                <li v-for="(items,index) in infoIntem.value" :key="index">
                                                    <div class="itemsName">{{items.listName}}</div>
                                                    <div class="itemsValue">{{items.listValue}}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="con-right">
                    <div class="con-right-title"><span></span>应急预警处置:</div>
                    <h4>{{cfgName}}:</h4>
                    <div class="con-right-List">
                        <ul>
                            <li v-for="(disposeItem, index) in disposeList" :key="index">
                                <div class="flag">{{index+1}}</div>
                                <p class="con">{{disposeItem.itemContext}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OcxVideo from '@/components/native/video/OcxVideo'
    // import htCommon from '@fire/views/common/ht-common'
    import htCommon from './alarm-ht'
    import moment from 'moment'

    export default {
        name: 'alarm-now',
        components: {
            OcxVideo,
            htCommon
        },
        props: {
            node: {
                type: String,
                require: false,
                default: ''
            }
        },
        data() {
            return {
                cfgName:"",
                videoConfig: [
                    {
                        isAutoPlay: true,
                        serviceInfo: '1$22.46.34.114$6800$admin$admin',
                        deviceInfo: '2|22.46.34.114:37782|admin:admin123|2',
                        hideTool: true
                    },
                    {
                        isAutoPlay: true,
                        serviceInfo: '1$22.46.34.114$6800$admin$admin',
                        deviceInfo: '2|22.46.34.114:37781|admin:admin123|1',
                        hideTool: true
                    }
                ],
                videoAlarm: [
                    {
                        isAutoPlay: true,
                        serviceInfo: '1$172.26.1.128$6800$admin$admin',
                        deviceInfo: '2|172.26.1.28:37777|admin:admin123|0',
                        hideTool: true
                    },
                    {
                        isAutoPlay: true,
                        serviceInfo: '1$22.46.34.114$6800$admin$admin',
                        deviceInfo: '',
                        hideTool: true
                    }
                ],
                alarmDetail: {},
                labelList: [
                    {
                        unitName: '500kV东善桥变电站'
                    },
                    {
                        unitName: '1号主变防护区'
                    },
                    {
                        unitName: '1#烟感探测器报警'
                    }
                ],
                //chart
                envChart: null,
                timeData: ["2019-07-25 07:08", "2019-07-25 07:16", "2019-07-25 07:23", "2019-07-25 07:30", "2019-07-25 07:45", "2019-07-25 07:50", "2019-07-25 07:55", "2019-07-25 08:08", "2019-07-25 08:16", "2019-07-25 08:20"],
                chartData: ["30", '32.2', '34', '33.5', '34', '34.1', '33.9', '33.8', '33.2', '32.3'],
                chartData2: ['35', '34', '33.2', '33.1', '33.5', '31.3', '31.4', '35', '34.6', '34.2'],
                categorName: ['温度', '湿度'],
                weatherImg: require('@/assets/img/common/sun.png'),
                weatherList: [
                    {icon: require('@fire/assets/img/alarm-now/wendu.png'),  name: '温度:', value: '34'},
                    {icon: require('@fire/assets/img/alarm-now/fengsu.png'),  name: '风速:', value: '4'},
                    {icon: require('@fire/assets/img/alarm-now/shidu.png'), name: '湿度:', value: '65'},
                    {icon: require('@fire/assets/img/alarm-now/fengxiang.png'), name: '风向:', value: '东南'}
                ],
                alarmListInfo: [
                    {name: '防护区:', value: '1号主变防护区'},
                    {name: '断电信号:', value: '断开'},
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
                disposeList: [
                    {con: '变压器发生火灾时，优先（自动）启动固定灭火系统进行灭火'},
                    {con: '若变压器固定自动灭火系统未自动启动，到达现场的运维人员应立即汇报当值调度和有关领导并拨打119火灾报警电话。'},
                    {con: '断开着火变压器各侧断路器；必要时应将该变压器附近电力设备停电。变压器转冷备用状态，切断直流控制电源、交流控制电源、交流风扇电源等。'},
                    {con: '现场运维人员需将变压器固定自动灭火系统（自动化小室、保护室等处）控制装置控制由自动切换手动，进行远方启动灭火，若远方启动无法成功，则穿戴个人防护用品后在装置现场紧急启动。'},
                    {con: '待政府消防队到达火场时，运维人员应立即与消救援队负责人取得联系并交代失火设备现状和运行设备状态，然后协助政府消防队灭火。'},
                ],
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
                    console.log(val + 'zhege');
                }
            },
            node(val) {
                console.log(val);
                this.node = val
            }
        },
        created() {

        },
        mounted() {
            this.envChart = this.$_echarts.init(this.$refs['envChart'])

            if (this.node) {
                this.getAlarmList()
            } else {
                this.init();
            }
        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            getAlarmList() {
                this.$_api.alarmAction
                    .getAlarmList({
                        unitId: "192fe4cec3ec4d3fb81c0d05f82bde41" || this.node,
                        // alarmId: '1'
                    })
                    .then(res => {
                        if (res.code == 200) {
                            if (res.data) {
                                this.labelList = res.data
                                this.unitTitle = this.alarmTitle = res.data[0].unitName
                                this.showItemDetail(res.data[0]);

                            }
                        }
                    })
            },
            async showItemDetail(item) {
                this.unitTitle = this.alarmTitle = item.unitName
                let result = await this.$_api.alarmAction.getAlarmData({
                    unitId: '192fe4cec3ec4d3fb81c0d05f82bde41',
                    alarmId: item.alarmId
                })
                if (result.success) {
                    // console.log(result.data)
                    this.alarmListInfo[0].value = result.data.araeName;
                    this.alarmListInfo[2].value = result.data.devName;
                    this.alarmListInfo[3].value = result.data.nodeName;
                    this.alarmListInfo[4].value = moment(result.data.beginTime * 1000).format('YYYY-MM-DD HH:mm')
                    this.alarmDetail = result.data
                    this.protectAreaId = result.data.protectAreaId
                    this.getVideoData();
                    this.getAreaData();
                    const obj={
                        unitId: '192fe4cec3ec4d3fb81c0d05f82bde41',
                        areaId:this.protectAreaId
                    }
                    this.getReserve(obj)


                }
            },
            /**
             * 查询预案接口（应急预警处置）
             */
            async getReserve(item){
                let result = await this.$_api.alarmAction.getReserve({
                    unitId: '192fe4cec3ec4d3fb81c0d05f82bde41',
                    areaId: item.areaId
                })
                if (result.success) {
                    this.cfgName=result.data.cfgName
                    this.disposeList=result.data.list
                }

            },
            getEnvChart(obj) {
                let option = {
                    title: {
                        show: true,
                        text: '环境态势',
                        textStyle: {
                            color: '#85c9ee',
                            // fontFamily: "DS-DIGI",
                            fontSize: 20,
                            align: 'center'
                        },
                        top: 20,
                        left: 20
                    },
                    legend: {
                        data: this.categorName,
                        // data:["131","132"],
                        // orient: 'vertical',
                        top: 20,
                        right: 10,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    color: ["#47b2fe", "#5d6040"],
                    grid: [
                        {
                            // top: 20,
                            // height: 250,
                            containLabel: true
                        }
                    ],
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: obj.arr3,
                        axisLine: {
                            lineStyle: {
                                color: '#1a6b98',
                                width: 2
                            }
                        },
                        axisLabel: {
                            color: '#85c9ee',
                            show: true,
                            textStyle: {
                                fontSize: 16
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#1a6b98',
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
                                backgroundColor: '#08304a'
                            }
                        },
                        textStyle: {
                            color: '#85c9ee'
                        }
                    },
                    series: [
                        {
                            name: this.categorName[0],
                            data: obj.arr1,
                            type: 'line',
                            areaStyle: {
                                color: '#47b2fe'
                            },
                            itemStyle: {
                                color: '#47b2fe'
                            },
                            lineStyle: {
                                color: '#47b2fe'
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
                            data:obj.arr2,
                            type: 'line',
                            areaStyle: {
                                color: '#5d6040'
                            },
                            itemStyle: {
                                color: '#5d6040'
                            },
                            lineStyle: {
                                color: '#5d6040'
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
                            borderColor: 'rgba(1,37,59,0.5)',
                            backgroundColor: 'rgba(1,37,59,0.5)',
                            dataBackgroundColor: 'rgba(47,126,181,0.9)',
                            fillerColor: 'rgba(1,138,225,0.5)',
                            handleColor: 'rgba(1,37,59,0.8)'
                        }
                    ]
                }
                this.envChart.setOption(option)
            },
            //视频
            getVideoData() {
                this.$_api.alarmAction
                    .getVideoData({
                        unitId: '192fe4cec3ec4d3fb81c0d05f82bde41',
                        protectAreaId: this.protectAreaId
                    })
                    .then(res => {
                        // console.log(res)
                        if (res.code == 200) {
                            if (res.data) {
                                this.videoConfig[0].deviceInfo = res.data[0].vcParams1
                                this.videoConfig[1].deviceInfo = res.data[1].vcParams1
                            }
                        }
                    })
            },
            //天气
            getAreaData() {
                this.$_api.alarmAction
                    .getAreaData({
                        unitId: '192fe4cec3ec4d3fb81c0d05f82bde41',
                        areaId: this.protectAreaId,
                        devTypeId:'1010'
                    })
                    .then(res => {
                        res.data.forEach((item) => {
                            if (item.functioinId == 155) {
                                this.weatherList[1].value=item.fValue
                                this.weatherList[1].vcUnit=item.vcUnit

                            }
                            if (item.functioinId == 156) {
                                this.weatherList[3].value=item.fValue
                                this.weatherList[3].vcUnit=item.vcUnit

                            }
                            if (item.functioinId == 157) {
                                this.weatherList[0].value=item.fValue
                                this.weatherList[0].vcUnit=item.vcUnit
                                this.getEchartData(item.nodeId,item.functioinId)

                            }
                            if (item.functioinId == 158) {
                                this.weatherList[2].value=item.fValue
                                this.weatherList[2].vcUnit=item.vcUnit
                                this.getEchartData(item.nodeId,item.functioinId)
                            }
                        })
                    })
            },
            //echarts数据
            getEchartData(id,target) {
                this.$_api.alarmAction.getEchartData({
                    nodeId:id,
                    startTime: Math.round(new Date().getTime()/1000)-604800,
                    endTime: Math.round(new Date().getTime()/1000)
                }).then(res => {
                    const newArr=[],dateArr=[]
                    res.data.forEach((i)=>{
                        newArr.push(i.f_Value)
                        dateArr.push(moment(i.i_DataTime * 1000).format('YYYY-MM-DD hh:mm:ss'))

                    })
                    if(target==157){
                        this.idListObj.arr1=newArr
                        this.idListObj.arr3=dateArr
                    }else if(target==158) {
                        this.idListObj.arr2=newArr
                    }
                    if(this.idListObj.arr1.length>0&&this.idListObj.arr2.length>0){
                        this.getEnvChart(this.idListObj)
                    }
                })
            },
            getHtMap() {
                this.$_api.alarmAction.getHtMap({
                    unitId: this.node,
                    subIdsStr: '90010001'
                }).then(res => {
                    if (res.code == 200) {
                        console.log(res.data[0].vcUrl);
                        this.hturl = res.data[0].vcUrl
                        // console.log(res);
                    }

                })
            },
            alarmShow() {
                this.comfireAlarm = false;
                this.confirHide = true;
                this.getHtMap();
                // console.log(this.hturl);
            },
            close() {
                this.comfireAlarm = true;
                this.confirHide = false
            },
            init() {
                this.getAlarmList()
                // this.getEnvChart()
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
<style>

    .font-time {
        font-family: 'DS-DIGI';
    }

</style>

<style lang="stylus" scoped>
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
            width: 15%;
            height: 770px;
            background-color: #09112e;

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

                    .alarm-now-header-item {
                        margin: 10px 10px 0px 10px;
                        padding: 10px 0;
                        width: 240px;
                        background: url('~@fire/assets/img/alarm-now/nowAlarmbg.png') no-repeat;
                        background-size: 100% 100%;

                        ul li {
                         color: white

                        .icon {
                            margin: 0 20px;
                            color: #ff0f2e;
                        }
                    }
                }
            }
        }
    }

    .alarmContainer {
        width: 82.7%;
        height: 100%;
        display: flex;
        background: url('~@fire/assets/img/hull.png') no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;

        .container {
            width: 1600px;
            overflow: hidden;
            height 830px

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
                width: 1525px;
                height: 450px;
                padding: 15px 0;
                margin: 0px 0 5px 36px;

                .alarm-now-video-item {
                    width: 50%;
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
                    background: url('~@fire/assets/img/alarm-now/enviroment-chart.png') no-repeat;
                    background-size: 100% 100%;
                }

                .infoWarp-top {
                    width: 405px;
                    height: 320px;
                    background: url('~@fire/assets/img/alarm-now/air-wrap.png') no-repeat;
                    background-size: 100% 100%;
                    padding: 10px 20px 0 20px;
                    box-sizing: border-box;
                    .title {
                        width: 100%;
                        height: 20px;
                        color: #fff;
                        font-size: 20px;
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

                    .weatherInfo {
                        height: 90px;
                        padding: 10px;

                        ul {
                            li {
                                width: 140px;
                                height: 30px;
                                display: flex;
                                float: left;
                                font-size: 15px;
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

                .infoWarp-bottom {
                    width: 450px;
                    height: 380px;
                    margin-right 10px

                    .alarmInfo-box {
                        width: 100%;
                        height: 280px;
                        background: url('~@fire/assets/img/alarm-now/info-wrap.png') no-repeat;
                        background-size: 100% 100%;
                        padding: 20px;
                        box-sizing: border-box;

                        .title {
                            width: 100%;
                            height: 20px;
                            color: #fff;
                            font-size: 20px;
                        }

                        .info-wrap {
                            width: 100%;
                            height: 300px;
                            margin-top: 20px;
                            margin-left: 10px;
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

                .alarm-btn {
                    width: 100%;
                    height: 50px;
                    text-align: center;

                    .btn {
                        width: 45%;
                        height: 30px;
                        color: #fff;
                        font-size: 20px;
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
        width: 99%;
        height: 830px;
        background: url('~@fire/assets/img/alarm-now/alarmBoxBg.png') no-repeat;
        background-size: 100% 100%;
        position: relative;

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
            position: absolute;
            top: 9px;
            left: 800px;
            font-size: 19px;
            background: url('~@fire/assets/img/alarm-now/alarmTiltle.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
        }

        .alarmPlanCon {
            width: 95%;
            height: 720px;
            display: flex;
            margin-top: 50px;
            margin-left: 50px;
            padding: 20px;
            box-sizing: border-box;

            .con-left {
                width: 75%;
                height: 800px;

                // border 1px solid red;

                .left-topCon {
                    width: 100%;
                    height: 50%;
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
                    .left-bottomCon-left {
                        width: 420px;
                        height: 350px;

                        .alarmInfo-box {
                            width: 100%;
                            height: 340px;
                            background: url('~@fire/assets/img/alarm-now/info-wrap.png') no-repeat;
                            background-size: 100% 100%;
                            padding: 20px;
                            box-sizing: border-box;

                            .aInfotitle {
                                width: 100%;
                                height: 20px;
                                color: #fff;
                                font-size: 20px;
                            }

                            .info-wrap {
                                width: 100%;
                                height: 300px;
                                margin: 25px 0 0 50px;

                                ul {
                                    overflow: hidden;

                                    li {
                                        color: #fff;
                                        font-size: 18px;
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
                        background: url('~@fire/assets/img/alarm-now/air-wrap.png') no-repeat;
                        background-size: 100% 100%;
                        padding: 10px 20px 0 20px;
                        box-sizing: border-box;

                        .areatitle {
                            width: 100%;
                            height: 20px;
                            color: #fff;
                            font-size: 20px;
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

                            ul {
                                li {
                                    width: 140px;
                                    height: 30px;
                                    display: flex;
                                    float: left;
                                    font-size: 15px;
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
                        background: url('~@fire/assets/img/alarm-now/resoure.png') no-repeat;
                        background-size: 100% 100%;
                        padding: 10px 20px;
                        box-sizing: border-box;

                        .bottomCon-right-title {
                            width: 300px;
                            height: 30px;
                            color: #fff;
                            font-size: 20px;
                        }

                        .htCon {
                            width: 100%;
                            height: 300px;
                            display: flex;

                            .ht {
                                width: 70%;
                                height: 300px;

                                .mapHT {
                                    width: 100%;
                                    height: 100%;
                                    position: relative;
                                }
                            }

                            .htInfo {
                                width: 30%;
                                height: 300px;

                                .infoList {
                                    width: 165px;
                                    height: 100px;
                                    background: url('~@fire/assets/img/alarm-now/details.png') no-repeat;
                                    background-size: 100% 100%;

                                    .infoTitle {
                                        color: #fff;
                                        text-align: center;
                                        line-height: 35px;
                                    }

                                    .infoCon {
                                        width: 150px;
                                        height: 50px;
                                        margin: 0 auto;
                                        padding: 0 5px;

                                        li {
                                            display: flex;
                                            color: #fff;
                                            width: 100%;
                                            margin-bottom: 5px;
                                            justify-content: space-between;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .con-right {
                width: 25%;
                height: 760px;
                background: url('~@fire/assets/img/alarm-now/alarmPlanInfo.png') no-repeat;
                background-size: 100% 100%;
                margin-left: 20px;
                padding: 15px;
                h4{
                    font-size 16px
                    margin-top 20px
                    color #32e611

                }

                .con-right-title {
                    color: #fff;
                    font-size: 20px;

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
                    width: 100%;
                    height: 620px;
                    margin-top: 20px;
                    overflow-y: auto;

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
                        }
                    }
                }
            }
        }
    }

    }
</style>
