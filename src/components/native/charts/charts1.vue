<template>
  <div class="charts">
    <div id="my-charts"></div>
  </div>
</template>
<script>
export default {
	name: 'charts',
	components: {},
	props: {
		timeData: {
			type: Array,
			default: () => {
				return []
			}
		},
		seriesData: {
				type: Array,
			default: () => {
				return [{name:'',data:[],color:''}]
			}
		},
		unit: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		}
	},
	data() {
		return {}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {
		this.setEcharts()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		setEcharts() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$_echarts.init(document.getElementById('my-charts'))

			// 指定图表的配置项和数据
			let option = {
				title: {
					show: true,
					text: this.name,
					textStyle: {
						color: '#85c9ee',
						// fontFamily: "DS-DIGI",
						fontSize: 20,
						align: 'center'
					},
					top: 20,
					left: 20
				},
				// legend: {
				// 	data: this.categorName,
				// 	// data:["131","132"],
				// 	// orient: 'vertical',
				// 	top: 20,
				// 	right: 10,
				// 	textStyle: {
				// 		color: '#fff'
				// 	}
				// },
				// color: ['#47b2fe', '#5d6040'],
				grid: [
					{
						// top: 20,
						// height: 250,
						containLabel: true
					}
				],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.timeData,
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
					}
				},
				// series: [
				// 	{
				// 		name: name,
				// 		data: yData,
				// 		type: 'line',
				// 		areaStyle: {
				// 			color: '#47b2fe'
				// 		},
				// 		itemStyle: {
				// 			color: '#47b2fe'
				// 		},
				// 		lineStyle: {
				// 			color: '#47b2fe'
				// 		},
				// 		smooth: true,
				// 		markLine: {
				// 			silent: true,
				// 			lineStyle: {
				// 				normal: {
				// 					color: '#01fef9' // 这儿设置安全基线颜色
				// 				}
				// 			},
				// 			data: [{ name: '', yAxis: 150, type: 'min' }]
				// 		}
				// 	},
				// 	{
				// 		name: name,
				// 		data: yData,
				// 		type: 'line',
				// 		areaStyle: {
				// 			color: '#5d6040'
				// 		},
				// 		itemStyle: {
				// 			color: '#5d6040'
				// 		},
				// 		lineStyle: {
				// 			color: '#5d6040'
				// 		},
				// 		smooth: true,
				// 		markLine: {
				// 			silent: true,
				// 			lineStyle: {
				// 				normal: {
				// 					color: '#01fef9' // 这儿设置安全基线颜色
				// 				}
				// 			},
				// 			data: [{ name: '', yAxis: 150, type: 'min' }]
				// 		}
				// 	}
				// ],
				dataZoom: [
					{
						type: 'inside',
						minValueSpan: 7,
						minSpan: 20,
						start: 50,
						end: 100
					},
					{
						showDetail: false,
						height: 8,
						bottom: 20,
						borderColor: 'rgba(1,37,59,0.5)',
						backgroundColor: 'rgba(1,37,59,0.5)',
						dataBackgroundColor: 'rgba(47,126,181,0.9)',
						fillerColor: 'rgba(1,138,225,0.5)',
						handleColor: 'rgba(1,37,59,0.8)'
					}
				]
			}
			let series = []
			this.seriesData.forEach(item => {
				let obj = {
					name: item.name,
					data: item.data,
					type: 'line',
					areaStyle: {
						color: item.color
					},
					itemStyle: {
						color: item.color
					},
					lineStyle: {
						color: item.color
					},
					smooth: true,
					markLine: {
						silent: true,
						lineStyle: {
							normal: {
								color: '#01fef9' // 这儿设置安全基线颜色
							}
						},
						data: [{ name: '', yAxis: 150, type: 'min' }]
					}
				}
				series.push(obj)
			})
			this.$set(option, 'series', series)
			// 使用刚指定的配置项和数据显示图表。
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

  #my-charts {
    width: 100%;
    height: 100%;
  }
}
</style>