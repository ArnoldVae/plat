<template>
  <div class="micro-weather-customization">
    <div class="center-bg">
      <span>微气象</span>
    </div>
    <span class="logo" :class="item.class" v-for="(item,index) in chartsList" :key="index">
      <img :src="item.src" alt />
      <p>{{item.vcName}}</p>
      <p>
        <i>{{item.fvalue}}</i>
        &nbsp;{{item.vcUnit}}
      </p>
    </span>
    <div v-for="ite in chartsList" :key="ite.id" class="chart" :class="ite.id" :id="ite.id"></div>
  </div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'micro-weather-customization',
	components: {},
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/'],
			topicStr: '',
			listData: [],
			devNameList: [],
			chartsList: [],
			devNameItem: ''
		}
	},
	computed: {
		getunitId: function() {
			return this.$store.getters.unitId
		},
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		}
	},
	filters: {},
	watch: {
		getunitId: {
			handler(newValue) {
				this.unitId = newValue
				// this.topicStr = this.topicArr[0] + this.unitId
			}
		}
	},
	created() {
		this.getDevList(false)
	},
	mounted() {
		this.topicStr = this.topicArr[0] + this.unitId
		// console.log(this.topicStr)
		//实时数据回调
		const _this = this
		// this.$_mqtt.on('message', function(topic, message, packet) {
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				//将json字符串转为数组
				let msgData = JSON.parse(message.toString())
				if (msgData.cmd == 1001) {
					_this.chartsList.forEach(element => {
						if (msgData.nodeid == element.nodeId) {
							element.fvalue = msgData.value
							//并且更新发生变化的设备的历史数据echarts
							let nowDate = new Date().getTime()
							let endTime = Math.ceil(nowDate / 1000)
							let startTime = endTime - 604800
							let param = {
								nodeId: msgData.nodeid,
								startTime: startTime,
								endTime: endTime
							}
							//调用历史数据接口
							_this.getChartsData(param, element.id, element.unit, element.nodeName)
						}
					})
				}
			}
		})
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// getDevList(DevID) {
		// 	this.$_api.getStaticData('./simulation-data/micro-weather.json').then(res => {
		getDevList(DevID) {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.microWeather.getDevList(params).then(res => {
				for (let i = 0; i < res.data.lists[1].devNodesList.length; i++) {
					if (res.data.lists[1].devNodesList[i].vcName != '风向') {
						this.chartsList.push(res.data.lists[1].devNodesList[i])
					}
				}
				this.getCharts()
			})
		},
		getCharts() {
			//为请求历史数据折线图准备时间戳
			let nowDate = new Date().getTime()
			let endTime = Math.ceil(nowDate / 1000)
			let startTime = endTime - 604800
			//循环列表数据 设置对应的值
			//循环的同时循环调用历史数据接口
			let classArr = ['logo1', 'logo2', 'logo3', 'logo4', 'logo5']
			let idArr = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5']
			let imgArr = [
				require('../../assets/img/micro-weather/fx.png'),
				require('../../assets/img/micro-weather/wd.png'),
				require('../../assets/img/micro-weather/sd.png'),
				require('../../assets/img/micro-weather/yl.png'),
				require('../../assets/img/micro-weather/mfzyl.png')
			]

			this.chartsList.forEach((item, index) => {
				item.class = classArr[index]
				item.id = idArr[index]
				item.src = imgArr[index]
				let param = {
					nodeId: item.nodeId,
					startTime: startTime,
					endTime: endTime
				}
				this.getChartsData(param, item.id, item.vcUnit, item.nodeName)
			})
		},

		getArr(data, key) {
			let arr = []
			data.map(item => {
				if (item.DevID == key) {
					arr.push(item)
				}
			})
			return arr
		},
		changeDev(devNameItem) {
			// console.log(devNameItem)
			this.getDevList(devNameItem)
		},
		//调用历史数据接口
		getChartsData(param, id, unit, name) {
			this.$_api.microWeather.getChart(param).then(res => {
				if (res.code == 200 && res.data) {
					let tempList = []
					let timeList = []
					res.data.forEach(item => {
						tempList.push(item.f_Value)
						timeList.push(this.strToymd(item.i_DataTime))
					})
					this.chartData = tempList
					this.timeData = timeList
					//调用历史数据接口 得到数据后开始初始化echarts
					this.setEcharts(id, tempList, timeList, unit, name)
				}
			})
		},
		setEcharts(id, data, time, unit, name) {
			// 基于准备好的dom，初始化echarts实例
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
					// right: '8%',
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
						areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
						lineStyle: { normal: { color: '#04a3ff' } }, //折线颜色
						data: data,
						connectNulls: true //这个是重点，将断点连接
					}
				]
			}

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
			myChart.resize()
		},
		strToymd(time) {
			// 遍历时间 处理格式
			let date = new Date(time * 1000)
			let Y = date.getFullYear() + '-'
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
			let D = date.getDate() + ' '
			let h = date.getHours() + ':'
			let m = date.getMinutes() + ':'
			let s = date.getSeconds()
			let b = M + D + h + m + s
			return b
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
.micro-weather-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding-left: 67px;
  padding-right: 55px;
  padding-top: 35px;
  position: relative;

  .center-bg {
    width: 400px;
    height: 240px;
    background: url('../../assets/img/sf6-monitor/sf6.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    span {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      position: absolute;
      top: 15%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .logo {
    width: 100px;
    height: 130px;
    position: absolute;

    img {
      width: 100px;
      height: 55px;
      display: block;
      margin-bottom: 20px;
    }

    p {
      width: 100px;
      font-size: 16px;
      color: #fff;
      text-align: center;

      i {
        font-style: normal;
      }
    }
  }

  .logo1 {
    top: 150px;
    left: 550px;
  }

  .logo2 {
    top: 150px;
    left: 880px;
  }

  .logo3 {
    top: 320px;
    left: 470px;
  }

  .logo4 {
    top: 310px;
    left: 1000px;
  }

  .logo5 {
    top: 540px;
    left: 740px;
  }

  .chart {
    position: absolute;
    width: 400px;
    height: 190px;
    background-color: rgba(9, 29, 64, 0.7);
  }

  .chart1 {
    top: 70px;
    left: 80px;
  }

  .chart2 {
    top: 70px;
    left: 1030px;
  }

  .chart3 {
    top: 450px;
    left: 80px;
  }

  .chart4 {
    top: 280px;
    left: 1130px;
  }

  .chart5 {
    top: 490px;
    left: 950px;
  }

  .decSelect {
    position: absolute;
    top: 10px;
    right: 30px;

    /deep/.ivu-select-selection {
      background-color: transparent;
      border: 0.04444rem solid #0091e8;
      color: #fff;
    }

    /deep/.ivu-select-dropdown {
      background-color: #091b3d;

      .ivu-select-item {
        color: #fff;
      }
    }

    /deep/.ivu-select-item-focus {
      background-color: #0a3565;
    }

    /deep/.ivu-select-item:hover {
      background-color: #0177c0;
      color: #fff;
    }
  }
}
</style>