<template>
	<div class="filter-test">
		<div class="action">
			<Button @click="val=0">匹配值0</Button>
			<Button @click="val=1">匹配值1</Button>
			<Button @click="val=2">匹配值2</Button>
		</div>
		<div class="container">
			<div class="left">
				<ul>
					<li v-for="item in descList">{{ item }}</li>
				</ul>
			</div>
			<div class="center" style="color:#0af">
				当前值：{{ val }}
			</div>
			<div class="right">
				<ul>
					<li v-for="item in descList">{{ item | getDescLabel(val) }}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
// 全局引入
import Vue from 'vue'
import fort from '@/filters'
Vue.use(fort)
export default {
	name: 'filter-test',
	components: {},
	props: {},
	data() {
		return {
			descList: [
				'0 关|1 开|2 撤',
			],
			val: ''
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	beforeUpdate() {},
	update() {},
	beforeDestory() {},
	methods: {},
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
.filter-test {
	.action {
		display: flex;
		justify-content: center;

		.ivu-btn {
			margin: 10px;
		}
	}
	.container {
		display: flex; 
		justify-content: center; 

		> div {
			margin: 0 10px;
		}
	}
}
</style>
