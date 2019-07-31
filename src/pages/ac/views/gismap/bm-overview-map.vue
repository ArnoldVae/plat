<template>
	<baidu-map class="map" v-bind="defaultMap">
		<bm-overview-map
			anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
			:isOpen="true"
			v-on:viewchanged="viewchanged"
			@viewchanging="viewchanging"
		></bm-overview-map>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			defaultMap: {
				center: { lng: 119.877951, lat: 32.313924 },
				zoom: 13,
				scrollWheelZoom: true
			}
		}
	},
	methods: {
		addZoom(val) {
			this.zoom !== val && (this.zoom = val)
		},
		viewchanged() {
			alert('viewchanged')
		},
		viewchanging() {
			alert('viewchanging')
		}
	}
}
</script>
