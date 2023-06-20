<?php
if (!class_exists('WPBakeryShortCode_icon_list')) {
class WPBakeryShortCode_icon_list extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'list' => '',
            'ol' => 'no',
            'start' => '1',
            'icon' => 'fa fa-smile',
            'icon_type' => 'fontawesome',
            'color' => '#3db8db',
            'extra_class' => 'm0'
        ), $atts));

        $class = esc_attr($extra_class);
        $list = vc_param_group_parse_atts($list);
        $result = "<ul class='con-element icon-list-element $class'>";
        $resultend = '</ul><!-- end .icon-list-element -->';

        if (isset($ol) && $ol == 'yes') {
            $result = "<ol class='icon-list-element $class' data-color='$color'>"; 
            $resultend = '</ol><!-- end .icon-list-element -->'; 
        }
        $icon = isset($atts["icon_$icon_type"]) ? $atts["icon_$icon_type"] : $icon;
        if (!empty($icon)) {
            wp_enqueue_style("vc_$icon_type");
        }

        if (isset($list)) {
            $i = abs($start);
            foreach ($list as $value) {
                if (isset($value['item'])) {

                    $val = $value['item'];
                    $val = (isset($value['link']) && $value['link'] !== '') ? "<a class='uk-button-text' href='".$value['link']."'>$val</a>" : $val;

                    if (isset($ol) && $ol == 'yes') {
                        $result .= "<li data-number='".sprintf("%02d", $i)."'>$val</li>";
                    } else {
                        $result .= "<li><i class='$icon' style='color: $color;'></i> $val</li>";
                    }
                    $i++;
                }
            }
        }
        
    return $result.$resultend;
    }
}
}

vc_map( array(
    "name" => esc_html__('Icon list', 'consultaid'),
    "description" => esc_html__("Styled OL / UL list", 'consultaid'),
    "base" => 'icon_list',
    "icon" => "icon-wpb-quickload",
    "category" => esc_html__('Consult aid', 'consultaid'),
    'params' => array(
        array(
            "type" => "dropdown",
            "param_name" => "ol",
            "heading" => esc_html__("Ordered list? (Numbered)", 'consultaid'),
            "value" => array('Yes' => 'yes'),
            'value' => array(
                'Yes' => 'yes',
                'No' => 'no',
            ),
            "std"   => "no",
            "description" => esc_html__("Numbered list and won't show your selected icon.", 'consultaid')
        ),
        array(
            "type" => "textfield",
            "param_name" => "start",
            "value" => '1',
            "heading" => esc_html__("Start number", 'consultaid'),
            "dependency" => Array("element" => "ol", "value" => array("yes"))
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
            "dependency" => Array("element" => "ol", "value" => array("no"))
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
            'type' => 'colorpicker',
            'heading' => esc_html__( 'Icon color (font icon only)', 'consultaid' ),
            'param_name' => 'color',
            'value' => '#3db8db', // default value to backend editor admin_label
        ),
        array(
            "type" => "param_group",
            "param_name" => "list",
            "heading" => esc_html__("List items", 'consultaid'),
            "params" => array(
                array(
                    "type" => "textfield",
                    "param_name" => "item",
                    "value" => esc_html__('List item details', 'consultaid'),
                    "admin_label" => true,
                    'holder' => 'div',
                    "heading" => esc_html__("Title", 'consultaid'),
                ),
                array(
                    "type" => "textfield",
                    "param_name" => "link",
                    "value" => '',
                        "heading" => esc_html__("Link (optional)", 'consultaid'),
                ),
            ),
        ),
        array(
            "type" => "textfield",
            "param_name" => "extra_class",
            "heading" => esc_html__("Extra Class", 'consultaid'),
            "value" => "m0",
            "description" => esc_html__("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file. Please look at helper classes in the documentation.", 'consultaid'),
        )
    )
));