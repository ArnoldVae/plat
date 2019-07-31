// 辅助综合
export default [{
        path: '/',
        redirect: '/overview'
    },
    {
        path: '/overview',
        name: 'overview',
        meta: {
            title: '辅助总览'
        },
        component: () =>
            import ('@ac/views/overview'),
    },
    {
        path: '/intelligent',
        name: 'intelligent',
        meta: {
            title: '辅助综合'
        },
        component: () =>
            import ('@ac/views'),
        children: [
            {
                path: 'notFind',
                name: 'notFind',
                meta: {
                    title: '404'
                },
                component: () =>
                    import ('@ac/views/notFind')
            },
            {
                path: 'table',
                name: 'table',
                meta: {
                    title: '表格总览'
                },
                component: () =>
                    import ('@ac/views/common/view-table')
            },
            {
                path: 'humiture',
                name: 'humiture',
                meta: {
                    title: '温湿度'
                },
                component: () =>
                    import ('@ac/views/humiture')
            },
            {
                path: 'battery-monitor',
                name: 'battery-monitor',
                meta: {
                    title: '蓄电池'
                },
                component: () =>
                    import ('@ac/views/battery-monitor')
            },
            {
                path: 'anti-theft',
                name: 'anti-theft',
                meta: {
                    title: '防盗报警'
                },
                component: () =>
                    import ('@ac/views/anti-theft')
            },
            {
                path: 'intelligent-lighting',
                name: 'intelligent-lighting',
                meta: {
                    title: '智能灯光'
                },
                component: () =>
                    import ('@ac/views/intelligent-lighting')
            },
            {
                path: 'video',
                name: 'video',
                meta: {
                    title: '视频系统'
                },
                component: () =>
                    import ('@ac/views/video')
            },
            {
                path: 'water-soaking',
                name: 'water-soaking',
                meta: {
                    title: '水浸'
                },
                component: () =>
                    import ('@ac/views/water-soaking')
            },
            {
                path: 'ozone',
                name: 'ozone',
                meta: {
                    title: '臭氧监测'
                },
                component: () =>
                    import ('@ac/views/ozone')
            },
            {
                path: 'vrv',
                name: 'vrv',
                meta: {
                    title: '空调'
                },
                component: () =>
                    import ('@ac/views/vrv')
            },
            {
                path: 'water-level',
                name: 'water-level',
                meta: {
                    title: '水位'
                },
                component: () =>
                    import ('@ac/views/water-level')
            },
            {
                path: 'fireControl',
                name: 'fireControl',
                meta: {
                    title: '消防报警'
                },
                component: () =>
                    import ('@ac/views/fireControl')
            },
            {
                path: 'sf6-monitor',
                name: 'sf6-monitor',
                meta: {
                    title: 'SF6监测'
                },
                component: () =>
                    import ('@ac/views/sf6-monitor')
            },
            {
                path: 'securityControl',
                name: 'securityControl',
                meta: {
                    title: '安防报警'
                },
                component: () =>
                    import ('@ac/views/securityControl')
            }
        ]
    }
]