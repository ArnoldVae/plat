<template>
	<div :class="pageType? 'statusCheck':'statusCheck-5'">
		<el-container>
			<el-aside width="15%" >
				<el-filter-tree
					placeholder="输入关键字进行过滤"
					v-model="filterText"
					ref="elFilterTree"
					:data="treeData"
					:props="defaultProps"
					:current-node-key="$store.getters.unitId"
					node-key="id"
					default-expand-all
					:filter-node-method="filterNode"
					highlight-current
					@node-click="handleClickNode"
				>
				</el-filter-tree>
			</el-aside>
			<el-main>
				<div class="el-main-header">
					<el-row>
						<el-col :span="24">
							<span
								class="fire-header-title"
								:class="{ 'fire-header-active': tab.active == true }"
								@click="tabChange(tab)"
								v-for="(tab, index) in tabList"
								:key="index"
								>{{ tab.title }}</span
							>
						</el-col>
					</el-row>
				</div>
				<div class="el-main-content">
					<component ref="sunMethod" v-bind:is="current" :pageType="pageType"></component>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
const trees = require('../../filters/treeCode')
import subSystem from './sub-system'
import viewCheck from './view-check'
import protectionZone from './protection-zone'
export default {
	name: 'statusCheck',
	components: {
		'sub-system': subSystem,
		'view-check': viewCheck,
		'protection-zone': protectionZone
	},
	props: {
		// pageTypeState:{
		// 	type: Boolean,
		// 	require: false
		// }
	},
	data() {
		return {
			pageType:false,
			filterText: '',
			itemData: {},
			treeData: trees.treeData,
			defaultProps: {
				children: 'children',
				label: 'label'
			},

			tabList: [
				{
					title: '灭火装置监视',
					id: '01',
					code: 'sub-system', //菜单对应code
					active: true
				},
				// {
				// 	title: '电缆温度监测',
				// 	id: '02',
				// 	code: 'view-check',
				// 	active: false
				// },
				{
					title: '防护区监视',
					id: '03',
					code: 'protection-zone',
					active: false
				}
			],
			subTabList: [],
			current: 'sub-system'
		}
	},
	computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	},
	filters: {},
	watch: {
		filterText(val) {
			this.$refs.elFilterTree.$refs['el-tree'].filter(val)
		},
		activeUnitId: {
			handler(val) {
				this.current = 'sub-system'
				this.tabList.forEach(item => {
					item.active = false
				})
				this.tabList[0].active = true
			}
		}
	},
	created() {

	},
	mounted() {
		console.log(this.$store)

		this.getOrganization()
		this.registerMQTT()

	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
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
		init() {
			// this.$refs.sunMethod.init()
		},
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},
		// 获取组织结构
		async getOrganization() {
			let result = await this.$_api.statusCheck.getOrganization({
				iType: '1006003',
				treeFlag: '2'
			})
			if (result.success) {
				this.treeData = result.data
				// this.$refs.sunMethod.init(this.treeData[0])
				// this.itemData=this.treeData[0]
			} else {
				this.treeData = []
			}
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
		},
		// 点击树节点
		handleClickNode(data, node, root) {
			// 更新当前模块单元id
			this.$store.dispatch('updateUnitId', data.id)
		},
		markerList() {},
		initView(item) {
			//获取控制端口为5200时的样式状态开关
			this.pageType = item.pageType

			// console.log(item.pageType);
			this.$refs.sunMethod.initSysView(item)
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
.statusCheck{
	margin 20px  20px 0  20px
	height 100%
	width 98%
	.el-aside{
		background #141a26
		height 960px

		.el-tree{
			background none;
			color white
		}
	}

	.el-main{
           overflow hidden
           padding-bottom: 0
		margin-top -20px
		padding-top:13px;
		.el-main-header{
			min-height 50px
			width: 100%;
			// left: 7px;
			.el-row{
				margin-top 12px
				margin-bottom  12px
				.fire-header-sub-title{
					font-size 14px
					color white
					margin 36px
					cursor pointer

				}

				.fire-header-title{
					color #37a8ff
					font-size 16px
					margin-right  94px
					cursor pointer


				}


				.fire-header-active{
					color #f6ce69
				}
				.point{
					position: relative
					left 2.5%
					margin-right 10px

				}
			}
			position relative
			background: #062964;
			border: 0.04444rem solid #044e90;
			border-radius 4px

		}
		.el-main-content{
			margin-top 10px;
			height 770px
			width: 100%;

			position relative

			// background url("../../assets/img/hull.png")
			background-size:100% 100%
			-moz-background-size:100% 100%
		}


	}

}
</style>

<style lang="stylus" scoped>
.statusCheck-5 {
	margin 20px  20px 0  20px
	height 100%
	width 98%
	.el-aside{
		// background #141a26
		height 960px
		position relative
		top -50px

		.el-tree{
			background none;
			color white
		}
	}
	.el-main{
           overflow hidden
           padding-bottom: 0
		margin-top -20px
		padding-top:13px;
		.el-main-header{
			min-height 50px
			width: 100%;
			// left: 7px;
			.el-row{
				margin-top 12px
				margin-bottom  12px
				.fire-header-sub-title{
					font-size 14px
					color white
					margin 36px
					cursor pointer

				}

				.fire-header-title{
					color #37a8ff
					font-size 16px
					margin-right  94px
					cursor pointer


				}

				.fire-header-title:first-child {
					margin-left 50px
				}
				.fire-header-active{
					color #f6ce69
				}
				.point{
					position: relative
					left 2.5%
					margin-right 10px

				}
			}
			position relative
			// background: #062964;
			background: url('../../assets/img/threemenu.png') no-repeat;
			background-size: 100% 100%;
			border: 0.04444rem solid #044e90;
			border-radius 4px

		}
		.el-main-content{
			margin-top 10px;
			height 770px
			width: 100%;

			position relative

			// background url("../../assets/img/hull.png")
			background-size:100% 100%
			-moz-background-size:100% 100%
		}


	}

}
</style>
