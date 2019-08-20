<template>
	<div class="personnel">
		<component v-bind:is="current"></component>

	</div>
</template>
<script>
	import personManage from "./personManage"

export default {
	name: 'personnel',
	components: {
		"person-manage": personManage
	},
	props: {},
	data() {
		return {
			current:'person-manage',
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

.personnel {
	width: 1920px;
	height: 100%;
	background: url('~@/assets/img/navigation/background.png') no-repeat 0 -140px;
	background-size: 100% 1080px;
}
</style>
