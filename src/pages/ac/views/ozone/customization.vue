<template>
  <div class="ozone-customization">
    <!-- <div class="ozone-nodeName">
      <span v-for="(item, index) in data"
            :key="index">{{ item.nodeName }}</span>
    </div> -->
    <div class="ozone-top">
      <div class="ozone-tl">

        <!-- <el-scrollbar style="height: 100%"> -->
        <div class="ozone-topLeft"
             v-for="(item, index) in data"
             :key="index"
             @click="getDev(item)"
			 :class="{isCharts: item.NodeID == deviceData.NodeID}"
			 >
          <b></b>
          {{ item.devName }}臭氧浓度：
          <span class="ozoneNum">{{ item.f_Value != null ? item.f_Value : '--' }}&nbsp;{{item.vc_Unit}}</span>
        </div>
        <!-- </el-scrollbar>	 -->
      </div>
      <div class="ozone-topRight">
        <span @click="getData(1)"
              :class="{ isCharts: isTime == '1' }">当天</span>
        <span @click="getData(3)"
              :class="{ isCharts: isTime == '3' }">三天</span>
        <span @click="getData(7)"
              :class="{ isCharts: isTime == '7' }">一周</span>
      </div>
    </div>

    <div class="ozone-center"
         ref="ozone-charts"></div>
    <!-- <div class="ozone-bottom">
      <span @click="changeCharts(1)"
            :class="{isCharts:isCharts}">图形化</span>
      <span @click="changeCharts(0)"
            :class="{isCharts:!isCharts}">列表</span>
    </div> -->
  </div>
</template>
<script>
export default {
	name: 'ozone-customization',
	components: {},
	props: {},
	data() {
		return {
			axios: this.$_api.ozone,
			unitId: this.$store.getters.unitId,
			ozoneName: '当前臭氧设备',
			ozoneNum: '--',
			isCharts: true,
			data: [],
			deviceData: {},
			xData: [],
			yData: [],
			isTime: 3,
			devTypeId: 1046,
			topicArr: ['qif/zf/app/'],
			topicStr: '',
		}
	},
	computed: {},
	filters: {},
	watch: {
		xData(val) {
			if (val.length) {
				this.charts()
			}
		},
		deviceData(val){
			// console.log(val);
			this.getData(this.isTime)
		}
	},
	created() {
		this.getList()
	},
	mounted() {
		this.charts()

		this.topicStr = this.topicArr[0] + this.unitId
		// console.log(this.topicStr);
		
		//实时数据回调
		const _this = this
		// this.$_mqtt.on('message', function(topic, message, packet) {
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				let msgData = JSON.parse(message.toString())
				if (msgData.cmd == 1001) {
					_this.data.map(item => {
						if(item.NodeID == msgData.nodeid){
							item.f_Value = msgData.desc
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
		//计算时间
		calculateTime(time) {
			if (time == 1) {
				let date = new Date().getTime()
				let oldTime = new Date(new Date().toLocaleDateString()).getTime()
				return { startTime: parseInt(oldTime / 1000), endTime: parseInt(date / 1000) }
			} else {
				let date = new Date().getTime()
				let millisecond = time * 86400000
				let oldTime = date - millisecond
				return { startTime: parseInt(oldTime / 1000), endTime: parseInt(date / 1000) }
			}
		},

		//时间戳转换标准时间
		transformTime(time) {
			let date = new Date(time * 1000)
			date = date
				.toJSON()
				.substr(0, 19)
				.replace('T', ' ')
				.replace(/-/g, '.')
				.split('.')
			date.splice(0, 1)
			date = date.join('.').split(':')
			date.splice(2, 1)
			date = date.join(':')
			return date
		},

		//获取数据
		getData(val) {
			this.isTime = val
			let time = this.calculateTime(val)

			let params = {
				nodeId: this.deviceData.NodeID,
				...time
			}

			this.axios.getOzoneData(params).then(res => {
				if (res.code == 200 && res.data.length) {
					let x = [],
						y = []
					res.data.map(item => {
						x.push(this.transformTime(item.i_DataTime))
						y.push(item.f_Value != null ? item.f_Value : 0)
					})
					this.xData = x
					this.yData = y
				}
			})
		},

		//获取设备列表
		getList() {
			let params = {
				unitId: this.unitId,
				devTypeId: this.devTypeId
			}
			this.axios.getOzoneDevice(params).then(res => {
				if (res.code == 200) {
					if (res.data.lists.length) {
						this.deviceData = res.data.lists[0]
						// this.ozoneName = res.data.lists[0].nodeName
						this.data = res.data.lists
						this.getData(3)
					}
				}
			})
		},
		//表格，列表
		changeCharts(val) {
			if (val == 1) {
				this.isCharts = true
			} else {
				this.isCharts = false
			}
		},

		//点击设备
		getDev(dev) {
			this.deviceData = dev;
		},

		charts() {
			let dom = this.$refs['ozone-charts']
			let chart = this.$_echarts.init(dom)
			let option = {
				color: ['#11a7ff'],
				grid: {
					//设置表格大小位置的
					top: '10%',
					left: '3%',
					right: '4%',
					bottom: '4%',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: this.xData,
					axisLine: { show: false },
					axisLabel: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: { show: false },
					splitLine: {
						lineStyle: {
							color: '#2d3650',
							type: 'dashed'
						}
					},
					axisLabel: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				series: [
					{
						data: this.yData,
						type: 'line',
						areaStyle: { normal: { color: '#0f335f', opacity: 0.4 } }
					}
				]
			}

			chart.setOption(option)
		}
	}
}
</script>
<style lang="stylus" scoped>
.ozone-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding-left: 67px;
  padding-right: 55px;
  padding-top: 15px;

  .ozone-nodeName {
    margin: 0 0 10px 0;
    color: #fff;
    font-size: 14px;
  }

  .ozone-nodeName>span {
    margin-left: 10px;
    border: 1px solid #009cff;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }

  .ozone-top {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #fff;
    width: 100%;
    height: 30px;

    .ozone-tl {
      width: calc(100% - 230px);
      height: 100%;
      display: flex;
    }

    .ozone-topLeft {
      position: relative;
      padding-left: 26px;
      margin-left: 10px;
      cursor: pointer;
      float: left;

      >b {
        position: absolute;
        left: 0;
        top: 0;
        width: 22px;
        height: 100%;
        background: url('../../assets/img/device-type/臭氧监测-0.png') no-repeat;
        background-size: 80%;
      }
    }

    .ozone-topLeft>span {
      color: #4eff00;
      font-size: 18px;
      font-family: 'DS-DIGI';
    }

    .ozone-topRight {
    }

    .ozone-topRight>span {
      display: inline-block;
      margin-left: 11px;
      text-align: center;
      font-size: 12px;
      width: 61px;
      height: 28px;
      line-height: 28px;
      background: url('~@/assets/img/common/bg17.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }

  .ozone-center {
    width: 1412px;
    height: 553px;
  }

  .ozone-bottom {
    display: flex;
    justify-content: flex-end;

    >span {
      color: #8fd8fe;
      display: inline-block;
      margin-left: 11px;
      text-align: center;
      font-size: 12px;
      width: 61px;
      height: 28px;
      line-height: 28px;
      background: url('~@/assets/img/common/bg17.png') no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }

  .isCharts {
    color: #ffd76a;
  }

  /deep/.el-scrollbar__wrap {
    overflow-y: hidden;
    overflow-x: hidden;

    /deep/.el-scrollbar__view {
      display: flex;
    }
  }
}
</style>
