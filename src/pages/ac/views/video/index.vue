<template>
	<div class="video">
		<!-- <transition name="v" mode="out-in"> -->
		<component v-bind:is="current"></component>
		<!-- </transition> -->
	</div>
</template>
<script>
import videoTable from '@ac/views/common/view-table'
import videoCustomization from './customization.vue'
export default {
	name: 'video',
	components: {
		'video-customization': videoCustomization,
		'video-table': videoTable
	},
	props: {},
	data() {
		return {
			current: 'video-customization'
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
.video {
	height: 100%;
	/* background: #fa0; */
}
</style>
