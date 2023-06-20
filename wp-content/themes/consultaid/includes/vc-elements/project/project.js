(function($){
	'use strict';
	$(document).ready(function(){

		$('.swiper-container-feautured-project').each(function(){
			var _swiper = $(this);
			_swiper.swiper({
			    pagination: '.swiper-pagination',
			    paginationClickable: true,
			    hashnav: true,
			    nextButton: '.next', 
			    prevButton: '.prev',
			});
		});
			
	});
}(jQuery));