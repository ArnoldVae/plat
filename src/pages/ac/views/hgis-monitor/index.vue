<template>
  <div class="hgis-monitor">
    <!-- <transition name="v" mode="out-in"> -->
    <component v-bind:is="current"></component>
    <!-- </transition> -->
  </div>
</template>
<script>
import hgisMonitorTable from '@ac/views/common/view-table'
import hgisMonitorCustomization from './customization.vue'
export default {
	name: 'hgis-monitor',
	components: {
		'hgis-monitor-customization': hgisMonitorCustomization,
		'hgis-monitor-table': hgisMonitorTable
	},
	props: {},
	data() {
		return {
			current: 'hgis-monitor-customization'
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
.hgis-monitor {
  height: 100%;
  /* background: #fa0; */
}
</style>
