<template>
	<div class="notFind">
		<h1>404</h1>
	</div>
</template>
<script>
export default {
	name: 'notFind',
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
.notFind {
	h1 {
		color: #fa0;
	}
}
</style>
