<template>
	<div class="protectionZone">
		<img src="../../assets/img/main/lan.png" style="width: 100%" alt="" />
		<span style="position: relative;top:-80px;left: 11%;font-size:1rem;color: #000000">消防设施维护保养记录表</span>
		<div style="float: right;margin-right: 30px">
			<el-button @click="isClick1" :class="{ action: isButton1 }" class="blueBtn" size="mini" type="text">{{
				date
			}}</el-button>
			<el-button @click="isClick2" class="blueBtn" :class="{ action: isButton2 }" size="mini" type="text">{{
				date - 1
			}}</el-button>
			<el-button @click="isClick3" class="blueBtn" :class="{ action: isButton3 }" size="mini" type="text">{{
				date - 2
			}}</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'index',
	data() {
		return {
			date: new Date().getFullYear(),
			isButton1: false,
			isButton2: false,
			isButton3: false
		}
	},
	mounted() {
		this.isClick1()
	},
	methods: {
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
		}
	}
}
</script>

<style>
.protectionZone {
	width: 100%;
	height: 100%;
	background-color: #141a26;
	border: 1px #ffffff solid;
	text-align: center;
}
.action span {
	color: #ffd36a;
}
.blueBtn {
	border: #0f77b2 1px solid;
	box-shadow: inset #0e3a5b 0 0 0, inset 0 0 0, inset 0 0 8px, inset 0 0 0;
	/*height: 12px;*/
	width: 3.8rem;
}
</style>
