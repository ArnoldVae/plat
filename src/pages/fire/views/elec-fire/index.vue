<template>
    <div class="elecFire">
        <el-container class="el-comtanier">
            <el-aside width="290px">
                <el-filter-tree
                        placeholder="输入关键字进行过滤"
                        v-model="filterText"
                        ref="elFilterTree"
                        :data="treeData"
                        style="margin-top: 10px"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        highlight-current
                        @node-click="handleClickNode"
                >
                    <template #prefix>
                        <i class="el-icon-search"></i>
                    </template>
                </el-filter-tree>
            </el-aside>
            <el-main>
                <div class="el-main-header">
                    <el-row>
                        <el-col :span="24">
                            <div
                                    class="fire-header-title"
                                    :class="{ 'fire-header-active': tab.active == true }"
                                    @click="tabChange(tab)"
                                    v-for="(tab, i) in tabList"
                                    :key="i"
                            >{{ tab.title }}
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="el-main-content">
                    <component ref="sunMethod" v-bind:is="current"></component>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import cableTemp from './cable-temp'
    import residualCurrent from './residual-current'

    export default {
        name: 'cableTemp',
        components: {
            'cable-temp': cableTemp,
            'residual-current': residualCurrent
        },
        props: {},
        data() {
            return {
                tabList: [
                    {
                        title: '绝缘监测',
                        id: '02',
                        code: 'residual-current', //菜单对应code
                        active: true
                    },
                    {
                        title: '早期扑救',
                        id: '01',
                        code: 'cable-temp', //菜单对应code
                        active: false
                    }
                ],
                subTabList: [],
                current: 'residual-current',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                filterText: '',
                untid:''
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
                    this.current = 'residual-current'
                    this.tabList.forEach(item => {
                        item.active = false
                    })
                    this.tabList[0].active = true
                }
            }
        },
        created() {
            this.getOrganization()
        },
        mounted() {
            this.registerMQTT()
        },
        activited() {
        },
        update() {
        },
        beforeDestory() {
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true
                return data.title.indexOf(value) !== -1
            },
            // 获取组织结构
            async getOrganization() {
                let result = await this.$_api.analyst.getOrganization({
                    iType: '10060003',
                    treeFlag: '2'
                })
                if (result.success) {
                    // console.log(result.data)
                    this.treeData = result.data
                    this.untid = result.data[0].children[0].children[0].children[0].children[0].id
                    cosole.log(this.unitid,"书第一个id")
                    this.$store.dispatch('updateUnitId', this.untid)
                } else {
                    this.treeData = []
                }
            },
            // 点击树节点
            handleClickNode(data, node, root) {
                // 更新当前模块单元id
                this.$store.dispatch('updateUnitId', data.id)
            },
            registerMQTT() {
                this.$_listen('firecontrolAllAlarm', (topic, msg, pack) => {
                    let msgJson = JSON.parse(msg.toString())
                    // console.log(msgJson);
                    if (msgJson.cmd === '3002') {
                        //报警的上传数据
                        this.$emit('receiveAlarm', 'alarm-action', msgJson.unitid)
                    }
                })
            },
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
    /deep/ .el-input__prefix {
        left: 20px;
        top: 7px;
    }

    .elecFire {
        width: 1900px;
        margin-left: 10px;

        .el-container {
            height: 890px;
            .el-aside {
                background: url('../../assets/img/common/tree-bg.png');
                overflow-y: auto;
                margin-top: -49px;
                height: 930px;
            }
            .el-main {
                overflow: hidden;
                padding-bottom: 0;
                padding: 0;
                width: 85%;
                margin-left: 10px;
                .el-main-header {
                    min-height: 50px;
                    width: 99.5%;
                    position: relative;
                    background: url('../../assets/img/common/menu-bg-three.png') no-repeat;
                    background-size: 100% 100%;
                    line-height: 50px;

                    .el-row {
                        margin-top: 12px;
                        margin-bottom: 12px;

                        .fire-header-sub-title {
                            font-size: 18px;
                            color: white;
                            margin: 36px;
                            cursor: pointer;
                        }

                        .fire-header-title {
                            color: #37a8ff;
                            font-size: 18px;
                            cursor: pointer;
                            width: 162px;
                            float: left;
                            text-align: center;
                        }

                        .fire-header-active {
                            color: #f6ce69;
                        }

                        .point {
                            position: relative;
                            left: 2.5%;
                            margin-right: 10px;
                        }
                    }
                }

                .el-main-content {
                    margin-top: 10px;
                    height: 810px;
                    width: 99.5%;
                    position: relative;
                // background url("../../assets/img/hull.png")
                    background-size: 100% 100%;
                    -moz-background-size: 100% 100%;
                }
            }
        }
    }
</style>
