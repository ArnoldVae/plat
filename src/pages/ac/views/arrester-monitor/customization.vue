<template>
  <div class="arrester-monitor-customization">
    <div class="arrester">
      <!-- 主变区域Start -->
      <div class="main-content" v-for="(item1,index) in [1,2]" :key="index">
        <div class="title">{{item1}}号主变</div>
        <div class="level-bottom">
          <div class="level" v-for="(item2,index) in [1,2,3]" :key="index">
            <div class="title">{{item2 == 1?'35kV':item2 == 2?'220kV':'500kV'}}</div>
            <div class="item-box" v-for="(item3,index) in [1,2,3]" :key="index">
              <div class="left-title">{{item3 == 1?'A相':item3 == 2?'B相':'C相'}}</div>
              <div class="item" v-for="(item4,index) in [1,2,3]" :key="index">
                <div class="item-top">
                  <div class="top-left">{{item4 == 1?'全电流':item4 == 2?'累计动作次数':'全电阻'}}</div>
                  <div class="top-right">
                    <img src="../../assets/img/arrester-monitor/ls.png" alt />
                  </div>
                </div>
                <div class="item-bottom">
                  <div class="bottom-left">值(mA)</div>
                  <div class="bottom-right">0.{{item4}}1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 主变区域end -->
      <!-- 非主变区域Start -->
      <div class="other-content" v-for="(item5,index) in [1,2,3]" :key="index">
        <div class="title">{{item5 == 1?'A':item5 == 2?'B':'C'}}相避雷器</div>
        <div class="other-list">
          <div class="other-item" v-for="(item6,index) in [1,2,3]" :key="index">
            <div class="item-top">
              <div class="logo">
                <img src="../../assets/img/arrester-monitor/dianliu.png" v-if="item6 == 1" alt />
                <img src="../../assets/img/arrester-monitor/leiji.png" v-if="item6 == 2" alt />
                <img src="../../assets/img/arrester-monitor/zuxing.png" v-if="item6 == 3" alt />
              </div>
              <div class="top-left">{{item6 == 1?'全电流':item6 == 2?'累计动作次数':'全电阻'}}</div>
              <div class="top-right">
                <img src="../../assets/img/arrester-monitor/ls.png" alt />
              </div>
            </div>
            <div class="item-bottom">
              <div class="bottom-left">值(mA)</div>
              <div class="bottom-right">0.{{item6}}1</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 非主变区域end -->
    </div>
  </div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'arrester-monitor-customization',
	components: {},
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			mainList:[],
			devList:[]
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
			}
		}
	},
	created() {
		this.getDevList()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getDevList() {
			let params = {
				devTypeId: this.activeDeviceTypeId,
				isPage: 1,
				isFindNodes: 1,
				unitId: this.unitId
			}
			this.$_api.humiture.getDevList(params).then(res => {
				if(res.code == 200 && res.data){
					console.log(res)
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
<style lang='stylus' scoped>
.arrester-monitor-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 55px 25px 67px;

  .arrester {
    width: 100%;
    height: 100%;
    overflow: auto;

    .main-content {
      width: 100%;
      height: 500px;
      margin-bottom: 20px;
      box-sizing: border-box;
      border: 1px solid #26636c;

      .level-bottom {
        width: 100%;
        height: calc(100% - 40px);
        margin-top: 5px;
        display: flex;
        justify-content: space-around;

        .level {
          box-sizing: border-box;
          width: calc(33.33% - 15px);
          height: 100%;
          border: 1px solid #26636c;

          .item-box {
            width: 100%;
            height: calc(33% - 30px);
            margin-top: 15px;
            border: 1px solid #204d57;

            .left-title {
              width: 50px;
              height: 80px;
              float: left;
              margin-top: 20px;
              line-height: 90px;
              color: #fff;
              text-align: center;
              font-size: 18px;
            }

            .item {
              width: calc(33% - 30px);
              margin-left: 10px;
              height: 80px;
              border: 1px solid #204d57;
              margin-top: 20px;
              float: left;

              .item-top {
                width: 100%;
                height: 50%;
                border-bottom: 1px solid #204d57;

                .top-left {
                  width: 75%;
                  height: 100%;
                  line-height: 40px;
                  color: #fff;
                  text-align: center;
                  float: left;
                }

                .top-right {
                  width: 25%;
                  height: 100%;
                  float: left;

                  img {
                    width: 80%;
                    margin-left: 0px;
                    margin-top: 8px;
                    cursor: pointer;
                  }
                }
              }

              .item-bottom {
                background-color: #13283a;
                height: 50%;
                line-height: 40px;
                color: #fff;
                text-align: center;

                .bottom-left {
                  float: left;
                  width: 60%;
                  height: 100%;
                }

                .bottom-right {
                  float: left;
                  width: 37%;
                  color: #4dff00;
                  font-family: 'DS-DIGI';
                  font-size: 22px;
                  height: 100%;
                  background: radial-gradient(rgb(75, 17, 17), #000);
                }
              }
            }
          }
        }
      }
    }

    .title {
      width: 100%;
      height: 30px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      background-color: #244058;
      border: 1px solid #26636c;
    }

    .other-content {
      width: calc(50% - 10px);
      margin-right: 10px;
      margin-top: 10px;
      height: 150px;
      float: left;
      border: 1px solid #204d57;

      .other-list {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;

        .other-item {
          width: calc(33.33% - 10px);
          height: calc(100% - 40px);
          margin-top: 5px;
          float: left;
          border: 1px solid #204d57;

          .item-top {
            width: 100%;
            height: 50%;
            border-bottom: 1px solid #204d57;
			.logo{
				width 30%;
				height 100%;
				float left;
				img{
					width 55%;
					display block;
					margin-left 20px;
					margin-top 8px;

				}
			}

            .top-left {
              width: 45%;
              height: 100%;
              line-height: 50px;
              font-size: 18px;
              color: #fff;
              text-align: center;
              float: left;
            }

            .top-right {
              width: 25%;
              height: 100%;
              float: left;

              img {
                width: 60%;
                margin-left: 8px;
                margin-top: 8px;
                cursor: pointer;
              }
            }
          }

          .item-bottom {
            background-color: #13283a;
            height: 50%;
            line-height: 50px;
            color: #fff;
            text-align: center;

            .bottom-left {
              float: left;
              width: 60%;
              font-size: 18px;
              height: 100%;
            }

            .bottom-right {
              float: left;
              width: 37%;
              color: #4dff00;
              font-family: 'DS-DIGI';
              font-size: 36px;
              height: 100%;
              background: radial-gradient(rgb(75, 17, 17), #000);
            }
          }
        }
      }
    }
  }
}
</style>