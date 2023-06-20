<?php
if (!class_exists('WPBakeryShortCode_Tt_Portfolio')) {
class WPBakeryShortCode_Tt_Portfolio extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'count' => '6',
            'column' => '3',
            'pager' => 'no',
            'categories' => '',
            'excerpt_length'  => '25',
            'title_position'=>'bottom',
            'extra_class' => ''
        ), $atts));

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
        $img = '';
        $posts_query = new WP_Query($args);
        while ( $posts_query->have_posts() ) {
            $posts_query->the_post();
            $excerpt = TPL::clear_urls( wp_trim_words( wp_strip_all_tags(strip_shortcodes(get_the_content())), $excerpt_length ) );
            if( has_post_thumbnail() ){
                $thumb = wp_get_attachment_image( get_post_thumbnail_id( get_the_ID() ), "large");
                $img = wp_get_attachment_image_src( get_post_thumbnail_id( get_the_ID() ), 'large' );
                $img = !empty($img) ? $img[0] : '';
            }
            // Categories
            $cat_titles = array();
            $terms = wp_get_post_terms(get_the_ID(), 'portfolio_entries');
            foreach ($terms as $term){
                $cat_title = $term->name;
                $cat_slug = $term->slug;
                $cat_titles []= $cat_title;
                }        
            // title 
            $item_title = '';
            if($title_position=='bottom'){
                $item_title .= "<div class='entry-meta'>
                                    <h4>".get_the_title()."</h4>
                                    <span>".implode(",", $cat_titles)."</span>
                                </div>";
            }else{
                $item_title .="<div class='entry-meta text-center'>
                                    <h4>".get_the_title()."</h4>
                                    <p>".$excerpt."</p>
                                </div>";
            }
            $items .= "<div class='uk-grid-margin'>
                            <a href='".get_the_permalink()."'>
                                <div class='portfolio-item' data-bg-image='".$img."'>
                                    <div class='entry-hover'></div>
                                    $item_title
                                </div>
                            </a>
                       </div>";
        }
        // Pager
        $pagination = '';
        $pager_result = '';
        if( $pager=='yes' ){
            $pagination = TPL::pagination($posts_query);
            if( !empty($pagination) ){
                $pager_result .= "<div class='con-portgolio-paginate'>$pagination</div>";
            }
        }
        else{
            $pagination;
        }
        // reset query
        wp_reset_postdata();
        // filter
        return "<div class='uk-grid con-element uk-grid-medium  uk-child-width-1-".$column."@m uk-child-width-1-1@s ".esc_attr($extra_class)."'>
                    $items
                    $pager_result
                </div>";
    }
}
}
vc_map( array(
    "name" => esc_html__('Portfolio', 'consultaid'),
    "description" => esc_html__("post type: portfolio", 'consultaid'),
    "base" => 'tt_portfolio',
    "icon" => "icon-wpb-quickload",
    "content_element" => true,
    "category" => esc_html__('Consult aid', 'consultaid'),
    'params' => array(

        array(
            "type" => 'textfield',
            "param_name" => "count",
            "heading" => esc_html__("Posts per page", 'consultaid'),
            "value" => '8'
        ),
        array(
            "type" => 'textfield',
            "param_name" => "column",
            "heading" => esc_html__("Column", 'consultaid'),
            "value" => '3'
        ),
        array(
            'type' => 'dropdown',
            "param_name" => "title_position",
            "heading" => esc_html__("Title position", 'consultaid'),
            "value" => array(
                "Center" => "center",
                "Bottom" => "bottom"
            ),
            "std" => "bottom",
        ),
        array(
            "type" => "dropdown",
            "param_name" => "pager",
            "heading" => esc_html__("Pagination", 'consultaid'),
            "value" => array(
                "No" => "no",
                "Yes" => "yes"
            ),
            "std" => "no"
        ),
        array(
            "type" => "textfield",
            "param_name" => "excerpt_length",
            "heading" => esc_html__("Excerpt length", 'consultaid'),
            "value" => "7",
            "dependency" => Array("element" => "title_position", "value" => array("center"))
        ),
        array(
            "type" => 'textfield',
            "param_name" => "categories",
            "heading" => esc_html__("Categories", 'consultaid'),
            "description" => esc_html__("Specify category Id or leave blank to display items from all categories.", 'consultaid'),
            "value" => ''
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