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
        created() {
        },
        mounted() {

            this.init()
        },
        watch: {
        },
        methods: {
            init(url) {
                document.getElementById('main').innerHTML = "";
                let localHt = (this.localHt = global.ht)
                let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
                dataModel.enableAnimation();
                let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))
                let dom = this.$refs['view-main']

                graphView.addToDOM(dom)
                graphView.reset()




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
                    console.log("移动" + data);
                    return false
                })
                const  getUrl=url?url:'./ht/drawingList/qinhuaibian.json'
                ht.Default.xhrLoad(getUrl, res => {
                    let json = ht.Default.parse(res)
                    dataModel.deserialize(json)
                    // var node4 = new ht.Node();
                    // node4._counter = 0;
                    // node4.setAnimation({
                    //     hide: {
                    //         property: "opacity",
                    //         accessType: "style",
                    //         from: 1,
                    //         to: 0,
                    //         frames: 20,
                    //         next: "show"
                    //     },
                    //     show: {
                    //         property: "opacity",
                    //         accessType: "style",
                    //         from: 0,
                    //         to: 1,
                    //         frames: 20,
                    //         next: "hide",
                    //         onComplete: function() {
                    //
                    //             if (this._counter >= 10) {
                    //                 this.setAnimation(null);
                    //             }
                    //         }
                    //     },
                    //     start: ["hide"]
                    // });
                    //
                    // node4.setPosition(600, 300);
                    // dataModel.add(node4);

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
                            console.log(targetTag)
                            console.log(e.data.a('vc_SourceID'))
                            console.log(e.data.a('i_NodeType'))
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
        height: 800px;
        position: relative;
    }
</style>


