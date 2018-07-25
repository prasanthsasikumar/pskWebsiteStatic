<?php 
				while ( have_posts() ) { 
					the_post();
					$custom_meta = get_post_custom(get_the_ID());
					
					$post_state = "";
					if(isset($custom_meta['lumen_blog_post_state'])) {
						$post_state = $custom_meta['lumen_blog_post_state'];	
						if($post_state[0] == "open") { $post_state = "open_at_init"; } else { $post_state = $post_state[0]; }
					}
?>
			<article <?php post_class('blog-post' . ' ' . $post_state); ?> id="post-<?php echo get_the_ID(); ?>" data-url="<?php echo get_permalink(get_the_ID()); ?>">
				<div class="post-inner">
					<div class="post-listing">
						<?php 
									
						// Get the Preview Image
						$image_preview = array();
						if(isset($custom_meta['lumen_blog_preview_image_image'])){
							$image_preview = $custom_meta['lumen_blog_preview_image_image'];	
						}
						
						// Look for a featured image 
						$max_featured_images = 10; $i = 0; $featured_image = array(); $images_count = 0;
						while($i < $max_featured_images) {
							$i++;
							if(isset($custom_meta['lumen_blog_featured_image_'.$i])){
								$feat_img = $custom_meta['lumen_blog_featured_image_'.$i];
								if(sizeof($feat_img) > 0) { 
									$images_count ++; 
									if(sizeof($featured_image) == 0){
										$featured_image = $custom_meta['lumen_blog_featured_image_'.$i];	
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
		
						?>
						<div class="img-container" style="background-image:url(<?php echo $image_preview; ?>);">
							<div class="overlay"></div>
							<div class="zoom-content">
<?php						$img_index = 0;
								for($img = 1; $img  <= $max_featured_images; $img ++){
									if(isset($custom_meta['lumen_blog_featured_image_'.$img])){
										$featured_image = $custom_meta['lumen_blog_featured_image_'.$img];	
										if(sizeof($featured_image) > 0){ 
											$caption = "";
											if(isset($custom_meta['lumen_blog_featured_image_'.$img.'_caption'][0])) { $caption = $custom_meta['lumen_blog_featured_image_'.$img.'_caption'][0]; }
?>											
									<a href="<?php echo $featured_image[0] ?>" data-gallery-index="<?php echo $img_index; ?>" data-gallery-type="image" title="<?php echo $caption; ?>"></a>
	<?php								$img_index ++;
										}
									}									
								}
								
								$video = array();
								if(isset($custom_meta['lumen_blog_video'])) {
									$video = $custom_meta['lumen_blog_video'];	
								}
								if(sizeof($video) > 0){  ?>
								<a href="<?php echo $video[0] ?>" data-gallery-type="iframe" data-gallery-index="<?php echo $img_index; ?>"></a>	
<?php						}
?>
							</div>
<?php					$fullscreen = "";	
							if(sizeof($video) > 0 || $images_count > 0){ $fullscreen = "fullscreen"; } ?>
							<div class="tags-wrapper">
								<div class="blurred-image" style="background-image:url(<?php echo $image_preview; ?>);"></div>
								<div class="tags <?php echo $fullscreen; ?>">
	<?php						$posttags = get_the_tags();
									if ($posttags) { ?>
										<ul>
											<li><span>tags / </span></li>
  <?php							foreach($posttags as $tag) { ?>
											<li><a href="<?php echo get_tag_link($tag->term_id); ?>"><?php echo $tag->name ?></a></li>
	<?php							} ?>
										</ul>
	<?php						} 
	?>										
										
	<?php						if($fullscreen == "fullscreen"){ ?>
										<a href="#" class="fullscreen"></a>
	<?php						}
	?>
								</div>
							</div>
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
						<div class="post-info <?php echo $post_types; ?>">

							<span class="post-title open <?php if($post_state == "open_at_init"){ echo $post_state; } ?>"><?php the_title(); ?></span>

							<?php if(isset($post_description) && $post_description){ ?>
							<span class="post-description open"><?php echo $post_description; ?></span>	
							<?php } ?>
							<span class="post-date"><span class="posted-on"><?php _e('POSTED ON', 'lumen') ?></span><br><span class="date"><?php echo get_the_date(); ?></span></span>
							<span class="post-comments"><a href=""><span><?php comments_number('0', '1', '%'); ?></span></a></span>
							<span class="post-likes"><?php if( function_exists('dot_irecommendthis') ) dot_irecommendthis(); ?></span>
						</div>	
					</div><!-- END POST-LISTING -->
					<div class="post-content">
						<div class="post-content-wrapper">
							<div class="content">
								<?php $post_id = get_the_ID(); ?>
								<a href="#" class="close-post" id="close-post-<?php echo $post_id ?>">x</a>
								<h6><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>	
								<?php the_content(); ?>
								<?php wp_link_pages(); ?>
								<div style="width:100%; height:1px;"></div>
								<a href="#" class="toggle-comments" data-text-backup="<?php _e('Hide Comments', 'lumen'); ?>"><?php comments_number(__('Leave a reply', 'lumen'), __('Show Comments', 'lumen').' (1)', __('Show Comments', 'lumen').' (%)'); ?></a>
								<hr class="toggle-comments-line">
								<div class="comments" id="comments-<?php echo $post_id; ?>">
									<ul class="comments"></ul>
									<!-- BEGIN COMMENT FORM -->
									<?php  ?><!-- END COMMENT FORM -->
								</div><!-- END COMMENTS -->
							</div><!-- END CONTENT -->
						</div><!-- END POST-CONTENT-WRAPPER -->
					</div><!-- END POST-CONTENT -->
				</div><!-- END POST-INNER -->
				<div class="left-shadow"></div>
				<div class="right-shadow"></div>
			</article>
<?php } ?>
			<canvas id="loader" width="80" height="80"></canvas>
			<div class="next-page"><?php next_posts_link( 'NEXT PAGE' , 0 ); ?></div>