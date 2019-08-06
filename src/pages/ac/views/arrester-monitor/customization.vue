<template>
  <div class="arrester-monitor-customization">
    <div class="arrester">
      <!-- 主变区域Start -->
      <div class="main-content">
        <div class="title">1号主变</div>
        <div class="level-bottom">
          <div class="level">
            <div class="title">35kV</div>
			<div class="item-box">
				<div class="left-title"></div>
				<div class="item"></div>
			</div>
          </div>
          <div class="level">
            <div class="title">220kV</div>
          </div>
          <div class="level">
            <div class="title">500kV</div>
          </div>
        </div>
      </div>
      <!-- <div class="main-content">
        <div class="title">1号主变</div>
        <div class="level-bottom">
          <div class="level">
            <div class="title">35kV</div>
          </div>
          <div class="level">
            <div class="title">220kV</div>
          </div>
          <div class="level">
            <div class="title">500kV</div>
          </div>
        </div>
      </div>
      <div class="main-content">
        <div class="title">1号主变</div>
        <div class="level-bottom">
          <div class="level">
            <div class="title">35kV</div>
          </div>
          <div class="level">
            <div class="title">220kV</div>
          </div>
          <div class="level">
            <div class="title">500kV</div>
          </div>
        </div>
      </div> -->
      <!-- 主变区域end -->
      <!-- 非主变区域Start -->
      <div class="other-content">
        <div class="title">A相避雷器</div>
        <div class="other-list">
          <div class="other-item"></div>
          <div class="other-item"></div>
          <div class="other-item"></div>
        </div>
      </div>
      <!-- <div class="other-content">
        <div class="title">A相避雷器</div>
        <div class="other-list">
          <div class="other-item"></div>
          <div class="other-item"></div>
          <div class="other-item"></div>
        </div>
      </div>
      <div class="other-content">
        <div class="title">A相避雷器</div>
        <div class="other-list">
          <div class="other-item"></div>
          <div class="other-item"></div>
          <div class="other-item"></div>
        </div>
      </div>
      <div class="other-content">
        <div class="title">A相避雷器</div>
        <div class="other-list">
          <div class="other-item"></div>
          <div class="other-item"></div>
          <div class="other-item"></div>
        </div>
      </div> -->
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
			unitId: this.$store.getters.unitId
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
				console.log(res)
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
      border: 1px solid #000;

      .level-bottom {
        width: 100%;
        height: calc(100% - 40px);
        margin-top: 10px;
        display: flex;
        justify-content: space-around;

        .level {
          box-sizing: border-box;
          width: calc(33.33% - 15px);
          height: 100%;
          border: 1px solid #fff;
		  .item-box{
			  width 100%;
			  padding 15px 2px;
			  border 1px solid #0f0;
			  .left-title{
				  width 70px;
				  height 50px;
				  background-color #fff;
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
      height: 200px;
      float: left;
      background-color: #fff;

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
          background-color: #000;
          border: 1px solid #000;
        }
      }
    }
  }
}
</style>