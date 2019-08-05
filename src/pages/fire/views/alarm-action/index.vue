<template>

    <div class="alarm-now">
        <div class='noAlarm' v-show="alarmHide"></div>
<!--        当前页面-->
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
<!--        确定页面-->
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
                        serviceInfo: '1$172.26.1.18$6800$admin$admin',
                        deviceInfo: '64a8e27f9e3011e9ac508cec4b8f5477',
                        hideTool: true
                    },
                    {
                        isAutoPlay: true,
                        serviceInfo: '1$172.26.1.18$6800$admin$admin',
                        deviceInfo: '62761a899e3011e9ac508cec4b8f5477',
                        hideTool: true
                    }
                ],
                videoAlarm: [
                    {
                        isAutoPlay: true,
                        serviceInfo: '1$172.26.1.18$6800$admin$admin',
                        deviceInfo: '64a8e27f9e3011e9ac508cec4b8f5477',
                        hideTool: true
                    },
                    {
                        isAutoPlay: true,
                        serviceInfo: '1$172.26.1.18$6800$admin$admin',
                        deviceInfo: '62761a899e3011e9ac508cec4b8f5477',
                        hideTool: true
                    }
                ],
                alarmDetail: {},
                labelList: [],
                //chart
                envChart: null,
                timeData: [],
                chartData: [],
                chartData2: [],
                categorName: ['温度', '湿度'],
                weatherImg: require('@/assets/img/common/sun.png'),
                weatherList: [
                ],
                alarmListInfo: [
                ],
                alarmHide: false,
                confirHide: false,
                comfireAlarm: true,
                unitTitle: '500kV东善桥变电站',
                alarmTitle: '500kV东善变',
                untiID: this.$store.getters.unitId,
                protectAreaId: '',
                htInfoList: [
                ],
                disposeList: [
                ],
                //定义声明控制charts显示入参arr1为温度，arr2为湿度，arr3为时间轴
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
            /**
             *获取报警信息列表 列表初始化调用
             *
             */
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
            /**
             * 点击显示报警信息显示详情渲染视图
             * param：item为当前勾选对象
             */
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
            //charts表渲染
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
                        top: 20,
                        right: 10,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    color: ["#47b2fe", "#5d6040"],
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
                        },
                        areaStyle:{
                            color:"#fff"
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
                                color: '#eb6100'
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
                            data:obj.arr2,
                            type: 'line',
                            areaStyle: {
                                color: '#47b2fe'
                            },
                            itemStyle: {
                                color: '#47b2fe'
                            },
                            lineStyle: {
                                color: 'blue'
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
            //天气参数获取
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
                    //转换时间格式成需要的
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
            //获取ht接口数据
            getHtMap() {
                this.$_api.alarmAction.getHtMap({
                    unitId: this.$store.getters.stationId,
                    subIdsStr: '90010001'
                }).then(res => {
                    if (res.code == 200) {
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
                    width: 45%;
                    margin 0 10px
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
                        font-size: 16px;
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
                        padding: 16px;
                        box-sizing: border-box;

                        .title {
                            width: 100%;
                            height: 20px;
                            color: #fff;
                            font-size: 16px;
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
                            font-size 16px

                            .aInfotitle {
                                width: 100%;
                                height: 20px;
                                color: #fff;
                                font-size 16px
                            }

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
                        background: url('~@fire/assets/img/alarm-now/air-wrap.png') no-repeat;
                        background-size: 100% 100%;
                        padding: 10px 20px 0 20px;
                        box-sizing: border-box;

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
                            font-size: 16px;
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
                            padding-right 10px
                        }
                    }
                }
            }
        }
    }

    }
</style>
