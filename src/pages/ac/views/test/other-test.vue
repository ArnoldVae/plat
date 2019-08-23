<template>
	<div class="other-test">
		<div class="action">
			<Input v-model="val" style="width: 200px"></Input>
			<Button type="info" @click="test">测试</Button>
		</div>
		<div class="container">
			{{ str }}
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import fort from '@/filters'
Vue.use(fort)
export default {
	name: 'other-test',
	components: {},
	props: {},
	data() {
		return {
			val: '',
			str: ''
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
		test() {
			this.str = this.upperStringFirst(this.val)
		},
		upperStringFirst(str) {
			return str.substring(0, 1).toUpperCase() + str.substring(1)
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
.other-test {
	.action {
		display: flex;
		justify-content: center;

		.ivu-input-wrapper,.ivu-btn {
			margin: 10px;
		}
	}
	.container {
		display: flex;
		justify-content: center;
	}
}
</style>
