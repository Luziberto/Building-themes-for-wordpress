<?php
if (!class_exists('WPBakeryShortCode_con_quote_form')) {
class WPBakeryShortCode_con_quote_form extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
    // Initial argument sets
    extract(shortcode_atts(array(
        'title' => 'Quick Quote',
        'shortcode' => '',   
        'extra_class' => ''
    ), $atts));

    $class = esc_attr($extra_class);
    $result = '';
    $shortcode_html='';
    $shortcode_html = do_shortcode(''.$shortcode.'');

    $result = " <div class='con-element con-quote $class'>
                    <div class='qoute-header'>
                        <h3>".$title."</h3>
                    </div>
                    <div class='con-form'>
                        $shortcode_html
                    </div>
                </div>";   
    // return result
    return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__("Quick Form", 'consultaid'),
    "description" => esc_html__("With contact form", 'consultaid'),
    "base" => "con_quote_form",
    "class" => "",
    "icon" => "icon-wpb-quickload",
    "category" => 'Consult aid',
    "show_settings_on_create" => true,
    "params" => array(
        array(
            'type' => 'textfield',
            'heading' => esc_html__('Title', 'consultaid'),
            'param_name' => 'title',
            'value' => 'Quick Quote',
            'holder' => 'div'
         ),
        array(
            'type' => 'textfield',
            'heading' => esc_html__('Contact form shortcode', 'consultaid'),
            'param_name' => 'shortcode',
            'value' => ''
        ),
        array(
            "type" => "textfield",
            "param_name" => "extra_class",
            "heading" => esc_html__("Extra Class", 'consultaid'),
            "value" => "",
            "description" => esc_html__("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", 'consultaid'),
        )
    )
) );