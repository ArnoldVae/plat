<template>
	<div class="ctnBox" @mouseenter="enter" @mouseleave="leave">
		<video autoplay poster="../../assets/img/videoback.jpg" @click="videoClick($event)"></video>
		<div class="playModal" v-show="showLoadMsg">
			<div class="loadMsg">
				<div class="msgCtn">视频加载中...</div>
			</div>
		</div>
		<div class="videoControl" v-show="showTool && canShowTool">
			<a v-show="isPlay" href="javascript:void(0)" class="iconBtn" @click="stop()">
				<Icon type="md-power" :size="25" />
			</a>
			<a v-show="!isPlay" href="javascript:void(0)" class="iconBtn" @click="start()">
				<Icon type="ios-play" :size="25" />
			</a>
			<a href="javascript:void(0)" class="iconBtn" @click="DisplayControl">
				<Icon type="md-build" :size="25" />
			</a>
		</div>
		<div class="controlCtn" v-show="showControlBtn">
			<div class="rtControl">
				<!-- 依次放大缩小 -->
				<a
					href="javascript:void(0)"
					@mouseup="stopControl"
					@mousedown="controlDire(10)"
					class="iconControl ZoomIn"
				>
					<Icon type="ios-expand" :size="25" />
				</a>
				<a
					href="javascript:void(0)"
					@mouseup="stopControl"
					@mousedown="controlDire(9)"
					class="iconControl ZoomOut"
				>
					<Icon type="md-expand" :size="25" />
				</a>
			</div>
			<div class="lfControl">
				<!-- 依次上下左右箭头 -->
				<a
					href="javascript:void(0)"
					@mouseup="stopControl"
					@mousedown="controlDire(3)"
					class="iconControl iconTop"
				>
					<Icon type="md-arrow-up" :size="25" />
				</a>
				<a
					href="javascript:void(0)"
					@mouseup="stopControl"
					@mousedown="controlDire(4)"
					class="iconControl iconBottom"
				>
					<Icon type="md-arrow-down" :size="25" />
				</a>
				<a
					href="javascript:void(0)"
					@mouseup="stopControl"
					@mousedown="controlDire(1)"
					class="iconControl iconLeft"
				>
					<Icon type="md-arrow-back" :size="25" />
				</a>
				<a
					href="javascript:void(0)"
					@mouseup="stopControl"
					@mousedown="controlDire(2)"
					class="iconControl iconRight"
				>
					<Icon type="md-arrow-forward" :size="25" />
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import qs from 'qs'
export default {
	name: 'Kurento',
	props: {
		videoConfig: {
			type: Object
		},
		isShowTool: {
			type: Boolean,
			default: true
		},
		itemInfo: {
			type: Object,
			default() {
				return {}
			}
			/* 
          stationId: '',
          equipmentid: '',
          vcinfo: '',
          speed: 5,
        */
		}
	},
	data() {
		return {
			args: [],
			videoOutput: null, //video元素
			webRtcPeer: null, //视频对象
			pipeline: null, //视频属性
			isPlay: false, // 视频是否在播放中
			showLoadMsg: false, // 是否显示加载信息提示
			showTool: false, // 是否显示视频底部工具条
			showControlBtn: false, // 是否显示控制按钮
			urlVal: this.videoConfig.videoUrl, //视频播放地址
			canShowTool: this.isShowTool, //是否允许显示底部工具条
			controlModuleId: 1111, // 默认值
			controlCommonId: 11001, //移动/缩放/变焦
			controlSpeed: 3 // 视频控制速度
		}
	},
	mounted() {
		const _this = this
		this.loadFile()
		window.addEventListener('beforeunload', function() {
			if (_this.isPlay == true) {
				_this.stop()
			}
		})
	},
	methods: {
		init() {
			this.args = this.getopts(location.search, {
				default: {
					ws_uri: `ws://${process.env.VUE_APP_VIDEOSERVICE}/kurento`, //测试环境 播放152的视频
					ice_servers: undefined
				}
			})
			this.videoOutput = this.$el.querySelector('video') //document.getElementById(this.videoConfig.videoId);
			if (this.isShowTool == true) {
				this.canShowTool = !!this.videoConfig.videoUrl
			}
			if (this.videoConfig.videoUrl != '' && this.videoConfig.isAutoPlay == true) {
				this.start()
			}
		},
		getopts(args, opts) {
			let result = opts.default || {}
			args.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), function($0, $1, $2, $3) {
				result[$1] = $3
			})
			return result
		},
		start() {
			var _this = this
			this.showLoadMsg = true
			if (!this.urlVal) {
				console.log('请先配置需要播放的视频地址')
			}
			this.webRtcPeer = this.kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
				{
					remoteVideo: this.videoOutput
				},
				error => {
					if (error) {
						return console.error(error)
					}
					_this.webRtcPeer.generateOffer(_this.onOffer)
				}
			)
		},
		stop() {
			if (this.webRtcPeer) {
				this.webRtcPeer.dispose()
				this.webRtcPeer = null
			}
			if (this.pipeline) {
				this.pipeline.release()
				this.pipeline = null
			}
			this.isPlay = false
			this.showControlBtn = false
			this.canShowTool = false
			this.urlVal = ''
		},
		onOffer(error, sdpOffer) {
			const $this = this
			if (error) return $this.onError(error)
			$this.kurentoClient($this.args.ws_uri, function(error, $kurentoClient) {
				if (error) return $this.onError(error)
				$kurentoClient.create('MediaPipeline', function(error, p) {
					if (error) return $this.onError(error)
					$this.pipeline = p

					$this.pipeline.create('PlayerEndpoint', { networkCache: 0, uri: $this.urlVal }, function(
						error,
						player
					) {
						if (error) return $this.onError(error)

						$this.pipeline.create('WebRtcEndpoint', function(error, webRtcEndpoint) {
							if (error) return $this.onError(error)
							$this.setIceCandidateCallbacks(webRtcEndpoint, $this.webRtcPeer, $this.onError)

							webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer) {
								if (error) return $this.onError(error)
								webRtcEndpoint.gatherCandidates($this.onError)
								$this.webRtcPeer.processAnswer(sdpAnswer)
							})

							player.connect(webRtcEndpoint, function(error) {
								if (error) return $this.onError(error)
								player.play(function(error) {
									if (error) {
										return $this.onError(error)
									}
									$this.isPlay = true
									$this.showLoadMsg = false
									console.log('视频播放中...')
								})
							})
						})
					})
				})
			})
		},
		setIceCandidateCallbacks(webRtcEndpoint, webRtcPeer, onError) {
			const _this = this
			webRtcPeer.on('icecandidate', function(candidate) {
				candidate = _this.kurentoClient.register.complexTypes.IceCandidate(candidate)
				webRtcEndpoint.addIceCandidate(candidate, onError)
			})
			webRtcEndpoint.on('OnIceCandidate', function(event) {
				let candidate = event.candidate
				webRtcPeer.addIceCandidate(candidate, onError)
			})
		},
		onError(error) {
			if (error) {
				console.error(error)
				this.stop()
			}
		},
		enter() {
			this.showTool = true
		},
		leave() {
			this.showTool = false
		},
		DisplayControl() {
			if (this.showControlBtn == true) {
				this.showControlBtn = false
			} else {
				this.showControlBtn = true
			}
		},
		videoClick() {
			if (this.videoConfig && this.videoConfig.itemIdx > -1) {
				this.$emit('watchChild', this.videoConfig.itemIdx)
			}
		},
		getVideoFiles(globalVar, url) {
			const _this = this
			const constVar = `__${globalVar.toUpperCase()}`
			if (!global[globalVar]) {
				global[constVar] = {}
				global[constVar]._preloader = new Promise(resolve => {
					var $script = document.createElement('script')
					$script.setAttribute('type', 'text/javascript')
					global.document.body.appendChild($script)
					if (_this.isIE()) {
						$script.onreadystatechange = function() {
							if (this.readyState == 'loaded' || this.readyState == 'complete') {
								resolve(global[globalVar])
							}
						}
					} else {
						$script.onload = function() {
							resolve(global[globalVar])
						}
					}
					$script.setAttribute('src', url)
				})
				return global[constVar]._preloader
			} else if (!global[constVar]._preloader) {
				return Promise.resolve(global[constVar])
			} else {
				return global[constVar]._preloader
			}
		},
		loadFile() {
			const _this = this
			const { getVideoFiles, init } = this

			getVideoFiles('kurentoClient', 'assets/libs/video/js/kurento-client.min.js').then(function() {
				_this.kurentoClient = global.kurentoClient
				getVideoFiles('kurentoUtils', 'assets/libs/video/js/kurento-utils.min.js').then(function() {
					_this.kurentoUtils = global.kurentoUtils
					init()
				})
			})
		},
		isIE() {
			if (!!window.ActiveXObject || 'ActiveXObject' in window) return true
			else return false
		},
		// 控制视频方向
		controlDire(dire) {
			let params = {
				stationId: this.itemInfo.station,
				moduleId: this.controlModuleId,
				commonId: this.controlCommonId,
				equpMent: JSON.stringify([
					{
						equipmentid: this.itemInfo.equipment,
						vcinfo: this.itemInfo.vcInfo,
						speed: this.controlSpeed,
						value: dire
					}
				])
			}
			this.$api.dsa3200Index.videoControl(qs.stringify(params)).then(res => {
				if (res.ret != 0) {
					console.log(res)
				}
			})
		},
		// 停止控制
		stopControl() {
			let params = {
				stationId: this.itemInfo.station,
				moduleId: this.controlModuleId,
				commonId: this.controlCommonId,
				equpMent: JSON.stringify([
					{
						equipmentid: this.itemInfo.equipment,
						vcinfo: this.itemInfo.vcInfo,
						speed: this.controlSpeed,
						value: 0
					}
				])
			}
			this.$api.dsa3200Index.videoControl(qs.stringify(params)).then(res => {
				if (res.ret != 0) {
					console.log(res)
				}
			})
		}
	},
	watch: {
		'videoConfig.videoUrl': function() {
			const _this = this
			if (_this.isShowTool == true) {
				_this.canShowTool = !!_this.videoConfig.videoUrl
			}
			_this.urlVal = _this.videoConfig.videoUrl
			if (!_this.videoConfig.videoUrl) {
				_this.stop()
			} else {
				if (_this.isPlay == true) {
					_this.stop()
				}
				let timer = setTimeout(() => {
					_this.urlVal = _this.videoConfig.videoUrl
					_this.start()
					window.clearTimeout(timer)
				}, 500)
			}
		}
	},
	beforeDestroy() {
		if (this.isPlay == true) {
			this.stop()
		}
	}
}
</script>

