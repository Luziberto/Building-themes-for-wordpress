<?php

if (!class_exists('WPBakeryShortCode_testimonial_grid')) {
class WPBakeryShortCode_testimonial_grid extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'layout' => 'mosanry',
            'column' => '3',
            'list' => '',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);

        $list = vc_param_group_parse_atts($list);
        $items = '';

        if( is_array($list) ){
            foreach ($list as $item) {
                $image = isset($item['image']) ? $item['image'] : "";
                $atach_src = wp_get_attachment_image_src($image, 'thumbnail');
                $image = is_array($atach_src) ? $atach_src[0] : "";

                $f_name = isset($item['f_name']) ? $item['f_name'] : "";
                $f_name = !empty($f_name) ? "<h3>$f_name</h3>" : "";


                $job = isset($item['job']) ? $item['job'] : "";
                $job = !empty($job) ? "<sub>$job</sub>" : "";

                $quote_text = isset($item['quote_text']) ? $item['quote_text'] : "";
                $quote_text = !empty($quote_text) ? "<p>$quote_text</p>" : "";

                $items .= " <div class='con-item'>
                                <div class ='profile_image'>
                                    <img src='".$image."' alt='".esc_attr('image','consultaid')."'>
                                </div>
                                $quote_text
                                $f_name
                                $job
                            </div>";
            }
        }
         $result = "<div class='con-element uk-child-width-1-1@m grid uk-child-width-1-1@s $class' id='testimonial_grid'>
                        $items
                    </div>";

        // return result
        return $result;
    }
}
}
vc_map( array(
    "name" => esc_html__('Testimonial grid', 'consultaid'),
    "description" => esc_html__("Testimonial grid and mosanry", 'consultaid'),
    "base" => 'testimonial_grid',
    "content_element" => true,
    "category" => 'Consult aid',
    "icon" => "icon-wpb-quickload",
    'params' => array(
       array(
            'type' => 'param_group',
            'heading' => esc_html__('Values', 'consultaid'),
            'param_name' => 'list',
            'value' => '',
            'params' => array(
                array(
                    "type" => 'textfield',
                    "param_name" => "f_name",
                    'admin_label' => true,
                    'holder' => 'div',
                    "heading" => esc_html__("Name", 'consultaid'),
                    'value' => 'Mark Wilson',
                ),
                array(
                    'type' => 'textfield',
                    'heading' => esc_html__('Job', 'consultaid'),
                    'param_name' => 'job',
                    'value' => 'Designer',
                ),
                array(
                    'type' => 'attach_image',
                    "param_name" => "image",
                    "heading" => esc_html__("Image", 'consultaid'),
                    "std" => "show",
                ),
                array(
                    'type' => 'textfield',
                    "param_name" => "quote_text",
                    "heading" => esc_html__("Quote Text", 'consultaid'),
                    "value" => "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
                    "std" => "show",
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
