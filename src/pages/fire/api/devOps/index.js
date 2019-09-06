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
	},
	//获取图纸
	getHtControl(params) {
		return axios.request({
			url: params,
			method: 'get'
		})
	},
	
	//新增Equipment
	addEquipmentDate(params) {
		return axios.request({
			url: params,
			method: 'post'
		})
	},

	//修改Equipment
	editEquipmentDate(params) {
		return axios.request({
			url: params,
			method: 'post'
		})
	},

	//删除Equipment
	delEquipmentDate(params) {
		return axios.request({
			url: params,
			method: 'post'
		})
	},
}
