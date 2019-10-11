import axios from '@/config/api.request'
export default {
    getVideoInfo(params){
        return axios.request({
			url: 'node/findNode',
			method: 'post',
			data: params
		})
    }
}