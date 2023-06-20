<?php
if ( post_password_required() ) {
    return;
}
if( !function_exists('tana_custom_comment_item') ):
function tana_custom_comment_item($comment, $args, $depth) {
    $GLOBALS['comment'] = $comment;

    if ( 'div' == $args['style'] ) {
        $tag = 'div';
    } else {
        $tag = 'li';
    }

    switch ( $comment->comment_type ) :
        case 'pingback' :
        case 'trackback' :
    ?>
    
    <<?php echo esc_attr($tag); ?> class="comment pingback">
        <p><?php esc_html_e('Pingback:', 'consultaid'); ?> <?php comment_author_link(); ?><?php edit_comment_link( esc_html__('Edit', 'consultaid'), '<span class="edit-link">', '</span>' ); ?></p>
    <?php
            break;
        default:
    ?>
    <<?php echo esc_attr($tag); ?> <?php comment_class( empty( $args['has_children'] ) ? '' : 'parent' ) ?> id="comment-<?php comment_ID() ?>">
        <article>
            <div class="uk-visible-toggle">
            <div class="comment-avatar">
                <?php echo get_avatar( $comment, 128 ); ?>
            </div>

            <div class="comment-body">
                <div class="meta-data">
                    <a href="javascript:;" class="comment-author"><?php echo get_comment_author(); ?></a>
                </div>
                <div class="meta-data">
                    <span class="comment-date"><?php printf( '%1$s', get_comment_date() ); ?> - <?php printf( '%1$s', get_comment_time() ); ?></span>
                    <span class="comment-reply uk-invisible-hover">
                        <?php comment_reply_link( array_merge( $args, array( 'depth' => $depth, 'max_depth' => $args['max_depth'] ) ) ); ?>
                    </span>
                </div>
                <div class="comment-content">
                    <?php comment_text(); ?>
                </div>
            </div>
            </div>
        </article>
    <?php
            break;
    endswitch;
}
endif;
// Comment Navigation
if ( ! function_exists( 'tt_theme_comment_nav' ) ) :
    function tt_theme_comment_nav() {
        // Are there comments to navigate through?
        if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
        ?>
        <nav class="navigation comment-navigation" role="navigation">
            <h2 class="screen-reader-text"><?php esc_html_e('Comment navigation', 'consultaid'); ?></h2>
            <div class="nav-links">
                <?php
                    if ( $prev_link = get_previous_comments_link( esc_html__('Older Comments', 'consultaid') ) ) :
                        printf( '<div class="nav-previous">%s</div>', $prev_link );
                    endif;

                    if ( $next_link = get_next_comments_link( esc_html__('Newer Comments', 'consultaid') ) ) :
                        printf( '<div class="nav-next">%s</div>', $next_link );
                    endif;
                ?>
            </div><!-- .nav-links -->
        </nav><!-- .comment-navigation -->
        <?php
        endif;
    }
endif;
?>
<div id="comments" class="comments-area">    
    <?php if ( have_comments() ) : ?>
    <div class="comments-wrapper">
        <h2 class="comments-title" data-title="<?php esc_attr_e('Comments', 'consultaid'); ?>">
            <?php
                printf( _nx( 'One comment', '%1$s Comments', get_comments_number(), 'comment', 'consultaid' ),
                    number_format_i18n( get_comments_number() ), get_the_title() );
            ?>
        </h2>
        <?php tt_theme_comment_nav(); ?>
        <ol class="comment-list">
            <?php
                wp_list_comments( array(
                    'style'       => 'ol',
                    'short_ping'  => true,
                    'avatar_size' => 56,
                    'callback'    => 'tana_custom_comment_item'
                ) );
            ?>
        </ol><!-- .comment-list -->
        <?php tt_theme_comment_nav(); ?>
    </div>
    <?php endif; // have_comments() ?>
    <?php
    // If comments are closed and there are comments, let's leave a little note, shall we?
    if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
        echo '<p class="no-comments">'.esc_html_e('Comments are closed.', 'consultaid').'</p>';
    endif;
        $req = get_option( 'require_name_email' );
        $aria_req = ( $req ? " aria-required='true'" : '' );
        comment_form(
            array(
                'title_reply' => esc_attr__('Leave a comment', 'consultaid'),
                'comment_notes_after' => '',
                'class_submit' => '',
                'fields' => array(
                    'author' => '<div class="uk-grid uk-grid-medium uk-child-width-expand@s">
                                        <div>
                                            <input id="author" class="uk-input" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
                                        '"  placeholder="'.esc_attr__('Name *', 'consultaid').'" ' . $aria_req . ' /></div>',

                    'email' => '<div class="emailresponsive">
                                    <input id="email" class="uk-input" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) .
                                    '"  placeholder="'.esc_attr__('Email *', 'consultaid').'" ' . $aria_req . ' /></div></div>',
                ),
                'comment_field' => '<div class="uk-grid uk-grid-medium uk-child-width-expand@s"><div class="uk-width-1-1">
                                    <textarea id="comment" class="uk-textarea" name="comment" placeholder="'.esc_attr__('Comments', 'consultaid').'"></textarea></div></div>'
            )
        );
    ?>
</div>