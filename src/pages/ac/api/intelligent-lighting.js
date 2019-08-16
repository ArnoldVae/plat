import axios from '@/config/api.request'

export default {
	// 获取节点列表
	getList(params) {
		return axios.request({
			url: 'dev_info/findNodesInfo',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备列表
	getDevList(params) {
		return axios.request({
			url: 'dev_info/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 开关数量
	getSwitch(params) {
		return axios.request({
			url: 'dev_info/findDevStatusCount',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//获取流媒体服务
	getVideoServe(params) {
		return axios.request({
			url: 'dev_info/getService',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
