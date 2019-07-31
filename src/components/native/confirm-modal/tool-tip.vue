<template>
	<div
		:class="{
			'tool-tip-content': true,
			'tool-tip-warning': type == 'warning',
			'tool-tip-success': type == 'success'
		}"
		v-show="show"
	>
		<!-- <i class="el-icon-warning-outline" v-if="type== 'warning'"></i>
    <i class="el-icon-circle-check" v-else></i>-->
		<Icon type="ios-alert" v-if="type == 'warning'" />

		<Icon type="ios-checkmark-circle" v-else />

		<span>{{ title }}</span>

		<iframe
			src="about:blank"
			frameborder="0"
			marginheight="0"
			marginwidth="0"
			style="position: absolute; visibility: inherit; top: 0px; left: 0px; width: 100%; height: 100%; z-index: -1; filter: alpha(opacity = 0);"
		></iframe>
	</div>
</template>
<script>
export default {
	name: '',
	props: {
		type: {
			type: String,
			default: 'success'
		},
		title: {
			type: String,
			default: '提示'
		},
		show: {
			type: Boolean,
			default: false
		},
		time: {
			type: Number,
			default: 1500
		},

		createIframe: {
			type: Boolean,
			default: false
		}
	},
	model: {
		prop: 'show',
		event: 'toggleShow'
	},
	data() {
		return {}
	},
	watch: {
		show: {
			handler(val) {
				if (val) {
					setTimeout(() => {
						this.$emit('toggleShow', false)
					}, this.time)
				}
			},
			immediate: true
		}
	},
	computed: {},
	components: {},
	created() {},
	mounted() {},
	methods: {},
	beforeDestroy() {}
}
</script>
<style lang="stylus" scoped>
.tool-tip-content {
  width: auto;
  padding: 6px 20px;
  background-color: #363841;
  position: absolute;
  top: 10%;
  left: 45%;
  // transform: translate(-50%, -50%);
  font-size: 20px;
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0 0 2px #94dfff;

  > span {
    display: 'inline-block';
    margin-left: 10px;
    color: #94dfff;
  }

  iframe {
    position: absolute;
    visibility: inherit;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: -1px;
    left: -1px;
    border-radius: 4px;
  }
}

.tool-tip-success {
  .ivu-icon {
    color: #19be6b;
  }
}

.tool-tip-warning {
  .ivu-icon {
    color: #ff9900;
  }
}
</style>
<style lang="scss"></style>
