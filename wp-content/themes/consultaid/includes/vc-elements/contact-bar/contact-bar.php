<?php

if (!class_exists('WPBakeryShortCode_contact_bar')) {
class WPBakeryShortCode_contact_bar extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        // Initial argument sets
        extract(shortcode_atts(array(
            'title' => 'CALL NOW',
            'description' => 'for free consultation',
            'number' => '+586 958 5545',
            'title2' => 'MAIL US NOW',
            'description2' => 'for free consultation',
            'email' => 'info@consultaid.com',
            'extra_class' => ''
        ), $atts));
        
        $number_link = esc_url( str_replace(' ', '', $number) );
        $class = esc_attr($extra_class);
        $result = " <div class='con-element uk-grid contact-bar uk-flex-middle uk-grid-medium uk-box-shadow-medium    uk-light $class'>
                         <div class='uk-grid uk-flex-middle uk-grid-collapse uk-width-expand@m uk-width-1-2@s'>
                            <div class='uk-margin-right'>
                                <span data-ukicon='phone|2'></span>
                            </div>
                            <div class='uk-text-left '>
                                <span class='uk-text-bold'>$title</span>
                                <div class='minus-top-margin'><span>$description</span></div>
                            </div>
                        </div>
                        <div class='phone uk-flex-middle uk-width-expand@m uk-width-1-2@s'>
                           : <a href='callto:$number_link'>$number</a>
                        </div>
                        <div class='cross uk-padding-remove-horizontal ml3 mr3'></div>
                        <div class='uk-grid uk-flex-middle uk-grid-collapse uk-width-expand@m uk-width-1-2@s'>
                            <div class='uk-margin-right'>
                                <span data-ukicon='mail|2'></span>
                            </div>
                            <div class='uk-text-left'>
                                <span class='uk-text-bold'>$title2</span>
                                <div class='minus-top-margin'><span>$description2</span></div>
                            </div>
                        </div>
                        <div class='email uk-margin-remove uk-width-expand@m uk-width-1-2@s'>: 
                            <a href='mailto:$email'>$email</a>
                        </div>
                    </div>";
        return $result;
    }
}
}
vc_map( array(
    "name" => esc_html__('Contact Bar', 'consultaid'),
    "description" => esc_html__("Contact bar", 'consultaid'),
    "base" => 'contact_bar',
    "icon" => "icon-wpb-quickload",
    "content_element" => true,
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => 'textfield',
            "param_name" => "title",
            "heading" => esc_html__("Title", 'consultaid'),
            "holder" => 'div',
            "std" => 'CALL NOW'
        ),
        array(
            "type" => 'textfield',
            "param_name" => "description",
            "heading" => esc_html__("Description", 'consultaid'),
            "holder" => 'div',
            "std" => 'for free consultation',
        ),
        array(
            "type" => 'textfield',
            "param_name" => "number",
            "heading" => esc_html__("Number", 'consultaid'),
            "std" => '+586 958 5545',
        ),
        array(
            "type" => 'textfield',
            "param_name" => "title2",
            "heading" => esc_html__("Title 2", 'consultaid'),
            "std" => 'MAIL US NOW',
        ),
        array(
            "type" => 'textfield',
            "param_name" => "description2",
            "heading" => esc_html__("Description 2", 'consultaid'),
            "std" => 'for free consultation',
        ),
        array(
            "type" => 'textfield',
            "param_name" => "email",
            "heading" => esc_html__("Email", 'consultaid'),
            "std" => 'info@consultaid.com',
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