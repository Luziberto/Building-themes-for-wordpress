<?php

class TT_ImportData{

    function __construct(){
        add_action( 'admin_menu', array($this, 'admin_menu') );
        add_action('admin_enqueue_scripts', array($this, 'admin_scripts'));

        add_action("after_switch_theme", array($this, 'after_switch_theme'), 10 ,  2);
        
        add_action('admin_notices', array($this,'theme_activation_admin_notice'));
        add_action('wp_ajax_template_hide_admin_notice', array($this, 'template_hide_admin_notice_hook'));
        add_action('wp_ajax_nopriv_template_hide_admin_notice', array($this, 'template_hide_admin_notice_hook'));
    }


    public function admin_menu(){

        add_theme_page(
            'Import Demo Data',
            'Import Demo Data',
            'manage_options',
            'themeton-demo-importer',
            array($this, 'demo_import_page')
        );
    }
    
    public function admin_scripts(){
        if( isset($_GET['page']) && $_GET['page']=='themeton-demo-importer' ){
            wp_enqueue_style('demo-importer', trailingslashit(get_template_directory_uri()) . 'framework/admin-assets/demo.import.css');
            wp_enqueue_script('demo-importer', trailingslashit(get_template_directory_uri()) . 'framework/admin-assets/demo.import.js', array( 'jquery' ));
        }
    }


    public function after_switch_theme($old_theme_name, $old_theme = false){
        update_option('themeton_admin_notice', '1');
    }



    public function theme_activation_admin_notice(){
        if( get_option('themeton_admin_notice')!==false && get_option('themeton_admin_notice')=="0" )
            return;

        echo '<div class="updated" id="theme-admin-notice">
                <h3 style="text-transform: uppercase;">Welcome to '.wp_get_theme()->template.' theme.</h3>
                <p>
                    <a href="'.esc_url(admin_url()).'themes.php?page=themeton-demo-importer" class="button-primary" style="text-decoration:none;"><i class="fa fa-folder-open"></i> One Click Demo Data</a>
                    <a href="'.esc_url(admin_url()).'customize.php" class="button-primary" style="text-decoration:none;"><i class="fa fa-laptop"></i> Live Customizer</a>
                    <a href="javascript: tt_template_hide_admin_notice();" class="button" style="text-decoration:none;"><i class="fa fa-times"></i> Hide Notice</a>
                </p>
            </div>';
    }


    
    public function template_hide_admin_notice_hook(){
        update_option('themeton_admin_notice', '0');
        exit;
    }



    public function parseFilename($str){
        preg_match('/(\(.*?\))/', $str, $slug_matches);
        if( !empty($slug_matches) ){
            $slug = $slug_matches[0];
            $slug = str_replace("(", "", $slug);
            $slug = str_replace(")", "", $slug);

            $exp_title = explode("(", $str);
            $title = str_replace("_", " ", $exp_title[0]);

            return array('title'=>$title, 'slug'=>$slug);
        }

        return array('title'=>$str, 'slug'=>'');
    }


    public function explode_title_slug($name){
        $title = $name;
        $slug = '';
        $ex = explode("__", $name);
        if( count($ex)>1 ){
            $title = $ex[0];
            $slug = $ex[1];
        }
        return array('title'=>$title, 'slug'=>$slug);
    }



