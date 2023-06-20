<?php

// wp_oembedd media filter
global $wp_embed;
add_filter( 'themeton_media_filter', array( $wp_embed, 'autoembed' ), 8 );


class TPL{

    // Print Sites Logo
    public static function get_logo(){
        $custom_logo = '';
        if( function_exists('get_custom_logo') ){
            $custom_logo = get_custom_logo();
        } else {
            $logo = TT::get_mod('logo');
            if( !empty($logo) ){
                $custom_logo = sprintf( '<a href="%1$s" class="custom-logo-link" rel="home"><img src="%2$s" alt="'.get_bloginfo('name').'" class="custom-logo"></a>',
                    esc_url(home_url('/')),
                    esc_url($logo)
                );
            }
        }
        
        // Logo from Theme Options
        if($custom_logo == '') {
            $logo = Themeton_Std::getopt('logo');
            if( !empty($logo) ){
                if ($logo['url']!='') {
                $custom_logo = sprintf( '<a href="%1$s" class="custom-logo-link" rel="home"><img src="%2$s" alt="%3$s" class="custom-logo"></a>',
                    esc_url(home_url('/')),
                    esc_url($logo['url']),
                    get_bloginfo('name')
                );}
                else {
                    $custom_logo = sprintf( '<a href="%1$s" class="custom-logo-link" rel="home">%2$s</a>',
                        esc_url(home_url('/')),
                        get_bloginfo('name')
                    );
                }
            }
        }

        if( !empty($custom_logo) && strpos($custom_logo, " src=") ){
            $custom_logo = str_replace(' itemprop="url"', '', $custom_logo);
            $custom_logo = str_replace(' itemprop="logo"', '', $custom_logo);
            printf($custom_logo);
        }
        else{
            printf('<a href="%s" rel="home" class="logo-text-link">%s</a>', esc_url(home_url('/')), get_bloginfo('name') );
            $description = get_bloginfo('description', 'display');
            if ( !empty($description) ){
                printf('<p class="site-description uk-hidden">%s</p>', $description);
            }
        }
    }


    // Print custom styles
    public static function inline_styles(){
        global $post;
        
        $custom_css = TT::get_mod('custom_css');
        $custom_css .= TT::get_mod('custom_css_tablet') != '' ?    '@media (min-width: 768px) and (max-width: 985px) { ' . TT::get_mod('custom_css_tablet') . ' }' : '';
        $custom_css .= TT::get_mod('custom_css_widephone') != '' ? '@media (min-width: 481px) and (max-width: 767px) { ' . TT::get_mod('custom_css_widephone') . ' }' : '';
        $custom_css .= TT::get_mod('custom_css_phone') != '' ?     '@media (max-width: 480px) { '                        . TT::get_mod('custom_css_phone') . ' }' : '';
        $custom_css .= TT::get_mod('meta_disable') == '1' ? ' .meta {display:none !important;} ' : '';
        
        $body_bg_style = TT::get_option_bg_value('body_bg_image');
        $custom_css .= ($body_bg_style != '') ? "body.boxed-layout { $body_bg_style } " : '';
        
        return $custom_css;
    }

    public static function inline_script(){
        $cookie = array();
        if( array_key_exists('reactions_of_posts', $_COOKIE) ){
            $cookie = (array)json_decode($_COOKIE['reactions_of_posts']);
        }

        return sprintf('var theme_options = { ajax_url: "%s" };
                        var themeton_reaction_of_posts = %s;',
                        esc_url(admin_url('admin-ajax.php')), json_encode($cookie) );
    }


