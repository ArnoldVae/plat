import axios from '@/config/api.request'

export default {
	// 获取组织结构
	getOrganization(params) {
		return axios.request({
			url: 'org/find_dsa_tree',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 报警联动列表查询
	getAlarmList(params) {
		return axios.request({
			url: 'fire/alarm/find_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 报警联动列表详情查询
	getAlarmData(params) {
		return axios.request({
			url: 'fire/alarm/find_data',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//站内天气
	getAreaData(params) {
		return axios.request({
			url: 'fire/area/find_dev_node',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//报警视频
	getVideoData(params) {
		return axios.request({
			url: 'fire/area/find_protectarea_dev_video',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//echars图
	getEchartData(params) {
		return axios.request({
			url: 'dev_info/findDevHistoryData',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备流程图
	getHtMap(params) {
		return axios.request({
			url: 'fire/find/svgorht',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//	获取预案信息
	getReserve(params) {
		return axios.request({
			url: 'fire/alarm/reserve',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
