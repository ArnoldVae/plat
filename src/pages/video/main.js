import '@babel/polyfill'
import Vue from 'vue'
import App from '@video/App.vue'
import router from '@video/router'
import store from '@video/store'

// iView 全局(按需的话低版本会出问题，已经比原版小1M)
import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
// ElementUI 按需
import { Tree, Table, TableColumn,Input } from 'element-ui'
const ElementUI = [Tree, Table, TableColumn,Input]

// Antd 按需
import { Drawer, Spin } from 'ant-design-vue'
const Antd = [Drawer, Spin]

// Singletons(单例组件库) 按需
import { navigation, statistics } from '@/components/singletons'
const Singletons = [navigation, statistics]

import { elFilterTree } from '@/components/element-dev'
const ElementDev = [elFilterTree]

// 捆绑注册
function* register(name) {
	Vue.use(name)
}
;[...ElementUI, ...Antd, ...Singletons,...ElementDev].forEach(component => register(component).next())

// 挂载api
import api from '@video/api'
Vue.prototype.$_api = api

// 当前模块全局 mqtt连接
import { client, listen } from '@/config/mqtt'
Vue.prototype.$_mqtt = client
Vue.prototype.$_listen = listen

/**
 * 多模块相同集中配置
 * rem响应设置 样式重置 基本过渡效果 字体文件
 */
window.moduleWidth = $_videoModuleWidth
require('@/config')

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
