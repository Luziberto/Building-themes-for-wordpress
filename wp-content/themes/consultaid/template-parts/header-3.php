<?php
$stickystart = $stickyend = '';
if (Themeton_Std::getopt('header_sticky') == 1) {
   $stickystart = sprintf('<div uk-sticky>');
   $stickyend = sprintf('</div>');
}
?>
<header id="header-top">
    <div class="uk-container">
        <nav class="uk-navbar">
            <div class="uk-navbar-left">
                <div class="uk-navbar-item uk-padding-remove-horizontal">
                    <div class="uk-logo">
                        <?php Themeton_Tpl::get_logo(); ?>
                    </div>
                </div>
            </div>
            <div class="uk-navbar-right uk-visible@s">
                <div class="uk-grid uk-grid-collapse uk-child-width-expand uk-padding-small uk-width-auto width-top pr3 pl3 uk-visible@s uk-height-1-1 ">
                    <div class="uk-width-auto uk-flex uk-flex-top uk-text-center">
                        <span data-ukicon="mail|2" class="uk-margin-small-right color-brand"></span>
                    </div>
                    <div class="uk-width-auto">
                        <div class="mmb1"><span class="emailphone"><?php print_r(Themeton_Std::getopt('top_email_prefix')); ?></span></div>
                        <div><span class="numbers"><a class="number" href="tel:<?php print_r(Themeton_Std::getopt('top_email')); ?>"><?php print_r(Themeton_Std::getopt('top_email')); ?></a></span></div>
                    </div>
                </div>
                <div class="uk-grid uk-grid-collapse uk-child-width-expand uk-padding-small uk-width-auto width-top pr3 pl2 uk-visible@s uk-height-1-1 header-left-border">
                    <div class="uk-width-auto uk-flex uk-flex-top uk-flex-center" style="margin-top: 5px;">
                        <span data-ukicon="phone|2" class="uk-margin-small-right color-brand"></span>
                    </div>
                    <div class="uk-width-auto">
                        <div class="mmb1"><span class="emailphone uk-margin-right"><?php print_r(Themeton_Std::getopt('top_phone_prefix')); ?></span></div>
                        <div><span class="numbers"><a class="number" href="tel:<?php echo esc_attr( str_replace(' ', '', Themeton_Std::getopt('top_phone')) ); ?>"><?php print_r(Themeton_Std::getopt('top_phone')); ?></a></span>
                        </div>
                     </div>
                </div>
             </div>
            <a href="#offcanvas" class="hamburger-menu uk-navbar-toggle uk-hidden@m uk-hidden@xl uk-hidden@l uk-navbar-right uk-navbar-toggle-icon uk-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <rect y="9" width="20" height="2"></rect>
                    <rect y="3" width="20" height="2"></rect>
                    <rect y="15" width="20" height="2"></rect>
                </svg>
            </a>
        </nav>
    </div>            
</header>
<?php print_r($stickystart); ?>
<header id="headerstyle3" class="header-style-3">
    <div class="uk-container">

        <nav class="uk-navbar menu-bar uk-visible@m">
            <div class="uk-navbar-left">
                <?php
                wp_nav_menu( array(
                    'menu_id'           => 'primary-nav',
                    'menu_class'        => 'uk-navbar-nav uk-visible@m',
                    'theme_location'    => 'primary',
                    'container'         => '',
                    //'fallback_cb'       => 'themeton_primary_callback'
                ) );
                ?>
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