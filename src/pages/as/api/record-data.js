import axios from '@/config/api.request'
import axiosNet from '@/config/api.request.net'
import qs from 'qs';
export default {
	//获取巡检记录列表
	getRecordList(params) {
		return axios.request({
			url: 'record/findAsRecord',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//导出巡检记录列表
	exportList(params) {
		return axios.request({
			url: 'report/export',
			method: 'get',
			data: JSON.stringify(params)
		})
	},
	//获取详情
	getDetail(params) {
		return axios.request({
			url: 'record/selectTitles',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//获取进度详情
	getStepDetail(params) {
		return axios.request({
			url: 'record/findAsResult',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//导出每一行的数据
	exportRow(params){
		// return axiosNet.request({
		// 	url: 'As/ExportTaskReport',
		// 	method: 'post',
		// 	headers: {
		// 		'Content-Type': 'application/x-www-form-urlencoded'
		// 	},
		// 	data: qs.stringify(params)
		// })
		return axios.request({
			url: 'astask/exportTaskReport',
			method: 'post',
			data: JSON.stringify(params)
		}) 
	}
}