    public static function build_theme_image_support(){
        add_theme_support('custom-header');
        add_theme_support('custom-background');
        add_editor_style( array('css/editor-style.css') );
    }

    
    public static function get_post_media(){
        global $post;
        $media = '';
        if( has_post_thumbnail() ){
            $thumb_img = wp_get_attachment_image( get_post_thumbnail_id(), 'large' );
            $media = $thumb_img;
        }

        $format = get_post_format();

        if( current_theme_supports('post-formats', $format) ){

            // Image
            if( $format=='image' ){
                if(!has_post_thumbnail()){
            
                    $first_img = '';
                    ob_start();
                    ob_end_clean();
                    $output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
                    $first_img = $matches[1][0];

                    $media ='<div class="image" data-src="'. $first_img .'">
                            <a href="'.get_permalink().'">
                            <img src="'. get_template_directory_uri().'/images/5x3.png" alt="'.get_the_title().'">
                            </a></div>';
                } else {
                    $media = wp_get_attachment_image( get_post_thumbnail_id(), 'large');
                }
            }


            // blockquote
            else if( $format=='quote' ){
                preg_match("/<blockquote>(.*?)<\/blockquote>/msi", get_the_content(), $matches);
                if( isset($matches[0]) && !empty($matches[0]) ){
                    $media = $matches[0];
                    $media = str_replace("<blockquote", "<blockquote class='quote-element'", $media);
                }
            }


            // link
            else if( $format=='link' ){
                preg_match('/<a\s[^>]*href=\"([^\"]*)\"[^>]*>(.*)<\/a>/siU', get_the_content(), $matches);
                if( isset($matches[1],$matches[2]) && !empty($matches[2]) ){
                    $media = "<blockquote class='link-element'>
                                $matches[2]
                                <cite><a href='$matches[1]'>$matches[1]</a></cite>
                              </blockquote>";
                }
            }


            // gallery
            else if( $format=='gallery' && has_shortcode($post->post_content, 'gallery') ){
                $galleryObject = get_post_gallery( get_the_ID(), false );
                $ids = explode(",", isset($galleryObject['ids']) ? $galleryObject['ids'] : "");

                $gallery = '';
                if( $ids == "" || count($ids) < 2) {
                    foreach ($galleryObject['src'] as $key => $value) {
                        $gallery .= "<div class='swiper-slide'><img src='$value' alt='".get_the_title()."'/></div>";
                    }
                } else {
                    foreach ($ids as $gid) {
                        $img = wp_get_attachment_image( $gid, 'thumbnail' );
                        $gallery .= "<div class='swiper-slide'>$img</div>";
                    }
                }


                $media = !empty($gallery) ? "<div class='gallery-slideshow'>
                                                <div class='swiper-container gallery-container'>
                                                    <div class='swiper-wrapper'>$gallery</div>
                                                </div>
                                                <div class='swiper-button-prev'></div>
                                                <div class='swiper-button-next'></div>
                                            </div>" : $media;

                $media = $media;
            }


            // audio
            else if( $format=='audio' ){
                $pattern = get_shortcode_regex();
                preg_match('/'.$pattern.'/s', $post->post_content, $matches);
                if (is_array($matches) && isset($matches[2]) && $matches[2] == 'audio') {
                    $shortcode = $matches[0];
                    $media = '<div class="mejs-wrapper audio">'. do_shortcode($shortcode) . '</div>';
                }
                else{
                    $frame = "frame";
                    $regx = "/<i$frame(.)*<\/i$frame>/msi";
                    preg_match($regx, get_the_content(), $matches);
                    if( isset($matches[0]) && !empty($matches[0]) ){
                        $media = $matches[0];
                    }
                    else{
                        if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                            if(isset($matches[1])) {
                                $media = "<div class='audio-post'>".apply_filters( "themeton_media_filter", $matches[1] )."</div>";
                            }
                        }
                    }
                }
                $media = $media;
            }



            // video
            else if( $format=='video' ){
                if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                    if(isset($matches[1])) {
                        $media = "<div class='video-post'>".apply_filters( "themeton_media_filter", $matches[1] )."</div>";
                    }
                }
            }
            
        }

        return !empty($media) ? "<div class='entry-media'>$media</div>" : "";
    }
    

    public static function get_post_video_url(){
        global $post;

        if( TT::get_mod('video_lightbox_disable') == '1' ) {
            return get_permalink();
        }

        $format = get_post_format();
        if( $format=='video' ){
            if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                if (isset($matches[1]) && !empty($matches[1])) {
                    return $matches[1];
                }
            }
        }
        return '';
    }


    public static function get_author_link_address(){
        global $post;
        return get_author_posts_url(get_the_author_meta('ID'));
    }


     
    public static function pagination( $query=null ) {
         
        global $wp_query;
        $query = $query ? $query : $wp_query;
        $big = 999999999;

        $paginate = paginate_links( array(
            'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
            'type' => 'array',
            'total' => $query->max_num_pages,
            'format' => '?paged=%#%',
            'current' => max( 1, get_query_var('paged') ),
            'prev_text' => '<i class="fa fa-angle-left"></i>',
            'next_text' => '<i class="fa fa-angle-right"></i>',
            )
        );

        $result = '';

        if ($query->max_num_pages > 1) :
            $result .= "<ul class='pagination'>";
            foreach ( $paginate as $page ) {
                $result .= "<li>$page</li>";
            }
            $result .= "</ul>";
        endif;
        
        return $result;
    }


    public static function get_post_image($size = 'full', $ratio = '16x7', $shadow = '', $return_empty = false, $label = '') {
        global $post;
        $thumbnail = $thumb = $media = "";

        if(has_post_thumbnail(get_the_ID())) {
            $thumb_src = wp_get_attachment_image_src(get_post_thumbnail_id(get_the_ID()), $size);
            $thumb = $thumb_src[0];
        } elseif($return_empty == true) {
            return '';
        }

        if ($shadow == 'shadow') $inner_shadow = '<div class="uk-position-cover uk-overlay blog-thumbnail-shadow"></div>';
        else $inner_shadow = '';

        if ($shadow == 'hover') { $class='col-4-thum-hov'; $icon='<div class="uk-position-center"><span class="uk-transition-fade" data-ukicon="plus|2"></span></div>'; }
        else { $class=''; $icon=''; }
        $image = "<img src='".get_template_directory_uri()."/images/dim/$ratio.png' alt='".esc_attr__('Proportion', 'consultaid')."'/>";

        $thumbnail = "<a href='".get_permalink()."'><div class='$class con-image' data-src='".$thumb."'>$image$inner_shadow</div>$icon</a>";

        return $thumbnail;

    }


    public static function getCategories($post_id, $post_type){
        $cats = array();
        $taxonomies = get_object_taxonomies($post_type);
        if( !empty($taxonomies) ){
            $tax = $taxonomies[0];
            if( $post_type=='product' )
                $tax = 'product_cat';
            $terms = wp_get_post_terms($post_id, $tax);
            foreach ($terms as $term){
                $cats[] = array(
                                'term_id' => $term->term_id,
                                'name' => $term->name,
                                'slug' => $term->slug,
                                'link' => get_term_link($term)
                                );
            }
        }

        return $cats;
    }


    public static function get_share_links(){
        global $post;

        $thumb = array();
        if( has_post_thumbnail() ) {
           $thumb = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium'); 
        }
        $social = '';

        $social .= '<a href="http://www.facebook.com/sharer.php?u='.esc_url(get_permalink()).'" target="_blank" title="Facebook"><i class="fa fa-facebook"></i></a>';
        $social .= '<a href="https://twitter.com/share?url='.esc_url(get_permalink()).'&text='.esc_attr(get_the_title()).'" target="_blank"><i class="fa fa-twitter"></i></a>';
        $social .= '<a href="https://plus.google.com/share?url='.esc_url(get_permalink()).'" target="_blank"><i class="fa fa-google-plus"></i></a>';
        $social .= '<a href="https://pinterest.com/pin/create/bookmarklet/?media='.esc_url(isset($thumb[0]) ? $thumb[0] : '').'&url='.esc_url(get_permalink()).'&description='.esc_attr(get_the_title()).'" target="_blank"><i class="fa fa-pinterest"></i></a>';
        $social .= '<a href="#" onclick="window.print();return false;"><i class="fa fa-print"></i></a>'; 

        return $social;
    }

    public static function show_social_share($meta)
    {
        global $themeton_redux;
        $type = '';
        if (is_singular('portfolio')) $type = 'portfolios';
        if (is_single()) $type = 'posts';
        if (is_page()) $type = 'pages';
        if ($meta == 'default') {
            if ($themeton_redux['social_sharevisibility'][$type]==1) return true;
            else return false;
        }
        else {
            if ($meta == 1) return true;
            else return false;
        }
    }


    public static function get_social_links($print = true){
        $social_fb = TT::get_mod('social_fb');
        $social_tw = TT::get_mod('social_tw');
        $social_gp = TT::get_mod('social_gp');
        $social_vm = TT::get_mod('social_vm');
        $social_yt = TT::get_mod('social_yt');
        $social_ln = TT::get_mod('social_ln');
        $social_in = TT::get_mod('social_in');

        $result = '';
        
        if( !empty($social_fb) ){
            $result .= '<a href="'.esc_attr($social_fb).'"><i class="fa fa-facebook"></i></a>';
        }
        if( !empty($social_tw) ){
            $result .= '<a href="'.esc_attr($social_tw).'"><i class="fa fa-twitter"></i></a>';
        }
        if( !empty($social_gp) ){
            $result .= '<a href="'.esc_attr($social_gp).'"><i class="fa fa-google-plus"></i></a>';
        }
        if( !empty($social_vm) ){
            $result .= '<a href="'.esc_attr($social_vm).'"><i class="fa fa-vimeo"></i></a>';
        }
        if( !empty($social_yt) ){
            $result .= '<a href="'.esc_attr($social_yt).'"><i class="fa fa-youtube"></i></a>';
        }
        if( !empty($social_ln) ){
            $result .= '<a href="'.esc_attr($social_ln).'"><i class="fa fa-linkedin"></i></a>';
        }
        if( !empty($social_in) ){
            $result .= '<a href="'.esc_attr($social_in).'"><i class="fa fa-instagram"></i></a>';
        }

        if( $print ){
            printf($result);
        }
        else{
            return $result;
        }
    }


    public static function get_related_posts( $options=array() ){
        $options = array_merge(array(
                    'per_page'=>'6'
                    ),
                    $options);

        global $post;

        $args = array(
            'post__not_in' => array($post->ID),
            'posts_per_page' => $options['per_page']
        );
        $post_type_class = 'blog';

        $categories = get_the_category($post->ID);
        if ($categories) {
            $category_ids = array();
            foreach ($categories as $individual_category) {
                $category_ids[] = $individual_category->term_id;
            }
            $args['category__in'] = $category_ids;
        }

        if(isset($args)) {
            $my_query = new wp_query($args);
            if ($my_query->have_posts()) {

                $html = '';
                $index = 0;
                while ($my_query->have_posts()) {
                    $my_query->the_post();

                    $thumb = '';
                    if( has_post_thumbnail() ){
                        $thumb = "<a href='".get_permalink()."'>" . wp_get_attachment_image(get_post_thumbnail_id(), 'press-grid-image-medium') . "</a>";
                    }
                    
                    $html .= "<div class='related-post-item'>
                                $thumb
                                <h4><a href='".get_permalink()."'>".get_the_title()."</a></h4>
                                <div class='entry-date'>".get_the_date()."</div>
                            </div>";
                }


                $html = "<div class='related-posts'>
                            <h5 class='widget-title'>".esc_html__('Related Posts', 'consultaid')."</h5>
                            $html
                        </div>";

                return $html;
                
            }
        }
        
        wp_reset_postdata();

        return '';
    }

    

    public static function clear_urls($content){
        $pattern = "/(?i)\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?]))/";
        $content = preg_replace($pattern, "", $content);
        return trim( $content );
    }



    public static function get_page_title(){
        global $post;
        $title = '';
        if( function_exists('is_shop') && is_shop() ):
            $title = esc_html__('Shop', 'consultaid');
        elseif( function_exists('is_shop') && is_product() ):
            $title = esc_html__('Shop Details', 'consultaid');
        elseif( is_archive() ):
            if(function_exists('the_archive_title')) :
                $title = get_the_archive_title();
            else:
                $title = sprintf( wp_kses( esc_html__('Category: %s', 'consultaid'), array('span'=>array()) ), single_cat_title( '', false ) );
            endif;

        elseif( is_search() ):
            $title = sprintf( wp_kses( esc_html__('For: %s', 'consultaid'), array('span'=>array()) ), get_search_query() );
        elseif( is_singular('portfolio') ):
            $title = get_the_title();
        elseif( is_single() ):
            $title = get_the_title();
        elseif( is_front_page() || is_home() ):
            if( is_home() ):
                $title = esc_html__('Blog', 'consultaid');
            elseif( get_query_var('post_type')=='portfolio' ):
                $title = esc_html__('Projects', 'consultaid');
            elseif( !is_front_page() && is_home() ):
                $reading_blog_page = get_option('page_for_posts');
                $po = get_post($reading_blog_page);
                $title = apply_filters('the_title', $po->post_title);
            else:
                $title = esc_html__('Home', 'consultaid');
            endif;
        elseif( is_404() ):
            $title = esc_html__('404 Page', 'consultaid');
        else:
            $title = get_the_title();
        endif;

        return $title;
    }

    public static function get_bar_element($value,$section) {
        global $themeton_redux;

        if ($value != 'placebo') {
            if ($value == 'Menu') {
                             wp_nav_menu( array(
                                'menu_class'        => 'uk-navbar-nav',
                                'theme_location'    => 'footer_menu',
                                'container'         => '',
                                'fallback_cb'       => '',
                                'depth'             => 1,
                            ) );
            }
            if ($value == 'Logo') {
                if ($themeton_redux['footer_logo']['url'] != '') {
                    printf('<a href="%s"><img src="%s" alt="%s"></a>', esc_url(home_url('/')), $themeton_redux['footer_logo']['url'], get_bloginfo('name'));
                }
                else{
                    printf('<a href="%s" class="footer-logo"><h1>%s</h1></a>', esc_url(home_url('/')), get_bloginfo('name'));
                } 
            }

            if ($value == 'Social links') {
                $socail_list = $themeton_redux['social_links'];
                echo "<div class='widget widget_social'>";
                foreach ($socail_list as $seo) {
                    $seo_data = explode('|', $seo);
                    printf('<a href="%s"><i class="fa fa-%s"></i></a>',$seo_data[1],strtolower($seo_data[0]));
                }
                echo "</div>";
            }

            if ($value == 'Copyright Text')  printf("<span class='copyright-text'>".$themeton_redux['copyright']."</span>"); 

            if ($value == 'Custom Text') printf("<span class='custom-text'>".$themeton_redux['customtext']."</span>");

            if ($value == 'Line') print_r('<hr class="line">');

            if ($value == 'Dash') print_r('<div class="dash"></div>');

            if ($value == 'Breadcrumb') themeton_breadcrumb();

            if ($value == 'Title') printf("<h1 class='uk-article-title'>%s</h1>",TPL::get_page_title());
        }
    }
