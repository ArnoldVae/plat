import axios from '@/config/api.request'

export default {
	//获取光字牌（条目）
	getLightItem(params) {
		return axios.request({
			url: 'fire/sub/find_dev_list',
			method: 'post',
			data: params
		})
	},
	//获取子菜单（条目）
	getSubMenu(params) {
		return axios.request({
			url: 'fire/menu/find_subsys_unint',
			method: 'post',
			data: params
		})
	},
	//获取防护区子菜单（条目）
	getAreaMenu(params) {
		return axios.request({
			url: 'fire/area/find_protectarea_dev',
			method: 'post',
			data: params
		})
	},
	getSubCharts(params) {
		return axios.request({
			url: 'htp/find_htp_age',
			method: 'post',
			data: params
		})
	},
	getHtFind(params) {
		return axios.request({
			url: 'htp/find_htp_nodes',
			method: 'post',
			data: params
		})
	},
	// 获取组织结构
	getOrganization(params) {
		return axios.request({
			url: 'org/find_dsa_tree',
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
	//	获取设备温度
	getTemDetail(params) {
		return axios.request({
			url: 'fire/area/find_dev_node',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//	获取温度折现图
	getTemCharts(params) {
		return axios.request({
			url: 'dev_info/findDevHistoryData',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	getAreaVideo(params) {
		return axios.request({
			url: 'fire/area/find_protectarea_dev_video',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	getHtNode(params) {
		return axios.request({
			url: 'htp/find_htp_nodesDev',
			method: 'post',
			data: params
		})
	}
}
