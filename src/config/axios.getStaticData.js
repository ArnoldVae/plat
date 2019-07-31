import axios from 'axios'

const getStaticData = (file = 'enums.json') => {
	return axios(`static-data/${file}`)
}

export default getStaticData
