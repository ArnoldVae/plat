<template>
	<div class="monitor-current">
		<div class="current-top">
			<span v-for="(item, index) in list" :key="index" :class="{ onBut: pitchOn == item.pageId }">{{
				item.vcName
			}}</span
			><!-- @click="but(item)" -->
		</div>
		<div class="current-center">
			<mcBlueprint
				:blueprintUrl="blueprintUrl"
				:blueprintObj="blueprintObj"
				:primitiveNodes="primitiveNodes"
				:unitId="unitId"
			/>
		</div>
	</div>
</template>

<script>
import mcBlueprint from './mc-blueprint'
export default {
	name: 'monitor-current',
	components: {
		mcBlueprint
	},
	props: {
		unitId: {
			type: String
		}
	},
	data() {
		return {
			axios: this.$_api.monitorData,
			blueprintUrl: '',
			blueprintObj: {},
			primitiveNodes: [], //图元节点数组
			list: [],
			pitchOn: ''
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getData()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//获取图纸信息
		getData() {
			let params = {
				unitId: this.unitId,
				iSubType: '10100006'
			}
			this.axios.getMCDrawing(params).then(res => {
				if (res.code == 200) {
					this.list = res.data
					console.log(res)
					if (res.data.length) {
						console.log(res)
						this.blueprintObj = res.data[0]
						this.blueprintUrl = res.data[0].vcUrl
						this.pitchOn = res.data[0].pageId
					}
				}
			})
		},
		//获取图元节点信息
		getPrimitiveNodes(pageId) {
			let params = {
				pageId,
				unitId: this.unitId
			}
			this.axios.getMCFind(params).then(res => {})
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
.monitor-current{
	width: 100%;
	height: 100%;

	.current-top{
		height: 34px;

		.onBut{
			color: #ffe06d;
		}

		>span{
			color: #8fd8fe;
			display: inline-block;
			margin-left: 11px;
			text-align: center;
			font-size: 14px;
			height: 28px;
			line-height: 28px;
			padding: 0 5px;
			border: 1px solid #0173bb;
			border-radius: 3px;
			cursor: pointer;
		}
	}

	.current-center{
		width: 100%;
		height: 465px;
	}
}
</style>
