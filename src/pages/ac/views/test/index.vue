<template>
	<div class="test">
		<!-- 切换 -->
		<Menu mode="horizontal" theme="dark" :active-name="current" @on-select="handleClickMenuItem">
			<MenuItem name="ocx-modal-test">
				<Icon type="md-albums" />
				封装弹窗测试
			</MenuItem>
			<MenuItem name="chart-test">
				<Icon type="md-pulse" />
				封装Echarts测试
			</MenuItem>
			<MenuItem name="other-test">
				<Icon type="md-share-alt" />
				其他测试
			</MenuItem>
		</Menu>
		<!-- 展示 -->
		<transition name="right" mode="out-in">
			<component v-bind:is="current"></component>
		</transition>
	</div>
</template>
<script>
import ocxModalTest from './ocx-modal-test.vue'
import chartTest from './chart-test.vue'
import otherTest from './other-test.vue'
export default {
	name: 'test',
	components: {
		'ocx-modal-test': ocxModalTest,
		'chart-test': chartTest,
		'other-test': otherTest
	},
	props: {},
	data() {
		return {
			current: 'ocx-modal-test',
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
	methods: {
		handleClickMenuItem(name) {
			this.current = name
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
.test {
	.ivu-menu-horizontal {
		display: flex;
    	justify-content: center;
	}
}
</style>