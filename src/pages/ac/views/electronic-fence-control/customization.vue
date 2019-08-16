<template>
	<div class="electronicFence"></div>
</template>
<script>
export default {
	name: 'electronic-fence-control-customization',
	components: {},
	data() {
		return {}
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {}
}
</script>

<style lang="stylus" scoped>
.electronicFence {
  width: 100%;
  height: 100%;

  .electronicFence-top {
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

  .electronicFence-center {
    width: calc(100% - 20px);
    height: calc(100% - 34px);
    background-image: url('~@/assets/img/common/bg-border.png');
    background-size: 100% 100%;
    padding: 30px;
  }
}
</style>
