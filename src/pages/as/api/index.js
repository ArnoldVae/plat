// 获取本地数据
import getStaticData from '@/config/axios.getStaticData'
import exampleModule from './example-module' // 案例模块

import inspectionIndex from './inspectionIndex.js'
import monitorData from './monitor-data.js'
import taskManageData from './taskManage-data.js'
import recordData from './record-data.js'
import pointManageData from './pointManage-data.js'

export default {
	getStaticData,

	exampleModule,
	monitorData,
	recordData,
	inspectionIndex,
	taskManageData,
	pointManageData
}
