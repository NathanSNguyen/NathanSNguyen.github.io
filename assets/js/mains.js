jQuery(document).ready(function($){
	new Swiper('.wb_matbang_slide .matbang_swiper',{
		loop: true,
		navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
	});
	var collection = new Swiper('.wb_collections .collection_cts',{
		allowTouchMove: false,
		
		navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },
	});
	/*
	var collection_img = new Swiper('.wb_collections .collection_imgs',{
		grabCursor: true,
        effect: "creative",
        creativeEffect: {
          prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        },
  		lazy: {
			loadPrevNext: true,
		},
	});
	collection.controller.control = collection_img;
	collection_img.controller.control = collection;
	*/
	
	new Swiper('.wb_collections .floors_slide',{
		pagination: {
     		el: '.swiper-pagination2',
     		clickable: true,
     		renderBullet: function (index, className) {
     		
	          return '<span class="' + className + '">' + (this.slides[index].getAttribute('data-title')) + '</span>';
	        },
     	},
	});
	new Swiper('.wb_matcat .swiper',{
		pagination: {
     		el: '.swiper-pagination',
     		clickable: true,
     		
     	},
     	breakpoints: {
     		768:{
     			pagination: {
		     		el: '.tab_pagination',
		     		clickable: true,
		     		renderBullet: function (index, className) {     		
			          return '<span class="' + className + '">' + (this.slides[index].getAttribute('data-title')) + '</span>';
			        },
		     	},
     		}
     	}
	});
	var content_imgs = new Swiper('.wb_slide_contents ._content_imgs',{
		grabCursor: true,
        effect: "creative",
        creativeEffect: {
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        },
  		lazy: {
			loadPrevNext: true,
		},
	});
	var content_text = new Swiper('.wb_slide_contents ._content_text .swiper',{
	 	effect: "fade",
		pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
	});
	content_text.controller.control = content_imgs;
	content_imgs.controller.control = content_text;
	new Swiper('.wb_gallery .swiper',{
		
		
		pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev",
        },
        breakpoints: {
        	768: {
	            slidesPerView: 3,
	            spaceBetween: 20,
				centeredSlides: true,
	          },
        }
	});
	
	function checking_header(){
		var header  = $('#header'),
			wrap	= header.find('.header_wrap'),
			header_height = wrap.outerHeight(),
			top 	= header.offset().top,
			scroll	= $(window).scrollTop();
		
		
		//header.css('height',header_height);
		if(scroll >= 60){
			header.addClass('header_sticky');
		}else{
			header.removeClass('header_sticky');
		}
	}
	checking_header();
	$(window).bind('scroll resize',function(e){
		checking_header();
	});
	$('#header .menu').FloatMenu();
	if($('body').hasClass('home')){
		var clone_menu = $('<div id="clone_menu" class="float_dots"></div>'),
			menu = $('#header .menu').clone();
			clone_menu.append(menu);
			$('body').append(clone_menu);
			menu.FloatMenu();
		
	}//
	//scroll 
	$('.res_btn').resbtn();
	function check_slider(){
		var width = $(window).width();
		if(width <= 992){
			if(!$('.wb_tienich_group').hasClass('slick-initialized')){
				$('.wb_tienich_group').slick({
					slidesToShow: 2,
	  				slidesToScroll: 2,	        
			        dots: true,
			        arrows: false,
			        responsive:[
			        	{
						      breakpoint: 640,
						      settings: {	
						      	slidesToShow: 1,
				  				slidesToScroll: 1,	        
						        dots: true,
						        arrows: false,
						      }
						    },
			        ]
				});
			}
		}else{
			if($('.wb_tienich_group').hasClass('slick-initialized')){
				$('.wb_tienich_group').slick('unslick');
			}
		}
	}
	check_slider();
	$(window).on('resize',function(){
		check_slider();
	});
	/** wow animate */
	new WOW({
		boxClass:     'wow',      // default
	      animateClass: 'animate__animated', // default
	      offset:       0,          // default
	      mobile:       false,       // default
	      live:         true 
	}).init();
});