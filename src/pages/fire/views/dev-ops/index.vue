<template>
	<div class="dev-ops" :class="{ 'new-color': pageType }">
		<el-container>
			<!-- <el-aside width="15%" >
                <el-filter-tree
                        placeholder="输入关键字进行过滤"
                        v-model="filterText"
                        ref="elFilterTree"
                        :data="treeData"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        highlight-current
                        @node-click="handleClickNode"
                ></el-filter-tree>
            </el-aside>-->
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
							>
								{{ tab.title }}
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
import testReport from '../test-report'

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
				{
					title: '灭火装置巡视',
					id: '01',
					code: 'sub-system', //菜单对应code
					active: false
				},
				{
					title: '防护区巡视',
					id: '02',
					code: 'protection-zone',
					active: false
				},

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
			alarmNode: ''
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		// this.getOrganization()
	},
	mounted() {
		console.log(this.pageType)
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},
		// 获取组织结构
		async getOrganization() {
			let result = await this.$_api.analyst.getOrganization({
				iType: '1006003',
				treeFlag: '2'
			})
			if (result.success) {
				this.treeData = result.data
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
			console.log(val, 'val')
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

		receiveAlarm() {}
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
.new-color {
    height: 980px !important;

    .el-aside {
        background: #141a26;
        height: 980px !important;
    }

    .el-main .el-main-content {
        border: 4PX solid #d3dee6;
        height: 972px !important;
    }
}

.dev-ops {
    height: 830px;
    overflow: hidden;
    font-size: 30PX

    .el-main {
        padding: 21PX 0 0 0;

        .el-main-header {
            min-height: 50px;
            width: 100%;
            position: relative;
            background: url('~@fire/assets/img/main/bg-long.png');
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

                .fire-header-title{
                    color #fff
                    font-size 36PX
                    cursor pointer
                    width  240px
                    float left
                    text-align center


                }
                .fire-header-active{
                    background url('../../assets/img/main/bg-menu.png')
                    background-size 100% 100%;
                }
                .point {
                    position: relative;
                    left: 2.5%;
                    margin-right: 10px;
                }
            }
        }

        .el-main-content {
            height: 750px;
            width: 100%;
            position: relative;
        }
    }
}
</style>
