<?php

if (!class_exists('WPBakeryShortCode_con_testimonial')) {
class WPBakeryShortCode_con_testimonial extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        
        // Initial argument sets
        extract(shortcode_atts(array(
            'name' => '',
            'body' => '',
            'image' => '',
            'color' => '',
            'size' => '',
            'title' => '',
            'icon_type' => '',
            'extra_class' => ''
        ), $atts));
        $class = esc_attr($extra_class);

        $result = '';

        $group = vc_param_group_parse_atts( $atts['group']);
        foreach ($group as $val) {

        $image =($val['image']);
        $name = ($val['name']);
        $body = ($val['body']);
        $description = ($val['description']);

        if( !empty($image) ){
            $image = wp_get_attachment_image_src($image, 'consultaid-image-medium-thumb-testimonial');
            $image = "<img class='uk-border-circle' src='".$image[0]."' alt='" . esc_html__("image", 'consultaid') . "'>";
        }
        $result .= "
        <div class='swiper-slide'>
            <p>$body</p>
            <hr class='uk-margin-medium-top uk-margin-bottom'>
            $image
            <span class='uk-text-top'>$name</span>
            <p class='testimonial-description'>$description</p>
        </div>";
        }

        $output = "
        <div class='con-element uk-section testimonialvc $class'>
            <div class='swiper-container-testimonial uk-container'>
                <div class='swiper-wrapper'>
                    " . $result . "
                </div>
            <div class='swiper-button-next'></div>
            <div class='swiper-button-prev'></div>
            </div>
        </div>";
        return $output;
    }
}
}
vc_map( array(
    "name" => esc_html__('Testimonial', 'consultaid'),
    "description" => esc_html__("Testimonial Carousel", 'consultaid'),
    "base" => 'con_testimonial',
    "content_element" => true,
    'admin_label' => true,
    'holder' => 'div',
    "icon" => "icon-wpb-quickload",
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => 'param_group',
            "value" => '',
            "param_name" => 'group',
            // Note params is mapped inside param-group:
            "params" => array(
                array(
                    "type" => 'textfield',
                    "param_name" => "name",
                    'admin_label' => true,
                    'holder' => 'div',
                    "heading" => esc_html__("Client name", 'consultaid')
                ),
                array(
                    "type" => 'textfield',
                    "param_name" => "description",
                    'admin_label' => true,
                    'holder' => 'div',
                    "heading" => esc_html__("Client Description", 'consultaid')
                ),
                array(
                    'type' => 'attach_image',
                    "param_name" => "image",
                    "heading" => esc_html__("Attach Image", 'consultaid'),
                ),
                array(
                    "type" => 'textarea',
                    "param_name" => "body",
                    "heading" => esc_html__("Quote text", 'consultaid'),
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
