<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-info-window
			:position="infoWindow.position"
			title="Info Window Title"
			:show="infoWindow.show"
			@close="infoWindowClose"
			@open="infoWindowOpen"
		>
			<p v-text="infoWindow.contents"></p>
			<button @click="clear">Clear</button>
		</bm-info-window>
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
			infoWindow: {
				show: true,
				position: { lng: 118.877951, lat: 32.313924 },
				contents: '地址：北京市东城区王府井大街88号乐天银泰百货八层'
			}
		}
	},
	methods: {
		infoWindowClose() {
			this.show = false
		},
		infoWindowOpen() {
			this.show = true
		},
		clear() {
			this.infoWindow.contents = ''
		}
	}
}
</script>
