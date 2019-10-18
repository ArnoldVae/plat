<template>
	<div class="history-notes">
		<div class="histroy-modal-wrap">
			<div class="header">
				<div>
					<span>时间范围：</span>
					<DatePicker type="date" placeholder style="width: 200px" v-model="histroyBeginTime"></DatePicker>

					<span>-</span>
					<DatePicker type="date" placeholder style="width: 200px" v-model="histroyEndTime"></DatePicker>

					<el-button
						type="primary"
						style="margin-left:10px"
						size="small"
						class="btn searchbtn"
						@click="drawChart"
					>查询</el-button>
				</div>
				<div class="count">
					<!-- <i class="icon total"></i>
					<span>巡检点数：{{historyTotalNode}}</span>-->
					<i class="icon alarm"></i>
					<span>报警点数：{{ historyAlarmNode }}</span>
					<i class="icon fail"></i>
					<span>失败点数：{{ historyFailNode }}</span>
				</div>
			</div>
			<div class="content">
				<div class="no-data" v-show="nodata">
					<img src="../../assets/img/record/nodata.png" alt />
				</div>
				<div v-show="!nodata">
					<div class="history-data">
						<div id="histroyChart"></div>
					</div>
					<div class="img-container">
						<img @click="showBigPic(normalImgPath)" :src="normalImgPath" alt />
						<img @click="showBigPic(normalImgPath)" :src="infraImgPath" alt />
					</div>
				</div>
			</div>
		</div>

        <ocx-modal v-model="imgFlag" title="查看图片" :width="1000" footer-hide draggable :z-index=9999>
			<vue-photo-zoom-pro :url="imgUrl" :width="400" type="circle" class="bigImg"></vue-photo-zoom-pro>
		</ocx-modal>

	</div>
