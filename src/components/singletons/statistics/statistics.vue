<template>
	<div class="statistics">
		<div class="left-info" v-if="false">
			<div class="station-number">
				<div class="icon"></div>
				<div class="name">总站数：</div>
				<div class="number">296</div>
			</div>
			<div class="online-number">
				<div class="icon"></div>
				<div class="name">在线数：</div>
				<div class="number">26</div>
			</div>
			<div class="online-rate">
				<div class="icon"></div>
				<div class="name">在线率：</div>
				<div class="number">8%</div>
			</div>
			<div class="memory-rate">
				<div class="icon"></div>
				<div class="name">内存使用率：</div>
				<div class="number">1.6%</div>
			</div>
		</div>
		<div class="right-info">
			<div class="security" v-for="item in statisticsInfo">
				<div class="name">{{ item.name }}：</div>
				<div class="number">{{ item.count }}</div>
			</div>
			<!-- <div class="fire">
				<div class="name">消防总：</div>
				<div class="number">0</div>
			</div>
			<div class="environment">
				<div class="name">环境总：</div>
				<div class="number">63</div>
			</div>
			<div class="malfunction">
				<div class="name">故障总：</div>
				<div class="number">64</div>
			</div> -->
		</div>
	</div>
</template>
<script>
import axios from '@/config/api.request'
export default {
	name: 'statistics',
	components: {},
	props: {},
	data() {
		return {
			statisticsInfo: []
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.init()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 获取底部组件统计信息
		getStatisticsInfoHTTP(params) {
			return axios.request({
				url: 'dev_info/getSubSystemDevCount',
				method: 'post',
				data: JSON.stringify(params)
			})
		},
		async getStatisticsInfo() {
			let result = await this.getStatisticsInfoHTTP()
			if (result.success) {
				this.statisticsInfo = result.data
			} else {
				this.statisticsInfo = {}
			}
		},
		init() {
			this.getStatisticsInfo()
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

info-item(url) {
	display: flex;
	.icon {
		width: 16px;
		height: 15px;
		background: url(url) no-repeat;
		background-size: 16px 15px;
		margin-right: 10px;
		position: relative;
		top: 1px;
	}

	.name {
		margin-right: 10px;
	}

	.number {
		margin-right: 50px;
		color: #5bff00;
	}
}
info-item2() {
	display: flex;

	.name {
		margin-right: 10px;
	}

	.number {
		color: #5bff00;
		margin-right: 40px;
	}
}

.statistics {
	width: 100%;
	height: 50px;
	background: transparent;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #fff;
	padding-top: 15px;

	.left-info {
		margin-left: 70px;
		display: flex;

		.station-number {
			info-item('~@/assets/img/common/station-number.png')
		}

		.online-number {
			info-item('~@/assets/img/common/online-number.png')
		}

		.online-rate {
			info-item('~@/assets/img/common/online-rate.png')
		}

		.memory-rate {
			info-item('~@/assets/img/common/memory-rate.png')
		}
	}

	.right-info {
		// margin-right: 50px;
		margin-left: 70px;
		display: flex;

		.security, .fire, .environment, .malfunction {
			info-item2()
		}
	}
}
</style>