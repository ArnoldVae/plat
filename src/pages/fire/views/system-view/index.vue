<template>
	<div :class="[pageType ? 'newSystemView' : '', 'systemView']">
		<el-container>
			<el-aside width="66%">
				<div class="map">
					<div class="border-lt"></div>
					<div class="border-rb"></div>
					<div class="mapBox">
						<mapComponent
							ref="map"
							@clickRcuImg="clickRcuImg"
							:moduleNames="'fireMap'"
							:javainterface="javainterface"
						></mapComponent>
					</div>
				</div>
			</el-aside>
			<el-main>
				<div class="elMain-top">
					<div v-if="systemType" class="elMain-top-top">
						<img src="../../assets/img/main/lan.png" alt />
					</div>
					<h2 class="elMain-top-title fff">接入情况:</h2>
					<div class="elMian-top-ele">
						<img src="@/assets/img/common/rcu-220kV.png" alt />
						<p>变电站</p>
					</div>
					<div class="elMain-top-count">
						<p class="color-dark-yellow font-time text-align-center">{{ this.allEleCount }}</p>
						<p class="color-white text-align-center">总</p>
					</div>
					<div class="elMain-top-btn">
						<div class="elMain-top-btnone">
							<span class="font-time">{{ this.eleCount }}</span>
						</div>
						已接入
					</div>
				</div>
				<div class="elMain-bottom">
					<div v-if="systemType" class="elMain-top-top">
						<img src="../../assets/img/main/lan.png" alt />
					</div>
					<div class="elMain-bottom-title" :class="[systemType ? 'black' : 'fff']">灭火装置:</div>
					<div class="elMain-bottom-Item">

						<el-row>
							<el-col :span="12" v-for="(i, index) in fireList" :key="index">
								<div class="elMain-bottom-Item-single">
									<div class="left">
										<div>
											<img
												v-show="i.SubSystemID == '90010016'"
												src="../../assets/img/sys/90010016.png"
												width="20px"
												alt
											/>
											<img
												v-show="i.SubSystemID == '90010001'"
												src="../../assets/img/sys/90010001.png"
												width="30px"
												alt
											/>
											<img
												v-show="i.SubSystemID == '90010019'"
												src="../../assets/img/sys/90010019.png"
												width="30px"
												alt
											/>
											<img
												v-show="i.SubSystemID == '90010018'"
												src="../../assets/img/sys/90010018.png"
												width="30px"
												alt
											/>
											<img
												v-show="i.SubSystemID == '90010014'"
												src="../../assets/img/sys/90010014.png"
												width="30px"
												alt
											/>
											<img
												v-show="i.SubSystemID == '90010011'"
												src="../../assets/img/sys/90010011.png"
												width="30px"
												alt
											/>
											<img
												v-show="i.SubSystemID == '90010017'"
												src="../../assets/img/sys/90010017.png"
												width="30px"
												alt
											/>
										</div>
										<span style="color: white">{{ i.vcName }}</span>
									</div>
									<div class="right">
										<div class="r1">
											<div class="r1-btn">
												<span class="font-time color-light-green">{{ i.totalCount }}</span>
											</div>
											<span class="r1-span">设备数</span>
										</div>
										<div class="r1">
											<div class="r1-btn">
												<span class="color-red font-time">{{ i.alarmCount }}</span>
											</div>
											<span class="r1-span">异常数</span>
										</div>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="elMain-footer">
					<div v-if="systemType" class="elMain-top-top">
						<img src="../../assets/img/main/lan.png" alt />
					</div>
					<!--<div class="elMain-footer-title">-->
					<!--<span >实时报警:</span>-->
					<!--<div class="elMain-footer-btn1">-->
					<!--<span @click="test()">报警</span>-->
					<!--</div>-->
					<!--<div class="elMain-footer-btn2">-->
					<!--<span>预警</span>-->
					<!--</div>-->
					<!--</div>-->
					<div class="elMain-footer-title" :class="[systemType ? 'black' : 'fff']">
						实时报警:
					</div>
					<!--<div class="elMain-footer-title2">-->
					<!--<div class="elMain-footer-btn1">-->
					<!--<span>报警</span>-->
					<!--</div>-->
					<!--<div class="elMain-footer-btn2">-->
					<!--<span>预警</span>-->
					<!--</div>-->
					<!--</div>-->
					<div class="elMain-footer-sysItems">
						<div
							class="system-item"
							:class="[index > -1 ? 'elMain-footer-bg2' : 'elMain-footer-bg1']"
							v-for="(item, index) in sysLists"
							:key="index"
							@click="clickBtn(item)"
						>
							<ul>
								<li class="itemDetails">
									<span class="color-red">●</span>
									<span class="color-white">{{ item.unitName }}</span>
								</li>
								<li class="itemDetails">
									<span class="color-red">●</span>
									<span class="color-white">{{ item.devName }}</span>
								</li>
								<li class="itemDetails">
									<span class="color-red">●</span>
									<span class="color-white">{{ item.areaName }}</span>
								</li>
								<li class="itemDetails">
									<span class="color-red">●</span>
									<span class="color-white">{{ item.time }}</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import mapComponent from '@/components/native/mapComponent/mapComponent'
