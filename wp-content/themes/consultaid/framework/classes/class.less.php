<?php

class TTLess{

    public static function get_less_variables(){
        $instanse = new TTLess();
        return $instanse->get_variables();
    }

    // call from customizer
    public static function get_compiled_css(){
        $instanse = new TTLess();
        return $instanse->generate_css(true);
    }


    // call from customizer
    public static function build_css(){
        $instanse = new TTLess();
        return $instanse->create_css(true);
    }

    // call from customizer
    public static function reset_css(){
        $instanse = new TTLess();
        return $instanse->create_css();
    }

    // return created css file path
    public static function get_less_path(){
        return array(
                    'path' => get_theme_mod('less_css_path', ''),
                    'url'  => get_theme_mod('less_css_url', '')
                );
    }

    // build less
    public function create_css( $modify_vars=false ){
        $upload_dir = wp_upload_dir();
        $css_file = array(
            'path' => trailingslashit($upload_dir['path']) . wp_get_theme()->template . '.css',
            'url'  => trailingslashit($upload_dir['url']) . wp_get_theme()->template . '.css'
        );
        if(is_ssl()) {
            $css_file['url'] = str_replace( 'http://', 'https://', $css_file['url']);
        }

        global $wp_filesystem;
        if( empty($wp_filesystem) ){
            require_once ABSPATH . 'wp-admin/includes/file.php';
            WP_Filesystem();
        }

        $css_content = $this->generate_css($modify_vars);
        $wp_filesystem->put_contents( $css_file['path'], $css_content, 0644);

        set_theme_mod('less_css_path', $css_file['path']);
        set_theme_mod('less_css_url', $css_file['url']);

        return false;
    }



    public function get_variables(){
        $less_variables = array();
        $variables = ThemetonStd::fs_get_contents_array(get_template_directory() . "/less/variables.less");
        foreach ($variables as $str) {
            $line = trim($str . '');
            if( substr($line, 0, 2)!="//" && strlen($line)>3 && substr($line, 0, 1)=="@" ){
                $splits = explode(':', $line);
                $variable = trim( str_replace('@', '', $splits[0]) );
                $value = trim($splits[1]);
                if( strpos($value, '//')!==false ){
                    $pos = explode('//', $value);
                    $value = trim($pos[0]);
                }
                $value = str_replace(';', '', $value);
                $value = str_replace('"', '', $value);
                $value = str_replace("'", "", $value);

                $less_variables[$variable] = $value;
            }
        }

        return $less_variables;
    }



    public function generate_css( $modify_vars=false ){
        require_once get_template_directory() . '/framework/classes/lib.lessc.inc.php';
        global $themeton_redux;
        $css = '';
        try{
            $less_file = get_template_directory() . '/less/style.less';
            $theme_uri = trailingslashit(get_template_directory_uri());
            
            $parser = new Less_Parser( array('compress'=>true) );
            $parser->parseFile( $less_file, $theme_uri );

            if($modify_vars){
                $modified_vars = array();
                $variables = $this->get_variables();
                foreach ($variables as $key => $value) {
                    $mod_value =  isset($themeton_redux[$key]) ? $themeton_redux[$key] : '';
                    if( strpos($mod_value, "darken(")!==false && strpos($mod_value, "%")===false )
                        $mod_value .= "%)";
                    if( !empty($mod_value) && $mod_value!=$value && $mod_value!='default' ){
                        $mod_value = trim($mod_value);
                        $modified_vars = array_merge( $modified_vars, array( $key=>$mod_value ) );
                    }


                    if( strpos($key, '-font-family')!==false || 
                        strpos($key, '-font-weight')!==false || 
                        strpos($key, '-font-style')!==false || 
                        strpos($key, '-font-size')!==false || 
                        strpos($key, '-line-height')!==false ){

                        $nkey = $key;
                        $mod_value = '';
                        if( strpos($key, '-font-family')!==false ){
                            $nkey = str_replace('-font-family', '', $key);
                            $mod_value =  isset($themeton_redux[$nkey]['font-family']) ? $themeton_redux[$nkey]['font-family'] : $mod_value;
                        }
                        if( strpos($key, '-font-weight')!==false ){
                            $nkey = str_replace('-font-weight', '', $key);
                            $mod_value =  isset($themeton_redux[$nkey]['font-weight']) ? $themeton_redux[$nkey]['font-weight'] : $mod_value;
                        }
                        if( strpos($key, '-font-style')!==false ){
                            $nkey = str_replace('-font-style', '', $key);
                            $mod_value =  isset($themeton_redux[$nkey]['font-style']) ? $themeton_redux[$nkey]['font-style'] : $mod_value;
                        }
                        if( strpos($key, '-font-size')!==false ){
                            $nkey = str_replace('-font-size', '', $key);
                            $mod_value =  isset($themeton_redux[$nkey]['font-size']) ? $themeton_redux[$nkey]['font-size'] : $mod_value;
                        }
                        if( strpos($key, '-line-height')!==false ){
                            $nkey = str_replace('-line-height', '', $key);
                            $mod_value =  isset($themeton_redux[$nkey]['line-height']) ? $themeton_redux[$nkey]['line-height'] : $mod_value;
                        }

                        if( !empty($mod_value) && $mod_value!=$value && $mod_value!='default' ){
                            $modified_vars = array_merge( $modified_vars, array( $key=>$mod_value ) );
                        }
                    }
                }
                
                if( !empty($modified_vars) ){
                    $parser->ModifyVars($modified_vars);
                }
            }

            // import VC Elements Styles
            $vc_element_less_content = array();
            $vc_elements_dir = get_template_directory() . '/includes/vc-elements/';
            $vc_elements_all_files = list_files($vc_elements_dir);
            foreach( $vc_elements_all_files as $vc_elem_file ){
                $vc_files_ext = pathinfo($vc_elem_file, PATHINFO_EXTENSION);
                if( $vc_files_ext=='less' ){
                    $vc_element_less_content[] = TT::fs_get_contents($vc_elem_file);
                }
            }
            if( !empty($vc_element_less_content) ){
                $parser->parse( implode('', $vc_element_less_content) );
            }


            $css = $parser->getCss();

        }
        catch(Exception $e){
            error_log($e->getMessage());
        }

        return $css;
    }

}



class Themeton_Init_Custom_CSS{
    function __construct(){
        add_action( 'wp_enqueue_scripts', array($this, 'enqueue_script') );
    }

    public function enqueue_script(){
        // theme customized style
        $less_css_path = TTLess::get_less_path();
        if( file_exists($less_css_path['path']) ){
            wp_enqueue_style( 'themeton-custom-stylesheet', $less_css_path['url'] );
        }
        else if( file_exists(get_template_directory()."/css/default.css") ){
            wp_enqueue_style( 'themeton-custom-stylesheet', trailingslashit(get_template_directory_uri()) . "css/default.css" );
        }
    }
}

new Themeton_Init_Custom_CSS();
