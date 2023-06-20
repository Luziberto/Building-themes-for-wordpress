<?php

class Themeton_Recent_Posts_Widget extends WP_Widget {

    function __construct() {
        $widget_ops = array( 'classname' => 'latest_blogs', 'description' => esc_html__('Recent posts.', 'consultaid') );
        parent::__construct(false, esc_html__(': Recent Posts', 'consultaid'), $widget_ops);
    }

    function widget($args, $instance) {
        global $post;
        extract($args);
        extract( array_merge(array(
            'title' => '',
            'number_posts' => 5,
            'exclude_posts' => '',
            'style' => '',
        ), $instance));

        printf($before_widget);

        if( !empty($title) ){
            echo "" . $args['before_title'] . $title . $args['after_title'];
        }

        // build query
        $args = array(
            'post_type' => 'post',
            'posts_per_page' => $number_posts,
            'ignore_sticky_posts' => true
        );

        if( !empty($exclude_posts) ){
            $args['category__not_in'] = explode(',', $exclude_posts);
        }


        $post_items = '';
        $post_index = 0;
        $posts_query = new WP_Query($args);
        while ( $posts_query->have_posts() ) {
            $posts_query->the_post();
            $post_index++;

            $cat_link = '';
            $cat_title = '';
            $post_categories = wp_get_post_categories(get_the_id());
            foreach($post_categories as $c){
                $cat = get_category($c);
                $cat_link = esc_attr(get_term_link($cat));
                $cat_title = $cat->name;
            }

            $author = get_the_author_meta('display_name', $post->post_author);
            $author_link = get_author_posts_url($post->post_author);

            if($style != 'yes') {

                if( $post_index==1 || $post_index==2 ){
                    $thumb_img = sprintf('<img src="%s/images/dim/3x2.png" alt="'.esc_attr__('Thumb', 'consultaid').'">', get_template_directory_uri());
                    if( has_post_thumbnail() ){
                        $thumb_img = wp_get_attachment_image( get_post_thumbnail_id(), 'thumbnail');
                    }
                    $post_items .= sprintf('<div class="fs-rp-item">
                                                <div class="entry-image"><a href="%1$s">%2$s</a></div>
                                                <div class="entry-rp">
                                                    <div class="entry-meta">
                                                        <span><a href="%1$s">%3$s</a></span>
                                                        <span><a href="%4$s">%5$s</a></span>
                                                    </div>
                                                    <h4><a href="%1$s">%6$s</a></h4>
                                                    <p class="read-more"><a href="%1$s">%7$s</a></p>
                                                </div>
                                            </div>',
                                            get_permalink(), $thumb_img, get_the_date(), $author_link, $author,
                                            get_the_title(), esc_html__('read the article', 'consultaid') );
                }
                else{
                    $post_items .= sprintf('<div class="fs-rp-item no-thumb">
                                                <div class="entry-rp">
                                                    <div class="entry-meta">
                                                        <span><a href="%1$s">%2$s</a></span>
                                                        <span><a href="%3$s">%4$s</a></span>
                                                    </div>
                                                    <h4><a href="%1$s">%5$s</a></h4>
                                                    <p class="read-more"><a href="%1$s">%6$s</a></p>
                                                </div>
                                            </div>',
                                            get_permalink(), get_the_date(), $author_link, $author,
                                            get_the_title(), esc_html__('read the article', 'consultaid') );
                }
            } else {
                $thumb_img = sprintf('<div class="image image-thumb"><img src="%s/images/dim/3x2.png" alt="'.esc_attr__('Thumb', 'consultaid').'"></div>', get_template_directory_uri());
                if( has_post_thumbnail() ){
                    $thumb_img = wp_get_attachment_image( get_post_thumbnail_id(), 'tana-thumbnail', '', array('class'=>'image image-thumb'));
                }
                $post_items .= sprintf('<li class="post hover-light">
                                <a href="%1$s">
                                    %2$s
                                </a>
                                <h4><a href="%3$s">%4$s</a></h4>
                                <p>%5$s</p>
                                <div class="meta">
                                    <span class="author">%6$s</span>
                                    <span class="date">%7$s</span>
                                </div>
                            </li>',
                            get_permalink(), $thumb_img, get_permalink(), get_the_title(),
                            get_the_excerpt(), $author, get_the_date());
            }

        }

        if($style != 'yes') {
            echo sprintf('<div class="fs-recent-post">%s</div>', $post_items);
        } else {
            echo sprintf('<div class="widget recent-posts"><ul>%s</ul></div>', $post_items);
        }

        printf($after_widget);

        wp_reset_postdata();
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['title'] = sanitize_text_field($new_instance['title']);
        $instance['number_posts'] = sanitize_text_field($new_instance['number_posts']);
        $instance['exclude_posts'] = sanitize_text_field($new_instance['exclude_posts']);
        $instance['style'] = sanitize_text_field($new_instance['style']);

        return $instance;
    }

    function form($instance) {

        //Output admin widget options form
        extract(shortcode_atts(array(
                    'title' => '',
                    'number_posts' => 5,
                    'exclude_posts' => '',
                    'style' => '',
                        ), $instance));
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e("Title:", 'consultaid'); ?></label>
            <input type="text" class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" value="<?php echo esc_attr($title); ?>"  />
        </p>
        <p>
            <input type="text" id="<?php echo esc_attr($this->get_field_id('number_posts')); ?>" name="<?php echo esc_attr($this->get_field_name('number_posts')); ?>" value="<?php echo esc_attr($number_posts); ?>" size="3" />
            <label for="<?php echo esc_attr($this->get_field_id('number_posts')); ?>">Number of posts to show</label>
        </p>
        <p>
            <input type="text" id="<?php echo esc_attr($this->get_field_id('exclude_posts')); ?>" name="<?php echo esc_attr($this->get_field_name('exclude_posts')); ?>" value="<?php echo esc_attr($exclude_posts); ?>" size="3" />
            <label for="<?php echo esc_attr($this->get_field_id('exclude_posts')); ?>">Exclude category ID (optional)</label>
            <br><small>You can include multiple categories with comma separation.</small>
        </p>

        <?php
    }

}

add_action('widgets_init', function() { register_widget("Themeton_Recent_Posts_Widget"); } );
