<script type="text/javascript">
	current_template = 'home'; 
</script>
<input type="hidden" class="page-title" value="<?php echo bloginfo('name') . wp_title(); ?>">
<div class="page-background" style="<?php echo get_background(get_the_ID()); ?>"></div>
<div class="page-inner">
	<div class="row">
		<div class="col-lg-12 col-md-12 homepage">	
			<img src="<?php echo ot_get_option('lumen_home_logo'); ?>" class="aligncenter" style="max-width: <?php echo ot_get_option('lumen_home_logo_max_width'); ?>" >
		</div>
	</div>
	<?php   while ( have_posts() ) : the_post(); ?>
	<?php echo wpautop(do_shortcode(get_the_content())); ?>
	<?php   endwhile; ?>
</div>