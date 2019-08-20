// 获取本地数据
import getStaticData from '@/config/axios.getStaticData'
import monitorData from './monitor-data'
import recordData from './record-data'

import exampleModule from './example-module' // 案例模块

import inspectionIndex from './inspectionIndex/inspectionIndex'

export default {
	getStaticData,

  exampleModule,
  monitorData,
  recordData,
	inspectionIndex

}
