const declarations = [
	{
		declarationNo: 'D011720180000200399',
		attachments: [
			{
				'file-name': 'Commercial Invoice.pdf',
				'file-type': 'Commercial Invoice',
				'file-size': '300 KB',
				'upload-time': '2018/10/23',
				'preview-file-name': 'Commercial Invoice.pdf'
			},
			{
				'file-name': 'Packing List.pdf',
				'file-type': 'Packing List',
				'file-size': '125 KB',
				'upload-time': '2018/10/23',
				'preview-file-name': 'Packing List.pdf'
			},
			{
				'file-name': 'Bill of Lading.pdf',
				'file-type': 'Bill of Lading',
				'file-size': '490 KB',
				'upload-time': '2018/10/23',
				'preview-file-name': 'Bill of Lading.pdf'
			},
			{
				'file-name': 'Sales Contract.pdf',
				'file-type': 'Sales Contract',
				'file-size': '184 KB',
				'upload-time': '2018/10/23',
				'preview-file-name': 'Sales Contract.pdf'
			},
			{
				'file-name': 'Letter of Credit.pdf',
				'file-type': 'Letter of Credit',
				'file-size': '2321 KB',
				'upload-time': '2018/10/23',
				'preview-file-name': 'Letter of Credit.pdf'
			}
		],
		basicForm: {
			'customs-office': ['shanghai', 'yangshan-port'],
			declarant: 'Hangfeng Broker & Cargo Services CO.,LTD.',
			'declarant-type': 'enterprise',
			'trader-regime': ['import', 'normal-import']
		},
		commodities: [
			{
				commodity: {
					brand: 'Nuctech-G',
					com_code: '90221200.01',
					goods_des: 'X-Ray Scanners UOU-8011 for body or cargo inspection',
					gross_weight: '422.50',
					new_weight: '0.00',
					origin_country: 'GEORGIA',
					price: '5000000.00',
					currency: 'USD',
					quantity: '17',
					uom: 'KG Keg'
				},
				packTable: [
					{
						container_no: 'CARU3713987',
						mark_num: 'NUC-8-16-2322',
						package_num_type: '8 KG Keg'
					},
					{
						container_no: 'CARU8989823',
						mark_num: ' NUC-8-16-2322',
						package_num_type: '9 KG Keg'
					}
				],
				permitTable: [
					{
						'permit-type': 'Permit',
						'permit-no': 'P000298892',
						'validate-date': '2017/11/28',
						'issue-depart': 'Customs SPS  Department'
					}
				]
			},
			{
				commodity: {
					brand: 'Nuctech-G',
					com_code: '90221200.02',
					goods_des: 'X-Ray Scanners CX-8011 for body or cargo inspection',
					gross_weight: '39.00',
					new_weight: '0.00',
					origin_country: 'GEORGIA',
					price: '13000000.00',
					currency: 'USD',
					quantity: '2',
					uom: 'KG Keg'
				},
				packTable: [
					{
						container_no: 'SOKU6100014',
						mark_num: 'SSY0187',
						package_num_type: '2 KG Keg'
					}
				],
				permitTable: [
					{
						'permit-type': 'Permit',
						'permit-no': 'P000298893',
						'validate-date': '2017/11/28',
						'issue-depart': 'SPS  Department'
					}
				]
			},
			{
				commodity: {
					brand: 'Nuctech-G',
					com_code: '90221200.03',
					goods_des: 'X-Ray Scanners SFSD-8033 for cargo inspection',
					gross_weight: '379.00',
					new_weight: '0.00',
					origin_country: 'GEORGIA',
					price: '2000000.00',
					currency: 'USD',
					quantity: '2',
					uom: 'HG Hogshead'
				},
				packTable: [
					{
						container_no: 'TRIU82379901',
						mark_num: 'SSY0187',
						package_num_type: '1 HG Hogshead'
					}
				],
				permitTable: [
					{
						'permit-type': 'Permit',
						'permit-no': 'P000298894',
						'validate-date': '2017/11/28',
						'issue-depart': 'SPS  Department'
					}
				]
			},
			{
				commodity: {
					brand: 'Nuctech-G',
					com_code: '90221200.04',
					goods_des: 'X-Ray Scanners UOU-8011 for body or cargo inspection',
					gross_weight: '923.70',
					new_weight: '0.00',
					origin_country: 'GEORGIA',
					price: '150000.00',
					currency: 'USD',
					quantity: '1',
					uom: 'IN Ingot'
				},
				packTable: [
					{
						container_no: 'CFSU3970262',
						mark_num: 'NUC-8-16-332',
						package_num_type: '1 IN Ingot'
					}
				],
				permitTable: [
					{
						'permit-type': 'Permit',
						'permit-no': 'P000298895',
						'validate-date': '2017/11/28',
						'issue-depart': 'SPS  Department'
					}
				]
			},
			{
				commodity: {
					brand: 'Nuctech-G',
					com_code: '90221200.05',
					goods_des: 'X-Ray Scanners CX-8011 for body or cargo inspection',
					gross_weight: '34.00',
					new_weight: '0.00',
					origin_country: 'GEORGIA',
					price: '20000000.00',
					currency: 'USD',
					quantity: '5',
					uom: 'KG Keg'
				},
				packTable: [
					{
						container_no: 'TCLU2245615',
						mark_num: 'GEORGIA-46',
						package_num_type: '5 KG Keg'
					}
				],
				permitTable: [
					{
						'permit-type': 'Permit',
						'permit-no': 'P000298895',
						'validate-date': '2017/11/28',
						'issue-depart': 'SPS  Department'
					}
				]
			}
		],
		transForm: {
			'transport-mode': 'sea',
			'consolid-indicat': 'no'
		},
		transInfo: {
			'vessel-name': 'BFP GALAXY',
			'voyage-no': '062S',
			'master-land-no': 'MBL001',
			'house-land-no': 'CCPIT000 1603424466'
		},
		traderRegimeInfo: {
			importer: 'NUCTECH COMPANY LIMITED',
			address: '2/F,NO.8, Zhongguancun East Road, Hai Dian District,BEIJING, P.R. CHINA',
			telephone: '86-21-8478-9876',
			fax: '86-21-8478-9890',
			'business-no': 'B4344900257',
			ucr: 'UCR9097779'
		},
		shipmentForm: {
			'arrival-date': '2017-12-28',
			'port-load': 'POTI GEORGIA',
			country: 'GEORGIA '
		},
		partiesTable: [
			{
				'party-type': 'consignee',
				name: 'NUCTECH COMPANY LIMITED',
				detail: '2/F,NO.8, Zhongguancun East Road, Hai Dian District,BEIJING, P.R. CHINA'
			},
			{
				'party-type': 'consignor',
				name: 'D&G COMMUNICATION LTD',
				detail: '28 ST. KHIACHELI,TBILSI, GEORGIA'
			},
			{
				'party-type': 'shipper',
				name: 'COSCO Shang Hai',
				detail: 'DamingluNo.378, ShangHai, P.R. China'
			},
			{
				'party-type': 'notify',
				name: 'Tradelink Electronic Commerce Limited',
				detail: 'Box No.70023, Kowloon Central Post Office,SHANGHAI, P.R.CHINA'
			}
		],
		invoiceTable: [
			{
				amount: '40150000.00',
				charge: 'Invoice Value',
				currency: 'USD',
				'exchange-rate': '6.60',
				'total-amount': '3432000.00'
			},
			{
				amount: '539.46',
				charge: 'External Freight',
				currency: 'USD',
				'exchange-rate': '6.60',
				'total-amount': '81576.00'
			},
			{
				amount: '0.00',
				charge: 'Internal Freight',
				currency: 'USD',
				'exchange-rate': '6.60',
				'total-amount': '0.00'
			},
			{
				amount: '40150.00',
				charge: 'Insurance',
				currency: 'USD',
				'exchange-rate': '6.60',
				'total-amount': '3432.00'
			},
			{
				amount: '35.96',
				charge: 'Other Costs',
				currency: 'USD',
				'exchange-rate': '6.60',
				'total-amount': '5438.40'
			},
			{
				amount: '35.96',
				charge: 'Deductions',
				currency: 'USD',
				'exchange-rate': '6.60',
				'total-amount': '5438.40'
			}
		],
		status: 1
	}
]
const amendments = [
	{
		declarationNo: 'D011720180000200399',
		basicForm: {
			'customs-office': ['shanghai', 'yangshan-port'],
			declarant: 'Hangfeng Broker & Cargo Services CO.,LTD.',
			'declarant-type': 'enterprise',
			'trader-regime': ['import', 'normal-import'],
			'business-no': 'B4344900232'
		},
		requireAmendForm: {
			'content-before-change': 'Container CARU3713887 is recorded',
			'content-after-change': 'Container CARU3713887 is withdrawn for loading',
			'reason-amendment': 'Container record mistake'
		},
		// 'submitInfo': {
		//   'submitted-date': '2018/12/15 15:32:47',
		//   'name': 'trader0001'
		// },
		status: 1
	}
]
export { declarations, amendments }
