<?php get_header(); 

    $page_layout = Themeton_Std::getopt('archive_layout');

    if(!isset($page_layout) || $page_layout == '') {
        $page_layout = 'right';
    }
    global $themeton_sidebar;
    $themeton_sidebar = 'archive';

    $column_classes = array(
        'full' => 'uk-width-1-1@s',
        'dual' => 'uk-width-1-1@s uk-width-3-5@m',
        'left' => 'uk-width-1-1@s uk-width-3-4@m',
        'right' => 'uk-width-1-1@s uk-width-3-4@m',
    );
?>
<section class="uk-section">

    <div class="uk-container uk-position-relative">
        <div class="uk-grid">

            <div class="<?php echo esc_attr($column_classes[$page_layout]);?>">
                <?php
                while ( have_posts() ) : the_post();
                    get_template_part( 'content' );
                endwhile;
                ?>
                <div class="pagination-container"><?php echo TPL::pagination(); ?><div class="uk-clearfix"></div></div>
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

<?php get_footer(); ?>