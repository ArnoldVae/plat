<template>
	<div class="systemInfo">
		<el-container>
			<el-aside width="1150px">
				<div class="item-title">
					<span class="key">当前预警变电站：</span>
					<span class="value">500kV东善桥变电站</span>

				</div>
				<div class="item-title2">
					<span class="key">预警方式：</span>
					<span class="value">红外测温</span>
					<span class="key">预警类型：</span>
					<el-tag type="danger">趋近阈值</el-tag>
					<el-tag type="danger">短期升温</el-tag>
					<el-tag type="warning">趋势升温</el-tag>
					<span class="color-red ">●</span>
					<span class="key">一级预警：</span>
					<span class="value">（>90℃）</span>
					<span class="color-yellow ">●</span>
					<span class="key">二级预警：</span>
					<span class="value">（>80℃）</span>
				</div>
				<div class="item-video">
					<div class="item-video-single">
						<ocxVideo  :videoConfig="videoConfig"></ocxVideo>

					</div>
					<div class="item-video-single">
						<ocxVideo  :videoConfig="videoConfig1"></ocxVideo>
					</div>

				</div>
				<div class="item-charts">
					<div ref="charts" style="height: 240px"></div>
				</div>
			</el-aside>
			<el-main>
				<div class="block top" >
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">预警类型：</span>
						</el-col>
						<el-col :span="8">
							<span class="danger">趋近阈值</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">预警时间：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">09/17 10:08</span>
						</el-col>
					</el-row>

				</div>
				<div class="block center" >
					<div class="title">
						<span>电缆夹层一分区2防护区</span>
					</div>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">预警设备温度：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">37℃</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">预警环境温度：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">26.3℃</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">当前设备温度：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">31.5℃</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">当前环境温度：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">27.2℃</span>
						</el-col>
					</el-row>

				</div>
				<div class="block bottom" >
					<div class="title">
						<span>预警参数</span>
					</div>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">快速移动平均指数：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">27.5</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">一次平滑指数：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">26.8</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">平滑扩散指数：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">0.06</span>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="2"><span class="icon">●</span></el-col>
						<el-col :span="14">
							<span class="item">消抖标准差指数：</span>
						</el-col>
						<el-col :span="8">
							<span class="key">0.02</span>
						</el-col>
					</el-row>

				</div>
				<div class="btn-group">
					<div class="btn isOk">
						确定

					</div>
					<div class="btn isNo">
						误报

					</div>
				</div>

			</el-main>
		</el-container>

	</div>
</template>
<script>
	import ocxVideo from '@/components/native/video/OcxVideo'
	export default {
		name: 'systemInfo',
		components: {
			ocxVideo,
		},
		props: {},
		data() {
			return {
				videoConfig: {
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '2|22.46.34.114:37782|admin:admin123|0',
					hideTool: true
				},
				videoConfig1: {
					isAutoPlay: true,
					serviceInfo: '1$22.46.34.114$6800$admin$admin',
					deviceInfo: '2|22.46.34.114:8001|admin:admin123|38',
					hideTool: true
				},

			}
		},
		computed: {},
		filters: {},
		watch: {},
		created() {},
		mounted() {
			this.registerMQTT()
			this.setCharts()
		},
		activited() {},
		update() {},
		beforeDestory() {},
		methods: {
			registerMQTT(){
                this.$_listen('firecontrolAllAlarm',(topic,msg,pack)=>{
                    let msgJson = JSON.parse(msg.toString());
                    // console.log(msgJson);
                    if(msgJson.cmd === '3002'){ //报警的上传数据
                        this.$emit('receiveAlarm','alarm-action',msgJson.unitid);
                    }
                })
            },
				/**
				 *绘制折线图
				 */

			setCharts(){
				const charts=this.$_echarts.init(this.$refs.charts)
				let option = {
					title: {
						text: '电缆夹层一分区2防护区-环境态势',
						textStyle:{
							color:'#fff'
						}
					},
					tooltip: {
						trigger: 'axis'
					},
					legend: {
						data:['设备温度','环境温度','预警'],
						textStyle:{
							color:'#fff'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						axisLine:{
							lineStyle: {
								color:"#fff"
							}
						},

						data: ['09:22','09:26','09:30','09:34','09:38','09:42','09:46','09:50','09:54','09:58','10:02','10:04','10:07','10:22']
					},
					yAxis: {
						type: 'value',
						color:'#fff',
						axisLine:{
							lineStyle: {
								color:"#fff"
							}
						},

						splitLine: {
							show: false
						},
					},
					series: [
						{
							name:'设备温度',
							type:'line',
							stack: '总量',
							data:[30, 20, 40, 26, 37, 26, 35,30, 20, 40, 26, 37, 26, 35]
						},
						{
							name:'环境温度',
							type:'line',
							stack: '总量',
							data:[20, 40, 30, 36, 27, 36, 25,30, 20, 40, 26, 37, 26, 35]
						},
						{
							name:'预警',
							type:'line',
							stack: '总量',
							data:[30, 20, 40, 26, 37, 26, 35,30, 20, 40, 26, 37, 26, 35]
						},

					]
				};
				charts.setOption(option)
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
	font-size = 14px
	.el-tag.el-tag--warning{
		border 1px solid #ff9900
	}
	.el-tag.el-tag--danger{
		border 1px solid #f56c6c
	}
	.el-tag{
		background none
		position: relative;
		top: -1px;
		margin 0 10px
	}
	.color-yellow{
		color #ff9900
	}
	.color-red{
		color #f56c6c
	}
		.font-size-16{
			font-size 16px
		}

	.systemInfo{
		font-size
		margin 20px 20px 0 20px
		.el-container{
			.el-aside{
				height 800px
				.item-title{
					font-size 16px
					margin-bottom 8px
					.key{
						color #86d4fb
					}
					.value{
						color #ff9900
					}

				}
				.item-title2{
					height 40px
					line-height 40px
					width 100%
					padding-left 20px
					background: rgba(54,105,134,0.1);
					border 1px solid #0a3565
					margin-bottom 10px
					.key{
						color #86d4fb

					}
					.value{
						color white
						margin-right 20px
					}
				}

				.item-video{
					height 400px
					.item-video-single{
						width 50%
						border 1px solid #0a3565
						height 400px
						float left
					}
				}
				.item-charts{
					margin-top 10px
					padding 20px
					background url("~@/assets/img/common/bg-border2.png")
					background-size:100% 100%
					-moz-background-size:100% 100%

					width 100%
					height 300px
				}
			}
			.el-main{
				margin-top 0
				.block{
					width 100%
					background url("~@/assets/img/common/bg-border4.png")
					margin-top 10px
					background-size:100% 100%
					-moz-background-size:100% 100%
					padding 16px
					.title{
						color white
						font-size 16px
						margin-bottom 16px
						margin-top 10px

					}
					.el-row{
						margin-bottom 20px
						.icon{
							color #19be6b
						}
						.item{
							color white
						}
						.key{
							color #86d4fb
						}
						.danger{
							color red
						}
					}

				}

				.top{
					height 100px
				}
				.center{
					height 242px
				}
				.bottom{
					height 348px
				}
				.btn-group{
					padding-left 10px
					.btn{
						height 30px
						line-height 30px
						text-align center
						width 120px
						border-radius 4px
						float left
						cursor pointer
					}
					.isOk{
						color white
						margin-right  30px
						border 1px solid #0a3565

						box-shadow 1px 1px  #00aaff
					}
					.isNo{
						color red
						border 1px solid darkred
						box-shadow 1px 1px  #f13b2b
					}


				}
			}
		}


	}

</style>
