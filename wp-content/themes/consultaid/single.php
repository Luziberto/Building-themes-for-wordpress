<?php get_header(); 

$style = ''; 
if (Themeton_Std::getmeta('content_top')!=NULL) { $top = Themeton_Std::getmeta('content_top'); $top = "padding-top:".$top.";"; $style .= $top; }
if (Themeton_Std::getmeta('content_bottom')!=NULL) { $bottom = Themeton_Std::getmeta('content_bottom'); $bottom = "padding-bottom:".$bottom.";"; $style .= $bottom; }

while ( have_posts() ) : the_post();

    $page_layout = 'right';
    if( Themeton_Std::getmeta('layout') == '' || Themeton_Std::getmeta('layout') == 'default') {
        $page_layout = Themeton_Std::getopt('post_layout');
    } else {
        $page_layout = Themeton_Std::getmeta('layout');
    }
    global $themeton_sidebar;
    $themeton_sidebar = 'post';

    $column_classes = array(
        'full' => 'uk-width-1-1@s',
        'dual' => 'uk-width-1-1@s uk-width-3-5@m',
        'left' => 'uk-width-1-1@s uk-width-3-4@m',
        'right' => 'uk-width-1-1@s uk-width-3-4@m',
    );
?>
<!-- Content
================================================== -->
<section class="uk-section" <?php if ($style!='') { $style = 'style="'.$style.'"'; printf($style); } ?>>

    <div class="uk-container uk-position-relative">
        <div class="uk-grid">

            <div class="consultaid-blog-container <?php echo esc_attr($column_classes[$page_layout]);?>">
                <article <?php post_class('consultaid-blog-single uk-article'); ?>>
                    <?php
                    $bool = false;
                    if( has_post_thumbnail() ){
                        if (Themeton_Std::getmeta('featuredimage') == '1') {$bool = true;}
                        else { 
                            if (Themeton_Std::getmeta('featuredimage') == 'default' || Themeton_Std::getmeta('featuredimage') ==NULL) {
                                if (Themeton_Std::getopt('post_featuredimage') == '1' || Themeton_Std::getopt('post_featuredimage') != NULL)  $bool = true;
                            }
                        }
                        if ($bool == true) {
                            $thumbnail = TPL::get_post_image('full','16x7' ,'shadow');
                            printf('<div class="uk-cover-container uk-height-medium">%s</div>',$thumbnail);
                        }
                    }
                    ?>
                    
                    
                    <?php
                    if ($bool == true) {
                        $categories = get_the_category();
                        $output = '';
                        if (!empty($categories)) {
                            $numItems = count($categories);
                            $indx = 0;
                            foreach ($categories as $category) {
                                $output .= '<a class="uk-button-text" href="' . esc_url(get_category_link($category->term_id)) . '" >' . esc_html($category->name) . '</a>';
                                if(++$indx !== $numItems) {
                                    $output .= ', ';
                                }
                            }
                            print '<div class="blog-date">';
                            print '<span>'.esc_html_e('Categories: ', 'consultaid').'</span>';
                            printf($output);
                            print '</div>';
                        }

                        $tag_list = get_the_tag_list();
                        if( !empty($tag_list) ): 
                            print '<div class="blog-tags">';
                            print '<span>'.esc_html_e('Tags: ', 'consultaid').'</span>';
                            echo get_the_tag_list('', ', ');
                            print '</div>';
                        endif;
                        }

                        the_content(); 

                        wp_link_pages(array(
                            'before' => '<div class="page-links"><span class="page-links-title">' . esc_html__('Pages:', 'consultaid') . '</span>',
                            'after' => '</div>',
                            'link_before' => '<span>',
                            'link_after' => '</span>',
                            'pagelink' => '<span class="screen-reader-text">' . esc_html__('Page', 'consultaid') . ' </span>%',
                            'separator' => '<span class="screen-reader-text">, </span>',
                        ));
                        
                    
                    $comment=get_comment_count( get_the_id() )['approved'];
                    if (abs($comment) == 0) $comment =esc_html__('No comment', 'consultaid');
                    else {
                        if ($comment == 1) $comment = esc_html__('One comment', 'consultaid');
                        else
                            if($comment<10) $comment = esc_html__('Comment : 0', 'consultaid').$comment;
                            else $comment = esc_html__('Comment : ', 'consultaid').$comment;
                    }
                    if (TPL::show_social_share(Themeton_Std::getmeta('social'))) TPL::social_share_button();
                    ?>
                        <div class="blog-content-comment-count" <?php if  (Themeton_Std::getopt('archive_layout')=='full') print_r('style="right:30px;"');  ?> >
                        <a class="uk-button uk-button-text" href="<?php comments_link(); ?>"><?php echo esc_attr($comment); ?></a>
                        </div>
                    <?php

                    if (Themeton_Std::getopt('post_nextprev')==1) :
                    $args = array(
                        'prev_text'                  => esc_html__( 'Previous Post','consultaid' ),
                        'next_text'                  => esc_html__( 'Next Post','consultaid' ),
                        'screen_reader_text' => esc_html__( ' ','consultaid' ),
                    );
                    printf('%s',the_post_navigation($args));
                    endif;
                    (Themeton_Std::getopt('post_relatedposts')==1) ? get_template_part( 'template-parts/related', 'posts' ) : '';
                    ?>
                    <div class="uk-clearfix"></div>
                    <?php
                    (Themeton_Std::getopt('post_authorbox')==1) ? get_template_part( 'template-parts/author', 'info' ) : '';
                    ?>
                    <?php
                    if ( comments_open() || get_comments_number() ) :
                        comments_template();
                    endif;
                    ?>
                </article>
            </div>

            <?php
            // Right sidebar
            if( $page_layout=='right' || $page_layout == 'dual' ):
                get_sidebar();
            endif; ?>

            <?php
            // Left sidebar
            if( $page_layout=='left' || $page_layout=='dual'):
                get_sidebar('left');
            endif; ?>

        </div>
    </div>

</section>
<?php endwhile; ?>

<?php get_footer(); ?>