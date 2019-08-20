<template>
<div class="info"> <Modal v-model="modal1" width="1700" :styles="{top: '60px'}">
    <div class="info-content"></div>
    <div slot="footer"></div>
  </Modal></div>
 
</template>
<script>
export default {
	name: 'info-modal',
	data() {
		return {
			modal1: true
		}
	},
	mounted() {},

	created() {},

	watch: {},
	methods: {}
}
</script>

<style lang="stylus">
.info-content {
  width: 100%;
  height: 900px;
}

.ivu-modal-content{
background-color: #141a26;
}
.ivu-modal-footer{
	border 0px;
}
</style>

