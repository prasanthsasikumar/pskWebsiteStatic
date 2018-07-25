<?php

// Adds theme support for menus
add_theme_support('menus');

//Registers the menu location
if (function_exists('register_nav_menu'))
{
	register_nav_menu('lumen_main_menu', __('Main Navigation', 'lumen'));
}