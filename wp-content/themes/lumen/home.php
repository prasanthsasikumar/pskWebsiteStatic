<?php
/*
Template Name: Blog
*/

$page_id = get_option('page_for_posts');
$blog_post = get_post($page_id);

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strcasecmp('XMLHttpRequest', $_SERVER['HTTP_X_REQUESTED_WITH']) === 0){
?>
	<script type="text/javascript">
		current_template = 'blog'; 
	</script>
<?php
  if ( !post_password_required($blog_post) ) {
		// If the blog is being called from an AJAX request, render the content only.
		if(isset($_POST["listonly"]) && $_POST["listonly"] == "true"){
			get_template_part('partials/blog/partial', 'postslist');
		}else{
			get_template_part('partials/blog/partial', 'blog');	
		}
	}else{
		echo get_the_password_form();
	}
}else{
	// Otherwise, render the full page.
	get_header();
?>
	<script type="text/javascript">
		current_template = 'blog'; 
	</script>
<?php
	if ( !post_password_required($blog_post) ) {
		get_template_part('partials/blog/partial', 'blog');
	}else{
		echo get_the_password_form();
	}
	get_footer();
}

  
?>