<template>
	<div class="type-container">
		<component ref="foo" v-bind:is="current"></component>
	</div>
</template>
<script>
// 公共 Table
import commonTable from './common/view-table.vue'
import commonPlate from './common/view-plate.vue'
import viewHtWeb from './common/view-ht-web.vue'
import viewHtPage from './common/view-ht-page.vue'
// 门禁
import antiTheftCustomization from './anti-theft/customization.vue'
import arresterCustomization from './arrester-monitor/customization.vue'
import arresterHtCustomization from './arrester-monitor/htcustomization.vue'
import batteryCustomization from './battery-monitor/customization.vue'
import breakerHtCustomization from './breaker/htcustomization.vue'
import breakerGasMonitorCustomization from './breaker-gas-monitor/customization.vue'
import securityControlCustomization from './security-control/customization'
import cabinetCustomization from './cabinet/customization.vue'
import coreClampCustomization from './core-clamp/customization.vue'
import coreClampHtCustomization from './core-clamp/htcustomization.vue'
import electronicFenceControlCustomization from './security-control/customization'
import fireControlCustomization from './fire-control/customization.vue'
import hgisHtCustomization from './hgis/htcustomization.vue'
import hgisMonitorCustomization from './hgis-monitor/customization.vue'
import humitureCustomization from './humiture/customization.vue'
import intelligentLighting from './intelligent-lighting/customization.vue'
import mainOilCustomization from './main-oil/customization.vue'
import microWeatherCustomization from './micro-weather/customization.vue'
import ozoneCustomization from './ozone/customization.vue'
import sf6Customization from './sf6-monitor/customization.vue'
import terminalBoxCustomization from './terminal-box/customization.vue'
import videoCustomization from './video/customization.vue'
import vrvCustomization from './vrv/customization.vue'
import waterLevelCustomization from './water-level/customization.vue'
import waterSoakingIchnography from './water-soaking/customization'

export default {
	name: 'type-container',
	components: {
		// 组建注册名为编码，为了耦合
		'T1001': commonTable,
		'T1002': commonPlate,
		'T1003': viewHtWeb,
		'T1004': viewHtPage,

		'T2001': antiTheftCustomization,
		'T2002': arresterCustomization,
		'T2003': batteryCustomization,
		'T2004': breakerGasMonitorCustomization,
		'T2006': coreClampCustomization,
		'T2007': electronicFenceControlCustomization,
		'T2008': fireControlCustomization,
		'T2009': humitureCustomization,
		'T2010': mainOilCustomization,
		'T2011': microWeatherCustomization,
		'T2012': ozoneCustomization,
		'T2013': sf6Customization,
		'T2014': terminalBoxCustomization,
		'T2015': videoCustomization,
		'T2016': vrvCustomization,
		'T2017': waterLevelCustomization,
		// 临时
		'T3001': arresterHtCustomization,
		'T3002': breakerHtCustomization,
		'T3003': securityControlCustomization,
		'T3004': coreClampHtCustomization,
		'T3005': intelligentLighting,
		'T3006': waterSoakingIchnography,
		// ????
		'cabinet-customization': cabinetCustomization,
		// 'common-ht-web': viewHtWeb,
		// 'common-ht-page': viewHtPage,
		// 'hgis-htcustomization': hgisHtCustomization,
		// 'hgis-monitor-customization': hgisMonitorCustomization,
		// 'security-control-customization': securityControlCustomization,
		// 'infrared-correlation-customization': securityControlCustomization
	},
	directives: {},
	filters: {},
	mixins: {},
	props: {},
	data() {
		return {
			current: 'T1001'
		}
	},
	computed: {},
	watch: {
		// 更新当前组件，断开已销毁组件的事件池
		current(newVal, oldVal) {
			if (oldVal.indexOf('T1001') != -1) {
				this.$_stop('view-table')
				// console.log('销毁表格MQTT')
			} else {
				this.$_stop(this.$children[0].$options.name)
				// console.log('销毁MQTT:', this.$children[0].$options.name)
			}
		}
	},
	created() {},
	mounted() {},
	activited() {},
	beforeUpdate() {},
	update() {},
	beforeDestory() {},
	methods: {},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	// 切换路由断开当前所有组件的MQTT事件池
	beforeRouteLeave(to, from, next) {
		Object.keys(this.$options.components).map( item => {
			if (typeof this.$options.components[item] == 'object') {
				// console.log(this.$options.components[item]['name'])
				this.$_stop(this.$options.components[item]['name'])
			}
		})
		next()
	}
}
</script>
<style lang="stylus" scoped>
.type-container {
	height: 100%;
}
</style>