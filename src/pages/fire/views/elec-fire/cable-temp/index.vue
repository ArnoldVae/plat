<template>
	<div class="cable-temp">
		<el-aside width="100%">
			<component
				v-bind:is="htCommon"
				ref="htCommon"
				:cableObj="cableObj"
				:cablelUrl="cablelUrl"
				:mqttData="mqttData"
			></component>
		</el-aside>
	</div>
</template>

<script>
import htCommon from '../../common/cable-temp-ht'
export default {
	name: 'cable-temp',
	components: {
		htCommon
	},
	props: {},
	data() {
		return {
			current: 'fireControl-customization',
			unitId: '8177a787a28b4f86a103fac9a023db05',
			resultData: {
				dev: {},
				data: []
			},
			getId: '',
			topicArr: 'qif/zf/app/',
			htCommon: 'htCommon',
			cableObj: {},
			cablelUrl: '',
			mqttData: {}
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getHtMap()
	},
	mounted() {
		this.topicStr = this.topicArr + this.unitId
		// this.topicStr = this.topicArr
		this.subscribe(this.topicStr)
		this.$_listen('cableTemp', (topic, message, packet) => {
			// console.log(JSON.parse(message.toString()))
			let data = ''
			let dataobj = []
			dataobj = message
			dataobj.forEach(item => {
				//将推送的报文转码
				data = data + String.fromCharCode(item)
			})
			data = JSON.parse(data)
			// console.log(data);
			// 	//如果推送上来的数据的topic和订阅的topic一致qif/zf/app/192fe4cec3ec4d3fb81c0d05f82bde41
			if (data.cmd == 1001) {
				this.mqttData = data
			}
		})
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//获取图纸接口
		getHtMap() {
			let params = {
				unitId: this.united,
				iSubType: '10100008'
			}
			this.$_api.statusCheck.getSubCharts(params).then(res => {
				//    console.log(res)
				if (res.code == 200) {
					if (res.data.length) {
						for (let i = 0; i < res.data.length; i++) {
							let item = res.data[i]
							if (item.vcUrl.length) {
								this.cableObj = item
								this.cablelUrl = item.vcUrl
								// return
							}
						}
					}
				}
			})
		},
		subscribe(topicArr) {
			// console.log(topicArr);
			if (this.$_mqtt.connected) {
				this.$_mqtt.unsubscribe(topicArr, err => {
					if (err) {
						console.log('取消MQTT订阅失败')
					} else {
						console.log('取消MQTT订阅成功')
						this.$_mqtt.subscribe(topicArr, err => {
							if (err) {
								console.log('电缆测温订阅失败!')
							} else {
								console.log('电缆测温订阅成功!')
							}
						})
					}
				})
			} else {
				console.log('MQTT连接失败')
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
$view-height = 898px;

.cable-temp {
  width: 100%;
  height: 1700PX;
  background-color: #141a26;
  border: 4PX solid #d3dee6;

  .el-aside {
  }
}
</style>
