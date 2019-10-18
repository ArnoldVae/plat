<template>
	<!-- 点位管理 -->
	<div class="pointManage">
		<div
			class="leftTree"
			v-loading="loading"
			element-loading-text="正在加载树"
			element-loading-background="#0a2e63"
		>
			<el-input placeholder="输入关键字进行过滤" v-model="filterText">
				<el-button slot="append" icon="el-icon-search" @click="filterByKeyWord"></el-button>
			</el-input>
			<div class="tree-wrap" v-show="ztreeSwitch">
				<ul :id="ztreeId" ref="ztree" class="ztree"></ul>
			</div>
			<p v-show="ztreeNull">暂无数据</p>
		</div>
		<div class="rightVideo">
			<!-- <div class="video" v-for="( item , index ) in video">
                <cvideo v-if="showVideo" :videoConfig="item"></cvideo>
			</div>-->
			<components :is="views" :nodeData="nodeData"></components>
		</div>
	</div>
</template>
<script>
import '@ztree/ztree_v3/js/jquery.ztree.core.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.excheck.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.exhide.min.js'
import '@ztree/ztree_v3/demo/js/fuzzysearch'
import '@ztree/ztree_v3/css/metroStyle/metroStyle.css'
import cvideo from '@/components/native/video/OcxVideo'
import overview from './over-view'
import nodevideo from './node-video'

