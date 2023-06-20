<?php

if (!class_exists('WPBakeryShortCode_alert_box')) {
class WPBakeryShortCode_alert_box extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        
        // Initial argument sets
        extract(shortcode_atts(array(
            'title' => 'Success message goes here',
            'icon' => 'fa fa-check',
            'icon_type' => 'fontawesome',
            'size' => '26px',
            'href' => '',
            'color' => '#55c85b',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);
        $href = vc_build_link( $href );
        $url = ($href['url']);
        
        $icon = isset($atts["icon_$icon_type"]) ? $atts["icon_$icon_type"] : $icon;
        if (!empty($icon)) {
            wp_enqueue_style("vc_$icon_type");
        }

        $urlpre = $urlaft = "";
        if($url != '') {
            $urlpre = "<a href='$url'>";
            $urlaft = "</a>";
        }

        $result = "<div class='con-element alert-box uk-grid uk-grid-collapse $class' style='background-color:$color;'>
            <div class='icon'><i class='".$icon."' style='font-size: $size;'></i></div>
            $urlpre
                <div><h3>$title</h3></div>
            $urlaft
        </div>";

        // return result
        return $result;
    }

}
}

vc_map( array(
    "name" => esc_html__('Alert box', 'consultaid'),
    "description" => esc_html__("Message information", 'consultaid'),
    "base" => 'alert_box',
    "icon" => "icon-wpb-quickload",
    "content_element" => true,
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => 'textfield',
            "param_name" => "title",
            "heading" => esc_html__("Title", 'consultaid'),
            "holder" => 'div',
            'admin_label' => true,
            "std" => 'Success message goes here'
        ),
         array(
            'type' => 'dropdown',
            'heading' => esc_html__('Icon library', 'consultaid'),
            'value' => array(
                esc_html__('Font Awesome', 'consultaid') => 'fontawesome',
                esc_html__('Open Iconic', 'consultaid') => 'openiconic',
                esc_html__('Typicons', 'consultaid') => 'typicons',
                esc_html__('Entypo', 'consultaid') => 'entypo',
                esc_html__('Linecons', 'consultaid') => 'linecons'
            ),
            'param_name' => 'icon_type',
            'description' => esc_html__('Select icon library.', 'consultaid'),
            "std" => "show",
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__('Icon', 'consultaid'),
            'param_name' => 'icon_fontawesome',
            'value' => 'fa fa-smile',
            'settings' => array(
                'emptyIcon' => false, // default true, display an "EMPTY" icon?
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'icon_type',
                'value' => 'fontawesome',
            ),
            'description' => esc_html__('Select icon from library.', 'consultaid'),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__('Icon', 'consultaid'),
            'param_name' => 'icon_openiconic',
            'settings' => array(
                'emptyIcon' => false, // default true, display an "EMPTY" icon?
                'type' => 'openiconic',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'icon_type',
                'value' => 'openiconic',
            ),
            'description' => esc_html__('Select icon from library.', 'consultaid'),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__('Icon', 'consultaid'),
            'param_name' => 'icon_typicons',
            'settings' => array(
                'emptyIcon' => false, // default true, display an "EMPTY" icon?
                'type' => 'typicons',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'icon_type',
                'value' => 'typicons',
            ),
            'description' => esc_html__('Select icon from library.', 'consultaid'),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__('Icon', 'consultaid'),
            'param_name' => 'icon_entypo',
            'settings' => array(
                'emptyIcon' => false, // default true, display an "EMPTY" icon?
                'type' => 'entypo',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'icon_type',
                'value' => 'entypo',
            ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__('Icon', 'consultaid'),
            'param_name' => 'icon_linecons',
            'settings' => array(
                'emptyIcon' => false, // default true, display an "EMPTY" icon?
                'type' => 'linecons',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'icon_type',
                'value' => 'linecons',
            ),
            'description' => esc_html__('Select icon from library.', 'consultaid'),
        ),
        array(
            "type" => 'textfield',
            "param_name" => "size",
            'description' => esc_html__( 'Icon size.', 'consultaid' ),
            'std' => '26px',
            "heading" => esc_html__("Icon size", 'consultaid'),
        ),
        array(
            'type' => 'colorpicker',
            'heading' => esc_html__( 'Background color', 'consultaid' ),
            'param_name' => 'color',
            'value' => '#55c85b', // default value to backend editor admin_label
        ),
        array(
            'type' => 'vc_link',
            'value' => '',
            'heading' => 'Link of box',
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