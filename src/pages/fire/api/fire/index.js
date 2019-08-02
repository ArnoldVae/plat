import axios from '@/config/api.request'

export default {
	getFindPlanRecord() {
		return axios.request({
			// headers:{"Content-type":"application/json; charset=utf-8"},
			url: 'fire/manage/findPlanRecord',
			method: 'post',
			data: {}
		})
	},
	getMaintenance() {
		return axios.request({
			url: 'fire/manage/unitList',
			method: 'get',
		})
	},

	getfindPlanRecord(params) {
		return axios.request({
			headers: {'Content-Type': 'application/json'},
			url: 'fire/manage/findPlanRecord',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
