<template>
	<div class="electronic-fence-control">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import electronicFenceControlTable from '@ac/views/common/view-table'
import electronicFenceControlCustomization from './customization.vue'
export default {
	name: 'electronic-fence-control',
	components: {
		'electronic-fence-control-table': electronicFenceControlTable,
		'electronic-fence-control-customization': electronicFenceControlCustomization
	},
	props: {},
	data() {
		return {
			current: 'electronic-fence-control-customization'
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
.electronic-fence-control {
	height: 100%;
}
</style>
