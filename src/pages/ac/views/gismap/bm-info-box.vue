<template>
	<baidu-map class="map" v-bind="defaultMapConfig">
		<div>
			<Button :type="btnTypeOpen" shape="circle" @click="infoBoxOpen">open</Button>
			<Button :type="btnTypeClose" shape="circle" @click="infoBoxClose">close</Button>
		</div>
		<bm-view style="width: 100%; height:calc(100% - 32px)"></bm-view>
		<bm-info-box v-bind="infoBox" title="Info Window Title" @close="infoBoxClose" @open="infoBoxOpen">
			<div class="infoBoxContent">
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
							<div class="left">
								<a target="_blank" href="http://map.baidu.com">中海雅园南北通透四居室</a>
								<p>4室2厅，205.00平米，3层</p>
							</div>
							<div class="rmb">760万</div>
						</li>
						<li>
							<div class="left">
								<img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house1.jpg" />
							</div>
							<div class="left">
								<a target="_blank" href="http://map.baidu.com">中海雅园四居室还带保姆间</a>
								<p>2室1厅，112.00平米，16层</p>
							</div>
							<div class="rmb">300万</div>
						</li>
						<li>
							<div class="left">
								<img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house2.jpg" />
							</div>
							<div class="left">
								<a target="_blank" href="http://map.baidu.com">《有钥匙 随时看》花园水系</a>
								<p>3室2厅，241.00平米，16层</p>
							</div>
							<div class="rmb">400万</div>
						</li>
						<li>
							<div class="left">
								<img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house3.jpg" />
							</div>
							<div class="left">
								<a target="_blank" href="http://map.baidu.com">富力城D区正规楼王大三居</a>
								<p>3室3厅，241.00平米，17层</p>
							</div>
							<div class="rmb">600万</div>
						</li>
						<li class="last">
							<div class="left">
								<img src="http://api.map.baidu.com/library/InfoBox/1.2/examples/house1.jpg" />
							</div>
							<div class="left">
								<a target="_blank" href="http://map.baidu.com">富力城豪，身份人士的象征</a>
								<p>4室2厅，213.90平米，25层</p>
							</div>
							<div class="rmb">700万</div>
						</li>
					</ul>
				</div>
			</div>
		</bm-info-box>
		<bm-marker :position="{ lng: 118.929951, lat: 32.516924 }" :dragging="true" @click="infoBox2.open = true">
			<bm-label
				content="测试信息窗口"
				:labelStyle="{ color: '#a03', fontSize: '12px' }"
				:offset="{ width: -35, height: 30 }"
			></bm-label>
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
		</bm-marker>
	</baidu-map>
</template>

<style>
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

<script>
export default {
	data() {
		return {
			defaultMapConfig: {
				center: { lng: 118.877951, lat: 32.313924 },
				zoom: 12,
				scrollWheelZoom: true
			},
			infoBox: {
				open: true,
				show: true,
				position: { lng: 118.877951, lat: 32.313924 }
			},
			infoBox2: {
				open: false,
				show: true
				// align: 'INFOBOX_AT_BOTTOM'
			}
		}
	},
	computed: {
		btnTypeOpen() {
			return this.infoBox.open ? 'primary' : 'default'
		},
		btnTypeClose() {
			return !this.infoBox.open ? 'primary' : 'default'
		}
	},
	methods: {
		infoBoxClose() {
			this.infoBox.open = false
		},
		infoBoxOpen() {
			this.infoBox.open = true
		},
		clear() {
			this.infoWindow.contents = ''
		}
	}
}
</script>
