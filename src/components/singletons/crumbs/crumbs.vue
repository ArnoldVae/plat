<template>
	<div class="crumbs">
		<div class="wrap">
			<div class="crumbs-item home">
				<div class="icon"></div>
				<div class="title">智能辅助</div>
			</div>
			<div class="crumbs-item">
				<div class="title">{{ currentSystemName }}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'crumbs',
	components: {},
	props: {
		currentSystemName: {
			type: String
		}
	},
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
.crumbs {
	.wrap {
		width: 1751px;
		height: 48px;
		background: url('~@/assets/img/crumbs/crumbs-bg.png') no-repeat;
		background-size: 1751px 48px;
		box-sizing: border-box;
		display: flex;
		overflow: hidden;

		.crumbs-item {
			width: 148px;
			height: 48px;
			background: url('~@/assets/img/crumbs/other.png') no-repeat;
			background-size: 148px 48px;
			position: relative;
			left: -24px;
			display: flex;
			justify-content: center;
			align-items: center;

			.title {
				font-size: 16px;
				color: #fff;
			}
		}

		.home {
			background: url('~@/assets/img/crumbs/home-bg.png') no-repeat;
			left: initial;
			display: flex;
			justify-content: center;
			align-items: center;
			padding-right: 7px;

			.icon {
				width: 21px;
				height: 17px;
				background: url('~@/assets/img/crumbs/home.png') no-repeat;
				background-size: 21px 17px;
				margin-right: 9px;
			}
		}
	}
}
</style>
