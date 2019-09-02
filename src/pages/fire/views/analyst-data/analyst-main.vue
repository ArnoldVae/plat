<template>
    <div class="analyst-main">
        <div class="black" v-for="(d,index) in chartsList" :key="index">
            <div class="title">
                {{d.title}}
            </div>
            <div class="charts" :ref="d.ref">

            </div>
        </div>

    </div>
</template>
<script>

    export default {
        name: 'analyst-main',
        components: {},
        props: {},
        data() {
            return {
                chartsList: [
                    {
                        title: "缺陷分类统计",
                        ref: 'defects'
                    },
                    {
                        title: "设备完好率",
                        ref: 'equipment'
                    },
                    {
                        title: "消防及时率",
                        ref: 'fire'
                    },
                    {
                        title: "维保及时率",
                        ref: 'maintenance'
                    },
                    {
                        title: "警情统计",
                        ref: 'alert'
                    },
                    {
                        title: "消防评估",
                        ref: 'assessment'
                    }
                ]
            }
        },
        computed: {
            activeUnitId() {
                // console.log('收到id被更改')
                return this.$store.getters.unitId
            }
        },
        filters: {},
        watch: {
            activeUnitId: {
                handler(val) {
                    //  console.log('执行')
                },
            }
        },
        created() {
        },
        mounted() {
            this.setCharts()
        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            //树节点过滤
            filterNode(value, data) {
                if (!value) return true;
                return data.title.indexOf(value) !== -1;
            },
            setCharts() {
                this.getDefects()
                this.getEquipment()
                this.getFire()
                this.getMaintenance()
                this.getAlert()

            },
            /**
             * 缺陷分类统计
             */
            getDefects() {
                const charts = this.$_echarts.init(this.$refs.defects[0]);
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: ['#f13b2b', '#0dd6e5', '#ff9900'],
                    series: [
                        {
                            name: '缺陷分类统计',
                            type: 'pie',
                            radius: ['50%', '60%'],
                            center: ['50%', '50%'],
                            data: [
                                {
                                    name: "报警",
                                    color: '#fff',
                                    value: 300,
                                },
                                {
                                    name: "灭火",
                                    value: 200
                                },
                                {
                                    name: "其他",
                                    value: 100
                                }
                            ]

                        }
                    ]
                };
                charts.setOption(option)
            },

            /**
             *    设备完好率
             */
            getEquipment(){
                const charts = this.$_echarts.init(this.$refs.equipment[0]);
                const option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['类1','类2','类3']
                    },
                    toolbox: {
                        show : false,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : ['设备完好率'],
                            show:false
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{
                                lineStyle: {
                                    color:"#fff",
                                    width:"0"
                                }
                            },
                            axisTick:{       //y轴刻度线
                                show:false
                            },
                            splitLine:{
                                lineStyle: {
                                    color:"#0a3565",
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'类1',
                            type:'bar',
                            barGap:'450%',//柱图间距
                            barWidth : 20,//柱图宽度
                            data:[30.0],
                            itemStyle:{
                                color:"#0dd6e5"
                            }
                        },
                        {
                            name:'类2',
                            type:'bar',
                            barGap:'450%',//柱图间距
                            barWidth : 20,//柱图宽度
                            data:[81],
                            itemStyle:{
                                color:"#ff9900"
                            }
                        },
                        {
                            name:'类3',
                            type:'bar',
                            barGap:'450%',//柱图间距
                            barWidth : 20,//柱图宽度
                            data:[65],
                            itemStyle:{
                                color:'#7979CC'
                            }
                        }
                    ]
                };
                charts.setOption(option)
            },
            /**
             * 消防及时率
             */
            getFire(){
                const charts = this.$_echarts.init(this.$refs.fire[0]);
                const option = {
                    xAxis : [
                        {
                            type : 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            show:false
                        }
                    ],
                    yAxis : {
                        type: 'value',
                        axisLine:{
                            lineStyle: {
                                color:"#fff",
                                width:"0"
                            }
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        splitLine:{
                            lineStyle: {
                                color:"#0a3565",
                            }
                        }
                    },
                    series : [
                        {
                            name:'类3',
                            type:'line',
                            areaStyle: {
                                color:'#0a3565'
                            },
                            data: [25, 60, 40, 70, 80, 90, 96],
                            lineStyle: { normal: { color: '#0dd6e5' } }, //折线颜色
                        }
                    ]
                };
                charts.setOption(option)

            },
            /**
             * 维保及时率
             */
            getMaintenance(){
                const charts = this.$_echarts.init(this.$refs.maintenance[0]);
                const option = {
                    xAxis : [
                        {
                            type : 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            show:false
                        }
                    ],
                    yAxis : {
                        type: 'value',
                        axisLine:{
                            lineStyle: {
                                color:"#fff",
                                width:"0"
                            }
                        },
                        axisTick:{       //y轴刻度线
                            show:false
                        },
                        splitLine:{
                            lineStyle: {
                                color:"#0a3565",
                            }
                        }
                    },
                    series : [
                        {
                            name:'类3',
                            type:'line',
                            areaStyle: {
                                color:'#0a3565'
                            },
                            data: [80, 40, 50, 30, 60, 90, 76],
                            lineStyle: { normal: { color: '#0dd6e5' } }, //折线颜色
                        }
                    ]
                };
                charts.setOption(option)
            },
            /**
             * 警情统计
             *
             */
            getAlert(){
                const charts = this.$_echarts.init(this.$refs.alert[0]);
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    color: [ '#00aaff', '#ff9900'],
                    series: [
                        {
                            name: '缺陷分类统计',
                            type: 'pie',
                            radius: ['50%', '60%'],
                            center: ['50%', '50%'],
                            data: [
                                {
                                    name: "预警",
                                    color: '#fff',
                                    value: 300,
                                },
                                {
                                    name: "报警",
                                    value: 200
                                },

                            ]

                        }
                    ]
                };
                charts.setOption(option)
            },
            /**
             * tab菜单切换
             * tab为当前勾选节点
             * 处理active是否高亮显示
             * current处理菜单切换
             */
            tabChange(tab) {
                this.tabList.forEach((item) => {
                    item.active = false
                })
                tab.active = true
                this.current = tab.code
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
<style lang="stylus" scoped>
    .analyst-main {
        margin 20px 0px 0 4px
        height 100%
        overflow hidden

        .black {
            width 32.3%
            height: 365px
            border 1px solid #0a3565
            float left
            margin 0 16px 16px 0px
            background-color: rgba(100, 100, 100, 0.1)
            border-radius 2px

            .title {
                color white
                font-size 16px
                margin 16px 0 0 16px
            }

            .charts {
                margin-top 10px
                height 300px
                width 100%
            }
        }

    }

</style>
