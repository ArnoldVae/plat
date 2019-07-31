import { dateFormat } from '@as/directive'
// sea Master Manifest newdraft页数据以及生命周期(trader)
export const manifestNewDataAndHook = {
	data() {
		return {
			// active tab name
			activeTabName: 'basic-info',
			// manifest-tab basic information form
			basicForm: {
				items: [
					{
						getLabel: 'Flight No.',
						models: '',
						type: 'text',
						name: 'flight_no',
						ruleProp: 'flight_no'
					},
					{
						getLabel: 'Aircraft Nationality and Registration',
						models: '',
						type: 'text',
						name: 'aircraft',
						ruleProp: 'aircraft'
					},
					{
						getLabel: 'Airline',
						models: '',
						type: 'text',
						name: 'airline',
						ruleProp: 'airline'
					},
					{
						getLabel: 'Customs Office',
						models: [],
						type: 'cascader',
						name: 'customs_office',
						ruleProp: 'customs_office',
						options: [
							{
								value: 'beijing',
								label: 'Beijing',
								children: [
									{
										value: 'chaoyang-port',
										label: 'Chaoyang Port'
									},
									{
										value: 'shijingshan-port',
										label: 'Shijingshan Port'
									},
									{
										value: 'haidian-port',
										label: 'Haidian Port'
									},
									{
										value: 'dongcheng-port',
										label: 'Dongcheng Port'
									},
									{
										value: 'xicheng-port',
										label: 'Xicheng Port'
									},
									{
										value: 'fengtai-port',
										label: 'Fengtai Port'
									}
								]
							},
							{
								value: 'tianjin',
								label: 'Tianjin'
							},
							{
								value: 'shanghai',
								label: 'Shanghai',
								children: [
									{
										value: 'yangshan-port',
										label: 'Yang Shan Port'
									}
								]
							},
							{
								value: 'hebei',
								label: 'Heibei'
							},
							{
								value: 'shandong',
								label: 'Shandong'
							},
							{
								value: 'liaoning',
								label: 'Liaoning'
							}
						]
					},
					{
						getLabel: 'Origin',
						models: '',
						type: 'select',
						name: 'origin',
						ruleProp: 'origin'
					},
					{
						getLabel: 'Destination',
						models: '',
						readonly: true,
						disabled: true,
						type: 'text',
						name: 'destination',
						ruleProp: 'destination'
					},
					{
						getLabel: 'Departure Date',
						models: '',
						type: 'date',
						format: dateFormat,
						valueFormat: dateFormat,
						name: 'departure_date',
						ruleProp: 'departure_date'
					},
					{
						getLabel: 'Arrival Date',
						models: '',
						type: 'date',
						format: dateFormat,
						valueFormat: dateFormat,
						name: 'arrival_date',
						ruleProp: 'arrival_date'
					}
				],
				rules: {
					flag: false,
					model: {
						flight_no: '',
						aircraft: '',
						airline: '',
						customs_office: [],
						origin: [],
						destination: '',
						departure_date: '',
						arrival_date: ''
					},
					refName: 'basicForm',
					rule: {
						flight_no: [{ required: true, message: 'Please input content', trigger: 'blur' }],
						aircraft: [{ required: true, message: 'Please input content', trigger: 'blur' }],
						airline: [{ required: true, message: 'Please input content', trigger: 'blur' }],
						customs_office: [{ required: true, message: 'Please select', trigger: 'blur' }],
						origin: [{ required: true, message: 'Please input content', trigger: 'blur' }],
						departure_date: [{ required: true, message: 'Please input content', trigger: 'blur' }],
						arrival_date: [{ required: true, message: 'Please input content', trigger: 'blur' }]
					},
					isvalid: false
				},
				class: {
					form: 'com-form',
					formItem: 'search-form-item',
					label: 'search-form-label',
					iptClass: 'search-form-input',
					buttonClass: 'search-form-btn',
					areaClass: 'search-form-textarea',
					formSize: 'small'
				}
			}
		}
	},
	props: {
		orderNumber: {
			type: String
		},
		tabOptions: {
			type: Object,
			required: false,
			default: () => {
				return {}
			}
		}
	},
	computed: {},
	watch: {},
	created() {}
}

// sea Master Manifest newdraft页方法(trader)
export const manifestNewMethods = {
	methods: {
		submitForm() {},
		saveForm() {},
		resetForm() {}
	}
}
