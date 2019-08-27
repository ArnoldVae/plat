<template>
  <div class="breaker-customization">
    <div class="center">
      <div class="top"
           v-if="list.length > 1">
        <span v-for="(item, index) in list"
              :key="index"
              v-show="item.vcUrl.length != 0"
              :class="{ onBut: pitchOn == item.pageId }"
              @click="but(item)">
          {{ item.vcName }}
        </span>
      </div>
      <htPage :dataList="list"
              :pitchOn="pitchOn"
              :mainDevList="mainDevList"
			  :msgData="msgData" />
    </div>
  </div>
</template>
<script>
import htPage from '../hgis/ht-page'
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'breaker-customization',
	components: { htPage },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			axios: this.$_api.hgis,
			list: [],
			mainDevList: [],
			pitchOn: '',
			msgData: {},
			topicArr: ['qif/zf/app/'],
			topicStr: ''
		}
	},
	computed: {
		getunitId: function() {
			return this.$store.getters.unitId
		},
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		}
	},
	filters: {},
	watch: {
		getunitId: {
			handler(newValue) {
				this.unitId = newValue
				this.topicStr = this.topicArr[0] + this.unitId
				this.subscribe(this.topicStr)
			}
		}
	},
	created() {
		this.getData()
	},
	mounted() {
		this.init()
		this.topicStr = this.topicArr[0] + this.unitId
		// console.log(this.topicStr)
		//实时数据回调
		const _this = this
		// this.$_mqtt.on('message', function(topic, message, packet) {
		this.$_listen(this.$options.name, (topic, message, packet) => {
			//如果推送上来的数据的topic和订阅的topic一致
			if (topic == _this.topicStr) {
				//将json字符串转为数组
				let msgData = JSON.parse(message.toString())
				console.log('msgData', msgData);
				
				if (msgData.cmd == 1001 && msgData.unitid == this.$store.getters.unitId) {
					_this.msgData = msgData
				}
			}
		})
	},
	activited() {},
	update() {},
	beforeDestory() {},
	beforeRouteLeave(to, from, next) {
		next()
	},

	methods: {
		init() {},
		//获取图纸信息
		getData() {
			let data = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.axios.getDevList(data).then(res => {
				if (res.code == 200 && res.data) {
					this.mainDevList = JSON.parse(JSON.stringify(res.data.lists))
					console.log(res)
				}
			})

			let params = {
				unitId: this.unitId,
				iSubType: '10100014'
			}
			this.axios.getHtDrawing(params).then(res => {
				if (res.code == 200) {
					this.list = res.data
					console.log(this.list)

					if (res.data.length) {
						this.pitchOn = res.data[0].pageId
					}
				}
			})
			console.log(this.activeDeviceTypeId)
		},
		//图纸切换
		but(val) {
			if (this.pitchOn != val.pageId) {
				this.pitchOn = val.pageId
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
.breaker-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding-left:55px;
  padding-right: 55px;
  padding-top: 15px;

  .center {
    width: 100%;
    height: 100%;

    .top {
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
