import getDescLabel from './get-desc-label'

const filters = [getDescLabel]

const install = function(Vue) {
	filters.forEach(filter => {
		Vue.filter('getDescLabel', filter)
	})
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	version: '1.0.0',
	install,
	getDescLabel
}