(function($){
	'use strict';

	$(document).ready(function(){

		$('.con-team-container').each(function(){
			var _swiper = $(this);
			_swiper.swiper({
		        pagination: '.swiper-pagination1',
		        slidesPerView: 4,
		        paginationClickable: true,
		        spaceBetween: 30,
		        breakpoints: {
			    800: {
			      slidesPerView: 3,
			    },
			    600: {
			      slidesPerView: 2,
			    },
			    450: {
			      slidesPerView: 1,
			    },
			  }
		    });

		});
			
	});
	

}(jQuery));