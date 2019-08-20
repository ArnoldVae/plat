<template>
	<div class="detail">
		<!-- <div class="back" @click="goback">返回</div> -->

		<div class="detail-content">
			<!-- <div class="look-detail">查看任务详情</div> -->
			<div class="info">
				<div class="info-left">
					<span class="txt">任务名称：{{ taskName }}</span>
					<span class="txt">启动原因：{{ startReason }}</span>
					<span class="txt">结束原因：{{ stopReason }}</span>
				</div>
				<div class="info-right">
					<i class="count inspect"></i>
					<span class="txt">
						巡检点数:
						<!-- <i class="num">{{viewPoints}}</i> -->
						<span>{{ viewPoints }}</span>
					</span>
					<i class="count skip"></i>
					<span class="txt">
						跳过点数:
						<!-- <i class="count">{{skipPoints}}</i> -->
						<span>{{ skipPoints }}</span>
					</span>
					<i class="count fail"></i>
					<span class="txt">
						失败点数:
						<!-- <i class="count">{{failPoints}}</i> -->
						<span>{{ failPoints }}</span>
					</span>
					<i class="count police"></i>
					<span class="txt">
						报警点数:
						<!-- <i class="count">{{alarmPoints}}</i> -->
						<span>{{ alarmPoints }}</span>
					</span>
					<i class="count normal"></i>
					<span class="txt">
						正常点数:
						<!-- <i class="count">{{normalPoints}}</i> -->
						<span>{{ normalPoints }}</span>
					</span>
				</div>
				<!-- <div class="back" @click="goback">返回</div> -->
			</div>
			<div class="time">
				<!-- <div class="plan-time">
          <div class="time-content">{{planTime}}</div>
          <div class="time-des">任务计划时间</div>
				</div>-->
				<div class="start-time">
					<div class="time-content">{{ startTime }}</div>
					<div class="time-des">开始时间</div>
				</div>
			</div>
			<el-scrollbar>
				<div class="steps">
					<div class="steps-content" v-for="item in nodeList" :key="item.index">
						<div class="circle-out skip-out" :style="{ background: item.outBgColor }">
							<div class="circle-in skip-in" :style="{ background: item.inBgColor }">{{ item.status }}</div>
							<i class="bd-top"></i>
							<i class="bd-bt"></i>
						</div>
						<div class="node-info">
							<ul>
								<li>巡检对象：{{ item.nodeName }}</li>
								<li>分析结果：</li>
								<li>环境信息：{{ item.fTemperatureData }}，{{ item.fHumidityData }}</li>
								<li>报警状态：{{ item.iIsAlarm }}</li>
							</ul>
							<div class="history-rcord">历史记录</div>
						</div>
						<div class="img-content">
							<!-- <img v-if="item.vcInfraPicturePath" :src="item.vcInfraPicturePath" alt /> -->
							<vue-photo-zoom-pro
								v-if="item.vcInfraPicturePath"
								:url="item.vcInfraPicturePath"
								:width="180"
								type="circle"
							></vue-photo-zoom-pro>
							<!-- <img v-if="item.vcNormalPicturePath" :src="item.vcNormalPicturePath" alt /> -->
							<vue-photo-zoom-pro
								v-if="item.vcNormalPicturePath"
								:url="item.vcNormalPicturePath"
								:width="180"
							></vue-photo-zoom-pro>
						</div>
						<i class="line"></i>
						<i class="dot"></i>
						<span class="node-time">{{ item.iUpdateTime || '--' }}</span>
						<span class="node-point">{{ item.nodeParentName }}</span>
					</div>
				</div>
			</el-scrollbar>
			<div class="detail-name">
				<i class="bg-lf"></i>
				<i class="bg-rg"></i>
				查看任务详情
			</div>
		</div>
		<!-- <statistics></statistics> -->
		<el-button type="primary" class="back" @click="goback">返回</el-button>
	</div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'detail',
  components: {},
  props: {},
  data() {
    return {
      axios: this.$_api.recordData,
      recordId: '',
      taskId: '',
      unitId: '',
      taskName: '', //任务名称
      startReason: '', //启动原因
      stopReason: '', //停止原因
      skipPoints: '', //跳过点数
      failPoints: '', //失败点数
      alarmPoints: '', //报警点数
      normalPoints: '', //正常点数
      viewPoints: '', //巡检点数
      planTime: '', //计划时间
      startTime: '', //开始时间
      nodeList: [] //节点列表
    }
  },
  computed: {},
  filters: {},
  watch: {},
  created() {
    // console.log(this.$route, 'route')
    this.recordId = this.$route.params.recordId
    this.taskId = this.$route.params.taskId
    this.unitId = this.$route.params.unitId
  },
  mounted() {
    this.getDetail()
    this.getStepsDetail()
  },
  activited() { },
  update() { },
  beforeDestory() { },
  methods: {
    // 获取详情
    getDetail() {
      var ctx = this
      ctx.axios
        .getDetail({
          recordId: ctx.recordId,
          unitId: ctx.unitId,
          taskId: ctx.taskId
        })
        .then(res => {
          var data = res.data
          // console.log(res, 'data')
          ctx.taskName = data.taskName
          ctx.startReason = data.startReason
          ctx.stopReason = data.stopReason
          ctx.skipPoints = data.skipPoints
          ctx.failPoints = data.failPoints
          ctx.alarmPoints = data.alarmPoints
          ctx.normalPoints = data.normalPoints
          ctx.viewPoints = data.viewPoints
          ctx.startTime = moment(data.startTime * 1000).format('YYYY-MM-DD hh:mm:ss')
        })
        .catch(err => {
          console.log(err)
        })
    },
    //获取进度详情
    getStepsDetail() {
      var ctx = this
      ctx.axios
        .getStepDetail({
          unitId: ctx.unitId,
          taskId: ctx.taskId,
          recordId: ctx.recordId
          // "taskId": "8fe3d8d377b94521a26b185196971aa5",
          // "unitId": "42389edde72d41f4bcd978b574eefbae",
          // "recordId": "0099b7fd47134c648c2e33b3ada4bef3"
        })
        .then(res => {
          // console.log(res, 'step')
          var data = res.data
          for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].iIsAlarm == 0) {
              data[i].iIsAlarm = '正常'
            } else if (data[i].iIsAlarm == 1) {
              data[i].iIsAlarm = '报警'
            }
            if (data[i].iIsOverlap == null) {
              data[i].status = '未到达'
              data[i].outBgColor = '#6abfed'
              data[i].inBgColor = '#1773a7'
            } else if (data[i].iIsOverlap == 0) {
              data[i].status = '已到达'
              data[i].outBgColor = '#5ae8f8'
              data[i].inBgColor = '#1895a3'
            } else if (data[i].iIsOverlap == 1) {
              data[i].status = '已跳过'
              data[i].outBgColor = '#6aa4b0'
              data[i].inBgColor = '#4f6570'
            }
            data[i].fHumidityData = data[i].fHumidityData ? data[i].fHumidityData + '%' : '--'
            data[i].fTemperatureData = data[i].fTemperatureData ? data[i].fTemperatureData + '℃' : '--'
            data[i].iUpdateTime = data[i].iUpdateTime
              ? moment(data[i].iUpdateTime).format('HH:mm:ss')
              : '--'
          }
          ctx.nodeList = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    goback() {
      this.$router.go(-1)
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
.detail {
  width: 1920px;
  height: 1080px;
  background: url('~@/assets/img/navigation/background.png') no-repeat;
  background-size: 100% 1080px;
  position: relative;

  .back {
    color: #90d9ff;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 100px;
    border: 1px solid #0173bb;
    background: url('~@/assets/img/common/bg17.png') no-repeat;
    background-size: 100% 100%;
  }

  .detail-content {
    height: 910px;
    width: 95%;
    margin: 0 auto;
    position: relative;
    background: url('../../assets/img/common/bg.png') no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;

    .look-detail {
      width: 100%;
      height: 30px;
      font: 100 20px / 30px '';
      color: #3fd4e0;
    }

    .info {
      height: 50px;
      width: 80%;
      margin-left: 300px;
      border: 1px solid #3bacf3;
      font: 100 18px / 30px '';
      box-shadow: 2px 1px 2px #3e9589;
      position: relative;
      top: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: bold;

      .txt {
        color: #90d9ff;
        margin-left: 10px;
      }

      .info-left {
        float: left;
      }

      .info-right {
        float: right;

        .count {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 2px 5px;
        }

        .inspect {
          background: #109ae7;
        }

        .skip {
          background: #636963;
        }

        .fail {
          background: #cdc200;
        }

        .police {
          background: #ef2829;
        }

        .normal {
          background: #08e310;
        }

        .txt {
          display: inline-block;
          margin: 0 5px;
        }
      }
    }

    .time {
      margin: 47px 0 0 173px;

      .plan-time {
        width: 200px;
        height: 90px;
        position: relative;
        text-align: center;
        background: url('../../assets/img/record/plan-time.png') no-repeat;
        background-size: 96px 82px;
      }

      .start-time {
        width: 200px;
        height: 90px;
        position: relative;
        text-align: center;
        margin-top: 20px;
        background: url('../../assets/img/record/start-time.png') no-repeat;
        background-size: 96px 82px;
      }

      .time-content {
        width: 96px;
        height: 14px;
        position: absolute;
        top: 29px;
        color: #74ffff;
        font-size: 14px;
      }

      .time-des {
        position: absolute;
        top: 65px;
        left: 21px;
        color: #6194b7;
        font-size: 16px;
      }
    }

    .steps {
      height: 693px;
      width: 1590px;
      overflow: auto;
      margin: 10px 0 0 171px;
      position: relative;

      .steps-content {
        width: 100%;
        height: 130px;
        position: relative;
        z-index: 100;
        margin-top: 10px;

        .circle-out {
          position: relative;
          float: left;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-top: 15px;

          .circle-in {
            position: absolute;
            width: 70px;
            height: 70px;
            margin: 15px 0 0 15px;
            border-radius: 50%;
            text-align: center;
            font: 100 14px / 70px '';
            color: #fff;
          }

          .bd-top {
            position: absolute;
            width: 1px;
            height: 36px;
            top: -36px;
            left: 50px;
            background: #b0ffff;
          }

          .bd-bt {
            position: absolute;
            width: 1px;
            height: 50px;
            top: 99px;
            left: 50px;
            background: #b0ffff;
          }
        }

        .skip-out {
          background: #6aa4b0;

          .skip-in {
            background: #4f6570;
          }
        }

        .unarrive-out {
          background: #6abfed;

          .unarrive-in {
            background: #1773a7;
          }
        }

        .arrive-out {
          background: #5ae8f8;

          .arrive-in {
            background: #1895a3;
          }
        }

        .node-info {
          float: left;
          width: 800px;
          height: 100%;
          margin-left: 240px;
          background: url('../../assets/img/record/border.png') no-repeat;
          background-size: 100% 100%;

          ul {
            width: 100%;
            height: 70px;

            li {
              float: left;
              height: 30px;
              font: 100 18px / 30px '';
              color: #5ff6fb;
              margin: 5px;
              margin-top: 20px;
              text-indent: 56px;
            }

            li:nth-of-type(1) {
              width: 350px;
              background: url('../../assets/img/record/object.png') no-repeat 30px 9px;
              background-size: 14px 14px;
            }

            li:nth-of-type(2) {
              width: 250px;
              background: url('../../assets/img/record/result.png') no-repeat 30px 9px;
              background-size: 14px 14px;
            }

            li:nth-of-type(3) {
              width: 350px;
              background: url('../../assets/img/record/env-info.png') no-repeat 30px 9px;
              background-size: 14px 14px;
            }

            li:nth-of-type(4) {
              width: 250px;
              background: url('../../assets/img/record/alarm-status.png') no-repeat 30px 9px;
              background-size: 14px 14px;
            }
          }

          .history-rcord {
            width: 130px;
            height: 30px;
            font: 100 16px / 30px '';
            color: #fff;
            margin: 18px 0 0 640px;
            background: url('~@/assets/img/common/bg17.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
          }
        }

        .img-content {
          float: left;
          width: 400px;
          height: 100%;
          margin-left: 20px;

          /deep/.pic-img {
            display: inline-block;
            width: 138px;
            height: 100%;
            margin-left: 10px;
          }
        }

        /deep/.img-container img {
          height: 180px;
        }

        .line {
          position: absolute;
          width: 200px;
          height: 2px;
          background: #7fc1e6;
          z-index: 100;
          left: 100px;
          top: 62px;
        }

        .dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7fc1e6;
          left: 300px;
          top: 58px;
        }

        .node-time {
          width: 200px;
          height: 37px;
          color: #80ffff;
          font: 100 16px / 37px '';
          position: absolute;
          top: 20px;
          left: 100px;
          text-align: center;
        }

        .node-point {
          position: absolute;
          width: 200px;
          height: 28px;
          font: 100 16px / 28px '';
          color: #9decfa;
          top: 70px;
          left: 100px;
          text-align: center;
        }
      }
    }

    .detail-name {
      position: absolute;
      width: 1085px;
      height: 54px;
      top: -13px;
      left: 375px;
      text-align: center;
      font: 100 16px / 54px '';
      color: #297ed3;

      .bg-lf {
        width: 55px;
        height: 23px;
        position: absolute;
        left: 415px;
        top: 15px;
        background: url('../../assets/img/record/bd-lf.png') no-repeat;
        background-size: 100% 100%;
      }

      .bg-rg {
        width: 55px;
        height: 23px;
        position: absolute;
        top: 15px;
        left: 620px;
        background: url('../../assets/img/record/bd-rg.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  /deep/.el-scrollbar__wrap {
    overflow-y: hidden;
    overflow-x: hidden;
    margin-right: initial !important;
    margin-bottom: initial !important;

    /deep/.el-scrollbar__view {
      display: flex;
    }
  }

  ::-webkit-scrollbar, ::-webkit-scrollbar:hover, ::-webkit-scrollbar-track {
    background-color: #3299ff !important;
    width: 6px;
    height: 0;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-corner, ::-webkit-scrollbar-thumb {
    background: rgba(36, 64, 88, 0.48);
    border-radius: 3px;
    height: 100px;
  }

  /deep/.el-scrollbar__thumb {
    border-radius: 3px;
    background-color: #3299ff !important;

    &:hover {
      background-color: #3299ff !important;
    }
  }
}
</style>
