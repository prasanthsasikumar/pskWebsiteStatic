<script type="text/javascript">
	current_template = 'gallery'; 
</script>
<input type="hidden" class="page-title" value="<?php echo bloginfo('name') . wp_title(); ?>">
<div class="page-background" style="<?php echo get_background(get_the_ID()); ?>"></div>
<div class="page-inner gallery-page">
	<?php   
	$custom_meta = get_post_custom($post->ID);
	$categories_filters = array();
	if(isset($custom_meta['lumen_gallery_categories']) && isset($custom_meta['lumen_gallery_categories'][0])){
		$categories_filters = unserialize($custom_meta['lumen_gallery_categories'][0]);
	}
	
	$items = new WP_Query(array(
		'post_type' => 'gallery',
		'posts_per_page' => -1,
		'order' => 'ASC'
	));
	
	if(sizeof($categories_filters) > 0){
		$items = new WP_Query(array(
			'post_type' => 'gallery',
			'posts_per_page' => -1,
			'order' => 'ASC',
			'tax_query' => array(
				array(
					'taxonomy' => 'gallery_category',
					'field' => 'term_id',
					'terms' => array_values($categories_filters)
				)
			)
		));
	};
?>	
	<section class="thumbnails">
		<div class="gallery-thumbnails-wrapper">
			<div class="gallery-thumbnails">
				<ul>
		<?php	
			$i = 0;
			$first_thumb = ""; $first_image = ""; $first_title = ""; $first_desc = "";
			
			if ( $items->have_posts() ) :
				while ( $items->have_posts() ) : $items->the_post(); 
					$i++;
					$custom_meta = get_post_custom(get_the_ID());
					if(sizeof($custom_meta) > 0 && isset($custom_meta['lumen_gallery_featured_image_1'])){
						$image = $custom_meta['lumen_gallery_featured_image_1'];
						$image_id = lumen_get_attachment_id($image[0]);	
						$image_thumb = wp_get_attachment_image_src( $image_id, 'thumbnail' );
						$full_image = wp_get_attachment_image_src( $image_id, 'full' );
						if($first_thumb == ""){
							$first_thumb = $image_thumb;
							$first_image = wp_get_attachment_image_src( $image_id, 'full' );
						}
						if(isset($custom_meta['lumen_gallery_display_size'])){
							$background_size = $custom_meta['lumen_gallery_display_size'];
							$background_size = $background_size[0];
						}else{
							$background_size = "cover";	
						}
						$title = get_the_title(); 
						$desc = "";
						if(isset($custom_meta['lumen_gallery_intro_text'])){
							$desc = $custom_meta['lumen_gallery_intro_text'];
							$desc = $desc[0];
						}
					}
					if($i == 1 && isset($title)) { $first_title = $title; }
					if($i == 1 && isset($desc)) { $first_desc = $desc; } ?>
					
					<li <?php if($first_thumb == $image_thumb) { echo 'class="active"'; } ?> data-full_image="<?php echo $full_image[0]; ?>" data-background_size="<?php echo $background_size; ?>" id="thumb-<?php echo $i; ?>" data-title="<?php echo $title; ?>" data-description="<?php echo $desc; ?>">
						<img src="<?php echo $image_thumb[0] ?>" alt="" />
					</li>
		<?php   
					endwhile;
				endif;
		?>
				</ul>
			</div>
		</div>
	</section>
	
	<section class="gallery-image gallery-image-1 from-up active transition" style="background-image: url(<?php echo $first_image[0]; ?>)">
		<?php 
		$hidden = "";
		if(strlen($first_title) == 0 && strlen($first_desc) == 0){ $hidden = "hidden"; } ?>
		<div class="info mobile-inactive <?php echo $hidden; ?>">
			<?php if(strlen($first_title) > 0) { ?><p class="title"><?php echo $first_title; ?></p><?php } ?>
			<?php if(strlen($first_desc) > 0) { ?><p class="description"><?php echo $first_desc; ?></p><?php } ?>
		</div>
		<button class="button-show-info mobile-inactive <?php echo $hidden; ?>"><span>+</span></button>
		
	</section>
	<section class="gallery-image gallery-image-2 from-up transition">
		<div class="info mobile-inactive">
			<p class="title"></p>
			<p class="description"></p>
		</div>
		<button class="button-show-info mobile-inactive"><span>+</span></button>
	</section>
</div>



