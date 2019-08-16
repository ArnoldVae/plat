<template>
  <div>
    <div ref="view-main" id="main" class="fireControlHt"></div>
    <div class="btnBox">
      <div class="btnTitle">图例:</div>
      <div class="btnCon">
        <div class="btnConItem">
          <div>
			  <img src="../../assets/img/elec-fire/opticalBg.png" alt>
		  </div>
          <div class="con" @click="optical()">光纤测温</div>
        </div>
        <div class="btnConItem">
         <div> <img src="../../assets/img/elec-fire/fireDan.png" alt></div>
          <div class="con" @click="fieDanClick()">灭火弹</div>
        </div>
        <div class="btnConItem">
         <div> <img src="../../assets/img/elec-fire/fireQi.png" alt></div>
          <div class="con" @click="fireQiClick()">探火管</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
	name: 'ht-common',
	data() {
		return {
			localHt: null,
			dataModel: null,
			graphView: null,
			cableNodes: [],
			deviceid: '',
			nodeValue: ''
		}
	},
	created() {},
	mounted() {
		this.init();
		// this.optical()
	},
	props: {
		cablelUrl: {
			type: String
		},
		cableObj: {
			type: Object
		},
		mqttData: {
			type: Object
		}
	},
	watch: {
		cablelUrl(url) {
			// console.log(url)
			this.dataModel.clear()
			var el = this.$refs['view-main']
			var childs = el.childNodes
			for (var i = childs.length - 1; i >= 0; i--) {
				el.removeChild(childs[i])
			}
			this.init()
		},
		mqttData(data) {
			// console.log(data)
			if (data.cmd == 1001) {
				this.deviceid = data.devid
				this.nodeValue = data.value
				let tag = global.dataModel.getDataByTag(this.deviceid)
				// console.log(tag)
				//给图元添加下方文字
				if (tag != undefined) {
					if (tag.getTag() == this.deviceid) {
						tag.a('value', this.nodeValue)
						// tag.setStyle('label.color', '#fff')
						// tag.setStyle('label.font', '10px sans-serif')
						// // tag.setStyle('label.position', 100)
						// tag.setStyle('label.toggleable', false)
					}
				}
			}
		}
	},
	methods: {
		init() {
			let localHt = (this.localHt = global.ht)
			let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
			let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))
			let dom = this.$refs['view-main']
			graphView.addToDOM(dom)

			// dataModel.enableAnimation() //启用动画

			//监听窗口大小变化
			window.addEventListener('resize', e => {
				graphView.fitContent(false)
			})

			//设置图元选中时 边框的宽度
			graphView.getSelectWidth = function(data) {
				return 0
			}
			//图元移动时的回调
			graphView.setMovableFunc(data => {
				// console.log("移动" + data);
				return false
			})
			if (!this.cablelUrl.length) return
			if (process.env.NODE_ENV == 'production') {
				var http = `${$_production.request.location}/${$_production.request.javaModule}${this.cablelUrl}`
			}
			if (process.env.NODE_ENV == 'development') {
				var http = `${$_development.request.location}/${$_development.request.javaModule}${this.cablelUrl}`
			}
			ht.Default.xhrLoad(http, res => {
				let json = ht.Default.parse(res)
				// console.log(json);
				dataModel.deserialize(json)
				graphView.fitContent(true)
			})
			this.getNode()
		},
		getNode() {
			let params = {
				pageId: this.cableObj.pageId,
				unitId: '8177a787a28b4f86a103fac9a023db05'
			}
			this.$_api.statusCheck.getHtNode(params).then(res => {
				// console.log(res)
				if (res.code == 200) {
					if(res.data.length>0){
						this.cableNodes = res.data
					this.cableNodes.length && this.cableNodes.map(item => {
							setTimeout(() => {
								let node = new this.localHt.Node()
								node.setImage('ht/storage/symbols/txtIcon.json')
								node.setTag(item.vcSourceId)
								node.setId(item.vcSourceId)
								node.setPosition(parseFloat(item.fPageX) + 2, parseFloat(item.fPageY))
								node.setName(item.vcName)
								// node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
								node.setSize(10, 10)
								node.setStyle('interactive', true)
								node.a('vc_SourceID', item.vcSourceId)
								node.a('vc_Path', item.vcPath)
								node.a('i_NodeType', item.iNodeType)
								node.a('pageId', this.cableObj.pageId)
								node.setLayer(1)
								node.s('label', '')
								// node.s({
								// 	'color':'#fff'
								// })
								this.dataModel.add(node)
								this.dataModel.each(data => {
									let valueNum = item.devNodes.length > 0 ? item.devNodes[0] : '--'
									data.a('value', valueNum)
								})
							}, 800)
						})
					}
				}
			})
		},

//光纤点击
optical(){
    // debugger
    // console.log(1111);
    this.dataModel.each( data =>{
        if(data.getTag()=='sy-bg-02'){
            // console.log(data);
            if(data.getStyle('2d.visible')==false){
                let num =0
                let opticalClear=setInterval(()=>{
                    num++
                    if(num%2==0){
                        data.setStyle('2d.visible',true)
                    }else{
                        data.setStyle('2d.visible',false)
                    }
                    if(num==4){
                        clearInterval(opticalClear)
                        data.setStyle('2d.visible',true)
                    }
                },500)
                // data.setStyle('2d.visible',true)
            }else{
                data.setStyle('2d.visible',false)
            }

        }
    })
},
//灭火弹
fieDanClick(){
    this.dataModel.each( data =>{
        if(data.getTag()=='sy-bg-03'){
            if(data.getStyle('2d.visible')==false){
                let num =0
                let fieDanClear=setInterval(()=>{
                    num++
                    if(num%2==0){
                        data.setStyle('2d.visible',true)
                    }else{
                        data.setStyle('2d.visible',false)
                    }
                    if(num==4){
                        clearInterval(fieDanClear)
                        data.setStyle('2d.visible',true)
                    }
                },500)
            }else{
                data.setStyle('2d.visible',false)
            }

        }
    })
},
//探管
fireQiClick(){
    this.dataModel.each( data =>{
        if(data.getTag()=='sy-bg-01'){
            // console.log(data);
            if(data.getStyle('2d.visible')==false){
                let num =0
                let fireQiClear=setInterval(()=>{
                    num++
                    if(num%2==0){
                        data.setStyle('2d.visible',true)
                    }else{
                        data.setStyle('2d.visible',false)
                    }
                    if(num==4){
                        clearInterval(fireQiClear)
                        data.setStyle('2d.visible',true)
                    }
                },500)
            }else{
                data.setStyle('2d.visible',false)
            }

        }
    })
}

}
}
</script>

<style lang="stylus" scoped>
/deep/.wrapper {
  background: #F0EFEE;
  border: 1px solid red;
  margin: 0;
  padding: 8px 20px;
}

.fireControlHt {
  margin-left: 20px;
  margin-top: 20px;
  width: 98%;
  height: 880px;
  position: relative;
}

.btnBox {
  position: absolute;
  bottom: 120px;
  right: 10px;
  width: 300px;
  height: 50px;
  color #fff;
  font-size 35px;
  .btnCon{
	.btnConItem{
		display flex;
		cursor pointer;
        user-select none;
		.con{
			margin-left 20px;
		}
	}
  }
}
</style>


