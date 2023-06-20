<article <?php post_class('consultaid-page-single uk-article'); ?>>
    <?php
    $t = 0;
    if( has_post_thumbnail() ){

        if (Themeton_Std::getmeta('featuredimage') == '1') $t = 1;
            else 
            if (Themeton_Std::getmeta('featuredimage') == 'default' || Themeton_Std::getmeta('featuredimage') == NULL) {
            if (Themeton_Std::getopt('page_featuredimage') == '1' || Themeton_Std::getopt('page_featuredimage')!=NULL)  $t = 1;
            }
        if ($t == 1) printf('<div class="uk-cover-container uk-height-medium">%s</div>', get_the_post_thumbnail(get_the_id(), 'press-grid-featured-image', array('class'=>'uk-cover')));
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
    ?>
    
    <?php
    if (TPL::show_social_share(Themeton_Std::getmeta('social'))) TPL::social_share_button();
    ?>
    <div class="uk-clearfix"></div>
    <?php
    if ( comments_open() || get_comments_number() ) :
        comments_template();
    endif;
    ?>
</article>