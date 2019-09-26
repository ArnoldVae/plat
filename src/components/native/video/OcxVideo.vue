<template>
	<div class="ocxVideo">
		<object
			:class="!showTool ? 'videoFull videoEl' : 'videoEl'"
			data="data:application/x-oleobject;base64,QQ2TUrpMWkOeetsRJuGnPQADAAAjAQAAcgEAAA=="
			clsid="{50A7D36B-DCC7-46FD-B51A-99EE9D882BFD}"
			:event_PlatformOCXClick="
				!!videoConfig.videoIdx || videoConfig.videoIdx == 0 ? 'OCXCLICK' + videoConfig.videoIdx : 'OCXCLICK'
			"
			type="application/xhanhan-activex"
		></object>
		<div class="videoControl" v-if="showTool">
			<a v-show="isPlay" href="javascript:void(0)" class="iconBtn" @click="stop()">
				<Icon type="md-power" :size="25" />
			</a>
			<a v-show="!isPlay" href="javascript:void(0)" class="iconBtn" @click="play()">
				<Icon type="ios-play" :size="25" />
			</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'WebVideo',
	props: {
		/*
        isAutoPlay  // 是否自动播放
        serviceInfo  // 视频服务信息
        deviceInfo  // 视频地址信息
        hideTool  // 是否隐藏底部工具栏
        delCache   // 是否删除缓存
        presetVal  // 预置位值
      */
		videoConfig: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			videoOutput: null,
			isPlay: false,
			showTool: true,
			TIMER: null,
			resizeTimer: null,
			isAdd: true
		}
	},
	methods: {
		//初始化OCX控件
		initOCX() {
			const _this = this
			//是否隐藏工具栏
			if (_this.videoConfig.hideTool == true) {
				_this.showTool = false
			}
			try {
				_this.videoOutput = _this.$el.querySelector('.videoEl')
				if (_this.videoOutput.PlatformOCXInit) {
					if (_this.videoOutput.PlatformOCXInit() != 0) {
						console.log('初始化视频控件失败')
					} else {
						if (!!_this.videoConfig.videoIdx || _this.videoConfig.videoIdx == 0) {
							window['OCXCLICK' + _this.videoConfig.videoIdx] = function() {
								_this.$emit('setSelectIdx', _this.videoConfig.videoIdx)
							}
						}
						_this.pageResize()
						if (_this.videoConfig.isAutoPlay == true) {
							_this.play()
						}
					}
				}
			} catch (e) {
				console.log('当前浏览器不支持视频控件 ' + e)
			}
		},
		//播放视频
		play() {
			const _this = this
			if (!!_this.videoConfig.serviceInfo && !!_this.videoConfig.deviceInfo) {
				try {
					let _result = _this.videoOutput.PlatformOCXRealPlay(
						0,
						_this.videoConfig.serviceInfo,
						_this.videoConfig.deviceInfo,
						0
					)
					if (_result != 0) {
						console.log('视频播放失败,返回值:' + _result)
					} else {
						_this.pageResize()
						console.log('视频播放中...')

						//有预置位时，调用预置位
						if (_this.videoConfig.presetVal) {
							_this.excPreset()
						}
						_this.isPlay = true
					}
				} catch (e) {
					console.log('play: ' + e)
					return false
				}
			} else {
				console.log('请先配置视频信息!!!')
			}
		},
		//停止播放视频
		stop() {
			const _this = this
			try {
				let _result = _this.videoOutput.PlatformOCXClose(0)
				if (_result != 0) {
					console.log('视频关闭失败,返回值:' + _result)
				} else {
					_this.isPlay = false
					if (_this.videoConfig.delCache == true) {
						_this.videoConfig.serviceInfo = ''
						_this.videoConfig.deviceInfo = ''
					}
				}
			} catch (e) {
				console.log('stop: ' + e)
				return false
			}
		},
		//在视频组件被销毁之前，
		beforeDestroy() {
			if (this.isPlay == true) {
				this.stop()
			}
		},
		commonFn() {
			const _this = this
			if (_this.TIMER == null) {
				_this.TIMER = setTimeout(() => {
					if (_this.isPlay == true) {
						_this.stop()
					}
					_this.play()
					_this.TIMER = null
				}, 300)
			}
		},
		//调用预置位
		excPreset() {
			const _this = this
			try {
				let _result = _this.videoOutput.PlatformOCXPTZCtrlPreset(0, 13, _this.videoConfig.presetVal, '')
				if (_result != 0) {
					console.log('调用预置位失败，返回值:' + _result)
				}
			} catch (e) {
				console.log('预置位: ' + e)
				return false
			}
		},
		//为防止黑屏问题，页面结构有变化时，改变oxc容器大小
		pageResize() {
			const _this = this
			if (_this.resizeTimer != null) {
				window.clearTimeout(_this.resizeTimer)
			}
			_this.resizeTimer = setTimeout(() => {
				let width = _this.$el.offsetWidth
				if (_this.isAdd) {
					_this.$el.style.width = `${width + 1}px`
					_this.isAdd = false
				} else {
					_this.$el.style.width = `${width - 1}px`
					_this.isAdd = true
				}
			}, 300)
		},
		//查看录像功能
		//beginTime-录像开始时间,endTime-录像结束时间
		playHistory(beginTime, endTime) {
			try {
				let recordStr = this.videoOutput.PlatformOCXFindRecordEX(
					this.videoConfig.serviceInfo,
					this.videoConfig.deviceInfo,
					beginTime,
					endTime
				)

				if (recordStr.length === 0) {
					console.log('没有找到可播放的录像')
					return
				}
				let tempary = recordStr.split('|')
				console.log(tempary)
				if (tempary.length > 0) {
					let strRecordInfo = tempary[0].substring(0, tempary[0].indexOf(':'))
					let ct = this.videoOutput.PlatformOCXPlayBackByNameEX(
						0,
						this.videoConfig.serviceInfo,
						this.videoConfig.deviceInfo,
						strRecordInfo
					)
					if (ct === 0) {
						console.log('播放录像成功')
					} else {
						console.log('播放录像失败')
					}
				}
			} catch (e) {
				console.log('回放录像功能出错：' + e)
			}
		},
		//控球
		//type -控制的方向
		//1-左，2-右，3-上，4-下，5-左上，6-左下，7-右上，8-右下,9-缩放减小，10-缩放放大，11-光圈和焦距缩小，12-焦距方法，13-光圈放大
		//speed - 控制的速度  1-16
		//type和speed同时传0，停止控球
		ctrlCam(type, speed) {
			try {
				let result = this.videoOutput.PlatformOCXPTZCtrl(0, type, speed)
				if (result !== 0) {
					console.log('控球失败')
				}
			} catch (e) {
				console.log('控球失败：' + e)
			}
		},
		//截取视频到指定路径
		//path-图片存放路径
		capturePic(path) {
			try {
				if(!path){
					console.log('请选择图片保存的路径');
					return;
				}
				let result = this.videoOutput.PlatformOCXCapPicture(0, path)
				if (result !== 0) {
					console.log('截屏失败')
				}
			} catch (e) {
				console.log('截屏失败：' + e)
			}
		},
		//视频录像
		//path-录像存放路径
		startRecord(path) {
			try {
				if(!path){
					console.log('请选择录像保存的路径');
					return;
				}
				let result = this.videoOutput.PlatformOCXStartRecord(0, path)
				if (result !== 0) {
					console.log('截屏失败')
				}
			} catch (e) {
				console.log('截屏失败：' + e)
			}
		}
	},
	mounted() {
		const _this = this
		_this.initOCX()
		_this.pageResize()
		window.addEventListener('beforeunload', function() {
			if (_this.isPlay == true) {
				_this.stop()
			}
		})
		window.onresize = () => {
			_this.pageResize()
		}
		// setInterval(()=>{
		//   _this.initOCX();
		// },1000);
		window.hyl_this = this
	},
	watch: {
		'videoConfig.serviceInfo'() {
			this.commonFn()
		},
		'videoConfig.deviceInfo'() {
			this.commonFn()
		},
		'videoConfig.presetVal'() {
			this.excPreset()
		}
	}
}
</script>
<style lang="stylus" scoped>
// @import "../../assets/css/mixin";
.ocxVideo {
  width: 100%;
  height: 100%;
  position: relative;

  .videoEl {
    width: 100%;
    height: calc(100% - 25px);
    // object-fit: fill;
  }

  .videoFull {
    height: 100%;
  }

  .videoControl {
    position: absolute;
    bottom: 0;
    z-index: 999;
    height: 25px;
    line-height: 25px;
    width: 100%;
    background: #555;

    .iconBtn {
      height: 100%;
      float: left;
      margin: 0 5px;
      color: #fff;
    }
  }
}
</style>
