import axios from '@/config/api.request'

export default {
	getAcountList(params) {
		return axios.request({
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			url: 'fire/acount/list',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
