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
.core-clamp {
	height: 100%;
}
</style>
