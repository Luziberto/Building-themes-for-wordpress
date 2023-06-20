<?php
if (!class_exists('WPBakeryShortCode_service_box')) {
class WPBakeryShortCode_service_box extends WPBakeryShortCode {
    protected function content( $atts, $content = null){

        extract( shortcode_atts( array(
            "style" => "left",
            "bgcolor" => "#1abc9c",
            "textcolor" => "",
            "image" => "",
            "imagesize" => "80x80",
            "icon" => "fa fa-question-circle-o",
            "size" => "medium",
            "link" => "",
            "linktext" => "",
            "options" => "default",
            "title" => "Service title",
            "desc" => "Seamlessly provide access to distinctive vortals rather than multidisciplinary quality vectors.",
            "css_animation" => "",
            'icon' => 'fa fa-forumbee',
            'icon_type' => 'fontawesome',
            "extra_class" => ""
        ), $atts ) );


        $icon = isset($atts["icon_$icon_type"]) ? $atts["icon_$icon_type"] : $icon;
        if (!empty($icon)) {
                    wp_enqueue_style("vc_$icon_type");
                }


        if($icon_type == 'icon_image') {
            $imgsize = explode('x', $imagesize);
            $imgsize = is_array($imgsize) ? $imgsize : array(64, 64);
            $icon = wp_get_attachment_image_src($image, $imgsize);
            $icon = "<img src='".$icon[0]."' width='".$imgsize[0]."' height='".$imgsize[1]."' alt='$title'/>";

        } else {
            $icon = $icon != '' ? $icon : "fa fa-question-circle-o";
            $icon = "<span class='$icon'></span>";
        }
        $icon = $link != '' ? "<a href='$link'>$icon</a>" : $icon;
        $icon = "<div class='service-icon'>$icon</div>";

        $title = "<h3>$title</h3>";
        $desc = "<p>$desc</p>";
        
        $classes = $style;
        $classes .= ' '. $size;
        if($style != 'style-bordered' && $style != 'style-boxed') {
            $classes .= ' '. str_replace(',', ' ', $options);
        }
        $classes .= " $textcolor";
        $classes .= $this->getCSSAnimation( $css_animation );
        $classes .= $this->getExtraClass($extra_class);

        $inline_style = '';
        if($style == "style-boxed" && $bgcolor != '') {
            $inline_style = " style='background-color:$bgcolor;'";
        }
        $desc = $linktext != '' ? $desc ."<a href='$link' class='more-link'>$linktext</a>" : $desc;

        $result =   "<div class='con-element service-box $classes'$inline_style>
                        $icon
                        $title
                        $desc
                    </div>";
        
        return $result;
    }
}
}
vc_map( array(
    "name" => esc_html__("Service Icon", 'consultaid'),
    "description" => esc_html__("Icon Text and Description combination", 'consultaid'),
    "base" => "service_box",
    "content_element" => true,
    "category" => 'Consult aid',
    "icon" => "icon-wpb-quickload",
    "params" => array(
        array(
            'type' => 'dropdown',
            "param_name" => "style",
            "heading" => esc_html__("Service Layout", 'consultaid'),
            "value" => array(
                "Default (left side)" => "default",
                "Center" => "style-center",
                "Right side" => "style-right",
                "Icon above" => "style-center style-above",
                "Inline" => "style-inline",
                "Inline Right" => "style-inline style-right",
                "Bordered" => "style-bordered",
                "Boxed" => "style-boxed",
            ),
            "std" => "left",
        ),
        array(
            'type' => 'colorpicker',
            "param_name" => "bgcolor",
            "heading" => esc_html__("Background color", 'consultaid'),
            "value" => '#1abc9c',
            "dependency" => Array("element" => "style", "value" => array("style-boxed"))
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "textcolor",
            "heading" => esc_html__("Text color", 'consultaid'),
            "value" => array(
                "Text color white?" => "text-light"
            ),
            "dependency" => Array("element" => "style", "value" => array("style-boxed")),
        ),
         array(
            'type' => 'dropdown',
            'heading' => esc_html__('Icon library', 'consultaid'),
            'value' => array(
                esc_html__('Font Awesome', 'consultaid') => 'fontawesome',
                esc_html__('Open Iconic', 'consultaid') => 'openiconic',
                esc_html__('Typicons', 'consultaid') => 'typicons',
                esc_html__('Entypo', 'consultaid') => 'entypo',
                esc_html__('Linecons', 'consultaid') => 'linecons',
                esc_html__('Custom Image', 'consultaid') => 'icon_image'
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
            'type' => 'attach_image',
            "param_name" => "image",
            "heading" => esc_html__("Image Image", 'consultaid'),
            "value" => '',
            "dependency" => Array("element" => "icon_type", "value" => array("icon_image"))
        ),
        array(
            'type' => 'textfield',
            "param_name" => "imagesize",
            "heading" => esc_html__("Image Size", 'consultaid'),
            "value" => '80x80',
            "description"  => 'Ex: 64x64 ( Width x Height, in pixels )',
            "dependency" => Array("element" => "icon_type", "value" => array("icon_image"))
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon',
            'value' => 'fa fa-question-circle-o', // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true,
                // default true, display an "EMPTY" icon?
                'iconsPerPage' => 100,
                // default 100, how many icons per/page to display, we use (big number) to display all icons in single page

            ),
            "dependency" => Array("element" => "icon_type", "value" => array("icon_font"))
        ),
        array(
            'type' => 'dropdown',
            "param_name" => "size",
            "heading" => esc_html__("Icon Size", 'consultaid'),
            "value" => array(
                "Extra Small" => "extra-small",
                "Small" => "small",
                "Medium (default)" => "medium",
                "Large" => "large",
            ),
            "std" => "medium"
        ),
        array(
            'type' => 'textfield',
            "param_name" => "title",
            "heading" => esc_html__("Service Title", 'consultaid'),
            "value" => 'Service Title',
            "holder" => 'div'
        ),
        array(
            'type' => 'textarea',
            "param_name" => "desc",
            "heading" => esc_html__("Short Description", 'consultaid'),
            "value" => 'Seamlessly provide access to distinctive vortals rather than multidisciplinary quality vectors.'
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "options",
            "heading" => esc_html__("Options", 'consultaid'),
            "value" => array(
                "Filled" => "filled",
                "Transparent" => "transparent",
            ),
            "dependency" => Array("element" => "style", "value" => array("default", "style-center", "style-right"))
        ),
        array(
            'type' => 'textfield',
            "param_name" => "link",
            "heading" => esc_html__("Icon link (optional)", 'consultaid'),
            "value" => ''
        ),
        array(
            'type' => 'textfield',
            "param_name" => "linktext",
            "heading" => esc_html__("Link text (optional)", 'consultaid'),
            "value" => ''
        ),
        array(
            "type" => "textfield",
            "param_name" => "extra_class",
            "heading" => esc_html__("Extra Class", 'consultaid'),
            "value" => "",
            "description" => esc_html__("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", 'consultaid'),
        )
    )
)
);