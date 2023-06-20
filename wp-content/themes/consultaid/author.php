<?php get_header(); ?>

<section class="uk-section">

    <div class="uk-container uk-position-relative">
        <div class="uk-grid">
            <div class="uk-width-1-1@s uk-width-3-4@m">
                
                <?php
                while ( have_posts() ) : the_post();
                    get_template_part( 'content' );
                endwhile;
                ?>

            </div>
            <?php get_sidebar(); ?>
        </div>
    </div>

</section>

<?php get_footer(); ?>