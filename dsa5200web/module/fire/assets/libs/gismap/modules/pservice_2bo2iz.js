/* 百度地图API V2 模块
 * 模块名称就是文件名
 * zhuanzhwu整理
 */
 _jsload2&&_jsload2('pservice', 'var Uh=5;bc.Du=z.tg("pano")[0];bc.$k=bc.Du+"?";bc.bG=z.tg("baidumap");bc.rP=z.tg("main_domain_nocdn");bc.Sd=new R;bc.$A=[]; x.extend(bc.prototype,{sQ:function(){var a=this,b;for(b in this.xd)if(0!==this.xd[b].length)switch(b){case "getPanoramaById":x.Fb(this.xd[b],function(b){a.$o.apply(a,b)});break;case "getPanoramaByLocation":x.Fb(this.xd[b],function(b){a.qj.apply(a,b)});break;case "getVisiblePOIs":x.Fb(this.xd[b],function(b){a.aE.apply(a,b)});break;case "getRecommendPanosById":x.Fb(this.xd[b],function(b){a.wx.apply(a,b)});break;case "getPanoramaVersions":x.Fb(this.xd[b],function(b){a.vx.apply(a,b)});break;case "checkPanoSupportByCityCode":x.Fb(this.xd[b], function(b){a.dC.apply(a,b)});break;case "getPanoramaByPOIId":x.Fb(this.xd[b],function(b){a.ux.apply(a,b)});break;case "getCopyrightProviders":x.Fb(this.xd[b],function(b){a.f2.apply(a,b)})}},$o:function(a,b,c){this.xH(bc.$k+"qt=sdata&l=17&sid="+a+"&fn=",b,c)},qj:function(a,b,c){"function"==typeof b&&(c=b,b=50);a=bc.Sd.nh(a);this.xH(bc.$k+"qt=qsdata&x="+a.x+"&y="+a.y+"&r="+b+"&action=1&fn=",c)},aE:function(a,b,c,d){a=bc.Sd.nh(a);this.Sg(bc.$k+"qt=search&x="+a.x+"&y="+a.y+"&radius="+b+"&tag="+c+"&fn=", function(a){for(var a=a.content,b=[],c=p,i=a.length-1;0<=i;i--)c=a[i],b.push({iconType:c.Type,title:c.name,altitude:c.Height,panoInfo:{panoId:c.PID,panoIId:c.IID,heading:c.Dir,pitch:c.Pitch},position:bc.Sd.wi(new Q(c.X,c.Y))});d(b)})},wx:function(a,b){this.Sg(bc.$k+"qt=guide&sid="+a+"&fn=",function(a){if(a.content){for(var a=a.content,d=[],e=p,f=0,g=a.length;f<g;f++)e=a[f],d.push({panoId:e.PID,heading:e.Dir,name:e.Info,recoType:e.Type,pitch:e.Pitch,catlog:e.Catalog,floor:e.Floor});b(d)}})},kL:function(a){this.Sg(bc.bG+ "?qt=panoCMS&file=pano_copyright&callback=",function(b){a(b)})},vx:function(a){this.Sg(bc.bG+"?qt=pver&callback=",function(b){b?a&&a(b):a&&a(p)})},dC:function(a,b){function c(a){for(var b=bc.$A,c=0,g=b.length;c<g;c++)if(b[c]==a)return o;return q}0===bc.$A.length?this.Sg(bc.rP+"?qt=panoCityList&t="+(new Date).getTime()+"&callback=",function(d){d?(bc.$A=d,b(c(a))):b(q)}):b(c(a))},ux:function(a,b){var c=this;this.vx(function(d){d&&d.panoUdt&&c.Sg(bc.$k+"qt=poi&udt="+d.panoUdt.version+"&uid="+a+"&fn=", function(a){if(a&&a.content&&a.content[0]&&a.content[0].poiinfo){var a=a.content[0].poiinfo,d={id:a.IID||a.PID,pid:a.PID,type:1==a.hasinter?"inter":"street",description:a.name,links:p,position:bc.Sd.wi(new Q(a.X,a.Y)),tiles:p,pov:1==a.hasinter?p:{heading:a.Dir,pitch:a.Pitch}};"inter"===d.type?c.cS(a.IID,function(a){if(a){for(var c=a.Defaultfloor,e=p,l=0,m=a.Floors.length;l<m;l++)if(a.Floors[l].Floor===c){e=a.Floors[l];break}e&&(d.interID=e.StartID)}b(d)}):b(d)}else b(p)})})},xH:function(a,b,c){var d= this;this.Sg(a,function(a){a&&a.result&&0==a.result.error?b&&b(d.SS(a,c)):b&&b(p)})},Sg:function(a,b){var c=(1E5*Math.random()).toFixed(0);z._rd=z._rd||{};z._rd["_cbk"+c]=function(a){b&&b(a);delete z._rd["_cbk"+c]};Qb(a+("BMap._rd._cbk"+c))},SS:function(a,b){var c={},d=a.content[0];c.description=d.Rname||d.Info||"";c.id=d.ID;c.vh=d.X/100;c.wh=d.Y/100;c.position=bc.Sd.wi(new Q(c.vh,c.wh));var e=this.TS(d,c.id,c.vh,c.wh,d.NorthDir);c.links=e[0];c.roads=e[1];c.links.sort(function(a,b){return a.yh-b.yh}); c.mode=d.Mode;c.relevants=[];if(d.SwitchID)for(e=0;e<d.SwitchID.length;e++)c.relevants[e]={id:d.SwitchID[e].ID,mode:d.SwitchID[e].Time.toLowerCase()};c.tiles=new Vh({dirNorth:d.NorthDir,centerHeading:(180+d.NorthDir)%360,pitch:d.Pitch});if(d.Enters&&0<d.Enters.length){c.indoorPois=[];for(var e=0,f=d.Enters.length;e<f;e++)c.indoorPois.push({panoIId:d.Enters[e].IID,panoId:d.Enters[e].BreakID,title:d.Enters[e].Name,pointX:d.Enters[e].X/100,pointY:d.Enters[e].Y/100})}var f=[],g=d.VPoint;if(g)for(var i= g.length,e=0;e<i;e++){var k={};k.PID=g[e].PID;var l=bc.Sd.wi(new Q(g[e].X/100,g[e].Y/100));k.X=6378137*-(l.lat-c.position.lat)/180*Math.PI;k.Z=6378137*(l.lng-c.position.lng)/180*Math.PI;f.push(k)}c.VPoint=f;d.Inters&&0<d.Inters.length&&(c.$l=d.Inters[0].BreakID,c.kV=d.Inters[0].IID,c.heading=d.MoveDir,c.pitch=d.Pitch);b&&(c.$l=b.$l);c.copyright={};c.copyright.admission=d.Admission;c.copyright.dataProviderIndex=d.Provider;c.copyright.photoDate=d.Date;c.copyright.roadName=d.Rname;c.copyright.username= d.Username||"";return c},TS:function(a,b,c,d,e){var f=[],g={};if(a.Links)for(var i=0;i<a.Links.length;i++)f.push({id:a.Links[i].PID,dir:a.Links[i].DIR,x:a.Links[i].X/100,y:a.Links[i].Y/100,heading:a.Links[i].DIR,yh:this.jA(a.Links[i].DIR,e)});if(!a.Roads)return[f,g];for(i=0;i<a.Roads.length;i++)if(a.Roads[i].Panos)for(var k=0;k<a.Roads[i].Panos.length;k++){if(a.Roads[i].Panos[k].PID==b){var l=a.Roads[i].Name;""==l&&(l=a.Rname||"\\u672a\\u77e5");for(var m=p,n=p,u,v,w=k-1;0<=w;w--){a.Roads[i].Panos[w]&& m===p&&(m=a.Roads[i].Panos[w],u=(m.DIR+180)%360,g[u]=[]);var y=a.Roads[i].Panos[w];g[u]&&g[u].push({id:y.PID,x:y.X/100,y:y.Y/100,distanceToCurrent:this.Un(y.X/100,y.Y/100,c,d)})}m&&f.push({id:m.PID,dir:u,heading:u,description:l,x:m.X/100,y:m.Y/100,yh:this.jA(u,e)});for(w=k+1;w<a.Roads[i].Panos.length;w++)a.Roads[i].Panos[w]&&n===p&&(n=a.Roads[i].Panos[w],v=n.DIR,0==v&&(v=a.Roads[i].Panos[k].DIR),g[v]=[]),y=a.Roads[i].Panos[w],g[v]&&g[v].push({id:y.PID,x:y.X/100,y:y.Y/100,distanceToCurrent:this.Un(y.X/ 100,y.Y/100,c,d)});n!=p&&f.push({id:n.PID,dir:v,heading:v,description:l,x:n.X/100,y:n.Y/100,yh:this.jA(v,e)})}for(w=0;w<f.length;w++)a.Roads[i].Panos[k].PID==f[w].id&&(f[w].description=a.Roads[i].Name,""==f[w].description&&(f[w].description=a.Rname||"\\u672a\\u77e5"))}for(i=0;i<f.length;i++){var a=f[i].dir,b=q,C;for(C in g)if(C==a){b=o;break}if(b)break;g[a]=[{id:f[i].id,x:f[i].x,y:f[i].y,distanceToCurrent:this.Un(f[i].x,f[i].y,c,d)}]}return[f,g]},jA:function(a,b){var c=a+b;360<c&&(c%=360);return c= Math.round(100*c)/100},Un:function(a,b,c,d){return Math.round(Math.sqrt(Math.pow(a-c,2)+Math.pow(b-d,2)))},cS:function(a,b){this.Sg(bc.$k+"qt=idata&l=17&iid="+a+"&fn=",function(a){a&&a.result&&0===a.result.error?b(a.content[0].interinfo):b(p)})}});Vd=bc.prototype;S(Vd,{getPanoramaById:Vd.$o,getPanoramaByLocation:Vd.qj,getPanoramaByPOIId:Vd.ux});function Vh(a){this.tileSize=new L(512,512);this.worldSize=new L(512*this.ep(Uh),512*this.yx(Uh));this.centerHeading=180;var a=a||{},b;for(b in a)this[b]=a[b]}var Wh=z.tg("pano","scape/");x.extend(Vh.prototype,{getTilesUrl:function(a,b,c){return Wh[(b.x+b.y)%Wh.length]+"?qt=pdata&sid={sid}&pos={y}_{x}&z={zoom}".replace("{sid}",a).replace("{x}",b.x).replace("{y}",b.y).replace("{zoom}",c)},yx:function(a){return Math.pow(2,a-2)},ep:function(a){return 2*this.yx(a)}}); ');
