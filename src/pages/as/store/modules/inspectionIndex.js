import axios from '../../api/monitor-data'
const inspection = {
	state: {
		stationId: '666',
		inspectionTaskList: []
	},
	mutations: {
		// 监听StationID变化
		CHANGE_STATION: (state, params) => {
			state.stationId = params.stationId
		},
		CHANGE_INSPECTIONTASKLIST: ( state , params ) => {
			state.inspectionTaskList = params.inspectionTaskList
			console.log( state.inspectionTaskList )
		}
	}
}

export default inspection
