<template>
    <div class="protection-zone">
        <el-container>
            <el-aside width="72%">
                <div class="protection-zone-top">
                    <div class="protection-zone-top-item left">
                        <ocx-video :videoConfig="videoConfig"></ocx-video>
                    </div>
                    <div class="protection-zone-top-item right">
                        <ocx-video :videoConfig="videoConfig1"></ocx-video>
                    </div>
                </div>
                <div class="protection-zone-bottom" ref="charts"></div>
            </el-aside>
            <el-main>
                <div class="protection-zone-items">
                    <el-row>
                        <el-col :span="10">
                            防护区列表：
                        </el-col>
                    </el-row>
                    <div class="search-item">
                        <el-row v-for="(item,index) in subMenuList" :key="index">
                            <el-col :span="12" >
                                <span><span class="color-green">● </span>{{item.vcName}}</span>

                            </el-col>
                            <el-col :span="12" class="item-btn">
                              <el-button size="mini" @click="getTemDetail(item)">
                                  查看
                              </el-button>

                            </el-col>
                        </el-row>
                    </div>


                </div>
                <div class="protection-zone-items-bottom">
                    <el-row>
                        <el-col :span="24">
                            {{temData.name}}：
                        </el-col>
                    </el-row>
                    <div class="search-item">
                        <el-row>
                            <el-col :span="12" >
                              <span class="font-size-14"><img src="@/assets/img/common/temp.png" width="10px">  当前设备温度：</span>
                            </el-col>
                            <el-col :span="12" class="item-btn">
                                <span class="font-time color-light-green">{{temData.mechine}} </span>
                                <span class="color-light-green"> ℃</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12" >
                                <span class="font-size-14"><img src="@/assets/img/common/temp2.png" width="10px"> 当前环境温度：</span>
                            </el-col>
                            <el-col :span="12" class="item-btn">
                                <span class="font-time color-light-green">{{temData.env}}</span>
                                <span class="color-light-green"> ℃</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-main>
        </el-container>


    </div>

</template>

