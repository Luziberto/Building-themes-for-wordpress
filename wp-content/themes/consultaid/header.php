<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <?php endif; ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>><?php wp_body_open(); ?>
    
    <div id="the_loader">
        <svg class="svg-loader" aria-hidden="true">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-loader"></use>
        </svg>
    </div>

    <!-- Wrapper -->
    <div class="wrapper">
    <?php 
    // HEADER LAYOUT SELECTION
    if(Themeton_Std::getmeta('header') != '' && Themeton_Std::getmeta('header') != 'default') { $header_layout = Themeton_Std::getmeta('header');} 
    else { $header_layout = Themeton_Std::getopt('header_layout'); }
    if ( empty($header_layout) ){ $header_layout = 'header-1'; }
    get_template_part( 'template-parts/'.$header_layout );
    
    // PAGE TOP SLIDER 
    get_template_part( 'template-parts/top-slider' );

    // PAGE TITLE 
    get_template_part( 'template-parts/page-title' );
    ?>