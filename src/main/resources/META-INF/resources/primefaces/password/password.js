/**
* jQuery jPassword plugin
* @licenses	Creative Commons BY-SA [ http://creativecommons.org/licenses/by-sa/2.0/deed.fr ]
*
* @name		jPassword
* @desc		Plugin jQuery that provides you to detect strength of password. It gives help messages to write a strong password and generates on demand personnalized password. Help can be localized and shown in a tooltip or directly after input.
* @author	Hervé GOUCHET [ contact(at)rvdevsign(dot)net ]
* @version	1.0
* @date		2009/01/24
* @doc		http://www.rvdevsign.net/ressources/javascript/jpassword-plugin-jquery.html
* @requires jQuery v1.2.6+
*/

(function($){$.fn.jpassword=function(k){var l=this;var k=$.extend({},$.fn.jpassword.defaults,k);var n='<div class="jpassword"><div><p class="jpassword-meter">&nbsp;</p><p class="jpassword-info">&nbsp;</p></div></div>';return l.each(function(){if($(l).is("input")){jPassword($(l))}});function jPassword(a){var b="jpassword_"+parseInt(Math.random()*1000);var c=$(n).attr("id",b);if(k.flat==false){var d=a.offset();var f=getWindow();var g="right";var h=d.top;var i=(d.left+a.width());c.appendTo(document.body);if((i+c.width())>(f.left+f.width)){i-=(c.width()+a.width());g="left"}if((h+c.height())>(f.top+f.height)){h-=(c.height()-(a.height()*1.5));g+="bottom"}else{g+="top"}c.css({left:i+"px",top:h+"px",display:"none"});c.addClass("jpassword-"+g)}else{c.insertAfter(a);c.css({position:"relative",display:"block"});c.addClass("jpassword-flat")}a.bind("keyup",function(e){verifPsw(a,c)});a.bind("focus",function(e){verifPsw(a,c);if(k.flat==false){tooltip(c,"show")}if($.isFunction(k.onShow)){k.onShow(a,c)}});a.bind("blur",function(e){if(k.flat==false){tooltip(c,"hide")}if($.isFunction(k.onHide)){k.onHide(a,c)}});var j=$("#"+k.generate);if(j){j.bind("click",function(e){a.val(newPsw());verifPsw(a,c);return false})}if($.isFunction(k.onComplete)){k.onComplete(a,c)}}function verifPsw(a,b){var c=a.val();var d=b.find(".jpassword-meter");var e=b.find(".jpassword-info");var f=securPsw(c);var g="";if(f.lowercase<2){g=k.lang.lowercase}else if(f.uppercase<2){g=k.lang.uppercase}else if(f.number<2){g=k.lang.number}else if(f.punctuation<2){g=k.lang.punctuation}else if(f.special<2){g=k.lang.special}if(c.length<k.length&&f.level<10&&g==""){g=k.lang.length.replace(/-X-/g,k.length)}if(f.val==""){d.css("background-position","0 0");e.html(k.lang.please)}else if(f.level<5){d.css("background-position","0 -10px");e.html(k.lang.low+" "+g)}else if(f.level<10){d.css("background-position","0 -20px");e.html(k.lang.correct+" "+g)}else{d.css("background-position","0 -30px");e.html(k.lang.high)}a.val(f.val);if($.isFunction(k.onKeyup)){k.onKeyup(a)}}function securPsw(a){a=a.replace(/(^\s+)|(\s+$)/g,"");var b=cCap=cMin=cPct=cSpe=1;var d=a.length;for(var c=0;c<d;c++){var e=a.charCodeAt(c);if(e<128){if(e>47&&e<58){b+=1}else if(e>64&&e<91){cCap+=1}else if(e>96&&e<123){cMin+=1}else{cPct+=2}}else{cSpe+=3}}var f=(b*cCap*cMin*cPct*cSpe);f=Math.round(Math.log((f*f)));return{val:a,level:f,number:b,uppercase:cCap,lowercase:cMin,punctuation:cPct,special:cSpe}}function newPsw(){var a="";for(c=0;c<k.length;c++){var b=Math.round(32+Math.random()*222);var d=0;if((b>47&&b<58)||(b>64&&b<91)||(b>96&&b<123)){d=1}if(k.type==1&&b<127){d=1}if(k.type==2){d=1}if(k.special&&(b==48||b==49||b==50||b==53||b==54||b==56||b==57||b==66||b==67||b==68||b==71||b==73||b==75||b==79||b==80||b==81||b==83||b==85||b==86||b==87||b==88||b==90||b==99||b==104||b==105||b==107||b==108||b==111||b==112||b==113||b==115||b==117||b==118||b==119||b==120||b==122)){d=0}if(d==1){a+=String.fromCharCode(b)}else{c--}}return a}function tooltip(a,b){if(b=="show"){a.fadeIn()}else{a.fadeOut()}}function getWindow(){var m=document.compatMode=="CSS1Compat";return{left:(window.pageXOffset||(m?document.documentElement.scrollLeft:document.body.scrollLeft)),top:(window.pageYOffset||(m?document.documentElement.scrollTop:document.body.scrollTop)),width:(window.innerWidth||(m?document.documentElement.clientWidth:document.body.clientWidth)),height:(window.innerHeight||(m?document.documentElement.clientHeight:document.body.clientHeight))}}};$.fn.jpassword.defaults={lang:{please:"A strong password...",low:"Low security.",correct:"Correct security.",high:"High security.",length:"-X- characters would be a plus.",number:"Why not numbers?",uppercase:"And caps?",lowercase:"Some tiny?",punctuation:"Punctuations?",special:"Best, special characters?"},length:8,flat:false,type:1,special:0,generate:null,onShow:function(){},onHide:function(){},onKeyup:function(){},onComplete:function(){}}})(jQuery);

/**
 * PrimeFaces Password
 */
PrimeFaces.widget.Password = function(id, cfg) {
    this.id = id;
    this.cfg = cfg;
    this.cfg.lang = {
		length : "",
		number: "",
		uppercase: "",
		lowercase: "",
		punctuation: "",
		special: ""
	};
    this.jqId = PrimeFaces.escapeClientId(id);

	if(cfg.promptLabel) cfg.lang.please = cfg.promptLabel;
	if(cfg.weakLabel) cfg.lang.low = cfg.weakLabel;
	if(cfg.goodLabel) cfg.lang.correct = cfg.goodLabel;
	if(cfg.strongLabel) cfg.lang.high = cfg.strongLabel;

	if(cfg.flat) {
		if(!cfg.onShow)
			cfg.onShow = function(input, container){container.slideDown();};
		if(!cfg.onHide)
			cfg.onHide = function(input, container){container.slideUp();};

		cfg.onComplete = function(input, container){container.hide();};
	}

	jQuery(this.jqId).jpassword(this.cfg);

    if(this.cfg.behaviors) {
        PrimeFaces.attachBehaviors(jQuery(this.jqId), this.cfg.behaviors);
    }
}