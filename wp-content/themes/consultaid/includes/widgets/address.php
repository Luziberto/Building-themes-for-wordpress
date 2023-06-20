<?php

class Themeton_Address_Widget extends WP_Widget {

    function __construct() {
        $widget_ops = array( 'classname' => 'widget_contact', 'description' => esc_html__('Contact Address.', 'consultaid') );
        parent::__construct(false, esc_html__(': Address', 'consultaid'), $widget_ops);
    }

    function widget($args, $instance) {
        global $post;
        extract($args);
        extract( array_merge(array(
            'title' => '',
            'address' => 'Sydney road, Billboard Street 2219-11C. <br>Apple Town, Your Country.',
            'phone' => '(305) 533-1122, (305) 112-7788',
            'email' => 'johndoe@mail.com',
            'hours' => 'Monday - Friday: <strong>09:00 - 18:00</strong><br>Saturday, Sunday: <strong>Closed</strong>',
        ), $instance));

        printf($before_widget);

        if( !empty($title) ){
            echo "" . $args['before_title'] . $title . $args['after_title'];
        }

        $addressmarkup = $address !='' ? "<abbr class='address' title='".esc_attr__('Address', 'consultaid')."'><span class='fa fa-location-arrow'></span> $address</abbr>": '';
        $phonemarkup = $phone !='' ? "<abbr title='".esc_attr__('Phone', 'consultaid')."'><span class='fa fa-phone'></span> $phone</abbr>": '';
        $emailmarkup = $email !='' ? "<abbr title='".esc_attr__('Email', 'consultaid')."'><span class='fa fa-envelope-o'></span> <a href='mailto:$email'>$email</a></abbr>": '';
        $hoursmarkup = $hours !='' ? "<abbr title='".esc_attr__('Work hours', 'consultaid')."'><span class='fa fa-clock-o'></span> $hours</abbr>": '';
        echo sprintf("<address>
                    $addressmarkup
                    $phonemarkup
                    $emailmarkup
                    $hoursmarkup
                </address>");
        printf($after_widget);

        wp_reset_postdata();
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['title'] = sanitize_text_field($new_instance['title']);
        $instance['address'] = sanitize_text_field($new_instance['address']);
        $instance['phone'] = sanitize_text_field($new_instance['phone']);
        $instance['email'] = sanitize_text_field($new_instance['email']);
        $instance['hours'] = sanitize_text_field($new_instance['hours']);

        return $instance;
    }

    function form($instance) {

        //Output admin widget options form
        extract(shortcode_atts(array(
                    'title' => '',
                    'address' => 'Sydney road, Billboard Street 2219-11C. <br>Apple Town, Your Country.',
                    'phone' => '(305) 533-1122, (305) 112-7788',
                    'email' => 'johndoe@mail.com',
                    'hours' => 'Monday - Friday: <strong>09:00 - 18:00</strong><br>Saturday, Sunday: <strong>Closed</strong>',
                ), $instance));
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('title')); ?>"><?php esc_html_e("Title:", 'consultaid'); ?></label>
            <input type="text" class="widefat" id="<?php echo esc_attr($this->get_field_id('title')); ?>" name="<?php echo esc_attr($this->get_field_name('title')); ?>" value="<?php echo esc_attr($title); ?>"/>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('address')); ?>"><?php esc_html_e("Address:", 'consultaid'); ?></label>
            <textarea class="widefat" id="<?php echo esc_attr($this->get_field_id('address')); ?>" name="<?php echo esc_attr($this->get_field_name('address')); ?>"><?php echo esc_attr($address); ?></textarea>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('phone')); ?>"><?php esc_html_e("Phone:", 'consultaid'); ?></label>
            <input type="text" class="widefat" id="<?php echo esc_attr($this->get_field_id('phone')); ?>" name="<?php echo esc_attr($this->get_field_name('phone')); ?>" value="<?php echo esc_attr($phone); ?>"/>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('email')); ?>"><?php esc_html_e("Email:", 'consultaid'); ?></label>
            <input type="text" class="widefat" id="<?php echo esc_attr($this->get_field_id('email')); ?>" name="<?php echo esc_attr($this->get_field_name('email')); ?>" value="<?php echo esc_attr($email); ?>"/>
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('hours')); ?>"><?php esc_html_e("Work hours:", 'consultaid'); ?></label>
            <textarea class="widefat" id="<?php echo esc_attr($this->get_field_id('hours')); ?>" name="<?php echo esc_attr($this->get_field_name('hours')); ?>"><?php echo esc_attr($hours); ?></textarea>
        </p>

        <?php
    }

}

add_action('widgets_init', function() { register_widget("Themeton_Address_Widget"); } );
