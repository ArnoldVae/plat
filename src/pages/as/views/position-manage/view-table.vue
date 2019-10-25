<template>
	<div class="view-table" v-if="showTable">
		<div class="table-wrap">
			<!-- 表格 -->
			<el-table
				:span-method="objectSpanMethod"
				highlight-current-row
				:data="tableData"
				height="100%"
				v-loading="loading"
				border
			>
				<el-table-column label="设备" align="center" prop="devName">
					<!-- <template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.devName }}</span>
					</template>-->
				</el-table-column>
				<el-table-column label="节点" align="center" prop="nodeName">
					<!-- <template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.nodeName }}</span>
					</template>-->
				</el-table-column>
				<el-table-column label="报警等级" align="center" prop="nodeAlarmLevel">
					<!-- <template slot-scope="scope">
						<template v-for="item in alarmLevelList">
							<span
								:key="item.value"
								v-if="item.value == scope.row.nodeAlarmLevel"
								style="margin-left: 10px"
							>{{ item.label }}</span>
						</template>
					</template>-->
				</el-table-column>
				<el-table-column label="状态/值" align="center" prop="strValue">
					<!-- <template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.strValue }}</span>
					</template>-->
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" @click="handleViewHistory(scope.row)">历史数据</el-button>
						<el-button
							size="mini"
							v-if="scope.row.normalVideoId != null"
							@click="handleViewVideo(scope.row)"
							>查看视频</el-button
						>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页 -->
			<!-- <div class="page-wrap">
				<Page
					@on-change="handleChangePage"
					@on-page-size-change="handleChangeSize"
					:total="total"
					:current="currentPage"
					:page-size="pageSize"
					show-sizer
					show-elevator
					show-total
					ref='page'
				/>
			</div>-->
		</div>

		<ocx-modal title="查看历史记录" width="1200" v-model="historyModal" footer-hide draggable>
			<historycontent :nodeInfo="nodeInfo"></historycontent>
		</ocx-modal>
		<ocx-modal title="查看视频" width="1000" v-model="videoModal" draggable>
			<div style="height:500px">
				<ocxvideo v-if="videoModal" :videoConfig="videoConfig"></ocxvideo>
			</div>
		</ocx-modal>
	</div>
