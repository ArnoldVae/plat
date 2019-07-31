<template>
	<baidu-map class="map" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-scale anchor="BMAP_ANCHOR_TOP_LEFT"></bm-scale>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			center: { lng: 118.877951, lat: 32.313924 },
			zoom: 14,
			scrollWheelZoom: true
		}
	}
}
</script>
