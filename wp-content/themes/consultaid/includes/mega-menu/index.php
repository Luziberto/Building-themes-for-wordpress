<?php

if( !class_exists('Walker_Nav_Menu_Edit') ){
    require_once ABSPATH . 'wp-admin/includes/class-walker-nav-menu-edit.php';
}

class Walker_Themeton_Nav_Menu_Mega extends Walker_Nav_Menu_Edit  {

    public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
        $item_id = esc_attr($item->ID);
        $walker = new Walker_Nav_Menu_Edit();
        $walker->start_el( $item_output, $item, $depth, $args, $id);

        $custom_html = '<p class="field-activemega description description-wide">
                            <label for="edit-menu-item-activemega-'.esc_attr($item_id).'">
                                <input type="checkbox" id="edit-menu-item-activemega-'.esc_attr($item_id).'" class="widefat code edit-menu-item-activemega" value="1" '.esc_attr($item->activemega=='1' ? 'checked' : '').' onchange="javascript: jQuery(this).parent().find(\'input[type=hidden]\').val( this.checked ? \'1\' : \'\' );" />
                                <input type="hidden" name="menu-item-activemega['.esc_attr($item_id).']" value="'.esc_attr($item->activemega).'" />
                                '.esc_html__('Active Mega Menu', 'consultaid').'
                            </label>
                        </p>
                        <p class="field-vsubmenu description description-wide">
                            <label for="edit-menu-item-vsubmenu-'.esc_attr($item_id).'">
                                <input type="checkbox" id="edit-menu-item-vsubmenu-'.esc_attr($item_id).'" class="widefat code edit-menu-item-vsubmenu" value="1" '.esc_attr($item->vsubmenu==='1' ? 'checked' : '').' onchange="javascript: jQuery(this).parent().find(\'input[type=hidden]\').val( this.checked ? \'1\' : \'\' );" />
                                <input type="hidden" name="menu-item-vsubmenu['.esc_attr($item_id).']" value="'.esc_attr($item->vsubmenu).'" />
                                '.esc_html__('Vertical Submenu for Mega menu', 'consultaid').'
                            </label>
                        </p>
                        <script type="text/javascript">
                            if( typeof initMenuFields == "function" ){
                                initMenuFields();
                            }
                        </script>';

        $output .= str_replace('<div class="menu-item-actions description-wide submitbox">', $custom_html . '<div class="menu-item-actions description-wide submitbox">', $item_output);
    }
}



class Themeton_Mega_Menu{

    public $custom_fields = array(
            'activemega',
            'vsubmenu'
        );

