!function(N,E){"use strict";var K="position",B="absolute",X="relative",z="px",U="left",H="right",n="top",q="bottom",V="display",b="none",t="block",R=ht.Default,L=R.getInternal(),c=Math.floor,e=Math.ceil,M=Math.PI,D=null,m=N.parseInt,l=function(B){return B.getContext("2d")},$=function(){return document},I=function(I){return $().createElement(I)},k=function(){return I("canvas")},g=function(h,H,Q){h.style.setProperty(H,Q,D)},F=function(e,w,y){R.def(ht.widget[e],w,y)},u=function(Q,A){Q.appendChild(A)},_=function(w,g){w.removeChild(g)},s=R.eventListenerOptionsFalse,P=(R.eventListenerOptionsTrue,function(o,E,$,x){o.addEventListener(E,$,x?s:s)}),A=function(C,k,b,w){C.removeEventListener(k,b,w?s:s)};ht.widget.RulerFrame=function(n){var C=this,$=C._view=L.createView(null,C),T=C.$1k=k(),r=C.$2k=k(),D=C.$3k=k(),z=C.$4k=k();C._defaultRulerConfig={size:20,borderWidth:1,borderStyle:"solid",borderColor:"#888",defaultMajorTickSpacing:50,minMajorTickSpacing:10,minPhysicalMajorTickSpacing:40,maxPhysicalMajorTickSpacing:100,tickSpacingAdaptable:!0,majorTickTextFont:"12px Arial",majorTickTextColor:"#666",majorTickColor:"#888",minorTickColor:"#ccc",background:"rgba(0,0,0,0)",guideColor:"rgb(0, 173, 239)",guideWidth:2,guideVisible:!1,guideTipVisible:!1,guideTipBorderColor:"#666",guideTipTextColor:"#666",guideTipTextFont:"12px Arial",guideTipBackground:"#fff"},C._topRulerConfig={visible:!0},C._rightRulerConfig={visible:!1},C._bottomRulerConfig={visible:!1},C._leftRulerConfig={visible:!0},u($,T),u($,D),u($,r),u($,z),g($,K,X),g($,"box-sizing","border-box"),g($,"-moz-box-sizing","border-box"),g(T,K,B),g(r,K,B),g(D,K,B),g(z,K,B),C.$14k=function(){C.$13k=1,C.iv()},C.$15k=function(h){if(C._topRulerConfig.guideVisible||C._rightRulerConfig.guideVisible||C._bottomRulerConfig.guideVisible||C._leftRulerConfig.guideVisible||C._defaultRulerConfig.guideVisible||(C._topRulerConfig.guideTipVisible||C._rightRulerConfig.guideTipVisible||C._bottomRulerConfig.guideTipVisible||C._leftRulerConfig.guideTipVisible||C._defaultRulerConfig.guideTipVisible)&&C._component){var m=$.getBoundingClientRect();C.$16k={x:h.clientX-m.left,y:h.clientY-m.top},C.$5k()}},C.setComponent(n)},F("RulerFrame",E,{ms_v:1,ms_fire:1,ms_ac:["defaultRulerConfig","topRulerConfig","rightRulerConfig","bottomRulerConfig","leftRulerConfig","component"],setComponent:function(w){var R=this,Y=R._component,E=R.getView();if(E){if(R._component=w,R.fp("component",Y,w),Y){var I=R.getComponentView(Y);_(E,I),A(E,"mousemove",R.$15k),R.removeComponentPropertyChangeListener(Y,R.$14k)}if(w){var p=R.getComponentView(w);u(E,p),g(p,K,B),P(E,"mousemove",R.$15k),R.addComponentPropertyChangeListener(w,R.$14k)}}},addComponentPropertyChangeListener:function(c,r){c&&c.mp&&c.mp(r)},removeComponentPropertyChangeListener:function(v,A){v&&v.ump&&v.ump(A)},getComponentHZoom:function(F){return F&&F.getZoom?F.getZoom():1},getComponentVZoom:function(t){return t&&t.getZoom?t.getZoom():1},getComponentViewRect:function(f){return f&&f.getViewRect?f.getViewRect():void 0},getComponentView:function(e){return e&&e.getView?e.getView():e},invalidateComponent:function(f){f&&f.iv&&f.iv()},validateComponent:function(h){h&&h.validate&&h.validate()},$7k:function(F,E,e,U,q,Y,x,m,S,c,j,I){if(E.visible){var o=this._defaultRulerConfig,T="borderStyle",A="borderColor",l="borderWidth",u="background",K=E[T]||o[T],v=E[A]||o[A],z=E[l]||o[l],r=E.size!=D?E.size:o.size,d=E[u]||o[u],H=r+z,C=this.$6k(z,K,v,F,e,q,H,x,m,S,c,j,I);g(F,q,"0px"),Y?L.setCanvas(F,U-C,r):L.setCanvas(F,r,U-C),g(F,"background",d),g(F,V,t)}else g(F,V,b),g(this.getComponentView(this._component),q,"0px")},$6k:function(b,O,e,c,E,o,K,l,i,C,R,Q,L){var v=0;return g(c,E,b+"px "+O+" "+e),g(this.getComponentView(this._component),o,K+z),l?(g(c,i,C+z),v+=C):g(c,i,"0px"),R?(g(c,Q,L+z),v+=L):g(c,Q,"0px"),v},validateImpl:function(){var Q=this,e=Q._component,b=Q.$1k,r=Q.$2k,_=Q.$3k,V=Q.$4k,M=Q._view,R=Q._defaultRulerConfig,G=Q._topRulerConfig,z=Q._rightRulerConfig,h=Q._bottomRulerConfig,v=Q._leftRulerConfig,u=R.size;if(M&&e){var L=G.size!=D?G.size:u,j=z.size!=D?z.size:u,F=h.size!=D?h.size:u,Z=v.size!=D?v.size:u;Q.$7k(b,G,"border-bottom",M.offsetWidth,n,!0,v.visible,U,Z,z.visible,H,j),Q.$7k(r,z,"border-left",M.offsetHeight,H,!1,G.visible,n,L,h.visible,q,F),Q.$7k(_,h,"border-top",M.offsetWidth,q,!0,v.visible,U,Z,z.visible,H,j),Q.$7k(V,v,"border-right",M.offsetHeight,U,!1,G.visible,n,L,h.visible,q,F),Q.$13k?delete Q.$13k:Q.invalidateComponent(e),Q.validateComponent(e),Q.$5k()}},$5k:function(){function E(E,d,$,u,Y,K){if(d.visible){var M=l(E),U=d[J]||_,p=d[R]!=D?d[R]:a,F=d[f]||x,m=d[S]||V,c=d.size!=D?d.size:e,us=d[Z]||L,xo=d[P]||o,Iq=d[w]||y,sg=d[B]!=D?d[B]:h,wq=d[r]!=D?d[r]:b,Dn=d[n]!=D?d[n]:H,rh=d[g]!=D?d[g]:t,Vo=d[s]!=D?d[s]:v,of=d[X]!=D?d[X]:N,Zr=d[k]||Hl,gr=d[W]||tf;p&&(U=j[K]=j.$8k(j[K]||U,d[Q]||A,d[z]||O,u?q:I,xo)),$.call(j,M,T,G,i,C,c,u?q:I,U,F,m,Y,us,Iq);var pq=j.$16k;(sg||wq)&&pq&&(u?j.$9k(M,pq.x,c,Zr,gr,sg,wq,Dn,rh,Vo,of):j.$10k(M,pq.y,c,Zr,gr,sg,wq,Dn,rh,Vo,of,Y))}}var j=this,m=j.$1k,M=j.$2k,u=j.$3k,Y=j.$4k,p=j._topRulerConfig,F=j._rightRulerConfig,U=j._bottomRulerConfig,$=j._leftRulerConfig,K=j._defaultRulerConfig,c=j._component,d=j.getComponentViewRect(c),q=j.getComponentHZoom(c),I=j.getComponentVZoom(c),T=d.x*q,i=T+d.width*q,G=d.y*I,C=G+d.height*I,e=j._defaultRulerConfig.size,J="defaultMajorTickSpacing",Q="maxPhysicalMajorTickSpacing",z="minPhysicalMajorTickSpacing",R="tickSpacingAdaptable",f="majorTickTextFont",S="majorTickTextColor",Z="majorTickColor",w="minorTickColor",B="guideVisible",r="guideTipVisible",n="guideTipBorderColor",g="guideTipTextColor",s="guideTipTextFont",X="guideTipBackground",k="guideColor",W="guideWidth",P="minMajorTickSpacing",_=K[J],A=K[Q],O=K[z],a=K[R],x=K[f],V=K[S],L=K[Z],o=K[P],y=K[w],h=K[B],b=K[r],H=K[n],t=K[g],v=K[s],N=K[X],Hl=K[k],tf=K[W];j._view&&c&&(E(m,p,j.$11k,!0,!1,"_currentTopMajorTickSpacing"),E(M,F,j.$12k,!1,!0,"_currentRightMajorTickSpacing"),E(u,U,j.$11k,!0,!0,"_currentBottomMajorTickSpacing"),E(Y,$,j.$12k,!1,!1,"_currenLeftMajorTickSpacing"))},$8k:function(L,s,F,V,h){return F>L*V?L=c(s/V/h)*h:L*V>s&&(L=e(F/V/h)*h),L},getHTipText:function(u){var Z=this,V=Z._component,N=0,h=Z._view.getBoundingClientRect();return V.lp?N=m(V.lp({x:u.x+h.left,y:u.y}).x):N-=m(this.getComponentView(V).style.left)||0,N},$9k:function(P,o,Z,i,a,c,Q,B,v,j,z){var T=this,k=T._component;P.save(),L.translateAndScale(P,0,0,1);var n=o-(m(this.getComponentView(k).style.left)||0),A=0;if(o=T.getHTipText(T.$16k),c&&(P.beginPath(),P.fillStyle=i,P.rect(n,A,a,Z),P.fill()),Q){P.beginPath(),P.textAlign="center",P.textBaseline="middle",P.font=j;var y=P.measureText(o).width+6;P.fillStyle=z,P.rect(n-y/2,A,y,Z),P.fill(),P.strokeStyle=B,P.stroke(),P.beginPath(),P.fillStyle=v,P.fillText(o,n,A+Z/2)}P.restore()},getVTipText:function(k){var P=this,i=P._component,Z=0,t=P._view.getBoundingClientRect();return i.lp?Z=m(i.lp({x:k.x,y:k.y+t.top}).y):Z-=m(this.getComponentView(i).style.top)||0,Z},formatScaleText:function(S){return Math.round(S)},$10k:function(T,u,r,D,O,K,o,z,P,U,c,t){var C=this,A=C._component;T.save(),L.translateAndScale(T,0,0,1);var i=r/2,J=u-(m(this.getComponentView(A).style.top)||0);if(u=C.getVTipText(C.$16k),K&&(T.beginPath(),T.fillStyle=D,T.rect(i-r/2,J,r,O),T.fill()),o){T.translate(i,J),T.rotate((t?90:-90)*M/180),T.translate(-i,-J),T.beginPath(),T.textAlign="center",T.textBaseline="middle",T.font=U;var s=T.measureText(u).width+6;T.fillStyle=c,T.rect(i-s/2,J-r/2,s,r),T.fill(),T.strokeStyle=z,T.stroke(),T.fillStyle=P,T.fillText(u,i,J)}T.restore()},$11k:function(x,z,y,T,f,h,w,b,V,I,E,o,v){x.save(),y=0;var P=z,J=T,u=(P+J)/2;z=0,T=J-P,L.translateAndScale(x,0,0,1);var _=0,q=0,U=m(h/2),g=h-U,s=E?0:U,W=b*w,i=W/10;z-=W,T+=W,x.clearRect(z,0,T-z,h),x.beginPath(),x.fillStyle=v;var k=c(u/i)*i-P;for(_=k;T>_;_+=i)x.rect(_,y+s,1,g);for(_=k;_>z;_-=i)x.rect(_,y+s,1,g);for(x.fill(),s=E?0:1,x.beginPath(),x.fillStyle=o,k=c(u/W)*W-P,_=k;T>_;_+=W)x.rect(_,y+s,1,h-1);for(_=k;_>z;_-=W)x.rect(_,y+s,1,h-1);x.fill();var S=m(/\d+px/.exec(V)[0]),Z=(S||10)/2;x.textBaseline="middle",s=E?h-Z-2:Z+2,x.beginPath(),x.fillStyle=I,x.font=V;var p=c(u/W)*W/w;for(_=k,q=p;T>_;_+=W,q+=b){var K=this.getHScaleText?this.getHScaleText(_):q;x.fillText(this.formatScaleText(K),_+2,y+s)}for(_=k,q=p;_>z;_-=W,q-=b){var K=this.getHScaleText?this.getHScaleText(_):q;x.fillText(this.formatScaleText(K),_+2,y+s)}x.restore()},$12k:function(f,F,j,r,K,J,p,P,u,G,B,q,I){function Q(E,e,w,V,h,J){h=s.getVScaleText?s.getVScaleText(w):h,h=s.formatScaleText(h),f.translate(E+e,w),f.rotate(-V),f.translate(-E-e,-w),f.fillText(h,E+e+(J?2:1),w),f.translate(E+e,w),f.rotate(V),f.translate(-E-e,-w)}f.save(),F=0;var E=j,h=K,a=(E+h)/2;j=0,K=h-E,L.translateAndScale(f,0,0,1);var e=0,s=this,d=0,x=m(J/2),n=J-x,g=B?0:x,i=P*p,z=i/10;j-=i,K+=i,f.clearRect(F,0,J,K-j),f.beginPath(),f.fillStyle=I;var t=c(a/z)*z-E;for(e=t;K>e;e+=z)f.rect(F+g,e,n,1);for(e=t;e>j;e-=z)f.rect(F+g,e,n,1);for(f.fill(),g=B?0:1,f.beginPath(),f.fillStyle=q,t=c(a/i)*i-E,e=t;K>e;e+=i)f.rect(F+g,e,J-1,1);for(e=t;e>j;e-=i)f.rect(F+g,e,J-1,1);f.fill();var O=m(/\d+px/.exec(u)[0]),X=(O||10)/2,H=90*M/180;f.textBaseline="middle",g=B?J-X:X+2,H=B?-H:H,f.beginPath(),f.fillStyle=G,f.font=u;var D=c(a/i)*i/p;for(e=t,d=D;K>e;e+=i,d+=P)Q(F,g,e,H,d,B);for(e=t,d=D;e>j;e-=i,d-=P)Q(F,g,e,H,d,B);f.restore()},onPropertyChanged:function(){this.iv()},dispose:function(){var s=this,O=s._component,y=s._view;O&&s.removeComponentPropertyChangeListener(O,s.$14k),y&&(A(y,"mousemove",s.$15k),_(y.parentNode,y),s._view=null)}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);