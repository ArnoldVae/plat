<template>
	<div class="protectionZone">
		
	</div>
</template>

<script>
export default {
	name: 'index',
	data() {
		return {
			date: new Date().getFullYear()-4,
			isButton1: false,
			isButton2: false,
			isButton3: false,
			data: ''
		}
	},
	mounted() {
		this.isClick1()
		// this.lookImG()
	},
	methods: {
		// lookImG() {
		// let url = "http://26.47.189.184:8085/webshare/pdf/xxx.docx"
		// this.data = ('http://26.47.189.183:8012/onlinePreview?url=' + encodeURIComponent(url));
		// },
		isClick1() {
			this.isButton1 = true
			this.isButton2 = false
			this.isButton3 = false
		},
		isClick2() {
			this.isButton1 = false
			this.isButton2 = true
			this.isButton3 = false
		},
		isClick3() {
			this.isButton1 = false
			this.isButton2 = false
			this.isButton3 = true
		},
		selectDate () {

		}
	}
}
</script>

<style lang="stylus" scoped>
.protectionZone {
	width: 100%;
	height: 100%;
	text-align: center;
}
.el-select {
	margin-top: 10px;
}
.action span {
	color: #ffd36a;
}

.blueBtn {
	background: url('../../../assets/img/comfim.png') no-repeat;
	background-size: 100% 100%;
	color: #ffffff;
	font-size: 16px;
	width: 2.4rem;
	margin-top: 30px;
}
.blueBtn:last-child {
	margin-right: 30px;
}

.iframeCal {
	height: 35.66667rem!important;
	left: 112px;
	margin-top: 10px;
	border: none;

	#sidebarContainer {
		display: none;
	}
}

.protectionZone {
	margin-top: 5px!important;
}
</style>
