<template>
	<div class="infrared-correlation">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import securityControlTable from '@ac/views/common/view-table'
import securityControlCustomization from '../security-control/customization'
export default {
	name: 'infrared-correlation',
	components: {
		'infrared-correlation-table': securityControlTable,
		'infrared-correlation-customization': securityControlCustomization
	},
	props: {},
	data() {
		return {
			current: 'infrared-correlation-customization'
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
.infrared-correlation {
	height: 100%;
}
</style>
