<template>
	<baidu-map class="map" v-bind="defaultMapConfig" @click="click"> </baidu-map>
</template>

<script>
export default {
	data() {
		return {
			defaultMapConfig: {
				center: { lng: 118.877951, lat: 32.313924 },
				zoom: 13,
				scrollWheelZoom: true,
				viewportPoints: [{ lng: 118.877951, lat: 32.313924 }, { lng: 119.877951, lat: 32.313924 }]
			}
		}
	},
	methods: {
		click() {
			alert('mapClick')
		}
	}
}
</script>
