import navigation from './navigation.vue'

navigation.install = function(Vue) {
	Vue.component(navigation.name, navigation)
}

export default navigation
