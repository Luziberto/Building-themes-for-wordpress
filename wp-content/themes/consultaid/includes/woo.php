<?php

class Themeton_Woocommerce{

	public $woo_shortcodes = array(
		'sale_products',
		'best_selling_products',
		'top_rated_products',
		'featured_products',
		'product_attribute',
		'product_category',
		'products',
		'recent_products'
	);

	function __construct(){
		// before and after of loop item
		add_action( 'woocommerce_before_shop_loop_item', array($this, 'before_shop_loop_item'), 0 );
		add_action( 'woocommerce_after_shop_loop_item', array($this, 'after_shop_loop_item'), 999 );

		// before and after of loop title
		add_action( 'woocommerce_shop_loop_item_title', array($this, 'shop_loop_item_title_before'), 0 );
		add_action( 'woocommerce_shop_loop_item_title', array($this, 'shop_loop_item_title_after'), 999 );
	}

	
	/* ------------------------------------------
	// before and after of loop item
	--------------------------------------------- */
	public function before_shop_loop_item(){
		printf('<div class="tt-woo-item">');
	}

	public function after_shop_loop_item(){
		printf('</div>');
	}


	/* ------------------------------------------
	// before and after of loop title
	--------------------------------------------- */
	public function shop_loop_item_title_before(){
		printf('<div class="entry-title-wrp">');
	}

	public function shop_loop_item_title_after(){
		printf('</div>');
	}


}

if( class_exists('WooCommerce') ){
	new Themeton_Woocommerce();
}