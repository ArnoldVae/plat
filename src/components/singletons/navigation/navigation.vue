<template>
	<div v-if="enable" class="navigation">
		<div class="header">
			<div class="logo clearfix">
				<div class="icon fl"></div>
				<div class="info fl">
					<div class="chinese">{{ mainLogTitle }}</div>
					<div class="english">{{ mainLogTitleEn }}</div>
				</div>
			</div>
			<div class="headline">{{ title }}</div>
			<div class="action">
				<div class="setting"></div>
				<div class="message">
					<!-- <i v-show="alarm > 0">{{ alarm }}</i> -->
				</div>
				<div class="user"></div>
				<div class="name">{{ userName }}</div>
			</div>
		</div>
		<div class="body">
			<div @click="visible = true" class="sub-login">
				<div class="chinese">{{ subLogTitle }}</div>
				<div class="english">{{ subLogTitleEn }}</div>
			</div>
			<div class="menu">
				<template v-for="(item, index) in showMenuData">
					<div
						:key="item.moduleId"
						@click="handleSelectMenu(item, index)"
						class="menu-item"
						:class="{ active: current == item.moduleId }"
					>
						{{ item.vcCaption }}
					</div>
				</template>

				<div @click.prevent="handleExpandMenu" class="menu-item more-menu" v-show="menuData.length > 9">
					更多应用
					<div class="item-wrap" v-show="moreMenuIsShow">
						<div
							v-for="item in hiddenMenuData"
							:key="item.moduleId"
							class="more-menu-item"
							:class="{ active: current == item.moduleId }"
							@click.stop="handleSelectMenu(item)"
						>
							<div>{{ item.vcCaption }}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="time">
				<div class="current">{{ currentTime }}</div>
				<div class="other">
					<div class="month">{{ monthTime }}</div>
					<div class="week">{{ weekTime }}</div>
				</div>
			</div>
		</div>
		<!-- <a-drawer placement="left" :closable="false" :visible="visible" :maskClosable="true" @close="visible = false">
			<el-tree :data="data" :props="defaultProps"> </el-tree>
		</a-drawer> -->
	</div>
