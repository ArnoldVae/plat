// import axios from '@/config/api.request_inspectionIndex'
import axios from '@/config/api.request'

export default {
	// 获取所有变电站
	getRcu(params) {
		return axios.request({
			url: 'fire/main/findStation',
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
			url: 'fire/main/findMOrginfoList',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
