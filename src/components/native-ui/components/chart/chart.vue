<template>
	<div class="chart" :id="chartId"></div>
</template>
<script>
export default {
	name: 'chart',
	components: {},
	props: {
		option: {
			type: Object
		}
	},
	data() {
		return {
			// 动态生成id, 保证多个可以挂载
			chartId: 'id-' + Math.random().toString(16).substr(2, 8),
			timerId: null
		}
	},
	computed: {
		// 利用缓存特性只初始化一次
		chartIns() {
			return this.$_echarts.init(document.getElementById(this.chartId))
		}
	},
	filters: {},
	watch: {
		option: {
			handler(newVal, oldVal) {
				// 重新加载引用
				this.renderChart()
			},
			deep: true
		}
	},
	created() {
		// console.log('chartId:', this.chartId)
	},
	mounted() {
		this.init()
	},
	activited() {},
	update() {},
	beforeDestory() {
		this.handleRemoveResizeEvent()
	},
	methods: {
		// 渲染 chart
		renderChart() {
			this.chartIns.clear()
			this.chartIns.setOption(this.option)
			this.chartIns.resize()
		},
		// 处理 resize 事件
		handleResizeChart() {
			clearTimeout(this.timerId)
			this.timerId = setTimeout(() => {
				this.chartIns.resize()
			}, 500)
		},
		// 绑定 resize 事件
		handleAddResizeEvent() {
			window.addEventListener('resize', this.handleResizeChart, false)
		},
		// 解绑 resize 事件
		handleRemoveResizeEvent() {
			window.removeEventListener('resize', this.handleResizeChart, false)
			this.timerId = null
		},
		// 初始化
		init() {
			this.renderChart()
			this.handleAddResizeEvent()
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
.chart {
	width: 100%;
	height: 100%;
}
</style>