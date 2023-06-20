<?php

if (!class_exists('WPBakeryShortCode_ui_card')) {
class WPBakeryShortCode_ui_card extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        
        // Initial argument sets
        extract(shortcode_atts(array(
            'title' => '',
            'body' => '',
            'shadows' => esc_html__("uk-box-shadow-small",'consultaid'),
            'style' => esc_html__("Default",'consultaid'),
            'footer' => esc_html__("",'consultaid'),
            'mediaposition' => esc_html__("uk-card-media-top",'consultaid'),
            'hover' => '0',
            'image' => '',
            'color' => '',
            'type' => '',
            'size' => '',
            'icon' => '',
            "href" => '',

            'icon_type' => '',

            'extra_class' => ''
        ), $atts));

        $icon = isset($atts["icon_$icon_type"]) ? $atts["icon_$icon_type"] : $icon;

        if (!empty($icon)) {
            wp_enqueue_style("vc_$icon_type");
        }
        $class = esc_attr($extra_class);
        $shadows = $style = $hover = $footer = $image = $mediapositiontop = $type  = $icon_openiconic = $icon_typicons = '';
        $icon_entypo = $icon_linecons = $icon_monosocial = $icon_material = $mediapositionbottom = $circlebutton = $removepad = $icon_fontawesome = $result = ''; 
        $href = vc_build_link( $href );
        $url =($href['url']);
    
        // Shadow of the cards
        if( $shadows == 'small' ) {
            $shadows = 'uk-box-shadow-small';


        } else if ( $shadows == 'medium' ) {
            $shadows = 'uk-box-shadow-medium';


        } else if ( $shadows == 'large' ) {
            $shadows = 'uk-box-shadow-large';
        }


        // Card colors 
        if( $style == 'default' ) {
            $style = 'uk-card-default';


        } else if ( $style == 'primary' ) {
            $style = 'uk-card-primary';


        } else if ( $style == 'secondary' ) {
            $style = 'uk-card-secondary';
        }



        
        // Hover effects
        if( $hover == 1) {
            $hover = 'uk-card-hover';
        }


        if (!empty($footer)) {
             $footer = sprintf('<div class="uk-card-footer">%s</div>', $footer);
        }
        if (!empty($url)) {
            $circlebutton = sprintf("<div class='uk-flex uk-flex-middle uk-text-center'><i class='fa fa-angle-right uk-button-circle uk-border-cirle' aria-hidden='true' href=' " . $href['url'] . "'></i></div>");
        }


        if( !empty($image) ){
            $image = wp_get_attachment_image_src($image, large);
            $image = "<img class='' src='".$image[0]."' alt='$title'>";
            $removepad = "uk-padding-remove-horizontal uk-padding-remove-top";
        }



        if( !empty($icon_fontawesome) ){
            $icon_fontawesome = "<i class='$icon_fontawesome' style='font-size: $size; color: $color ;'></i>";
        }
        if( !empty($icon_openiconic) ){
            $icon_openiconic = "<i class='$icon_openiconic' style='font-size: $size; color: $color ;'></i>";
        }
        if( !empty($icon_typicons) ){
            $icon_typicons = "<i class='$icon_typicons' style='font-size: $size; color: $color ;'></i>";
        }
        if( !empty($icon_entypo) ){
            $icon_entypo = "<i class='$icon_entypo' style='font-size: $size; color: $color ;'></i>";
        }
        if( !empty($icon_linecons) ){
            $icon_linecons = "<i class='$icon_linecons' style='font-size: $size; color: $color ;'></i>";
        }



        if ($mediaposition == 'uk-card-media-top') {
            $mediapositiontop = $mediaposition;
            $mediapositiontop = " <div class='$mediapositiontop' >$image $icon_fontawesome $icon_openiconic $icon_typicons $icon_entypo $icon_linecons</div>";
        }
        else if ($mediaposition == 'uk-card-media-bottom') {
            $mediapositionbottom = $mediaposition;
            $mediapositionbottom = " <div class='$mediapositionbottom'>$image $icon_fontawesome $icon_openiconic $icon_typicons $icon_entypo $icon_linecons</div>";
        }



        $result = " <div class='con-element uk-card $style $shadows $hover $class uk-text-center'>
            <div class='uk-card-header $removepad'>
            $mediapositiontop
            <i class='$icon' style='font-size: $size; color: $color ;'></i>
            <i class='$icon'></i>
             </div>
             <div class='uk-card-body $removepad'>
             <div class='uk-grid-collapse uk-child-width-expand@s uk-padding-small uk-grid'>

            <div class='uk-width-3-4'>
            <h3 class='uk-card-title'>$title</h3>
            <p>$body</p>
            </div>
            
            $circlebutton

            </div>
        </div>

        $mediapositionbottom
        $footer

        </div>";

        // return result
        return $result;

    }

}
}

