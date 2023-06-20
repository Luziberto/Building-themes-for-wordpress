<?php 
$bool = true;
if (Themeton_Std::getmeta('page_title') == "0") {
	$bool = false;
} else {
	if (Themeton_Std::getmeta('page_title') == "" || Themeton_Std::getmeta('page_title')=='default') {
		$optionname = 'page-title-show';
		if(is_single()) {
			$optionname = 'post_title_show';
		} elseif(is_page()) {
			$optionname = 'page_title_show';
		} elseif(get_post_type( get_the_ID() ) == 'portfolio') {
			$optionname = 'portfolio_title_show';
		}
		if (Themeton_Std::getopt($optionname) == '') {
			$bool = false;
		}
	}
}

if ($bool == true) :
?>
<div class="page-title">
	<div class="uk-container">

		<?php TPL::get_builder_bar('page_title'); ?>
	    
	</div><!-- end .uk-container -->
</div><!-- end .page-title -->
<?php endif;  ?>