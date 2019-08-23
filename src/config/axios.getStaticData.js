/*!
 * @param {String} filePath
 * @description 全局公共axios本地静态数据请求方法
 */
import axios from 'axios'

const getStaticData = (file = 'enums.json') => {
	return axios(`static-data/${file}`)
}

export default getStaticData
