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
.water-level {
	height: 100%;
}
</style>
