<template>
  <div class="intelligent-lighting">
    <!-- <transition name="v" mode="out-in"> -->
    <component v-bind:is="current"></component>
    <!-- </transition> -->
  </div>
</template>
<script>
import intelligentLightingTable from '@ac/views/common/view-table'
import intelligentLighting from './customization.vue'
export default {
	name: 'intelligent-lighting',
	components: {
		'intelligent-lighting-table': intelligentLightingTable,
		'intelligent-lighting-customization': intelligentLighting
	},
	props: {},
	data() {
		return {
			current: 'intelligent-lighting-customization'
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
.intelligent-lighting {
  height: 100%;
  /* background: #fa0; */
}
</style>
