import axios from '@/config/api.request'

export default {
	getHtFind(params) {
		return axios.request({
			url: 'htp/find_htp_nodes',
			method: 'post',
			data: params
		})
	}
}
