<template>
	<div class="ctnBox">
		<div class="col">
			<VideoKurento :videoConfig="videoObj1"></VideoKurento>
		</div>
		<div class="col">
			<VideoKurento :videoConfig="videoObj2"></VideoKurento>
		</div>
	</div>
</template>

<script>
import VideoKurento from './videoKurento'
export default {
	name: 'VideoPage',
	data() {
		return {
			videoObj1: {
				videoId: 'video1',
				// videoUrl: 'rtsp://admin:admin@172.26.1.204:554/cam/realmonitor?channel=19&subtype=0',
				// videoUrl: 'rtsp://admin:admin@172.26.1.204:554/cam/realmonitor?channel=19&subtype=0',
				// videoUrl: 'rtsp://admin:admin123@172.26.1.28:554/cam/realmonitor?channel=2&subtype=0',
				videoUrl: 'rtsp://admin:admin123@172.26.1.28:554/cam/realmonitor?channel=2&subtype=1',
				isAutoPlay: true
			},
			videoObj2: {
				videoId: 'video2',
				videoUrl: 'rtsp://admin:admin123@172.26.1.28:554/cam/realmonitor?channel=2&subtype=1',
				isAutoPlay: false
			}
		}
	},
	components: {
		VideoKurento
	},
	methods: {},
	mounted() {}
}
</script>

<style>
.ctnBox {
	width: 100%;
	height: 800px;
}
.col {
	float: left;
	width: 50%;
	height: 100%;
	padding: 10px;
	box-sizing: border-box;
}
</style>
