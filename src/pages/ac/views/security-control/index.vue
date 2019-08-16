<template>
	<div class="security-control">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import securityControlTable from '@ac/views/common/view-table'
import securityControlCustomization from './customization.vue'
export default {
	name: 'security-control',
	components: {
		'security-control-table': securityControlTable,
		'security-control-customization': securityControlCustomization
	},
	props: {},
	data() {
		return {
			current: 'security-control-customization'
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
.security-control {
	height: 100%;
}
</style>
