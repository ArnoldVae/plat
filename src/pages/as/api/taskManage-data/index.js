import axios from '@/config/api.request'
import axiosNet from '@/config/api.request.net'
import qs from 'qs';
export default {
  //获取任务列表
  getTaskList(params) {
    return axiosNet.request({
      url: 'as/GetAsTask',
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(params)
    })
  },
  //获取任务类型  子类型
  getTaskTypeOrTaskSubType(params) {
    return axiosNet.request({
      url: 'as/getDictInfo',
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(params)
    })
  },
  //获取巡检任务单数据
  getInspectionWorkOrderData(params) {
    return axiosNet.request({
      url: 'as/GetAsTaskNodeByTree',
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(params)
    })
  },
  //删除
  delTask(params) {
    return axiosNet.request({
      url: 'as/DelAsTask',
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(params)
    })
  }
}