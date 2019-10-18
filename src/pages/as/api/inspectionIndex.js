import axios from '@/config/api.request'
export default {
	// 获取所有变电站
	getRcu(params) {
		return axios.request({
			url: 'record/findStation',
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
			url: 'record/findMOrginfoList',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取巡检装备统计数据
	getEquipData(params) {
		return axios.request({
			url: '/robot/findRobotNum',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	//获取报警数据
	getErrData( params ) {
		return axios.request({
			url: '/AsTaskResult/findAlarmData',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
