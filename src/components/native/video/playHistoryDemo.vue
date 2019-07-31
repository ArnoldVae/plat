<template>
	<div style="width:900px;height:600px;">
		<ocxvideo :videoConfig="videoConfig" ref="video"></ocxvideo>
		<input type="button" value="查看录像" @click="playback" />

		<input type="button" value="恢复重置" @click="reset" />

		<input type="button" value="弹出弹框" @click="modalShowHandler" />
	</div>
</template>

<script>
import ocxvideo from './OcxVideo'
import moment from 'moment'
export default {
	components: {
		ocxvideo
	},
	data() {
		return {
			videoConfig: {
				deviceInfo: '2|22.46.34.114:37779|admin:admin123|16',
				isAutoPlay: true,
				serviceInfo: '1$22.46.34.114$6800$admin$admin',
				hideTool: true
			},

			modalShow: false
		}
	},
	methods: {
		playback() {
			let startTime = moment()
					.subtract(6, 'hours')
					.format('YYYY-MM-DD HH:mm:ss'),
				endTime = moment()
					.subtract(3, 'hours')
					.format('YYYY-MM-DD HH:mm:ss')

			console.log('开始时间：', startTime, '结束时间：', endTime)

			this.$refs.video.playHistory(startTime, endTime)
		},
		reset() {
			this.$refs.video.play()
		},
		modalShowHandler() {
			this.modalShow = true
		}
	}
}
</script>
<style></style>
