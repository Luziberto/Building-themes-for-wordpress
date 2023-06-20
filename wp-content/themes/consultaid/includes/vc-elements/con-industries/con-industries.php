<?php
if (!class_exists('WPBakeryShortCode_con_industries')) {
class WPBakeryShortCode_con_industries extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'title' => '',
            'back' => '',
            'icon' => 'fa fa-forumbee',
            'icon_type' => 'fontawesome',
            'blockques' => '',
            'extra_class' => ''

        ), $atts));
        $b_url = '';
        $extra_class = esc_attr($extra_class);
        $blockques = vc_param_group_parse_atts($blockques);
        $result = '<div class="uk-container"><div class="uk-grid '.$extra_class.' con-industries uk-grid-match uk-grid-collapse"><div class="uk-width-1-1@m"><h1>'.$title.'</h1></div>';
        foreach ((array)$blockques as $value) {
            $icon_type = array_key_exists('icon_type', $value) ? $value['icon_type'] : '';
            $icon = isset($value["icon_$icon_type"]) ? $value["icon_$icon_type"] : $icon;
            $icon = !empty($icon) ? "$icon" : "";
            if (!empty($icon)) {
                wp_enqueue_style("vc_$icon_type");
            }
            if (isset($value['blockque_url'])) $b_url = vc_build_link($value['blockque_url']);
            $titletext = $value["blockque_title"];
            if(isset($b_url["url"]) && $b_url["url"] != '') {
                $titletext = '<a rel="'.$b_url["rel"].'" target="'.$b_url["target"].'" href="'.$b_url["url"].'">'.$value["blockque_title"].'</a>';
            }
            $blockque = '<div class="con-element blockque uk-width-1-2@s uk-width-1-2@m"><div class="uk-grid"><div class="uk-width-1-6@m"><span class="con_industries_icon '.$icon.'"></span></div><div class="uk-width-5-6@m"><h4>'.$titletext.'</h4><p>'.esc_html__($value["blockque_text"]).'</p></div></div></div>';
            $result .=$blockque;
        }
        $result .= '</div></div>';
        return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__('Consult Industries', 'consultaid'),
    "description" => esc_html__("Consult industries", 'consultaid'),
    "base" => 'con_industries',
    "icon" => "icon-wpb-quickload",
    "category" => esc_html__('Consult aid', 'consultaid'),
    'params' => array(
        array(
            'type' => 'textfield',
            'heading' => esc_html__('Title', 'consultaid'),
            "holder"  =>  "div",
            'param_name' => 'title',
        ),
        array(
            'type' => 'param_group',
            'heading' => esc_html__('Blockque', 'consultaid'),
            'param_name' => 'blockques',
            'params' => array(
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
                        "dependency" => Array("element" => "style", "value" => array("icon"))
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
                        'type' => 'textfield',
                        'heading' => esc_html__('Title', 'consultaid'),
                        'param_name' => 'blockque_title',
                        'admin_label' => true,
                        'holder' => 'div',
                    ),
                    array(
                        'type' => 'vc_link',
                        'heading' => esc_html__('URL', 'consultaid'),
                        'param_name' => 'blockque_url',
                    ),
                    array(
                        'type' => 'textarea',
                        'heading' => esc_html__('Text', 'consultaid'),
                        'param_name' => 'blockque_text',
                    ),
                ),
        ),
        array(
            "type" => "textfield",
            "param_name" => "extra_class",
            "heading" => esc_html__("Extra Class", 'consultaid'),
            "value" => "",
            "description" => esc_html__("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file. Please look at helper classes in the documentation.", 'consultaid'),
        )
    )
));