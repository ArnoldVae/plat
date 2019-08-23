<template>
	<div class="el-filter-tree">
		<el-input v-bind="$attrs" v-on="$listeners">
			<template v-for="sl in Object.keys(this.$slots)" :slot="sl">
				<slot :name="sl"></slot>
			</template>
		</el-input>

		<el-tree v-bind="$attrs" v-on="$listeners" ref="el-tree">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<div v-if="data.type == 10070001" class="company"></div>
				<div v-if="data.type == 0" class="station"></div>
				<div v-if="data.type == 10070002" class="team"></div>
				<div v-if="data.type == 1" class="substation"></div>
				<div v-if="data.type == 2" class="circuit"></div>
				<span>
					{{ data.title }}
				</span>
			</span>
		</el-tree>
	</div>
</template>
<script>
export default {
	name: 'el-filter-tree',
	components: {},
	props: {},
	data() {
		return {}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {},
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
.el-filter-tree {
	/deep/ .el-input {
		padding: 0 10px;
		.el-input__inner {
			background: #06234a;
			border-color: transparent;
			color: #98cee8 !important;
		}
	}

	/deep/ .el-tree {
		background: transparent;
		color: #fff;

		.el-tree-node__content {
			height: 50px;
			&:hover {
				background-color: #063783 !important;
				/* color: #fa0 !important; */
			}

			.custom-tree-node {
				node-icon(img-url) {
					display: inline-block;
					width: 17px;
					height: 17px;
					background: url(img-url) no-repeat;
					background-size: 17px 17px;
					position: relative;
					top: 3px;
					margin-right: 3px;
				}
				.station {
					node-icon('~@/assets/img/common/station-icon.png')
				}
				.company {
					node-icon('~@/assets/img/common/company-icon.png')
				}
				.team {
					node-icon('~@/assets/img/common/team-icon.png')
				}
				.substation {
					node-icon('~@/assets/img/common/substation-icon.png')
				}
				.circuit {
					node-icon('~@/assets/img/common/circuit-icon.png')
				}
			}
		}
		.el-tree-node:focus>.el-tree-node__content {
			background-color: #063783 !important;
			/* color: #fa0 !important; */
		}

		.el-tree-node.is-current.is-focusable {
			.el-tree-node__content {
				background-color: #063783 !important;
				/* color: #fa0 !important; */
			}
		}
	}
}
</style>
