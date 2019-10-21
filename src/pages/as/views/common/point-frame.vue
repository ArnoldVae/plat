<template>
	<div class="point-frame">
		<el-table
			ref="inspecAticketTable"
			id="ticketTableScroll"
			:data="tableData"
			height="500"
			:span-method="objectSpanMethod"
			border
			:header-cell-style="{
				background: '#1d63b9',
				color: '#fff',
				fontSize: '14px',
				fontWeight: 500,
				height: '50px'
			}"
		>
			<el-table-column prop="area" label="区域" align="center" width="80"></el-table-column>
			<el-table-column prop="interValue" label="间隔" align="center" width="110"></el-table-column>
			<el-table-column prop="dev" label="设备" align="center" width="110"></el-table-column>
			<el-table-column prop="node" label="巡检点位" align="center"></el-table-column>
			<!-- <el-table-column
				v-for="(item, index) in tableFilterHId"
				:key="index"
				:label="inspectionTaskHeaderText(item)"
				align="center"
				width="80"
			>
				<template slot-scope="scope">
					<img src="../../assets/img/common/dui.png" alt style="width: 15px;height: 15px;" />
				</template>
			</el-table-column> -->
		</el-table>
		<div class="pageBox">
			<Page
				:total="totalNum"
				show-elevator
				:current.sync="pageNum"
				:page-size="pageSize"
				@on-change="handleChangePage"
			/>
		</div>
	</div>
</template>
<script>
export default {
	name: 'point-frame',
	props: {
		tableFilterHId: {
			type: Array,
			default: []
		},
		tranTableData: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			headerId: '',
			tableData: [],
			totalNum: 0, //数据所有条数
			pageNum: 1, //当前页
			pageSize: 10 //每页条数
		}
	},
	computed: {},
	filters: {},
	watch: {
		tableFilterHId() {
			this.headerId = this.tableFilterHId[0].id
		},
		tranTableData() {
			this.totalNum = this.tranTableData.length
			this.tableData = this.tranTableData.slice(0, 10)
		}
	},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		closeItem() {
			this.pageNum = 1
			this.tableData = this.tranTableData.slice(0, 10)
		},
		handleChangePage(page, nodeid, alarmlevel) {
			this.pageNum = page

			let brr = this.tranTableData.slice((page - 1) * this.pageSize, (page - 1) * this.pageSize + this.pageSize)
			brr.forEach(item => {
				if (nodeid == item.nodeID) {
					if (alarmlevel == 0) {
						this.$set(item, 'status', '0')
					} else if (alarmlevel > 0) {
						this.$set(item, 'status', '1')
					}
				}
			})
			this.tableData = brr
		},
		inspectionTaskHeaderText(info) {
			let str = ''
			if (info.id) {
				let startTop = info.robotName.substr(0, 2)
				let stopTop = info.robotName.substr(2)
				if (info.robotName.length > 3) {
					return (str = `${startTop} \n ${stopTop} \n (${info.total})`)
				} else {
					return (str = `${info.robotName} \n (${info.total})`)
				}
			}
		},
		//合并单元格的方法
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			//console.log( row )
			if (columnIndex === 0) {
				const _row = this.desData('area', this.tranTableData)[rowIndex]
				const _col = _row > 0 ? 1 : 0
				return {
					rowspan: _row,
					colspan: _col
				}
			}
			if (columnIndex === 1) {
				const _row = this.desData('interValue', this.tranTableData)[rowIndex]
				const _col = _row > 0 ? 1 : 0
				return {
					rowspan: _row,
					colspan: _col
				}
			}
			if (columnIndex == 2) {
				const _row = this.desData('dev', this.tranTableData)[rowIndex]
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
.point-frame {
    border-radius: 10px;
    height: 610px;
    padding-top: 20px;

    /deep/.el-table {
          margin-left: 10px;
          width: calc(100% - 20px);
          border-left-color: #054598;
          border-top-color: #054598;

          /deep/td {
            height: 40px;
            vertical-align: center;
            padding: 0;

            .cell {
              display: flex;
              justify-content: center;
              align-items: center;
			   height: 55px !important;
            }
          }

          /deep/th {
            padding: 0;
          }

          /deep/.el-table__body-wrapper {
            /deep/.cell {
              padding: 0;
              height: 100%;
            }
          }

          /deep/td, /deep/th.is-leaf {
            font-size: 14px;
            color: #fff;
            border-color: #054598;
			//大屏
			border: 1px solid #054598;
          }

          .statePageTab {
            width: 15px;
            height: 15px;
            display: inline-block;
            background: #009dff;
            border-radius: 50%;
            vertical-align: middle;
          }

          .statePageTabErr {
            width: 15px;
            height: 15px;
            display: inline-block;
            background: red;
            border-radius: 50%;
            vertical-align: middle;
          }
        }

        .pageBox {
          width: 100%;
          height: 32px;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          position: absolute;
          left: 0px;
          bottom: 5px;

          /deep/.ivu-page {
            iview-page();

			li{
				border-color: #0f3047;
			}
			input{
				border-color: #0f3047;
			}
			input:hover{
				border-color: #2d8cf0 !important;
			}
			.ivu-page-item-active{
				border-color: #2d8cf0 !important;
			}

          }
        }

}
/deep/.el-table .cell {
    white-space: pre-line;
}
/deep/.ivu-page-item,/deep/.ivu-page-prev,/deep/.ivu-page-next,/deep/.ivu-page-options-elevator input{
    background: none;
    border-color: #dcdee2;
}
</style>