    function __construct(){
        add_filter('wp_edit_nav_menu_walker', array($this, 'edit_nav_menu_walker'), 10, 2);
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));

        add_filter('wp_setup_nav_menu_item', array($this, 'setup_nav_menu_item'));
        add_action('wp_update_nav_menu_item', array($this, 'update_nav_menu_item'), 10, 3);

        add_filter('walker_nav_menu_start_el', array($this, 'custom_walker_nav_menu_start_el'), 10, 4);
        add_filter('nav_menu_css_class', array($this, 'custom_nav_menu_css_class'), 10, 4);
    }

    public function edit_nav_menu_walker($walker, $menu_id) {
        return 'Walker_Themeton_Nav_Menu_Mega';
    }

    public function enqueue_scripts($hook) {
        if( $hook!='nav-menus.php' ){
            return;
        }

        if(function_exists( 'wp_enqueue_media' )){
            wp_enqueue_media();
        }
        wp_enqueue_style( 'themeton-mega-menu-style', get_template_directory_uri() . '/includes/mega-menu/admin-style.css' );
        wp_enqueue_script('themeton-mega-menu-script', get_template_directory_uri().'/includes/mega-menu/admin-script.js', array('jquery'), false, true);
    }

    
    public function setup_nav_menu_item($menu_item) {
        foreach ($this->custom_fields as $field){
            $menu_item->$field = get_post_meta( $menu_item->ID, "_menu_item_$field", true );
        }
        return $menu_item;
    }
    public function update_nav_menu_item($menu_id, $menu_item_db_id, $args ) {
        foreach ($this->custom_fields as $field){
            if ( isset($_REQUEST["menu-item-$field"]) && is_array($_REQUEST["menu-item-$field"]) ) {
                $items = $_REQUEST["menu-item-$field"];
                $custom_value = $items[$menu_item_db_id];
                update_post_meta( $menu_item_db_id, "_menu_item_$field", $custom_value );
            }
        }
    }

    // menu item print start element
    public function custom_walker_nav_menu_start_el( $item_output, $item, $depth, $args ){
        if( isset($args->theme_location) && $args->theme_location=='primary' && $depth==1 ){
            $parent_mega = get_post_meta($item->menu_item_parent, '_menu_item_activemega', true);
            if( $parent_mega=='1' && $item->object=='category' ){
                $vsubmenu = get_post_meta($item->menu_item_parent, '_menu_item_vsubmenu', true);
                if( $vsubmenu=='1' ){
                    $args = array(
                        'post_type' => 'post',
                        'cat' => $item->object_id,
                        'posts_per_page' => 7,
                        'ignore_sticky_posts' => true
                    );
                    $col_1 = '';
                    $col_2 = '';
                    $col_3 = '';
                    $post_index = 0;
                    $mega_menu_query = new WP_Query($args);
                    while ( $mega_menu_query->have_posts() ){
                        $mega_menu_query->the_post();
                        global $post;
                        $post_index++;

                        $author = get_the_author_meta( 'display_name', $post->post_author );
                        $date = human_time_diff( get_the_time('U'), current_time('timestamp') );
                        $date = sprintf('%s %s', $date, esc_html__('ago', 'consultaid'));
                        $excerpt = TPL::clear_urls(wp_trim_words( wp_strip_all_tags(do_shortcode(get_the_content())), 8 ));

                        if( $post_index==1 ){
                            $thumb = '';
                            if( has_post_thumbnail() ){
                                $img_src = wp_get_attachment_image_src(get_post_thumbnail_id(), 'large');
                                $img_src = !empty($img_src) ? $img_src[0] : '';
                                $play_link = TPL::get_post_video_url();
                                $play_link = !empty($play_link) ? sprintf('<a class="video-player" href="%s"></a>', esc_url($play_link)) : '';

                                $thumb = sprintf('<div class="image video-frame" style="background-image:url(%s);">
                                                    <img src="%s/images/5x3.png" alt="'.esc_attr__('Proportion', 'consultaid').'">
                                                    %s
                                                </div>', esc_url($img_src), get_template_directory_uri(), $play_link);
                            }
                            
                            $col_2 .= sprintf( '<div class="post ps-large">
                                                    %s
                                                    <div class="meta">
                                                        <span class="author">%s</span>
                                                        <span class="date">%s</span>
                                                    </div>
                                                    <h4><a href="%s">%s</a></h4>
                                                    <p>%s</p>
                                                </div>',
                                                $thumb, $author, $date, get_permalink(), get_the_title(), $excerpt );
                        }
                        elseif( $post_index>1 && $post_index<=3 ){
                            $col_1 .= sprintf( '<div class="post ps-medium">
                                                    <div class="meta">
                                                        <span class="author">%s</span>
                                                        <span class="date">%s</span>
                                                    </div>
                                                    <h4><a href="%s">%s</a></h4>
                                                    <p>%s</p>
                                                </div>',
                                                $author, $date, get_permalink(), get_the_title(), $excerpt);
                        }
                        else{
                            $col_3 .= sprintf( '<div class="post ps-small">
                                                    <p><a href="%s">%s</a></p>
                                                </div>', get_permalink(), get_the_title() );
                        }
                    }
                    wp_reset_postdata();

                    $_html = sprintf(   '<div class="uk-width-1-3@1 uk-width-1-4@m mega-menu-column">%s</div>
                                        <div class="uk-width-1-3@1 uk-width-1-2@m mega-menu-column">%s</div>
                                        <div class="uk-width-1-3@1 uk-width-1-4@m mega-menu-column">
                                            <h4 class="mega-title">%s</h4>%s
                                        </div>', $col_1, $col_2, esc_html__('More', 'consultaid'), $col_3);

                    $item_output .= sprintf('<div class="mega-menu-hd uk-grid">%s</div>', $_html);
                }
                else{
                    $args = array(
                        'post_type' => 'post',
                        'cat' => $item->object_id,
                        'posts_per_page' => 4,
                        'ignore_sticky_posts' => true
                    );
                    $menu_content = '';
                    $mega_menu_query = new WP_Query($args);
                    while ( $mega_menu_query->have_posts() ) {
                        $mega_menu_query->the_post();
                        global $post;

                        $author = get_the_author_meta( 'display_name', $post->post_author );
                        $date = human_time_diff( get_the_time('U'), current_time('timestamp') );
                        $date = sprintf('%s %s', $date, esc_html__('ago', 'consultaid'));
                        $excerpt = TPL::clear_urls(wp_trim_words( wp_strip_all_tags(do_shortcode(get_the_content())), 8 ));

                        $video = TPL::get_post_video_url();
                        if( !empty($video) && has_post_thumbnail() ){
                            $img_src = wp_get_attachment_image_src(get_post_thumbnail_id(), 'large');
                            $img_src = !empty($img_src) ? $img_src[0] : '';
                            $_html = '<div class="uk-width-1-2@1 uk-width-1-4@m mega-menu-column">
                                        <div class="post ps-large">
                                            <div class="image video-frame" data-src="%s">
                                                <img src="%s/images/5x3.png" alt="'.esc_attr__('Proportion', 'consultaid').'">
                                                <a class="video-player video-player-small" href="%s"></a>
                                            </div>
                                            <h4><a href="%s">%s</a></h4>
                                        </div>
                                    </div>';

                            $menu_content .= sprintf( $_html, esc_url($img_src), get_template_directory_uri(), $video, get_permalink(), get_the_title() );
                        }
                        else{
                            $_html = '<div class="uk-width-1-2@1 uk-width-1-4@m mega-menu-column">
                                            <div class="post ps-medium">
                                                <div class="meta">
                                                    <span class="author">%1$s</span>
                                                    <span class="date">%2$s</span>
                                                </div>
                                                <h4><a href="%3$s">%4$s</a></h4>
                                                <p>%5$s</p>
                                            </div>
                                        </div>';

                            $menu_content .= sprintf( $_html, $author, $date, get_permalink(), get_the_title(), $excerpt );
                        }
                        
                    }
                    wp_reset_postdata();

                    $item_output .= sprintf('<div class="mega-menu-hd uk-grid">%s</div>', $menu_content);
                }
                return $item_output;
            }
        }
        return $item_output;
    }

    // menu item class filter
    public function custom_nav_menu_css_class( $classes, $item, $args, $depth ){
        if( isset($args->theme_location) && $args->theme_location=='primary' && $depth==0 ){
            $parent_mega = get_post_meta($item->ID, '_menu_item_activemega', true);
            if( $parent_mega=='1' ){
                $vsubmenu = get_post_meta($item->ID, '_menu_item_vsubmenu', true);
                if( $vsubmenu=='1' ){
                    $classes[] = 'menu-item-mega';
                }
                else{
                    $classes[] = 'menu-item-mega';
                    $classes[] = 'mm-medium';
                }
            }
        }
        return $classes;
    }

}

if( class_exists('Walker_Nav_Menu') ){
    new Themeton_Mega_Menu();
}


?>