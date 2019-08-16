<template>
	<div id="video">
		<div>
			<img src="../../assets/img/title.png" alt="" />
			<span>主设备监视</span>
			<video height="93.5%" width="100%" @click="play" class="video">
				<source src="http://26.47.189.184:9000/1.mp4" type="video/mp4" />
			</video>
		</div>
		<div>
			<img src="../../assets/img/title.png" alt="" />
			<span>一键顺控主机</span>
			<video height="93.5%" width="100%" @click="play" class="video">
				<source src="http://26.47.189.184:9000/2.mp4" type="video/mp4" />
			</video>
		</div>
		<div>
			<img src="../../assets/img/title.png" alt="" />
			<span>一键顺控视频主机</span>
			<video height="93%.5" width="100%" @click="play" class="video">
				<source src="http://26.47.189.184:9000/3.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
</template>

<script>
export default {
	name: 'video',
	data() {
		return {
			doc: document.getElementsByClassName('video')
		}
	},
	methods: {
		play() {
			this.doc[0].play()
			this.doc[1].play()
			this.doc[2].play()
		}
	}
}
</script>

<style scoped>
#video {
	overflow-y: hidden;
	display: flex;
	width: 11320px;
	height: 100vh;
	align-items: baseline;
	background: #3a4761;
}

#video img {
	z-index: 1;
	position: relative;
	display: block;
	width: 1010px;
	height: 105px;
	margin: auto;
}

#video span {
	position: relative;
	font-size: 0.5rem;
	top: -20px;
	color: #141a26;
	text-shadow: 0 4px 1px;
	z-index: 99999;
}

#video > div {
	background: url('../../assets/img/sp-parts/back.png');
	display: block;
	text-align: center;
	margin-right: 12px;
	width: 3650px;
	height: 99%;
	border: 1px #ffffff solid;
}

#video > div:nth-child(2) {
	width: 3780px;
}

#video > div:last-child {
	width: 3780px;
	margin-right: 0;
}

#video .video {
	position: relative;
	object-fit: fill;
	top: -15px;
}
</style>
