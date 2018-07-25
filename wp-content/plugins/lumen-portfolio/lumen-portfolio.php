<?php
/*
Plugin Name: Lumen Portfolio
Description: A portfolio plugin for the Lumen WordPress Theme
Version: 1.2.2
Author: Explora Themes
Author URI: http://www.explora.com.uy/
*/


// **********************************
// Create and add Portfolio post type
// **********************************

add_action('init', 'lumen_portfolio_create_posttype');
function lumen_portfolio_create_posttype() {
  $portfolio_args = array(
    'label' => __('Portfolio', 'lumen'),
    'singular_label' => __('Portfolio', 'lumen'),
    'public' => true,
    'show_ui' => true,
    'capability_type' => 'post',
    'hierarchical' => false,
    'rewrite' => true,
    'supports' => array('title', 'editor')
  );
  register_post_type('portfolio', $portfolio_args);
} 

// **********************************
// Create and add the Work Type taxonomy
// **********************************

add_action('init', 'explorasky_work_type_taxonomy');
function explorasky_work_type_taxonomy(){
	register_taxonomy(
		'work_type',
		'portfolio',
		array(
			// Hierarchical taxonomy (like categories)
			'hierarchical' => true,
			// This array of options controls the labels displayed in the WordPress Admin UI
			'labels' => array(
				'name' => __('Work Types', 'lumen'),
				'singular_name' => __('Work Type', 'lumen'),
				'search_items' =>  __('Search Work Types', 'lumen'),
				'all_items' => __('All Work Types', 'lumen'),
				'parent_item' => __('Parent Work Type', 'lumen'),
				'parent_item_colon' => __('Parent Work Type:', 'lumen'),
				'edit_item' => __('Edit Work Type', 'lumen'),
				'update_item' => __('Update Work Type', 'lumen'),
				'add_new_item' => __('Add New Work Type', 'lumen'),
				'new_item_name' => __('New Work Type Name', 'lumen'),
				'menu_name' => __('Work Types', 'lumen'),
				// Control the slugs used for this taxonomy
				'rewrite' => array(
					'slug' => 'work_types', // This controls the base slug that will display before each term
					'with_front' => false, // Don't display the category base before "/work_types/"
					'hierarchical' => true // This will allow URL's like "/work_types/design/web_design/"
				)
			)
		)
	);
}  

// **********************************
// Add Meta Boxes for Portfolio posts
// **********************************


	
add_action( 'admin_init', 'lumen_portfolio_meta_boxes' );
	
