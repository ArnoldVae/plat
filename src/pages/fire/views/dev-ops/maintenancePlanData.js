export function maintenancePlanData() {
	return {
		firstRow: [
			{
				title: '运维班：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'orgName',
				data: ''
			},
			{
				title: '维保内容：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'context',
				data: ''
			},
			{
				title: '停电场所：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'vc_PowerOffScene',
				data: ''
			}
		],
		secondRow: [
			{
				title: '变电站：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'unitName',
				data: ''
			},
			{
				title: '负责人员：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'presetName',
				data: ''
			},
			{
				title: '停电范围：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'vc_PowerOffScene',
				data: ''
			}
		],
		thirdRow: [
			{
				title: '电压等级：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'vc_PowerLevel',
				data: ''
			},
			{
				title: '计划开始日期：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'beginTime',
				data: ''
			},
			{
				title: '当前状态：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'status',
				data: ''
			}
		],
		fourthRow: [
			{
				title: '维保单位：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'coName',
				data: ''
			},
			{
				title: '计划结束日期：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'endTime',
				data: ''
			},
			{
				title: '联系电话：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'telePhone',
				data: ''
			}
		]
	}
}

export function implement() {
	return {
		firstRow: [
			{
				title: '开始时间：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'iBeginTime',
				data: ''
			},
			{
				title: '其他人员：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'userName',
				data: ''
			}
		],
		secondRow: [
			{
				title: '持票负责人：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'people',
				bool: false,
				data: ''
			},
			{
				title: '工作票照片：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				bool: true,
				label: 'pictureMtc',
				data: ''
			}
		],
		thirdRow: [
			{
				title: '开工时位置：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'unitName',
				data: ''
			}
		],
		fourthRow: [
			{
				title: '工作票号：',
				imgSrc: 'pack/img/90010019.097afca2.png',
				label: 'workTicketNum',
				data: ''
			}
		],
		imgs: [
			{
				label: 'workFinisheMediaFile',
				data: ''
			},
			{
				label: 'workStartMediaFile',
				data: ''
			},
			{
				label: 'workTicketPic',
				data: ''
			}
		]
	}
}
