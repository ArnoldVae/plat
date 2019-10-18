<template>
	<div class="mapContanier">
		<baidu-map class="map" v-bind="defaultMapConfig" @ready="mapSuccess">
			<!-- 有角标版本 -->
			<bm-rich-marker
				@click="markerClick({ $event, item })"
				v-bind="item"
				v-for="item in markerList"
				:key="item.unitId"
			></bm-rich-marker>

			<!-- 无角标版本 -->
			<!--  <bm-overlay
        @click="markerClick({$event, item})"
        v-bind="item"
        v-for="item in markerList"
        :key="item.unitId"
      >
        <div class="rich">
          <div
            class="rich-icon"
            :style="{
                    backgroundImage: 'url(' + item.url+ ')',
                    height: convertPxToRem(item.size.height),
                    width: convertPxToRem(item.size.width)
                  }"
          ></div>
          <div class="rich-label">
            <div v-center v-text="item.label"></div>
          </div>
        </div>
      </bm-overlay>-->
		</baidu-map>
		<!-- 搜索站点悬浮框 -->
		<div class="search-ctn">
			<div class="selectOrg">
				<el-select v-model="value" placeholder="请选择运维班" @change="selectOrg">
					<el-option
						v-for="item in orgOptions"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</div>
			<div class="selectRcu">
				<el-input v-model="rcuName" placeholder="请输入变电站" @change="inputSearch">
					<i slot="suffix" class="el-icon-search" @click="inputSearch"></i>
				</el-input>
			</div>
			<div class="selectLevel">
				<span
					v-for="(item, index) in levelArr"
					:key="item.iVoltagelevelId"
					@click="selectLevel(item.iVoltagelevelId, index)"
					:class="selectLevelIdx === index ? 'levelSpanActive' : ''"
					>{{ item.voltagelevelName }}</span
				>
			</div>
			<div class="rcuTable">
				<div class="thBox">
					<div class="td1">运维班</div>
					<div class="td2">变电站</div>
					<div class="td3">操作</div>
				</div>
				<div class="tableBox">
					<table style="border-collapse:collapse;">
						<tbody v-if="!noRcuSow">
							<tr
								:class="idx % 2 == 0 ? 'tabEven' : ''"
								v-for="(item, idx) in tableData"
								:key="item.unitId"
							>
								<td class="td1">{{ item.orgName }}</td>
								<td class="td2">{{ item.vcName }}</td>
								<td class="td3">
									<i class="el-icon-location" @click="location(item)"></i>
								</td>
							</tr>
						</tbody>
						<div class="noRcuSow" v-if="noRcuSow">无匹配变电站</div>
					</table>
				</div>
			</div>
		</div>
		<div class="legend">
			<h3>图例</h3>
			<div>
				<img src="@/assets/img/common/rcu-500kV.png" alt />
				<span>500kV变电站</span>
			</div>
			<div>
				<img src="@/assets/img/common/rcu-220kV.png" alt />
				<span>220kV变电站</span>
			</div>
			<div>
				<img src="@/assets/img/common/rcu-110kV.png" alt />
				<span>110kV变电站</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		moduleNames: {
			type: String,
			required: true
		},
		javainterface: {
			//不同的模块调用不同的java接口用
			type: Object,
			require: false,
			default() {
				return {
					allStation: {},
					allOrg: {}
				}
			}
		}
	},
	data() {
		return {
			selectLevelIdx: -1,
			// 地图相关数据
			rcu35: require('@/assets/img/common/rcu-35kV.png'),
			rcu110: require('@/assets/img/common/rcu-110kV.png'),
			rcu220: require('@/assets/img/common/rcu-220kV.png'),
			rcu500: require('@/assets/img/common/rcu-500kV.png'),
			rcu1000: require('@/assets/img/common/rcu-1000kV.png'),
			rcu35Alarm: require('@/assets/img/common/rcu-35kV.gif'),
			rcu110Alarm: require('@/assets/img/common/rcu-110kV.gif'),
			rcu220Alarm: require('@/assets/img/common/rcu-220kV.gif'),
			rcu500Alarm: require('@/assets/img/common/rcu-500kV.gif'),
			rcu1000Alarm: require('@/assets/img/common/rcu-1000kV.gif'),
			defaultMapConfig: {
				center: { lng: 118.7929, lat: 31.8803 },
				zoom: 12,
				scrollWheelZoom: true,
				minZoom: 8,
				maxZoom: 15,
				viewportPoints: []
			},
			arr: [10, 20],
			markerList: [],
			// 运维班下拉框
			value: '',
			orgOptions: [],
			// 变电站输入框
			rcuName: '',
			juggleRcuParam: '',
			rcuId: [],
			// 电压等级数据
			levelArr: [],
			level: '',
			// 表格数据
			tableData: [],
			noRcuSow: false,
			// 订阅topic 测试数据
			topicArr: ['qif/zf/app/']
		}
	},
	methods: {
		mapSuccess() {
			// 地图数据
			if (this.moduleNames === 'fireMap') {
				this.init2()
			} else {
				this.init()
				this.$_api[this.moduleNames]
					.getRcu({ unitId: '' })
					.then(res => {
						if (res.success) {
							this.markerList = []
							this.defaultMapConfig.viewportPoints = []
							res.data.forEach(item => {
								if (item.dMapx !== 0 && item.dMapy !== 0 && !!item.dMapx && !!item.dMapx) {
									this.defaultMapConfig.viewportPoints.push({
										lng: item.dMapx,
										lat: item.dMapy
									})

									// 有角标版本
									let nums = ''
									if( item.alarmNum > 99 ) {
										nums = '99+'
									} else {
										nums = item.alarmNum
									}
									this.markerList.push({
										position: { lng: item.dMapx, lat: item.dMapy },
										label: item.vcName,
										dragging: false,
										id: item.unitId,
										icon: {
											url: this.rcuJuggle(item.iVoltageLevelId, item.isAlarm),
											size: {
												width: 70,
												height: 55
											}
										},
										badge: nums,
										isAlarm: item.isAlarm,
										level: item.iVoltageLevelId
									})
								}
							})
						}
					})
					.catch(error => {
						console.log(error)
					})
			}
		},
		// 点击变电站图标
		markerClick(e) {
			this.$emit('clickRcuImg', e.item)
		},
		rcuJuggle(level, isAlarm) {
			if (level === '10010009') {
				if (isAlarm === 1) {
					return this.rcu500Alarm
				} else {
					return this.rcu500
				}
			} else if (level === '10010007') {
				if (isAlarm === 1) {
					return this.rcu220Alarm
				} else {
					return this.rcu220
				}
			} else if (level === '10010005') {
				if (isAlarm === 1) {
					return this.rcu35Alarm
				} else {
					return this.rcu35
				}
			} else if (level === '10010006') {
				if (isAlarm === 1) {
					return this.rcu110Alarm
				} else {
					return this.rcu110
				}
			} else if (level === '10010011') {
				if (isAlarm === 1) {
					return this.rcu1000Alarm
				} else {
					return this.rcu1000
				}
			}
		},
		// 转换为rem
		convertPxToRem(px) {
			return `${px / 20.5}rem`
		},
		// 选择运维班下拉框并查询
		selectOrg(val) {
			this.value = val
			// this.getRcuId(this.rcuName);
			this.comfirmParams()
		},
		// 变电站搜索图标点击
		inputSearch() {
			// this.getRcuId(this.rcuName);
			this.comfirmParams()
		},
		// 地图悬浮框电压等级按钮并查询
		selectLevel(level, idx) {
			this.selectLevelIdx = idx
			this.level = level
			this.comfirmParams()
		},
		// 变电站名称字母和汉字传不同的参数，再调用接口查询
		comfirmParams() {
			let reg = /[a-zA-Z]/i
			let params = {
				orgId: this.value,
				iVoltageLevelId: this.level
			}
			//消防入口需添加入参iType临时处理 by：lixuefei
			if (this.moduleNames === 'fireMap') {
				params.iType = 10060003
			}
			if (reg.test(this.rcuName)) {
				params.vcNamePy = this.rcuName
			} else {
				params.vcName = this.rcuName
			}
			this.doSearch(params)
		},
		// 根据条件筛选变电站
		doSearch(param) {
			this.$_api[this.moduleNames]
				.getRcu(param)
				.then(res => {
					if (res.success) {
						if (res.data.length !== 0) {
							this.noRcuSow = false
							this.tableData = res.data
						} else {
							this.noRcuSow = true
						}
					} else {
						console.log(res.msg)
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		doSearch2() {
			let allStation = this.javainterface.allStation
			this.$_api[allStation.subModuleName]
				[allStation.interfaceName](allStation.param)
				.then(res => {
					if (res.success) {
						if (res.data.length !== 0) {
							this.noRcuSow = false
							this.tableData = res.data
						} else {
							this.noRcuSow = true
						}
					} else {
						console.log(res.msg)
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		// 表格定位
		location(item) {
			this.defaultMapConfig.zoom = 15
			this.defaultMapConfig.center = {
				lng: item.dMapx,
				lat: item.dMapy
			}
		},
		subscribe(topicArr) {
			if (true) {
				this.$_mqtt.unsubscribe(topicArr, err => {
					if (err) {
						console.log('取消MQTT订阅失败')
					} else {
						console.log('取消MQTT订阅成功')
						this.$_mqtt.subscribe(topicArr, err => {
							if (err) {
								console.log('订阅失败!')
							} else {
								console.log('订阅成功!')
							}
						})
					}
				})
			} else {
				console.log('MQTT连接失败')
			}
		},
		init() {
			// 请求电压等级数据
			this.$_api[this.moduleNames]
				.getLevel()
				.then(res => {
					if (res.success) {
						this.levelArr = res.data
					} else {
						console.log(res.msg)
					}
				})
				.catch(error => {
					console.log(error)
				})

			// 请求运维班数据
			this.$_api[this.moduleNames]
				.getOrg()
				.then(res => {
					if (res.success) {
						res.data.forEach(item => {
							item.value = item.orgId
							item.label = item.orgName
						})
						res.data.unshift({
							value: '',
							label: '全部'
						})
						this.orgOptions = res.data
					} else {
						console.log(res.msg)
					}
				})
				.catch(error => {
					console.log(error)
				})

			// 页面加载默认查询全部运维班下的所有变电站
			this.doSearch({
				orgId: ''
			})
			// this.mapSuccess()
		},
		changeAlarmNum(stationid) {
			//  this.markerList[0].isAlarm = 1;
			// this.markerList[0].badge++;
			// console.log(stationid);
			this.markerList.map((item, index, arr) => {
				if (item.id === stationid) {
					// item.badge++
					if (parseInt(item.isAlarm) === 0) {
						item.isAlarm = 1
						let imgUrl = this.rcuJuggle(item.level, 1)
						item.icon.url = imgUrl
					}
					item.badge++
				}
			})
		},
		init2() {
			//调用接口
			//地图上站点请求
			let allStation = this.javainterface.allStation
			this.$_api[allStation.subModuleName][allStation.interfaceName](allStation.param).then(res => {
				if (res.success) {
					this.markerList = []
					this.defaultMapConfig.viewportPoints = []
					console.log(res.data);
					res.data.forEach(item => {
						
						if (item.dMapx !== 0 && item.dMapy !== 0 && !!item.dMapx && !!item.dMapx) {
							this.defaultMapConfig.viewportPoints.push({
								lng: item.dMapx,
								lat: item.dMapy
							})

							// 有角标版本
							this.markerList.push({
								position: { lng: item.dMapx, lat: item.dMapy },
								label: item.vcName,
								dragging: false,
								id: item.unitId,
								icon: {
									url: this.rcuJuggle(item.iVoltageLevelId, parseInt(item.isAlarm)),
									size: {
										width: 70,
										height: 55
									}
								},
								badge: parseInt(item.alarmNum),
								isAlarm: item.isAlarm,
								level: item.iVoltageLevelId
							})
						}
					})
				}
			})
			this.doSearch2()

			this.$_api[this.moduleNames]
				.getOrg({ iType: 10060003 })
				.then(res => {
					if (res.success) {
						res.data.forEach(item => {
							item.value = item.orgId
							item.label = item.orgName
						})
						res.data.unshift({
							value: '',
							label: '全部'
						})
						this.orgOptions = res.data
					} else {
						console.log(res.msg)
					}
				})
				.catch(error => {
					console.log(error)
				})

			// this.mapSuccess();
		}
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
	},
	mounted() {
		console.log(this.javainterface)
		// this.init2()
		// this.init()
		//  mqtt数据推送
		// this.subscribe(this.topicArr);
		// this.$_mqtt.on('message', (topic, message, packet) => {
		// 	let data = ''
		// 	let dataArr = [];
		//   dataArr = message;
		// 	dataArr.forEach(item => {
		// 		//将推送的报文转码
		// 		data = data + String.fromCharCode(item)
		//   })
		//   //如果推送上来的数据的topic和订阅的topic一致
		// 	// if (topic == this.topicStr) {
		//     // let msgData = JSON.parse(data);
		//     // this.markerList.forEach(item => {
		//     //   if(msgData.unitid === item.id){
		//     //     this.$set(item,'isAlarm',msgData.isAlarm);
		//     //     this.$set(item,'badge',msgData.num);
		//     //     // this.rcuJuggle(item.level,item.isAlarm);
		//     //   }
		//     // });
		//     // console.log(this.markerList);
		//   // }
		// })
	}
}
</script>

<style lang="stylus">
// 下拉选择样式修改
.el-input__inner {
  background-color: rgba(9, 32, 47, 0.6);
  border-color: #0d7ec5;
  color: #45adf7;
  border-radius: 2px;
  height: 34px;
  line-height: 34px;
}

// select 下拉面板样式修改
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

// 滚动条样式修改
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

// 修改角标样式
.rich .rich-badge {
  top: 6px;
  left: 61%;
  background-color: #902020;
}

.mapContanier {
  width: 100%;
  height: 100%;
  position: relative;

  .map {
    width: 100%;
    height: 100%;

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
  }

  .search-ctn {
    position: absolute;
    width: 260px;
    height: 352px;
    right: 14px;
    top: 12px;
    border: 2px solid #0d7ec5;
    background: rgba(54, 105, 134, 0.2);
    padding: 8px 3px 10px 13px;

    .selectOrg {
      width: 100%;
      margin-bottom: 20px;

      // 下拉选择样式修改
      .el-select {
        width: 231px;
      }

      .el-select .el-input .el-select__caret {
        color: #5ac9ff;
      }

      .el-input__icon {
        line-height: 32px;
        width: 20px;
      }

      .el-select .el-input .el-select__caret {
        font-size: 16px;
      }

      .el-input__inner:hover {
        border-color: #4ba5de;
      }
    }

    .selectRcu {
      width: 232px;
      color: #45adf7;
      margin-bottom: 20px;

      .el-input__prefix, .el-input__suffix {
        color: #009dff;
        font-size: 18px;
        line-height: 34px;
        font-weight: 700;
      }

      .el-input__inner:hover {
        border-color: #4ba5de;
      }

      .el-input__icon {
        line-height: 34px;
        color: #33a6e1;
      }
    }

    .selectLevel {
      width: 232px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: row;
      // justify-content: space-between;
      justify-content: flex-start;

      span {
        display: inline-block;
        width: 50px;
        height: 30px;
        line-height: 30px;
        color: #45ade8;
        margin-right: 10px;
        text-align: center;
        background-color: rgba(9, 32, 47, 0.6);
        border: 2px solid #3076a2;
        color: #45adf7;
        border-radius: 2px;
        cursor: pointer;
      }

      .levelSpanActive {
        border-color: #1199f1;
        background-color: rgba(9, 32, 47, 1);
      }
    }

    .rcuTable {
      width: 232px;
      height: 175px;
      border: 1px solid #206794;

      .thBox {
        width: 100%;
        height: 26px;
        line-height: 26px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        color: #49b6fa;
        font-size: 15px;
        background-color: rgba(7, 36, 63, 0.6);

        .td1 {
          width: 90px;
          text-align: center;
        }

        .td2 {
          width: 104px;
          text-align: center;
        }

        .td3 {
          width: calc(100% - 194px);
          text-align: center;
        }
      }

      .tableBox {
        width: 100%;
        height: calc(100% - 26px);
        overflow: auto;

        table {
          width: 100%;

          tr {
            width: 100%;
            height: 26px;
            line-height: 26px;
            background-color: rgba(7, 34, 60, 0.5);
            color: #5ba0e3;

            .td1 {
              width: 90px;
              text-align: center;
            }

            .td2 {
              width: 104px;
              text-align: center;
            }

            .td3 {
              width: calc(100% - 194px);
              text-align: center;
              cursor: pointer;
            }
          }

          .tabEven {
            background-color: rgba(7, 34, 60, 0.9);
          }

          .noRcuSow {
            color: #49b6fa;
            font-size: 16px;
            background-color: rgba(10, 16, 44, 0.5);
            text-align: center;
            height: 60px;
            line-height: 60px;
          }
        }
      }
    }
  }

  .legend {
    position: absolute;
    width: 240px;
    height: 230px;
    right: 14px;
    bottom: 12px;
    border: 2px solid #0d7ec5;
    background: rgba(54, 105, 134, 0.2);
    padding: 8px 3px 10px 13px;

    h3 {
      color: #fff;
      font-size: 20px;
    }

    >div {
      display: flex;
      justify-content: space-around;
      align-items: center;

      >img {
        width: 80px;
        height: 64px;
      }

      >span {
        color: #fff;
      }
    }
  }
}
</style>
