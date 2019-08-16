import axios from '@/config/api.request'

export default {
	// 获取组织树信息
	// getOrgTreeInfo(params) {
	// 	return axios.request({
	// 		url: 'org/find_tree',
	// 		method: 'post',
	// 		data: JSON.stringify(params)
	// 	})
	// },
	// 获取设备类型树信息
	getDeviceTypeTreeInfo(params) {
		return axios.request({
			url: 'sub_system/dev_type/tree',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取所有设备列表
	getAllDeviceList(params) {
		return axios.request({
			url: 'dev_info/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 删除设备
	deleteDevice(params) {
		return axios.request({
			url: '/dev_info/del',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备类型字典码
	getDeviceTypeList(params) {
		return axios.request({
			url: 'dev_type/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备等级字典码
	getDeviceLevelList(params) {
		return axios.request({
			url: 'sys_dict/data/find_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取基本表单信息
	getBasicInfo(params) {
		return axios.request({
			url: 'sub_system/test',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备节点信息
	getDeviceNodesInfo(params) {
		return axios.request({
			url: 'dev_info/get',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 查询未配置智辅节点列表
	getNotConfiguredList(params) {
		return axios.request({
			url: 'dtu/dtu_node_list',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 添加节点
	addacNodes(params) {
		return axios.request({
			url: 'sub_system/test',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 提取设备
	extractionDevices(params) {
		return axios.request({
			url: 'dev_info/node/extract',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 批量提取设备
	batchExtractionDevices(params) {
		return axios.request({
			url: 'dev_info/simple/extract',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 删除设备节点
	deleteDeviceNodes(params) {
		return axios.request({
			url: 'sub_system/test',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 编辑设备节点
	editDeviceNodes(params) {
		return axios.request({
			url: 'sub_system/test',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 获取设备节点功能字典码
	getNodeFunList(params) {
		return axios.request({
			url: 'dev_type/dev_fun/find',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 编辑设备信息
	editDeviceInfo(params) {
		return axios.request({
			url: 'dev_info/update',
			method: 'post',
			data: JSON.stringify(params)
		})
	},
	// 新增设备信息
	addDeviceInfo(params) {
		return axios.request({
			url: 'dev_info/save',
			method: 'post',
			data: JSON.stringify(params)
		})
	}
}
