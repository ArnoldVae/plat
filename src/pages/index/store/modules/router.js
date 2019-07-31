const router = {
	// 状态
	state: {
		mainRouter: '11111'
	},
	// 改变状态的标识方法
	mutations: {
		SET_MAINROUTER(state, payload) {
			state.mainRouter = payload.mainRouter
		}
	},
	// 异步的执行 mutations
	actions: {
		addHandle({ commit }) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					commit('ADD_HANDLE')
					resolve()
					reject()
				}, 700)
			})
		}
	}
}

export default router