</template>
<script>
import { findComponentUpward } from '@/libs/assist'
import { getDataType } from '@/libs/assist'
import moment from 'moment'
import historycontent from '../common/history-notes'
import ocxvideo from '@/components/native/video/OcxVideo'
export default {
	name: 'view-table',
	components: {
		historycontent,
		ocxvideo
	},
	props: {
		activeDeviceTypeId: {
			type: Number
		},
		activeUnitId: {
			type: String
		},
		nodedata: {
			type: Object
		}
	},
	data() {
		return {
			tableData: [],
			total: 0,
			currentPage: 1,
			pageSize: 20,
			alarmLevelList: [],
			// nodeId: '',
			confirmModalShow: false,
			// 当前的命令值
			controlValue: null,
			// 当前行信息
			currentRowInfo: null,
			// 合并单元格参数
			statistics: null,
			spanArr: [],
			position: 0,
			guidList: ['11', '22', '33'],

			tableReset: true,
			loading: false,
			unitId: this.$store.getters.stationId,
			nodeInfo: {},
			showTable: false,
			historyModal: false,
			videoModal: false,
			videoConfig: {
				deviceInfo: '',
				isAutoPlay: true,
				serviceInfo: '1$22.46.34.114$6801$admin$admin',
				hideTool: true,
				presetVal: -1
			}
		}
	},
	computed: {},
	watch: {
		activeDeviceTypeId: {
			handler(val) {
				console.log(val)
				this.getDeviceInfo()
			},
			immediate: true
		},
		activeUnitId: {
			handler(val) {
				// this.currentPage = 1
				this.getDeviceInfo()
			}
		},
		nodedata: {
			handler(val) {
				this.getDeviceInfo()
			},
			deep: true
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		// 合并单元格
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				const _row = this.desData('devName', this.tableData)[rowIndex]
				const _col = _row > 0 ? 1 : 0
				return {
					rowspan: _row,
					colspan: _col
				}
			}
		},
		// 核心处理 数据方法
		desData(key, data) {
			let contactDot = 0
			let spanArr = []
			data.forEach((item, index) => {
				item.index = index
				if (index === 0) {
					spanArr.push(1)
				} else {
					if (item[key] === data[index - 1][key]) {
						spanArr[contactDot] += 1
						spanArr.push(0)
					} else {
						spanArr.push(1)
						contactDot = index
					}
				}
			})
			return spanArr
		},
		async handleViewHistory(row) {
			this.nodeInfo = {
				nodeData: row.nodeId,
				nodeNameData: row.nodeName
			}
			this.historyModal = true
		},
		handleViewVideo(row) {
			console.log(row.videoPresetId)
			this.videoConfig.deviceInfo = row.normalVideoId
			this.videoConfig.presetVal = row.videoPresetId
			this.videoModal = true
		},
		// 获取报警等级枚举
		async getDeviceTypeMap() {
			let { data } = await this.$_api.getStaticData()
			this.alarmLevelList = data.alarmLevel
		},
		// 获取设备信息
		async getDeviceInfo() {
			if (this.nodedata.nodeId === -1 || this.activeDeviceTypeId === -1) {
				return
			}
			this.loading = true
			try {
				this.$_api.pointManageData
					.getDeviceInfo({
						unitId: this.activeUnitId,
						treeId: this.nodedata.nodeId,
						devTypeId: this.activeDeviceTypeId
					})
					.then(res => {
						if (res.success) {
							this.showTable = true
							this.tableData = res.data
							this.loading = false
						}
					})
			} catch (e) {
				this.$ocxMessage.error(`${e}`)
				this.loading = false
			}
		},
		rowFn() {
			this.tableData.forEach((item, index) => {
				if (index === 0) {
					this.spanArr.push(1)
					this.position = 0
				} else {
					if (item.devId === this.tableData[index - 1].devId) {
						this.spanArr[this.position] += 1
						this.spanArr.push(0)
					} else {
						this.spanArr.push(1)
						this.position = index
					}
				}
			})
		},
		spanA() {
			let arr = []
			this.tableData.map(item => {
				item.devName && arr.push(item.devId)
			})

			this.statistics = {}
			for (var i = 0; i < arr.length; i++) {
				var cname = arr[i]
				if (this.statistics[cname]) {
					this.statistics[cname]++
				} else {
					this.statistics[cname] = 1
				}
			}
			// console.log(this.statistics)
		},
		// 分页跳转
		handleChangePage(page) {
			this.currentPage = page
			// this.getDeviceInfo()
		},
		// 改变分页大小
		handleChangeSize(size) {
			this.pageSize = size
			// this.getDeviceInfo()
		},
		handleCurrentChange(row) {
			console.log(row)
			// this.nodeId = row.nodeId
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
@import '~@/assets/style/component/index.styl';

.view-table {
  height: 100%;
  overflow: auto;
  padding-right: 20px;

  /deep/ .el-loading-mask {
    background-color: #0a255dcc;
  }

  /deep/ .table-wrap {
    height: 100%;

    /deep/ .el-table {
      width: 100%;
      height: calc(100% - 45px) !important;
      background: transparent;
      color: #fff;
      view-table('~@ac/assets/img/view-table/header.png');

      .control-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      .el-button+.el-button {
        margin-left: initial;
        margin: 2.5px;
      }

      .el-button {
        margin: 2.5px;
        background: transparent;
        border-color: #2d8cf0;
        color: #2d8cf0;
        position: relative;

        &:hover {
          background: #2d8cf06b;
          color: #fa0;
        }

        &:active {
          top: 1px;
          left: 1px;
        }
      }
    }

    .page-wrap {
      margin-top: 10px;
      display: flex;
      justify-content: center;

      .ivu-page {
        iview-page();
      }
    }
  }

  /deep/ .ivu-modal {
    width: 400px !important;
  }
}

.historyModal {
  /deep/ .ivu-modal-wrap {
    .ivu-modal {
      width: 53.333rem !important;

      .ivu-modal-content {
        background: url('~@/assets/img/common/modal-bg.png') no-repeat;
        background-size: 100% 100%;

        /deep/.ivu-modal-header {
          padding: 7px 0 7px 25px !important;
          background: #17579a;
          border-radius: 10px 10px 0 0;
          border: 0;

          /deep/.ivu-modal-header-inner {
            font-size: 16px !important;
            height: 35px;
            line-height: 35px;
            color: #e9edf3 !important;
          }

          .ivu-modal-close {
            i {
              font-size: 40px;
              color: #fff;
            }
          }
        }

        // .ivu-modal-header {
        // border-color: rgba(36, 108, 169, 0.48);
        // text-align: center;

        // .ivu-modal-header-inner {
        // color: #0af;
        // font-size: 20px;
        // }

        // .ivu-modal-close {
        // i {
        // font-size: 40px;
        // color: #fff;
        // }
        // }
        // }
        .ivu-modal-body {
          color: #b0e1f9;
          background: #082051;

          .history-body {
            .ivu-form .ivu-form-item-label {
              font-size: 16px;
              color: #99e5ff;
              display: flex;
              justify-content: center;
            }

            .chart {
              width: 100%;
              height: 600px;
            }

            .ivu-input-wrapper {
              width: 190px;

              .ivu-input {
                background: #162e4d;
                color: #44adf7;
                border: 0.01rem solid #015e9a !important;
              }
            }

            .ivu-picker-panel-body {
              color: #888;

              .ivu-date-picker-cells-cell-range:before {
                background: #143e6f7a;
              }
            }

            .ivu-select-dropdown {
              background: #162e4d;
            }

            .ivu-btn-text {
              color: #99e5ff;
            }

            .ivu-select-selection {
              border: 0.01rem solid #015e9a;
            }

            .ivu-select-selection {
              background: #162e4d;
            }

            .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
              color: #44adf7;
            }

            .ivu-select-item-focus {
              background: #125c92;
              color: #44adf7 !important;
            }

            .ivu-select-dropdown-list li {
              &:hover {
                background: #125c92;
                color: #2d8cf0;
              }
            }

            .ivu-select-item {
              color: #8bd3ec;
            }

            .ivu-btn.ivu-btn-text.ivu-btn-large {
              &:hover {
                background-color: #162f63;
              }
            }

            .ivu-btn-primary {
              background-color: #093c71;
              border-color: #093c71;
            }

            .ivu-btn.ivu-btn-primary.ivu-btn-large {
              &:hover {
                background-color: #194c82;
                border-color: #194c82;
              }
            }
          }
        }

        .ivu-modal-footer {
          border-color: rgba(36, 108, 169, 0.48);
          display: none;

          .ivu-btn-text {
            color: #8895ad;

            &:hover {
              color: #57a3f3;
              background-color: #183e6f;
              border-color: transparent;
            }
          }

          .ivu-btn-primary {
            background-color: transparent;
            color: #73a6c3;
            border-color: #0f3047;

            &:hover {
              color: #47b2fe;
              // background-color: #47b2fe ;
              border-color: #2d8cf0;
            }
          }
        }
      }
    }
  }
}

/deep/.ivu-modal-header {
  padding: 7px 0 7px 25px !important;
  background: #17579a;
  border-radius: 10px 10px 0 0;
  border: 0;

  /deep/.ivu-modal-header-inner {
    font-size: 16px !important;
    height: 35px;
    line-height: 35px;
    color: #e9edf3 !important;
  }

  .ivu-modal-close {
    i {
      font-size: 40px;
      color: #fff;
    }
  }
}
</style>
