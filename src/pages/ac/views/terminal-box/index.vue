<template>
	<div class="terminal-box">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import terminalBoxTable from '@ac/views/common/view-table'
import terminalBoxCustomization from './customization.vue'
export default {
	name: 'terminal-box',
	components: {
		'terminal-box-table': terminalBoxTable,
		'terminal-box-customization': terminalBoxCustomization
	},
	props: {},
	data() {
		return {
			current: 'terminal-box-customization'
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
.terminal-box {
	height: 100%;
}
</style>
