<template>
	<div class="content">
		<div class="card">
			<div class="item-box">
				<div
					v-for="(item, index) in devTypeList"
					:key="item.devTypeId"
					@click="handleSelectCard(item, index)"
					class="card-item"
                    :class="{ current: currentTypeId == item.devTypeId }"
				>
					<div class="type">
						<div class="name">{{item.devTypeName}}</div>
					</div>
					<div class="info">
						<div class="total">
							<div :style="{ color: '#44e908' }" class="number">{{ item.totalCount }}</div>
							<div class="desc">总</div>
						</div>
						<div class="alarm">
							<div :style="{ color: '#ff291e' }" class="number">0</div>
							<div class="desc">报警</div>
						</div>
					</div>
				</div>
			</div>
		</div>
        <div class="table">
            <viewtable :nodedata="nodeData" :activeDeviceTypeId="selectDevTypeId" :activeUnitId="unitId"></viewtable>  
        </div>
	</div>
</template>

<script>
import viewtable from './view-table'
export default {
    components:{
        viewtable
    },
    props:{
        nodeData:{
            type: Object,
            require:true,
            default(){
                return{
                    nodeId:-1
                }
            }
        }
    },
    created(){
        this.getDeviceTypeList();
    },
    mounted(){
    },
    watch:{
        nodeData(val){
            this.getDeviceTypeList();
        },
        unitId:{
            handler(val){
                this.unitId = val;
                this.getDeviceTypeList();
            }
        }
    },
	data() {
		return {
			devTypeList: [],//设备类型列表
            selectDevTypeId:-1,
            unitId:this.$store.getters.stationId,
            currentTypeId:''
		}
	},
	methods: {
        handleSelectCard(item,index){
            this.currentTypeId = item.devTypeId;
            this.selectDevTypeId = item.devTypeId;
        },
        getDeviceTypeList(){
            if(!this.nodeData.nodeId){
                return;
            }
            this.$_api.pointManageData.getDeviceType(this.nodeData.nodeId,this.unitId)
            .then(res=>{
                // console.log(res)
                if(res.success){
                    this.devTypeList = res.data
                    this.currentTypeId = res.data.length > 0 ? res.data[0].devTypeId:''
                    this.selectDevTypeId = this.currentTypeId
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.content {
  margin-top: 13px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction :column;

  .card {
    border-radius: 5px;
    // flex: 1;

    .item-box {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      transform: translateX(0);

      .card-item {
        min-width: 190px;
        height: 94px;
        background: url('~@ac/assets/img/content/bg.png') no-repeat;
        background-size: 190px 94px;
        margin-right: 10px;
        cursor: pointer;
        position: relative;
        margin-bottom: 10px;

        .type {
          display: flex;
          justify-content: center;
          height:30px;
          margin-top: 9px;

          .icon {
            width: 18px;
            height: 18px;
            /* background: url('~@ac/assets/img/device-type/空调-0.png') no-repeat; */
            background-repeat: no-repeat;
            background-size: 18px 18px !important;
          }

          .name {
            margin-left: 5px;
            color: #fff;
            font-size: 16px;
          }
        }

        &.current {
          background: url('~@ac/assets/img/content/bg-active.png') no-repeat;
          background-size: 190px 94px;

          .type .name {
            color: #ffd36a;
          }

          /* background-size: 250px 94px; */
        }

        .info {
          display: flex;
          justify-content:space-between;
          color: #fff;
          font-family: 'DS-DIGI';
          padding: 0 10px;

          .total {
            width: 80px;

            .number {
              font-size: 22px;
              text-align: center;
            }

            .desc {
              font-size: 16px;
              text-align: center;
            }
          }

          .alarm {
            width: 80px;

            .number {
              font-size: 22px;
              text-align: center;
            }

            .desc {
              font-size: 16px;
              text-align: center;
            }
          }

          .normal {
            width: 33.33%;

            .number {
              font-size: 22px;
              text-align: center;
            }

            .desc {
              font-size: 16px;
              text-align: center;
            }
          }

          .number {
            position: relative;
            top: 7px;
          }

          .desc {
            margin-top: 2px;
          }
        }
      }
    }
  }

  .table{
      flex:1;
  }

  .router-view-wrap {
    position: relative;
    margin-top: 12px;

    .view {
      /* padding-top: 10px; */
      padding-bottom: 50px;
      width: 100%;
      height: 770px;

      &.full {
        height: 874px;
      }
    }

    .style {
      /* width: 100px; */
      /* height: 20px; */
      /* background: #f00; */
      position: absolute;
      bottom: 13px;
      left: 10px;

      .ant-btn {
        background-color: #054166;
        border-color: #000;

        &.current {
          background-color: #0291ed;
          border-color: #013351;
        }
      }
    }
  }
}
</style>