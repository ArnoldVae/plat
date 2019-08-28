<template>
	<div class="humiture-customization">
		<div class="humiture-top">
			<ul style="height:100%">
				<!-- <el-scrollbar style="height:100%"> -->
				<li
					v-for="(item, index) in devList"
					:key="index"
					@click="handleListClick(index, item)"
					:class="{ active: item.isActive }"
				>
					<div class="li-left">
						<img src="../../assets/img/humiture/tempLogo.png" alt />
						<div class="li-title">{{ item.vcName }}</div>
					</div>
					<div class="li-right">
						<!-- <div class="li-wd">
              温度:
              <i
                class="li-value"
                :class="{ 'height-wd': item.isHeitht, 'low-wd': item.isLow }"
              >{{item.f_Value}}</i>
              <b>{{item.vc_Unit}}</b>
            </div>
            <div class="li-sd">
              湿度:
              <i class="li-value">{{item.sdValue}}</i>
              <b>{{item.sdUnit}}</b>
						</div>-->
						<div class="li-wd" v-for="items in item.devNodesList" :key="items.nodeId">
							{{ items.title }}:
							<i
								class="li-value"
								:class="{ 'height-wd': items.isHeitht, 'low-wd': items.isLow }"
							>
								{{
								items.fvalue?items.fvalue:'暂无数据'
								}}
							</i>
							<b>{{ items.vcUnit }}</b>
						</div>
					</div>
				</li>
				<!-- </el-scrollbar> -->
			</ul>
		</div>
		<div class="humiture-bottom">
			<div class="chartTitle">{{ devName }}&nbsp;&nbsp;&nbsp;温度</div>
			<div id="chart"></div>
		</div>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'humiture-customization',
	components: {},
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			topicArr: ['qif/zf/app/'],
			topicStr: '',
			devName: '', //图标标题
			devList: [], //设备列表
			chartData: [],
			timeData: []
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
		}
	},
	created() {
		// this.getList()
		this.getDevList()
	},
	mounted() {
		this.setEcharts()
		this.topicStr = this.topicArr[0] + this.unitId
		console.log(this.topicStr)
		//实时数据回调
		const _this = this
		// this.$_mqtt.on('message', function(topic, message, packet) {
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				let msgData = JSON.parse(message.toString())
				console.log(msgData)
				if (msgData.cmd == 1001 && msgData.unitid == this.$store.getters.unitId) {
					_this.devList.forEach(element => {
						if (msgData.nodeid == element.wdNodeId) {
							element.devNodesList.forEach(item => {
								if (item.functionCode == 1014.0002) {
									item.fvalue = msgData.value
								}
							})

							if (element.isActive) {
								//如果当前推送的是选中的 重新获取历史数据
								let nowDate = new Date().getTime()
								let endTime = Math.ceil(nowDate / 1000)
								let startTime = endTime - 604800
								let params = {
									nodeId: element.wdNodeId,
									startTime: startTime,
									endTime: endTime
								}
								_this.getChartsData(params)
							}
						} else if (msgData.nodeid == element.sdNodeId) {
							element.devNodesList.forEach(item => {
								if (item.functionCode == 1014.0003) {
									item.fvalue = msgData.value
								}
							})
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
		//获取设备列表
		// getList() {
		// 	let params = {
		// 		devTypeId: this.activeDeviceTypeId,
		// 		isPage: 1,
		// 		// unitId: '192fe4cec3ec4d3fb81c0d05f82bde41'
		// 		unitId: this.unitId
		// 	}
		// 	this.$_api.humiture.getList(params).then(res => {
		// 		if (res.code == 200 && res.data.lists) {
		// 			let wdList = []
		// 			res.data.lists.map(item => {
		// 				if (item.nodeName == '温度') {
		// 					wdList.push(item)
		// 				}
		// 			})
		// 			res.data.lists.map(item => {
		// 				for (let i = 0; i < wdList.length; i++) {
		// 					if (wdList[i].DevID == item.DevID && item.nodeName == '湿度') {
		// 						wdList[i].sdValue = item.f_Value
		// 						wdList[i].sdUnit = item.vc_Unit
		// 						wdList[i].sdNodeId = item.NodeID
		// 					}
		// 				}
		// 			})
		// 			this.devList = wdList
		// 			if (this.devList && this.devList.length > 0) {
		// 				this.devList[0].isActive = true
		// 				this.devName = this.devList[0].devName
		// 				let nowDate = new Date().getTime()
		// 				let endTime = Math.ceil(nowDate / 1000)
		// 				let startTime = endTime - 604800
		// 				let params = {
		// 					nodeId: this.devList[0].NodeID,
		// 					startTime: startTime,
		// 					endTime: endTime
		// 				}
		// 				this.getChartsData(params)
		// 			}
		// 		}
		// 	})
		// },
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.humiture.getDevList(params).then(res => {
				if (res.code == 200 && res.data.lists) {
					res.data.lists.forEach(item => {
						item.devNodesList.forEach(element => {
							if (element.functionCode == 1014.0002 || element.functionCode == 1014.0003) {
								if (element.functionCode == 1014.0002) {
									element.title = '温度'
									item.wdNodeId = element.nodeId
								} else if (element.functionCode == 1014.0003) {
									element.title = '湿度'
									item.sdNodeId = element.nodeId
								}
							}
						})
					})
					this.devList = res.data.lists
					if (this.devList && this.devList.length > 0) {
						this.devList[0].isActive = true
						this.devName = this.devList[0].vcName
						let nowDate = new Date().getTime()
						let endTime = Math.ceil(nowDate / 1000)
						let startTime = endTime - 604800
						let params = {
							nodeId: this.devList[0].wdNodeId,
							startTime: startTime,
							endTime: endTime
						}
						this.getChartsData(params)
					}
				}
			})
		},
		//温湿度列表点击事件
		handleListClick(index, item) {
			this.devList.forEach(item => {
				item.isActive = false
			})
			this.devList[index].isActive = true
			this.devName = item.vcName
			let nowDate = new Date().getTime()
			let endTime = Math.ceil(nowDate / 1000)
			let startTime = endTime - 604800
			let params = {
				nodeId: item.wdNodeId,
				startTime: startTime,
				endTime: endTime
			}
			this.getChartsData(params)
		},
		getChartsData(params) {
			this.$_api.humiture.getNodeChart(params).then(res => {
				if (res.code == 200 && res.data) {
					let tempList = []
					let timeList = []
					res.data.forEach(item => {
						tempList.push(item.f_Value)
						timeList.push(this.strToymd(item.i_DataTime))
					})
					this.chartData = tempList
					this.timeData = timeList
					this.setEcharts()
				}
			})
		},
		setEcharts() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$_echarts.init(document.getElementById('chart'))
			myChart.clear()

			// 指定图表的配置项和数据
			var option = {
				tooltip: {
					trigger: 'axis',
					formatter: ' &nbsp;{b0}<br/> &nbsp;{a0}: {c0}℃',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						},
						triggerTooltip: {}
					}
				},

				// color: ['#04a3ff'], //legend的颜色
				// legend: {
				// 	top: 15,
				// 	data: ['温度',],
				// 	textStyle: {
				// 		color: '#fff'
				// 	}
				// },
				grid: {
					//设置表格大小位置的
					// top: '15%',
					left: '3%',
					right: '4%',
					bottom: '8%',
					containLabel: true
				},

				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: this.timeData,
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
						}
					}
				],
				series: [
					{
						name: '温度',
						type: 'line',
						symbol: 'none',
						areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
						lineStyle: { normal: { color: '#04a3ff' } }, //折线颜色
						data: this.chartData,
						connectNulls: true //这个是重点，将断点连接
					}
				]
			}

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option)
			myChart.resize()
		},
		strToymd(time) {
			let date = new Date(time * 1000)
			let Y = date.getFullYear() + '-'
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
			let D = date.getDate() + ' '
			let h = date.getHours() + ':'
			let m = date.getMinutes() + ':'
			let s = date.getSeconds()
			let b = Y + M + D + h + m + s
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
.humiture-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
//   padding-left: 67px;
//   padding-right: 55px;
//   padding-top: 35px;
padding 30px 58px 20px 58px;

  .humiture-top {
    width: 100%;
    height: 340px;
    // background: url('../../assets/img/humiture/bigBg1.png') no-repeat;
    // background-size: 100% 100%;
    padding: 10px 10px 0 45px;
    border: 1px solid #3a63a1;
    background-color: rgba(24, 90, 158, 0.2);

    ul {
      width: 100%;
      height: 100%;
      overflow: auto;

      li {
        width: 300px;
        height: 155px;
        float: left;
        margin-right: 45px;
        margin-bottom: 10px;
        background: url('../../assets/img/humiture/smallBg.png') no-repeat;
        background-size: 100% 100%;
        cursor: pointer;

        .li-left {
          width: 55%;
          height: 100%;
          background: url('../../assets/img/humiture/bottomBg.png') no-repeat;
          background-size: 100px 40px;
          background-position: 35px 50px;
          float: left;

          img {
            width: 30px;
            height: 55px;
            margin-top: 20px;
            margin-left: 73px;
          }

          .li-title {
            margin-top: 22px;
            margin-left: 10px;
            color: #6efafc;
            font-size: 12px;
            width: 100%;
            text-align: center;
          }
        }

        .li-right {
          width: 45%;
          height: 100%;
          float: left;
          color: #fff;
          font-size: 14px;

          .li-wd {
            margin-top: 35px;
			text-align center;
            // margin-bottom: 15px;
          }

          i {
            font-style: normal;
            // font-family: 'DS-DIGI';
            // font-size: 18px;
            color: #5dff00;
          }

          b {
            font-style: normal;
            color: #5dff00;
          }

          .height-wd {
            color: #fffc76;
          }

          .low-wd {
            color: #52ceff;
          }
        }
      }

      .active {
        background: url('../../assets/img/humiture/smallBgActive.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .humiture-bottom {
    width: 100%;
    height: 300px;
    position: relative;
    border: 1px solid #3a63a1;
    margin-top: 20px;
    background-color: rgba(24, 90, 158, 0.2);

    .chartTitle {
      width: 100%;
      height: 35px;
      line-height: 35px;
      background-color: #185a9e;
      position: absolute;
      top: 0;
      left: 0;
      padding-left: 50px;
      color: #fff;
      font-size: 16px;
    }

    #chart {
      width: 100%;
      height: 100%;
    }
  }
}

/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
