import '@babel/polyfill'
import Vue from 'vue'
import App from '@as/App.vue'
import router from '@as/router'
import store from '@as/store'

// iView 全局(按需的话低版本会出问题，已经比原版小1M)
import iView from 'iview/dist/iview.min.js'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

// ElementUI 按需
import { Select, Input, Table, Option,Button,TableColumn , Tree,Form,FormItem,Radio,RadioGroup,Checkbox,CheckboxGroup,Progress,Loading} from 'element-ui'
const ElementUI = [Table, Select, Input, Option,Button,TableColumn,Tree,Form,FormItem,Radio,RadioGroup,Checkbox,CheckboxGroup,Progress,Loading]

// ElementDev 按需
import { elFilterTree } from '@/components/element-dev'
const ElementDev = [elFilterTree]

// Antd 按需
/*import { A1, A2 } from 'ant-design-vue'
const Antd = [ A1, A2 ]*/

// Singletons(单例组件库) 按需
import { statistics } from '@/components/singletons'
Vue.use(statistics)

// iviewDev 按需
import { ocxModal, ocxMessage } from '@/components/iview-dev'
const iviewDev = [ocxModal, ocxMessage]

// 捆绑注册
function* register(name) { Vue.use(name) }
[ ...ElementUI,...ElementDev,...iviewDev].forEach( component => register(component).next() )

// 全局引用map组件
import BaiduMap from '../../components/native/gismap/index'
Vue.use(BaiduMap)

// 图表
import echarts from 'echarts/dist/echarts.min.js'
Vue.prototype.$_echarts = echarts

// 挂载api
import api from '@as/api'
Vue.prototype.$_api = api

// 当前模块全局 mqtt连接
import { client, listen } from '@/config/mqtt'
Vue.prototype.$_mqtt = client
Vue.prototype.$_listen = listen

//全局使用放大镜
import VuePhotoZoomPro from 'vue-photo-zoom-pro'
import 'vue-photo-zoom-pro/dist/vue-photo-zoom-pro'
Vue.use(VuePhotoZoomPro)

/**
 * 多模块相同集中配置
 * rem响应设置 样式重置 基本过渡效果 字体文件
 */
require('@/config')

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
