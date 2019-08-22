import axios from '@/config/api.request'

export default {
	getAcountList(params) {
		return axios.request({
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			url: 'account/list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	geteqData(params){
		return axios.request({
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	getChildData(params){
		return axios.request({
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			url: 'sub_system/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
