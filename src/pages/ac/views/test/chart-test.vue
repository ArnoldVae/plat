<template>
	<div class="chart-test">
		<div class="action">
			<Button @click="handleUpdateChart1">更新chart数据1</Button>
			<Button @click="handleUpdateChart2">更新chart数据2</Button>
			<Button @click="chartByline">折线图</Button>
			<Button @click="chartByBar">柱状图</Button>
		</div>
		<div class="container">
			<chart :option="option" class="chart"></chart>
		</div>
	</div>
</template>
<script>
export default {
	name: 'chart-test',
	components: {},
	props: {},
	data() {
		return {
			option: {
				title: {
					text: '标题'
				},
				tooltip: {},
				legend: {
					data:['描述']
				},
				xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis: {},
				series: [{
					name: '描述',
					type: 'bar',
					data: [3, 14, 26, 10, 17, 15]
				}]
			},
			optionR1: {
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				legend: {
					data:['销量']
				},
				xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]
			},
			optionR2: {
				title: {
					text: 'Chart 更新示例'
				},
				tooltip: {},
				legend: {
					data:['销量']
				},
				xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [15, 22, 33, 11, 17, 5]
				}]
			}
		}
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
	methods: {
		handleUpdateChart1() {
			this.option = this.optionR1
		},
		handleUpdateChart2() {
			this.option = this.optionR2
		},
		// 折线图
		chartByline() {

			var colors = ['#5793f3', '#d14a61', '#675bba'];

			this.option = {
			    color: colors,
			    title: {
			    	text: '多 X 轴示例'
			    },
			    tooltip: {
			        trigger: 'none',
			        axisPointer: {
			            type: 'cross'
			        }
			    },
			    legend: {
			        data:['2015 降水量', '2016 降水量']
			    },
			    grid: {
			        top: 70,
			        bottom: 50
			    },
			    xAxis: [
			        {
			            type: 'category',
			            axisTick: {
			                alignWithLabel: true
			            },
			            axisLine: {
			                onZero: false,
			                lineStyle: {
			                    color: colors[1]
			                }
			            },
			            axisPointer: {
			                label: {
			                    formatter: function (params) {
			                        return '降水量  ' + params.value
			                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
			                    }
			                }
			            },
			            data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
			        },
			        {
			            type: 'category',
			            axisTick: {
			                alignWithLabel: true
			            },
			            axisLine: {
			                onZero: false,
			                lineStyle: {
			                    color: colors[0]
			                }
			            },
			            axisPointer: {
			                label: {
			                    formatter: function (params) {
			                        return '降水量  ' + params.value
			                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
			                    }
			                }
			            },
			            data: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8", "2015-9", "2015-10", "2015-11", "2015-12"]
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value'
			        }
			    ],
			    series: [
			        {
			            name:'2015 降水量',
			            type:'line',
			            xAxisIndex: 1,
			            smooth: true,
			            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
			        },
			        {
			            name:'2016 降水量',
			            type:'line',
			            smooth: true,
			            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
			        }
			    ]
			};
		},
		// 柱状图
		chartByBar() {
			var xAxisData = [];
			var data1 = [];
			var data2 = [];
			for (var i = 0; i < 100; i++) {
			    xAxisData.push('类目' + i);
			    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
			    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
			}

			this.option = {
			    title: {
			        text: '柱状图动画延迟'
			    },
			    legend: {
			        data: ['bar', 'bar2'],
			        align: 'left'
			    },
			    toolbox: {
			        // y: 'bottom',
			        feature: {
			            magicType: {
			                type: ['stack', 'tiled']
			            },
			            dataView: {},
			            saveAsImage: {
			                pixelRatio: 2
			            }
			        }
			    },
			    tooltip: {},
			    xAxis: {
			        data: xAxisData,
			        silent: false,
			        splitLine: {
			            show: false
			        }
			    },
			    yAxis: {
			    },
			    series: [{
			        name: 'bar',
			        type: 'bar',
			        data: data1,
			        animationDelay: function (idx) {
			            return idx * 10;
			        }
			    }, {
			        name: 'bar2',
			        type: 'bar',
			        data: data2,
			        animationDelay: function (idx) {
			            return idx * 10 + 100;
			        }
			    }],
			    animationEasing: 'elasticOut',
			    animationDelayUpdate: function (idx) {
			        return idx * 5;
			    }
			};
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
.chart-test {
	.action {
		display: flex;
		justify-content: center;

		.ivu-btn {
			margin: 10px;
		}	
	}
	.container {
		display: flex;
		justify-content: center;
		.chart {
			width: 1600px;
			height: 800px;
		}
	}
}
</style>