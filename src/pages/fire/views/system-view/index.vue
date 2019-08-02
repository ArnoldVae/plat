<template>
  <div class="systemView">
    <el-container>
      <el-aside width="62%">
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
          <h2 class="elMain-top-title">接入情况:</h2>
          <div class="elMian-top-ele">
            <img src="@/assets/img/common/rcu-220kV.png" alt />
            <p>变电站</p>
          </div>
          <div class="elMain-top-count">
            <p class="color-dark-yellow font-time">{{this.eleCount.length}}</p>
            <p class="color-white">总</p>
          </div>
          <div class="elMain-top-btn">
            <div class="elMain-top-btnone">
              <span class="font-time">{{this.eleCount.length}}</span>
            </div>已接入
          </div>
        </div>
        <div class="elMain-bottom">
          <div class="elMain-bottom-Item">
            <div class="elMain-bottom-title">灭火装置:</div>
            <el-row>
              <el-col :span="12" v-for="(i,index) in fireList" :key="index">
                <div class="elMain-bottom-Item-single">
                  <div class="left">
                    <div>
                      <img
                        v-show="i.SubSystemID=='90010016'"
                        src="../../assets/img/sys/90010016.png"
                        width="20px"
                        alt
                      />
                      <img
                        v-show="i.SubSystemID=='90010001'"
                        src="../../assets/img/sys/90010001.png"
                        width="30px"
                        alt
                      />
                      <img
                        v-show="i.SubSystemID=='90010019'"
                        src="../../assets/img/sys/90010019.png"
                        width="30px"
                        alt
                      />
                      <img
                        v-show="i.SubSystemID=='90010018'"
                        src="../../assets/img/sys/90010018.png"
                        width="30px"
                        alt
                      />
                      <img
                        v-show="i.SubSystemID=='90010014'"
                        src="../../assets/img/sys/90010014.png"
                        width="30px"
                        alt
                      />
                      <img
                        v-show="i.SubSystemID=='90010011'"
                        src="../../assets/img/sys/90010011.png"
                        width="30px"
                        alt
                      />
                      <img
                        v-show="i.SubSystemID=='90010017'"
                        src="../../assets/img/sys/90010017.png"
                        width="30px"
                        alt
                      />
                    </div>
                    {{i.vcName}}
                  </div>
                  <div class="right">
                    <div class="r1">
                      <div class="r1-btn">
                        <span class="font-time color-light-green">{{i.totalCount}}</span>
                      </div>设备数
                    </div>
                    <div class="r1">
                      <div class="r1-btn">
                        <span class="color-red font-time">{{i.alarmCount}}</span>
                      </div>异常数
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="elMain-footer">
          <div class="elMain-footer-title">
            <span>实时报警:</span>
            <div class="elMain-footer-btn1">
              <span>报警</span>
            </div>
            <div class="elMain-footer-btn2">
              <span>预警</span>
            </div>
          </div>
          <div class="elMain-footer-sysItems">
            <div
              class="system-item"
              :class="[index>0? 'elMain-footer-bg2':'elMain-footer-bg1']"
              v-for="(item,index) in sysLists"
              :key="index"
               @click="clickBtn(item)"
            >
              <ul>
                <li class="itemDetails">
                  <span class="color-red">●</span>
                  <span class="color-white">{{item.name1}}</span>
                </li>
                <li class="itemDetails">
                  <span class="color-red">●</span>
                  <span class="color-white">{{item.name2}}</span>
                </li>
                <li class="itemDetails">
                  <span class="color-red">●</span>
                  <span class="color-white">{{item.name3}}</span>
                </li>
                <li class="itemDetails">
                  <span class="color-red">●</span>
                  <span class="color-white">{{item.name4}}</span>
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
// 地图使用的指令
import { center } from '@/directives/directive.js'
import mapComponent from '@/components/native/mapComponent/mapComponent'

