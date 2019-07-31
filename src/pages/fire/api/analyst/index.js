import axios from '@/config/api.request'

export default {
	// 获取组织结构
	getOrganization(params) {
		return axios.request({
			url: 'org/find_dsa_tree',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
