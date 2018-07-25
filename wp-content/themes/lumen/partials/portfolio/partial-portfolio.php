<script type="text/javascript">
	current_template = 'portfolio';
</script>
<input type="hidden" class="page-title" value="<?php echo bloginfo('name') . wp_title(); ?>">
<div class="page-background" style="<?php echo get_background(get_the_ID()); ?>"></div>
<div class="page-inner-content">
	<section class="sidebar">
		<a href="" class="close-sidebar">x</a>
		<?php 
		if ( dynamic_sidebar('lumen_portfolio_sidebar') ) : 
		else : 
		?>
		<?php endif; ?>
	</section>
	<div class="top-bar">
		<a id="toggle-sidebar" href=""><?php _e('Sidebar', 'lumen'); ?></a>
		<a id="toggle-categories" href=""><?php _e('Categories', 'lumen'); ?></a>
		<ul class="categories">
			<li class="all active"><a href="#">ALL</a></li>
		<?php
			$work_types = get_categories(array(
				'type' => 'portfolio',
				'taxonomy' => 'work_type'
			));
			$custom_meta = get_post_custom($post->ID);
			$work_types_filters = array();
			if(isset($custom_meta['lumen_portfolio_categories']) && isset($custom_meta['lumen_portfolio_categories'][0])){
				$work_types_filters = unserialize($custom_meta['lumen_portfolio_categories'][0]);
			}
			foreach($work_types as $work_type){
				if(sizeof($work_types_filters) == 0 || in_array($work_type->term_id, $work_types_filters)){
		?>
			<li><a href="#"><?php echo $work_type->name; ?></a></li>
		<?php
				}
			}
			wp_reset_postdata();
		?>
		</ul>
	</div>
	<section class="works-wrapper">
		<div class="works-inner">
			<?php get_template_part('partials/portfolio/partial', 'workslist'); ?>
		</div><!-- END POSTS-INNER -->
	</section>
</div>