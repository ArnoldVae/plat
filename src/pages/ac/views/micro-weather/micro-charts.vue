<template>
	<div class="micro-charts">
		<div :id="chartId" class="charts"></div>
	</div>
</template>
<script>
export default {
	name: 'micro-charts',
	components: {},
	props: {
		data: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
			chartId: 'charts'
		}
	},
	computed: {},
	filters: {},
	watch: {
		'data.datas.chart': {
			handler(val) {
				this.setEcharts(
					this.chartId,
					this.data.datas.chart,
					this.data.datas.time,
					this.data.unit,
					this.data.name
				)
			}
		},
		chartId: {
			handler(val) {
				this.setEcharts(
					this.chartId,
					this.data.datas.chart,
					this.data.datas.time,
					this.data.unit,
					this.data.name
				)
			}
		}
	},
	created() {
		this.chartId = this.data.id
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		setEcharts(id, data, time, unit, name) {
			// 基于准备好的dom，初始化echarts实例
			try {
				var myChart = this.$_echarts.init(document.getElementById(id))
				// 指定图表的配置项和数据
				var option = {
					// title: {
					// 	text: name,
					// 	textStyle:{
					// 		color:'#fff',
					// 		fontWeight:400,
					// 		fontSize:14
					// 	},
					// 	left:10,
					// 	top:5
					// },
					tooltip: {
						trigger: 'axis',
						formatter: `&nbsp;{b0}<br/> &nbsp;{a0}: {c0}&nbsp;${unit}`,
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							},
							triggerTooltip: {}
						}
					},
					grid: {
						//设置表格大小位置的
						top: '10%',
						left: '5%',
						right: '6%',
						bottom: '8%',
						containLabel: true
					},

					xAxis: [
						{
							type: 'category',
							boundaryGap: false,
							data: time,
							axisLine: {
								show: true,
								lineStyle: {
									color: '#0091e8'
								}
							},
							axisLabel: {
								textStyle: {
									color: '#fff'
								}
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							axisLine: {
								show: true,
								lineStyle: {
									color: '#0091e8'
								}
							},
							splitLine: {
								lineStyle: {
									color: '#2d3650'
								}
							},
							axisLabel: {
								textStyle: {
									color: '#fff'
								}
								// formatter: `{value} ${unit}`
							}
						}
					],
					series: [
						{
							name: name,
							type: 'line',
							symbol: 'none',
							// areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
							areaStyle: {
								color: new this.$_echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: 'rgb(4,163,255,0.5)'
									},
									{
										offset: 1,
										color: 'rgb(15,51,95,1)'
									}
								])
							},
							lineStyle: { normal: { color: '#04a3ff' } }, //折线颜色
							data: data,
							connectNulls: true //这个是重点，将断点连接
						}
					],
					dataZoom: [
						{
							type: 'inside',
							minValueSpan: 7,
							minSpan: 20,
							// start: this.button4 == '1小时' ? 40 : 99,
							start: name == '风速' || name == '风向' ? 99 : 0,
							end: 100
						},
						{
							showDetail: true,
							height: 10,
							bottom: 0,
							borderColor: 'rgba(1,37,59,0.5)',
							backgroundColor: 'rgba(1,37,59,0.5)',
							dataBackgroundColor: 'rgba(47,126,181,0.9)',
							fillerColor: 'rgba(1,138,225,0.5)',
							handleColor: 'rgba(1,37,59,0.8)'
						}
					]
				}

				// 使用刚指定的配置项和数据显示图表。
				myChart.clear()
				myChart.setOption(option)
				myChart.resize()
			} catch (e) {
				// this.$ocxMessage.error(`${e}`)
			}
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
.micro-charts {
  width: 100%;
  height: 100%;

  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>