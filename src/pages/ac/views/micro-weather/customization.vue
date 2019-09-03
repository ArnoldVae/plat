<template>
	<div class="micro-weather-customization">
		<div class="center-bg">
			<span>微气象</span>
		</div>
		<Select
			class="decSelect"
			v-model="devNameItem"
			style="width:200px"
			@on-change="changeDev(devNameItem)"
		>
			<Option v-for="item in devNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
		</Select>
		<div class="btn-box">
			<RadioGroup v-model="button4" type="button" size="large">
				<Radio label="1小时"></Radio>
				<Radio label="3小时"></Radio>
				<Radio label="6小时"></Radio>
			</RadioGroup>
		</div>
		<span class="logo" :class="item.class" v-for="(item, index) in chartsList" :key="index">
			<img :src="item.src" alt />
			<p>{{ item.vcName }}</p>
			<p>
				<i>{{ item.fvalue }}</i>
				&nbsp;{{ item.vcUnit }}
			</p>
		</span>
		<div v-for="ite in chartData" :key="ite.id+100" class="chart" :class="ite.id">
			<charts :data="ite"></charts>
		</div>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import charts from './micro-charts'
export default {
	name: 'micro-weather-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/'],
			topicStr: '',
			listData: [],
			devNameList: [],
			chartsList: [],
			devNameItem: '',
			button4: '1小时',
			chartData: {}
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
				this.topicStr = this.topicArr[0] + this.unitId
			}
		},
		button4: {
			handler(val) {
				this.chartData = {}
				this.getCharts(true)
			}
		}
	},
	created() {
		this.getDevList(false)
	},
	mounted() {
		this.topicStr = this.topicArr[0] + this.unitId
		console.log(this.topicStr)
		//实时数据回调
		const _this = this
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				//将json字符串转为数组
				let msgData = JSON.parse(message.toString())
				if (msgData.cmd == 1001 && msgData.unitid == this.$store.getters.unitId) {
					_this.chartsList.forEach(element => {
						if (msgData.nodeid == element.nodeId) {
							element.fvalue = msgData.value
							for (let key in this.chartData) {
								if (this.chartData[key].nodeId == msgData.nodeid) {
									this.chartData[key].datas.chart.push(msgData.value)
									this.chartData[key].datas.time.push(this.strToymd(msgData.time))
								}
							}
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
		getDevList(DevID) {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.microWeather
				.getDevList(params)
				.then(res => {
					if (res.code == 200) {
						if (res.data.lists && res.data.lists.length > 0) {
							let devList = []
							for (let i = 0; i < res.data.lists[0].devNodesList.length; i++) {
								if (
									res.data.lists[0].devNodesList[i].functionCode != 1010.0009 &&
									res.data.lists[0].devNodesList[i].functionCode != 1010.0006
								) {
									devList.push(res.data.lists[0].devNodesList[i])
								}
							}
							if (!DevID) {
								res.data.lists.forEach(item => {
									item.label = item.vcName
									item.value = item.devId
								})
								this.devNameList = res.data.lists
								this.chartsList = devList
								this.devNameItem = this.devNameList.length > 0 ? this.devNameList[0].value : ''
								this.getCharts(true)
							} else {
								this.chartsList = []
								res.data.lists.forEach(item => {
									if (item.devId == DevID) {
										for (let i = 0; i < item.devNodesList.length; i++) {
											// if (item.devNodesList[i].nodeType != 2) {
											if (item.devNodesList[i].functionCode != 1010.0009) {
												this.chartsList.push(item.devNodesList[i])
											}
										}
										this.getCharts(true)
									}
								})
							}
						}
					}
				})
				.catch(error => {
					this.$Message.error(error.response.data.msg)
					this.chartsList = [
						{ vcName: '暂无数据' },
						{ vcName: '暂无数据' },
						{ vcName: '暂无数据' },
						{ vcName: '暂无数据' },
						{ vcName: '暂无数据' }
					]
					this.getCharts(false)
				})
		},
		getCharts(flag) {
			//为请求历史数据折线图准备时间戳
			let time =
				this.button4 == '1小时'
					? 3600
					: this.button4 == '3小时'
					? 10800
					: this.button4 == '6小时'
					? 21600
					: 3600
			let nowDate = new Date().getTime()
			let endTime = Math.ceil(nowDate / 1000)
			let startTime = endTime - time
			//循环列表数据 设置对应的值
			//循环的同时循环调用历史数据接口
			let classArr = ['logo1', 'logo2', 'logo3', 'logo4', 'logo5']
			let idArr = ['chart1', 'chart2', 'chart3', 'chart4', 'chart5']
			let imgArr = {
				fx: require('../../assets/img/micro-weather/fx.png'),
				wd: require('../../assets/img/micro-weather/wd.png'),
				sd: require('../../assets/img/micro-weather/sd.png'),
				yl: require('../../assets/img/micro-weather/yl.png'),
				mfzyl: require('../../assets/img/micro-weather/mfzyl.png')
			}

			this.chartsList.forEach((item, index) => {
				item.class = classArr[index]
				item.id = idArr[index]
				item.src =
					item.vcName.indexOf('温度') != -1
						? imgArr.wd
						: item.vcName.indexOf('湿度') != -1
						? imgArr.sd
						: item.vcName.indexOf('风速') != -1
						? imgArr.fx
						: item.vcName.indexOf('风向') != -1
						? imgArr.fx
						: item.vcName.indexOf('气压') != -1
						? imgArr.yl
						: imgArr.mfzyl
				let param = {
					nodeId: item.nodeId,
					startTime: startTime,
					endTime: endTime
				}
				if (flag) {
					this.getChartsData(param, item.id, item.vcUnit, item.vcName, index, item.nodeId)
				}
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
			this.chartData = {}
			this.getDevList(devNameItem)
		},
		//调用历史数据接口
		getChartsData(param, id, unit, name, index, nodeId) {
			this.$_api.microWeather.getChart(param).then(res => {
				if (res.code == 200 && res.data) {
					let tempList = []
					let timeList = []
					res.data.forEach(item => {
						tempList.push(item.f_Value)
						timeList.push(this.strToymd(item.i_DataTime))
					})
					this.$set(this.chartData, `data${index}`, { datas: { chart: [], time: [] } })
					this.chartData[`data${index}`].datas.chart = tempList
					this.chartData[`data${index}`].datas.time = timeList
					this.chartData[`data${index}`].id = id
					this.chartData[`data${index}`].nodeId = nodeId
					this.chartData[`data${index}`].unit = unit
					this.chartData[`data${index}`].name = name
				}
			})
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
<style lang="stylus" scoped>
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
    background-color: rgba(9, 29, 64, 0.4);
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
    left: 80px;

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

  .btn-box {
    width: 330px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: -50px;
  }

  /deep/.ivu-radio-wrapper, .ivu-radio-group-item, .ivu-radio-default {
    background: url('../../assets/img/micro-weather/btn.png') no-repeat;
    background-size: 100% 100%;
    width: 62px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-left: 10px;
    // border: 1px solid #0c79b9;
    border: none;
    color: #fff;

    &:before {
      width: 0px;
    }
  }

  /deep/.ivu-radio-wrapper-checked {
    background: url('../../assets/img/micro-weather/btn.png') no-repeat;
    background-size: 100% 100%;
    color: #ffd36a;

    &:before {
      width: 0px;
    }

    &:focus {
      // outline: 0;
      // box-shadow: 0 0 0 0 !important;
    }
  }

  /deep/.ivu-radio-group-button, .ivu-radio-wrapper-checked {
    box-shadow: 0 0 0 0 !important;
  }
}
</style>
