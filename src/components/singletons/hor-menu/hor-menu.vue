<template>
	<div v-cloak class="hor-menu">
		<div v-for="(item, index) in data" class="system-item" :key="item.subSystemId">
			<div @click="handleSelect(index, item)" class="name" :class="{ current: currentSystemId == item.subSystemId }">
				{{ item.vcName }}
			</div>
		</div>
		<div class="go-back" @click="handleGoBack()">
			返回
		</div>
	</div>
</template>
<script>
export default {
	name: 'hor-menu',
	components: {},
	props: {
		currentSystemId: {
			type: Number
		},
		data: {
			type: Array
		}
	},
	data() {
		return {}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		handleSelect(index, item) {
			this.$emit('handleSelectSideMenu', item)
		},
		handleGoBack() {
			this.$emit('handleGoBack')
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
[v-cloak] {
    display: none;
}
.hor-menu {
	display: flex;
	width: 1570px;
	height: 46px;
	background: url('~@/assets/img/common/tabs-bg.png') no-repeat;
	background-size: 1590px 46px;
	position: relative;
	padding-right: 70px;
	
	> .system-item {
		display: flex;
		align-items: center;

		.name {
			font-size: 15px;
			margin: 0 30px;
			cursor: pointer;
			color: #b0e1f9;

			&.current {
				color: #f6ce69;
			}
		}
	}
	
	.go-back {
		position: absolute;
		right: 20px;
		top: 9px;
		font-size: 18px;
		color: #62bdf5;
		cursor: pointer;

		&:hover {
			color: #47b2fe;
		}
	}
}
</style>
