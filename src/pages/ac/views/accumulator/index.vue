<template>
	<div class="accumulator">
		<!-- <transition name="v" mode="out-in"> -->
			<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import accumulatorTable from '@ac/views/common/view-table'
import accumulatorPlate from '@ac/views/common/view-plate'
export default {
	name: 'accumulator',
	components: {
		'accumulator-table': accumulatorTable,
		'accumulator-plate': accumulatorPlate
	},
	props: {},
	data() {
		return {
			current: 'accumulator-table'
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
.accumulator {
	height: 100%;
}
</style>
