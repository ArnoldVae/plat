<template>
    <div v-transfer-dom :data-transfer="transfer">
        <transition :name="transitionNames[1]">
            <div :class="maskClasses" :style="wrapStyles" v-show="visible" v-if="showMask" @click="handleMask"></div>
        </transition>
        <div :class="wrapClasses" :style="wrapStyles" @click="handleWrapClick">
            <transition :name="transitionNames[0]" @after-leave="animationFinish">
                <div :class="classes" :style="mainStyles" v-show="visible" @mousedown="handleMousedown">
                    <iframe
                        src="about:blank"
                        frameborder="0"
                        marginheight="0"
                        marginwidth="0"
                        style="position: absolute; visibility: inherit; top: -1px; left: -1px; width: calc(100% + 3px); height: calc(100% + 2px); borderRadius: 10px; z-index: 888888; filter: Alpha(opacity = 0);"
                    ></iframe>
                    <div :class="contentClasses" ref="content" :style="contentStyles" @click="handleClickModal" style="z-index: 999999;">
                        <a :class="[prefixCls + '-close']" v-if="closable" @click="close">
                            <slot name="close">
                                <Icon type="ios-close"></Icon>
                            </slot>
                        </a>
                        <div :class="[prefixCls + '-header']"
                             @mousedown="handleMoveStart"
                             v-if="showHead"
                        ><slot name="header"><div :class="[prefixCls + '-header-inner']">{{ title }}</div></slot></div>
                        <div :class="[prefixCls + '-body']"><slot></slot></div>
                        <div :class="[prefixCls + '-footer']" v-if="!footerHide">
                            <slot name="footer">
                                <i-button type="text" size="large" @click.native="cancel">{{ localeCancelText }}</i-button>
                                <i-button type="primary" size="large" :loading="buttonLoading" @click.native="ok">{{ localeOkText }}</i-button>
                            </slot>
                        </div>
                    </div>
                    <iframe
                        src="about:blank"
                        frameborder="0"
                        marginheight="0"
                        marginwidth="0"
                        ref="iframe"
                        v-if="createIframe"
                    ></iframe>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import Icon from './comprise/icon';
    import iButton from './comprise/button/button.vue';
    import TransferDom from './directives/transfer-dom';
    import Locale from './mixins/locale';
    import Emitter from './mixins/emitter';
    import ScrollbarMixins from './mixins-scrollbar';

    import { on, off } from './utils/dom';
    import { findComponentsDownward } from './utils/assist';

    import { transferIndex as modalIndex, transferIncrease as modalIncrease } from './utils/transfer-queue';

    const prefixCls = 'ivu-modal';

    export default {
        name: 'Modal',
        mixins: [ Locale, Emitter, ScrollbarMixins ],
        components: { Icon, iButton },
        directives: { TransferDom },
        props: {
            createIframe: {
                type: Boolean,
                default: false
            },
            value: {
                type: Boolean,
                default: false
            },
            closable: {
                type: Boolean,
                default: true
            },
            maskClosable: {
                type: Boolean,
                default () {
                    return !this.$IVIEW || this.$IVIEW.modal.maskClosable === '' ? true : this.$IVIEW.modal.maskClosable;
                }
            },
            title: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 520
            },
            okText: {
                type: String
            },
            cancelText: {
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            },
            styles: {
                type: Object
            },
            className: {
                type: String
            },
            // for instance
            footerHide: {
                type: Boolean,
                default: false
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            transitionNames: {
                type: Array,
                default () {
                    return ['ease', 'fade'];
                }
            },
            transfer: {
                type: Boolean,
                default () {
                    return !this.$IVIEW || this.$IVIEW.transfer === '' ? true : this.$IVIEW.transfer;
                }
            },
            fullscreen: {
                type: Boolean,
                default: false
            },
            mask: {
                type: Boolean,
                default: true
            },
            draggable: {
                type: Boolean,
                default: false
            },
            zIndex: {
                type: Number,
                default: 1000
            },
        },
        data () {
            return {
                prefixCls: prefixCls,
                wrapShow: false,
                showHead: true,
                buttonLoading: false,
                visible: this.value,
                dragData: {
                    x: null,
                    y: null,
                    dragX: null,
                    dragY: null,
                    dragging: false
                },
                modalIndex: this.handleGetModalIndex(),  // for Esc close the top modal
                isMouseTriggerIn: false, // #5800
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}-wrap`,
                    {
                        [`${prefixCls}-hidden`]: !this.wrapShow,
                        [`${this.className}`]: !!this.className,
                        [`${prefixCls}-no-mask`]: !this.showMask
                    }
                ];
            },
            wrapStyles () {
                return {
                    zIndex: this.modalIndex + this.zIndex
                };
            },
            maskClasses () {
                return `${prefixCls}-mask`;
            },
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-fullscreen`]: this.fullscreen,
                        [`${prefixCls}-fullscreen-no-header`]: this.fullscreen && !this.showHead,
                        [`${prefixCls}-fullscreen-no-footer`]: this.fullscreen && this.footerHide
                    }
                ];
            },
            contentClasses () {
                return [
                    `${prefixCls}-content`,
                    {
                        [`${prefixCls}-content-no-mask`]: !this.showMask,
                        [`${prefixCls}-content-drag`]: this.draggable,
                        [`${prefixCls}-content-dragging`]: this.draggable && this.dragData.dragging
                    }
                ];
            },
            mainStyles () {
                let style = {};

                const width = parseInt(this.width);
                const styleWidth = this.dragData.x !== null ? {
                    top: 0
                } : {
                    width: width <= 100 ? `${width}%` : `${width}px`
                };

                const customStyle = this.styles ? this.styles : {};

                Object.assign(style, styleWidth, customStyle);

                return style;
            },
            contentStyles () {
                let style = {};

                if (this.draggable) {
                    if (this.dragData.x !== null) style.left = `${this.dragData.x}px`;
                    if (this.dragData.y !== null) style.top = `${this.dragData.y}px`;
                    const width = parseInt(this.width);
                    const styleWidth = {
                        width: width <= 100 ? `${width}%` : `${width}px`
                    };

                    Object.assign(style, styleWidth);
                }

                return style;
            },
            localeOkText () {
                if (this.okText === undefined) {
                    return this.t('i.modal.okText');
                } else {
                    return this.okText;
                }
            },
            localeCancelText () {
                if (this.cancelText === undefined) {
                    return this.t('i.modal.cancelText');
                } else {
                    return this.cancelText;
                }
            },
            showMask () {
                return this.draggable ? false : this.mask;
            }
        },
        methods: {
            close () {
                this.visible = false;
                this.$emit('input', false);
                this.$emit('on-cancel');
            },
            handleMask () {
                if (this.maskClosable && this.showMask) {
                    this.close();
                }
            },
            handleWrapClick (event) {
                if (this.isMouseTriggerIn) {
                    this.isMouseTriggerIn = false;
                    return;
                }
                // use indexOf,do not use === ,because ivu-modal-wrap can have other custom className
                const className = event.target.getAttribute('class');
                if (className && className.indexOf(`${prefixCls}-wrap`) > -1) this.handleMask();
            },
            handleMousedown () {
                this.isMouseTriggerIn = true;
            },
            cancel () {
                this.close();
            },
            ok () {
                if (this.loading) {
                    this.buttonLoading = true;
                } else {
                    this.visible = false;
                    this.$emit('input', false);
                }
                this.$emit('on-ok');
            },
            EscClose (e) {
                if (this.visible && this.closable) {
                    if (e.keyCode === 27) {
                        const $Modals = findComponentsDownward(this.$root, 'Modal').filter(item => item.$data.visible && item.$props.closable);

                        const $TopModal = $Modals.sort((a, b) => {
                            return a.$data.modalIndex < b.$data.modalIndex ? 1 : -1;
                        })[0];

                        setTimeout(() => {
                            $TopModal.close();
                        }, 0);
                    }
                }
            },
            animationFinish() {
                this.$emit('on-hidden');
            },
            handleMoveStart (event) {
                if (!this.draggable) return false;

                const $content = this.$refs.content;
                const rect = $content.getBoundingClientRect();
                this.dragData.x = rect.x || rect.left;
                this.dragData.y = rect.y || rect.top;

                const distance = {
                    x: event.clientX,
                    y: event.clientY
                };

                this.dragData.dragX = distance.x;
                this.dragData.dragY = distance.y;

                this.dragData.dragging = true;

                on(window, 'mousemove', this.handleMoveMove);
                on(window, 'mouseup', this.handleMoveEnd);
            },
            handleMoveMove (event) {
                if (!this.dragData.dragging) return false;

                const distance = {
                    x: event.clientX,
                    y: event.clientY
                };

                const diff_distance = {
                    x: distance.x - this.dragData.dragX,
                    y: distance.y - this.dragData.dragY
                };

                this.dragData.x += diff_distance.x;
                this.dragData.y += diff_distance.y;

                this.dragData.dragX = distance.x;
                this.dragData.dragY = distance.y;
            },
            handleMoveEnd () {
                this.dragData.dragging = false;
                off(window, 'mousemove', this.handleMoveMove);
                off(window, 'mouseup', this.handleMoveEnd);
            },
            handleGetModalIndex () {
                modalIncrease();
                return modalIndex;
            },
            handleClickModal () {
                if (this.draggable) {
                    this.modalIndex = this.handleGetModalIndex();
                }
            }
        },
        mounted () {
            if (this.visible) {
                this.wrapShow = true;
            }

            let showHead = true;

            if (this.$slots.header === undefined && !this.title) {
                showHead = false;
            }

            this.showHead = showHead;

            // ESC close
            document.addEventListener('keydown', this.EscClose);
        },
        beforeDestroy () {
            document.removeEventListener('keydown', this.EscClose);
            this.removeScrollEffect();
        },
        watch: {
            value (val) {
                this.visible = val;
            },
            visible (val) {
                if (val === false) {
                    this.buttonLoading = false;
                    this.timer = setTimeout(() => {
                        this.wrapShow = false;
                        this.removeScrollEffect();
                    }, 300);
                } else {
                    this.modalIndex = this.handleGetModalIndex();

                    if (this.timer) clearTimeout(this.timer);
                    this.wrapShow = true;
                    if (!this.scrollable) {
                        this.addScrollEffect();
                    }
                }
                this.broadcast('Table', 'on-visible-change', val);
                this.broadcast('Slider', 'on-visible-change', val);  // #2852
                this.$emit('on-visible-change', val);
            },
            loading (val) {
                if (!val) {
                    this.buttonLoading = false;
                }
            },
            scrollable (val) {
                if (!val) {
                    this.addScrollEffect();
                } else {
                    this.removeScrollEffect();
                }
            },
            title (val) {
                if (this.$slots.header === undefined) {
                    this.showHead = !!val;
                }
            }
        }
    };