    public function demo_import_page(){

        $msg = '';
        if( isset($_POST, $_POST['template']) && !empty($_POST['template']) ){
            echo '<div class="themeton-import-demo-data"></div>';
            $msg = '<div id="message" class="updated below-h2" style="display:none;"><h4>'.esc_html__('Demo Data Imported.', 'consultaid').'</h4></div>';
        }


        $templates = '';
        $multiple_dir = get_template_directory() . '/includes/demo-data/multiple/';
        if( file_exists($multiple_dir) ){
            // multiple template
            foreach( glob( $multiple_dir . '*' ) as $filename ) {
                $path = $filename;
                $filename = basename($filename);
                $titles = $this->explode_title_slug($filename);

                $img = trailingslashit(get_template_directory_uri()) . 'includes/demo-data/multiple/' . $filename . '/thumb.png';
                $templates .= sprintf('<label>
                                            <input type="radio" name="template" value="%s" />
                                            <span class="thumb"><img src="%s" /></span>
                                            <h5 class="label">%s</h5>
                                       </label>', esc_attr($filename), esc_url($img), $titles['title']);
            }

            $templates = '<tr>
                            <th scope="row"><label>'.esc_html__('Choose Demo Data:', 'consultaid').'</label></th>
                            <td><fieldset class="templates-layouts">'.$templates.'</fieldset></td>
                            <input type="hidden" name="multiple_demo" value="1">
                          </tr>';
        }
        else{
            // single template
            $file_dir = get_template_directory() . '/includes/demo-data/thumbs/';
            foreach( glob( $file_dir . '*.png' ) as $filename ) {
                $filename = basename($filename);
                $fnames = $this->parseFilename($filename);
                $img = trailingslashit(get_template_directory_uri()) . 'includes/demo-data/thumbs/' . $filename;
                $templates .= '<label>
                                    <input type="radio" name="template" value="'.$fnames['slug'].'" />
                                    <span class="thumb"><img src="'.$img.'" /></span>
                                    <h5 class="label">'.$fnames['title'].'</h5>
                               </label>';
            }

            $templates = '<tr>
                                <th scope="row"><label>'.esc_html__('Choose Demo Data:', 'consultaid').'</label></th>
                                <td>
                                    <fieldset class="templates-layouts">'.$templates.'</fieldset>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label>'.esc_html__('Import Attachments:', 'consultaid').'</label></th>
                                <td>
                                    <label>
                                        <input type="checkbox" name="download_attachment" value="1" /> 
                                        '.esc_html__('Download image and data attachments. (Only for test usage!)', 'consultaid').'
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label>'.esc_html__('Import customizer options:', 'consultaid').'</label></th>
                                <td>
                                    <label>
                                        <input type="checkbox" name="import_theme_options" value="1" /> 
                                        '.esc_html__('Please backup your current setup of your Theme Options.', 'consultaid').'
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label>'.esc_html__('Import Widgets:', 'consultaid').'</label></th>
                                <td>
                                    <label>
                                        <input type="checkbox" name="import_widgets" value="1" /> 
                                        '.esc_html__('Import Demo Site Widgets', 'consultaid').'
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row"><label>'.esc_html__('Import  RevSliders Data:', 'consultaid').'</label></th>
                                <td>
                                    <label>
                                        <input type="checkbox" name="import_data_slider" value="1" /> 
                                        '.esc_html__('Import Premium Sliders which is used on Demo Sites', 'consultaid').'
                                    </label>
                                </td>
                            </tr>';
        }


        printf('<div class="wrap">
                    <div id="icon-tools" class="icon32"></div>
                    <h2>%s</h2>
                    %s
                    <form method="post">
                        <table class="form-table">
                        %s
                        <tr>
                            <th scope="row">&nbsp;</th>
                            <td><button type="submit" class="button-primary" style="padding: 10px 25px; height: auto;">%s</button></td>
                        </tr>
                        </table>
                    </form>
                </div>', esc_html__('Demo Data Importer', 'consultaid'), $msg, $templates, esc_html__('Import Demo Data', 'consultaid') );


        if( isset($_POST, $_POST['template']) && !empty($_POST['template']) ){
            $this->import_data($_POST);
        }

    }


    public function get_page_by_name($page_name){
        global $wpdb;
        $page = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type='page'", esc_attr($page_name) ));
        if ( $page ){
            return $page;
        }

        return 0;
    }


    public function import_data($param){

        require get_template_directory() . '/framework/classes/lib/wxr-importer/class-logger.php';
        require get_template_directory() . '/framework/classes/lib/wxr-importer/class-logger-cli.php';
        require get_template_directory() . '/framework/classes/lib/wxr-importer/class-wxr-importer.php';
        

        if( isset($param['template']) && !empty($param['template']) ){

            // prepare imported pages
            $all_page_titles = array();
            $all_pages_count = 0;
            $all_imported_pages = 0;
            $all_pages = get_pages();
            foreach ($all_pages as $val) {
                $all_page_titles[] = $val->post_title;
            }

            if( isset($param['multiple_demo']) && $param['multiple_demo']=='1' ){
                // import multiple

                // parse main content file
                $main_file = get_template_directory() . '/includes/demo-data/multiple/' . $param['template'] . '/main-content.xml';
                if( file_exists($main_file) ){
                    $main_contents = TT::fs_get_contents($main_file);
                    if( !empty($main_contents) ){
                        $simple_xml_content = simplexml_load_string( $main_contents, 'SimpleXMLElement', LIBXML_NOCDATA);

                        $wp_post_attributes = $simple_xml_content->channel->children();
                        foreach ($wp_post_attributes as $value) {
                            $obj = $value->children('wp', true);
                            if( isset($obj->post_type) && $obj->post_type=='page' ){
                                if( in_array($value->title, $all_page_titles) ){
                                    $all_imported_pages++;
                                }
                                $all_pages_count++;
                            }
                        }
                    }
                }

                /* Import Main Contents */
                if( $all_pages_count!=$all_imported_pages ){
                    if( file_exists($main_file) ){
                        $wp_import = new WXR_Importer( array('fetch_attachments'=>true) );
                        $logger = new WP_Importer_Logger_CLI();
                        ob_start();
                        set_time_limit(0);
                        $wp_import->set_logger( $logger );
                        $wp_import->import( $main_file );
                        ob_end_clean();
                    }
                }
                /*=== End Main Contents */
                

                // Set Primary Menu
                $navigation_file = get_template_directory() . '/includes/demo-data/multiple/'.$param['template'].'/navigation.txt';
                if( file_exists($navigation_file) ){
                    $nav_contents = TT::fs_get_contents($navigation_file);
                    if( !empty($nav_contents) ){
                        $locations = unserialize( urldecode($nav_contents) );
                        if( is_array($locations) ){
                            $main_nav = array();
                            foreach ($locations as $key => $value) {
                                $menu_object = wp_get_nav_menu_object($value);
                                if( isset($menu_object->term_id) ){
                                    $main_nav[$key] = $menu_object->term_id;
                                }
                            }
                            set_theme_mod( 'nav_menu_locations', $main_nav );
                        }
                    }
                }




                /* Import Selected Page */
                $title_slug = $this->explode_title_slug($param['template']);
                if( isset($title_slug['slug']) && !empty($title_slug['slug']) ){
                    $page_id_by_name = $this->get_page_by_name($title_slug['slug']);
                    if( $page_id_by_name!='0' ){
                        // Set Home Page
                        update_option('show_on_front', 'page');
                        update_option('page_on_front',  $page_id_by_name);
                    }
                }
                /*=== End Contents */

                
                /* Theme Options */
                $options_file = get_template_directory() . '/includes/demo-data/multiple/'.$param['template'].'/customizer.txt';
                if( file_exists($options_file) ){
                    $op_data = TT::fs_get_contents($options_file, false);
                    
                }
                /*=== End Theme Options */


                /* Import Widgets */
                $widget_file = get_template_directory() . '/includes/demo-data/multiple/'.$param['template'].'/widgets.txt';
                if( file_exists($widget_file) ){
                    $widget_body = TT::fs_get_contents($widget_file, false);
                    if( !empty($widget_body) ){
                        
                        $data = $widget_body;
                        $encoded = preg_match('~%[0-9A-F]{2}~i', $widget_body);
                        if( !empty($encoded) ){
                            $data = unserialize( urldecode(trim($widget_body)) );
                        }
                        else{
                            $data = unserialize( trim($widget_body) );
                        }

                        $this->import_widget($data);
                    }
                }
                /*=== End Widgets */


                /* Revo Sliders */
                $this->import_revo( get_template_directory().'/includes/demo-data/multiple/'.$param['template'].'/revsliders/' );
                /*=== End Revo Sliders */

            }
            else{
                // import singular
                $download_images = isset($param['download_attachment']) && $param['download_attachment']=='1' ? true : false;

                // parse main content file
                $main_file = get_template_directory() . '/includes/demo-data/main-content.xml';
                if( file_exists($main_file) ){
                    $main_contents = TT::fs_get_contents($main_file);
                    if( !empty($main_contents) ){
                        $simple_xml_content = simplexml_load_string( $main_contents, 'SimpleXMLElement', LIBXML_NOCDATA);

                        $wp_post_attributes = $simple_xml_content->channel->children();
                        foreach ($wp_post_attributes as $value) {
                            $obj = $value->children('wp', true);
                            if( isset($obj->post_type) && $obj->post_type=='page' ){
                                if( in_array($value->title, $all_page_titles) ){
                                    $all_imported_pages++;
                                }
                                $all_pages_count++;
                            }
                        }
                    }
                }


                /* Import Main Contents */
                if( $all_pages_count!=$all_imported_pages ){
                    if( file_exists($main_file) ){
                        $wp_import = new WXR_Importer( array('fetch_attachments'=>$download_images) );
                        $logger = new WP_Importer_Logger_CLI();
                        ob_start();
                        set_time_limit(0);
                        $wp_import->set_logger( $logger );
                        $wp_import->import( $main_file );
                        ob_end_clean();
                    }
                }
                /*=== End Main Contents */
                

                // Set Primary Menu
                $navigation_file = get_template_directory() . '/includes/demo-data/navigation.txt';
                if( file_exists($navigation_file) ){
                    $nav_contents = TT::fs_get_contents($navigation_file);
                    if( !empty($nav_contents) ){
                        $locations = unserialize( urldecode($nav_contents) );
                        if( is_array($locations) ){
                            $main_nav = array();
                            foreach ($locations as $key => $value) {
                                $menu_object = wp_get_nav_menu_object($value);
                                if( isset($menu_object->term_id) ){
                                    $main_nav[$key] = $menu_object->term_id;
                                }
                            }
                            set_theme_mod( 'nav_menu_locations', $main_nav );
                        }
                    }
                }




                /* Import Selected Page */
                $home_slug = $param['template'];
                $page_id_by_name = $this->get_page_by_name($home_slug);
                if( $page_id_by_name!='0' ){
                    // Set Home Page
                    update_option('show_on_front', 'page');
                    update_option('page_on_front',  $page_id_by_name);
                }
                /*=== End Contents */




                /* Theme Options */
                if( isset($param['import_theme_options']) && $param['import_theme_options']=='1' ){
                    $options_file = get_template_directory() . '/includes/demo-data/customizer.txt';
                    if( file_exists($options_file) ){
                        $op_data = TT::fs_get_contents($options_file, false);
                    }
                }
                /*=== End Theme Options */



                /* Import Widgets */
                if( isset($param['import_widgets']) && $param['import_widgets']=='1' ){
                    $widget_file = get_template_directory() . '/includes/demo-data/widgets.txt';
                    if( file_exists($widget_file) ){
                        $widget_body = TT::fs_get_contents($widget_file, false);
                        if( !empty($widget_body) ){
                            
                            $data = $widget_body;
                            $encoded = preg_match('~%[0-9A-F]{2}~i', $widget_body);
                            if( !empty($encoded) ){
                                $data = unserialize( urldecode(trim($widget_body)) );
                            }
                            else{
                                $data = unserialize( trim($widget_body) );
                            }

                            $this->import_widget($data);
                        }
                    }
                }
                /*=== End Widgets */



                /* Revo Sliders */
                if( isset($param['import_data_slider']) && $param['import_data_slider']=='1' ){
                    $this->import_revo( get_template_directory() . '/includes/demo-data/revsliders/' );
                }
                /*=== End Revo Sliders */
            }
        }

    }




    /*
        Widget Importer
    */
    public function import_widget($data){
        global $wp_registered_sidebars;
        global $wp_registered_widget_controls;
        
        $widget_controls = $wp_registered_widget_controls;

        // Get all available widgets site supports
        $available_widgets = array();
        foreach ( $widget_controls as $widget ) {
            if ( ! empty( $widget['id_base'] ) && !isset( $available_widgets[$widget['id_base']] ) ){
                $available_widgets[$widget['id_base']]['id_base'] = $widget['id_base'];
                $available_widgets[$widget['id_base']]['name'] = $widget['name'];
            }
        }
        // Get all existing widget instances
        $widget_instances = array();
        foreach ( $available_widgets as $widget_data ) {
            $widget_instances[$widget_data['id_base']] = get_option( 'widget_' . $widget_data['id_base'] );
        }

        // Loop import data's sidebars
        foreach ( $data as $sidebar_id => $widgets ){
            if ( 'wp_inactive_widgets' == $sidebar_id ){ continue; }
            if ( isset( $wp_registered_sidebars[$sidebar_id] ) ) {
                $sidebar_available = true;
                $use_sidebar_id = $sidebar_id;
            } else {
                $sidebar_available = false;
                $use_sidebar_id = 'wp_inactive_widgets'; // add to inactive if sidebar does not exist in theme
            }

            // Loop widgets
            foreach ( $widgets as $widget_instance_id => $widget ){
                $fail = false;
                // Get id_base (remove -# from end) and instance ID number
                $id_base = preg_replace( '/-[0-9]+$/', '', $widget_instance_id );
                $instance_id_number = str_replace( $id_base . '-', '', $widget_instance_id );
                // Does site support this widget?
                if ( ! $fail && ! isset( $available_widgets[$id_base] ) ) {
                    $fail = true;
                }

                if ( ! $fail && isset( $widget_instances[$id_base] ) ){
                    // Get existing widgets in this sidebar
                    $sidebars_widgets = get_option( 'sidebars_widgets' );
                    $sidebar_widgets = isset( $sidebars_widgets[$use_sidebar_id] ) ? $sidebars_widgets[$use_sidebar_id] : array(); // check Inactive if that's where will go

                    // Loop widgets with ID base
                    $single_widget_instances = ! empty( $widget_instances[$id_base] ) ? $widget_instances[$id_base] : array();
                    foreach ( $single_widget_instances as $check_id => $check_widget ) {
                        // Is widget in same sidebar and has identical settings?
                        if ( in_array( "$id_base-$check_id", $sidebar_widgets ) && (array) $widget == $check_widget ) {
                            $fail = true;
                            break;
                        }
                    }
                }

                if ( ! $fail ) {

                    // Add widget instance
                    $single_widget_instances = get_option( 'widget_' . $id_base ); // all instances for that widget ID base, get fresh every time
                    $single_widget_instances = ! empty( $single_widget_instances ) ? $single_widget_instances : array( '_multiwidget' => 1 ); // start fresh if have to
                    $single_widget_instances[] = (array) $widget; // add it

                        // Get the key it was given
                        end( $single_widget_instances );
                        $new_instance_id_number = key( $single_widget_instances );

                        // If key is 0, make it 1
                        // When 0, an issue can occur where adding a widget causes data from other widget to load, and the widget doesn't stick (reload wipes it)
                        if ( '0' === strval( $new_instance_id_number ) ) {
                            $new_instance_id_number = 1;
                            $single_widget_instances[$new_instance_id_number] = $single_widget_instances[0];
                            unset( $single_widget_instances[0] );
                        }

                        // Move _multiwidget to end of array for uniformity
                        if ( isset( $single_widget_instances['_multiwidget'] ) ) {
                            $multiwidget = $single_widget_instances['_multiwidget'];
                            unset( $single_widget_instances['_multiwidget'] );
                            $single_widget_instances['_multiwidget'] = $multiwidget;
                        }

                        // Update option with new widget
                        update_option( 'widget_' . $id_base, $single_widget_instances );

                    // Assign widget instance to sidebar
                    $sidebars_widgets = get_option( 'sidebars_widgets' ); // which sidebars have which widgets, get fresh every time
                    $new_instance_id = $id_base . '-' . $new_instance_id_number; // use ID number from new widget instance
                    $sidebars_widgets[$use_sidebar_id][] = $new_instance_id; // add new instance to sidebar
                    update_option( 'sidebars_widgets', $sidebars_widgets ); // save the amended data
                }
            }
        }
    }






    /*
        Revolutions Sliders
    */
    public function import_revo($revo_directory){
        if( class_exists('UniteFunctionsRev') ){

            if( !file_exists($revo_directory) ){
                return false;
            }

            if(class_exists('UniteDBRev')) {$db = new UniteDBRev();} else { print '<div class="notice notice-warning"><p>Please insert Revolution slider <strong>manually</strong>! Revolution slider functions changed completely since 6+ and I would encourage you to insert it as this manual. You can find slider backup in <strong>dummy-data</strong> folder from your download archive.</p></div>
'; return;}

            $revo_obj = new RevSlider();
            $aliases = $revo_obj->getAllSliderAliases();

            foreach( glob( $revo_directory . '*.txt' ) as $filename ) {
                $ncd = TT::fs_get_contents($filename);
                
                $encoded = preg_match('~%[0-9A-F]{2}~i', $ncd);
                if( !empty($encoded) ){
                    $slider_data = @unserialize(urldecode($ncd));
                }
                else{
                    ob_start();
                    $ncd = preg_replace('!s:(\d+):"(.*?)";!e', "'s:'.strlen('$2').':\"$2\";'", trim($ncd)); //clear errors in string
                    ob_end_clean();
                    
                    $slider_data = @unserialize($ncd);
                }

                if( empty($slider_data) )
                    continue;
                $slider_params = $slider_data["params"];
                if( in_array($slider_params['alias'], $aliases) )
                    continue;

                $serialized_content = serialize($slider_data);

                /* Detecting Animations and Styles */
                $animations = isset($slider_data["custom_animations"]) ? $slider_data["custom_animations"] : array();
                if(!empty($animations)){
                    foreach($animations as $key => $animation){ //$animation['id'], $animation['handle'], $animation['params']
                        $exist = $db->fetch(GlobalsRevSlider::$table_layer_anims, "handle = '".$animation['handle']."'");
                        if(!empty($exist)){ //update the animation, get the ID
                            $arrUpdate = array();
                            $arrUpdate['params'] = stripslashes(json_encode(str_replace("'", '"', $animation['params'])));
                            $db->update(GlobalsRevSlider::$table_layer_anims, $arrUpdate, array('handle' => $animation['handle']));
                            $id = $exist['0']['id'];
                        }else{ //insert the animation, get the ID
                            $arrInsert = array();
                            $arrInsert["handle"] = $animation['handle'];
                            $arrInsert["params"] = stripslashes(json_encode(str_replace("'", '"', $animation['params'])));
                            $id = $db->insert(GlobalsRevSlider::$table_layer_anims, $arrInsert);
                        }
                        $serialized_content = str_replace(array('customin-'.$animation['id'], 'customout-'.$animation['id']), array('customin-'.$id, 'customout-'.$id), $serialized_content); 
                    }
                }

                // Static Captions
                $static = isset($slider_data["static_captions"]) ? $slider_data["static_captions"] : "";
                if(!empty($static)){
                    RevOperations::updateStaticCss($static);
                }

                //overwrite/create dynamic-captions.css
                //parse css to classes
                if( isset($slider_data["dynamic_captions"]) && !empty($slider_data["dynamic_captions"]) ){
                    $dynamicCss = UniteCssParserRev::parseCssToArray($slider_data["dynamic_captions"]);
                    if(is_array($dynamicCss) && $dynamicCss !== false && count($dynamicCss) > 0){
                        foreach($dynamicCss as $class => $styles){
                            //check if static style or dynamic style
                            $class = trim($class);
                            
                            if((strpos($class, ':hover') === false && strpos($class, ':') !== false) || //before, after
                                strpos($class," ") !== false || // .tp-caption.imageclass img or .tp-caption .imageclass or .tp-caption.imageclass .img
                                strpos($class,".tp-caption") === false || // everything that is not tp-caption
                                (strpos($class,".") === false || strpos($class,"#") !== false) || // no class -> #ID or img
                                strpos($class,">") !== false){ //.tp-caption>.imageclass or .tp-caption.imageclass>img or .tp-caption.imageclass .img
                                continue;
                            }
                            
                            //is a dynamic style
                            if(strpos($class, ':hover') !== false){
                                $class = trim(str_replace(':hover', '', $class));
                                $arrInsert = array();
                                $arrInsert["hover"] = json_encode($styles);
                                $arrInsert["settings"] = json_encode(array('hover' => 'true'));
                            }else{
                                $arrInsert = array();
                                $arrInsert["params"] = json_encode($styles);
                            }
                            //check if class exists
                            $result = $db->fetch(GlobalsRevSlider::$table_css, "handle = '".$class."'");
                            
                            if(!empty($result)){ //update
                                $db->update(GlobalsRevSlider::$table_css, $arrInsert, array('handle' => $class));
                            }else{ //insert
                                $arrInsert["handle"] = $class;
                                $db->insert(GlobalsRevSlider::$table_css, $arrInsert);
                            }
                        }
                    }
                }

                $slider_data = unserialize($serialized_content);
                $slider_params = $slider_data["params"];

                /*
                if(isset($slider_params["background_image"])) {
                    $slider_params["background_image"] = UniteFunctionsWPRev::getImageUrlFromPath($slider_params["background_image"]);
                }
                */

                $json_params = json_encode($slider_params);

                $revoSliderInstance = array();
                $revoSliderInstance["params"] = $json_params;
                $revoSliderInstance["title"] = UniteFunctionsRev::getVal($slider_params, "title", $slider_params['title']);
                $revoSliderInstance["alias"] = UniteFunctionsRev::getVal($slider_params, "alias", $slider_params['alias']);

                $sliderID = $db->insert(GlobalsRevSlider::$table_sliders, $revoSliderInstance);

                //create all slides
                $revoSlides = $slider_data["slides"];
                foreach($revoSlides as $slide){
                    
                    $params = $slide["params"];
                    $layers = $slide["layers"];
                    
                    //convert params images:
                    if(isset($params["image"])) {
                        // $params["image"] = UniteFunctionsWPRev::getImageUrlFromPath($params["image"]);
                        $params["image"] = $this->revo_fix_img_url($slider_params["background_image"], $params["image"]);
                    }
                    
                    //convert layers images:
                    foreach($layers as $key=>$layer){                   
                        if(isset($layer["image_url"])){
                            // $layer["image_url"] = UniteFunctionsWPRev::getImageUrlFromPath($layer["image_url"]);
                            $layer["image_url"] = $this->revo_fix_img_url($slider_params["background_image"], $layer["image_url"]);
                            $layers[$key] = $layer;
                        }
                    }
                    
                    //create new slide
                    $SlideInstance = array();
                    $SlideInstance["slider_id"] = $sliderID;
                    $SlideInstance["slide_order"] = $slide["slide_order"]; 

                    $my_layers = json_encode($layers);
                    if(empty($my_layers))
                        $my_layers = stripslashes(json_encode($layers));
                    $my_params = json_encode($params);
                    if(empty($my_params))
                        $my_params = stripslashes(json_encode($params));

                    $SlideInstance["layers"] = $my_layers;
                    $SlideInstance["params"] = $my_params;

                    $db->insert(GlobalsRevSlider::$table_slides, $SlideInstance);
                }


                //check if static slide exists and import
                if(isset($slider_data['static_slides']) && !empty($slider_data['static_slides'])){
                    $static_slide = $slider_data['static_slides'];
                    foreach($static_slide as $slide){
                        
                        $params = $slide["params"];
                        $layers = $slide["layers"];
                        
                        //convert params images:
                        if(isset($params["image"])){
                            $params["image"] = $this->revo_fix_img_url($slider_params["background_image"], $params["image"]);
                        }
                        
                        //convert layers images:
                        foreach($layers as $key=>$layer){
                            if(isset($layer["image_url"])){
                                $layer["image_url"] = $this->revo_fix_img_url($slider_params["background_image"], $layer["image_url"]);
                                $layers[$key] = $layer;
                            }
                        }
                        
                        //create new slide
                        $arrCreate = array();
                        $arrCreate["slider_id"] = $sliderID;
                        
                        $my_layers = json_encode($layers);
                        if(empty($my_layers))
                            $my_layers = stripslashes(json_encode($layers));
                        $my_params = json_encode($params);
                        if(empty($my_params))
                            $my_params = stripslashes(json_encode($params));
                            
                            
                        $arrCreate["layers"] = $my_layers;
                        $arrCreate["params"] = $my_params;
                        
                        $db->insert(GlobalsRevSlider::$table_static_slides, $arrCreate);
                    }
                }
                
            }

        }
    }
    public function revo_fix_bg_url($url){
        $imgExts = array("gif", "jpg", "jpeg", "png", "tiff", "tif", "bmp");
        $exp = explode(".", $url);
        if( in_array($exp[count($exp)-1], $imgExts) ){
            $sites_url = "/wp-content/uploads/sites/";
            $uploads_url = "/wp-content/uploads/";
            if( strpos($url, $sites_url)!==false ){
                $ex = explode($sites_url, $url);
                $site_id_str = explode("/", $ex[1]);
                $uri = $ex[0].$sites_url.$site_id_str[0];
                return trailingslashit($uri);
            }
            else if( strpos($url, $uploads_url)!==false ){
                $ex = explode($uploads_url, $url);
                $uri = $ex[0].$uploads_url;
                return trailingslashit($uri);
            }
            else{
                return false;
            }
        }
        return trailingslashit($url);
    }
    public function revo_fix_img_url($bg_image, $image){
        if( empty($image) ) return "";

        $bg = $this->revo_fix_bg_url($bg_image);
        if($bg){
            if( strpos($image, "://")===false )
                return $bg.$image;
            return $image;
        }
        return $image;
    }


}

new TT_ImportData();