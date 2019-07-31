<template>
	<baidu-map class="map" style="display: flex; flex-direction: column" v-bind="defaultMapConfig">
		<div>
			<Button :type="btnTypeOpen" shape="circle" @click="open">开始测距</Button>
			<Button :type="btnTypeClose" shape="circle" @click="close">关闭测距</Button>
		</div>
		<bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
		<bm-distance-tool v-bind="distanceToolConfig"></bm-distance-tool>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			defaultMapConfig: {
				center: { lng: 118.877951, lat: 32.313924 },
				zoom: 13,
				scrollWheelZoom: true
			},
			distanceToolConfig: {
				open: true,
				followText: '单击确定地点，双击结束哦',
				unit: 'metric',
				lineStroke: 2,
				lineColor: '#111',
				lineStyle: 'dashed',
				opacity: 0.8,
				cursor: 'crosshair'
			}
		}
	},
	computed: {
		btnTypeOpen() {
			return this.distanceToolConfig.open ? 'primary' : 'default'
		},
		btnTypeClose() {
			return !this.distanceToolConfig.open ? 'primary' : 'default'
		}
	},
	methods: {
		open() {
			this.distanceToolConfig.open = true
		},
		close() {
			this.distanceToolConfig.open = false
		}
	}
}
</script>
