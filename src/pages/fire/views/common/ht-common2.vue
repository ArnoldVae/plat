<template>
	<div ref="view-main" id="main" class="fireControlHt"></div>
</template>
<script>
export default {
	name: 'ht-common',
	data() {
		return {
			localHt: null,
			dataModel: null,
			graphView: null,
		}
	},
	created() {},
	mounted() {
		this.mapHt()
	},
	props:{
		htUrl:{
			type:String
		}
	},
	watch: {
		htUrl(url){
			
			// this.htUrl=url
			this.dataModel.clear()
			var el = this.$refs['view-main']
			var childs = el.childNodes
			for (var i = childs.length - 1; i >= 0; i--) {
				el.removeChild(childs[i])
			}
			this.mapHt()
		}
	},
	methods: {
		//ht
		mapHt() {
			let localHt = (this.localHt = window.ht)
			let dataModel = (this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))
			let mapHT = this.$refs['view-main']
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
			if (!this.htUrl.length) return
			this.$_api.devOps.getHtControl(this.htUrl).then(res=>{
				let json = ht.Default.parse(res)
				dataModel.deserialize(json)
				graphView.fitContent(true)
				
			})
			.catch(err=>{
				this.$ocxMessage.error('图纸丢失!!!')
			})
		}
	}
}
</script>

<style lang="stylus" scoped>

/deep/.wrapper{
    background:#F0EFEE;
    border:1px solid red;
    margin:0;
    padding:8px 20px;
}
.fireControlHt {
    margin-left 40px
    margin-top 20px
    width: 96%;
    height: 780px;
    position: relative;
	border:1px solid  #195891;
}
</style>
