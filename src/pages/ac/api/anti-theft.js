import axios from '@/config/api.request'

export default {
	// 获取设备列表
	getDevList(params) {
		return axios.request({
			url: 'dev_info/find',
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
