<?php
class TT_Extend_VC_Row{

    function __construct(){
        add_action('init', array($this, 'row_init'));

        if(defined('WPB_VC_VERSION') && version_compare( WPB_VC_VERSION, '4.4', '>=' )) {
            add_filter('vc_shortcode_output', array($this, 'vc_shortcode_output'),10,3);
        }

        add_filter( 'vc_shortcodes_css_class', array($this, 'custom_css_classes_for_vc'), 10, 2 );
    }
    
    
    // Filter to replace default css class names
    function custom_css_classes_for_vc( $class_string, $tag ) {
        if( $tag == 'vc_row' || $tag == 'vc_row_inner' ){  }
        if( $tag == 'vc_column' || $tag == 'vc_column_inner' ){  }
        return $class_string;
    }


    public function vc_shortcode_output($output, $obj, $attr){
        if($obj->settings('base')=='vc_row') {
            if( isset($attr['vc_row_overlay'], $attr['vc_row_overlay_color'], $attr['vc_row_overlay_alpha']) && $attr['vc_row_overlay']=='yes' && !empty($attr['vc_row_overlay_color']) ){
                $data_attr = ' data-overlay="'.$attr['vc_row_overlay_color'].'"';
                $data_attr .= ' data-overlay-alpha="'.$attr['vc_row_overlay_alpha'].'"';
                $output = preg_replace('/ class="vc_row /', $data_attr . ' class="vc_row ', $output, 1);
            }

            if( isset($attr['one_page_section'], $attr['one_page_label']) && $attr['one_page_section']=='yes' && !empty($attr['one_page_label']) ){
                $slug = isset($attr['one_page_slug']) ? $attr['one_page_slug'] : '';
                if( empty($slug) ){
                    $slug = TT::create_slug($attr['one_page_label']);
                }
                $data_attr = ' data-onepage-title="'.$attr['one_page_label'].'"';
                $data_attr .= ' data-onepage-slug="'.$slug.'"';
                $output = preg_replace('/ class="vc_row /', $data_attr . ' class="vc_row ', $output, 1);
            }

            // parallax column option
            if( isset($attr['parallax_row']) && !empty($attr['parallax_row']) && $attr['parallax_row']!='1' ){
                $data_attr = sprintf(' data-parallax-row="%s"', esc_attr($attr['parallax_row']) );
                $output = preg_replace('/ class="vc_row /', $data_attr . ' class="vc_row ', $output, 1);
            }

            return $output;
        }
        else if($obj->settings('base')=='vc_column'){
            // parallax column option
            if( array_key_exists('parallax_column', $attr) ){
                $data_attr = '';
                $data_attr .= array_key_exists('parallax_column', $attr) ? ' data-parallax="'.esc_attr($attr['parallax_column']).'"' : '';
                $output = preg_replace('/ class="/', $data_attr . ' class="', $output, 1);

                return $output;
            }
        }
        else if( $obj->settings('base')=='vc_tta_tabs' ){
            if( array_key_exists('tab_style', $attr) && array_key_exists('text_style', $attr) ){
                $data_attr = '';
                $data_attr .= array_key_exists('tab_style', $attr) ? ' data-tab-style="'.esc_attr($attr['tab_style']).'"' : '';
                $data_attr .= array_key_exists('text_style', $attr) ? ' data-text-style="'.esc_attr($attr['text_style']).'"' : '';
                $output = preg_replace('/ class="/', $data_attr . ' class="', $output, 1);

                return $output;
            }

        }

        else if( $obj->settings('base')=='vc_widget_sidebar' ){
            $extra_class = isset($attr['sidebar_style']) && !empty($attr['sidebar_style']) ? esc_attr($attr['sidebar_style']) : 'sidebar';
            $output = preg_replace('/ class="/', sprintf(' class="%s ', $extra_class), $output, 1);
            return $output;
        }

        return $output;
    }



