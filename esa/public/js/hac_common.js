var HAC_COMMON = {
	defaults:{
		datestr:"0"
	},
	init:function(options){
		var that = this,
			obj = $.extend(that.defaults, options);
		new WOW().init();
		if(window.innerWidth > 767){
			$(".ns").niceScroll({ cursorcolor:"rgba(255,255,255,0.8)", cursoropacitymax:1, touchbehavior:false, cursorwidth:"4px", cursorborder:"0", cursorborderradius:"5px"})
		
		}else{
			$('.simu-section-five').on('click','.item',function(){
				var title = $(this).find('h5.fs-16').text();
				var txt = $(this).find('.ns').text();
				$('#simuSectionFiveModal').find('.modal-title').text(title);
				$('#simuSectionFiveModal').find('.modal-body').text(txt);
				$('#simuSectionFiveModal').modal('show');
			})
		}
		
		that.timecount(obj.datestr)
		that.flowArrowSet();
	},
	timecount:function(datestr){
		setInterval(function(){
			var regEx = new RegExp("\\-","gi");
	        var nowTime=new Date();
	        var startTime=new Date((datestr).replace(regEx,"/"));	//
	        function add0(m) {
	            return m < 10 ? '0' + m : m
	        }
	        if(parseInt((startTime.getTime()-nowTime.getTime())/1000)>0){
	            var leftsecond = parseInt((startTime.getTime()-nowTime.getTime())/1000);
	            var day=Math.floor(leftsecond/(60*60*24));
	            var hour=Math.floor((leftsecond-day*24*60*60)/3600);
	            var minute=Math.floor((leftsecond-day*24*60*60-hour*3600)/60);
	            var second=Math.floor(leftsecond-day*24*60*60-hour*3600-minute*60);
	            $("#DAY-txt").text(add0(day));
	            $("#HOUR-txt").text(add0(hour));
	            $("#MINUTE-txt").text(add0(minute));
	            $("#SECONT-txt").text(add0(second));
	            return false;
	        }
		},1000)
	},
	flowArrowSet:function(){
		$('.VivaTimeline').find('.arrow').each(function(i){
			var $this = $(this);
			var $p = $this.parent('.events');
			var h = $p[0].offsetHeight/Math.sqrt(2);
			
			if( i%2 != 0 && window.innerWidth > 767){
				$this.css({ height:h+'px', width:h+'px', 'margin-top':-h/2+'px'});
			}else{
				$this.css({ height:h+'px', width:h+'px', 'margin-top':-h/2+'px'});
			}
		})
	}
}