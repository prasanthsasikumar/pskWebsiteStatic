<?php

// Gets the styles string of a background option
function get_background($page_id){

	$custom_meta = get_post_custom($page_id);
	
	if(isset($custom_meta['lumen_page_background']) && isset($custom_meta['lumen_page_background'][0]) && $page_id != "default"){
		$background = unserialize($custom_meta['lumen_page_background'][0]);	
		if($background['background-color'] == "" && $background['background-image'] == "") {
			$background = ot_get_option('lumen_site_default_background');
		}
	}	else {
		$background = ot_get_option('lumen_site_default_background');
	}
	
	$background_image = "";
	if(isset($background['background-image'])){
		$background_image = $background['background-image'];
		if(strlen($background_image) > 0) {
			$background_image = 'url('.$background_image.')';
		}
	}
	
	$output = "";
	$background_repeat = false;
	
	if(isset($background['background-color'])){ $output .= $background['background-color']." "; }
	$output .= $background_image." ";
	if(isset($background['background-repeat'])){ 
		$output .= $background['background-repeat']." "; 
		if($background['background-repeat'] == "repeat"){
			$background_repeat = true;		
		}  
	}
	if(isset($background['background-attachment'])){ $output .= $background['background-attachment']." "; }
	if(isset($background['background-position'])){ $output .= $background['background-position']." "; }
	
	if(strlen(trim($output)) > 0 && $background_repeat) { 
		return 'background: '.$output.'; background-size: inherit!important;'; 
	}else{
		return 'background: '.$output; 
	}
	
	return "";
}

// Gets the ID of an attachment given its URL.

function lumen_get_attachment_id( $guid ) {
  global $wpdb;

  /* nothing to find return false */
  if ( ! $guid )
    return false;

  /* get the ID */
  $id = $wpdb->get_var( $wpdb->prepare(
    "
    SELECT  p.ID
    FROM    $wpdb->posts p
    WHERE   p.guid = %s
            AND p.post_type = %s
    ",
    $guid,
    'attachment'
  ) );

  /* the ID was not found, try getting it the expensive WordPress way */
  if ( $id == 0 )
    $id = url_to_postid( $guid );

  return $id;
}


//Clean Up WordPress Shortcode Formatting - important for nested shortcodes

function lumen_fix_shortcodes($content){   
    $array = array (
        '<p>[' => '[', 
        ']</p>' => ']', 
        ']<br />' => ']'
    );

    $content = strtr($content, $array);
    return $content;
}
add_filter('the_content', 'lumen_fix_shortcodes');

?>