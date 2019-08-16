import axios from '@/config/api.request'

export default {
	// 获取所有变电站
	getRcu(params) {
		return axios.request({
			url: 'record/findStation',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取电压等级按钮
	getLevel(params) {
		return axios.request({
			url: 'record/findUnitinfoList',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取所有运维班
	getOrg(params) {
		return axios.request({
			url: 'record/findMOrginfoList',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//获取消防模块接口下面的所有变电站
	getAllStation(param) {
		return axios.request({
			url: 'fire/main/findStation',
			method: 'post',
			data: JSON.stringify(param)
		})
	}
}
