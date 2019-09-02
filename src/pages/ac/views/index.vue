<template>
	<div class="intelligent">
		<div class="body">
			<!-- 变电站树区域 -->
			<div class="station">
				<el-filter-tree
					placeholder="输入关键字进行过滤"
					v-model="filterText"
					ref="elFilterTree"
					:data="data"
					:props="defaultProps"
					default-expand-all
					:filter-node-method="filterNode"
					highlight-current
					@node-click="handleClickNode"
					:current-node-key="$store.getters.unitId"
					node-key="id"
				></el-filter-tree>
			</div>
			<div class="container">
				<hor-menu
					:data="menuData"
					:currentSystemId="currentSystemId"
					@handleSelectSideMenu="handleSelectSideMenu"
					@handleGoBack="handleGoBack"
				></hor-menu>

				<div class="content">
					<!-- <transition name="fade" mode="out-in"> -->
					<div v-if="typeList.length != 1 && cardReset" class="card">
						<el-scrollbar v-if="typeList.length != 1">
							<div
								v-for="(item, index) in typeList"
								:key="item.devTypeId"
								@click="handleSelectCard(item, index)"
								class="card-item"
								:class="{ current: currentTypeId == item.devTypeId }"
							>
								<div class="line"></div>
								<div class="type">
									<!-- ~@ac/assets/img/device-type/空调-0.png -->
									<!-- <div 
										class="icon" 
										:style="{ background: `url( ${require(`@ac/assets/img/device-type/${'空调'}-${currentTypeId == item.devTypeId?1:0}.png`)} )` }"
									                  					></div> -->
									<div class="name">{{ item.vcName }}</div>
								</div>
								<div class="info">
									<div class="total">
										总：
										<span :style="{ color: '#44e908' }">{{ item.devCount }}</span>
									</div>
									<div class="alarm">
										报警：
										<span :style="{ color: '#ff291e' }">{{ item.alarmCount }}</span>
									</div>
									<div class="normal">
										故障：
										<span :style="{ color: '#ffa01e' }">0</span>
									</div>
								</div>
							</div>
						</el-scrollbar>
					</div>
					<!-- </transition> -->

					<!-- view 区域 -->
					<div class="router-view-wrap">
						<!-- <transition name="fade" mode="out-in"> -->
						<router-view
							@hook:mounted="initDisplayMode"
							ref="view"
							class="view"
							:class="{ full: typeList.length == 1 }"
						></router-view>
						<!-- </transition> -->
						<div class="style">
							<!-- v-if="currentModeList.length != 1" -->
							<a-button-group v-show="buttonGroupShow">
								<a-button
									v-for="(mode, index) in currentModeList"
									:key="mode.typeId"
									@click="handleChangeDisplayMode(mode, index)"
									:icon="mode.icon"
									:class="{ current: currentModeIndex == index }"
								></a-button>
							</a-button-group>
						</div>
					</div>
				</div>
			</div>
		</div>
		<statistics></statistics>
	</div>
