<template>
	<div class="security-control">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import securityControlTable from '@ac/views/common/view-table'
import securityControlCustomization from './customization.vue'
export default {
	name: 'security-control',
	components: {
		'security-control-table': securityControlTable,
		'security-control-customization': securityControlCustomization
	},
	props: {},
	data() {
		return {
			current: 'security-control-customization'
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
.security-control {
	height: 100%;
}
</style>
