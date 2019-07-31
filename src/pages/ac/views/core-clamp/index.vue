<template>
	<div class="core-clamp">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import coreClampTable from '@ac/views/common/view-table'
import coreClampCustomization from './customization.vue'
export default {
	name: 'core-clamp',
	components: {
		'core-clamp-customization': coreClampCustomization,
		'core-clamp-table': coreClampTable
	},
	props: {},
	data() {
		return {
			current: 'core-clamp-customization'
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
.core-clamp {
	height: 100%;
}
</style>
