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
						<span>{{ list1.dy }}</span>
					</div>
				</div>
				<div class="current status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/dl.png" alt />
						<p>电池组电流</p>
					</div>
					<div class="status-right">
						<span>{{ list1.dl }}</span>
					</div>
				</div>
				<div class="status status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/zt.png" alt />
						<p>电池组状态</p>
					</div>
					<div class="status-right">
						<span></span>
						{{ list1.zt }}
					</div>
				</div>
			</div>
			<div class="top-charts">
				<p class="title">第一组电池电压内阻</p>
				<div class="chartsBox">
					<charts :xData="list1.dyName" :seriesData="list1.dyArr" :options="list1.dyOptions"></charts>
				</div>
				<div class="chartsBox">
					<charts :xData="list1.dzName" :seriesData="list1.dzArr" :options="list1.dzOptions"></charts>
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
						<span>{{ list2.dy }}</span>
					</div>
				</div>
				<div class="current status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/dl.png" alt />
						<p>电池组电流</p>
					</div>
					<div class="status-right">
						<span>{{ list2.dl }}</span>
					</div>
				</div>
				<div class="status status-item">
					<div class="status-left">
						<img src="../../assets/img/battery-monitor/zt.png" alt />
						<p>电池组状态</p>
					</div>
					<div class="status-right">
						<span></span>
						{{ list2.zt }}
					</div>
				</div>
			</div>
			<div class="bottom-charts">
				<p class="title">第二组电池电压内阻</p>
				<div class="chartsBox">
					<charts :xData="list2.dyName" :seriesData="list2.dyArr" :options="list2.dyOptions"></charts>
				</div>
				<div class="chartsBox">
					<charts :xData="list2.dzName" :seriesData="list2.dzArr" :options="list2.dzOptions"></charts>
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
			list1: {
				dyArr: [],
				dzArr: [],
				dyName: [],
				dzName: [],
				dy: '',
				dl: '',
				zt: '',
				dyOptions: {
					id: 'charts1',
					title: '单体电压(V)',
					name: '电压',
					unit: 'V',
					color: '#21e1ee',
					min: 2.23,
					max: 2.28
				},
				dzOptions: {
					id: 'charts2',
					title: '单体内阻(Ω)',
					name: '电阻',
					unit: 'Ω',
					color: '#ddad3a',
					min: 0.3,
					max: 0.4
				}
			},
			list2: {
				dyArr: [],
				dzArr: [],
				dyName: [],
				dzName: [],
				dy: '',
				dl: '',
				zt: '',
				dyOptions: {
					id: 'charts3',
					title: '单体电压(V)',
					name: '电压',
					unit: 'V',
					color: '#21e1ee',
					min: 2.23,
					max: 2.28
				},
				dzOptions: {
					id: 'charts4',
					title: '单体内阻(Ω)',
					name: '电阻',
					unit: 'Ω',
					color: '#ddad3a',
					min: 0.3,
					max: 0.4
				}
			}
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
		this.getDevList()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//获取设备数据
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.batteryMonitor.getDevList(params).then(res => {
				if (res.code == 200 && res.data) {
					this.setListData1(res.data.lists[0])
					this.setListData2(res.data.lists[1])
				}
			})
		},
		//处理第一组数据
		setListData1(data) {
			data.devNodesList.forEach(item => {
				if (item.vcName.indexOf('单体电压') != -1) {
					this.list1.dyArr.push(item.fvalue)
					this.list1.dyName.push(item.vcName)
				} else if (item.vcUnit == 'Ω') {
					this.list1.dzArr.push(item.fvalue)
					this.list1.dzName.push(item.vcName)
				} else {
					console.log(item)
					if (item.vcName.indexOf('状态') != -1) {
						this.list1.zt = item.desc
					} else if (item.vcName.indexOf('电流') != -1) {
						this.list1.dl = item.desc
					} else if (item.vcName.indexOf('电压') != -1) {
						this.list1.dy = item.desc
					}
				}
			})
		},
		// 处理第二组数据
		setListData2(data) {
			data.devNodesList.forEach(item => {
				if (item.vcName.indexOf('单体电压') != -1) {
					this.list2.dyArr.push(item.fvalue)
					this.list2.dyName.push(item.vcName)
				} else if (item.vcUnit == 'Ω') {
					this.list2.dzArr.push(item.fvalue)
					this.list2.dzName.push(item.vcName)
				} else {
					if (item.vcName.indexOf('状态') != -1) {
						this.list2.zt = item.desc
					} else if (item.vcName.indexOf('电流') != -1) {
						this.list2.dl = item.desc
					} else if (item.vcName.indexOf('电压') != -1) {
						this.list2.dy = item.desc
					}
				}
			})
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
        font-size: 18px;
        // font-family: 'DS-DIGI';
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
