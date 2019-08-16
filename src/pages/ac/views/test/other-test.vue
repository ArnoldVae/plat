<template>
	<div class="other-test">
		<div class="action">
			<Button type="info">其他测试</Button>
		</div>
		<div class="container"></div>
	</div>
</template>
<script>
export default {
	name: 'other-test',
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
	beforeUpdate() {},
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
.other-test {
	.action {
		display: flex;
		justify-content: center;

		.ivu-btn {
			margin: 10px;
		}
	}
	.container {

	}
}
</style>
