<template>
    <div :class="pageType? 'sub-system':'sub-system-5'">
        <el-container>
            <el-aside>
                <div class="sub-system-top">
                    <div class="sub-system-top-item left">
                        <p
                                class="menu-bars"
                                @click="showFlag = !showFlag"
                        >{{ !showFlag ? '视频' : '3D' }}</p>
                        <img v-show="showFlag" src="../../../assets/img/status/spw.png" width=" 1000PX" alt/>
                        <ocx-video v-show="!showFlag" :videoConfig="videoConfig"
                                   style="width: 1362PX;height:93%"></ocx-video>
                    </div>
                    <div class="sub-system-top-item right">
                        <div class="yunxing">
                            <p class="menu-bar">运行参数</p>
                            <span class="menu-b">运行参数</span>

                            <div class="tool-text">
                                正常：
                                <span class="color-green">{{ resultData.abnormal }}</span>/异常：
                                <span class="color-red">{{ resultData.normal }}</span>
                            </div>
                        </div>
                        <div class="item-list">
                            <el-row>
                                <el-col :span="8" v-for="(i, index) in resultData.list" :key="index">
                                    <div
                                            class="item-list-single"
                                            :class="{ 'item-list-single-err': i.AlarmLevel == 1 }"
                                    >{{ i.vcName }}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div class="sub-system-bottom">
                    <ul class="sub-system-bottom-left">
                        <p class="menu-bar">系统信息</p>
                        <li class="system-info">系统信息</li>
                        <!-- <li><div >系统信息：</div></li> -->
                        <li>
                            <div>系统名称：</div>
                            <div class="odd">水喷雾灭火装置</div>
                        </li>
                        <li>
                            <div>生产厂家：</div>
                            <div class="odd" title="北京义利达通机械公司">北京义利达通机械公司</div>
                        </li>
                        <li>
                            <div>设备型号：</div>
                            <div class="odd">TMH-11</div>
                        </li>
                        <li>
                            <div>投运日期：</div>
                            <div class="odd">2019-05-08</div>
                        </li>
                        <li>
                            <div>存储介质：</div>
                            <div class="odd">氮气</div>
                        </li>
                        <li>
                            <div>灭火剂充装量：</div>
                            <div class="odd">7000L</div>
                        </li>
                        <li>
                            <div>灭火剂类别：</div>
                            <div class="odd">水</div>
                        </li>
                    </ul>
                    <ul class="sub-system-bottom-right">
                        <p class="menu-bar">维保信息</p>
                        <li class="maintenance-info">维保信息</li>
                        <!-- <li><div>维保信息：</div></li> -->
                        <li>
                            <div>维保单位：</div>
                            <div class="odd" title="南京威安消防设备工程有限责任公司">南京威安消防设备工程有限责任公司</div>
                        </li>
                        <li>
                            <div>联系人：</div>
                            <div class="odd">费成香</div>
                        </li>
                        <li>
                            <div>联系电话：</div>
                            <div class="odd">13951954384</div>
                        </li>
                        <li>
                            <div>备注信息：</div>
                            <div class="odd">-</div>
                        </li>
                    </ul>
                </div>
            </el-aside>
            <el-main>
                <div class="sub-system-items">
                    <p class="menu-bar">灭火装置列表</p>
                    <div class="miehuo">灭火装置列表：</div>

                    <div class="search-item">
                        <ul>
                            <li v-for="(item, index) in subMenuList" :key="index">
                                <el-row :gutter="10" :class="activeIndex==index? 'activeClick':''"
                                        style="margin-left: 0; margin-right: 0;">
                                    <el-col :span="18">
										<span @click="showSubItem(item)">
											<span class="color-green" v-show="item.areaList.length == 0">●</span>
											<span class="color-green"
                                                  v-show="!item.showSubFlag && item.areaList.length != 0">
												<i class="el-icon-arrow-right"></i>
											</span>
											<span class="color-green"
                                                  v-show="item.showSubFlag && item.areaList.length > 0">
												<i class="el-icon-arrow-down"></i>
											</span>
											{{ item.vcName }}
										</span>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-button

                                                @click="showSysDetail(item,index)"
                                                type="primary"
                                                size="mini"
                                                v-show="item.areaList.length == 0"
                                        >查看
                                        </el-button>
                                    </el-col>
                                </el-row>
                                <!--                                子节点-->
                                <ul class="subList" v-show="item.showSubFlag" style=" margin-left: 10px;">
                                    <li v-for="(i, n) in item.areaList" :key="n"
                                        :class="activeIndex==n? 'activeClick':''" @click="showSysDetail(i,n)">
                                        <el-row>
                                            <el-col :span="16">
                                                <span class="color-green">●</span>
                                                {{ i.vc_Name }}
                                            </el-col>
                                            <el-col :span="8">
                                                <el-button
                                                        size="mini"
                                                        @click="showSysDetail(i,n)"

                                                >查看
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import ocxVideo from '@/components/native/video/OcxVideo'

    export default {
        name: 'sub-system',
        components: {
            'ocx-video': ocxVideo
        },
        props: {
            pageTypeState: {
                type: Boolean,
                require: false
            }
        },
        data() {
            return {
                activeIndex: 0, //控制查看按钮的激活样式
                pageType: true, //控制端口号5200和3200的切换
                showFlag: true, //显示视频或者图片判断标志
                videoConfig: {
                    //视频配置信息
                    isAutoPlay: true,
                    serviceInfo: '1$22.46.34.114$6800$admin$admin',
                    deviceInfo: '1|22.46.34.114:8001|admin:admin123|1',
                    hideTool: true
                },
                getId: '',
                // 定义声明装置光子牌列表对象
                resultData: {
                    dev: {},
                    data: []
                },
                // 定义声明装置列表对象
                subMenuList: []
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
                }
            }
        },
        created() {
            this.pageType = this.pageTypeState
            // console.log(new Date())
        },
        mounted() {
            this.init()
        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            init() {
                //获取子系统装置列表
                this.getSubMenu()
            },
            //从地图跳转初始化函数
            initSysView(item) {
                //获取控制端口为5200时的样式状态开关
                this.pageType = item.pageType

                this.getSubMenu(item)
            },
            //点击树渲染视图
            initView(item) {
                this.getSubMenu(item)
            },
            //获取流程图接口
            // async getHtMap(item) {
            //     this.getId = item && item.UnitID ? item.UnitID : '192fe4cec3ec4d3fb81c0d05f82bde41'
            //     let result = await this.$_api.statusCheck.getHtMap({
            //         unitId: this.getId,
            //         subIdsStr: item.subSystemId
            //     })
            //     if (result.success) {
            //         this.$refs.htCommon.init(result.data[0].vcUrl)
            //     }
            // },
            //获取光牌接口
            async getLightItem(item) {
                this.getId = this.activeUnitId || ''
                let result = await this.$_api.statusCheck.getLightItem({
                    unitId: this.getId,
                    subIdsStr: item.subSystemId || '',
                    areaId: item.protectAreaId || ''
                })
                if (result.success) {
                    // result.data.list.forEach((item) => {
                    //     item.vcName = item.vcName.substring(0, 8)
                    // })

                    // result.data.dev = result.data.dev == null ? {} : result.data.dev
                    if (!result.data) {
                        result.data = {}
                        result.data.dev = {}
                    } else {
                        result.data.dev = result.data.dev
                    }

                    this.resultData = result.data
                }
            },
            /**
             *获取灭火装置列表
             * 无参数情况点击tab菜单切换进入，默认传 死值，如果点击地图图标进入则取当前unitId
             * para  item：为当前对象，
             */
            async getSubMenu(item) {
                this.getId = this.activeUnitId || '192fe4cec3ec4d3fb81c0d05f82bde41'
                let result = await this.$_api.statusCheck.getSubMenu({
                    unitId: this.getId,
                    subIdsStr: '10060003'
                })
                if (result.success) {
                    this.subMenuList = []
                    result.data.forEach(i => {
                        //处理如果装置存在子菜单则控制显示样式
                        i.showSubFlag = true
                        if (i.subSystemId == 90010014) {
                            if (i.areaList.length > 0) {
                                i.areaList.forEach((o, n) => {
                                    // console.log(o)
                                    if (o.protectAreaId == 'd8b03d6100ba4ccd8fc07f4b8734e099') {
                                        i.areaList.splice(n, 1)
                                    }
                                })
                            }
                            this.subMenuList.push(i)
                            if (i.areaList.length > 0) {
                                this.getLightItem(i.areaList[0])
                            } else {
                                this.getLightItem(i)
                            }
                        }
                    })

                    //                    //调取光字牌接口（运行参数）
                    //                    if (this.subMenuList && this.subMenuList.length > 0) {
                    //                        //默认第一条灭火装置数据进行运行参数接口如果有子菜单默认子菜单第一条，如果没有则默认第一条数据
                    //                        if (this.subMenuList[0].areaList && this.subMenuList[0].areaList.length > 0) {
                    //                            this.getLightItem(this.subMenuList[0].areaList[0])
                    ////						this.getHtMap(this.subMenuList[0].areaList[0])
                    //                        } else {
                    //                            this.getLightItem(this.subMenuList[0])
                    ////						this.getHtMap(this.subMenuList[0])
                    //                        }
                    //                    }
                }
            },
            /**
             *如果有子菜单点开展示事件
             * para  item：为当前对象，
             */
            showSubItem(item) {
                this.subMenuList.forEach(i => {
                    if (item.subSystemId != i.subSystemId) {
                        i.showSubFlag = false
                    }
                })
                item.showSubFlag = item.showSubFlag ? false : true
            },
            /**
             *点击查看按钮包括子菜单
             * para  item：为当前对象，
             */

            showSysDetail(item, index) {
                //处理水喷雾逻辑（水喷雾显示图片，其他显示视频）
                this.showFlag = item.subSystemId == 90010014 ? true : false
                this.getLightItem(item)
                //			this.getHtMap(item)

                //控制查看按钮的激活样式
                this.activeIndex = index
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
    .opacity_0 {
        opacity: 0;
    }

    .color-green {
        color: #58b229;
        margin: 0 10px;
    }
</style>

<style lang="stylus" scoped>
    .sub-system {
        width: 100%;
        margin: 0;
        padding: 0;

        .menu-bar {
            background: url('../../../assets/img/main/lan.png');
            background-repeat: no-repeat;
            font-weight: bold;
            font-size: 44PX;
            height: 30px;
            line-height: 30px;
            width: 100%;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            text-align: center;
            color: black;
        }

        .menu-bars {
            background: url('../../../assets/img/main/lan.png');
            background-repeat: no-repeat;
            font-weight: bold;
            font-size: 18px;
            height: 30px;
            line-height: 30px;
            width: 1366PX;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            text-align: center;
            color: black;
        }

        .el-container {
            display: flex;
            justify-content: space-between;
            padding-top: 12px;

            .el-aside {
                /* background: #141A26; */
                /* height: 888px; */
                /* border: 1PX solid #D3DEE6; */
                .sub-system-top {
                    height: 480px;
                    display: flex;
                    margin: 5px 0;
                    justify-content: space-between;
                    margin: 0 10px;

                    .sub-system-top-item {
                        border: 1PX solid #D3DEE6;
                        height: 920PX;
                    }

                    .left {
                        width: 1367PX;

                    // float left
                    // margin-left 3%
                        img {
                            margin: 0 48px;
                        }
                    }

                    .right {
                        border-radius: 5px;
                        width: 46%;
                        font-size: 36PX;
                        background: #141A26;
                        border: 1PX solid #D3DEE6;
                        float: left;

                        .el-row {
                            color: white;
                            height: 40px;
                            line-height: 40px;
                            font-size: 16px;

                            .tool-text {
                                font-size: 16px;
                                text-align: right;
                                padding-right: 16px;

                                .color-red {
                                    color: red;
                                }

                                .color-green {
                                    color: #32e611;
                                }
                            }
                        }

                        .item-list {
                            height: 360px;
                            overflow: auto;

                            .el-row {
                                .el-col {
                                    .item-list-single {
                                        border 1px solid #0954a6
                                        text-align: center;
                                        color: #37a8ff;
                                        width: 136px;
                                        font-size: 16px !important;
                                        background: rgba(54, 105, 134, 0.3);
                                        margin-bottom: 8px;
                                        height: 3.2rem;
                                    }

                                    .item-list-single-err {
                                        background: red;
                                        color: white;
                                    }
                                }
                            }
                        }
                    }
                }

                .sub-system-bottom {
                    height: 350px;
                // width: 94%;
                    display: flex;
                    justify-content: space-between;
                    font-size: 36PX;

                    .sub-system-bottom-left {
                        height: 104%;
                        width: 67%;
                        font-size: 36PX;
                        margin-left: 10px;
                        background: #141A26;
                        border: 1PX solid #D3DEE6;
                    // background url("~@/assets/img/common/footer.png")
                        background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        display: flex;
                        flex-direction: column;
                    // justify-content flex-start
                        align-items: center;

                        > li {
                            color: #fff;
                            width: 100%;
                            height: 6%;
                            margin-top: 38PX;

                            .even {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                width: 220px;
                                color: #ffd36a;
                            }

                            .odd {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                color: #49ff01;
                            }

                            > div {
                                width: 450PX;
                                height: 45PX;
                                float: left;
                                margin-left: 200PX;
                            }
                        }
                    }

                    .sub-system-bottom-right {
                        height: 104%;
                        width: 59%;
                        font-size: 36PX;
                        margin-left: 15px;
                        margin-right: 10px;
                    // background url("~@/assets/img/common/footer.png")
                        background: #141A26;
                        border: 1PX solid #D3DEE6;
                        background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        display: flex;
                        flex-direction: column;
                    // justify-content flex-start
                        align-items: center;

                        > li {
                            color: #fff;
                            width: 80%;
                            height: 6%;
                            margin-top: 38PX;

                            .even {
                                width: 220px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                color: #ffd36a;
                            }

                            .odd {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                color: #49ff01;
                            }

                            > div {
                                width: 450PX;
                                height: 45PX;
                                float: left;
                            }
                        }
                    }
                }
            }

            .el-main {
                padding: 0 0 0 10px;

                .sub-system-items {
                    width: 100%;
                    height: 845px;
                    border-radius: 5px;
                    background: #141A26;
                    border: 1PX solid #D3DEE6;
                    overflow: auto;

                    .el-row {
                        color: white;
                        font-size: 17px;

                        .tool-text {
                            font-size: 15px;
                            text-align: right;

                            .color-red {
                                color: red;
                            }

                            .color-green {
                                color: #32e611;
                            }
                        }
                    }

                    .search-item {
                        margin-top: 16px;
                        margin-left: 33px;
                        padding-right: 10px;

                        ul {
                            li:hover {
                                border: 1px #0E70AF solid;
                                box-shadow: inset 0 0 20px #0E70AF;
                            }

                            li {
                                cursor: pointer;
                                color: white;

                                .el-button {
                                    background: none;
                                    border: 0.04444rem solid #00aaff;
                                    color: #37a8ff;
                                }
                            }
                        }

                        .el-row {
                            cursor: pointer;
                            margin-bottom: 20PX;

                            .el-col {
                                font-size: 36PX;
                            }

                            .item-btn {
                                text-align: right;
                                padding-right: 10%;
                            }
                        }
                    }
                }
            }
        }
    }

    /deep/ .el-main-header {
        padding-botton: 20PX;
    }
</style>

<style lang="stylus" scoped>
    .sub-system-5 {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;

        .menu-bar {
            background: url('../../../assets/img/main/lan.png');
            background-repeat: no-repeat;
            font-weight: bold;
            font-size: 44PX;
            height: 30px;
            line-height: 30px;
            width: 100%;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            text-align: center;
            color: black;
            display: none;
        }

        .menu-bars {
            background: url('../../../assets/img/main/lan.png');
            background-repeat: no-repeat;
            font-weight: bold;
            font-size: 18px;
            height: 30px;
            line-height: 30px;
            width: 1366PX;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            text-align: center;
            color: black;
            display: none;
        }

        .el-container {
            display: flex;
            justify-content: space-between;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            padding: 10px 0 14px 46px;

            .el-aside {
                overflow: hidden;
                width: 1166px !important;
                padding-right: 10px;

                .sub-system-top {
                    height: 530px;
                    display: flex;
                    justify-content: space-between;

                    .sub-system-top-item {
                        height: 484px;
                    }

                    .left {
                        width: 705px;

                        img {
                            width: 80%;
                            margin: 18px 0 0 60px;
                        }
                    }

                    .right {
                        border-radius: 5px 5px 0 0;
                        width: 468px;
                        height: 528px;
                        font-size: 36PX;
                    // background: url('../../../assets/img/alarm-now/resoure.png');
                    // background-repeat: no-repeat;
                    // background-size: 100% 100%;
                    // -moz-background-size: 100% 100%;
                        border: 1PX solid #195891;
                        margin-left: 12px;

                        .yunxing {
                            color: #fff;
                            width: 100%;
                            height: 2.2228rem !important;
                            padding-left: 24px;
                            font-size: 18px;
                            margin: 0;
                            line-height: 2.2228rem;
                            background: url('../../../assets/img/common/second.png') no-repeat;
                            background-size: 100% 100%;
                            -moz-background-size: 100% 100%;
                            margin-bottom: 14px;

                            .tool-text {
                                float: right;
                                font-size: 15px;
                                text-align: right;
                                padding-right: 16px;
                                width: 180px;

                                .color-red {
                                    color: red;
                                }

                                .color-green {
                                    color: #32e611;
                                }
                            }
                        }

                        .item-list {
                            height: 460px;
                            overflow: auto;
                            margin-left: 0 !important;

                            .el-row {
                                padding: 0 10px 0 20px;

                                .el-col {
                                    margin-bottom: 10px;

                                    .item-list-single {
                                        border 1px solid #0954a6
                                        text-align: center;
                                        color: #90d9ff;
                                        width: 138px;
                                        font-size: 14px;
                                        background: rgba(54, 105, 134, 0.3);
                                        line-height: 24px;
                                        height: 50px;
                                        vertical-align: middle;
                                        display: table-cell;
                                    }

                                    .item-list-single-err {
                                        background: red;
                                        color: white;
                                    }
                                }
                            }
                        }
                    }
                }

                .sub-system-bottom {
                    height: 246px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 18px;
                    margin-top: 8px;

                    .sub-system-bottom-left {
                        width: 700px;
                        height: 100%;
                        font-size: 18px;
                        border-radius: 5px 5px 0 0;
                    // background: url('../../../assets/img/alarm-now/resoure.png');
                    // background-repeat: no-repeat;
                    // background-size: 100% 100%;
                    // -moz-background-size: 100% 100%;
                        border: 1PX solid #195891;
                        overflow: hidden;

                        > li {
                            color: #90d9ff;
                            width: 50%;
                            font-size: 16px;
                            float: left;
                            height: 6%;
                            margin-top: 26PX;
                            display: flex;
                            justify-content: space-between;

                            .even {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                width: 220px;
                                color: #ffd36a;
                            }

                            .odd {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                color: #47b2fe;
                                margin-left: 0;
                                flex: 61%;
                                text-align: left;
                            }

                            > div {
                                flex: 39%;
                                height: 45PX;
                                float: left;
                                margin-left: 46px;
                            }
                        }

                        li:nth-child(odd) {
                            width: 46%;
                        }

                        .system-info {
                            color: #fff;
                            width: 100%;
                            height: 2.2228rem !important;
                            padding-left: 24px;
                            font-size: 18px;
                            margin: 0;
                            line-height: 2.2228rem;
                            background: url('../../../assets/img/common/second.png') no-repeat;
                            background-size: 100% 100%;
                            -moz-background-size: 100% 100%;
                        }
                    }

                    .sub-system-bottom-right {
                        width: 468px;
                        height: 100%;
                        font-size: 18px;
                        margin-left: 10px;
                        border-radius: 5px 5px 0 0;
                    // background: url('../../../assets/img/alarm-now/resoure.png');
                    // background-repeat: no-repeat;
                    // background-size: 100% 100%;
                    // -moz-background-size: 100% 100%;
                        border: 1PX solid #195891;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        overflow: hidden;

                        > li {
                            color: #90d9ff;
                            width: 100%;
                            height: 6%;
                            margin-top: 26PX;
                            font-size: 16px;
                            display: flex;
                            justify-content: space-between;
                            padding-left: 50px;

                            .even {
                                width: 220px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                color: #ffd36a;
                            }

                            .odd {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                width-space: nowrap;
                                color: #47b2fe;
                                margin-left: 0;
                                flex: 70%;
                            }

                            > div {
                                flex: 30%;
                                height: 45PX;
                            }
                        }

                        .maintenance-info {
                            color: #fff;
                            width: 100%;
                            height: 2.2228rem !important;
                            padding-left: 24px;
                            font-size: 18px;
                            margin: 0;
                            line-height: 2.2228rem;
                            background: url('../../../assets/img/common/second.png') no-repeat;
                            background-size: 100% 100%;
                            -moz-background-size: 100% 100%;
                        }
                    }
                }
            }

            .el-main {
                width: 330px;
                padding: 0;
                height: 100%;

                .sub-system-items {
                    width: 321px;
                    height: 100%;
                border-radius: 5px 5px 0 0;
                // background: url('../../../assets/img/yunxing.png');
                // background-repeat: no-repeat;
                // background-size: 100% 100%;
                // -moz-background-size: 100% 100%;
                    border: 1PX solid #195891;
                    overflow: auto;

                    .miehuo {
                        color: #fff;
                        width: 100%;
                        height: 2.2228rem !important;
                        padding-left: 24px;
                        font-size: 18px;
                        margin: 0;
                        line-height: 2.2228rem;
                        background: url('../../../assets/img/common/second.png') no-repeat;
                        background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        margin-bottom: 14px;
                    }

                    .el-row {
                        color: white;
                        font-size: 17px;

                        .tool-text {
                            font-size: 15px;
                            text-align: right;

                            .color-red {
                                color: red;
                            }

                            .color-green {
                                color: #32e611;
                            }
                        }

                    }

                    .search-item {
                        margin-top: 16px;
                        font-size: 16px;

                        ul {
                            width: 100%;

                            li:hover {
                                box-shadow: inset 0 0 20px #0E70AF;
                                background-color: #063783;
                                height: 40px;
                                width: 100%;
                            }

                            li {
                            // padding-left: 10px;
                                cursor: pointer;
                                color: white;
                                height: 40px;
                                line-height: 40px;
                                width: 100%;
                            // padding-right: 10px;

                                .el-row {
                                    margin: 0;
                                }

                                .subList {
                                    margin-left: 0 !important;
                                    width: 100%;
                                    
                                    li {
                                        margin-top: 7px;
                                    }
                                    .el-col {
                                        padding-left: 18px;
                                    }
                                }

                                .el-button {
                                    background: none;
                                    border: 0.04444rem solid #00aaff;
                                    color: #37a8ff;
                                    font-size: 16px;
                                }

                                .activeClick {
                                    background-color: #063783;
                                    .el-button {
                                        color: #ffd36a !important;
                                    }
                                }
                            }
                        }

                        .el-row {
                            cursor: pointer;
                            margin: 10PX 0;

                            .el-col {
                                font-size: 16px;
                            }

                            .item-btn {
                                text-align: right;
                            }
                        }
                    }
                }
            }
        }
    }

    /deep/ .el-main-header {
        padding-botton: 20PX;
    }
</style>
