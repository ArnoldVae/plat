import '@babel/polyfill'
import Vue from 'vue'
import App from '@fire/App.vue'
import router from '@fire/router'
import store from '@fire/store'

//引入基本模板
let echarts = require('echarts')
// iView 全局(按需的话低版本会出问题，已经比原版小1M)
import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'
Vue.use(iView)
require('echarts/lib/chart/pie')
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')

Vue.prototype.$_echarts = echarts

// ElementUI 按需
import {
	Tree,
	Container, // 布局容器
	Input,
	Header, // 布局容器 header
	Aside, // 布局容器 aside
	Main, // 布局容器 main
	Footer, // 布局容器 footer
	Option,
	OptionGroup,
	Row, // Layout 布局
	Select, // 选择器
	Col, // Layout 布局
	Icon as eIcon,
    Button as eButton,
	Tag,
	Dialog,
	Steps,
	Step,
	Timeline,
	TimelineItem,
	Form, //表单元素
	FormItem,
	DatePicker, //时间选择器
	Checkbox,
	CheckboxButton,
	CheckboxGroup, //多选
	Table, //Table表格
	TableColumn,
	Pagination,
	Switch,
	Upload,
} from 'element-ui'
const ElementUI = [
	Tree,
	Container, // 布局容器
	Input,
	Header, // 布局容器 header
	Aside, // 布局容器 aside
	Main, // 布局容器 main
	Footer, // 布局容器 footer
	Option,
	OptionGroup,
	Row, // Layout 布局
	Select, // 选择器
	Col, // Layout 布局
	Tag,
	Dialog, //对话框
	Steps,
	Step,
	Timeline,
	TimelineItem,
	Form, //表单元素
	FormItem,
	DatePicker, //时间选择器
	Checkbox,
	CheckboxButton,
	CheckboxGroup, //多选
	Table, //Table表格
	TableColumn,
	Pagination, //分页
	Switch,
	Upload,
]
ElementUI.push(eButton)
ElementUI.push(eIcon)
// Antd 按需
import { Icon, Button } from 'ant-design-vue'
const Antd = [Icon, Button]
// Singletons(单例组件库) 按需
import { sideMenu, horMenu, crumbs, statistics } from '@/components/singletons'
const Singletons = [sideMenu, horMenu, crumbs, statistics]
//树
import { elFilterTree } from '@/components/element-dev'
const ElementDev = [elFilterTree]
//  iviewDev 按需
import { ocxModal, ocxMessage } from '@/components/iview-dev'
const iviewDev = [ocxModal, ocxMessage]
// 捆绑注册
function* register(name) {
	Vue.use(name)
}
;[...ElementUI, ...Singletons, ...ElementDev, ...iviewDev,...Antd].forEach(component => register(component).next())

// 挂载api
import api from '@fire/api'
Vue.prototype.$_api = api

// 全局引用map组件
import BaiduMap from '../../components/native/gismap/index'
Vue.use(BaiduMap)

// 当前模块全局 mqtt连接
import { client, listen } from '@/config/mqtt'
Vue.prototype.$_mqtt = client
Vue.prototype.$_listen = listen


/**
 * 多模块相同集中配置
 * rem响应设置 样式重置 基本过渡效果 字体文件
 */
window.moduleWidth = $_fireModuleWidth
require('@/config')
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
