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
		type: {
			type: String,
			default: 'line'
		},
		xData: {
			type: Array,
			default: () => {
				return []
			}
		},
		yData: {
			type: Array,
			default: () => {
				return []
			}
		},
		name: {
			type: String,
			default: ''
		},
		unit: {
			type: String,
			default: ''
		},
		zoom: {
			type: Boolean,
			default: false
		},
		pieData: {
			type: Array,
			default: () => {
				return []
			}
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
			var myChart = this.$_echarts.init(document.getElementById('my-charts'))
			switch (this.type) {
				case 'line':
					let option = {
						tooltip: {
							trigger: 'axis',
							formatter: `&nbsp;{b0}<br/> &nbsp;{a0}: {c0}${this.unit}`,
							axisPointer: {
								type: 'cross',
								label: {
									backgroundColor: '#6a7985'
								},
								triggerTooltip: {}
							}
						},

						xAxis: [
							{
								type: 'category',
								boundaryGap: false,
								data: this.xData,
								axisLine: {
									show: false
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
									show: false
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
								}
							}
						],
						series: [
							{
								name: this.name,
								type: 'line',
								symbol: 'none',
								areaStyle: { normal: { color: '#0f335f' } },
								lineStyle: { normal: { color: '#04a3ff' } },
								data: this.yData,
								connectNulls: true
							}
						]
					}
					if (this.zoom) {
						let dataZoom = [
							{
								type: 'inside',
								minValueSpan: 7,
								minSpan: 20,
								start: 40,
								end: 70
							},
							{
								showDetail: false,
								height: 10,
								bottom: 15,
								borderColor: 'rgba(1,37,59,0.5)',
								backgroundColor: 'rgba(1,37,59,0.5)',
								dataBackgroundColor: 'rgba(47,126,181,0.9)',
								fillerColor: 'rgba(1,138,225,0.5)',
								handleColor: 'rgba(1,37,59,0.8)'
							}
						]
						this.$set(option, 'dataZoom', dataZoom)
					}
					myChart.setOption(option)
					break
				case 'pie':
					// console.log('饼图')
					option = {
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								label: {
									backgroundColor: '#6a7985'
								},
								triggerTooltip: {}
							},
							// formatter: '{a} <br/>{b}: {c} ({d}%)'
							formatter: function(params) {
								// console.log(params)
								// let name = params[0].name
								// let data = params[0].data
								// let marker = params[0].marker
								// if (_this.axisLabelData.length == 0 && data != null) {
								// 	return `时间：${name} <br /> ${marker}节点变化值：${data}${_this.formatstr}`
								// }

								// for (let i = 0; i < _this.axisLabelData.length; i++) {
								// 	let theName = _this.axisLabelData[i].split(' ')
								// 	if (data == theName[0]) {
								// 		return `时间：${name}<br />${marker}节点变化值：${theName[1]}`
								// 	}
								// }
							}
						},
						legend: {
							orient: 'vertical',
							x: 'left',
							data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
						},
						series: [
							{
								name: '访问来源',
								type: 'pie',
								radius: ['50%', '70%'],
								avoidLabelOverlap: false,
								label: {
									normal: {
										show: false,
										position: 'center'
									},
									emphasis: {
										show: true,
										textStyle: {
											fontSize: '30',
											fontWeight: 'bold'
										}
									}
								},
								labelLine: {
									normal: {
										show: false
									}
								},
								data: [
									{ value: 335, name: '直接访问' },
									{ value: 310, name: '邮件营销' },
									{ value: 234, name: '联盟广告' },
									{ value: 135, name: '视频广告' },
									{ value: 1548, name: '搜索引擎' }
								]
							}
						]
					}
					myChart.setOption(option)
					break
				case 'bar':
					// console.log('折线图')
					break
			}

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