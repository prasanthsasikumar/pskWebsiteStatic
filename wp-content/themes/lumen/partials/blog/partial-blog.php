<input type="hidden" class="page-title" value="<?php echo bloginfo('name') . wp_title(); ?>">
<div class="page-background" style="<?php echo get_background(get_queried_object()->ID); ?>"></div>
<div class="page-inner-content">
	<section class="sidebar">
		<a href="" class="close-sidebar">x</a>
		<?php 
		if ( dynamic_sidebar('lumen_blog_sidebar') ) : 
		else : 
		?>
		<?php endif; ?>
	</section>
	<div class="top-bar">
		<a id="toggle-sidebar" href=""><?php _e('Sidebar', 'lumen'); ?></a>
		<a id="toggle-categories" href=""><?php _e('Categories', 'lumen'); ?></a>
		<ul class="categories">
		<?php 
			$current_category = get_category( get_query_var( 'cat' ) );
			if(isset($current_category->cat_ID)){
				$active = "";	
			}else{
				$active = 'class="active"';
			}
	  ?>
			<li <?php echo $active; ?>><a href="<?php if( get_option( 'show_on_front' ) == 'page' ) echo get_permalink( get_option('page_for_posts' ) );
else echo home_url();?>"><?php _e('ALL', 'lumen'); ?></a></li>
		<?php
			$categories = get_categories(array(
				'type' => 'post',
				'taxonomy' => 'category'
			));
			foreach($categories as $category){
				$active = "";
				if(isset($current_category->cat_ID) && $current_category->cat_ID == $category->cat_ID) { $active = 'class="active"'; }
		?>
			<li <?php echo $active; ?>><a href="<?php echo get_category_link($category->cat_ID); ?>"><?php echo $category->name; ?></a></li>
		<?php			
			}
		?>
		</ul>
	</div>
	<section class="posts-wrapper">
		<div class="posts-inner">
			<?php get_template_part('partials/blog/partial', 'postslist'); ?>
		</div><!-- END POSTS-INNER -->
	</section>
</div>