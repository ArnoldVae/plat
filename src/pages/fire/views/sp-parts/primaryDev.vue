<template>
    <div id="video">
        <div>
            <img @click="changeVideo" src="../../assets/img/title.png" alt="">
            <span @click="changeVideo" >主设备监视</span>
            <video height="93.5%" width="100%" @click="play" class="video" v-if="!showFlag">
                <source :src="$_fireVideoCofig.masterRecUrl" type="video/mp4">
            </video>
            <cvideo class="video" v-if="showFlag" :videoConfig="video1" style="height: 93.5%!important;width: 3630PX!important;"></cvideo>
        </div>
        <div>
            <img @click="changeVideo"  src="../../assets/img/title.png" alt="">
            <span @click="changeVideo" >一键顺控主机</span>
            <video height="93.5%" width="100%" @click="play" class="video" v-if="!showFlag">
                <source :src="$_fireVideoCofig.masterControlRecUrl" type="video/mp4">
            </video>
            <cvideo  v-if="showFlag" class="video" :videoConfig="video2" style="height: 93.5%!important;"></cvideo>
        </div>
        <div>
            <img  @click="changeVideo" src="../../assets/img/title.png" alt="">
            <span @click="changeVideo" >一键顺控视频主机</span>
            <video height="93%.5" width="100%" @click="play" class="video" v-if="!showFlag">
                <source :src="$_fireVideoCofig.masterControlVideoRecUrl" type="video/mp4">
            </video>
            <cvideo v-if="showFlag" class="video" :videoConfig="video3" style="height: 93.5%!important;"></cvideo>
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
              showFlag:true,
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
            changeVideo(){
                this.showFlag=!this.showFlag
            },
            play(){
                this.doc[0].play();
                this.doc[1].play();
                this.doc[2].play()
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