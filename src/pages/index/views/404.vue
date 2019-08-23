<template>
	<div class="blank">
		<div class="title">页面正在建设中、敬请期待 !</div>
	</div>
</template>
<script>
export default {
	name: 'blank',
	components: {},
	props: {},
	data() {
		return {}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {},
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
.blank {
  width: 1920px;
  height: 1080px;
  background: rgba(0, 0, 0, 0);
  background: url('~@/assets/img/navigation/background.png') no-repeat 0 -140px;
  background-size: 1920px 1080px;
  position: relative;

  .title {
    width: 100%;
    height: 100px;
    color: #fff;
    position: absolute;
    line-height: 100px;
    font-size: 42px;
    text-align: center;
    top: 20%;
    transform: translateY(-30%);
  }
}
</style>