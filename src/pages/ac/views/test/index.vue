<template>
	<div class="test">
		<div class="video-wrap">
			<ocx-video :videoConfig="videoConfig"></ocx-video>
		</div>
		<Button type="primary" @click="modal1 = true">Display dialog box</Button>
		<ocx-modal
			v-model="modal1"
	        title="Common Modal dialog box title"
	        @on-ok="ok"
	        @on-cancel="cancel"
	        scrollable
	        :mask="true"
	        :closable="false"
	        :mask-closable="true"
	    >
	    	<Button>123</Button>
	        <p>Content of dialog</p>
	        <p>Content of dialog</p>
	        <p>Content of dialog</p>
		</ocx-modal>
        <confirm-modal
	      	title="提醒"
	      	text="确认执行该操作？"
	      	v-model="confirmModalShow"
    	></confirm-modal>
	</div>
</template>
<script>
import ocxVideo from '@/components/native/video/OcxVideo'
import confirmModal from '@/components/native/confirm-modal/confirm-modal.vue'
export default {
	name: 'test',
	components: {
		'ocx-video': ocxVideo,
		'confirm-modal': confirmModal,
	},
	props: {},
	data() {
		return {
			modal1: false,
			videoConfig: {
				isAutoPlay: true,
				serviceInfo: '1$172.26.1.128$6800$admin$admin',
				deviceInfo: '2|172.26.1.128:3777|admin:admin123|0',
				hideTool: true
			},
			confirmModalShow: false
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {
		// this.$Modal.confirm({
  //           title: 'title',
  //           content: 'content'
  //       });
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		ok () {
		
		// 提示框
        this.$ocxMessage.info({ //success warning error loading
        	content: '提示消息',
        	duration: 3
        });

        // 确认框
        this.$ocxModal.confirm({ //info success warning error confirm
            title: '警告',
			content: '确认删除吗？',
			onOk: () => {
				
			}
        });
            

        },
        cancel () {
            this.$Message.info('Clicked cancel');
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
.test {
	width: 1920px;
	height: 1920px;
	background: url('~@/assets/img/navigation/background.png') no-repeat;
	background-size: 1920px 1080px;

	.video-wrap {
		width: 100%;
		height: 400px;
		position: relative;
	}
}
</style>