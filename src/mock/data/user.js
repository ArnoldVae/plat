/*
 * 用来存放一些模拟用户的数据
 * */
// import MockData from 'mockjs'
let Random = MockData.Random

Random.extend({
	serviceType: [
		'Carrier(Sea)',
		'Freight Forwarder(Sea)',
		'NVOCC',
		'Carrier(Air)',
		'Freight Forwarder(Air)',
		'Carrier(Road)',
		'Importer',
		'Exporter',
		'Customs Broker',
		'3rd Party Logistics'
	],
	service_type: function(date) {
		return this.pick(this.serviceType)
	}
})

const users = [
	{
		id: 1,
		password: '123456',
		token: 'trader',
		userRole: ['trader'],
		basicForm: {
			service_type: Random.service_type(),
			organisation_name: 'trader0001',
			business_no: /\d{5,10}/
		},
		contactPersonForm: {
			name: Random.cname(),
			address: Random.county(true),
			telephone: /^1[34578]\d{9}$/,
			fax: Random.zip()
		},
		regAuthorForm: {
			name: Random.cname(),
			id: Random.guid(),
			position: Random.county(true),
			fax: Random.zip()
		},
		regAddressForm: {
			build: '2-10',
			street_name: Random.region(),
			town_name: Random.city(),
			country_code: Random.zip()
		},
		userTable: {}
	},
	{
		id: 2,
		password: '123456',
		token: 'customs',
		userRole: ['customs'],
		basicForm: {
			service_type: Random.service_type(),
			organisation_name: 'customs0001',
			business_no: /\d{5,10}/
		},
		contactPersonForm: {
			name: Random.cname(),
			address: Random.county(true),
			telephone: /^1[34578]\d{9}$/,
			fax: Random.zip()
		},
		regAuthorForm: {
			name: Random.cname(),
			id: Random.guid(),
			position: Random.county(true),
			fax: Random.zip()
		},
		regAddressForm: {
			build: '2-10',
			street_name: Random.region(),
			town_name: Random.city(),
			country_code: Random.zip()
		},
		userTable: {}
	}
]

export { users }
