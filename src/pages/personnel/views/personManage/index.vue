<template>
	<div class="personnel">
		<el-container>
			<el-aside width="200px">
				<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</el-aside>
			<el-main>
				<div class="query-condition">
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-row>
							<el-col :span="8">
								<el-form-item label="姓名">
									<el-input v-model="formInline.user" placeholder="姓名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="用户名">
									<el-input v-model="formInline.user" placeholder="用户名"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="卡号">
									<el-input v-model="formInline.user" placeholder="卡号"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="8">
								<el-form-item label="电话">
									<el-input v-model="formInline.user" placeholder="电话"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="职位">
									<el-select v-model="formInline.region" placeholder="请选择">
										<el-option label="职位一" value="shanghai"></el-option>
										<el-option label="职位二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="类别">
									<el-select v-model="formInline.region" placeholder="请选择">
										<el-option label="类别一" value="shanghai"></el-option>
										<el-option label="类别二" value="beijing"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="8">
								<el-form-item label="发卡时间">
									<el-date-picker
										v-model="formInline.value2"
										align="right"
										type="date"
										placeholder="选择日期"
									>
									</el-date-picker>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item>
									<el-button type="primary" @click="onSubmit">查询</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</div>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column
						v-for="(tab, index) in tableDetail"
						:prop="tab.code"
						:label="tab.title"
						:key="index"
						:width="tab.width"
					>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
	</div>
</template>
<script>
const trees = require('../../filters/treeCode')
console.log(trees)
export default {
	name: 'personnel',
	components: {},
	props: {},
	data() {
		return {
			formInline: {
				user: '',
				value2: '',
				region: ''
			},
			treeData: trees.treeData,
			defaultProps: {
				children: 'children',
				label: 'label'
			},
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			],
			tableDetail: [
				{
					title: '所属组织',
					code: 'address',
					width: '220'
				},
				{
					title: '人员名称',
					code: 'name',
					width: '150'
				},
				{
					title: '性别',
					code: 'name',
					width: '150'
				},
				{
					title: '工号',
					code: 'name',
					width: '150'
				},
				{
					title: '电话',
					code: 'name',
					width: '150'
				},
				{
					title: '职位',
					code: 'name',
					width: '150'
				},
				{
					title: '门禁卡号',
					code: 'name',
					width: '150'
				},
				{
					title: '智能钥匙权限',
					code: 'name',
					width: '150'
				},
				{
					title: '用户名',
					code: 'name',
					width: '150'
				},
				{
					title: '备注',
					width: '250',
					code: 'name'
				}
			]
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {},
	mounted() {},
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		onSubmit() {},
		handleNodeClick(data) {
			console.log(data)
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
.personnel {
	width: 1920px;
	height: 1080px;
	background: url('~@/assets/img/navigation/background.png') no-repeat 0 -120px;
	background-size: 100% 1080px;
}
	.el-tree{
		background none;
		color white
	}

.el-table--enable-row-hover .el-table__body tr:hover>td{
	background:none
}
	.el-aside{
		padding-left 10px;
	}
.el-table{
	color white
	/deep/.has-gutter tr{
		background:none
	}
	background: none
	/deep/.is-leaf{
		background none
	}
	th,tr{
		background: none;

	}
	/deep/.el-table__row{
		background none
	}

}
	.el-main{
		.query-condition{
			padding 16px;


		}
	}
	.el-form{
		color: white
		.el-form-item{
			/deep/.el-form-item__label{
				width 120px
				text-align left
				color white

			}
			/deep/.el-form-item__content{
				.el-input{
                   .el-input__inner{
					   width 240px
				   }
				}
			}
		}
	}
</style>
