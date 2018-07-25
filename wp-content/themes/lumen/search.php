<?php
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strcasecmp('XMLHttpRequest', $_SERVER['HTTP_X_REQUESTED_WITH']) === 0){
?>
<script type="text/javascript">
	current_template = 'blog'; 
</script>
<?php
	// If the blog is being called from an AJAX request, render the content only.
	if(have_posts()){
		get_template_part('partials/blog/partial', 'blog');	
	}else{
		get_template_part('partials/blog/partial', 'noresults');	
	}
}else{
	// Otherwise, render the full page.
	get_header();
	if(have_posts()){
?>
<script type="text/javascript">
	current_template = 'blog'; 
</script>
<?php		
		get_template_part('partials/blog/partial', 'blog');	
	}else{
		get_template_part('partials/blog/partial', 'noresults');	
	}
	get_footer();
}
  
?>