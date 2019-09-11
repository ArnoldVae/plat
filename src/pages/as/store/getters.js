const getters = {
	number: state => state.test.count,
	stationId: state => state.inspection.stationId,
	inspectionTaskList: state => state.inspection.inspectionTaskList
}
export default getters
