<template>
	<div class="layout">
		<Row type="flex" class="layout">
			<i-col span="5" class="layout-menu-left">
				<Menu
					ref="menu"
					:theme="theme"
					:accordion="accordion"
					:active-name="activeName"
					:open-names="openNames"
					:width="menuWidth"
				>
					<Submenu v-for="(router, index) in routeMap" :key="index" :name="router.name">
						<template slot="title">{{ router.name }}</template>
						<MenuItem
							v-for="(subRoute, subIndex) in router.children || []"
							:key="subIndex"
							:name="subRoute.name"
							:to="{ name: subRoute.name }"
							>{{ subRoute.name }}</MenuItem
						>
					</Submenu>
				</Menu>
			</i-col>
			<i-col span="19">
				<div class="layout-content">
					<div class="layout-content-main">
						<router-view></router-view>
					</div>
				</div>
			</i-col>
		</Row>
	</div>
</template>

<style>
html,
body {
	height: 100%;
}
.layout {
	background: #292b31;
	height: 100%;
	width: 100%;
}
.layout-content,
.layout-content-main {
	height: 100%;
}
</style>

<script>
import routeMap from '../../router/componentsRouter/gis.js'
export default {
	data() {
		return {
			theme: 'dark',
			accordion: true,
			menuWidth: 'auto',
			openNames: [],
			activeName: ''
		}
	},
	computed: {
		routeMap() {
			const ret = []
			for (const route of routeMap) {
				if (route.meta && route.meta.identifying === 'baidu-map' && !route.meta.hidden) {
					ret.push(route)
				}
			}
			return ret
		}
	},
	mounted() {
		const routes = this.routeMap
		let routeActiveName = ''
		// 获取当前路由信息
		const getActiveName = function(route) {
			if ((route.children || []).length > 0) {
				let activeRoute = ''
				route.children.forEach(
					function(item) {
						const isActiveName = getActiveName.call(this, item)
						if (isActiveName) {
							this.openNames.push(item.name)
							activeRoute = item.name
						}
					}.bind(this)
				)
				return activeRoute !== ''
			} else {
				if (route.name == routeActiveName) {
					this.activeName = route.name
					return true
				}
				return false
			}
		}
		if (routes.length) {
			routeActiveName = routes[0].path.toLowerCase() == this.$route.path.toLowerCase() ? '' : this.$route.name
			if (routeActiveName == '') {
				this.openNames = [routes[0].name]
				this.activeName = (routes[0].children || []).length > 0 ? routes[0].children[0].name : ''
				this.$router.push(routes[0].children[0])
			} else {
				routes.forEach(
					function(item) {
						const isActiveName = getActiveName.call(this, item)
						if (isActiveName) {
							this.openNames.push(item.name)
						}
					}.bind(this)
				)
			}

			this.$nextTick(() => {
				this.$refs.menu.updateOpened()
				this.$refs.menu.updateActiveName()
			})
		}
	}
}
</script>
