<template>
	<div class="overview">
		<div class="content">
			<div class="body">
				<div class="map" @click="handleToHome">
					<div class="border-lt"></div>
					<div class="border-rb"></div>
					<div class="mapBox">
						<mapComponent @clickRcuImg="clickRcuImg" :moduleNames="'intelligentMap'"></mapComponent>
					</div>
				</div>
				<div class="info">
					<div class="today-st">
						<div class="title">今日概况</div>
						<div class="content">
							<div class="early-warning">
								<div class="icon"></div>
								<div class="name">预警</div>
								<div class="number">0</div>
							</div>
							<div class="line"></div>
							<div class="alarm">
								<div class="icon"></div>
								<div class="name">报警</div>
								<div class="number">{{ alarm }}</div>
							</div>
							<div class="line"></div>
							<div class="fault">
								<div class="icon"></div>
								<div class="name">故障</div>
								<div class="number">0</div>
							</div>
							<div class="line"></div>
							<div class="online">
								<div class="icon"></div>
								<div class="name">在线</div>
								<div class="number">{{ online }}</div>
							</div>
						</div>
					</div>

					<div class="access">
						<div class="header">
							<div class="left">接入情况</div>
							<div class="right">
								<div class="name">站所总</div>
								<div class="number">{{ rcuAmount }}</div>
							</div>
						</div>
						<div class="content-wrap">
							<template v-for="item in accessList">
								<div class="content-item">
									<div class="rcu">
										<div
											class="icon"
											:style="{
												background: `url( ${require(`@/assets/img/common/rcu-500kV.png`)} )`
											}"
										></div>
										<div class="name">{{ item.name }}</div>
									</div>

									<div class="amount">
										<div class="number">{{ item.count }}</div>
										<div class="name">总</div>
									</div>
									<div class="cover">
										<div class="icon">{{ item.realCount }}</div>
										<div class="name">已覆盖</div>
									</div>
									<div class="coverage-rate">
										<div class="top">
											<div class="icon">{{ item.coverage }}</div>
											<!-- <div class="text">%</div> -->
										</div>
										<div class="name">覆盖率</div>
									</div>
								</div>
							</template>
						</div>
					</div>

					<div class="alarming-trend">
						<div class="title">一周报警态势</div>
						<div class="chart" ref="chart"></div>
					</div>
				</div>
			</div>
		</div>
		<statistics></statistics>
	</div>
