<?php

class ThemetonExtraCategory {
    
    function __construct() {
        // Category extra fields
        add_action( 'category_add_form_fields', array($this, 'category_form_field'), 10 );
        add_action ( 'edit_category_form_fields', array($this, 'extra_category_fields'));
        
        /** Save Custom Field Of Category Form */
        add_action('created_category', array($this, 'category_form_save'));
        add_action('edited_category', array($this, 'category_form_save'));

        add_action( 'admin_enqueue_scripts', array($this, 'enqueue_scripts') );
    }

    public function category_form_field(){
        echo '<div class="form-field">
                <label for="category_color">Category Color</label>
                <input type="text" name="category_color" id="category_color" class="tt-color-picker"><br />
                <p class="description">Color for Category.</p>
            </div>';
    }

    public function extra_category_fields($tag){
        $cat_color = get_term_meta($tag->term_id, '_category_color', true);

        echo '<tr class="form-field">
                <th scope="row" valign="top"><label for="category_color">Category Color:</label></th>
                <td>
                    <input type="text" name="category_color" id="category_color" class="tt-color-picker" value="'.$cat_color.'"><br />
                    <span class="description">Color for Category.</span>
                </td>
            </tr>';
    }

    public function category_form_save( $term_id ){
        if ( isset( $_POST['category_color'] ) ) {
            $cat_color = trim($_POST['category_color']);
            update_term_meta($term_id, '_category_color', $cat_color);
        }
    }

    public function enqueue_scripts(){
        wp_enqueue_style('wp-color-picker');
        wp_enqueue_script('wp-color-picker');

        wp_enqueue_script('admin-extra-category-script', get_template_directory_uri() . '/framework/admin-assets/extra-category.js', array('jquery'), false, true);
    }
}

new ThemetonExtraCategory();



?>