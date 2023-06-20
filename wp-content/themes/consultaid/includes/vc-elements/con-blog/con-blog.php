<?php
if (!class_exists('WPBakeryShortCode_con_post')) {
class WPBakeryShortCode_con_post extends WPBakeryShortCode {
    protected function content( $atts, $content = null){
        extract(shortcode_atts(array(
            'readmore' => '',
            'title' => '1',
            'excerpts' => '1',
            'meta' => '1',
            'style' => '1',
            'columns' => '3',
            'categories' => '',
            'count' => '6',
            'pagination' => '0',
            'extra_class' => ''
        ), $atts));

        $extra_class = esc_attr('con-element '.$extra_class);

        $result = '';

        $column = 'uk-width-1-'.$columns.'@m';
        $category_name = '';
        $category_link = '';
        $class ='';

        global $post,$paged;

        if (isset($categories)) $the_query = new WP_Query( array ('post_type' => 'post', 'category_name' =>$categories, 'posts_per_page' => $count, 'paged' => $paged ) );
        else $the_query = new WP_Query( array ('post_type' => 'post', 'posts_per_page' => $count, 'paged' => $paged ) );
        
        if ($style == '1') {
            ob_start();            
            while ( $the_query->have_posts() ) {
                $the_query->the_post();
                get_template_part( 'content' );
            }
            $result .= ob_get_contents();
            ob_end_clean();
        }
        wp_reset_postdata();
        if ($style == '2') {
        if ( $the_query->have_posts() ) {
            $result .= '<div class="uk-grid '.$extra_class.' con-blog-element" data-uk-grid data-uk-grid-match>';
            $c = 0; $k = 0;
            while ( $the_query->have_posts() ) {
                
                $k = 0;
                $the_query->the_post();
                $author_avatar = get_avatar_url(get_the_author_meta( 'ID' ));
                $excerpt = get_the_excerpt();

                $format = get_post_format();
                
                if ($c == 0) { $class = 'uk-width-2-3@m uk-width-2-3@l con-blog1'; $excerpt = substr( $excerpt , 0, 150); }
                if ($c == 1) { $class = 'uk-width-1-3@m uk-width-1-3@l con-blog2'; $excerpt = substr( $excerpt , 0, 70); }
                if ($c < 2) {
                    $bool = false;
                    if( $format=='audio' ) {
                        $result .= '<div class="'.$class.'">';
                        $bool = true;
                        $pattern = get_shortcode_regex();
                        preg_match('/'.$pattern.'/s', $post->post_content, $matches);
                        if (is_array($matches) && isset($matches[2]) && $matches[2] == 'audio') {
                            $shortcode = $matches[0];
                            $media = '<div class="mejs-wrapper audio">'. do_shortcode($shortcode) . '</div>';
                        }
                        else {
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
                        $result .= $media;
                    }
                    if( $format=='video' ) {
                        $result .= '<div class="'.$class.'">';
                        $bool = true;
                        if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                            if(isset($matches[1])) {
                                $media = "<div class='video-post'>".apply_filters( "themeton_media_filter", $matches[1] )."</div>";
                                $result .= $media;
                            }
                        }
                    }
                    if ($bool == false) {
                        if ( has_post_thumbnail() ) {
                        $result .= '<div class="'.$class.'">';
                            if ($c == 0) {
                                $result .= '<a href="'.get_the_permalink().'"><div class="blog-vc-thumbnail" style="background-image:url('.wp_get_attachment_image_src(get_post_thumbnail_id(),'consultaid-vc-blog-thumbnail_1')[0].')"></div></a>';
                            } else {
                                $result .= '<a href="'.get_the_permalink().'"><div class="blog-vc-thumbnail" style="background-image:url('.wp_get_attachment_image_src(get_post_thumbnail_id(),'consultaid-vc-blog-thumbnail_1')[0].')"></div></a>';
                            }
                            
                        }
                        else {
                            $result .= '<div class="'.$class.'"><div class="blog-vc-thumbnail uk-flex uk-flex-center"></div>';
                        }
                    }
                    $result .= '<div class="cont-blog-element-cat">'.get_the_category_list( esc_html__( ', ', 'consultaid' ) ).'</div>';
                    if (isset($title) && $title == '1')  $result .= '<div class="con-blog-element-content"><h3><a href="'.get_the_permalink().'">'.get_the_title().'</a></h3>';
                    else $result .= '<div class="con-blog-element-content"><h3></h3>';
                    if (isset($excerpts) && $excerpts == '1') $result .= '<p>'.$excerpt.' ...</p></div>';
                    else  $result .= '<p></p></div>';
                    global $themeton_redux;
                    $share = $themeton_redux['social_shares'];
                    $share_button = array( 
                        'facebook' => array('url' => 'https://www.facebook.com/sharer.php?u='.get_the_permalink() ,
                                            'icon' => 'fa fa-facebook' ),
                        'twitter' => array('url' => 'https://twitter.com/share?url='.get_the_permalink() ,
                                           'icon' => 'fa fa-twitter' ),
                        'googleplus' => array('url' => 'https://plus.google.com/share?url='.get_the_permalink(),
                                              'icon' => 'fa fa-google' ),
                        'pinterest' => array('url' => esc_url( "http://pinterest.com/pin/create/button/?url=" . get_the_permalink()."&media=" . wp_get_attachment_image_src(get_post_thumbnail_id())[0] . "&description=".get_the_title() ),
                                             'icon' => 'fa fa-pinterest' ),
                        'email' => array('url' => 'mailto:?subject='.get_the_title().'&body='.get_the_permalink(),
                                             'icon' => 'fa fa-envelope' ) 
                    );
                    $output = '';
                    foreach ($share as $key => $value) {
                        if ($value==1) $output .= '<li><a href="'.$share_button[$key]['url'].'" target="_blank"><i class="'.$share_button[$key]['icon'].'" aria-hidden="true"></i></a></li>'; 
                    }
                    if (isset($meta) && $meta == '1') $result .= '<div class="con-blog-element-footer">'.get_avatar( $post->post_author, 28 ,'','' , array('class' => 'author_avatar' )).' BY: <span><a href="'.get_author_posts_url( $post->post_author).'">'.get_the_author().'</a></span> &nbsp; &nbsp;| &nbsp; &nbsp;<span><a href="'.get_the_permalink().'">' . get_the_date(get_option('date-format')).'</a></span>
                    <div class="blog-seo">
                        <ul class="expanded">
                            '.$output.'
                        </ul>
                        <a href="javascript:;" class="more_btn">
                            <i data-ukicon="plus"></i>
                        </a>
                    </div>';
                    else $result .= '<div class="con-blog-element-footer">
                    <div class="blog-seo">
                        <ul class="expanded">
                            '.$output.'
                        </ul>
                        <a href="javascript:;" class="more_btn">
                            <i data-ukicon="plus"></i>
                        </a>
                    </div>';
                    $result .= '</div></div>'; 
                }
                else { $c = 0; $k = 1; }
                if ($k == 0) $c++;
                        else $k = 0;
            }

            $readmore = vc_build_link ($readmore);
            $result .= '<div class="uk-width-1-1@l uk-text-center">';
            
            if ($readmore["title"]!="") {
                $readmore["target"] = isset($readmore["target"]) && !empty($readmore["target"]) ? $readmore["target"] : '_self';
                $result .= '<div class="more_btn_con">
                <a class="uk-button uk-button-default" rel="'.$readmore["rel"].'" target="'.$readmore["target"].'" href="'.$readmore["url"].'">'.esc_html($readmore["title"]).'</a></div>';
            }
            wp_reset_postdata();
            $result .='</div></div>';
        }
        else $result = 'Not Found Page';
        }
        else {
            if ($style == '3') {
                $result .='<div class="uk-grid '.$extra_class.' con-blog-col3"><div class="uk-width-1-1@m uk-text-center"></div>';
                $c = 0; $k = 0;
                while ( $the_query->have_posts() ) {
                    $the_query->the_post();
                    $thumbnail = '';
                    $format = get_post_format();
                    $bool = false;
                    if( $format=='audio' ) {
                        $bool = true;
                        $pattern = get_shortcode_regex();
                        preg_match('/'.$pattern.'/s', $post->post_content, $matches);
                        if (is_array($matches) && isset($matches[2]) && $matches[2] == 'audio') {
                            $shortcode = $matches[0];
                            $media = '<div class="mejs-wrapper audio">'. do_shortcode($shortcode) . '</div>';
                        }
                        else {
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
                    if( $format=='video' ) {
                        $bool = true;
                        if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                            if(isset($matches[1])) {
                                $media = "<div class='video-post'>".apply_filters( "themeton_media_filter", $matches[1] )."</div>";
                            }
                        }
                    }
                    $excerpt = get_the_excerpt();
                    if ($c==2) { 
                        $class = "uk-width-1-2@m uk-width-1-2@l"; 
                        $thumbnail = '';
                    }
                    else { 
                        $class = "uk-width-1-2@s uk-width-1-4@m uk-width-1-4@l";
                        if ($bool) $thumbnail = $media;
                        else
                        if ( has_post_thumbnail() ) {
                            $thumbnail = TPL::get_post_image('consultaid-vc-blog-thumbnail','1x1');
                        }
                        else $excerpt = substr( $excerpt , 0, 160);
                    }

                    $result .='<div class="'.$class.'">';

                    if ($thumbnail!='') $result .=$thumbnail;

                    if (isset($meta) && $meta == '1') $result .='<div class="blog-date"><a href="'.get_the_permalink().'">' . get_the_date(get_option('date-format')).'</a></div>';
                    else $result .='<div class="blog-date"></div>';

                    if (isset($title) && $title == '1') $result .='<p><a href="'.get_the_permalink().'">'.get_the_title().'</a></p>';

                    if ($excerpts ==NULL || $excerpts == '') $excerpt='';

                    if ($thumbnail=='') $result .=$excerpt;

                    if ($c == 2) { 
                        $readmore = vc_build_link ($readmore);
                        $readmore["target"] = isset($readmore["target"]) && !empty($readmore["target"]) ? $readmore["target"] : '_self';
                        if ($readmore["title"]!="") $result .='<div><a class="uk-button uk-button-default" rel="'.$readmore["rel"].'" target="'.$readmore["target"].'" href="'.$readmore["url"].'">' . $readmore["title"] . '</a></div>'; 
                    }
                    if ($c==2) { $c=0; $k=1; }
                    $result .='</div>';
                    if ($k == 0) $c++;
                    else $k = 0;
                }
                wp_reset_postdata();
                $result .='</div>';
            }
            if ($style == 4) {
                $result .='<div class="uk-grid '.$extra_class.' con-blog-col4"><div class="uk-width-1-1@m uk-text-center"></div>';
                while ( $the_query->have_posts() ) {
                    $the_query->the_post();

                    $format = get_post_format();
                    $bool = false;
                    if( $format=='audio' ) {
                        $bool = true;
                        $pattern = get_shortcode_regex();
                        preg_match('/'.$pattern.'/s', $post->post_content, $matches);
                        if (is_array($matches) && isset($matches[2]) && $matches[2] == 'audio') {
                            $shortcode = $matches[0];
                            $media = '<div class="mejs-wrapper audio">'. do_shortcode($shortcode) . '</div>';
                        }
                        else {
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
                    if( $format=='video' ) {
                        $bool = true;
                        if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                            if(isset($matches[1])) {
                                $media = "<div class='video-post'>".apply_filters( "themeton_media_filter", $matches[1] )."</div>";
                            }
                        }
                    }

                    

                    $class = $column;
                   
                    $result .='<div class="'.$class.'">';

                    $excerpt = get_the_excerpt();

                    if ( has_post_thumbnail() ) { 
                        $thumbnails = TPL::get_post_image('consultaid-vc-blog-thumbnail','1x1' ,'hover');
                        $thumbnail = '<div class="uk-inline-clip uk-transition-toggle uk-light">'.$thumbnails.'</div>'; $excerpt = substr( $excerpt , 0, 90); 
                        if ($bool) $thumbnail = $media;
                    }
                    else { $thumbnail = ''; $excerpt = substr( $excerpt , 0, 200); if ($bool) $thumbnail = $media; }

                    

                    $result .=$thumbnail;

                    if (isset($meta) && $meta == '1') $result .='<div class="blog-date">BY: <span><a href="'.get_author_posts_url( $post->post_author).'">'.get_the_author().'</a></span> &nbsp; &nbsp;| &nbsp; &nbsp;<span><a href="'.get_the_permalink().'">' . get_the_date(get_option('date-format')).'</a></span></div>';

                    if (isset($title) && $title == '1') $result .='<p><a href="'.get_the_permalink().'">'.get_the_title().'</a></p>';

                    if ($excerpts ==NULL || $excerpts == '') $excerpt='';
                    else $result .='<div class="blog-con-text">'.$excerpt.' ...</div>';

                    $result .='</div>';
                }
                wp_reset_postdata();
                $result .='</div>';
            }
        }
        if (isset($pagination) && $pagination == '1') return $result.'<div class="pagination-container">'.TPL::pagination($the_query).'<div class="uk-clearfix"></div></div>';
        else return $result;
    }
}
}

vc_map(array(
    "name" => esc_html__('Blog post', 'consultaid'),
    "description" => esc_html__("Home page blog post", 'consultaid'),
    "base" => 'con_post',
    "icon" => "icon-wpb-quickload",
    "category" => esc_html__('Consult aid', 'consultaid'),
    "params" => array(
        array(
            "type" => 'textfield',
            "param_name" => "categories",
            "heading" => esc_html__("Categories", 'consultaid'),
            "description" => esc_html__("Specify category SLUG (not name) or leave blank to display items from all categories. Ex: news,image.", 'consultaid'),
            "value" => '',
            "holder" => 'div'
        ),
        array(
            "type" => "textfield",
            "param_name" => "count",
            "heading" => esc_html__("Posts Limit", 'consultaid'),
            "value" => "6",
            "holder" => 'div'
        ),
        array(
            "type" => "dropdown",
            "param_name" => "style",
            "heading" => esc_html__("Blog Post style", 'consultaid'),
            "value" => array(
                'Default' => '1',
                'Layout 2 - Left big and right small' => '2',
                'Layout 3 - 2 thumbail post and next no image post' => '3',
                'Layout 4 - Grid layout' => '4'
            )
        ),
        array(
            "type" => "dropdown",
            "param_name" => "columns",
            "heading" => esc_html__("Columns", 'consultaid'),
            "value" => array(
                "1 Column" => "1",
                "2 Columns" => "2",
                "3 Columns" => "3",
                "4 Columns" => "4",
                "6 Columns" => "6"
            ),
            "std" => "3",
            "dependency" => Array("element" => "style", "value" => array("4"))
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "title",
            "heading" => esc_html__("Title", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "1",
            "dependency" => Array("element" => "style", "value" => array("2","3","4")),
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "excerpts",
            "heading" => esc_html__("Excerpt", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "1",
            "dependency" => Array("element" => "style", "value" => array("2","3","4")),
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "meta",
            "heading" => esc_html__("Meta", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "1",
            "dependency" => Array("element" => "style", "value" => array("2","3","4")),
        ),
        array(
            'type' => 'checkbox',
            "param_name" => "pagination",
            "heading" => esc_html__("Pagination", 'consultaid'),
            'value' => array( esc_html__( 'Yes', 'consultaid' ) => '1' ),
            "std" => "0"
        ),
        array(
            "type" => "vc_link",
            "param_name" => "readmore",
            "heading" => esc_html__("Read more link", 'consultaid'),
            "dependency" => array( "element" => "style", "value" => array("2","3") ),
        ),
        array(
            "type" => "textfield",
            "param_name" => "extra_class",
            "heading" => esc_html__("Extra Class", 'consultaid'),
            "value" => "",
            "description" => esc_html__("If you wish to style particular content element differently, then use this field to add a class name and then refer to it in your css file. Please look at helper classes in the documentation.", 'consultaid'),
        )
    )
));