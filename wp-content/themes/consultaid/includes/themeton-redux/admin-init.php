<?php

    if( class_exists('Redux') ){
        // Load the embedded Redux Framework

        // Load the theme/plugin options
        if( file_exists( get_template_directory() . '/includes/themeton-redux/options-init.php' ) ){
            require_once get_template_directory() . '/includes/themeton-redux/options-init.php';
        }

        // Load Redux extensions
        if( file_exists( get_template_directory() . '/includes/themeton-redux/redux-extensions/extensions-init.php' ) ){
            require_once get_template_directory() . '/includes/themeton-redux/redux-extensions/extensions-init.php';
        }
    }