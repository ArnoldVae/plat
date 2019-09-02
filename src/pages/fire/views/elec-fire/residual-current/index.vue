<template>
	<div class="residual-current">
		<el-aside width="100%">
			<component 
            v-bind:is="htCommon" 
            ref="htCommon"
            :residualUrl='residualUrl'
            :mqttData='mqttData'
            :residualObj='residualObj'></component>
		</el-aside>
		
	</div>
</template>

<script>
import htCommon from '../../common/residual-current-ht'
export default {
	name: 'residual-current',
	components: {
		htCommon
	},
	props: {},
	data() {
		return {
            unitId:'8177a787a28b4f86a103fac9a023db05',
			current: 'fireControl-customization',
			resultData: {
				dev: {},
				data: []
            },
            topicArr: 'qif/zf/app/',
            topicStr: '',
            residualUrl:'',
            mqttData:{},
            residualObj:{},
			getId: '',
			htCommon: 'htCommon'
		}
	},
	computed: {},
	filters: {},
	watch: {},
	created() {
      this.getHtMap()  
    },
	mounted() {
        this.topicStr = this.topicArr + this.unitId
        // this.topicStr = this.topicArr 
        this.subscribe(this.topicStr)
        this.$_listen('residualCurrent',(topic,message,packet) =>{
            // console.log(JSON.parse(message.toString()))
            let data = ''
			let dataobj = []
			dataobj = message
			dataobj.forEach(item => {
				//将推送的报文转码
				data = data + String.fromCharCode(item)
			})
			data = JSON.parse(data)
			// console.log(data);
			// 	//如果推送上来的数据的topic和订阅的topic一致qif/zf/app/192fe4cec3ec4d3fb81c0d05f82bde41
			if (data.cmd == 1001) {
				this.mqttData = data
			}
        })
    },
	activited() {},
	update() {},
	beforeDestory() {},
	methods: {
		getNode() {
			let params = {
				unitId: this.$store.getters.unitId || '192fe4cec3ec4d3fb81c0d05f82bde41',
				pageId: '5d0a793e8f0e407cb23a089ff0bc2e53'
			}
			this.$_api.statusCheck
				.getHtFind(params)
				.then(res => {
					if (res.code == 200) {
						res.data &&
							res.data.map(item => {
								let node = new this.localHt.Node()
								// node.setImage(item.vcPath)
								node.setImage('./ht/drawingList/SF6.json')
								node.setTag(item.vcSourceId)
								node.setId(item.vcSourceId)
								node.setPosition(parseFloat(item.fPageX), parseFloat(item.fPageY))
								node.setName(item.vcName)
								node.setSize(parseFloat(item.iWidth), parseFloat(item.iHeight))
								node.a('vc_SourceID', item.vcSourceId)
								node.a('vc_Path', item.vcPath)
								node.a('i_NodeType', item.iNodeType)
								node.a('pageId', this.pageId)
								node.a('sort', item.iOrder)
								node.a('iParam1', item.iParam1)
								node.a('iParam2', item.iParam2)
								node.a('iParam3', item.iParam3)
								node.setLayer(1)
								node.s('label', '')
								this.dataModel.add(node)
							})
					}
				})
				.catch(err => {
					console.log('err', err)
				})
		},
		showHtMap(item) {
			console.log(item)
			this.$refs.htCommon.init(item.vcUrl)
        },
        subscribe(topicArr) {
			// console.log(topicArr);
			if (this.$_mqtt.connected) {
				this.$_mqtt.unsubscribe(topicArr, err => {
					if (err) {
						console.log('取消MQTT订阅失败')
					} else {
						console.log('取消MQTT订阅成功')
						this.$_mqtt.subscribe(topicArr, err => {
							if (err) {
								console.log('剩余电缆订阅失败!')
							} else {
								console.log('剩余电缆订阅成功!')
							}
						})
					}
				})
			} else {
				console.log('MQTT连接失败')
			}
        },
        //获取图纸接口
        getHtMap(){
           let params ={
               unitId:this.united,
               iSubType: '10100009'
           } 
           this.$_api.statusCheck.getSubCharts(params).then(res=>{
            //    console.log(res)
               if(res.code==200){
                   if(res.data.length){
                       for(let i=0; i<res.data.length; i++){
                           let item = res.data[i]
							if (item.vcUrl.length) {
                                this.residualObj=item
								this.residualUrl = item.vcUrl
								// return
							}
                       }
                   }
               }
           })
        }

	},
	beforeRouteEnter(to, from, next) {
		next()
	},
	beforeRouteUpdate(to, from, next) {
		next()
	},
	beforeRouteLeave(to, from, next) {
		next()
	}
}
</script>
<style lang="stylus" scoped>
$view-height = 898px;

.residual-current {
  width: 100%;
  height: 1700PX;
  background-color: #141a26;
  border: 4PX solid #d3dee6;
}
</style>
