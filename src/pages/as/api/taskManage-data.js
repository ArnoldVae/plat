import axios from '@/config/api.request'
import axiosNet from '@/config/api.request.net'
import qs from 'qs';
export default {
  //获取任务列表
  //net
  // getTaskList(params) {
  //   return axiosNet.request({
  //     url: 'as/GetAsTask',
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     data: qs.stringify(params)
  //   })
  // },
  //java
  getTaskList(params) {
    return axios.request({
      url: 'astask/getAsTaskpost',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  //获取任务类型  子类型
  //net
  // getTaskTypeOrTaskSubType(params) {
  //   return axiosNet.request({
  //     url: 'as/getDictInfo',
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     data: qs.stringify(params)
  //   })
  // },
  //java
  getTaskTypeOrTaskSubType(params) {
    return axios.request({
      url: 'as_dictA/getDictInfo',
      method: 'post',
      data: JSON.stringify(params)
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
  //net
  // delTask(params) {
  //   return axiosNet.request({
  //     url: 'as/DelAsTask',
  //     method: 'post',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     data: qs.stringify(params)
  //   })
  // }
  //java
  delTask(params) {
    return axios.request({
      url: 'astask/delAsTask',
      method: 'get',
      params
    })
  }
}