/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:false, unused:false, curly:true, browser:true, jquery:true, indent:4, maxerr:50 */
/*global current_template, is_ie8_or_lower, is_ie9, NProgress, lumen_site_url, History, lumen_ajax_url, module, require */

(function(){
	"use strict";

	var current_page_url = "";
	var blog_pagination_check_interval;
	var blog_pagination_timeout;
	var blog_pagination_counting_down = false;
	
	jQuery(document).ready(function(){
		setUpNavigation();	
		pageStartup();
	});
	
	var resizingEnd;
	jQuery(window).resize(function(){
		clearTimeout(resizingEnd);
		resizingEnd = setTimeout(function() {
			if(typeof(current_template) !== 'undefined'){
				if(current_template === "portfolio"){
					portfolioSetup(false);	
				}else if(current_template === "blog"){
					blogSetup(false);
				}else if(current_template === "gallery"){
					gallerySetup(false);
				}
			}
			
			centerPageContent();
			
			if(!is_ie8_or_lower){
				jQuery('.page-content').getNiceScroll().resize();
			}
			
			setupMobileMenu();
		}, 100);
	});
	
	/*****************************/
	/*     SITE NAVIGATION			 */
	/*****************************/
	var destination = "";
	
	function navigateToPage(url){
		NProgress.configure({ ease: 'ease', speed: 500 });
		NProgress.start();
		// Fade the content out
		jQuery('.page-content').animate({ opacity : 0 }, 500, function(){
			// AJAX call to load the page
			jQuery('.page-content').load(url, function(){
				pageStartup();
				NProgress.done();
				setCurrentURL(url, true);
			});
		});
	}
	
	function setUpNavigation(){
		jQuery('.main-nav li').off('click');
		jQuery('.main-nav li').on('click', function(e){
			try {
				e.stopPropagation();
			} catch(err){
				// not li
			};
			var menu_item = jQuery(this);
			
			if(jQuery(window).width() > 760 && !jQuery('body').hasClass('msie') && window.location.host === jQuery(this).find('a').get(0).host && !jQuery(this).hasClass('contains-plugins')){
				e.preventDefault();
				jQuery('.main-nav li').removeClass('current-page');
				setTimeout(function(){
					jQuery(menu_item).addClass('current-page');
				}, 500);
				
				destination = jQuery(menu_item).find('a').attr('href');
				
				if(destination){
					navigateToPage(destination);	
				}
				
				toggleMobileMenu();
			}else{
				destination = jQuery(menu_item).find('a').attr('href');
				
				if(destination){
					window.location.href = destination;
				}
				
			}
		});
	}

	function setCurrentURL(destination, set_global_variable){
		var pushStateUrl = (lumen_site_url + destination.split(lumen_site_url)[1]).replace(/([^:]\/)\//g, "$1");
		History.pushState('', jQuery('.page-content .page-title').attr('value'), pushStateUrl);
		
		if(set_global_variable){
			current_page_url = destination;
		}
	}
	
	/*****************************/
	/*       MAIN STARTUP				 */
	/*****************************/
	
	function pageStartup() {
		current_page_url = document.URL;
		
		if(jQuery('body').hasClass('page-template-portfolio-php')){ jQuery('html').addClass('portfolio'); }
		if(jQuery('body').hasClass('blog')){ jQuery('html').addClass('blog'); }
		
		if(typeof current_template !== 'undefined'){
			if(current_template === 'blog'){
				// Set up the blog.
				blogSetup(true);	
			}else {
				// Clear the pagination timeout
				blogSetupPagination();
				
				if(current_template === 'portfolio'){
					portfolioSetup(true);	
				}else if(current_template === 'contact'){
					contactSetup();
				}else if(current_template === 'gallery'){
					gallerySetup(true);
				}
			}
		}
		
		jQuery('.page-content').css( { 'opacity' : 1 });
		
		// Show the page background
		jQuery('.page-background').addClass('active');
		
		// Fade the content in
		setTimeout(function(){
			jQuery('.page-inner, .page-inner-content').animate( { opacity : 1 } );
		}, 500);
		
		// Center the page content
		centerPageContent();
		setTimeout(function(){ centerPageContent(); }, 200);
		setTimeout(function(){ centerPageContent(); }, 500);
			
		// Page content scroll
		if(!is_ie8_or_lower){
			jQuery('.page-content').getNiceScroll().remove();
			if(jQuery('.page-inner').length > 0){
				jQuery('.page-content').niceScroll(".page-inner", {
					bouncescroll : false,
					cursorwidth : 10
				});
			}
		}
		
		// Set the categories background color on hover if there's more than one line.
		jQuery('ul.categories').on('mouseenter', function(){
			if(jQuery(this).height() > 26) {
				jQuery(this).css('background-color', 'rgba(0, 0, 0, 0.3)');
			}
		});
		jQuery('ul.categories').on('mouseleave', function(){
			jQuery(this).css('background-color', 'transparent');
			
		});
			
		
		
		// Setup mobile navigation
		setupMobileMenu();
	}
	
	function centerPageContent(){
		var window_height = jQuery('.page-content').height();
		var content_height = 0;
		
		if(jQuery('.page-inner').length > 0){
			content_height = jQuery('.page-inner').css('margin-top', 0).height();
			var margin = 0;
			if(content_height < window_height){
				margin = (window_height / 2) - (content_height / 2) - 40;
			}
			if(margin < 0 ) { margin = 0; }
			jQuery('.page-inner').css('margin-top', margin);
		}
		
		if(jQuery('.about').length > 0){
			content_height = jQuery('.about').css('padding-top', 0).outerHeight();
			var padding = 40;
			if(content_height < window_height){
				padding = ((window_height - content_height) / 2) + 20;
			}
			jQuery('.about, .contact-form').css('padding-top', padding);
			
			if(window_height < jQuery('.page-inner').outerHeight()){
				jQuery('.contact-form').css('height', jQuery('.page-inner').outerHeight());	
			}else{
				jQuery('.contact-form').css('height', window_height);	
			}
			
		}
		
		// Set menu items width
		jQuery('.main-nav .menu > li.menu-item-has-children').each(function(){

			var label = jQuery(this).find('> a');
			var submenu = jQuery(this).find('ul.sub-menu');
			var labelWidth = label.outerWidth();
			var submenuWidth = submenu.outerWidth();
			
			if(labelWidth > submenuWidth){
				submenu.css('width', labelWidth);
			}else if(labelWidth < submenuWidth){
				label.css('width', submenuWidth - (parseInt(label.css('padding-left'), 10) - (parseInt(label.css('padding-right'), 10)))).css('text-align', 'left');
				submenu.css('width', submenuWidth);
			}
			
		});
		
	}
	
	/*****************************/
	/*        MOBILE						 */
	/*****************************/
	
	function setupMobileMenu(){
		if(jQuery(window).width() <= 760){
			jQuery('.toggle-mobile-menu').off('click');
			jQuery('.toggle-mobile-menu').on('click', function(){
				toggleMobileMenu();
			});	
		}else{
			jQuery('.main-nav ul, #toggle-categories').removeClass('open');
			jQuery('.page-content, .page-inner-content').getNiceScroll().show();
			jQuery('.page-inner, .page-inner-content, .works-inner, .posts-inner').fadeIn();
			var ul_top = jQuery('ul.categories').css('top');
			jQuery('ul.categories').attr('style', '');
			jQuery('ul.categories').css('top', ul_top);
		}	
	}
	
	function toggleMobileMenu(){
		var main_header = jQuery('header.main-header');
	
		if(main_header.hasClass('open')){
			// Close the menu
			setTimeout(function(){
				jQuery('.page-inner').attr('style', 'margin-top: 0!important;' );
			}, 150);
			jQuery('.main-nav ul').removeClass('open');
			main_header.removeClass('open');
			
			if(!is_ie8_or_lower){
				jQuery('.page-content').getNiceScroll().show();
			}
			
			jQuery('.page-inner, .page-inner-content').fadeIn();
		}else{
			// Open the menu
			
			jQuery('.main-nav ul').addClass('open');
			main_header.addClass('open');
			jQuery('.page-inner').attr('style', 'margin-top: ' + (jQuery('.main-nav ul li').length * 60 + jQuery('.main-header').height()) + 'px!important;' );	
			
			if(!is_ie8_or_lower){
				jQuery('.page-content').getNiceScroll().hide();
			}
			
			jQuery('.page-inner, .page-inner-content').fadeOut();
		}
	}
	
	
	
	/***************************************************************************/
	/*																																				 */
	/*                               BLOG																			 */
	/*																																				 */
	/***************************************************************************/
	
	/*****************************/
	/*   CONTACT PAGE STARTUP		 */
	/*****************************/
	
	function contactSetup(){
		// Stop chrome's autocomplete from making your input fields that nasty yellow. Yuck.
		if (jQuery.browser.webkit) {
			jQuery('input').attr('autocomplete', 'off');
		}
		jQuery('.wpcf7-form textarea').attr('rows', 1).autogrow();
		
		jQuery('.wpcf7-not-valid-tip-no-ajax').on('mouseover', function(){
			jQuery(this).fadeOut();
		});
	}
	
	/*****************************/
	/*      BLOG STARTUP				 */
	/*****************************/
	
	function blogSetup(firstInit){
		// Set the wrapper's padding relative to the page-content's height.
		var page_height = jQuery('.page-content').height();
		var padding = 130;
		var max_content_height = page_height - padding;
		
		if(max_content_height >= 650){
			padding = (page_height - 650) / 2;
		}else{
			padding = padding / 2;
		}
		
		if(jQuery(window).width() <= 760){
			jQuery('.posts-wrapper').css( { 'padding-top' : padding, 'padding-bottom' : 15 } );
		}else{
			jQuery('.posts-wrapper').css( { 'padding-top' : padding, 'padding-bottom' : padding } );	
		}
		
		
		jQuery('.sidebar').css( { 'padding-top' : padding, 'padding-bottom' : padding } );
		jQuery('.top-bar').css('height', padding);
		
		jQuery('ul.categories').css('top', padding - 44);
		
		// Init nicescroll for the posts contents.
		// Record the post-info area height.
		jQuery('.posts-wrapper article').each(function(){
			
			var article = this;
			
			// Init nicescroll for the posts contents.
			jQuery(this).find('.post-content-wrapper').niceScroll("#" + jQuery(this).attr('id') + ' .content', {
				bouncescroll : false,
				horizrailenabled : false,
				nativeparentscrolling : true,
				railpadding : {top:0,right:5,left:0,bottom:0}
			});
			
			
			// Handle the click event on the Comments button
			jQuery(this).find('.post-comments a').off('click');
			jQuery(this).find('.post-comments a').on('click', function(e){
				e.preventDefault();
				if(!jQuery(article).find('a.toggle-comments').hasClass('showing-comments')){
					toggleComments(jQuery(article).attr('id').split('-')[1]);	
				}else{
					if(!jQuery(article).hasClass('open')){
						blogShowPostContent(jQuery(article).attr('id'));
					}
					jQuery(article).find(".post-content-wrapper").getNiceScroll().doScrollPos(0, jQuery(article).find('div.comments').position().top, 500);
				}
			});
			
			// Record the post-info area height
			if(firstInit){
				if(!jQuery(this).find('.post-info').attr('data-height')){
					jQuery(this).find('.post-info').attr('data-height', jQuery(this).find('.post-info').outerHeight(true));
				}
				
				// Create the images/videos galleries
				var gallery_items = [];
				jQuery('#' + jQuery(this).attr('id') + ' .zoom-content a').each(function(){
					gallery_items.push({ 
						src : jQuery(this).attr('href'), 
						type : jQuery(this).attr('data-gallery-type')
					});
				});
				
				var zoom_content = jQuery('#' + jQuery(this).attr('id')	+ ' a.fullscreen');
				jQuery(zoom_content).magnificPopup({
					items: gallery_items,
					gallery: { enabled: true },
					type: 'image',
					image : { titleSrc : function(item) { if(typeof(item) !== "undefined"){ return jQuery(zoom_content).parent().parent().find('a[data-gallery-index="' + item.index + '"]').attr('title'); } return ""; } },
					callbacks: {
						buildControls: function() {
							// re-appends controls inside the main container
							if(typeof(this.arrowLeft) !== "undefined" && this.arrowLeft !== null){
								this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
							}
						},
						open : function(){
							jQuery('body').addClass('blurred');
						},
						close : function(){
							jQuery('body').removeClass('blurred');
						}
					}
				});
				jQuery('#' + jQuery(this).attr('id') + ' a.fullscreen').on('click', function(){ return false; });
				
				jQuery('.video-popup').each(function(){
					jQuery(this).magnificPopup({
						items: {
							src: jQuery(this).attr('href'),
							type: 'iframe'
						}
					});
				});
				jQuery('.video-popup').on('click', function(){ return false; });
				
				
				
				jQuery(article).find('.toggle-comments').off('click');
				jQuery(article).find('.toggle-comments').on('click', function(e){
					e.preventDefault();
					var post_id_number = jQuery(article).attr('id').split('-')[1];
					toggleComments(post_id_number);
				});
			}
			
			
		});
		
		jQuery('.next-page a').on('click', function(e){
			e.preventDefault();
			blogLoadNextPage();
		});
		
		// Adjust the blog posts list inner div to fit its contents.
		blogAdjustPostsWrappersWidth();
		
		if(firstInit){
			// Create the blog posts list scroll
			blogCreatePostsScroll();
			
			// Toggle categories menu		
			jQuery('#toggle-categories').on('click', function(e){
				e.preventDefault();
				blogToggleCategories();
			});
		}
		
		// Show the content when a post is clicked.
		jQuery('.posts-wrapper article .img-container').off('click');
		jQuery('.posts-wrapper article .img-container').on('click', function(){
			var post_id = jQuery(this).parent().parent().parent().attr('id');
			blogShowPostContent(post_id);
		});
		
		// Set Up the Blog Sidebar
		if(firstInit){
			setUpSidebar();	
		}
		
		// Adjust the preview images height.
		blogAdjustPreviewImages();
		
		// Handle the click event on the close-post button
		jQuery('.close-post').off("click");
		jQuery('.close-post').on("click", function(e){
			e.preventDefault();
			blogHidePostContent('post-' + jQuery(this).attr('id').split('-')[2]);
		});
		
		
		blogSetupComments();
		
		// Dynamic pagination
		blogSetupPagination();
		
		if(typeof open_post !== 'undefined' && open_post > 0){
			blogShowPostContent('post-' + open_post);
			open_post = 0;
		}
		
		blogAdjustPostsWrappersWidth(jQuery('.posts-wrapper article.open_at_init').length);
		jQuery('.posts-wrapper article.open_at_init').each(function(){
			jQuery(this).removeClass('open_at_init');
			jQuery(this).addClass('open');
		});
	}
	
	function blogToggleCategories(){
		var button = jQuery('#toggle-categories');
		var page_inner_content = jQuery('.page-inner-content');
		
		if(jQuery(button).hasClass('open')){
			jQuery(button).removeClass('open');
			jQuery(page_inner_content).removeClass('categories-open');
			jQuery('ul.categories').fadeOut();
			jQuery('.posts-inner').fadeIn(function(){
				portfolioSetup(false);
				jQuery('.posts-wrapper').getNiceScroll().show();
			});
		}else{
			jQuery(button).addClass('open');
			jQuery(page_inner_content).addClass('categories-open');
			jQuery('.posts-inner').fadeOut();	
			jQuery('ul.categories').fadeIn();
			jQuery('.posts-wrapper').getNiceScroll().hide();
		}
	}
	
	
	/*****************************/
	/*    BLOG PAGINATAION			 */
	/*****************************/
	
	// Loads the next page
	
	function blogLoadNextPage(){
		if(jQuery('.next-page a').length > 0){
			jQuery.ajax({
				url: jQuery('.next-page a').attr('href'),
				type:'POST',
				data:'listonly=true',
				dataType: 'html',
				success: function(html){
					jQuery('.next-page').remove();
					jQuery('.posts-inner').append(html);
					blogSetup(true);
				}
			});
		}
	}
	
	// Sets up the Blog pagination.
	
	function blogSetupPagination(){
		clearInterval(blog_pagination_check_interval);
		if(jQuery('.next-page a').length > 0){
			blog_pagination_check_interval = setInterval(function(){
				var innerLeftOffset = -(jQuery('.posts-inner').position().left);
				var innerWidth = jQuery('.posts-inner').outerWidth();
				var wrapperWidth = jQuery('.posts-wrapper').width() + parseInt(jQuery('.posts-wrapper').css('padding-left'), 10);
				
				var wrapperWidthOffset = innerWidth - wrapperWidth - 30;
				
				if(innerLeftOffset === wrapperWidthOffset || innerWidth < wrapperWidth){
					if(!blog_pagination_counting_down){
						blogBeginLoadmoreTimeout();		
					}
				}else{
					if(blog_pagination_counting_down){
						blogCancelLoadmoreTimeout();
					}
				}
			}, 500);
		}
	}
	
	function blogBeginLoadmoreTimeout(){
		blog_pagination_counting_down = true;
		var percentage = 0;
		blog_pagination_timeout = setInterval(function(){
			percentage ++;
			drawCircle(percentage);
			if(percentage === 94){
				blogCancelLoadmoreTimeout();
				blogLoadNextPage();
			}
		}, 10);
	}
	
	function blogCancelLoadmoreTimeout(){
		clearInterval(blog_pagination_timeout);
		clearInterval(blog_pagination_check_interval);
		blogSetupPagination();
		blog_pagination_counting_down = false;
		drawCircle(0);
	}
	
	/*****************************/
	/*     BLOG SINGLE POSTS		 */
	/*****************************/
	
	// Adjusts the posts preview images
	
	function blogAdjustPreviewImages(changing_post_id){
		jQuery('.posts-wrapper article').each(function(){
	
			var post_height = jQuery(this).height();
			var post_info = jQuery(this).find('.post-info');
			var post_info_height = parseInt(jQuery(post_info).attr('data-height'), 10) + 2;
			
			if((jQuery(this).attr('id') === changing_post_id && jQuery(this).hasClass('open') === false)) {
				// The post is being opened
				post_info_height -= (jQuery(post_info).find('.post-title').outerHeight(true) + jQuery(post_info).find('.post-description').outerHeight(true) - 1);
			}else if((jQuery(this).attr('id') === changing_post_id && jQuery(this).hasClass('open'))){
				// The post is being closed.
				post_info_height = parseInt(jQuery(post_info).attr('data-height'), 10) + 2;
			} else if(jQuery(this).hasClass('open')) {
				post_info_height = jQuery(this).find('.post-info').outerHeight() + 2;
			}
			
			var photo_height = (post_height - post_info_height) + 1;
			
			
			jQuery(this).find('.blurred-image').css('height', photo_height + 'px');
			if(jQuery(this).find('.img-container').hasClass('visible')){
				// If the image is already visible, change the height with transition.
				jQuery(this).find('.img-container').removeClass('no-height-transition').css('height', photo_height + 'px');
			}else{
				// If the image is already visible, change the height without transition.
				jQuery(this).find('.img-container').addClass('no-height-transition').css('height', photo_height + 'px').addClass('visible');
				setTimeout(function(){
					jQuery(this).find('.img-container').removeClass('no-height-transition');
				}, 500);
			}
		});
	}
	
	// Shows the post content
	
	var changingPostState = false;
	
	function blogShowPostContent(post_id, change_url){
		if(!changingPostState){
			changingPostState = true;
			setTimeout(function(){ changingPostState = false; }, 600);
			
			var article = jQuery('#' + post_id);
			
			jQuery(article).find('.post-title').removeClass('open_at_init');
			
			if(jQuery(article).hasClass('open')) {
				// If the post is already open, then close it.
				blogHidePostContent(post_id);
				
			}else{
				// Close the open post if there is one.
				if(jQuery('.posts-wrapper article.open').length > 0){
					blogHidePostContent(jQuery('.posts-wrapper article.open').attr('id'), true);
				}else{
					// Adjust the blog list's inner div width to make room for the post content.
					jQuery('.posts-inner').css('width', jQuery('.posts-inner').width() + 500);
					blogAdjustPostsWrappersWidth(1);
				}
						
				blogAdjustPreviewImages(post_id);
				
				jQuery(article).addClass('open');
				jQuery(article).find('.post-title, .post-description').removeClass('open');
				
				setTimeout(function(){
					// Fetch the post comments when requested
					jQuery(article).find('.toggle-comments').off('click');
					jQuery(article).find('.toggle-comments').on('click', function(e){
						e.preventDefault();
						
						var post_id_number = post_id.split('-')[1];
						toggleComments(post_id_number);
						
					});
	
					change_url = typeof change_url !== 'undefined' ? change_url : true;
					if(change_url){
						// Set the browser URL to the post's permalink
						var url = current_page_url;
						if(jQuery(article).attr('data-url') !== "undefined") { url = jQuery(article).attr('data-url'); }
						setCurrentURL(url, false);
					}
					
					
				}, 500);
			}
		}
	}
	
	function toggleComments(post_id_number){
		var post = jQuery('#post-' + post_id_number);
		var toggle_button = jQuery('#post-' + post_id_number).find('.toggle-comments');
	
		if(!jQuery(post).hasClass('open')){
			blogShowPostContent('post-' + post_id_number);
		}
		
		if(jQuery(toggle_button).hasClass('showing-comments')){
			jQuery('#comments-' + post_id_number).empty();
			jQuery(toggle_button).removeClass('showing-comments');
			jQuery('#post-' + post_id_number).find('.post-content-wrapper').getNiceScroll().resize();
		}else{	
			getAjaxComments(post_id_number, false);
			jQuery(toggle_button).addClass('showing-comments');	
		}
		var text_backup = jQuery(toggle_button).attr('data-text-backup');
		jQuery(toggle_button).attr('data-text-backup', jQuery(toggle_button).text());
		jQuery(toggle_button).text(text_backup);
	}
	
	// Hides a post content.
	
	function blogHidePostContent(post_id, maintain_url) {
		blogAdjustPreviewImages(post_id);
		
		// Close the post
		var post = jQuery('#' + post_id);
		jQuery(post).removeClass('open');
		
		if(jQuery('.posts-wrapper article.open').length === 0 && maintain_url !== true){
			setCurrentURL(current_page_url, false);
		}
		
		setTimeout(function(){
			jQuery(post).find('.post-title, .post-description').addClass('open');
		}, 250);
		
		// Adjust the wrapper's width after the transition.
		setTimeout(function(){
			blogAdjustPostsWrappersWidth();
		}, 600);
		
	}
	
	
	// Creates the scroll bar for the blog posts list.
	function blogCreatePostsScroll(){	
		if(jQuery('.posts-wrapper, .posts-inner').length > 1){
			jQuery('.posts-wrapper').niceScroll(".posts-inner", {
				bouncescroll : false,
				horizrailenabled : true,
				cursorwidth : 10,
				hwacceleration : false
			});
		}	
	}
	
	// Adjusts the blog posts list inner div width to fit its content.
	function blogAdjustPostsWrappersWidth(amount_opening_posts){
		var columns_width = 0;
		jQuery('.posts-wrapper article').each(function(){
			columns_width += parseInt(jQuery(this).outerWidth(), 10) + parseInt(jQuery(this).css('margin-left'), 10) + parseInt(jQuery(this).css('margin-right'), 10);
		});
		
		amount_opening_posts = typeof amount_opening_posts !== 'undefined' ? amount_opening_posts : 0;
		if(amount_opening_posts > 0){
			columns_width += (500 * amount_opening_posts);
		}
		
		// Make room for the more posts loader
		if(jQuery('.next-page a').length > 0){
			columns_width += 100;
		}else{
			columns_width += 30;
		}
		
		jQuery('.posts-inner').css('width', columns_width);
		
		if(jQuery('.sidebar').hasClass('open')){
			var sidebar_width = 300;
			var wrapper_width = jQuery(window).width() - sidebar_width - jQuery('.main-nav').width();
			jQuery('.posts-wrapper').css('width', wrapper_width);
		}else{
			jQuery('.posts-wrapper').css('width', '100%');
		}
		
		jQuery('.posts-wrapper').getNiceScroll().resize();
	}
			
	function blogSetupComments(){
		jQuery('.comment-form-author, .comment-form-email, .comment-form-url').on("click", function(){
			jQuery(this).find('input').focus();
		});
		jQuery('.comment-form-comment').on("click", function(){
			jQuery(this).find('textarea').focus();
		});
	}
	
	function getAjaxComments(post_id, scroll_to_last_parent, last_comment) {
		last_comment = typeof last_comment !== 'undefined' ? last_comment : 0;
		
		jQuery.ajax({
			url:lumen_ajax_url,
			type:'POST',
			data:'action=lumen_get_comments&post_id=' + post_id,
			dataType: 'html',
			success: function(html){
				jQuery("#comments-" + post_id).empty();
				jQuery("#comments-" + post_id).append(html);
				jQuery("#comments-" + post_id).find('.comment-reply-link').attr('onclick', '').on('click', function(e){
					e.preventDefault();
					replyToComment(this, post_id);
				});
				
				jQuery("#comments-" + post_id).find('#cancel-comment-reply-link').on('click', function(e){
					e.preventDefault();
					cancelReply(post_id);
				});
				 
				setUpAjaxCommentsSubmit(post_id);
				 
				jQuery('#respond textarea').attr('rows', 1).autogrow();
				jQuery('#post-' + post_id).find('.post-content-wrapper').getNiceScroll().resize();
				 
				if(scroll_to_last_parent){
					jQuery("#post-" + post_id + " .post-content-wrapper").getNiceScroll().doScrollPos(0, 999999, 500);
				}else{
					jQuery("#post-" + post_id + " .post-content-wrapper").getNiceScroll().doScrollPos(0, jQuery("#post-" + post_id).find('div.comments').position().top, 500);
				}
			}
		});
	}
	
	function replyToComment(reply_button, post_id){
		var match = jQuery(reply_button).attr('href').match(/replytocom=(\d+)/);
		var parent = match[1];
		jQuery("#commentform-" + post_id).find('input[name="comment_parent"]').attr('value', parent);
		jQuery("#post-" + post_id + " .post-content-wrapper").getNiceScroll().doScrollPos(0, 999999, 500);
		setTimeout(function(){
			jQuery('#post-' + post_id + ' input[name="author"]').focus();
		}, 500);
		jQuery("#comments-" + post_id).find('#cancel-comment-reply-link').css('display', 'inline');
	}
	
	function cancelReply(post_id){
		jQuery("#commentform-" + post_id).find('input[name="comment_parent"]').attr('value', '');
		jQuery("#comments-" + post_id).find('#cancel-comment-reply-link').css('display', 'none');
	}
	
	function setUpAjaxCommentsSubmit(post_id){
		var commentform = jQuery('#commentform-' + post_id);	 
		
		// find the comment form
		commentform.prepend('<div id="comment-status" ></div>');
		// add info panel before the form to provide feedback or errors
		var statusdiv = commentform.find('#comment-status');
		// define the infopanel
		
		commentform.submit(function() {
			//serialize and store form data in a variable
			var formdata = commentform.serialize();
			//Add a status message
			statusdiv.html('<p class="wdpajax-processing">Processing...</p>');
			//Extract action URL from commentform
			var formurl = commentform.attr('action');
			//Post Form with data
			jQuery.ajax({
				type : 'post',
				dataType: 'json',
				url : formurl,
				data : formdata,
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					statusdiv.html('<p class="wdpajax-error" >You might have left one of the fields blank, or be posting too quickly</p>');
				},
				success : function(data, textStatus) {
					if (data.comment_approved === "1") {
						statusdiv.html('<p class="wdpajax-success">Thanks for your comment. We appreciate your response.</p>');					
						getAjaxComments(post_id, true);
					}else{
						statusdiv.html('<p class="wdpajax-error" >Please wait a while before posting your next comment</p>');
						commentform.find('textarea[name=comment]').val('');
					}
				}
			});
			return false;
		});
	}

	
	/***************************************************************************/
	/*																																				 */
	/*															PORTFOLIO																	 */
	/*																																				 */
	/***************************************************************************/
	
	/*****************************/
	/*		PORTFOLIO STARTUP			 */
	/*****************************/
	
	function portfolioSetup(firstInit){
		if(jQuery('.works-inner').css('display') !== "none"){
			// Set the wrapper's padding relative to the page-content's height.
			var page_height = jQuery('.page-content').height();
			var padding = 130;
			var max_content_height = page_height - padding;
			
			if(max_content_height >= 628){
				padding = (page_height - 628) / 2;
			}else{
				padding = padding / 2;
			}
			
			if(jQuery(window).width() <= 760){
				jQuery('.works-wrapper').css( { 'padding-top' : 60, 'padding-bottom' : 15 } );
			}else{
				jQuery('.works-wrapper').css( { 'padding-top' : padding, 'padding-bottom' : padding } );
			}
			
			jQuery('.sidebar').css( { 'padding-top' : padding, 'padding-bottom' : padding } );
			jQuery('.top-bar').css('height', padding);
			jQuery('ul.categories').css('top', padding - 44);
			
			// Init nicescroll for the posts contents.
			// Record the post-info area height.
			jQuery('.works-wrapper article').each(function(){
				// Init nicescroll for the posts contents.
				jQuery(this).find('.work-content-wrapper').niceScroll("#" + jQuery(this).attr('id')	+ ' .content', {
					bouncescroll : false,
					horizrailenabled : false,
					nativeparentscrolling : true,
					railpadding : {top:0,right:5,left:0,bottom:0}
				});
				
				// Record the post-info area height
				if(firstInit){
					if(!jQuery(this).find('.work-info').attr('data-height')){
						jQuery(this).find('.work-info').attr('data-height', jQuery(this).find('.work-info').outerHeight(true));
					}
					
					// Create the images/videos galleries
					var gallery_items = [];
					jQuery('#' + jQuery(this).attr('id')	+ ' .zoom-content a').each(function(){
						gallery_items.push({ 
							src : jQuery(this).attr('href'), 
							type : jQuery(this).attr('data-gallery-type')
						});
					});
					
					var zoom_content = jQuery('#' + jQuery(this).attr('id') + ' .zoom-content');
					jQuery(zoom_content).magnificPopup({
						items: gallery_items,
						gallery: { enabled: true },
						type: 'image',
						image : { titleSrc : function(item) { if(typeof(item) !== "undefined"){ return jQuery(zoom_content).parent().parent().find('a[data-gallery-index="' + item.index + '"]').attr('title'); } return ""; } },
						callbacks: {
							buildControls: function() {
								// re-appends controls inside the main container
								if(typeof(this.arrowLeft) !== "undefined" && this.arrowLeft !== null){
									this.contentContainer.append(this.arrowLeft.add(this.arrowRight));	
								}
							},
							open : function(){
								jQuery('body').addClass('blurred');
							},
							close : function(){
								jQuery('body').removeClass('blurred');
							}
						}
					});
				}
			});
			
			// Show the content when the "read more" link is clicked.
			jQuery('.work-description-wrapper.with-content').off('click');
			jQuery('.work-description-wrapper.with-content').on('click', function(e){
				e.preventDefault();
				var work_id = jQuery(this).parent().parent().parent().parent().attr('id');
				portfolioShowWorkContent(work_id);
			});
			
			// Set Up the Sidebar
			if(firstInit){
				setUpSidebar();	
			}
			
			// Show the works according to the currently selected filter.
			portfolioFilterSetup();
			
			// Adjust the preview images height.
			portfolioAdjustPreviewImages();
			
			if(firstInit){
				// Create the blog posts list scroll
				portfolioCreatePostsScroll();
				
				// Toggle categories menu		
				jQuery('#toggle-categories').on('click', function(e){
					e.preventDefault();
					portfolioToggleCategories();
				});
			}
			// Adjust the blog posts list inner div to fit its contents.
			setTimeout(function(){
				portfolioAdjustScroll();	
			}, 550);	
			
			// Handle the click event on the close-post button
			jQuery('.close-work').off("click");
			jQuery('.close-work').on("click", function(e){
				e.preventDefault();
				portfolioHideWorkContent('work-' + jQuery(this).attr('id').split('-')[2]);
			});	
		}
		
	}
	
	function portfolioToggleCategories(){
		var button = jQuery('#toggle-categories');
		if(jQuery(button).hasClass('open')){
			jQuery(button).removeClass('open');
			
			jQuery('ul.categories').fadeOut();
			jQuery('.works-inner').fadeIn(function(){
				portfolioSetup(false);
				jQuery('.works-wrapper').getNiceScroll().show();
			});
		}else{
			jQuery(button).addClass('open');
			jQuery('.works-inner').fadeOut();	
			jQuery('ul.categories').fadeIn();
			jQuery('.works-wrapper').getNiceScroll().hide();
		}
	}
	
	// Shows the work content
	
	function portfolioShowWorkContent(work_id){
		var article = jQuery('#' + work_id);
		
		if(!jQuery(article).hasClass('post-it-right') && !jQuery(article).hasClass('post-it-left')){
			if(jQuery(article).hasClass('open')) {
				// If the post is already open, then close it.
				portfolioHideWorkContent(work_id);
			}else{
				if(jQuery(article).hasClass('half') || jQuery(window).width() <= 760){
					jQuery(article).css('margin-right', '346px');
				}else{
					jQuery(article).css('margin-right', '515px');
				}
				jQuery('.works-inner').isotope({ filter : '.visible' });
				jQuery(article).css('margin-right', '15px');
				jQuery(article).addClass('open');
				
				setTimeout(function(){
					portfolioAdjustScroll();
				}, 550);
			}
		}
	}
	
	function portfolioHideWorkContent(work_id){
		var article = jQuery('#' + work_id);
		jQuery(article).removeClass('open');
		setTimeout(function(){
			jQuery('.works-inner').isotope({ filter : '.visible' });
			setTimeout(function(){
				portfolioAdjustScroll();
			}, 550);		
		}, 600);
		
	}
	
	// Adjusts the blog posts list inner div width to fit its content.
	function portfolioAdjustScroll(){
		jQuery('.works-wrapper').getNiceScroll().resize();
		jQuery('.works-wrapper > .nicescroll-rails').css('bottom', (parseInt(jQuery('.works-wrapper').css('padding-bottom'), 10) - 30));
		
	}
	
	// Adjusts the posts preview images
	
	function portfolioAdjustPreviewImages(changing_work_id){
		jQuery('.works-wrapper article').each(function(){
	
			var work_height = jQuery(this).height();
			var work_info = jQuery(this).find('.work-info');
			var work_info_height = jQuery(work_info).attr('data-height');
			
			if((jQuery(this).attr('id') === changing_work_id && jQuery(this).hasClass('open') === false)) {
				// The work is being opened
				work_info_height -= (jQuery(work_info).find('.work-title').outerHeight(true) - 2);
			}else if((jQuery(this).attr('id') === changing_work_id && jQuery(this).hasClass('open'))){
				// The work is being closed.
				work_info_height = jQuery(work_info).attr('data-height');
			} else if(jQuery(this).hasClass('open')) {
				work_info_height = jQuery(this).find('.work-info').outerHeight();
			}
			
			var photo_final_height = work_height - 2 - work_info_height;
			jQuery(this).find('.blurred-image').css('height', photo_final_height + 'px');
			jQuery(this).find('.img-container').css('height', photo_final_height + 'px').addClass('visible');
		});
	}
	
	// Creates the scroll bar for the portfolio works list.
	function portfolioCreatePostsScroll(){
		jQuery('.works-wrapper').niceScroll(".works-inner", {
			bouncescroll : false,
			//preservenativescrolling : true,
			horizrailenabled : true,
			cursorwidth : 10,
			hwacceleration : false
		});
		jQuery('.page-content > .nicescroll-rails').css('bottom', (parseInt(jQuery('.works-wrapper').css('padding-bottom'), 10) - 30));
	}
	
	function portfolioFilterSetup(){
		reorganizeWorksHtml();
		var row_height = (jQuery('.works-inner').height() / 2) - ((jQuery('.works-inner').height() % 2)/2);
		jQuery('article.half').css('height', row_height);
		
		jQuery('.works-inner').isotope({
			itemSelector: 'article',
			layoutMode : 'masonryHorizontal',
			masonryHorizontal: {
				rowHeight: row_height,
			}
		});
		
		jQuery('ul.categories li a').off('click');
		jQuery('ul.categories li a').on('click', function(e){
			e.preventDefault();
			// Remove the active class to all other filter items.
			jQuery('ul.categories li a').parent().removeClass('active');
			// Mark this filter as active
			jQuery(this).parent().addClass('active');
			
			//Remove the visible class for all works
			jQuery('.works-inner article').removeClass('visible');
			
			if(jQuery(this).parent().hasClass('all')){
				jQuery('.works-inner article').addClass('visible');
			}else{
				jQuery('.works-wrapper article[data-work_types*=",' + jQuery(this).text() + ',"]').addClass('visible');
			}
			
			jQuery('.works-inner').isotope({ filter : '.visible' });
			
			setTimeout(function(){
				portfolioAdjustScroll();
			}, 550);
			
			if(jQuery(window).width() <= 760){
				portfolioToggleCategories();	
			}
			
		});
	
	}
	
	function reorganizeWorksHtml(){
		var changeMade = false;
		var skipNext = false;
		jQuery('.works-inner article.half').each(function(){
			if(!skipNext && !changeMade && jQuery(this).hasClass('half') && !jQuery(this).is(jQuery('.half:last'))){
				if(jQuery(this).next().hasClass('half')){
					skipNext = true;
				}else if(!(jQuery(this).prev().hasClass('half') && !jQuery(this).prev().prev().hasClass('half'))){
					jQuery(this).after(jQuery('#' + jQuery(this).attr('id') + ' ~ .half:first'));
					changeMade = true;
				}
			}else if(skipNext){
				skipNext = false;
			}
		});
		if(changeMade){
			reorganizeWorksHtml();
		}
	}
	
	/***************************************************************************/
	/*																																				 */
	/*                        BLOG AND PORTFOLIO															 */
	/*																																				 */
	/***************************************************************************/
	
	// Sidebar
	
	function setUpSidebar(){
		// Toggle the sidebar when the toggle-sidebar button is clicked.
		jQuery('#toggle-sidebar').off('click');
		jQuery('#toggle-sidebar, .close-sidebar').on('click', function(e){
			e.preventDefault();
			toggleSidebar();
		});
		
	}
	
	// Toggles the sidebar state: visible/hidden
	
	function toggleSidebar(){
		// Toggle the blog posts wrapper div "sidebar-open" class.
		var post_type = 'posts';
		if(current_template === "portfolio"){
			post_type = 'works';
		}
		
		if(jQuery('.' + post_type + '-wrapper').hasClass('sidebar-open')){
			jQuery('.' + post_type + '-wrapper').removeClass('sidebar-open');
			jQuery('.' + post_type + '-wrapper').css('width', '100%');
			jQuery('.sidebar, .top-bar').removeClass('open');
		}else{
			jQuery('.' + post_type + '-wrapper').addClass('sidebar-open');
			jQuery('.sidebar, .top-bar').addClass('open');
			blogAdjustPostsWrappersWidth();
		}
		
		// Resize nicescroll
		jQuery('.' + post_type + '-wrapper').getNiceScroll().resize();
		
		// Adjust widgets li to two columns.
		jQuery('.widget li').each(function(){
			if(jQuery(this).find('a').text().length < 15) {
				jQuery(this).removeClass('one-column');
				jQuery(this).addClass('half-column');
			}else{
				jQuery(this).removeClass('half-column');
				jQuery(this).addClass('one-column');
			}
			
			jQuery('.widget .half-column').each(function(){
				if(jQuery(this).offset().left > 150) {
					jQuery(this).css('margin-left', '5%');
				}
			});
		});
		
		// After the CSS effect has taken place, adjust the blog posts list inner div width to fit its content.
		setTimeout(function(){
			if(post_type === "posts"){
				blogAdjustPostsWrappersWidth();	
			}
		}, 600);
	}
	
	
	/***************************************************************************/
	/*																																				 */
	/*                               GALLERY						  					   				 */
	/*																																				 */
	/***************************************************************************/
	
	var current_thumb = 1;

	function gallerySetup(firstInit){
		if(firstInit){
			
			jQuery('.gallery-image-1').css('background-size', jQuery('.gallery-thumbnails li:first-child').attr('data-backround_size'));
		
			jQuery('.gallery-thumbnails li').on('click', function(){
				if(!jQuery(this).hasClass('active')){
					var li = jQuery(this);
					var imageSrc = li.attr('data-full_image');
					var backgroundSize = li.attr('data-background_size');
					var title = li.attr('data-title');
					var description = li.attr('data-description');
					
					var thumb_id = parseInt(jQuery(this).attr('id').split('-')[1], 10);
					
					NProgress.configure({ ease: 'ease', speed: 250 });
					NProgress.start();
					jQuery('<img/>').attr('src', imageSrc).load(function(){
						jQuery(this).remove();
						NProgress.done();

						// Find the appearing direction
						var transition_from = "up"; 
						var transition_to = "down";
						if(current_thumb < thumb_id) { transition_from = "down"; transition_to = "up"; }
						
						// Find the active gallery
						var active_gallery = 1;
						var next_active_gallery = 2;
						if(jQuery('.gallery-image-2').hasClass('active')){ active_gallery = 2; next_active_gallery = 1; } 
						
						// Change the images and Move the galleries
						jQuery('.gallery-image-' + next_active_gallery).removeClass('transition from-up from-down').css( { 'background-image' : 'url('+ imageSrc +')', 'background-size' : backgroundSize, '-webkit-background-size' : backgroundSize, '-moz-background-size' : backgroundSize } ).addClass('from-' + transition_from);
						
						// Set the title and description
						jQuery('.gallery-image-' + next_active_gallery + ' .info').html("");
						if(title.length > 0 || description.length > 0){
							jQuery('.gallery-image-' + next_active_gallery + ' .info, .gallery-image-' + next_active_gallery + ' .button-show-info').removeClass("hidden");
							if(title.length > 0){ 
								jQuery('.gallery-image-' + next_active_gallery + ' .info').append('<p class="title">' + title + '</p>');
							}
							if(description.length > 0){
								jQuery('.gallery-image-' + next_active_gallery + ' .info').append('<p class="description">' + description + '</p>');
							}
						}else{
							jQuery('.gallery-image-' + next_active_gallery + ' .info, .gallery-image-' + next_active_gallery + ' .button-show-info').addClass("hidden");
						}
						
						
						setTimeout(function(){
							jQuery('.gallery-image-' + next_active_gallery).addClass('transition active');
							// Accomodate the gallery: // Remove from viewport   
							jQuery('.gallery-image-' + active_gallery).removeClass('transition from-up from-down').addClass('from-' + transition_to + ' transition').removeClass('active');
						}, 50); // A slight delay is needed here, don't know why.				
						
						current_thumb = thumb_id;
						
						// Thumbnails
						jQuery('.gallery-thumbnails li.active').removeClass('active');
						li.addClass('active');
					});					
				}				
			});
			
			var thumbs = jQuery('.gallery-thumbnails ul');
			var direction = "none";
			
			jQuery('.gallery-thumbnails').on('mousemove', function(e){
				var scrollDistance = thumbs.scrollTop();
		    var scrollWidth = thumbs.height();
		    var windowWidth = thumbs.height();
		    var scrollSpeed = (scrollWidth - scrollDistance - windowWidth) * 2.5;
		    
		    var y = e.pageY - jQuery(this).offset().top
		    var height = jQuery(this).height();
		    var new_direction = "none";
		    
		    if(y <= height/4) { new_direction = "up"; } else if(y >= (height / 4) * 3) { new_direction = "down"; } else { new_direction = "none"; }
		    if(new_direction !== direction){
			    if(new_direction === "down"){
				    thumbs.scrollTo('100%', 1500, { axis:'y' });
			    }else if(new_direction === "up"){
				  	thumbs.scrollTo('0%', 1500, { axis:'y' });
			    }else{
			    	if(direction === "down"){
				    	thumbs.scrollTo('+=20px', 250, { axis:'y' });
			    	}else if(direction === "up"){
				    	thumbs.scrollTo('-=20px', 250, { axis:'y' });
			    	}
				    thumbs.stop();
			    }			    
			    direction = new_direction;
		    }
			});
			jQuery('.gallery-thumbnails').on('mouseleave', function(){
				thumbs.stop();
				if(direction === "down"){
		    	thumbs.scrollTo('+=20px', 250, { axis:'y' });
	    	}else if(direction === "up"){
		    	thumbs.scrollTo('-=20px', 250, { axis:'y' });
	    	}
				direction = "none";
			});
			
		
		
			jQuery('.button-show-info').on('click', function(){
				if(jQuery(this).hasClass('mobile-inactive')){
					jQuery('.button-show-info, .gallery-image .info').addClass('mobile-inactive');
					jQuery(this).removeClass('mobile-inactive');
					jQuery(this).parent().find('.info').removeClass('mobile-inactive')
				}else{
					jQuery(this).addClass('mobile-inactive');
					jQuery(this).parent().find('.info').addClass('mobile-inactive')
				}
				
			});
		}		
	}
	
	
	/***************************************************************************/
	/*																																				 */
	/*                       ADDITIONAL FUNCTIONS															 */
	/*																																				 */
	/***************************************************************************/
	
	/*
	 * Auto-growing textareas.
	 *
	 * http://github.com/jaz303/jquery-grab-bag/tree/master/javascripts/jquery.autogrow-textarea.js
	 */
	
	(function($)
	{
		$.fn.autogrow = function(options)
		{
			return this.filter('textarea').each(function()
			{
				var self					= this;
				var $self				= $(self);
				var minHeight		= $self.height();
				var noFlickerPad = $self.hasClass('autogrow-short') ? 0 : parseInt($self.css('lineHeight'), 10) || 0;
				
				var shadow = $('<div></div>').css({
						position:	'absolute',
						top: -10000,
						left: -10000,
						width: $self.width(),
						fontSize: $self.css('fontSize'),
						fontFamily: $self.css('fontFamily'),
						fontWeight: $self.css('fontWeight'),
						lineHeight: $self.css('lineHeight'),
						resize: 'none',
						'word-wrap': 'break-word'
					}).appendTo(document.body);
				
				var update = function(event)
				{
					var times = function(string, number)
					{
						for (var i=0, r=''; i<number; i++) { r += string; }
						return r;
					};
					
					var val = self.value.replace(/</g, '&lt;')
															.replace(/>/g, '&gt;')
															.replace(/&/g, '&amp;')
															.replace(/\n$/, '<br/>&nbsp;')
															.replace(/\n/g, '<br/>')
															.replace(/ {2,}/g, function(space){ return times('&nbsp;', space.length - 1) + ' '; });
				
					// Did enter get pressed?	Resize in this keydown event so that the flicker doesn't occur.
					if (event && event.data && event.data.event === 'keydown' && event.keyCode === 13) {
						val += '<br />';
					}			
					shadow.css('width', $self.width());
					shadow.html(val + (noFlickerPad === 0 ? '...' : '')); // Append '...' to resize pre-emptively.
					$self.height(Math.max(shadow.height() + noFlickerPad, minHeight));
				};
				
				$self.change(update).keyup(update).keydown({event:'keydown'},update);
				$(window).resize(update);
				
				update();
			});
		};
		
		$.fn.watch = function(props, callback, timeout){
			if(!timeout) { timeout = 10; }
			return this.each(function(){
				var el = $(this), func = function(){ __check.call(this, el); }, data = { props: props.split(","), func: callback, vals: [] };
				$.each(data.props, function(i) { data.vals[i] = el.css(data.props[i]); });
				el.data(data);
				if (typeof (this.onpropertychange) === "object"){
					el.bind("propertychange", callback);
				} else if ($.browser.mozilla){
					el.bind("DOMAttrModified", callback);
				} else {
					setInterval(func, timeout);
				}
			});
			function __check(el) {
				var data = el.data(), changed = false, temp	= "";
				for(var i=0;i < data.props.length; i++) {
					temp = el.css(data.props[i]);
					if(data.vals[i] !== temp){
						data.vals[i] = temp;
						changed = true;
						break;
					}
				}
				if(changed && data.func) {
					data.func.call(el, data);
				}
			}
		};
	})(jQuery);
	
	function drawCircle(percentage){
		var canvas = document.getElementById('loader');	
		var context = canvas.getContext('2d');
		
		if(percentage > 0 && percentage <= 100){
			// Arc attributes
			var x = canvas.width / 2;
			var y = canvas.height / 2;
			var radius = 30;
			
			var startAngle = (0 - 90) * (Math.PI/180);
			var endAnglesDegrees = ((100 - percentage) * 360) / 100;
			var endAngle = (endAnglesDegrees - 90) * (Math.PI/180);
			
			context.clearRect(0,0,canvas.width,canvas.height);
			
			context.beginPath();
			context.arc(x, y, radius, startAngle, endAngle, true);
			context.lineWidth = 2;
			
			context.strokeStyle = "rgba(255, 255, 255, 0.5)";
			context.stroke();
			
			endAngle = (endAnglesDegrees - 100) * (Math.PI/180);
			
			context.beginPath();
			context.arc(x+Math.cos(endAngle)*radius, y+Math.sin(endAngle)*radius, 6, 0, 2 * Math.PI, false);
			context.fillStyle = 'transparent';
			context.fill();
			context.lineWidth = 2;
			
			context.strokeStyle = 'rgba(255, 255, 255, 0.5)';
			context.stroke();
		}else{
			context.clearRect(0,0,canvas.width,canvas.height);
		}	
	}
	
	/*
	 * Modified Isotope methods for gutters in masonry.
	 *
	 */
	
	jQuery.Isotope.prototype._getMasonryGutterColumns = function() {
		var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
		containerWidth = this.element.width();
	 
		this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
		// Or use the size of the first item
		this.$filteredAtoms.outerWidth(true) ||
		// If there's no items, use size of container
		containerWidth;
	 
		this.masonry.columnWidth += gutter;
	 
		this.masonry.cols = Math.floor((containerWidth + gutter) / this.masonry.columnWidth);
		this.masonry.cols = Math.max(this.masonry.cols, 1);
	};
	 
	jQuery.Isotope.prototype._masonryReset = function() {
		// Layout-specific props
		this.masonry = {};
		// FIXME shouldn't have to call this again
		this._getMasonryGutterColumns();
		var i = this.masonry.cols;
		this.masonry.colYs = [];
		while (i--) {
			this.masonry.colYs.push(0);
		}
	};
	 
	jQuery.Isotope.prototype._masonryResizeChanged = function() {
		var prevSegments = this.masonry.cols;
		// Update cols/rows
		this._getMasonryGutterColumns();
		// Return if updated cols/rows is not equal to previous
		return (this.masonry.cols !== prevSegments);
	};
	 
	/*
	*  NProgress (c) 2013, Rico Sta. Cruz
	*  http://ricostacruz.com/nprogress
	*/

   ;(function(factory) {
		if (typeof module === 'function') {
			module.exports = factory(window.jQuery || require('jquery'));
		} else {
			window.NProgress = factory(window.jQuery);
		}
	})(function($) {
		var NProgress = {};

		NProgress.version = '0.1.2';
	
		var Settings = NProgress.settings = {
			minimum: 0.08,
			easing: 'ease',
			positionUsing: '',
			speed: 200,
			trickle: true,
			trickleRate: 0.02,
			trickleSpeed: 800,
			showSpinner: true,
			template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
		};
	
		/**
		* Updates configuration.
		*
		*			NProgress.configure({
		*				minimum: 0.1
		*			});
		*/
		NProgress.configure = function(options) {
			$.extend(Settings, options);
			return this;
		};

		/**
		* Last number.
		*/

		NProgress.status = null;
	
		/**
		* Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
		*
		*			NProgress.set(0.4);
		*			NProgress.set(1.0);
		*/
	
		NProgress.set = function(n) {
			var started = NProgress.isStarted();
	
			n = clamp(n, Settings.minimum, 1);
			NProgress.status = (n === 1 ? null : n);

			var $progress = NProgress.render(!started),
					$bar = $progress.find('[role="bar"]'),
					speed = Settings.speed,
					ease = Settings.easing;
	
			var tmp1 = $progress[0].offsetWidth; /* Repaint */
	
			$progress.queue(function(next) {
				// Set positionUsing if it hasn't already been set
				if (Settings.positionUsing === ''){ Settings.positionUsing = NProgress.getPositioningCSS(); }
				
				// Add transition
				$bar.css(barPositionCSS(n, speed, ease));

				if (n === 1) {
					// Fade out
					$progress.css({ transition: 'none', opacity: 1 });
					var tmp2 = $progress[0].offsetWidth; /* Repaint */

					setTimeout(function() {
						$progress.css({ transition: 'all '+speed+'ms linear', opacity: 0 });
						setTimeout(function() {
							NProgress.remove();
							next();
						}, speed);
					}, speed);
				} else {
					setTimeout(next, speed);
				}
			});

			return this;
		};
	
		NProgress.isStarted = function() {
			return typeof NProgress.status === 'number';
		};

		/**
		* Shows the progress bar.
		* This is the same as setting the status to 0%, except that it doesn't go backwards.
		*
		*			NProgress.start();
		*
		*/
		NProgress.start = function() {
			if (!NProgress.status){ NProgress.set(0); }

			var work = function() {
				setTimeout(function() {
					if (!NProgress.status){ return; }
					NProgress.trickle();
					work();
				}, Settings.trickleSpeed);
			};
	
			if (Settings.trickle){ work(); }
	
			return this;
		};
	
		/**
		* Hides the progress bar.
		* This is the *sort of* the same as setting the status to 100%, with the
		* difference being `done()` makes some placebo effect of some realistic motion.
		*
		*			NProgress.done();
		*
		* If `true` is passed, it will show the progress bar even if its hidden.
		*
		*			NProgress.done(true);
		*/
	
		NProgress.done = function(force) {
			if (!force && !NProgress.status){ return this; }

			return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
		};
	
		/**
		* Increments by a random amount.
		*/
	
		NProgress.inc = function(amount) {
			var n = NProgress.status;

			if (!n) {
				return NProgress.start();
			} else {
				if (typeof amount !== 'number') {
					amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
				}
	
				n = clamp(n + amount, 0, 0.994);
				return NProgress.set(n);
			}
		};
	
		NProgress.trickle = function() {
			return NProgress.inc(Math.random() * Settings.trickleRate);
		};
	
		/**
		* (Internal) renders the progress bar markup based on the `template`
		* setting.
		*/
	
		NProgress.render = function(fromStart) {
			if (NProgress.isRendered()){ return $("#nprogress"); }
			$('html').addClass('nprogress-busy');
	
			var $el = $("<div id='nprogress'>")
				.html(Settings.template);
	
			var perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0);

			$el.find('[role="bar"]').css({
				transition: 'all 0 linear',
				transform: 'translate3d('+perc+'%,0,0)'
			});

			if (!Settings.showSpinner) {
				$el.find('[role="spinner"]').remove();
			}
			$el.appendTo(document.body);
	
			return $el;
		};
	
		/**
		* Removes the element. Opposite of render().
		*/
	
		NProgress.remove = function() {
			$('html').removeClass('nprogress-busy');
			$('#nprogress').remove();
		};
	
		/**
		* Checks if the progress bar is rendered.
		*/

		NProgress.isRendered = function() {
			return ($("#nprogress").length > 0);
		};
	
		/**
		* Determine which positioning CSS rule to use.
		*/

		NProgress.getPositioningCSS = function() {
			// Sniff on document.body.style
			var bodyStyle = document.body.style;
	
			// Sniff prefixes
			var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
													('MozTransform' in bodyStyle) ? 'Moz' :
													('msTransform' in bodyStyle) ? 'ms' :
													('OTransform' in bodyStyle) ? 'O' : '';

			if (vendorPrefix + 'Perspective' in bodyStyle) {
				// Modern browsers with 3D support, e.g. Webkit, IE10
				return 'translate3d';
			} else if (vendorPrefix + 'Transform' in bodyStyle) {
				// Browsers without 3D support, e.g. IE9
				return 'translate';
			} else {
				// Browsers without translate() support, e.g. IE7-8
				return 'margin';
			}
		};
	
		/**
		* Helpers
		*/
	
		function clamp(n, min, max) {
			if (n < min){ return min; }
			if (n > max){ return max; }
			return n;
		}
	
		/**
		* (Internal) converts a percentage (`0..1`) to a bar translateX
		* percentage (`-100%..0%`).
		*/
	
		function toBarPerc(n) {
			return (-1 + n) * 100;
		}
	
		/**
		* (Internal) returns the correct CSS for changing the bar's
		* position given an n percentage, and speed and ease from Settings
		*/
	
		function barPositionCSS(n, speed, ease) {
			var barCSS;

			if (Settings.positionUsing === 'translate3d') {
				barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
			} else if (Settings.positionUsing === 'translate') {
				barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
			} else {
				barCSS = { 'margin-left': toBarPerc(n)+'%' };
			}
	
			barCSS.transition = 'all '+speed+'ms '+ease;
	
			return barCSS;
		}
	
		return NProgress;
	});
})();

/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);