/*!
 * 一个页面只用一次的单例组件库
 */
import navigation from './navigation'
import sideMenu from './side-menu'
import horMenu from './hor-menu'
import crumbs from './crumbs'
import statistics from './statistics'

const components = [navigation, sideMenu, horMenu, crumbs, statistics]

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
	navigation,
	sideMenu,
	horMenu,
	crumbs,
	statistics
}
