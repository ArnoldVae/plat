<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-polyline v-bind="polylineConfig"></bm-polyline>
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
			polylineConfig: {
				points: [
					{ lng: 118.847951, lat: 32.313924 },
					{ lng: 118.877951, lat: 32.313924 },
					{ lng: 118.907951, lat: 32.413924 }
				],
				strokeColor: 'red',
				editing: true
			}
		}
	}
}
</script>
