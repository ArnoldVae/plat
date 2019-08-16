<template>
	<div class="analyst-data">
		<el-container>
			<el-aside width="260px">
				<el-filter-tree
					placeholder="输入关键字进行过滤"
					v-model="filterText"
					ref="elFilterTree"
					:data="treeData"
					:props="defaultProps"
					default-expand-all
					:current-node-key="$store.getters.unitId"
					node-key="id"
					:filter-node-method="filterNode"
					highlight-current
					@node-click="handleClickNode"
				></el-filter-tree>
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
					<component ref="sunMethod" v-bind:is="current"></component>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import analystMain from './analyst-main'
export default {
	name: 'analyst-data',
	components: {
		'analyst-main': analystMain
	},
	props: {},
	data() {
		return {
			filterText: '',
			treeData: [],
			current: 'analyst-main',
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			tabList: [
				{
					title: '数据总览',
					id: '01',
					code: 'analyst-main', //菜单对应code
					active: true
				},
				{
					title: '警情分析',
					id: '02',
					code: 'view-check',
					active: false
				},
				{
					title: '误报分析',
					id: '03',
					code: 'protection-zone',
					active: false
				},
				{
					title: '运维分析',
					id: '03',
					code: 'protection-zone',
					active: false
				}
			]
		}
	},
	computed: {},
	filters: {},
	watch: {
		filterText(val) {
			this.$refs.elFilterTree.$refs['el-tree'].filter(val)
		}
	},
	created() {
		this.getOrganization()
	},
	mounted() {},
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
.analyst-data{
	margin 20px 20px 0 20px
	height 830px;

	overflow hidden
	.el-main{
			padding-bottom: 0
			margin-top -20px
			.el-main-header{
				min-height 50px
				width: 100%;
				left: 7px;
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
						margin 36px
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
				height 750px
				width: 100%;
				position relative
			}

		}


}
</style>
