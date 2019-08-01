<!--	 维护保养弹出层		-->
<template>
	<ElDialog id="dialogs" center :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
		<Row type="flex" class="row-bg" justify="center">
			<!--		时间线			-->
			<Col :span="3">
				<ElSteps class="vertical1" direction="vertical" :active="2">
					<ElStep title="计划"></ElStep>
					<ElStep title="开始执行"></ElStep>
					<ElStep title="开工会"></ElStep>
					<ElStep title="维保"></ElStep>
					<ElStep title="完工会"></ElStep>
					<ElStep title="完工"></ElStep>
				</ElSteps>
				<div class="stepsDiv">
					<p></p>
					<p></p>
					<div>
						<p style="font-size: 16px">未执行</p>
						<p style="font-size: 16px">已执行</p>
					</div>
				</div>
			</Col>
			<Col :span="4">
				<ElSteps class="vertical2" direction="vertical">
					<ElStep></ElStep>
					<ElStep></ElStep>
					<ElStep></ElStep>
				</ElSteps>
			</Col>
			<Col :span="13">
				<div class="rectangle">
					<Row style="margin-left: 50px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.firstRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt="" /><span>{{ value.title }}{{value.label}}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 50px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.secondRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt="" /><span>{{ value.title }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 50px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.thirdRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt="" /><span>{{ value.title }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 50px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.fourthRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt="" /><span>{{ value.title }}</span>
							</p>
						</Col>
					</Row>
				</div>
				<div class="rectangle">
					<Row style="margin-left: 50px">
						<Col :span="10" v-for="(value, index) in this.implement.firstRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt="" /><span>{{ value.title }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 50px">
						<Col :span="10" v-for="(value, index) in this.implement.secondRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt="" /><span
									>{{ value.title
									}}<img
										class="rectangleImg"
										src="../../assets/img/alarm-now/alarmBoxBg.png"
										v-if="value.bool === true"
								/></span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 50px">
						<Col :span="10" v-for="(value, index) in this.implement.thirdRow" :key="index">
							<p><img :src="value.imgSrc" alt="" /><span>{{value.title}}</span></p>
						</Col>
					</Row>
					<Row style="margin-left: 50px">
						<Col :span="10" v-for="(value, index) in this.implement.thirdRow" :key="index">
							<p><img :src="value.imgSrc" alt="" /><span>{{value.title}}</span></p>
						</Col>
					</Row>
				</div>
				<div class="square"></div>
				<div class="square"></div>
			</Col>
		</Row>
	</ElDialog>
</template>

<script>
import { maintenancePlanData, implement } from './maintenancePlanData'
export default {
	name: 'dialogs',
	data() {
		return {
			maintenancePlan: maintenancePlanData(),
			implement: implement(),
			ds: 'dsadsa',
			dialogVisible: true
		}
	},
	mounted() {
		this.getFindPlanRecord()
		// 修改原生dom
		this.$nextTick(() => {
			let doc = document.getElementsByClassName('vertical2')[0]
			let docEl = doc.getElementsByClassName('el-step__icon-inner')

			docEl[0].innerHTML = '07-04'
			docEl[1].innerHTML = '07-05'
			docEl[2].innerHTML = ''

			let docTitle = doc.getElementsByClassName('el-step__title')
			docTitle[0].innerHTML = '<span>维保计划</span><p class="circular"></p><p class="line"></p>'
			docTitle[1].innerHTML = '<span>开始执行</span><p class="circular"></p><p class="line"></p>'
			docTitle[2].innerHTML = '<span>开工会</span><p class="circular"></p><p class="line"></p>'
		})
	},
	methods: {
		async getFindPlanRecord() {
			let a = await this.$_api.getFindPlanRecord.getFindPlanRecord()
			console.log(a)
			// this.maintenancePlan.firstRow[0].label='fdsafasf';
			// this.maintenancePlan.firstRow.forEach((data)=>{
			// 	console.log(data)
			// })
			for(let item in this.maintenancePlan){
				console.log(this.maintenancePlan[item])
			}
		},
		handleClose() {}
	}
}
</script>

<style>
#dialogs {
	position: relative;
	height: 100%;
	overflow: hidden;
	background: url('../../assets/img/alarm-now/alarmBoxBg.png') center no-repeat;
	background-size: 100% 100%;
}

/*对话框外边距*/
#dialogs .el-dialog {
	margin: 0 !important;
}

/*对话框关闭图标*/
#dialogs .el-dialog__headerbtn .el-dialog__close {
	color: #ffffff;
}

