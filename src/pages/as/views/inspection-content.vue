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
        @node-click="handleClickNode"
      ></el-filter-tree>
    </div>
    <div class="inspection-content">
      <div class="inspection-header">
        <div class="header-rt">
          <ul>
            <li
              v-for="item in menuData"
              :key="item.id"
              @click="changeView(item.view,item.id)"
              :class="{'changeStyle': item.id == currentIndex,'grey': item.id == 3 || item.id == 4 || item.id == 5}"
            >{{item.name}}</li>
          </ul>
        </div>
        <!-- <span class="back" @click="goback()"><Icon type="arrow-left-a" :size="10" color="#90d9ff"></Icon>返回</span> -->
        <el-button class="back" type="primary" @click="goback" size="mini">返回</el-button>
      </div>
      <component :is="currentView" class="component-view"></component>
    </div>
  </div>
</template>
<script>
import monitor from './monitor'
import record from './record'
import { debuglog } from 'util'
export default {
	name: 'inspection-content',
	components: {
		monitor,
		record
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
					view: 'record'
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

  .tree-container {
    width: 310px;
    height: 100%;
  }

  .inspection-content {
    width: 1590px;

    .inspection-header {
      height: 40px;
      width: 1590px;
      position: relative;

      .back {
        background: url('~@/assets/img/common/bg17.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 90px;
        top: 6px;
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
        margin-left: 25px;
        height: 100%;
        width: 1520px;

        ul {
          height: 100%;
          width: 100%;
          background: url('~@/assets/img/navigation/menu-long.png');
          background-size: 100% 100%;
          color: #fff;

          li {
            float: left;
            height: 100%;
            width: 240px;
            font-size: 18px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.changeStyle {
  color: #f6ce69;
  background url("~@/assets/img/navigation/menu2.png")
  background-size: 100% 100%
  -moz-background-size: 100% 100%
}

.grey {
  color: #437085;
}

.component-view {
  margin-top: 10px;
}
</style>
