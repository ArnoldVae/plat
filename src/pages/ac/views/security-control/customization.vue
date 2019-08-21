<template>
  <div class="security-control-customization">
    <div class="securityControl-center">
      <div class="securityControl-top"
           v-if="list.length > 1">
        <span v-for="(item, index) in list"
              :key="index"
              v-show="item.vcUrl.length != 0"
              :class="{ onBut: pitchOn == item.pageId }"
              @click="but(item)">{{ item.vcName }}</span>
      </div>
      <htBlueprint :blueprintUrl="blueprintUrl"
                   :blueprintObj="blueprintObj"
                   :primitiveNodes="primitiveNodes"
                   :mqttData="mqttData"
                   @htClick="htClick"
                   :isNodeClick="true"
				   :isShowName="true" />
    </div>
    <charts v-model="historyModal"
            :node-id="nodeId"
            :sub-title="chartTitle"
            :unit="unit"></charts>
  </div>
</template>
<script>
import htBlueprint from '../common/view-ichnography'
import charts from '../main-oil/charts1'
export default {
	name: 'security-control-customization',
	components: {
		htBlueprint: htBlueprint,
		charts
	},
	data() {
		return {
			axios: this.$_api.fireControl,
			unitId: this.$store.getters.unitId,
			list: [],
			blueprintUrl: '',
			blueprintObj: {},
			pitchOn: '',
			primitiveNodes: [],
			topicArr: ['qif/zf/app/'],
			topicStr: '',
			mqttData: {},
			historyModal: false,
			nodeId: '',
			chartTitle: '',
			unit: '',
			functionCode: ''
		}
	},
	watch: {},
	created() {
		this.getData()
	},
	mounted() {
		this.topicStr = this.topicArr[0] + this.unitId
		// this.subscribe(this.topicStr)
		//实时数据回调
		const _this = this
		// this.$_listen(this.$options.name, (topic, message, packet) => {
		// 	let data = ''
		// 	let dataobj = []
		// 	dataobj = message
		// 	dataobj.forEach(item => {
		// 		//将推送的报文转码
		// 		data = data + String.fromCharCode(item)
		// 	})

		// 	//如果推送上来的数据的topic和订阅的topic一致qif/zf/app/192fe4cec3ec4d3fb81c0d05f82bde41
		// 	if (topic == _this.topicStr) {
		// 		let val = JSON.parse(data)
		// 		if (val.type == 'req' && val.cmd == '1002') {
		// 			_this.mqttData = val
		// 			console.log(val)
		// 		}
		// 	}
		// })
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				let msgData = JSON.parse(message.toString())
				console.log(msgData)
				if (msgData.type == 'req' && msgData.cmd == '1002') {
					this.mqttData = msgData
				}
				
			}
		})
	},
	methods: {
		//图纸节点点击回调
		htClick(data, nodes) {
			let index = nodes.findIndex(item => item.vcSourceId == data._tag)
			let node = nodes[index]
			console.log(node);
			
			// let nodeIndex = node.devNodes.findIndex(val => val.functionCode == this.functionCode)
			// let devNode = node.devNodes[nodeIndex]
			
			// this.historyModal = true
			// this.nodeId = devNode.NodeID
			// this.chartTitle = devNode.devName
			// this.unit = devNode.vc_Unit
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
			let params = {
				unitId: this.unitId,
				iSubType: '10100002'
			}
			this.axios.getHtDrawing(params).then(res => {
				if (res.code == 200) {
					this.list = res.data
					if (res.data.length) {
						this.blueprintObj = res.data[0]
						this.blueprintUrl = res.data[0].vcUrl
						this.pitchOn = res.data[0].pageId
					}
				}
			})
		},

		//获取图元节点
		// getPrimitiveNodes(pageId) {
		// 	let params = {
		// 		pageId,
		// 		unitId: this.unitId
		// 	}
		// 	this.axios.getHtFind(params).then(res => {
		// 		if (res.code == 200) {
		//       this.primitiveNodes = res.data
		// 			// if (switchoverVal) {
		// 			// }
		// 		}
		// 	})
		// },

		subscribe(topicArr) {
			// this.$_mqtt.connected
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
								// this.$_mqtt.publish('qif/service/realdata/rcu/42389edde72d41f4bcd978b574eefbae', 'wss secure connection demo...!', { qos: 0, retain: false })
							}
						})
					}
				})
			} else {
				console.log('MQTT连接失败')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.security-control-customization {
  width: 100%;
  height: 100%;

  .securityControl-center {
    width: calc(100% - 20px);
    height: 100%;
    background-image: url('~@/assets/img/common/bg-border.png');
    background-size: 100% 100%;
    padding: 15px 30px 30px;

    .securityControl-top {
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
  }
}
</style>
