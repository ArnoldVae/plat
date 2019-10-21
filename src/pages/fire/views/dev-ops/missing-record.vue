<template>
	<div class="installationAccount">
		<div class="echar" ref="envChart"></div>
	</div>
</template>

<script>
export default {
	name: 'index',
	data() {
		return {
			envChart: null,
			option: {
				title: {
					show: true,
					text: '2019年05月全省缺陷情况统计图',
					textStyle: {
						color: '#85c9ee',
						fontSize: 18,
						align: 'center'
					},
					top: 0,
					left: 700
				},
				legend: {
					data: ['发现数', '消除数'],
					right: 50,
					textStyle: {
						color: '#fff',
						fontSize: 18
					}
				},
				color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#08304a'
						}
					},
					textStyle: {
						color: '#85c9ee',
						fontSize: 16
					}
					// axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					// type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					// }
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: [
							'南京',
							'镇江',
							'常州',
							'无锡',
							'苏州',
							'徐州',
							'盐城',
							'淮安',
							'连云港',
							'宿迁',
							'扬州',
							'南通',
							'泰州'
						],
						axisTick: {
							alignWithLabel: true
						},
						axisLine: {
							lineStyle: {
								color: '#85c9ee',
								width: 0
							}
						},
						axisLabel: {
							color: '#85c9ee',
							show: true,
							textStyle: {
								fontSize: 16
							}
						},
						areaStyle: {
							color: '#fff'
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						min: 0,
						max: 7,
						axisLine: {
							lineStyle: {
								color: '#85c9ee',
								width: 0
							}
						},
						axisLabel: {
							color: '#85c9ee',
							show: true,
							textStyle: {
								fontSize: 16
							}
						}
					}
				],
				series: [
					{
						name: '发现数',
						type: 'bar',
						color: '#e7bc3b',
						data: [3, 2, 6, 4, 2, 3, 4, 5, 3, 4, 6, 3, 4]
					},
					{
						name: '消除数',
						type: 'bar',
						color: '#9bde54',
						data: [2, 1, 5, 4, 2, 3, 3, 5, 3, 4, 3, 2, 4]
					}
				],
				dataZoom: [
					// {
					// 	type: 'inside',
					// 	minValueSpan: 7,
					// 	minSpan: 20,
					// 	start: 50,
					// 	end: 100
					// },
					// {
					// 	showDetail: false,
					// 	height: 8,
					// 	bottom: 20,
					// 	borderColor: 'rgba(1,37,59,0.5)',
					// 	backgroundColor: 'rgba(1,37,59,0.5)',
					// 	dataBackgroundColor: 'rgba(47,126,181,0.9)',
					// 	fillerColor: 'rgba(1,138,225,0.5)',
					// 	handleColor: 'rgba(1,37,59,0.8)'
					// }
				]
			}
		}
	},
	mounted() {
		this.envChart = this.$_echarts.init(this.$refs['envChart'])
		this.init()
	},
	methods: {
		init() {
			this.envChart.setOption(this.option)
		}
	}
}
</script>

<style lang="stylus" scoped>
.installationAccount {
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 5px !important;
  overflow: hidden;

  .echar {
	margin-top: 30px;
    height: 96%;
    width: 100%;
  }
}
</style>
