<?php
if (!class_exists('WPBakeryShortCode_accordion')) {
class WPBakeryShortCode_accordion extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        
        // Initial argument sets
        extract(shortcode_atts(array(
            'style' => '0',
            'multi' => '0',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);
        $result = $multiple = '';
        $group = vc_param_group_parse_atts( $atts['group']);
        foreach ((array)$group as $val) { 
            (isset($val['title'])) ? $title = ($val['title']) : '';
            (isset($val['body'])) ? $body = ($val['body']) : '';
            $result .= "
            <li>
                <h3 class='uk-accordion-title'>$title</h3>
                <div class='uk-accordion-content'>
                    <p>$body</p>
                </div>
            </li>";
        }
        if( $style == '1') {
            $class .= ' style-arrow';
        }
        $multiple = " uk-accordion='multiple: false'";
        if( $multi == '1') {
            $multiple = " uk-accordion='multiple: true'";
        }
        $result = "<ul class='con-element accordion-vc $class'$multiple>" . $result . "</ul>";
        return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__('Accordion', 'consultaid'),
    "description" => esc_html__("Consultaid Accordion", 'consultaid'),
    "base" => 'accordion',
    "icon" => "icon-wpb-quickload",
    "content_element" => true,
    "category" => 'Consult aid',
    'params' => array(
        array(
            'type' => 'checkbox',
            "param_name" => "style",
            "heading" => esc_html__("Simple arrow style?", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "0"
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "multi",
            "heading" => esc_html__("Multiple open?", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "0"
        ),
        array(
            "type" => 'param_group',
            "value" => '',
            "param_name" => 'group',
            // Note params is mapped inside param-group:
            "params" => array(
                array(
                    "type" => 'textfield',
                    "param_name" => "title",
                    'admin_label' => true,
                    'holder' => 'div',
                    "heading" => esc_html__("Title", 'consultaid'),
                ),
                array(
                    "type" => 'textarea',
                    "param_name" => "body",
                    "heading" => esc_html__("Body text", 'consultaid'),
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