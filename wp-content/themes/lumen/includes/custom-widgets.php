<?php

add_action( 'widgets_init', 'lumen_sidebars_init' );
function lumen_sidebars_init(){

	$lumen_blog_sidebar = array(
	  'name' => __('Blog Sidebar', 'lumen'),
	  'id' => 'lumen_blog_sidebar',
	  'description' => __("Widgets added here will be placed in the blog's sidebar.", "lumen"),
	  'before_widget' => '<div id="%1$s" class="widget %2$s">',
	  'after_widget' => '</div>',
	  'before_title' => '<h6>',
	  'after_title' => '</h6><span class="line"></span>'
	);
	
	register_sidebar($lumen_blog_sidebar);	
	
	$lumen_portfolio_sidebar = array(
	  'name' => __('Portfolio Sidebar', 'lumen'),
	  'id' => 'lumen_portfolio_sidebar',
	  'description' => __("Widgets added here will be placed in the portfolio page's sidebar.", "lumen"),
	  'before_widget' => '<div id="%1$s" class="widget %2$s">',
	  'after_widget' => '</div>',
	  'before_title' => '<h6>',
	  'after_title' => '</h6><span class="line"></span>'
	);
	
	register_sidebar($lumen_portfolio_sidebar);
}