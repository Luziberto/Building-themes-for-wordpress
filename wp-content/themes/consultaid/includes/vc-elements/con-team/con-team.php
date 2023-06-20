<?php
if (!class_exists('WPBakeryShortCode_con_team')) {
class WPBakeryShortCode_con_team extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'member' => '',
            'carousel' => 'yes',
            'extra_class' => '',
        ), $atts));

        $extra_class = esc_attr($extra_class);

        $member = vc_param_group_parse_atts($member);
        $result = '<div class="uk-grid '.$extra_class.'"><div class="uk-width-1-1@m uk-text-center"></div>'; 
        $cls = '';

        if (isset($member)) {

            if (isset($carousel) && $carousel == 'yes') { 
                $result .= '<div class="con-team-container"><div class="swiper-wrapper">';
                $class='swiper-slide';
            } 
            else {
                $result .= '<div class="uk-grid">';
                $class='team-response uk-width-1-3@s uk-width-1-4@m uk-width-1-4@l';
            }
            
            foreach ((array)$member as  $value) {

            if (isset($value['firstname'])) $firstname = $value['firstname'];
            else $firstname = '';

            if (isset($value['lastname'])) $lastname = $value['lastname'];
            else $lastname = '';

            if (isset($value['position'])) $position = $value['position'];
            else $position = '';

            $image = $value['image'];

            $img_url = wp_get_attachment_image_src($image,"consultaid-vc-team")[0];

            $shadow = 'team-shadow';

            if ($firstname == '' && $lastname == '' && $position == '') { $shadow = ''; $cls="clear-top"; }

            $result .= '
            <div class="con-element '.$class.'">
                <div class="uk-flex uk-flex-center con-team">
                <div class="uk-inline">
                <img src="'.$img_url.'" alt="'.$firstname.' '.$lastname.'" class="con-team-img">
                <div class="uk-position-cover uk-overlay '.$shadow.'"></div>
                <div class="con-seo-message '.$cls.'">
                <h4>'.$firstname.' '.$lastname.'</h4>
                <span>'.$position.'</span>
                </div></div></div>
            </div>';
            }
            if (isset($carousel) && $carousel == 'yes') $result .= '</div></div>';
                                                   else $result .= '</div>';
            $result .= '<div class="swiper-pagination1"></div>';
            $result .= '</div>';
        }
    return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__('Consult Team', 'consultaid'),
    "description" => esc_html__("Consult team box", 'consultaid'),
    "base" => 'con_team',
    "icon" => "icon-wpb-quickload",
    "category" => esc_html__('Consult aid', 'consultaid'),
    'params' => array(
        array(
            "type" => "checkbox",
            "param_name" => "carousel",
            "heading" => esc_html__("Carousel?", 'consultaid'),
            "value" => array('Yes' => 'yes' ),
            "std"   => "yes",
        ),
        array(
            "type" => "param_group",
            "param_name" => "member",
            "heading" => esc_html__("Our team members", 'consultaid'),
            "params" => array(
                array(
                    "type" => "textfield",
                    "param_name" => "firstname",
                    'admin_label' => true,
                    "heading" => esc_html__("Firstname", 'consultaid'),
                    'holder' => 'div',
                ),
                array(
                    "type" => "textfield",
                    "param_name" => "lastname",
                    'admin_label' => true,
                    "heading" => esc_html__("Lastname", 'consultaid'),
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