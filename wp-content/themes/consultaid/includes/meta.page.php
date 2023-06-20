<?php

if( !class_exists('CurrentThemePageMetas')) {
class CurrentThemePageMetas extends TTRenderMeta{

    function __construct(){
        add_action( 'admin_init', array($this, 'initial_items') );
        add_action( 'admin_enqueue_scripts', array($this, 'print_admin_scripts') );
        add_action( 'add_meta_boxes', array($this, 'add_custom_meta'), 1 );
        add_action( 'edit_post', array($this, 'save_post'), 99 );

        // support svg logo
        $svg_logo_filter = sprintf('%s_%s', 'upload', 'mimes');
        add_filter( $svg_logo_filter, array($this, 'support_svg_logo') );

        add_action('admin_enqueue_scripts', array($this, 'print_elements_icons'));

        // Post Views
        add_filter( 'the_content', array($this, 'content_filter'), 20 );
    }

    // Post Views
    public function content_filter($content){
        if( is_single() ){
            $post_id = get_the_id();
            $post_view = abs(get_post_meta( $post_id, '_post_views', true ));
            $post_view += 1;
            update_post_meta( $post_id, '_post_views', $post_view );
        }

        return $content;
    }

    public function print_elements_icons(){
        wp_enqueue_style('themeton-admin-vc-element-icons', get_template_directory_uri() . '/css/elements-icons.css' );
    }


    public function support_svg_logo($types){
        $types['svg'] = sprintf('%s/%s+%s', 'image', 'svg', 'xml');
        return $types;
    }
    

    public function initial_items(){
        $this->items = $this->items();
    }


    public function get_post_type(){
        global $pagenow;
        if ( 'edit.php' == $pagenow) {
            if ( !isset($_GET['post_type']) ){
                return 'post';
            }
            elseif ( isset($_GET['post_type']) ){
                return $_GET['post_type'];
            }
        }
        if ('post.php' == $pagenow && isset($_GET['post']) ){
            $post_type = get_post_type($_GET['post']);
            return $post_type;
        }

        if ('post-new.php' == $pagenow ){
            if ( !isset($_GET['post_type']) ) {
                return 'post';
            }
            elseif ( isset($_GET['post_type']) ){
                return $_GET['post_type'];
            }
        }   
    }

    public function items(){
        global $post, $themeton_header_layouts;
        $header_layouts = array();

        if(isset($themeton_header_layouts) && is_array($themeton_header_layouts)) {
            foreach($themeton_header_layouts as $key => $layout) {
                $header_layouts[$key] = $layout['img'];
            }
        }
        define('ADMIN_IMAGES', get_template_directory_uri().'/framework/admin-assets/images/');

        $all_post_types = array();
        $data_post_types = TT::get_post_types();
        foreach ($data_post_types as $key => $value) {
            $all_post_types[] = $key;
        }
        $sidebars = Themeton_Std::get_sidebars();

        $post_types = array('post', 'page', 'portfolio');
        $general_options = array();
        $sliders = TT::get_sliders();
        foreach ($post_types as $post_type) {
            $general_options[$post_type] = array(
                array(
                    'name' => 'header',
                    'type' => 'thumbs',
                    'label' => esc_html__('Header Layout Style (optional)', 'consultaid'),
                    'default' => 'default',
                    'option' => array_merge(array('default' => get_template_directory_uri().'/images/header_default.png'), $header_layouts)
                ),
                array(
                    'name' => 'slider',
                    'type' => 'select',
                    'label' => esc_html__('Top Slider', 'consultaid'),
                    'default' => 'noslider',
                    'option' => array_merge(array('noslider' => 'No slider'), $sliders)
                ),

                array(
                    'name' => 'layout',
                    'type' => 'thumbs',
                    'label' => esc_html__('Page Layout', 'consultaid'),
                    'default' => 'default',
                    'option' => array(
                        'default' => ADMIN_IMAGES . 'layout-default.png',
                        'full' => ADMIN_IMAGES . 'layout-nosidebar.png',
                        'right' => ADMIN_IMAGES . 'layout-right.png',
                        'left' => ADMIN_IMAGES . 'layout-left.png',
                        'dual' => ADMIN_IMAGES . 'layout-dual.png',
                    ),
                    'desc' => esc_html__('Select Page Layout. Default value on Theme Options: ', 'consultaid') . Themeton_Std::getopt($post_type.'_layout')
                ),

                array(
                    'name' => 'sidebar_right',
                    'type' => 'select',
                    'label' => esc_html__('Right sidebar', 'consultaid'),
                    'default' => 'noslider',
                    'option' => array_merge(array(
                            'default' => esc_attr__('Default on Theme Options', 'consultaid'),
                        ), $sidebars
                    ),
                    'desc' => esc_html__('Default value on Theme Options: ', 'consultaid') . Themeton_Std::getopt($post_type.'_sidebarright')
                ),
                array(
                    'name' => 'sidebar_left',
                    'type' => 'select',
                    'label' => esc_html__('Left sidebar', 'consultaid'),
                    'default' => 'noslider',
                    'option' => array_merge(array(
                            'default' => esc_attr__('Default on Theme Options', 'consultaid'),
                        ), $sidebars
                    ),
                    'desc' => esc_html__('Default value on Theme Options: ', 'consultaid') . Themeton_Std::getopt($post_type.'_sidebarleft')
                ),

                array(
                    'type' => 'select',
                    'name' => 'page_title',
                    'label' => esc_html__('Page Title Show', 'consultaid'),
                    'desc' => esc_html__('Default value on Theme Options: ', 'consultaid') . ((Themeton_Std::getopt($post_type.'-title-hide') == '1') ? esc_attr__('Show', 'consultaid') : esc_attr__('Hidden', 'consultaid')),
                    'option' => array(
                        'default' => esc_html__('Default', 'consultaid'),
                        '1' => esc_html__('Show', 'consultaid'),
                        '0' => esc_html__('Hide', 'consultaid'),
                    ),
                    'default' => 'default'
                ),
                array(
                    'type' => 'select',
                    'name' => 'featuredimage',
                    'label' => esc_html__('Featured Image Show', 'consultaid'),
                    'desc' => esc_html__('Default value on Theme Options: ', 'consultaid') . ((Themeton_Std::getopt($post_type.'_featuredimage') == '1') ? esc_attr__('Show', 'consultaid') : esc_attr__('Hidden', 'consultaid')),
                    'option' => array(
                        'default' => esc_html__('Default', 'consultaid'),
                        '1' => esc_html__('Show', 'consultaid'),
                        '0' => esc_html__('Hide', 'consultaid'),
                    ),
                    'default' => 'default'
                ),
                array(
                    'type' => 'select',
                    'name' => 'social',
                    'label' => esc_html__('Social Shares Show', 'consultaid'),
                    'desc' => esc_html__('Default value on Theme Options: ', 'consultaid') . ((isset(Themeton_Std::getopt('social_sharevisibility')[$post_type.'s']) && Themeton_Std::getopt('social_sharevisibility')[$post_type.'s'] == '0') ? esc_attr__('Hidden', 'consultaid') : esc_attr__('Show', 'consultaid')),
                    'option' => array(
                        'default' => esc_html__('Default', 'consultaid'),
                        '1' => esc_html__('Show', 'consultaid'),
                        '0' => esc_html__('Hide', 'consultaid'),
                    ),
                    'default' => 'default'
                ),
                array(
                    'type' => 'text',
                    'name' => 'content_top',
                    'label' => esc_html__('Content top padding (optional)', 'consultaid'),
                    'desc' => esc_html__('Number value in pixels. Empty presents default from Theme Options. Default value on Theme Options: ', 'consultaid') . Themeton_Std::getopt('content-top'),
                    'default' => ''
                ),
                array(
                    'type' => 'text',
                    'name' => 'content_bottom',
                    'label' => esc_html__('Content bottom padding (optional)', 'consultaid'),
                    'desc' => esc_html__('Number value in pixels. Empty presents default from Theme Options. Default value on Theme Options: ', 'consultaid') . Themeton_Std::getopt('content-bottom'),
                    'default' => ''
                )

            );
        }

        $tmp_arr = array(
            'page' => array(
                'label' => 'Page Options',
                'post_type' => 'page',
                'items' => array_merge( 
                    array(
                        /*array(
                            'type' => 'checkbox',
                            'name' => 'onepage',
                            'label' => esc_html__('One page option', 'consultaid'),
                            'desc' => esc_html__('Please set your specific rows as one page section in your post content.', 'consultaid'),
                            'default' => '0'
                        )*/
                    ),
                    $general_options['page']
                ),
            ),
            'post' => array(
                'label' => 'Post Options',
                'post_type' => 'post',
                'items' => $general_options['post']
            ),
            'portfolio' => array(
                'label' => 'Portfolio Options',
                'post_type' => 'portfolio',
                'items' => $general_options['portfolio']
            ),

        );

        return $tmp_arr;
    }
    
}
}
new CurrentThemePageMetas();