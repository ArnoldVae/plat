import axios from '@/config/api.request'
import axiosNet from '@/config/api.request.net'
import $ajax from 'axios'
import qs from 'qs';
export default {
  //获取任务列表
  getTaskList(params){
    return axiosNet.request({
      url: `/as/GetAsTask?${params}`,
      method: 'post',
    })
  },
  //获取任务类型  子类型
  getTaskTypeOrTaskSubType(params){
    return axiosNet.request({
      url: `as/getDictInfo?${params}`,
      method: 'post'
    })
  },
  	//获取巡检任务单数据
	getInspectionWorkOrderData(params) {
		return $ajax({
			//url: 'http://172.26.1.128:8011/as/GetAsTaskNodeByTree',
			url: 'http://172.26.1.128:8011/as/GetAsTaskNodeByNodes',
			method: 'post',
			data: qs.stringify(params)
		})
	},
}