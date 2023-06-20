(function($){
	"use strict";

	/* Thumbnail block */
	$('.con-image').each(function(){
		if ( typeof $(this).data('src') !== 'undefined' && $(this).data('src') != '' ) {
			$(this).css('background-image', 'url('+$(this).data('src')+')');
		}
	});
 
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

	var isTouchDevice = function(){
	    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
	}

	$('[data-bg-image]').each(function(){
		$(this).css({ 'background-image': 'url('+$(this).data('bg-image')+')' });
	});

	$('[data-bg-color]').each(function(){
		$(this).css({ 'background-color': $(this).data('bg-color') });
	});
 
	$('[data-width]').each(function(){
		$(this).css({ 'width': $(this).data('width') });
	});

	$('[data-height]').each(function(){
		$(this).css({ 'height': $(this).data('height') });
	});

	$('[data-alpha]').each(function(){
		$(this).css({ 'opacity': $(this).data('alpha') }); 
	});

	var validateEmail = function(email){
		if( /^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(email) ){
			return true;
		}
		return false;
	};

	$('.project-items').each(function(){
			var swiperproject = new Swiper('.swiper-container-project', {
		    slidesPerView:3,
		    pagination: '.swiper-pagination',
		    paginationClickable: true,
		    spaceBetween : 20,
		     breakpoints :{
			    	996: {
			    		slidesPerView: 3
			    	},
			    	600: {
			    		slidesPerView: 1
			    	}
			  	}

		});
	});

	$(window).load(function(){
		$('.project-items').each(function(){
				var swiperprojectcompleted = new Swiper('.swiper-container-project-completed', {
			    slidesPerView:5,
			    pagination: '.swiper-pagination',
			    paginationClickable: true,
			    spaceBetween : 20,
			    breakpoints :{
			    	996: {
			    		slidesPerView: 3
			    	},
			    	600: {
			    		slidesPerView: 1
			    	}
				}
			});
		});
	});

	$(window).load(function(){
		$('.swiper-container-testimonial-carousel').each(function(){
				var swiperprojectcompleted = new Swiper('.swiper-container-testimonial-carousel', {
			    slidesPerView:1,
			    nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
			    spaceBetween : 20
			});
		});
	});


	$(document).ready(function(){

		if( $('body').hasClass('page') || $('body').hasClass('single') || $('.featured-post').length ){
			$('#the_loader').fadeOut('fast', function(){
				$('#the_loader').addClass('loaded');
			});
		}

		$('.grid').masonry({
		  itemSelector: '.con-item',
		  columnWidth: '.con-item',
		  gutter: 30,
		  percentPosition: true
		});

		$('.a-grid2').masonry({
		  itemSelector: '#dada',
		  columnWidth: '#dada',
		  gutter: 0,
		  percentPosition: true
		}); 
		$('.a-grid3').masonry({
		  itemSelector: '.uk-width-1-3@m',
		  columnWidth: '.uk-width-1-3@m',
		  gutter: 30,
		  percentPosition: true
		});
		$('.a-grid4').masonry({
		  itemSelector: '.uk-width-1-4@m',
		  columnWidth: '.uk-width-1-4@m',
		  gutter: 30,
		  percentPosition: true
		}); 



		/* Preparing Menu
		======================================*/

		var preparing_menu = function(){
			var $gmc = $('.grid-menu-container');
			$gmc.find('.grid-menu').html("");

			// building menus
			$('#header nav.main-nav > ul > li').each(function(){
				var _level1 = $(this);
				var _a = _level1.find('> a').clone();
				var _menu = $('<div class="grid-menu-item"><span></span></div>');

				_menu.find('span').append(_a);
				if( _level1.find('>ul').length ){
					_menu.addClass('has-children');
				}

				$gmc.find('.grid-menu').append( _menu );
				setTimeout(function(){
					pm_showing();
				}, 100);
			});

			// setting menu items count
			$gmc.find('.grid-menu').attr('data-grid', $gmc.find('.grid-menu .grid-menu-item').length);

			// menu item click handler
			$gmc.find('.grid-menu').find('.grid-menu-item a').off('click').on('click', function(){
				var _link = $(this);

				// has child menu
				if( _link.parents('.grid-menu-item').hasClass('has-children') ){

					pm_closing();

					var _index = $gmc.find('.grid-menu').find('.grid-menu-item').index( _link.parents('.grid-menu-item') );
					setTimeout(function(){
						$gmc.find('.grid-menu').html("");

						// add back menu
						var _mback = $('<div class="grid-menu-item menu-back"><span></span></div>');
						_mback.find('span').append( $('<a href="javascript:;"></a>').html('...') );
						$gmc.find('.grid-menu').append( _mback );

						// add sub menu items
						$('#header nav.main-nav > ul > li').eq(_index).find('> ul > li').each(function(){
							var _level1 = $(this);
							var _a = _level1.find('> a').clone();
							var _menu = $('<div class="grid-menu-item"><span></span></div>');

							_menu.find('span').append(_a);
							if( _level1.find('>ul').length ){
								_menu.addClass('has-children');
							}

							$gmc.find('.grid-menu').append( _menu );
						});

						// setting menu items count
						setTimeout(function(){
							$gmc.find('.grid-menu').attr('data-grid', $gmc.find('.grid-menu .grid-menu-item').length);
							pm_showing();
						}, 100);

						// back menu button handler
						$gmc.find('.grid-menu').find('.grid-menu-item a').on('click', function(){
							var _sm = $(this);
							if( _sm.parents('.grid-menu-item').hasClass('menu-back') ){
								pm_closing();
								setTimeout(function(){
									preparing_menu();
								}, $gmc.find('.grid-menu').find('.grid-menu-item').length*100+200);
								return false;
							}
							else{
								pm_closing();
								setTimeout(function(){
									$('#menu-handler').trigger('click');
									window.location.href = _sm.attr('href');
								}, $gmc.find('.grid-menu').find('.grid-menu-item').length*100+200);
								return false;
							}
						});

					},800);

					return false;
				}
				else{
					pm_closing();
					setTimeout(function(){
						$('#menu-handler').trigger('click');
						window.location.href = _link.attr('href');
					}, $gmc.find('.grid-menu').find('.grid-menu-item').length*100+200);


					// <<< one page menu
					if( $('ul.one-page-menu').length ){
						var href = _link.attr('href') + '';
						href = href.replace('#', '');

						var $row_c = $('div[data-onepage-slug="'+href+'"]');
						if( $row_c.length ){
							var otop = $row_c.offset().top;
							otop = otop - $('header').height();
							if(otop<0){ otop = 0; }
							$("html, body").animate({ scrollTop: otop }, "slow");
						}
					}
					// one page menu >>>
					

					return false;
				}
			});
			
		};

		var pm_showing = function(){
			var $gmc = $('.grid-menu-container');
			var _duration = 0;
			$gmc.find('.grid-menu').find('.grid-menu-item').each(function(index){
				_duration = (index+1)/10+0.1;
				$(this).css({
					'-webkit-transition-delay': _duration+'s',
					'-moz-transition-delay': _duration+'s',
					'transition-delay': _duration+'s'
				});
				$(this).addClass('showing-item');
			});

			setTimeout(function(){
				$gmc.find('.grid-menu').find('.grid-menu-item').each(function(index){
					$(this).css({
						'-webkit-transition-delay': '0s',
						'-moz-transition-delay': '0s',
						'transition-delay': '0s'
					});
				});
			}, _duration*1000);
		};

		var pm_closing = function(){
			var $gmc = $('.grid-menu-container');
			var _i = $gmc.find('.grid-menu').find('.grid-menu-item').length-1;
			var _ani = 1;
			for( var _j=_i; _j>=0; _j-- ){
				$gmc.find('.grid-menu').find('.grid-menu-item').eq(_j).css({
					'-webkit-transition-delay': _ani/10+'s',
					'-moz-transition-delay': _ani/10+'s',
					'transition-delay': _ani/10+'s'
				});
				$gmc.find('.grid-menu').find('.grid-menu-item').eq(_j).addClass('hiding-item');
				_ani++;
			}
		};

		$('#menu-handler').on('click', function(){
			$('body').addClass('opened-menu');
			$('html').addClass('lock-scroll');
			preparing_menu();
		});


		$(document).keyup(function(e) {
		     if (e.keyCode == 27) { // press ESC
		        // press ESC key - do anything
		    }
		});



		// sticky sidebar
		$('.sticky-content-sidebar').each(function(){
			var _this = $(this);
			_this.find('.sticky-content, .sidebar').theiaStickySidebar();
		});


		// $('.hamburger-menu')
		UIkit.toggle('.hamburger-menu', { target: '#offcanvas-nav' });
		UIkit.offcanvas('#offcanvas-nav', { overlay: true });


		$('[data-ukicon]').each(function(){
			var _this = this;
			var _val = $(_this).data('ukicon');
			var _vals = _val.split('|');
			var _args = { icon: _vals[0], ratio: 1 };

			if( _vals.length>1 ){
				_args.ratio = parseInt(_vals[1], 10);
			}

			$(_this).addClass('custom-uk-icon')
				.attr('uk-icon', 'icon:'+_args.icon+'; ratio:'+_args.ratio+';');
		});

		UIkit.icon('.custom-uk-icon');
		


	});
	

	$(window).load(function(){

		// page loaded
		$('body').addClass('page-loaded');
		$('#the_loader').fadeOut('fast', function(){
			$('#the_loader').addClass('loaded');
		});

	});

	// Counter
	$('.counter').counterUp({
    delay: 10,
    time: 1500
	});

 

})(jQuery);
