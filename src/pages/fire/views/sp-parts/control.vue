<template>
    <div id="control">
        <div>
            <img src="../../assets/img/title.png" alt="">
            <span>主设备监视</span>
            <cvideo class="video" style="height: 93.5%!important;width: 3630PX!important;" :videoConfig="video1"></cvideo>
        </div>
        <div>
            <img src="../../assets/img/title.png" alt="">
            <span>消防集中监控</span>
            <cvideo class="video" style="height: 93.5%!important;" :videoConfig="video2"></cvideo>
        </div>
        <div>
            <img src="../../assets/img/title.png" alt="">
            <p></p>
            <span>消防管理</span>
<!--            <fire></fire>-->
            <iframe src="http://26.47.189.184:8087/#/main" id="myFrame" align="centet" scrolling="auto" allowtransparency="true" frameborder="0" height="100%" width="3774PX" style="position: relative;left: 13px;width: 99%"></iframe>
<!--            <iframe src="http://localhost:8087/#/main" frameborder="0" height="95%" width="3774PX"></iframe>-->
        </div>
    </div>
</template>

<script>
    import cvideo from '@/components/native/video/OcxVideo'
    import  fire from '@fire/views/main-check'

    export default {
        name: 'control',
        data() {
            return {
                video1: {
                    deviceInfo: $_fireVideoCofig.masterDevURL3,
                    isAutoPlay: true,
                    serviceInfo: $_fireVideoCofig.masterSerURL3,
                    hideTool: true
                },
                video2: {
                    deviceInfo: $_fireVideoCofig.proDevUrl,
                    isAutoPlay: true,
                    serviceInfo:  $_fireVideoCofig.proSerUrl,
                    hideTool: true
                }
            }
        },
        components: {
            cvideo,
            fire
        },
        mounted() {
        },
        methods: {
        }
    }
</script>

<style scoped>
    #control {
        display: flex;
        width: 11350PX;
        height: 100vh;
        align-items: baseline;
        align-content: center;
        background: #3a4761;
        /*overflow: scroll !important;*/
    }

    #control > div > img{
        z-index: 1;
        position: relative;
        display:block;
        width:1010PX;
        height: 105PX;
        margin: auto;
    }

    #control span{
        position:relative;
        font-size: 0.5rem;
        top:-20px;
        color:#141a26;
        text-shadow: 0 4PX 1PX;
        z-index: 99999;
    }
    #control span:first-child{
        left: 60PX;
    }
    #control p{
        position: relative;
        top:-110PX;
        border-top:1px solid #ffffff ;
        width: 3773PX;
        z-index: 999999;
    }

    #control > div {
        position: relative;
        background: url("../../assets/img/sp-parts/back.png");
        display:block;
        text-align: center;
        margin-right: 12px;
        width: 3773PX;
        height:99%;
        border: 1px #ffffff solid;
        z-index: 1;
    }

    #control > div:first-child{
        width: 3640PX;
    }

    #control > div:last-child{
        position: relative;
        left: -1px;
        margin-right:0;
    }

    #control > div > .video{
        position: relative;
        top:-15px;
        z-index: 9999;
    }
    #myFrame{
        transform: translateY(-300PX);

    }
    #myFrame  > html{
        background-color: #f00;
    }
</style>
