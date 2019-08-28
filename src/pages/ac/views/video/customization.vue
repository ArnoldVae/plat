<template>
	<div class="video-customization">
		<div class="rtCtn">
			<!-- <div class="videoControl">
			</div>-->
			<div class="videoCtn-box">
				<div class="ctnMain">
					<div class="videoPanorama-ctnBox">
						<div class="videoCtn">
							<div
								:class="
									selectIdx == idx && playType == '视频'
										? `videoItem layout-${videoLen} videoSelect`
										: `videoItem layout-${videoLen}`
								"
								v-for="(item, idx) in videoComList"
								:key="idx"
							>
								<!-- <VideoKurento :videoConfig="item" :isShowTool="false"></VideoKurento> -->
								<!-- 播放视频窗口 -->
								<ocxVideo :videoConfig="item" @setSelectIdx="selectIndex"></ocxVideo>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="lfCtn">
			<div class="tabBox">
				<!-- 选择 -->
				<div class="inBox" @click="videoclickShow('视频')" :class="{ active: active == videoShow }">视频</div>
				<div class="inBox" @click="videoclickShow('场景')" :class="{ active: active == !videoShow }">场景</div>
			</div>
			<div class="videoBox" v-show="videoShow">
				<Menu :active-name="firstScene" width="auto" @on-select="selectMenu" ref="videoScene">
					<MenuItem :name="item.sceneId" v-for="(item, idx) in sceneList" :key="idx">
						<!-- <img :src="selectScene == item.sceneID ? iconCheck[item.iconName] : iconList[item.iconName]" alt=""> -->
						<!-- <img :src="selectScene == item.sceneID ? checkIcon : defaultIcon" alt=""> -->
						<p>{{ item.vcName }}</p>
					</MenuItem>
				</Menu>
			</div>
			<input
				type="text"
				v-model="search"
				class="search-ipt"
				placeholder="请输入搜索关键字"
				v-show="!videoShow"
			/>
			<div class="videoBox2" v-show="!videoShow">
				<Menu width="auto" @on-select="selectMenuVideo" ref="video">
					<MenuItem
						:name="item.videoPlayUrl || ''"
						v-for="(item, idx) in filterplayVideoList"
						:key="idx"
					>
						<!-- <img :src="selectScene == item.sceneID ? iconCheck[item.iconName] : iconList[item.iconName]" alt=""> -->
						<!-- <img :src="selectScene == item.sceneID ? checkIcon : defaultIcon" alt=""> -->
						<p>{{ item.vcName }}</p>
					</MenuItem>
				</Menu>
			</div>
		</div>
	</div>
