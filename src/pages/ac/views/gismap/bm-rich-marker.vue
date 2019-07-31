<template>
	<baidu-map class="map" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-rich-marker
			v-bind="ctoConfig"
			@dragstart="overlayDbclick"
			@click="overlayDbclick"
			@contextmenu="menuOpenByMarker"
		>
			<bm-context-menu>
				<bm-context-menu-item text="覆盖物右键菜单"></bm-context-menu-item>
			</bm-context-menu>
		</bm-rich-marker>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			center: { lng: 118.877951, lat: 32.313924 },
			zoom: 14,
			scrollWheelZoom: true,
			active: false,
			ctoConfig: {
				position: { lng: 118.877951, lat: 32.313924 },
				label: '35kV土桥变电站',
				badge: 10,
				dragging: false,
				icon: {
					url: 'http://172.26.1.40/docs/examples/images/yunweiban.png',
					size: {
						width: 50,
						height: 40
					}
				}
			}
		}
	},
	methods: {
		overlayDbclick() {
			alert('overlayDbclick')
		},
		menuOpen(e) {
			alert(`右键菜单打开时->${e.point.lng}:${e.point.lat}`)
		},
		menuOpenByMarker(e, origin) {
			alert('menuOpenByMarker')
			alert(e)
			alert(origin)
		}
	}
}
</script>

<style>
.sample {
	width: 120px;
	height: 40px;
	line-height: 1.5rem;
	background: rgba(0, 0, 0, 0.5);
	overflow: hidden;
	box-shadow: 0 0 5px #000;
	color: #fff;
	text-align: center;
	padding: 10px;
	position: absolute;
}
.sample.active {
	background: rgba(0, 0, 0, 0.75);
	color: #fff;
}
</style>
