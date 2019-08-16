<template>
	<div class="fire-control">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import fireControlTable from '@ac/views/common/view-table'
import fireControlCustomization from './customization.vue'
export default {
	name: 'fire-control',
	components: {
		'fire-control-table': fireControlTable,
		'fire-control-customization': fireControlCustomization
	},
	props: {},
	data() {
		return {
			current: 'fire-control-customization'
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
.fire-control {
	height: 100%;
}
</style>
