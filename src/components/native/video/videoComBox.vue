<template>
	<div class="ctnBox">
		<div class="videoList">
			<Menu width="auto" @on-select="selectItem">
				<Submenu name="1">
					<template slot="title">
						<Icon type="md-videocam" />视频列表
					</template>
					<MenuItem v-for="(item, idx) in videoList" :key="idx" :name="item">视频{{ idx + 1 }}</MenuItem>
				</Submenu>
			</Menu>
		</div>
		<div class="videoShowBox">
			<div class="screenControl">
				<Button @click="changePanel(1)" data-row="1|1">1屏</Button>
				<Button @click="changePanel(4)" data-row="2|2">4屏</Button>
				<Button @click="changePanel(9)" data-row="3|3">9屏</Button>
				<Button @click="changePanel(16)" data-row="4|4">16屏</Button>
			</div>
			<div class="videoCtn">
				<div
					:class="`videoItem ${layoutCls} ${idx == 0 ? 'itemSelect' : ''}`"
					v-for="(item, idx) in videoComList"
					:key="idx"
					@click="VideoBoxClick($event)"
				>
					<VideoKurento :videoConfig="item"></VideoKurento>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import VideoKurento from './videoKurento'
export default {
	name: 'VideoComBox',
	data() {
		return {
			urlSelf: '',
			rows: 2,
			cols: 2,
			rowsHeight: '',
			colsWidth: '',
			selectVideo: '',
			layoutCls: '',
			videoLen: 4,
			videoList: [
				'rtsp://admin:admin@172.26.1.204:554/cam/realmonitor?channel=19&subtype=0',
				'rtsp://admin:admin@172.26.1.204:554/cam/realmonitor?channel=17&subtype=0',
				'rtsp://admin:admin123@172.26.1.28:554/cam/realmonitor?channel=2&subtype=0',
				'rtsp://admin:admin123@172.26.1.28:554/cam/realmonitor?channel=2&subtype=1'
			],
			videoComList: []
		}
	},
	components: {
		VideoKurento
	},
	methods: {
		changePanel(len) {
			switch (len) {
				case 1:
					this.layoutCls = 'layout-1'
					this.videoLen = 1
					break
				case 4:
					this.layoutCls = 'layout-4'
					this.videoLen = 4
					break
				case 9:
					this.layoutCls = 'layout-9'
					this.videoLen = 9
					break
				case 16:
					this.layoutCls = 'layout-16'
					this.videoLen = 16
					break
			}
		},
		VideoBoxClick($e) {
			if (this.hasClass($e.target, 'itemSelect') != true) {
				let videoItem = document.getElementsByClassName('videoItem')
				for (var i = 0, len = videoItem.length; i < len; i++) {
					videoItem[i].classList.remove('itemSelect')
				}
				$e.target.classList.add('itemSelect')
			}
		},
		hasClass(obj, cls) {
			if (obj.className.indexOf(cls) != -1) {
				return true
			} else {
				return false
			}
		},
		addClass(obj, cls) {
			if (!this.hasClass(obj, cls)) obj.className += ' ' + cls
		},
		removeClass(obj, cls) {
			if (this.hasClass(obj, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
				obj.className = obj.className.replace(reg, ' ')
			}
		},
		removeAllClass(obj) {
			obj.className = ''
		},
		selectItem(param) {
			this.$nextTick(function() {
				this.selectVideo = param
			})
		},
		getVideoComList(len) {
			this.videoComList = []
			for (let i = 0; i < len; i++) {
				if (typeof this.videoList[i] === 'undefined') {
					this.videoList[i] = ''
				}
				this.videoComList.push({
					videoId: 'videoId' + i,
					videoUrl: this.videoList[i],
					videoIdx: i,
					itemCls: i == 0 ? 'itemSelect' : ''
				})
			}
		}
	},
	mounted() {
		let len = this.videoList.length
		if (len == 1) {
			this.layoutCls = 'layout-1'
		} else if (len > 1 && len <= 4) {
			this.layoutCls = 'layout-4'
			this.videoLen = 4
		} else if (len > 4 && len <= 9) {
			this.layoutCls = 'layout-9'
			this.videoLen = 9
		} else if (len > 9 && len <= 16) {
			this.layoutCls = 'layout-16'
			this.videoLen = 16
		} else {
			this.layoutCls = ''
		}
		this.getVideoComList(this.videoLen)
		window._this = this
	},
	watch: {
		videoLen: function(newVal) {
			this.getVideoComList(newVal)
		}
	}
}
</script>

<style scoped>
.ctnBox {
	height: 100%;
}
.videoList,
.videoShowBox {
	float: left;
	height: 100%;
}
.videoList {
	width: 15%;
}
.videoList li {
	color: #000;
}
.videoShowBox {
	width: 85%;
}
h1 {
	color: #000;
}
.videoCtn {
	width: 100%;
	height: calc(100% - 40px);
}
.videoItem {
	float: left;
	box-sizing: border-box;
	background: #494a4b;
	border: 1px solid #000;
}
.screenControl {
	height: 40px;
	line-height: 40px;
}
.itemSelect {
	border-color: #ff0;
}
.ivu-menu-item:hover {
	color: #1b3035;
}
.layout-1 {
	width: 100%;
	height: 100%;
}
.layout-4 {
	width: 50%;
	height: 50%;
}
.layout-9 {
	width: calc(100% / 3);
	height: calc(100% / 3);
}
.layout-16 {
	width: 25%;
	height: 25%;
}
</style>
