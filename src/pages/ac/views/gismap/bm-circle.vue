<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-circle v-bind="circlePath" @lineupdate="updateCirclePath"></bm-circle>
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
			circlePath: {
				center: { lng: 118.877951, lat: 32.313924 },
				radius: 10000,
				strokeColor: 'red',
				fillColor: 'red',
				strokeWeight: 1,
				fillOpacity: 0.3,
				strokeOpacity: 0.3,
				editing: true
			}
		}
	},
	methods: {
		updateCirclePath(e) {
			this.circlePath.center = e.target.getCenter()
			this.circlePath.radius = e.target.getRadius()
		}
	}
}
</script>
