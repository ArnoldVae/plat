<template>
    <div id="video">
        <div>
            <div @dblclick="changeVideo('img1')" style="height: 105PX; width: 1800PX;position: absolute">

            </div>
            <div @dblclick="changeVideo('img2')" style="height: 105PX;left: 1800PX;  width: 1800PX;position: absolute">

            </div>
            <img @dblclick="changeVideo('video')" src="../../assets/img/title.png" alt="">
            <span @dblclick="changeVideo('video')" >主设备监视</span>
            <video height="93.5%" controls="true" width="100%" @click="play(0)" class="video" v-if="showFlag=='ocx'" >
                <source src="http://26.47.189.184:9000/1.mp4" type="video/mp4">
            </video>
            <img v-if="showFlag=='img1'" :src="picUrl" style="width: 3634PX;margin-top: -118PX; height: 93.45vh;" alt="">
            <img v-if="showFlag=='img2'" :src="picUrl2" style="width: 3634PX;margin-top: -118PX; height: 93.45vh;" alt="">
            <cvideo class="video"  v-if="showFlag=='rec'" :videoConfig="video1" style="height: 93.5%!important;width: 3630PX!important;"></cvideo>
        </div>
        <div>
            <img @dblclick="changeVideo('video')"  src="../../assets/img/title.png" alt="">
            <span @dblclick="changeVideo('video')" >一键顺控主机</span>
            <video height="93.5%"  controls="true" width="100%" @click="play(1)" class="video" v-if="showFlag2=='ocx'">
                <source src="http://26.47.189.184:9000/2.mp4" type="video/mp4">
            </video>
            <cvideo   v-if="showFlag2=='rec'" class="video" :videoConfig="video2" style="height: 93.5%!important;"></cvideo>
        </div>
        <div>
            <img  @dblclick="changeVideo('video')" src="../../assets/img/title.png" alt="">
            <span @dblclick="changeVideo('video')" >视频主机</span>
            <video height="93%.5"  controls="true"  width="100%" @click="play(2)" class="video" v-if="showFlag3=='ocx'">
                <source src="http://26.47.189.184:9000/3.mp4" type="video/mp4">
            </video>
            <cvideo  v-if="showFlag3=='rec'" class="video" :videoConfig="video3" style="height: 93.5%!important;"></cvideo>
        </div>
    </div>
</template>

<script>
    import cvideo from '@/components/native/video/OcxVideo'
    export default {
        name: "video",
        data(){
          return{
              doc:document.getElementsByClassName('video'),
              isPause:false,
              showFlag:'rec',
              showFlag2:'rec',
              showFlag3:'rec',
              modifyFlag:false,
              picUrl:require('../../../../../public/img/yjsk1.png'),
              picUrl2:require('../../../../../public/img/yjsk2.png'),
              video1:{
                  deviceInfo: $_fireVideoCofig.masterDevURL,
                  isAutoPlay: true,
                  serviceInfo:  $_fireVideoCofig.masterSerURL,
                  hideTool: true
              },
              video2:{
                  deviceInfo: $_fireVideoCofig.masterControlDevUrl,
                  isAutoPlay: true,
                  serviceInfo: $_fireVideoCofig.masterControlSerUrl,
                  hideTool: true
              },
              video3:{
                  deviceInfo: $_fireVideoCofig.masterControlVideoDevUrl,
                  isAutoPlay: true,
                  serviceInfo: $_fireVideoCofig.masterControlVideoSerUrl,
                  hideTool: true
              }
          }
        },
        methods:{
            changeVideo(target){
                if(target=='video') {
                    this.showFlag = this.showFlag2 == 'rec' ? 'ocx' : 'rec'
                    this.showFlag2 = this.showFlag2 == 'rec' ? 'ocx' : 'rec'
                    this.showFlag3 = this.showFlag3 == 'rec' ? 'ocx' : 'rec'
                }else if(target=='img1') {
                    this.showFlag=this.showFlag=='img1'?this.showFlag2:'img1'
                }else {
                    this.showFlag=this.showFlag=='img2'?this.showFlag2:'img2'
                }
            },
            play(index){
                if(this.isPause){
                    this.doc[0].pause();
                    this.doc[1].pause();
                    this.doc[2].pause();
                    this.isPause=!this.isPause
                }else {
                    this.doc[0].play();
                    this.doc[1].play();
                    this.doc[2].play();
                    this.isPause=!this.isPause
                }


            },
        },
        components: {
            cvideo,
        },
    }
</script>

<style scoped>
    #video {
        overflow-y:hidden;
        display: flex;
        width: 11320PX;
        height: 100vh;
        align-items: baseline;
        background: #3a4761;
    }

    #video img {
        z-index: 1;
        position: relative;
        display: block;
        width:1010PX;
        height: 105PX;
        margin: auto;
        cursor: pointer;
    }

    #video span {
        position:relative;
        font-size: 0.5rem;
        top:-20px;
        color:#141a26;
        text-shadow: 0 4PX 1PX;
        z-index: 99999;
    }

    #video > div {
        background: url("../../assets/img/sp-parts/back.png");
        display: block;
        text-align: center;
        margin-right:12px;
        width: 3650PX;
        height:99%;
        border: 1px #ffffff solid;
    }

    #video >div:nth-child(2){
        width: 3780PX;
    }

    #video > div:last-child {
        width: 3780PX;
        margin-right: 0;
    }

    #video .video {
        position: relative;
        object-fit: fill;
        top: -15px;
    }
</style>
