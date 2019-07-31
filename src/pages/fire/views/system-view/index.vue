<template>
    <div class="systemView">
        <el-container>
            <el-aside width="62%">
                <div class="map">
                    <div class="border-lt"></div>
                    <div class="border-rb"></div>
                    <div class="mapBox">
                        <mapComponent ref="map" @clickRcuImg="clickRcuImg" :moduleNames="'fireMap'"
                                      :javainterface="javainterface"></mapComponent>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <div class="elMain-top">
                    <div class="elMain-top-title">消防统计:</div>
                    <div v-for="(d,index) in paraData " :key="index" class="item">
                        <div :ref="d.id" class="elMain-top-content">
                        </div>
                        <div class="elMain-top-contentDetail">
                            <span class="elMain-top-contentDetail-span">
                                <p v-for="(s,i) in d.detail" :key="i">
                                    <span :class="s.class">■</span> <span class="color-white ">{{s.name}}：</span>
                                    <span class="color-light-green  font-time"> {{s.value}}</span>
                                </p>

                            </span>
                        </div>
                    </div>
                </div>
                <div class="elMain-bottom">
                    <div class="elMain-bottom-title">消防系统:</div>
                    <div class="elMain-bottom-Item">
                        <el-row>
                            <el-col :span="12" v-for="(i,index) in fireList" :key="index">
                                <div class="elMain-bottom-Item-single">
                                    <div class="left">
                                        <div>
                                            <img v-show="i.SubSystemID=='90010016'"
                                                 src='../../assets/img/sys/90010016.png' width="20px" alt="">
                                            <img v-show="i.SubSystemID=='90010001'"
                                                 src='../../assets/img/sys/90010001.png' width="30px" alt="">
                                            <img v-show="i.SubSystemID=='90010019'"
                                                 src='../../assets/img/sys/90010019.png' width="30px" alt="">
                                            <img v-show="i.SubSystemID=='90010018'"
                                                 src='../../assets/img/sys/90010018.png' width="30px" alt="">
                                            <img v-show="i.SubSystemID=='90010014'"
                                                 src='../../assets/img/sys/90010014.png' width="30px" alt="">
                                            <img v-show="i.SubSystemID=='90010011'"
                                                 src='../../assets/img/sys/90010011.png' width="30px" alt="">
                                            <img v-show="i.SubSystemID=='90010017'"
                                                 src='../../assets/img/sys/90010017.png' width="30px" alt="">
                                        </div>
                                        {{i.vcName}}
                                    </div>
                                    <div class="right">
                                        <div class="r1">
                                            <div class="r1-btn">
                                                <span class="font-time color-light-green">{{i.totalCount}}</span>
                                            </div>
                                            设备数
                                        </div>
                                        <div class="r1">
                                            <div class="r1-btn">
                                                <span class="color-red font-time">{{i.alarmCount}} </span>
                                            </div>
                                            异常数
                                        </div>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    // 地图使用的指令
    import {center} from '@/directives/directive.js'
    import mapComponent from '@/components/native/mapComponent/mapComponent'

    export default {
        name: 'systemView',
        components: {
            mapComponent
        },
        props: {},

        data() {
            return {
                defaultMapConfig: {
                    center: {lng: 118.79288, lat: 31.88029},
                    zoom: 10,
                    scrollWheelZoom: true,
                    minZoom: 8,
                    maxZoom: 15
                },
                // 地图相关数据
                rcu35: require('@/assets/img/common/rcu-35kV.png'),
                rcu110: require('@/assets/img/common/rcu-110kV.png'),
                rcu220: require('@/assets/img/common/rcu-220kV.png'),
                rcu500: require('@/assets/img/common/rcu-500kV.png'),
                paraData: [
                    {
                        id: "test0",
                        title: "站点",
                        describe: '站点统计',
                        color1: 'color-yellow',
                        detail: [
                            {value: 68, name: '在线', class: "color-yellow shape-icon"},
                            {value: 2, name: '离线', class: "color-blue shape-icon"},
                        ],
                        color: ['#37a8f2', '#ffdf6f'],  //手动设置每个图例的颜色
                    },
                    {
                        id: "test1",
                        title: "警情",
                        describe: '警情统计',
                        detail: [
                            {value: 78, name: '预警', class: "color-blue shape-icon"},
                            {value: 22, name: '报警', class: "color-red shape-icon"},
                        ],
                        color: ['#37a8f2', '#cf1322'],  //手动设置每个图例的颜色
                    },
                    {
                        id: "test2",
                        title: "设备",
                        describe: '设备统计',
                        detail: [
                            {value: 58, name: '正常', class: "color-blue shape-icon"},
                            {value: 49, name: '故障', class: "color-dark-yellow shape-icon"},
                        ],
                        color: ['#37a8f2', '#e69110'],  //手动设置每个图例的颜色
                    },
                    {
                        id: "test4",
                        title: "缺陷",
                        describe: '缺陷统计',
                        detail: [
                            {value: 68, name: '一类', class: "color-red shape-icon"},
                            {value: 30, name: '二类', class: "color-dark-yellow shape-icon"},
                            {value: 90, name: '三类', class: "color-yellow shape-icon"},
                        ],
                        color: ['#cf1322', '#e69110', '#ffdf6f'],  //手动设置每个图例的颜色
                    },

                ],
                option: {
                    title: {//标题组件
                        text: '站点',
                        left: '36%',//标题的位置 默认是left，其余还有center、right属性
                        top: '42%',
                        textStyle: {
                            color: "#fff",
                            fontSize: 16,
                        }
                    },
                    tooltip: { //提示框组件
                        trigger: 'item', //触发类型(饼状图片就是用这个)
                        formatter: "{a} <br/>{b} : {c} ({d}%)", //提示框浮层内容格式器
                        position: [100, 10]
                    },
                    color: ['#37a8f2', '#ffdf6f'],  //手动设置每个图例的颜色
                    series: [ //系列列表
                        {
                            name: '设备状态',  //系列名称
                            type: 'pie',   //类型 pie表示饼图
                            center: ['50%', '50%'], //设置饼的原心坐标 不设置就会默认在中心的位置
                            radius: ['60%', '80%'],  //饼图的半径,第一项是内半径,第二项是外半径,内半径为0就是真的饼,不是环形
                            width: "25%",
                            itemStyle: {  //图形样式
                                normal: { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                    label: {  //饼图图形上的文本标签
                                        show: false  //平常不显示
                                    },
                                    labelLine: {     //标签的视觉引导线样式
                                        show: false  //平常不显示
                                    }
                                },
                            },
                            data: [
                                {value: 68, name: '在线'},
                                {value: 2, name: '离线'},
                            ]
                        }
                    ]

                },
                options1: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    },
                    {
                        value: '选项2',
                        label: '双皮奶'
                    }
                ],
                orgOptions: [],
                fireList: [],
                value: '',
                levelArr: [],
                rcuName: "",
                tableData: [],
                noRcuSow: false,
                res: {},
                javainterface: {
                    allStation: {
                        subModuleName: 'systemView',
                        interfaceName: 'getAllStation',
                        param: {iType: 10060003}
                    }
                }
            }
        },
        computed: {},
        filters: {},
        watch: {},
        created() {

        },
        mounted() {
            this.getFireItem()
            this.getSubFireItem()
            this.registerMQTT();

        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            /**
             *
             *获取环形图
             * parm：id传入unitI临时调试如果存在传入Id，如果不存在则为空
             *
             * */
            async getFireItem(id) {
                const getId = id ? id : ''
                let result = await this.$_api.systemView.getFireItem({
                    "unitId": getId,
                    "ubIdsStr": 10060003

                })
                if (result.success) {
                    this.res = result.data;
                    let arr = [], paraObj = {};
                    //给paraData渲染
                    this.paraData.forEach((item, index) => {
                        arr[arr.length - 1] = 'myChart' + index
                        paraObj[arr[arr.length - 1]] = this.$_echarts.init(this.$refs[item.id][0]);
                        this.option.title.text = item.title
                        this.option.color = item.color
                        this.option.series[0].data = item.detail
                        this.option.series[0].name = item.describe
                        //站点渲染
                        if (item.id.charAt(item.id.length - 1) == 0) {
                            this.option.series[0].data[0].value = result.data.onLineCount
                            this.option.series[0].data[1].value = result.data.offLineCount
                        }
                        //警情渲染
                        if (item.id.charAt(item.id.length - 1) == 1) {
                            this.option.series[0].data[0].value = result.data.earlyCount
                            this.option.series[0].data[1].value = result.data.alarmCount
                        }
                        //设备渲染
                        if (item.id.charAt(item.id.length - 1) == 2) {
                            this.option.series[0].data[0].value = result.data.totalCount
                            this.option.series[0].data[1].value = result.data.faultCount
                        }
                        paraObj[arr[arr.length - 1]].setOption(this.option)
                    })


                }
            },
            async getSubFireItem() {
                let result = await this.$_api.systemView.getSubFireItem({
                    "unitId": "",
                    // 'subIdsStr':'1007,1006',
                    "subIdsStr": "10060003"
                })
                if (result.success) {
                    console.log(result)
                    if (result.data.length > 0) {
                        result.data.forEach((item) => {
                            item.url = '../../assets/img/sys/' + item.SubSystemID + '.png'
                        })
                    }
                    this.fireList = result.data

                }
            },
            // val为点击地图传过来的数据
            clickRcuImg(val) {
                this.$emit('transfer', val)
            },
            registerMQTT() {
                this.$_listen('firecontrolAllAlarm', (topic, msg, pack) => {
                    let msgJson = JSON.parse(msg.toString());
                    // console.log(msgJson);
                    if (msgJson.cmd === '1002') { //报警的上传数据
                        // console.log(msgJson.unitid);

                        //右上角消防统计报警数增加
                        this.paraData.map((item, index, arr) => {
                            if (item.title === '警情') {
                                item.detail.map((alarm, alarmIndex, arrTemp) => {
                                    if (alarm.name === '报警') {
                                        alarm.value++;
                                    }
                                })
                            }
                        })
                        this.$refs.map.changeAlarmNum(msgJson.unitid);
                        this.$emit('receiveAlarm', 'alarm-action', msgJson.unitid);
                    }
                })
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
        },
        directives: {
            center
        },

    }
