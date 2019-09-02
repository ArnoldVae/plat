<template>
    <div class="main-check">
        <el-container>
            <el-aside width="240PX">
                <div class="menuList">
                    <div class="menu-single" v-for="(menu,index) in menuList" :key="index" @click="tabChange(menu)">
                        <img :src="menu.imgUrl" width="80PX" alt="">
                        <div class="title">
                            <span :class="{'title-active': menu.active}">
                                {{menu.title}}
                            </span>
                        </div>
                    </div>
                </div>
            </el-aside>
            <el-main>
                <div class="conttent" >
                    <component @changeFlag="changeFlag" v-bind:is="current"  style="margin-top: -6PX" :pageType="true" ref="subMethod"></component>
                </div>
            </el-main>
        </el-container>

    </div>
</template>
<script>
    import systemView from '../system-view'
    import alarAction from '../alarm-action'
    import statusCheck from '../status-check'
    import devOps from '../dev-ops'
    import elecFire from '../elec-fire'
    export default {
        name: 'mainCheck',
        components: {
            "system-view":systemView,
            "alarm-action":alarAction,
            "status-check":statusCheck,
            "dev-ops":devOps,
            "elec-fire":elecFire,


        },
        props: {},

        data() {
            return {
                current:"dev-ops",
                menuList:[

                    {
                        title:" 电缆防火",
                        imgUrl: require('../../assets/img/main/elec-n.png'),
                        initUrl:require('../../assets/img/main/elec-n.png'),
                        selectUrl:require('../../assets/img/main/elec.png'),
                        active:false,
                        id:"elec-fire",
                        code:'01'
                    },
//                    {
//                        title:"系统总览",
//                        imgUrl: require('../../assets/img/main/zt.png'),
//                        initUrl:require('../../assets/img/main/zt-n.png'),
//                        selectUrl:require('../../assets/img/main/zt.png'),
//                        active:true,
//                        id:"system-view",
//                        code:'01'
//                    },
//                    {
//                        title:"状态监视",
//                        imgUrl: require('../../assets/img/main/xt-n.png'),
//                        initUrl:require('../../assets/img/main/xt-n.png'),
//                        selectUrl:require('../../assets/img/main/xt.png'),
//                        active:false,
//                        id:'status-check',
//                        code:'01'
//                    },
//                    {
//                        title:"早期预警",
//                        imgUrl: require('../../assets/img/main/zq-n.png'),
//                        initUrl:require('../../assets/img/main/zq-n.png'),
//                        selectUrl:require('../../assets/img/main/zq.png'),
//                        active:false,
//                        code:'01'
//                    },
                    {
                        title:"报警联动",
                        imgUrl: require('../../assets/img/main/xtm-n.png'),
                        initUrl:require('../../assets/img/main/xtm-n.png'),
                        selectUrl:require('../../assets/img/main/xtm.png'),
                        active:false,
                        id:"alarm-action",
                        code:'01'
                    },
                    {
                        title:"运维管理",
                        imgUrl: require('../../assets/img/main/yw.png'),
                        initUrl:require('../../assets/img/main/yw-n.png'),
                        selectUrl:require('../../assets/img/main/yw.png'),
                        active:true,
                        id:'dev-ops',
                        code:'01'
                    },
                ]
            }
        },
        computed: {
            activeFlag() {
                return this.$store.getters.traFlag
            }
        },
        filters: {},
        watch: {
            activeFlag:{
                handler(val){
                    if(val){
                        this.menuList.forEach((item)=>{
                            if(item.id=='alarm-action'){
                                item.imgUrl=item.selectUrl
                                item.active=true
                            }else {
                                item.imgUrl=item.initUrl
                                item.active=false
                            }

                        })
                        this.current='alarm-action'
                    }

                },
            }
        },
        created() {
            this.subscribe()
            this.registerMQTT()

        },
        mounted() {
            console.log($_fireVideoCofig)

        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            tabChange(obj) {
                if(obj.id=='alarm-action'){
                    let that=this
                    setTimeout(()=>{
                        this.$refs.subMethod.initAlam()
                    },10)
                }
                this.menuList.forEach((item) => {
                    item.imgUrl = item.initUrl
                    item.active = false
                })
                this.current = obj.id


                obj.imgUrl = obj.selectUrl
                obj.active = true

            },
            changeFlag(val) {
                if (val) {
                    this.menuList.forEach((item) => {
                        if (item.id == 'alarm-action') {
                            item.imgUrl = item.selectUrl
                            item.active = true
                        } else {
                            item.imgUrl = item.initUrl
                            item.active = false
                        }
                    })
                    this.current = 'alarm-action'

                }

            },
            //获取所有接入消防的站
//            getAllstation() {
//                this.$_api.systemView.getAllStation({iType: 10060003}).then(res => {
//                    debugger
//                    if (res.success) {
//
//                        this.$store.dispatch('updateUnitId',res.data[0].unitId)
//                        //订阅所有消防站点报警的topic
//                        console.log(this.topicArr);
//                        this.subscribe(this.topicArr);
//                    }
//                })
//            },
            //订阅topic
            subscribe() {
                const  topic="qif/fire/app/alarm"
                // debugger
                this.$_mqtt.unsubscribe(topic, err => {
                    if (err) {
                        console.log('取消智慧消防订阅失败')
                    } else {
                        console.log('取消智慧消防订阅成功')
                        this.$_mqtt.subscribe(topic, err => {
                            if (err) {
                                console.log('智慧消防订阅失败!')
                            } else {
                                console.log('智慧消防订阅成功!')

                            }
                        })
                    }
                })
            },
            //            获取推送信息
            registerMQTT(){

//                const topic="qif/fire/app/alarm/8177a787a28b4f86a103fac9a023db05"
                this.$_listen(this.$options.name, (topic, msg, pack) => {

                    let msgJson = JSON.parse(msg.toString())
                    // console.log(msgJson)
                    // debugger

                    if (msgJson.cmd === '3002') {
                        //报警的上传数据
//                        日期格式化
                        if(msgJson.level!='0'){
                            this.menuList.forEach((item) => {
                                if (item.id == 'alarm-action') {
                                    item.imgUrl = item.selectUrl
                                    item.active = true
                                } else {
                                    item.imgUrl = item.initUrl
                                    item.active = false
                                }
                            })
                            this.current = 'alarm-action'
                        }
                        this.$store.dispatch('updateUnitId',msgJson.unitId)

                        let that=this
                        setTimeout(()=>{
                            this.$refs.subMethod.initAlam(msgJson)
                        },10)
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

    }
</script>

<style lang="stylus" scoped>
    html{
        background #34373e
    }
    .conttent{
    // padding-top 10PX
    }
    .main-check{
        width 3768PX
        margin-top 204PX
    // height 1080PX
        background: url('../../assets/img/main/bg.png')
        .el-container{
            .el-aside{
            // height 1080PX
                margin 0
                background  #34373e
                .menuList{
                    .menu-single{
                        width 100%
                        cursor pointer
                        margin-bottom 12PX
                    // margin-left 24PX
                     img{
                         width: 140PX;
                         margin-left 50PX
                     }
                        .title{
                            font-size 36PX
                            color white
                            padding 10PX 0 20PX 0PX
                            text-align center
                        // margin-right 22PX
                            .title-active{
                                color #57a3f3
                            }
                        }

                    }
                }
            }

            .el-main{
                width 3532PX
                height: 43rem;
                padding 0
                .header{
                    background: url('../../assets/img/main/header.png')
                    background-size: 101% 100%;
                    margin-left: -3PX;
                    -moz-background-size: 100% 100%
                    height 80PX
                    width 100%
                    text-align center
                    font-weight bold
                    font-size 24PX
                    color #141a26
                    vertical-align middle
                    line-height 80PX
                    span{
                        margin-left 36PX
                    }

                }
                .map{
                    height 100%;
                }
            }

        }
    }


    /deep/.systemView .el-container{
        height 100% !important
        padding 0
    }
</style>
