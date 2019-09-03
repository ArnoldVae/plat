<template>
	<div class="inspection">
		<div class="tree-container">
			<el-filter-tree
				placeholder="输入关键字进行过滤"
				v-model="filterText"
				ref="elFilterTree"
				:data="unitTreeData"
				:props="defaultProps"
				default-expand-all
				:filter-node-method="filterNode"
				highlight-current
				node-key="id"
				@node-click="handleClickNode"
				:current-node-key="$store.getters.stationId"
			>
				<template #prefix>
					<i class="el-icon-search"></i>
				</template>
			</el-filter-tree>
		</div>
		<div class="inspection-content">
			<div class="inspection-header">
				<div class="header-rt">
					<ul>
						<li
							v-for="item in menuData"
							:key="item.id"
							@click="changeView(item.view, item.id)"
							:class="{
								changeStyle: item.id == currentIndex,
								grey: item.id == 3 || item.id == 4,
								banner: item.id == 3 || item.id == 4
							}"
						>
							{{ item.name }}
						</li>
					</ul>
				</div>
				<!-- <span class="back" @click="goback()"><Icon type="arrow-left-a" :size="10" color="#90d9ff"></Icon>返回</span> -->
				<!-- <el-button class="back" type="primary" @click="goback" size="mini">返回</el-button> -->
				<div class="back" @click="goback">
					<img src="../assets/img/common/back.png" alt="" />
					<span>返回</span>
				</div>
			</div>
			<keep-alive>
				<component :is="currentView" class="component-view"></component>
			</keep-alive>
		</div>
		<!-- <div class="inspection-bottom">
      <statistics></statistics>
		</div>-->
	</div>
</template>
<script>
import monitor from './monitor'
import record from './record'
import taskManage from './taskManage'
import { debuglog } from 'util'
export default {
	name: 'inspection-content',
	components: {
		monitor,
		record,
		taskManage
	},
	props: {},
	data() {
		return {
			currentView: 'monitor',
			currentIndex: 1,
			vcName: '',
			menuData: [
				{
					id: 1,
					name: '巡检监控',
					view: 'monitor'
				},
				{
					id: 2,
					name: '巡检记录',
					view: 'record'
				},
				{
					id: 3,
					name: '状态跟踪',
					view: 'record'
				},
				{
					id: 4,
					name: '故障检查',
					view: 'record'
				},
				{
					id: 5,
					name: '任务管理',
					view: 'taskManage'
				}
			],
			unitId: '',
			filterText: '',
			unitTreeData: [],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	computed: {},
	filters: {},
	watch: {
		vcName: {
			handler(newName, oldName) {
				// console.log(oldName,'old')
				// console.log(newName,'new')
				if (newName == undefined) {
					this.currentView = 'record'
					this.currentIndex = 2
				}
			},
			immediate: true
		},
		filterText(val) {
			this.$refs.elFilterTree.$refs['el-tree'].filter(val)
		}
	},
	created() {
		// console.log(this.$route.params.vcName)
		this.vcName = this.$route.params.vcName

		this.getNuitTreeData()
	},
	mounted() {
		// this.changeView(monitor,1)
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//切换组件
		changeView(data, index) {
			this.currentView = data
			this.currentIndex = index
		},
		//返回
		goback() {
			this.$router.go(-1)
		},
		//获取变电站数数据
		getNuitTreeData() {
			// this.$_api.getNuitTreeData()
			this.$_api.monitorData.getUnitTreeData().then(res => {
				if (res.code == 200) {
					this.unitTreeData = res.data
				}
			})
		},
		//过滤树节点数据
		filterNode(value, data) {
			if (!value) return true
			return data.title.indexOf(value) !== -1
		},
		// 点击树节点
		handleClickNode(data, node, root) {
			console.log(data)
			// 更新当前模块单元id
			this.$store.commit('CHANGE_STATION', {
				stationId: data.id
			})
			// console.log(this.$store.getters.stationId,'vuex')
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
.inspection {
  width: 1920px;
  height: 1080px;
  background: url('~@/assets/img/navigation/background.png') no-repeat 0 -120px;
  background-size: 100% 1080px;
  display: flex;
  justify-content: space-between;
  position: relative;

  .tree-container {
    width: 290px;
    height: 100%;
    margin: 0 10px;
    background: url('../assets/img/common/tree.png') no-repeat;
    background-size: 100% 100%;

    /deep/.el-input{
      width: calc( 100% - 10px );
      margin-left: 5px;
      margin-top: 10px;

	  .el-input__inner{
		  height: 34px;
	  }
	  /deep/ .el-input__prefix {
	  	left: 20px;
	  	top: 7px;
	  }

      input{
        height: 34px;
        background: rgba(0,3,6,0.3);
        border-color: transparent;
      }

    }

  }

  .inspection-content {
    width: 1600px;
	margin-right: 10px;

    .inspection-header {
      height: 56px;
      // width: 1590px;
      position: relative;

      .back {
        //background: url('../assets/img/common/back.png') no-repeat 20px center;
        background-size: 12px 12px;
        position: absolute;
        right: 8px;
        top: 0;
        height: 100%;
        width: 100px;
		color: #fff;
		cursor: pointer;
        background-color: #106fd9;
        font-size: 16px;
        line-height: 56px;
        text-align: center;
		border-radius: 0 8px 8px 0;

		img{
			margin-right: 10px;
		}

		span{
			vertical-align: middle;
		}

      }

      .header-lf {
        float: left;
        width: 200px;
        font: 900 18px / 40px '';
        color: #ffd36a;
        text-align: center;
      }

      .header-rt {
        float: left;
        //margin-left: 45px;
        height: 100%;
        width: 1590px;

        ul {
          height: 100%;
          width: 100%;
          background: url('../assets/img/common/secondary_ menu.png');
          background-size: 100% 100%;
          color: #fff;

          li {
            float: left;
            height: 100%;
            width: 120px;
            font-size: 16px;
            line-height: 56px;
            text-align: center;
            cursor: pointer;
          }
        }
      }

    }
  }

  .inspection-bottom {
    position: absolute;
    bottom: 144px;
    left: 0;
    width: 100%;
  }
}

.changeStyle {
  color: #f6ce69;
  //background: url('~@/assets/img/navigation/menu2.png');
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}

.banner {
  pointer-events: none;
}

.grey {
  //color: red;
  color: rgba(255,255,255,0.5);
}

.component-view {
  margin-top: 10px;
}
</style>
