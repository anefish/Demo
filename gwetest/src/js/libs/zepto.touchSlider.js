// Zepto.touch.js
(function($){var touch={},touchTimeout,tapTimeout,swipeTimeout,longTapTimeout,longTapDelay=750,gesture;function swipeDirection(x1,x2,y1,y2){return Math.abs(x1-x2)>=Math.abs(y1-y2)?(x1-x2>0?"Left":"Right"):(y1-y2>0?"Up":"Down")}function longTap(){longTapTimeout=null;if(touch.last){touch.el.trigger("longTap");touch={}}}function cancelLongTap(){if(longTapTimeout){clearTimeout(longTapTimeout)}longTapTimeout=null}function cancelAll(){if(touchTimeout){clearTimeout(touchTimeout)}if(tapTimeout){clearTimeout(tapTimeout)}if(swipeTimeout){clearTimeout(swipeTimeout)}if(longTapTimeout){clearTimeout(longTapTimeout)}touchTimeout=tapTimeout=swipeTimeout=longTapTimeout=null;touch={}}function isPrimaryTouch(event){return(event.pointerType=="touch"||event.pointerType==event.MSPOINTER_TYPE_TOUCH)&&event.isPrimary}function isPointerEventType(e,type){return(e.type=="pointer"+type||e.type.toLowerCase()=="mspointer"+type)}$(document).ready(function(){var now,delta,deltaX=0,deltaY=0,firstTouch,_isPointerType;if("MSGesture" in window){gesture=new MSGesture();gesture.target=document.body}$(document).bind("MSGestureEnd",function(e){var swipeDirectionFromVelocity=e.velocityX>1?"Right":e.velocityX<-1?"Left":e.velocityY>1?"Down":e.velocityY<-1?"Up":null;if(swipeDirectionFromVelocity){touch.el.trigger("swipe");touch.el.trigger("swipe"+swipeDirectionFromVelocity)}}).on("touchstart MSPointerDown pointerdown",function(e){if((_isPointerType=isPointerEventType(e,"down"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];if(e.touches&&e.touches.length===1&&touch.x2){touch.x2=undefined;touch.y2=undefined}now=Date.now();delta=now-(touch.last||now);touch.el=$("tagName" in firstTouch.target?firstTouch.target:firstTouch.target.parentNode);touchTimeout&&clearTimeout(touchTimeout);touch.x1=firstTouch.pageX;touch.y1=firstTouch.pageY;if(delta>0&&delta<=250){touch.isDoubleTap=true}touch.last=now;longTapTimeout=setTimeout(longTap,longTapDelay);if(gesture&&_isPointerType){gesture.addPointer(e.pointerId)}}).on("touchmove MSPointerMove pointermove",function(e){if((_isPointerType=isPointerEventType(e,"move"))&&!isPrimaryTouch(e)){return}firstTouch=_isPointerType?e:e.touches[0];cancelLongTap();touch.x2=firstTouch.pageX;touch.y2=firstTouch.pageY;deltaX+=Math.abs(touch.x1-touch.x2);deltaY+=Math.abs(touch.y1-touch.y2)}).on("touchend MSPointerUp pointerup",function(e){if((_isPointerType=isPointerEventType(e,"up"))&&!isPrimaryTouch(e)){return}cancelLongTap();if((touch.x2&&Math.abs(touch.x1-touch.x2)>30)||(touch.y2&&Math.abs(touch.y1-touch.y2)>30)){swipeTimeout=setTimeout(function(){touch.el.trigger("swipe");touch.el.trigger("swipe"+(swipeDirection(touch.x1,touch.x2,touch.y1,touch.y2)));touch={}},0)}else{if("last" in touch){if(deltaX<30&&deltaY<30){tapTimeout=setTimeout(function(){var event=$.Event("tap");event.cancelTouch=cancelAll;touch.el.trigger(event);if(touch.isDoubleTap){if(touch.el){touch.el.trigger("doubleTap")}touch={}}else{touchTimeout=setTimeout(function(){touchTimeout=null;if(touch.el){touch.el.trigger("singleTap")}touch={}},250)}},0)}else{touch={}}}}deltaX=deltaY=0}).on("touchcancel MSPointerCancel pointercancel",cancelAll);$(window).on("scroll",cancelAll)});["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(eventName){$.fn[eventName]=function(callback){return this.on(eventName,callback)}})})(Zepto);

//zepto.touchSlider
;(function($) {	
	var a=0,b,n,s,s2;
	var methods = {
        init: function (options) {
           	return this.each(function() {
				var $this = $(this), opt = $this.data('touchSlider');
                if(typeof(opt) == 'undefined') {
                	var defaults = {
                		box: $this,
                		arrows: true,
                		auto: false,
                		autoTime: 2000
                	};
					opt = $.extend({}, defaults, options);
					$this.data('touchSlider', opt);
                }
                opt = $.extend({}, opt, options);
                
                //生成按钮
                n = $(this).find('ul').eq(0).find('li').length;
                if(n > 1){
					b = '<ul class="dot-box">';
					for (var i=0; i<n; i++){
						if(i == a){
							$(this).find('li').eq(0).addClass('on');
							b += '<li class="dot on"></li>';
						}else{
							b += '<li class="dot"></li>';	
						}
					}
					b += '</ul>';
					if(opt.arrows == true){
						$(this).append(b);
					}else{
						$(this).append(b).find('.dot-box').hide();
					}
				}
                
                //自动播放
				if(opt.auto == true){ 
					methods.a(opt);
				}
                
                //按钮点击事件
				$(this).find('.dot-box li').click(function(){
					methods.c(opt);
					a = $(this).index();
					methods.r(opt);
				});
				
				//左右滑动事件，也可以换成上下滑动
				$(this).swipeLeft(function(){
					methods.c(opt);
					methods.n(opt);
				}).swipeRight(function(){
					methods.c(opt);
					methods.p(opt);
				});
			});
        },
        n: function (o) {
        	a = $(o.box).find('.dot-box li.on').index() + 1;
			if(a >= $(o.box).find('ul').eq(0).find('li').length){ a = 0; }
			methods.r(o);
        },
        p: function (o) {
        	a = $(o.box).find('.dot-box li.on').index() - 1;
			if(a < 0){ a = $(o.box).find('ul').eq(0).find('li').length - 1; }
			methods.r(o);
        },
        r: function (o) {
        	$(o.box).find('ul').eq(0).find('li').removeClass('on').eq(a).addClass('on');
			$(o.box).find('ul').eq(1).find('li').removeClass('on').eq(a).addClass('on');
        },
        a: function (o) {
        	s = setInterval(function(){ methods.n(o); },o.autoTime);
        },
        c: function (o) {
        	clearInterval(s);
			clearTimeout(s2);
			if(o.auto == true){
				s2 = setTimeout(function(){ methods.a(o); },o.autoTime);
			}
        }
    };
    
	$.fn.touchSlider = function (method) {
		if(methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }else {
            $.error('Error! Method' + method + 'does not exist on zepto.touchSlider！');
        }
	};
})(Zepto);
