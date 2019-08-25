const test = {
	state: {
		unitId: '',
		stationId: '',
		traFlag: false
	},
	mutations: {
		UPDATE_UNITID: (state, id) => {
			state.unitId = id
		},
		STATIONID: (state, id) => {
			state.stationId = id
		},
		MENUFLAG: (state, flag) => {
			console.log(flag)
			state.traFlag = flag
		}
	},
	actions: {
		updateUnitId({ commit }, keywords) {
			commit('UPDATE_UNITID', keywords)
		},
		changeMenu({ commit }, keywords) {
			commit('MENUFLAG', keywords)
		}
	}
}

export default test
