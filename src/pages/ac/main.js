import '@babel/polyfill'
import Vue from 'vue'
import App from '@ac/App.vue'
import router from '@ac/router'
import store from '@ac/store'

// iView 全局(按需的话低版本会出问题，已经比原版小1M)
import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

// ElementUI 按需
import {
	Loading,
	Scrollbar,
	Input,
	Tree,
	Table,
	TableColumn,
	Option,
	Tag,
	Select,
	Button as eButton,
	ButtonGroup as eButtonGroup,
	Popover
} from 'element-ui'
const ElementUI = [Loading, Scrollbar, Input, Tree, Table, Select, Option, TableColumn, Tag, Popover]
ElementUI.push(eButton)
ElementUI.push(eButtonGroup)

// Antd 按需
import { Icon, Button, Card } from 'ant-design-vue'
const Antd = [Icon, Button, Card]

// Singletons(单例组件库) 按需
import { sideMenu, horMenu, crumbs, statistics } from '@/components/singletons'
const Singletons = [sideMenu, horMenu, crumbs, statistics]

// ElementDev 按需
import { elFilterTree } from '@/components/element-dev'
const ElementDev = [elFilterTree]

// iviewDev 按需
import { ocxModal, ocxMessage } from '@/components/iview-dev'
const iviewDev = [ocxModal, ocxMessage]

// Business(常规业务组件库) 按需
import { acHistoryModal } from '@/components/business'
const Business = [acHistoryModal]

// NativeUI 原生组件库
import { chart } from '@/components/native-ui'
const NativeUI = [chart]

// 捆绑注册
function* register(name) {
	Vue.use(name)
}
;[...ElementUI, ...Antd, ...Singletons, ...ElementDev, ...iviewDev, ...Business, ...NativeUI].forEach(component =>
	register(component).next()
)

// 挂载api
import api from '@ac/api'
Vue.prototype.$_api = api

// 当前模块全局 mqtt连接
import { client, listen } from '@/config/mqtt'
Vue.prototype.$_mqtt = client
Vue.prototype.$_listen = listen

// 地图
import BaiduMap from '../../components/native/gismap/index'
Vue.use(BaiduMap)

// 图表
import echarts from 'echarts/dist/echarts.min.js'
Vue.prototype.$_echarts = echarts

/**
 * 多模块相同集中配置
 * rem响应设置 样式重置 基本过渡效果 字体文件
 */
window.moduleWidth = $_acModuleWidth
require('@/config')

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
