<template>
	<div class="sf6-monitor">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import sf6Table from '@ac/views/common/view-table'
import sf6Customization from './customization.vue'
export default {
	name: 'sf6-monitor',
	components: {
		'sf6-monitor-table': sf6Table,
		'sf6-monitor-customization': sf6Customization
	},
	props: {},
	data() {
		return {
			current: 'sf6-monitor-customization'
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
.sf6-monitor {
	height: 100%;
	/* background: #fa0; */
}
</style>
