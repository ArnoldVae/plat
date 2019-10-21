<template>
  <div class="analyst-main">
    <div class="black" v-for="(d, index) in chartsList" :key="index">
      <div class="title">{{ d.title }}</div>
      <div class="charts" :ref="d.ref"></div>
    </div>
  </div>
</template>
<script>
export default {
	name: 'analyst-main',
	components: {},
	props: {},
	data() {
		return {
			chartsList: [
				{
					title: '缺陷分类统计',
					ref: 'defects'
				},
				{
					title: '设备完好率',
					ref: 'equipment'
				},
				{
					title: '消防及时率',
					ref: 'fire'
				},
				{
					title: '维保及时率',
					ref: 'maintenance'
				},
				{
					title: '警情统计',
					ref: 'alert'
				},
				{
					title: '消防评估',
					ref: 'assessment'
				}
			],
			defectsName: ['报警', '灭火', '其他'],
			defectsDatas: [
				{
					value: 32,
					name: '报警'
				},
				{
					value: 11,
					name: '灭火'
				},
				{
					value: 112,
					name: '其他'
				}
			],
			equipmentName: ['灭火', '报警', '其他'],
			equipmentData: [75, 50, 88],
			firexValue: ['2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10'],
			fireyValue: [25, 60, 40, 70, 80, 90, 96],
			MaintenancexValue: ['2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10'],
			MaintenanceValue: [25, 60, 40, 70, 80, 90, 96]
		}
	},
	computed: {
		activeUnitId() {
			console.log('收到id被更改')
			return this.$store.getters.unitId
		}
	},
	filters: {},
	watch: {
		activeUnitId: {
			handler(val) {
				console.log('执行')
			}
		}
	},
	created() {},
	mounted() {
		this.setCharts()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//树节点过滤
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},
		setCharts() {
			this.getDefects()
			this.getEquipment()
			this.getFire()
			this.getMaintenance()
			this.getAlert()
			this.getAssessment()
		},
		/**
		 * 缺陷分类统计
		 */
		getDefects() {
			const charts = this.$_echarts.init(this.$refs.defects[0])
			const option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				color: ['#f13b2b', '#ff9900', '#0dd6e5'],
				legend: {
					data: this.defectsName,
					// data:["131","132","133"],
					orient: 'vertical',
					right: 10,
					textStyle: {
						color: '#fff'
					}
				},
				series: [
					{
						name: '缺陷分类统计',
						type: 'pie',
						// radius: ['50%', '60%'],
						center: ['45%', '50%'],
						data: this.defectsDatas,
						label: {
							normal: {
								formatter: '{b}\n ({c}个) ',
								fontSize: 18
							}
						}
					}
				]
			}
			charts.setOption(option)
		},

		/**
		 *    设备完好率
		 */
		getEquipment() {
			const charts = this.$_echarts.init(this.$refs.equipment[0])
			const option = {
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: this.equipmentName
				},
				// toolbox: {
				// 	show: false,
				// 	feature: {
				// 		mark: { show: true },
				// 		dataView: { show: true, readOnly: false },
				// 		magicType: { show: true, type: ['line', 'bar'] },
				// 		restore: { show: true },
				// 		saveAsImage: { show: true }
				// 	}
				// },
				calculable: true,
				xAxis: [
					{
						type: 'category',
						data: this.equipmentName,
						axisLabel: {
							textStyle: {
								color: '#fff'
							}
						},
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#37a8ff',
								width: '1'
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '单位:%',
						axisLine: {
							lineStyle: {
								color: '#fff',
								width: '0'
							}
						},
						axisTick: {
							//y轴刻度线
							show: false
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
						// name: this.equipmentName,
						type: 'bar',
						// barGap: '450%', //柱图间距
						barWidth: 20, //柱图宽度
						data: this.equipmentData,
						itemStyle: {
							normal: {
								color: function(params) {
									let colorList = ['#f13b2b', '#ff9900', '#0dd6e5']
									return colorList[params.dataIndex]
								},
								label: {
									show: true, //开启显示
									position: 'top', //在上方显示
									textStyle: {
										//数值样式
										color: '#fff',
										fontSize: 16
									}
								}
							}
						}
					}
				]
			}
			charts.setOption(option)
		},
		/**
		 * 消防及时率
		 */
		getFire() {
			const charts = this.$_echarts.init(this.$refs.fire[0])
			const option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} %'
				},
				legend: {
					data: ['消缺及时率'],
					textStyle: {
						color: '#fff'
					}
				},
				xAxis: [
					{
						type: 'category',
						data: this.firexValue,
						show: true,
						axisLabel: {
							textStyle: {
								color: '#fff'
							},
							rotate: 70
						},
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#37a8ff',
								width: '1'
							}
						}
					}
				],
				yAxis: {
					type: 'value',
					name: '单位:%',
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: '0'
						}
					},
					axisTick: {
						//y轴刻度线
						show: false
					},
					splitLine: {
						lineStyle: {
							color: '#37a8ff'
						}
					}
				},
				series: [
					{
						name: '消缺及时率',
						type: 'line',
						// areaStyle: {
						// 	color: '#0a3565'
						// },
						data: this.fireyValue,
						lineStyle: { normal: { color: '#0dd6e5' } } //折线颜色
					}
				]
			}
			charts.setOption(option)
		},
		/**
		 * 维保及时率
		 */
		getMaintenance() {
			const charts = this.$_echarts.init(this.$refs.maintenance[0])
			const option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} %'
				},
				legend: {
					data: ['维保及时率'],
					textStyle: {
						color: '#fff'
					}
				},
				xAxis: [
					{
						type: 'category',
						data: this.MaintenancexValue,
						show: true,
						axisLabel: {
							textStyle: {
								color: '#fff'
							},
							rotate: 70
						},
						axisLine: {
							lineStyle: {
								type: 'solid',
								color: '#37a8ff',
								width: '1'
							}
						}
					}
				],
				yAxis: {
					type: 'value',
					name: '单位:%',
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: '0'
						}
					},
					axisTick: {
						//y轴刻度线
						show: false
					},
					splitLine: {
						lineStyle: {
							color: '#37a8ff'
						}
					}
				},
				series: [
					{
						name: ['维保及时率'],
						type: 'line',
						data: this.MaintenanceValue,
						lineStyle: { normal: { color: '#0dd6e5' } } //折线颜色
					}
				]
			}
			charts.setOption(option)
		},
		/**
		 * 警情统计
		 *
		 */
		getAlert() {
			const charts = this.$_echarts.init(this.$refs.alert[0])
			const option = {
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				color: ['#00aaff', '#ff9900'],
				series: [
					{
						name: '警情统计',
						type: 'pie',
						radius: ['50%', '60%'],
						center: ['50%', '50%'],
						data: [
							{
								name: '预警',
								color: '#fff',
								value: 5
							},
							{
								name: '报警',
								value: 6
							}
						],
						label: {
							normal: {
								formatter: '{b}\n ({c}个) ',
								fontSize: 18
							}
						}
					}
				]
			}
			charts.setOption(option)
		},
		/*
		 *消防风险评估
		 */
		getAssessment() {
			const charts = this.$_echarts.init(this.$refs.assessment[0])
			const option = {
				tooltip: {
                    show:true,
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				color: ['red'],
				series: [
					{
						name: '消防风险评估',
						type: 'pie',
						radius: ['50%', '60%'],
						center: ['50%', '50%'],
						data: [
							{
								name: '风险',
								color: '#fff',
								value: 5
							}
                        ],
                        hoverAnimation:false,
                        // silent:true,
						label: {
							normal: {
								
								show: true,
								position: 'center',
                                formatter: '{c}',
                                textStyle: {
									fontSize: 40,
									color:"#fff"
								}
								
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '16',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						}
					}
				]
			}
			charts.setOption(option)
		},
		/**
		 * tab菜单切换
		 * tab为当前勾选节点
		 * 处理active是否高亮显示
		 * current处理菜单切换
		 */
		tabChange(tab) {
			this.tabList.forEach(item => {
				item.active = false
			})
			tab.active = true
			this.current = tab.code
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
.analyst-main {
  margin-top: 10px;
  height: 100%;
  overflow: hidden;
  padding: 28px 30px 10px 43px;

  .black {
    width: 32.27%;
    height: 370px;
    border: 1px solid #0a3565;
    float: left;
    margin: 0 16px 16px 0px;
    background-color: rgba(100, 100, 100, 0.1);
    border-radius: 2px;

    .title {
      color: white;
      font-size: 16px;
      margin: 16px 0 0 16px;
    }

    .charts {
      margin-top: 10px;
      height: 300px;
      width: 100%;
    }
  }
}
</style>