</template>
<script>
import ocxVideo from '@/components/native/video/OcxVideo'
import pinyin from 'pinyin2'
import { findComponentUpward } from '@/libs/assist'
export default {
	name: 'video-customization',
	components: { ocxVideo },
	props: {},
	data() {
		return {
			unitId: this.$store.getters.unitId,
			filterText: '',
			data: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			videoShow: false,
			topicArr: ['qif/zf/app/', 'qif/zf/app/control/'],
			topicStr: '',
			guids: [],
			active: '',
			lxTime: 0, //轮巡间隔
			lxStatus: '开始轮巡',
			videoLen: 4, //默认分屏
			index: 0, // 视频轮训列表当前位置
			videoComList: [], // 视频分屏列表
			playVideoList: [],
			videoSeviceUrl: '',
			firstvideoPlayUrl: '',
			playType: '',
			modalShow2: false,
			// 视频列表
			timer: null, // 定时器
			stationVideo: '测试站测试视频', // 站点视频名称
			sceneList: [],
			videoList: [],
			firstScene: '',
			search: '',
			selectScene: '', //当前选中的场景
			serviceInfo: '',
			isPlaying: false, // 是否在轮巡播放中
			defaultIcon: require('../../assets/img/video/cdjs.png'),
			checkIcon: require('../../assets/img/video/cdjs_check.png'),
			iconList: {
				cdjs: require('../../assets/img/video/cdjs.png'),
				afxs: require('../../assets/img/video/afxs.png'),
				sbjs: require('../../assets/img/video/sbjs.png'),
				dlcjs: require('../../assets/img/video/dlcjs.png'),
				qjnk: require('../../assets/img/video/qjnk.png')
			},
			iconCheck: {
				cdjs: require('../../assets/img/video/cdjs_check.png'),
				afxs: require('../../assets/img/video/afxs_check.png'),
				sbjs: require('../../assets/img/video/sbjs_check.png'),
				dlcjs: require('../../assets/img/video/dlcjs_check.png'),
				qjnk: require('../../assets/img/video/qjnk_check.png')
			},
			selectIdx: 0
		}
	},
	computed: {
		getunitId: function() {
			return this.$store.getters.unitId
		},
		activeDeviceTypeId() {
			return findComponentUpward(this, 'intelligent').currentTypeId
		},
		filterplayVideoList() {
			let result = []
			result = this.playVideoList.filter(item => {
				// return item.vcName.match(this.search)
				// console.log(item);
				if (this.search == '') {
					return true
				} else if (
					/^[\u4e00-\u9fa5]+$/gi.test(this.search) &&
					item.vcName.includes(this.search) &&
					this.search != ''
				) {
					item.vcName.match(this.search)
					return true
				} else if (
					escape(this.search).indexOf('%u') < 0 &&
					item.py.includes(this.search.toLowerCase()) &&
					this.search != ''
				) {
					item.vcName.match(this.vcName)
					return true
				}
			})
			return result
		}
	},
	filters: {},
	watch: {
		getunitId: {
			handler(newValue) {
				this.unitId = newValue
				this.topicStr = this.topicArr[0] + this.unitId
				this.loadSceneList()
				this.palyVideo()
			}
		},
		//监听分屏数量变化
		videoLen: function(val) {
			this.setVideoScreen(val)
		},
		stationId(val) {
			const _this = this
			_this.loadSceneList(val)
			_this.palyVideo(val)
		}
	},
	created() {
		const $this = this
		this.getVideoServe()
		// $this.$api.dsqIntelligent.getDefaultInfo().then(defaultInfo => {
		$this.$_api.getStaticData('./simulation-data/video-changeVideoTime.json').then(defaultInfo => {
			$this.lxTime = defaultInfo.data.changeVideoTime
		})
	},
	mounted() {
		const _this = this
		// 初始化的时候，默认先加载每个视频容器
		_this.setVideoScreen(_this.videoLen)

		_this.loadSceneList(this.unitId)
		_this.palyVideo(this.unitId)
		window.pqw_this = this
	},
	activited() {},
	update() {},
	beforeDestory() {
		window.clearInterval(this.timer)
	},
	methods: {
		videoclickShow(type) {
			this.playType = type
			if (type == '场景') {
				this.videoList = []
				// this.setVideoScreen(this.videoLen);
				// this.loadSceneList(this.$store.getters.stationId);
				if (this.videoShow == false) {
					// this.loadSceneList()
				}
				this.videoShow = true
			} else if (type == '视频') {
				this.setVideoScreen(this.videoLen)
				this.videoList = []
				// this.selectMenuVideo(this.firstvideoPlayUrl)
				this.videoShow = false
			}
		},
		selectIndex(val) {
			// console.log(val);
			// alert(val)

			this.selectIdx = val
		},
		//场景列表点击
		selectMenu: function(data) {
			this.setVideoScreen(this.videoLen)
			this.videoList = []
			this.selectScene = data
			this.index = 0
			if (this.timer != null) {
				window.clearInterval(this.timer)
			}
			// 获取视频列表
			this.loadVideoList(data)
		},
		//点击视频列表
		selectMenuVideo(data) {
			this.videoComList[this.selectIdx].deviceInfo = data
			// this.videoComList[this.selectIdx].serviceInfo = this.videoSeviceUrl
			this.videoComList[this.selectIdx].serviceInfo = this.serviceInfo
			this.videoComList[this.selectIdx].isAutoPlay = true
			// this.videoComList[this.selectIdx].serviceInfo = "1$22.46.34.114$6800$admin$admin";
			console.log(this.videoComList)
		},
		// 改变分屏
		changePanel(len) {
			this.videoLen = len
			this.index = 0
			if (this.timer != null) {
				window.clearInterval(this.timer)
			}
			setTimeout(() => {
				let W = this.$el.querySelector('.videoItem').offsetWidth
				let doms = this.$el.querySelectorAll('.ocxVideo')
				for (let a1 = 0; a1 < doms.length; a1++) {
					doms[a1].style.width = W + 'px'
				}
			}, 500)
			// 获取视频列表
			// console.log(this.selectScene)
			this.loadVideoList(this.selectScene)
		},
		// 根据指定分屏数量，展示分屏
		setVideoScreen(len) {
			this.videoComList = []
			for (let i = 0; i < len; i++) {
				this.videoComList.push({
					isAutoPlay: false,
					videoIdx: i,
					// serviceInfo: '',
					serviceInfo: this.serviceInfo,
					deviceInfo: '',
					hideTool: true
				})
			}
		},
		// 获取视频列表
		loadVideoList(sceneID) {
			const _this = this
			// _this.$_api.getStaticData('./simulation-data/video-list.json').then(res => {
			let params = {
				sceneId: sceneID,
				unitId: this.unitId
			}
			if (this.videoShow) {
				this.$_api.video.getSceneDevList(params).then(res => {
					console.log(res)
					if (res.code == 200 && res.data) {
						if (res.data.length != 0) {
							res.data.forEach(item => {
								// if (!!item.vc_Params3 && _this.serviceInfo == '') {
								// 	_this.serviceInfo = item.vc_Params3
								// }
								_this.videoList.push({
									videoUrl: item.devId
									// preset: item.fParam1
								})
							})

							_this.autoPlay()
						}
					}
				})
			}
		},
		//获取视频服务
		getVideoServe() {
			this.$_api.video.getVideoServe().then(res => {
				if (res.code == 200 && res.data) {
					console.log(res)
					// this.videoConfig.serviceInfo = res.data.ServiceID
					// 1$153.3.56.162$6800$admin$admin
					let obj = res.data
					this.serviceInfo = obj.ServiceID + '$' + obj.vc_IP + '$' + obj.i_Port + '$admin$admin'
					console.log(this.serviceInfo)
				}
			})
		},
		// 开始轮巡
		startPlay() {
			const _this = this
			let _vidoeInfos = []
			for (let i = 0; i < this.videoLen; i++) {
				_vidoeInfos[i] = {
					isAutoPlay:
						_this.videoList[_this.index] && _this.videoList[_this.index].videoUrl != 'undefined'
							? true
							: false,
					hideTool: true,
					deviceInfo:
						_this.videoList[_this.index] && _this.videoList[_this.index].videoUrl != 'undefined'
							? _this.videoList[_this.index].videoUrl
							: '',
					serviceInfo: _this.serviceInfo
					// presetVal:
					// 	typeof _this.videoList[_this.index].preset === 'undefined'
					// 		? ''
					// 		: _this.videoList[_this.index].preset
				}
				if (_this.videoList.length > _this.videoLen) {
					_this.index = _this.index + 1 < _this.videoList.length ? _this.index + 1 : 0
				} else {
					_this.index++
				}
			}
			_this.videoComList = _vidoeInfos
			console.log(this.videoComList)
		},
		autoPlay(isClick) {
			const _this = this
			if (isClick == true) {
				if (_this.isPlaying == false) {
					_this.startPlay()
					if (_this.videoList.length > _this.videoLen) {
						_this.timer = setInterval(() => {
							_this.startPlay()
						}, _this.lxTime)
					}
					_this.isPlaying = true
					_this.lxStatus = '结束轮巡'
				} else {
					window.clearInterval(_this.timer)
					_this.lxStatus = '开始轮巡'
					_this.isPlaying = false
				}
			} else {
				if (_this.timer != null) {
					window.clearInterval(_this.timer)
				}
				_this.startPlay()
				// if(_this.videoList.length > _this.videoLen){
				//   _this.timer = setInterval(()=>{
				//     _this.startPlay();
				//   }, _this.lxTime);
				// }
				_this.isPlaying = true
				_this.lxStatus = '结束轮巡'
			}
		},
		loadSceneList() {
			const _this = this
			let params = {
				currentPage: 1,
				pageSize: 10000,
				sceneOrgId: '',
				unitId: this.unitId
			}

			this.$_api.video.getSceneList(params).then(res => {
				if (res.code == 200 && res.data.lists[0] != undefined) {
					_this.sceneList = res.data.lists
					_this.sceneList.forEach(itemScene => {
						switch (itemScene.type) {
							case '10080001':
								itemScene.iconName = 'cdjs'
								break
							case '10080002':
								itemScene.iconName = 'cdjs'
								break
							case '10080004':
								itemScene.iconName = 'afxs'
								break
							case '10080005':
								itemScene.iconName = 'sbjs'
								break
							case '10080006':
								itemScene.iconName = 'dlcjs'
								break
							case '10080003':
								itemScene.iconName = 'qjnk'
								break
						}
					})
					// 默认选中第一个   且赋值给当前选中项
					_this.firstScene = _this.selectScene = _this.sceneList[0].sceneId
					_this.$nextTick(() => {
						_this.$refs.videoScene.updateActiveName()
						_this.loadVideoList(_this.firstScene)
					})
				}
			})
		},
		//点击视频+列表播放
		palyVideo() {
			const _this = this
			let params = {
				currentPage: 1,
				devTypeId: 1044,
				orgId: '',
				pageSize: 10000,
				unitId: this.unitId
			}
			this.$_api.video.getDevList(params).then(res => {
				console.log(res)
				if (res.code == 200 && res.data) {
					this.firstvideoPlayUrl = res.data.lists[0].devId
					res.data.lists.forEach(item => {
						// if (!!item.vcParam3 && _this.videoSeviceUrl == '') {
						// 	_this.videoSeviceUrl = item.vcParam3
						// }
						_this.videoSeviceUrl = this.serviceInfo
						////////////////////////////////////////
						_this.playVideoList.push({
							// videoPlayUrl: item.vcParam1,
							videoPlayUrl: item.devId,
							vcName: item.vcName
						})
					})
					this.convertToPinyin(_this.playVideoList)
					console.log(this.videoComList)
				}
			})
		},
		videoHandler(type) {
			// console.log(type);
			alert(type)
		},
		convertToPinyin(data) {
			data.forEach(
				(item => {
					// console.log(item);
					const _pinyin = pinyin(item.vcName, {
						style: pinyin.STYLE_NORMAL //全拼风格
					})
					item.pinyin = _pinyin.join('').toLowerCase()
					item.py = _pinyin
						.map(item => {
							return item[0].substr(0, 1)
						})
						.join('')
						.toLowerCase()
					// if(item.children instanceof Array && item.children.length > 0){
					// this.convertToPinyin(item.children)
					// }
				}).bind(this)
			)
		}
	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		next()
	}
}
</script>
<style lang="stylus" scoped>
.video-customization {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;

  .lfCtn {
    width: 340px;
    height: 100%;
    // background-color: rgba(20, 26, 38, 0.6);
    text-align: center;
    // overflow-y: auto;
    // padding-top: 10px;
    padding-left: 10px;
    overflow: hidden;

    .tabBox {
      width: 100%;
      overflow: hidden;
      cursor: pointer;
      margin-bottom: 10px;

      .inBox {
        width: 50%;
        height: 45px;
        float: left;
        font-size: 22px;
        // background-color: #47758f;
        color: #fff;
        text-align: center;
        line-height: 45px;
        // border: 1px solid #fff;
        border: 1px solid #3ea1aa;
        background-color: #0c2d5f;
      }

      .active {
        background: rgba(15, 33, 69, 0.7);
        color: #ffd36a;
      }
    }

    .videoBox, .videoBox2 {
      width: 100%;
      height: calc(100% - 120px);
      overflow-y: auto;
      border: 2px solid #185a9e;
    }

    .videoBox {
      height: calc(100% - 60px);
    }

    .search-ipt {
      width: 100%;
      height: 40px;
      color: #fff;
      margin-bottom: 10px;
      background-color: #0b265c;
      outline: none;
      border-radius: 4px;
      padding-left: 10px;
      border: 1px solid #3789c9;
    }

    img {
      width: 86px;
      height: 82px;
    }

    p {
      font-size: 18px;
    }
  }

  .ModalBox2 {
    position: absolute;
    width: 1400px;
    height: 720px;
    margin-top: 80px;
    margin-left: -1689px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid red;
    // opacity: 1;
    border-radius: 10px;
    z-index: 99999;

    iframe {
      position: absolute;
      visibility: inherit;
      width: 100%;
      height: 100%;
      z-index: 888;
    }

    .modContent {
      width: 1400px;
      height: 720px;
      position: relative;

      .confirmBox {
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;

        > div {
          width: 50%;
          height: 50%;
          // border: 1px solid red;
          float: left;
        }

        .confirmTop {
          width: 100%;
          height: 40px;
          padding-top: 10px;
          color: #fff;
          float: left;
          background-color: #041e2f;
          font-size: 25px;
          line-height: 30px;
        }

        .confirmTitle {
          width: 100%;
          height: 50px;
          margin-top: 100px;
          font-size: 20px;
          color: #fff;
          line-height: 50px;
        }

        .yBtn {
          width: 80px;
          float: left;
          height: 35px;
          background-color: #236e91;
          font-size: 18px;
          line-height: 35px;
          margin-top: 90px;
          color: #fff;
          cursor: pointer;
          border-radius: 10px;
          margin-left: 25px;
        }

        .nBtn {
          width: 80px;
          height: 35px;
          float: left;
          margin-left: 280px;
          margin-top: 90px;
          background-color: #236e91;
          font-size: 18px;
          line-height: 35px;
          color: #fff;
          cursor: pointer;
          border-radius: 10px;
        }
      }
    }
  }

  .rtCtn {
    height: 100%;
    width: calc(100% - 360px);

    .videoControl {
      margin: 10px 0;
      height: 55px;

      .headBtns {
        height: 55px;
        line-height: 55px;
        text-align: right;

        .aBtn {
          display: inline-block;
          height: 100%;
          color: #fff;
          margin-left: 10px;
        }

        .screenBtn {
          background: url('../../assets/img/video/changeScreen.png') no-repeat;
          background-size: 100% 100%;
          padding: 0 33px;
          margin-left: -15px;
        }

        .active {
          color: #00f0ff;
          background: url('../../assets/img/video/changeScreen_1.png') no-repeat;
          background-size: 100% 100%;
        }

        .btnGroup {
          background: url('../../assets/img/video/group.png') no-repeat;
          background-size: 100% 100%;
          padding: 0 15px;

          &:first-child {
            margin-left: 15px;
          }
        }

        .btnStart {
          background: url('../../assets/img/video/startLX.png') no-repeat;
          background-size: 100% 100%;
          padding: 0 30px;
        }
      }
    }

    .videoCtn-box {
      border: 1px solid #fff;
      height: 100%;

      .ctnMain {
        height: 100%;

        .videoPanorama-ctnBox {
          height: 100%;
        }

        .videoCtn {
          height: 100%;

          .videoItem {
            float: left;
            box-sizing: border-box;
            // border: 1px solid #000;
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
            width: calc((100% / 3));
            height: calc((100% / 3));
          }

          .videoSelect {
            border: 2px solid #ff0;
          }
        }
      }
    }
  }
}

.ivu-menu-light {
  background-color: rgba(0, 0, 0, 0) !important;

  &::after {
    display: none;
  }
}

.ivu-menu-vertical .ivu-menu-item {
  padding: 14px 0;
  color: #fff;
  margin-bottom: 10px;
  border: 1px solid transparent;
  text-align: left;
  padding-left: 10px;

  &:hover {
    background: #0e2e51;
  }

  p {
    display: flex;
    display: -ms-flexbox;
    align-items: center;
    -webkit-align-items: center;
  }

  p:before {
    content: '';
    display: table;
    width: 30px;
    height: 30px;
    background: url('../../assets/img/video/videoIcon.png') no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
  }
}

.ivu-menu-vertical .ivu-menu-item:nth-last-child(1) {
  margin-bottom: 0;
}

.ivu-menu-item-active {
  background-color: transparent;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #fff;
  background: url('../../assets/img/video/active.png') no-repeat !important;
  background-size: 100% 100% !important;
}

.ivu-menu-light.ivu-menu-vertical {
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 2px;
  }
}
</style>
