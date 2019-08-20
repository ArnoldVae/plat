import axios from '@/config/api.request'
export default{
  //获取巡检记录列表
  getRecordList(params){
    return axios.request({
      url: 'record/findAsRecord',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  //导出巡检记录列表
  exportRecordList(params){
    return axios.request({
      url: 'report/export',
      method: 'get',
      data: JSON.stringify(params)
    })
  },
  //获取详情
  getDetail(params){
    return axios.request({
      url: 'record/selectTitles',
      method: 'post',
      data: JSON.stringify(params)
    })
  },
  //获取进度详情
  getStepDetail(params){
    return axios.request({
      url: 'record/findAsResult',
      method: 'post',
      data: JSON.stringify(params)
    })
  }
}