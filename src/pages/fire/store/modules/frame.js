const test = {
	state: {
		unitId: '',
		stationId: '',
		sid:'',
		traFlag: false
	},
	mutations: {
		UPDATE_UNITID: (state, id) => {
			state.unitId = id
		},
		UPDATE_SID:(state,id)=>{
			state.sid=id
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
		updatesId({ commit }, keywords) {
			commit('UPDATE_SID', keywords)
		},
		changeMenu({ commit }, keywords) {
			commit('MENUFLAG', keywords)
		}
	}
}

export default test
