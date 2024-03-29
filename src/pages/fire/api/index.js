// 获取本地数据
import getStaticData from '@/config/axios.getStaticData'

import systemView from './system-view' // 系统总览
import statusCheck from './status-check' // 状态检测
import analyst from './analyst' // 状态检测
import alarmAction from './alarm-action'
import fireMap from './system-view/fireMap' // 地图相关数据
export default {
	getStaticData,
	systemView,
	statusCheck,
	analyst,
	alarmAction,
	fireMap

}
