import axios from '@/config/api.request'

export default {
	getFindPlanRecord() {
		return axios.request({
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			url: 'fire/manage/findPlanRecord',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	getFindPlanDetail(params) {
		return axios.request({
			headers: { 'Content-Type': 'application/json' },
			url: 'maintenance/detail',
			method: 'post',
			data: JSON.stringify(params)
		})
	},

	getMaintenance() {
		return axios.request({
			headers: { 'Content-Type': 'application/json' },
			url: 'maintenance/co/list',
			method: 'post'
		})
	},

	getfindPlanRecord(params) {
		return axios.request({
			headers: { 'Content-Type': 'application/json' },
			url: 'maintenance/list',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
