<?php 
if ( is_singular() && Themeton_Std::getmeta('slider') !== 'noslider') : ?>
<div class="page-top-slider">
	<?php
    $slider_name = Themeton_Std::getmeta('slider');
    $slider = explode("_", $slider_name);
    
    $slider_pieces = $slider;
    unset($slider_pieces[0]);
    $slider_alias = implode("_", $slider_pieces);

    $shortcode = '';
    if (strpos($slider_name, "layerslider") !== false)
        $shortcode = "[" . $slider[0] . " id='" . $slider_alias . "']";
    elseif (strpos($slider_name, "revslider") !== false)
        $shortcode = "[rev_slider " . $slider_alias . "]";
    elseif (strpos($slider_name, "masterslider") !== false)
        $shortcode = "[master_slider id='" . $slider_alias . "']";
    echo do_shortcode($shortcode);
    ?>
</div><!-- end .page-top-title -->
<?php endif;  ?>