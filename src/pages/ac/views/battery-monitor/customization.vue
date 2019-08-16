<template>
	<div class="battery-monitor-customization">
		<div class="battery-top">
			<div class="top-status">
				<p class="title">第一组电池组</p>
				<div class="voltage status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/dy.png" alt />
						<p>电池组电压</p>
					</div>
					<div class="status-right">
						<span>{{ topDy }}</span>
						V
					</div>
				</div>
				<div class="current status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/dl.png" alt />
						<p>电池组电流</p>
					</div>
					<div class="status-right">
						<span>{{ topDl }}</span>
						A
					</div>
				</div>
				<div class="status status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/zt.png" alt />
						<p>电池组状态</p>
					</div>
					<div class="status-right">
						<span></span>
						{{ topZt }}
					</div>
				</div>
			</div>
			<div class="top-charts">
				<p class="title">第一组电池电压内阻</p>
				<div class="chartsBox">
					<charts :xData="xData" :seriesData="seriesData1" :options="options1"></charts>
				</div>
				<div class="chartsBox">
					<charts :xData="xData" :seriesData="seriesData2" :options="options2"></charts>
				</div>
			</div>
		</div>
		<div class="battery-bottom">
			<div class="bottom-status">
				<p class="title">第二组电池组</p>
				<div class="voltage status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/dy.png" alt />
						<p>电池组电压</p>
					</div>
					<div class="status-right">
						<span>{{ bottomDy }}</span>
						V
					</div>
				</div>
				<div class="current status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/dl.png" alt />
						<p>电池组电流</p>
					</div>
					<div class="status-right">
						<span>{{ bottomDl }}</span>
						A
					</div>
				</div>
				<div class="status status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/zt.png" alt />
						<p>电池组状态</p>
					</div>
					<div class="status-right">
						<span></span>
						{{ bottomZt }}
					</div>
				</div>
			</div>
			<div class="bottom-charts">
				<p class="title">第二组电池电压内阻</p>
				<div class="chartsBox">
					<charts :xData="xData" :seriesData="seriesData3" :options="options3"></charts>
				</div>
				<div class="chartsBox">
					<charts :xData="xData" :seriesData="seriesData4" :options="options4"></charts>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import charts from './charts'
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'battery-monitor-customization',
	components: { charts },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			xData: [],
			seriesData1: [],
			seriesData2: [],
			seriesData3: [],
			seriesData4: [],
			options1: {
				id: 'charts1',
				title: '单体电压(V)',
				name: '电压',
				unit: 'V',
				color: '#21e1ee',
				min: 2.23,
				max: 2.28
			},
			options2: {
				id: 'charts2',
				title: '单体内阻(Ω)',
				name: '电阻',
				unit: 'Ω',
				color: '#ddad3a',
				min: 0.3,
				max: 0.4
			},
			options3: {
				id: 'charts3',
				title: '单体电压(V)',
				name: '电压',
				unit: 'V',
				color: '#21e1ee',
				min: 2.23,
				max: 2.28
			},
			options4: {
				id: 'charts4',
				title: '单体内阻(Ω)',
				name: '电阻',
				unit: 'Ω',
				color: '#ddad3a',
				min: 0.3,
				max: 0.4
			},
			topDy: 117,
			bottomDy: 115,
			topDl: 109.35,
			bottomDl: 103.51,
			topZt: '正常',
			bottomZt: '正常'
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
		this.getDevList()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				// unitId: '192fe4cec3ec4d3fb81c0d05f82bde41'
				unitId: this.unitId
			}
			this.$_api.batteryMonitor.getList(params).then(res => {
				console.log(res)
			})
		},
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.batteryMonitor.getDevList(params).then(res => {
				if (res.code == 200 && res.data) {
					console.log(res)
				}
				// this.seriesData1 = []
				// this.seriesData2 = []
				// this.seriesData3 = []
				// this.seriesData4 = []
				// this.xData = []
				// for (let i = 0; i < 52; i++) {
				// 	let num = 2 + this.randomNum(24, 26) / 100
				// 	this.seriesData1.push(num)
				// 	this.seriesData2.push(num)
				// 	this.seriesData3.push(num)
				// 	this.seriesData4.push(num)
				// 	this.xData.push('电池' + (i + 1))
				// }
			})
		},
		randomNum(minNum, maxNum) {
			switch (arguments.length) {
				case 1:
					return parseInt(Math.random() * minNum + 1, 10)
					break
				case 2:
					return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
					break
				default:
					return 0
					break
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
<style lang="stylus" scoped>
.battery-monitor-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 55px 25px 67px;

  .battery-top {
    width: 100%;
    height: 50%;

    .top-status {
      width: 25%;
      height: 100%;
      border: 1px solid #3299ff;
      float: left;
    }

    .top-charts {
      width: calc(75% - 10px);
      height: 100%;
      margin-left: 10px;
      border: 1px solid #3299ff;
      float: left;
    }
  }

  .battery-bottom {
    width: 100%;
    height: 50%;
    margin-top: 10px;

    .bottom-status {
      width: 25%;
      height: 100%;
      border: 1px solid #3299ff;
      float: left;
    }

    .bottom-charts {
      width: calc(75% - 10px);
      height: 100%;
      margin-left: 10px;
      border: 1px solid #3299ff;
      float: left;
    }
  }

  .title {
    height: 30px;
    color: #fff;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    // background: rgba(50,153,255,.7);
    background: #3299ff;
  }

  .status-item {
    height: 20%;
    margin-top: 25px;

    .status-left {
      width: 50%;
      height: 100%;
      float: left;

      img {
        height: 40px;
        margin-left: 50%;
        transform: translateX(-50%);
      }

      p {
        margin-top: 10px;
        color: #fff;
        font-size: 18px;
        text-align: center;
      }
    }

    .status-right {
      width: 100px;
      height: 50px;
      border-radius: 5px;
      float: left;
      margin-left: 20px;
      background-color: rgba(67, 71, 80, 0.7);
      line-height: 50px;
      font-size: 18px;
      text-align: center;
      color: #49ff19;

      span {
        font-size: 22px;
        font-family: 'DS-DIGI';
      }
    }
  }

  .chartsBox {
    width: 50%;
    height: 100%;
    float: left;
  }
}
</style>
