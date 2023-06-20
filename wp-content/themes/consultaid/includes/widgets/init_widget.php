<?php

/* Custom widgets */
$template_widget_files = array(
    '/includes/widgets/social-links.php',
    '/includes/widgets/recent-posts.php',
    '/includes/widgets/address.php'
);
foreach ($template_widget_files as $load_file) {
	require get_template_directory() . $load_file;
}
?>