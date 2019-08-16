<template>
	<div ref="fireControl" class="fireControlHt"></div>
</template>
<script>
export default {
	data() {
		return {
			localHt: null,
			dataModel: null,
			graphView: null,
			aaa: '受热器故障起火'
		}
	},
	created() {},
	mounted() {
		this.init()
		// this.getNode()
	},
	watch: {
		aaa(val) {
			console.log(val)
		}
	},
	methods: {
		init() {
			let localHt = (this.localHt = global.ht)
			let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))

			ht.Default.setImage('cloud-rect', {
				width: 300,
				height: 100,
				clip: true,
				comps: [
					{
						type: 'rect',
						rect: [0, 0, 300, 100],
						borderWidth: 2,
						borderColor: '#ffffff'
					},
					{
						type: 'text',
						text: '受热器故障起火',
						rect: [100, 0, 100, 100],
						color: '#ffffff',
						font: 'bold 36px Arial',
						align: 'center'
					}
				]
			})
			let dom = this.$refs['fireControl']

			graphView.addToDOM(dom)

			// graphView.setEditable(true);
			ht.Default.setImage('toArrow', {
				width: 100,
				height: 50,
				comps: [
					{
						type: 'shape',
						points: [2, 25, 30, 25],
						borderWidth: 4,
						borderColor: 'rgba(255, 0, 0, 0.9)'
					},
					{
						type: 'shape',
						points: [30, 10, 30, 40, 50, 25, 30, 10],
						background: 'rgba(255, 0, 0, 0.9)',
						borderWidth: 1,
						borderColor: 'red',
						gradient: 'spread.vertical',
						gradientColor: 'rgba(255, 255, 255, 0.9)'
					}
				]
			})
			ht.Default.setImage('fromArrow', {
				width: 100,
				height: 50,
				comps: [
					{
						type: 'image',
						name: 'toArrow',
						rect: [0, 0, 100, 50],
						rotation: Math.PI
					}
				]
			})
			// graphView.setEditable(true);可编辑

			this.createEdgeModel()
		},
		createNode(x, y, name, style) {
			let node = new ht.HtmlNode()
			node.s({
				shape: 'rect',
				opacity: 0,
				text: '受热器故障起火'
			})
			node.setHtml("<div class='wrapper'>" + name + '</div>')
			node.setPosition(x, y)
			if (style) {
				node.s(style)
			}
			dataModel.add(node)
			return node
		},
		createTarget(x, y) {
			let node = new ht.HtmlNode()
			node.s({
				opacity: 0
			})
			node.setHtml('')
			node.setPosition(x, y)
			dataModel.add(node)
			return node
		},
		createEdge(sourceNode, targetNode, targerPoint, count, typeOrStyle) {
			let edge
			for (let i = 0; i < count; i++) {
				edge = new ht.Edge(sourceNode, targetNode)
				if (typeof typeOrStyle === 'object') {
					edge.s(typeOrStyle)
				} else {
					edge.s('edge.type', typeOrStyle)
				}
				edge.addStyleIcon('fromArrow', {
					position: 15,
					keepOrien: false,
					width: 40,
					height: 20,
					names: [targerPoint]
				})
				let t = targerPoint == '' ? 'toArrow' : targerPoint
				edge.addStyleIcon('toArrow', {
					position: 19,
					keepOrien: true,
					width: 40,
					height: 20,
					names: [t]
				})
				dataModel.add(edge)
			}
			return edge
		},
		createEdgeModel() {
			let node1, node2

			node1 = this.createNode(80, 100, '受热器故障起火')
			node2 = this.createTarget(200, 100)
			this.createEdge(node1, node2, '', 2, {
				'edge.type': 'points',
				'edge.offset': 0
				// 'edge.points': [{
				//     x: 200,
				//     y: 0
				// }
				// ]
			})
			node1 = this.createNode(300, 50, '火灾探测器报警')
			node2 = this.createNode(300, 150, '三侧断路器分位')
			this.createEdge(node1, node2, 'toArrow', 2, {
				'edge.type': 'points',
				'edge.offset': 0,
				'edge.points': [
					{
						x: 200,
						y: 50
					},
					{
						x: 200,
						y: 150
					}
				]
			})

			let point1 = this.createTarget(430, 50)
			let point2 = this.createTarget(430, 150)
			this.createEdge(node1, point1, '', 2, {
				'edge.type': 'points',
				'edge.offset': 0
			})
			this.createEdge(node2, point2, '', 2, {
				'edge.type': 'points',
				'edge.offset': 0
			})
			this.createEdge(point1, point2, 'null', 2, {
				'edge.type': 'points',
				'edge.offset': 0
			})
			point1 = this.createTarget(430, 100)
			node1 = this.createNode(510, 100, '火灾报警灭火主机')
			this.createEdge(point1, node1, '', 2, {
				'edge.type': 'points',
				'edge.offset': 0
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
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
