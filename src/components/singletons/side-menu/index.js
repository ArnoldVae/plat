import sideMenu from './side-menu.vue'

sideMenu.install = function(Vue) {
	Vue.component(sideMenu.name, sideMenu)
}

export default sideMenu
