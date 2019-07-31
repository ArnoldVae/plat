<template>
	<baidu-map
		class="map"
		style="display: flex; flex-direction: column"
		:center="center"
		:zoom="zoom"
		:scrollWheelZoom="scrollWheelZoom"
	>
		<p style="padding: 0 10px;">以下是使用 `bm-view` 组件渲染的百度地图实例</p>
		<bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
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
