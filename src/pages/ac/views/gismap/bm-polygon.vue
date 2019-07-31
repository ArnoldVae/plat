<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-view style="width: 100%; height: calc(100% - 40px)"></bm-view>
		<!-- <bm-polygon v-bind="polygonConfig"></bm-polygon>
    <bm-polygon v-bind="polygonConfig2" @lineupdate="polygonLineUpdate2"></bm-polygon>-->
		<bm-polygon v-for="(item, index) in polygon" :key="index" v-bind="item"></bm-polygon>
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
			polygon: [
				{
					points: [
						{ lng: 118.847951, lat: 32.313924 },
						{ lng: 118.877951, lat: 32.313924 },
						{ lng: 118.907951, lat: 32.413924 }
					],
					strokeColor: 'red',
					editing: true
				},
				{
					points: [
						{ lng: 118.747951, lat: 32.313924 },
						{ lng: 118.777951, lat: 32.313924 },
						{ lng: 118.837951, lat: 32.213924 }
					],
					strokeColor: 'red',
					editing: true
				}
			]
		}
	},
	methods: {
		polygonLineUpdate2(e) {
			this.polygonConfig2.points = e.target.getPath()
		}
	}
}
</script>
