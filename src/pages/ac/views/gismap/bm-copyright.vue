<template>
	<baidu-map class="map" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-copyright anchor="BMAP_ANCHOR_TOP_LEFT" :copyright="copyright"></bm-copyright>
		<bm-copyright anchor="BMAP_ANCHOR_TOP_RIGHT" :copyright="copyright"></bm-copyright>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			center: { lng: 118.877951, lat: 32.313924 },
			zoom: 14,
			scrollWheelZoom: true,
			copyright: [
				{
					id: 1,
					content: 'Copyright Message',
					bounds: {
						ne: {
							lng: 118.877951,
							lat: 40
						},
						sw: {
							lng: 0,
							lat: 0
						}
					}
				},
				{
					id: 2,
					content: '<a>我是版权信息</a>'
				}
			]
		}
	}
}
</script>
