// java 服务
import axios from '@/config/api.request'
// .net 服务
import axiosNet from '@/config/api.request.net'

export default {
	// java接口示例
	getXxxTest1(params) {
		return axios.request({
			url: 'java/test',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// .net接口示例
	getXxxTest2(params) {
		return axiosNet.request({
			url: 'net/test',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//查询组织树
	getOrganization(params) {
		return axios.request({
			url: 'org/find_tree',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备列表
	getDevList(params) {
		return axios.request({
			url: 'dev_info/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	getSceneList(params){
		return axios.request({
			url:'scene/scene_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
