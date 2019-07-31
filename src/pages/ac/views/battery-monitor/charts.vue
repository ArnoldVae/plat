<template>
  <div :id="id" class="charts"></div>
</template>
<script>
export default {
	name: '',
	components: {},
	/**
	 * 传值
	 * xData:X轴的数据
	 * seriesData：Y轴的数据
	 * options:配置项 对象格式
	 * options.id  echarts Dom的id 每次传的不能相同
	 * options.title:左上角的标题
	 * options.name:单位的名称
	 * options.unit:单位
	 * options.color: 柱状图的颜色
	 * options.min和max 最高和最低的线
	 */
	props: {
		xData: {
			type: Array,
			default: () => {
				return []
			}
		},
		seriesData: {
			type: Array,
			default: () => {
				return []
			}
		},
		options: {
			type: Object,
			default: () => {
				return {
					id: 'charts',
					title: '',
					name: '',
					unit: '',
					color: '',
					min: 0,
					max: 0
				}
			}
		}
	},
	data() {
		return {
			id: 'charts'
		}
	},
	computed: {},
	filters: {},
	watch: {
		seriesData:{
			handler(val){
				this.setCharts()
			}
		}
	},
	created() {
		this.id = this.options.id
	},
	mounted() {
		this.setCharts()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		setCharts() {
			let maxArr = []
			let minArr = []
			let unit = this.options.unit
			for (let i = 0; i < this.seriesData.length; i++) {
				minArr.push(this.options.max)
				maxArr.push(this.options.min)
			}
			var myChart = this.$_echarts.init(document.getElementById(this.id))
			var option = {
				title: {
					text: this.options.title,
					textStyle: {
						color: this.options.color,
						fontSize: 16
					}
				},
				color: [this.options.color],
				xAxis: {
					type: 'category',
					data: this.xData,
					axisLine: {
						lineStyle: {
							color: '#1a6b98',
							width: 2
						}
					},
					axisLabel: {
						color: '#85c9ee',
						show: true,
						textStyle: {
							fontSize: 16
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#1a6b98',
							width: 2
						}
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						color: '#85c9ee',
						show: true,
						textStyle: {
							fontSize: 16
						}
					},
					min: function(value) {
						return value.min - 2
						//这里设置Y轴展示的缩放级别
					}
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#08304a'
						}
					},
					textStyle: {
						color: '#85c9ee'
					},
					formatter: function(params) {
						return params[0].marker + '#' + params[0].name + '<br>' + params[0].value + unit
					}
				},
				series: [
					{
						name: this.options.name,
						type: 'bar',
						data: this.seriesData
					},
					{
						name: this.options.min,
						data: minArr,
						type: 'line',
						symbol: 'none',
						itemStyle: {
							color: '#ff0'
						},
						lineStyle: {
							type: 'dashed' //dotted
						},
						markLine: {
							data: [
								{
									type: 'min',
									lineStyle: {
										type: 'dotted'
									}
								}
							]
						}
					},
					{
						name: this.options.max,
						data: maxArr,
						type: 'line',
						symbol: 'none',
						itemStyle: {
							color: '#f00'
						},
						lineStyle: {
							type: 'dashed' //dotted
						},
						lineStyle: {
							type: 'dashed' //dotted
						},
						markLine: {
							data: [
								{
									type: 'max',
									lineStyle: {
										type: 'dotted'
									}
								}
							]
						}
					}
				]
			}
			myChart.setOption(option)
			myChart.resize()
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
<style lang='stylus' scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>