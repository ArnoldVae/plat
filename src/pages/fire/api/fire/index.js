import axios from '@/config/api.request'

export default {
	getFindPlanRecord() {
		return axios.request({
			// headers:{"Content-type":"application/json; charset=utf-8"},
			url: 'fire/manage/findPlanRecord',
			method: 'post',
			data: {}
		})
	}
}
