<?php
    
    if ( ! class_exists( 'Redux' ) ) {
        return;
    }

    // This is your option name where all the Redux data is stored.
    $opt_name = "themeton_redux";


    function themeton_redux_action_customizer(){
        $compiled_css = TTLess::get_compiled_css();
        echo '<style type="text/css" id="customize_preview_css">'. $compiled_css .'</style>';
    }
    add_action("redux/customizer/live_preview", 'themeton_redux_action_customizer');

    function themeton_redux_action_hook(){
        if( class_exists('TTLess') ){
            TTLess::build_css();
        }
    }
    
    add_action('customize_save_after', 'themeton_redux_action_hook', 99);
    add_action('redux/options/'.$opt_name.'/saved', 'themeton_redux_action_hook', 99);
    add_action('redux/options/'.$opt_name.'/section/reset', 'themeton_redux_action_hook', 99);
    add_action('redux/options/'.$opt_name.'/compiler/advanced', 'themeton_redux_action_hook', 99);


    function themeton_redux_defaults_filter_hook($defaults){

        $variables = TTLess::get_less_variables();
        foreach ($variables as $key => $value) {
            if( array_key_exists($key, $defaults) ){
                $defaults[$key] = $value;
            }
        }

        $vars = array('font-family', 'font-weight', 'font-style', 'font-size', 'line-height');
        foreach ($defaults as $key => $value) {
            $current_val = (array)$value;
            $current_var = array();
            foreach( $vars as $var ){
                $_key = sprintf('%s-%s', $key, $var);
                if( array_key_exists($_key, $variables) ){
                    $current_var[$var] = $variables[$_key];
                }
            }

            if( !empty($current_var) ){
                $current_var['google'] = true;
                $defaults[$key] = array_merge((array)$current_val, (array)$current_var);
            }
        }

        return $defaults;
    }
    add_filter('redux/options/'.$opt_name.'/defaults', 'themeton_redux_defaults_filter_hook');


    /**
     * ---> SET ARGUMENTS
     * All the possible arguments for Redux.
     * For full documentation on arguments, please refer to: https://github.com/ReduxFramework/ReduxFramework/wiki/Arguments
     * */

    $theme = wp_get_theme(); // For use with some settings. Not necessary.

    $args = array(
        'opt_name' => $opt_name,
        'use_cdn' => TRUE,
        'display_name' => sprintf('%s %s', $theme->get('Name'), esc_html__('Option', 'consultaid')),
        'display_version' => $theme->get('Version'),
        'page_title' => 'Theme Options',
        'dev_mode' => false,
        'update_notice' => False,
        'admin_bar' => true,
        'menu_type' => 'menu',
        'menu_title' => esc_html__('Theme Options', 'consultaid'),
        'allow_sub_menu' => TRUE,
        'page_parent_post_type' => 'your_post_type',
        'customizer' => TRUE,
        'default_mark' => '*',
        'hints' => array(
            'icon_position' => 'right',
            'icon_color' => 'lightgray',
            'icon_size' => 'normal',
            'tip_style' => array(
                'color' => 'light',
            ),
            'tip_position' => array(
                'my' => 'top left',
                'at' => 'bottom right',
            ),
            'tip_effect' => array(
                'show' => array(
                    'duration' => '500',
                    'event' => 'mouseover',
                ),
                'hide' => array(
                    'duration' => '500',
                    'event' => 'mouseleave unfocus',
                ),
            ),
        ),
        'output_tag' => TRUE,
        'settings_api' => TRUE,
        'cdn_check_time' => '1440',
        'compiler' => TRUE,
        'page_permissions' => 'manage_options',
        'save_defaults' => TRUE,
        'show_import_export' => TRUE,
        'database' => 'options',
        'transient_time' => '3600',
        'network_sites' => TRUE,
    );

    // SOCIAL ICONS -> Setup custom links in the footer for quick links in your panel footer icons.
    $args['share_icons'][] = array(
        'url'   => 'https://github.com/',
        'title' => 'Visit us on GitHub',
        'icon'  => 'el el-github'
        //'img'   => '', // You can use icon OR img. IMG needs to be a full URL.
    );
    $args['share_icons'][] = array(
        'url'   => 'https://www.facebook.com/Themeton',
        'title' => 'Like us on Facebook',
        'icon'  => 'el el-facebook'
    );
    $args['share_icons'][] = array(
        'url'   => 'http://twitter.com/Themeton',
        'title' => 'Follow us on Twitter',
        'icon'  => 'el el-twitter'
    );
    $args['share_icons'][] = array(
        'url'   => 'http://www.linkedin.com/company/Themeton',
        'title' => 'Find us on LinkedIn',
        'icon'  => 'el el-linkedin'
    );

    Redux::setArgs( $opt_name, $args );


    global $themeton_redux, $themeton_default_sidebars, $themeton_header_layouts;
    $themeton_redux = get_option('themeton_redux');
    $themeton_header_layouts = array(
        'header-1'      => array(
            'alt'   => 'Style 1', 
            'img'   => get_template_directory_uri() . "/images/header.png"
        ),
        'header-2'      => array(
            'alt'   => 'Style 2', 
            'img'   => get_template_directory_uri() . "/images/header_2.png"
        ),
        'header-3'      => array(
            'alt'   => 'Style 3', 
            'img'  => get_template_directory_uri() . "/images/header_1.png"
        ),
        'header-4'      => array(
            'alt'   => 'Style 4', 
            'img'   => get_template_directory_uri() . "/images/header_3.png"
        ),
    );

    $sidebars = Themeton_Std::get_sidebars();
    $sidebars = array_merge(
        $themeton_default_sidebars,
        $sidebars
    );

    define('ADMIN_IMG_PATH', get_template_directory_uri().'/framework/admin-assets/images/');

    //Access the WordPress Pages via an Array
    $of_pages = array();
    $of_pages_obj = get_pages('sort_column=post_parent,menu_order');
    foreach ($of_pages_obj as $of_page) {
        $of_pages[$of_page->ID] = $of_page->post_name;
    }
    $of_pages_tmp = array_unshift($of_pages, "Select a page:");

    $blog_layouts = array(
        'grid2' => ADMIN_IMG_PATH.'blog-grid2.png',
        'grid3' => ADMIN_IMG_PATH.'blog-grid3.png',
        'grid4' => ADMIN_IMG_PATH.'blog-grid4.png',
        'masonry2' => ADMIN_IMG_PATH.'blog-masonry2.png',
        'masonry3' => ADMIN_IMG_PATH.'blog-masonry3.png',
        'masonry4' => ADMIN_IMG_PATH.'blog-masonry4.png',
        'regular' => ADMIN_IMG_PATH.'blog-regular.png',
    );


    /*
    Usage
    ----------------------------
    global $themeton_redux;
    $themeton_redux['opt-text'];
    */
    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'General', 'consultaid'),
        'id'         => 'general-setting',
        'subsection' => false,
        'icon'  => 'el el-cog',
        'fields'     => array(
            array(
                'id'       => 'general_layout',
                'type'     => 'image_select',
                'title'    => esc_attr__('Site Layout', 'consultaid'),
                'subtitle' => esc_attr__('You can choose between Wide, Boxed or Attached layout.', 'consultaid'),
                'options'  => array(
                    'wide'      => array(
                        'alt'   => 'Style 1', 
                        'img'   => ADMIN_IMG_PATH."layout-wide.png"
                    ),
                    'boxed'      => array(
                        'alt'   => 'Style 2', 
                        'img'   => ADMIN_IMG_PATH."layout-boxed.png"
                    ),
                    'attached'      => array(
                        'alt'   => 'Style 3', 
                        'img'  => ADMIN_IMG_PATH."layout-attached.png"
                    ),
                ),
                'default' => 'wide'
            ),
            array(
                'id'       => 'layout-attached-top',
                'type'     => 'slider',
                'title'    => esc_attr__('Attached layout top space', 'consultaid'), 
                "default"   => 80,
                "min"       => 0,
                "step"      => 5,
                "max"       => 500,
                'display_value' => 'text',
                'subtitle'      => esc_attr__('Only works with Attached Layout.', 'consultaid'),
            ),
            array(
                'id'       => 'layout-attached-bottom',
                'type'     => 'slider',
                'title'    => esc_attr__('Attached layout bottom space', 'consultaid'), 
                "default"   => 80,
                "min"       => 0,
                "step"      => 5,
                "max"       => 500,
                'display_value' => 'text',
                'subtitle'      => esc_attr__('Only works with Attached Layout.', 'consultaid'),
            ),

            array(         
                'id'       => 'background_body',
                'type'     => 'background',
                'title'    => esc_attr__('Body Background', 'consultaid'),
                'output'   => 'body',
                'default'  => array(),
                'background-color' => false,
            ),

            array(
                'id'       => 'content-top',
                'type'     => 'slider',
                'title'    => esc_attr__('Content area top space', 'consultaid'), 
                "default"   => 80,
                "min"       => 0,
                "step"      => 5,
                "max"       => 500,
                'display_value' => 'text'
            ),
            array(
                'id'       => 'content-bottom',
                'type'     => 'slider',
                'title'    => esc_attr__('Content area bottom space', 'consultaid'), 
                "default"   => 80,
                "min"       => 0,
                "step"      => 5,
                "max"       => 500,
                'display_value' => 'text'
            ),
        )
    ) );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Color', 'consultaid'),
        'id'         => 'color-setting',
        'subsection' => false,
        'icon'  => 'el el-brush',
        'fields'     => array(
            array(
                'id'       => 'color-brand',
                'type'     => 'color',
                'title'    => esc_attr__('Brand Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #3db8db).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-title',
                'type'     => 'color',
                'title'    => esc_attr__('Title Heading Color', 'consultaid'), 
                'subtitle' => esc_attr__('H1-H6 (default: #10242b).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-text',
                'type'     => 'color',
                'title'    => esc_attr__('Text Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #5c666a).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'description' => '',
                'transparent' => false
            ),
            array(
                'id'       => 'color-ancient1',
                'type'     => 'color',
                'title'    => esc_attr__('Ancient 1 Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #e9563d).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'description' => 'Service hover, Accordion, Toggle border and Some button border color for your site\'s color saturation.',
                'transparent' => false
            ),
            array(
                'id'       => 'color-ancient2',
                'type'     => 'color',
                'title'    => esc_attr__('Ancient 2 Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #67b930).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'description' => 'Active Accordion, Toggle tabs and Comment reply link etc for your site\'s color saturation.',
                'transparent' => false
            ),
            array(
                'id'       => 'color-bodybg',
                'type'     => 'color',
                'title'    => esc_attr__('Body Background Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #ffffff).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-boxedbg',
                'type'     => 'color',
                'title'    => esc_attr__('Outer Boxed Area Background Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #ffffff).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),

            array(
                'id'       => 'color-headerbg',
                'type'     => 'color',
                'title'    => esc_attr__('Header Background Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #ffffff).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-menu',
                'type'     => 'color',
                'title'    => esc_attr__('Menu Text Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #10242b).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-menubarbg',
                'type'     => 'color',
                'title'    => esc_attr__('Menu Bar Background Color', 'consultaid'), 
                'subtitle' => esc_attr__('Related 3rd header style (default: #3db8db).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-topbarbg',
                'type'     => 'color',
                'title'    => esc_attr__('Top Bar Background Color', 'consultaid'), 
                'subtitle' => esc_attr__('Related 4th header style (default: #2d3436).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-submenubg',
                'type'     => 'color',
                'title'    => esc_attr__('Sub Menu Background Color', 'consultaid'), 
                'subtitle' => esc_attr__('Dropdown navigation background color (default: #e9563d).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-submenu',
                'type'     => 'color',
                'title'    => esc_attr__('Sub Menu Text Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #ffffff).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-pagetitle',
                'type'     => 'color',
                'title'    => esc_attr__('Page Title Text Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #).', 'consultaid'),
                'output'   => '.wrapper>.page-title .uk-article-title',
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-footerbg',
                'type'     => 'color',
                'title'    => esc_attr__('Footer Background Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #3db8db).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-footertitle',
                'type'     => 'color',
                'title'    => esc_attr__('Footer Title Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #ffffff).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            array(
                'id'       => 'color-footertext',
                'type'     => 'color',
                'title'    => esc_attr__('Footer Text Color', 'consultaid'), 
                'subtitle' => esc_attr__('Pick a color for the theme (default: #64676a).', 'consultaid'),
                'default'  => '',
                'validate' => 'color',
                'transparent' => false
            ),
            

        )
    ) );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Font', 'consultaid'),
        'id'         => 'font-setting',
        'subsection' => false,
        'icon'  => 'el el-font',
        'fields'     => array(
            array(
                'id'          => 'font-logo',
                'type'        => 'typography', 
                'title'       => esc_attr__('Logo font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-text',
                'type'        => 'typography', 
                'title'       => esc_attr__('Body font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-menu',
                'type'        => 'typography', 
                'title'       => esc_attr__('Menu font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-submenu',
                'type'        => 'typography', 
                'title'       => esc_attr__('Sub menu font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-pagetitle',
                'type'        => 'typography', 
                'title'       => esc_attr__('Page title font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-h1',
                'type'        => 'typography', 
                'title'       => esc_attr__('Heading (H1) font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-h2',
                'type'        => 'typography', 
                'title'       => esc_attr__('Heading (H2) font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-h3',
                'type'        => 'typography', 
                'title'       => esc_attr__('Heading (H3) font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-h4',
                'type'        => 'typography', 
                'title'       => esc_attr__('Heading (H4) font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-h5',
                'type'        => 'typography', 
                'title'       => esc_attr__('Heading (H5) font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-h6',
                'type'        => 'typography', 
                'title'       => esc_attr__('Heading (H6) font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-sidebartitle',
                'type'        => 'typography', 
                'title'       => esc_attr__('Sidebar title font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),
            array(
                'id'          => 'font-footertitle',
                'type'        => 'typography', 
                'title'       => esc_attr__('Footer title font', 'consultaid'),
                'google'      => true,
                'color'       => false,
                'text-align'    => false,
                'all_styles'    => true,
                'font-backup' => true,
                'units'       =>'px',
                'default'     => array(),
            ),

        )
    ) );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Header', 'consultaid'),
        'id'         => 'general-header-setting',
        'subsection' => false,
        'icon'  => 'el el-arrow-up',
        'fields'     => array(
            array(
                'id'       => 'header_layout',
                'type'     => 'image_select',
                'title'    => esc_attr__('Header Layout', 'consultaid'), 
                'options'  => $themeton_header_layouts,
                'default' => 'header-1'
            ),
            array(
                'id'       => 'logo',
                'type'     => 'media', 
                'url'      => true,
                'title'    => esc_attr__('Logo image', 'consultaid'),
                'subtitle' => esc_attr__('Upload your logo image. If you leave it empty, your logo will show as text with your site title.', 'consultaid'),
                'default'  => array(
                    'url'=>get_template_directory_uri().'/images/logo.png'
                ),
            ),
            array(
                'id'       => 'header-height',
                'type'     => 'slider',
                'title'    => esc_attr__('Header Height', 'consultaid'), 
                "default"   => 90,
                "min"       => 0,
                "step"      => 1,
                "max"       => 500,
                'display_value' => 'text'
            ),
            array(
                'id'       => 'header_sticky',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Header sticky', 'consultaid'), 
                'subtitle' => esc_attr__('Stick your header at top of your site when you scroll down.', 'consultaid'),
                'default'  => '0'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'top_email_prefix',
                'type'     => 'text',
                'title'    => esc_attr__('Email address prefix text', 'consultaid'),
                'subtitle' => esc_attr__('Works with only Header layout 1, 3 and 4.', 'consultaid'),
                'default'  => 'EMAIL US : '
            ),
            array(
                'id'       => 'top_email',
                'type'     => 'text',
                'title'    => esc_attr__('Email address', 'consultaid'),
                'subtitle' => esc_attr__('Works with only Header layout 1, 3 and 4.', 'consultaid'),
                'validate' => 'email',
                'msg'      => 'Your mail is wrong. Please check it again.',
                'default'  => 'test@test.com'
            ),
            array(
                'id'       => 'top_phone_prefix',
                'type'     => 'text',
                'title'    => esc_attr__('Phone number prefix text', 'consultaid'),
                'subtitle' => esc_attr__('Works with only Header layout 3 and 4.', 'consultaid'),
                'validate' => 'text',
                'default'  => 'CALL US NOW : '
            ),
            array(
                'id'       => 'top_phone',
                'type'     => 'text',
                'title'    => esc_attr__('Phone number', 'consultaid'),
                'subtitle' => esc_attr__('Works with only Header layout 3 and 4.', 'consultaid'),
                'validate' => 'text',
                'msg'      => 'custom error message',
                'default'  => '+586 958 5545'
            ),

        )
    ) );

    $page_title_elements = array(
        'social' => 'Social links',
        'text_custom'   => 'Custom Text',
        'vline' => 'Dash',
        'hline' => 'Line'
    );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Page title', 'consultaid'),
        'id'         => 'page-title-setting',
        'subsection' => false,
        'icon'  => 'el el-photo',
        'fields'     => array(
            array(
                'id'       => 'page-title-show',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Page Title', 'consultaid'), 
                'subtitle' => esc_attr__('Turn this off (unchecked) if you want to disable page title entirely for default pages include category and archive etc.', 'consultaid'),
                'default'  => '1'
            ),
            array(         
                'id'       => 'background_pagetitle',
                'type'     => 'background',
                'title'    => esc_attr__('Page Title Background', 'consultaid'),
                'output'   => '.wrapper>.page-title',
                'default'  => array(
                    'background-color' => '#3db8db',
                )
            ),

            array(
                'id'       => 'page-title-top',
                'type'     => 'slider',
                'title'    => esc_attr__('Page title top padding', 'consultaid'), 
                "default"   => 90,
                "min"       => 10,
                "step"      => 5,
                "max"       => 300,
                'display_value' => 'text'
            ),
            array(
                'id'       => 'page-title-bottom',
                'type'     => 'slider',
                'title'    => esc_attr__('Page title top padding', 'consultaid'), 
                "default"   => 90,
                "min"       => 10,
                "step"      => 5,
                "max"       => 300,
                'display_value' => 'text'
            ),
            array(
                'id'       => 'customtext_page_title',
                'type'     => 'textarea',
                'title'    => esc_attr__('Custom text', 'consultaid'),
                'subtitle' => esc_attr__('You can allow some links or image markup in this field.', 'consultaid'),
                'default'  => 'Your custom text goes here.'
            ),
            array(
                'id'      => 'page_title',
                'type'    => 'sorter',
                'title'   => 'Page Title Layout Manager',
                'subtitle' => esc_attr__('Please drag and drop your possible elements into your 3 column sections.', 'consultaid'),
                'options' => array(
                    'Left'  => array(
                        'title' => 'Title',
                    ),
                    'Center'  => array(
                    ),
                    'Right'  => array(
                        'breadcrumb' => 'Breadcrumb'
                    ),
                    'Elements' => $page_title_elements
                )
            ),
        )
    ) );

    $footer_row_elements = array(
        'menu' => 'Menu',
        'logo'     => 'Logo',
        'social' => 'Social links',
        'copyright'   => 'Copyright Text',
        'customtext'   => 'Custom Text',
    );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Footer', 'consultaid'),
        'id'         => 'footer-setting',
        'subsection' => false,
        'icon'  => 'el el-arrow-down',
        'fields'     => array(
            array(
                'id'       => 'footer',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Footer Enabled', 'consultaid'), 
                'subtitle' => esc_attr__('Turn this off (unchecked) if you want to disable footer entirely.', 'consultaid'),
                'default'  => '1'
            ),
            array(         
                'id'       => 'background_footer',
                'type'     => 'background',
                'title'    => esc_attr__('Footer Background', 'consultaid'),
                'subtitle' => esc_attr__('Footer background with image, color, etc.', 'consultaid'),
                'output'   => '#footer',
                'background-color' => false,
                'default'  => array()
            ),

            array(
                'id'       => 'footer_logo',
                'type'     => 'media', 
                'url'      => true,
                'title'    => esc_attr__('Footer logo (optional)', 'consultaid'),
                'default'  => array(),
            ),
            array(
                'id'      => 'footer_top',
                'type'    => 'sorter',
                'title'   => 'Footer Top Layout Manager',
                'subtitle' => esc_attr__('Please drag and drop your possible elements into your 3 column sections.', 'consultaid'),
                'options' => array(
                    'Left'  => array(
                    ),
                    'Center'  => array(
                    ),
                    'Right'  => array(
                    ),
                    'Elements' => $footer_row_elements
                )
            ),
            array(
                'id'      => 'footer_columns',
                'type'     => 'image_select',
                'title'    => esc_attr__('Footer Widget Area Layout', 'consultaid'), 
                'subtitle' => esc_attr__('Select footer layout columns.', 'consultaid'),
                'options'  => array(
                    '1'      => array(
                        'alt'   => 'Footer layout',
                        'img'   => ADMIN_IMG_PATH."footer1.png"
                    ),
                    '2'      => array(
                        'alt'   => 'Footer layout',
                        'img'   => ADMIN_IMG_PATH."footer2.png"
                    ),
                    '3'      => array(
                        'alt'   => 'Footer layout',
                        'img'   => ADMIN_IMG_PATH."footer3.png"
                    ),
                    '4'      => array(
                        'alt'   => 'Footer layout',
                        'img'   => ADMIN_IMG_PATH."footer4.png"
                    ),
                    '5'      => array(
                        'alt'   => 'Footer layout',
                        'img'   => ADMIN_IMG_PATH."footer5.png"
                    ),
                    '6'      => array(
                        'alt'   => 'Footer layout',
                        'img'   => ADMIN_IMG_PATH."footer6.png"
                    ),
                    '7'      => array(
                        'alt'   => 'Footer layout',
                        'img'   => ADMIN_IMG_PATH."footer7.png"
                    ),
                ),
                'default' => '7'
            ),
            array(
                'id'      => 'footer_sub',
                'type'    => 'sorter',
                'title'   => 'Sub Footer Layout Manager',
                'subtitle' => esc_attr__('Please drag and drop your possible elements into your 3 column sections.', 'consultaid'),
                'options' => array(
                    'Left'  => array(
                    ),
                    'Center'  => array(
                        'copyright' => 'Copyright text'
                    ),
                    'Right'  => array(
                    ),
                    'Elements' => $footer_row_elements
                )
            ),
            array(
                'id'       => 'copyright',
                'type'     => 'text',
                'title'    => esc_attr__('Copyright text', 'consultaid'),
                'default'  => '2017 &copy; Consult Aid. All rights reserved.'
            ),
            array(
                'id'       => 'customtext',
                'type'     => 'textarea',
                'title'    => esc_attr__('Custom text', 'consultaid'),
                'subtitle' => esc_attr__('You can allow some links or image markup in this field.', 'consultaid'),
                'default'  => 'Your custom text goes here.'
            ),
        )
    ) );


    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Post', 'consultaid'),
        'id'         => 'post-setting',
        'subsection' => false,
        'icon'  => 'el el-book',
        'fields'     => array(
            array(
                'id'       => 'post_featuredimage',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Top featured image', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'default'  => '0'// 1 = on | 0 = off
            ),

            array(
                'id'       => 'post_layout',
                'type'     => 'image_select',
                'title'    => esc_attr__('Post Layout', 'consultaid'), 
                'subtitle' => esc_attr__('Declare default post layout.', 'consultaid'),
                'options'  => array(
                    'right'      => array(
                        'alt'   => 'Right sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-right.png"
                    ),
                    'left'      => array(
                        'alt'   => 'Left sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-left.png"
                    ),
                    'full'      => array(
                        'alt'   => 'No sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-nosidebar.png"
                    ),
                    'dual'      => array(
                        'alt'   => 'Dual sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-dual.png"
                    ),
                ),
                'default' => 'right'
            ),

            array(
                'id'       => 'post_sidebarright',
                'type'     => 'select',
                'title'    => esc_attr__('Post right sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('Declare default right sidebar area.', 'consultaid'),
                'options'  => $sidebars,
                'default'  => 'right-sidebar',
            ),
            array(
                'id'       => 'post_sidebarleft',
                'type'     => 'select',
                'title'    => esc_attr__('Post left sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('Declare default sidebar area.', 'consultaid'),
                'options'  => $sidebars,
                'default'  => 'left-sidebar',
            ),

            array(
                'id'       => 'post_relatedposts',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Related Posts', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'post_relatedpostsnumber',
                'type'     => 'slider',
                'title'    => esc_attr__('Related posts number', 'consultaid'), 
                "default"   => 3,
                "min"       => 2,
                "step"      => 1,
                "max"       => 4,
                'display_value' => 'label'
            ),
            array(
                'id'       => 'post_title_show',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Post title enabled', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'post_featuredimage',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Top featured image', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'post_nextprev',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Next & Previous links', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'post_authorbox',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Author Info Box', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'post_meta',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Post Meta Details', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),

        )
    ) );


    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Page', 'consultaid'),
        'id'         => 'page-setting',
        'subsection' => false,
        'icon'  => 'el el-file',
        'fields'     => array(
            array(
                'id'       => 'page_featuredimage',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Hide top featured image', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '0'// 1 = on | 0 = off
            ),

            array(
                'id'       => 'page_layout',
                'type'     => 'image_select',
                'title'    => esc_attr__('Page Layout', 'consultaid'), 
                'subtitle' => esc_attr__('Declare default page layout.', 'consultaid'),
                'options'  => array(
                    'right'      => array(
                        'alt'   => 'Right sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-right.png"
                    ),
                    'left'      => array(
                        'alt'   => 'Left sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-left.png"
                    ),
                    'full'      => array(
                        'alt'   => 'No sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-nosidebar.png"
                    ),
                    'dual'      => array(
                        'alt'   => 'Dual sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-dual.png"
                    ),
                ),
                'default' => 'full'
            ),
            array(
                'id'       => 'page_sidebarright',
                'type'     => 'select',
                'title'    => esc_attr__('Page right sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('Please select default page left sidebar', 'consultaid'),
                'options'  => $sidebars,
                'default'  => 'right-sidebar',
            ),
            array(
                'id'       => 'page_sidebarleft',
                'type'     => 'select',
                'title'    => esc_attr__('Page left sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('Please select default page left sidebar', 'consultaid'),
                'options'  => $sidebars,
                'default'  => 'left-sidebar',
            ),
            array(
                'id'       => 'page_title_show',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Page title enabled', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'page_featuredimage',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Top featured image', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'page_authorbox',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Author Info Box', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'page_meta',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Page Meta Details', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
        )
    ) );



    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Portfolio', 'consultaid'),
        'id'         => 'portfolio-setting',
        'subsection' => false,
        'icon'  => 'el el-th',
        'fields'     => array(


            array(
                'id'       => 'portfolio_mainpage',
                'type'     => 'select',
                'title'    => esc_attr__('Portfolio Main Page', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
                // Must provide key => value pairs for select options
                'options'  => $of_pages,
                'default'  => '2',
            ),
            array(
                'id'       => 'portfolio_layout',
                'type'     => 'image_select',
                'title'    => esc_attr__('Portfolio Detail Page Layout', 'consultaid'), 
                'subtitle' => esc_attr__('Declare portfolio default layout.', 'consultaid'),
                'options'  => array(
                    'right'      => array(
                        'alt'   => 'Right sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-right.png"
                    ),
                    'left'      => array(
                        'alt'   => 'Left sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-left.png"
                    ),
                    'full'      => array(
                        'alt'   => 'No sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-nosidebar.png"
                    ),
                    'dual'      => array(
                        'alt'   => 'Dual sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-dual.png"
                    ),
                ),
                'default' => 'full'
            ),
            array(
                'id'       => 'portfolio_sidebarright',
                'type'     => 'select',
                'title'    => esc_attr__('Portfolio right sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
                'options'  => $sidebars,
                'default'  => 'right-sidebar',
            ),
            array(
                'id'       => 'portfolio_sidebarleft',
                'type'     => 'select',
                'title'    => esc_attr__('Portfolio left sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
                'options'  => $sidebars,
                'default'  => 'left-sidebar',
            ),

            array(
                'id'       => 'portfolio_relatedportfolios',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Top featured image', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_relatednumber',
                'type'     => 'slider',
                'title'    => esc_attr__('Related portfolios number', 'consultaid'), 
                "default"   => 3,
                "min"       => 2,
                "step"      => 1,
                "max"       => 4,
                'display_value' => 'label'
            ),

            array(
                'id'       => 'portfolio_title_show',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Portfolio singular title enabled', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_featuredimage',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Top featured image', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_socialshare',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Social Shares', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_nextprev',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Next & Previous links', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_authorbox',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Author Info Box', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_meta',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Portfolio Meta Details', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),


            array(
                'id'       => 'portfolio_description',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Portfolio Description', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_openlinkinnewtab',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Portfolio Meta Details', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '0'// 1 = on | 0 = off
            ),
            array(
                'id'       => 'portfolio_categorylayout',
                'type'     => 'image_select',
                'title'    => esc_attr__('Portfolio Category Layout', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
                // Must provide key => value pairs for select options
                'options'  => $blog_layouts,
                'default'  => '2',
            ),

            array(
                'id'       => 'portfolio_excerptlength',
                'type'     => 'slider',
                'title'    => esc_attr__('Excerpt length', 'consultaid'), 
                "default"   => 20,
                "min"       => 0,
                "step"      => 1,
                "max"       => 50,
                'display_value' => 'text',
                "desc"      => 'The number of words.'
            ),
        )
    ) );


    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Archive, Category & Tags Layout', 'consultaid'),
        'id'         => 'archive-setting',
        'subsection' => false,
        'icon'  => 'el el-lines',
        'fields'     => array(

            array(
                'id'       => 'archive_layout',
                'type'     => 'image_select',
                'title'    => esc_attr__('Archive Layout', 'consultaid'), 
                'subtitle' => esc_attr__('Declare archive default layout. Specially for all regular sections including index page and custom taxonomy etc.', 'consultaid'),
                'options'  => array(
                    'right'      => array(
                        'alt'   => 'Right sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-right.png"
                    ),
                    'left'      => array(
                        'alt'   => 'Left sidebar', 
                        'img'   => ADMIN_IMG_PATH."layout-left.png"
                    ),
                    'full'      => array(
                        'alt'   => 'No sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-nosidebar.png"
                    ),
                    'dual'      => array(
                        'alt'   => 'Dual sidebar', 
                        'img'  => ADMIN_IMG_PATH."layout-dual.png"
                    ),
                ),
                'default' => 'right'
            ),
            array(
                'id'       => 'archive_sidebarright',
                'type'     => 'select',
                'title'    => esc_attr__('Archive right sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
                // Must provide key => value pairs for select options
                'options'  => $sidebars,
                'default'  => 'right-sidebar',
            ),
            array(
                'id'       => 'archive_sidebarleft',
                'type'     => 'select',
                'title'    => esc_attr__('Archive left sidebar', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
                // Must provide key => value pairs for select options
                'options'  => $sidebars,
                'default'  => 'left-sidebar',
            ),
            array(
                'id'       => 'archive_style',
                'type'     => 'image_select',
                'title'    => esc_attr__('Archive Posts Style', 'consultaid'), 
                'subtitle' => esc_attr__('Declare archive default style.', 'consultaid'),
                'options'  => $blog_layouts,
                'default' => 'right'
            ),
            array(
                'id'       => 'archive_meta',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Archive Meta Details', 'consultaid'), 
                'subtitle' => esc_attr__('Please turn this off (uncheck) if you want to disable it.', 'consultaid'),
                'default'  => '1'// 1 = on | 0 = off
            ),
        )
    ) );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Sidebar', 'consultaid'),
        'id'         => 'sidebar-setting',
        'subsection' => false,
        'icon'  => 'el el-indent-right',
        'fields'     => array(

            array(
                'id'=>'sidebars',
                'type' => 'multi_text',
                'title' => esc_attr__('Sidebars', 'consultaid'),
                'subtitle' => esc_attr__('Please add your custom sidebars here and insert widgets on Appearance => Widgets. Left and Right sidebars are permanently and won\'t be deleted.', 'consultaid'),
                'default' => array(
                    'left'=>'Left sidebar',
                    'right'=>'Right sidebar'
                ),
            ),

        )
    ) );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Custom CSS', 'consultaid'),
        'id'         => 'customcss-setting',
        'subsection' => false,
        'icon'  => 'el el-css',
        'fields'     => array(

            array(
                'id'=>'custom_css',
                'type' => 'textarea',
                'title' => esc_attr__('Custom CSS', 'consultaid'), 
                'validate' => 'html_custom',
            ),
            array(
                'id'=>'custom_css_tablet',
                'type' => 'textarea',
                'title' => esc_attr__('Custom CSS for Tablet', 'consultaid'), 
                'subtitle' => esc_attr__('Screen and up to 985px.', 'consultaid'),
                'validate' => 'html_custom',
            ),
            array(
                'id'=>'custom_css_phones',
                'type' => 'textarea',
                'title' => esc_attr__('Custom CSS for Phones', 'consultaid'), 
                'subtitle' => esc_attr__('Screen and up to and 767px.', 'consultaid'),
                'validate' => 'html_custom',
            ),
            array(
                'id'=>'custom_css_smallphone',
                'type' => 'textarea',
                'title' => esc_attr__('Custom CSS for Small Phones', 'consultaid'), 
                'subtitle' => esc_attr__('Screen and up to 480px.', 'consultaid'),
                'validate' => 'html_custom',
            ),

        )
    ) );

    Redux::setSection( $opt_name, array(
        'title'      => esc_html__( 'Social Media', 'consultaid'),
        'id'         => 'social-setting',
        'subsection' => false,
        'icon'  => 'el el-globe',
        'fields'     => array(

            array(
                'id'       => 'social_shares',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Social shares', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
             
                //Must provide key => value pairs for multi checkbox options
                'options'  => array(
                    'facebook' => 'Facebook',
                    'twitter' => 'Twitter',
                    'googleplus' => 'Google+',
                    'pinterest' => 'Pinterest',
                    'email' => 'Email'
                ),
             
                //See how default has changed? you also don't need to specify opts that are 0.
                'default' => array(
                    'facebook' => '1',
                    'twitter' => '1',
                    'googleplus' => '1',
                    'pinterest' => '1',
                    'email' => '1'
                )
            ),

            array(
                'id'       => 'social_sharevisibility',
                'type'     => 'checkbox',
                'title'    => esc_attr__('Social shares visibility', 'consultaid'), 
                'subtitle' => esc_attr__('No validation can be done on this field type', 'consultaid'),
                'desc'     => esc_attr__('This is the description field, again good for additional info.', 'consultaid'),
             
                //Must provide key => value pairs for multi checkbox options
                'options'  => array(
                    'posts' => 'On posts',
                    'pages' => 'On pages',
                    'portfolios' => 'On portfolios entries',
                ),
             
                //See how default has changed? you also don't need to specify opts that are 0.
                'default' => array(
                    'posts' => '1',
                    'pages' => '1',
                    'portfolios' => '1',
                )
            ),

            array(
                'id'=>'social_links',
                'type' => 'multi_text',
                'title' => esc_attr__('Social links', 'consultaid'),
                'subtitle' => esc_attr__('Add your social with link address those separated by pipe. Possible options: Blogger, Deviantart, Digg, Dribbble, Dropbox, Facebook, Flickr, Forrst, Google+, Instagram, LinkedIn, Myspace, Paypal, Pinterest, Reddit, RSS, Skype, Soundcloud, Spotify, Tumblr, Twitter, Vimeo, VK, Xing, Yahoo, Yelp, Youtube, Email and Custom link.', 'consultaid'),
                'desc' => esc_attr__('Format: facebook|http://facebook.com/mypage', 'consultaid'),
                'default' => array(
                    'fadebook'=>'facebook|http://facebook.com/mypage',
                    'twitter'=>'twitter|https://twitter.com/mytweets',
                    'behance'=>'linkedIn|https://LinkedIn.com/myprofile'),

            ),


        )
    ) );


    /*
     * <--- END SECTIONS
     */
