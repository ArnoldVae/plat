const test = {
	state: {
		unitId: '',
		appTopic: 'qif/zf/app/',
		controlTopic: 'qif/zf/app/control/'
	},
	mutations: {
		UPDATE_UNITID: (state, id) => {
			state.unitId = id
		}
	},
	actions: {}
}

export default test
