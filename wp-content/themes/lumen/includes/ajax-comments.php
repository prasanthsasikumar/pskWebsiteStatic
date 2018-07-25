<?php

// Save a comment
add_action('comment_post', 'lumen_ajaxify_comments', 20, 2);

add_action('wp_ajax_lumen_ajaxify_commentss', 'lumen_ajaxify_comments');
add_action('wp_ajax_lumen_ajaxify_comments', 'lumen_ajaxify_comments');

function lumen_ajaxify_comments($comment_ID, $comment_status){
	if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
		//If AJAX Request Then
		switch($comment_status){
			case '0':
				wp_notify_moderator($comment_ID);
			case '1': //Approved comment
				$commentdata=&get_comment($comment_ID, ARRAY_A);
				$post=&get_post($commentdata['comment_post_ID']);
				wp_notify_postauthor($comment_ID, $commentdata['comment_type']);
				echo json_encode($commentdata);
			break;
			default:
				echo "error";
		}
		exit;
	}
}



// Retrieve list of comments
add_action('wp_ajax_lumen_get_comments', 'lumen_get_comments');
add_action('wp_ajax_nopriv_lumen_get_comments', 'lumen_get_comments');
function lumen_get_comments() {
	
	$post_id = $_POST['post_id'];

	$args = array(
		'post_id' => $post_id, // use post_id, not post_ID
	);
	$comments = get_comments($args); 
	
	include(locate_template('comments.php'));
	
	exit();

}
function get_comments_template(){
	comments_template();
}