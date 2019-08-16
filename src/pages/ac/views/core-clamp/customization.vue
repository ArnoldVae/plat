<template>
	<div class="core-clamp-customization">
		<div class="rcu" v-for="(item, index, idx) in rcuList" :key="index">
			<div class="item-title">{{ idx + 1 + '号主变' }}</div>
			<div class="content">
				<ul class="x-wrap">
					<li class="x-item" v-for="(ctem, i) in item" :key="i">
						<div class="title">
							<p>{{ i }}</p>
							<p>相</p>
						</div>
						<div class="clamp">
							<div class="info">
								<div class="history-btn" @click="getHistory(ctem.tx)"></div>
								<img src="~@ac/assets/img/core-clamp/clamp.png" />
								<p>夹件电流</p>
							</div>
							<div class="value">
								<ul>
									<li>值(mA)</li>
									<li>{{ ctem.tx.fvalue }}</li>
								</ul>
							</div>
						</div>
						<div class="electric">
							<div class="info">
								<div class="history-btn" @click="getHistory(ctem.jj)"></div>
								<img src="~@ac/assets/img/core-clamp/electric.png" />
								<p>铁芯电流</p>
							</div>
							<div class="value">
								<ul>
									<li>值(mA)</li>
									<li>{{ ctem.jj.fvalue }}</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- <ac-history-modal v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></ac-history-modal> -->
		<charts v-model="historyModal" :node-id="nodeId" :sub-title="chartTitle" :unit="unit"></charts>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import moment from 'moment'
