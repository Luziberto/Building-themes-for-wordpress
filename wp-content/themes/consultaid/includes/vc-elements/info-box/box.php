<?php

if (!class_exists('WPBakeryShortCode_info_box')) {
class WPBakeryShortCode_info_box extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        
        // Initial argument sets
        extract(shortcode_atts(array(
            'title' => '',
            'shadows' => "uk-box-shadow-small",
            'image' => '',
            'icon' => 'fa fa-forumbee',
            'icon_type' => 'fontawesome',
            'size' => '',
            "href" => '',
            'icon_types' => '',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);
        $href = vc_build_link( $href );
        $url = ($href['url']);
    
        // Shadow of the cards
        if( $shadows == 'small' ) {
            $shadows = 'uk-box-shadow-small';
        } else if ( $shadows == 'medium' ) {
            $shadows = 'uk-box-shadow-medium';
        } else if ( $shadows == 'large' ) {
            $shadows = 'uk-box-shadow-large';
        }
    
        // Hover effects
        $hover = 'uk-card-hover';

        if (!empty($footer)) {
             $footer = sprintf('<div class="uk-card-footer">%s</div>', $footer);
        }

        if( !empty($image) ){
            $image = wp_get_attachment_image_src($image, 'large');
            $image = "<img class='' src='".$image[0]."' alt='$title'>";
        }

        $icon = isset($atts["icon_$icon_type"]) ? $atts["icon_$icon_type"] : $icon;
        if (!empty($icon)) {
            wp_enqueue_style("vc_$icon_type");
        }


        $urlpre = $urlaft = "";
        if($url != '') {
            $urlpre = "<a href='$url'>";
            $urlaft = "</a>";
        }

        $result = "<div class='con-element icon-box uk-card $shadows $hover $class uk-text-center'>
                 $urlpre
                     <div class='uk-card-body'>
                        
                        <div><i class='$icon' style='font-size: $size;'></i></div>
                        <h3>$title</h3>
                    
                    </div>
                $urlaft
            </div>";

        // return result
        return $result;
    }

}
}
vc_map( array(
    "name" => esc_html__('Icon box', 'consultaid'),
    "description" => esc_html__("Piece of information", 'consultaid'),
    "base" => 'info_box',
    "content_element" => true,
    "category" => 'Consult aid',
    "icon" => "icon-wpb-quickload",
    'params' => array(
        array(
            "type" => 'textfield',
            "param_name" => "title",
            "heading" => esc_html__("Title", 'consultaid'),
            "holder" => 'div'
        ),
        array(
            'type' => 'dropdown',
            "param_name" => "icon_types",
            "heading" => esc_html__("Icon Type", 'consultaid'),
            "value" => array(
                "Icon font" => "icon_font",
                "Icon image" => "icon_image"
            ),
            "std" => "icon_font",
        ),
        array(
            'type' => 'attach_image',
            "param_name" => "image",
            "heading" => esc_html__("Attach Image", 'consultaid'),
            "dependency" => Array("element" => "icon_types", "value" => array("icon_image"))
        ),

        array(
            "type" => 'textfield',
            "param_name" => "size",
            'description' => esc_html__( 'Icon size.', 'consultaid' ),
            'std' => '14px',
            "heading" => esc_html__("Icon size", 'consultaid'),
            "dependency" => Array("element" => "icon_types", "value" => array("icon_font"))
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
            "dependency" => Array("element" => "icon_types", "value" => array("icon_font"))
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
            "type" => "dropdown",
            "param_name" => "shadows",
            "heading" => esc_html__("Shadow of the card", 'consultaid'),
            "value" => array(
                "Small" => "small",
                "Medium" => "medium",
                "Large" => "large"
            ),
            "std" => "default",
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