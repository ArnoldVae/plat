<template>
  <div class="breaker-gas-monitor">
    <!-- <transition name="v" mode="out-in"> -->
    <component v-bind:is="current"></component>
    <!-- </transition> -->
  </div>
</template>
<script>
import breakerGasMonitorCustomization from './customization.vue'
import breakerGasMonitorTable from '@ac/views/common/view-table'
export default {
	name: 'breaker-gas-monitor',
	components: {
		'breaker-gas-monitor-customization': breakerGasMonitorCustomization,
		'breaker-gas-monitor-table': breakerGasMonitorTable
	},
	props: {},
	data() {
		return {
			current: 'breaker-gas-monitor-customization'
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
.breaker-gas-monitor {
  height: 100%;
  /* background: #fa0; */
}
</style>
