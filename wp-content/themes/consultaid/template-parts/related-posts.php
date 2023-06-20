<?php
	$tags = wp_get_post_categories($post->ID);
	if ($tags) {
		$tag_ids = array();
		foreach($tags as $individual_tag) $tag_ids[] = $individual_tag;
		 
		$args=array(
			'cat' => $tag_ids,
			'post__not_in' => array($post->ID),
			'showposts'=> Themeton_Std::getopt('post_relatedpostsnumber'),  // Number of related posts that will be shown.
			'ignore_sticky_posts'=> 1
		);
		$column = Themeton_Std::getopt('post_relatedpostsnumber');

		$class = "uk-width-1-".$column."@s uk-width-1-".$column."@m uk-width-1-".$column."@l";
		 
		$my_query = new WP_Query($args);
		if( $my_query->have_posts() ) {
		?>
			<div class="uk-clearfix"></div>
			<div class="uk-container related-post" >
				<h3><?php esc_html_e('Related Post','consultaid'); ?></h3>
				<div class="uk-grid">
				<?php
					while ($my_query->have_posts()) {
						$my_query->the_post();
						?>
						<div class="<?php printf('%s',$class); ?>">
							<article>
								<?php
								$content = '';
								if ( has_post_thumbnail() ) { ?>
											<?php 
											if ($column == 2) { 
												the_post_thumbnail('consultaid-related-post',array('class' => 'related-thumb-left'));
												if (strlen(get_the_title())<31) {
													$content = get_the_excerpt(); 
													$content = substr( $content , 0, 60);
												}
												else $content = '';
											}
											else the_post_thumbnail('consultaid-vc-blog-thumbnail');
											?>
								<?php } else {
										$content = get_the_excerpt(); 
										$content = substr( $content , 0, 70);
									} ?>
								<div>
									<h5>
										<a href="<?php the_permalink() ?>"><?php the_title(); ?></a>
									</h5>
										<p><?php 
										printf('%s',$content);
										?></p>
								</div><!-- /.blog-content -->
							</article>
						</div>
					<?php } ?>
				</div>
			</div>
			<?php
		}
		wp_reset_postdata();
	}
?>