import moment from 'moment'

export default {
	name: 'systemView',
	components: {
		mapComponent
	},
	props: {
		pageType: {
			type: String
		}
	},

	data() {
		return {
			defaultMapConfig: {
				center: { lng: 118.79288, lat: 31.88029 },
				zoom: 10,
				scrollWheelZoom: true,
				minZoom: 8,
				maxZoom: 15
			},
			systemType: this.pageType,
			// 地图相关数据
			rcu35: require('@/assets/img/common/rcu-35kV.png'),
			rcu110: require('@/assets/img/common/rcu-110kV.png'),
			rcu220: require('@/assets/img/common/rcu-220kV.png'),
			rcu500: require('@/assets/img/common/rcu-500kV.png'),
			paraData: [
				{
					id: 'test0',
					title: '站点',
					describe: '站点统计',
					color1: 'color-yellow',
					detail: [
						{ value: 68, name: '在线', class: 'color-yellow shape-icon' },
						{ value: 2, name: '离线', class: 'color-blue shape-icon' }
					],
					color: ['#37a8f2', '#ffdf6f'] //手动设置每个图例的颜色
				},
				{
					id: 'test1',
					title: '警情',
					describe: '警情统计',
					detail: [
						{ value: 78, name: '预警', class: 'color-blue shape-icon' },
						{ value: 22, name: '报警', class: 'color-red shape-icon' }
					],
					color: ['#37a8f2', '#cf1322'] //手动设置每个图例的颜色
				},
				{
					id: 'test2',
					title: '设备',
					describe: '设备统计',
					detail: [
						{ value: 58, name: '正常', class: 'color-blue shape-icon' },
						{ value: 49, name: '故障', class: 'color-dark-yellow shape-icon' }
					],
					color: ['#37a8f2', '#e69110'] //手动设置每个图例的颜色
				},
				{
					id: 'test4',
					title: '缺陷',
					describe: '缺陷统计',
					detail: [
						{ value: 68, name: '一类', class: 'color-red shape-icon' },
						{ value: 30, name: '二类', class: 'color-dark-yellow shape-icon' },
						{ value: 90, name: '三类', class: 'color-yellow shape-icon' }
					],
					color: ['#cf1322', '#e69110', '#ffdf6f'] //手动设置每个图例的颜色
				}
			],
			options1: [
				{
					value: '选项1',
					label: '黄金糕'
				},
				{
					value: '选项2',
					label: '双皮奶'
				}
			],
			sysLists: [],
			orgOptions: [],
			fireList: [],
			value: '',
			levelArr: [],
			rcuName: '',
			tableData: [],
			noRcuSow: false,
			res: {},
			javainterface: {
				allStation: {
					subModuleName: 'systemView',
					interfaceName: 'getAllStation',
					param: { iType: 10060003 }
				}
			},
			eleCount: '', //获取消防模块接口下面的所有变电站
			allEleCount: ''
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {
		// this.getFireItem()
		this.getSubFireItem()
		this.registerMQTT()
		this.getAllStation() //已接入变电站
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		/**
		 *
		 *获取环形图
		 * parm：id传入unitI临时调试如果存在传入Id，如果不存在则为空
		 *
		 * */
		async getFireItem(id) {
			const getId = id ? id : ''
			let result = await this.$_api.systemView.getFireItem({
				unitId: getId,
				ubIdsStr: 10060003
			})
			if (result.success) {
				this.res = result.data
				let arr = [],
					paraObj = {}
				//给paraData渲染
				this.paraData.forEach((item, index) => {
					arr[arr.length - 1] = 'myChart' + index
					paraObj[arr[arr.length - 1]] = this.$_echarts.init(this.$refs[item.id][0])
					this.option.title.text = item.title
					this.option.color = item.color
					this.option.series[0].data = item.detail
					this.option.series[0].name = item.describe
					//站点渲染
					if (item.id.charAt(item.id.length - 1) == 0) {
						this.option.series[0].data[0].value = result.data.onLineCount
						this.option.series[0].data[1].value = result.data.offLineCount
					}
					//警情渲染
					if (item.id.charAt(item.id.length - 1) == 1) {
						this.option.series[0].data[0].value = result.data.earlyCount
						this.option.series[0].data[1].value = result.data.alarmCount
					}
					//设备渲染
					if (item.id.charAt(item.id.length - 1) == 2) {
						this.option.series[0].data[0].value = result.data.totalCount
						this.option.series[0].data[1].value = result.data.faultCount
					}
					paraObj[arr[arr.length - 1]].setOption(this.option)
				})
			}
		},
		async getSubFireItem() {
			let result = await this.$_api.systemView.getSubFireItem({
				unitId: '',
				// 'subIdsStr':'1007,1006',
				subIdsStr: '10060003'
			})
			if (result.success) {
				if (result.data.length > 0) {
					result.data.forEach(item => {
						item.url = '../../assets/img/sys/' + item.SubSystemID + '.png'
					})
				}
				this.fireList = result.data
			}
		},

		//获取消防模块接口下面的所有变电站
		async getAllStation() {
			let result = await this.$_api.systemView.getJR({
				iType: 10060003
			})
			if (result.success) {
				this.eleCount = result.data.count
				this.allEleCount = result.data.num
			}
		},

		// val为点击地图传过来的数据  跳转状态监视
		clickRcuImg(val) {

			this.$store.dispatch('updateUnitId', val.id)
			//用来切换端口为5200时的样式
			val.pageType = false
			setTimeout(() => {
				this.$emit('transfer', val)
			}, 100);
		},
		//跳转报警联动
		clickBtn(val) {
			this.$emit('switchWarning', val)
		},
		//            获取推送信息
		registerMQTT() {
			this.$_listen('firecontrolAllAlarm', (topic, msg, pack) => {
				// debugger

				let msgJson = JSON.parse(msg.toString())
				// console.log(msgJson)
				// debugger

				if (msgJson.cmd === '3002') {
					//报警的上传数据
					//                        日期格式化
					if (msgJson.level == '0') {
						this.sysLists.forEach((item, index) => {
							if (item.alarmid == msgJson.alarmid) {
								this.sysLists.splice(index, 1)
							}
						})
						return false
					}
					msgJson.time = moment(Number(msgJson.time) * 1000).format('YYYY-MM-DD hh:mm:ss')
					this.sysLists.unshift(msgJson)

					//右上角消防统计报警数增加
					this.paraData.map((item, index, arr) => {
						if (item.title === '警情') {
							item.detail.map((alarm, alarmIndex, arrTemp) => {
								if (alarm.name === '报警') {
									alarm.value++
								}
							})
						}
					})
					this.$refs.map.changeAlarmNum(msgJson.unitid)
					this.$emit('receiveAlarm', 'alarm-action', msgJson.unitid)
					if (this.pageType) {
						this.$store.dispatch('changeMenu', true)
						this.$emit('changeFlag', true)
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
	},
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
	}
}
</script>

<style lang="stylus">
	.text-align-center{
		text-align center
	}
.newystemview{
    background none
    padding 0 !important
    margin 0 !important
    width 100%

}
.fff{
    color #ffff
}
.black{
    color black
}
.shape-icon {
    font-size: 36px;
    margin-right: 10px;
    position: relative;
    top: 3px;
}

.color-light-green {
    color: #32e611;
}

.font-size-18 {
    font-size: 18px;
}

.color-dark-yellow {
    color: #ff9900;
}

.color-red {
    color: red;
}

.color-yellow {
    color: yellow;
}

.font-time {
    font-family: 'DS-DIGI';
}

.color-white {
    color: white;
}

.color-blue {
    color: #45adf7;
}

.elMain-footer-bg1 {
    background: url('../../assets/img/system-view/warning2.png');
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
}

.elMain-footer-bg2 {
    background: url('../../assets/img/system-view/warning.png');
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
}

.el-input__inner {
    background-color: rgba(9, 32, 47, 0.6);
    border-color: #0d7ec5;
    color: #45adf7;
    border-radius: 2px;
    height: 34px;
    line-height: 34px;
}

.el-select-dropdown__list {
    background-color: #1a587f;
}

.el-select-dropdown__item {
    color: #fff;
}

.el-select-dropdown {
    border: 1px solid #0d7ec5;
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
    background-color: #1f385c;
}

.el-popper[x-placement^=bottom] .popper__arrow::after {
    top: 0px;
    border-bottom-color: #0d7ec5;
}

::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
</style>
<style lang="stylus">
.backNone{
    background none !important
}

.rich .rich-badge {
    top: 6px;
    left: 65%;
}

.systemView {
    height: 100%;
    width: 100%;
    margin-left 0.88889rem
    background: url('~@/assets/img/common/bg-border.png') no-repeat;
    background-size: 83.6rem 40.88889rem;

    .el-container {
        padding-top: 16px;
        height :938px;
        position: relative;
        padding: 27px 56px 31px 50px;
		.el-aside {
            overflow inherit
            .map {
                width: 1180px;
                height: 865px;
                position: relative;
                cursor: pointer;

                .border-lt {
                    position: absolute;
                    top: -7px;
                    left: -7px;
                    width: 35px;
                    z-index 9
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
            }
        }

        .el-main {
            padding: 11px 0 0 0;

            .elMain-top {
				background: url('../../assets/img/system-view/bdz.png');
				background-size: 100% 100%;
                width: 94%;
				height 5rem;
                overflow: hidden;
                position relative
                .elMain-top-top{
                    position absolute
                    top 0
                    z-index 0
                }
                .elMain-top-top>img{
                    width:100%

                }

                .elMian-top-ele {
                    width: 80px;
                    height: 50%;
                    margin-left: 50px;
                    float: left;
                    margin-top: -5px;


                    > img {
                        width 70px
                        height 70px
                    }

                    > p {
                        color: #fff;
                        margin-top: -15px;
                        text-indent: 15px;
                    }
                }

                .elMain-top-count {
                    width: 80px;
                    height: 100%;
                    float: left;
                    margin-top: 15px;
                    margin-left: 5rem;
                }

                .elMain-top-title {
					height 1.5rem;
                    font-size: 0.65rem;
                    padding-left: 24px;
                    position relative
                    z-index 2
					top: 0.5rem
                }

                .elMain-top-btn {
                    width: 80px;
                    height: 100%;
                    float: left;
                    margin-top: 15px;
                    margin-left: 5rem;
                    color: #fff;
                    text-align: center;

                    .elMain-top-btnone {
                        text-align: center;
                        background: url('../../assets/img/system-view/已接入bg.png');
                        background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        margin-bottom: 5px;

                        > span {
                            color: #47b2fe;
                        }
                    }
                }
                .item {
                    width: 50%;
                    float: left;

                    .elMain-top-content {
                        height: 172px;
                        width: 50%;
                        float: left;
                    }

                    .elMain-top-contentDetail {
                        height: 172px;
                        line-height: 172px;

                        .elMain-top-contentDetail-span {
                            display: inline-block;
                            vertical-align: middle;
                            line-height: 22px;
                        }

                        width: 50%;
                        float: right;
                    }
                }
            }

            .elMain-bottom {
                background-color: #fff;
                width: 94%;
                margin-top: 1%;
                background: url('../../assets/img/system-view/设备统计bg.png');
                background-size: 100% 100%;
                height: 300px;
                position relative


                .elMain-top-top{
                    position absolute
                    top 0
                    z-index 0
                }
                .elMain-top-top>img{
                    width 100%
                }
				.elMain-bottom-title {
					font-size: 0.65rem;
					display inline-bloack
					margin 0 auto
					position relative
					z-index 1px
					top: 0.5rem;
					margin-left 1.06667rem
				}


                .elMain-bottom-Item {
                    height: 250px;
                    overflow: auto;
                    margin-top: 0px;
                    margin-left: 24px;


					.el-row{
						margin-top 1rem
					}

                    .elMain-bottom-Item-single {
                        margin-bottom: 6px;
                        height: 100px;
                        width: 240px;
                        padding-bottom: 4px;
                        background: url('../../assets/img/system-view/bg1.png');
                        background-size: 100% 100%;

                        .left {
                            height: 99px;
                            width: 64px;
                            text-align: center;
                            float: left;
                            padding-top: 8px;
                            margin-left: 7px;
                            font-size 14px

                            img {
                                margin: 4px 0 4px 0px;
                            }
                        }

                        .right {
                            padding: 20px 10px;
                            height: 80px;
                            float: left;

                            .r1 {
                                margin-right: 10px;
                                width: 64px;
                                float: left;
                                text-align: center;

                                .r1-span {
                                    margin-left 12px
                                    font-size 14px

                                    color white

                                }

                                .r1-btn {
                                    width: 64px;
                                    height: 32px;
                                    margin-left: 8px;
                                    line-height: 32px;
                                    background: url('../../assets/img/sys/rect.png');
                                    background-size: 100% 100%;
                                    -moz-background-size: 100% 100%;
                                    margin-bottom: 10px;
                                }
                            }
                        }
                    }
                }
            }

            .elMain-footer {
                background-color: #fff;
                width: 94%;
                margin-top: 1%;
                background: url('../../assets/img/system-view/实时报警bg.png');
                background-size: 100% 100%;
                height: 19rem;
                position relative;

                .elMain-top-top{
                        position absolute
                        top 0
                        z-index 0
                    }
                    .elMain-top-top>img{
                        width 100%
                    }

                .elMain-footer-title {
                    height: 50px;
                    width: 100%;
                    font-size: 0.65rem;
                    text-indent: 20px;
                    margin-bottom: 20px;
                    position relative
					top: 0.5rem;
                    z-index 1

                    > span {
                        float: left;
                        width: 200px;
                        height: 50px;
                        margin-top: 6px;
                    }
                }

                .elMain-footer-title2{
                    position relative
                    top 30px;
                }

                 .elMain-footer-btn1 {
                        float: right;
                        width: 80px;
                        height: 30px;
                        margin-right: 50px;
                        margin-top: 15px;
                        line-height: 30px;
                        text-indent: 25px;
                        color: #fe0000;
                        background: url('../../assets/img/system-view/w1.png');
                        background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        position relative
                        top -75px;

                    }

                    .elMain-footer-btn2 {
                        float: right;
                        width: 80px;
                        height: 30px;
                        margin-top: 15px;
                        line-height: 30px;
                        text-indent: 25px;
                        margin-right: 10px;
                        color: #ffd36a;
                        background: url('../../assets/img/system-view/w2.png');
                        background-size: 100% 100%;
                        -moz-background-size: 100% 100%;
                        position relative
                        top -75px;
                    }

                .elMain-footer-sysItems {
                    width: 100%;
                    height: 320px;
                    overflow: auto;
                    position relative
                    top -40px;

                    .system-item {
                        width: 90%;
                        height: 100px;
                        margin-left: 30px;
                        margin-bottom: 10px;
                        cursor: pointer;

                        > ul {
                            overflow: hidden;

                            .itemDetails {
                                width: 50%;
                                height: 50px;
                                line-height: 50px;
                                text-indent: 30px;
                                float: left;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
