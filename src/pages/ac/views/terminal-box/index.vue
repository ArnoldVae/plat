<template>
	<div class="terminal-box">
		<component v-bind:is="current"></component>
	</div>
</template>
<script>
import terminalBoxTable from '@ac/views/common/view-table'
import terminalBoxCustomization from './customization.vue'
export default {
	name: 'terminal-box',
	components: {
		'terminal-box-table': terminalBoxTable,
		'terminal-box-customization': terminalBoxCustomization
	},
	props: {},
	data() {
		return {
			current: 'terminal-box-customization'
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
.terminal-box {
	height: 100%;
}
</style>
