<?php

if (!class_exists('WPBakeryShortCode_pricetable')) {
class WPBakeryShortCode_pricetable extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        
        // Initial argument sets
        extract(shortcode_atts(array(
            'title' => '',
            'body' => '',
            'style' => esc_html__("Default", 'consultaid'),
            'footer' => esc_html__("", 'consultaid'),
            'mediaposition' => esc_html__("uk-card-media-top", 'consultaid'),
            'hover' => '0',
            'image' => '',
            'icons' => '',
            'color' => '',
            'size' => '',
            'href' => '',
            'badge'=> esc_html__("badge", 'consultaid'),
            'icon_type' => '',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);
        $href = vc_build_link( $href );
        $url = ($href['url']);
        $btntxt = ($href['title']);

        if( $hover == 1) {
            $hover = 'uk-card-hover';
        }

        $button = '';
        if (!empty($url)) {
            $button = sprintf( '<button class="uk-button mt4 uk-button-default uk-text-truncate" href="%s">%s</button>', $url , $btntxt);
        }
        $result = $group = '';
        $group = vc_param_group_parse_atts( $atts['group']);
        foreach ((array)$group as $val) {
            (isset($val['footer'])) ? $footer = ($val['footer']) : '';
            $result .= " <p>$footer</p> ";
        }
        
        $result = "
        <div class='con-element uk-card uk-box-shadow-medium $hover $class uk-text-center pricetable'>
            <div class='uk-card-badge uk-label'>$badge</div>
            <div class='uk-card-body'>
                <h3 class='uk-card-title uk-margin-remove'>$title</h3>
                <h4 class='uk-margin-remove-top'>$body</h4>
                <hr>
                " . $result . "
                $button
            </div>
        </div>";
        return $result;
    }
}
}
vc_map( array(
    "name" => esc_html__('Pricetable', 'consultaid'),
    "description" => esc_html__("Pricetable card", 'consultaid'),
    "base" => 'pricetable',
    "icon" => "icon-wpb-quickload",
    "content_element" => true,
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => 'textfield',
            "param_name" => "title",
            "heading" => esc_html__("Title", 'consultaid'),
            "holder" => 'div'
        ),
        array(
            "type" => 'textfield',
            "param_name" => "badge",
            "heading" => esc_html__("Badge", 'consultaid'),
        ),
        array(
            "type" => 'textfield',
            "param_name" => "body",
            "heading" => esc_html__("Description", 'consultaid')
        ),
        array(
            "type" => 'param_group',
            "value" => '',
            "param_name" => 'group',
            "params" => array(
                array(
                    "type" => 'textfield',
                    "param_name" => "footer",
                    "description" => esc_html__("Body text", 'consultaid'),
                    "heading" => esc_html__("Body", 'consultaid')
                ),
            
            )
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "hover",
            "heading" => esc_html__("Hover effect", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "0"
            ),
        array(
            'type' => 'vc_link',
            'value' => '',
            'heading' => 'Link of button',
            'param_name' => 'href',
            "std" => "ORDER NOW"
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