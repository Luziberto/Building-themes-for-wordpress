<div class="uk-grid author-container">
	<div class="uk-width-auto uk-flex uk-flex-center author-col-1">
		<?php
		global $post;
		echo get_avatar( $post->post_author, 150 );
		?>
	</div>
	<div class=" uk-width-expand uk-width-5-6@m uk-width-5-6@s">
		<div>
			<h3><a href="<?php echo get_author_posts_url($post->post_author); ?>"><?php the_author(); ?></a></h3>
			<span class="uk-text-middle"><?php the_author_meta('description'); ?></span>
		</div>
	</div>
</div>