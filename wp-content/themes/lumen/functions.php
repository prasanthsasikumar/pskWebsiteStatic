<?php

add_action('after_setup_theme', 'lumen_language_setup');
function lumen_language_setup(){
	load_theme_textdomain('lumen', get_template_directory() . '/language');	
}

add_action('wp_enqueue_scripts', 'lumen_enqueue_assets');
function lumen_enqueue_assets(){
	wp_enqueue_script('jquery');
	
	wp_enqueue_script('history', get_template_directory_uri().'/js/jquery.history.js', false, '1.0', true);
	wp_enqueue_script('nicescroll', get_template_directory_uri().'/js/jquery.nicescroll.js', false, '3.5.1', true);
	wp_enqueue_script('isotope', get_template_directory_uri().'/js/jquery.isotope.min.js', false, '3.1.1', true);
	wp_enqueue_script('lumen', get_template_directory_uri().'/js/lumen.js', false, '1.0', true);
	wp_enqueue_script('magnific_popup_js', get_template_directory_uri().'/js/jquery.magnific-popup.js', false, '1.0', true);
	wp_enqueue_script('retina', get_template_directory_uri().'/js/retina.js', false, '1.0', true);
	wp_enqueue_script('mousewheel', get_template_directory_uri().'/js/jquery.mousewheel.js', false, '1.0', true);
	wp_enqueue_script('scrollingcarousel', get_template_directory_uri().'/js/scrollingcarousel.min.js', false, '2.0', true);
	
	global $wp_scripts;
	$wp_scripts->add_data('jquery', 'group', 1 );
	$wp_scripts->add_data('comment-reply', 'group', 1 );
	if ( is_singular() ){ wp_enqueue_script( "comment-reply",  true); }
	
	wp_enqueue_style('lumen_styles', get_template_directory_uri().'/style.css', false, '1.0', 'all');
	wp_enqueue_style('lumen_styles_blog', get_template_directory_uri().'/css/blog.css', false, '1.0', 'all');
	wp_enqueue_style('lumen_styles_portfolio', get_template_directory_uri().'/css/portfolio.css', false, '1.0', 'all');
	wp_enqueue_style('lumen_styles_gallery', get_template_directory_uri().'/css/gallery.css', false, '1.0', 'all');
	wp_enqueue_style('magnific_popup', get_template_directory_uri().'/css/magnific-popup.css', false, '1.0', 'all');
	
	wp_enqueue_style('googlefonts', 'http://fonts.googleapis.com/css?family=Open+Sans:400,500,600', false, '', 'all');
}

// Include TGM Plugin Activation
require_once('includes/class-tgm-plugin-activation.php');
include('includes/include-plugins.php');

// Include OptionTree.
add_filter( 'ot_show_pages', '__return_false' );
add_filter( 'ot_theme_mode', '__return_true' );
load_template( trailingslashit( get_template_directory() ) . 'option-tree/ot-loader.php' );

// Include Theme Options
load_template( trailingslashit( get_template_directory() ) . 'includes/theme-options.php' );

// Include Lumen extra functions.
include('includes/lumen-functions.php');

// Add support for thumbnails
add_image_size('image_preview', 330, 550, true);

// Custom styles defined on the Theme Options
include('includes/custom-styles.php');

// Custom navigation
include('includes/custom-menu.php');

// Custom widgets and sidebar locations.
include('includes/custom-widgets.php');

// Lumen Pages Options
include('includes/lumen-pages.php');

// Ajax comments
include('includes/ajax-comments.php');

// Custom comments layout
include('includes/custom-comment.php');


add_theme_support( 'post-thumbnails' );

add_theme_support( 'automatic-feed-links' );

add_editor_style( 'style.css' );

if ( ! isset( $content_width ) )
	$content_width = 1050;

/* =============================================================================
	Include the Option-Tree Google Fonts Plugin
	========================================================================== */

	// load the ot-google-fonts plugin
	if( function_exists('ot_get_option') ):

		// your Google Font API key		
		$google_font_api_key = 'AIzaSyDGdp_CAkErBnQI5cHk3_k849Sfn34zQRc';
		$google_font_refresh = '604800';

		// get the OT âGoogle Font plugin file
		include_once( 'option-tree-google-fonts/ot-google-fonts.php' );

		// apply the fonts to the font dropdowns in theme options
		function ot_filter_recognized_font_families( $array, $field_id ) {

			global $default_theme_fonts, $google_font_api_key;

			// default fonts used in this theme, even though there are not google fonts
			$default_theme_fonts = array(
					'Arial, Helvetica, sans-serif' => 'Arial, Helvetica, sans-serif',
					'"Helvetica Neue", Helvetica, Arial, sans-serif' => '"Helvetica Neue", Helvetica, Arial, sans-serif',
					'Georgia, "Times New Roman", Times, serif' => 'Georgia, "Times New Roman", Times, serif',
					'Tahoma, Geneva, sans-serif' => 'Tahoma, Geneva, sans-serif',
					'"Times New Roman", Times, serif' => '"Times New Roman", Times, serif',
					'"Trebuchet MS", Arial, Helvetica, sans-serif' => '"Trebuchet MS", Arial, Helvetica, sans-serif',
					'Verdana, Geneva, sans-serif' => 'Verdana, Geneva, sans-serif',
					'"Open Sans"' => '"Open Sans", sans-serif'
			);

			// get the google font array - located in ot-google-fonts.php
			$google_font_array = ot_get_google_font($google_font_api_key, $google_font_refresh);


			// loop through the cached google font array if available and append to default fonts
			$font_array = array();
			if($google_font_array){
					foreach($google_font_array as $index => $value){
							$font_array[$index] = $value['family'];
					}
			}

			// put both arrays together
			$array = array_merge($default_theme_fonts, $font_array);
			return $array;

		}
		add_filter( 'ot_recognized_font_families', 'ot_filter_recognized_font_families', 1, 2 );


	endif;


?>