</template>
<script>
import moment from 'moment'
export default {
	name: 'navigation',
	components: {},
	props: {
		enable: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: ''
		},
		alarm: {
			type: Number,
			default: 0
		},
		userName: {
			type: String,
			default: 'admin'
		},
		menuData: {
			type: Array,
			default: []
		},
		mainLogTitle: {
			type: String,
			default: '国家电网'
		},
		mainLogTitleEn: {
			type: String,
			default: 'STATE GRID'
		},
		subLogTitle: {
			type: String,
			default: '国网江苏省电力有限公司'
		},
		subLogTitleEn: {
			type: String,
			default: 'STATE GRID JIANGSU ELECTRIC POWER CO.,LTD.'
		}
	},
	data() {
		return {
			visible: false,
			data: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			showMenuData: [],
			hiddenMenuData: [],
			moreMenuIsShow: false,
			current: null,
			timer: null,
			currentTime: '',
			monthTime: '',
			weekTime: ''
		}
	},
	computed: {},
	filters: {},
	watch: {
		/*'$route.path': {
			handler: function(val) {
				if (val == '/platform' || val == '/platform/') {
					this.$nextTick(() => {
						this.handleSelectMenu(this.showMenuData[0])
					})
				}
			},
			immediate: true
		},
		'$route.params.module': {
			handler: function(val) {
				this.$nextTick(() => {
					this.autoSelectMenu( this.getMenuDataByLocation(val) )
				})
			},
			immediate: true
		}*/
		menuData: {
			handler: function(val) {
				if (JSON.stringify(val) != '[]') {
					this.loadMenuData()
				}
			},
			deep: true
		}
	},
	created() {
		// this.loadMenuData()
		this.turnOnTime()
	},
	mounted() {
		// this.handleSelectMenu(this.showMenuData[0])
	},
	activited() {},
	update() {},
	beforeDestory() {
		clearTimeout(this.timer)
	},
	methods: {
		// 处理Menu数据
		loadMenuData() {
			this.showMenu = []
			this.hiddenMenuData = []
			this.menuData.forEach((item, index) => {
				if (index == 0) this.current = item.id

				if (index < 9) {
					this.showMenuData.push(item)
				} else {
					this.hiddenMenuData.push(item)
				}
			})
			if (this.hiddenMenuData.length > 0) {
				this.hiddenMenuData.unshift(this.showMenuData[this.showMenuData.length - 1])
				this.showMenuData.pop()
			}
			// 默认选中第一个
			this.handleSelectMenu(this.showMenuData[0], 0)
		},
		/*handleSelectMenu(item) {
			this.$router.push({ name: 'platform', params: { module: item.location }})
		},
		autoSelectMenu(item) {
			this.moreMenuIsShow = false
			this.current = item.id
			this.$emit('handleSelectMenu', item)
		},*/
		handleSelectMenu(item, index) {
			this.moreMenuIsShow = false
			this.current = item.moduleId
			this.$emit('handleSelectMenu', item, index)
		},
		getMenuDataByLocation(location) {
			let MenuItem = {}
			this.menuData.forEach(item => {
				if (item.vcExecuteObject == location) MenuItem = item
			})
			return MenuItem
		},
		handleExpandMenu() {
			this.moreMenuIsShow = !this.moreMenuIsShow
		},
		turnOnTime() {
			this.timer = setInterval(() => {
				this.currentTime = moment()
					.locale('zh-cn')
					.format('HH:mm:ss')
				this.monthTime = moment()
					.locale('zh-cn')
					.format('YYYY/MM/DD ')
				this.weekTime = moment()
					.locale('zh-cn')
					.format('dddd')
			}, 200)
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
.navigation {
	/* background: #000d16; */
	width: 100%;
	height: 140px;
	// background: var(--test-color);

	.header {
		width: 100%;
		height: 54px;
		background: url('~@/assets/img/navigation/title.png') no-repeat;
		background-size: 100% 54px;

		.logo {
			position: absolute;
			top: 33px;
			left: 15px;

			.icon {
				width: 40px;
				height: 40px;
				background: url('~@/assets/img/navigation/logo.png') no-repeat;
				background-size: 40px 40px;
			}

			.info {
				margin-left: 15px;
				// width: 195px;
				// height: 85px;
				// background: url(prefixUrl'img/log-desc.png') no-repeat;
				// background-size: 195px 85px;
				color: #40a3e9;

				.chinese {
					letter-spacing:3px;
					font-size: 24px;
					line-height: 24px;
				}

				.english {
					margin-top: 2px;
					letter-spacing:4px;
					position: relative;
					/* left: -11px; */
					font-size: 12px;
					/* font-size: 10px; */
					/* -webkit-transform: scale(0.8); */
				}
			}
		}

		.headline {
			color: #37a8ff;
			font-size: 24px;
			line-height: 52px;
			text-align: center;
			letter-spacing: 3px;
		}

		.action {
			display: flex;
			color: #fff;
			position: absolute;
			top: 30px;
			right: 30px;
			div {
				margin-left: 24px;
			}
			div:nth-of-type(4) {
				margin-left: 5px;
			}

			.setting {
				width: 16px;
				height: 16px;
				background: url('~@/assets/img/navigation/setting.png') no-repeat;
				background-size: 16px 16px;
				cursor: pointer;
				position: relative;
				top: 1px;
			}

			.message {
				width: 18px;
				height: 18px;
				background: url('~@/assets/img/navigation/message.png') no-repeat;
				background-size: 18px 18px;
				cursor: pointer;
				position: relative;

				>i {
					width: 18px;
					height: 17px;
					background: #f00;
					border-radius: 50%;
					text-align: center;
					font-size: 12px;
					position: absolute;
					top: -10px;
					right: -8px;

				}
			}

			.user {
				width: 18px;
				height: 18px;
				background: url('~@/assets/img/navigation/user.png') no-repeat;
				background-size: 18px 18px;
				cursor: pointer;
			}
		}
	}

	.body {
		display: flex;
		margin-top: 20px;
		color: #0af;

		.sub-login {
			position: relative;
			top: 8px;
			padding-left: 71px;
			color: #40a3e9;
			.chinese {
				letter-spacing:2px;
				font-size: 18px;
				line-height: 24px;
			}

			.english {
				letter-spacing:-1px;
				font-size: 12px;
			}
		}

		.menu {
			position: absolute;
			left: 340px;
			/* margin-left: 320px; */
			display: flex;
			> div.menu-item {
				font-size: 16px;
				color: #fff;
				width: 138px;
				height: 50px;
				background: url('~@/assets/img/navigation/menu.png') no-repeat;
				background-size: 138px 50px;
				box-sizing: border-box;
				margin-right: 15px;
				border-radius: 0px 17px 0px 17px;
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				&.active {
					border-color: #009cff;
					color: #f6ce69;
					background: url('~@/assets/img/navigation/menu-active.png') no-repeat;
					background-size: 138px 50px;
				}
			}

			.more-menu {
				position: relative;
				.item-wrap {
					max-width: 710px;
					/* 22px */
					/* padding: 10px 15px 25px 14px; */
					padding: 10px 0 10px 0;
					position: absolute;
					top: 52px;
					z-index: 99;

					display: flex;
					flex-wrap: wrap;
					cursor: initial;

					background: #0b255a;

					.more-menu-item {
						font-size: 16px;
						color: #fff;
						width: 138px;
						height: 50px;
						background: url('~@/assets/img/navigation/menu.png') no-repeat;
						background-size: 138px 50px;
						box-sizing: border-box;
						margin: 9px 20px;
						border-radius: 14px 17px 14px 17px;
						display: flex;
						justify-content: center;
						align-items: center;
						cursor: pointer;
						&.active {
							border-color: #009cff;
							color: #f6ce69;
							background: url('~@/assets/img/navigation/menu-active.png') no-repeat;
							background-size: 138px 50px;
						}
					}
				}
			}
		}

		.time {
			margin-left: 28px;
			color: #47b2fe;
			position: absolute;
			right: 45px;
			width: 140px;

			.current {
				font-size: 42px;
				line-height: 30px;
				font-family: 'DS-DIGI';
			}

			.other {
				display: flex;
				justify-content: space-between;
				padding-top: 6px;
				.month {

				}

				.week {

				}
			}
		}
	}
}
</style>
<style lang="stylus">
.ant-drawer-content-wrapper {
	width: 250px !important;

	.ant-drawer-content {
		background: rgba(5, 23, 35, .9);
		/* box-shadow: 2px 0px 6px #10212d; */

		.ant-drawer-body {
			padding: 10px;
		}

		.el-tree {
			background: transparent;
			color: #fff;

			.el-tree-node__content {
				height: 50px;
				&:hover {
					background-color: #05243b!important;
				}
			}
			.el-tree-node:focus>.el-tree-node__content {
				background-color: #05243b!important;
			}
		}
	}
}
</style>
