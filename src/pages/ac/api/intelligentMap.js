// import axios from '@/config/api.request_inspectionIndex'
import axios from '@/config/api.request'

export default {
	// 获取所有变电站
	// 	getRcu(params) {
	// 		return axios.request({
	// 			url: 'record/findStation',
	// 			method: 'post',
	// 			data: JSON.stringify(params)
	// 		})
	//   },
	//条件查询变电站
	getRcu(params) {
		return axios.request({
			url: 'station/station_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取电压等级按钮
	// getLevel(params) {
	// 	return axios.request({
	// 		url: 'record/findUnitinfoList',
	// 		method: 'post',
	// 		data: JSON.stringify(params)
	// 	})
	// },
	// 获取运维班
	getOrg(params) {
		return axios.request({
			url: 'record/findMOrginfoList',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//获取变电站
	getAllStation(param) {
		return axios.request({
			// url: 'station/station_list',
			url: 'dstation/find',
			method: 'post',
			data: JSON.stringify(param)
		})
	},
	// 获取组织树
	getOrg(params) {
		return axios.request({
			url: 'org/find_org_tree',
			method: 'post',
			data: params
		})
	},
}