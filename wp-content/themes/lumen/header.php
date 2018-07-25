<!DOCTYPE html>
<?php
$ie = "";
if(preg_match('/msie/i', $_SERVER['HTTP_USER_AGENT'])) {
    $ie = "msie";
}
?>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />	
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<meta name="format-detection" content="telephone=no" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
		<script type="text/javascript">
			var is_ie8_or_lower = false;
			var is_ie9 = false;
		</script>
		
		<?php wp_head(); ?>

		<!--[if lt IE 9]>
			<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/js/html5shiv.js"></script>
		<![endif]-->
		<title><?php bloginfo('name') . wp_title(); ?></title>
		<style>
			<?php lumen_custom_css(); ?>
			<?php echo ot_get_option('lumen_custom_css'); ?>
		</style>
		<script type="text/javascript">
			var lumen_site_url = "<?php echo get_home_url(); ?>";
			var lumen_ajax_url = "<?php echo admin_url('admin-ajax.php'); ?>";
		</script>
		<?php echo ot_get_option('lumen_custom_script'); ?>
		<link rel="icon" href="<?php echo ot_get_option('lumen_site_favicon'); ?>" type="image/x-icon" />
	</head>
	<body <?php body_class($ie); ?> style="<?php echo get_background('default'); ?>">
		<header class="main-header">
			<nav class="main-nav">
				<img src="<?php echo ot_get_option('lumen_mobile_logo'); ?>" class="mobile-logo">
				<button class="toggle-mobile-menu"></button>
				<?php wp_nav_menu( array( 'theme_location' => 'lumen_main_menu' )); ?>
			</nav>
		</header>
		<div class="main-content">
			<div class="page-content">