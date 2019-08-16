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
	}
}
