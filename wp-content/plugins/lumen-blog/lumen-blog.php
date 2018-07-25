<?php
/*
Plugin Name: Lumen Blog
Description: A portfolio plugin for the Lumen WordPress Theme
Version: 1.2
Author: Explora Themes
Author URI: http://www.explora.com.uy/
*/


// **********************************
// Add Meta Boxes for Portfolio posts
// **********************************

add_action( 'admin_init', 'lumen_blog_meta_boxes' );
function lumen_blog_meta_boxes() {

	if(function_exists("ot_register_meta_box")){
	
	  $lumen_blog_intro = array(
	    'id'        => 'lumen_blog_intro',
	    'title'     => __('Post Short Introduction', 'lumen'),
	    'desc'      => __('Write a short introduction for this post. Leave this field empty if you don\'t want to show the description area.', 'lumen'),
	    'pages'     => array( 'post' ),
	    'context'   => 'normal',
	    'priority'  => 'default',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_blog_intro_text',
	        'label'       => __('Post Description', 'lumen'),
	        'type'        => 'text'
	      )
	    )
	  );
	  
	  $lumen_blog_post_state = array(
	  	'id'        => 'lumen_blog_post_block',
	    'title'     => __('Blog Preview Block', 'lumen'),
	    'desc'      => __('Choose wether you want this post content to be open when the page loads.', 'lumen'),
	    'pages'     => array( 'post' ),
	    'context'   => 'side',
	    'priority'  => 'default',
	    'fields'    => array(
	    	array(
	        'id'          => 'lumen_blog_post_state',
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
	          )
	        ),
	        'std'							=> 'closed'
	      )
	    )
	  );
	  
	  $lumen_blog_preview_image = array(
	    'id'        => 'lumen_blog_preview_image',
	    'title'     => __('Preview Image', 'lumen'),
	    'desc'      => __('Upload an image for the blog list. If you do not upload a preview image, the featured image will be used instead.', 'lumen'),
	    'pages'     => array( 'post' ),
	    'context'   => 'side',
	    'priority'  => 'default',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_blog_preview_image_image',
	        'label'       => __('Preview image', 'lumen'),
	        'type'        => 'upload',
	        'std'					=> ''
	      )
	    )
	  );
	  
	  $lumen_blog_featured_images = array(
	    'id'        => 'lumen_blog_featured_images',
	    'title'     => __('Featured images', 'lumen'),
	    'desc'      => __('Upload featured the featured images for this post.', 'lumen'),
	    'pages'     => array( 'post' ),
	    'context'   => 'normal',
	    'priority'  => 'low',
	    'fields'    => array(
	      array(
	        'id'    => 'lumen_blog_featured_image_1',
	        'label' => __('Featured Image 1', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_1_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_2',
	        'label' => __('Featured Image 2', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_2_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_3',
	        'label' => __('Featured Image 3', 'lumen'),
	        'type'  => 'upload',
	        'std'	  => ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_3_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_4',
	        'label' => __('Featured Image 4', 'lumen'),
	        'type'  => 'upload',
	        'std'	  => ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_4_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_5',
	        'label' => __('Featured Image 5', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_5_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_6',
	        'label' => __('Featured Image 6', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_6_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_7',
	        'label' => __('Featured Image 7', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_7_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_8',
	        'label' => __('Featured Image 8', 'lumen'),
	        'type'  => 'upload',
	        'std'	  => ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_8_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_9',
	        'label' => __('Featured Image 9', 'lumen'),
	        'type'  => 'upload',
	        'std'	  => ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_9_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_10',
	        'label' => __('Featured Image 10', 'lumen'),
	        'type'  => 'upload',
	        'std'		=> ''
	      ),
	      array(
	        'id'    => 'lumen_blog_featured_image_10_caption',
	        'label' => __('Caption', 'lumen'),
	        'type'  => 'text',
	        'std'		=> ''
	      )
	    )
	  );
	  
	  $lumen_blog_featured_videos = array(
	    'id'        => 'lumen_blog_videos',
	    'title'     => __('Feature a video', 'lumen'),
	    'desc'      => __('Insert the URL of the video you would like to featured.', 'lumen'),
	    'pages'     => array( 'post' ),
	    'context'   => 'side',
	    'priority'  => 'low',
	    'fields'    => array(
	      array(
	        'id'          => 'lumen_blog_video',
	        'label'       => __('Video URL (Youtube, Vimeo)', 'lumen'),
	        'type'        => 'text'
	      )
	    )
	  );
	  
	  ot_register_meta_box( $lumen_blog_preview_image );
	  ot_register_meta_box( $lumen_blog_post_state );
	  ot_register_meta_box( $lumen_blog_featured_images );
	  ot_register_meta_box( $lumen_blog_featured_videos );
	  ot_register_meta_box( $lumen_blog_intro );
	}	
}