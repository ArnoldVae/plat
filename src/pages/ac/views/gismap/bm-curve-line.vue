<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-curve-line v-bind="curveLineConfig"></bm-curve-line>
		<bm-curve-line v-bind="curveLineConfig2"></bm-curve-line>
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
			curveLineConfig: {
				points: [
					{ lng: 118.847951, lat: 32.313924 },
					{ lng: 118.877951, lat: 32.313924 },
					{ lng: 118.907951, lat: 32.413924 }
				],
				strokeColor: 'red',
				editing: true,
				editingIcon: {
					url: '/gismap/images/copyright_logo.png',
					size: {
						width: 77,
						height: 32
					}
				}
			},
			curveLineConfig2: {
				points: [
					{ lng: 118.947951, lat: 32.313924 },
					{ lng: 118.977951, lat: 32.313924 },
					{ lng: 118.957951, lat: 32.413924 }
				],
				strokeColor: '#29afb6',
				editing: true
			}
		}
	}
}
</script>
