<template>
	<div class="water-level">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import waterLevelTable from '@ac/views/common/view-table'
import waterLevelCustomization from './customization.vue'
export default {
	name: 'water-level',
	components: {
		'water-level-customization': waterLevelCustomization,
		'water-level-table': waterLevelTable
	},
	props: {},
	data() {
		return {
			current: 'water-level-customization'
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
.water-level {
	height: 100%;
}
</style>