</script>

<style lang="stylus">
    .shape-icon {
        font-size 36px
        margin-right: 10px;
        position: relative;
        top: 3px;
    }

    .color-light-green {
        color #32e611
    }

    .font-size-18 {
        font-size 18px;
    }

    .color-dark-yellow {
        color #ff9900
    }

    .color-red {
        color red
    }

    .color-yellow {
        color yellow
    }

    .font-time {
        font-family: 'DS-DIGI';
    }

    .color-white {
        color white
    }

    .color-blue {
        color: #45adf7;
    }

    .el-input__inner {
        background-color: rgba(9, 32, 47, 0.6);
        border-color: #0d7ec5;
        color: #45adf7;
        border-radius: 2px;
        height: 34px;
        line-height: 34px;
    }


    .el-select-dropdown__list {
        background-color: #1a587f;
    }

    .el-select-dropdown__item {
        color: #fff;
    }

    .el-select-dropdown {
        border: 1px solid #0d7ec5;
    }

    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
        background-color: #1f385c;
    }

    .el-popper[x-placement^=bottom] .popper__arrow::after {
        top: 0px;
        border-bottom-color: #0d7ec5;
    }


    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
</style>
<style lang="stylus">
    .rich .rich-badge {
        top: 6px;
        left: 65%;
    }

    .systemView {
        margin: 0.88889rem 0.88889rem 0 0.88889rem;
        height: 100%;
        width 98%
        background url("../../assets/img/hull.png")
        background-size: 100% 100%
        -moz-background-size: 100% 100%

        .el-container {
            padding-top: 16px;
            height: 826px;
            width: 94%;
            position: relative;
            left: 3%;
            top: 3%;

            .el-aside {
                .map {
                    margin-top: 10px;
                    margin-left: 5px;
                    width: 98.9%;
                    height: 775px;
                    position: relative;
                    cursor: pointer;

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
                        z-index: 999
                        position: absolute;
                        bottom: -7px;
                        right: 1px;
                        width: 35px;
                        height: 30px;
                        background: url('~@/assets/img/common/border-rb.png') no-repeat;
                        background-size: 35px 30px;
                    }

                }
            }

            .el-main {
                .elMain-top {
                    background-color: #fff;
                    width 100%
                    background-color: rgba(100, 100, 100, 0.2)
                    height: 446px;

                    .elMain-top-title {
                        color white
                        font-size: 16px;
                        padding-top: 12px;
                        padding-left: 24px;
                        margin-bottom 32px

                    }

                    .item {
                        width 50%
                        float left

                        .elMain-top-content {
                            height: 172px;
                            width: 50%
                            float: left

                        }

                        .elMain-top-contentDetail {


                            height: 172px;
                            line-height 172px

                            .elMain-top-contentDetail-span {
                                display: inline-block;
                                vertical-align: middle;
                                line-height: 22px;
                            }

                            width: 50%
                            float right
                        }
                    }


                }

                .elMain-bottom {
                    background-color: #fff;
                    width 100%

                    margin-top 2%
                    background-color: rgba(100, 100, 100, 0.2)
                    height 300px

                    .elMain-bottom-title {
                        color white
                        font-size: 16px;
                        padding-top: 12px;
                        padding-left: 24px;
                        margin-bottom 32px

                    }

                    .elMain-bottom-Item {
                        height 220px
                        overflow auto
                        margin-top 10px
                        margin-left 24px
                        border-radius 2px

                        color white
                        font-size 16px

                        .elMain-bottom-Item-single {
                            margin-bottom 20px
                            border-radius: 8px;

                            height 100px
                            width 280px
                            padding-bottom 4px
                            border 1px solid #5af1f6

                            .left {
                                height 99px
                                width 72px
                                text-align center
                                float left
                                padding-top 8px
                                border-right 1px solid #5af1f6

                                img {
                                    margin 4px 0 4px 0px

                                }
                            }

                            .right {
                                padding 20px 10px
                                height 80px
                                float left
                                .r1 {
                                    margin-right 10px
                                    width 80px
                                    float left
                                    text-align center

                                    .r1-btn {
                                        width 80px
                                        height 32px
                                        line-height 32px
                                        background url("../../assets/img/sys/rect.png")
                                        background-size: 100% 100%
                                        -moz-background-size: 100% 100%
                                        margin-bottom 10px
                                    }
                                }
                            }
                        }
                    }

                }
            }

        }
    }

</style>
