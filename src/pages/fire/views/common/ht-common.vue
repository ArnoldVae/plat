<template>
    <div ref="view-main"
         id="main"
         class="fireControlHt">
    </div>
</template>
<script>
    export default {
        name:"ht-common",
        data() {
            return {
            }
        },
        props:{
        //    url:{
        //        type:String,
        //        default:''
        //    } 
        },
        created() {
        },
        mounted() {
            this.init()
        },
        watch: {
            url:{
                handler(val){
                    console.log(val);
                    this.init(val)
                }
            }
        },
        methods: {
            init(url) {
                // console.log(url);
                let localHt = (this.localHt = global.ht)
                let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
                let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))
                let dom = this.$refs['view-main']

                graphView.addToDOM(dom)
                graphView.reset()
                 graphView.setScrollBarSize(0);
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
                const  getUrl=url?url:'./ht/drawingList/map.json'

                ht.Default.xhrLoad(getUrl, res => {
                    let json = ht.Default.parse(res)
                    dataModel.deserialize(json)

                    graphView.fitContent(true)
                })

                graphView.mi(e => {
                    let eType = e.kind,
                        eData = e.data,
                        part = e.part,
                        event = e.event
                    if (eType === 'clickData') {
                        if (e.data.a('vc_SourceID')) {
                            let targetTag = eData.getTag()
                            // console.log(targetTag)
                            // console.log(e.data.a('vc_SourceID'))
                            // console.log(e.data.a('i_NodeType'))
                        }
                    }
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


