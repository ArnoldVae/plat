<template>
	<div class="ocx-modal-test">
		<div class="action">
			<Button @click="handleTestInsOcxMessage">消息框测试</Button>
			<Button @click="handleTestOcxModal">模态框测试</Button>
			<Button @click="handleTestInsOcxModal">实例化模态框测试</Button>
			<Button @click="handleTestHistoryModal">历史数据模态框测试</Button>
		</div>
		<div class="container">
			<!-- <div class="video-wrap">
				<ocx-video :videoConfig="videoConfig"></ocx-video>
			</div> -->
			<ocx-modal
				v-model="ocxModel"
		        title="标题"
		        scrollable
		        :mask="true"
		        :closable="false"
		        :mask-closable="true"
		    >
		        <p>内容区域部分</p>
		        <p>内容区域部分</p>
		        <p>内容区域部分</p>
			</ocx-modal>

			<ac-history-modal
				v-model="historyModel"
				:node-id="nodeId"
				sub-title="子标题"
				unit="%"
	    	>
	    	</ac-history-modal>
		</div>
	</div>
</template>
<script>
// import ocxVideo from '@/components/native/video/OcxVideo'
export default {
	name: 'ocx-modal-test',
	// 'ocx-video': ocxVideo,
	components: {},
	props: {},
	data() {
		return {
			ocxModel: false,
			videoConfig: {
				isAutoPlay: true,
				serviceInfo: '1$172.26.1.128$6800$admin$admin',
				deviceInfo: '2|172.26.1.128:3777|admin:admin123|0',
				hideTool: true
			},
			historyModel: false,
			nodeId: ''
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	beforeUpdate() {},
	update() {},
	beforeDestory() {},
	methods: {
		handleTestInsOcxMessage() {
			// 提示框 success warning error loading
			this.$ocxMessage.info({
	        	content: '提示消息',
	        	duration: 3
	        })
		},
		handleTestOcxModal() {
			this.ocxModel = true
		},
		handleTestInsOcxModal() {
			// 确认框 info success warning error confirm
	        this.$ocxModal.confirm({
	            title: '警告',
				content: '确认删除吗？',
				onOk: () => {
					console.log('确认')
				},
				onCancel: () => {
					console.log('取消')
				}
	        })
		},
		handleTestHistoryModal() {
			this.historyModel = true
			this.nodeId = 'f14099d51d7d43cfbf290a0b544062c3'
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
.ocx-modal-test {
	.action {
		display: flex;
		justify-content: center;

		.ivu-btn {
			margin: 10px;
		}	
	}
	.container {
		.video-wrap {
			width: 100%;
			height: 400px;
			position: relative;
		}
	}
}
</style>