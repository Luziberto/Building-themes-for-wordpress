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
<body <?php body_class(); ?>>
    
    <div id="the_loader">
        <svg class="svg-loader" aria-hidden="true">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-loader"></use>
        </svg>
    </div>
    <!--  -->
    <!-- Wrapper -->
    <div class="wrapper">

<?php 
    $header_layout = Themeton_Std::getopt('header_layout');
    if (!empty($header_layout) ){
    $header_layout = abs($header_layout);
    get_template_part( 'template-parts/header-'.$header_layout );
    }
?>

<section class="uk-section " id="error404">

        <div class="uk-grid">

            <div class="uk-width-1-1@s uk-text-center">

                <article class="uk-article">
                    <h1>404</h1>
                    <h3 class="uk-article-title">
                        <?php echo wp_kses( esc_html__('Page not found', 'consultaid'), array('br'=>array()) ); ?>
                    </h3>
                    <p>
                        <?php esc_html_e('We cannot seem to find the page that you are looking for.', 'consultaid'); ?>
                    </p>
                    <a href="<?php echo esc_url(home_url());?>" class="uk-button uk-button-default">Back to Home page</a>
                </article>

            </div>

        </div>

</section>

<?php get_footer(); ?>