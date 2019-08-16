<template>
	<div class="mapHT" ref="map-HT"></div>
</template>

<script>
export default {
	data() {
		return {}
	},
	mounted() {
		this.mapHt()
	},
	methods: {
		//ht
		mapHt() {
			let localHt = (this.localHt = window.ht)
			let dataModel = (this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))
			let mapHT = this.$refs['map-HT']
			graphView.addToDOM(mapHT)
			graphView.setMovableFunc(function() {
				return false
			})
			graphView.getSelectWidth = function() {
				return 0
			}
			graphView.setScrollBarSize(0)
			graphView.fitContent(true)
			graphView.setSelectableFunc(() => {
				return false
			})
			graphView.adjustZoom = () => {
				return 1
			}
			//添加背景
			localHt.Default.setImage('mapBg', 'ht/storage/assets/svg/no1.gif') // 背景
			localHt.Default.setImage('arrow-orange', 'ht/storage/assets/svg/no1.gif') // 箭头
			let width = graphView.getWidth()
			let height = graphView.getHeight()
			// 添加背景图片
			const MAPBG = new localHt.Node()
			MAPBG.setRect(0, 0, width, height)
			MAPBG.setImage('mapBg')
			dataModel.add(MAPBG)
		}
	}
}
</script>

<style lang="stylus" scoped>
.mapHT{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
