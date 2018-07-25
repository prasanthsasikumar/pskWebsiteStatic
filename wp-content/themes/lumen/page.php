<?php
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strcasecmp('XMLHttpRequest', $_SERVER['HTTP_X_REQUESTED_WITH']) === 0){
	// If the blog is being called from an AJAX request, render the content only.
?>
<input type="hidden" class="page-title" value="<?php echo bloginfo('name') . wp_title(); ?>">
<div class="page-background" style="<?php echo get_background(get_the_ID()); ?>"></div>
<div class="page-inner">
<?php	
	while ( have_posts() ) : the_post();
		echo wpautop(do_shortcode(get_the_content()));
	endwhile; 
?>
</div>
<?php
}else{
	// Otherwise, render the full page.
	get_header();
?>
<input type="hidden" class="page-title" value="<?php echo bloginfo('name') . wp_title(); ?>">
<div class="page-background" style="<?php echo get_background(get_the_ID()); ?>"></div>
<div class="page-inner">
<?php	
	while ( have_posts() ) : the_post();
		echo wpautop(do_shortcode(get_the_content()));
	endwhile; 
?>
</div>
<?php	
	get_footer();
}
?>