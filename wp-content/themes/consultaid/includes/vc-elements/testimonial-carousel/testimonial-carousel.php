<?php

if (!class_exists('WPBakeryShortCode_testimonial_carousel')) {
class WPBakeryShortCode_testimonial_carousel extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'name' => '',
            'position' => '',
            'title' => '',
            'description' => '',
            'body' => '',
            'image' => '',
            'textalign' => '',
            'imageposition' => '',
            'starrate' => '',
            'quotestyle' => '',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);
        $result = $swipersliderstart = $swipersliderend = '';
        $output = '';
        $stars = '';
        $br = '<br>';
        $fullcontent = $imageleftstylestart = $imageleftstyleend = $imagedivs = $hiddenquote = $imagedive = $marginbottom = $whitequote = $whitehr = $image = '';
        $countslide = 0;
        $ukflex= '';
        $swiperslidestart = $swiperslideend = $padding = '';
        $group = vc_param_group_parse_atts( $atts['group']);
        foreach ((array)$group as $val) {
            if (count($group)>1 ) {
            $swipersliderstart = "<div class='swiper-slide'>";
            $swipersliderend = "</div>";
            $padding = 'responsiblemargin';
            }
            (isset($val['title'])) ? $title = ($val['title']) : $title='';
            (isset($val['description'])) ? $description = ($val['description']) : $description='';
            (isset($val['name'])) ? $name = ($val['name']) : $name= '';
            (isset($val['position'])) ? $position = ($val['position']) : $position= '';
            (isset($val['body'])) ? $body = ($val['body']) : $body= '';
            (isset($val['image'])) ? $image = ($val['image']) : $image ='';
            (isset($val['starrate'])) ? $starrate = ($val['starrate']) : $starrate= '';
            (isset($val['textalign'])) ? $textalign = ($val['textalign']) : $textalign= '';
            (isset($val['imageposition'])) ? $imageposition = ($val['imageposition']) : $imageposition = '';
            (isset($val['quotestyle'])) ? $quotestyle = ($val['quotestyle']) : '';


            if((int)$starrate > 0 ) {
                for ($i=0; $i < 5; $i++) {
                    if( (int)$starrate > $i) {
                        $stars .= "<i class='fa fa-star' aria-hidden='true'></i> ";
                    } else {
                        $stars .= "<i class='fa fa-star-o' aria-hidden='true'></i> ";
                    }
                }
            }
        if($stars != '') {
            $stars = "<div class='stars'>$stars</div>";
        }
        if($imageposition == 'bottom') {
            $marginbottom = 'mmb05';
        }
        if($position != '') {
            $position = "<div class='position $marginbottom'>$position</div>";
        }
        if($title != '') {
            $title = "<h1 class='uk-text-bold'>$title</h1>";
        }
        if($description != '') {
            $description = "<h2 class='uk-text-center'>$description</h2>";
        }
        if ($title == '' && $description == '' && $name != '' && $body != '' && $position != '' && $imageposition == 'left' ) {
            $whitequote = 'whitequote';
            $whitehr = 'whitehr';
        }
        if($textalign == 'uk-text-center' ) {
            $textalign = 'uk-text-center';
            $ukflex = 'uk-flex-center';

        }
        elseif ($textalign == 'uk-text-left') {
            $textalign = 'uk-text-left';
            $ukflex = 'uk-flex-left';
        }
        elseif ($textalign == 'uk-text-right') {
            $textalign = 'uk-text-right';
            $ukflex = 'uk-flex-right';
        }
        if ($quotestyle == '1') {
            $quotestyle = 'quotestyle2';
        }
        if ($quotestyle == '2') {
            $quotestyle = 'noquote';
        }
        if( !empty($image) ){
            if($imageposition =='left') {
                $image = wp_get_attachment_image($image, 'consultaid-testimonial');
                $image = "<div class='uk-width-1-4@m uk-width-1-1@s $textalign uk-flex uk-flex-center uk-flex-middle'><div class='imagewrapper'>$image</div></div>";
                $imageleftstylestart = "<div class='uk-grid uk-grid-divider'>";
                $imageleftstyleend ="</div>";
                $imagedivs ="<div class='uk-width-3-4@m uk-width-1-1@s'>";
                $imagedive ="</div>";
                $hiddenquote = "hiddenquote";
                $fullcontent ="$imageleftstylestart
                $image
                $imagedivs
                $title
                $description
                <p class='$padding'>$body</p>
                <span class='color-ancient'>$name</span>
                <div class='uk-grid'>
                    <div>$position</div>
                    <div class='smallestpadding'>$stars</div>
                </div>
                $imagedive
                $imageleftstyleend";

            } elseif($imageposition =='bottom') {
                $image = wp_get_attachment_image($image, 'thumbnail');
                $image = "<div class='uk-flex $ukflex'><div class='uk-flex uk-flex-middle uk-flex-right'>$image</div>
                    <div class='uk-text-left pl2 uk-flex-middle'>
                        <div class='mmb05'><span>$name</span></div>
                        $position
                        $stars
                    </div></div>";
                $fullcontent = "
                $title
                $description
                <p class='$padding'>$body</p>
                <div class='image-thumbail'>$image</div>";
            } else {
                $image = wp_get_attachment_image($image, 'consultaid-vc-ceo-team');
                $image = "<div class='$textalign'>
                $image
                </div>
                <div class='$textalign'>
                <span>$name</span>
                $position
                $stars
                </div>";
                $fullcontent = "
                $image
                $title
                $description
                <p class='$padding'>$body</p>";
            }
        } else {
            $fullcontent = "
                $title
                $description
                <p class='$whitequote $padding'>$body</p>
                <div class='$whitehr defaulthr'></div>
                <div class='mmb05 mt1'><span>$name</span></div>
                $position
                $stars";
        }
         

        $result .= "
        $swipersliderstart
            <div class='ui-section testimonial-single $quotestyle $textalign $class'>
                <div class='testimonial-wrapper $hiddenquote'>
                $fullcontent
                </div>
            </div>
        $swipersliderend
        ";

        $stars = '';
        }//foreach
        if (count($group)>1 ) {
            $output .="
            <div class='con-element swiper-container-testimonial-carousel uk-overflow-hidden'>
                <div class='swiper-button-next'></div>
                <div class='swiper-button-prev'></div>
                <div class='swiper-wrapper'>
                       ". $result ."
                </div>
            </div>";  
        }
        else $output = $result;
        return $output;
    }
}
}
vc_map( array(
    "name" => esc_html__('Testimonial / Carousel', 'consultaid'),
    "description" => esc_html__("Testimonial / Carousel", 'consultaid'),
    "base" => 'testimonial_carousel',
    "content_element" => true,
    "icon" => "icon-wpb-quickload",
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => 'param_group',
            "value" => '',
            "param_name" => 'group',
            "params" => array(
                array(
                    "type" => 'textfield',
                    "param_name" => "title",
                    'admin_label' => true,
                    "heading" => esc_html__("Top Title", 'consultaid'),
                ),
                array(
                    "type" => 'textfield',
                    "param_name" => "description",
                    'admin_label' => true,
                    "heading" => esc_html__("Description", 'consultaid'),
                ),
                array(
                    "type" => 'textfield',
                    "param_name" => "name",
                    'admin_label' => true,
                    "heading" => esc_html__("Name", 'consultaid'),
                    "holder" => "div",
                ),
                array(
                    "type" => 'textfield',
                    "param_name" => "position",
                    'admin_label' => true,
                    "heading" => esc_html__("Job", 'consultaid'),
                    "description" => esc_html__("Director, CEO, Manager etc.", 'consultaid'),
                    "holder" => "div",
                ),
                array(
                    "type" => 'textarea',
                    "param_name" => "body",
                    "heading" => esc_html__("Quote text", 'consultaid'),
                ),
                array(
                    'type' => 'attach_image',
                    "param_name" => "image",
                    "heading" => esc_html__("Author Image", 'consultaid'),
                ),
                array(
                    "type" => "dropdown",
                    "param_name" => "imageposition",
                    "heading" => esc_html__("Image position", 'consultaid'),
                    "value" => array(
                        "Center" =>"center",
                        "Left" =>"left",
                        "Bottom" =>"bottom",
                    ),
                ),
                array(
                    "type" => "dropdown",
                    "param_name" => "textalign",
                    "heading" => esc_html__("Text align", 'consultaid'),
                    "value" => array(
                        "Center" =>"uk-text-center",
                        "Left" =>"uk-text-left",
                        "Right" =>"uk-text-right",
                    ),
                ),
                array(
                    "type" => "dropdown",
                    "param_name" => "starrate",
                    "heading" => esc_html__("Star rate", 'consultaid'),
                    "value" => array(
                        "No star rating" =>"0",
                        "1 star" =>"1",
                        "2 stars" =>"2",
                        "3 stars" =>"3",
                        "4 stars" =>"4",
                        "5 stars" =>"5",
                    ),
                    "std" => "0"
                ),
                array(
                    "type" => "dropdown",
                    "param_name" => "quotestyle",
                    "heading" => esc_html__("Quotation marks style", 'consultaid'),
                    "value" => array(
                        "Cirle style (default)" =>"0",
                        "Square" =>"1",
                        "No quotation marks" => "2"
                    ),
                    "std" => "0"
                ),
            )
        ),
        
        

        array(
            "type" => "textfield",
            "param_name" => "extra_class",
            "heading" => esc_html__("Extra Class", 'consultaid'),
            "value" => "",
            "description" => esc_html__("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", 'consultaid'),
        )
    )
));
