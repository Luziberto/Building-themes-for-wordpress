<?php

if (!class_exists('WPBakeryShortCode_hiring')) {
class WPBakeryShortCode_hiring extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        
        // Initial argument sets
        extract(shortcode_atts(array(
            'title' => 'Title',
            'body' => 'Lorem Ipsum',
            'btn1' => 'Button',
            'btn2' => 'Button',
            'showbutton' => '1',
            'btntext' => 'APPLY NOW',
            'shortcodes'=> 'Enter shortcode here',
            'extra_class' => ''
        ), $atts));

$modalid ='';
$class = esc_attr($extra_class);
$group = vc_param_group_parse_atts( $atts['group']);
$result='';
$button2 = '';
foreach ((array)$group as $val) {
    $modalid++;
    (isset($val['btn2'])) ? $btn2 = ($val['btn2']) : '';
    (isset($val['title'])) ? $title = ($val['title']) : '';
    (isset($val['body'])) ? $body = ($val['body']) : '';
    (isset($val['shortcodes'])) ? $shortcodes = ($val['shortcodes']) : '';
    (isset($val['btntext'])) ? $btntext = ($val['btntext']) : '';
    (isset($val['showbutton'])) ? $showbutton = ($val['showbutton']) : $showbutton='';
    
    $button1 = sprintf( '<button class="uk-button uk-button-default uk-text-truncate" uk-toggle="target: #modalid' . $modalid . '">' . $btntext . '</button>');
    if ($showbutton == '1') {    
        $btn2 = vc_build_link( $btn2 );
        if (empty($btn2['title'])) { $btn2['title'] = 'READ MORE'; }
        $button2 = '<a href="' . $btn2['url'] . '"> <button class="uk-button uk-button-white uk-text-truncate">' . $btn2['title'] . '</button></a>';
    }
    if ($showbutton != '1') {
        $button2 = '';
    }    
    
    $result .= "
    <div class='con-element mb10'><h2>$title</h2><p>$body</p><br>$button1 $button2
        <div id='modalid$modalid' uk-modal='center: true'>
            <div class='uk-modal-dialog uk-modal-body' >
                <button class='uk-modal-close-outside' type='button' uk-close></button>
                <h2 class='uk-modal-title'>$title</h2>
                <p>$body</p>
                <hr>
                <div><h2 class='mt3'>$btntext</h2>". do_shortcode($shortcodes). "</div>
            </div>
        </div>
    </div>";
}
$result = "
<div class='uk-grid uk-child-width-1-2@m uk-child-width-1-1@s uk-grid-large uk-text-left'> $result </div>";
return $result;
    }
}
}

vc_map( array(
    "name" => esc_html__('Hiring', 'consultaid'),
    "description" => esc_html__("We are hiring section", 'consultaid'),
    "base" => 'hiring',
    "content_element" => true,
    "icon" => "icon-wpb-quickload",
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
                            "heading" => esc_html__("Title", 'consultaid'),
                            'admin_label' => true,
                            'holder' => 'div',
                        ),
                        array(
                            "type" => 'textfield',
                            "param_name" => "body",
                            "heading" => esc_html__("Body text", 'consultaid'),
                            'admin_label' => true,
                            'holder' => 'div',
                        ),
                        array(
                            "type" => 'textfield',
                            "param_name" => "btntext",
                            "heading" => esc_html__("Text of the first button", 'consultaid'),
                        ),
                        array(
                            'type' => 'checkbox',
                            "param_name" => "showbutton",
                            "heading" => esc_html__("Show extra button ?", 'consultaid'),
                            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
                            "std" => "1"
                        ),
                        array(
                        'type' => 'vc_link',
                        'value' => 'READ MORE',
                        "heading" => esc_html__("Extra button", 'consultaid'),
                        'param_name' => 'btn2',
                        "std" => "APPLY NOW",
                        "dependency" => Array("element" => "showbutton", "value" => array("1"))
                        ),
                        array(
                            "type" => 'textfield',
                            "param_name" => "shortcodes",
                            "heading" => esc_html__("Shortcode", 'consultaid'),
                            'description' => esc_html__( 'You can enter your contact forms shortcode or other shortcodes.', 'consultaid' )
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
