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
import microWeather from './micro-weather'
import antiTheft from './anti-theft'
import mainOil from './main-oil'
import video from './video'
import coreClamp from './core-clamp'
import hgis from "./hgis";

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
	mapApi,
	microWeather,
	antiTheft,
	mainOil,
	video,
	coreClamp,
	hgis
}
