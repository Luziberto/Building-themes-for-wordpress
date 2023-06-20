<?php

/*
    ==================================
    Theme Configuration
    ==================================
*/

// Theme Setup

if ( ! function_exists( 'consultaid_theme_setup' ) ) :
    function consultaid_theme_setup() {
        // load translate file
        load_theme_textdomain( 'consultaid', get_template_directory() . '/languages' );

        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );
        set_post_thumbnail_size( 400, 400, true );

        // Set Image sizes
        add_image_size( 'consultaid-vc-team', 270, 330, true );
        add_image_size( 'consultaid-vc-ceo-team', 270, 270, true );
        add_image_size( 'consultaid-related-post', 200, 150, true );
        add_image_size( 'consultaid-vc-blog-thumbnail', 270, 200, true );
        add_image_size( 'consultaid-vc-blog-thumbnail_1', 800, 280, true );
        add_image_size( 'consultaid-vc-blog-thumbnail_2', 380, 280, true );
        add_image_size( 'consultaid-featured-image', 800, 0, true );
        add_image_size( 'consultaid-image-medium', 400, 0, true );
        add_image_size( 'consultaid-image-medium-thumb', 40, 0, true );
        add_image_size( 'consultaid-image-medium-thumb-testimonial', 40, 40, true );
        add_image_size( 'consultaid-project-carousel', 370 );
        add_image_size( 'consultaid-image-large', 842, 480, true );
        add_image_size( 'consultaid-project-thumb', 500, 300, true );
        add_image_size( 'consultaid-testimonial', 170, 170, true );

        // This theme uses wp_nav_menu() in two locations.
        register_nav_menus( array(
            'primary' => esc_html__('Primary Menu', 'consultaid'),
            'topbar_menu' => esc_html__('Topbar Menu', 'consultaid'),
            'footer_menu' => esc_html__('Footer Menu', 'consultaid')
        ) );

        // Switch default core markup for search form, comment form, and comments to output valid HTML5.
        add_theme_support( 'html5', array(
            'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
        ) );
        
        add_theme_support( 'post-formats', array(
            'quote', 'image', 'gallery', 'audio', 'video', 'link'
        ) );


        // Indicate widget sidebars can use selective refresh in the Customizer.
        add_theme_support( 'customize-selective-refresh-widgets' );
    }
endif;
add_action( 'after_setup_theme', 'consultaid_theme_setup' );

// default content width
if ( ! isset( $content_width ) ) $content_width = 940;

if ( ! function_exists( 'wp_body_open' ) ) {
    function wp_body_open() {
        do_action( 'wp_body_open' );
    }
}

$themeton_default_sidebars = array('right-sidebar'=>'Right sidebar','left-sidebar'=>'Left sidebar');
// Register widget area.
function themeton_widgets_init() {
    
    global $themeton_default_sidebars;
    foreach ($themeton_default_sidebars as $id => $sidebar) {
        if( !empty($id) ){
            register_sidebar(array(
                'name' => $sidebar .' area',
                'id' => $id,
                'description' => esc_html__('Add widgets here to appear in your sidebar.', 'consultaid'),
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<h5 class="widget-title"><span>',
                'after_title'   => '</span></h5>'
            ));
        }
    }
    // define sidebars
    $theme_sidebars = Themeton_Std::get_sidebars();
    foreach ($theme_sidebars as $id => $sidebar) {
        if( !empty($id) && !in_array($id, $themeton_default_sidebars) ){
            register_sidebar(array(
                'name' => $sidebar .' area',
                'id' => $id,
                'description' => esc_html__('Add widgets here to appear in your sidebar.', 'consultaid'),
                'before_widget' => '<div id="%1$s" class="widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<h5 class="widget-title"><span>',
                'after_title'   => '</span></h5>'
            ));
        }
    }

    // Footer widget areas
    for($i=1; $i<=4 ; $i++ ) {
        register_sidebar(
            array(
                'name'          => esc_html__('Footer Column', 'consultaid') . ' ' .$i,
                'id'            => 'footer'.$i,
                'description'   => esc_html__('Add widgets here to appear in your footer column', 'consultaid') . ' ' .$i,
                'before_widget' => '<div id="%1$s" class="footer_widget widget %2$s">',
                'after_widget'  => '</div>',
                'before_title'  => '<h5 class="widget-title">',
                'after_title'   => '</h5>'
            )
        );
    }

}
add_action( 'widgets_init', 'themeton_widgets_init' );


// Site Favicon
if( !function_exists('wp_site_icon') ):
    function themeton_theme_favicon(){
        if(Themeton_Std::getopt('favicon') != ''){
            echo '<link rel="shortcut icon" type="image/x-icon" href="'.Themeton_Std::getopt('favicon').'"/>';
        }
    }
    add_action('wp_head', 'themeton_theme_favicon');
endif;


// google Fonts
if ( ! function_exists( 'themeton_fonts_url' ) ) :
    function themeton_fonts_url() {
        $fonts_url = '';
        $fonts     = array();
        $subsets   = 'latin,latin-ext';

        if ( $fonts ) {
            $fonts_url = esc_url(add_query_arg( array(
                'family' => implode( '|', $fonts ),
                'subset' => urlencode( $subsets ),
            ), '//fonts.googleapis.com/css' ));
        }

        return $fonts_url;
    }
endif;


