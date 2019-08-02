<template>
    <div class="sub-system">
        <el-container>
            <el-aside width="72%">
                <div class="sub-system-top">
                    <div class="sub-system-top-item left">
                        <img src="../../../assets/img/status/spw.png" width="420px" alt="" v-show="showFlag">
                        <ocx-video :videoConfig="videoConfig" v-show="!showFlag"></ocx-video>
                    </div>
                    <div class="sub-system-top-item right">
                        <el-row>
                            <el-col :span="10">
                               <span >运行参数</span>
                            </el-col>
                            <el-col :span="14" class="tool-text">
                                正常：<span class="color-green">{{resultData.dev.abnormal}}</span>/异常：<span class="color-red">{{resultData.dev.normal}}</span>
                            </el-col>
                        </el-row>
                        <div class="item-list">
                            <el-row>
                                <el-col :span="8" v-for="(i ,index) in resultData.list " :key="index">
                                    <div class="item-list-single " :class="{'item-list-single-err': i.AlarmLevel==1}">
                                        {{i.vcName}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="sub-system-bottom">
                    <htCommon ref="htCommon"></htCommon>
                </div>
            </el-aside>
            <el-main>
                <div class="sub-system-items">
                    <el-row>
                        <el-col :span="10">
                            灭火装置列表：
                        </el-col>
                    </el-row>
                    <div class="search-item">
                        <el-row v-for="(item,index) in subMenuList" :key="index" >
                            <el-col :span="12" >
                                <span @click="showSubItem(item)" >
                                    <span class="color-green" v-show="item.areaList.length==0">●</span>
                                    <span class="color-green" v-show="!item.showSubFlag&&item.areaList.length!=0"><i class="el-icon-arrow-right"></i></span>
                                    <span class="color-green" v-show="item.showSubFlag&&item.areaList.length>0"><i class="el-icon-arrow-down"></i></span>
                                    {{item.vcName}}</span>
                            </el-col>
                            <el-col :span="12" class="item-btn" >
                              <el-button size="mini" @click="showSysDetail(item)" :class="{'opacity_0':item.areaList.length>0}">
                                  查看
                              </el-button>
                            </el-col>
                            <div class="search-item-subDiv" v-for="(i,index2) in item.areaList" :key="index2">
                                <el-col :span="12" class="search-item-sub">
                                    <span v-show="item.showSubFlag"  ><span class="color-green">●</span>{{i.vcName}}</span>
                                </el-col>
                                <el-col :span="12" class="item-btn">
                                    <el-button size="mini"  v-show="item.showSubFlag"  @click="showSysDetail(i)">
                                        查看
                                    </el-button>
                                </el-col>
                            </div>
                        </el-row>
                    </div>


                </div>
            </el-main>
        </el-container>


    </div>

</template>

<script>

    import ocxVideo from '@/components/native/video/OcxVideo'
    import htCommon from "../../common/ht-common"


    export default {
        name: "sub-system",
        components: {
            "ocx-video":ocxVideo,
            htCommon
        },
        props: {},
        data() {
            return {
                showFlag:false,
                videoConfig: {
                   	isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '2|22.46.34.114:37782|admin:admin123|1',
					hideTool: true
                },
                getId:"",
                current: 'fireControl-customization',
                resultData:{
                    dev:{},
                    data:[]
                },
                subMenuList:[]
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
                    this.getSubMenu(val)
                },
            },
        },
        created() {},
        mounted() {
            this.init()
        },
        activited() {},
        update() {},
        beforeDestory() {},
        methods: {
            init() {
                this.getSubMenu()
            },
            //从地图跳转初始化函数
            initSysView(item){
                this.getLightItem(item)
                this.getSubMenu(item)

            },
            //点击树渲染视图
            initView(item){
                this.getLightItem(item)
                this.getSubMenu(item)
            },
            //获取流程图接口
            async getHtMap(item) {

                this.getId=item&&item.UnitID?item.UnitID:'192fe4cec3ec4d3fb81c0d05f82bde41'
                let result = await this.$_api.statusCheck.getHtMap({
                    unitId:this.getId,
                    subIdsStr:item.subSystemId

                })
                if (result.success){
                    this.$refs.htCommon.init(result.data[0].vcUrl)
                }
            },
            //获取光牌接口
            async getLightItem(item) {
                this.getId=item&&item.UnitID?item.UnitID:'192fe4cec3ec4d3fb81c0d05f82bde41'
                let result = await this.$_api.statusCheck.getLightItem({
                    unitId:this.getId,
                    subIdsStr:item.subSystemId

            })
                if (result.success){
                    result.data.dev=result.data.dev==null?{}:result.data.dev
                    this.resultData=result.data
                }
            },
            /**
             *获取灭火装置列表
             * 无参数情况点击tab菜单切换进入，默认传 死值，如果点击地图图标进入则取当前unitId
             * para  item：为当前对象，
             */
            async getSubMenu(item) {
                this.getId=item&&item.id?item.id:'192fe4cec3ec4d3fb81c0d05f82bde41'
                let result = await this.$_api.statusCheck.getSubMenu({
                    unitId:this.getId,
                    subIdsStr:'10060003'

                })
                if (result.success){
                    console.log(result)
                    result.data.forEach((i)=>{
                        i.showSubFlag=false
                    })
                    this.subMenuList=result.data
                    //调取光字牌接口（运行参数）
                    if(this.subMenuList&&this.subMenuList.length>0){
                        //默认第一条灭火装置数据进行运行参数接口如果有子菜单默认子菜单第一条，如果没有则默认第一条数据
                        if(this.subMenuList[0].areaList&&this.subMenuList[0].areaList.length>0){
                            this.getLightItem(this.subMenuList[0].areaList[0])
                            this.getHtMap(this.subMenuList[0].areaList[0])
                        }else {
                            this.getLightItem(this.subMenuList[0])
                            this.getHtMap(this.subMenuList[0])
                        }
                    }
                }
            },
            /**
             *如果有子菜单点开展示事件
             * para  item：为当前对象，
             */
            showSubItem(item){
                this.subMenuList.forEach((i)=>{
                    if(item.subSystemId!=i.subSystemId){
                        i.showSubFlag=false
                    }
                })
                item.showSubFlag=item.showSubFlag?false:true;

            },
            /**
             *点击查看按钮包括子菜单
             * para  item：为当前对象，
             */

            showSysDetail(item){
                console.log(item)
                if(item.vcName.indexOf('水喷雾')>-1){
                    this.showFlag=true
                }else {
                    this.showFlag=false
                }
                this.getLightItem(item)
                this.getHtMap(item)
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
    .opacity_0{
        opacity: 0;
    }
</style>

<style lang="stylus" scoped>
    .sub-system{
        width 100%
        margin 0
        padding 0
        .el-container{
            padding-top 12px
            .el-aside{
                .sub-system-top{
                    height 480px
                    .sub-system-top-item{
                        margin 16px
                        float left
                        height 440px
                    }
                    .left{
                        width 50%
                        float left
                        margin-left 3%
                        img{
                            margin 48px
                        }
                    }
                    .right{
                        border-radius 5px
                        width 42%
                        background: rgba(54,105,134,0.1);
                        float left
                        .el-row{
                            color white
                            height 40px
                            line-height 40px
                            font-size 17px
                            padding-left 24px
                            .tool-text{
                                font-size 15px
                                text-align right
                                padding-right 16px
                                .color-red{
                                    color red
                                }
                                .color-green{
                                    color #32e611
                                }
                            }


                        }
                        .item-list{
                            height: 360px;
                            overflow: auto
                            .el-row{
                                .el-col{
                                    .item-list-single{
                                        height 50px
                                        line-height 50px
                                        text-align center
                                        color #37a8ff
                                        width 136px
                                        font-size 14px
                                        background: rgba(54,105,134,0.3);
                                        margin-bottom 8px
                                    }
                                    .item-list-single-err{
                                        background red
                                        color white

                                    }
                                }
                            }

                        }

                    }

                }
                .sub-system-bottom{
                    height 260px
                    width: 94%;
                    margin-left: 4%;
                    background url("~@/assets/img/common/footer.png")
                    background-size:100% 100%
                    -moz-background-size:100% 100%
                }
            }
            .el-main{

                .sub-system-items{
                    width 90%
                    height 710px
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
                        margin-top 16px
                        .search-item-subDiv{
                            .search-item-sub{
                                padding-left 14px

                            }
                        }


                        .el-row{
                            cursor pointer
                            margin-bottom 25px
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


                }
            }
        }

    }

</style>
