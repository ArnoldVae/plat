export const common = {
	data() {
		return {}
	},
	computed: {
		// 子系统 id
		systemId() {
			return JSON.parse(sessionStorage.getItem('ACTIVE_MENU')).systemId
		},

		// 站所 id
		stationId() {
			return this.$store.state.stationId
		}
	},
	created() {},
	methods: {}
}
