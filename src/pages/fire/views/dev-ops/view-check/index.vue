<template>
  <div class="view-check">
    <el-container>
      <el-aside width="72%">
        <component 
        v-bind:is="htCommon" 
        ref="htCommon" 
        :htUrl='hturl'
        v-if="htShowCom"></component>
      </el-aside>

      <el-main>
        <div class="view-check-items">
          <el-row>
            <el-col :span="10" class="menu-bar">视图列表:</el-col>
          </el-row>
          <div class="search-item">
            <el-row
              v-for="(item, index) in subMenuList"
              :key="index"
              :class="activeIndex==index? 'activeClick':''"
			  
            >
             <div  @click="showHtMap(item,index)">
				  <el-col :span="16" >
                <span>
                  <span class="color-green">●</span>
                  {{ item.vcName }}
                </span>
              </el-col>
              <el-col :span="8" class="item-btn">
                <el-button size="mini" @click="showHtMap(item,index)">查看</el-button>
              </el-col>
			 </div>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import htCommon from '../../common/ht-common2'

export default {
	name: 'view-check',
	components: {
		htCommon
	},
	props: {},
	data() {
		return {
      htShowCom:true,
			current: 'fireControl-customization',
			resultData: {
				dev: {},
				data: []
			},
			getId: '',
			htCommon: 'htCommon',
			subMenuList: [],
			activeIndex: 0, //控制查看按钮的激活样式
			hturl:''
		}
	},
	filters: {},
	computed: {
		activeUnitId() {
			return this.$store.getters.unitId
		}
	},
	watch: {
		activeUnitId: {
			handler(val) {
				this.getId = val
				this.getCharts()
			}
		}
	},
	created() {},
	mounted() {
		this.getCharts()
		// this.init()
		// this.getNode()
	},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		//获取视图列表
		async getCharts() {
			this.getId = this.$store.getters.unitId 
			let result = await this.$_api.statusCheck.getSubCharts({
				unitId: this.getId,
        subIdsStr: '1007',
        iType:'10090003'
			})
			if (result.success) {
        this.subMenuList=[]
				if(result.data.length==0){
            this.htShowCom=false
        }else{
           
            this.htShowCom=true
          this.subMenuList = result.data
				  this.showHtMap(this.subMenuList[0],0)
        }
			}
		},
		showHtMap(val,idx) {
			this.activeIndex=idx
			this.hturl=val.vcUrl
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
// 定义主视图高度
$view-height = 898px;

.view-check {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 670px;

  .el-container {
    display: flex;
    justify-content: space-between;

    .el-aside {
      // height: $view-height;
    }

    .el-main {
      overflow: hidden;
      padding:0.8888rem 0.8888rem 0 0.88888rem;
      .menu-bar {
        font-size: 18px;
        height: 2.2228rem;
        line-height: 2.2228rem;
        width: 100%;
        background: url('../../../assets/img/common/second.png') no-repeat;
        background-repeat: no-repeat;
        text-align: left;
        color: #fff;
        padding-left: 24px;
      }

      .view-check-items {
        width: 95%;
        height: 780px;
        border-radius: 5px;
        // background: #141A26;
        border: 1px solid #195891;

        .el-row {
          color: white;
          height: 40px;
          line-height: 40px;
          font-size: 17px;

          .tool-text {
            font-size: 15px;
            text-align: right;

            .color-red {
              color: red;
            }

            .color-green {
              color: #32e611;
            }
          }
        }

        .search-item {
          padding: 0 10px 0 30px;
          margin-top: 15px;
          cursor: pointer;

          .el-row:hover {
            box-shadow: inset 0 0 20px #0E70AF;
            background-color: #063783;
            height: 40px;
            width: 100%;
          }

          .el-row {
            .el-col {
              font-size: 15px;

              .color-green {
                color: #19be6b;
              }
            }

            .item-btn {
              text-align: right;
              padding-right: 10%;

              .el-button {
                background: none;
                border: 0.04444rem solid #00aaff;
                color: #37a8ff;
              }

              
            }
          }
		  .activeClick {
                background-color: #063783;

                .el-button {
                  color: #ffd36a !important;
                }
              }
        }
      }
    }
  }
}
</style>
