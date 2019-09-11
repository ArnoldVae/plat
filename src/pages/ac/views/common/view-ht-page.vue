<template>
  <div class="view-ht-page">
    <div class="water-soaking-center">
      <div class="water-soaking-top"
           v-if="list.length > 1">
		   <!-- 图纸切换按钮 -->
        <span v-for="(item, index) in list"
              :key="index"
              v-show="item.vcUrl.length != 0"
              :class="{ onBut: pitchOn == item.pageId }"
              @click="but(item)">{{ item.vcName }}</span>
      </div>

      <htBlueprint :blueprintUrl="blueprintUrl"
                   :blueprintObj="blueprintObj"
                   :primitiveNodes="primitiveNodes"
                   @htClick="htClick"
                   :isNodeClick="true"
                   :mqttData="mqttData"
                   :isShowName="true"
                   :source="sourceName" />
    </div>
    <!-- <charts v-model="historyModal"
            :node-id="nodeId"
            :sub-title="chartTitle"
            :unit="unit" /> -->
    <chartsList v-model="historyListModal"
                :node-id="nodeId"
                :sub-title="chartTitle"
                :unit="unit" />
  </div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import htBlueprint from './view-ichnography'
import charts from '../main-oil/charts1'
import chartsList from '../terminal-box/chartsList'
import { log } from 'util'
export default {
	name: 'view-ht-page',
	components: {
		htBlueprint,
		charts,
		chartsList
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
			nodeId: [],
			chartTitle: [],
			unit: [],
			functionCode: '1011.0002',
			sourceName: '',
			historyListModal: false
		}
	},
	watch: {},
	computed: {
		activeTypeMapLists() {
			return findComponentUpward(this, 'intelligent').currentModeInfo
		}
	},
	created() {
		this.getData()
	},
	mounted() {
		this.topicStr = this.topicArr[0] + this.unitId
		// this.subscribe(this.topicStr)
		// console.log(this.topicStr)

		//实时数据回调
		const _this = this
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				let msgData = JSON.parse(message.toString())
				// console.log(msgData)
				if (msgData.unitid == this.$store.getters.unitId && msgData.cmd == 1002) {
					this.mqttData = msgData
				}
			}
		})
	},
	methods: {
		//图纸节点点击回调
		htClick(data, nodes) {
			if (data.a('functionCode') != null) {
				let str = data.a('functionCode').split(',')
				let index = nodes.findIndex(item => item.vcSourceId == data._tag)
				let node = nodes[index]
				let arr = []
				for (let i = 0; i < str.length; i++) {
					let functionCode = str[i]
					let nodeIndex = node.devNodes.findIndex(val => val.functionCode == functionCode)
					arr.push(node.devNodes[nodeIndex])
				}

				this.historyListModal = true
				this.nodeId = arr
				this.chartTitle = arr
				this.unit = arr
			} else {
				this.$ocxMessage.error('数据丢失！！！')
			}
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
			let index = this.activeTypeMapLists.devTypeShowModes.findIndex(item => item.icon == 'picture')
			if (index != -1) {
				let data = this.activeTypeMapLists.devTypeShowModes[index]

				let iSubType
				if (data.iParam1 != null) {
					iSubType = data.iParam1
					if (iSubType == '10100011') this.sourceName = 'terminalBox'
				} else {
					this.$ocxMessage.error('请配置参数！！！')
				}

				let params = {
					unitId: this.unitId,
					iSubType
				}
				this.axios.getHtDrawing(params).then(res => {
					if (res.code == 200) {
						console.log(res)

						this.list = res.data
						if (res.data.length) {
							this.blueprintObj = res.data[0]
							this.blueprintUrl = res.data[0].vcUrl
							this.pitchOn = res.data[0].pageId
						}
					}
				})
			}
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
.view-ht-page {
  width: 100%;
  height: 100%;

  .water-soaking-center {
    width: calc(100% - 20px);
    height: 100%;
    background-image: url('~@/assets/img/common/bg-border.png');
    background-size: 100% 100%;
    padding: 15px 30px 30px;

    .water-soaking-top {
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