// Enqueue Scripts
function themeton_enqueue_scripts() {
    wp_enqueue_script( 'wp-mediaelement' );
    
    // Add custom fonts, used in the main stylesheet.
    wp_enqueue_style( 'tt-theme-fonts', themeton_fonts_url(), array(), null );
    
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

    // Include all static css files

    wp_enqueue_style( 'themeton-lib-packages', get_template_directory_uri() . '/css/packages.min.css' );
    wp_enqueue_script('themeton-lib-packages', get_template_directory_uri() . '/js/packages.min.js', array('jquery'), false, true );
    
    // Theme style and scripts
    wp_enqueue_style( 'themeton-stylesheet', get_stylesheet_uri() );
    wp_enqueue_script('themeton-scripts', get_template_directory_uri() . '/js/scripts.min.js', array('jquery', 'mediaelement', 'wp-playlist'), false, true );

    // Print Inline Style, Scripts
    wp_add_inline_style('themeton-stylesheet', Themeton_Tpl::inline_styles());
    wp_add_inline_script('themeton-lib-packages', Themeton_Tpl::inline_script() );
}
add_action( 'wp_enqueue_scripts', 'themeton_enqueue_scripts' );




// Body Class Filter
add_filter( 'body_class', 'themeton_body_class_filter' );
function themeton_body_class_filter( $classes ) {
    global $post;

    if(Themeton_Std::getopt('general_layout') == 'boxed') { $classes[] = 'layout-boxed'; }
    if(Themeton_Std::getopt('general_layout') == 'attached') { $classes[] = 'layout-attached'; }

    return $classes;
}



// Custom Excerpt Length
function themeton_excerpt_length( $length ) {
    return 40;
}
add_filter( 'excerpt_length', 'themeton_excerpt_length', 999 );




// Custom Excerpt More Symbol
function themeton_excerpt_more( $excerpt ) {
    return esc_html__(' ...', 'consultaid');
}
add_filter( 'excerpt_more', 'themeton_excerpt_more' );



// Primary menu callback function
function themeton_primary_callback(){
    echo '<ul id="primary-nav" class="uk-navbar-nav uk-visible@m">';
    wp_list_pages( array(
        'sort_column'  => 'menu_order, post_title',
        'title_li' => '') );
    echo '</ul>';
}

// Sidebar menu callback function
function themeton_sidebarmenu_callback(){
    echo '<ul id="primary-nav2" class="uk-nav">';
    wp_list_pages( array(
        'sort_column'  => 'menu_order, post_title',
        'title_li' => '') );
    echo '</ul>';
}


// Footer menu callback function
function themeton_footer_menu_callback(){
    echo '<ul class="footer-menu">';
        echo '<li class="menu-item"><a href="'.esc_url(home_url('/')).'">'.esc_html__('Home', 'consultaid').'</a></li>';
        echo '<li class="menu-item"><a href="'.esc_url(home_url('/')).'?post_type=post">'.esc_html__('Archive', 'consultaid').'</a></li>';
        echo '<li class="menu-item"><a href="'.esc_url(home_url('/')).'?s=">'.esc_html__('Search', 'consultaid').'</a></li>';
    echo '</ul>';
}


/**
 * This code filters the Categories archive widget to include the post count inside the link
 */
add_filter('wp_list_categories', 'themeton_cat_count_span');

function themeton_cat_count_span($links) {
    $links = str_replace('</a> (', ' <span>', $links);
    $links = str_replace('<span class="count">(', '<span>', $links);
    $links = str_replace(')', '</span></a>', $links);
    return $links;
}



/**
 * This code filters the Archive widget to include the post count inside the link
 */
add_filter('get_archives_link', 'themeton_archive_count_span');

function themeton_archive_count_span($links) {
    $links = str_replace('</a>&nbsp;(', ' <span>', $links);
    $links = str_replace(')</li>', '</span></a></li>', $links);
    return $links;
}

/*
                                                                    
 _____ _                 _              _____ _                     
|_   _| |_ ___ _____ ___| |_ ___ ___   |     | |___ ___ ___ ___ ___ 
  | | |   | -_|     | -_|  _| . |   |  |   --| | .'|_ -|_ -| -_|_ -|
  |_| |_|_|___|_|_|_|___|_| |___|_|_|  |_____|_|__,|___|___|___|___|
  
*/
// Themeton Standard Package
require get_template_directory() . '/framework/classes/class.themeton.std.php';

// Theme Class Extends Themeton Class
class Themeton_Std extends ThemetonStd { }

// Include current theme customize
require get_template_directory() . '/includes/functions.php';

// Theme Class Extends Template Class
class Themeton_Tpl extends TPL { }






function themeton_filter_publish_dates( $the_date, $d, $post ) {
    return sprintf('%s %s', human_time_diff( strtotime($post->post_date), current_time('timestamp') ), esc_html__('ago', 'consultaid'));
}
if( Themeton_Std::get_mod('content_human_time')=='1' ){
    add_action( 'get_the_date', 'themeton_filter_publish_dates', 10, 3 );
}

function redux_custom_css()
{
    $css = '';
    $css .= Themeton_Std::getopt('custom_css');
    $css .= sprintf("@media only screen and (max-width: 985px) {%s}",Themeton_Std::getopt('custom_css_tablet'));
    $css .= sprintf("@media only screen and (max-width: 767px) {%s}",Themeton_Std::getopt('custom_css_phones'));
    $css .= sprintf("@media only screen and (max-width: 480px) {%s}",Themeton_Std::getopt('custom_css_smallphone'));
    wp_add_inline_style('themeton-stylesheet', $css);
}
add_action( 'wp_enqueue_scripts', 'redux_custom_css' );
?>