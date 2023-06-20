<?php
if (!class_exists('WPBakeryShortCode_completed_projects')) {
class WPBakeryShortCode_completed_projects extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'count' => '3',
            'layout' => 'standard',
            'metastyle' => 'with-title',
            'bullet' => 'yes',
            'bullets_style' => 'circle',
            'bullets_position' => 'bottom',
            'categories' => '',
            'excerpt_length'  => '12',
            'title_position'=>'bottom',
            'extra_class' => '',
        ), $atts));

        $extra_class = esc_attr($extra_class);
        // Build category ids
        global $paged;
        if( is_front_page() ){
            $paged = get_query_var('page') ? get_query_var('page') : 1;
        }
        // build category ids
        $cats = array();
        if( !empty($categories) ){
            $exps = explode(",", $categories);
            foreach($exps as $val){
                if( (int)$val>-1 ){
                    $cats[]=(int)$val;
                }
            }
        }
        // build query
        $args = array(
                        'post_type' => 'portfolio',
                        'posts_per_page' => $count,
                        'ignore_sticky_posts' => true,
                        'paged' => $paged
                    );
        if(!empty($cats)){
            $args['tax_query'] = array(
                                        'relation' => 'IN',
                                        array(
                                            'taxonomy' => 'portfolio_entries',
                                            'field' => 'id',
                                            'terms' => $cats
                                        )
                                    );
        }

        $cat_array = array();
        $items = '';
        $grid_class = '';
        $wrapperjsclass = '';

        $imgsize = $layout == 'featured' ? 'large': 'consultaid-project-thumb';
        $posts_query = new WP_Query($args);
        while ( $posts_query->have_posts() ) {
            $posts_query->the_post();
            $excerpt = '';
            if(has_excerpt()) {
                $excerpt = get_the_excerpt();
            } else {
                $excerpt = TPL::clear_urls( wp_trim_words( wp_strip_all_tags(strip_shortcodes(get_the_content())), $excerpt_length ) );
            }
            $img = '';
            $thumb = '';
            if( has_post_thumbnail() ){
                $thumb = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'large' );
                $img = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'consultaid-project-thumb' );
                $img = !empty($img) ? $img[0] : '';
                $thumb = !empty($thumb) ? $thumb[0] : '';
            }
            // Categories
            $cat_titles = array();
            $cat_title = '';
            $terms = wp_get_post_terms(get_the_ID(), 'portfolio_entries');
            foreach ($terms as $term){
                if (isset($term->name)) $cat_title = $term->name;
                if (isset($term->slug)) $cat_slug = $term->slug;
                $cat_titles []= $cat_title;
            }        
            // title
            $nohover = $bg_color = $meta_html = ''; 
            if($metastyle =='with-title'){
                $wrapperjsclass = 'swiper-container-project';
                $meta_html.="<a href='".get_the_permalink()."'>
                                <div class='con-meta'>
                                    <h3>".get_the_title()."</h3>
                                    <p>$cat_title</p>
                                </div>
                            </a>";
            }elseif($metastyle =='with-except'){
                $bg_color.="brand-color";
                $wrapperjsclass = 'swiper-container-project';
                $meta_html.="<a href='".get_the_permalink()."'>
                                        <div class='con-meta'>
                                            <i>".get_the_date()."</i>
                                            <p class='excerpt_text'>$excerpt</p>
                                        </div>
                                    </a>";
            }else{
                $wrapperjsclass = 'swiper-container-project-completed';
                $nohover .="nohover";
                $meta_html .=  "<div class='con-meta uk-flex uk-flex-center'>
                                    <div class='uk-width-4-5'>
                                        <h3><a href='".get_the_permalink()."' class='projectlink'>".get_the_title()."</a></h3>
                                        <p>$cat_title</p>
                                    </div>
                                    <div><a href='".get_the_permalink()."' class='more_btn'>
                                        <i class='fa fa-angle-right uk-button-circle uk-border-cirle' aria-hidden='true'></i></a>
                                    </div>
                                </div>";
            }

            if($layout!='feautured'){
                $items.="<div class='swiper-slide'>
                            <div class='project-item uk-box-shadow-small uk-card-hover' >
                                <a href='".get_the_permalink()."'>
                                    <div class='feature-image' data-bg-image='".$img."'> 
                                    </div>
                                </a>
                                <div class='project-meta ".$bg_color." ".$nohover."' >
                                    ".$meta_html."
                                </div>
                            </div>
                        </div>";
            }else{
                $items.="<div class='swiper-slide'>
                            <a href='".get_the_permalink()."'>
                                <div class='project-feautured-item' data-bg-image='".$thumb."'>
                                        <div class='project-meta'>
                                            <h3>".get_the_title()."</h3>
                                            <span>$cat_title</span>
                                            <p class='excerpt_text'>$excerpt</p>
                                        </div>
                                </div>
                            </a>
                        </div>"; 
            }
           
        }
       
        // reset query
        wp_reset_postdata();

        //bullets
        $bullet_html ='';
        if($bullet ==  'yes'){
            $bullet_html.="<div class='swiper-pagination ".$bullets_style." ".$bullets_position."' ></div>";
        }else{
            $extra_class .= ' no-bullets'; 
        }

        $result='';
        if($layout !='feautured'){
            $result .="<div class='con-element projectvc project-items $extra_class'>
                        <div class='$wrapperjsclass'>
                            <div class='swiper-wrapper'>
                                $items
                            </div>
                            $bullet_html
                        </div>
                    </div>";
        }else{
            $result .= "<div class='con-element projectvc project-feautured-items $extra_class'>
                            <div class='swiper-container-feautured-project'>
                                <div class='swiper-wrapper'>
                                    $items
                                </div>
                                <div class='arrow next'></div>
                                <div class='arrow prev'></div>
                            </div>
                        </div>";
        }
        return $result;
    }
}
}
vc_map(array(
    "name" => esc_html__("Project Slider", 'consultaid'),
    "description" => esc_html__("portfolio post slider", 'consultaid'),
    "base" => "completed_projects",
    "class" => "",
    "icon" => "icon-wpb-quickload",
    "category" => 'Consult aid',
    "show_settings_on_create" => true,
    "params" => array(
        array(
            "type" => "dropdown",
            "param_name" => "layout",
            "heading" => esc_html__("Style", 'consultaid'),
            "value" => array(
                "Featured" => "feautured",
                "Standard" => "standard"
            ),
            "std" => "standard",
            "holder" => 'div',
            "description" => esc_html__("Please increase count number on next when you selected Grid style here.", 'consultaid'),
        ),
        array(
            "type" => "dropdown",
            "param_name" => "bullet",
            "heading" => esc_html__("Bullets", 'consultaid'),
            "value" => array(
                "Show" => "yes",
                "Hide" => "no"
            ),
            "std" => "yes",
            "dependency" => Array("element" => "layout", "value" => array("standard"))
        ),
        array(
            "type" => "dropdown",
            "param_name" => "bullets_style",
            "heading" => esc_html__("Bullets style", 'consultaid'),
            "value" => array(
                "Circle" => "circle",
                "Line" => "line",
            ),
            "std" => "circle",
           "dependency" => Array("element" => "bullet", "value" => array("yes"))
        ),
        array(
            "type" => "dropdown",
            "param_name" => "bullets_position",
            "heading" => esc_html__("Bullets position", 'consultaid'),
            "value" => array(
                "Top" => "top",
                "Bottom" => "bottom"
            ),
            "std" => "bottom",
            "holder" => 'div',
            "dependency" => Array("element" => "bullet", "value" => array("yes"))
        ),
        array(
            "type" => "dropdown",
            "param_name" => "metastyle",
            "heading" => esc_html__("Title style", 'consultaid'),
            "value" => array(
                "With title" => "with-title",
                "With excerpt" => "with-except",
                "With more button" => "more_button"
            ),
            "std" => "with-title",
            "dependency" => Array("element" => "layout", "value" => array("standard"))
        ),
        array(
            "type" => "textfield",
            "param_name" => "excerpt_length",
            "heading" => esc_html__("Excerpt length", 'consultaid'),
            "value" => "12",
            "description" => esc_html__('(optinoal) Works only with content data.', 'consultaid')
        ),
        array(
            "type" => 'textfield',
            "param_name" => "count",
            "heading" => esc_html__("Posts per page", 'consultaid'),
            "value" => '3'
        ),
        array(
            "type" => "textfield",
            "param_name" => "categories",
            "heading" => esc_html__("Category", 'consultaid'),
            "std" => "",
            "description" => esc_html__("Specify category id, slug or leave blank to display items from all categories.", 'consultaid'),
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