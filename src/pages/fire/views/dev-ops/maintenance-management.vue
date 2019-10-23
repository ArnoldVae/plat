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
			title: '2019年05月全省缺陷情况统计图',
			citys: [
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
			plan: '计划数',
			end: '完成数',
			planStatistics: [85, 76, 78, 74, 89, 82, 76, 80, 65, 65, 68, 79, 76],
			endStatistics: [81, 72, 76, 74, 87, 81, 73, 80, 61, 65, 63, 75, 74]
		}
	},
	mounted() {
		this.envChart = this.$_echarts.init(this.$refs['envChart'])
		this.init()
	},
	computed: {
		activeUnitId() {
			console.log('收到id被更改')
			return this.$store.getters.unitId
		}
	},
	watch: {
		activeUnitId: {
			handler(val) {
				console.log('执行')
			}
		}
	},
	methods: {
		//树节点过滤
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},

		init() {
			let option = {
				title: {
					show: true,
					text: this.title,
					textStyle: {
						color: '#fff',
						fontSize: 18,
						align: 'center'
					},
					top: 0,
					left: 700
				},
				legend: {
					data: [this.plan, this.end],
					right: 50,
					textStyle: {
						color: '#fff',
						fontSize: 18
					}
				},
				// color: ['#3398DB'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#08304a'
						}
					},
					textStyle: {
						color: '#fff',
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
						data: this.citys,
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
							color: '#fff',
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
						max: 90,
						interval: 10,
						axisLine: {
							lineStyle: {
								color: '#85c9ee',
								width: 0
							}
						},
						axisLabel: {
							color: '#fff',
							show: true,
							textStyle: {
								fontSize: 16
							}
						},
						splitLine: {
							lineStyle: {
								color: '#37a8ff'
							}
						}
					}
				],
				series: [
					{
						name: this.plan,
						type: 'bar',
						color: '#4472c4',
						data: this.planStatistics
					},
					{
						name: this.end,
						type: 'bar',
						color: '#ed7d31',
						data: this.endStatistics
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
			//初始化echarts
			this.envChart.setOption(option)
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
