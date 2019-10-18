import axios from '@/config/api.request'
export default {
	getVideoInfo(params) {
		return axios.request({
			url: 'node/findNode',
			method: 'post',
			data: params
		})
	},
	getDeviceType(nodeid, unitid) {
		return axios.request({
			url: 'astask/getDevCountByDevType?treeId=' + nodeid + '&unitId=' + unitid,
			method: 'post',
			data:''
		})
	},
	getDeviceInfo(params){
		return axios.request({
			url: 'astask/getDevDetail',
			method: 'post',
			data: params
		})
	}
}