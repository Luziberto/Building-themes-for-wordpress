<?php

$stickystart = $stickyend = '';
if (Themeton_Std::getopt('header_sticky') == 1) {
   $stickystart = sprintf('<div uk-sticky>');
   $stickyend = sprintf('</div>');
}
?>
<?php print_r($stickystart); ?>
<header id="header" class="header-style-1">
    <div class="uk-container">

        <nav class="uk-navbar uk-grid uk-child-width-auto">
            <div class="uk-navbar-left">
                <div class="uk-navbar-item uk-padding-remove-horizontal">
                    <div class="uk-logo">
                        <?php Themeton_Tpl::get_logo(); ?>
                    </div>
                </div>
            </div>
            <div class="uk-flex uk-flex-center uk-visible@m uk-width-expand">
                <?php
                wp_nav_menu( array(
                    'menu_id'           => 'primary-nav',
                    'menu_class'        => 'uk-navbar-nav uk-visible@m',
                    'theme_location'    => 'primary',
                    'container'         => '',
                    'fallback_cb'       => 'themeton_primary_callback'
                ) );
                ?>
            </div>
            <div class="uk-navbar-right top-border">
                <div class="uk-grid uk-child-width-expand@s uk-grid-medium uk-visible@s">
                    <div class="uk-flex uk-flex-middle uk-flex-center">
                        <span data-ukicon="phone|2"></span>
                    </div>
                    <div class="uk-width-4-5">
                        <div class="uk-text-truncate uk-text-meta">
                            <?php print_r(Themeton_Std::getopt('top_phone_prefix'));  ?>
                        </div>
                        <span class="number uk-text-truncate">
                            <a class="number" href="tel:<?php echo esc_attr( str_replace(' ', '', Themeton_Std::getopt('top_phone')) ); ?>"><?php printf(Themeton_Std::getopt('top_phone')); ?></a>
                        </span>
                    </div>
                </div>
                
                <a href="#offcanvas" class="hamburger-menu uk-navbar-toggle uk-navbar-right uk-hidden@m uk-hidden@xl uk-hidden@l uk-navbar-toggle-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <rect y="9" width="20" height="2"></rect>
                        <rect y="3" width="20" height="2"></rect>
                        <rect y="15" width="20" height="2"></rect>
                    </svg>
                </a>
            </div>
            
        </nav>
    </div>
    <div id="offcanvas-nav">
        <div class="uk-offcanvas-bar">
            <?php Themeton_Tpl::get_logo(); ?>
            <?php
            wp_nav_menu( array(
                'menu_id'           => 'primary-nav2',
                'menu_class'        => 'uk-nav',
                'theme_location'    => 'primary',
                'container'         => '',
                'fallback_cb'       => 'themeton_sidebarmenu_callback'
            ) );
            ?>

        </div>
    </div>

</header><?php print_r($stickyend); ?>