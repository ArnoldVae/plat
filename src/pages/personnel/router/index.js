import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import personnel from './personnel'

const router = new Router({
	routes: [...personnel]
})
router.beforeEach((to, from, next) => {
	next()
})
router.afterEach(to => {
	if (to.meta.title) window.document.title = to.meta.title
	window.scrollTo(0, 0)
})

export default router
