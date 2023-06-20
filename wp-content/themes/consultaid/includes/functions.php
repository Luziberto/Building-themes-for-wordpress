<?php

require_once get_template_directory() . "/includes/themeton-redux/admin-init.php";


// change default settings for default gallery
add_action( 'after_setup_theme', 'themeton_attachment_display_settings' );
function themeton_attachment_display_settings() {
    update_option( 'image_default_link_type', 'file' );
}


/*
                                                                    
 _____ _                 _              _____ _                     
|_   _| |_ ___ _____ ___| |_ ___ ___   |     | |___ ___ ___ ___ ___ 
  | | |   | -_|     | -_|  _| . |   |  |   --| | .'|_ -|_ -| -_|_ -|
  |_| |_|_|___|_|_|_|___|_| |___|_|_|  |_____|_|__,|___|___|___|___|
  
*/
$template_load_files = array(
    '/framework/classes/class.less.php',                    // Less Compiler
    '/framework/classes/class.render.meta.php',             // Meta fields for Posts
    '/framework/functions/global.functions.php',            // Import functions
    '/framework/functions/functions.breadcrumb.php',
    '/framework/classes/class.import.data.php',             // Import Demo Data
    '/includes/widgets/init_widget.php',                    // Import Widgets
    '/includes/plugins.php',                                // TGM Plugin Activation
    '/includes/meta.page.php',                              // Quick Load Element for VC
    '/includes/ExtendVCRow.php',
    '/includes/template-tags.php',                          // Import Template tags
    '/includes/mega-menu/index.php',                        // Mega Menu
    '/includes/ExtraCategory.php',                          // Taxonomy Extra Fields
    '/includes/woo.php'                                     // Woocommerce
);
foreach ($template_load_files as $load_file) {
    if( file_exists(get_template_directory() . $load_file) ){
        require get_template_directory() . $load_file;
    }
}




// Import VC Custom Elements
function themeton_load_vc_elements(){
    $file_dir = get_template_directory() . '/includes/vc-elements/';
    $all_files = ThemetonStd::list_files($file_dir);
    foreach( $all_files as $filename ) {
        $ext = pathinfo($filename, PATHINFO_EXTENSION);
        if( $ext=='php' ){
            require_once $filename;
        }
    }
}
add_action('vc_before_init', 'themeton_load_vc_elements');



?>