vc_map( array(
    "name" => esc_html__('Card', 'consultaid'),
    "description" => esc_html__("Element Card", 'consultaid'),
    "base" => 'ui_card',
    "icon" => "icon-wpb-quickload",
    "content_element" => true,
    "category" => 'Consult aid',
    'params' => array(
        array(
            "type" => "dropdown",
            "param_name" => "mediaposition",
            "heading" => esc_html__("Media Position", 'consultaid'),
            "value" => array(
                "Top" => "uk-card-media-top",
                "Bottom" => "uk-card-media-bottom"
            ),
            "std" => "uk-card-media-top"
        ),
        array(
            "type" => 'textfield',
            "param_name" => "title",
            "heading" => esc_html__("Title", 'consultaid'),
            "holder" => 'div'
        ),
        array(
            "type" => 'textfield',
            "param_name" => "body",
            "heading" => esc_html__("Body", 'consultaid')
        ),


        array(
            'type' => 'dropdown',
            "param_name" => "icon_type",
            "heading" => esc_html__("Icon Type", 'consultaid'),
            "value" => array(
                esc_html__( 'Icon image', 'consultaid' ) => 'icon_image',
                esc_html__( 'Icon font', 'consultaid' ) => 'icon_font',
            ),
            "std" => "icon_font",
        ),
        array(
            'type' => 'attach_image',
            "param_name" => "image",
            "heading" => esc_html__("Attach Image", 'consultaid'),
            "dependency" => Array("element" => "icon_type", "value" => array("icon_image"))
        ),
        array(
            'type' => 'dropdown',
            'heading' => esc_html__( 'Icon library', 'consultaid' ),
            'value' => array(
                esc_html__( 'Font Awesome', 'consultaid' ) => 'fontawesome',
                esc_html__( 'Open Iconic', 'consultaid' ) => 'openiconic',
                esc_html__( 'Typicons', 'consultaid' ) => 'typicons',
                esc_html__( 'Entypo', 'consultaid' ) => 'entypo',
                esc_html__( 'Linecons', 'consultaid' ) => 'linecons',
                esc_html__( 'Mono Social', 'consultaid' ) => 'monosocial',
                esc_html__( 'Material', 'consultaid' ) => 'material',
            ),
            'admin_label' => true,
            'param_name' => 'library',
            'description' => esc_html__( 'Select icon library.', 'consultaid' ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon_fontawesome',
            'value' => 'fa fa-adjust',
            'admin_label' => true,
            // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true,
                // default true, display an "EMPTY" icon?
                'iconsPerPage' => 4000,
                // default 100, how many icons per/page to display, we use (big number) to display all icons in single page
            ),
            'dependency' => array(
                'element' => 'type',
                'value' => 'fontawesome',
            ),
            'description' => esc_html__( 'Select icon from library.', 'consultaid' ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon_openiconic',
            'value' => 'vc-oi vc-oi-dial', // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true, // default true, display an "EMPTY" icon?
                'type' => 'openiconic',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'type',
                'value' => 'openiconic',
            ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon_typicons',
            'value' => 'typcn typcn-adjust-brightness', // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true, // default true, display an "EMPTY" icon?
                'type' => 'typicons',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'type',
                'value' => 'typicons',
            ),
            'description' => esc_html__( 'Select icon from library.', 'consultaid' ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon_entypo',
            'value' => 'entypo-icon entypo-icon-note', // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true, // default true, display an "EMPTY" icon?
                'type' => 'entypo',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'type',
                'value' => 'entypo',
            ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon_linecons',
            'value' => 'vc_li vc_li-heart', // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true, // default true, display an "EMPTY" icon?
                'type' => 'linecons',
                'iconsPerPage' => 4000, // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'type',
                'value' => 'linecons',
            ),
            'description' => esc_html__( 'Select icon from library.', 'consultaid' ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon_monosocial',
            'value' => 'vc-mono vc-mono-fivehundredpx',
            // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true,
                // default true, display an "EMPTY" icon?
                'type' => 'monosocial',
                'iconsPerPage' => 4000,
                // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'type',
                'value' => 'monosocial',
            ),
            'description' => esc_html__( 'Select icon from library.', 'consultaid' ),
        ),
        array(
            'type' => 'iconpicker',
            'heading' => esc_html__( 'Icon', 'consultaid' ),
            'param_name' => 'icon_material',
            'value' => 'vc-material vc-material-cake',
            // default value to backend editor admin_label
            'settings' => array(
                'emptyIcon' => true,
                // default true, display an "EMPTY" icon?
                'type' => 'material',
                'iconsPerPage' => 4000,
                // default 100, how many icons per/page to display
            ),
            'dependency' => array(
                'element' => 'type',
                'value' => 'material',
            ),
            'description' => esc_html__( 'Select icon from library.', 'consultaid' ),
        ),
        array(
            'type' => 'colorpicker',
            'heading' => esc_html__( 'Icon color', 'consultaid' ),
            'param_name' => 'color',
            'description' => esc_html__( 'Select icon color.', 'consultaid' ),
            "dependency" => Array("element" => "icon_type", "value" => array("icon_font"))
        ),
        array(
            "type" => 'textfield',
            "param_name" => "size",
            'description' => esc_html__( 'Icon size.', 'consultaid' ),
            'std' => '14px',
            "heading" => esc_html__("Icon size", 'consultaid'),
            "dependency" => Array("element" => "icon_type", "value" => array("icon_font"))
        ),
        array(
            "type" => 'textfield',
            "param_name" => "footer",
            "description" => esc_html__("If you wish to delete footer of the card just leave it empty", 'consultaid'),
            "heading" => esc_html__("Footer", 'consultaid')
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "hover",
            "heading" => esc_html__("Hover effect", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "0"
        ),
        array(
            "type" => "dropdown",
            "param_name" => "style",
            "heading" => esc_html__("Color of the card", 'consultaid'),
            "value" => array(
                "Default" => "default",
                "Primary" => "primary",
                "Secondary" => "secondary"
            ),
            "std" => "default",
        ),
        array(
            "type" => "dropdown",
            "param_name" => "shadows",
            "heading" => esc_html__("Shadow of the card", 'consultaid'),
            "value" => array(
                "Small" => "small",
                "Medium" => "medium",
                "Large" => "large"
            ),
            "std" => "default",
        ),
        array(
            'type' => 'vc_link',
            'value' => '',
            'heading' => 'Link of button',
            'param_name' => 'href',
            "std" => "ORDER NOW"
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