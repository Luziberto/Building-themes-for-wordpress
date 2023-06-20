<?php

$stickystart = $stickyend = '';
if (Themeton_Std::getopt('header_sticky') == 1) {
   $stickystart = sprintf('<div uk-sticky>');
   $stickyend = sprintf('</div>');
}
?>
<?php print_r($stickystart); ?>
<header id="header" class="header-style-2">

    <div class="uk-container">

        <nav class="uk-navbar uk-navbar-container uk-navbar-transparent  uk-grid uk-child-width-auto">
            <div class="uk-navbar-left">
                <div class="uk-navbar-item uk-padding-remove-horizontal">
                    <div class="uk-logo">
                        <?php Themeton_Tpl::get_logo(); ?>
                    </div>
                </div>
            </div>
            <div class="uk-navbar uk-flex uk-flex-right uk-width-expand uk-visible@m">
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

            <a href="#offcanvas" class="hamburger-menu uk-navbar-toggle uk-navbar-right uk-hidden@m uk-hidden@xl uk-hidden@l uk-navbar-toggle-icon uk-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <rect y="9" width="20" height="2"></rect>
                    <rect y="3" width="20" height="2"></rect>
                    <rect y="15" width="20" height="2"></rect>
                </svg>
            </a>

        </nav>
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
    </div>

</header><?php print_r($stickyend); ?>