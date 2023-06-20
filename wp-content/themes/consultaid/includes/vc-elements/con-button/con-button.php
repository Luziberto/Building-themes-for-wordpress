<?php
if (!class_exists('WPBakeryShortCode_con_button')) {
class WPBakeryShortCode_con_button extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'conbutton' => '',
            'alignment' => 'left',
            'color' => '',
            'extra_class' => ''
        ), $atts));

        $result = '';
        $conbutton = vc_build_link ($conbutton);
        $color = $color == '' ? '' : " style='background-color: $color'";

        if ($conbutton["title"]!="") {
            $conbutton["target"] = array_key_exists('target', $conbutton) && !empty($conbutton["target"]) ? $conbutton["target"] : '_self';
            $result .= '<div class="con-element consultaid-button uk-flex uk-flex-'.$alignment.'">
            <a class="uk-button uk-button-default '.$extra_class.'" rel="'.$conbutton["rel"].'" target="'.$conbutton["target"].'" href="'.$conbutton["url"].'"'.$color.'>'.esc_html($conbutton["title"]).'</a>
            </div>'; 
        }

        return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__('Consult Aid Button', 'consultaid'),
    "description" => esc_html__("Consult Aid Button", 'consultaid'),
    "base" => 'con_button',
    "icon" => "icon-wpb-quickload",
    "category" => esc_html__('Consult aid', 'consultaid'),
    'params' => array(
        array(
            "type" => "vc_link",
            "param_name" => "conbutton",
            "heading" => esc_html__("URL", 'consultaid'),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "alignment",
            "heading" => esc_html__("Alignment", 'consultaid'),
            "holder"  =>  "div",
            "value" => array(
                'Left' => 'left',
                'Right' => 'right',
                'Center' => 'center',
                'Block width' => 'block',
            ),
            "description" => esc_html__("Select button alignment.", "consultaid"),
        ),
        array(
            'type' => 'colorpicker',
            'heading' => esc_html__( 'Background color (optional)', 'consultaid' ),
            'param_name' => 'color',
            'description' => esc_html__('Default color is your brand color but you can change it.', 'consultaid'),
            'value' => '', // default value to backend editor admin_label
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