/*-----------SHORTCODE TESTER-----------*/
    public static function generate_shortcode ()
    {
        $variable = WPBMap::getAllShortCodes();
        ?>
        <form method="POST">
        <select name="vc_element">
        <option value="Default">--- Select Your Element ---</option>
        <?php
        foreach ($variable as $key => $value) {
            if (isset($value['category'])) { 
                if ($value['category'] == 'Consult aid' ) {
                    ?>
                    <option value="<?php echo esc_attr($value['base']); ?>"><?php echo esc_attr($value['name']); ?></option>
                    <?php
                }
            }
        }
        ?>
        </select>
        <input type="number" name="colnum" placeholder="Insert Column number">
        <input class="uk-button uk-button-default" style="padding: 0px 10px;" type="submit" value="Test" name="vc_element_test" />
        </form>
        <hr>
        <div style="margin-bottom: 50px;"></div>
        <?php
        if (isset($_POST['vc_element_test']) && $_POST['vc_element'] != 'Default') { 

            $base = $variable[$_POST['vc_element']]['base'];

            $item = $variable[$_POST['vc_element']];

            $result =  $singular = '';

            foreach((array)$item['params'] as $attr) {
                if( isset($attr['value']) && !is_array($attr['value'])) {
                    $singular .= $attr['param_name']."='".$attr['value']."' ";
                }
                else $singular .= $attr['param_name']."='Default' ";
            }

            $variations['singular'] = $singular;
            $plural = array();
            
            foreach((array)$item['params'] as $attr) {
                if( isset($attr['value']) && is_array($attr['value']) && $attr['param_name']!='textcolor') {
                    foreach($attr['value'] as $val) {
                        $plural[$attr['param_name']][] = $val;
                    }
                }
            }
            $newarray = array();
            foreach ($plural as $key => $value) {
                foreach($value as $val) {
                    foreach($variations as $inside) {
                        $newarray[] = "$inside $key='$val' ";
                    }
                }
                $variations = $newarray;
                $newarray = array();
            }
            $i = $j = 0;
            foreach($variations as $shortcode) {
                if (isset($_POST['colnum'])) {
                    if ($_POST['colnum']==1) $col = '6/6';
                    else $col = '1/'.$_POST['colnum'];
                }
                else $col = '6/6';
                if($i%4==0) {$result .= '[vc_row]';}
                $i++;
                $result .= '[vc_column width="'.$col.'"]';
                $result .= "[$base $singular $shortcode]";
                $result .= '[/vc_column]';
                if($i%4==0) {$result .= '[/vc_row]';}
            }
        }
        // Update post 37
        global $post;
        if (isset($result))
        {
        $my_post = array(
          'ID'           => $post->ID,
          'post_content' => $result,
        );
        wp_update_post( $my_post );
        header("Location:".get_the_permalink()."");
        }
        // Update the post into the database
    }


    public static function social_share_button() {
        global $themeton_redux;
        $share = $themeton_redux['social_shares'];
        $title = esc_url(get_the_permalink());
        $share_button = array( 
                    'facebook' => array('url' => 'https://www.facebook.com/sharer.php?url='.$title ,
                                        'icon' => 'fa fa-facebook-square' ),
                    'twitter' => array('url' => 'https://twitter.com/share?url='.$title ,
                                       'icon' => 'fa fa-twitter-square' ),
                    'googleplus' => array('url' => 'https://plus.google.com/share?url='.$title,
                                          'icon' => 'fa fa-google-plus-square' ),
                    'pinterest' => array('url' => "http://pinterest.com/pin/create/button/?url=".$title."&media=".esc_url(wp_get_attachment_image_src(get_post_thumbnail_id())[0])."&description=".esc_url(get_the_excerpt()),
                                         'icon' => 'fa fa-pinterest-square' ),
                    'email' => array('url' => 'mailto:?subject='.esc_url(get_the_title()).'&body='.$title,
                                         'icon' => 'fa fa-envelope' ) 
            );
        $output = '<div class="share_button">Share : ';
        foreach ($share as $key => $value) {
            if ($value==1) $output .= '<a href="'.$share_button[$key]['url'].'" target="_blank"><i class="post-share-'.$key.' '.$share_button[$key]['icon'].'"></i></a>'; 
        }
        $output .="</div>";
        print $output;
    }

    public static function get_builder_bar($section = 'footer_top') {
        global $themeton_redux;
        
        $count = 3; $check = 0; $line = 0;
        $columns = array('Left', 'Center', 'Right');
        $column_classes = array('con-bar-column', 'con-bar-column uk-text-center', 'con-bar-column uk-text-right');

        $nullcheck = array('Left' => 0, 'Center' => 0, 'Right' => 0);

        foreach ($nullcheck as $key => $value) {

            if (count($themeton_redux[$section][$key]) == 0) {
                $nullcheck[$key] = 1; $line++;
            }
            else {
                if (count($themeton_redux[$section][$key]) == 1) {
                    if (isset($themeton_redux[$section][$key]['placebo'])) if ($themeton_redux[$section][$key]['placebo']=='placebo') { $nullcheck[$key] = 1; $line++; }
                }
            }

        }

        if ($line!=3) printf('<div class="uk-grid-collapse uk-grid uk-flex-middle %s">',$section);
                 else printf('<div class="uk-grid-collapse uk-grid uk-flex-middle">');
                 
        for ($j = 0; $j < 3; $j++) {
            $array = $themeton_redux[$section][$columns[$j]];

            if ($nullcheck['Center']==1 && $nullcheck['Left']==0 && $nullcheck['Right']==0) { 
                $count = 2;
                $class = 'uk-width-1-'.$count.'@m';
                $check = 1;
                if ($columns[$j]=='Left' || $columns[$j]=='Right'){
                    ?>
                    <div class="<?php echo esc_attr($class.' '.$column_classes[$j]); ?>">
                        <?php
                        foreach ($array as $value) {
                            TPL::get_bar_element($value,$section);
                        }
                        ?>
                    </div>
                    <?php
                }
            }

            if ($nullcheck['Center']==0 && $nullcheck['Left']==1 && $nullcheck['Right']==1) { 
                $count = 1;
                $class = 'uk-width-1-'.$count.'@m';
                $check = 1;
                if ($columns[$j]=='Center'){
                    ?>
                    <div class="<?php echo esc_attr($class.' '.$column_classes[$j]); ?>">
                        <?php
                        foreach ($array as $value) {
                            TPL::get_bar_element($value,$section);
                        }
                        ?>
                    </div>
                    <?php
                }
            }

            if ($nullcheck['Center']==1 && $nullcheck['Left']==0 && $nullcheck['Right']==1) { 
                $count = 1;
                $class = 'uk-width-1-'.$count.'@m';
                $check = 1;
                if ($columns[$j]=='Left'){
                    ?>
                    <div class="<?php echo esc_attr($class.' '.$column_classes[$j]); ?>">
                        <?php
                        foreach ($array as $value) {
                            TPL::get_bar_element($value,$section);
                        }
                        ?>
                    </div>
                    <?php
                }
            }

            if ($nullcheck['Center']==1 && $nullcheck['Left']==1 && $nullcheck['Right']==0) { 
                $count = 1;
                $class = 'uk-width-1-'.$count.'@m';
                $check = 1;
                if ($columns[$j]=='Right'){
                    ?>
                    <div class="<?php echo esc_attr($class.' '.$column_classes[$j]); ?>">
                        <?php
                        foreach ($array as $value) {
                            TPL::get_bar_element($value,$section);
                        }
                        ?>
                    </div>
                    <?php
                }
            }

            if ($check == 0) {
                $class = 'uk-width-1-3@m';
                ?>
                <div class="<?php echo esc_attr($class.' '.$column_classes[$j]); ?>">
                    <?php
                    foreach ($array as $value) {
                        TPL::get_bar_element($value,$section);
                    }
                    ?>
                </div>
                <?php
            }

        }
        echo '</div><!-- end .uk-grid-collapse -->';
    }
    

    public static function get_sidebar_layout($position = 'right') {

        global $post, $themeton_sidebar;

        // Identifying sidebar position
        $sidebar_class = array();

        if($position == 'left') {
            $sidebar_class[] = 'uk-flex-first';
        }

        // Declaring default sidebar options
        $sidebar_width = 'uk-width-1-4@m';
        $sidebar_id = $position.'-sidebar';

        // Checking sidebar options
        $prefix = $themeton_sidebar;
        if( isset($themeton_sidebar) && !empty($themeton_sidebar) ){
            if($themeton_sidebar == 'archive') {

                $layout = Themeton_Std::getopt('archive_layout');
                $sidebar_id = Themeton_Std::getopt($prefix.'_sidebar'.$position);

            } else if( is_singular() ) {
                $layout = Themeton_Std::getmeta('layout');
                if( !isset($layout) || $layout == '' || $layout == 'default') {
                    $layout = Themeton_Std::getopt($prefix.'_layout');
                }
                $sidebar_id = Themeton_Std::getmeta('sidebar_'.$position);
                if( !isset($sidebar_id) || $sidebar_id == '' || $sidebar_id == 'default') {
                    $sidebar_id = Themeton_Std::getopt($prefix.'_sidebar'.$position);
                }
            }

            if($layout == 'dual') {
                $sidebar_width = 'uk-width-1-5@m';
            }
        }

        $sidebar_class = array_merge(array($sidebar_width, '', 'sidebar'), $sidebar_class);
        $sidebar_class[] = "area-" . $sidebar_id;

        $sidebar_class = implode(' ', $sidebar_class);
        ?>

        <div class="<?php echo esc_attr($sidebar_class); ?>">
            <div class="entry-sidebar theiaStickySidebar">
                <?php
                if ( is_active_sidebar( $sidebar_id ) ) :
                    dynamic_sidebar($sidebar_id);
                endif;
                ?>
            </div>
        </div>
        <?php
    }
}