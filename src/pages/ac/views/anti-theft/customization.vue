<template>
  <div class="anti-theft-customization">
    <div class="left-video">
      <div class="ft"></div>
      <div class="rb"></div>
      <ocxVideo :videoConfig="videoConfig"></ocxVideo>
    </div>
    <div class="right-list">
      <ul>
        <template v-for="(item, index) in listData">
          <li :key="index">
            <div class="list-item-left">
              <div :class="{ ddmg: item.ddg, ddmk: item.ddk, mjg: item.mjg, mjk: item.mjk }"></div>
            </div>
            <div class="list-item-right">
              <span>{{ item.equName }}</span>
              <div class="list-item-btn">
                <span
                  v-for="(ite, idx) in item.btnArr"
                  :key="idx"
                  @click="handleClick(item, ite)"
                >{{ ite.name }}</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <!-- <confirm-modal
			title="提醒"
			text="确认执行该操作？"
			v-model="modalShow"
			@on-ok="handleConfirm"
			@on-cacel="handleCancel"
		></confirm-modal>
    <tool-tip createIframe v-model="tipShow" type="success" title="命令下发成功"></tool-tip>-->
    <ocx-modal title="提醒" v-model="modalShow" @on-ok="handleConfirm" @on-cacel="handleCancel">
      <p>确认执行该操作？</p>
    </ocx-modal>
  </div>
</template>
<script>
import ocxVideo from '@/components/native/video/OcxVideo'
export default {
	name: 'anti-theft-customization',
	components: { ocxVideo },
	props: {},
	data() {
		return {
			modalShow: false,
			tipShow: false,
			accessData: [],
			listData: [],
			videoConfig: {
				isAutoPlay: false,
				serviceInfo: '1$22.46.34.114$6800$admin$admin',
				deviceInfo: '',
				hideTool: true
			}
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.gerEqList()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		gerEqList() {
			//获取门禁列表
			// this.$api.AssistCenter.findSystemNode({
			// 	stationId: this.stationId,
			// 	subSystemId: findComponentUpward(this, 'mainc').subSystemId,
			// 	equName: '',
			// 	typeId: '',
			// 	rows: 1000,
			// 	page: 1
			// }).then(res => {
			this.$_api.getStaticData('./simulation-data/anti-theft.json').then(res => {
				console.log(res)
				// if (res.ret == 0) {
				//默认播放列表第一个的视频
				// if (res.rows.length === 0) {
				// 	return
				// }
				this.accessData = res.data.rows
				//遍历找出所有设备
				let eqpList = []
				this.accessData.map(item => {
					if (!eqpList.includes(item.equId)) {
						eqpList.push(item.equId)
					}
				})

				let doorList = [],
					tempObj = { btnArr: [] }
				let flag = false //用来判断是否有状态节点

				eqpList.map((eqp, index) => {
					tempObj = { btnArr: [] }
					flag = false
					this.accessData.map((node, index) => {
						if (node.equId === eqp) {
							//当前节点为状态节点，则直接绑定在列表上
							tempObj.equName = node.equName
							if (node.functionId === '1') {
								tempObj.nodeid = node.nodeId
								// console.log(node.linkUrl);
								tempObj.linkUrl = node.linkUrl
								flag = true

								//图片和设备状态匹配
								if (node.fvalue == 0 && node.iParam1 == 1) {
									tempObj.ddg = true
								} else if (node.fvalue == 1 && node.iParam1 == 1) {
									tempObj.ddk = true
								} else if (node.fvalue == 0 && node.iParam1 == null) {
									tempObj.mjg = true
								} else if (node.fvalue == 1 && node.iParam1 == null) {
									tempObj.mjk = true
								}
							} else if (node.functionId === '2') {
								//控制节点，则作为生成按钮使用
								if (node.valueDesc) {
									let splitArr = node.valueDesc.split(' ')
									tempObj.btnArr.push({
										controlNodeid: node.nodeId,
										name: splitArr[1],
										value: splitArr[0]
									})
								}
							}
						}

						//遍历完一个设备，保存到数组中
						if (index === this.accessData.length - 1) {
							if (tempObj.btnArr.length > 0) {
								flag === false ? (tempObj.mjg = true) : ''
								doorList.push(tempObj)
							}
						}
					})
				})
				this.listData = doorList

				// }
			})
		},
		handleClick(item, ite) {
			this.modalShow = true
			console.log(item)
			console.log(ite)
		},
		handleConfirm() {
			console.log('确认')
			// this.tipShow = !this.tipShow
			this.$ocxMessage.info('命令下发成功')
		},
		handleCancel() {
			console.log('取消')
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
.anti-theft-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;

  .left-video {
    width: calc(100% - 565px);
    height: 100%;
    float: left;
    padding: 20px 6px 50px 50px;
    position: relative;

    .ft {
      width: 20px;
      height: 17px;
      position: absolute;
      top: 13px;
      left: 43px;
      background: url('~@/assets/img/common/border-lt.png') no-repeat;
      background-size: 100% 100%;
    }

    .rb {
      width: 20px;
      height: 17px;
      position: absolute;
      bottom: 44px;
      right: 0;
      background: url('~@/assets/img/common/border-rb.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .right-list {
    width: 555px;
    margin-left: 10px;
    box-sizing: border-box;
    height: 100%;
    float: left;
    padding: 20px 50px 52px 0;

    ul {
      width: 100%;
      height: 100%;
      overflow: auto;
      padding-left: 20px;
      padding-top: 20px;
      background-color: rgba(12, 27, 58, 0.7);

      li {
        float: left;
        list-style: none;
        display: flex;
        width: calc(50% - 15px);
        height: 130px;
        border: 2px solid #26636c;
        margin-bottom: 20px;
        margin-right: 10px;
        border-radius: 5px;
        background-color: rgba(12, 27, 58, 0.7);

        .list-item-left {
          width: 25%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-right: 2px solid #26636c;
          background: url('~@ac/assets/img/anti-theft/boxbg.png');

          > div {
            width: 60%;
            height: 46%;
          }

          .ddmg {
            background: url('~@ac/assets/img/anti-theft/mjddg.png') no-repeat;
            background-size: 100% 100%;
          }

          .ddmk {
            background: url('~@ac/assets/img/anti-theft/mjddk.png') no-repeat;
            background-size: 100% 100%;
          }

          .mjk {
            background: url('~@ac/assets/img/anti-theft/mjk.png') no-repeat;
            background-size: 100% 100%;
          }

          .mjg {
            background: url('~@ac/assets/img/anti-theft/mjg.png') no-repeat;
            background-size: 100% 100%;
          }
        }

        .list-item-right {
          width: 75%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          color: #fff;

          > span {
            font-size: 16px;
          }

          .list-item-btn {
            width: 100%;
            display: flex;
            // flex-direction: column;
            justify-content: space-around;
            flex-wrap: wrap;
            font-size: 16px;
            overflow: auto;

            > span {
              display: inline-block;
              color: #0ef6ff;
              background: url('../../assets/img/intelligent-lighting/btnBg.png');
              background-size: 100% 100%;
              padding: 2px 15px;
              margin-bottom: 4px;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