export default {
	name: 'pointManage',
	components: {
		cvideo,
		overview,
		nodevideo
	},
	props: {},
	data() {
		return {
			stationId: this.$store.getters.stationId,
			axios: this.$_api.pointManageData,
			axiosM: this.$_api.monitorData,
			treeData: [],
			loading: true,
			filterText: '',
			setting: {
				check: {
					enable: true
					// autoCheckTrigger: true
				},
				data: {
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'pid'
					}
				},
				view: {
					expandSpeed: 'fast',
					showIcon: false
				},
				callback: {
					onClick: this.zTreeOnClick
				}
			},
			ztreeObj: null,
			ztreeId: '',
			isFilter: false,
			ztreeSwitch: false,
			ztreeNull: false,

			ocxTimer: null, //切换模块时，ocx的渲染添加定时器
			showVideo: true, //用于切换模块时，控制视频的渲染，防止黑屏的问题
			video: [
				{
					deviceInfo: '',
					isAutoPlay: false,
					serviceInfo: '1$22.46.34.114$6801$admin$admin',
					hideTool: true,
					presetVal: -1
				}
				// {
				//     deviceInfo: '',
				//     isAutoPlay: false,
				//     serviceInfo: '1$22.46.34.114$6801$admin$admin',
				//     hideTool: true,
				//     presetVal:-1
				// },
				// {
				//     deviceInfo: '',
				//     isAutoPlay: false,
				//     serviceInfo: '1$22.46.34.114$6801$admin$admin',
				//     hideTool: true,
				//     presetVal:-1
				// },
				// {
				//     deviceInfo: '',
				//     isAutoPlay: false,
				//     serviceInfo: '1$22.46.34.114$6801$admin$admin',
				//     hideTool: true,
				//     presetVal:-1
				// },
			],

			//动态组件
			views: 'overview',
			nodeData: {} //节点视频||表格数据
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getStaticTreeData()
	},
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
		async getStaticTreeData() {
			this.isFilter = false
			this.ztreeSwitch = true
			this.axiosM
				.getAddTaskTreeData({
					unitId: this.stationId,
					codeStr: [],
					devTypeId: [],
					recogTypeId: [],
					meterTypeId: [],
					surfaceTypeId: [],
					type: 70010001
				})
				.then(res => {
					if (res.code == 200) {
						this.loading = false
						this.treeData = res.data
						$.fn.zTree.init($(this.$refs.ztree), this.setting, res.data)
						this.ztreeObj = $.fn.zTree.getZTreeObj(this.ztreeId)

						if (this.treeData.length === 0) {
							this.ztreeNull = true
						} else {
							this.ztreeNull = false
						}

						var nodes = this.ztreeObj.getNodes()
						if (nodes.length > 0) {
                            this.ztreeObj.selectNode(nodes[0])
                            // console.log(nodes[0])
                            this.setting.callback.onClick(null, this.ztreeObj.setting.treeId, nodes[0])
						}
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		zTreeOnClick(event, treeId, treeNode) {
			//点击节点时，调用视频
			if (treeNode.type == 4) {
				// this.axios.getVideoInfo({nodeId:treeNode.id}).then( res => {
				//     if(res.success){
				//         res.data.map((item,index)=>{
				//             if(item != null){
				//                 this.video[index%4].presetVal = ''
				//                 this.video[index%4].deviceInfo = item.normalVideoId;
				//                 setTimeout(() => {
				//                     this.video[index%4].presetVal = item.videoPresetId;
				//                 }, 100);

				//             }
				//         })
				//     }
				// })
				this.views = 'nodevideo'
				this.axios.getVideoInfo({ nodeId: treeNode.id }).then(res => {
					if (res.success) {
						res.data.map((item, index) => {
							if (item != null) {
								this.video[0].presetVal = ''
								this.video[0].deviceInfo = item.normalVideoId
								setTimeout(() => {
									this.video[0].presetVal = item.videoPresetId
								}, 100)
							}
						})
						this.nodeData = []
						this.nodeData = this.video
					}
				})
			} else if (treeNode.type == 1) {
				//点击非设备和节点时，显示按设备类型统计及节点表格
				this.views = 'overview'
				this.nodeData = { nodeId: treeNode.id }
			}
		},
		filterByKeyWord() {
			this.loading = true
			setTimeout(() => {
				let nodes = this.ztreeObj.getNodesByFilter(this.filterFun)
				this.processShowNodes(nodes)
			}, 1000)
		},
		filterFun(node) {
			var nameKey = this.ztreeObj.setting.data.key.name // get the key of the node name
			if (
				this.filterText.length === 0 ||
				(node[nameKey] && node[nameKey].toLowerCase().indexOf(this.filterText.toLowerCase()) != -1)
			) {
				this.ztreeObj.showNode(node) // show node with matching keywords
				return true // return true and show this node
			}

			this.ztreeObj.hideNode(node)
			return false
		},
		processShowNodes(nodes) {
			if (this.filterText.length > 0) {
				$.each(nodes, (n, obj) => {
					let pathOfOne = obj.getPath()
					if (pathOfOne && pathOfOne.length > 0) {
						// i < pathOfOne.length-1 process every node in path except self
						for (var i = 0; i < pathOfOne.length - 1; i++) {
							this.ztreeObj.showNode(pathOfOne[i]) // show node
							// if (pathOfOne[i].level === 0) {
							// 	this.ztreeObj.expandNode(pathOfOne[i], true, false, false) //expand node
							// }

							//当筛选点数小于200时，展开所有节点
							if (nodes.length <= 200) {
								this.ztreeObj.expandNode(pathOfOne[i], true, false, false)
							} else if (nodes.length > 200 && nodes.length <= 500 && pathOfOne[i].level === 1) {
								//200-500时，只展开树等级为1的节点
								this.ztreeObj.expandNode(pathOfOne[i], true, false, false)
							} else if (pathOfOne[i].level === 0) {
								this.ztreeObj.expandNode(pathOfOne[i], true, false, false)
							}
						}
					}
				})
			} else {
				var rootNodes = this.ztreeObj.getNodesByParam('level', '0') // get all root nodes
				$.each(rootNodes, (n, obj) => {
					this.ztreeObj.expandNode(obj, true) // expand all root nodes
				})
			}
			this.loading = false
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
.pointManage {
  width: 100%;
  height: 1070px;

  .leftTree {
    width: 380px;
    height: 900px;
    background: url('../../assets/img/common/tree.png') no-repeat;
    background-size: 100% 100%;
    float: left;

    /deep/.el-input {
      width: calc(100% - 20px);
      margin: 10px 0 0 10px;

      /deep/.el-input__inner {
        border: 0;
      }
    }

    /deep/ .el-input-group__append {
      background-color: #17579a;
      border-color: #17579a;

      i {
        color: #fff;
      }
    }

    /deep/ .tree-wrap {
      margin-top: 10px;
      height: 90.5% !important;
    }

    /deep/ .ztree {
      li {
        line-height: 40px;

        a {
          height: 40px;
          line-height: 40px;
          color: #8fd8fe;
          text-decoration: none;

          span {
            font-size: 14px !important;
            vertical-align: middle;
          }
        }
      }

      .button.chk {
        display: none;
      }
    }

    .tree-wrap {
      height: 100%;
      overflow: auto;
      padding: 0 10px;
    }
  }

  .rightVideo {
    width: 1210px;
    height: 867px;
    // border: 2px solid #1c5892;
    float: left;
    margin-left: 10px;

    .videoControl {
      display: none;
    }

    .video {
      width: 590px;
      height: 430px;
      float: left;
      margin-left: 10px;
    }

    .video:nth-of-type(3) {
      margin-top: 6px;
    }

    .video:nth-of-type(4) {
      margin-top: 6px;
    }
  }
}

/deep/ .ztree li span.button.chk.checkbox_false_full_focus {
  cursor: pointer;
}

/deep/ .ztree li span.button.chk.checkbox_true_full, /deep/ .ztree li span.button.chk.checkbox_true_full_focus, /deep/ .ztree li span.button.chk.checkbox_true_part, /deep/.ztree li span.button.checkbox_true_part_focus {
  background: url('../../assets/img/common/dui1.png') no-repeat center !important;
  background-size: 80% 65% !important;
  cursor: pointer;
}

/deep/ .ztree li span.button.root_close, /deep/ .ztree li span.button.roots_close, /deep/ .ztree li span.button.center_close, /deep/ .ztree li span.button.bottom_close {
  background: url('../../assets/img/common/arrow.png') no-repeat center !important;
}

/deep/ .ztree li span.button.root_open, /deep/ .ztree li span.button.roots_open, /deep/ .ztree li span.button.center_open, /deep/ .ztree li span.button.bottom_open {
  background: url('../../assets/img/common/arrow.png') no-repeat center !important;
  transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

/deep/.ztree .button.bottom_close:before, /deep/.ztree .button.bottom_open:before, /deep/.ztree .button.center_close:before, /deep/.ztree .button.center_open:before, /deep/.ztree .button.noline_close:before, /deep/.ztree .button.noline_open:before, /deep/.ztree .button.root_close:before, /deep/.ztree .button.root_open:before, /deep/.ztree .button.roots_close:before, /deep/.ztree .button.roots_open:before {
  border-color: transparent transparent transparent #fff;
}

/deep/.ztree li a.curSelectedNode {
  opacity: 0.8;
  background: #063783;
}
</style>
