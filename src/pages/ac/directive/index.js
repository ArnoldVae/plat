import Vue from 'vue'

export function formatterNum(value) {
	if (!value) return ''
	return Number(value)
		.toFixed(2)
		.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
}

export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

export function exchange(jsonObject) {
	return JSON.parse(JSON.stringify(jsonObject))
}

export function upperStringFirst(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1)
}

export function multiplicative(firstStr, secondStr) {
	return String((Number(firstStr) * Number(secondStr)).toFixed(2))
}

export function plus(firstStr, secondStr) {
	return String(Number(firstStr) + Number(secondStr))
}

// 格式化日期
export function formatDate(value, fmts = 'yyyy-MM-dd HH.mm.ss') {
	var fmt = fmts
	if (value === null || value === '' || value === undefined) {
		return
	}
	var date = new Date(value)
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'H+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
		}
	}
	return fmt
}

export const dateFormat = 'yyyy/MM/dd'

export const dateTimeFormat = 'yyyy/MM/dd HH:mm:ss'

Vue.directive('pin', function(el, binding) {
	// 拿到修饰方向
	let postion = binding.modifiers
	// console.log(postion)

	if (binding.value) {
		el.style.position = 'fixed'

		if (postion) {
			for (let key in postion) {
				el.style[key] = '10px'
			}
		} else {
			el.style.top = '320px'
			el.style.left = '10px'
		}

		if (binding.arg === 'current') {
			el.style.background = '#F14F9A'
		}
	} else {
		el.style.position = 'static'
	}
	console.log(binding)
})
import draggable from './module/draggable'
import clipboard from './module/clipboard'

const directives = {
	draggable,
	clipboard
}
export const center = {
	bind(el) {
		el.style.marginLeft = `${-el.offsetWidth / 2}px`
	},
	inserted(el) {
		el.style.marginLeft = `${-el.offsetWidth / 2}px`
	},
	update(el) {
		el.style.marginLeft = `${-el.offsetWidth / 2}px`
	}
}

export default directives
