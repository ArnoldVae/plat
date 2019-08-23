/*!
 * 基于element的二次封装组件库
 */
import elFilterTree from './el-filter-tree'

const components = [elFilterTree]

const install = function(Vue) {
	if (install.installed) return
	components.forEach(component => {
		Vue.component(component.name, component)
	})
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	version: '1.0.0',
	install,
	elFilterTree
}
