<?php
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strcasecmp('XMLHttpRequest', $_SERVER['HTTP_X_REQUESTED_WITH']) === 0){
	// If the blog is being called from an AJAX request, render the content only.
?>
<script type="text/javascript">
	current_template = 'blog'; 
</script>
<?php
	if($_POST["listonly"] == "true"){
		get_template_part('partials/blog/partial', 'postslist');
	}else{
		get_template_part('partials/blog/partial', 'blog');	
	}
}else{
	// Otherwise, render the full page.
	get_header();
?>
<script type="text/javascript">
	current_template = 'blog'; 
</script>
<?php
	get_template_part('partials/blog/partial', 'blog');
	get_footer();
}
  
?>
