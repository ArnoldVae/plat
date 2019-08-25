<template>
	<div :class="pageType? 'protection-zone':'protection-zone-5'">
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
					<p class="menu-b">实时态势：</p>
					<div style="height: 314px" ref="envChart"></div>
				</div>
			</el-aside>
			<el-main>
				<div class="protection-zone-items">
					<div class="menu-bar">防护区列表</div>
					<div class="menu">防护区列表：</div>
					<div class="search-item">
						<el-row
							v-for="(item, index) in subMenuList"
							:key="index"
							style="width: 100%;"
							:class="activeIndex==index? 'activeClick':''"
						>
							<el-col :span="17">
								<span>
									<span class="color-green">●</span>
									{{ item.vcName }}
								</span>
							</el-col>
							<el-col :span="7" class="item-btn">
								<el-button
									style="position:relativ"
									size="mini"
									@click="getTemDetail(item,index)"
								>查看</el-button>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="protection-zone-items-bottom">
					<div class="menu-bar">{{ temData.name }}</div>
					<div class="menu">{{ temData.name }}：</div>
					<div class="search-item">
						<div style="padding-left:24px;">
							<el-row>
								<el-col :span="16">
									<span class="font-size-14">
										<img src="@/assets/img/common/temp.png" width="10px" /> 当前环境湿度：
									</span>
								</el-col>
								<el-col :span="8" class="item-btn">
									<span class="font-time color-light-green">{{ temData.mechine }}</span>
									<span class="color-light-green">%</span>
								</el-col>
							</el-row>

							<el-row>
								<el-col :span="16">
									<span class="font-size-14">
										<img src="@/assets/img/common/temp2.png" width="10px" /> 当前环境温度：
									</span>
								</el-col>
								<el-col :span="8" class="item-btn">
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
	props: {
		pageType: {
			type: Boolean,
			require: false
		}
	},
	data() {
		return {
			activeIndex: 0, //用来切换查看按钮的激活样式
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
			categorName: ['温度', '湿度'],
			unitId: this.$store.getters.unitId,
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
		init() {},
		//charts表渲染
		getEnvChart(obj) {
			// 如果湿度没有值则添加值
			if (obj.arr3.length > 0) {
				obj.arr3.forEach((item, index) => {
					obj.arr2[index] = obj.arr2[index] ? obj.arr2[index] : '70'
					obj.arr1[index] = obj.arr1[index] ? obj.arr1[index] : '24'
				})
			}
			let option = {
				title: {
					show: true,
					text: '',
					textStyle: {
						color: '#85c9ee',
						// fontFamily: "DS-DIGI",
						fontSize: 16,
						align: 'center'
					},
					top: 20,
					left: 20
				},
				legend: {
					data: this.categorName,
					top: 20,
					right: 30,
					textStyle: {
						color: '#fff',
						fontSize: 18
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
							fontSize: 16
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
							color: '#85c9ee',
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
						color: '#85c9ee',
						fontSize: 16
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
			this.getId = this.unitId
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
		async getTemDetail(item, index) {
			if (!index) {
				index = 0
			}
			//用来切换查看按钮的激活样式
			this.activeIndex = index

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
					// this.videoConfig.serviceInfo = result.data[0].vcParams1
					console.log(this.videoConfig)

					this.videoConfig1.deviceInfo = result.data[1].devId
					// this.videoConfig1.serviceInfo = result.data[1].vcParams1
				}
			}
		},
		/**
		 *  调取绘制折线图
		 */

		async getTemCharts(id, target) {
			let result = await this.$_api.statusCheck.getTemCharts({
				nodeId: id,
				startTime: Math.round(new Date().getTime() / 1000) - 86400,
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
	font-size: 16px;
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
          margin-top: 20px;
          margin-left: 24px;
          font-size: 16px;

          .el-row:hover {
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

<style lang="stylus">
.protection-zone-5 {
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
    display: none;
  }

  .el-container {
    display: flex;
    justify-content: space-between;
    // background: url('~@/assets/img/common/wai.png');
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    // -moz-background-size: 100% 100%;
    padding: 10px 48px 10px 48px;
    height: 800px;

    .el-aside {
      height: $prohight;
      overflow: hidden;

      .protection-zone-top {
        font-size: 36px;
        overflow: hidden;

        .protection-zone-top-main {
          display: flex;
          justify-content: space-around;

          .protection-zone-top-item {
            margin: 9px 5px;
            // float left
            height: 508px;
            background: none;
          }

          .left {
            width: 49%;
            height: 356px;
            margin: 0;
            // margin-left: -7px;
            margin-right: 0px;

            .ocxVideo {
              width: 100% !important;
            }
          }

          .right {
            width: 49%;
            height: 356px;
            margin: 0;

            .ocxVideo {
              width: 100% !important;
            }
          }
        }
      }

      .protection-zone-bottom {
        height: 401px;
        margin-top: 19px;
        width: 1145px;
        // background: #141A26;
        // background: url('../../../assets/img/protection-zon/actualTime.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        // -moz-background-size: 100% 100%;
		border: 1px solid #195891;

        .menu-b {
         color: #fff;
          width: 100%;
          height: 2.2228rem!important;
          padding-left: 24px;
          font-size: 18px;
          margin: 0;
          height: 56px;
          line-height: 56px;
          background: url('../../../assets/img/common/second.png') no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;

        }
      }
    }

    .el-main {
      padding: 0 0 0 10px;
      overflow: hidden;

      .protection-zone-items {
        width: $prowidth;
        height: 549px;
        // padding-top: 28px;
        border: 1px solid #195891;
        overflow: hidden;

        .menu {
          color: #fff;
          width: 100%;
          height: 2.2228rem!important;
          padding-left: 24px;
          font-size: 18px;
          margin: 0;
          height: 56px;
          line-height: 56px;
          background: url('../../../assets/img/common/second.png') no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          margin-bottom: 14px;
        }

        .el-row {
          color: white;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          padding-left: 24px;

          .tool-text {
            font-size: 16px;
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
          width: 100%;
          height: 498px;
          overflow: auto;
          font-size: 16px;

          .el-row:hover {
            // border: 2px #0E70AF solid;
            box-shadow: inset 0 0 20px #0E70AF;
            background-color: #063783;
          }

          .activeClick {
            box-shadow: inset 0 0 20px #0E70AF;
            background-color: #063783;

            .el-button {
              color: #ffd36a !important;
            }
          }

          .el-row {
            color: white;
            font-size: 16px;
            margin-bottom: 0;

            .el-col {
              font-size: 16px;

              .color-green {
                color: #19be6b;
              }
            }

            .item-btn {
              text-align: right;
              padding-right: 14%;

              .el-button {
                background: none;
                border: 0.04444rem solid #00aaff;
                color: #37a8ff;
                font-size: 16px;
				top: -1px!important;
              }
            }
          }
        }
      }

      .protection-zone-items-bottom {
        width: $prowidth;
        height: 218px;
        // border-radius: 5px;
        // background: url('../../../assets/img/protection-zon/oneProtection.png');
        // background-repeat: no-repeat;
        // background-size: 100% 100%;
        margin-top: 10px;
		border: 1px solid #195891;

		.menu {
          color: #fff;
          width: 100%;
          height: 2.2228rem!important;
          padding-left: 24px;
          font-size: 18px;
          margin: 0;
          height: 56px;
          line-height: 56px;
          background: url('../../../assets/img/common/second.png') no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
          margin-bottom: 14px;
        }

        .el-row {
          color: white;
          height: 40px;
          line-height: 40px;
          font-size: 16px;
          margin-left: 24px;
        }

        .search-item {
          margin-top: 14px;

          .el-row {
            padding-left: 20px;
            margin-bottom: 20px;
            font-size: 12px;
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
