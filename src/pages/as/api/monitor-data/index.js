import axios from '@/config/api.request'
export default {
	//获取预置巡检列表
	getPresetInspection(params) {
		return axios.request({
			url: 'astask/findAsTask',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取机器人视频tab数据
	getTitleData(params) {
		return axios.request({
			url: 'robot/findRobot',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取流媒体地址serviceInfo数据
	getServiceData(params) {
		return axios.request({
			url: '/as/dev_info/getService',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取对应机器人的视频地址
	getVideoData(params) {
		return axios.request({
			url: 'robot/selectRobotVideo',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//获取变电站数据
	getUnitTreeData(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: params
		})
	},
	//查询巡检区域
	findAsArea(params) {
		return axios.request({
			url: 'asarea/findAsArea',
			method: 'post',
			data: params
		})
	},
	//查询区域任务
	findAsAreaTask(params) {
		return axios.request({
			url: 'astask/get_area_task',
			method: 'post',
			data: params
		})
	},
	//查询巡检任务详情
	getTaskDetail(params) {
		return axios.request({
			url: 'astask/get_task_detail',
			method: 'post',
			data: params
		})
	},

	//获取站端信息
	getStationInfo(params) {
		return axios.request({
			url: 'asstation/stationquota',
			method: 'post',
			data: params
		})
  },
  
  //获取巡检类型
  getInspectionType(params) {
		return axios.request({
			url: 'astask/findAsTypeLists',
			method: 'post',
			data: params
		})
	},

	//获取图元节点
	getMCFind(params) {
		return axios.request({
			url: '/as/htp/find_htp_nodes',
			method: 'post',
			data: params
		})
	},
	//获取图纸
	getMCDrawing(data) {
		return axios.request({
			url: '/as/htp/find_htp_age',
			method: 'post',
			data
		})
	},
	//获取巡检任务单数据
	getInspectionTaskTableData( params ) {
		return axios.request({
			url: '/astask/findAsTypeNodes',
			method: 'post',
			data: params
		})
	}
}