</script>
<style lang="stylus" scoped>

</style>
<style lang="stylus" scoped>
// .ocx-modal {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
    
    /deep/ .ivu-modal-mask {
        position: absolute !important;
    }
    /deep/ .ivu-modal-wrap {
        position: absolute !important;
        
        .ivu-modal {
            
            .ivu-modal-close .ivu-icon-ios-close {
                color: #fff;
                
                &:hover {
                    color: #0af;
                }
            }
            
            .ivu-modal-content {
                background: url('~@/assets/img/common/modal-bg.png') no-repeat;
                background-size: 100% 100%;
                // background: rgba(28,69,121,0.8)
                // rgba(9, 136, 245, 0.48)
                .ivu-modal-header {
                    border-color: rgba(36, 108, 169, 0.48);

                    .ivu-modal-header-inner {
                        color: #3789c9;
                        
                    }
                }
                
                .ivu-modal-body {
                    color: #b0e1f9;
                    font-size: 18px;
                }
                
                .ivu-modal-footer {
                    border-color: rgba(36, 108, 169, 0.48);
                    
                    .ivu-btn-text {
                        color: #c8d0de;
                        
                        &:hover {
                            color: #57a3f3;
                            background-color: #183e6f;
                            border-color: transparent;
                        }
                    }
                    .ivu-btn-primary {
                        background-color: transparent;
                        color:#73a6c3;
                        border-color: #0f3047;

                        &:hover {
                            color: #47b2fe;
                            // background-color: #47b2fe ;
                            border-color: #2d8cf0;
                        }
                    }
                }
            }   
        }
        
        /*iframe {
            position: absolute;
            visibility: inherit;
            width: calc(100% + 3px);
            height: calc(100% + 2px);
            z-index: -1;
            filter: Alpha(opacity=0);
            top: -1px;
            left: -1px;
            border-radius: 4px;
        }   */
    }
    
    /deep/ .ivu-modal-confirm {
        
        .ivu-modal-confirm-head-title {
            color: #3789c9;
        }
        
        .ivu-modal-confirm-body {
            color: #b0e1f9;
            font-size: 18px;
        }
        
        .ivu-modal-confirm-footer {
            
            .ivu-btn-text {
                color: #8895ad;
                
                &:hover {
                    color: #57a3f3;
                    background-color: #183e6f;
                    border-color: transparent;
                }
            }

            .ivu-btn-primary {
                background-color: transparent;
                color:#73a6c3;
                border-color: #0f3047;

                &:hover {
                    color: #47b2fe;
                    // background-color: #47b2fe ;
                    border-color: #2d8cf0;
                }
            }
        }
    }
// }
</style>