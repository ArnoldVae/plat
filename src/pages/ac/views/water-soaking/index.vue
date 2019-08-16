<template>
	<div class="water-soaking">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import waterSoakingTable from '@ac/views/common/view-table'
import waterSoakingIchnography from './customization'
export default {
	name: 'water-soaking',
	components: {
		'water-soaking-table': waterSoakingTable,
		'water-soaking-ichnography': waterSoakingIchnography
	},
	props: {},
	data() {
		return {
			current: 'water-soaking-ichnography'
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
.water-soaking {
	height: 100%;
	/* background: #fa0; */
}
</style>
