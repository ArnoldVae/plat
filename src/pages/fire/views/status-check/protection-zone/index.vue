<template>
	<div class="protection-zone">
		<el-container>
			<el-aside width="77%">
				<div class="protection-zone-top">
					<p class="menu-bar">防护区列表信息</p>
					<div class="protection-zone-top-main">
						<div class="protection-zone-top-item left">
							<ocx-video :videoConfig="videoConfig"></ocx-video>
						</div>
						<div class="protection-zone-top-item right">
							<ocx-video :videoConfig="videoConfig1"></ocx-video>
						</div>
					</div>
				</div>
				<div class="protection-zone-bottom">
					<p class="menu-bar">实时态势</p>
					<div style="height: 500PX" ref="envChart"></div>
				</div>
			</el-aside>
			<el-main>
				<div class="protection-zone-items">
					<el-row>
						<el-col :span="10" class="menu-bar">防护区列表</el-col>
					</el-row>
					<div class="search-item">
						<el-row
							v-for="(item, index) in subMenuList"
							:key="index"
							style="background: #1A2836;margin-bottom: 20PX;width: 95%;"
						>
							<el-col :span="12">
								<span>
									<span class="color-green">●</span>
									{{ item.vcName }}
								</span>
							</el-col>
							<el-col :span="12" class="item-btn">
								<el-button style="position:relative; top: -5PX" size="mini" @click="getTemDetail(item)"
									>查看</el-button
								>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="protection-zone-items-bottom">
					<el-row>
						<el-col :span="24" class="menu-bar">{{ temData.name }}</el-col>
					</el-row>
					<div class="search-item">
						<div style="padding-left:24px;">
							<el-row>
								<el-col :span="12">
									<span class="font-size-14">
										<img src="@/assets/img/common/temp.png" width="10px" /> 当前环境湿度：
									</span>
								</el-col>
								<el-col :span="12" class="item-btn">
									<span class="font-time color-light-green">{{ temData.mechine }}</span>
									<span class="color-light-green">%</span>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="12">
									<span class="font-size-14">
										<img src="@/assets/img/common/temp2.png" width="10px" /> 当前环境温度：
									</span>
								</el-col>
								<el-col :span="12" class="item-btn">
									<span class="font-time color-light-green">{{ temData.env }}</span>
									<span class="color-light-green">℃</span>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import ocxVideo from '@/components/native/video/OcxVideo'
