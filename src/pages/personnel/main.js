import '@babel/polyfill'
import Vue from 'vue'
import App from '@personnel/App.vue'
import router from '@personnel/router'
import store from '@personnel/store'

// iView 全局(按需的话低版本会出问题，已经比原版小1M)
/*import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'
Vue.use(iView)*/

// ElementUI 按需
import {
	Table,
	Tree,
	TableColumn,
	Pagination,
	Dialog,
	Autocomplete,
	Dropdown,
	Input,
	Option,
	OptionGroup,
	Form, // 表单
	Container, // 布局容器
	Header, // 布局容器 header
	Aside, // 布局容器 aside
	Main, // 布局容器 main
	Footer, // 布局容器 footer
	FormItem, // 表单item
	ButtonGroup, // 按钮组
	DatePicker, // 日期选择器
	TimeSelect, // 时间选择器组
	TimePicker, // 时间选择器
	Popover, // 弹出提示框
	Radio, // 单选框 
	RadioGroup, // 单选框组 
	RadioButton, // 单选框按钮 
	Checkbox, // 复选框 
	CheckboxButton, // 复选框按钮 
	CheckboxGroup, // 复选框组 
	Switch, // 开关 
	Select, // 选择器
	Row, // Layout 布局
	Col, // Layout 布局
	Tooltip, // 文字提示
	Button
} from 'element-ui'
const ElementUI = [
	Table,
	Tree,
	TableColumn,
	Pagination,
	Dialog,
	Autocomplete,
	Dropdown,
	Input,
	Option,
	OptionGroup,
	Form, // 表单
	Container, // 布局容器
	Header, // 布局容器 header
	Aside, // 布局容器 aside
	Main, // 布局容器 main
	Footer, // 布局容器 footer
	FormItem, // 表单item
	ButtonGroup, // 按钮组
	DatePicker, // 日期选择器
	TimeSelect, // 时间选择器组
	TimePicker, // 时间选择器
	Popover, // 弹出提示框
	Radio, // 单选框 
	RadioGroup, // 单选框组 
	RadioButton, // 单选框按钮 
	Checkbox, // 复选框 
	CheckboxButton, // 复选框按钮 
	CheckboxGroup, // 复选框组 
	Switch, // 开关 
	Select, // 选择器
	Row, // Layout 布局
	Col, // Layout 布局
	Tooltip, // 文字提示,
	Button
]

// Antd 按需
/*import { A1, A2 } from 'ant-design-vue'
const Antd = [ A1, A2 ]*/

// 捆绑注册
function* register(name) { Vue.use(name) }
[ ...ElementUI ].forEach( component => register(component).next() )

import 'element-ui/lib/theme-chalk/index.css'

// import element from './elementUI/index'
// Vue.use(element)
// 挂载api
import api from '@personnel/api'
Vue.prototype.$_api = api

// 当前模块全局 mqtt连接
import { client, listen } from '@/config/mqtt'
Vue.prototype.$_mqtt = client
Vue.prototype.$_listen = listen

/**
 * 多模块相同集中配置
 * rem响应设置 样式重置 基本过渡效果 字体文件
 */
window.moduleWidth = $_personnelModuleWidth
require('@/config')

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
