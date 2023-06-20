<?php
if (!class_exists('WPBakeryShortCode_con_text_clip')) {
class WPBakeryShortCode_con_text_clip extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'con_clip_text' => '',
            'inner_bg' => '',
            'bg' => '',
            'bg_color' => '',
            'background_repeat' => 'no-repeat',
            'background_size' => 'cover',
            'background_attachment' => 'inherit',
            'background_position' => 'left top',
            'inner_bg' => '',
            'inner_bg_color' => '',
            'inner_background_repeat' => 'no-repeat',
            'inner_background_size' => 'cover',
            'inner_background_attachment' => 'inherit',
            'inner_background_position' => 'left top',
            'text_position' => 'left',
            'text_font_size' => '30px',
            'text_font' => '',
            'extra_class' => '',

        ), $atts));

        $css = '';

        $extra_class = esc_attr($extra_class);

        $url = wp_get_attachment_image_src($bg,'full')[0];

        $array = explode('|', $text_font);

        $font_family = '';

        $array[0] = str_replace("font_family:", "", $array[0]);
        $array[1] = str_replace("font_style:", "", $array[1]);
        $array[0] = str_replace("%20", " ", $array[0]);

        for ($i = 0; $i < strlen($array[0]); $i++)
            if ($array[0][$i] == '%') {
                for ($j = $i; $j < strlen($array[0]); $j++)
                $array[0][$j] = '-';
            $font_family = str_replace("-", "", $array[0]);
            break;
            }

        for ($i = 1; $i < strlen($array[1]); $i++)
            if ($array[1][$i] == '%') {
                for ($j = $i; $j < strlen($array[1]); $j++)
                $array[1][$j] = '-';
            $font_style = str_replace("-", "", $array[1]);
            break;
            }

        $css .= sprintf('.con-clip-text {
            text-align:%s;
            font-family:%s;
            font-weight:%s;
            font-size:%s;
        }',isset($text_position) ? $text_position : "",
        isset($font_family) ? $font_family : "",
        isset($font_style) ? $font_style : "",
        $text_font_size
        );


        $css .= sprintf('.con-clip-text--cover {
            background-color: %s;
            background-image : url(%s);
            background-repeat: %s;
            -webkit-background-size: %s;
            background-size: %s;
            background-position: %s;
            background-attachment %s;
        }',
        isset($bg_color) ? $bg_color : "",
        isset($url) ? $url : "",
        isset($background_repeat) ? $background_repeat : "",
        isset($background_size) ? $background_size : "",
        isset($background_size) ? $background_size : "",
        isset($background_position) ? $background_position : "",
        isset($background_attachment) ? $background_attachment : ""
        );

        $css .= sprintf('.con-clip-text:after {
            background-color: %s;
            background-image : url(%s);
            background-repeat: %s;
            -webkit-background-size: %s;
            background-size: %s;
            background-position: %s;
            background-attachment %s;
        }',
        isset($inner_bg_color) ? $inner_bg_color : "",
        isset(wp_get_attachment_image_src($inner_bg,'full')[0]) ? wp_get_attachment_image_src($inner_bg,'full')[0] : "",
        isset($inner_background_repeat) ? $inner_background_repeat : "no-repeat",
        isset($inner_background_size) ? $inner_background_size : "",
        isset($inner_background_size) ? $inner_background_size : "",
        isset($inner_background_position) ? $inner_background_position : "",
        isset($inner_background_attachment) ? $inner_background_attachment : ""
        );

        $result = '<style>'.$css.'</style><div class="con-element '.$extra_class.' clip-back"><div class="con-clip-text con-clip-text--cover"><div class="clip_text_br">'.$con_clip_text.'</div></div></div>';

        return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__('Consult Aid Text Clip', 'consultaid'),
    "description" => esc_html__("Consult Aid Text Clip", 'consultaid'),
    "base" => 'con_text_clip',
    "icon" => "icon-wpb-quickload",
    "category" => esc_html__('Consult aid', 'consultaid'),
    'params' => array(
        array(
            "type" => "textarea",
            "param_name" => "con_clip_text",
            "holder"  =>  "div",
            "heading" => esc_html__("Title", 'consultaid')
        ),
        array(
            "type" => "dropdown",
            "param_name" => "text_position",
            "heading" => esc_html__("Text Position", 'consultaid'),
            "value" => array(
                'Left' => 'left',
                'Right' => 'right', 
                'Center' => 'center', 
            ),
        ),
        array(
            'type' => 'textfield',
            'param_name' => 'text_font_size',
            "heading" => esc_html__("Text Font Size", 'consultaid'),
            "value" => "30px",
        ), 
        array(
            'type' => 'google_fonts',
            'param_name' => 'text_font',
            'settings' => array(
                'fields' => array(
                    'font_family_description' => esc_html__( 'Select Font Family.', 'consultaid' ),
                    'font_style_description' => esc_html__( 'Select Font Style.', 'consultaid' ),
                ),
            ),
        ), 
        array(
            "type" => "attach_image",
            "param_name" => "bg",
            "heading" => esc_html__("Background image", 'consultaid'),
            'group' => esc_html__( 'Background Option', 'consultaid' ),
        ),
        array(
            "type" => "colorpicker",
            "param_name" => "bg_color",
            "heading" => esc_html__("Background Color", 'consultaid'),
            'group' => esc_html__( 'Background Option', 'consultaid' ),
            "value" => "#ffffff",
        ),
        array(
            "type" => "dropdown",
            "param_name" => "background_repeat",
            "heading" => esc_html__("Background Repeat", 'consultaid'),
            'group' => esc_html__( 'Background Option', 'consultaid' ),
            "value" => array(
                'No Repeat' => 'no-repeat',
                'Repeat All' => 'repeat', 
                'Repeat Horizontally' => 'repeat-x', 
                'Repeat Vertically' => 'repeat-y', 
                'Inherit' => 'inherit', 
            ),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "background_size",
            "heading" => esc_html__("Background Size", 'consultaid'),
            'group' => esc_html__( 'Background Option', 'consultaid' ),
            "value" => array(
                'Cover' => 'cover', 
                'Inherit' => 'inherit',
                'Contain' => 'contain', 
            ),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "background_attachment",
            "heading" => esc_html__("Background Attachment", 'consultaid'),
            'group' => esc_html__( 'Background Option', 'consultaid' ),
            "value" => array(
                'Inherit' => 'inherit',
                'Fixed' => 'fixed', 
                'Scroll' => 'scroll', 
            ),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "background_position",
            "heading" => esc_html__("Background Position", 'consultaid'),
            'group' => esc_html__( 'Background Option', 'consultaid' ),
            "value" => array(
                'Left Top' => 'left top',
                'Left Center' => 'left center', 
                'Left Bottom' => 'left bottom', 
                'Center Top' => 'center top',
                'Center Center' => 'center center', 
                'Center Bottom' => 'center bottom', 
                'Right Top' => 'right top',
                'Right Center' => 'right center', 
                'Right Bottom' => 'right bottom', 
            ),
        ),

        array(
            "type" => "attach_image",
            "param_name" => "inner_bg",
            "heading" => esc_html__("Inner Background image", 'consultaid'),
            'group' => esc_html__( 'Inner Background Option', 'consultaid' ),
        ),
        array(
            "type" => "colorpicker",
            "param_name" => "inner_bg_color",
            "heading" => esc_html__("Inner Background Color", 'consultaid'),
            "value" => "#ffffff",
            'group' => esc_html__( 'Inner Background Option', 'consultaid' ),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "inner_background_repeat",
            "heading" => esc_html__("Inner Background Repeat", 'consultaid'),
            "value" => array(
                'No Repeat' => 'no-repeat',
                'Repeat All' => 'repeat', 
                'Repeat Horizontally' => 'repeat-x', 
                'Repeat Vertically' => 'repeat-y', 
                'Inherit' => 'inherit', 
            ),
            'group' => esc_html__( 'Inner Background Option', 'consultaid' ),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "inner_background_size",
            "heading" => esc_html__("Inner Background Size", 'consultaid'),
            "value" => array(
                'Cover' => 'cover',
                'Inherit' => 'inherit',
                'Contain' => 'contain', 
            ),
            'group' => esc_html__( 'Inner Background Option', 'consultaid' ),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "inner_background_attachment",
            "heading" => esc_html__("Inner Background Attachment", 'consultaid'),
            "value" => array(
                'Inherit' => 'inherit',
                'Fixed' => 'fixed', 
                'Scroll' => 'scroll', 
            ),
            'group' => esc_html__( 'Inner Background Option', 'consultaid' ),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "inner_background_position",
            "heading" => esc_html__("Inner Background Position", 'consultaid'),
            "value" => array(
                'Left Top' => 'left top',
                'Left Center' => 'left center', 
                'Left Bottom' => 'left bottom', 
                'Center Top' => 'center top',
                'Center Center' => 'center center', 
                'Center Bottom' => 'center bottom', 
                'Right Top' => 'right top',
                'Right Center' => 'right center', 
                'Right Bottom' => 'right bottom', 
            ),
            'group' => esc_html__( 'Inner Background Option', 'consultaid' ),
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

