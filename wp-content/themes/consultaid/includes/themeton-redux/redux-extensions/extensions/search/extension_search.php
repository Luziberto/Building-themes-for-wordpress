<?php
class ReduxFramework_Extension_search {

	static $version = "1.0.1";

	// Protected vars
	protected $parent;

	public function __construct( $parent ) {

		$this->parent = $parent;

		if (empty($this->extension_dir)) {
				$this->_extension_dir = trailingslashit(str_replace('\\', '/', get_template_directory().'/includes/themeton-redux/redux-extensions/extensions/search/'));
				$this->_extension_url = trailingslashit( get_template_directory_uri() ) . 'includes/themeton-redux/redux-extensions/extensions/search/';
		}

		// Allow users to extend if they want
		do_action('redux/search/'.$parent->args['opt_name'].'/construct');

		global $pagenow;
		if ( isset( $_GET['page'] ) && $_GET['page'] && $_GET['page'] == $this->parent->args['page_slug'] )  {
			add_action( 'admin_enqueue_scripts', array( $this, '_enqueue' ), 0 );
		}

		add_action( "redux/metaboxes/{$this->parent->args['opt_name']}/enqueue", array( $this, '_enqueue' ), 10 );

	}

	function _enqueue() {

		/**
		 * Redux search CSS
		 * filter 'redux/page/{opt_name}/enqueue/redux-extension-search-css'
		 * @param string  bundled stylesheet src
		 */
		wp_enqueue_style(
				'redux-extension-search-css',
				apply_filters( "redux/search/{$this->parent->args['opt_name']}/enqueue/redux-extension-search-css", $this->_extension_url . 'extension_search.css' ),
				'',
				filemtime( $this->_extension_dir . 'extension_search.css' ), // todo - version should be based on above post-filter src
				'all'
		);
		/**
		 * Redux search JS
		 * filter 'redux/page/{opt_name}/enqueue/redux-extension-search-js
		 * @param string  bundled javscript
		 */
		wp_enqueue_script(
				'redux-extension-search-js',
				apply_filters( "redux/search/{$this->parent->args['opt_name']}/enqueue/redux-extension-search-js", $this->_extension_url . 'extension_search.js' ),
				'',
				filemtime( $this->_extension_dir . 'extension_search.js' ), // todo - version should be based on above post-filter src
				'all'
		);

		// Values used by the javascript
		wp_localize_script(
				'redux-extension-search-js',
				'reduxsearch',
				__('Search for option(s)', 'consultaid')
		);

	}

} // class/ class/ class/ class