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

            this.mapHt()
        },
        watch: {
        },
        methods: {
            init(url) {
                ht.Default.setImage("arrow", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAKQWlDQ1BJQ0MgUHJvZmlsZQAASA2dlndUU9kWh8+9N73QEiIgJfQaegkg0jtIFQRRiUmAUAKGhCZ2RAVGFBEpVmRUwAFHhyJjRRQLg4Ji1wnyEFDGwVFEReXdjGsJ7601896a/cdZ39nnt9fZZ+9917oAUPyCBMJ0WAGANKFYFO7rwVwSE8vE9wIYEAEOWAHA4WZmBEf4RALU/L09mZmoSMaz9u4ugGS72yy/UCZz1v9/kSI3QyQGAApF1TY8fiYX5QKUU7PFGTL/BMr0lSkyhjEyFqEJoqwi48SvbPan5iu7yZiXJuShGlnOGbw0noy7UN6aJeGjjAShXJgl4GejfAdlvVRJmgDl9yjT0/icTAAwFJlfzOcmoWyJMkUUGe6J8gIACJTEObxyDov5OWieAHimZ+SKBIlJYqYR15hp5ejIZvrxs1P5YjErlMNN4Yh4TM/0tAyOMBeAr2+WRQElWW2ZaJHtrRzt7VnW5mj5v9nfHn5T/T3IevtV8Sbsz55BjJ5Z32zsrC+9FgD2JFqbHbO+lVUAtG0GQOXhrE/vIADyBQC03pzzHoZsXpLE4gwnC4vs7GxzAZ9rLivoN/ufgm/Kv4Y595nL7vtWO6YXP4EjSRUzZUXlpqemS0TMzAwOl89k/fcQ/+PAOWnNycMsnJ/AF/GF6FVR6JQJhIlou4U8gViQLmQKhH/V4X8YNicHGX6daxRodV8AfYU5ULhJB8hvPQBDIwMkbj96An3rWxAxCsi+vGitka9zjzJ6/uf6Hwtcim7hTEEiU+b2DI9kciWiLBmj34RswQISkAd0oAo0gS4wAixgDRyAM3AD3iAAhIBIEAOWAy5IAmlABLJBPtgACkEx2AF2g2pwANSBetAEToI2cAZcBFfADXALDIBHQAqGwUswAd6BaQiC8BAVokGqkBakD5lC1hAbWgh5Q0FQOBQDxUOJkBCSQPnQJqgYKoOqoUNQPfQjdBq6CF2D+qAH0CA0Bv0BfYQRmALTYQ3YALaA2bA7HAhHwsvgRHgVnAcXwNvhSrgWPg63whfhG/AALIVfwpMIQMgIA9FGWAgb8URCkFgkAREha5EipAKpRZqQDqQbuY1IkXHkAwaHoWGYGBbGGeOHWYzhYlZh1mJKMNWYY5hWTBfmNmYQM4H5gqVi1bGmWCesP3YJNhGbjS3EVmCPYFuwl7ED2GHsOxwOx8AZ4hxwfrgYXDJuNa4Etw/XjLuA68MN4SbxeLwq3hTvgg/Bc/BifCG+Cn8cfx7fjx/GvyeQCVoEa4IPIZYgJGwkVBAaCOcI/YQRwjRRgahPdCKGEHnEXGIpsY7YQbxJHCZOkxRJhiQXUiQpmbSBVElqIl0mPSa9IZPJOmRHchhZQF5PriSfIF8lD5I/UJQoJhRPShxFQtlOOUq5QHlAeUOlUg2obtRYqpi6nVpPvUR9Sn0vR5Mzl/OX48mtk6uRa5Xrl3slT5TXl3eXXy6fJ18hf0r+pvy4AlHBQMFTgaOwVqFG4bTCPYVJRZqilWKIYppiiWKD4jXFUSW8koGStxJPqUDpsNIlpSEaQtOledK4tE20Otpl2jAdRzek+9OT6cX0H+i99AllJWVb5SjlHOUa5bPKUgbCMGD4M1IZpYyTjLuMj/M05rnP48/bNq9pXv+8KZX5Km4qfJUilWaVAZWPqkxVb9UU1Z2qbapP1DBqJmphatlq+9Uuq43Pp893ns+dXzT/5PyH6rC6iXq4+mr1w+o96pMamhq+GhkaVRqXNMY1GZpumsma5ZrnNMe0aFoLtQRa5VrntV4wlZnuzFRmJbOLOaGtru2nLdE+pN2rPa1jqLNYZ6NOs84TXZIuWzdBt1y3U3dCT0svWC9fr1HvoT5Rn62fpL9Hv1t/ysDQINpgi0GbwaihiqG/YZ5ho+FjI6qRq9Eqo1qjO8Y4Y7ZxivE+41smsImdSZJJjclNU9jU3lRgus+0zwxr5mgmNKs1u8eisNxZWaxG1qA5wzzIfKN5m/krCz2LWIudFt0WXyztLFMt6ywfWSlZBVhttOqw+sPaxJprXWN9x4Zq42Ozzqbd5rWtqS3fdr/tfTuaXbDdFrtOu8/2DvYi+yb7MQc9h3iHvQ732HR2KLuEfdUR6+jhuM7xjOMHJ3snsdNJp9+dWc4pzg3OowsMF/AX1C0YctFx4bgccpEuZC6MX3hwodRV25XjWuv6zE3Xjed2xG3E3dg92f24+ysPSw+RR4vHlKeT5xrPC16Il69XkVevt5L3Yu9q76c+Oj6JPo0+E752vqt9L/hh/QL9dvrd89fw5/rX+08EOASsCegKpARGBFYHPgsyCRIFdQTDwQHBu4IfL9JfJFzUFgJC/EN2hTwJNQxdFfpzGC4sNKwm7Hm4VXh+eHcELWJFREPEu0iPyNLIR4uNFksWd0bJR8VF1UdNRXtFl0VLl1gsWbPkRoxajCCmPRYfGxV7JHZyqffS3UuH4+ziCuPuLjNclrPs2nK15anLz66QX8FZcSoeGx8d3xD/iRPCqeVMrvRfuXflBNeTu4f7kufGK+eN8V34ZfyRBJeEsoTRRJfEXYljSa5JFUnjAk9BteB1sl/ygeSplJCUoykzqdGpzWmEtPi000IlYYqwK10zPSe9L8M0ozBDuspp1e5VE6JA0ZFMKHNZZruYjv5M9UiMJJslg1kLs2qy3mdHZZ/KUcwR5vTkmuRuyx3J88n7fjVmNXd1Z752/ob8wTXuaw6thdauXNu5Tnddwbrh9b7rj20gbUjZ8MtGy41lG99uit7UUaBRsL5gaLPv5sZCuUJR4b0tzlsObMVsFWzt3WazrWrblyJe0fViy+KK4k8l3JLr31l9V/ndzPaE7b2l9qX7d+B2CHfc3em681iZYlle2dCu4F2t5czyovK3u1fsvlZhW3FgD2mPZI+0MqiyvUqvakfVp+qk6oEaj5rmvep7t+2d2sfb17/fbX/TAY0DxQc+HhQcvH/I91BrrUFtxWHc4azDz+ui6rq/Z39ff0TtSPGRz0eFR6XHwo911TvU1zeoN5Q2wo2SxrHjccdv/eD1Q3sTq+lQM6O5+AQ4ITnx4sf4H++eDDzZeYp9qukn/Z/2ttBailqh1tzWibakNml7THvf6YDTnR3OHS0/m/989Iz2mZqzymdLz5HOFZybOZ93fvJCxoXxi4kXhzpXdD66tOTSna6wrt7LgZevXvG5cqnbvfv8VZerZ645XTt9nX297Yb9jdYeu56WX+x+aem172296XCz/ZbjrY6+BX3n+l37L972un3ljv+dGwOLBvruLr57/17cPel93v3RB6kPXj/Mejj9aP1j7OOiJwpPKp6qP6391fjXZqm99Oyg12DPs4hnj4a4Qy//lfmvT8MFz6nPK0a0RupHrUfPjPmM3Xqx9MXwy4yX0+OFvyn+tveV0auffnf7vWdiycTwa9HrmT9K3qi+OfrW9m3nZOjk03dp76anit6rvj/2gf2h+2P0x5Hp7E/4T5WfjT93fAn88ngmbWbm3/eE8/syOll+AAAACXBIWXMAAABbAAAAWwHVY2oPAAACO2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD53d3cuaW5rc2NhcGUub3JnPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjMwMjEvMTMwNzwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+MzAyMS8xMzA3PC90aWZmOlhSZXNvbHV0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KK/5upgAABc9JREFUaAXtWF1sVEUUPnPvbre9UKGtxf6AJNKtDxUlyoM//FRiaFleMLj+YYiJkRYTX3z0ob0LRp80xhe2Fh9Egz99M26pBZIaI8bExETTmFLqA1ja2Er/2C3bvXvHc+be2c4uZbv9l7jT3M7cOTPnnO/8zJy7APmWt0DeAnkL5C3wf7aAvsbgtTWWv2jxzDTNlPLqeNEcV3Ejk7KeBSgzASQQmk/R5Jr5+tUOIVKQB+vqCjY/MPVOdPuhD65WFx+qNQZHB0bhsgtgwSDmA7ls9GAwKAzW+Ai8tevNNl5+eoLXftjHnz7cNBmogpdcQeSRnEFI9y2bklkYsY66Ok70hFFXP+x/BkY23BO/XFmb6N9vFk8/0Xw6cC+8jGQbHwKQE4jVBADQ2ioAcG8BcI76JcBTMJ30/lVSYfU1tBrRvc3tjZvglYWAWF0AqJlodhLti1gQg6Ux0OPcc31jRfJKQ4txa8/xcKAkd094JE+3Z8Fg6lTIIC3htQNgpB7VDYWgB3UGjcTORkiSIYgZrg+WVCZ5Y8s6P7fbA+fboHMSzuJCaWThvUwtVADEkXd0AJpnBVoP8uwxHcZ23GI8XYwEQZ6AgGn4GWtvvBjWusbgc9x0RxASgFAe8HLZ/6X5eMFNuA+3WJyrZnJkp+BJ+XGcp7F8t5SxuwWZc8xMjRkYMTEojGq+h6a96yldkUSinaaCYAdaCEQ48O0pu3P6zp4Qu+kmxMc+UL/1SKzs+U+jpdt1hnHqsHYFSDnUyzHJleNsvUujvGW2BRNVO6Bvy2MUEkzsJ7ry6MAh6WPJqolh3R8xY+siba+7IFxOuMBt7oRgzRp2wydDu3999bdNOxJgWR5gGi5EmsJ88WPMWka8sNcwc6V3M3m7wZICMU4gQrGic+GmrqgIpzQQtFxMmDjgWnHCAq9wrcfWGLOZxkRP46U+yIvr6AGmaRYCSdnQNWVGp4bTlUCLEQ+80XawHIKkpunqTFsIAJ9lFkM0gjMdcmJEhqIzO9XTWH3mo6trbc4wr8DGUyeXRiA8dDqVVloDjW8bsSePhgNbYKeJLEzTSWyZ3S4/fHVd6ng4Q5D66q4TG7PNS5pYr27KBQKeuQQibnuullUnxp46XmoXwgu008Q/ahkAxNxd9S8DAB52buw4oSTCaRaQ+uquE8Rs85Im1qubZtlmG3kw5iyfZt3/z6C35NKpG9ot+IrWSw94cOycMoKL4RzNCMPxOKYCBXxaGIgdqVAT27LRZdRQj2lMrCkRcskDnZQvYMnqG0OebV3vxowfzzRHRuAXEzmZpij6gACQWRhOQoM95fVihYWBxS3NFnkraxaZG0vvmc3VYxTlztVIeXEX4DFa03ki5usON0UmAYsSoSvpLBoBwAs4hJ94YGv61gsb+84e3Tnyu9e5yJTjItPKzn7HEzRW6ZnvLo3cyrjFJiqVi0zykT2qln4H5HSRCfH8tlLCwnn6BJFlAglRywZ6X0gp4cNSIo6lxJ5H3+t7MeIf3FBha0mu4RXjGAA7qXz1+JBec+4E3sJheQtTvpLlU9Yn8cID7iRDAHY3wCUirEgjsNj22fEjRYmbfgpVSJI+jovUsPF3nYwWXgw3K3XQbcoTLwmAxoLTipbT9SYWpCaW0z4PZ+mf42nKnzNjxvm2Y0o5PafypPRqNucKR4n7dj38zbaPBjh8gWfFGZvrn+GB8TW3qj++zvcebo66HzSkG4WN4x56m6Nl3ANzrFiJKQ2tTxmNdvXYNiTxqKyioq37ZLToh3BT51iqfJ7X8moIrYSq6TxDIbImZ4kZUZRi3WjN6Lq9eXzYW9Mdmja+Dx/rHM1deWK+mh7gwd5eEQ7eWG9PRf8FKJ+Y9D041O/1d5tTxk/h1xaqPAHIGl+0YJmb8AD9sDWx/s/QTOnB57TYtWvev39+/7s/IIKypD4UOv/ZJpWE5fhpca1Q3tU/7qpGm/eYVBfnx3kL5C2Qt0DeAnkLZFrgX2RAYvAlwgDKAAAAAElFTkSuQmCC");
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
                    // var shape7 = new ht.Shape();
                    // shape7.setPoints(new ht.List([
                    //     {x: 20, y: 0},
                    //
                    //     {x: 700, y: 0}
                    // ]));
                    // // shape7.setSegments(new ht.List([
                    // //     1, 2, 1, 2, 1, 2, 1, 2
                    // // ]));
                    // shape7.translate(20,0);
                    // shape7.setStyle("shape.background", null);
                    // shape7.setStyle("shape.border.color", "#1ABC9C");
                    // shape7.setStyle("shape.border.width", 2);
                    // shape7.s("flow", true);
                    // shape7.s("flow.count", 1);
                    // shape7.s("flow.step", 1);
                    // dataModel.add(shape7);
                    //
                    // var shape4 = new ht.Shape();
                    // shape4.setPoints(new ht.List([
                    //     {x: 0, y: 0},
                    //     {x: 200, y: 100},
                    //     {x: 400, y: 0}
                    // ]));
                    // shape4.setSegments(new ht.List([
                    //     1, 3
                    // ]));
                    // shape4.setPosition(786, 164);
                    // shape4.s("shape.background", null);
                    // shape4.s("shape.border.color", "rgb(203, 78, 7)");
                    // shape4.s("shape.border.width", 1);
                    // shape4.s("flow", true);
                    // shape4.s("flow.count", 5);
                    // shape4.s("flow.step", 1);
                    // shape4.s("flow.element.count", 2);
                    // shape4.s("flow.element.space", 30);
                    // shape4.s("flow.element.max", 30);
                    // shape4.s("flow.element.min", 30);
                    // shape4.s("flow.element.image", "arrow");
                    // shape4.s("flow.element.shadow.visible", false);
                    // shape4.s("flow.element.autorotate", true);
                    // dataModel.add(shape4);
                    graphView.fitContent(true)

                    // graphView.enableFlow(10);
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
            //ht
            mapHt(){
                let localHt = (this.localHt = window.ht);
                let dataModel = (this.dataModel = new localHt.DataModel());
                let graphView = (this.graphView = new localHt.graph.GraphView(dataModel));
                let mapHT = this.$refs["view-main"];
                graphView.addToDOM(mapHT);
                graphView.setMovableFunc(function() {
                    return false;
                });
                graphView.getSelectWidth = function() {
                    return 0;
                };
                graphView.setScrollBarSize(0);
                graphView.fitContent(true)
                graphView.setSelectableFunc(() => {
                    return false;
                });
                graphView.adjustZoom = () => {
                    return 1;
                };
                //添加背景
                localHt.Default.setImage(
                    "mapBg",
                    "ht/storage/assets/svg/01.svg"
                ); // 背景
                localHt.Default.setImage(
                    "arrow-orange",
                    "ht/storage/assets/svg/01.svg"
                ); // 箭头
                let width = graphView.getWidth();
                let height = graphView.getHeight();
                // 添加背景图片
                const MAPBG = new localHt.Node();
                MAPBG.setRect(0, 0, width, height);
                MAPBG.setImage("mapBg");
                dataModel.add(MAPBG);
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
        height: 700px;
        position: relative;
    }
</style>


