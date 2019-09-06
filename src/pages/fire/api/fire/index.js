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
	},

	//新增main
	addMainDate(params) {
		return axios.request({
			headers: { 'Content-Type': 'application/json' },
			url: 'maintenance/list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},

	//修改main
	editMainDate(params) {
		return axios.request({
			headers: { 'Content-Type': 'application/json' },
			url: 'maintenance/list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},

	//删除main
	delMainDate(params) {
		return axios.request({
			headers: { 'Content-Type': 'application/json' },
			url: 'maintenance/list',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
