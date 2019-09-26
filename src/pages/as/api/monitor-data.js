import axios from '@/config/api.request'
import axiosNet from '@/config/api.request.net'
import $ajax from 'axios'
import qs from 'qs';
export default {
	//获取变电站数据
		getUnitTreeData(params) {
			return axios.request({
				url: 'tree/findOrgTree',
				method: 'post',
				data: params
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
	// 获取对应机器人的视频地址
	getVideoData(params) {
		return axios.request({
			url: 'robot/selectRobotVideo',
			method: 'post',
			data: JSON.stringify(params)
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

	//获取巡检任务单数据(net)
	getInspectionWorkOrderData(params) {
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
	//获取巡检任务单数据(java)
	CheckingIntoAticket( params ) {
		return axios.request({
			url: 'robot/findTicketByTaskIdOrNodeIds',
			method: 'post',
			data: params
		})
	},
	
	
	//获取预置巡检数据(net)
	getPresetInspectionInfo( params ) {
		return axiosNet.request({
			url: '/as/GetAsTask',
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: qs.stringify(params)
		})
	},
	//获取预置巡检数据(java)
	getPresetInspectionData( params ) {
		return axios.request({
			url: 'astask/getAsTaskpost',
			method: 'post',
			data: params
		})
	},

	//获取数组型树数据(net)
	getZtreeData( params ) {
		return axiosNet.request({
			url: `/as/GetBllTreeNodes`,
			method: 'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data:qs.stringify(params)
		})
	},
	
	//获取数组型树数据(java)
	getAddTaskTreeData( params ) {
		return axios.request({
			url: 'tree/showVbllTreeList',
			method: 'post',
			data: params
		})
	}
	
}
