<template>
	<baidu-map class="map" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
			<bm-label
				content="我爱祖国 祖国爱物"
				:labelStyle="{ color: 'red', fontSize: '24px' }"
				:offset="{ width: -35, height: 30 }"
			/>
		</bm-marker>

		<bm-marker :position="markerPoint" :dragging="true" animation="BMAP_ANIMATION_DROP">
			<bm-label
				content="我爱祖国 祖国爱物"
				:labelStyle="{ color: '#a03', fontSize: '12px' }"
				:offset="{ width: -35, height: 30 }"
			/>
		</bm-marker>

		<bm-marker
			:position="markerPoint2"
			:dragging="true"
			animation="BMAP_ANIMATION_BOUNCE"
			:icon="markerIcon"
		></bm-marker>

		<bm-marker :position="markerPoint3" :icon="markerIcon"> </bm-marker>

		<bm-marker :position="markerPoint4" :dragging="true" @click="infoWindowOpen">
			<bm-label
				content="测试信息窗口"
				:labelStyle="{ color: '#a03', fontSize: '12px' }"
				:offset="{ width: -35, height: 30 }"
			/>
			<bm-info-window :show="show" title="Info Window Title" @close="infoWindowClose" @open="infoWindowOpen"
				>测试信息窗口</bm-info-window
			>
		</bm-marker>
	</baidu-map>
</template>

<style></style>

<script>
export default {
	data() {
		return {
			center: { lng: 118.877951, lat: 32.313924 },
			zoom: 11,
			scrollWheelZoom: true,
			show: false,
			markerPoint: { lng: 118.377951, lat: 32.323924 },
			markerPoint2: { lng: 119.285951, lat: 32.313924 },
			markerPoint3: { lng: 118.864951, lat: 32.013924 },
			markerPoint4: { lng: 118.929951, lat: 32.516924 },
			markerIcon: {
				url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif',
				size: { width: 300, height: 157 }
			}
		}
	},
	methods: {
		infoWindowClose() {
			this.show = false
		},
		infoWindowOpen() {
			this.show = true
		}
	}
}
</script>
