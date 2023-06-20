<?php

add_action('admin_enqueue_scripts', 'themeton_admin_common_render_scripts');
function themeton_admin_common_render_scripts() {
    wp_enqueue_style('wp-color-picker');
    wp_enqueue_style('themeton-admin-common-style', get_template_directory_uri() . '/framework/admin-assets/common.css' );

    wp_enqueue_script('wp-color-picker');
    
    wp_enqueue_script('themeton-admin-common-js', get_template_directory_uri() . '/framework/admin-assets/common.js', array('jquery'), false, true);
}