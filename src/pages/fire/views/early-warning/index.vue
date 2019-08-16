<template>
	<div class="earlyWarning">
		<el-container>
			<el-aside width="300px">
				<div class="system-items">
					<div class="system-item" v-for="(item, index) in sysList" :key="index">
						<ul>
							<li>
								<span class="icon">●</span><span class="item-span">{{ item.name }}</span>
							</li>
							<li>
								<span class="icon">●</span><span class="item-span">{{ item.name2 }}</span>
							</li>
							<li>
								<span class="icon">●</span><span class="item-span">{{ item.name3 }}</span>
							</li>
						</ul>
					</div>
				</div>
			</el-aside>
			<el-main>
				<!--				<component v-bind:is="current"  ref="test" @transfer="getMethod" :node="alarmNode" @receiveAlarm="receiveAlarm"></component>-->
				<component :is="current"></component>
			</el-main>
		</el-container>
	</div>
</template>
<script>
import systemInfo from './system-info'
export default {
	name: 'earlyWarning',
	components: {
		'system-info': systemInfo
	},
	props: {},
	data() {
		return {
			current: 'system-info',
			sysList: [
				{
					name: '500kV东善桥变电站',
					name2: '1号主变防护区',
					name3: '趋近阈值预警'
				},
				{
					name: '500kV东善桥变电站',
					name2: '1号主变防护区',
					name3: '趋近阈值预警'
				},
				{
					name: '500kV东善桥变电站',
					name2: '1号主变防护区',
					name3: '趋近阈值预警'
				}
			]
		}
	},
	computed: {},
	filters: {},
	watch: {},
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
.earlyWarning{
	font-size

	margin 20px 20px 0 20px


	.el-container{
		.el-aside{
			.system-items{
				padding 0 20px 20px 20px
				.system-item{
					height 100px
					padding 10px 0 0 20px
					margin-bottom 24px
					cursor pointer
					background url("../../assets/img/early/border.png")
					background-size:100% 100%
					-moz-background-size:100% 100%
					ul{
						li{
							margin-bottom 8px

							.icon{
								color #ff9900
								margin-right 10px
							}
							.item-span{
								color white
							}

						}
					}

				}

			}
		}
		.el-main{
			height 830px
			background url("../../assets/img/hull.png")
			background-size:100% 100%
			-moz-background-size:100% 100%
			padding-top 0
			padding-bottom 0
		}
	}


}
</style>
