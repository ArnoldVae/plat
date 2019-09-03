<template>
	<div class="security-control">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import securityControlTable from '@ac/views/common/view-table'
import securityControlCustomization from './customization.vue'
import { findComponentUpward } from '@/libs/assist'
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
	computed: {
		activeId() {
			return this.$route.query.unitId
		},
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		},
		activeTypeMapList() {
			return findComponentUpward(this, 'intelligent').deviceTypeMapList
		},
	},
	filters: {},
	watch: {
		// 更新当前组件，断开已销毁组件的事件池
		current(newVal, oldVal) {
			if (oldVal.indexOf('table') != -1) {
				this.$_stop('view-table')
			} else {
				this.$_stop(oldVal)
			}
		},
		activeId(newVal) {
			let result = this.getDisplayModeBytypeId(this.activeDeviceTypeId)
			let index = result.findIndex( item => item.name == 'table')
			setTimeout(() => {
				findComponentUpward(this, 'intelligent').handleChangeDisplayMode(result[index], index)
			}, 300);
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 根据typeId查询显示类型
		getDisplayModeBytypeId(id) {
			let modeList = []
			this.activeTypeMapList.forEach(item => {
				if (item.typeId == id) {
					modeList = item.mode
				}
			})
			return modeList
		},
	},
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
