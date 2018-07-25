<ul class="comments">
<?php
// $comments is set on ajax-comments.php

if($comments){
	wp_list_comments(array(
		'reply_text'	=> __('Reply', 'lumen'),
		'avatar_size'	=> 70,
		'callback' => 'lumen_comment'
	), $comments);
}else{
	wp_list_comments(array(
		'reply_text'	=> __('Reply', 'lumen'),
		'avatar_size'	=> 70,
		'callback' => 'lumen_comment'
	));
}
?>
</ul>
<?php paginate_comments_links(); ?>
<?php
// Form

if(is_user_logged_in()){ ?>
<div class="comments-form logged">
<?php	
}else{ ?>
<div class="comments-form not-logged">
<?php
}

comment_form( array(
	'id_form'						=> 	'commentform-'.$post_id,
	'id_submit'					=> 	'commentform-submit-'.$post_id,
	'title_reply'				=> 	__('Leave a Reply', 'lumen'),
	'title_reply_to'		=> 	__('Leave a Reply to %s', 'lumen'),
	'cancel_reply_link'	=> 	__('Cancel Reply', 'lumen'),
	'label_submit'			=> 	__('Submit', 'lumen'),
	'comment_field'			=> 	'<p class="comment-form-comment"><label for="comment">' . _x( 'Comment', 'noun', 'lumen' ) .
									 				'</label><textarea id="comment-' . $post_id . '" name="comment" class="required" cols="45" rows="8" aria-required="true">' .
									 				'</textarea></p>',
	'comment_notes_after' => ''
										), 
$post_id );
?>
</div>