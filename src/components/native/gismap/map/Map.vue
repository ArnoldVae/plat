<template>
  <div class="baidu-map-contaier">
    <div v-if="!hasBmView" ref="view" style="width: 100%; height: 100%"></div>
    <slot></slot>
  </div>
</template>

<style>
.baidu-map-contaier {
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>

<script>
import bindEvents from "../base/bindEvent.js";
import { checkType, isIE } from "../base/utils.js";
import { createPoint } from "../base/factory.js";

export default {
  name: "bm-map",
  data() {
    return {
      hasBmView: false
    };
  },
  props: {
    center: {
      // 设置初始中心点
      type: [Object, String]
    },
    zoom: {
      // 默认缩放级别
      type: Number
    },
    minZoom: {
      // 最小缩放级别
      type: Number
    },
    maxZoom: {
      // 最大缩放级别
      type: Number
    },
    highResolution: {
      // 是否使用高分辨率底图
      type: Boolean,
      default: true
    },
    mapClick: {
      type: Boolean,
      default: true
    },
    mapType: {
      // 地图类型
      type: String
    },
    dragging: {
      // 可拖拽
      type: Boolean,
      default: true
    },
    scrollWheelZoom: {
      // 鼠标滚轮是否开启
      type: Boolean,
      default: false
    },
    doubleClickZoom: {
      // 双击放大，默认启用
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    inertialDragging: {
      // 地图惯性拖拽
      type: Boolean,
      default: true
    },
    continuousZoom: {
      // 连续缩放
      type: Boolean,
      default: true
    },
    pinchToZoom: {
      type: Boolean,
      default: true
    },
    autoResize: {
      // 自动适应容器尺寸变化
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      default: ""
    },
    viewportMargins: {
      // 视野调整的预留边距
      type: Array,
      default() {
        return [30, 20, 30, 20];
      }
    },
    viewports: {
      type: Array
    }
  },
  watch: {
    center(val, oldVal) {
      const { map, zoom } = this;
      if (checkType(val) === "String" && val !== oldVal) {
        map.centerAndZoom(val, zoom);
      }
    },
    "center.lng"(val, oldVal) {
      const { BMap, map, zoom, center } = this;
      if (val !== oldVal && val >= -180 && val <= 180) {
        map.centerAndZoom(new BMap.Point(val, center.lat), zoom);
      }
    },
    "center.lat"(val, oldVal) {
      const { BMap, map, zoom, center } = this;
      if (val !== oldVal && val >= -74 && val <= 74) {
        map.centerAndZoom(new BMap.Point(center.lng, val), zoom);
      }
    },
    zoom(val, oldVal) {
      const { map } = this;
      if (val !== oldVal && val >= 6 && val <= 16) {
        map.setZoom(val);
      }
    },
    minZoom(val) {
      const { map } = this;
      map.setMinZoom(val);
    },
    maxZoom(val) {
      const { map } = this;
      map.setMaxZoom(val);
    },
    highResolution() {
      this.reset();
    },
    mapClick() {
      this.reset();
    },
    dragging(val) {
      const { map } = this;
      val ? map.enableDragging() : map.disableDragging();
    },
    scrollWheelZoom(val) {
      const { map } = this;
      val ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom();
    },
    doubleClickZoom(val) {
      const { map } = this;
      val ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom();
    },
    keyboard(val) {
      const { map } = this;
      val ? map.enableKeyboard() : map.disableKeyboard();
    },
    inertialDragging(val) {
      const { map } = this;
      val ? map.enableInertialDragging() : map.disableInertialDragging();
    },
    continuousZoom(val) {
      const { map } = this;
      val ? map.enableContinuousZoom() : map.disableContinuousZoom();
    },
    pinchToZoom(val) {
      const { map } = this;
      val ? map.enablePinchToZoom() : map.disablePinchToZoom();
    },
    autoResize(val) {
      const { map } = this;
      val ? map.enableAutoResize() : map.disableAutoResize();
    },
    theme() {
      this.reset();
    },
    viewportMargins(val) {
      this.map.setViewport(
        this.viewports.map(item => {
          if (item.lng && item.lat) {
            return createPoint(this.BMap, item);
          }
        }),
        {
          margins: val || []
        }
      );
    },
    viewports: {
      deep: true,
      handler(val) {
        // 根据当前的点自动适应层级和范围
        this.map.setViewport(
          val.map(
            function(item) {
              if (item.lng && item.lat) {
                return createPoint(this.BMap, item);
              }
            }.bind(this)
          ),
          {
            margins: this.viewportMargins || []
          }
        );
      }
    }
  },
  methods: {
    // 设置地图的初始属性
    setMapOption() {
      const {
        map,
        minZoom,
        maxZoom,
        dragging,
        scrollWheelZoom,
        doubleClickZoom,
        keyboard,
        inertialDragging,
        continuousZoom,
        pinchToZoom,
        autoResize
      } = this;
      minZoom && map.setMinZoom(minZoom);
      maxZoom && map.setMaxZoom(maxZoom);
      dragging ? map.enableDragging() : map.disableDragging();
      scrollWheelZoom
        ? map.enableScrollWheelZoom()
        : map.disableScrollWheelZoom();
      doubleClickZoom
        ? map.enableDoubleClickZoom()
        : map.disableDoubleClickZoom();
      keyboard ? map.enableKeyboard() : map.disableKeyboard();
      inertialDragging
        ? map.enableInertialDragging()
        : map.disableInertialDragging();
      continuousZoom ? map.enableContinuousZoom() : map.disableContinuousZoom();
      pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom();
      autoResize ? map.enableAutoResize() : map.disableAutoResize();
    },
    init(BMap) {
      if (this.map) {
        return;
      }
      let $el = this.$refs.view;
      if ($el) {
        for (let $node of this.$slots.default || []) {
          if (
            $node.componentOptions &&
            $node.componentOptions.tag === "bm-view"
          ) {
            this.hasBmView = true;
            $el = $node.elm;
          }
        }
        // 初始化百度地图
        const map = new BMap.Map($el, {
          enableHighResolution: this.highResolution,
          enableMapClick: this.mapClick
        });
        this.map = map;
        global.map = map;
        const { setMapOption, zoom, getCenterPoint } = this;

        setMapOption();
        bindEvents.call(this, map);

        map.centerAndZoom(getCenterPoint(), zoom);
        this.viewports &&
          this.viewports.length > 0 &&
          this.map.setViewport(
            this.viewports.map(item => {
              if (item.lng && item.lat) {
                return createPoint(this.BMap, item);
              }
            })
          );

        // 地图全部加载完成，通知父级组件
        this.$emit("ready", { BMap, map });
      }
    },
    // 获取地图中心点
    getCenterPoint() {
      const { center, BMap } = this;
      switch (checkType(center)) {
        case "String":
          return center;
        case "Object":
          return new BMap.Point(center.lng, center.lat);
        default:
          return new BMap.Point();
      }
    },
    initMap(BMap) {
      this.BMap = BMap;
      this.init(BMap);
    },
    // 动态加载百度地图离线库script
    getMapScript() {
      if (!global.BMap) {
        // 没有加载地图，先加载地图
        global.BMap = {};
        global.BMap._preloader = new Promise(resolve => {
          global._initBaiduMap = function() {
            // js库加载成功后，产生一个全局变量BMap
            resolve(global.BMap);
            global.document.body.removeChild($script);
            global.BMap._preloader = null;
            global._initBaiduMap = null;
          };

          // 创建script标签
          var $script = document.createElement("script");
          $script.setAttribute("type", "text/javascript");
          global.document.body.appendChild($script);
          if (isIE()) {
            // IE下监听script标签加载事件
            $script.onreadystatechange = function() {
              if (
                this.readyState == "loaded" ||
                this.readyState == "complete"
              ) {
                global._initBaiduMap && global._initBaiduMap();
              }
            };
          } else {
            // 非IE监听script标签加载事件
            $script.onload = function() {
              global._initBaiduMap && global._initBaiduMap();
            };
          }

          // 加载离线js库
          $script.setAttribute("src", "assets/libs/gismap/offlinemap.js");
        });
        return global.BMap._preloader;
      } else if (!global.BMap._preloader) {
        //
        return Promise.resolve(global.BMap);
      } else {
        return global.BMap._preloader;
      }
    },
    // 动态加载百度地图的样式
    getMapCss() {
      if (!global.BMap._preloaderLink) {
        global.BMap._preloaderLink = new Promise(resolve => {
          var $link = document.createElement("link");
          $link.setAttribute("rel", "stylesheet");
          $link.setAttribute("type", "text/css");
          global.document.head.appendChild($link);
          $link.setAttribute("href", "assets/libs/gismap/css/offlinemap.css");
          global.BMap._preloaderLink = "loaded";
          resolve();
        });
      }
    },
    // 加载地图
    reset() {
      const {  getConfig,getMapScript, getMapCss, initMap } = this;
      // getMapScript().then(getMapCss()).then(initMap)
      //先加载地图瓦片配置，再加载离线包，最后加载样式
      getConfig().then(
        getMapScript()
          .then(getMapCss())
          .then(initMap)
      );
    },
    // 加载地图所需要的路径信息
    getConfig() {
      if (!global.mapconfig) {
        return new Promise((resolve, reject) => {
          const loadMapConfig = function() {
            global.mapconfig = mapConfig;
            resolve();
            global.document.body.removeChild($script);
          };

          let $script = document.createElement("script");
          $script.setAttribute("type", "text/javascript");
          global.document.body.appendChild($script);
          if (isIE()) {
            // IE下监听script标签加载事件
            $script.onreadystatechange = function() {
              if (
                this.readyState == "loaded" ||
                this.readyState == "complete"
              ) {
                loadMapConfig();
              }
            };
          } else {
            // 非IE监听script标签加载事件
            $script.onload = function() {
              loadMapConfig();
            };
          }

          // 加载本地配置
          $script.setAttribute("src", "assets/libs/gismap/config.js");
        });
      } else {
        return Promise.resolve();
      }
    }
  },
  beforeCreate() {},
  mounted() {
    this.reset();
  }
};
</script>
