(function($){
    'use strict';

    $(document).ready(function(){

        $('.swiper-container-testimonial').each(function(){
            var _swiper = $(this);
            _swiper.swiper({
                slidesPerView: 2,
                grabCursor: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',

                spaceBetween: 30,
                loop: true,
                breakpoints: {

                1024: {
                  slidesPerView: 1
                }
              }

            });

        });
            
    });
    

}(jQuery));