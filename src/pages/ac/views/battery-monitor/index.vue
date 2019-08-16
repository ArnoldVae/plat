<template>
	<div class="battery-monitor">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import batteryTable from '@ac/views/common/view-table'
import batteryCustomization from './customization.vue'
export default {
	name: 'battery-monitor',
	components: {
		'battery-monitor-table': batteryTable,
		'battery-monitor-customization': batteryCustomization
	},
	props: {},
	data() {
		return {
			current: 'battery-monitor-customization'
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
.battery-monitor {
  height: 100%;
  /* background: #fa0; */
}
</style>