export default {
	name: 'systemView',
	components: {
		mapComponent
	},
	props: {},

	data() {
		return {
			defaultMapConfig: {
				center: { lng: 118.79288, lat: 31.88029 },
				zoom: 10,
				scrollWheelZoom: true,
				minZoom: 8,
				maxZoom: 15
			},
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
			sysLists: [
				{
					name1: '500kv东善桥变电站',
					name2: '26#烟感探测器报警',
					name3: '1号主变防护区',
          name4: '2019-07-30 14:20:30',
          name5:'alarm-action'
				},
				{
					name1: '500kv东善桥变电站',
					name2: '26#烟感探测器报警',
					name3: '1号主变防护区',
          name4: '2019-07-30 14:20:30',
          name5:'alarm-action'
				},
				{
					name1: '500kv东善桥变电站',
					name2: '26#烟感探测器报警',
					name3: '1号主变防护区',
          name4: '2019-07-30 14:20:30',
          name5:'alarm-action'
				},
				{
					name1: '500kv东善桥变电站',
					name2: '26#烟感探测器报警',
					name3: '1号主变防护区',
          name4: '2019-07-30 14:20:30',
          name5:'alarm-action'
				}
			],
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
			eleCount: [] //获取消防模块接口下面的所有变电站
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {
		this.getFireItem()
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
				console.log(result)
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
			let result = await this.$_api.systemView.getAllStation({
				iType: 10060003
			})
			if (result.success) this.eleCount = result.data
		},

		// val为点击地图传过来的数据  跳转状态监视
		clickRcuImg(val) {
      this.$emit('transfer', val)
    },
  //跳转报警联动
    clickBtn(val){
      this.$emit('switchWarning',val)
    },

		registerMQTT() {
			this.$_listen('firecontrolAllAlarm', (topic, msg, pack) => {
				let msgJson = JSON.parse(msg.toString())
				console.log(msgJson)
				if (msgJson.cmd === '1002') {
					//报警的上传数据
					console.log(msgJson.unitid)

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
		center
	}
}
</script>

<style lang="stylus">
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
  background: url('../../assets/img/system-view/预警图例ffd36a.png');
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.elMain-footer-bg2 {
  background: url('../../assets/img/system-view/报警图例fe0000.png');
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
.rich .rich-badge {
  top: 6px;
  left: 65%;
}

.systemView {
  margin: 0.88889rem 0.88889rem 0 0.88889rem;
  height: 100%;
  width: 98%;
  background: url('../../assets/img/hull.png');
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;

  .el-container {
    padding-top: 16px;
    height: 826px;
    width: 94%;
    position: relative;
    left: 3%;
    top: 3%;

    .el-aside {
      .map {
        margin-top: 10px;
        margin-left: 5px;
        width: 98.9%;
        height: 775px;
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
          z-index: 999;
          position: absolute;
          bottom: -7px;
          right: 1px;
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
        background-color: #fff;
        width: 100%;
        background: url('../../assets/img/system-view/变电站统计bg.png');
        background-size: 100% 100%;
        height: 100px;
        overflow: hidden;

        .elMian-top-ele {
          width: 80px;
          height: 50%;
          margin-left: 50px;
          float: left;
          margin-top: -5px;
          >img{
            width 70px
            height 70px
          }
          >p {
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
          margin-left: 160px;
        }

        .elMain-top-title {
          color: white;
          height: 26px;
          line-height: 26px;
          font-size: 16px;
          padding-left: 24px;
        }

        .elMain-top-btn {
          width: 80px;
          height: 100%;
          float: left;
          margin-top: 15px;
          margin-left: 120px;
          color: #fff;
          text-align: center;

          .elMain-top-btnone {
            text-align: center;
            background: url('../../assets/img/system-view/已接入bg.png');
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
            margin-bottom: 5px;

            >span {
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
        width: 100%;
        margin-top: 1%;
        background: url('../../assets/img/system-view/设备统计bg.png');
        background-size: 100% 100%;
        height: 260px;

        .elMain-bottom-Item {
          height: 250px;
          overflow: auto;
          margin-top: 10px;
          margin-left: 24px;
          color: white;
          font-size: 16px;

          .elMain-bottom-title {
            width: 280px;
            height: 40px;
            color: #fff;
            line-height: 40px;
          }

          .elMain-bottom-Item-single {
            margin-bottom: 6px;
            height: 100px;
            width: 280px;
            padding-bottom: 4px;
            background: url('../../assets/img/system-view/设备统计背景框.png');
            background-size: 100% 100%;

            .left {
              height: 99px;
              width: 72px;
              text-align: center;
              float: left;
              padding-top: 8px;
              margin-left: 7px;

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
                width: 80px;
                float: left;
                text-align: center;

                .r1-btn {
                  width: 80px;
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
        width: 100%;
        margin-top: 1%;
        background: url('../../assets/img/system-view/实时报警bg.png');
        background-size: 100% 100%;
        height: 405px;

        .elMain-footer-title {
          height: 50px;
          width: 100%;
          color: #fff;
          line-height: 50px;
          font-size: 16px;
          text-indent: 20px;
          margin-bottom: 20px;

          >span {
            float: left;
            width: 200px;
            height: 50px;
            margin-top: 6px;
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
            cursor: pointer;
            background: url('../../assets/img/system-view/报警图例fe0000.png');
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
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
            cursor:pointer;
            background: url('../../assets/img/system-view/预警图例ffd36a.png');
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
          }
        }

        .elMain-footer-sysItems {
          width: 100%;
          height: 320px;
          overflow: auto;

          .system-item {
            width: 90%;
            height: 100px;
            margin-left: 30px;
            margin-bottom: 10px;
            cursor: pointer;

            >ul {
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
