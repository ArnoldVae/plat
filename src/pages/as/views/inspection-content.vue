<template>
  <div class="inspection-content">
    <div class="inspection-header">
      <!-- <div class="header-lf">{{vcName}}</div> -->
      <div class="header-rt">
        <ul>
          <li 
            v-for="item in menuData" 
            :key="item.id"
            @click="changeView(item.view,item.id)"
            :class="{'changeStyle': item.id == currentIndex}"
          >{{item.name}}</li>
        </ul>
      </div>
      <!-- <span class="back" @click="goback()"><Icon type="arrow-left-a" :size="10" color="#90d9ff"></Icon>返回</span> -->
      <el-button class="back" type="primary" @click="goback">返回</el-button>
    </div>
    <component :is="currentView" class="component-view"></component>
  </div>
</template>
<script>
import monitor from './monitor'
import record from './record'
import { debuglog } from 'util';
export default {
  name: 'inspection-content',
  components: {
    monitor,record
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
      ]
    }
  },
  computed: {},
  filters: {},
  watch: {
    vcName: {
      handler(newName,oldName){
        // console.log(oldName,'old')
        // console.log(newName,'new')
        if(newName == undefined){
          this.currentView = 'record'
          this.currentIndex = 2
        }
      },
      immediate: true
    }
  },
  created() { 
    // console.log(this.$route.params.vcName)
    this.vcName = this.$route.params.vcName
  },
  mounted() {
    // this.changeView(monitor,1)
   },
  activited() { },
  update() { },
  beforeDestory() { },
  methods: {
    //切换组件
    changeView(data,index){
      this.currentView = data
      this.currentIndex = index
    },
    //返回
    goback(){
      this.$router.go(-1)
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
.inspection-content {
  width: 1920px;
  height: 1080px;
  background: url('~@/assets/img/navigation/background.png') no-repeat 0 -120px;
  background-size: 100% 1080px;

  .inspection-header {
    height: 40px;
    width: 100%;
    .back{
      // display inline-block;
      // height: 40px;
      // width: 40px;
      // text-align: center;
      // line-height: 40px;
      // cursor: pointer;
      // color: #90d9ff;
      // margin-left: 10px;
      // font-size: 16px;
       background: url('~@/assets/img/common/bg17.png') no-repeat;
      background-size: 100% 100%;
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
      margin-left: 135px;
      height: 100%;
      width: 76%;
    }
  }
}

.header-rt ul {
  height: 100%;
  width: 100%;
  background: url('../../fire/assets/img/headerHull.png')
  background-size:100% 100%
  color: #fff;
}

.header-rt ul li {
  float: left;
  height: 100%;
  width: 150px;
  font: 100 16px / 40px '';
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
}
.changeStyle{
  color: #f6ce69;
}
.component-view{
  margin-top: 10px;
}
</style>
