<?php
/*
Template Name: Portfolio
*/
?>

<?php
if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strcasecmp('XMLHttpRequest', $_SERVER['HTTP_X_REQUESTED_WITH']) === 0){
	// If the blog is being called from an AJAX request, render the content only.
	if ( !post_password_required() ) {
		if(isset($_POST["listonly"]) && $_POST["listonly"] == "true"){
			get_template_part('partials/portfolio/partial', 'workslist');
		}else{
			get_template_part('partials/portfolio/partial', 'portfolio');	
		}
	}else{
		echo get_the_password_form();
	}
}else{
	// Otherwise, render the full page.
	get_header();	
	if ( !post_password_required() ) {
		get_template_part('partials/portfolio/partial', 'portfolio');
	}else{
		echo get_the_password_form();
	}
	get_footer();
} 
?>
