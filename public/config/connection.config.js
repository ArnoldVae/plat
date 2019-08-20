// 开发模式
var $_development = {
	javaRequest: {
		location: "http://26.47.189.184:8081",
		javaModule: "dsa5200"
	},
	video: {
		location: "http://26.47.189.184:9000"
	},
	mqtt: {
		host: "26.47.189.184",
		port: "8083",
		path: "mqtt",
		username: 'qif',
		password: 'qif123.,'
	}
}
// 生产模式
var $_production = {
    javaRequest: {
		location: "http://172.26.1.109:8081",
		javaModule: "dsa5200"
	},
	video: {
		location: "http://26.47.189.184:9000"
	},
	mqtt: {
		host: "26.47.189.184",
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
