import mqtt from 'mqtt'

let connect = {}
process.env.NODE_ENV == 'development' && (connect = $_development)
process.env.NODE_ENV == 'production' && (connect = $_production)

let host = connect.mqtt.host
let port = connect.mqtt.port
let path = connect.mqtt.path
let username = connect.mqtt.username
let password = connect.mqtt.password

let url = `ws://${host}:${port}/${path}`
let clientId =
	'mqttjs_' +
	Math.random()
		.toString(16)
		.substr(2, 8)

let options = {
	keepalive: 1000,
	clientId: clientId,
	protocolId: 'MQTT',
	protocolVersion: 4,
	clean: true,
	reconnectPeriod: 1000,
	connectTimeout: 30 * 1000,
	will: {
		topic: 'WillMsg',
		payload: 'Connection Closed abnormally..!',
		qos: 0,
		retain: false
	},
	username: username,
	password: password,
	rejectUnauthorized: false
}

let client = mqtt.connect(url, options)

client.on('connect', () => {
	console.log('MQTT连接完成')

	// 统一处理分发
	client.on('message', (topic, message, packet) => {
        trigger(topic, message, packet)
    })

})

// 错误
client.on('error', (err) => {
	console.log('MQTT出错了！:' + err)
	client.end()
})

//关闭连接
client.on('end', () => {
    console.log('MQTT连接结束');
})

//监听离线
client.on('offline', function() {
    console.log('MQTT已离线');
})

//重连
client.on('reconnect', function() {
    console.log('MQTT正在重连');
})



// 事件订阅
let messageQueue = {};
let listen = (key, fn) => {
    if (!messageQueue[key]) {
        messageQueue[key] = [];
    }
    messageQueue[key] = fn;
}
let trigger = (topic, message, packet) => {
    Object.keys(messageQueue).map((key) => {
        messageQueue[key].apply(this, [topic, message, packet]);
    })
}

export { client, listen }

// 监听
/*client.on('message', function (topic, message, packet) {
	console.log('Received Message:= ' + message.toString() + '\nOn topic:= ' + topic)
})*/
