<template>
	<div class="micro-weather">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- <micro-weather-customization v-if="current == 'micro-weather-customization'"></micro-weather-customization> -->
		<!-- <micro-weather-table v-if="current == 'micro-weather-table'"></micro-weather-table> -->
		<!-- </transition> -->
	</div>
</template>
<script>
import microWeatherTable from '@ac/views/common/view-table'
import microWeatherCustomization from './customization.vue'
export default {
	name: 'micro-weather',
	components: {
		'micro-weather-customization': microWeatherCustomization,
		'micro-weather-table': microWeatherTable
	},
	props: {},
	data() {
		return {
			current: 'micro-weather-customization'
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
.micro-weather {
  height: 100%;
  /* background: #fa0; */
}
</style>
