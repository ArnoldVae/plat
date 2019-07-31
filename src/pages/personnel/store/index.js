import Vue from 'vue'
import Vuex from 'vuex'

import test from '@as/store/modules/test'
import getters from '@as/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		test
	},
	getters
})

export default store
