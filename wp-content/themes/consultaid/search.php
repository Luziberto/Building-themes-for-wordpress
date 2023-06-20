<?php get_header(); ?>

<section class="uk-section">

    <div class="uk-container uk-position-relative">
        <div class="uk-grid">
            <div class="uk-width-1-1@s uk-width-3-4@m">
                <?php
                if(have_posts()) :
                    while ( have_posts() ) : the_post();
                        get_template_part( 'content', get_post_format() );
                    endwhile;
                else: ?>
                    <h3><?php esc_html_e('Your search term cannot be found', 'consultaid'); ?></h3>
                    <p><?php esc_html_e('Sorry, the post you are looking for is not available. Maybe you want to perform a search?', 'consultaid'); ?></p>
                    <?php get_search_form();?>
                    <br>
                    <p><?php esc_html_e('For best search results, mind the following suggestions:', 'consultaid'); ?></p>
                    <ul class="borderlist-not">
                        <li><?php esc_html_e('Always double check your spelling.', 'consultaid'); ?></li>
                        <li><?php esc_html_e('Try similar keywords, for example: tablet instead of laptop.', 'consultaid'); ?></li>
                        <li><?php esc_html_e('Try using more than one keyword.', 'consultaid'); ?></li>
                    </ul>
                <?php
                endif;
                ?>
            </div>
            <?php get_sidebar(); ?>
        </div>
    </div>

</section>

<?php get_footer(); ?>