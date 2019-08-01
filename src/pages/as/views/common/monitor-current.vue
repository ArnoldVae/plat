<template>
  <div class="monitor-current">
    <!-- <div class="current-top">
      <span v-for="(item, index) in list"
            :key="index"
            v-show="item.vcUrl.length != 0"
            :class="{ onBut: pitchOn == item.pageId }"
            @click="but(item)">{{
				item.vcName
			}}</span>
    </div> -->
    <div class="current-center">
      <mcBlueprint :blueprintUrl="blueprintUrl"
                   :blueprintObj="blueprintObj"
                   :primitiveNodes="primitiveNodes"
                   :unitId="unitId"
                   :mqttData="mqttData" />
    </div>
  </div>
</template>

<script>
import mcBlueprint from './mc-blueprint'
export default {
	name: 'monitor-current',
	components: {
		mcBlueprint
	},
	props: {
		unitId: {
			type: String
		}
	},
	data() {
		return {
			axios: this.$_api.monitorData,
			blueprintUrl: '',
			blueprintObj: {},
			primitiveNodes: [], //图元节点数组
			list: [],
			pitchOn: '',
			topicArr: ['qif/xj/app/'],
			topicStr: '',
			mqttData: {}
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getData()
	},
	mounted() {
		this.topicStr = this.topicArr[0] + this.unitId
		this.subscribe(this.topicStr)
		//实时数据回调
		const _this = this

		this.$_listen('inspectionhtmap', (topic, message, packet) => {
			let data = ''
			let dataobj = []
			dataobj = message
			dataobj.forEach(item => {
				//将推送的报文转码
				data = data + String.fromCharCode(item)
			})
			data = JSON.parse(data)
			
		// 	//如果推送上来的数据的topic和订阅的topic一致qif/zf/app/192fe4cec3ec4d3fb81c0d05f82bde41
			if (data.cmd == 2103 || data.cmd == 2104) {
				console.log(data)
				_this.mqttData = data
			}
		})
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		subscribe(topicArr) {
			// this.$_mqtt.connected
			if (true) {
				this.$_mqtt.unsubscribe('qif/xj/app/data/57fdad1317b04c5e87374c6567521114', err => {
					if (err) {
						console.log('取消MQTT订阅失败')
					} else {
						console.log('取消MQTT订阅成功')
						this.$_mqtt.subscribe('qif/xj/app/data/57fdad1317b04c5e87374c6567521114', err => {
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
		stop() {
			// this.$_mqtt.end()
			this.$_mqtt.unsubscribe(this.testTopicArr, err => {
				if (err) {
					console.log('取消MQTT订阅失败')
				} else {
					console.log('取消MQTT订阅成功')
				}
			})
		},

		//图纸切换
		but(val) {
			if (val.vcUrl != this.blueprintUrl) {
				this.blueprintUrl = val.vcUrl
				this.blueprintObj = val
				this.pitchOn = val.pageId
			}
		},
		//获取图纸信息
		getData() {
			console.log(this.unitId)
			let params = {
				unitId: this.unitId,
				iSubType: '10100006'
			}
			this.axios.getMCDrawing(params).then(res => {
				if (res.code == 200) {
					this.list = res.data
					if (res.data.length) {
						res.data.map(item => {
							if (item.vcUrl.length) {
								this.blueprintObj = item
								this.blueprintUrl = item.vcUrl
								this.pitchOn = item.pageId
								return
							}
						})
					}
				}
			})
		},
		//获取图元节点信息
		getPrimitiveNodes(pageId) {
			let params = {
				pageId,
				unitId: this.unitId
			}
			this.axios.getMCFind(params).then(res => {})
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
.monitor-current {
  width: 100%;
  height: 100%;

  .current-top {
    height: 34px;

    .onBut {
      color: #ffe06d;
    }

    >span {
      color: #8fd8fe;
      display: inline-block;
      margin-left: 11px;
      text-align: center;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      padding: 0 5px;
      border: 1px solid #0173bb;
      border-radius: 3px;
      cursor: pointer;
    }
  }

  .current-center {
    width: 100%;
    height: 535px;
  }
}
</style>
