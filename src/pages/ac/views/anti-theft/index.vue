<template>
	<div class="anti-theft">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import antiTheftTable from '@ac/views/common/view-table'
import antiTheftCustomization from './customization.vue'
export default {
	name: 'anti-theft',
	components: {
		'anti-theft-table': antiTheftTable,
		'anti-theft-customization': antiTheftCustomization
	},
	props: {},
	data() {
		return {
			current: 'anti-theft-customization'
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
.anti-theft {
  height: 100%;
  /* background: #fa0; */
}
</style>
