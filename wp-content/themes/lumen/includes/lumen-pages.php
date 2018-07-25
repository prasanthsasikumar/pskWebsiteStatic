<?php

// **********************************
// Add Meta Boxes for Pages
// **********************************

add_action( 'admin_init', 'lumen_page_background' );

function lumen_page_background() {

  $lumen_page_background = array(
    'id'        => 'lumen_page_background_area',
    'title'     => __('Page Background', 'lumen'),
    'desc'      => __('Choose the background for your page. You can set its background-color, background-behaviour, and background image.', 'lumen'),
    'pages'     => array( 'page' ),
    'context'   => 'normal',
    'priority'  => 'default',
    'fields'    => array(
      array(
		    'id'          => 'lumen_page_background',
		    'type'        => 'background',
		    'label'				=> __('Set a Background', 'lumen'),
		  )
    )
  );
    
  ot_register_meta_box( $lumen_page_background );
}
