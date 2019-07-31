<template>
	<baidu-map class="map" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-control>
			<Button size="small" type="primary" @click="addZoom(16)">缩放至最大</Button>
			<Button size="small" type="primary" @click="addZoom(14)">还原</Button>
			<Button size="small" type="primary" @click="addZoom(6)">缩放至最小</Button>
		</bm-control>
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
	},
	methods: {
		addZoom(val) {
			this.zoom !== val && (this.zoom = val)
		}
	}
}
</script>
