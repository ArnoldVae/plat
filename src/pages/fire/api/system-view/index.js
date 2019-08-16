import axios from '@/config/api.request'

export default {
	//获取系统参数（饼形图）
	getFireItem(params) {
		return axios.request({
			url: 'fire/main/find_subsystem_num',
			method: 'post',
			data: params
		})
	},
	//获取系统参数（条目）
	getSubFireItem(params) {
		return axios.request({
			url: 'fire/main/find_subsystem_list',
			method: 'post',
			data: params
		})
	},
	//获取光字牌（条目）
	getLightItem(params) {
		return axios.request({
			url: 'fire/sub/find_dev_list',
			method: 'post',
			data: params
		})
	},
	//获取消防模块接口下面的所有变电站
	getAllStation(param) {
		return axios.request({
			url: 'fire/main/findStation',
			method: 'post',
			data: JSON.stringify(param)
		})
	},
	getJR(param) {
		return axios.request({
			url: 'fire/main/find_unit_num',
			method: 'post',
			data: JSON.stringify(param)
		})
	}
}
