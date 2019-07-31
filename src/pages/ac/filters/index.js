import Vue from 'vue'

export function formatterNum(value) {
	if (!value) return ''
	return Number(value)
		.toFixed(2)
		.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

Vue.filter('dateFormat', function(dateString, parameter = '') {
	let date = new Date(dateString)

	let year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds()

	if (parameter.toLowerCase() == 'yyyy-mm-dd hh:mm:ss' || parameter.toLowerCase() == '') {
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`
	} else if (parameter.toLowerCase() == 'yyyy-mm-dd') {
		return `${year}-${month}-${day}`
	}
})
