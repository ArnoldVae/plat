!function(a,b,c){"use strict";var d=ht.AlarmSeverity=function(a,b,c,d,e){this.value=a,this.name=b,this.nickName=c,this.color=d,this.displayName=e};ht.Default.def("ht.AlarmSeverity",b,{toString:function(){return this.displayName||this.name}}),function(){d.severities=new ht.List,d._vm={},d._nm={},d._cp=function(a,b){if(a&&b){var c=a.value-b.value;return c>0?1:0>c?-1:0}return a&&!b?1:!a&&b?-1:0},d.each=function(a,b){d.severities.each(a,b)},d.getSortFunction=function(){return d._cp},d.setSortFunction=function(a){d._cp=a,d.severities.sort(a)},d.add=function(a,b,c,e,f){var g=new d(a,b,c,e,f);return d._vm[a]=g,d._nm[b]=g,d.severities.add(g),d.severities.sort(d._cp),g},d.remove=function(a){var b=d._nm[a];return b&&(delete d._nm[a],delete d._vm[b.value],d.severities.remove(b)),b},d.CRITICAL=d.add(500,"Critical","C","#FF0000"),d.MAJOR=d.add(400,"Major","M","#FFA000"),d.MINOR=d.add(300,"Minor","m","#FFFF00"),d.WARNING=d.add(200,"Warning","W","#00FFFF"),d.INDETERMINATE=d.add(100,"Indeterminate","N","#C800FF"),d.CLEARED=d.add(0,"Cleared","R","#00FF00"),d.isClearedAlarmSeverity=function(a){return a?0===a.value:!1},d.getByName=function(a){return d._nm[a]},d.getByValue=function(a){return d._vm[a]},d.clear=function(){d.severities.clear(),d._vm={},d._nm={}},d.compare=function(a,b){return d._cp(a,b)}}();var e=ht.AlarmState=function(a){this._d=a,this._nm={},this._am={},this._ps=null,this._haa=null,this._hna=null,this._hoa=null,this._hta=null,this._hls=!1,this._aac=0,this._nac=0};ht.Default.def("ht.AlarmState",b,{_ep:!0,_f:function(){this._c1(),this._c2(),this._c3(),this._c4(),this._c5(),this._c6(),this._c7(),this._d.fp("alarmState",null,this)},getHighestAcknowledgedAlarmSeverity:function(){return this._haa},getHighestNewAlarmSeverity:function(){return this._hna},getHighestOverallAlarmSeverity:function(){return this._hoa},getHighestNativeAlarmSeverity:function(){return this._hta},hasLessSevereNewAlarms:function(){return this._hls},_c1:function(){var a=null;for(var b in this._am)b=d.getByName(b),d.isClearedAlarmSeverity(b)||0!==this.getAcknowledgedAlarmCount(b)&&(a=a&&d.compare(a,b)>0?a:b);this._haa=a},_c2:function(){var a=null;for(var b in this._nm)b=d.getByName(b),d.isClearedAlarmSeverity(b)||0!==this.getNewAlarmCount(b)&&(a=a&&d.compare(a,b)>0?a:b);this._hna=a},_c3:function(){if(!this._hna)return void(this._hls=!1);for(var a in this._nm)if(a=d.getByName(a),!d.isClearedAlarmSeverity(a)&&0!==this.getNewAlarmCount(a)&&d.compare(this._hna,a)>0)return void(this._hls=!0);this._hls=!1},_c4:function(){var a=this._haa,b=this._hna,c=this._ps;this._hoa=a,d.compare(b,this._hoa)>0&&(this._hoa=b),d.compare(c,this._hoa)>0&&(this._hoa=c)},_c5:function(){var a=this._haa,b=this._hna;this._hta=a,d.compare(b,this._hta)>0&&(this._hta=b)},increaseAcknowledgedAlarm:function(a,b){if(0!==b){b=b||1;var c=this._am[a.name]||0;c+=b,this._am[a.name]=c,this._f()}},increaseNewAlarm:function(a,b){if(0!==b){b=b||1;var c=this._nm[a.name]||0;c+=b,this._nm[a.name]=c,this._f()}},decreaseAcknowledgedAlarm:function(a,b){if(0!==b){b||(b=1);var c=this._am[a.name]||0;if(c-=b,0>c)throw"Alarm count can not be negative";this._am[a.name]=c,this._f()}},decreaseNewAlarm:function(a,b){if(0!==b){b||(b=1);var c=this._nm[a.name]||0;if(c-=b,0>c)throw"Alarm count can not be negative";this._nm[a.name]=c,this._f()}},acknowledgeAlarm:function(a){this.decreaseNewAlarm(a,1),this.increaseAcknowledgedAlarm(a,1)},acknowledgeAllAlarms:function(a){if(a){var b=this.getNewAlarmCount(a);this.decreaseNewAlarm(a,b),this.increaseAcknowledgedAlarm(a,b)}else for(var c in this._nm)this.acknowledgeAllAlarms(d.getByName(c))},_c6:function(){this._aac=0;for(var a in this._am)a=d.getByName(a),this._aac+=this.getAcknowledgedAlarmCount(a)},getAcknowledgedAlarmCount:function(a){return a?this._am[a.name]||0:this._aac},getAlarmCount:function(a){return this.getAcknowledgedAlarmCount(a)+this.getNewAlarmCount(a)},_c7:function(){this._nac=0;for(var a in this._nm)this._nac+=this.getNewAlarmCount(d.getByName(a))},getNewAlarmCount:function(a){return a?this._nm[a.name]||0:this._nac},setNewAlarmCount:function(a,b){this._nm[a.name]=b,this._f()},removeAllNewAlarms:function(a){a?delete this._nm[a]:this._nm={},this._f()},setAcknowledgedAlarmCount:function(a,b){this._am[a.name]=b,this._f()},removeAllAcknowledgedAlarms:function(a){a?delete this._am[a.name]:this._am={},this._f()},isEmpty:function(){return!this._hoa},clear:function(){this._am={},this._nm={},this._f()},getPropagateSeverity:function(){return this._ps},setPropagateSeverity:function(a){if(this._ep||(a=null),this._ps!==a){var b=this._ps;this._ps=a,this._f(),this._d.fp("propagateSeverity",b,a)}},isEnablePropagation:function(){return this._ep},setEnablePropagation:function(a){var b=this._ep;this._ep=a,this._d.fp("enablePropagation",b,a)&&(a||this.setPropagateSeverity(null))}});var f=ht.AlarmStatePropagator=function(a){this._dataModel=a,this._enable=!1,this._isPropagating=!1};ht.Default.def("ht.AlarmStatePropagator",b,{getDataModel:function(){return this._dataModel},isEnable:function(){return this._enable},setEnable:function(a){this._enable!==a&&(this._enable=a,this._enable?(this._dataModel.mm(this.handleDataModelChange,this),this._dataModel.md(this.handleDataPropertyChange,this),this._dataModel.each(function(a){this.propagate(a)},this)):(this._dataModel.umm(this.handleDataModelChange,this),this._dataModel.umd(this.handleDataPropertyChange,this)))},handleDataModelChange:function(a){a.data&&this.propagate(a.data)},handleDataPropertyChange:function(a){if("alarmState"===a.property||"enablePropagation"===a.property)this.propagate(a.data);else if("parent"===a.property){var b=a.oldValue;b&&this.propagate(b),this.propagate(a.data)}},propagate:function(a){a&&!this._isPropagating&&(this._isPropagating=!0,this.propagateToTop(a),this._isPropagating=!1)},propagateToTop:function(a){for(this.propagateToParent(null,a);a&&a.getParent();)this.propagateToParent(a,a.getParent()),a=a.getParent()},propagateToParent:function(a,b){var c=null;b.getChildren().each(function(a){var b=a.getAlarmState().getHighestOverallAlarmSeverity();d.compare(b,c)>0&&(c=b)}),b.getAlarmState().setPropagateSeverity(c)}});ht.AlarmStateStatistics=function(a){this.sumNew=0,this.sumAcked=0,this.sumTotal=0,this.severtiyMap={},this.dataMap={},this.setDataModel(a)};ht.Default.def("ht.AlarmStateStatistics",b,{ms_fire:1,getDataModel:function(){return this._dataModel},setDataModel:function(a){var b=this._dataModel;b!==a&&(b&&(b.umd(this.handleDataPropertyChange,this),b.umm(this.handleDataModelChange,this),this.severtiyMap={},this.dataMap={}),this._dataModel=a,this.reset(),a.md(this.handleDataPropertyChange,this),a.mm(this.handleDataModelChange,this),this.fp("dataModel",b,a))},dispose:function(){this._dataModel.umd(this.handleDataPropertyChange,this),this._dataModel.umm(this.handleDataModelChange,this),delete this._dataModel},handleDataPropertyChange:function(a){"alarmState"===a.property&&(this.increase(a.data),this.fireAlarmStateChange())},handleDataModelChange:function(a){"add"===a.kind?(this.increase(a.data),this.fireAlarmStateChange()):"remove"===a.kind?(this.decrease(a.data),this.fireAlarmStateChange()):"clear"===a.kind&&(this.severtiyMap={},this.dataMap={},this.fireAlarmStateChange())},fireAlarmStateChange:function(){this.sumAcked=0,this.sumNew=0,this.sumTotal=0,d.each(function(a){var b=this.getSumInfo(a);this.sumAcked+=b.ackedCount,this.sumNew+=b.newCount,this.sumTotal+=b.totalCount},this),this.fp("alarmState",!1,!0)},getNewAlarmCount:function(a){if(!a)return this.sumNew;var b=this.getSumInfo(a);return b.newCount},getAcknowledgedAlarmCount:function(a){if(!a)return this.sumAcked;var b=this.getSumInfo(a);return b.ackedCount},getTotalAlarmCount:function(a){if(!a)return this.sumTotal;var b=this.getSumInfo(a);return b.totalCount},getSumInfo:function(a){var b=this.severtiyMap[a.name];return b||(b={},b.newCount=0,b.ackedCount=0,b.totalCount=0,this.severtiyMap[a.name]=b),b},decrease:function(a){var b=this.dataMap[a.getId()];b&&(delete this.dataMap[a.getId()],d.each(function(a){var c=b[a.name],d=this.getSumInfo(a);d.newCount=d.newCount-c.newCount,d.ackedCount=d.ackedCount-c.ackedCount,d.totalCount=d.totalCount-c.totalCount},this))},increase:function(a){if(this.decrease(a),!this._filterFunc||this._filterFunc(a)){var b={},c=a.getAlarmState();this.dataMap[a.getId()]=b,d.each(function(a){var d={};d.newCount=c.getNewAlarmCount(a),d.ackedCount=c.getAcknowledgedAlarmCount(a),d.totalCount=c.getAlarmCount(a),b[a.name]=d;var e=this.getSumInfo(a);e.newCount=e.newCount+d.newCount,e.ackedCount=e.ackedCount+d.ackedCount,e.totalCount=e.totalCount+d.totalCount},this)}},reset:function(){this.severtiyMap={},this.dataMap={},this._dataModel.each(this.increase,this),this.fireAlarmStateChange()},setFilterFunc:function(a){var b=this._filterFunc;this._filterFunc=a,this.reset(),this.fp("filterFunc",b,a)},getFilterFunc:function(){return this._filterFunc}});var g=ht.Data.prototype;g.getAlarmState=function(){return this._alarmState||(this._alarmState=new e(this))},g=ht.DataModel.prototype,g.isEnableAlarmStatePropagator=function(){return!!this._alarmStatePropagator&&this._alarmStatePropagator.isEnable()},g.setEnableAlarmStatePropagator=function(a){a!=this.isEnableAlarmStatePropagator()&&(a?(this._alarmStatePropagator=new f(this)).setEnable(!0):this._alarmStatePropagator.setEnable(!1))},g=ht.graph.GraphView.prototype,g.getNote2=function(a){var b=a.getAlarmState().getHighestNewAlarmSeverity();if(b){var c=a.getAlarmState().getNewAlarmCount(b)+b.nickName;return a.getAlarmState().hasLessSevereNewAlarms()&&(c+="+"),c}return a.s("note2")},g.getNote2Background=function(a){var b=a.getAlarmState().getHighestNewAlarmSeverity();return b?b.color:a.s("note2.background")},g.getBodyColor=function(a){var b=a.getAlarmState().getHighestNativeAlarmSeverity();return b?b.color:a.s("body.color")},g.getBorderColor=function(a){var b=a.getAlarmState().getPropagateSeverity();return b?b.color:a.s("border.color")},g=ht.widget.TreeView.prototype,g.getBorderColor=function(a){var b=a.getAlarmState().getPropagateSeverity();return b?b.color:a.s("border.color")},g.getIcon=function(a){return a.getIcon()?"__alarmIcon__":null},g=ht.widget.TreeTableView.prototype,g.getBorderColor=function(a){var b=a.getAlarmState().getPropagateSeverity();return b?b.color:a.s("border.color")},g.getIcon=function(a){return a.getIcon()?"__alarmIcon__":null},ht.Default.setImage("__alarmIcon__",{width:16,height:16,comps:[{type:"image",name:{func:function(a){return a.getIcon()}},color:{func:function(a){var b=a.getAlarmState().getHighestNativeAlarmSeverity();return b?b.color:a.s("body.color")}},rect:[0,0,16,16]}]});var h=ht.Style;h["note2.expanded"]=!0,h["note2.color"]="#000"}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);