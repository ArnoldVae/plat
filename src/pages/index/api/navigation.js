import axios from '@/config/api.request'

export default {
	// 获取模块
	getPageModule(params) {
		return axios.request({
			url: 'sys_module/getRoot',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