function lumen_portfolio_meta_boxes() {
	if(function_exists("ot_register_meta_box")){
	  $lumen_portfolio_intro = array(
	    'id'        => 'lumen_portfolio_intro',
	    'title'     => __('Work Short Introduction', 'lumen'),
	    'desc'      => __('Write a short introduction for this work. Leave this field empty if you don\'t want to show the description area.', 'lumen'),
	    'pages'     => array( 'portfolio' ),
	    'context'   => 'normal',
	    'priority'  => 'default',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_portfolio_intro_text',
	        'label'       => __('Work Description', 'lumen'),
	        'type'        => 'text'
	      )
	    )
	  );
	  
	  $lumen_portfolio_block = array(
	  	'id'        => 'lumen_portfolio_block',
	    'title'     => __('Work Preview Block', 'lumen'),
	    'desc'      => __('Choose how you want your work to be shown on the list of works on the portfolio page.', 'lumen'),
	    'pages'     => array( 'portfolio' ),
	    'context'   => 'side',
	    'priority'  => 'default',
	    'fields'    => array(
	    	array(
	        'id'          => 'lumen_portfolio_block_priority',
	        'label'       => __('Priority', 'lumen'),
	        'desc' 				=> __('Lower numbers means higher priority', 'lumen'),
	        'type'        => 'text',
	        'std'					=> '1'
	      ),
	    	array(
	        'id'          => 'lumen_portfolio_block_size',
	        'label'       => __('Size', 'lumen'),
	        'type'        => 'radio',
	        'choices'     => array( 
	          array(
	            'value'       => 'none',
	            'label'       => __('Don\'t display', 'lumen'),
	            'src'         => ''
	          ),
	          array(
	            'value'       => 'half',
	            'label'       => 'Half',
	            'src'         => ''
	          ),
	          array(
	            'value'       => 'full',
	            'label'       => 'Full',
	            'src'         => ''
	          )
	        ),
	        'std'							=> 'half'
	      ),
	      array(
	        'id'          => 'lumen_portfolio_block_state',
	        'label'       => __('Initial state', 'lumen'),
	        'type'        => 'radio',
	        'choices'     => array( 
	          array(
	            'value'       => 'closed',
	            'label'       => __('Closed', 'lumen'),
	            'src'         => ''
	          ),
	          array(
	            'value'       => 'open',
	            'label'       => __('Open', 'lumen'),
	            'src'         => ''
	          ),
	          array(
	            'value'       => 'post-it-right',
	            'label'       => __('Post-It (Right)', 'lumen'),
	            'src'         => ''
	          ),
	          array(
	            'value'       => 'post-it-left',
	            'label'       => __('Post-It (Left) (Half blocks only)', 'lumen'),
	            'src'         => ''
	          )
	        ),
	        'std'							=> 'closed'
	      )
	    )
	  );
	  
	  $lumen_portfolio_preview_image = array(
	    'id'        => 'lumen_portfolio_preview_image',
	    'title'     => __('Preview Image', 'lumen'),
	    'desc'      => __('Upload an image for the portfolio works list. If you do not upload a preview image, the featured image will be used instead.', 'lumen'),
	    'pages'     => array( 'portfolio' ),
	    'context'   => 'side',
	    'priority'  => 'default',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_portfolio_preview_image_image',
	        'label'       => __('Preview image', 'lumen'),
	        'type'        => 'upload',
	        'std'					=> ''
	      )
	    )
	  );
	  
	  $lumen_portfolio_featured_images = array(
	    'id'        => 'lumen_portfolio_featured_images',
	    'title'     => __('Featured images', 'lumen'),
	    'desc'      => __('Upload featured the featured images for this work.', 'lumen'),
	    'pages'     => array( 'portfolio' ),
	    'context'   => 'normal',
	    'priority'  => 'low',
	    'fields'    => array(
	      array(
	        'id'    => 'lumen_portfolio_featured_image_1',
	        'label' => __('Featured Image 1', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_1_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_2',
	        'label' => __('Featured Image 2', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_2_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_3',
	        'label' => __('Featured Image 3', 'lumen'),
	        'type'  => 'upload',
	        'std'	  => ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_3_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_4',
	        'label' => __('Featured Image 4', 'lumen'),
	        'type'  => 'upload',
	        'std'	  => ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_4_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_5',
	        'label' => __('Featured Image 5', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_5_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_6',
	        'label' => __('Featured Image 6', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_6_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_7',
	        'label' => __('Featured Image 7', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_7_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_8',
	        'label' => __('Featured Image 8', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_8_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_9',
	        'label' => __('Featured Image 9', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_9_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_10',
	        'label' => __('Featured Image 10', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_10_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_11',
	        'label' => __('Featured Image 11', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_11_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_12',
	        'label' => __('Featured Image 12', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_12_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_13',
	        'label' => __('Featured Image 13', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_13_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_14',
	        'label' => __('Featured Image 14', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_14_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_15',
	        'label' => __('Featured Image 15', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_15_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_16',
	        'label' => __('Featured Image 16', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_16_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_17',
	        'label' => __('Featured Image 17', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_17_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_18',
	        'label' => __('Featured Image 18', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_18_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_19',
	        'label' => __('Featured Image 19', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_19_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_20',
	        'label' => __('Featured Image 20', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_20_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_21',
	        'label' => __('Featured Image 21', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_21_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_22',
	        'label' => __('Featured Image 22', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_22_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_23',
	        'label' => __('Featured Image 23', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_23_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_24',
	        'label' => __('Featured Image 24', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_24_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_25',
	        'label' => __('Featured Image 25', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_25_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_26',
	        'label' => __('Featured Image 26', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_26_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_27',
	        'label' => __('Featured Image 27', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_27_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_28',
	        'label' => __('Featured Image 28', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_28_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_29',
	        'label' => __('Featured Image 29', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_29_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_30',
	        'label' => __('Featured Image 30', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_portfolio_featured_image_30_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      )
	    )
	  );
	  
	  $lumen_portfolio_featured_videos = array(
	    'id'        => 'lumen_portfolio_videos',
	    'title'     => __('Feature a video', 'lumen'),
	    'desc'      => __('Insert the URL of the video you would like to featured.', 'lumen'),
	    'pages'     => array( 'portfolio' ),
	    'context'   => 'side',
	    'priority'  => 'low',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_portfolio_video',
	        'label'       => __('Video URL (Youtube, Vimeo)', 'lumen'),
	        'type'        => 'text'
	      )
	    )
	  );
	  
	  ot_register_meta_box( $lumen_portfolio_block );
	  ot_register_meta_box( $lumen_portfolio_preview_image );
	  ot_register_meta_box( $lumen_portfolio_featured_images );
	  ot_register_meta_box( $lumen_portfolio_featured_videos );
	  ot_register_meta_box( $lumen_portfolio_intro );
	  
	}

}

// **********************************
// Add Meta Boxes for Pages
// **********************************
	
add_action( 'admin_init', 'lumen_portfolio_categories' );

function lumen_portfolio_categories() {
	if(isset($_GET['post']) || isset($_POST['post_ID'])){
		$post_id = isset($_GET['post']) ? $_GET['post'] : $_POST['post_ID'];	
	
		$template_file = get_post_meta($post_id, '_wp_page_template', TRUE);
		
	  $lumen_portfolio_categories = array(
	    'id'        => 'lumen_portfolio_categories_metabox',
	    'title'     => __('Portfolio Categories', 'lumen'),
	    'desc'      => __('Choose the categories you want this portfolio page to show. Leave them all unckecked to show all works.', 'lumen'),
	    'pages'     => array( 'page' ),
	    'context'   => 'side',
	    'priority'  => 'default',
	    'fields'    => array(
		      array(
	        'id'          => 'lumen_portfolio_categories',
	        'label'       => 'Work Types',
	        'type'        => 'taxonomy-checkbox',
	        'post_type'   => 'portfolio',
	        'taxonomy'    => 'work_type'
	      )
	    )
	  );
	  if (function_exists("ot_register_meta_box") && $template_file == 'portfolio.php') {
	  	ot_register_meta_box( $lumen_portfolio_categories );
	  }
  }
}