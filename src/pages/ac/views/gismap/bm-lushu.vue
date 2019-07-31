<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-polyline v-bind="polylineConfig"></bm-polyline>
		<bm-lushu v-bind="lushuConfig"></bm-lushu>
		<bm-polyline v-bind="polylineConfig2"></bm-polyline>
		<bm-lushu v-bind="lushuConfig2"></bm-lushu>
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
					{ lng: 118.877951, lat: 32.393924 },
					{ lng: 118.897951, lat: 32.363924 },
					{ lng: 118.907951, lat: 32.413924 }
				],
				strokeColor: 'red',
				strokeOpacity: 0.3,
				editing: false
			},
			lushuConfig: {
				path: [
					{ lng: 118.847951, lat: 32.313924 },
					{ lng: 118.877951, lat: 32.393924 },
					{ lng: 118.897951, lat: 32.363924 },
					{ lng: 118.907951, lat: 32.413924 }
				],
				landmarkPois: [
					{ lng: 118.877951, lat: 32.393924, html: '加油站', pauseTime: 2 },
					{
						lng: 118.897951,
						lat: 32.363924,
						html: '高速公路收费<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>',
						pauseTime: 3
					}
				],
				icon: {
					url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
					size: {
						width: 52,
						height: 26
					}
				},
				play: false,
				infoWindow: true,
				rotation: true,
				dispose: false
			},
			polylineConfig2: {
				points: [
					{ lng: 118.947951, lat: 32.313924 },
					{ lng: 118.977951, lat: 32.393924 },
					{ lng: 118.997951, lat: 32.363924 },
					{ lng: 118.807951, lat: 32.413924 }
				],
				strokeColor: 'red',
				strokeOpacity: 0.3,
				editing: false
			},
			lushuConfig2: {
				path: [
					{ lng: 118.947951, lat: 32.313924 },
					{ lng: 118.977951, lat: 32.393924 },
					{ lng: 118.997951, lat: 32.363924 },
					{ lng: 118.807951, lat: 32.413924 }
				],
				landmarkPois: [
					{ lng: 118.977951, lat: 32.393924, html: '加油站2', pauseTime: 2 },
					{
						lng: 118.997951,
						lat: 32.363924,
						html: '高速公路收费2<div><img src="http://map.baidu.com/img/logo-map.gif"/></div>',
						pauseTime: 3
					}
				],
				icon: {
					url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
					size: {
						width: 52,
						height: 26
					}
				},
				play: false,
				content: '测试路书功能',
				infoWindow: false,
				rotation: true
			}
		}
	}
}
</script>
