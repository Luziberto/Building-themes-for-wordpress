<?php
require get_template_directory() . '/framework/classes/class.tgm.plugin.activation.php';
add_action( 'tgmpa_register', 'themeton_register_required_plugins' );

function themeton_register_required_plugins() {

	/**
	 * Array of plugin arrays. Required keys are name and slug.
	 * If the source is NOT from the .org repo, then source is also required.
	 */
	$plugins = array(
		array(
            'name'      => 'Envato Market',
            'slug'      => 'envato-market',
            'source'    => esc_url('https://github.com/envato/wp-envato-market/archive/master.zip')
        ),

        array(
            'name'               => esc_html__('Redux Framework', 'consultaid'),
            'slug'               => 'redux-framework',
            'required'           => true,
            'force_activation'   => false,
            'force_deactivation' => false,
        ),

        array(
            'name'               => esc_html__('Revolution Slider', 'consultaid'),
            'slug'               => 'revslider',
            'source'             => get_template_directory().'/includes/plugins/revslider.zip',
            'required'           => true,
            'version'            => '6.5.9',
            'force_activation'   => false,
            'force_deactivation' => false,
        ),

        array(
            'name'               => esc_html__('WPBakery Page Builder','consultaid'),
            'slug'               => 'js_composer',
            'source'             => get_template_directory().'/includes/plugins/js_composer.zip',
            'required'           => true,
            'version'            => '6.7.0',
            'force_activation'   => false,
            'force_deactivation' => false,
        ),

        array(
            'name'               => esc_html__('Contact Form 7','consultaid'),
            'slug'               => 'contact-form-7',
            'required'           => true,
            'force_activation'   => false,
            'force_deactivation' => false,
        ),

        array(
            'name'               => esc_html__('Portfolio Post Type for ThemeTon themes','consultaid'),
            'slug'               => 'portfolio-item',
            'source'             => esc_url('http://themeton.com/resources/themeton-portfolio.zip'),
            'required'           => true,
            'force_activation'   => false,
            'force_deactivation' => false,
        ),
	);

    $config = array(
        'id'           => 'themeton-tgmpa',                 // Unique ID for hashing notices for multiple instances of TGMPA.
        'default_path' => '',                      // Default absolute path to bundled plugins.
        'menu'         => 'tgmpa-install-plugins', // Menu slug.
        'has_notices'  => true,                    // Show admin notices or not.
        'dismissable'  => true,                    // If false, a user cannot dismiss the nag message.
        'dismiss_msg'  => '',                      // If 'dismissable' is false, this message will be output at top of nag.
        'is_automatic' => false,                   // Automatically activate plugins after installation or not.
        'message'      => ''                      // Message to output right before the plugins table.
    );
 
    tgmpa( $plugins, $config );
 
}


?>
