<template>
    <div class="view-check">
        <el-container>
            <el-aside width="72%">
<!--                <htCommon ref="htCommon"></htCommon>-->
                <component v-bind:is="htCommon"  ref="htCommon"></component>
<!--                <div ref="view-main" style="margin-right: 100px">-->

<!--                </div>-->

            </el-aside>
            <el-main>
                <div class="view-check-items">
                    <el-row>
                        <el-col :span="10">
                            视图列表：
                        </el-col>
                    </el-row>
                    <div class="search-item">
                        <el-row v-for="(item,index) in subMenuList" :key="index">
                            <el-col :span="16" >
                                <span><span class="color-green">● </span>{{item.vcName}}</span>
                            </el-col>
                            <el-col :span="8" class="item-btn">
                              <el-button size="mini" @click="showHtMap(item)">
                                  查看
                              </el-button>

                            </el-col>
                        </el-row>
                    </div>


                </div>
            </el-main>
        </el-container>


    </div>

</template>

<script>
    import htCommon from '../../common/ht-common2'


    export default {
        name: "view-check",
        components: {
            htCommon
        },
        props: {},
        data() {
            return {
                current: 'fireControl-customization',
                resultData:{
                    dev:{},
                    data:[]
                },
                getId:"",
                htCommon:"htCommon",
                subMenuList:[
                    {
                        "vcName":"500kV东善桥变电站防火封堵"
                    }
                ]
            }
        },
        computed: {},
        filters: {},
        watch: {},
        created() {},
        mounted() {
            this.getCharts()
            // this.init()
            this.getNode()
        },
        activited() {},
        update() {},
        beforeDestory() {},
        methods: {
            initCharts() {
                let localHt = (this.localHt = global.ht)
                let dataModel = (global.dataModel = this.dataModel = new localHt.DataModel())
                let graphView = (this.graphView = new localHt.graph.GraphView(dataModel))
                let dom = this.$refs['view-main']
                graphView.addToDOM(dom)

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

                ht.Default.xhrLoad('./ht/drawingList/qinhuaibian.json', res => {
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
                            console.log(targetTag)
                            console.log(e.data.a('vc_SourceID'))
                            console.log(e.data.a('i_NodeType'))
                        }
                    }
                })
            },

            async getCharts(item) {
                this.getId=item&&item.id?item.id:'192fe4cec3ec4d3fb81c0d05f82bde41'
                let result = await this.$_api.statusCheck.getSubCharts({
                    unitId:this.getId,
                    subIdsStr:'1007'
                })
                if (result.success){
                    this.subMenuList=result.data
                }
            },
            getNode() {
                let params = {
                    unitId: 'f2ed1e939e6a4c8d84cc2bf0bf2503af',
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
            showHtMap(item){
                console.log(item)
                this.$refs.htCommon.init(item.vcUrl)
            },
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
    .view-check{
        width 100%
        margin 0
        padding 0
        height 670px
        .el-container{
            .el-aside{

            }
            .el-main{
                overflow hidden
                .view-check-items{
                    width 90%
                    height 700px
                    border-radius 5px
                    background: rgba(54,105,134,0.1);

                    .el-row{
                        color white
                        height 40px
                        line-height 40px
                        font-size 17px
                        padding-left 24px
                        .tool-text{
                            font-size 15px
                            text-align right
                            .color-red{
                                color red
                            }
                            .color-green{
                                color #32e611
                            }
                        }


                    }
                    .search-item{


                        .el-row{
                            .el-col{
                                font-size 15px
                                .color-green{
                                    color #19be6b
                                }
                            }
                            .item-btn{
                                text-align right
                                padding-right 10%
                                .el-button{
                                    background none
                                    border: 0.04444rem solid #00aaff;
                                    color #37a8ff
                                }
                            }

                        }


                    }


                }
            }
        }

    }

</style>
