<template>
	<div class="view-plate">
		<div class="card-wrap">
			<template v-for="item in 50">
				<a-card hoverable title="XXX光字牌" :bordered="false" :loading="loading">
					<div class="icon"></div>
					<div class="info">
						<div>信息描述信息描述信息描述</div>
					</div>
				</a-card>
			</template>
		</div>
	</div>
</template>
<script>
export default {
	name: 'view-plate',
	components: {},
	props: {},
	data() {
		return {
			loading: false
		}
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
.view-plate {
	height: 100%;
	/* width: 100%; */
	overflow: auto;
	/* background: #fff; */

	.card-wrap {
		display: flex;
		flex-wrap: wrap;

		.ant-card {
			width: 410px;
			height: 205px;
			margin-bottom: 20px;
			margin-right: 20px;

			/deep/ .ant-card-body {
				display: flex;

				.icon {
					width: 100px;
					height: 100px;
					background: url('~@/assets/img/view-plate/icon-bg.png') no-repeat;
					background-size: 100px 100px;
				}

				.info {
					padding-left: 10px;
				}
			}
		}
	}
}
</style>
