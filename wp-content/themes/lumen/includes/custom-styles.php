<?php

function lumen_custom_css(){
	lumen_main_nav();	
	lumen_contact();
	photos_overlay();
}

function lumen_main_nav(){
	//$locations = get_nav_menu_locations();
  //$menu = wp_get_nav_menu_object( $locations[ 'lumen_main_menu' ] );
  //$menuitems = wp_get_nav_menu_items( $menu->term_id );
	//$menu_offset = sizeof($menuitems) * 40;
	$menu_offset = 0;
	
	if(($locations = get_nav_menu_locations()) && isset($locations['lumen_main_menu'])) {
    $menu = wp_get_nav_menu_object($locations['lumen_main_menu']);
    $menu_items = wp_get_nav_menu_items($menu->term_id);
    foreach((array) $menu_items as $key => $menu_item) {
      if($menu_item->menu_item_parent == 0 ){
	   	  $menu_offset ++;
      }
    }
	}
	$menu_offset *= 40;
	
	$lumen_nav_background_color = ot_get_option('lumen_nav_background_color');
	$lumen_nav_background_color_alpha = hex2rgb($lumen_nav_background_color, ot_get_option('lumen_nav_opacity'));
?>
	.main-header, .gallery-navigation nav, .gallery-image .info, .button-show-info.mobile-inactive { 
		background-color: <?php echo $lumen_nav_background_color; ?>;
		background-color: <?php echo $lumen_nav_background_color_alpha; ?>; 
	}
	.main-nav ul { margin-top: -<?php echo $menu_offset; ?>px; }
	.main-nav a { background-color: <?php echo ot_get_option('lumen_navigation_items_caption_background_color'); ?>; }
	.main-nav a:after { border-right-color: <?php echo ot_get_option('lumen_navigation_items_caption_background_color'); ?>; }
	
	.gallery-thumbnails li.active { border-color: <?php echo ot_get_option('lumen_navigation_items_caption_background_color'); ?>; }
	
	article.sticky .post-content { 
		background-color: <?php echo $lumen_nav_background_color; ?>!important;
		background-color: <?php echo $lumen_nav_background_color_alpha; ?>!important;
	}
<?php	
}

function lumen_contact(){
	$lumen_contact_photo_size = ot_get_option('lumen_contact_photo_size');
	$lumen_contact_photo_wrapper = ot_get_option('lumen_contact_circular_photo');
?>
	.contact-photo-inner { width: <?php echo $lumen_contact_photo_size; ?>px; height: <?php echo $lumen_contact_photo_size; ?>px;  }
	
<?php	
	if(isset($lumen_contact_photo_wrapper[0]) && $lumen_contact_photo_wrapper[0] == "Yes"){
?>	
	.contact-photo-wrapper { width: <?php echo intval($lumen_contact_photo_size)+30; ?>px; height: <?php echo intval($lumen_contact_photo_size)+30; ?>px; }
	.contact-photo-inner { border-radius: <?php echo $lumen_contact_photo_size; ?>px; border: 15px solid rgba(255, 255, 255, .5); }
	.contact-photo { width: <?php echo $lumen_contact_photo_size; ?>px; height: <?php echo $lumen_contact_photo_size; ?>px; margin: -15px; }
<?php	
	}else{
?>	
	.contact-photo-wrapper { background: transparent!important; }
	.contact-photo { border-radius: 0!important; border:none!important; }	
	.contact-photo { width: <?php echo $lumen_contact_photo_size; ?>px; height: <?php echo $lumen_contact_photo_size; ?>px; }
<?php		
	}
}

function photos_overlay(){
	$lumen_blog_overlay_opacity = ot_get_option('lumen_blog_overlay_opacity');
	$lumen_portfolio_overlay_opacity = ot_get_option('lumen_portfolio_overlay_opacity');
?>
	.works-inner .img-container .overlay { opacity: <?php echo $lumen_portfolio_overlay_opacity; ?> }
	.posts-inner .img-container .overlay { opacity: <?php echo $lumen_blog_overlay_opacity; ?> }
<?php
}

function hex2rgb($hex, $opacity) {
	$hex = str_replace("#", "", $hex);

	if(strlen($hex) == 3) {
		$r = hexdec(substr($hex,0,1).substr($hex,0,1));
		$g = hexdec(substr($hex,1,1).substr($hex,1,1));
		$b = hexdec(substr($hex,2,1).substr($hex,2,1));
	} else {
		$r = hexdec(substr($hex,0,2));
		$g = hexdec(substr($hex,2,2));
		$b = hexdec(substr($hex,4,2));
	}
	$rgb = array($r, $g, $b);
	
	if($opacity){
		$opacity = ((int) $opacity) / 100;
		return 'rgba(' . implode(",", $rgb) . ', ' . $opacity . ')';
	}else{
		return 'rgb(' . implode(",", $rgb) . ')';
	}
}