import charts from '../main-oil/charts1'
export default {
	name: 'core-clamp-customization',
	components: { charts },
	props: {},
	data() {
		return {
			rcuList: [],
			historyModal: false,
			chartTitle: '',
			unit: '',
			nodeId: ''
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
		this.getCoreClampData()
	},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 铁芯夹件数据
		async getCoreClampData() {
			let { data } = await this.$_api.getStaticData('./simulation-data/core-clamp.json')
			if (data.ret == 0) {
				this.rcuList.push(data.data1)
				this.rcuList.push(data.data2)
				this.rcuList.push(data.data3)
			}
			let arr = {
				S1: {
					A: [],
					B: [],
					C: []
				},
				S2: {
					A: [],
					B: [],
					C: []
				},
				S3: {
					A: [],
					B: [],
					C: []
				}
			}
			this.rcuList.forEach((item, index) => {
				item.forEach((stem, i) => {
					if (parseInt(stem.iParam2 % 10) == 1) {
						if (stem.iParam1 == 1) {
							arr[`S${index + 1}`]['A']['tx'] = stem
							arr[`S${index + 1}`]['A']['tx'].equName = `${index + 1}号主变A相`
							arr[`S${index + 1}`]['A']['tx'].nodeName = '铁芯电流'
						} else if (stem.iParam1 == 0) {
							arr[`S${index + 1}`]['A']['jj'] = stem
							arr[`S${index + 1}`]['A']['jj'].equName = `${index + 1}号主变A相`
							arr[`S${index + 1}`]['A']['jj'].nodeName = '夹件电流'
						}
					} else if (parseInt(stem.iParam2 % 10) == 2) {
						if (stem.iParam1 == 1) {
							arr[`S${index + 1}`]['B']['tx'] = stem
							arr[`S${index + 1}`]['B']['tx'].equName = `${index + 1}号主变B相`
							arr[`S${index + 1}`]['B']['tx'].nodeName = '铁芯电流'
						} else if (stem.iParam1 == 0) {
							arr[`S${index + 1}`]['B']['jj'] = stem
							arr[`S${index + 1}`]['B']['jj'].equName = `${index + 1}号主变B相`
							arr[`S${index + 1}`]['B']['jj'].nodeName = '夹件电流'
						}
					} else if (parseInt(stem.iParam2 % 10) == 3) {
						if (stem.iParam1 == 1) {
							arr[`S${index + 1}`]['C']['tx'] = stem
							arr[`S${index + 1}`]['C']['tx'].equName = `${index + 1}号主变C相`
							arr[`S${index + 1}`]['C']['tx'].nodeName = '铁芯电流'
						} else if (stem.iParam1 == 0) {
							arr[`S${index + 1}`]['C']['jj'] = stem
							arr[`S${index + 1}`]['C']['jj'].equName = `${index + 1}号主变C相`
							arr[`S${index + 1}`]['C']['jj'].nodeName = '夹件电流'
						}
					}
				})
			})
			this.rcuList = arr
			console.log(this.rcuList)
		},
		// 历史数据
		getHistory(info) {
			this.nodeId = info.eNodeId
			this.chartTitle = info.equName + ' - ' + info.nodeName
			this.unit = info.vcUnit
			this.historyModal = true
			// console.log(info)
			// console.log(this)
			// console.log(findComponentUpward(this.$children, 'view-table'))
			// return
			// this.historyModal = true
			// this.chartUnit = info.vcUnit
			// this.chartTitle = info.nodeName + '历史数据'
			// let params = {
			// 	startTime: moment()
			// 		.subtract(24, 'hours')
			// 		.unix(),
			// 	endTime: moment().unix(),
			// 	eNodeId: info.eNodeId
			// }
			// this.currentHistoryParams = params
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
.core-clamp-customization {
  width: calc(100% - 20px);
  height: 100%;
  background: url('~@/assets/img/common/bg-border.png') no-repeat;
  background-size: 100% 100%;
  padding: 25px 30px 25px 40px;

  .rcu {
    float: left;
    width: 33%;
    height: 100%;
    border: 1px solid #0173bb;
    margin-right: 5px;

    .item-title {
      width: 100%;
      height: 30px;
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      text-align: center;
      background-color: rgba(36, 64, 88, 1);
      border: 1px solid #26636c;
      margin-bottom: 5px;
    }

    // margin: 0 5px;
    .content {
      // padding: 0 10px;
      .x-wrap {
        list-style: none;

        .x-item {
          margin-bottom: 10px;
          overflow: hidden;
          margin-left: 10px;

          > div {
            float: left;
          }

          .title {
            width: 50px;
            height: 190px;
            background-color: rgba(36, 64, 88, 0.7);
            color: #fff;
            border: 1px solid #26636c;
            box-sizing: border-box;

            p {
              text-align: center;
              font-size: 20px;
            }

            p:nth-of-type(1) {
              margin-top: 78px;
            }
          }

          .clamp {
            width: calc(50% - 30px);
            height: 190px;
            box-sizing: border-box;
            background-color: rgba(36, 64, 88, 0.48);

            .info {
              position: relative;
              width: 100%;
              height: 130px;
              border-top: 1px solid #26636c;
              border-right: 1px solid #26636c;
              border-bottom: 1px solid #26636c;
              text-align: center;

              .history-btn {
                width: 30px;
                height: 30px;
                background: #fa0;
                background: url('~@ac/assets/img/core-clamp/history.png') no-repeat;
                background-size: 30px 30px;
                border-radius: 50%;
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
              }

              img {
                width: 70px;
                height: 70px;
                margin-top: 15px;
              }

              p {
                margin-top: 2px;
                font-size: 22px;
                color: #fff;
              }
            }

            .value {
              width: 100%;
              height: 60px;
              border-right: 1px solid #26636c;
              border-bottom: 1px solid #26636c;

              // background: #1b2938;
              ul {
                list-style: none;
                overflow: hidden;

                li {
                  width: 81px;
                  height: 37px;
                  float: left;
                  margin: 10px 13px;
                  border-radius: 5px;
                }

                li:nth-of-type(1) {
                  margin: 10px 13px;
                  font-size: 24px;
                  color: #fff;
                  text-align: center;
                  line-height: 37px;
                }

                li:nth-of-type(2) {
                  width: 90px;
                  height: 42px;
                  margin: 10px 1px;
                  background: #0f0d0e;
                  font-family: DS-DIGI;
                  font-size: 40px;
                  line-height: 42px;
                  color: #49ff01;
                  text-align: center;
                }
              }
            }
          }

          .electric {
            width: calc(50% - 30px);
            height: 190px;
            box-sizing: border-box;
            background-color: rgba(36, 64, 88, 0.48);

            .info {
              position: relative;
              width: 100%;
              height: 130px;
              border-top: 1px solid #26636c;
              border-right: 1px solid #26636c;
              border-bottom: 1px solid #26636c;
              text-align: center;

              .history-btn {
                width: 30px;
                height: 30px;
                background: #fa0;
                background: url('~@ac/assets/img/core-clamp/history.png') no-repeat;
                background-size: 30px 30px;
                border-radius: 50%;
                position: absolute;
                right: 5px;
                top: 5px;
                cursor: pointer;
              }

              img {
                width: 70px;
                height: 70px;
                margin-top: 15px;
              }

              p {
                margin-top: 2px;
                font-size: 22px;
                color: #fff;
              }
            }

            .value {
              width: 100%;
              height: 60px;
              border-right: 1px solid #26636c;
              border-bottom: 1px solid #26636c;

              ul {
                list-style: none;
                overflow: hidden;

                li {
                  width: 81px;
                  height: 37px;
                  float: left;
                  margin: 15px 13px;
                  border-radius: 5px;
                }

                li:nth-of-type(1) {
                  margin: 10px 13px;
                  font-size: 24px;
                  color: #fff;
                  text-align: center;
                  line-height: 37px;
                }

                li:nth-of-type(2) {
                  width: 90px;
                  height: 42px;
                  margin: 10px 1px;
                  background: #0f0d0e;
                  font-family: 'DS-DIGI';
                  font-size: 40px;
                  line-height: 42px;
                  color: #49ff01;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
