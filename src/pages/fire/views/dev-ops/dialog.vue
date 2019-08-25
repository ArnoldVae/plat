<!--	 维护保养弹出层		-->
<template>
	<ElDialog
		id="dialogs"
		:title="'消防维保记录详情'"
		center
		:visible.sync="dialogVisible"
		width="100%"
		style="top:-82vh;left: 4vw"
		:before-close="handleClose"
	>
		<Row type="flex" class="row-bg" justify="center">
			<!--		时间线			-->
			<Col :span="3">
				<ElSteps class="vertical1" direction="vertical" :active="num">
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
			<Col :span="14">
				<div class="rectangle">
					<Row style="margin-left: 25px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.firstRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>{{ value.title }}{{ value.data }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 25px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.secondRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>{{ value.title }}{{ value.data }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 25px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.thirdRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>{{ value.title }}{{ value.data }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 25px">
						<Col :span="8" v-for="(value, index) in this.maintenancePlan.fourthRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>{{ value.title }}{{ value.data }}</span>
							</p>
						</Col>
					</Row>
				</div>
				<div class="rectangle">
					<Row style="margin-left: 25px">
						<Col :span="10" v-for="(value, index) in this.implement.firstRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>{{ value.title }}{{ value.data }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 25px">
						<Col :span="10" v-for="(value, index) in this.implement.secondRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>
									{{ value.title }}
									<img
										class="rectangleImg"
										:src="value.data.vcFileFullName"
										v-if="value.bool === true"
									/>
									<span v-if="value.bool === false">
										{{ value.data }}
									</span>
								</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 25px">
						<Col :span="10" v-for="(value, index) in this.implement.thirdRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>{{ value.title }}{{ value.data }}</span>
							</p>
						</Col>
					</Row>
					<Row style="margin-left: 25px">
						<Col :span="10" v-for="(value, index) in this.implement.fourthRow" :key="index">
							<p>
								<img :src="value.imgSrc" alt />
								<span>{{ value.title }}{{ value.data }}</span>
							</p>
						</Col>
					</Row>
				</div>
				<div class="square" v-for="(value, index) in this.implement.imgs" :key="index">
					<img style="height: 100%;width: 100%" :src="value.data.vcFileFullName" alt="" />
				</div>
			</Col>
		</Row>
	</ElDialog>
</template>

<script>
import { maintenancePlanData, implement } from './maintenancePlanData'

export default {
	name: 'dialogs',
	props: {
		dialogVisible: {
			type: Boolean,
			default: true
		},
		delitail: {
			type: String
		}
	},
	data() {
		return {
			maintenancePlan: maintenancePlanData(),
			delitedatall: {},
			implement: implement(),
			num: 0
		}
	},
	watch: {
		dialogVisible: function(val) {
			if (val === true) {
				// this.$nextTick(() => {
				setTimeout(() => {}, 300)
				// })
			}
		},

		async delitail(val) {
			if (val) {
				this.getFindPlanRecord(val)
			}
		}
	},
	mounted() {},
	methods: {
		async getFindPlanRecord(val) {
			let a = await this.$_api.maintaining.getFindPlanDetail({
				mtcPlanId: val
			})
			let b = a.data
			let bIndex1 = b.beginTime.substring(b.beginTime.indexOf('-') + 1, b.beginTime.length)
			let bIndex2 = b.record.iBeginTime.substring(
				b.record.iBeginTime.indexOf('-') + 1,
				b.record.iBeginTime.length
			)
			let bIndex3 = b.record.iEndTime.substring(b.record.iEndTime.indexOf('-') + 1, b.record.iEndTime.length)

			let doc = null
			let docEl = null
			this.num = b.status === '已结束' ? 6 : b.status === '正在执行' ? 2 : 0
			console.log(this.num)

			doc = document.getElementsByClassName('vertical2')[0]
			docEl = doc.getElementsByClassName('el-step__icon-inner')
			docEl[0].innerHTML = bIndex1
			docEl[1].innerHTML = bIndex2
			docEl[2].innerHTML = bIndex3

			let docTitle = doc.getElementsByClassName('el-step__title')
			docTitle[0].innerHTML = '<span>维保计划</span><p class="circular"></p><p class="line"></p>'
			docTitle[1].innerHTML = '<span>开始执行</span><p class="circular"></p><p class="line"></p>'
			docTitle[2].innerHTML = '<span>开工会</span><p class="circular"></p><p class="line"></p>'

			this.f(b, this.maintenancePlan)
			this.f(b.record, this.implement)
		},
		handleClose() {
			this.$emit('handleClose', false)
		},
		f(data, value) {
			let t = data
			for (let item in value) {
				for (let val of value[item]) {
					for (let da in t) {
						if (val.label === da) {
							val.data = t[da]
						}
					}
				}
			}
		}
	}
}
</script>

<style>
#dialogs {
	position: relative;
	height: 740px;
	width: 88%;
	overflow: hidden;
	background: url('../../assets/img/dialog.png') no-repeat;
	background-size: 100% 100%;
	/*border-top: 0;*/
}

/*对话框外边距*/
#dialogs .el-dialog {
	margin: 0 !important;
}

/*对话框关闭图标*/
#dialogs .el-dialog__headerbtn .el-dialog__close {
	color: #ffffff;
	font-size:30px;
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
	top: -40px;
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
	left: -20%;
}

#dialogs .vertical2 .el-step__title {
	font-size: 18px;
	color: #5ef3f8;
}

#dialogs .vertical2 .el-step__title span {
	margin-left: 10px;
	padding-left: 20px;
}

#dialogs .vertical1 .el-step {
	height: 100px !important;
}

#dialogs .vertical2 .el-step {
	flex-basis: 30% !important;
	margin-bottom: 150px;
}

#dialogs .vertical2 .el-step__icon {
	background: #7f8c33;
	width: 90px;
	height: 90px;
	border: 10px #d3dd4b solid;
	box-shadow: 0 0 20px #f4ea2a;
}

#dialogs .vertical2 .el-step__line {
	left: 45px;
	top: 90px;
	height: 200px;
}

#dialogs .vertical2 .el-step__title {
	position: relative;
	top: 15px;
	margin-left: 50px;
}

#dialogs .vertical2 .el-step__icon-inner {
	color: #ffffff;
	font-size: 16px;
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
	width: 110%;
	margin: 10px;
	box-shadow: inset 0 0 30px #183247;
	color: #fff;
	font-size: 15px;
	top: 5px;
}

#dialogs .rectangle p {
	margin: 13px 0 3px 0;
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
	box-shadow: inset 0 0 30px #183247;
	width: 9rem;
	height: 12rem;
	display: inline-block;
	margin: 10px;
}

#dialogs .el-dialog__wrapper {
	width: 1300px;
	left: 20%;
	top: -265px;
}

#dialogs .el-dialog__header {
	/* background: url('../../assets/img/dialog.png') no-repeat;
	background-size: 100% 100%; */
	padding: 5px 0;
	font-weight: 700;
}
</style>
