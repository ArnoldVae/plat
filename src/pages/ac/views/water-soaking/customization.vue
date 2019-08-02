<template>
  <div class="waterSoaking"
       style="height:100%;">
    <div class="buttnBox">
      <div :class="{ 'active':pictureShow ,'water_buttonFire':true}"
           @click="photoShow('电缆')">220kV场地电缆沟-水浸</div>
      <div :class="{'water_buttonFire':true ,'active':!pictureShow}"
           @click='photoShow("防火")'>500kV东善桥变电站防火封堵-水浸</div>
    </div>
    <div class="photoBox">
      <div class="dianPhoto"
           v-show="pictureShow">
        <img src="../../assets/img/dongshanqiao/intelligent/waterLogging/220kVdLan_waterLogging.png"
             alt="">
      </div>
      <div class="firePhoto"
           v-show="!pictureShow">
        <img src="../../assets/img/dongshanqiao/intelligent/waterLogging/500kVdsqFire_waterLogging.png"
             alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			pictureShow: true
		}
	},
	methods: {
		photoShow(type) {
			if (type == '电缆') {
				this.pictureShow = true
			} else if (type == '防火') {
				this.pictureShow = false
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.waterSoaking {
  // width: 100%;
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 5px 50px 25px 50px;

  .buttnBox {
    height: 30px;
    margin-bottom: 10px;

    .water_buttonDian, .water_buttonFire {
      float: left;
      height: 30px;
      line-height: 30px;
      border: 1px solid #0691da;
      margin-left: 10px;
      border-radius: 5px;
      color: #fff;
      padding: 0 10px;
      font-size: 16px;
      cursor: pointer;
    }

    .water_buttonFire {
      border-right: 2px solid #3ea1aa;
    }

    .active {
      color: #ffd76a;
    }
  }

  .photoBox {
    width: 100%;
    height: 635px;

    .dianPhoto, .firePhoto {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>


