import axios from '@/config/api.request'


export default {

    //获取图元节点
    getHtFind(params) {
        return axios.request({
            url: 'htp/find_htp_nodes',
            method: 'post',
            data: params
        })
    },
    //获取图纸
    getHtDrawing(data) {
        return axios.request({
            url: 'htp/find_htp_age',
            method: 'post',
            data
        })
    }
}