<template>
	<div class="fireControl">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import fireControlTable from '@ac/views/common/view-table'
import fireControlCustomization from './customization.vue'
export default {
	name: 'fireControl',
	components: {
		'fireControl-table': fireControlTable,
		'fireControl-customization': fireControlCustomization
	},
	props: {},
	data() {
		return {
			current: 'fireControl-customization'
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
.fireControl {
	height: 100%;
}
</style>