/*取消背景色*/
#dialogs .el-dialog,
.ivu-steps .ivu-steps-title,
.ivu-steps .ivu-steps-head {
	background-color: transparent !important;
}

/*步骤条颜色*/
#dialogs .vertical1 .el-step__head.is-finish .is-text {
	border: #f4ea2a;
	background: #f4ea2a;
	color: #f4ea2a;
	box-shadow: 0 0 10px #f4ea2a;
}
/*步骤条颜色*/
#dialogs .vertical1 .el-step__head.is-wait .el-step__icon,
.vertical1 .is-process .is-text {
	color: #6c8d98;
	border-color: #6c8d98 !important;
	background: #6c8d98;
	box-shadow: 0 0 10px #6c8d98;
}
#dialogs .vertical1 .el-step__title {
	color: #90d9ff;
	float: right;
}

/*步骤条竖线*/
#dialogs .vertical1 .el-step__head.is-finish {
	border-color: #0173bb;
}
/*步骤条竖线*/
#dialogs .vertical1 .el-step .el-step__head .el-step__line {
	background-color: #0173bb;
}

#dialogs .vertical1 .el-steps--vertical {
	position: relative;
	top: -20px;
}

/*步骤条高度*/
#dialogs .vertical1 .el-step__main {
	height: 9.5vh !important;
	position: relative;
	right: 105%;
}
/*步骤条高度*/
#dialogs .vertical1 .is-flex {
	height: 50px !important;
}

#dialogs .stepsDiv {
	height: 80px;
	position: relative;
	right: 55px;
	top: -130px;
}

#dialogs .stepsDiv > p {
	width: 23.88px;
	height: 23.88px;
	border-radius: 50%;
	margin: 10px;
}
#dialogs .stepsDiv > p:first-child {
	background: #6c8d98;
	box-shadow: 0 0 10px #6c8d98;
}
#dialogs .stepsDiv > p {
	background: #f4ea2a;
	box-shadow: 0 0 10px #f4ea2a;
}
#dialogs .stepsDiv div {
	position: relative;
	top: -68px;
	left: 45px;
}
#dialogs .stepsDiv div p:first-child {
	margin-bottom: 10px;
}

#dialogs .vertical2 {
	position: relative;
	top: 50px;
}

#dialogs .vertical2 .el-step__title {
	color: #5ef3f8;
}
#dialogs .vertical1 .el-step {
	height: 20vh !important;
}
#dialogs .vertical2 .el-step {
	flex-basis: 30% !important;
}
#dialogs .vertical2 .el-step__icon {
	background: #1773a7;
	width: 3rem;
	height: 3rem;
	border: 0.5rem #6abeed solid;
}
#dialogs .vertical2 .el-step__line {
	left: 33px;
}
#dialogs .vertical2 .el-step__title {
	position: relative;
	top: 5px;
	margin-left: 42px;
}
#dialogs .vertical2 .el-step__icon-inner {
	color: #ffffff;
	font-size: 12px;
}
/*圆点*/
#dialogs .el-step__main .el-step__title .circular {
	position: relative;
	height: 7px;
	width: 7px;
	border-radius: 50%;
	background: #8ed6fc;
	left: 6.9rem;
	top: 5px;
}
/*横线*/
#dialogs .el-step__main .el-step__title .line {
	border-bottom: 2px #8ed6fc solid;
	width: 7rem;
}
#dialogs .el-step__title span {
	margin: 10px;
}
#dialogs .rectangle {
	position: relative;
	border: 1px rgba(55, 160, 226, 0.5) solid;
	border-top-right-radius: 50px;
	border-bottom-left-radius: 50px;
	height: 8rem;
	width: 100%;
	margin: 10px;
	box-shadow: inset 0 0 3px #37a0e2;
	color: #60f8fd;
	font-size: 14px;
	font-weight: bold;
	top: 5px;
}
#dialogs .rectangle p {
	margin: 18px 0 5px 0;
}
#dialogs .rectangle img {
	position: relative;
	display: inline-block;
	width: 0.7vw;
	margin-right: 15px;
	top: -1.5px;
}
#dialogs .rectangle .rectangleImg {
	position: absolute;
	height: 130px;
	width: 130px;
}
#dialogs .square {
	border: 1px rgba(55, 160, 226, 0.5) solid;
	box-shadow: inset 0 0 3px #37a0e2;
	width: 9rem;
	height: 12rem;
	display: inline-block;
	margin: 10px;
}
</style>
