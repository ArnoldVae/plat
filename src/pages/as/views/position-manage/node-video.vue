<template>
  <div class="node-video">
    <div class="rightVideo">
        <div class="video">
            <cvideo v-if="showVideo" :videoConfig="nodeData[0]"></cvideo>
        </div>
    </div>
  </div>
</template>


<script>
import cvideo from '@/components/native/video/OcxVideo'
export default {
	name: 'node-video',
	components: {
        cvideo,
  },
	props: {
    nodeData:{
      type: Array,
      default: [
        {
            deviceInfo: '',
            isAutoPlay: false,
            serviceInfo: '1$22.46.34.114$6801$admin$admin',
            hideTool: true,
            presetVal:-1
          }
      ]
    }
  },
	data() {
        return{
          showVideo: true, //用于切换模块时，控制视频的渲染，防止黑屏的问题
          ocxTimer: null, //切换模块时，ocx的渲染添加定时器
          videoData: {
            deviceInfo: '',
            isAutoPlay: false,
            serviceInfo: '1$22.46.34.114$6801$admin$admin',
            hideTool: true,
            presetVal:-1
          },
        }
    },
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activated() {
		//使用keep-alive之后，activated和deactivated会被触发，destory不会被触发
		clearTimeout(this.ocxTimer)

		//为了防止切换时，视频打不开，导致卡顿，无法立即切换，添加定时器，在页面切换成功之后，再显示视频
		this.ocxTimer = setTimeout(() => {
			this.showVideo = true
		}, 1000)
	},
	deactivated() {
		this.showVideo = false
	},
	update() {},
	beforeDestory() {},
	methods: {
 
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
  .node-video {
    .rightVideo {
      width: 1200px;
      height: 890px;

      .video {
        width: 1200px;
        height: 890px;
      }
    }
  }

</style>