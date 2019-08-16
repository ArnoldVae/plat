import axios from '@/config/api.request'

export default {
	// 获取首页综合数据
	getOverviewInfo(params) {
		return axios.request({
			url: 'dev_info/indexInfo',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取组织结构
	getOrganization(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 根据变电站 获取子系统
	getSubsystemByUnitId(params) {
		return axios.request({
			url: 'sub_system/findByUnitId',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 根据子系统 获取设备类型
	getDeviceTypeBySubsystemId(params) {
		return axios.request({
			url: 'sub_system/dev_type/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取所有节点信息
	getNodesInfo(params) {
		return axios.request({
			url: 'dev_info/findNodesInfo',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取所有设备信息
	getDeviceInfo(params) {
		return axios.request({
			url: 'dev_info/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备节点历史数据
	getHistoryByNodeId(params) {
		return axios.request({
			url: 'dev_info/findDevHistoryData',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
