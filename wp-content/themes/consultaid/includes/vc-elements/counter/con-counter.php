<?php

if (!class_exists('WPBakeryShortCode_con_counter')) {
class WPBakeryShortCode_con_counter extends WPBakeryShortCode {
    protected function content( $atts, $content = null){

        extract(shortcode_atts(array(
            'list' => '',
            'layout' => 'with-image',
            'size' => '',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);

        $list = vc_param_group_parse_atts($list);
        $lists = '';
        $iconsize = '';
        $atach_src = '';
        $image = '';
        $icon_type = '';
        $number = '';
        $counter = '';
        $letter = 'letter';
        $iconsize = 'icon';
        if ($size == '1') {
            $counter = 'countersmall';
            $letter = 'lettersmall';
            $iconsize = 'iconsmall';
        }
        elseif ($size == '3') {
            $counter = 'counterlarge';
            $letter = 'letterlarge';
            $iconsize = 'iconlarge';
        }
        if( is_array($list) ){
            foreach ($list as $item) {

                $image = isset($item['image']) ? $item['image'] : "";
                $atach_src = wp_get_attachment_image_src($image, 'full');
                $image = is_array($atach_src) ? $atach_src[0] : "";
                $icon_type = array_key_exists('icon_type', $item) ? $item['icon_type'] : '';
                $icon = isset($item["icon_$icon_type"]) ? $item["icon_$icon_type"] : '';
                $icon = !empty($icon) ? "$icon" : "";

                if (!empty($icon)) {
                    wp_enqueue_style("vc_$icon_type");
                }

                $number = isset($item['number']) ? $item['number'] : "";
                preg_match("/(\d+)(.*)/", $number, $matches);
                $number = !empty($number) ? "<span class='counter $counter'>$matches[1]</span><span class='$letter'>$matches[2]</span>" : "";

                $body = isset($item['body']) ? $item['body'] : "";
                $body = !empty($body) ? "$body" : "";

                $icon_types = '';

                $layout = isset($item['layout'])? $item['layout'] : 'with-image';

                if ($layout == 'with-image') {
                    $icon_types .= "<img src='".$image."' alt='".$body."'>";
                }elseif($layout =='icon'){
                    $icon_types .="<i class='" . $iconsize . ' ' . $icon."'></i>";
                }

                $lists.="
                <div class='con-counter-item uk-grid uk-width-1-1@s uk-width-expand@m uk-grid-medium uk-flex uk-lfex-center'>
                    <div class='uk-width-1-2 uk-text-right'>
                        $icon_types                     
                    </div>
                    <div class='uk-width-1-2 uk-text-left'>
                        $number
                        <div class='cntrdcs'><span class='counterdecs'>$body</span></div>
                    </div>
                </div>
                ";
            }
        }
        $output = "
        <div class='con-element con-element-counter uk-section $class'>
            <div class='uk-grid uk-grid-small uk-child-width-expand uk-text-center'>
            " . $lists . "
            </div>
        </div>
        ";
        // return result
        return $output;
    }

}
}
vc_map( array(
    "name" => esc_html__('Counter', 'consultaid'),
    "description" => esc_html__("Counter", 'consultaid'),
    "base" => 'con_counter',
    "content_element" => true,
    "icon" => "icon-wpb-quickload",
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => "dropdown",
            "param_name" => "size",
            "heading" => esc_html__("Logo icon type", 'consultaid'),
            "value" => array(
                esc_html__( 'Medium (default)', 'consultaid' ) => '2',
                esc_html__( 'Small', 'consultaid' ) => '1',
                esc_html__( 'Large', 'consultaid' ) => '3',
            ),
            "std" => "2"
        ),
        array(
            'type' => 'param_group',
            'heading' => esc_html__('Values', 'consultaid'),
            'param_name' => 'list',
            'value' => '',
            'params' => array(
                array(
                        "type" => "dropdown",
                        "param_name" => "layout",
                        "heading" => esc_html__("Logo icon type", 'consultaid'),
                        "value" => array(
                            "With icon" => "icon",
                            "With image" => "with-image"
                        ),
                        "std" => "with-image"
                ),
                array(
                        "type" => 'textfield',
                        "param_name" => "number",
                        'admin_label' => true,
                        'value' => '128',
                        "heading" => esc_html__("Number", 'consultaid'),
                        
                    ),
                array(
                    "type" => 'textfield',
                    "param_name" => "body",
                    'admin_label' => true,
                    'holder' => 'div',
                    'value' => 'happy',
                    "heading" => esc_html__("Description text", 'consultaid'),
                ),
                array(
                    'type' => 'attach_image',
                    "param_name" => "image",
                    "heading" => esc_html__("Image", 'consultaid'),
                    "value" => '',
                     "std" => "show",
                    "dependency" => Array("element" => "layout", "value" => array("with-image"))
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
                    "dependency" => Array("element" => "layout", "value" => array("icon"))
                ),
                array(
                    'type' => 'iconpicker',
                    'heading' => esc_html__('Icon', 'consultaid'),
                    'param_name' => 'icon_fontawesome',
                    'value' => 'fa fa-smile',
                    'settings' => array(
                        'emptyIcon' => true,
                        'iconsPerPage' => 4000,
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
                        'emptyIcon' => true,
                        'type' => 'openiconic',
                        'iconsPerPage' => 4000,
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
                        'emptyIcon' => true,
                        'type' => 'typicons',
                        'iconsPerPage' => 4000,
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
                        'emptyIcon' => true,
                        'type' => 'entypo',
                        'iconsPerPage' => 4000,
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
                        'emptyIcon' => true,
                        'type' => 'linecons',
                        'iconsPerPage' => 4000,
                    ),
                    'dependency' => array(
                        'element' => 'icon_type',
                        'value' => 'linecons',
                    ),
                    'description' => esc_html__('Select icon from library.', 'consultaid'),
                ),
                array(
                    'type' => 'textfield',
                    'heading' => esc_html__('Link url (optional)', 'consultaid'),
                    'param_name' => 'link',
                    'value' => '',
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