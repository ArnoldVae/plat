<template>
  <div class="platform">
    <!-- 加载状态 -->
    <a-spin size="large" :spinning="spinning">
      <!-- 单例导航头与侧边栏 -->
      <navigation :menuData="menuData" title="智能辅助物联网平台" :alarm="99" @handleSelectMenu="selectMenu"></navigation>
      <div class="iframe-view-wrap">
        <!-- <div v-show="maskLoading" class="mask"></div> -->
        <!-- <iframe
					@load="iframeLoad"
					v-if="iframeReset"
					:src="location"
					frameborder="0"
					class="iframe-view"
					width="100%"
					height="956" 
					scrolling="no"
				>
        </iframe>-->
        <iframe
          v-for="(item,index) in menuData"
          :key="index"
          class="iframw-view"
          frameborder="0"
          width="100%"
          height="956"
          scrolling="no"
          :src="frameSrcArr[index]"
          v-show="index===selectMenuIndex"
          @load="iframeLoad(index)"
		  allowtransparency="true"
        ></iframe>
      </div>
    </a-spin>
  </div>
</template>
<script>
export default {
	name: 'platform',
	components: {},
	props: {},
	data() {
		return {
			// iframe地址
			location: '',
			iframeReset: true,
			spinning: true,
			maskLoading: true,
			menuData: [
				{
					moduleId: 2,
					vcCaption: '辅助综合',
					// /intelligent/humiture
					vcExecuteObject: 'ac/#'
				},
				{
					moduleId: 3,
					vcCaption: '立体巡检',
					vcExecuteObject: 'as/#'
				},
				{
					moduleId: 5,
					vcCaption: '智能消防',
					vcExecuteObject: 'fire/#'
				}
			],
			selectMenuIndex: 0,
			frameSrcArr: [], //存放iframe src，初始全部为空
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getPageModule()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		async getPageModule() {
			let result = await this.$_api.navigation.getPageModule()
			console.log(result)
			if (result.success) {
				// this.menuData = result.data
				//遍历数据，改变src指向
				this.frameSrcArr = new Array(result.data.length)
				result.data.forEach(item => {
					item.vcExecuteObject = this.handleIframeSrc(item.vcExecuteObject)
				})
				this.menuData = result.data
			} else {
				this.menuData = []
			}
		},
		//选择菜单项
		selectMenu(item, index) {
			this.maskLoading = true
			this.spinning = true
			this.selectMenuIndex = index
			// this.frameSrcArr.push('no-src.html');
			// this.frameSrcArr[index] = ''
			//当前选中索引对应的iframe首次赋给地址，有地址的无变化
			if (typeof this.frameSrcArr[index] === 'undefined') {
				this.frameSrcArr[index] = item.vcExecuteObject
			} else {
				this.maskLoading = false
				this.spinning = false
			}
		},
		iframeLoad(index) {
			this.spinning = false
			this.maskLoading = false
		},
		//处理iframe src
		handleIframeSrc(src) {
			if (src && src.indexOf('http') != -1) {
				return src.vcExecuteObject
			} else {
				if (process.env.NODE_ENV == 'production') {
					let pathname = window.location.pathname
					let folderPath = pathname.substring(0, pathname.lastIndexOf('/'))
					return window.location.origin + folderPath + `/${src}`
				}
				if (src && process.env.NODE_ENV == 'development') {
					let moduleName = src.split('/#')[0]
					let hashPath = src.split('/#')[1]
					return moduleName + '.html#' + hashPath
				}
			}
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
.platform {
  width: 1920px;
  height: 1080px;
  background: url('~@/assets/img/navigation/background.png') no-repeat;
  background-size: 100% 1080px;

  /deep/ .ant-spin-blur::after {
    opacity: 0;
  }

  .iframe-view-wrap {
    width: 100%;
    height: 940px;

    .mask {
      width: 1920px;
      height: 940px;
      background: url('~@/assets/img/navigation/background.png') no-repeat 0 -140px;
      background-size: 100% 1080px;
      position: absolute;
      z-index: 1;
    }

    iframe {
      height: 936px;
    }
  }
}
</style>
