;( function( $ ) {	
	'use strict';
	
	$.fn.resbtn = function(){	
		var $holder = $('body>.holder_menu_opened');
	    if(!$holder.length){
	    	$('body').append('<div class="holder_menu_opened"></div>');
	       $holder = $('body>.holder_menu_opened');
	    }
		this.each(function(){
			var elem = $(this),
				target = $(elem.attr('href')),
				close = target.find('.close'),
				links = target.find('a'),
                subbtn = target.find('.arrow');			
			elem.click(function(e){				
				e.stopPropagation();
				if($(this).hasClass('open')){
					$('body').removeClass('openmenu');
					$(this).removeClass('open');
					target.removeClass('open');
				}else{
					$('body').click();
					$('body').addClass('openmenu');
					$(this).addClass('open');
					target.addClass('open');
				}
				
				return false;
			});
			close.click(function(){
				$('body').click();
				return false;
			});
			links.on('click',function(){
				var  href=$(this).attr('href');
				if(href == '#'){
					return false;
				}
			})
          subbtn.on('click',function(e){
          	e.preventDefault();
            var target 	=  $(this).closest('a').next(),
            	parent	= $(this).closest('li'),
            	other	= parent.siblings('li').find('.sub-menu'),
            	otherlink	= parent.siblings('li').find('.arrow');
            other.removeClass('open');
            otherlink.removeClass('open');
            $(this).toggleClass('open');
            target.toggleClass('open');
          })
			target.click(function(e){
				e.stopPropagation();
			});
			$holder.on('click',function(){
				$('body').click();
			});
			$('body').click(function() {
				$('body').removeClass('openmenu');
				elem.removeClass('open');
				target.removeClass('open');
			});
		});
	};
	$.fn.FloatMenu = function(options){
		$(this).each(function(){
			new $.FloatMenu($(this),options);
		});
		return this;
	}
	$.FloatMenu = function(el,options){
		this.el = $(el);				
		this._init(options);
	};
	$.FloatMenu.defaults = {};
	$.FloatMenu.prototype = {
			_init: function(options)
			{
				var self = this;
				self.onMove = false;
				self.options = $.extend( true, {}, $.FloatMenu.defaults, options );
				self.links = self.el.find('a');
				self.targets = [];
				
				self.links.each(function(){
					var href = $(this).attr("href");
					var hash = href.substr(href.indexOf("#"));
					var $withoutHash = href.substr(0,href.indexOf('#'));
					
					if($(hash).length){
						self.targets.push({
							anchor : $(this),
							target : hash
						});
					};
					
				});				
				self.targets.sort(self._sort);				
				self.current = null;
				self._trigger();
			},
			_sort:function(a,b){
				
				return $(a.target).offset().top > $(b.target).offset().top;
			},
			_check_float:function(){
				var self  =  this;
				var  totop = $(window).scrollTop();
				var  watched = false;
				$(self.targets).each(function(){
					
					var top  = $(this.target).offset().top,
						height = $(this.target).outerHeight();
					if(totop >= top-61 && totop <= top+ height){
						//catch
						
						watched = true;
						
						if(self.current != this){
							self.current = this;
							self.links.removeClass('active');
							$(this.anchor).addClass('active');
							//need smooth scroll to new
							
							
							
						}
					}
				});
				if(!watched){
					self.el.addClass('hide');
				}else{
					self.el.removeClass('hide');
				}
			},
			_trigger: function()
			{
				var self  =  this;
				self._check_float();
				$(window).bind('scroll',function(){
					self._check_float();
				});
				self.el.on('moveToAnchor',function(e){
					
					
					var target  = e.target,
						top     = $(target).offset().top;
					$('body,html').animate({
				        scrollTop: top -1
				    }, 0);
					   
				})
				self.links.on('click',function(e){
					e.preventDefault();
					var target  = $(this).attr('href'),
						top     = $(target).offset().top;
						self.el.trigger({
							type: 'moveToAnchor',
							target: target
						});
					
				});
				const el = document.querySelector('body');
				/*
				self.wheeling = false;
				el.onwheel  = function(event){
					var current_index = self.targets.indexOf(self.current);
					var direct = 'down';
					
					if(event.deltaY > 0 ){
						var check_index = current_index< self.targets.length?current_index + 1:false;
						direct = 'down';
					}else{
						var check_index = current_index> 0?current_index - 1:false;
						direct = 'up';
					}
					
					if(check_index){
						var next_item = self.targets[check_index];
						self.maybeMove(next_item,direct);
					}
					
					
				}
				*/
			},
			maybeMove: function(item,direct){
				var self = this,top,window_top,
					totop = $(window).scrollTop(),
					vdh	= $(window).height();
				if(direct == 'down' && item){
					
					top     = $(item.target).offset().top;
					
					if(totop+vdh >= top - 110 ){
						//watched
						self.el.trigger({
							type: 'moveToAnchor',
							target: item.target
						});
					}
				}
			}
	
	}
})( jQuery );