<template>
  <div class="cabinet">
    <!-- <transition name="v" mode="out-in"> -->
    <component v-bind:is="current"></component>
    <!-- </transition> -->
  </div>
</template>
<script>
import cabinetTable from '@ac/views/common/view-table'
import cabinetCustomization from './customization.vue'
export default {
	name: 'cabinet',
	components: {
		'cabinet-customization': cabinetCustomization,
		'cabinet-table': cabinetTable
	},
	props: {},
	data() {
		return {
			current: 'cabinet-customization'
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
.cabinet {
  height: 100%;
  /* background: #fa0; */
}
</style>
