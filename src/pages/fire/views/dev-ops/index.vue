<template>
    <div class="dev-ops" :class="{ 'new-color': pageType }">
        <el-container>
            <el-aside width="15.322%">
                <el-filter-tree
                        placeholder="输入关键字进行过滤"
                        v-model="filterText"
                        ref="elFilterTree"
                        :data="treeData"
                        :props="defaultProps"
                        style="margin-top: 10px"
                        default-expand-all
                        :current-node-key="activeUnitId"
					    node-key="id"
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
                    <component
                            ref="sunMethod"
                            v-bind:is="current"
                            @transfer="getMethod"
                            :node="alarmNode"
                            @receiveAlarm="receiveAlarm"
                    ></component>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import maintaining from './main-taining'
    import quipmentAccount from './equipment-account'
    import subsystem from '../status-check/sub-system'
    import protectionZone from '../status-check/protection-zone'
    import testReport from './test-report'

    export default {
        name: 'dev-ops',
        components: {
            'main-taining': maintaining,
            'equipment-account': quipmentAccount,
            'sub-system': subsystem,
            'protection-zone': protectionZone,
            'test-report': testReport
        },
        props: {
            pageType: {
                type: Boolean,
                require: false
            }
        },
        data() {
            return {
                filterText: '',
                treeData: [],
                current: 'equipment-account',
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tabList: [
                    // {
                    // 	title: '灭火装置巡视',
                    // 	id: '01',
                    // 	code: 'sub-system', //菜单对应code
                    // 	active: false
                    // },
                    // {
                    // 	title: '防护区巡视',
                    // 	id: '02',
                    // 	code: 'protection-zone',
                    // 	active: false
                    // },

                    {
                        title: '消防设备台账',
                        id: '04',
                        code: 'equipment-account',
                        active: true
                    },
                    {
                        title: '维保记录',
                        id: '03',
                        code: 'main-taining',
                        active: false
                    },
                    {
                        title: '全面检测报告',
                        id: '05',
                        code: 'test-report',
                        active: false
                    }
                ],
                alarmNode: '',
                untid: ''
            }
        },
        computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	    },
        filters: {},
        watch: {},
        created() {
            this.getOrganization();

        },
        mounted() {
            // console.log(this.pageType)
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
                    this.treeData = result.data
                    this.untid = result.data[0].children[0].children[0].children[0].children[0].id
                    this.$store.dispatch('updateUnitId', this.untid)
                    // this.$refs.sunMethod.init(this.treeData[0])

                } else {
                    this.treeData = []
                }
            },

            // 点击树节点
            handleClickNode(data, node, root) {
                // 更新当前模块单元id
     
                    this.$store.dispatch('updateUnitId', data.id)
                

            },

            // tab点击
            tabChange(val) {
                // console.log(val, 'val')
                this.tabList.forEach(item => {
                    item.active = false
                })
                val.active = true
                this.current = val.code
            },

            getMethod(val) {
                this.tabList.forEach(item => {
                    if (item.code == 'equipment-account') {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
                this.current = 'equipment-account'
                let that = this
                setTimeout(() => {
                    that.$refs.sunMethod.initView(val)
                }, 100)
            },

            receiveAlarm() {
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

    .new-color {
        height: 980px !important;

        .el-aside {
        // background: #141a26;
            height: 930px !important;
            margin-top: 27px;
            background: url('../../assets/img/common/tree-bg.png') no-repeat;
        }

        .el-main .el-main-content {
            border: 4PX solid #d3dee6;
            height: 972px !important;
        }
    }

    .dev-ops {
        width: 1900px;
        height: 900px;
        overflow: hidden;
        margin-left: 10px;

        .el-container {
            height: 890px;
            .el-aside {
                background: url('../../assets/img/common/tree-bg.png') no-repeat;
                background-size 100% 100%
                margin-top: -49px;
                height: 950px;
                overflow-y: auto;
                position: absolute;
            }

            .el-main {
                padding: 21.8px 0 0 0;
                width: 85%;
                margin-left: 300px;
                .el-main-header {
                    margin-top -10px
                    min-height: 50px;
                    width: 99.5%;
                    position: relative;
                    background: url('../../assets/img/common/menu-bg-three.png') no-repeat;
                    background-size: 100% 100%;
                    line-height: 50px;

                    .el-row {
                    // margin-top: 12px;
                        margin-bottom: 12px;

                        .fire-header-sub-title {
                            font-size: 22px;
                            color: white;
                            margin: 36px;
                            cursor: pointer;
                        }

                        .fire-header-title {
                            color: #37a8ff;
                            font-size: 14px;
                            cursor: pointer;
                            width: 197px;
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
                    height: 809px;
                    width: 99.5%;
                    position: relative;
                    background: url("~@/assets/img/common/wai.png")
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    margin-top: -2px;
                }
            }
        }
    }
</style>
