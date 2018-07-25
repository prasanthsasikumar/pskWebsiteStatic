<div class="page-background" style="<?php echo get_background(get_the_ID()); ?>"></div>
<div class="page-inner noresults-page">
	<div class="row">
		<div class="span12">
			<div class="col-lg-12 col-md-12">	
				<h3><?php _e("NOTHING FOUND", 'lumen'); ?></h3>
				<p><?php _e("Sorry, but nothing matched your search criteria.", 'lumen'); ?></p><p><?php _e("Please try again with some different keywords.", 'lumen'); ?></p>
				<?php the_widget('WP_Widget_Search'); ?>
			</div>
		</div>
	</div>
</div>