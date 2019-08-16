// 立体巡检
export default [
	{
		path: '/',
		redirect: '/fire'
	},
	{
		path: '/fire',
		name: 'fire',
		meta: {
			title: '智能消防'
		},
		component: () => import('@fire/views'),
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
	},
	{
		path: '/main',
		name: 'main',
		meta: {
			title: '主监控'
		},
		component: () => import('@fire/views/main-check')
	},
    {
        path: '/firecontrol',
        name: 'firecontrol',
        meta: {
            title: '消控室'
        },
        component: () => import('@fire/views/sp-parts/control')
    },
    {
        path: '/onekeycontrol',
        name: 'onekeycontrol',
        meta: {
            title: '主监控'
        },
        component: () => import('@fire/views/sp-parts/primaryDev')


    },
    {
        path: '/primarydev',
        name: 'primarydev',
        meta: {
            title: '主设备监视'
        },
        component: () => import('@fire/views/sp-parts/oneKeyControl')    }
]
