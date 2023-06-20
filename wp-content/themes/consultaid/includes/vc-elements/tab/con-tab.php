<?php

if (!class_exists('WPBakeryShortCode_tab')) {
class WPBakeryShortCode_tab extends WPBakeryShortCode {
    protected function content( $atts, $content = null){

        extract(shortcode_atts(array(
            'title' => '',
            'shadows' => "uk-box-shadow-small",
            'image' => '',
            'icons' => '',
            'size' => '',
            "href" => '',
            'icon_type' => '',
            'extra_class' => ''
        ), $atts));

        $class = esc_attr($extra_class);
        $switcher = '';
        $result = '';
        $tabid = 0;
        $group = vc_param_group_parse_atts( $atts['group']);
        foreach ((array)$group as $val) { 
            (isset($val['title'])) ? $title = ($val['title']) : '';
            (isset($val['body'])) ? $body = ($val['body']) : '';
            ++$tabid;
            $active = " class='uk-active'";
            if ($tabid > 1) {
                $active = "";
            }
            $result .= "<li $active><a class='con-tab-title'><h3>$title</h3></a></li>";
            $switcher .="<li>$body</li>";
        }

        $result = "
        <div class='con-element'>
            <ul class='uk-child-width-expand $class' uk-tab>
                " . $result . "
            </ul>
            <ul class='uk-switcher uk-margin uk-animation-fade'>
            " . $switcher . "
            </ul>
        </div>";
        return $result;
    }
}
}
vc_map( array(
    "name" => esc_html__('Tab', 'consultaid'),
    "description" => esc_html__("Consultaid tab", 'consultaid'),
    "base" => 'tab',
    "icon" => "icon-wpb-quickload",
    "content_element" => true,
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => 'param_group',
            "value" => '',
            "param_name" => 'group',
            "params" => array(
                array(
                    "type" => 'textfield',
                    "param_name" => "title",
                    'admin_label' => true,
                    'holder' => 'div',
                    "heading" => esc_html__("Title of the tab", 'consultaid'),
                ),
                array(
                    "type" => 'textfield',
                    "param_name" => "body",
                    'admin_label' => true,
                    'holder' => 'div',
                    "heading" => esc_html__("Body text", 'consultaid'),
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