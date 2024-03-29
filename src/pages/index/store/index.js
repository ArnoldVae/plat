import Vue from 'vue'
import Vuex from 'vuex'

import test from '@index/store/modules/test'
import router from '@index/store/modules/router'
import getters from '@index/store/getters'
// Vuex 持久化组件,,似乎没有用
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
	// plugins: [
	// 	createPersistedState({
	// 		storage: window.sessionStorage,
	// 		reducer(val) {
	// 			return {
	// 				// 只储存state中的router
	// 				router: val.router
	// 			}
	// 		}
	// 	})
	// ],
	modules: {
		test,
		router
	},
	getters
})

export default store
