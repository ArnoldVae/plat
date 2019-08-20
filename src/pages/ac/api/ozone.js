import axios from '@/config/api.request'

export default {
    //获取设备
    getOzoneDevice(data) {
        return axios.request({
            url: 'dev_info/findNodesInfo',
            method: 'post',
            data
        })
    },
    //获取数据
    getOzoneData(data) {
        return axios.request({
            url: 'dev_info/findDevHistoryData',
            method: 'post',
            data: data
        })
    }
}