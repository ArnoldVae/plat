<template>
	<div class="confirm-modal-content" :style="`z-index: ${show ? 99999 : -1};`">
		<!-- 对话框 -->
		<Modal
			v-model="show"
			:title="title"
			:transfer="false"
			:mask-closable="false"
			scrollable
			:closable="false"
			ref="confirmModal"
			:mask="!createIframe"
		>
			<iframe src="about:blank" frameborder="0" marginheight="0" marginwidth="0"></iframe>

			<span style="font-size: 0.22rem;" v-html="text"></span>

			<iframe
				src="about:blank"
				frameborder="0"
				marginheight="0"
				marginwidth="0"
				ref="iframe"
				v-if="createIframe"
			></iframe>

			<div slot="footer">
				<Button type="primary" size="large" @click="confirmHandler">{{ confirmText }}</Button>
				<Button type="text" size="large" @click="cancelHandler">{{ cancelText }}</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
export default {
	name: 'confirmModalComponent',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '提示'
		},
		text: {
			type: String,
			default: '提示内容'
		},

		createIframe: {
			type: Boolean,
			default: false
		},
		confirmText: {
			type: String,
			default: '确认'
		},
		cancelText: {
			type: String,
			default: '取消'
		}
	},
	model: {
		prop: 'show',
		event: 'toggleShow'
	},
	data() {
		return {}
	},
	watch: {},
	computed: {},
	components: {},
	created() {},
	mounted() {},
	methods: {
		cancelHandler() {
			this.$emit('on-cacel')
			this.$emit('toggleShow', false)
		},
		confirmHandler() {
			this.$emit('on-ok')
			this.$emit('toggleShow', false)
		},
		modalVisible(status) {
			if (!status) {
				this.$emit('toggleShow', false)
			}
		}
	},
	beforeDestroy() {}
}
</script>
<style lang="stylus" scoped>
.confirm-modal-content {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;

  iframe {
    position: absolute;
    visibility: inherit;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: -1px;
    left: -1px;
    border-radius: 4px;
  }

  /deep/.ivu-modal {
    top: 300px;
    width: 500px !important;
    background-color: #132332;
    box-shadow: none;
    border-radius: 5px;
    box-shadow: 0 0 2px #fff;

    .ivu-modal-content {
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0);
      font-size: 16px;
      box-shadow: none;
      border: 1px solid #6a7881;
    }

    .ivu-modal-close {
      display: none;
    }

    .ivu-modal-header {
      padding: 10px 14px;
      border-bottom: 1px solid #6a7881;
      display: flex;
      align-items: center;

      .ivu-modal-header-inner {
        font-size: 18px;
        font-weight: 400;
        color: #fff;
      }
    }

    .ivu-modal-body {
      padding: 14px;
      margin-bottom: 30px;
      color: #fff;
      border: none;

      span {
        font-size: 16px !important;
      }
    }

    .ivu-modal-footer {
      border: none;
      padding: 8px 18px 14px;

      .ivu-btn {
        width: 80px;
        height: 40px;
        font-size: 16px;
        border-radius: 5px;
        background-color: transparent;
        border-color: #6a7881;
        color: #fff;
        margin-left: 5px;

        &:hover {
          background-color: transparent;
          border-color: #fff;
        }
      }
    }
  }

  /deep/.ivu-modal-mask {
    background-color: transparent !important;
  }
}
</style>
<style lang="stylus"></style>