</template>
<script>
import { center } from '@/directives/directive.js'
import mapComponent from '@/components/native/acMap/acMap'
export default {
	name: 'overview',
	components: {
		mapComponent
	},
	props: {},
	data() {
		return {
			option: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						},
						triggerTooltip: {}
					}
				},
				grid: {
					top: '10%',
					left: '3%',
					right: '4%',
					bottom: '4%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: ['2019.7.11', '2019.7.12', '2019.7.13', '2019.7.14', '2019.7.15', '2019.7.16', '2019.7.17'],
					axisLine: {
						show: false
					},
					axisLabel: {
						textStyle: {
							color: '#fff'
						}
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						show: false
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
				},
				series: [
					{
						data: [1, 3, 4, 3, 3, 1, 7],
						type: 'line',
						areaStyle: {},
						symbol: 'none',
						areaStyle: { normal: { color: '#0f335f' } }, //折线区域背景色
						lineStyle: { normal: { color: '#04a3ff' } } //折线颜色
					}
				]
			},
			overviewInfo: {},
			alarm: 0,
			online: 0,
			accessList: [],
			rcuAmount: 0
			// javainterface: {
			// 	allStation: {
			// 		subModuleName: 'intelligentMap',
			// 		interfaceName: 'getAllStation',
			// 		param: { orgId: '' }
			// 	}
			// }
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.init()
	},
	mounted() {
		this.$_echarts.init(this.$refs['chart']).setOption(this.option)
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 临时
		handleToHome() {
			// this.$router.push({ name: 'intelligent' })
		},
		//  点击地图图标操作
		clickRcuImg(val) {
			this.$store.commit('UPDATE_UNITID', val.id)
			this.$router.push({ name: 'intelligent' })
		},
		// 获取首页综合数据
		async getOverviewInfo() {
			let result = await this.$_api.frame.getOverviewInfo()
			// console.log('getOverviewInfo', result)
			if (result.success) {
				this.overviewInfo = result.data
				// 更新报警 在线信息
				this.alarm = this.overviewInfo.alarmCount
				this.online = this.overviewInfo.onLineDtuCount
				// 更新接入情况
				this.accessList = this.overviewInfo.yunweiInfo
				// 更新站所总数
				this.rcuAmount = 0
				this.accessList.map(item => {
					this.rcuAmount += item.count
				})
			} else {
				this.overviewInfo = {}
			}
		},
		init() {
			this.getOverviewInfo()
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
.overview {
  width: 1920px;
  height: 100%;
  background: url('~@/assets/img/navigation/background.png') no-repeat 0 -140px;
  background-size: 100% 1080px;

  .content {
    /* width: 1600px; */
    /* height: 940px; */
    .body {
      margin-left: 20px;
      width: 1881px;
      height: 887px;
      background: url('~@/assets/img/common/bg-border.png') no-repeat;
      background-size: 1881px 887px;
      padding: 27px 56px 31px 50px;
      display: flex;

      .map {
        margin-top: 10px;
        margin-left: 5px;
        width: 1145px;
        height: 819px;
        background: #333;
        position: relative;
        cursor: pointer;

        .border-lt {
          position: absolute;
          top: -7px;
          left: -7px;
          width: 35px;
          height: 30px;
          background: url('~@/assets/img/common/border-lt.png') no-repeat;
          background-size: 35px 30px;
        }

        .border-rb {
          position: absolute;
          bottom: -7px;
          right: -7px;
          width: 35px;
          height: 30px;
          background: url('~@/assets/img/common/border-rb.png') no-repeat;
          background-size: 35px 30px;
        }

        .mapBox {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        margin-left: 20px;
        width: 610px;

        .today-st {
          color: #fff;
          height: 140px;
          // background: rgba(11, 24, 54, 0.5);
          background: url('~@ac/assets/img/overview/today-st.png') no-repeat;
          background-size: 100% 140px;
          padding-top: 15px;

          .title {
            margin-left: 30px;
            font-size: 18px;
          }

          .content {
            margin-top: 30px;
            margin-left: 30px;
            display: flex;

            .early-warning {
              display: flex;

              .icon {
                width: 28px;
                height: 26px;
                background: url('~@/assets/img/common/early-warning.png') no-repeat;
                background-size: 28px 26px;
              }

              .name {
                font-size: 16px;
                margin: 0 12px;
                position: relative;
                top: 5px;
              }

              .number {
                font-family: 'DS-DIGI';
                font-size: 36px;
                position: relative;
                top: -14px;
                color: #54ff00;
              }
            }

            .line {
              width: 4px;
              height: 28px;
              background: #090e2d;
              margin: 0 17px;
            }

            .alarm {
              display: flex;

              .icon {
                width: 28px;
                height: 26px;
                background: url('~@/assets/img/common/alarm.png') no-repeat;
                background-size: 28px 26px;
              }

              .name {
                font-size: 16px;
                margin: 0 12px;
                position: relative;
                top: 5px;
              }

              .number {
                font-family: 'DS-DIGI';
                font-size: 36px;
                position: relative;
                top: -14px;
                color: #ed040b;
              }
            }

            .fault {
              display: flex;

              .icon {
                width: 28px;
                height: 26px;
                background: url('~@/assets/img/common/fault.png') no-repeat;
                background-size: 28px 26px;
              }

              .name {
                font-size: 16px;
                margin: 0 12px;
                position: relative;
                top: 5px;
              }

              .number {
                font-family: 'DS-DIGI';
                font-size: 36px;
                position: relative;
                top: -14px;
                color: #ffbc18;
              }
            }

            .online {
              display: flex;

              .icon {
                width: 28px;
                height: 26px;
                background: url('~@/assets/img/common/online.png') no-repeat;
                background-size: 28px 26px;
              }

              .name {
                font-size: 16px;
                margin: 0 12px;
                position: relative;
                top: 5px;
              }

              .number {
                font-family: 'DS-DIGI';
                font-size: 36px;
                position: relative;
                top: -14px;
                color: #54d4ff;
              }
            }
          }
        }

        .access {
          margin-top: 18px;
          height: 380px;
          // background: rgba(11, 24, 54, 0.5);
          background: url('~@ac/assets/img/overview/access.png') no-repeat;
          background-size: 100% 380px;
          padding-top: 15px;
          color: #fff;

          .header {
            display: flex;
            justify-content: space-between;
            margin-left: 30px;
            font-size: 18px;

            .right {
              width: 124px;
              height: 27px;
              margin-right: 15px;
              background: url('~@/assets/img/common/bg540.png') no-repeat;
              background-size: 124px 27px;
              display: flex;
              justify-content: space-between;

              .name {
                font-size: 16px;
                text-indent: 10px;
                position: relative;
                top: 1px;
                color: #acdee2;
              }

              .number {
                font-size: 16px;
                color: #f2fb02;
                margin-right: 10px;
                position: relative;
                top: 1px;
              }
            }
          }

          .content-wrap {
            margin-top: 10px;
            overflow: auto;
            height: 329px;

            .content-item {
              height: 100px;
              margin-bottom: 9px;
              /* background: #333; */
              display: flex;
              justify-content: space-around;

              .rcu {
                margin-top: 14px;

                .icon {
                  width: 72px;
                  height: 40px;
                  background-repeat: no-repeat;
                  background-size: 72px 40px !important;
                }

                .name {
                  margin-top: 5px;
                }
              }

              .amount {
                margin-top: 5px;

                .number {
                  color: #ffff75;
                  font-family: 'DS-DIGI';
                  font-size: 36px;
                  position: relative;
                  top: 10px;
                  right: 2px;
                }
              }

              .cover {
                margin-top: 27px;
                text-align: center;

                .icon {
                  width: 64px;
                  height: 27px;
                  background: url('~@/assets/img/common/bg17.png') no-repeat;
                  background-size: 64px 27px;
                  font-family: 'DS-DIGI';
                  font-size: 28px;
                  text-align: center;
                  line-height: 27px;
                  color: #49b6ff;
                }

                .name {
                  margin-top: 3px;
                }
              }

              .coverage-rate {
                margin-top: 26px;

                .top {
                  display: flex;

                  .icon {
                    width: 100px;
                    height: 27px;
                    background: url('~@/assets/img/common/bg17.png') no-repeat;
                    background-size: 100px 27px;
                    font-family: 'DS-DIGI';
                    font-size: 28px;
                    text-align: center;
                    line-height: 27px;
                    color: #49b6ff;
                  }

                  .text {
                    color: #49b6ff;
                    font-size: 18px;
                    margin-left: 5px;
                  }
                }

                .name {
                  margin-top: 3px;
                  text-indent: 12px;
                }
              }
            }
          }
        }

        .alarming-trend {
          margin-top: 14px;
          padding-top: 15px;
          height: 285px;
          // background: rgba(11, 24, 54, 0.5);
          background: url('~@ac/assets/img/overview/alarming-trend.png') no-repeat;
          background-size: 100% 285px;
          color: #fff;

          .title {
            margin-left: 30px;
            font-size: 18px;
          }

          .chart {
            width: 570px;
            height: 215px;
            margin-left: 17px;
            margin-top: 10px;
            /* border: 1px solid #0af; */
          }
        }
      }
    }
  }
}
</style>
