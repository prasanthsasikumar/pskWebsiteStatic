<?php   
	$custom_meta = get_post_custom($post->ID);
	$work_types_filters = array();
	if(isset($custom_meta['lumen_portfolio_categories']) && isset($custom_meta['lumen_portfolio_categories'][0])){
		$work_types_filters = unserialize($custom_meta['lumen_portfolio_categories'][0]);
	}
	
	$works = new WP_Query(array(
			'post_type' => 'portfolio',
			'posts_per_page' => -1,
			'meta_key' => 'lumen_portfolio_block_priority',
			'orderby' => 'meta_value_num',
			'order' => 'ASC'
		));
	
	if(sizeof($work_types_filters) > 0){
		$works = new WP_Query(array(
			'post_type' => 'portfolio',
			'posts_per_page' => -1,
			'meta_key' => 'lumen_portfolio_block_priority',
			'orderby' => 'meta_value_num',
			'order' => 'ASC',
			'tax_query' => array(
				array(
					'taxonomy' => 'work_type',
					'field' => 'term_id',
					'terms' => array_values($work_types_filters)
				)
			)
		));
	}
	if ( $works->have_posts() ) :
		while ( $works->have_posts() ) : $works->the_post();
			$custom_meta = get_post_custom(get_the_ID());
			$block_type = $custom_meta['lumen_portfolio_block_size'];
			if($block_type[0] != "none"){
				$work_types = get_the_terms( get_the_ID(), 'work_type' );
				if( $work_types && ! is_wp_error( $work_types ) ){
					$work_types_list = array();
					foreach ( $work_types as $work_type ) {
						$work_types_list[] = $work_type->name;
					}
					$work_types_string = join( ",", $work_types_list );
				}
				$post_state = $custom_meta['lumen_portfolio_block_state'];	
		?>
				<article <?php post_class('portfolio-post visible ' . $block_type[0] .  ' ' . $post_state[0] ); ?> id="work-<?php echo get_the_ID(); ?>" data-url="<?php echo get_permalink(get_the_ID()); ?>" data-work_types=",<?php echo $work_types_string; ?>,">
					<div class="work-inner">
						<div class="work-listing">
							<?php 					
							// Get the Preview Image
							$image_preview = $custom_meta['lumen_portfolio_preview_image_image'];
							
							// Look for a featured image 
							$max_featured_images = 30; $i = 0; $featured_image = array(); $images_count = 0;
							while($i < $max_featured_images) {
								$i++;
								if(isset($custom_meta['lumen_portfolio_featured_image_'.$i])){
									$feat_img = $custom_meta['lumen_portfolio_featured_image_'.$i];
									if(sizeof($feat_img) > 0) { 
										$images_count ++; 
										if(sizeof($featured_image) == 0){
											$featured_image = $custom_meta['lumen_portfolio_featured_image_'.$i];	
										}
									}
								}
							}
	
							if(sizeof($image_preview) == 0) {
							  // If there's no preview photo uploaded.
							  if($images_count > 0){
							  	// Get the cropped featured image.
							  	$featured_image_id = lumen_get_attachment_id($featured_image[0]);
									$image_preview = wp_get_attachment_image_src( $featured_image_id, 'full' );
									$image_preview = $image_preview[0];
							  }else{
								 	// No image to show
								 	$image_preview = "";
							  }
							}else{
								$image_preview = $image_preview[0];
							}
							
							// Post Description
							if(isset($custom_meta['lumen_portfolio_intro_text'])){
								$work_description = $custom_meta['lumen_portfolio_intro_text'][0];	
							}else{
								$work_description = "";
							}
							
							?>			
							<div class="img-container" style="background-image:url(<?php echo $image_preview; ?>);">
								<div class="overlay"></div>
	<?php					if(isset($custom_meta['lumen_portfolio_video'])){
									$video = $custom_meta['lumen_portfolio_video'];
								}else{
									$video = array();
								}
								if($images_count > 0 || sizeof($video) > 0){ ?>
								<div class="zoom-content">
	<?php						$img_index = 0;
									for($img = 1; $img  <= $max_featured_images; $img ++){
										if(isset($custom_meta['lumen_portfolio_featured_image_'.$img])){
											$featured_image = $custom_meta['lumen_portfolio_featured_image_'.$img];	
											if(sizeof($featured_image) > 0){
												$caption = "";
												if(isset($custom_meta['lumen_portfolio_featured_image_'.$img.'_caption'][0])) { $caption = $custom_meta['lumen_portfolio_featured_image_'.$img.'_caption'][0]; }
	?>
										<a href="<?php echo $featured_image[0] ?>" data-gallery-index="<?php echo $img_index; ?>" data-gallery-type="image" title="<?php echo esc_attr($caption); ?>"></a>
	<?php									$img_index ++;
											}
										}
									}
									
									if(sizeof($video) > 0){ ?>
									<a href="<?php echo $video[0] ?>" data-gallery-type="iframe"></a>	
	<?php						}
	?>
								</div>
	<?php 				} 
								if(! (($post_state[0] == "post-it-left" || $post_state[0] == "post-it-right") && strlen($work_description) <= 0) && ! (strlen($work_description) <= 0 && strlen(get_the_content() <= 0))){ ?>
								<div class="work-description-wrapper <?php if(strlen(get_the_content()) > 0){ ?>with-content<?php } ?>">
									<div class="blurred-image" style="background-image:url(<?php echo $image_preview; ?>);"></div>
									<span class="work-description">
										<span class="work-description-text">
										<?php if( strlen($work_description) > 0) {
											echo $work_description;
										}else{
											echo wp_trim_words(get_the_content(), 22, "...");
										} ?>
										</span>
	<?php							if(strlen(get_the_content()) > 0){ ?>
										<span class="read-more"> <?php _e('Read more &raquo;', 'lumen', ''); ?></span>
										<?php } ?>
									</span>
								</div>	
	<?php					}
	?>
	
								
							</div>
							
							<?php 
							$post_types = "";
							if($images_count <= 1 && sizeof($video) == 0){
								$post_types = "image";
							}else if($images_count > 1) {
								$post_types = "gallery";
							}
							if(sizeof($video) > 0){ $post_types .= " video"; }
							if(sizeof($video) > 0 && $images_count == 1) { $post_types = "image video"; }
							?>
							
							<div class="work-info <?php echo $post_types; ?>">
								<span class="work-title"><span class="title"><?php the_title(); ?></span><br /><span class="date"><?php echo get_the_date(); ?></span></span>
								<span class="work-likes"><?php if( function_exists('dot_irecommendthis') ) dot_irecommendthis(); ?></span>
							</div>	
						</div><!-- END POST-LISTING -->
						<div class="work-content">
							<div class="work-content-wrapper">
								<div class="content">
									<?php $work_id = get_the_ID(); ?>
									<a href="#" class="close-work" id="close-work-<?php echo $work_id ?>">x</a>
									<h6><?php the_title(); ?></h6>
									<?php the_content(); ?>
								</div><!-- END CONTENT -->
							</div><!-- END WORK-CONTENT-WRAPPER -->
						</div><!-- END WORK-CONTENT -->
					</div><!-- END POST-INNER -->
					<div class="left-shadow"></div>
					<div class="right-shadow"></div>
				</article>
	
	<?php   
				}
			endwhile; 
		endif;
			?>
			<canvas id="loader" width="80" height="80"></canvas>
			<div class="next-page"><?php next_posts_link( '' , 0 ); ?></div>