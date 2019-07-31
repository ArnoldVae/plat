<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-rectangle-zoom v-bind="RectangleZoomConfig"></bm-rectangle-zoom>
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
			RectangleZoomConfig: {
				open: true,
				isZoomIn: true,
				followText: '拖拽鼠标进行操作',
				strokeWeight: 2,
				strokeColor: '#111',
				maskStyle: 'dashed',
				fillColor: '#ccc',
				opacity: 0.8,
				cursor: 'crosshair'
			}
		}
	}
}
</script>
