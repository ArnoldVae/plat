<template>
    <!--<div class="fire">-->
        <!--&lt;!&ndash;		<div class="fire-header">&ndash;&gt;-->
        <!--&lt;!&ndash;			<navigation :menuData="test" title="智能消防管理平台" :alarm="99" > </navigation>&ndash;&gt;-->
        <!--&lt;!&ndash;		</div>&ndash;&gt;-->
        <!--<div class="fire-nav">-->

            <!--<div class="fire-header-title" :class="{'fire-header-active': tab.active==true}" @click="tabChange(tab)"-->
                 <!--v-for="(tab,index) in tabList" :key="index">{{tab.title}}-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="fire-content">-->
            <!--<keep-alive  include="systemView">-->
                <!--<component v-bind:is="current" ref="test" @transfer="getMethod" :node="alarmNode"-->
                           <!--@receiveAlarm="receiveAlarm" @switchWarning="switchWarning"></component>-->
            <!--</keep-alive>-->

        <!--</div>-->
        <!--<statistics class='statisBottom'></statistics>-->
    <!--</div>-->
</template>
<script>
    import systemView from './system-view'
    import statusCheck from './status-check'
    import earlyWarning from './early-warning'
    import alarmAction from './alarm-action'
    import analystData from './analyst-data/'
    import devOps from './dev-ops'
    import navigation from "../../../../src/components/singletons/navigation"

    export default {
        name: 'fire',
        components: {
            "system-view": systemView,
            "status-check": statusCheck,
            "early-warning": earlyWarning,
            "alarm-action": alarmAction,
            "dev-ops": devOps,
            'analyst-data': analystData,
            navigation,
        },
        props: {},
        data() {
            return {
                current: 'system-view',
                test: [],
                tabList: [
                    {
                        title: '系统总览',
                        id: '01',
                        code: 'system-view', //菜单对应code
                        active: true
                    },
                    // {
                    //     title: '早期预警',
                    //     id: '03',
                    //     code: 'early-warning',
                    //     active: false
                    // },
                    {
                        title: '报警联动',
                        id: '04',
                        code: 'alarm-action',
                        active: false
                    },
                    {
                        title: '状态监视',
                        id: '02',
                        code: 'status-check',
                        active: false
                    },
                    {
                        title: '运维管理',
                        id: '05',
                        code: 'dev-ops',
                        active: false
                    },
                    // {
                    //     title: '数据分析',
                    //     active: false,
                    //     code: 'analyst-data',
                    //     id: '06'
                    // }
                ],
                alaramTopic: 'qif/fire/app/alarm/',
                topicArr: [], //mqtt 需要订阅的topic
                alarmNode: '',
                stationId: ''
            }
        },
        computed: {},
        filters: {},
        watch: {},
        created() {
            this.getAllstation()
            // this.current='alarm-action'
        },
        mounted() {
        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            /**
             * tab菜单切换
             * tab为当前勾选节点
             * 处理active是否高亮显示
             * current处理菜单切换
             */
            tabChange(tab) {
                this.tabList.forEach(item => {
                    item.active = false
                })
                tab.active = true
                this.current = tab.code

                // console.log(this.$refs)
            },
            getMethod(val) {
                this.tabList.forEach(item => {
                    if (item.code == 'status-check') {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })

                this.current = 'status-check'
                let that = this
                setTimeout(() => {
                    that.$refs.test.initView(val)
                }, 100)
            },
            backPage() {
                this.current = 'system-view'
            },
            //跳转切换报警联动页面
            switchWarning(val){
                // console.log(val)
                this.tabList.forEach(item=>{
                    if(item.code == 'alarm-action'){
                        item.active = true
                    }else{
                        item.active = false
                    }
                })
                this.current = 'alarm-action'
            },

            //获取所有接入消防的站
            getAllstation() {
                this.$_api.systemView.getAllStation({iType: 10060003}).then(res => {
                    // debugger
                    if (res.success) {
                        res.data.map((val, index, arr) => {
                            this.topicArr.push(this.alaramTopic  + val.unitId)
                        })
                        this.$store.dispatch('updateUnitId',res.data[0].unitId)
                        //订阅所有消防站点报警的topic
                        // console.log(this.topicArr);
                        this.subscribe(this.topicArr);
                    }
                })
            },
            //订阅topic
            subscribe(topic) {
                // console.log(topic[0])
                this.$_mqtt.unsubscribe(topic[0], err => {
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
            receiveAlarm(component, node) {
                console.log(component, node);
                this.alarmNode = node;
                this.tabList.forEach(item => {
                    if (item.code == component) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
                this.current = component;
                this.$store.commit('STATIONID', node)
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


    .fire {
        width: 100%;
        height: 100%;
        margin-top -1px
        background: url('~@/assets/img/navigation/background.png') no-repeat;

        .fire-header {
            height 100px
            margin-top 1px
        }
        background-size: 100% 100%;

        .fire-nav {
            top:1px
            height 45px
            width 71.9%
            position relative
            line-height 45px
            left: 16%

            background url("~@/assets/img/navigation/menu-long.png")
            background-size: 100% 100%
            -moz-background-size: 100% 100%

            .fire-header-title {
                color white
                float left
                width 230px
                height 45px
                line-height 45px
                text-align center
                font-size 16px
                cursor pointer
            }

            .fire-header-active {
                color #f6ce69
                background url("~@/assets/img/navigation/menu2.png")
                background-size: 100% 100%
                -moz-background-size: 100% 100%
            }

            .back-page {
                color #37a8ff
                font-size 16px
                cursor pointer
                margin-left 47%
            }
        }
    }
</style>
