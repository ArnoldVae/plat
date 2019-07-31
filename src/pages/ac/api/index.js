// 获取本地数据
import getStaticData from '@/config/axios.getStaticData'

import frame from './frame' // 子系统框架
import fireControl from './fire-control' //消防图纸节点接口
import humiture from './humiture'
import ozone from './ozone' //臭氧接口
import intelligentMap from './intelligentMap'
import intelligentLightin from './intelligent-lighting'
import sf6Monitor from './sf6-monitor'
import batteryMonitor from './battery-monitor'
import mapApi from './mapApi'

export default {
    getStaticData,
    frame,
    fireControl,
    humiture,
    ozone,
    intelligentMap,
    intelligentLightin,
    sf6Monitor,
    batteryMonitor,
    mapApi
}