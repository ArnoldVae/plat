// 立体巡检
export default [
	{
		path: '/',
		redirect: '/inspection'
	},
	{
		path: '/inspection-content',
		name: 'inspection-content',
		meta: {
			title: '立体巡检'
		},
		component: () => import('@as/views/inspection-content.vue')
	},
	{
		path: '/inspection',
		name: 'inspection',
		meta: {
			title: '立体巡检'
		},
		component: () => import('@as/views'),
		children: [
			{
				path: 'notFind',
				name: 'notFind',
				meta: {
					title: '404'
				},
				component: () => import('@ac/views/notFind')
			}
		]
	}
]
