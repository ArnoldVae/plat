const inspection = {
  state: {
    stationId:'666'
  },
  mutations: {
    // 监听StationID变化
    CHANGE_STATION: (state, params) => {
      state.stationId = params.stationId;
  },
  }
}

export default inspection