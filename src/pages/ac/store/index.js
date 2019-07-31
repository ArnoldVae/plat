import Vue from 'vue'
import Vuex from 'vuex'

import test from '@ac/store/modules/test'
import frame from '@ac/store/modules/frame'
import getters from '@ac/store/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		test,
		frame
	},
	getters
})

export default store
