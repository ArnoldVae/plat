<template>
  <div class="terminal-box-customization">
    <div class="terminal-box-customization-top"
         v-if="list.length > 1">
      <span v-for="(item, index) in list"
            :key="index"
            v-show="item.vcUrl.length != 0"
            :class="{ onBut: pitchOn == item.pageId }"
            @click="but(item)">{{ item.vcName }}</span>
    </div>

    <div class="infoBox"
         v-if="blueprintUrl.length">
      <div class="info-lf">图例统计</div>
      <div class="info-rt">
        <div class="row1 zc">
          正常
          <div class="txt_box">
            <span class="num_txt">66</span>个
          </div>
        </div>
        <div class="row2 lx">
          离线
          <div class="txt_box">
            <span class="num_txt">0</span>个
          </div>
        </div>
        <div class="row3 bj">
          报警
          <div class="txt_box">
            <span class="num_txt">0</span>个
          </div>
        </div>
      </div>
    </div>

    <div class="terminal-box-customization-center">
      <htBlueprint :blueprintUrl="blueprintUrl"
                   :blueprintObj="blueprintObj"
                   :primitiveNodes="primitiveNodes"
                   :mqttData="mqttData"
                   @htClick="htClick"
                   :isNodeClick="true" />
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
	name: 'terminal-box-customization-customization',
	components: {
		htBlueprint,
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
			unit: ''
		}
	},
	watch: {},
	created() {
		this.getData()
	},
	mounted() {
		// this.topicStr = this.topicArr[0] + this.unitId
		// this.subscribe(this.topicStr)
		//实时数据回调
		const _this = this

		this.$_listen(this.$options.name, (topic, message, packet) => {
			let data = ''
			let dataobj = []
			dataobj = message
			dataobj.forEach(item => {
				//将推送的报文转码
				data = data + String.fromCharCode(item)
			})

			//如果推送上来的数据的topic和订阅的topic一致qif/zf/app/192fe4cec3ec4d3fb81c0d05f82bde41
			// 	if (topic == _this.topicStr) {
			//   console.log(data)
			// 	}
			console.log(data)
			let val = JSON.parse(data)
			if (val.type == 'req' && val.cmd == '1002') {
				console.log(val)
				_this.mqttData = val
			}
		})
	},
	methods: {
		//图纸节点点击回调
		htClick(data) {
			console.log(data)
			this.historyModal = true
			this.nodeId = data._tag
			this.chartTitle = data._name
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
				iSubType: '10100007'
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
.terminal-box-customization {
  width: 100%;
  height: 100%;
  position: relative;

  .terminal-box-customization-top {
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

  .infoBox {
    width: 250px;
    height: 150px;
    position: absolute;
    left: 20px;
    bottom: 65px;
    border: 2px solid #0173bb;
    color: #fff;
    z-index: 11;

    > div {
      height: 100%;
      float: left;
    }

    .info-lf {
      width: 50px;
      font-size: 24px;
      background-image: linear-gradient(#0A2C5F, #073186, #0A2C5F);
      text-align: right;
      letter-spacing: 15px;
    }

    .info-rt {
      width: calc(100% - 50px);

      > div {
        width: 100%;
        height: calc((100% / 3));
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        align-items: center;
        -webkit-align-items: center;
        font-size: 20px;

        .txt_box {
          color: #49ff01;
          width: 90px;
          text-align: right;

          .num_txt {
            font-family: 'DS-DIGI';
            font-size: 24px;
            margin-right: 10px;
          }
        }
      }

      > div:before {
        content: '';
        display: table;
        height: 30px;
        width: 30px;
        margin: 0 10px;
      }

      .zc:before {
        background: url('../../assets/img/terminal-box/dzx_zc.png');
        background-size: 100% 100%;
      }

      .lx:before {
        background: url('../../assets/img/terminal-box/dzx_lx.png');
        background-size: 100% 100%;
      }

      .bj:before {
        background: url('../../assets/img/terminal-box/dzx_bj.png');
        background-size: 100% 100%;
      }
    }
  }

  .terminal-box-customization-center {
    width: calc(100% - 20px);
    height: calc(100% - 34px);
    background-image: url('~@/assets/img/common/bg-border.png');
    background-size: 100% 100%;
    padding: 30px;
  }
}
</style>
