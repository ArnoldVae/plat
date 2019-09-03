<template>
	<div class="inspectionPage">
		<div class="content">
			<div class="mapContainer">
				<div class="map">
					<!-- 边角 -->
					<div class="border-lt"></div>
					<div class="border-rb"></div>
					<!-- 地图实例部分 -->
					<div class="mapBox">
						<mapComponent @clickRcuImg="clickRcuImg" :moduleNames="'inspectionIndex'"></mapComponent>
					</div>
				</div>
				<div class="right">
					<div class="inspStatistics">
						<div class="title">巡检统计：</div>
						<div class="selectTimeBox">
							<span @click="selectTime('month')" :class="selectTimeIdx === 1 ? 'spanActive' : ''">一月</span>
							<span @click="selectTime('week')" :class="selectTimeIdx === 2 ? 'spanActive' : ''">一周</span>
							<span @click="selectTime('day')" :class="selectTimeIdx === 3 ? 'spanActive' : ''">三天</span>
						</div>
						<div class="inspChartContanier">
							<div class="alarmLevel">
								<div class="alarmLevelBox">
									<div id="alarmLevelChart"></div>
									<span class="levelText" v-if="levelShow">报警级别</span>
								</div>
								<div class="alarmLevelDetail">
									<div class="critical">
										<i></i>
										<span>危急：</span>
										<span>{{ alarmLevelData.critical }}</span>
									</div>
									<div class="normal">
										<i></i>
										<span>一般：</span>
										<span>{{ alarmLevelData.normal }}</span>
									</div>
									<div class="serious">
										<i></i>
										<span>严重：</span>
										<span>{{ alarmLevelData.serious }}</span>
									</div>
									<div class="earlyWarning">
										<i></i>
										<span>预警：</span>
										<span>{{ alarmLevelData.earlyWarning }}</span>
									</div>
								</div>
							</div>

							<!-- <div class="alarmComfirm">
                <div class="alarmComfirmBox">
                  <div id="alarmComfirmChart"></div>
                  <span class="levelText" v-if="comfirmShow">报警确认</span>
                </div>
                <div class="alarmComfirmDetail">
                    <div class="makeSure">
                      <i></i>
                      <span>未确认：</span>
                      <span>{{ alarmComfirmData.makeSure }}</span>
                    </div>
                    <div class="noMakeSure">
                      <i></i>
                      <span>已确认：</span>
                      <span>{{ alarmComfirmData.noMakeSure }}</span>
                    </div>
                </div>
							</div>-->
						</div>
					</div>
					<div class="equipStatistics">
						<div class="title">巡检装备统计：</div>
						<div class="equipmentBox">
							<div class="equipmentChartBox">
								<div id="equipmentChart"></div>
								<div class="equipText" v-if="equipmentShow">
									<span>{{ equipmentTotal }}</span>
									<span>装备总数</span>
								</div>
							</div>

							<div class="equipDetail">
								<div class="detailLine">
									<div class="firstDiv">
										<i class="gqCls"></i>
										<span class="whiteCls">高清视频：</span>
										<span class="blueCls">{{ gq.video }}</span>
									</div>
									<div class="secondDiv">
										<span class="whiteCls">在线：</span>
										<span class="blueCls">{{ gq.online }}</span>
									</div>
									<div class="thirdDiv">
										<span class="whiteCls">离线：</span>
										<span class="yellowCls">{{ gq.offline }}</span>
									</div>
								</div>
								<div class="detailLine">
									<div class="firstDiv">
										<i class="snCls"></i>
										<span class="whiteCls">室内机器人：</span>
										<span class="blueCls" style="color:#f6ff00">{{ snjqr.robot }}</span>
									</div>
									<div class="secondDiv">
										<span class="whiteCls">在线：</span>
										<span class="blueCls">{{ snjqr.online }}</span>
									</div>
									<div class="thirdDiv">
										<span class="whiteCls">离线：</span>
										<span class="yellowCls">{{ snjqr.offline }}</span>
									</div>
								</div>
								<div class="detailLine">
									<div class="firstDiv">
										<i class="swCls"></i>
										<span class="whiteCls">室外机器人：</span>
										<span class="blueCls" style="color:#f13b2b">{{ swjqr.robot }}</span>
									</div>
									<div class="secondDiv">
										<span class="whiteCls">在线：</span>
										<span class="blueCls">{{ swjqr.online }}</span>
									</div>
									<div class="thirdDiv">
										<span class="whiteCls">离线：</span>
										<span class="yellowCls">{{ swjqr.offline }}</span>
									</div>
								</div>
								<div class="detailLine">
									<div class="firstDiv">
										<i class="wrjCls"></i>
										<span class="whiteCls">无人机：</span>
										<span class="blueCls" style="color:#ff7800">{{ wrj.wrj }}</span>
									</div>
									<div class="secondDiv">
										<span class="whiteCls">在线：</span>
										<span class="blueCls">{{ wrj.online }}</span>
									</div>
									<div class="thirdDiv">
										<span class="whiteCls">离线：</span>
										<span class="yellowCls">{{ wrj.offline }}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="realtimeAlarm">
            <div class="title">实时报警：</div>
            <div class="realtimeAlarm-con">
              <div class="noAlarm" v-if="hasNoAlarm">暂无报警</div>
              <div class="hasAlarm" v-if="!hasNoAlarm">

              </div>
            </div>
					</div>-->
				</div>
			</div>
			<!-- <statistics></statistics> -->
		</div>
	</div>
