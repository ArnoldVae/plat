<template>
	<div class="elecFire">
		<el-container style="height: 1850px">
			<el-main>
				<div class="el-main-header">
					<el-row>
						<el-col :span="24">
							<div
								class="fire-header-title"
								:class="{ 'fire-header-active': tab.active == true }"
								@click="tabChange(tab)"
								v-for="(tab, i) in tabList"
								:key="i"
							>
								{{ tab.title }}
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="el-main-content">
					<component ref="sunMethod" v-bind:is="current"></component>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import cableTemp from './cable-temp'
import residualCurrent from './residual-current'
export default {
	name: 'cableTemp',
	components: {
		'cable-temp': cableTemp,
		'residual-current': residualCurrent
	},
	props: {},
	data() {
		return {
			tabList: [
				{
					title: '绝缘监测',
					id: '02',
					code: 'residual-current', //菜单对应code
					active: true
				},
				{
					title: '早期扑救',
					id: '01',
					code: 'cable-temp', //菜单对应code
					active: false
				}
			],
			subTabList: [],
			current: 'residual-current'
		}
	},
	computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	},
	filters: {},
	watch: {
		activeUnitId: {
			handler(val) {
				this.current = 'cable-temp'
				this.tabList.forEach(item => {
					item.active = false
				})
				this.tabList[0].active = true
			}
		}
	},
	created() {},
	mounted() {
		this.registerMQTT()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		registerMQTT() {
			this.$_listen('firecontrolAllAlarm', (topic, msg, pack) => {
				let msgJson = JSON.parse(msg.toString())
				// console.log(msgJson);
				if (msgJson.cmd === '3002') {
					//报警的上传数据
					this.$emit('receiveAlarm', 'alarm-action', msgJson.unitid)
				}
			})
		},
		/**
		 * tab菜单切换
		 * tab为当前勾选节点
		 * 处理active是否高亮显示
		 * current处理菜单切换
		 */
		tabChange(tab) {
			this.tabList.forEach(item => {
				item.active = false
			})
			tab.active = true
			this.current = tab.code
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
.elecFire {
//   margin: 20px 20px 0 20px;
  width: 1747px;
  	.el-main{
            overflow hidden
            padding-bottom: 0
			padding 0
			// margin-top -20px
			.el-main-header{
				min-height 50px
				width: 100%;
				position relative
				background url('../../assets/img/main/bg-long.png');
				background-size 100% 100%;
				line-height 50px;
				.el-row{
					margin-top 12px
					margin-bottom  12px
					.fire-header-sub-title{
						font-size 14px
						color white
						margin 36px
						cursor pointer

					}

                  .fire-header-title{
                    color #fff
                    font-size 36PX
                    cursor pointer
                    width  240px
                    float left
                    text-align center


                  }
                  .fire-header-active{
                    background url('../../assets/img/main/bg-menu.png')
                    background-size 100% 100%;
                  }
					.point{
						position: relative
						left 2.5%
						margin-right 10px

					}
				}

			}
			.el-main-content{
				margin-top 10px;
				height 770px
				width: 100%;

				position relative

				// background url("../../assets/img/hull.png")
				background-size:100% 100%
				-moz-background-size:100% 100%
			}


		}
}
</style>
