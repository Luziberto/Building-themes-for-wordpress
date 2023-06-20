<?php
if (!class_exists('WPBakeryShortCode_con_ceo_team')) {
class WPBakeryShortCode_con_ceo_team extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'member' => '',
            'extra_class' => ''
        ), $atts));

        $extra_class = esc_attr($extra_class);

        $member = vc_param_group_parse_atts($member); 

        $result = '';

        $result .= '<div class="uk-grid '.$extra_class.' uk-grid-collapse">';

        $shadow = 'team-shadow';
            
        foreach ((array)$member as $value) {

            $firstname = $value['firstname'];

            $lastname = $value['lastname'];

            $position = $value['position'];

            $image = $value['image'];

            $thumbnail = wp_get_attachment_image($image,'consultaid-vc-ceo-team');

            $result .= '
                <div class="con-element uk-flex uk-flex-center uk-width-1-2@s uk-width-1-2@m uk-width-1-2@l ceo-team">
                <div class="uk-inline">
                    '.$thumbnail.'<div class="uk-position-cover uk-overlay '.$shadow.'"></div>
                    <div class="con-ceo-message">
                    <h4>'.$firstname.' '.$lastname.'</h4>
                    <span>'.$position.'</span>
                    </div>
                </div></div>';
            }

            $result .= '</div>';

        return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__('CEO Team', 'consultaid'),
    "description" => esc_html__("Consult CEO team", 'consultaid'),
    "base" => 'con_ceo_team',
    "icon" => "icon-wpb-quickload",
    "category" => esc_html__('Consult aid', 'consultaid'),
    'params' => array(
        array(
            "type" => "param_group",
            "param_name" => "member",
            "heading" => esc_html__("Our team members", 'consultaid'),
            "params" => array(
                array(
                    "type" => "textfield",
                    "param_name" => "firstname",
                    "heading" => esc_html__("Firstname", 'consultaid'),
                    'admin_label' => true,
                    'holder' => 'div',
                ),
                array(
                    "type" => "textfield",
                    "param_name" => "lastname",
                    "heading" => esc_html__("Lastname", 'consultaid'),
                    'admin_label' => true,
                    'holder' => 'div',
                ),
                array(
                    "type" => "textfield",
                    "param_name" => "position",
                    "heading" => esc_html__("Position", 'consultaid'),
                    'description' => esc_html__('Example: Designer, Art Director, Developer ... etc', 'consultaid'),
                ),
                array(
                    "type" => "attach_image",
                    "param_name" => "image",
                    "heading" => esc_html__("Attachment image", 'consultaid'),
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