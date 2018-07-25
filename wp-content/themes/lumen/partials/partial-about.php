<script type="text/javascript">
	current_template = 'contact'; 
</script>
<input type="hidden" class="page-title" value="<?php echo bloginfo('name') . wp_title(); ?>">
<div class="page-background" style="<?php echo get_background(get_the_ID()); ?>"></div>
<div class="page-inner about-page">
	<div class="row">
		<div class="col-lg-8 col-md-8 about">	
			<div class="row">
				<div class="col-lg-4 col-md-5 cold-md-offset-0 col-sm-12 col-xs-12 contact-photo-area">
					<?php if(ot_get_option('lumen_contact_photo')){ ?>
					<div class="contact-photo-wrapper">
						<div class="contact-photo-inner">
							<img class="contact-photo" src="<?php echo ot_get_option('lumen_contact_photo'); ?>" />
						</div>
					</div>
					<?php } ?>
				</div>
				<div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 contact-about-area">
					<?php   while ( have_posts() ) : the_post(); ?>
					<?php echo wpautop(do_shortcode(get_the_content())); ?>
					<?php   endwhile; ?>
				</div>
			</div>
		</div>
		<div class="col-lg-4 col-md-4 contact-form">	
			<?php echo do_shortcode( '[contact-form-7 id="'.ot_get_option('lumen_contact_form_id').'"]' ); ?>
		</div>
	</div>
</div>