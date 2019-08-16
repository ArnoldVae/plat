<template>
	<div class="arrester-monitor">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import arresterTable from '@ac/views/common/view-table'
import arresterCustomization from './customization.vue'
export default {
	name: 'arrester-monitor',
	components: {
		'arrester-monitor-customization': arresterCustomization,
		'arrester-monitor-table': arresterTable
	},
	props: {},
	data() {
		return {
			current: 'arrester-monitor-customization'
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
.arrester-monitor {
  height: 100%;
  /* background: #fa0; */
}
</style>
