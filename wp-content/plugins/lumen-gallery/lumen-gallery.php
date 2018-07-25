<?php
/*
Plugin Name: Lumen Gallery
Description: A gallery plugin for the Lumen WordPress Theme
Version: 1.0
Author: Explora Themes
Author URI: http://www.explora.com.uy/
*/


// **********************************
// Create and add Gallery post type
// **********************************

add_action('init', 'lumen_gallery_create_posttype');
function lumen_gallery_create_posttype() {
  $portfolio_args = array(
    'label' => __('Gallery Item', 'lumen'),
    'singular_label' => __('Gallery Item', 'lumen'),
    'public' => true,
    'show_ui' => true,
    'capability_type' => 'post',
    'hierarchical' => false,
    'rewrite' => true,
    'supports' => array('title')
  );
  register_post_type('gallery', $portfolio_args);
} 

// **********************************
// Create and add the Gallery Category taxonomy
// **********************************

add_action('init', 'explorasky_gallery_category_taxonomy');
function explorasky_gallery_category_taxonomy(){
	register_taxonomy(
		'gallery_category',
		'gallery',
		array(
			// Hierarchical taxonomy (like categories)
			'hierarchical' => true,
			// This array of options controls the labels displayed in the WordPress Admin UI
			'labels' => array(
				'name' => __('Categories', 'lumen'),
				'singular_name' => __('Category', 'lumen'),
				'search_items' =>  __('Search Categories', 'lumen'),
				'all_items' => __('All Categories', 'lumen'),
				'parent_item' => __('Parent Category', 'lumen'),
				'parent_item_colon' => __('Parent Category:', 'lumen'),
				'edit_item' => __('Edit Category', 'lumen'),
				'update_item' => __('Update Category', 'lumen'),
				'add_new_item' => __('Add New Category', 'lumen'),
				'new_item_name' => __('New Category Name', 'lumen'),
				'menu_name' => __('Categories', 'lumen'),
				// Control the slugs used for this taxonomy
				'rewrite' => array(
					'slug' => 'gallery_category', // This controls the base slug that will display before each term
					'with_front' => false, // Don't display the category base before "/work_types/"
					'hierarchical' => true // This will allow URL's like "/work_types/design/web_design/"
				)
			)
		)
	);
}  


// **********************************
// Add Meta Boxes for Gallery Items
// **********************************
	
add_action( 'admin_init', 'lumen_gallery_meta_boxes' );
	
function lumen_gallery_meta_boxes() {
	if(function_exists("ot_register_meta_box")){
	  $lumen_gallery_intro = array(
	    'id'        => 'lumen_gallery_intro',
	    'title'     => __('Gallery Item Introduction', 'lumen'),
	    'desc'      => __('Write a short introduction for this gallery item (optional).', 'lumen'),
	    'pages'     => array( 'gallery' ),
	    'context'   => 'normal',
	    'priority'  => 'default',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_gallery_intro_text',
	        'label'       => __('Gallery Item Description', 'lumen'),
	        'type'        => 'text'
	      )
	    )
	  );
	  
	  $lumen_gallery_display = array(
	    'id'        => 'lumen_gallery_display',
	    'title'     => __('Image display options', 'lumen'),
	    'desc'      => __('Choose the way you want this image to be shown.', 'lumen'),
	    'pages'     => array( 'gallery' ),
	    'context'   => 'side',
	    'priority'  => 'high',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_gallery_display_size',
	        'label'       => __('Size', 'lumen'),
	        'type'        => 'radio',
	        'choices'     => array( 
	          array(
	            'value'       => 'cover',
	            'label'       => __('Cover: Scale the image to be as large as possible so that the page is completely covered by the image. Some parts of the  image may not be in view within the image positioning area.', 'lumen'),
	            'src'         => ''
	          ),
	          array(
	            'value'       => 'contain',
	            'label'       => __('Contain: Scale the image to the largest size such that both its width and its height can fit inside the content area', 'lumen'),
	            'src'         => ''
	          )
	        ),
	        'std'							=> 'cover'
	      )
	    )
	  );
	  
	  $lumen_gallery_featured_images = array(
	    'id'        => 'lumen_gallery_featured_images',
	    'title'     => __('Featured image', 'lumen'),
	    'desc'      => __('Upload the image for this gallery item.', 'lumen'),
	    'pages'     => array( 'gallery' ),
	    'context'   => 'normal',
	    'priority'  => 'low',
	    'fields'    => array(
	      array(
	        'id'    => 'lumen_gallery_featured_image_1',
	        'label' => __('Featured Image', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      )
	    )
	  );
	  
	  ot_register_meta_box( $lumen_gallery_intro );
	  ot_register_meta_box( $lumen_gallery_display );
	  ot_register_meta_box( $lumen_gallery_featured_images );
	  
	}

}

// **********************************
// Add Meta Boxes for Pages
// **********************************
	
add_action( 'admin_init', 'lumen_gallery_categories' );

function lumen_gallery_categories() {
	if(isset($_GET['post']) || isset($_POST['post_ID'])){
		$post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'];	
	
		$template_file = get_post_meta($post_id, '_wp_page_template', TRUE);
		
	  $lumen_gallery_categories = array(
	    'id'        => 'lumen_gallery_categories_metabox',
	    'title'     => __('Gallery Categories', 'lumen'),
	    'desc'      => __('Choose the categories you want this gallery to show. Leave them all unckecked to show all gallery items.', 'lumen'),
	    'pages'     => array( 'page' ),
	    'context'   => 'side',
	    'priority'  => 'default',
	    'fields'    => array(
		      array(
	        'id'          => 'lumen_gallery_categories',
	        'label'       => 'Categories',
	        'type'        => 'taxonomy-checkbox',
	        'post_type'   => 'gallery',
	        'taxonomy'    => 'gallery_category'
	      )
	    )
	  );
	  if (function_exists("ot_register_meta_box") && $template_file == 'gallery.php') {
	  	ot_register_meta_box( $lumen_gallery_categories );
	  }
  }
}