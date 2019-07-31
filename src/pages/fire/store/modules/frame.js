const test = {
	state: {
		unitId: '',
		stationId:''
	},
	mutations: {
		UPDATE_UNITID: (state, id) => {
			console.log(id)
			state.unitId = id
		},
		STATIONID:(state, id) =>{

			state.stationId=id
		}
	},
	actions: {
		updateUnitId({commit},keywords){
			commit("UPDATE_UNITID", keywords)
		}

	}
}

export default test