</template>
<script>
// 地图使用的指令
import echarts from 'echarts'
import mapComponent from '@/components/native/mapComponent/mapComponent'
export default {
  name: 'inspection',
  components: {
    mapComponent
  },
  props: {},
  data() {
    return {
      selectTimeIdx: -1,
      // 巡检统计相关数据
      alarmLevelData: {
        critical: 0,
        normal: 0,
        serious: 0,
        earlyWarning: 0
      },
      alarmComfirmData: {
        makeSure: 20,
        noMakeSure: 30
      },
      // 3个饼图实例
      levelChart: null,
      comfirmChart: null,
      equipmentChart: null,
      levelShow: true,
      comfirmShow: true,
      equipmentShow: true,
      // 巡检装备相关数据
      equipmentTotal: 0,
      gq: {
        video: 0,
        online: 0,
        offline: 0
      },
      snjqr: {
        robot: 0,
        online: 0,
        offline: 0
      },
      swjqr: {
        robot: 0,
        online: 0,
        offline: 0
      },
      wrj: {
        wrj: 0,
        online: 0,
        offline: 0
      },
      hasNoAlarm: true,
      // mqtt订阅的topic
      topicArr: []
    }
  },
  methods: {
    // 巡检统计的时间按钮
    selectTime(time) {
      switch (time) {
        case 'month':
          this.selectTimeIdx = 1
          break
        case 'week':
          this.selectTimeIdx = 2
          break
        case 'day':
          this.selectTimeIdx = 3
          break
      }
    },
    createPie(chart, color, seriesData) {
      const _this = this
      let option = {
        color: color,
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: ['65%', '88%'],
            center: ['50%', '50%'],
            data: seriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              show: false
            }
          }
        ]
      }
      chart.setOption(option)

      window.onresize = () => {
        _this.levelChart.resize()
        // _this.comfirmChart.resize();
        _this.equipmentChart.resize()
      }

      chart.on('mouseover', function (params) {
        if (params.name.includes('统计')) {
          _this.levelShow = false
        } else if (params.name.includes('确认')) {
          _this.comfirmShow = false
        } else {
          _this.equipmentShow = false
        }
      })

      chart.on('mouseout', function (params) {
        if (params.name.includes('统计')) {
          _this.levelShow = true
        } else if (params.name.includes('确认')) {
          _this.comfirmShow = true
        } else {
          _this.equipmentShow = true
        }
      })
    },
    clickRcuImg(val) {
      this.$router.push({
        name: 'inspection-content',
        params: {
          stationId: val.id,
          vcName: val.label
        }
      })
      this.$store.commit('CHANGE_STATION', {
        stationId: val.id
      })
    }
  },
  created() { },
  mounted() {
    const _this = this
    _this.selectTime('month')
    _this.levelChart = echarts.init(document.getElementById('alarmLevelChart'))
    // _this.comfirmChart = echarts.init(document.getElementById("alarmComfirmChart"));
    _this.equipmentChart = echarts.init(document.getElementById('equipmentChart'))

    // 调用报警等级chart方法
    let levelColor = ['#f13b2b', '#f6ff00', '#ff7800', '#00aeff']
    let levelData = [
      { value: 0, name: '危急统计' },
      { value: 0, name: '一般统计' },
      { value: 0, name: '严重统计' },
      { value: 0, name: '预警统计' }
    ]
    _this.createPie(_this.levelChart, levelColor, levelData)

    // 调用报警确认chart方法
    let comfirmColor = ['#ff7800', '#00aeff']
    let comfirmData = [{ value: 20, name: '未确认' }, { value: 30, name: '已确认' }]
    // _this.createPie(_this.comfirmChart,comfirmColor,comfirmData);

    // 调用巡检设备统计chart方法
    _this.$_api.inspectionIndex
      .getEquipData()
      .then(res => {
        if (res.success) {
          let equipmentColor = ['#00aeff', '#f6ff00', '#f13b2b', '#ff7800']
          let equipmentData = [
            { value: res.data.gq, name: '高清机器人' },
            { value: res.data.innerRobotNum, name: '室内机器人' },
            { value: res.data.outDoorRobotNum, name: '室外机器人' },
            { value: res.data.wuRenJiNum, name: '无人机' }
          ]
          _this.createPie(_this.equipmentChart, equipmentColor, equipmentData)
          _this.equipmentTotal = res.data.allDev
          // 高清
          _this.gq.video = res.data.gqOnLine
          _this.gq.online = res.data.gqOnLine
          _this.gq.offline = res.data.gqOutLine
          // 室内机器人
          _this.snjqr.robot = res.data.innerRobotNum
          _this.snjqr.online = res.data.innerOnLine
          _this.snjqr.offline = res.data.innerOutLine
          // 室外机器人
          _this.swjqr.robot = res.data.outDoorRobotNum
          _this.swjqr.online = res.data.outDoorOnLine
          _this.swjqr.offline = res.data.outDoorOutLine
          // 无人机
          _this.wrj.robot = res.data.wuRenJiNum
          _this.wrj.online = res.data.wuRenJiOnLine
          _this.wrj.offline = res.data.wuRenJiOutLine
        } else {
          console.log(res.msg)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  watch: {},
  computed: {},
  directives: {
    'center': {
      bind(el) {
        el.style.marginLeft = `${-el.offsetWidth / 2}px`
      },
      inserted(el) {
        el.style.marginLeft = `${-el.offsetWidth / 2}px`
      },
      update(el) {
        el.style.marginLeft = `${-el.offsetWidth / 2}px`
      }
    }
  },
}
</script>
<style lang="stylus">
@import '~@/assets/font/font.css';

.inspectionPage {
  width: 1920px;
  height: 100%;
  background: url('~@/assets/img/navigation/background.png') no-repeat 0 -140px;
  background-size: 100% 1080px;

  .content {
    height: 938px;

    .mapContainer {
      margin-left: 20px;
      // width: 1775px;
      height: 910px;
      background: url('~@/assets/img/common/bg-border.png') no-repeat;
      background-size: 1881px 100%;
      padding: 27px 56px 31px 50px;
      display: flex;

      .map {
        // margin-top: 10px;
        // margin-left: 5px;
        width: 1180px;
        height: 855px;
        background: #333;
        position: relative;

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
          right: -19px;
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

      .right {
        margin-left: 20px;
        width: 610px;

        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        .inspStatistics, .equipStatistics, .realtimeAlarm {
          width: 100%;
          background-color: rgba(10, 23, 54, 0.5);
          position: relative;

          .title {
            width: 100%;
            height: 60px;
            font-size: 18px;
            color: #fff;
            line-height: 60px;
            letter-spacing: 3px;
            text-indent: 20px;
            background: #165697;
          }
        }

        .inspStatistics {
          height: 380px;
          border-radius: 5px;
          width: 595px;
          border: 2px solid #165697;

          .selectTimeBox {
            position: absolute;
            right: 4px;
            top: 70px;
            height: 60px;

            span {
               display: inline-block;
              width: 62px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              color: #fff;
              background: url('~@as/assets/img/inspectionIndex/selectBtn.png') no-repeat;
              background-size: 100% 100%;
              margin-right: 10px;
              cursor: pointer;
            }

            .spanActive {
              color: #ffd36a;
            // background: #165697;
            }
          }

          .inspChartContanier {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .alarmLevel {
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;

              .alarmLevelBox {
                width: 100%;
                height: 170px;
                position: relative;
                top: 40px;

                #alarmLevelChart {
                  width: 100%;
                  height: 90%;
                }

                .levelText {
                  font-size: 20px;
                  color: #fff;
                  position: absolute;
                  left: 50%;
                  top: 35%;
                  transform: translateX(-50%);
                }
              }

              .alarmLevelDetail {
                width: 50%;
                height: 90px;
                color: #fff;
                display: flex;
                flex-wrap: wrap;
                margin-top: 34px;

                .critical, .normal, .serious, .earlyWarning {
                  float: left;
                  width: 140px;
                  height: 40px;
                  line-height: 40px;
                  margin-right: 4px;

                  i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: sub;
                    border-radius: 2px;
                    margin-right: 14px;
                  }
                }

                .critical {
                  i {
                    background-color: #b60711;
                  }

                  span:nth-child(2) {
                    font-size: 20px;
                  }

                  span:nth-child(3) {
                    color: #b60711;
                    font-family: 'DS-DIGI';
                    font-size: 30px;
                    letter-spacing: 2px;
                    margin-left: 4px;
                  }
                }

                .normal {
                  i {
                    background-color: #f6ff00;
                  }

                  span:nth-child(2) {
                    font-size: 20px;
                  }

                  span:nth-child(3) {
                    color: #f6ff00;
                    font-family: 'DS-DIGI';
                    font-size: 30px;
                    letter-spacing: 2px;
                    margin-left: 4px;
                  }
                }

                .serious {
                  i {
                    background-color: #b66912;
                  }

                  span:nth-child(2) {
                    font-size: 20px;
                  }

                  span:nth-child(3) {
                    color: #b66912;
                    font-family: 'DS-DIGI';
                    font-size: 30px;
                    letter-spacing: 1px;
                    margin-left: 4px;
                  }
                }

                .earlyWarning {
                  i {
                    background-color: #00aeff;
                  }

                  span:nth-child(2) {
                    font-size: 20px;
                  }

                  span:nth-child(3) {
                    color: #00aeff;
                    font-family: 'DS-DIGI';
                    font-size: 30px;
                    letter-spacing: 1px;
                    margin-left: 4px;
                  }
                }
              }
            }

            .alarmComfirm {
              width: 45%;
              height: 100%;

              .alarmComfirmBox {
                width: 100%;
                height: 220px;
                position: relative;

                #alarmComfirmChart {
                  width: 100%;
                  height: 100%;
                  padding-top: 26px;
                }

                .levelText {
                  font-size: 16px;
                  color: #fff;
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transform: translateX(-90%);
                }
              }

              .alarmComfirmDetail {
                height: calc(100% - 220px);
                padding: 12px 45px 0px;
                color: #fff;

                .makeSure, .noMakeSure {
                  float: left;
                  width: 150px;
                  height: 40px;
                  line-height: 40px;
                  margin-left: 36px;

                  i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: sub;
                    border-radius: 2px;
                    margin-right: 14px;
                  }
                }

                .makeSure {
                  i {
                    background-color: #f6ff00;
                  }

                  span:nth-child(2) {
                    font-size: 16px;
                  }

                  span:nth-child(3) {
                    color: #f6ff00;
                    font-family: 'DS-DIGI';
                    font-size: 22px;
                    letter-spacing: 2px;
                    margin-left: 4px;
                  }
                }

                .noMakeSure {
                  i {
                    background-color: #00aeff;
                  }

                  span:nth-child(2) {
                    font-size: 16px;
                  }

                  span:nth-child(3) {
                    color: #00aeff;
                    font-family: 'DS-DIGI';
                    font-size: 22px;
                    letter-spacing: 2px;
                    margin-left: 4px;
                  }
                }
              }
            }
          }
        }

        .equipStatistics {
          width: 595px;
          margin-top: 15px;
          padding-bottom: 12px;
          border: 2px solid #165697;
          border-radius: 5px;

          .equipmentBox {
            width: 100%;
            height: calc(100% - 47px);
            display: flex;
            flex-direction: column;
            align-items: center;

            // justify-content : space-between;
            .equipmentChartBox {
              width: 224px;
              height: 190px;
              position: relative;

              #equipmentChart {
                width: 224px;
                height: 100%;
              }

              .equipText {
                position: absolute;
                left: 50%;
                top: 30%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;
                color: #fff;

                span:nth-child(1) {
                  font-family: 'DS-DIGI';
                  font-size: 36px;
                  letter-spacing: 2px;
                }

                span:nth-child(2) {
                  font-size: 16px;
                }
              }
            }

            .equipDetail {
              width: calc(100% - 100px);
              // height:100%;
              // padding-top: 30px;
              margin-left: 70px;

              .detailLine {
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding-right: 10px;
                color: #fff;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;

                >div {
                  i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    vertical-align: sub;
                    border-radius: 2px;
                    margin-right: 10px;
                  }

                  .whiteCls {
                    font-size: 20px;
                  }

                  .blueCls, .yellowCls {
                    font-family: 'DS-DIGI';
                    font-size: 30px;
                    letter-spacing: 2px;
                  }

                  .blueCls {
                    color: #00aeff;
                  }

                  .yellowCls {
                    color: #f6ff00;
                  }
                }

                .firstDiv {
                  width: 190px;
                }

                .secondDiv {
                  width: 120px;
                }

                .thirdDiv{
                  width: 110px;
                }
              }

              .gqCls {
                background-color: #00a7f5;
              }

              .snCls {
                background-color: #f6ff00;
              }

              .swCls {
                background-color: #f13b2b;
              }

              .wrjCls {
                background-color: #ff7800;
              }
            }
          }
        }

        .realtimeAlarm {
          height: 204px;

          .realtimeAlarm-con {
            width: 100%;
            height: calc(100% - 47px);

            // border 1px solid #000
            .noAlarm {
              width: 100%;
              margin-top: 50px;
              color: #fff;
              text-align: center;
              font-size: 20px;
              letter-spacing: 4px;
            }

            .hasAlarm {
              width: 100%;
              height: 100%;
              border: 1px solid #000;
            }
          }
        }
      }
    }
  }
}
</style>
