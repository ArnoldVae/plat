const types = {
	control: {
		unload: 'removeControl'
	},
	layer: {
		unload: 'removeTileLayer'
	},
	overlay: {
		unload: 'removeOverlay'
	},
	contextMenu: {
		unload: 'removeContextMenu'
	}
}

const getParent = $component =>
	$component.abstract || $component.$el == $component.$children[0].$el ? getParent($component.$parent) : $component

function destroryInstance() {
	const { unload, renderByParent, $parent } = this
	if (renderByParent) {
		$parent.reload()
	}
	unload()
}
class Mixin {
	constructor(prop) {
		this.methods = {
			ready() {
				const $parent = getParent(this.$parent)
				const BMap = (this.BMap = $parent.BMap)
				const map = (this.map = $parent.map)
				this.load()
				this.$emit('ready', {
					BMap,
					map
				})
			},
			transmitEvent(e) {
				this.$emit(e.type.replace(/^on/, ''), e)
			},
			reload() {
				this &&
					this.BMap &&
					this.$nextTick(() => {
						this.unload()
						this.$nextTick(this.load)
					})
			},
			unload() {
				const { map, originInstance } = this
				switch (prop.type) {
					case 'search':
						originInstance.clearResults && originInstance.clearResults()
						break
					case 'autoComplete':
					case 'lushu':
						originInstance.dispose && originInstance.dispose()
						break
					case 'markerClisterer':
						originInstance.clearMarker && originInstance.clearMarker()
						break
					default:
						map[types[prop.type].unload] && map[types[prop.type].unload](originInstance)
						break
				}
			}
		}
		this.computed = {
			renderByParent() {
				return this.$parent.preventChildrenRender
			}
		}
		this.mounted = function() {
			const $parent = getParent(this.$parent)
			const map = $parent.map
			const { ready } = this
			map ? ready() : $parent.$on('ready', ready)
		}
		this.destoryed = destroryInstance
		this.beforeDestory = destroryInstance
	}
}

export default type =>
	new Mixin({
		type
	})