<script>
    import ocxVideo from '@/components/native/video/OcxVideo'
    export default {
        name: "protection-zone",
        components: {
            "ocx-video":ocxVideo,

        },
        props: {},
        data() {
            return {
                getList:{
                    arr1:[],
                    arr2:[],
                },
                videoConfig: {
                    isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '2|22.46.34.114:37782|admin:admin123|0',
					hideTool: true
                },
                videoConfig1: {
                 	isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '2|22.46.34.114:8001|admin:admin123|38',
					hideTool: true
                },
                current: 'fireControl-customization',
                resultData:{
                    dev:{},
                    data:[]
                },
                subMenuList:[],
                getId:'',
                temData:{
                    name:"",
                    mechine:"50",
                    env:"32"
                }

            }
        },
        computed: {
            activeUnitId() {
                return this.$store.getters.unitId
            }
        },
        filters: {},
        watch: {
            activeUnitId: {
                handler(val) {
                    // this.init()
                    const a={id:val}
                    this.getAreaMenu(a)

                },
            }
        },
        created() {},
        mounted() {
            this.getAreaMenu()
        },
        activited() {},
        update() {},
        beforeDestory() {},
        methods: {
            setCharts(Obj){
                const charts=this.$_echarts.init(this.$refs.charts)
                let option= {
                    tooltip: {
                        trigger: 'axis',
                            axisPointer: {
                            type: 'cross',
                                label: {
                                backgroundColor: '#red'
                            },
                            triggerTooltip: {}
                        }
                    },
                    legend:{
                        data:["温度","湿度"],
                        textStyle:{
                            color:'#fff'
                        }
                    },
                    grid: {
                        top: '10%',
                            left: '3%',
                            right: '4%',
                            bottom: '4%',
                            containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                            boundaryGap: false,

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
                    series: [{
                        // data: [32, 40, 60, 55, 75, 29, 78,89,97,50,60,29,58],
                        data:Obj.arr1,
                        type: 'line',
                        name:"温度",

                        symbol: 'none',
                        areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
                        lineStyle: { normal: { color: '#04a3ff' } }, //折线颜色
                    },
                        {
                            // data: [12, 50, 80, 35, 95, 9, 48,29,27,60,30,29,8],
                            data:Obj.arr2,
                            type: 'line',
                            name:"湿度",
                            symbol: 'none',
                            areaStyle: { normal: { color: '#f37176' } }, //折线区域背景色
                            lineStyle: { normal: { color: 'red' } }, //折线颜色
                        }

                    ]
                }
                charts.setOption(option)
            },
            initProView(item){
                this.getAreaMenu(item)
            },
            /**
             *
             *查询防护区列表
             *
             */
            async getAreaMenu(item) {
                this.getId=item&&item.id?item.id:'192fe4cec3ec4d3fb81c0d05f82bde41'
                let result = await this.$_api.statusCheck.getAreaMenu({
                    unitId:this.getId,
                    subIdsStr:''

                })
                if (result.success){
                    this.subMenuList=result.data
                    this.temData.name=this.subMenuList[0].vcName
                //    调用tem温度设备
                    this.getTemDetail(this.subMenuList[0])
                    //获取视频链接地址
                    this.getAreaVideo(this.subMenuList[0])
                }
            },
            /**
             *获取温度湿度信息方法
             *
             */
            async getTemDetail (item) {
                this.temData.name=item.vcName
                let result = await this.$_api.statusCheck.getTemDetail({
                    unitId:item.unitId,
                    areaId:item.protectAreaId,
                    devTypeId:"1014"

                })
                if (result.success){
                    if(result.data.length>0){
                       result.data.forEach((item)=>{
                           if(item.functioinId==190){
                               this.temData.mechine=item.fValue
                               this.getTemCharts(item.nodeId,item.functioinId)
                           }
                           if(item.functioinId==191){
                               this.temData.env=item.fValue
                               this.getTemCharts(item.nodeId,item.functioinId)
                           }
                       })

                   }else {
                        this.getList.arr1=[]
                        this.getList.arr2=[]
                        this.setCharts(this.getList)
                    }
                }
            },
            /**
             *获取地区视频地址
             *
             */
            async getAreaVideo(item){
                let result = await this.$_api.statusCheck.getAreaVideo({
                    unitId:item.unitId,
                    protectAreaId:item.protectAreaId,
                })
                if (result.success){
                    console.log(result)
                }
            },
            /**
             *  调取绘制折线图
             */

            async getTemCharts(id,target) {
                let result = await this.$_api.statusCheck.getTemCharts({
                    nodeId:id,
                    startTime: Math.round(new Date().getTime()/1000)-604800,
                    endTime: Math.round(new Date().getTime()/1000)

                })
                if (result.success){
                    const newArr=[]
                    result.data.forEach((i)=>{
                        newArr.push(i.f_Value)
                    })
                    if(target==190){
                        this.getList.arr1=newArr
                    }else {
                        this.getList.arr2=newArr
                    }
                    if(this.getList.arr1.length>0&&this.getList.arr2.length>0){
                        this.setCharts(this.getList)
                    }

                }
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
    .font-time{
        font-family: 'DS-DIGI';
        font-size: 20px;
    }
    .color-light-green{
        color: #32e611;
    }
    .font-size-14{
        font-size: 14px;
    }
</style>

<style lang="stylus" scoped>
    .protection-zone{
        width 100%
        margin 0
        padding 0
        height 670px
        .el-container{
            .el-aside{
                .protection-zone-top{
                    height 540px
                    .protection-zone-top-item{
                        margin 16px
                        float left
                        height 500px
                    }
                    .left{
                        width 47%
                        float left


                    }
                    .right{
                        position relative
                        width 47%
                        float left

                    }

                }
                .protection-zone-bottom{
                    height 215px
                    width: 94%;
                    margin-left: 4%;
                    background: rgba(54,105,134,0.1);
                }
            }
            .el-main{
                .protection-zone-items{
                    width 90%

                    border-radius 5px

                    background: rgba(54,105,134,0.1);

                    .el-row{
                        color white
                        height 40px
                        line-height 40px
                        font-size 17px
                        padding-left 24px
                        .tool-text{
                            font-size 15px
                            text-align right
                            .color-red{
                                color red
                            }
                            .color-green{
                                color #32e611
                            }
                        }


                    }
                    .search-item{
                        height 462px
                        overflow auto
                        .el-row{
                            .el-col{
                                font-size 15px
                                .color-green{
                                    color #19be6b
                                }
                            }
                            .item-btn{
                                text-align right
                                padding-right 10%
                                .el-button{
                                    background none
                                    border: 0.04444rem solid #00aaff;
                                    color #37a8ff
                                }
                            }

                        }


                    }

                    margin-bottom 20px

                }
                .protection-zone-items-bottom{
                    width 90%
                    height 210px
                    border-radius 5px
                    background: rgba(54,105,134,0.1);

                    .el-row{
                        color white
                        height 40px
                        line-height 40px
                        font-size 17px
                        padding-left 24px


                    }
                    .search-item{
                        margin-top 14px
                        .el-row{
                            margin-left 20px
                            margin-bottom 20px
                        }
                        img{
                            width 10px
                            margin-top -5px
                        }
                    }
                }
            }
        }

    }

</style>
