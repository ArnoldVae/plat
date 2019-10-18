<template>
	<div class="protectionZone">
		<!-- <img src="../../../assets/img/main/lan.png" style="width: 100%;height: 5%" alt="" /> -->
		<!-- <span style="position: relative;top:-85px;left: 9.5%;font-size:44PX;color: #000000;font-weight: bold"
			>年度全面检测报告</span -->
		>
		<div style="float: right;margin-right: 30px">
			<!-- <el-button @click="isClick1" :class="{ action: isButton1 }" class="blueBtn" size="mini" type="text"
				>{{ date }}
			</el-button>
			<el-button @click="isClick2" class="blueBtn" :class="{ action: isButton2 }" size="mini" type="text"
				>{{ date - 1 }}
			</el-button>
			<el-button @click="isClick3" class="blueBtn" :class="{ action: isButton3 }" size="mini" type="text"
				>{{ date - 2 }}
			</el-button> -->
	
				<el-select v-model="date" @change="selectDate" placeholder>
					<el-option label="2015" :value="0"></el-option>
					<el-option label="2016" value="1"></el-option>
					<el-option label="2017" value="2"></el-option>
					<el-option label="2018" value="3"></el-option>
					<el-option label="2019" value="4"></el-option>
				</el-select>
		</div>
		<iframe
			class="iframeCal"
			src="http://26.47.189.183:8012/onlinePreview?url=http%3A%2F%2F26.47.189.184%3A8085%2Fwebshare%2Fpdf%2Fdsqxfss.docx&officePreviewType=pdf"
			height="98%"
			width="81%"
			style="position: relative;"
		></iframe>
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
