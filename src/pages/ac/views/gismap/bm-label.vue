<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-label v-bind="labelConfig"></bm-label>
		<bm-label v-bind="labelConfig2" @click="labelHandlerClick2"></bm-label>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			defaultMapConfig: {
				center: { lng: 118.877951, lat: 32.313924 },
				zoom: 11,
				scrollWheelZoom: true
			},
			labelConfig: {
				content: '我爱祖国 祖国爱我',
				position: { lng: 118.877951, lat: 32.313924 }
			},
			labelConfig2: {
				content: '我爱祖国 祖国爱我',
				position: { lng: 118.977951, lat: 32.613924 },
				title: '悬浮状态下的label'
			}
		}
	},
	methods: {
		labelHandlerClick2(e) {
			alert(e)
		}
	}
}
</script>
