<template>
	<div class="ozone">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import ozoneTable from '@ac/views/common/view-table'
import ozoneCustomization from './customization.vue'
export default {
	name: 'ozone',
	components: {
		'ozone-table': ozoneTable,
		'ozone-customization': ozoneCustomization
	},
	props: {},
	data() {
		return {
			current: 'ozone-customization'
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
.ozone {
	height: 100%;
}
</style>
