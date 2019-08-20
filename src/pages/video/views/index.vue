<template>
	<!-- // 和指定的name相同 为了和其他组件标识不重复 -->
	<div class="video-module">
		<!-- 主体区域 -->
		<div class="body">
			<videoSystem></videoSystem>	
		</div>
	</div>
</template>
<script>
// 组件优先引入放置在上面
// import collect from './collect.vue'
import videoSystem from'./video-system'
// 方法放置在下面
// import { findComponentDownward } from '@/assets/utils/assist'
export default {
	// 必须有name
	name: 'video-module',
	components: {videoSystem},
	props: {},
	data() {
		return {}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	beforeUpdate() {},
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
.video-module {
	// 这个样式在这里是必须的
	width: 1920px;
  	height: 100%;
  	background: url('~@/assets/img/navigation/background.png') no-repeat 0 -140px;
  	background-size: 100% 1080px;

  	.body {
  		width: 100%;
    	height: 940px;
		padding 10px;
  	}
}
</style>
