<template>
	<div class="securityControl">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import securityControlTable from '@ac/views/common/view-table'
import securityControlCustomization from './customization.vue'
export default {
	name: 'securityControl',
	components: {
		'securityControl-table': securityControlTable,
		'securityControl-customization': securityControlCustomization
	},
	props: {},
	data() {
		return {
			current: 'securityControl-customization'
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
.securityControl {
	height: 100%;
}
</style>
