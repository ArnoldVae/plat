<template>
	<div v-cloak class="side-menu">
		<div v-for="(item, index) in data" class="system-item" :key="item.systemId">
			<!-- 避免渲染闪烁 -->
			<div
				v-show="currentSystemId == item.systemId"
				@click="handleSelect(index, item)"
				class="icon"
				:style="{ background: `url( ${require(`@/assets/img/side-menu/${item.systemId}-${1}.png`)} )` }"
			></div>
			<div
				v-show="currentSystemId != item.systemId"
				@click="handleSelect(index, item)"
				class="icon"
				:style="{ background: `url( ${require(`@/assets/img/side-menu/${item.systemId}-${0}.png`)} )` }"
			></div>
			<div @click="handleSelect(index, item)" class="name" :class="{ current: currentSystemId == item.systemId }">
				{{ item.title }}
			</div>
		</div>
		<div class="system-item"></div>
	</div>
</template>
<script>
export default {
	name: 'side-menu',
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
.side-menu {
	width: 150px;
	height: auto;
	/* background: #000; */
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	> .system-item {
		width: auto;
		padding-bottom: 15px;

		.icon {
			width: 65px;
			height: 65px;
			background-repeat: no-repeat;
			background-size: 65px 65px!important;
			border-radius: 50%;
			margin-bottom: 5px;
			cursor: pointer;
		}

		.name {
			line-height: 15px;
			cursor: pointer;
			color: #fff;

			&.current {
				color: #0cf;
			}
		}
	}
}
</style>
