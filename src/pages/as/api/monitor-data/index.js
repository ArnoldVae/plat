import axios from '@/config/api.request'
import axiosNet from '@/config/api.request.net'
import $ajax from 'axios'
import qs from 'qs';
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
			url: 'tree/findOrgTree',
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
	//获取巡检树数据
	getInspectionTreeData(params) {
		return axios.request({
			//url: 'tree/showVbllTree1',
			url: 'tree/showVbllTreeList',
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
	getInspectionTaskTableData(params) {
		return axios.request({
			url: '/astask/findAsTypeNodes',
			method: 'post',
			data: params
		})
	},

	// 获取下一级节点
	getNextNode(params) {
		return axios.request({
			url: 'bll/bll_firstlist',
			method: 'post',
			data: params
		})
	},
	// 获取设备信息
	getDeviceInfo(params) {
		return axios.request({
			url: 'dev_info/get',
			method: 'post',
			data: params
		})
	},

	//获取巡检任务单数据
	getInspectionWorkOrderData(params) {
		// return $ajax({
		// 	//url: 'http://172.26.1.128:8011/as/GetAsTaskNodeByTree',
		// 	url: 'http://22.46.34.114:8011/as/GetAsTaskNodeByNodes',
		// 	method: 'post',
		// 	data: qs.stringify(params)
		// })
		return axiosNet.request({
			url: '/as/GetAsTaskNodeByNodes',
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: qs.stringify(params)
		})
	},
	
	getInspectionWorkOrderDataN(params) {
		return axiosNet.request({
			url: '/as/GetAsTaskNodeByTree',
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: qs.stringify(params)
		})
	},
	
	//获取预置巡检数据
	getPresetInspectionInfo( params ) {
		return axiosNet.request({
			//url: '/as/GetAsTask?i_PatrolType=1&&UnitID=8177a787a28b4f86a103fac9a023db05',
			url: '/as/GetAsTask',
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: qs.stringify(params)
		})
	},

	//获取数组型树数据
	getZtreeData( params ) {
		return axiosNet.request({
			url: `/as/GetBllTreeNodes`,
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data:qs.stringify(params)
		})
	}
	
}
