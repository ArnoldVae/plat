import axios from '@/config/api.request'
import axiosNet from '@/config/api.request.net'
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
  
}