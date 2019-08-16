// 开发模式
var $_development = {
	javaRequest: {
		location: "http://172.26.1.149:8085",
		javaModule: "dsa5200"
	},
	netRequest: {
		location: "http://172.26.1.147:8021",
		netModule: ""
	},
	video: {
		location: "172.26.1.152:8888"
	},
	mqtt: {
		host: "172.26.1.233",
		port: "8083",
		path: "mqtt",
		username: 'qif',
		password: 'qif123.,'
	}
}
// 生产模式
var $_production = {
	javaRequest: {
		location: "http://172.26.1.110:8080",
		javaModule: "dsa5200"
	},
	netRequest: {
		location: "http://172.26.1.149:8085",
		netModule: "dsa5200"
	},
	video: {
		location: "172.26.1.152:8888"
	},
	mqtt: {
		host: "172.26.1.18",
		port: "8083",
		path: "mqtt",
		username: 'qif',
		password: 'qif123.,'
	}
}
/*if (process.env.NODE_ENV == 'development') {
	console.log('开发模式')
}
if (process.env.NODE_ENV == 'production') {
	console.log('发布模式')
}*/
