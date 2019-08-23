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
import arresterHtCustomization from './htcustomization.vue'
export default {
	name: 'arrester-monitor',
	components: {
		'arrester-monitor-customization': arresterCustomization,
		'arrester-monitor-htcustomization': arresterHtCustomization,
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
	watch: {
		// 更新当前组件，断开已销毁组件的事件池
		current(newVal, oldVal) {
			if (oldVal.indexOf('table') != -1) {
				this.$_stop('view-table')
			} else {
				this.$_stop(oldVal)
			}
		}
	},
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
		Object.keys(this.$options.components).map( item => {
			if (typeof this.$options.components[item] == 'object') {
				this.$_stop(this.$options.components[item]['name'])
			}
		})
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