</template>
<script>
import moment from 'moment'
export default {
	name: 'history-notes',
	components: {},
	props: {
		nodeInfo: {
			type: Object,
			default: {
                nodeData: '',
                nodeNameData: ''
            }
		}
	},
	data() {
		return {
			axios: this.$_api.recordData,
			histroyBeginTime: new Date(
				moment()
					.add(-7, 'days')
					.calendar()
			),
			histroyEndTime: new Date(),
            historyChart: null,
            historyAlarmNode: 0,
            historyFailNode: 0,
            nodata: true,
            normalImgPath: '',
            infraImgPath: '',
            imgFlag: false,
			imgUrl: '',
		}
	},
	computed: {},
	filters: {},
	watch: {
		nodeInfo(val) {
			this.drawChart()
		}
	},
	created() {},
	mounted() {},
	activated() {},
	deactivated() {},
	update() {},
	beforeDestory() {},
	methods: {
        closeItem() {
            this.histroyBeginTime = new Date(
				moment()
					.add(-7, 'days')
					.calendar()
			),
			this.histroyEndTime = new Date()
        },
		drawChart() {
			if (this.historyChart) {
				this.historyChart.clear()
				this.historyChart.off('click')
			}
			this.$_api.recordData.getHistoryData({
					nodeId: this.nodeInfo.nodeData,
					startTime: parseInt(new Date(this.histroyBeginTime).getTime() / 1000),
					endTime: parseInt(new Date(this.histroyEndTime).getTime() / 1000)
				}).then(res => {
					if (res.success) {
						let { alarmNum, unSuccessNum, chartData, unit } = res.data
						this.historyAlarmNode = alarmNum
						this.historyFailNode = unSuccessNum

						if (chartData.length == 0) {
							// this.$ocxMessage.success({
							// 	content: '当前时间范围没有历史数据',
							// 	duration: 2
							// })
							this.nodata = true
							return
						}
						this.nodata = false
						let xData = [],
							yData = []
						chartData.map(item => {
							xData.push(moment(item.time * 1000).format('MM-DD HH:mm'))
							yData.push(item.value)
						})
						let option = {
							title: {
								text: this.nodeInfo.nodeNameData + '历史曲线',
								textStyle: {
									color: '#ffea00'
								}
							},
							tooltip: {
								trigger: 'axis'
							},
							dataZoom: [
								{
									show: true,
									realtime: true,
									start: 90,
									end: 100
								},
								{
									type: 'inside',
									realtime: true,
									start: 90,
									end: 100
								}
							],
							xAxis: {
								type: 'category',
								data: xData,
								axisLabel: {
									color: '#fff'
								}
							},
							yAxis: {
								name: unit,
								type: 'value',
								axisLine: {
									show: true,
									lineStyle: {
										color: '#fff'
									}
								},
								axisLabel: {
									color: '#fff'
								},
								nameTextStyle: {
									color: '#fff'
								}
							},
							series: [
								{
									data: yData,
									type: 'line',
									smooth: true
								}
							]
						}
						let year = new Date().getFullYear()
						setTimeout(() => {
							this.historyChart = this.$_echarts.init(document.getElementById('histroyChart'))
							this.historyChart.setOption(option)
							this.historyChart.resize()
							this.historyChart.on('click', params => {
								this.getHistoryImg(new Date(year + '-' + params.name).getTime() / 1000)
							})
						}, 100)

						// window.addEventListener('resize',()=>{
						// 		this.historyChart.resize()
						// })
						this.getHistoryImg(new Date(year + '-' + xData[xData.length - 1]).getTime() / 1000)
					}
				})
        },
        getHistoryImg(updateTime) {
			this.$_api.recordData.getHistoryImg({
					nodeId: this.nodeInfo.nodeData,
					// nodeId: '7a000c45c9594624bf160173fa2e9ab6',
					iUpdateTime: updateTime
				})
				.then(res => {
					if (res.success && res.data.length > 0) {
						this.normalImgPath = res.data[0].vcNormalVideoPath
						this.infraImgPath = res.data[0].vcInfraPicturePath
					}
				})
        },
        showBigPic(path) {
			if (path != '' && path != null) {
				this.imgUrl = path
				this.imgFlag = true
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
.history-notes {
  .histroy-modal-wrap {
    padding: 5px 10px;

    .header {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-around;

      .count {
        padding: 0 40px 0 30px;
        background: #0e2d6c;
        margin-left: 20px;

        .icon {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin-right: 10px;
          margin-left: 15px;
        }

        .total {
          background: #109ae7;
        }

        .alarm {
          background: #ef2829;
        }

        .fail {
          background: #cdc200;
        }
      }
    }

    .content {
      display: flex;
      margin-top: 20px;
      height: 500px;

      >div {
        display: flex;
      }

      .no-data {
        width: 100%;
        align-items: center;

        img {
          width: 88px;
          height: 122px;
          margin: 0 auto;
        }
      }

      .history-data {
        width: 780px;
        height: 500px;

        #histroyChart {
          background: #0d3165;
          height: 100%;
        }
      }

      .img-container {
        width: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        img {
          width: 380px;
          height: 260px;
        }
      }
    }
  }
}
/deep/.ivu-modal-header {
    padding: 7px 0 7px 25px !important;
    background: #17579a;
    border-radius: 10px 10px 0 0;
    border: 0;

    /deep/.ivu-modal-header-inner {
      font-size: 16px !important;
      height: 35px;
      line-height: 35px;
      color: #e9edf3 !important;
    }
  }

  /deep/.ivu-modal-header {
    padding: 7px 0 7px 25px !important;
    background: #17579a;
    border-radius: 10px 10px 0 0;
    border: 0;

    /deep/.ivu-modal-header-inner {
      font-size: 16px !important;
      height: 35px;
      line-height: 35px;
      color: #e9edf3 !important;
    }
  }
  /deep/ .ivu-input{
	background: #081a3f;
	border-color: #063765;
	color: #fff;
}

/deep/.ivu-select-dropdown{
	background: #09204e !important;
	font-size: 14px;
}
</style>
