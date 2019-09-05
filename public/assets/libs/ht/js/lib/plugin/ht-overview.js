!function(c,j){"use strict";var X="ht",H=X+".graph.",V=c[X],y=V.graph,a=V.Default,J=V.Color,$=null,e="px",z=a.getInternal(),_=z.getPinchDist,D=a.preventDefault,U=a.getTouchCount,r=a.startDragging;z.addMethod(a,{overviewBackground:J.widgetBackground,overviewMaskBackground:J.transparent,overviewContentBorderColor:J.widgetBorder,overviewContentBackground:J.background},!0),y.Overview=function(E){var f=this,y=f._view=z.createView(1,f);f._canvas=z.createCanvas(y),y.style.background=a.overviewBackground,y.appendChild(f._mask=z.createDiv()),f.setGraphView(E),f.addListeners()},a.def(H+"Overview",j,{ms_v:1,ms_fire:1,ms_listener:1,ms_ac:["maskBackground","contentBorderColor","contentBackground","autoUpdate","fixToRect"],_autoUpdate:!0,_fixToRect:!1,_rate:1,_scrollRect:{x:0,y:0,width:0,height:0},_maskBackground:a.overviewMaskBackground,_contentBorderColor:a.overviewContentBorderColor,_contentBackground:a.overviewContentBackground,getGraphView:function(){return this.gv},setGraphView:function(G){var k=this;if(k.gv!==G){var y=k.gv;k.gv=G,y&&(y.removeViewListener(k.handleGraphViewChanged,k),y.ump(k.handleGraphViewPropertyChanged,k)),G&&(G.addViewListener(k.handleGraphViewChanged,k),G.mp(k.handleGraphViewPropertyChanged,k)),k.fp("graphView",y,G),k.redraw()}},getCanvas:function(){return this._canvas},getMask:function(){return this._mask},dispose:function(){this.setGraphView(null)},onPropertyChanged:function(){this.redraw()},handleGraphViewChanged:function(q){this._autoUpdate&&"validate"===q.kind&&this.redraw()},handleGraphViewPropertyChanged:function(n){("canvasBackground"===n.property||this.getFixToRect()&&("zoom"===n.property||"translateX"===n.property||"translateY"===n.property))&&this.redraw()},redraw:function(){var T=this;T._redraw||(T._redraw=1,T.iv(50))},validateImpl:function(){var b=this,K=b.gv,f=b._canvas,W=b.getWidth(),J=b.getHeight(),j=b._redraw;if(K){var w=b._mask,x=w.style,v=K.getViewRect(),A=this.getFixToRect(),L=A?"boolean"==typeof A?K.getContentRect():A:K.getScrollRect(),Y=L.x,O=L.y,h=L.width,p=L.height,t=b._rate=Math.max(h/W,p/J),F=b._x=(W-h/t)/2,Q=b._y=(J-p/t)/2;if(0!==v.width&&0!==v.height||b.hasRetry||(a.callLater(b.iv,b,$),b.hasRetry=!0),(W!==f.clientWidth||J!==f.clientHeight)&&(z.setCanvas(f,W,J),j=1),z.isSameRect(L,b._scrollRect)||(b._scrollRect=L,j=1),j){var r=z.initContext(f),M=K.getDataModel().getBackground()||b._contentBackground,B=b._contentBorderColor,G=a.devicePixelRatio;r.clearRect(0,0,W*G,J*G),M&&z.fillRect(r,F*G,Q*G,h/t*G,p/t*G,M),z.translateAndScale(r,-Y/t+F,-O/t+Q,1/t),K._42(r),r.restore(),B&&z.drawBorder(r,B,F*G,Q*G,h/t*G,p/t*G)}x.background=b._maskBackground,x.left=F+(v.x-Y)/t+e,x.top=Q+(v.y-O)/t+e,x.width=v.width/t+e,x.height=v.height/t+e,b._redraw=null}else if(j){var r=z.initContext(f);r.clearRect(0,0,W,J),r.restore(),b._redraw=null}},center:function(e){var u=this,y=u.gv;if(y){var D=y._zoom,v=y._29I,c=u._rate,f=u._scrollRect,m=a.getLogicalPoint(e,u._canvas),Z=f.x+(m.x-u._x)*c,J=f.y+(m.y-u._y)*c;y.setTranslate((v.width/2-Z)*D,(v.height/2-J)*D)}},handle_mousedown:function(L){this.handle_touchstart(L)},handleWindowMouseUp:function(T){this.handleWindowTouchEnd(T)},handleWindowMouseMove:function(B){this.handleWindowTouchMove(B)},handle_mousewheel:function(z){this.handleScroll(z,z.wheelDelta)},handle_DOMMouseScroll:function(g){2===g.axis&&this.handleScroll(g,-g.detail)},handleScroll:function(L,M){if(D(L),this.gv){var Q=this.gv;M>0?Q.scrollZoomIn():0>M&&Q.scrollZoomOut()}},handle_touchstart:function(O){if(D(O),this.gv&&a.isLeftButton(O)){var T=this,q=T.gv,d=U(O);1===d?a.isDoubleClick(O)&&q.isResettable()?q.reset():(T.center(O),r(T,O)):2===d&&(T._dist=_(O),r(T,O))}},handleWindowTouchEnd:function(){delete this._dist},handleWindowTouchMove:function(W){if(this.gv){var X=this,I=X._dist,G=U(W);1===G?X.center(W):2===G&&I!=$&&X.gv.handlePinch($,_(W),I)}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);