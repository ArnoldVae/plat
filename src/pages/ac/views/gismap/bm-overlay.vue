<template>
	<baidu-map class="map" :center="center" :zoom="zoom" :scrollWheelZoom="scrollWheelZoom">
		<bm-overlay
			v-bind="overlayConfig"
			:class="{ sample: true, active }"
			@dblclick.stop.prevent="overlayDbclick"
			@dragend="overlayDragEnd"
			@addcontextmenu="addContextMenu"
			@click.native="toggleInfoWindow"
		>
			<div>我爱祖国 祖国爱我</div>
			<bm-info-window :show="show" title="Info Window Title" @close="infoWindowClose" @open="infoWindowOpen"
				>测试信息窗口</bm-info-window
			>
		</bm-overlay>

		<bm-overlay
			:position="{ lng: 118.977951, lat: 32.413924 }"
			:class="{ sample: true, active }"
			@click.native="toggleInfoWindow2"
		>
			<div>我爱祖国花朵开</div>
			<bm-info-window :show="show2" title="Info Window Title" @close="infoWindowClose2" @open="infoWindowOpen2"
				>测试信息窗口</bm-info-window
			>
		</bm-overlay>

		<bm-overlay :position="center" :dragging="true" :class="{ sample: true, active }">
			<div>我爱祖国 祖国爱我</div>
			<bm-context-menu @open="menuOpenByMarker">
				<bm-context-menu-item text="覆盖" :callback="menuItemCallbackByMarker"></bm-context-menu-item>
			</bm-context-menu>
		</bm-overlay>

		<bm-overlay
			:position="{ lng: 118.929951, lat: 32.516924 }"
			:class="{ sample: true, active }"
			@click="infoBox2.open = true"
		>
			<div>测试信息窗口</div>
			<bm-info-box v-bind="infoBox2" @close="infoBox2.open = false">
				<div class="infoBoxContent infoBoxContent2">
					<div class="title">
						<strong>中海雅园</strong>
						<span class="price">均价43000</span>
					</div>
					<div class="list">
						<ul>
							<li>
								<div class="left">
									<img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house3.jpg" />
								</div>
							</li>
						</ul>
					</div>
				</div>
			</bm-info-box>
		</bm-overlay>
	</baidu-map>
</template>

<script>
export default {
	data() {
		return {
			center: { lng: 118.877951, lat: 32.313924 },
			zoom: 12,
			scrollWheelZoom: true,
			active: false,
			show: false,
			show2: false,
			overlayConfig: {
				position: { lng: 118.977951, lat: 32.313924 },
				dragging: true
			},
			infoBox2: {
				open: false
			}
		}
	},
	methods: {
		overlayDbclick() {
			alert('native')
		},
		overlayDragEnd(e) {
			this.overlayConfig.position = e.point
		},
		infoWindowClose() {
			this.show = false
		},
		infoWindowOpen() {
			this.show = true
		},
		infoWindowClose2() {
			this.show2 = false
		},
		infoWindowOpen2() {
			this.show2 = true
		},
		menuOpenByMarker() {
			alert('menuOpenByMarker')
		},
		menuItemCallbackByMarker() {
			alert('menuItemCallbackByMarker')
		},
		addContextMenu() {
			alert('addContextMenu')
		},
		toggleInfoWindow() {
			this.show = !this.show
		},
		toggleInfoWindow2() {
			this.show2 = !this.show2
		}
	}
}
</script>

<style>
.sample {
	min-width: 160px;
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
.infoBoxContent {
	font-size: 12px;
}
.infoBoxContent .title {
	background: url(http://api.map.baidu.com/library/InfoBox/1.2/examples/title.jpg) no-repeat;
	height: 42px;
	width: 272px;
}
.infoBoxContent .title strong {
	font-size: 14px;
	line-height: 42px;
	padding: 0 10px 0 5px;
}
.infoBoxContent .title .price {
	color: #ffff00;
}
.infoBoxContent .list {
	width: 268px;
	border: solid 1px #4fa5fc;
	border-top: none;
	background: #fff;
	height: 260px;
}
.infoBoxContent2 .list {
	height: 60px;
}
.infoBoxContent .list ul {
	margin: 0;
	padding: 5px;
	list-style: none;
}
.infoBoxContent .list ul li {
	float: left;
	width: 255px;
	border-bottom: solid 1px #4fa5fc;
	padding: 2px 0;
}
.infoBoxContent .list ul .last {
	border: none;
}
.infoBoxContent .list ul img {
	width: 53px;
	height: 42px;
	margin-right: 5px;
}
.infoBoxContent .list ul p {
	padding: 0;
	margin: 0;
}
.infoBoxContent .left {
	float: left;
}
.infoBoxContent .rmb {
	float: right;
	color: #eb6100;
	font-size: 14px;
	font-weight: bold;
}
.infoBoxContent a {
	color: #0041d9;
	text-decoration: none;
}
</style>