<style lang="stylus" scoped>
@import "../../assets/css/mixin";
.ctnBox {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.videoControl {
  position: absolute;
  bottom: 0;
  z-index: 999;
  height: px2rem(25);
  line-height: px2rem(25);
  width: 100%;
  background: #555;
}
.ctnBox > video {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.iconBtn {
  height: 100%;
  float: left;
  margin: 0 px2rem(5);
  color: #fff;
}
.playModal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(100, 100, 100, 0.5);
}
.loadMsg {
  width: 100%;
  height: 100%;
}
.msgCtn {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: px2rem(18);
  transform: translate(-50%, -50%);
  letter-spacing: px2rem(2.2);
}
.controlCtn {
  position: absolute;
  right: 0;
  bottom: px2rem(25);
  z-index: 999;
  height: px2rem(80);
}
.controlCtn > div {
  float: right;
  position: relative;
  height: 100%;
}
.lfControl {
  width: px2rem(80);
}
.rtControl {
  width: px2rem(29);
}
.iconControl {
  display: inline-block;
  width: px2rem(24);
  height: px2rem(24);
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  color: #19232d;
}
.lfControl {
  margin-right: px2rem(10);
}
.iconTop,
.iconBottom {
  left: px2rem(28);
}
.iconBottom {
  bottom: 0;
}
.iconLeft,
.iconRight {
  top: px2rem(28);
}
.iconRight {
  right: 0;
}
.ZoomOut {
  bottom: 0;
}
/deep/.ivu-icon{
  font-size: px2rem(25)!important;
}
</style>
