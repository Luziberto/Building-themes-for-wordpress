<?php
if (!class_exists('WPBakeryShortCode_service_alt')) {
class WPBakeryShortCode_service_alt extends WPBakeryShortCode {
    protected function content( $atts, $content = null){

        extract( shortcode_atts( array(
            "icon_type" => "icon_font",
            "image" => "",
            "icon" => "fa fa-question-circle-o",
            "link" => "",
            "titletop" => "01",
            "title" => "Service title",
            "desc" => "Seamlessly provide access to distinctive vortals rather than multidisciplinary quality vectors.",
            "extra_class" => ""
        ), $atts ) );

        if($icon_type == 'icon_image') {
            $icon = wp_get_attachment_image($image, 'thumbnail', false, array('class'=>'serv-icon'));
        } else {
            $icon = $icon != '' ? $icon : "fa fa-question-circle-o";
            $icon = "<span class='serv-icon $icon'></span>";
        }

        $title = "$icon<h3>$title</h3>";

        $title = $link != '' ? "<a class='uk-flex uk-flex-middle' href='$link'>$title</a>" : $title;
        $title = "<div class='serv-icon-holder uk-flex uk-flex-middle'>$title</div>";

        
        $desc = "<p>$desc</p>";
        $titletop = "<h2 class='title-top'>$titletop</h2>";

        $classes = $this->getExtraClass($extra_class);

        $result =   "<div class='con-element serv-alt $classes'>
                        $titletop
                        $title
                        $desc
                    </div><!-- end .service-alt -->";
        
        return $result;
    }
}
}
vc_map( array(
    "name" => esc_html__("Service Alternate Box", 'consultaid'),
    "description" => esc_html__("Icon, Line and Text", 'consultaid'),
    "base" => "service_alt",
    "content_element" => true,
    "category" => 'Consult aid',
    "icon" => "icon-wpb-quickload",
    "params" => array(
        array(
            'type' => 'dropdown',
            "param_name" => "icon_type",
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
            "heading" => esc_html__("Image Image", 'consultaid'),
            "value" => '',
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
            'type' => 'textfield',
            "param_name" => "link",
            "heading" => esc_html__("Icon link (optional)", 'consultaid'),
            "value" => ''
        ),
        array(
            'type' => 'textfield',
            "param_name" => "titletop",
            "heading" => esc_html__("Service Top Title", 'consultaid'),
            "value" => '01',
            "holder" => 'div'
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
            "type" => "textfield",
            "param_name" => "extra_class",
            "heading" => esc_html__("Extra Class", 'consultaid'),
            "value" => "",
            "description" => esc_html__("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file.", 'consultaid'),
        )
    )
)
);