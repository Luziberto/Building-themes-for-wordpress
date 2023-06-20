<form action="<?php echo esc_url(home_url('/')); ?>" class="search_form" method="get">
	<input type="text" placeholder="<?php esc_attr_e('Search ...', 'consultaid'); ?>" required="" name="s">
	<button type="submit">
		<i class="fa fa-search"></i>
	</button>
</form>