<template>
  <div class="arrester-monitor-customization">
    <h1>避雷器监测</h1>
  </div>
</template>
<script>

import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'arrester-monitor-customization',
	components: {  },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
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

	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
	
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
}
</style>