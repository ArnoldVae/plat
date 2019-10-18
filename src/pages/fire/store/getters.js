const getters = {
	number: state => state.test.count,
	unitId: state => state.frame.unitId,
	stationId: state => state.frame.stationId,
	sId:state => state.frame.sid
}
export default getters
