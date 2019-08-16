<template>
	<div class="humiture">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import humitureTable from '@ac/views/common/view-table'
// import humiturePlate from '@ac/views/common/view-plate'
// import humitureIchnography from '@ac/views/common/view-ichnography'
import humitureCustomization from './customization.vue'
export default {
	name: 'humiture',
	components: {
		'humiture-table': humitureTable,
		// 'humiture-plate': humiturePlate,
		// 'humiture-ichnography': humitureIchnography
		// 'humiture-customization':humitureCustomization
		'humiture-customization': humitureCustomization
	},
	props: {},
	data() {
		return {
			current: 'humiture-customization'
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
.humiture {
	height: 100%;
	/* background: #fa0; */
}
</style>
