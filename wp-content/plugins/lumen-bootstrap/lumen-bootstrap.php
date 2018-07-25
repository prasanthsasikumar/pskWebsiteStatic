<?php
/*
Plugin Name: Lumen Bootstrap
Description: A Bootstrap plugin for the Lumen WordPress Theme
Version: 1.0
Author: Explora Themes
Author URI: http://www.explora.com.uy/
*/

add_action('wp_enqueue_scripts', 'lumen_bootstrap_enqueue_assets');
function lumen_bootstrap_enqueue_assets(){
	wp_enqueue_script('bootstrap_js', plugins_url( 'assets/js/bootstrap.min.js' , __FILE__ ), false, '3.0.0', true);
	wp_enqueue_style('bootstrap_css', plugins_url( 'assets/css/bootstrap.min.css' , __FILE__ ), true, '1.0', 'all');
}

/**************************/
/*      SHORTCODES        */
/**************************/

add_action( 'init', 'lumen_register_shortcodes'); 
function lumen_register_shortcodes(){
	add_shortcode('ROW', 'lumen_row_shortcode');
	add_shortcode('ROW_INSIDE', 'lumen_row_shortcode');
	add_shortcode('SPAN', 'lumen_span_shortcode');
	add_shortcode('SPAN_INSIDE', 'lumen_span_shortcode');
	add_shortcode('BUTTON', 'lumen_button_shortcode');
	add_shortcode('SOCIAL_BUTTON', 'lumen_social_button_shortcode');
	add_shortcode('RULE', 'lumen_rule_shortcode');
	add_shortcode('PRICING_TABLE', 'lumen_pricing_table');
}

function lumen_prueba($atts, $content){
	return $content;
}

function lumen_row_shortcode($atts, $content){
	$out =  '<div class="row">';
	$out .= do_shortcode($content);
	$out .= '</div>';
	
	return $out;
}

function lumen_span_shortcode($atts, $content){
	extract(shortcode_atts(array(
		'xs_size' => '12',
		'sm_size' => '12',
		'md_size' => '12',
		'lg_size' => '12',
		'offset' => '0',
		'nomargin' => 'no'
	), $atts)); 
	
	$out =  '<div class="col-lg-'.$lg_size;
	if($md_size != "") { $out .= ' col-md-'.$md_size; }
	if($sm_size != "") { $out .= ' col-sm-'.$sm_size; }
	if($xs_size != "") { $out .= ' col-xs-'.$xs_size; }
	$out .= ' col-lg-offset-'.$offset.'"';
	if($nomargin == "yes") { $out .= ' style="margin: 0;"'; }
	$out .= '>';
	$out .= do_shortcode($content);
	$out .= '</div>';
	
	return $out;
}

function lumen_button_shortcode($atts) {
	extract(shortcode_atts(array(
		'caption' => 'button',
		'link' => '#',
		'size' => 'medium',
		'color' => '#fff',
		'target' => '_self'
	), $atts));
	
	return '<a href="'.$link.'" class="button '.$size.'" style="color: '.$color.'; border-color: '.$color.';" target="'.$target.'">'.$caption.'</a>';
}

function lumen_social_button_shortcode($atts) {
	extract(shortcode_atts(array(
		'network' => 'facebook',
		'link' => '#',
		'target' => '_blank'
	), $atts)); 
	
	return '<a href="'.$link.'" class="social-button social-icon-'.$network.'" target="'.$target.'"></a>';
}

function lumen_rule_shortcode(){
	return '<hr />';
}

function lumen_pricing_table($atts, $content){
	extract(shortcode_atts(array(
		'title' => '',
		'description' => '',
		'features' => '_blank',
		'price' => '',
		'pricing_period' => 'none',
		'button_link' => '',
		'button_caption' => ''
	), $atts)); 
	
	
	$out =  '<div class="pricing-table">';
	$out .= '  <h5>'.$title.'</h5>';
	$out .= '  <p class="description">'.$description.'</p>';
	$out .= '  <ul>';
	
	$features_array = explode('|', $features); 
	foreach ($features_array as $feature) {
		$out .= '    <li>'.$feature.'</li>';
	}
	
	$out .= '  </ul>';
	
	$price_period = "";
	if($pricing_period != "none"){
		$price_period = '<small>'.$pricing_period.'</small>';
	}
	$out .= '  <div class="pricing">';
	$out .= '    <span class="price">'.$price.$price_period.'</span>';
	$out .= '    <a href="'.$button_link.'" class="button medium">'.$button_caption.'</a>';
	$out .= '  </div>';
	$out .= '</div>';
	
	return $out;
}