import moment from 'moment'
export default {
	name: 'protection-zone',
	components: {
		'ocx-video': ocxVideo
	},
	props: {},
	data() {
		return {
			getList: {
				arr1: [],
				arr2: [],
				arr3: []
			},
			videoConfigList: [
				{
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '1|22.46.34.114:8001|admin:admin123|1',
					hideTool: true
				},
				{
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '1|22.46.34.114:8001|admin:admin123|1',
					hideTool: true
				}
			],
			videoConfig: {
				isAutoPlay: true,
				serviceInfo: '1$22.46.34.114$6800$admin$admin',
				deviceInfo: '1|22.46.34.114:8001|admin:admin123|1',
				hideTool: true
			},
			videoConfig1: {
				isAutoPlay: true,
				serviceInfo: '1$22.46.34.114$6800$admin$admin',
				deviceInfo: '1|22.46.34.114:8001|admin:admin123|1',
				hideTool: true
			},
			current: 'fireControl-customization',
			resultData: {
				dev: {},
				data: []
			},
			subMenuList: [],
			getId: '',
			temData: {
				name: '',
				mechine: '70',
				env: '32'
			},

			envChart: null,
			timeData: [
				'2019-07-25 07:08',
				'2019-07-25 07:16',
				'2019-07-25 07:23',
				'2019-07-25 07:30',
				'2019-07-25 07:45',
				'2019-07-25 07:50',
				'2019-07-25 07:55',
				'2019-07-25 08:08',
				'2019-07-25 08:16',
				'2019-07-25 08:20'
			],
			chartData: ['30', '15', '34', '33.5', '34', '10', '33.9', '40', '33.2', '32.3'],
			chartData2: ['8', '34', '33.2', '60', '33.5', '31.3', '31.4', '20', '34.6', '10'],
			categorName: ['温度', '湿度']
		}
	},
	computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	},
	filters: {},
	watch: {
		activeUnitId: {
			handler(val) {
				// this.init()
				const a = { id: val }
				this.getAreaMenu(a)
			}
		}
	},
	created() {},
	mounted() {
		this.getAreaMenu()
		this.envChart = this.$_echarts.init(this.$refs['envChart'])
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// setCharts(Obj) {
		// 	const charts = this.$_echarts.init(this.$refs.charts)
		// 	let option = {
		// 		tooltip: {
		// 			trigger: 'axis',
		// 			axisPointer: {
		// 				type: 'cross',
		// 				label: {
		// 					backgroundColor: '#red'
		// 				},
		// 				triggerTooltip: {}
		// 			}
		// 		},
		// 		legend: {
		// 			data: ['温度', '湿度'],
		// 			textStyle: {
		// 				color: '#fff'
		// 			}
		// 		},
		// 		grid: {
		// 			top: '10%',
		// 			left: '3%',
		// 			right: '4%',
		// 			bottom: '4%',
		// 			containLabel: true
		// 		},
		// 		xAxis: {
		// 			type: 'category',
		// 			boundaryGap: false,
		//
		// 			axisLine: {
		// 				show: false
		// 			},
		// 			axisLabel: {
		// 				textStyle: {
		// 					color: '#fff'
		// 				}
		// 			}
		// 		},
		// 		// yAxis: {
		// 		// 	type: 'value',
		// 		// 	axisLine: {
		// 		// 		show: false
		// 		// 	},
		// 		// 	splitLine: {
		// 		// 		lineStyle: {
		// 		// 			color: '#2d3650'
		// 		// 		}
		// 		// 	},
		// 		// 	axisLabel: {
		// 		// 		textStyle: {
		// 		// 			color: '#fff'
		// 		// 		}
		// 		// 	}
		// 		// },
		// 		series: [
		// 			{
		// 				// data: [32, 40, 60, 55, 75, 29, 78,89,97,50,60,29,58],
		// 				data: Obj.arr1,
		// 				type: 'line',
		// 				name: '温度',
		//
		// 				symbol: 'none',
		// 				areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
		// 				lineStyle: { normal: { color: '#04a3ff' } } //折线颜色
		// 			},
		// 			{
		// 				// data: [12, 50, 80, 35, 95, 9, 48,29,27,60,30,29,8],
		// 				// data: Obj.arr2,
		// 				// type: 'line',
		// 				// name: '湿度',
		// 				// symbol: 'none',
		// 				// areaStyle: { normal: { color: '#f37176' } }, //折线区域背景色
		// 				// lineStyle: { normal: { color: 'red' } } //折线颜色
		// 			}
		// 		]
		// 	}
		// 	charts.setOption(option)
		// },

		//charts表渲染
		getEnvChart(obj) {
			let option = {
				title: {
					show: true,
					text: '',
					textStyle: {
						color: '#85c9ee',
						// fontFamily: "DS-DIGI",
						fontSize: 33,
						align: 'center'
					},
					top: 20,
					left: 20
				},
				legend: {
					data: this.categorName,
					top: 20,
					right: 10,
					textStyle: {
						color: '#fff',
						fontSize: 33
					}
				},
				color: ['#47b2fe', '#5d6040'],
				grid: [
					{
						containLabel: true
					}
				],
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: obj.arr3,
					axisLine: {
						lineStyle: {
							color: '#85c9ee',
							width: 2
						}
					},
					axisLabel: {
						color: '#85c9ee',
						show: true,
						textStyle: {
							fontSize: 33
						}
					},
					areaStyle: {
						color: '#fff'
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: '#fff',
							width: 2
						}
					},
					splitLine: {
						show: false
					},
					axisLabel: {
						color: '#fff',
						show: true,
						textStyle: {
							fontSize: 28
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
						color: '#85c9ee',
						fontSize: 33
					}
				},
				series: [
					{
						name: this.categorName[0],
						data: obj.arr1,
						type: 'line',
						areaStyle: {
							color: 'none'
						},
						itemStyle: {
							color: '#85c9ee'
						},
						lineStyle: {
							color: 'red'
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
					},
					{
						name: this.categorName[1],
						data: obj.arr2,
						type: 'line',
						areaStyle: {
							color: 'none'
						},
						itemStyle: {
							color: '#01fef9'
						},
						lineStyle: {
							color: '#00ccff'
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
				],
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
			this.envChart.setOption(option)
		},
		//echarts数据
		getEchartData(id, target) {
			this.$_api.alarmAction
				.getEchartData({
					nodeId: id,
					startTime: Math.round(new Date().getTime() / 1000) - 604800,
					endTime: Math.round(new Date().getTime() / 1000)
				})
				.then(res => {
					const newArr = [],
						dateArr = []
					//转换时间格式成需要的
					res.data.forEach(i => {
						newArr.push(i.f_Value)
						dateArr.push(moment(i.i_DataTime * 1000).format('YYYY-MM-DD hh:mm:ss'))
					})
					if (target == 157) {
						this.idListObj.arr1 = newArr
						this.idListObj.arr3 = dateArr
					} else if (target == 158) {
						this.idListObj.arr2 = newArr
					}
					if (this.idListObj.arr1.length > 0 && this.idListObj.arr2.length > 0) {
						this.getEnvChart(this.idListObj)
					}
				})
		},

		initProView(item) {
			this.getAreaMenu(item)
		},
		/**
		 *
		 *查询防护区列表
		 *
		 */
		async getAreaMenu(item) {
			this.getId = '8177a787a28b4f86a103fac9a023db05'
			let result = await this.$_api.statusCheck.getAreaMenu({
				unitId: this.getId,
				subIdsStr: ''
			})
			if (result.success) {
				result.data.forEach((item, index) => {
					if (item.protectAreaId == '7da53a9e3ce24c2b8b6ed8edde8c0c83') {
						result.data.splice(index, 1)
					}
				})
				result.data.forEach((item, index) => {
					if (item.protectAreaId == 'd8b03d6100ba4ccd8fc07f4b8734e099') {
						result.data.splice(index, 1)
					}
				})
				this.subMenuList = result.data
				this.temData.name = this.subMenuList[0].vcName
				//获取视频链接地址
				this.getAreaVideo(this.subMenuList[0])
				// //    调用tem温度设备
				this.getTemDetail(this.subMenuList[0])
			}
		},
		/**
		 *获取温度湿度信息方法
		 *
		 */
		async getTemDetail(item) {
			this.getAreaVideo(item)
			this.temData.name = item.vcName
			let result = await this.$_api.statusCheck.getTemDetail({
				unitId: item.unitId,
				areaId: item.protectAreaId,
				devTypeId: '1014'
			})
			if (result.success) {
				if (result.data.length > 0) {
					console.log(result)
					result.data.forEach(item => {
						if (item.functioinId == 190) {
							this.temData.mechine = item.fValue
							this.getTemCharts(item.nodeId, item.functioinId)
						}
						if (item.functioinId == 191) {
							this.temData.env = item.fValue
							this.getTemCharts(item.nodeId, item.functioinId)
						}
					})
				} else {
					this.getList.arr1 = []
					this.getList.arr2 = []
					this.getList.arr3 = []
					this.getEnvChart(this.getList)
				}
			}
		},
		/**
		 *获取地区视频地址
		 *
		 */
		async getAreaVideo(item) {
			let result = await this.$_api.statusCheck.getAreaVideo({
				unitId: item.unitId,
				protectAreaId: item.protectAreaId
			})
			if (result.success) {
				console.log('视频出')
				console.log(result)
				if (result.data && result.data.length > 0) {
					this.videoConfig.deviceInfo = result.data[0].devId
					console.log(this.videoConfig)
					this.videoConfig1.deviceInfo = result.data[1].devId
				}
			}
		},
		/**
		 *  调取绘制折线图
		 */

		async getTemCharts(id, target) {
			let result = await this.$_api.statusCheck.getTemCharts({
				nodeId: id,
				startTime: Math.round(new Date().getTime() / 1000) - 604800,
				endTime: Math.round(new Date().getTime() / 1000)
			})
			if (result.success) {
				const newArr = [],
					dateArr = []
				result.data.forEach(i => {
					newArr.push(i.f_Value)
					dateArr.push(moment(i.i_DataTime * 1000).format('YYYY-MM-DD hh:mm:ss'))
				})
				if (target == 190) {
					this.getList.arr1 = newArr
				} else {
					this.getList.arr2 = newArr
				}
				this.getList.arr3 = dateArr
				if (this.getList.arr1.length > 0 && this.getList.arr2.length > 0) {
					this.getEnvChart(this.getList)
				}
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
<style>
.font-time {
	font-family: 'DS-DIGI';
	font-size: 20px;
}
.color-light-green {
	color: #32e611;
}
.font-size-14 {
	font-size: 36px;
}
</style>

<style lang="stylus">
// 使用主视图的高
$prohight = 894px;
$prowidth = 100%;

.protection-zone {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 670px;

  .menu-bar {
    background: url('../../../assets/img/main/lan.png');
    background-repeat: no-repeat;
    font-weight: bold;
    width: 100%;
    font-size: 44PX;
    height: 30px;
    line-height: 30px;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    text-align: center;
    color: black;
  }

  .el-container {
    display: flex;
    justify-content: space-between;

    .el-aside {
      height: $prohight;

      .protection-zone-top {
        height: 560px;
        background: #141A26;
        border: 1PX solid #D3DEE6;
        font-size: 36PX;

        .protection-zone-top-main {
          display: flex;
          justify-content: space-around;

          .protection-zone-top-item {
            margin: 9px 5px;
            // float left
            height: 508px;
          }

          .left {
            width: 49%;
            // float left
          }

          .right {
            position: relative;
            width: 49%;
            // float left
          }
        }
      }

      .protection-zone-bottom {
        height: 315px;
        margin-top: 19px;
        width: 100%;
        background: #141A26;
        border: 1PX solid #D3DEE6;
      }
    }

    .el-main {
      padding: 0 0 0 10px;

      .protection-zone-items {
        width: $prowidth;
        height: 559px;
        border-radius: 5px;
        background: #141A26;
        border: 1PX solid #D3DEE6;

        .el-row {
          color: white;
          height: 40px;
          line-height: 40px;
          font-size: 17px;

          .tool-text {
            font-size: 15px;
            text-align: right;

            .color-red {
              color: red;
            }

            .color-green {
              color: #32e611;
            }
          }
        }

        .search-item {
          height: 498px;
          overflow: auto;
          margin-top: 15px;
          margin-left: 33PX;
          font-size: 36PX;
			.el-row:hover{
				border: 2px #0E70AF solid;
				box-shadow: inset 0 0 20px #0E70AF;
			}

          .el-row {
            .el-col {
              font-size: 36PX;

              .color-green {
                color: #19be6b;
              }
            }

            .item-btn {
              text-align: right;
              padding-right: 10%;

              .el-button {
                background: none;
                border: 0.04444rem solid #00aaff;
                color: #37a8ff;
              }
            }
          }
        }

        margin-bottom: 20px;
      }

      .protection-zone-items-bottom {
        width: $prowidth;
        height: 629PX;
        border-radius: 5px;
        background: #141A26;
        border: 1PX solid #D3DEE6;

        .el-row {
          color: white;
          height: 40px;
          line-height: 40px;
          font-size: 17px;
        }

        .search-item {
          margin-top: 14px;
          .el-row {
            margin-left: 20px;
            margin-bottom: 20px;
          }

          img {
            width: 10px;
            margin-top: -5px;
          }
        }
      }
    }
  }
}
</style>
