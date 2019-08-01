<template>
  <div class="micro-weather">
    <!-- <transition name="v" mode="out-in"> -->
    <component v-bind:is="current"></component>
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
		'micro-weather-table': microWeatherTable,
	},
	props: {},
	data() {
		return {
			current: 'micro-weather-customization'
		}
	},
	computed: {},
	filters: {},
	watch: {},
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
