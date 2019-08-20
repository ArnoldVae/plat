<template>
	<div class="test">
		<!-- <div class="video-wrap">
			<ocx-video :videoConfig="videoConfig"></ocx-video>
		</div> -->
		<Button type="primary" @click="test" style="margin-left: 10px">测试1</Button>
		<Button type="success" @click="test2" style="margin-left: 10px">测试2</Button>
		
		<chart :option="option"></chart>

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
    	<ac-history-modal
			v-model="history"
			:node-id="nodeId"
			sub-title="asdasdasd"
			unit="%"
    	>
    	</ac-history-modal>
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
			option: {
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				legend: {
					data:['销量']
				},
				xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]
			},
			modal1: false,
			videoConfig: {
				isAutoPlay: true,
				serviceInfo: '1$172.26.1.128$6800$admin$admin',
				deviceInfo: '2|172.26.1.128:3777|admin:admin123|0',
				hideTool: true
			},
			confirmModalShow: false,
			history: false,
			nodeId: ''
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
		test() {
			this.history = true
			this.nodeId = 'f14099d51d7d43cfbf290a0b544062c3'
		},
		test2() {
			// 1.直接修改data里的数据
			// this.$set(this.option.series[0]['data'], 0, 13)
			// this.option.title.text = '更新后的名称'
			// 2.直接复制obj
			this.option = {
				title: {
					text: 'ECharts 更新'
				},
				tooltip: {},
				legend: {
					data:['销量']
				},
				xAxis: {
					data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [15, 22, 33, 11, 17, 5]
				}]
			}
		},
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
	// background: url('~@/assets/img/navigation/background.png') no-repeat;
	background-size: 1920px 1080px;

	.video-wrap {
		width: 100%;
		height: 400px;
		position: relative;
	}
}
</style>