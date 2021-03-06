/*
 * FullCalendar v1.4.5
 * http://arshaw.com/fullcalendar/
 *
 * Use fullcalendar.css for basic styling.
 * For event drag & drop, required jQuery UI draggable.
 * For event resizing, requires jQuery UI resizable.
 *
 * Copyright (c) 2009 Adam Shaw
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Sun Feb 21 20:30:11 2010 -0800
 *
 */
(function(D){var I=D.fullCalendar={};var f=I.views={};var F={defaultView:"month",aspectRatio:1.35,header:{left:"title",center:"",right:"today prev,next"},weekends:true,allDayDefault:true,lazyFetching:true,startParam:"start",endParam:"end",titleFormat:{month:"MMMM yyyy",week:"MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",day:"dddd, MMM d, yyyy"},columnFormat:{month:"ddd",week:"ddd M/d",day:"dddd M/d"},timeFormat:{"":"h(:mm)t"},isRTL:false,firstDay:0,monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],buttonText:{prev:"&nbsp;&#9668;&nbsp;",next:"&nbsp;&#9658;&nbsp;",prevYear:"&nbsp;&lt;&lt;&nbsp;",nextYear:"&nbsp;&gt;&gt;&nbsp;",today:"today",month:"month",week:"week",day:"day"},theme:false,buttonIcons:{prev:"circle-triangle-w",next:"circle-triangle-e"}};var b={header:{left:"next,prev today",center:"",right:"title"},buttonText:{prev:"&nbsp;&#9658;&nbsp;",next:"&nbsp;&#9668;&nbsp;",prevYear:"&nbsp;&gt;&gt;&nbsp;",nextYear:"&nbsp;&lt;&lt;&nbsp;"},buttonIcons:{prev:"circle-triangle-e",next:"circle-triangle-w"}};var M=I.setDefaults=function(ac){D.extend(true,F,ac)};D.fn.fullCalendar=function(af){if(typeof af=="string"){var ae=Array.prototype.slice.call(arguments,1),ag;this.each(function(){var ai=D.data(this,"fullCalendar");if(ai){var ah=ai[af].apply(this,ae);if(ag==m){ag=ah}}});if(ag!=m){return ag}return this}var ad=af.eventSources||[];delete af.eventSources;if(af.events){ad.push(af.events);delete af.events}ad.unshift([]);af=D.extend(true,{},F,(af.isRTL||af.isRTL==m&&F.isRTL)?b:{},af);var ac=af.theme?"ui":"fc";this.each(function(){var aI=this,ax=D(aI).addClass("fc"),aB,ar=D("<div class='fc-content "+ac+"-widget-content' style='position:relative'/>").prependTo(aI),al,aD=0,aJ=0,aN=new Date(),ap,ai,aQ={},aq;if(af.isRTL){ax.addClass("fc-rtl")}if(af.theme){ax.addClass("ui-widget")}if(af.year!=m&&af.year!=aN.getFullYear()){aN.setDate(1);aN.setMonth(0);aN.setFullYear(af.year)}if(af.month!=m&&af.month!=aN.getMonth()){aN.setDate(1);aN.setMonth(af.month)}if(af.date!=m){aN.setDate(af.date)}function an(aU){if(aU!=ap){aJ++;var aV=ai,aT;if(aV){if(aV.eventsChanged){ah();aV.eventDirty=aV.eventsChanged=false}if(aV.beforeHide){aV.beforeHide()}aa(ar,ar.height());aV.element.hide()}else{aa(ar,1)}ar.css("overflow","hidden");if(aQ[aU]){(ai=aQ[aU]).element.show()}else{ai=aQ[aU]=D.fullCalendar.views[aU](aT=aq=D("<div class='fc-view fc-view-"+aU+"' style='position:absolute'/>").appendTo(ar),af)}if(aj){aj.find("div.fc-button-"+ap).removeClass(ac+"-state-active");aj.find("div.fc-button-"+aU).addClass(ac+"-state-active")}ai.name=ap=aU;aC();ar.css("overflow","");if(aV){aa(ar,1)}if(!aT&&ai.afterShow){ai.afterShow()}aJ--}}function aC(aU){if(aG()){aJ++;if(al==m){aE()}if(!ai.start||aU||aN<ai.start||aN>=ai.end){ai.render(aN,aU||0);aH(true);if(!aA||!af.lazyFetching||ai.visStart<aA||ai.visEnd>aO){aF()}else{ai.renderEvents(az)}}else{if(ai.sizeDirty||ai.eventsDirty||!af.lazyFetching){ai.clearEvents();if(ai.sizeDirty){aH()}if(af.lazyFetching){ai.renderEvents(az)}else{aF()}}}aB=ax.outerWidth();ai.sizeDirty=false;ai.eventsDirty=false;if(aj){aj.find("h2.fc-header-title").html(ai.title);var aT=new Date();if(aT>=ai.start&&aT<ai.end){aj.find("div.fc-button-today").addClass(ac+"-state-disabled")}else{aj.find("div.fc-button-today").removeClass(ac+"-state-disabled")}}aJ--;ai.trigger("viewDisplay",aI)}}function aG(){return aI.offsetWidth!==0}function av(){return D("body")[0].offsetWidth!==0}function au(){ah();if(aG()){ai.clearEvents();ai.renderEvents(az);ai.eventsDirty=false}}function ah(){D.each(aQ,function(){this.eventsDirty=true})}function ay(){aR();if(aG()){aE();aH();ai.rerenderEvents();ai.sizeDirty=false}}function aR(){D.each(aQ,function(){this.sizeDirty=true})}var az=[],aA,aO;function aP(aW){az=[];aA=Q(ai.visStart);aO=Q(ai.visEnd);var aV=ad.length,aT=function(){if(--aV==0){if(aW){aW(az)}}},aU=0;for(;aU<ad.length;aU++){aw(ad[aU],aT)}}function aw(aY,aZ){var aU=ai.name,aX=Q(aN),aW=function(a0){if(aU==ai.name&&+aX==+aN&&D.inArray(aY,ad)!=-1){for(var a1=0;a1<a0.length;a1++){C(a0[a1],af);a0[a1].source=aY}az=az.concat(a0);if(aZ){aZ(a0)}}},aT=function(a0){aW(a0);ak()};if(typeof aY=="string"){var aV={};aV[af.startParam]=Math.round(aA.getTime()/1000);aV[af.endParam]=Math.round(aO.getTime()/1000);if(af.cacheParam){aV[af.cacheParam]=(new Date()).getTime()}ao();D.ajax({url:aY,dataType:"json",data:aV,cache:af.cacheParam||false,success:aT})}else{if(D.isFunction(aY)){ao();aY(Q(aA),Q(aO),aT)}else{aW(aY)}}}function aF(){aP(function(aT){ai.renderEvents(aT)})}var aS=0;function ao(){if(!aS++){ai.trigger("loading",aI,true)}}function ak(){if(!--aS){ai.trigger("loading",aI,false)}}var aL={render:function(){aE();aR();ah();aC()},changeView:an,getView:function(){return ai},getDate:function(){return aN},option:function(aT,aU){if(aU==m){return af[aT]}if(aT=="height"||aT=="contentHeight"||aT=="aspectRatio"){af[aT]=aU;ay()}},destroy:function(){D(window).unbind("resize",at);if(aj){aj.remove()}ar.remove();D.removeData(aI,"fullCalendar")},prev:function(){aC(-1)},next:function(){aC(1)},prevYear:function(){Y(aN,-1);aC()},nextYear:function(){Y(aN,1);aC()},today:function(){aN=new Date();aC()},gotoDate:function(aT,aV,aU){if(typeof aT=="object"){aN=Q(aT)}else{if(aT!=m){aN.setFullYear(aT)}if(aV!=m){aN.setMonth(aV)}if(aU!=m){aN.setDate(aU)}}aC()},incrementDate:function(aU,aT,aV){if(aU!=m){Y(aN,aU)}if(aT!=m){p(aN,aT)}if(aV!=m){y(aN,aV)}aC()},updateEvent:function(aX){var aV,aT=az.length,aY,aW=aX.start-aX._start,aU=aX.end?(aX.end-(aX._end||ai.defaultEventEnd(aX))):0;for(aV=0;aV<aT;aV++){aY=az[aV];if(aY._id==aX._id&&aY!=aX){aY.start=new Date(+aY.start+aW);if(aX.end){if(aY.end){aY.end=new Date(+aY.end+aU)}else{aY.end=new Date(+ai.defaultEventEnd(aY)+aU)}}else{aY.end=null}aY.title=aX.title;aY.url=aX.url;aY.allDay=aX.allDay;aY.className=aX.className;aY.editable=aX.editable;C(aY,af)}}C(aX,af);au()},renderEvent:function(aU,aT){C(aU,af);if(!aU.source){if(aT){(aU.source=ad[0]).push(aU)}az.push(aU)}au()},removeEvents:function(aU){if(!aU){az=[];for(var aT=0;aT<ad.length;aT++){if(typeof ad[aT]=="object"){ad[aT]=[]}}}else{if(!D.isFunction(aU)){var aV=aU+"";aU=function(aW){return aW._id==aV}}az=D.grep(az,aU,true);for(var aT=0;aT<ad.length;aT++){if(typeof ad[aT]=="object"){ad[aT]=D.grep(ad[aT],aU,true)}}}au()},clientEvents:function(aT){if(D.isFunction(aT)){return D.grep(az,aT)}else{if(aT){aT+="";return D.grep(az,function(aU){return aU._id==aT})}}return az},rerenderEvents:au,addEventSource:function(aT){ad.push(aT);aw(aT,au)},removeEventSource:function(aT){ad=D.grep(ad,function(aU){return aU!=aT});az=D.grep(az,function(aU){return aU.source!=aT});au()},refetchEvents:function(){aP(au)}};D.data(this,"fullCalendar",aL);var aj,aK=af.header;if(aK){aj=D("<table class='fc-header'/>").append(D("<tr/>").append(D("<td class='fc-header-left'/>").append(aM(aK.left))).append(D("<td class='fc-header-center'/>").append(aM(aK.center))).append(D("<td class='fc-header-right'/>").append(aM(aK.right)))).prependTo(ax)}function aM(aT){if(aT){var aU=D("<tr/>");D.each(aT.split(" "),function(aW){if(aW>0){aU.append("<td><span class='fc-header-space'/></td>")}var aV;D.each(this.split(","),function(aZ,aY){if(aY=="title"){aU.append("<td><h2 class='fc-header-title'>&nbsp;</h2></td>");if(aV){aV.addClass(ac+"-corner-right")}aV=null}else{var aX;if(aL[aY]){aX=aL[aY]}else{if(f[aY]){aX=function(){a0.removeClass(ac+"-state-hover");an(aY)}}}if(aX){if(aV){aV.addClass(ac+"-no-right")}var a0,a1=af.theme?i(af.buttonIcons,aY):null,a2=i(af.buttonText,aY);if(a1){a0=D("<div class='fc-button-"+aY+" ui-state-default'><a><span class='ui-icon ui-icon-"+a1+"'/></a></div>")}else{if(a2){a0=D("<div class='fc-button-"+aY+" "+ac+"-state-default'><a><span>"+a2+"</span></a></div>")}}if(a0){a0.click(function(){if(!a0.hasClass(ac+"-state-disabled")){aX()}}).mousedown(function(){a0.not("."+ac+"-state-active").not("."+ac+"-state-disabled").addClass(ac+"-state-down")}).mouseup(function(){a0.removeClass(ac+"-state-down")}).hover(function(){a0.not("."+ac+"-state-active").not("."+ac+"-state-disabled").addClass(ac+"-state-hover")},function(){a0.removeClass(ac+"-state-hover").removeClass(ac+"-state-down")}).appendTo(D("<td/>").appendTo(aU));if(aV){aV.addClass(ac+"-no-right")}else{a0.addClass(ac+"-corner-left")}aV=a0}}}});if(aV){aV.addClass(ac+"-corner-right")}});return D("<table/>").append(aU)}}function aE(){if(af.contentHeight){al=af.contentHeight}else{if(af.height){al=af.height-(aj?aj.height():0)-O(ar[0])}else{al=Math.round(ar.width()/Math.max(af.aspectRatio,0.5))}}}function aH(aT){aJ++;ai.setHeight(al,aT);if(aq){aq.css("position","relative");aq=null}ai.setWidth(ar.width(),aT);aJ--}function at(){if(!aJ){if(ai.start){var aT=++aD;setTimeout(function(){if(aT==aD&&!aJ&&aG()){if(aB!=(aB=ax.outerWidth())){aJ++;ay();ai.trigger("windowResize",aI);aJ--}}},200)}else{am()}}}D(window).resize(at);an(af.defaultView);if(!av()){am()}function am(){setTimeout(function(){if(!ai.start&&av()){aC()}},0)}});return this};var P=0;function C(ad,ac){ad._id=ad._id||(ad.id==m?"_fc"+P++:ad.id+"");if(ad.date){if(!ad.start){ad.start=ad.date}delete ad.date}ad._start=Q(ad.start=g(ad.start));ad.end=g(ad.end);if(ad.end&&ad.end<=ad.start){ad.end=null}ad._end=ad.end?Q(ad.end):null;if(ad.allDay==m){ad.allDay=ac.allDayDefault}if(ad.className){if(typeof ad.className=="string"){ad.className=ad.className.split(/\s+/)}}else{ad.className=[]}}M({weekMode:"fixed"});f.month=function(ad,ac){return new E(ad,ac,{render:function(ag,ak){if(ak){p(ag,ak);ag.setDate(1)}var aj=this.start=Q(ag,true);aj.setDate(1);this.end=p(Q(aj),1);var af=this.visStart=Q(aj),ae=this.visEnd=Q(this.end),ah=ac.weekends?0:1;if(ah){Z(af);Z(ae,-1,true)}y(af,-((af.getDay()-Math.max(ac.firstDay,ah)+7)%7));y(ae,(7-ae.getDay()+Math.max(ac.firstDay,ah))%7);var ai=Math.round((ae-af)/(S*7));if(ac.weekMode=="fixed"){y(ae,(6-ai)*7);ai=6}this.title=N(aj,this.option("titleFormat"),ac);this.renderGrid(ai,ac.weekends?7:5,this.option("columnFormat"),true)}})};f.basicWeek=function(ad,ac){return new E(ad,ac,{render:function(ag,ah){if(ah){y(ag,ah*7)}var af=this.visStart=Q(this.start=y(Q(ag),-((ag.getDay()-ac.firstDay+7)%7))),ae=this.visEnd=Q(this.end=y(Q(af),7));if(!ac.weekends){Z(af);Z(ae,-1,true)}this.title=u(af,y(Q(ae),-1),this.option("titleFormat"),ac);this.renderGrid(1,ac.weekends?7:5,this.option("columnFormat"),false)}})};f.basicDay=function(ad,ac){return new E(ad,ac,{render:function(ae,af){if(af){y(ae,af);if(!ac.weekends){Z(ae,af<0?-1:1)}}this.title=N(ae,this.option("titleFormat"),ac);this.start=this.visStart=Q(ae,true);this.end=this.visEnd=y(Q(this.start),1);this.renderGrid(1,1,this.option("columnFormat"),false)}})};var G;function E(af,aj,aG){var ag,at,ak,am,az,ay,aD,ax,an,aC,aI,aE,ad,ap=[],ai,aw=new J(function(aJ){return ad.find("td:eq("+((aJ-Math.max(at,ak)+aC)%aC)+") div div")}),au=D.extend(this,l,aG,{renderGrid:aB,renderEvents:ah,rerenderEvents:aF,clearEvents:aq,setHeight:ao,setWidth:ae,defaultEventEnd:function(aJ){return Q(aJ.start)}});au.init(af,aj);af.addClass("fc-grid");if(af.disableSelection){af.disableSelection()}function aB(aJ,aP,aM,aR){an=aJ;aC=aP;ag=aj.theme?"ui":"fc";ak=aj.weekends?0:1;at=aj.firstDay;if(am=aj.isRTL){az=-1;ay=aC-1}else{az=1;ay=0}var aN=au.start.getMonth(),aQ=w(new Date()),aU,aL,aK,aO=Q(au.visStart);if(!ad){var aT=D("<table/>").appendTo(af);aU="<thead><tr>";for(aL=0;aL<aC;aL++){aU+="<th class='fc-"+U[aO.getDay()]+" "+ag+"-state-default"+(aL==ay?" fc-leftmost":"")+"'>"+N(aO,aM,aj)+"</th>";y(aO,1);if(ak){Z(aO)}}aE=D(aU+"</tr></thead>").appendTo(aT);aU="<tbody>";aO=Q(au.visStart);for(aL=0;aL<an;aL++){aU+="<tr class='fc-week"+aL+"'>";for(aK=0;aK<aC;aK++){aU+="<td class='fc-"+U[aO.getDay()]+" "+ag+"-state-default fc-day"+(aL*aC+aK)+(aK==ay?" fc-leftmost":"")+(an>1&&aO.getMonth()!=aN?" fc-other-month":"")+(+aO==+aQ?" fc-today "+ag+"-state-highlight":" fc-not-today")+"'>"+(aR?"<div class='fc-day-number'>"+aO.getDate()+"</div>":"")+"<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></td>";y(aO,1);if(ak){Z(aO)}}aU+="</tr>"}ad=D(aU+"</tbody>").appendTo(aT);ad.find("td").click(ac);ai=D("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(af)}else{aq();var aS=ad.find("tr").length;if(an<aS){ad.find("tr:gt("+(an-1)+")").remove()}else{if(an>aS){aU="";for(aL=aS;aL<an;aL++){aU+="<tr class='fc-week"+aL+"'>";for(aK=0;aK<aC;aK++){aU+="<td class='fc-"+U[aO.getDay()]+" "+ag+"-state-default fc-new fc-day"+(aL*aC+aK)+(aK==ay?" fc-leftmost":"")+"'>"+(aR?"<div class='fc-day-number'></div>":"")+"<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></td>";y(aO,1);if(ak){Z(aO)}}aU+="</tr>"}ad.append(aU)}}ad.find("td.fc-new").removeClass("fc-new").click(ac);aO=Q(au.visStart);ad.find("td").each(function(){var aV=D(this);if(an>1){if(aO.getMonth()==aN){aV.removeClass("fc-other-month")}else{aV.addClass("fc-other-month")}}if(+aO==+aQ){aV.removeClass("fc-not-today").addClass("fc-today").addClass(ag+"-state-highlight")}else{aV.addClass("fc-not-today").removeClass("fc-today").removeClass(ag+"-state-highlight")}aV.find("div.fc-day-number").text(aO.getDate());y(aO,1);if(ak){Z(aO)}});if(an==1){aO=Q(au.visStart);aE.find("th").each(function(){D(this).text(N(aO,aM,aj));this.className=this.className.replace(/^fc-\w+(?= )/,"fc-"+U[aO.getDay()]);y(aO,1);if(ak){Z(aO)}});aO=Q(au.visStart);ad.find("td").each(function(){this.className=this.className.replace(/^fc-\w+(?= )/,"fc-"+U[aO.getDay()]);y(aO,1);if(ak){Z(aO)}})}}}function ac(aK){var aL=parseInt(this.className.match(/fc\-day(\d+)/)[1]),aJ=y(Q(au.visStart),Math.floor(aL/aC)*7+aL%aC);au.trigger("dayClick",this,aJ,true,aK)}function ao(aJ){ax=aJ;var aK=ad.find("tr td:first-child"),aP=ax-aE.height(),aN,aM;if(aj.weekMode=="variable"){aN=aM=Math.floor(aP/(an==1?2:6))}else{aN=Math.floor(aP/an);aM=aP-aN*(an-1)}if(G==m){var aL=ad.find("tr:first"),aO=aL.find("td:first");aO.height(aN);G=aN!=aO.height()}if(G){aK.slice(0,-1).height(aN);aK.slice(-1).height(aM)}else{h(aK.slice(0,-1),aN);h(aK.slice(-1),aM)}}function ae(aJ){aD=aJ;aw.clear();V(aE.find("th").slice(0,-1),aI=Math.floor(aD/aC))}function ah(aJ){au.reportEvents(ap=aJ);al(ar(aJ))}function aF(aJ){aq();al(ar(ap),aJ)}function aq(){au._clearEvents();ai.empty()}function ar(aS){var aL=Q(au.visStart),aJ=y(Q(aL),aC),aR=D.map(aS,aA),aQ,aT,aP,aK,aN,aO,aM=[];for(aQ=0;aQ<an;aQ++){aT=H(au.sliceSegs(aS,aR,aL,aJ));for(aP=0;aP<aT.length;aP++){aK=aT[aP];for(aN=0;aN<aK.length;aN++){aO=aK[aN];aO.row=aQ;aO.level=aP;aM.push(aO)}}y(aL,7);y(aJ,7)}return aM}function al(aJ,aK){c(aJ,an,au,0,aD,function(aL){return ad.find("tr:eq("+aL+")")},aw.left,aw.right,ai,aH,aK)}function aA(aK){if(aK.end){var aJ=Q(aK.end);return(aK.allDay||aJ.getHours()||aJ.getMinutes())?y(aJ,1):aJ}else{return y(Q(aK.start),1)}}function aH(aL,aK,aJ){au.eventElementHandlers(aL,aK);if(aL.editable||aL.editable==m&&aj.editable){av(aL,aK);if(aJ.isEnd){au.resizableDayEvent(aL,aK,aI)}}}function av(aL,aK){if(!aj.disableDragging&&aK.draggable){var aJ;aK.draggable({zIndex:9,delay:50,opacity:au.option("dragOpacity"),revertDuration:aj.dragRevertDuration,start:function(aN,aO){au.hideEvents(aL,aK);au.trigger("eventDragStart",aK,aL,aN,aO);aJ=new e(function(aP){aK.draggable("option","revert",!aP||!aP.rowDelta&&!aP.colDelta);if(aP){au.showOverlay(aP)}else{au.hideOverlay()}});ad.find("tr").each(function(){aJ.row(this)});var aM=ad.find("tr:first td");if(am){aM=D(aM.get().reverse())}aM.each(function(){aJ.col(this)});aJ.mouse(aN.pageX,aN.pageY)},drag:function(aM){aJ.mouse(aM.pageX,aM.pageY)},stop:function(aN,aO){au.hideOverlay();au.trigger("eventDragStop",aK,aL,aN,aO);var aM=aJ.cell;if(!aM||!aM.rowDelta&&!aM.colDelta){if(D.browser.msie){aK.css("filter","")}au.showEvents(aL,aK)}else{aK.find("a").removeAttr("href");au.eventDrop(this,aL,aM.rowDelta*7+aM.colDelta*az,0,aL.allDay,aN,aO)}}})}}}function c(ar,ak,ao,au,ay,aA,aq,aK,ag,aG,at){var af=ao.options,aj=af.isRTL,aw,aD=ar.length,aB,av,ae,ai,aF,an="",aE,ax,al,aJ={},ac={},aI,aH,am,ap,ah,aC,ad=[],az=[];for(aw=0;aw<aD;aw++){aB=ar[aw];av=aB.event;ae="fc-event fc-event-hori ";if(aj){if(aB.isStart){ae+="fc-corner-right "}if(aB.isEnd){ae+="fc-corner-left "}ai=aB.isEnd?aq(aB.end.getDay()-1):au;aF=aB.isStart?aK(aB.start.getDay()):ay}else{if(aB.isStart){ae+="fc-corner-left "}if(aB.isEnd){ae+="fc-corner-right "}ai=aB.isStart?aq(aB.start.getDay()):au;aF=aB.isEnd?aK(aB.end.getDay()-1):ay}an+="<div class='"+ae+av.className.join(" ")+"' style='position:absolute;z-index:8;left:"+ai+"px'><a"+(av.url?" href='"+K(av.url)+"'":"")+">"+(!av.allDay&&aB.isStart?"<span class='fc-event-time'>"+K(u(av.start,av.end,ao.option("timeFormat"),af))+"</span>":"")+"<span class='fc-event-title'>"+K(av.title)+"</span></a>"+((av.editable||av.editable==m&&af.editable)&&!af.disableResizing&&D.fn.resizable?"<div class='ui-resizable-handle ui-resizable-"+(aj?"w":"e")+"'></div>":"")+"</div>";aB.left=ai;aB.outerWidth=aF-ai}ag[0].innerHTML=an;aE=ag.children();for(aw=0;aw<aD;aw++){aB=ar[aw];ax=D(aE[aw]);av=aB.event;al=ao.trigger("eventRender",av,av,ax);if(al===false){ax.remove()}else{if(al&&al!==true){ax.remove();ax=D(al).css({position:"absolute",left:aB.left}).appendTo(ag)}aB.element=ax;if(av._id===at){aG(av,ax,aB)}else{ax[0]._fci=aw}ao.reportEventElement(av,ax)}}T(ag,ar,aG);for(aw=0;aw<aD;aw++){aB=ar[aw];if(ax=aB.element){aH=aJ[aI=aB.key=X(ax[0])];aB.hsides=aH==m?(aJ[aI]=B(ax[0],true)):aH}}for(aw=0;aw<aD;aw++){aB=ar[aw];if(ax=aB.element){ax[0].style.width=aB.outerWidth-aB.hsides+"px"}}for(aw=0;aw<aD;aw++){aB=ar[aw];if(ax=aB.element){aH=ac[aI=aB.key];aB.outerHeight=ax[0].offsetHeight+(aH==m?(ac[aI]=t(ax[0])):aH)}}for(aw=0,am=0;am<ak;am++){ap=ah=aC=0;while(aw<aD&&(aB=ar[aw]).row==am){if(aB.level!=ah){ap+=aC;aC=0;ah++}aC=Math.max(aC,aB.outerHeight||0);aB.top=ap;aw++}ad[am]=aA(am).find("td:first div.fc-day-content > div").height(ap+aC)}for(am=0;am<ak;am++){az[am]=ad[am][0].offsetTop}for(aw=0;aw<aD;aw++){aB=ar[aw];if(ax=aB.element){ax[0].style.top=az[aB.row]+aB.top+"px";av=aB.event;ao.trigger("eventAfterRender",av,av,ax)}}}M({allDaySlot:true,allDayText:"all-day",firstHour:6,slotMinutes:30,defaultEventMinutes:120,axisFormat:"h(:mm)tt",timeFormat:{agenda:"h:mm{ - h:mm}"},dragOpacity:{agenda:0.5},minTime:0,maxTime:24});f.agendaWeek=function(ad,ac){return new v(ad,ac,{render:function(ag,ah){if(ah){y(ag,ah*7)}var af=this.visStart=Q(this.start=y(Q(ag),-((ag.getDay()-ac.firstDay+7)%7))),ae=this.visEnd=Q(this.end=y(Q(af),7));if(!ac.weekends){Z(af);Z(ae,-1,true)}this.title=u(af,y(Q(ae),-1),this.option("titleFormat"),ac);this.renderAgenda(ac.weekends?7:5,this.option("columnFormat"))}})};f.agendaDay=function(ad,ac){return new v(ad,ac,{render:function(ae,af){if(af){y(ae,af);if(!ac.weekends){Z(ae,af<0?-1:1)}}this.title=N(ae,this.option("titleFormat"),ac);this.start=this.visStart=Q(ae,true);this.end=this.visEnd=y(Q(this.start),1);this.renderAgenda(1,this.option("columnFormat"))}})};function v(at,aB,aH){var ar,aA,ai,av,aV,ak,ah,aC,ax,aT,aY,aI,aJ=[],am,al,aZ,az,aw,aO,aW,aU,aG,ad,aP=new J(function(a0){return aV.find("td:eq("+a0+") div div")}),ap={},af=D.extend(this,l,aH,{renderAgenda:aE,renderEvents:aj,rerenderEvents:ag,clearEvents:aD,setHeight:aK,setWidth:aQ,beforeHide:function(){aI=aA.scrollTop()},afterShow:function(){aA.scrollTop(aI)},defaultEventEnd:function(a0){var a1=Q(a0.start);if(a0.allDay){return a1}return o(a1,aB.defaultEventMinutes)}});af.init(at,aB);at.addClass("fc-agenda");if(at.disableSelection){at.disableSelection()}function aE(a6,a3){ak=a6;aZ=aB.theme?"ui":"fc";aw=aB.weekends?0:1;az=aB.firstDay;if(aO=aB.isRTL){aW=-1;aU=ak-1}else{aW=1;aU=0}aG=a(aB.minTime);ad=a(aB.maxTime);var a0=aO?y(Q(af.visEnd),-1):Q(af.visStart),a5=Q(a0),a8=w(new Date());if(!ar){var a2,a1,a7=aB.slotMinutes%15==0,a9="<div class='fc-agenda-head' style='position:relative;z-index:4'><table style='width:100%'><tr class='fc-first"+(aB.allDaySlot?"":" fc-last")+"'><th class='fc-leftmost "+aZ+"-state-default'>&nbsp;</th>";for(a2=0;a2<ak;a2++){a9+="<th class='fc-"+U[a5.getDay()]+" "+aZ+"-state-default'>"+N(a5,a3,aB)+"</th>";y(a5,aW);if(aw){Z(a5,aW)}}a9+="<th class='"+aZ+"-state-default'>&nbsp;</th></tr>";if(aB.allDaySlot){a9+="<tr class='fc-all-day'><th class='fc-axis fc-leftmost "+aZ+"-state-default'>"+aB.allDayText+"</th><td colspan='"+ak+"' class='"+aZ+"-state-default'><div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></td><th class='"+aZ+"-state-default'>&nbsp;</th></tr><tr class='fc-divider fc-last'><th colspan='"+(ak+2)+"' class='"+aZ+"-state-default fc-leftmost'><div/></th></tr>"}a9+="</table></div>";ar=D(a9).appendTo(at);ar.find("td").click(ac);am=D("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ar);a5=d();var a4=o(Q(a5),ad);o(a5,aG);a9="<table>";for(a2=0;a5<a4;a2++){a1=a5.getMinutes();a9+="<tr class='"+(a2==0?"fc-first":(a1==0?"":"fc-minor"))+"'><th class='fc-axis fc-leftmost "+aZ+"-state-default'>"+((!a7||a1==0)?N(a5,aB.axisFormat):"&nbsp;")+"</th><td class='fc-slot"+a2+" "+aZ+"-state-default'><div style='position:relative'>&nbsp;</div></td></tr>";o(a5,aB.slotMinutes)}a9+="</table>";aA=D("<div class='fc-agenda-body' style='position:relative;z-index:2;overflow:auto'/>").append(ai=D("<div style='position:relative;overflow:hidden'>").append(av=D(a9))).appendTo(at);aA.find("td").click(ac);al=D("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ai);a5=Q(a0);a9="<div class='fc-agenda-bg' style='position:absolute;z-index:1'><table style='width:100%;height:100%'><tr class='fc-first'>";for(a2=0;a2<ak;a2++){a9+="<td class='fc-"+U[a5.getDay()]+" "+aZ+"-state-default "+(a2==0?"fc-leftmost ":"")+(+a5==+a8?aZ+"-state-highlight fc-today":"fc-not-today")+"'><div class='fc-day-content'><div>&nbsp;</div></div></td>";y(a5,aW);if(aw){Z(a5,aW)}}a9+="</tr></table></div>";aV=D(a9).appendTo(at)}else{aD();ar.find("tr:first th").slice(1,-1).each(function(){D(this).text(N(a5,a3,aB));this.className=this.className.replace(/^fc-\w+(?= )/,"fc-"+U[a5.getDay()]);y(a5,aW);if(aw){Z(a5,aW)}});a5=Q(a0);aV.find("td").each(function(){this.className=this.className.replace(/^fc-\w+(?= )/,"fc-"+U[a5.getDay()]);if(+a5==+a8){D(this).removeClass("fc-not-today").addClass("fc-today").addClass(aZ+"-state-highlight")}else{D(this).addClass("fc-not-today").removeClass("fc-today").removeClass(aZ+"-state-highlight")}y(a5,aW);if(aw){Z(a5,aW)}})}}function ao(){var a3=d(),a1=Q(a3);a1.setHours(aB.firstHour);var a2=an(a3,a1)+1,a0=function(){aA.scrollTop(a2)};a0();setTimeout(a0,0)}function aK(a0,a1){aY=a0;ap={};aA.height(a0-ar.height());ax=aA.find("tr:first div").height()+1;aV.css({top:ar.find("tr").height(),height:a0});if(a1){ao()}}function aQ(a0){aT=a0;aP.clear();aA.width(a0);av.width("");var a3=ar.find("tr:first th"),a1=aV.find("td"),a2=aA[0].clientWidth;av.width(a2);ah=0;V(ar.find("tr:lt(2) th:first").add(aA.find("tr:first th")).width("").each(function(){ah=Math.max(ah,D(this).outerWidth())}),ah);aC=Math.floor((a2-ah)/ak);V(a1.slice(0,-1),aC);V(a3.slice(1,-2),aC);V(a3.slice(-2,-1),a2-ah-aC*(ak-1));aV.css({left:ah,width:a2-ah})}function ac(a4){var a2=Math.floor((a4.pageX-aV.offset().left)/aC),a1=y(Q(af.visStart),aU+aW*a2),a5=this.className.match(/fc-slot(\d+)/);if(a5){var a3=parseInt(a5[1])*aB.slotMinutes,a0=Math.floor(a3/60);a1.setHours(a0);a1.setMinutes(a3%60+aG);af.trigger("dayClick",this,a1,false,a4)}else{af.trigger("dayClick",this,a1,true,a4)}}function aj(a4,a2){af.reportEvents(aJ=a4);var a3,a1=a4.length,a5=[],a0=[];for(a3=0;a3<a1;a3++){if(a4[a3].allDay){a5.push(a4[a3])}else{a0.push(a4[a3])}}aM(ae(a5),a2);aq(ay(a0),a2)}function ag(a0){aD();aj(aJ,a0)}function aD(){af._clearEvents();am.empty();al.empty()}function ae(a4){var a6=H(af.sliceSegs(a4,D.map(a4,aL),af.visStart,af.visEnd)),a3,a5=a6.length,a7,a2,a1,a0=[];for(a3=0;a3<a5;a3++){a7=a6[a3];for(a2=0;a2<a7.length;a2++){a1=a7[a2];a1.row=0;a1.level=a3;a0.push(a1)}}return a0}function ay(a9){var a8=o(Q(af.visStart),aG),a6=D.map(a9,aL),a7,a2,a5,a0,a3,a4,a1=[];for(a7=0;a7<ak;a7++){a2=H(af.sliceSegs(a9,a6,a8,o(Q(a8),ad-aG)));L(a2);for(a5=0;a5<a2.length;a5++){a0=a2[a5];for(a3=0;a3<a0.length;a3++){a4=a0[a3];a4.col=a7;a4.level=a5;a1.push(a4)}}y(a8,1,true)}return a1}function aM(a0,a1){if(aB.allDaySlot){c(a0,1,af,ah,aT,function(){return ar.find("tr.fc-all-day")},function(a2){return ah+aP.left(aR(a2))},function(a2){return ah+aP.right(aR(a2))},am,aX,a1);aK(aY)}}function aq(bd,be){var bi,bl=bd.length,bk,bg,a1,bb,a8,a7,a3,a9,a6,bf,a0,a4,ba="",bm,bj,a5,a2={},bp={},bo,bn,bh,bc;for(bi=0;bi<bl;bi++){bk=bd[bi];bg=bk.event;a1="fc-event fc-event-vert ";if(bk.isStart){a1+="fc-corner-top "}if(bk.isEnd){a1+="fc-corner-bottom "}bb=an(bk.start,bk.start);a8=an(bk.start,bk.end);a7=bk.col;a3=bk.level;a9=bk.forward||0;a6=ah+aP.left(a7*aW+aU);bf=ah+aP.right(a7*aW+aU)-a6;bf=Math.min(bf-6,bf*0.95);if(a3){a0=bf/(a3+a9+1)}else{if(a9){a0=((bf/(a9+1))-(12/2))*2}else{a0=bf}}a4=a6+(bf/(a3+a9+1)*a3)*aW+(aO?bf-a0:0);bk.top=bb;bk.left=a4;bk.outerWidth=a0;bk.outerHeight=a8-bb;ba+="<div class='"+a1+bg.className.join(" ")+"' style='position:absolute;z-index:8;top:"+bb+"px;left:"+a4+"px'><a"+(bg.url?" href='"+K(bg.url)+"'":"")+"><span class='fc-event-bg'></span><span class='fc-event-time'>"+K(u(bg.start,bg.end,af.option("timeFormat")))+"</span><span class='fc-event-title'>"+K(bg.title)+"</span></a>"+((bg.editable||bg.editable==m&&aB.editable)&&!aB.disableResizing&&D.fn.resizable?"<div class='ui-resizable-handle ui-resizable-s'>=</div>":"")+"</div>"}al[0].innerHTML=ba;bm=al.children();for(bi=0;bi<bl;bi++){bk=bd[bi];bg=bk.event;bj=D(bm[bi]);a5=af.trigger("eventRender",bg,bg,bj);if(a5===false){bj.remove()}else{if(a5&&a5!==true){bj.remove();bj=D(a5).css({position:"absolute",top:bk.top,left:bk.left}).appendTo(al)}bk.element=bj;if(bg._id===be){aN(bg,bj,bk)}else{bj[0]._fci=bi}af.reportEventElement(bg,bj)}}T(al,bd,aN);for(bi=0;bi<bl;bi++){bk=bd[bi];if(bj=bk.element){bn=a2[bo=bk.key=X(bj[0])];bk.vsides=bn==m?(a2[bo]=O(bj[0],true)):bn;bn=bp[bo];bk.hsides=bn==m?(bp[bo]=B(bj[0],true)):bn;bh=bj.find("span.fc-event-title");if(bh.length){bk.titleTop=bh[0].offsetTop}}}for(bi=0;bi<bl;bi++){bk=bd[bi];if(bj=bk.element){bj[0].style.width=bk.outerWidth-bk.hsides+"px";bj[0].style.height=(bc=bk.outerHeight-bk.vsides)+"px";bg=bk.event;if(bk.titleTop!=m&&bc-bk.titleTop<10){bj.find("span.fc-event-time").text(N(bg.start,af.option("timeFormat"))+" - "+bg.title);bj.find("span.fc-event-title").remove()}af.trigger("eventAfterRender",bg,bg,bj)}}}function aL(a1){if(a1.allDay){if(a1.end){var a0=Q(a1.end);return(a1.allDay||a0.getHours()||a0.getMinutes())?y(a0,1):a0}else{return y(Q(a1.start),1)}}if(a1.end){return Q(a1.end)}else{return o(Q(a1.start),aB.defaultEventMinutes)}}function aX(a2,a1,a0){af.eventElementHandlers(a2,a1);if(a2.editable||a2.editable==m&&aB.editable){au(a2,a1,a0.isStart);if(a0.isEnd){af.resizableDayEvent(a2,a1,aC)}}}function aN(a2,a1,a0){af.eventElementHandlers(a2,a1);if(a2.editable||a2.editable==m&&aB.editable){var a3=a1.find("span.fc-event-time");aF(a2,a1,a3);if(a0.isEnd){aS(a2,a1,a3)}}}function au(a5,a2,a0){if(!aB.disableDragging&&a2.draggable){var a4,a7,a3,a6=true,a1;a2.draggable({zIndex:9,opacity:af.option("dragOpacity","month"),revertDuration:aB.dragRevertDuration,start:function(a8,a9){af.hideEvents(a5,a2);af.trigger("eventDragStart",a2,a5,a8,a9);a4=a2.position();a7=a2.width();a3=function(){if(!a6){a2.width(a7).height("").draggable("option","grid",null);a6=true}};a1=new e(function(ba){a2.draggable("option","revert",!ba||!ba.rowDelta&&!ba.colDelta);if(ba){if(!ba.row){a3();af.showOverlay(ba)}else{if(a0&&a6){h(a2.width(aC-10),ax*Math.round((a5.end?((a5.end-a5.start)/W):aB.defaultEventMinutes)/aB.slotMinutes));a2.draggable("option","grid",[aC,1]);a6=false}af.hideOverlay()}}else{af.hideOverlay()}});a1.row(ar.find("td"));aV.find("td").each(function(){a1.col(this)});a1.row(aA);a1.mouse(a8.pageX,a8.pageY)},drag:function(a8,a9){a1.mouse(a8.pageX,a8.pageY)},stop:function(ba,bb){af.hideOverlay();af.trigger("eventDragStop",a2,a5,ba,bb);var a8=a1.cell,a9=aW*(a6?(a8?a8.colDelta:0):Math.floor((bb.position.left-a4.left)/aC));if(!a8||!a9&&!a8.rowDelta){a3();if(D.browser.msie){a2.css("filter","")}af.showEvents(a5,a2)}else{a2.find("a").removeAttr("href");af.eventDrop(this,a5,a9,a6?0:Math.round((a2.offset().top-ai.offset().top)/ax)*aB.slotMinutes+aG-(a5.start.getHours()*60+a5.start.getMinutes()),a6,ba,bb)}}})}}function aF(a0,a4,a6){if(!aB.disableDragging&&a4.draggable){var a1,a2,a3,a7,a8=false,a5;a4.draggable({zIndex:9,scroll:false,grid:[aC,ax],axis:ak==1?"y":false,opacity:af.option("dragOpacity"),revertDuration:aB.dragRevertDuration,start:function(a9,ba){af.hideEvents(a0,a4);af.trigger("eventDragStart",a4,a0,a9,ba);if(D.browser.msie){a4.find("span.fc-event-bg").hide()}a1=a4.position();a2=function(){if(a8){a6.css("display","");a4.draggable("option","grid",[aC,ax]);a8=false}};a3=0;a5=new e(function(bb){a4.draggable("option","revert",!bb);if(bb){if(!bb.row&&aB.allDaySlot){if(!a8){a8=true;a6.hide();a4.draggable("option","grid",null)}af.showOverlay(bb)}else{a2();af.hideOverlay()}}else{af.hideOverlay()}});if(aB.allDaySlot){a5.row(ar.find("td"))}aV.find("td").each(function(){a5.col(this)});a5.row(aA);a5.mouse(a9.pageX,a9.pageY)},drag:function(bc,bd){a7=Math.round((bd.position.top-a1.top)/ax);if(a7!=a3){if(!a8){var ba=a7*aB.slotMinutes,a9=o(Q(a0.start),ba),bb;if(a0.end){bb=o(Q(a0.end),ba)}a6.text(u(a9,bb,af.option("timeFormat")))}a3=a7}a5.mouse(bc.pageX,bc.pageY)},stop:function(bb,bc){af.hideOverlay();af.trigger("eventDragStop",a4,a0,bb,bc);var a9=a5.cell,ba=aW*(a8?(a9?a9.colDelta:0):Math.floor((bc.position.left-a1.left)/aC));if(!a9||!a7&&!ba){a2();if(D.browser.msie){a4.css("filter","").find("span.fc-event-bg").css("display","")}a4.css(a1);af.showEvents(a0,a4)}else{af.eventDrop(this,a0,ba,a8?0:a7*aB.slotMinutes,a8,bb,bc)}}})}}function aS(a2,a1,a3){if(!aB.disableResizing&&a1.resizable){var a4,a0;a1.resizable({handles:{s:"div.ui-resizable-s"},grid:ax,start:function(a5,a6){a4=a0=0;af.hideEvents(a2,a1);if(D.browser.msie&&D.browser.version=="6.0"){a1.css("overflow","hidden")}a1.css("z-index",9);af.trigger("eventResizeStart",this,a2,a5,a6)},resize:function(a5,a6){a4=Math.round((Math.max(ax,a1.height())-a6.originalSize.height)/ax);if(a4!=a0){a3.text(u(a2.start,(!a4&&!a2.end)?null:o(af.eventEnd(a2),aB.slotMinutes*a4),af.option("timeFormat")));a0=a4}},stop:function(a5,a6){af.trigger("eventResizeStop",this,a2,a5,a6);if(a4){af.eventResize(this,a2,0,aB.slotMinutes*a4,a5,a6)}else{a1.css("z-index",8);af.showEvents(a2,a1)}}})}}function an(a1,a5){a1=Q(a1,true);if(a5<o(Q(a1),aG)){return 0}if(a5>=o(Q(a1),ad)){return ai.height()}var a0=aB.slotMinutes,a4=a5.getHours()*60+a5.getMinutes()-aG,a3=Math.floor(a4/a0),a2=ap[a3];if(a2==m){a2=ap[a3]=aA.find("tr:eq("+a3+") td div")[0].offsetTop}return Math.max(0,Math.round(a2-1+ax*((a4%a0)/a0)))}function aR(a0){return((a0-Math.max(az,aw)+ak)%ak)*aW+aU}}function L(ag){var ae,ad,ac,ai,ah,af;for(ae=ag.length-1;ae>0;ae--){ai=ag[ae];for(ad=0;ad<ai.length;ad++){ah=ai[ad];for(ac=0;ac<ag[ae-1].length;ac++){af=ag[ae-1][ac];if(x(ah,af)){af.forward=Math.max(af.forward||0,(ah.forward||0)+1)}}}}}var l={init:function(ad,ac){this.element=ad;this.options=ac;this.eventsByID={};this.eventElements=[];this.eventElementsByID={}},trigger:function(ac,ad){if(this.options[ac]){return this.options[ac].apply(ad||this,Array.prototype.slice.call(arguments,2).concat([this]))}},eventEnd:function(ac){return ac.end?Q(ac.end):this.defaultEventEnd(ac)},reportEvents:function(af){var ae,ac=af.length,ag,ad=this.eventsByID={};for(ae=0;ae<ac;ae++){ag=af[ae];if(ad[ag._id]){ad[ag._id].push(ag)}else{ad[ag._id]=[ag]}}},reportEventElement:function(ad,ac){this.eventElements.push(ac);var ae=this.eventElementsByID;if(ae[ad._id]){ae[ad._id].push(ac)}else{ae[ad._id]=[ac]}},_clearEvents:function(){this.eventElements=[];this.eventElementsByID={}},showEvents:function(ad,ac){this._eee(ad,ac,"show")},hideEvents:function(ad,ac){this._eee(ad,ac,"hide")},_eee:function(af,ae,ah){var ag=this.eventElementsByID[af._id],ad,ac=ag.length;for(ad=0;ad<ac;ad++){if(ag[ad][0]!=ae[0]){ag[ad][ah]()}}},eventDrop:function(af,ad,ae,ag,al,ai,ah){var aj=this,ak=ad.allDay,ac=ad._id;aj.moveEvents(aj.eventsByID[ac],ae,ag,al);aj.trigger("eventDrop",af,ad,ae,ag,al,function(){aj.moveEvents(aj.eventsByID[ac],-ae,-ag,ak);aj.rerenderEvents()},ai,ah);aj.eventsChanged=true;aj.rerenderEvents(ac)},eventResize:function(aj,ah,ae,ad,ag,ai){var ac=this,af=ah._id;ac.elongateEvents(ac.eventsByID[af],ae,ad);ac.trigger("eventResize",aj,ah,ae,ad,function(){ac.elongateEvents(ac.eventsByID[af],-ae,-ad);ac.rerenderEvents()},ag,ai);ac.eventsChanged=true;ac.rerenderEvents(af)},moveEvents:function(ag,ae,ad,ah){ad=ad||0;for(var ai,ac=ag.length,af=0;af<ac;af++){ai=ag[af];if(ah!=m){ai.allDay=ah}o(y(ai.start,ae,true),ad);if(ai.end){ai.end=o(y(ai.end,ae,true),ad)}C(ai,this.options)}},elongateEvents:function(ag,ae,ad){ad=ad||0;for(var ah,ac=ag.length,af=0;af<ac;af++){ah=ag[af];ah.end=o(y(this.eventEnd(ah),ae,true),ad);C(ah,this.options)}},showOverlay:function(ac){if(!this.dayOverlay){this.dayOverlay=D("<div class='fc-cell-overlay' style='position:absolute;z-index:3;display:none'/>").appendTo(this.element)}var ad=this.element.offset();this.dayOverlay.css({top:ac.top-ad.top,left:ac.left-ad.left,width:ac.width,height:ac.height}).show()},hideOverlay:function(){if(this.dayOverlay){this.dayOverlay.hide()}},resizableDayEvent:function(af,ad,ae){var ac=this;if(!ac.options.disableResizing&&ad.resizable){ad.resizable({handles:ac.options.isRTL?{w:"div.ui-resizable-w"}:{e:"div.ui-resizable-e"},grid:ae,minWidth:ae/2,containment:ac.element.parent().parent(),start:function(ag,ah){ad.css("z-index",9);ac.hideEvents(af,ad);ac.trigger("eventResizeStart",this,af,ag,ah)},stop:function(ah,ai){ac.trigger("eventResizeStop",this,af,ah,ai);var ag=Math.round((ad.width()-ai.originalSize.width)/ae);if(ag){ac.eventResize(this,af,ag,0,ah,ai)}else{ad.css("z-index",8);ac.showEvents(af,ad)}}})}},eventElementHandlers:function(ae,ad){var ac=this;ad.click(function(af){if(!ad.hasClass("ui-draggable-dragging")&&!ad.hasClass("ui-resizable-resizing")){return ac.trigger("eventClick",this,ae,af)}}).hover(function(af){ac.trigger("eventMouseover",this,ae,af)},function(af){ac.trigger("eventMouseout",this,ae,af)})},option:function(ad,ae){var ac=this.options[ad];if(typeof ac=="object"){return i(ac,ae||this.name)}return ac},sliceSegs:function(ao,ai,ae,ah){var af=[],aj,al=ao.length,ad,am,ak,an,ap,ac,ag;for(aj=0;aj<al;aj++){ad=ao[aj];am=ad.start;ak=ai[aj];if(ak>ae&&am<ah){if(am<ae){an=Q(ae);ac=false}else{an=am;ac=true}if(ak>ah){ap=Q(ah);ag=false}else{ap=ak;ag=true}af.push({event:ad,start:an,end:ap,isStart:ac,isEnd:ag,msLength:ap-an})}}return af.sort(z)}};function T(ad,ac,ae){ad.unbind("mouseover").mouseover(function(ai){var ah=ai.target,aj,ag,af;while(ah!=this){aj=ah;ah=ah.parentNode}if((ag=aj._fci)!=m){aj._fci=m;af=ac[ag];ae(af.event,af.element,af);D(ai.target).trigger(ai)}ai.stopPropagation()})}function H(ae){var ai=[],ah,ac=ae.length,ad,ag,aj,af;for(ah=0;ah<ac;ah++){ad=ae[ah];ag=0;while(true){aj=false;if(ai[ag]){for(af=0;af<ai[ag].length;af++){if(x(ai[ag][af],ad)){aj=true;break}}}if(aj){ag++}else{break}}if(ai[ag]){ai[ag].push(ad)}else{ai[ag]=[ad]}}return ai}function z(ad,ac){return(ac.msLength-ad.msLength)*100+(ad.event.start-ac.event.start)}function x(ad,ac){return ad.end>ac.start&&ad.start<ac.end}var S=86400000,q=3600000,W=60000;function Y(ad,ae,ac){ad.setFullYear(ad.getFullYear()+ae);if(!ac){w(ad)}return ad}function p(af,ag,ae){if(+af){var ac=af.getMonth()+ag,ad=Q(af);ad.setDate(1);ad.setMonth(ac);af.setMonth(ac);if(!ae){w(af)}while(af.getMonth()!=ad.getMonth()){af.setDate(af.getDate()+(af<ad?1:-1))}}return af}function y(af,ag,ae){if(+af){var ac=af.getDate()+ag,ad=Q(af);ad.setHours(9);ad.setDate(ac);af.setDate(ac);if(!ae){w(af)}r(af,ad)}return af}I.addDays=y;function r(ad,ac){if(+ad){while(ad.getDate()!=ac.getDate()){ad.setTime(+ad+(ad<ac?1:-1)*q)}}}function o(ac,ad){ac.setMinutes(ac.getMinutes()+ad);return ac}function w(ac){ac.setHours(0);ac.setMinutes(0);ac.setSeconds(0);ac.setMilliseconds(0);return ac}function Q(ac,ad){if(ad){return w(new Date(+ac))}return new Date(+ac)}function d(){var ac=0,ad;do{ad=new Date(1970,ac++,1)}while(ad.getHours()!=0);return ad}function Z(ac,ad,ae){ad=ad||1;while(ac.getDay()==0||(ae&&ac.getDay()==1||!ae&&ac.getDay()==6)){y(ac,ad)}return ac}var g=I.parseDate=function(ac){if(typeof ac=="object"){return ac}if(typeof ac=="number"){return new Date(ac*1000)}if(typeof ac=="string"){if(ac.match(/^\d+$/)){return new Date(parseInt(ac)*1000)}return k(ac,true)||(ac?new Date(ac):null)}return null};var k=I.parseISO8601=function(ag,ad){var ac=ag.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?$/);if(!ac){return null}var af=new Date(ac[1],0,1),ae=new Date(ac[1],0,1,9,0),ah=0;if(ac[3]){af.setMonth(ac[3]-1);ae.setMonth(ac[3]-1)}if(ac[5]){af.setDate(ac[5]);ae.setDate(ac[5])}r(af,ae);if(ac[7]){af.setHours(ac[7])}if(ac[8]){af.setMinutes(ac[8])}if(ac[10]){af.setSeconds(ac[10])}if(ac[12]){af.setMilliseconds(Number("0."+ac[12])*1000)}r(af,ae);if(!ad){if(ac[14]){ah=Number(ac[16])*60+Number(ac[17]);ah*=ac[15]=="-"?1:-1}ah-=af.getTimezoneOffset()}return new Date(+af+(ah*60*1000))};var a=I.parseTime=function(ae){if(typeof ae=="number"){return ae*60}if(typeof ae=="object"){return ae.getHours()*60+ae.getMinutes()}var ac=ae.match(/(\d+)(?::(\d+))?\s*(\w+)?/);if(ac){var ad=parseInt(ac[1]);if(ac[3]){ad%=12;if(ac[3].toLowerCase().charAt(0)=="p"){ad+=12}}return ad*60+(ac[2]?parseInt(ac[2]):0)}};var N=I.formatDate=function(ad,ae,ac){return u(ad,null,ae,ac)};var u=I.formatDates=function(ao,an,am,ap){ap=ap||F;var ad=ao,af=an,ag,ah=am.length,aj,ae,al,ai="";for(ag=0;ag<ah;ag++){aj=am.charAt(ag);if(aj=="'"){for(ae=ag+1;ae<ah;ae++){if(am.charAt(ae)=="'"){if(ad){if(ae==ag+1){ai+="'"}else{ai+=am.substring(ag+1,ae)}ag=ae}break}}}else{if(aj=="("){for(ae=ag+1;ae<ah;ae++){if(am.charAt(ae)==")"){var ac=N(ad,am.substring(ag+1,ae),ap);if(parseInt(ac.replace(/\D/,""))){ai+=ac}ag=ae;break}}}else{if(aj=="["){for(ae=ag+1;ae<ah;ae++){if(am.charAt(ae)=="]"){var ak=am.substring(ag+1,ae);var ac=N(ad,ak,ap);if(ac!=N(af,ak,ap)){ai+=ac}ag=ae;break}}}else{if(aj=="{"){ad=an;af=ao}else{if(aj=="}"){ad=ao;af=an}else{for(ae=ah;ae>ag;ae--){if(al=s[am.substring(ag,ae)]){if(ad){ai+=al(ad,ap)}ag=ae-1;break}}if(ae==ag){if(ad){ai+=aj}}}}}}}}return ai};var s={s:function(ac){return ac.getSeconds()},ss:function(ac){return R(ac.getSeconds())},m:function(ac){return ac.getMinutes()},mm:function(ac){return R(ac.getMinutes())},h:function(ac){return ac.getHours()%12||12},hh:function(ac){return R(ac.getHours()%12||12)},H:function(ac){return ac.getHours()},HH:function(ac){return R(ac.getHours())},d:function(ac){return ac.getDate()},dd:function(ac){return R(ac.getDate())},ddd:function(ad,ac){return ac.dayNamesShort[ad.getDay()]},dddd:function(ad,ac){return ac.dayNames[ad.getDay()]},M:function(ac){return ac.getMonth()+1},MM:function(ac){return R(ac.getMonth()+1)},MMM:function(ad,ac){return ac.monthNamesShort[ad.getMonth()]},MMMM:function(ad,ac){return ac.monthNames[ad.getMonth()]},yy:function(ac){return(ac.getFullYear()+"").substring(2)},yyyy:function(ac){return ac.getFullYear()},t:function(ac){return ac.getHours()<12?"a":"p"},tt:function(ac){return ac.getHours()<12?"am":"pm"},T:function(ac){return ac.getHours()<12?"A":"P"},TT:function(ac){return ac.getHours()<12?"AM":"PM"},u:function(ac){return N(ac,"yyyy-MM-dd'T'HH:mm:ss'Z'")},S:function(ad){var ac=ad.getDate();if(ac>10&&ac<20){return"th"}return["st","nd","rd"][ac%10-1]||"th"}};function V(ad,ae,ac){ad.each(function(ag,af){af.style.width=ae-B(af,ac)+"px"})}function h(ae,ac,ad){ae.each(function(ag,af){af.style.height=ac-O(af,ad)+"px"})}function B(ad,ac){return(parseFloat(jQuery.curCSS(ad,"paddingLeft",true))||0)+(parseFloat(jQuery.curCSS(ad,"paddingRight",true))||0)+(parseFloat(jQuery.curCSS(ad,"borderLeftWidth",true))||0)+(parseFloat(jQuery.curCSS(ad,"borderRightWidth",true))||0)+(ac?n(ad):0)}function n(ac){return(parseFloat(jQuery.curCSS(ac,"marginLeft",true))||0)+(parseFloat(jQuery.curCSS(ac,"marginRight",true))||0)}function O(ad,ac){return(parseFloat(jQuery.curCSS(ad,"paddingTop",true))||0)+(parseFloat(jQuery.curCSS(ad,"paddingBottom",true))||0)+(parseFloat(jQuery.curCSS(ad,"borderTopWidth",true))||0)+(parseFloat(jQuery.curCSS(ad,"borderBottomWidth",true))||0)+(ac?t(ad):0)}function t(ac){return(parseFloat(jQuery.curCSS(ac,"marginTop",true))||0)+(parseFloat(jQuery.curCSS(ac,"marginBottom",true))||0)}function aa(ac,ad){ad=typeof ad=="number"?ad+"px":ad;ac[0].style.cssText+=";min-height:"+ad+";_height:"+ad}var A;function ab(ad){if(A!==false){var ac;if(ad.is("th,td")){ad=(ac=ad).parent()}if(A==m&&ad.is("tr")){A=ad.position().top!=ad.children().position().top}if(A){return ad.parent().position().top+(ac?ad.position().top-ac.position().top:0)}}return 0}function e(ae){var ak=this,aj=[],ac=[],ai,ah,af,ag,al,ad;ak.row=function(am){ai=D(am);aj.push(ai.offset().top+ab(ai))};ak.col=function(am){ah=D(am);ac.push(ah.offset().left)};ak.mouse=function(am,ap){if(af==m){aj.push(aj[aj.length-1]+ai.outerHeight());ac.push(ac[ac.length-1]+ah.outerWidth());al=ad=-1}var an,ao;for(an=0;an<aj.length&&ap>=aj[an];an++){}for(ao=0;ao<ac.length&&am>=ac[ao];ao++){}an=an>=aj.length?-1:an-1;ao=ao>=ac.length?-1:ao-1;if(an!=al||ao!=ad){al=an;ad=ao;if(an==-1||ao==-1){ak.cell=null}else{if(af==m){af=an;ag=ao}ak.cell={row:an,col:ao,top:aj[an],left:ac[ao],width:ac[ao+1]-ac[ao],height:aj[an+1]-aj[an],isOrig:an==af&&ao==ag,rowDelta:an-af,colDelta:ao-ag}}ae(ak.cell)}}}var m,U=["sun","mon","tue","wed","thu","fri","sat"],j=Array.prototype.pop;function R(ac){return(ac<10?"0":"")+ac}function i(ag,ac){if(ag[ac]!=m){return ag[ac]}var af=ac.split(/(?=[A-Z])/),ae=af.length-1,ad;for(;ae>=0;ae--){ad=ag[af[ae].toLowerCase()];if(ad!=m){return ad}}return ag[""]}function K(ac){return ac.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#039;").replace(/"/g,"&quot;")}function J(ad){var ac=this,ae={},ah={},ag={};function af(ai){return ae[ai]=ae[ai]||ad(ai)}ac.left=function(ai){return ah[ai]=ah[ai]==m?af(ai).position().left:ah[ai]};ac.right=function(ai){return ag[ai]=ag[ai]==m?ac.left(ai)+af(ai).width():ag[ai]};ac.clear=function(){ae={};ah={};ag={}}}function X(ac){return ac.id+"/"+ac.className+"/"+ac.style.cssText.replace(/(^|;)\s*(top|left|width|height)\s*:[^;]*/ig,"")}})(jQuery);

/**
 * PrimeFaces Schedule Widget
 */
PrimeFaces.widget.Schedule = function(id, cfg) {
	this.id = id;
	this.cfg = cfg;
    this.jqId = PrimeFaces.escapeClientId(this.id);
    this.jq = this.jqId + '_container';

	this.setupEventSource();
	
	if(this.cfg.language)
	    this.applyLocale();
	
	if(this.cfg.editable)
		this.setupEventHandlers();
	
	jQuery(this.jq).fullCalendar(this.cfg);
}

PrimeFaces.widget.Schedule.prototype.applyLocale = function() {
	var lang = PrimeFaces.widget.ScheduleResourceBundle[this.cfg.language];
	                                                    
	if(lang) {
		this.cfg.monthNames = lang.monthNames;
		this.cfg.monthNamesShort = lang.monthNamesShort;
		this.cfg.dayNames = lang.dayNames;
		this.cfg.dayNamesShort = lang.dayNamesShort;
		this.cfg.buttonText = {today: lang.today, month: lang.month, week: lang.week, day: lang.day};
		this.cfg.allDayText = lang.allDayText;
	}
}

PrimeFaces.widget.Schedule.prototype.setupEventHandlers = function() {
    var _self = this;
    
	this.cfg.dayClick = function(dayDate, allDay, jsEvent, view) {
        var options = {source: _self.id, process: _self.id, formId: _self.cfg.formId},
        params = {};
        params[_self.id + '_ajaxEvent'] = true;
		params[_self.id + '_selectedDate'] = dayDate.getTime();
		
		if(_self.cfg.onDateSelectUpdate)
            options.update = _self.cfg.onDateSelectUpdate;

        if(_self.cfg.onDateSelectStart)
            _self.cfg.onDateSelectStart.call(_self, dayDate, allDay, jsEvent, view);

        if(_self.cfg.onDateSelectComplete)
            options.oncomplete = _self.cfg.onDateSelectComplete;
		
		PrimeFaces.ajax.AjaxRequest(_self.cfg.url, options, params);
	}

	this.cfg.eventClick = function(calEvent, jsEvent, view) {
        var options = {source: _self.id, process: _self.id, formId: _self.cfg.formId},
        params = {};
        params[_self.id + '_ajaxEvent'] = true;
		params[_self.id + '_selectedEventId'] = calEvent.id;
		
		if(_self.cfg.onEventSelectUpdate)
            options.update = _self.cfg.onEventSelectUpdate;

        if(_self.cfg.onEventSelectStart)
            _self.cfg.onEventSelectStart.call(_self, calEvent, jsEvent, view);

        if(_self.cfg.onEventSelectComplete)
            options.oncomplete = _self.cfg.onEventSelectComplete;
		
		PrimeFaces.ajax.AjaxRequest(_self.cfg.url, options, params);
	}
	
	this.cfg.eventDrop = function(calEvent, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
        var options = {source: _self.id, process: _self.id, formId: _self.cfg.formId},
        params = {};
        params[_self.id + '_ajaxEvent'] = true;
		params[_self.id + '_changedEventId'] = calEvent.id;
		params[_self.id + '_dayDelta'] = dayDelta;
		params[_self.id + '_minuteDelta'] = minuteDelta;
		
		if(_self.cfg.onEventMoveUpdate) {
			options.update = _self.cfg.onEventMoveUpdate;
        }
		
		PrimeFaces.ajax.AjaxRequest(_self.cfg.url, options, params);
	}
	
	this.cfg.eventResize = function(calEvent, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
        var options = {source: _self.id, process: _self.id, formId: _self.cfg.formId},
        params = {};
        params[_self.id + '_ajaxEvent'] = true;
		params[_self.id + '_changedEventId'] = calEvent.id;
		params[_self.id + '_dayDelta'] = dayDelta;
		params[_self.id + '_minuteDelta'] = minuteDelta;
		params[_self.id + '_resized'] = true;
		
		if(_self.cfg.onEventResizeUpdate) {
			options.update = _self.cfg.onEventResizeUpdate;
        }
		
		PrimeFaces.ajax.AjaxRequest(_self.cfg.url, options, params);
	}
}

PrimeFaces.widget.Schedule.prototype.setupEventSource = function() {
	var _self = this;
	
	this.cfg.events = function(start, end, callback) {
        var options = {
            source: _self.id,
            process: _self.id,
            update: _self.id,
            formId: _self.cfg.formId,
            onsuccess: function(responseXML) {
                var xmlDoc = responseXML.documentElement,
                updates = xmlDoc.getElementsByTagName("update");

                for(var i=0; i < updates.length; i++) {
                    var id = updates[i].attributes.getNamedItem("id").nodeValue,
                    data = updates[i].firstChild.data;

                    if(id == _self.id){
                        var events = jQuery.parseJSON(data).events;

                        for(var j=0; j < events.length; j++) {
                            events[j].start = new Date(events[j].start);
                            events[j].end = new Date(events[j].end);
                        }

                        callback(events);
                    }
                    else {
                        PrimeFaces.ajax.AjaxUtils.updateElement(id, data);
                    }
                }

                return false;
            }
        };

        var params = {};
        params[_self.id + "_start"] = start.getTime();
		params[_self.id + "_end"] = end.getTime();
		
        PrimeFaces.ajax.AjaxRequest(_self.cfg.url, options, params);
	}
}

PrimeFaces.widget.Schedule.prototype.update = function() {
	jQuery(this.jq).fullCalendar('refetchEvents');
}

PrimeFaces.widget.ScheduleResourceBundle = {
		tr : {
			monthNamesShort : ["Oca", "\u015eub", "Mar", "Nis", "May", "Haz", "Tem", "A\u011fu", "Eyl", "Eki", "Kas", "Ara"],
			monthNames : ["Ocak", "\u015eubat", "Mart", "Nisan", "May\u0131s", "Haziran", "Temmuz", "A\u011fustos", "Eyl\u00fcl", "Ekim", "Kas\u0131m", "Aral\u0131k"],
			dayNamesShort : ["Paz", "Pzt", "Sal", "\u00c7ar", "Per", "Cum", "Cts"],
			dayNames : ["Pazar", "Pazartesi", "Sal\u0131", "\u00c7ar\u015famba", "Per\u015fembe", "Cuma", "Cumartesi"],
			today : "bug\u00fcn",
			month : "ay",
			week : "hafta",
			day : "g\u00fcn",
			allDayText : "t\u00fcm-g\u00fcn"
		},
		ca :{
			monthNamesShort : ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
			monthNames : ["Gener", "Febrer", "Mar\u00e7", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
			dayNamesShort : [ "Diu", "Dil", "Dim", "Dim", "Dij", "Div", "Dis"],
			dayNames : ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
			today : "avui",
			month : "mes",
			week : "setmana",
			day : "dia",
			allDayText : "tot-el dia"
		},
		pt :{
			monthNamesShort : ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
			monthNames : ["Janeiro", "Fevereiro", "Mar\u00e7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
			dayNamesShort : ["Dom", "Seg", "Ter", "Qua", "Qui", "Sexta", "S\u00e1b"],
			dayNames : ["Domingo", "Segunda-feira", "Ter\u00e7a-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "S\u00e1bado"],
            today : "hoje",
			month : "m\u00eas",
			week : "semana",
			day : "dia",
			allDayText : "todos-os dias"
		},
		it :{
			monthNamesShort : ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
			monthNames : ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
			dayNamesShort : ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
			dayNames : ["Domenica", "Luned\u00ec", "Marted\u00ec", "Mercoled\u00ec", "Gioved\u00ec", "Venerd\u00ec", "Sabato"],              
            today : "oggi",
			month : "mese",
			week : "settimana",
			day : "giorno",
			allDayText : "tutto-il giorno"
		},
		fr :{
			monthNamesShort : ["Jan", "F\u00e9v", "Mar", "Avr", "Mai", "Jui", "Jui", "Ao\u00fb", "Sep", "Oct", "Nov", "D\u00e9c"],
			monthNames : ["Janvier", "F\u00e9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\u00fbt", "Septembre", "Octobre", "Novembre", "D\u00e9cembre"],
			dayNamesShort : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
			dayNames : ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],              
        	today : "aujourd'hui",
            month : "mois",
            week : "semaine",
            day : "jour",
			allDayText : "toute-la journ\u00e9e"
		},
		es :{
			monthNamesShort : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
			monthNames : ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
			dayNamesShort : ["Dom", "Lun", "Mar", "Mi\u00e9", "Jue", "Vie", "S\u00e1b"],
			dayNames : ["Domingo", "Lunes", "Martes", "Mi\00E9rcoles", "Jueves", "Viernes", "S\u00e1bado"],              
            today : "hoy",
            month : "mes",
            week : "semana",
            day : "d\u00eda",
			allDayText : "todo-el d\u00eda"
		},
		de :{
			monthNamesShort : ["Jan", "Feb", "M\u00e4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
			monthNames : ["Januar", "Februar", "M\u00e4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
			dayNamesShort : ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"],
			dayNames : ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],              
            today : "heute",
	        month : "monat",
	        week : "woche",
	        day : "tag",
			allDayText : "ganzen-tag"
		},
		ja :{
			monthNamesShort : ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
			monthNames : ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
			dayNamesShort : ["\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f"],
			dayNames : ["\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f"],              
            today : "\u672c\u65e5",
            month : "\u5148\u6708",
            week : "\u9031",
            day : "\u65e5",
			allDayText : "\u7d42-\u65e5"
		},
		fi :{
			monthNamesShort : ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kes\u00E4", "Hein\u00E4", "Elo", "Syys", "Loka", "Marras", "Joulu"],
			monthNames : ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes\u00E4kuu", "Hein\u00E4kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"],
			dayNamesShort : ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
			dayNames : ["Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"],
			today : "t\u00E4n\u00E4\u00E4n",
			month : "kuukausi",
			week : "viikko",
			day : "p\u00E4iv\u00E4",
			allDayText : "koko p\u00E4iv\u00E4"
		},
		hu :{
			monthNamesShort : ["Jan", "Feb", "M\u00e1r", "\u00c1pr", "M\u00e1j", "J\u00fan", "J\u00fal", "Aug", "Szep", "Okt", "Nov", "Dec"],
			monthNames : ["Janu\u00e1r", "Febru\u00e1r", "M\u00e1rcius", "\u00c1prilis", "M\u00e1jus", "J\u00fanius", "J\u00falius", "Augusztus", "Szeptember", "Okt\u00f3ber", "November", "December"],
			dayNamesShort : [ "Vas", "H\u00e9t", "Ked", "Sze", "Cs\u00fc", "P\u00e9n", "Szo"],
			dayNames : ["Vas\u00e1rnap", "H\u00e9tf\u0151", "Kedd", "Szerda", "Cs\u00fct\u00f6rt\u00f6k", "P\u00e9ntek", "Szombat"],
			today : "ma",
			month : "h\u00f3nap",
			week : "h\u00e9t",
			day : "nap",
			allDayText : "eg\u00e9sz nap"
		}
}