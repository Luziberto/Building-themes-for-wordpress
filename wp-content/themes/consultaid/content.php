<?php 
if  (Themeton_Std::getopt('archive_layout')=='full')  { 
    $size='100%;';
    $lsize='80%;';
} else { 
    $size='';
    $lsize='';
}
$media ='';
?>
<article <?php post_class('consultaid-blog-container uk-article'); ?> <?php if ($size=='87%') printf('style="width:%s"',$size); ?>>
    <?php
    $t = 0;
    $format = get_post_format();
    $bool = false;
                    if( $format=='audio' ) {
                        $bool = true;
                        $pattern = get_shortcode_regex();
                        preg_match('/'.$pattern.'/s', $post->post_content, $matches);
                        if (is_array($matches) && isset($matches[2]) && $matches[2] == 'audio') {
                            $shortcode = $matches[0];
                            $media = '<div class="mejs-wrapper audio">'. do_shortcode($shortcode) . '</div>';
                        }
                        else {
                            $frame = "frame";
                            $regx = "/<i$frame(.)*<\/i$frame>/msi";
                            preg_match($regx, get_the_content(), $matches);
                            if( isset($matches[0]) && !empty($matches[0]) ){
                                $media = $matches[0];
                            }
                            else{
                                if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                                    if(isset($matches[1])) {
                                        $media = "<div class='audio-post'>".apply_filters( "themeton_media_filter", $matches[1] )."</div>";
                                    }
                                }
                            }
                        }
                        $media = $media;
                    }
                    if( $format=='video' ) {
                        $bool = true;
                        if ( preg_match( '|^\s*(https?://[^\s"]+)\s*$|im', $post->post_content, $matches ) ) {
                            if(isset($matches[1])) {
                                $media = "<div class='video-post'>".apply_filters( "themeton_media_filter", $matches[1] )."</div>";
                            }
                        }
                    }
    if ( has_post_thumbnail() ) :
        $t = 1;
        if (Themeton_Std::getopt('archive_layout')=='full') { $thumbsize = 'consultaid-blog-full-thumbnail'; }
        else { $thumbsize = 'consultaid-blog-thumbnail'; }

        $blog_date = '<div class="blog-date">'.esc_attr('Date :','consultaid').' <a class="uk-button-text" href="'.get_the_permalink().'">'.get_the_date(get_option("date-format")).'</a></div>';
        $blog_tag = '';
        $check = get_the_tags(get_the_ID());

        if (!empty($check) || has_post_thumbnail()) :
            $tag = get_the_tags(get_the_ID());
            if (!empty($check)) { $blog_tag = '<div class="blog-tags">'.esc_attr('Tag :','consultaid').' '; }
            else { $blog_tag = '<div class="blog-tags">'; }
            $len = count($tag);
            $c = 1;
            if (!empty($check)) {
                foreach ($tag as $value) {
                    if ($len == 1 ) $st = '';
                    if ($len != $c ) $st = ', ';
                                else $st = '';
                    $blog_tag .= '<a class="uk-button-text" href="'.get_tag_link($value->term_id).'">'.$value->name.'</a>'.$st;
                    $c++;
                }
            }
            $blog_tag .= '</div>';
            $thumbnail = TPL::get_post_image('full','16x7' ,'shadow');
            if ($bool) printf('<div class="uk-cover-container">%s</div>%s%s', $media,$blog_date,$blog_tag);
            else printf('<div class="uk-cover-container uk-height-medium">%s</div>%s%s', $thumbnail,$blog_date,$blog_tag);
        endif;
    else:
       $output = $media.'<p class="uk-article-meta">'.esc_attr('Written by ','consultaid').' 
            <a class="uk-button uk-button-text" href="'.get_the_author_link().'">'.get_the_author_meta( "display_name", $post->post_author ).'</a> on 
            <a class="uk-button uk-button-text" href="'.get_the_permalink().'">'.get_the_date().'</a></p>';
    endif;
    ?>
    <div class="consultaid-blog-content <?php if ($t==1) printf('title-top'); ?>"  <?php printf('style="width:%s"',$lsize); ?>>
    <h3 class="uk-article-title" >
        <a class="uk-link-reset" href="<?php the_permalink(); ?>"><?php the_title(); ?></a> <?php (isset($output)) ? printf('%s',$output) : ''; ?>
    </h3>
    <p class="uk-text-lead"></p>
    <?php the_excerpt(); ?>
        <?php
        $comment=get_comment_count( get_the_id() )['approved'];
        if (abs($comment) == 0) $comment =esc_html__('No comment', 'consultaid');
        else {
            if ($comment == 1) $comment = esc_html__('One comment', 'consultaid');
            else
                if($comment<10) $comment = esc_html__('Comment : 0', 'consultaid').$comment;
                else $comment = esc_html__('Comment : ', 'consultaid').$comment;
        }
        (isset(Themeton_Std::getopt('social_sharevisibility')['posts']) && Themeton_Std::getopt('social_sharevisibility')['posts'] == 1) ? TPL::social_share_button() : '';
        ?>
        <div class="blog-content-comment-count" <?php if (Themeton_Std::getopt('archive_layout')=='full') print_r('style="right:30px;"');  ?>>
            <a class="uk-button uk-button-text" href="<?php comments_link(); ?>"><?php echo esc_attr($comment); ?></a>
        </div>
    </div>
</article>