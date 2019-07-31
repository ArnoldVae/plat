!function(v,_){"use strict";var F="ht",G=v[F],r="position",R="absolute",p="px",X="left",S="top",J="innerHTML",x="className",$="width",s="height",u="0",e="display",H="none",o="visibility",C="user-select",P="margin",g="padding",D=null,U=G.Color,l=G.Default,W=l.getInternal(),Y=v.setTimeout,K=v.setInterval,O=v.clearTimeout,M=v.clearInterval,i=v.parseInt,d=l.isLeftButton,N=l.isDragging,z=l.startDragging,Q=l.getDistance,y=l.isTouchable,B=U.widgetIconHighlight,f=U.widgetIconBorder,j=U.widgetIconGradient,q=function(){return document},n=function(O,z){return O.querySelectorAll(z)},h=function(W){var s=q().createElement(W);return"ul"===W&&(V(s,r,"relative"),V(s,P,u),V(s,g,u),V(s,"list-style",H),V(s,"box-sizing","border-box"),V(s,"-moz-box-sizing","border-box"),V(s,e,"inline-block"),V(s,"vertical-align","text-bottom"),V(s,"border","1px solid "+l.contextMenuBorderColor),V(s,"box-shadow","0 0 16px 1px "+l.contextMenuShadowColor),V(s,"overflow","hidden"),l.contextMenuBorderRadius&&V(s,"border-radius",l.contextMenuBorderRadius+p)),s},c=function(m){var V=m.touches[0];return V?V:m.changedTouches[0]},A=function(){return h("div")},T=function(){return h("canvas")},V=function(c,t,q){c.style.setProperty(t,q,D)},m=function(j,P,K){l.def(G.widget[j],P,K)},k=function(M,u){M.appendChild(u)},t=function(R,a){R.removeChild(a)},I=l.eventListenerOptionsFalse,a=(l.eventListenerOptionsTrue,function(Q,q,X,K){Q.addEventListener(q,X,K?I:I)}),E=function(b,l,G,X){b.removeEventListener(l,G,X?I:I)};W.addMethod(l,{contextMenuCheckIcon:{width:16,height:16,comps:[{type:"border",rect:[1,1,14,14],width:1,color:f},{type:"shape",points:[13,3,7,12,4,8],borderWidth:2,borderColor:B}]},contextMenuRadioIcon:{width:16,height:16,comps:[{type:"circle",rect:[2,2,12,12],borderWidth:1,borderColor:f},{type:"circle",rect:[4,4,8,8],borderWidth:1,borderColor:B,gradient:l.imageGradient,gradientColor:j,background:B}]},contextMenuLabelFont:(y?"16":"13")+"px arial, sans-serif",contextMenuLabelColor:"#000",contextMenuBackground:"#fff",contextMenuDisabledLabelColor:"#888",contextMenuHoverBackground:"#648BFE",contextMenuHoverLabelColor:"#fff",contextMenuSeparatorWidth:1,contextMenuSeparatorColor:"#E5E5E5",contextMenuScrollerColor1:"#FDFDFD",contextMenuScrollerColor2:"#D3D3D3",contextMenuScrollerBorderColor:"#C3C3C3",contextMenuBorderColor:"#C3C3C3",contextMenuShadowColor:"rgba(128, 128, 128, 0.5)",contextMenuBorderRadius:5,contextMenuSubmenuMark:"▶"},!0);var L=function(v){var s=this,R=v._view;if(s.$11b=v,s.addListeners(),a(R,"contextmenu",function(B){B.preventDefault()}),!y){var w=s.$37b=s.$36b.bind(s);a(R,"mouseover",w),a(R,"mouseout",w)}};l.def(L,_,{ms_listener:1,getView:function(){return this.$11b._view},handle_touchstart:function(h){if(l.preventDefault(h),d(h)){for(var j=this,v=j.$11b,i=j.getView(),R=i.children,F=0;F<R.length;F++){var g=R[F],O=g.$24b,Q=g.$25b;if(O&&O.contains(h.target))return v.scrollUp(g),j.$28b=Y(function(){j.$29b=K(function(){v.scrollUp(g)},100)},500),z(j,h),void 0;if(Q&&Q.contains(h.target))return v.scrollDown(g),j.$28b=Y(function(){j.$29b=K(function(){v.scrollDown(g)},100)},500),z(j,h),void 0}y&&(h=c(h)),j.$30b={x:h.pageX,y:h.pageY}}},handle_mousedown:function(s){this.handle_touchstart(s)},handle_touchend:function(s){if(d(s)){var b=this,X=b.$30b,V=y?{x:c(s).pageX,y:c(s).pageY}:{x:s.pageX,y:s.pageY};if(!X||Q(X,V)>1)return delete b.$30b,void 0;for(var J=b.getView(),h=b.$11b,e=s.target,C=D,u=D,l=h._items,q=J.$26b,S=0;S<q.length;S++)if(u=q[S],u.contains(e)){C=u.getAttribute("data-id");break}if(C&&l){var L=h.$17b(l,function(h){return h._id===C});if(L){var I=!1;L.disabled instanceof Function?I=L.disabled.call(h,L):L.disabled===!0&&(I=!0),I||(L.items?y&&b.$36b(u,!0):h.$1b(L,s))}}delete b.$30b}},$36b:function(u,f){if(!N()){var T,g=this,e=g.$11b,k=g.getView(),m=e.$20b||k.children[0],h=e.$19b,A=k.$26b,y=k.children,j=u.target,P=k.getBoundingClientRect(),t=l.getWindowInfo(),D=t.width,G=t.height,a=function(A){for(var i=0;i<y.length;i++){var I=y[i],N=new RegExp(A+"$"),X=I[x];if(X&&(N.test(X)||X.indexOf(A+" ")>=0))return I}},s=function(H){for(var e=0;e<A.length;e++){var k=A[e],v=new RegExp(H+"$"),n=k[x];if(n&&(v.test(n)||n.indexOf(H+" ")>=0))return k}},$=function(R){var q=s("menu-item"+R.$45b),N=q.getBoundingClientRect(),u=N.top-P.top,c=N.left-P.left;V(R,S,u+p),V(R,X,c+N.width+p);var $=R.getBoundingClientRect(),g=$.top,M=$.left,x=$.height,U=$.width,_=g+x+2,n=M+U+2;_>G&&V(R,S,u+G-_+p),n>D&&V(R,X,c-U+p)};if(f)T=u;else{if("mouseover"===u.type){for(var n=0;n<A.length;n++){var B=A[n];if(B.contains(j)){T=B;break}}if(!T&&h){var q=h.parentNode,Z=a("submenu"+h.getAttribute("data-id"));(Z&&Z.contains(j)||q&&q.contains(j))&&(T=h)}}else if("mouseout"===u.type){for(var Y=!1,z=u.relatedTarget,n=0;n<y.length;n++){var d=y[n];if("hidden"!==d.style.visibility&&d.contains(z)){Y=!0;break}}if(Y)return}!T&&m&&(T=s("menu-item"+(m.$45b||"NaN")))}if(T!=h){if(h)for(var v=h;v;){if(v[x]=v[x].replace(" menu-item-hover",""),v[x].indexOf("disabled")<0){var I=e.getItemByProperty("_id",v.getAttribute("data-id"));null!=I.background?I.background instanceof Function?V(v,"background-color",I.background.call(e,I)):V(v,"background-color",I.background):V(v,"background-color",l.contextMenuBackground),V(v,"color",l.contextMenuLabelColor)}var F=a("submenu"+v.getAttribute("data-id"));F&&V(F,o,"hidden");var U=v.parentNode;v=s("menu-item"+(U.$45b||"NaN"))}if(T){for(var O=T,Q=[];O;){O[x]+=" menu-item-hover",O[x].indexOf("disabled")<0&&(V(O,"background-color",l.contextMenuHoverBackground),V(O,"color",l.contextMenuHoverLabelColor));var i=a("submenu"+O.getAttribute("data-id"));i&&(V(i,o,"visible"),Q.push(i));var U=O.parentNode;O=s("menu-item"+(U.$45b||"NaN"))}Q.reverse(),Q.forEach(function(D){$(D)})}}e.$19b=T,e.$20b=T?T.parentNode:k.children[0]}},handle_mouseup:function(E){this.handle_touchend(E)},handleWindowTouchEnd:function(){var y=this;y.$28b!=D&&(O(y.$28b),delete y.$28b),y.$29b!=D&&(M(y.$29b),delete y.$29b),delete y.$34b,delete y.$30b,delete y.$35b},handleWindowMouseUp:function($){this.handleWindowTouchEnd($)},handle_mousemove:function($){this.handle_touchmove($)},handle_touchmove:function(w){if(!N()&&d(w)){for(var Y=this,C=Y.getView().children,H=D,O=0;O<C.length;O++){var T=C[O];if(T.contains(w.target)){H=T;break}}var S=Y.$30b,G=y?{x:c(w).pageX,y:c(w).pageY}:{x:w.pageX,y:w.pageY};H&&S&&Q(S,G)>2&&(z(Y,w),Y.$34b=H,Y.$35b=H.$18b)}},handleWindowTouchMove:function(J){J.preventDefault();var R=this,B=R.$11b,w=R.$34b,i=R.$35b,b=R.$30b;if(b&&w){var l=y?{x:c(J).pageX,y:c(J).pageY}:{x:J.pageX,y:J.pageY},d=l.y-b.y;d>0?B.scrollUp(w,w.$18b-(i-d)):B.scrollDown(w,i-d-w.$18b)}},handleWindowMouseMove:function(A){this.handleWindowTouchMove(A)},$10b:function(L,e){L.preventDefault();for(var P=this,I=P.getView().children,f=D,A=0;A<I.length;A++){var o=I[A];if(o.contains(L.target)){f=o;break}}if(f){var X=this.$11b,B=X.getRowHeight();Math.abs(e)>.05&&(e>0?X.scrollUp(f,e*B):0>e&&X.scrollDown(f,-e*B))}},handle_mousewheel:function(E){this.$10b(E,E.wheelDelta/40)},handle_DOMMouseScroll:function(I){this.$10b(I,-I.detail)},$44b:function(Y){this.getView().contains(Y.target)||this.$11b.hide()},$41b:function(t){this.$11b.show(t)},$4b:function(H,e){var G=this.$11b;if(e=e||G._items,e&&e.length&&H.keyCode){var Y=[H.keyCode];H.shiftKey&&Y.push(16),H.ctrlKey&&Y.push(17),H.altKey&&Y.push(18),/mac/.test(v.navigator?v.navigator.userAgent.toLowerCase():"")?H.metaKey&&Y.push(17):H.metaKey&&Y.push(91),Y.sort();var b=Y.join(),J=G.$17b(e,function(M){if(M.key){var o=M.key.slice(0);return o.sort(),b===o.join()}});if(J){J.preventDefault!==!1&&H.preventDefault();var o=!1;J.disabled instanceof Function?o=J.disabled.call(G,J):J.disabled===!0&&(o=!0),o||G.$1b(J,H)}}},$39b:function(x){var Q=this,n=c(x);Q.$32b={x:n.pageX,y:n.pageY}},$38b:function(z){var X=this,$=c(z);X.$31b={x:$.pageX,y:$.pageY},X.$33b=Y(function(){X.$31b&&(X.$32b?Q(X.$31b,X.$32b)<10&&X.$11b.show(z):X.$11b.show(z)),delete X.$33b,delete X.$31b,delete X.$32b},600)},$40b:function(){var I=this;I.$33b!=D&&(O(I.$33b),delete I.$33b,delete I.$31b,delete I.$32b)}}),G.widget.ContextMenu=function(G){var s=this,P=s._view=W.createView(null,s);P[x]="ht-widget-contextmenu",s.setItems(G),s.$13b=new L(s),V(P,"font",l.contextMenuLabelFont),V(P,r,R),V(P,"cursor","default"),V(P,"-webkit-"+C,H),V(P,"-moz-"+C,H),V(P,"-ms-"+C,H),V(P,C,H),V(P,"box-sizing","border-box"),V(P,"-moz-box-sizing","border-box"),l.baseZIndex!=D&&V(P,"z-index",i(l.baseZIndex)+2+""),s.$3b=function(W){s.$13b.$4b(W)}},m("ContextMenu",_,{$5b:0,_items:D,$21b:D,_enableGlobalKey:!1,ms_v:1,enableGlobalKey:function(){var G=this,M=G._enableGlobalKey;M===!1&&(a(q(),"keydown",G.$3b),G._enableGlobalKey=!0)},disableGlobalKey:function(){this._enableGlobalKey=!1,E(q(),"keydown",this.$3b)},setItems:function(M){this._items=M},getItems:function(){return this._items},setVisibleFunc:function(S){this.$16b=S},setLabelMaxWidth:function(L){this.$43b=L},$1b:function(_,Q){var x=this;if("check"===_.type)_.selected=!_.selected;else if("radio"===_.type){var c=_.groupId;x.$17b(x._items,function(C){C.groupId===c&&(C.selected=!1)}),_.selected=!0}if(x.hide(),_.action)_.action.apply(_.scope||x,[_,Q]);else if(_.href){var k=_.linkTarget||"_self";v.open(_.href,k)}},getItemById:function(O){return this.getItemByProperty("id",O)},setItemVisible:function(u,Q){var J=this.getItemById(u);J&&(J.visible=Q)},getItemByProperty:function(k,S,l){var T=this;if(l=l||T._items,!l||0===l.length)return D;var f=T.$17b(l,function(n){return n[k]===S});return f||D},scrollUp:function(j,G){var A=this;if(G=G==D?20:G,G=i(G),0!==G){var K=0;j.$18b>G&&(K=j.$18b-G),A.$42b(j,K),j.scrollTop=K,j.$18b=K}},scrollDown:function(x,c){var d=this;if(c=c==D?20:c,c=i(c),0!==c){var o=x.$22b,N=x.$23b,Q=o-N;N+x.$18b+c<o&&(Q=x.$18b+c),d.$42b(x,Q),x.scrollTop=Q,x.$18b=Q}},$42b:function(o,q){q=q==D?o.$18b:q;var j=o.$24b,G=o.$25b;j&&(V(j,"top",q+p),0==q?V(j,e,H):V(j,e,"block")),G&&(V(G,"bottom",-q+p),q==o.$22b-o.$23b?V(G,e,H):V(G,e,"block"))},getRowHeight:function(){return this._view.querySelector(".menu-item").offsetHeight},$17b:function(s,S){for(var O=0;O<s.length;O++){var m=s[O];if(S(m))return m;if(m.items){var o=this.$17b(m.items,S);if(o)return o}}},$2b:function(F,L){for(var z=this,n=0;n<F.length;n++){z.$5b++;var Z=F[n];if(Z.visible!==!1&&!(l.isFunction(Z.visible)&&Z.visible()===!1||z.$16b&&!z.$16b.call(z,Z))){var v=h("li"),D=z.$5b+"";if(V(v,"white-space","nowrap"),V(v,e,"block"),"separator"===Z||Z.separator===!0){var M=A();M[x]="separator",V(M,s,l.contextMenuSeparatorWidth+p),V(M,"background",l.contextMenuSeparatorColor),k(v,M)}else{Z._id=D,v.setAttribute("data-id",D);var B=h("span"),j=h("span"),f=T(),t=A();if(V(B,e,"inline-block"),V(B,s,"1.2em"),V(j,e,"inline-block"),V(j,s,"1.2em"),V(j,"line-height","1.2em"),f[x]="prefix",V(f,e,"inline-block"),V(f,$,"1em"),V(f,s,"1em"),V(f,"vertical-align","middle"),V(f,P,"0 0.2em"),"check"===Z.type&&Z.selected?f[x]+=" check-prefix":"radio"===Z.type&&Z.selected&&(f[x]+=" radio-prefix"),k(v,f),Z.icon){var C=T();C[x]="contextmenu-item-icon",V(C,e,"inline-block"),V(C,s,"1.2em"),V(C,$,"1.2em"),V(C,"margin-right","0.2em"),V(C,"float","left"),C.$50b=Z.icon,C._item=Z,k(B,C)}if(j[J]=Z.label,k(B,j),k(v,B),t[x]="suffix",V(t,e,"inline-block"),V(t,"margin-left","1em"),V(t,"margin-right","0.4em"),V(t,"text-align","right"),V(t,"font-size","75%"),Z.items&&(t[J]=l.contextMenuSubmenuMark),Z.suffix&&(t[J]=Z.suffix),k(v,t),v[x]="menu-item menu-item"+D,null!=Z.background?Z.background instanceof Function?V(v,"background-color",Z.background.call(z,Z)):V(v,"background-color",Z.background):V(v,"background-color",l.contextMenuBackground),V(v,"color",l.contextMenuLabelColor),V(v,g,"3px 0"),Z.disabled instanceof Function){var K=Z.disabled.call(z,Z);K&&(v[x]+=" disabled",V(v,"color",l.contextMenuDisabledLabelColor))}else Z.disabled&&(v[x]+=" disabled",V(v,"color",l.contextMenuDisabledLabelColor));if(Z.items){z.$21b||(z.$21b=new G.List);var W=h("ul");W[x]="submenu"+D,W.$45b=D,V(W,o,"hidden"),V(W,r,R),k(z._view,W),z.$21b.add(W),z.$2b(Z.items,W)}}k(L,v)}}},rebuild:function(){var m=this,W=m._items,O=m._view;if(O&&(O[J]="",m.$21b=D,m.$5b=0,m.$19b=D,m.$20b=D,O.$26b=D,W&&0!==W.length)){var q=h("ul",m._r);k(O,q),m.$2b(W,q)}},addTo:function(N){if(N){var x=this,B=x.$13b;if(x.$12b=N,x.$9b=function(O){B.$44b(O)},x.$27b=function(k){B.$41b(k)},y){var T=x.$6b=function(m){B.$38b(m)},u=x.$7b=function(b){B.$39b(b)},z=x.$8b=function(R){B.$40b(R)};a(N,"touchstart",T,!0),a(N,"touchmove",u),a(N,"touchend",z)}else a(N,"contextmenu",x.$27b)}},showOnView:function(g,R,j){g=g.getView?g.getView():g;var n=l.getWindowInfo(),Z=g.getBoundingClientRect();this.show(Z.left+n.left+R,Z.top+n.top+j)},show:function(m,o,z){var W=this,z=z==D?!0:!1,b=W._view;if(b){if(W.invalidate(),1===arguments.length){var i=m;if(y){var I=c(i);m=I.pageX,o=I.pageY}else m=i.pageX,o=i.pageY}var d=l.getWindowInfo(),P=d.width,Y=d.height,v=d.left,C=d.top,w={pageX:m,pageY:o,clientX:m-v,clientY:o-C,target:1,originEvent:i},Q=w.clientX,f=w.clientY,Z=function(d){d.style.height=Y-6+p;var C=A(),w=A(),G=function(o){V(o,r,R),V(o,"text-align","center"),V(o,$,"100%"),V(o,"font-size",10+p),V(o,"padding","2px 0"),V(o,"border","0px solid "+l.contextMenuScrollerBorderColor),V(o,"background-color",l.contextMenuScrollerColor1),o.style.backgroundImage="-webkit-linear-gradient(top, "+l.contextMenuScrollerColor1+", "+l.contextMenuScrollerColor2+")",o.style.backgroundImage="linear-gradient(to bottom, "+l.contextMenuScrollerColor1+", "+l.contextMenuScrollerColor2+")"};C[x]="menu-arrow-item menu-arrow-item-top",w[x]="menu-arrow-item menu-arrow-item-bottom",G(C),V(C,"top",u),V(C,"left",u),V(C,"border-bottom-width",1+p),C[J]="▲",G(w),V(w,"bottom",u),V(w,"left",u),V(w,"border-top-width",1+p),w[J]="▼",d.$24b=C,d.$25b=w,d.$18b=d.scrollTop,d.$22b=d.scrollHeight,d.$23b=d.clientHeight,k(d,C),k(d,w),W.$42b(d)};W.beforeShow&&W.beforeShow(w);var L=W._items;if(L&&(i&&i.preventDefault(),L.length)){W.rebuild(),l.appendToScreen(b),b.$26b=n(b,".menu-item");var B=b.children[0];B.offsetHeight>Y&&Z(B);var E=f+(z?1:0),H=Q+(z?1:0),s=function(L){for(var Y=0,D=0,O=0,b=W.$43b;O<L.children.length;O++){var H=L.children[O];if(H.getAttribute("data-id")){var C=H.children[1],w=H.children[2],T=C.children;if(b){var l=T[0];T.length>1&&(l=T[1]),l.offsetWidth>b&&(l[J]="<marquee scrollamount='3'>"+l[J]+"</marquee>",l.children[0].style.verticalAlign="text-bottom",V(l,$,b+p),V(l,e,"inline-block"))}var A=C.offsetWidth,P=w.offsetWidth;A>Y&&(Y=A),P>D&&(D=P)}}for(O=0;O<L.children.length;O++){var H=L.children[O];if(H.getAttribute("data-id")){var C=H.children[1],w=H.children[2],o=C.children[0],f=C.children[1];!f&&o.style.width&&V(o,$,Y+p),V(C,$,Y+p),V(w,$,D+p)}}};s(B);var M=f+3+b.offsetHeight,U=Q+3+b.offsetWidth;M>Y?V(b,S,E-(M-Y)+C+p):V(b,S,E+C+p),U>P?V(b,X,H-(U-P)+v+p):V(b,X,H+v+p);var F=W.$21b;F&&F.each(function(t){s(t),t.offsetHeight>Y&&Z(t)}),W.$9b&&a(q(),y?"touchstart":"mousedown",W.$9b,!0),W.afterShow&&W.afterShow(w),W.$47b()}}},isShowing:function(){return this._view?this._view.parentNode!=D:!1},getRelatedView:function(){return this.$12b},hide:function(){var k=this,z=k._view;z&&z.parentNode&&(t(z.parentNode,z),E(q(),y?"touchstart":"mousedown",k.$9b,!0),k.afterHide&&k.afterHide())},dispose:function(){var i=this,C=i.$12b,b=i._view;b&&(b.parentNode&&t(b.parentNode,b),i.disableGlobalKey(),C&&(y?(E(C,"touchstart",i.$6b,!0),E(C,"touchmove",i.$7b),E(C,"touchend",i.$8b)):E(C,"contextmenu",i.$27b)),i._view=i._items=i.$21b=i.$19b=i.$12b=i.beforeShow=i.afterShow=i.afterHide=i.$9b=i.$3b=i.$6b=i.$7b=i.$8b=i.$27b=D)},$46b:function(R,T,v,Y,A){var D=W.initContext(R);W.translateAndScale(D,0,0,1),D.clearRect(0,0,v,Y),l.drawStretchImage(D,l.getImage(T),"fill",0,0,v,Y,A,this),D.restore()},$47b:function(){var k,J,Q,O=this,C=O._view;if(O.isShowing()){var $=n(C,".check-prefix");for(Q=0;Q<$.length;Q++){var w=$[Q];k=w.clientWidth,J=w.clientHeight,w.$48b=k,w.$49b=J,W.setCanvas(w,k,J)}var B=n(C,".radio-prefix");for(Q=0;Q<B.length;Q++){var v=B[Q];k=v.clientWidth,J=v.clientHeight,v.$48b=k,v.$49b=J,W.setCanvas(v,k,J)}var I=n(C,".contextmenu-item-icon");for(Q=0;Q<I.length;Q++){var Z=I[Q];k=Z.clientWidth,J=Z.clientHeight,Z.$48b=k,Z.$49b=J,W.setCanvas(Z,k,J)}}},validateImpl:function(){var i,v,s,F=this,c=F._view;if(F.isShowing()){var U=n(c,".check-prefix");for(s=0;s<U.length;s++){var G=U[s];i=G.$48b,v=G.$49b,i&&v&&F.$46b(G,l.contextMenuCheckIcon,i,v)}var D=n(c,".radio-prefix");for(s=0;s<D.length;s++){var Q=D[s];i=Q.$48b,v=Q.$49b,i&&v&&F.$46b(Q,l.contextMenuRadioIcon,i,v)}var p=n(c,".contextmenu-item-icon");for(s=0;s<p.length;s++){var C=p[s];i=C.$48b,v=C.$49b,i&&v&&F.$46b(C,l.getImage(C.$50b),i,v,C._item)}}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);