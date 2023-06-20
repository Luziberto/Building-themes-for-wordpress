<?php

    // All extensions placed within the extensions directory will be auto-loaded for your Redux instance.
    Redux::setExtensions( $opt_name, get_template_directory() . '/includes/themeton-redux/redux-extensions/extensions/' );

    // Any custom extension configs should be placed within the configs folder.
    if ( file_exists( get_template_directory() . '/includes/themeton-redux/redux-extensions/configs/' ) ) {
        $files = glob( get_template_directory() . '/includes/themeton-redux/redux-extensions/configs/*.php' );
        if ( ! empty( $files ) ) {
            foreach ( $files as $file ) {
                include $file;
            }
        }
    }