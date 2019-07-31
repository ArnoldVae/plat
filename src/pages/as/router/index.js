import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import inspection from './inspection'

const router = new Router({
	routes: [...inspection]
})
router.beforeEach((to, from, next) => {
	next()
})
router.afterEach(to => {
	if (to.meta.title) window.document.title = to.meta.title
	window.scrollTo(0, 0)
})

export default router