</template>
<script>
export default {
	name: 'intelligent',
	components: {},
	props: {},
	data() {
		return {
			cardReset: true,
			filterText: '',
			topicArr: ['qif/zf/app/', 'qif/zf/app/control/'],
			topicStr1: '',
			topicStr2: '',
			unitId: this.$store.getters.unitId,
			data: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			typeList: [],
			deviceTypeMapList: [],
			currentModeList: [],
			currentSystemName: '',
			currentSystemId: null,
			currentTypeId: null,
			menuData: [
				{
					title: '在线监测',
					systemId: 1001
				},
				{
					title: '环境监测',
					systemId: 1002
				},
				{
					title: '灯光控制',
					systemId: 1004
				},
				{
					title: '安全防范',
					systemId: 1005
				},
				{
					title: '智能锁控',
					systemId: 1006
				},
				{
					title: '机器人巡检',
					systemId: 1008
				},
				{
					title: '视频系统',
					systemId: 1009
				},
				{
					title: '防盗报警',
					systemId: 2
				},
				{
					title: '消防报警',
					systemId: 4
				}
			],
			currentModeIndex: 0,
			rotation: null,
			buttonGroupShow: true,
			deviceInfoList: []
		}
	},
	computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	},
	filters: {},
	watch: {
		filterText(val) {
			this.$refs.elFilterTree.$refs['el-tree'].filter(val)
		},
		activeUnitId: {
			handler(val) {
				this.init()
				this.unitId = val
				this.topicStr1 = this.topicArr[0] + this.unitId
				this.topicStr2 = this.topicArr[1] + this.unitId
				let tArr = [this.topicStr1, this.topicStr2]
				this.subscribe(tArr)
			}
			// immediate: true
		},
		currentTypeId: {
			handler(val) {
				// this.getDeviceInfo()
			}
		}
	},
	created() {
		this.getOrganization()
		this.init()
	},
	mounted() {
		this.topicStr1 = this.topicArr[0] + this.unitId
		this.topicStr2 = this.topicArr[1] + this.unitId
		let tArr = [this.topicStr1, this.topicStr2]
		this.subscribe(tArr)
	},
	activited() {},
	update() {},
	beforeDestory() {
		clearInterval(this.rotation)
	},
	methods: {
		// 返回
		handleGoBack() {
			this.$router.push({ name: 'overview' })
		},
		// 重置设备类型渲染
		handleCardReset() {
			this.cardReset = false
			this.$nextTick(() => {
				this.cardReset = true
			})
		},
		// 获取设备类型映射
		async getDeviceTypeMap() {
			let { data } = await this.$_api.getStaticData('device-type-map.json')
			this.deviceTypeMapList = data
		},
		// 获取组织结构
		async getOrganization() {
			let result = await this.$_api.frame.getOrganization({
				iFlag: 1
			})
			if (result.success) {
				this.data = result.data
			} else {
				this.data = []
			}
		},
		// 获取子系统
		async getSubsystemByUnitId() {
			let result = await this.$_api.frame.getSubsystemByUnitId({
				unitId: this.$store.getters.unitId,
				type: 10060001
			})
			if (result.success) {
				this.menuData = result.data
			} else {
				this.menuData = []
			}
		},
		// 获取设备类型
		async getDeviceTypeBySubsystemId() {
			let result = await this.$_api.frame.getDeviceTypeBySubsystemId({
				subSystemId: this.currentSystemId,
				unitId: this.$store.getters.unitId
			})
			if (result.success) {
				this.typeList = result.data
			} else {
				this.typeList = []
			}

			// 重新计算滚动条
			this.handleCardReset()
		},
		// 获取所有设备信息
		async getDeviceInfo() {
			let result = await this.$_api.frame.getDeviceInfo({
				unitId: this.$store.getters.unitId,
				devTypeId: this.currentTypeId
			})
			// console.log('获取所有设备信息', result)
			if (result.success) {
				this.deviceInfoList = result.data.lists
			} else {
				this.deviceInfoList = []
			}
		},
		async init() {
			this.getDeviceTypeMap()
			await this.getDeviceTypeMap()
			await this.getSubsystemByUnitId()

			// 未查询到子系统，则清空设备类型
			if (this.menuData.length > 0) {
				this.buttonGroupShow = true
				this.$nextTick(() => {
					this.handleSelectSideMenu(this.menuData[0])
				})
			} else {
				this.typeList = []
				this.buttonGroupShow = false
				this.$router.push({ name: 'notFind' })
			}
		},
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},
		async handleSelectSideMenu(item) {
			this.currentSystemName = item.vcName
			this.currentSystemId = item.subSystemId

			// 更新 typeList
			await this.getDeviceTypeBySubsystemId()

			// 更新后默认选中第一个list路由
			this.handleSelectCard(this.typeList[0])
		},
		getRouterNameByMap(id) {
			let name = 'table'
			this.deviceTypeMapList.forEach(item => {
				if (item.typeId == id) name = item.name
			})
			return name
		},
		async handleSelectCard(item) {

			this.currentTypeId = item.devTypeId
			// await this.getDeviceInfo()

			this.$router.push({ name: this.getRouterNameByMap(item.devTypeId) })

			// 更新当前路由下得显示类型列表
			this.currentModeList = this.getDisplayModeBytypeId(item.devTypeId)

			// 清空相关显示模型标识
			this.currentModeIndex = 0
		},
		// 根据typeId查询显示类型
		getDisplayModeBytypeId(id) {
			let modeList = []
			this.deviceTypeMapList.forEach(item => {
				if (item.typeId == id) {
					modeList = item.mode
				}
			})
			return modeList
		},
		handleChangeDisplayMode(mode, index) {
			if (!mode) return false
			this.currentModeIndex = index
			this.$refs.view.current = `${this.$route.name}-${mode.name}`
			// this.$router.push({ name: 'table' })
		},
		// 初始化显示模式
		initDisplayMode() {
			this.handleChangeDisplayMode(this.currentModeList[0], 0)
			// this.rotation = setInterval(() => {
			// 	if (this.currentModeList && this.currentModeList.length > 0) {
			// 		// 如果当前第一个显示模式和组件匹配则不再执行初始化
			// 		if (!this.$refs.view.current) clearInterval(this.rotation)
			// 		if (this.$refs.view.current && this.$refs.view.current == `${this.$route.name}-${this.currentModeList[0]['name']}`) {
			// 			return clearInterval(this.rotation)
			// 		}
			// 		this.handleChangeDisplayMode(this.currentModeList[0], 0)
			// 		clearInterval(this.rotation)
			// 	} else {
			// 		clearInterval(this.rotation)
			// 	}
			// }, 500)
		},
		// 点击树节点
		handleClickNode(data, node, root) {
			// 更新当前模块单元id
			this.$store.commit('UPDATE_UNITID', data.id)
			// console.log(this.$store.getters.unitId)

			// 如果匹配到最根级则返回
			if (data.id == this.data[0]['id']) {
				this.handleGoBack()
			}
		},
		subscribe(topicArr) {
			if (true) {
				this.$_mqtt.unsubscribe(topicArr, err => {
					if (err) {
						console.log('智能辅助：MQTT重置失败')
					} else {
						console.log('智能辅助：MQTT重置成功')
						this.$_mqtt.subscribe(topicArr, err => {
							if (err) {
								console.log('智能辅助：MQTT订阅失败')
							} else {
								console.log('智能辅助：MQTT订阅成功')
							}
						})
					}
				})
			} else {
				console.log('智能辅助：MQTT连接失败')
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
.intelligent {
  width: 1920px;
  height: 100%;
  background: url('~@/assets/img/navigation/background.png') no-repeat 0 -140px;
  background-size: 100% 1080px;

  .body {
    width: 100%;
    height: 890px;
    // padding-top: 15px;
    display: flex;

    .station {
      width: 313px;
      height: 890px;
      // background: url('~@/assets/img/common/side-bg.png') no-repeat;
      // background-size: 313px 890px;
      padding: 0 10px;
      margin: 0 10px;

      /* background: #0af; */
      /deep/ .el-tree {
        height: 840px;
        overflow: auto;
      }
    }

    .container {
      width: 1590px;

      .content {
        margin-top: 13px;
        width: 100%;
        height: 880px;

        .card {
          width: 1570px;
          display: flex;
          // background: #0c1b3b;
          background-color: rgba(12, 27, 59, 0.3);
          border-radius: 5px;
          padding-left: 5px;
          padding-right: 5px;

          /* margin-bottom: 12px; */
          .card-item {
            min-width: 250px;
            height: 94px;
            /* background: #0c1b3b; */
            /* background: url('~@ac/assets/img/content/card.png') no-repeat; */
            /* background-size: 250px 94px; */
            /* margin-right: 15px; */
            cursor: pointer;
            position: relative;
            padding-left: 35px;

            .line {
              position: absolute;
              right: 0;
              top: 22px;
              width: 2px;
              height: 55px;
              background: #3299ff;
            }

            .type {
              display: flex;
              margin-top: 20px;

              .icon {
                width: 18px;
                height: 18px;
                /* background: url('~@ac/assets/img/device-type/空调-0.png') no-repeat; */
                background-repeat: no-repeat;
                background-size: 18px 18px !important;
              }

              .name {
                margin-left: 5px;
                color: #3299ff;
              }
            }

            &.current {
              /* background: url('~@ac/assets/img/content/card-active.png') no-repeat; */
              background-color: rgba(15, 33, 69, 0.7);

              .type .name {
                color: #ffd36a;
              }

              /* background-size: 250px 94px; */
            }

            .info {
              display: flex;
              color: #fff;
              margin-top: 17px;

              .total {
                margin-right: 15px;
              }

              .alarm {
                margin-right: 15px;
              }

              .normal {
              }
            }
          }
        }

        .router-view-wrap {
          position: relative;
          margin-top: 12px;

          .view {
            /* padding-top: 10px; */
            padding-bottom: 50px;
            width: 100%;
            height: 745px;

            &.full {
              height: 849px;
            }
          }

          .style {
            /* width: 100px; */
            /* height: 20px; */
            /* background: #f00; */
            position: absolute;
            bottom: 10px;
            left: 10px;

            .ant-btn {
              background-color: #054166;
              border-color: #000;

              &.current {
                background-color: #0291ed;
                border-color: #013351;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="stylus">
.intelligent {
  .container {
    .card {
      .el-scrollbar__wrap {
        overflow-y: hidden;
        overflow-x: hidden;
        margin-right: initial !important;
        margin-bottom: initial !important;

        .el-scrollbar__view {
          display: flex;
        }
      }

      .el-scrollbar__thumb {
        background-color: #3299ff !important;

        &:hover {
          background-color: #3299ff !important;
        }
      }
    }
  }
}
</style>
