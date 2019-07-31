<template>
	<div class="vrv">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import vrvCustomization from './customization.vue'
import vrvTable from '../common/view-table.vue'
export default {
	name: 'vrv',
	components: {
		'vrv-customization': vrvCustomization,
		'vrv-table': vrvTable
	},
	props: {},
	data() {
		return {
			current: 'vrv-customization'
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
.vrv {
	height: 100%;
}
</style>
