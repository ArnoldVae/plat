<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<bm-point-collection v-bind="pointCollection"></bm-point-collection>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			defaultMapConfig: {
				center: { lng: 117.672928, lat: 33.708968 },
				zoom: 8,
				scrollWheelZoom: true
			},
			pointCollection: {
				color: '#d340c3',
				points: []
			}
		}
	},
	mounted() {
		const points = []
		for (var i = 0; i < 10000; i++) {
			const position = { lng: getRandom(121.891083, 113.097175), lat: getRandom(30.069878, 37.268031) }
			points.push(position)
		}
		this.pointCollection.points = points

		function getRandom(num1, num2) {
			switch (arguments.length) {
				case 1:
					return Math.floor(Math.random() * num1 + 1) // 返回0-max的随机整数
				case 2:
					var min = num1
					var max = num2
					if (num1 - num2 > 0) {
						min = num2
						max = num1
					}
					return Math.floor(Math.random() * (max - min + 1) + min) // 返回min-max的随机整数
				default:
					return 0
			}
		}
	}
}
</script>
