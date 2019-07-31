<template>
	<baidu-map class="map" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-context-menu :width="300" @open="menuOpen">
			<bm-context-menu-item :text="menuItem.text" :callback="menuItemCallback"></bm-context-menu-item>
		</bm-context-menu>

		<bm-marker :position="center" :dragging="true">
			<bm-context-menu @open="menuOpenByMarker">
				<bm-context-menu-item text="覆盖物右键菜单" :callback="menuItemCallbackByMarker"></bm-context-menu-item>
			</bm-context-menu>
		</bm-marker>
	</baidu-map>
</template>

<style></style>

<script>
export default {
	data() {
		return {
			center: { lng: 118.877951, lat: 32.313924 },
			zoom: 14,
			scrollWheelZoom: true,
			menuItem: {
				text: '获取当前位置'
			},
			active: false
		}
	},
	methods: {
		menuItemCallback(e) {
			alert(`${e.point.lng}:${e.point.lat}`)
		},
		menuOpen(e) {
			alert(`右键菜单打开时->${e.point.lng}:${e.point.lat}`)
		},
		menuOpenByMarker() {
			alert('menuOpenByMarker')
		},
		menuItemCallbackByMarker() {
			alert('menuItemCallbackByMarker')
		}
	}
}
</script>
