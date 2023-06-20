<?php 
if (Themeton_Std::getopt('footer')==1) :
?>
		<footer id="footer">
			<div class="uk-container">
			
				<?php TPL::get_builder_bar('footer_top'); ?>

				<div class="uk-grid">
					<?php
		            $footer_col = 4;
		            $footer_columns = array();
		            $footer_style = Themeton_Std::getopt('footer_columns');
		            switch($footer_style){
		                case '1': // 12
		                    $footer_col = 1;
		                    $footer_columns = array(
		                            'uk-width-1-1@s'
		                        );
		                    break;
		                case '2':// 6/6
		                    $footer_col = 2;
		                    $footer_columns = array(
		                            'uk-width-1-2@s',
		                            'uk-width-1-2@s'
		                        );
		                    break;
		                case '3': // 6/3/3
		                    $footer_col = 3;
		                    $footer_columns = array(
		                            'uk-width-1-2@s',
		                            'uk-width-2-4@s',
		                            'uk-width-2-4@s'
		                        );
		                    break;
		                case '4':// 3/3/6
		                    $footer_col = 3;
		                    $footer_columns = array(
		                            'uk-width-2-4@s',
		                            'uk-width-2-4@s',
		                            'uk-width-1-2@s'
		                        );
		                    break;
		                case '5':// 4/4/4
		                    $footer_col = 3;
		                    $footer_columns = array(
		                            'uk-width-1-3@s',
		                            'uk-width-1-3@s',
		                            'uk-width-1-3@s'
		                        );
		                    break;
		                case '6':// 3/2/4/3
		                    $footer_col = 4;
		                    $footer_columns = array(
		                            'uk-width-1-4@s',
		                            'uk-width-1-4@s',
		                            'uk-width-1-4@s',
		                            'uk-width-1-4@s'
		                        );
		                    break;
		                default:
		                    $footer_col = 4;
		                    $footer_columns = array(
		                            'uk-width-1-4@s',
		                            'uk-width-1-6@s',
		                            'uk-width-1-4@s',
		                            'uk-width-1-3@s'
		                        );
		                    break;
		            }
		            for ($i = 1; $i <= $footer_col; $i++) {

		                // Footer columns
		                echo "<div class='".$footer_columns[$i - 1]." footer-column footer-column-$i'>";
		                    dynamic_sidebar('footer'.$i);
		                echo "</div>";
		            }
		            ?>
				</div><!-- end .uk-grid -->

				<?php TPL::get_builder_bar('footer_sub'); ?>

			</div>
		</footer>        

	</div>
	<!--// .wrapper -->
	<?php get_template_part('template-parts/svg-icons'); ?>

	<?php endif; wp_footer(); ?>

</body>
</html>