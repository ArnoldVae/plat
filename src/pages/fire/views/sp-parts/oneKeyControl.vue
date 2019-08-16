<template>
    <div id="buttonControl">
        <div>
            <img src="../../assets/img/title.png" alt="">
            <span>二次设备监视</span>
            <cvideo class="video" :videoConfig="video2" style="height: 93.5%!important;width: 3630PX!important;"></cvideo>
        </div>
        <div>
            <img src="../../assets/img/title.png" alt="">
            <span>主设备监视</span>
            <cvideo class="video" :videoConfig="video1" style="height: 93.5%!important;"></cvideo>
        </div>
        <div>
            <img src="../../assets/img/title.png" alt="">
            <span>网络安全</span>
            <cvideo class="video" :videoConfig="video3" style="height: 93.5%!important;"></cvideo>
        </div>
    </div>
</template>

<script>
    import cvideo from '@/components/native/video/OcxVideo'
    export default {
        name: "buttonControl",
        data(){
            return{
                video1:{
                    deviceInfo: '2|22.46.34.114:37781|admin:admin123|27',
                    isAutoPlay: true,
                    serviceInfo: '1$22.46.34.114$6800$admin$admin',
                    hideTool: true
                },
                video2:{
                    deviceInfo: '2|22.46.34.114:37781|admin:admin123|30',
                    isAutoPlay: true,
                    serviceInfo: '1$22.46.34.114$6800$admin$admin',
                    hideTool: true
                },
                video3:{
                    deviceInfo: '2|22.46.34.114:37781|admin:admin123|29',
                    isAutoPlay: true,
                    serviceInfo: '1$22.46.34.114$6800$admin$admin',
                    hideTool: true
                }
            }
        },
        components: {
            cvideo,
        },
    }
</script>

<style scoped>
    #buttonControl {
        display: flex;
        width: 11350PX;
        height: 100vh;
        align-items: baseline;
        align-content: center;
        background: #3a4761;
        /*overflow: scroll !important;*/
    }

    #buttonControl > div > img{
        z-index: 1;
        position: relative;
        display:block;
        width:1010PX;
        height: 105PX;
        margin: auto;
    }

    #buttonControl span{
        position:relative;
        font-size: 0.5rem;
        top:-20px;
        color:#141a26;
        text-shadow: 0 4PX 1PX;
        z-index: 99999;
    }
    #buttonControl span:first-child{
        left: 60PX;
    }

    #buttonControl > div {
        position: relative;
        background: url("../../assets/img/sp-parts/back.png");
        display:block;
        text-align: center;
        margin-right: 12px;
        width: 3773PX;
        height:99%;
        border: 1px #ffffff solid;
        z-index: 1;
        /*left: -10px*/
    }

    #buttonControl > div:first-child{
        width: 3640PX;
    }

    #buttonControl > div:last-child{
        position: relative;
        left: -1px;
        /*width: 3773PX;*/
        margin-right:0;
    }

    #buttonControl > div > .video{
        position: relative;
        top:-15px;
        z-index: 9999;
    }
</style>