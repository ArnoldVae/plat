<template>
	<div class="alarm-now">
		<div class="alarmContainer" v-if="alarmHide">
			<div class="container-left">
				<div class="alarm-now-header">
					<div class="alarm-now-header-items">
						<div
							class="alarm-now-header-item"
							v-for="(item, index) in labelList"
							:key="index"
							@click="showItemDetail(item)"
						>
							<ul>
								<li>
									<span class="icon">●</span>
									<span>{{ item.unitName }}</span>
								</li>
								<li>
									<span class="icon">●</span>
									<span>{{ item.araeName }}</span>
								</li>
								<li>
									<span class="icon">●</span>
									<span>{{ item.devName }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="alarm-now-video">
					<div class="alarm-now-video-item" v-for="(videoItem, index) in videoConfig" :key="index">
						<OcxVideo :videoConfig="videoItem"></OcxVideo>
					</div>
				</div>
				<div class="alarm-now-chart">
					<div class="chart-container" ref="envChart"></div>
				</div>
			</div>
			<div class="container-right">
				<div class="infoWarp-top">
					<div class="title">站内气象:</div>
					<div class="weather">
						<img :src="weatherImg" alt="" />
					</div>
					<div class="weatherInfo">
						<ul>
							<li v-for="(item, index) in weatherList" :key="index">
								<div class="icon">
									<img :src="item.icon" alt="" />
								</div>
								<div class="name">{{ item.name }}</div>
								<div class="value">{{ item.value }}</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="infoWarp-bottom">
					<div class="alarmInfo-box">
						<div class="title">报警信息:</div>
						<div class="info-wrap">
							<ul>
								<li v-for="(infoItem, index) in alarmListInfo" :key="index">
									<div class="name">{{ infoItem.name }}</div>
									<div :class="['value', index % 2 == 0 ? 'valueColor1' : 'valueColor2']">
										{{ infoItem.value }}
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="alarm-btn">
						<button class="btn confirm" @click="alarmShow()">确定</button>
						<button class="btn false">误报</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import OcxVideo from '@/components/native/video/OcxVideo'
import Htbuilder from '../../common/ht-blueprint'
export default {
	name: 'alarm-now',
	components: {
		OcxVideo,
		Htbuilder
	},
	props: {},
	data() {
		return {
			videoConfig: [
				{
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '',
					hideTool: true
				},
				{
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '',
					hideTool: true
				}
			],
			alarmDetail: {},
			labelList: [
				{
					title: '110kv同曦变电站'
				},
				{
					title: '1号主变防护区'
				},
				{
					title: '1#烟感探测器报警'
				}
			],
			//chart
			envChart: null,
			timeData: [1, 2, 3, 4, 5, 6],
			chartData: [22, 33, 44, 55, 66, 77],
			weatherImg: require('@/assets/img/common/sun.png'),
			weatherList: [
				{ icon: require('@fire/assets/img/alarm-now/wendu.png'), name: '温度:', value: '10℃' },
				{ icon: require('@fire/assets/img/alarm-now/fengsu.png'), name: '风速:', value: '4m/s' },
				{ icon: require('@fire/assets/img/alarm-now/shidu.png'), name: '湿度:', value: '65%' },
				{ icon: require('@fire/assets/img/alarm-now/fengxiang.png'), name: '风向:', value: '东南' }
			],
			alarmListInfo: [
				{ name: '防护区:', value: '1号主变防护区' },
				{ name: '断电信号:', value: '断开' },
				{ name: '设备名称:', value: '1#烟感探测器' },
				{ name: '报警节点:', value: '1#烟感探测器报警' },
				{ name: '报警时间:', value: '2019-7-22 10:00' }
			],
			alarmHide: true
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {
		this.envChart = this.$_echarts.init(this.$refs['envChart'])
		this.getAlarmList()
		this.getEnvChart()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		async getAlarmList() {
			let result = await this.$_api.alarmAction.getAlarmList({
				unitId: '192fe4cec3ec4d3fb81c0d05f82bde41 ',
				alarmId: '1'
			})
			if (result.success) {
				this.labelList = result.data
			}
		},
		async showItemDetail(item) {
			let result = await this.$_api.alarmAction.getAlarmData({
				unitId: '192fe4cec3ec4d3fb81c0d05f82bde41 ',
				alarmId: item.alarmId
			})
			if (result.success) {
				this.alarmDetail = result.data
			}
		},
		getEnvChart() {
			let option = {
				title: {
					show: true,
					text: '环境态势',
					textStyle: {
						color: '#85c9ee',
						// fontFamily: "DS-DIGI",
						fontSize: 20,
						align: 'center'
					},
					top: 20,
					left: 20
				},
				grid: [
					{
						// top: 20,
						height: 130,
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
				series: [
					{
						data: this.chartData,
						type: 'line',
						areaStyle: {
							color: '#47b2fe'
						},
						itemStyle: {
							color: '#47b2fe'
						},
						lineStyle: {
							color: '#47b2fe'
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
		alarmShow() {
			this.alarmHide = false
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
.color-light-green {
	color: #32e611;
}
.color-dark-yello {
	color: #ff9900;
}
.color-red {
	color: red !important;
}
.font-time {
	font-family: 'DS-DIGI';
}
.font-size-12 {
	font-size: 12px;
}
.font-size-18 {
	font-size: 18px;
}
</style>

<style lang="stylus" scoped>
.alarm-now {
  width: 100%;
  margin: 0;
  padding: 0;
    height 100%

  .alarmContainer {
    width: 100%;
    height: 884px;
    display: flex;

    .container-left {
      width: 72%;
      overflow: hidden;

      .alarm-now-header {
        position: relative;
        left: 3%;
        width: 94.5%;
        height: 85px;
        overflow-y: hidden;

        .alarm-now-header-items {
          cursor: pointer;

          .alarm-now-header-item {
            margin: 10px 10px 0px 0;
            padding: 10px 0;
            width: 25%;
            float: left;
            background: rgba(255, 0, 0, 0.2);

            ul li {
              color: white;

              .icon {
                margin: 0 20px;
                color: #00aaff;
              }
            }
          }
        }
      }

      .alarm-now-video {
        height: 490px;
        padding: 15px 0;
        margin: 0px 0 5px 36px;

        .alarm-now-video-item {
          width: 50%;
          height: 100%;
          float: left;
        }
      }

      .alarm-now-chart {
        height: 328px;
        margin-left: 36px;
        background: url('~@fire/assets/img/alarm-now/enviroment-chart.png') no-repeat;
        background-size: 100% 100%;

        .chart-container {
          width: 100%;
          height: 100%;
        }
      }
    }

    .container-right {
        width 25%;
        margin-left 10px;
        padding 8px 2px 5px 1px;
        box-sizing border-box;
        .infoWarp-top {
          width: 95%;
          height: 300px;
          background: url('~@fire/assets/img/alarm-now/air-wrap.png') no-repeat;
          background-size: 100% 100%;
          padding 10px 20px 0 20px;
          box-sizing border-box;
          .title{
              width 100%;
              height 20px;
              color:#fff;
              font-size:15px;

          }
          .weather{
              width  120px
              height 120px;
              margin 20px auto;
              img{
                  width 100%;
                  height 100%;
              }
          }
          .weatherInfo{
              height 90px;
              padding 10px;
              ul{
                  li{
                      width 120px;
                      height 30px;
                      display flex;
                      float left
                      font-size 15px;
                      margin-right 65px;
                      margin-bottom 10px;
                      .icon{
                          width 20px;
                          height 20px;
                          img{
                              width 100%
                              height 100%
                          }
                      }
                      .name{
                          color #fff;
                          margin-left 10px;
                          line-height 25px;

                      }
                      .value{
                          color #49ff01;
                          margin-left 10px;
                          line-height 25px;
                      }
                  }
                  li:nth-child(2n){
                      margin-right  0;
                  }
              }
          }
        }
        .infoWarp-bottom {
          width: 95%;
          height: 355px;
          .alarmInfo-box{
              width 100%;
              height 378px;
              background: url('~@fire/assets/img/alarm-now/info-wrap.png') no-repeat;
              background-size: 100% 100%;
              padding 20px;
              box-sizing border-box;
              .title{
                  width 100%;
                  height 20px;
                  color:#fff;
                  font-size:15px;
              }
              .info-wrap{
                  width 100%;
                  height 230px;
                  margin-top 10px;
                 margin-left 10px;
                  ul{
                       overflow hidden;
                      li{
                          color:#fff;
                          font-size 18px;
                          margin-bottom 20px;
                          width 100%;
                          height 30px;
                          .name,
                          .value{
                              width 150px;
                              height 30px;
                              float left
                              text-align left;
                          }
                          .valueColor1{
                                color #49ff01;
                          }
                          .valueColor2{
                              color #ffd36a;
                          }
                      }
                  }
              }
          }
        }
        .alarm-btn{
            width  100%;
            height 50px;
            text-align center;
            .btn{
                width 45%
                height 40px;
                color:#fff;
                font-size 20px;
                border none;
                cursor pointer;
            }
            .confirm{
                background: url('~@fire/assets/img/alarm-now/comfim.png') no-repeat;
                background-size: 100% 100%;
            }
            .false{
                background: url('~@fire/assets/img/alarm-now/fasle.png') no-repeat;
                background-size: 100% 100%;
                margin-left 15px;
            }
        }
    }

    .el-main {
      .alarm-now-items {
        width: 90%;
        height: 640px;
        border-radius: 5px;
        background: rgba(54, 105, 134, 0.1);

        .el-row {
          color: white;
          height: 40px;
          line-height: 40px;
          font-size: 17px;
          padding-left: 24px;

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
          .el-row {
            .el-col {
              font-size: 15px;

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
      }
    }
  }
}
</style>
