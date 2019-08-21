<template>
	<div class="wrap">
		<div class="directive-test" v-clickoutside="handleClose">
			<button @click="show = !show">点击显示下拉菜单</button>
			<div class="dropdown" v-show="show">
				<p>下拉框的内容，点击外面区域可以关闭</p>
			</div>
		</div>

		<div class="map-center" v-pin:current="true">
			draggable指令
		</div>
	</div>
</template>
<script>
// 全局引入
import Vue from 'vue'
import directives from '@/directives'
Vue.use(directives)

// 手动按需
/*import center from '@/directives/center'
Vue.directive('center', center)*/
export default {
	name: 'directive-test',
	components: {},
	props: {},
	data() {
		return {
			show: false
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
	methods: {
		handleClose() {
			this.show = false
		}
	},
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
.wrap {
	/* display: flex; */
	/* justify-content: space-around; */
	height: 8000px;
	position: relative;

	.directive-test {
		/* padding: 100px; */
		width: 125px;

		button {
			display: block;
			width: 100%;
			color: #fff;
			background-color: #39f;
			border: 0;
			padding: 6px;
			text-align: center;
			font-size: 12px;
			border-radius: 4px;
			cursor: pointer;
			outline: none;
			position: relative;

			&:active {
				top: 1px;
				left: 1px;
			}
		}
		.dropdown {
			width: 100%;
			height: 150px;
			margin: 5px 0;
			font-size: 12px;
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0 1px 6px rgba(0, 0, 0, .2)

			p {
				display: inline-block;
				padding: 6px;
			}
		}
	}

	.map-center {
		width: 300px;
		height: 100px;
		background: #0af;
		cursor: pointer;
		border-radius: 4px;
		box-shadow: 3px 3px 3px #ccc;
		text-align: center;
		line-height: 100px;
		color: #fff;
	}
}

</style>