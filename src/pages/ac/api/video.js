import axios from '@/config/api.request'

export default {
    //查询组织树
    getOrganization(params) {
        return axios.request({
            url: 'org/find_tree',
            method: 'post',
            data: JSON.stringify(params)
        })
    },
    // 获取设备列表
    getDevList(params) {
        return axios.request({
            url: 'dev_info/find',
            method: 'post',
            data: JSON.stringify(params)
        })
    },
    getSceneList(params) {
        return axios.request({
            url: 'scene/scene_list',
            method: 'post',
            data: JSON.stringify(params)
        })
    },
    //获取流媒体服务
    getVideoServe(params) {
        return axios.request({
            url: 'dev_info/getService',
            method: 'post',
            data: JSON.stringify(params)
        })
    },
    getSceneDevList(params) {
        return axios.request({
            url: 'scene/find_scene_dev',
            method: 'post',
            data: JSON.stringify(params)
        })
    }
}