    public function row_init(){
        if( function_exists('vc_add_param') ){

            // Row Parallax Columns config
            vc_add_param('vc_row', array(
                "type" => "dropdown",
                "heading" => esc_html__("Parallax columns container", 'consultaid'),
                "param_name" => "parallax_row",
                "value" => array(
                    esc_html__("None", 'consultaid') => "none",
                    esc_html__("Parallax - Default", 'consultaid') => "parallax",
                    esc_html__("Parallax - Fast and Slow", 'consultaid') => "fast-and-slow"
                ),
                "description" => 'It requires column\'s parallax option.'
            ));

            // Row One page option
            vc_add_param('vc_column', array(
                "type" => "dropdown",
                "heading" => esc_html__("Parallax Column Option", 'consultaid'),
                "param_name" => "parallax_column",
                "value" => array(
                    esc_html__("Parallax Column", 'consultaid') => "parallax-column",
                    esc_html__("Parallax Content", 'consultaid') => "parallax-content",
                ),
                "description" => 'It requires row\'s parallax option.'
            ));


            
            // Row overlay
            vc_add_param('vc_row', array(
                "type" => "dropdown",
                "heading" => esc_html__("Overlay", 'consultaid'),
                "param_name" => "vc_row_overlay",
                "value" => array(
                        esc_html__("No", 'consultaid') => "no",
                        esc_html__("Yes", 'consultaid') => "yes",
                    )
            ));

            vc_add_param('vc_row', array(
                "type" => "colorpicker",
                "heading" => esc_html__("Overlay Color", 'consultaid'),
                "param_name" => "vc_row_overlay_color",
                "value" => "",
                "dependency" => Array("element" => "vc_row_overlay", "value" => array("yes"))
            ));

            vc_add_param('vc_row', array(
                "type"      => "textfield",
                "heading"   => esc_html__("Overlay Opacity", 'consultaid'),
                "param_name" => "vc_row_overlay_alpha",
                "value"     => "",
                "dependency" => Array("element" => "vc_row_overlay", "value" => array("yes"))
            ));


            // Row One page option
            vc_add_param('vc_row', array(
                "type" => "dropdown",
                "heading" => esc_html__("One Page Section", 'consultaid'),
                "param_name" => "one_page_section",
                "value" => array(
                    esc_html__("No", 'consultaid') => "no",
                    esc_html__("Yes", 'consultaid') => "yes",
                )
            ));

            vc_add_param('vc_row', array(
                "type" => "textfield",
                "heading" => esc_html__("Section Label", 'consultaid'),
                "param_name" => "one_page_label",
                "value" => "",
                "dependency" => Array("element" => "one_page_section", "value" => array("yes"))
            ));

            vc_add_param('vc_row', array(
                "type" => "textfield",
                "heading" => esc_html__("Section slug", 'consultaid'),
                "description" => esc_html__("Don't need hash tag (#). You can apply a custom link ( with http:// or https:// ) to redirect.", 'consultaid'),
                "param_name" => "one_page_slug",
                "value" => "",
                "dependency" => Array("element" => "one_page_section", "value" => array("yes"))
            ));




            // Tabs
            vc_add_param('vc_tta_tabs', array(
                "type" => "dropdown",
                "heading" => esc_html__("Current Theme Tab Style", 'consultaid'),
                "param_name" => "tab_style",
                "value" => array(
                    esc_html__("Default", 'consultaid') => "default-style",
                    esc_html__("Vertical Line", 'consultaid') => "ms-style"
                )
            ));

            vc_add_param('vc_tta_tabs', array(
                "type" => "dropdown",
                "heading" => esc_html__("Current theme Text Style", 'consultaid'),
                "param_name" => "text_style",
                "value" => array(
                    esc_html__("Text Black", 'consultaid') => "text-default",
                    esc_html__("Text White", 'consultaid') => "text-light"
                )
            ));


            // Sidebar Element
            vc_add_param('vc_widget_sidebar', array(
                "type" => "dropdown",
                "heading" => esc_html__("Sidebar Style", 'consultaid'),
                "param_name" => "sidebar_style",
                "value" => array(
                    esc_html__("Default", 'consultaid') => "sidebar",
                    esc_html__("Style 1", 'consultaid') => "sidebar fs-sidebar",
                    esc_html__("Style 2", 'consultaid') => "sidebar boxed p4 color-2"
                )
            ));
            
        }
    }
}

if( function_exists('vc_map') ){
    new TT_Extend_VC_Row();
}