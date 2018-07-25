/*
 *   Template Name: Euforia - Responsive Vcard Template
 *   Version: 1.0
 *   Author:  Lukasz Lelek
 *   Website: www.ht2.pl
*/


(function($) {
 "use strict";

$(window).load(function() {
                 
    // add max-height to .menu-box 
    addMenuHeight();
    
    // active navigation
    $("nav").addClass('activ');

    // delete preloader
    $(".preloader").delay("500").fadeOut();

    // page transitions
    var myTimer = setTimeout(function () {

            PageTransitions.init({
                status: $('.page-wrapper').attr('data-pt-status'),
                pages: $('.page-wrapper'),
                menu: '#dl-menu',
                animcursor: $('.page-wrapper').attr('data-pt-anim'),
                nextAnimcursor: $('.page-wrapper').attr('data-pt-auto') 
            });
            clearTimeout(myTimer);

    }, 1000); 

        

});

$(document).ready(function() {
    
    $('#dl-menu').dlmenu();         
    $("body").tooltip({selector: '[data-toggle=tooltip]'});
    
});

$(window).resize(function() {
        
    addMenuHeight();
    
});


})(jQuery);

   
   
/* 
 * ----------------------------------------------------------
 *   Sidebar show / hide
 * ----------------------------------------------------------
 */    
jQuery(document).on("click", ".sidebar-btn", function (e) { 

    var sidebar = jQuery('.sidebar');
    if( sidebar.hasClass('sidebar-show') ) {
        sidebar.removeClass('sidebar-show');
    } else {
        sidebar.addClass('sidebar-show');
    }
    return false;  

});



/* 
 * ----------------------------------------------------------
 *   FUBCTIONS - BLOG MASLNRY (requires: masonry.min.js )
 * ----------------------------------------------------------
 */
jQuery(document).on("click", ".blog-load a", function () { 

    var elem = jQuery(this),
    $remote = elem.data('remote') || elem.attr('href');

    elem.addClass('btn-load-to-disabled');
    elem.html( '<i class="fa fa-refresh fa-spin"></i> '+elem.attr('data-textloading') );
    
    jQuery.ajax({
        url: $remote,
        data: "ajaxloader=yes",
        cache: true,
        context: document.body,
    })
    .done(function (html) {

            var dane = jQuery(html);
            var $items = dane.find('.blog-masonry > .item');
            var load_button = dane.find('.blog-load');
            
            $items.find('.links-ajax-loader a').addClass("ajax-loader");
            
            var $grid = jQuery(".blog-masonry");
            
            $items.imagesLoaded().always( function( instance ) {
  
                $grid.append( $items ).masonry( 'appended', $items );     
            
            });

            setTimeout(function() {
                
                jQuery('.blog-load').html(load_button['0'].innerHTML);
                
            }, 500);

      })
    .fail(function () {

             console.log('error');
             jQuery('.blog-load').html();

    });

    return false;


});
   


/* 
 * ----------------------------------------------------------
 *   FUBCTIONS - BLOG MASLNRY (requires: masonry.min.js )
 * ----------------------------------------------------------
 */
function masonry_init() {
    
    var myTimer;
    clearTimeout(myTimer);

    $tumblelog = jQuery('.content.activ .blog-masonry');

    $tumblelog.imagesLoaded( function(){
        
  
      
      $tumblelog.masonry({
         itemSelector: '.item',
         columnWidth: document.querySelector('.blog-masonry .item-sizer'),
         isAnimated: true
      });
      
    });
   
    if (  $tumblelog.find('iframe')  ){
    var myTimer = setTimeout(function () {
        
         $tumblelog.masonry();         
         clearTimeout(myTimer);
        
    },1000);
    }
    
}
 
 
 /* 
 * ----------------------------------------------------------
 *   FUBCTIONS - STELLAR BLOG SINGLE (requires: stellar.min.js )
 * ----------------------------------------------------------
 */
function stellar_blog_single() {
    
       jQuery('.content').stellar( {

        // Set scrolling to be in either one or both directions
        horizontalScrolling: false,
        verticalScrolling: true,

        // Set the global alignment offsets
        horizontalOffset: 0,
        verticalOffset: 0,

        // Refreshes parallax content on window load and resize
        responsive: false,

        // Select which property is used to calculate scroll.
        // Choose 'scroll', 'position', 'margin' or 'transform',
        // or write your own 'scrollProperty' plugin.
        scrollProperty: 'scroll',

        // Select which property is used to position elements.
        // Choose between 'position' or 'transform',
        // or write your own 'positionProperty' plugin.
        positionProperty: 'transform',

        // Enable or disable the two types of parallax
        parallaxBackgrounds: true,
        parallaxElements: true,

        // Hide parallax elements that move outside the viewport
        hideDistantElements: false,

        // Customise how elements are shown and hidden
        hideElement: function($elem) { $elem.hide(); },
        showElement: function($elem) { $elem.show(); }

    }); 
}   
   
/* 
 * ----------------------------------------------------------
 *   Add Comment
 * ----------------------------------------------------------
 */    
jQuery(document).on("submit", "#commentform", function (e) { 

    e.preventDefault();
    
    var form = jQuery('#commentform');
    var formAlert = jQuery('#comment-alert');
    var comentId = jQuery('#commentform input#comment_parent').val();
    var textarea = jQuery('textarea#comment');
    formAlert.remove();


    jQuery('.form-submit input#submit').addClass('btn-load-to-disabled');
    
  //  jQuery('.form-submit').append('<i class="submit-loader fa fa-refresh fa-spin"></i>');
    
    jQuery('.form-submit').append('<i class="submit-loader fa fa-refresh fa-spin"></i>');
    
    jQuery('.form-submit').append('<div id="comment-alert" class="color-red submit-alert"></div>');
    
     var statusdiv = jQuery('#comment-alert'); // define the info panel

    jQuery.ajax({
        url: form.attr('action'), 
        type: 'POST',
        data: form.serialize(),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('X-WPAC-REQUEST', '1');
        },
        success: function (data) {

            // del loader
            jQuery('.submit-loader').remove();
            jQuery('.form-submit input#submit').removeClass('btn-load-to-disabled');

            var namesearch = /error-page/;
            if ( namesearch.test(data)  ) {

                   var html = jQuery(data);
                   
                   var d =  jQuery(html).filter('p').text();
                   statusdiv.html(d);
                   


            } else {

                if(comentId === '0') {

                    var boxcoments = jQuery(data).find('.post-comments');
                    jQuery('.post-comments').html(boxcoments['0'].innerHTML);
                    //console.log('post:'+ comentId );

                }else{
                    var boxcoments = jQuery(data).find('#comment-'+comentId);
                    jQuery('#comment-'+comentId).html(boxcoments['0'].innerHTML);

                    //console.log('post leve2:'+ comentId );
                }
                
                // clear textarea
                textarea.value = '';
                
            }

        },
        error: function (jqXhr, textStatus, errorThrown) {

            jQuery('.submit-loader').remove(); 
            jQuery('.form-submit input#submit').removeClass('btn-load-to-disabled');

            var html = jQuery(jqXhr.responseText);
            
            var d =  jQuery(html).filter('p').text();
            statusdiv.html(d);
                   
        }
    });

    return false;

});



/* 
 * ----------------------------------------------------------
 *   FUBCTIONS - Skills progress
 * ----------------------------------------------------------
 */
function skillsProgress() {
      
    var myTimer = setTimeout(function() {
    
        if( jQuery(".progress_bar .progress[aria-valuenow]") ) {
            
            
            var waypoints = jQuery('.progress_bar .progress[aria-valuenow]').waypoint(function(direction) {
                
                var $this = jQuery(this),
                percent = $this.attr('aria-valuenow');
                
                if ( !$this.hasClass("countTo") ) { 
                    
                    $this.addClass('countTo');
                    $this.animate({
                        'width' : percent + '%'
                    },{ duration: 2000, easing: 'swing' },percent + '00');
                    $this.find('.progress-percent span').countTo({
                        from: 10,
                        to: percent,
                        speed: 1500,
                        refreshInterval: 30
                    });
              
                }
              
            }, {
              offset: '90%',
              context: '.content'
            });
                         
        
        }
        
        clearTimeout(myTimer);
        
    }, 700);
    
}



/* 
 * ----------------------------------------------------------
 * FUBCTIONS - Achivement countTo
 * ----------------------------------------------------------
 */
function achivementCountTo() {
    
    var myTimer = setTimeout(function() {

        if( jQuery(".achivement [data-to]").length > 0 ) {
            
            var waypoints = jQuery('.achivement [data-to]').waypoint(function(direction) {
                
                var $this = jQuery(this);
                
                if ( !$this.hasClass("countTo") ) { 
                    
                    $this.addClass('countTo');
                    $this.countTo();
              
                }
              
            }, {
              offset: '85%',
              context: '.content'
            });
            

        }
        clearTimeout(myTimer);
    
    }, 700);
    
}



/* 
 * ----------------------------------------------------------
 * FUNCTIONS - Add Menu Height
 * ----------------------------------------------------------
 */
function addMenuHeight() {
    
    var nav = jQuery('.menu-scroll');
    var menuHeight =  jQuery('nav').height() - ( jQuery('nav .logo-box').height() + jQuery('nav .footer').height() );
    nav.css({'max-height': menuHeight +'px'});
    
    return false;
}



/* 
 * ----------------------------------------------------------
 * FUNCTIONS - Menu
 * ----------------------------------------------------------
 */
;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr, $body = jQuery( 'body' );

	$.DLMenu = function( options, element ) {
		this.$el = $( element );
		this._init( options );
	};

	// the options
	$.DLMenu.defaults = {
		animationClasses : { classin : 'dl-animate-in-2', classout : 'dl-animate-out-2' },
		onLevelClick : function( el, name ) { return false; },
		onLinkClick : function( el, ev ) { return false; }
	};

	$.DLMenu.prototype = {
		_init : function( options ) {

			// options
			this.options = $.extend( true, {}, $.DLMenu.defaults, options );
			// cache some elements and initialize some variables
			this._config();
			
			var animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
			},
			transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
			};

			this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
			this.supportAnimations = Modernizr.cssanimations,
			this.supportTransitions = Modernizr.csstransitions;

			this._initEvents();

		},
                
		_config : function() {
                    
			this.open = false;
                        this.openMobile = false;
                        this.$menuScroll = jQuery( '.menu-scroll' );
                        this.$buttonMobile = jQuery( '.menu-button-mobile' );
			this.$trigger = jQuery( '.dl-trigger' );
			this.$menu = this.$el.children( 'ul.dl-menu' );
			this.$el.find( 'ul.sub-menu' ).prepend( '<li class="dl-back"><a href="#"></a></li>' );
			this.$back = this.$menu.find( 'li.dl-back' );
                        
                        this.$menuitems = this.$el.find( 'li:not(.dl-back)' );
                        this.$menuitems.each(function () {
                        
                            var elem = jQuery(this);
                            var name = elem.find( 'a' )['0'];
                            
                            if(name) {
                                elem.find('a').attr('data-hover', name.innerHTML);
                            } 

                        });
                        
                        this.$menuli = this.$menu.find( 'li' );
                        this.$menuli.each(function () {
                        
                            var elem = jQuery(this);
                            var name = elem.find( 'a' )['0'];
                            
                            if(name) {
                                elem.find( 'li.dl-back' ).find( 'a' ).html('<i class="fa fa-fw fa-long-arrow-left"></i> '+name.innerHTML);
                            } else {
                                elem.find( 'li.dl-back' ).find( 'a' ).html('<i class="fa fa-fw fa-long-arrow-left"></i>');
                            }
                            
                        });
                                             
		},
		_initEvents : function() {

			var self = this;
                        
                        this.$buttonMobile.on( 'click.dlmenu', function() { 
                            
                            //console.log('aa');
                            
                                if( self.$menuScroll.hasClass('dl-show') ) {
			            self.$menuScroll.removeClass('dl-show');
                                    self.$buttonMobile.removeClass('close'); 
				} else {
			            self.$menuScroll.addClass('dl-show');
                                    self.$buttonMobile.addClass('close');
				}
				return false;
                        });
  
                        jQuery(document).on( 'click', 'li.menu-item-has-children > a', function( event ) {
                        //jQuery(document).on( 'click', 'li.submenu > a', function( event ) {
                            
                                event.stopPropagation();
                            
                                var elem = jQuery(this);
                                var elem2 = elem['0'];

				var $item = jQuery(elem2.parentNode),
					$submenu = $item.children( 'ul.sub-menu' );

				if( $submenu.length > 0 ) {

					var $flyin = $submenu.clone().css( 'opacity', 0 ).insertAfter( self.$menu ),
						onAnimationEndFn = function() {
							self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classout ).addClass( 'dl-subview' );
							$item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
							$flyin.remove();
						};

					setTimeout( function() {
						$flyin.addClass( self.options.animationClasses.classin );
						self.$menu.addClass( self.options.animationClasses.classout );
						if( self.supportAnimations ) {
							self.$menu.on( self.animEndEventName, onAnimationEndFn );
						}
						else {
							onAnimationEndFn.call();
						}

						self.options.onLevelClick( $item, $item.children( 'a:first' ).text() );
					} );
                                        
					return false;

				}
				else {
                                        //self.$el.removeClass('dl-show');
					self.options.onLinkClick( $item, event ); 
				}

			} );
                        
                        
			this.$back.on( 'click.dlmenu', function( event ) {
				
				var $this = $( this ),
					$submenu = $this.parents( 'ul.sub-menu:first' ),
					$item = $submenu.parent(),

					$flyin = $submenu.clone().insertAfter( self.$menu );

				var onAnimationEndFn = function() {
					self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses.classin );
					$flyin.remove();
				};

				setTimeout( function() {
					$flyin.addClass( self.options.animationClasses.classout );
					self.$menu.addClass( self.options.animationClasses.classin );
					if( self.supportAnimations ) {
						self.$menu.on( self.animEndEventName, onAnimationEndFn );
					}
					else {
						onAnimationEndFn.call();
					}

					$item.removeClass( 'dl-subviewopen' );
					
					var $subview = $this.parents( '.dl-subview:first' );
					if( $subview.is( 'li' ) ) {
						$subview.addClass( 'dl-subviewopen' );
                                               
					}
					$subview.removeClass( 'dl-subview' );
                                        
				} );

				return false;

			} );
			
		},

		closeMenu : function() {
			if( this.open ) {
				this._closeMenu();
			}
		},
		_closeMenu : function() {
			var self = this,
				onTransitionEndFn = function() {
					self.$menu.off( self.transEndEventName );
					self._resetMenu();
				};
			
			this.$menu.removeClass( 'dl-menuopen' );
			this.$menu.addClass( 'dl-menu-toggle' );
			this.$trigger.removeClass( 'dl-active' );
                       
			
			if( this.supportTransitions ) {
				this.$menu.on( this.transEndEventName, onTransitionEndFn );
			}
			else {
				onTransitionEndFn.call();
			}

			this.open = false;
		},
		openMenu : function() {
			if( !this.open ) {
				this._openMenu();
			}
		},
		_openMenu : function() {
			var self = this;
                        
			// clicking somewhere else makes the menu close
			$body.off( 'click' ).on( 'click.dlmenu', function() {
				self._closeMenu() ;
                               
			} );
			this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
				$( this ).removeClass( 'dl-menu-toggle' );
			} );
			this.$trigger.addClass( 'dl-active' );
			this.open = true;
		},
		// resets the menu to its original state (first level of options)
		_resetMenu : function() {
			this.$menu.removeClass( 'dl-subview' );
			this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.dlmenu = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'dlmenu' );
				if ( !instance ) {
					logError( "cannot call methods on dlmenu prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for dlmenu instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'dlmenu' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );




/* 
 * ----------------------------------------------------------
 * FUNCTIONS - Page Transitions
 * ----------------------------------------------------------
 */
PageTransitions = (function() {
    
        var isLoadPage = false,
            isAnimating = false,
            endCurrPage = true,
            endNextPage = false,
            animEndEventNames = {
                'WebkitAnimation': 'webkitAnimationEnd',
                'OAnimation': 'oAnimationEnd',
                'msAnimation': 'MSAnimationEnd',
                'animation': 'animationend'
            },
            animEndEventName = animEndEventNames[ Modernizr.prefixed('animation') ],
            support = Modernizr.cssanimations;


        function init(options) {

                $main = options.pages,
                menu = options.menu,
                animcursor = options.animcursor -1,
                animcursor++;
                nextAnimcursor = options.nextAnimcursor,
                pageStart = getPageActivWP(),
                pageActiv = '',
                
                addClassAjaxLoader();
        
                $main.append('<section id="page-ajax-prev"></section>');
                $pages = $main.children('section'),        
                $pages.each(function () {
                    var $page = jQuery(this);
                    if ($page.attr('class')) {
                        pageClass = $page.attr('class');
                    }
                    else {
                        pageClass = "";
                    }
                    $page.data('originalClassList', pageClass);
                });
                
                
                nextPage(animcursor, 'section.activ');
                jQuery(menu+' .'+pageStart).addClass('active');

                if(options.status === '1'){
                    navigationPage();
                        
                }        
                
                        
        }
        
        
        function addClassAjaxLoader() {
            
            var domain = new RegExp(location.hostname);
            var $menu = jQuery( menu +' li > a' );
            $menu.each(function () {
                var $link = jQuery(this);
                var linkHref = $link.attr('href');
                if ( domain.test( linkHref ) ) {
                    $link.addClass('ajax-loader');  
                }      
            });
                
            jQuery('.links-ajax-loader a').attr("class", "ajax-loader");
            
            // widgets
            jQuery('.widget_recent_entries a').attr("class", "ajax-loader");
            jQuery('.widget_recent_comments a').attr("class", "ajax-loader");
            jQuery('.widget_archive a').attr("class", "ajax-loader");
            jQuery('.widget_categories a').attr("class", "ajax-loader");
                       
            
        }
    
    
        function navigationPage() {
                window.onpopstate = function(event) {
                    
                    if (location.hash !== ''){ return false; }
                    var dane = jQuery('<a></a>').attr('href',location);
                    ajaxPage(dane);
                    
                };         
                  
                jQuery(document).on("submit", "form#searchform", function (e) {
                    
                    e.preventDefault();
                    var elem = jQuery(this);
                    if (elem.attr('action') === '#'){ return false; }
                    if (isAnimating) { return false; }
                    
                    elem.attr('href',elem.attr('action')+'?'+elem.serialize());     
                    
                    var timerDelay = 100;
                  
                    if(jQuery('.menu-scroll').hasClass('dl-show')) 
                    {
                            jQuery('.menu-scroll').removeClass('dl-show');
                            jQuery('.menu-button-mobile').removeClass('close');
                            timerDelay = 700;
                    }

                    var myTimer = setTimeout(function () {
                        
                        ajaxLoadPage(elem);
                        clearTimeout(myTimer);

                    }, timerDelay);
                                     
                    history.pushState('', 'New URL: '+elem.attr('href'), elem.attr('href'));
                    
                });
            
                jQuery(document).on("click", ".ajax-loader", function (e) {
                    
                    
                    e.preventDefault();
                    var elem = jQuery(this);
                    if (elem.attr('href') === '#'){ return false; }
                    if (isAnimating) { return false; }
                    
                                                      
                    var timerDelay = 100;
                  
                    if(jQuery('.menu-scroll').hasClass('dl-show')) 
                    {
                            jQuery('.menu-scroll').removeClass('dl-show');
                            jQuery('.menu-button-mobile').removeClass('close');
                            timerDelay = 700;
                    }

                    var myTimer = setTimeout(function () {
                        
                        ajaxPage(elem);
                        clearTimeout(myTimer);
                        

                    }, timerDelay);
                                     
                    history.pushState('', 'New URL: '+elem.attr('href'), elem.attr('href'));
                    
                });
                                        
        }
        
		/*
		*--------------------
				PSK
		*--------------------
		*/
		
		jQuery(document).on("click", ".menu-item-2418", function (e) { 
			if (location.hash !== ''){ return false; }
							var dane = jQuery('<a></a>').attr('href','http://127.0.0.1/PSK/about-me-2');
							if(jQuery('.menu-scroll').hasClass('dl-show')) 
							{
									jQuery('.menu-scroll').removeClass('dl-show');
									jQuery('.menu-button-mobile').removeClass('close');
									timerDelay = 700;
							}
							ajaxPage(dane)
		
		});
		jQuery(document).on("click", ".menu-item-2419", function (e) { 
			if (location.hash !== ''){ return false; }
							var dane = jQuery('<a></a>').attr('href','http://127.0.0.1/PSK/services');
							{
									jQuery('.menu-scroll').removeClass('dl-show');
									jQuery('.menu-button-mobile').removeClass('close');
									timerDelay = 700;
							}
							ajaxPage(dane)
		
		});
		jQuery(document).on("click", ".menu-item-2424", function (e) { 
			if (location.hash !== ''){ return false; }
							var dane = jQuery('<a></a>').attr('href','http://127.0.0.1/PSK/home');
							{
									jQuery('.menu-scroll').removeClass('dl-show');
									jQuery('.menu-button-mobile').removeClass('close');
									timerDelay = 700;
							}
							ajaxPage(dane)
		
		});
		jQuery(document).on("click", ".menu-item-2425", function (e) { 
			if (location.hash !== ''){ return false; }
							var dane = jQuery('<a></a>').attr('href','http://127.0.0.1/PSK/contact');
							{
									jQuery('.menu-scroll').removeClass('dl-show');
									jQuery('.menu-button-mobile').removeClass('close');
									timerDelay = 700;
							}
							ajaxPage(dane)
		
		});
		jQuery(document).on("click", ".menu-item-3417", function (e) { 
			e.preventDefault(); 
			var dane = jQuery('<a></a>').attr('href','http://127.0.0.1/PSK/redirect');
			{
					jQuery('.menu-scroll').removeClass('dl-show');
					jQuery('.menu-button-mobile').removeClass('close');
					timerDelay = 700;
			}
			ajaxPage(dane)
			window.location.replace("http://blog.prasanthsasikumar.com");
			{
					jQuery('.menu-scroll').removeClass('dl-show');
					jQuery('.menu-button-mobile').removeClass('close');
					timerDelay = 700;
			}
			return false;
		
		});
		
		/*
		*-------------------
		   END PSK
		*-------------------
		*/
        
        function ajaxPage(elem) {
                var url = elem.data('remote') || elem.attr('href');
                var typeLink = /page_id=/;

                if ( typeLink.test(url) ) {
                    var urlPageId = url.split(typeLink);
                    var urlPageIdEx = urlPageId[ 1 ].split('&');
                    var pageClass = 'page-item-'+urlPageIdEx[ 0 ];

                    var pageId = urlPageIdEx[ 0 ];
                    var sectionPageId = jQuery('section.'+pageClass).attr('id');

                }else{
                    var res = url.split("/");

                    var pageId =  res[ res.length - 1 ];
                    var sectionPageId = jQuery('section#'+pageId).attr('id');
					//alert(sectionPageId);

                }

                if( sectionPageId ){

                    activeMenuLink(elem);
                    nextPage(getAnimcursor(elem), '#'+sectionPageId);

                } else {

                    ajaxLoadPage(elem); 

                }
            
        }    
    

               

        function ajaxLoadPage(dane) {
            
                if ( isLoadPage ) { return false }
                isLoadPage = true;
                jQuery('.page-ajax-preloader').addClass('activ');
                jQuery('.content').removeClass('activ');
                page_ajaxId = 'page-ajax-prev';       
                myanimcursor = getAnimcursor(dane);            
                
                // activ menu
                activeMenuLink(dane);
            
                var $this = dane,
                $remote = $this.data('remote') || $this.attr('href');
            
                
                jQuery.ajax({
                    url: $remote,
                    async: true,
                    //cache: true,
                    //type: 'html',
                    data: "ajaxloader=yes&ajaxloadersidebar=no",
                    cache: true,
                    context: document.body,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-WPAC-REQUEST', '1');
                    },
                    success: function (html) {


                                //console.log('--- ajax success:');

                                // add style
                                ajaxLoadPageAddStyle(html);
                                ajaxLoadPageAddContent(html);

                                

                    },
                    error: function (jqXhr, textStatus, errorThrown) {

                                console.log('--- ajax error');

                                var $section = jQuery(jqXhr.responseText).find('section.activ');
                                var section_content = $section.children('div.content');

                                if(! document.querySelector('#'+page_ajaxId) ) {
                                    $main.append('<section id="'+page_ajaxId+'"></section>');  
                                }



                                // add style
                                //ajaxLoadPageAddStyle(html);

                                var myTim = setTimeout(function () {

                                    jQuery('#'+page_ajaxId).html( section_content );
                                    jQuery('.page-ajax-preloader').removeClass('activ');
                                    jQuery('#'+page_ajaxId+' .links-ajax-loader a').attr("class", "ajax-loader");


                                    nextPage(myanimcursor, '#'+page_ajaxId);

isLoadPage = false;
                                    clearTimeout(myTim);

                                }, 0); 



                    }
                });
                             
                
        }
        
        
        function deleteStyleCss() {
            
            var myTim = setTimeout(function () {
                           
               // jQuery("style[data-type*='del']").remove();
                clearTimeout(myTim);

            }, 1000);
            
        }
        
        function ajaxLoadPageAddContent(html) {
            
                var $section = jQuery(html).find('section.activ');
                var section_content = $section.children('div.content');

                if(! document.querySelector('#'+page_ajaxId) ) {
                    $main.append('<section id="'+page_ajaxId+'"></section>');  
                }


                var title = jQuery(html).filter('title').text();
                if(title) { 
                    document.title =  title;
                }

                // console.log( html );
                //console.log( jQuery(html).find('section.activ') );
                // console.log( section_content );

                var myTim = setTimeout(function () {

                    jQuery('#'+page_ajaxId).html( section_content );
                    jQuery('#'+page_ajaxId+' .links-ajax-loader a').attr("class", "ajax-loader");

                    ajaxLoadPageAddScript(html, nextPage(myanimcursor, '#'+page_ajaxId,deleteStyleCss()));


                    isLoadPage = false;

                    clearTimeout(myTim);

                }, 100); 
            
            
        }
             
        
        function ajaxLoadPageAddStyle(html) {
            
                var $html = jQuery(html);
                
                var head = document.querySelector('head');
                var body = document.querySelector('body');
                var nameUrl = /themes/;
                var nameUrl2 = /wp-includes/;
                
                // oznaczam style do skasowania
                // jQuery('head style').attr('data-type','style-del');

                $html.each(function () {
                    var $heads = jQuery(this);
                       
                    // STYLE
                    if ( $heads.attr('type') === 'text/css')  {

                        var src = $heads.attr('href');

                        if( src ) {

                            if ( !nameUrl.test(src) /* && !nameUrl2.test(src) */ ) {
                                
                                var styleHref = jQuery("link[href*='"+ src +"']");

                                if( styleHref['0'] ) {

                                    //jQuery(head).find($heads).attr('href',$heads.attr('href'));
                                   // console.log('STYLE styl istnieje omijam: '+ src);
                                } 
                                else {
                                    jQuery(head).append($heads);
                                   // console.log('STYLE dodaje: '+ src);
                                } 

                            } 
                            else {
                                // console.log('STYLE omijam: '+ src);
                            }

                        } 
                        else {
                            
                            
                            if($heads.attr('data-type') === 'vc_shortcodes-custom-css-onepages') {
                            
                               //console.log('STYLE omijam: '+ $heads.attr('data-type'));
                            
                            }else {
                                
                                var scriptkod = $heads['0'];
                                var scriptkod = scriptkod.innerHTML;

                                if( scriptkod ) {

                                    jQuery(document).find($heads).remove();
                                    //console.log('Dodaje style: '+ scriptkod);
                                    jQuery(head).append('<style type="text/css">'+scriptkod+'</style>');
                                    
                                   
                                    
                                    

                                } 
                                else {
                                    //console.log('Omijam style: '+ scriptkod);
                                    //console.log(scriptkod);
                                }
                            
                            
                            
                            }

                        }

                    }
                    // end: STYLE
 
                });
                        
        }
        
        
        function loadScript(url,$obj,callback) {

                var script = document.createElement( "script" );
                script.type = "text/javascript";

                if ( script.readyState ) {  //IE
                        script.onreadystatechange = function () {
                            if ( "loaded" === script.readyState ||
                                    "complete" === script.readyState ) {
                                    script.onreadystatechange = null;
                                    callback();
                            }
                        };
                } else {
                        //Others
                }

                script.src = url;
                $obj.get( 0 ).appendChild( script );
                
        }
        
        function loadScript2(html,$obj,callback) {

                var script = document.createElement( "script" );
                script.type = "text/javascript";

                if ( script.readyState ) {  //IE
                        script.onreadystatechange = function () {
                            if ( "loaded" === script.readyState ||
                                    "complete" === script.readyState ) {
                                    script.onreadystatechange = null;
                                    callback();
                            }
                        };
                } else {
                        //Others
                }

                script.innerHTML = html;
                $obj.get( 0 ).appendChild( script );
                
        }
        
        
        function ajaxLoadPageAddScript(html) {
            
                //var script = document.createElement( "di" );
            
                var $html = jQuery(html);
                
                var head = document.querySelector('head');
                var body = document.querySelector('body');
                
                // no update
                var nameUrl = /themes/;
               // var nameUrl2 = /wp-includes/;
               // var nameUrl2 = /plugins/;
                var nameCompress = /js_composer_front.min.js/;
                var nameVCgrid = /vc_grid.js/;
                var namejQuery = /jquery-migrate.min.js/;
                var namejQuery2 = /jquery.js/;
                var i = 1;
                
                var nameCompressSrc = '';
                var nameVCgridSrc = '';

                $html.each(function () {
                    var $heads = jQuery(this);
                       
                    // SCRIPTS
                    if( $heads.attr('type') === 'text/javascript' ) {
                        var src = $heads.attr('src');
                        if( src ) {
                            
                            if ( nameCompress.test(src) ) {
                                
                                nameCompressSrc = src;
                                var scriptSrc = jQuery("script[src*='"+ src +"']");
                                if( scriptSrc['0'] ) {
                                   scriptSrc.remove();                                  
                                }
                                  
                            }
                            else if ( nameVCgrid.test(src) ) {
                                
                                nameVCgridSrc =  src;
                                var scriptSrc = jQuery("script[src*='"+ src +"']");
                                if( scriptSrc['0'] ) {
                                   scriptSrc.remove();
                                }  
                                
                            }
                            else if ( !nameUrl.test(src) && !namejQuery.test(src) && !namejQuery2.test(src) ) {

                                var scriptSrc = jQuery("script[src*='"+ src +"']");
                                if( scriptSrc['0'] ) {                                    
                             
                                   scriptSrc.remove();
                                   loadScript(src, jQuery(body));
                                   //console.log('Update js src: '+ src);
                                  

                                } 
                                else {

                                    jQuery(body).find($heads['0']).remove();
                                    loadScript(src, jQuery(body));
                                    //console.log('Dodaje js src: '+ src);  
                                 
                                }

                            }

                        } 
                        else {

                            var scriptkod = $heads['0'];
                            var scriptkod = scriptkod.innerHTML;
                            if( scriptkod ) {

                                var $scriptkod = jQuery("script");

                                $scriptkod.each(function () {

                                    var scriptkods = jQuery(this);
                                    var scriptkodsHtml = scriptkods['0'].innerHTML;

                                    if ( scriptkodsHtml ) {

                                        if( scriptkod === scriptkodsHtml ) {

                                            scriptkods.remove();

                                        }

                                    }

                                });


                                // dodaje js kod 
                                //var scrname = '<script type="text/javascript">'+ scriptkod +'</script>';
                                //console.log('Dodaje pozycje (js kod): '+ scriptkod);
                                var scrname = document.createElement( "script" );
                                scrname.type = "text/javascript";
                                scrname.innerHTML = scriptkod;
                                
                                setTimeout(function () {
                        
                          loadScript2(scriptkod, jQuery(body));

                    }, 1000); 
                                
                              
                                //jQuery(body).append( scrname );

                            } 
                            else {
                                //console.log('Omijam pozycje (js kod): '+ $heads['0']);
                                //console.log($heads['0']);
                            }

                        }
                    }
                    // end: SCRIPTS
                    
                });
                        

                
                if((nameCompressSrc !== '') || (nameVCgridSrc !== '')) {
                    
                    //var myTim2 = setTimeout(function () {
                        
                        if(nameVCgridSrc !== '') {   
                           //jQuery("body").append( scrname3 );
                           //console.log('compress js src: '+ jQuery(scrname3).attr('src'));
                        } else {
                           //console.log('Nie dodaje VC_GRID js src');
                        } 
  
                        if(nameCompressSrc !== '') {
                           loadScript(nameCompressSrc, jQuery(body));
                          // console.log('compress js src: '+ nameCompressSrc);
                        }
                        else {
                          // console.log('Nie dodaje compress js src');
                        }   
                             
                        //clearTimeout(myTim2);

                   // }, 100); 
                    
                }else {
                    //console.log('Nie dodaje compress and VC grid js src');
                }
                
                //console.log('------------ KONIEC -------------');
                 
        }
         
    
        
        function createSectionPageAjaxPrev() {
            
                if (pageActiv.attr('id') === 'page-ajax-prev') {
                    jQuery('#page-content').remove();
                    jQuery('#page-ajax-prev').attr("id", "page-content");
                } 
        }
        
        
        function startLazy() {

                jQuery("section.section-current img.lazy").lazy(
                {
                    bind: "event",
                    effect: "fadeIn",
                    effectTime: 1000,
                    afterLoad: function (element) {

                        var myTimer = setTimeout(function () {
                            
                           jQuery(".box-header").css("height", element.height());
                           clearTimeout(myTimer);

                        }, 500);
                        
                    }
                });                
                
        }
         
        
        function updateAnimcursor(animid) {
                animcursor = animid;
                ++animcursor;
        }
        
        
        function updateNextAnimcursor(animid) {          
                nextAnimcursor = false;
                if(animid) {
                    nextAnimcursor = true;
                }
                return nextAnimcursor;  
        }
       
    
        function getAnimcursor(dane) {
            
                var anim = dane.attr('data-pageanim');
                if ( anim ) {
                    return validateAnimcursor(anim);                  
                } else {
                    return getNextAnimcursor();
                } 
        }
     
    
        function getNextAnimcursor() {
                if (nextAnimcursor) {
                    ++animcursor;
                    animcursor = validateAnimcursor(animcursor); 
                }
                return animcursor;  
        }
        
                
        function validateAnimcursor(animcursor) {
                if (animcursor > 67) {
                        animcursor = 1;
                 }
                return animcursor;  
        }
        
        
        function activeMenuLink(item) {

            
                if ( !item ) {
                    return false;
                }
            
                var menuItem = jQuery(item);
                menuItem = menuItem['0'];
                menuItem = jQuery(menuItem.parentNode);
                    
                if(menuItem) {
                    jQuery(menu+' li').removeClass('active');
                    menuItem.addClass('active');
                }

        }
        
        
        function getPageActivWP(page) {

               if(page) {
                   return page;
               } 
               else {
                   return jQuery("section.activ").attr('id');
               }
        }
        
           
        function getPageActiv(page) {

               if( location.hash !== "") {
                   return location.hash;
               } 
               else if(page) {
                   return page;
               } 
               else {
                   return '#'+jQuery("section.page-activ").attr('id');
               }
        }
       
    
        function validatePage(pageId) {
              
               if(document.querySelector(pageId)) {
                   
                  return true; 
               } else {
                  return false; 
               }     
        }


	function nextPage(animation,pageId) {
            
		var myTim = setTimeout(function () {
            
                    if( isAnimating ) {return false;}
                    isAnimating = true;

                    if( !validatePage(pageId) ) {
                        pageId = '#error404';
                    }
                    
                    
                    jQuery('.page-ajax-preloader').removeClass('activ');
    

                    var $currPage = jQuery(pageActiv);

                    var $nextPage = jQuery(pageId).addClass( 'section-current' ), outClass = '', inClass = '';

                    var animationClass = getClassAnimate(animation);
                    $currPage.addClass( animationClass.out ).on( animEndEventName, function() {
                            $currPage.off( animEndEventName );
                            endCurrPage = true;
                            if( endNextPage ) {
                                    onEndAnimation( $currPage, $nextPage );
                            }   
                    } );
                    $nextPage.addClass( animationClass.in ).on( animEndEventName, function() {
                            $nextPage.off( animEndEventName );
                            endNextPage = true;
                            if( endCurrPage ) {
                                    onEndAnimation( $currPage, $nextPage );
                            }     
                    } );

                    if( !support ) { onEndAnimation( $currPage, $nextPage ); }

                    clearTimeout(myTim);
                            
                }, 0); 

	}


	function onEndAnimation( $outpage, $inpage ) {
		endCurrPage = false;
		endNextPage = false;
		resetPage( $outpage, $inpage );
		isAnimating = false;
	}
        

	function resetPage( $outpage, $inpage ) {
            
		$outpage.attr( 'class', $outpage.data( 'originalClassList' ) + '' );
		$inpage.attr( 'class', $inpage.data( 'originalClassList' ) + ' section-current' );
                pageActiv = $inpage;
                createSectionPageAjaxPrev();
                startLazy("#"+$inpage.attr('id'));
                
                
                
                isAnimating = false;
	}
        
        
        function getClassAnimate(idAnimation) {
            
            switch( idAnimation ) {

			case 1:
				outClass = 'pt-page-moveToLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 2:
				outClass = 'pt-page-moveToRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 3:
				outClass = 'pt-page-moveToTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 4:
				outClass = 'pt-page-moveToBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 5:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 6:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 7:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 8:
				outClass = 'pt-page-fade';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 9:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 10:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 11:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 12:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 13:
				outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
				inClass = 'pt-page-moveFromRight';
				break;
			case 14:
				outClass = 'pt-page-moveToRightEasing pt-page-ontop';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 15:
				outClass = 'pt-page-moveToTopEasing pt-page-ontop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 16:
				outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
				inClass = 'pt-page-moveFromTop';
				break;
			case 17:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromRight pt-page-ontop';
				break;
			case 18:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromLeft pt-page-ontop';
				break;
			case 19:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromBottom pt-page-ontop';
				break;
			case 20:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-moveFromTop pt-page-ontop';
				break;
			case 21:
				outClass = 'pt-page-scaleDown';
				inClass = 'pt-page-scaleUpDown pt-page-delay300';
				break;
			case 22:
				outClass = 'pt-page-scaleDownUp';
				inClass = 'pt-page-scaleUp pt-page-delay300';
				break;
			case 23:
				outClass = 'pt-page-moveToLeft pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 24:
				outClass = 'pt-page-moveToRight pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 25:
				outClass = 'pt-page-moveToTop pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 26:
				outClass = 'pt-page-moveToBottom pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 27:
				outClass = 'pt-page-scaleDownCenter';
				inClass = 'pt-page-scaleUpCenter pt-page-delay400';
				break;
			case 28:
				outClass = 'pt-page-rotateRightSideFirst';
				inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
				break;
			case 29:
				outClass = 'pt-page-rotateLeftSideFirst';
				inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
				break;
			case 30:
				outClass = 'pt-page-rotateTopSideFirst';
				inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
				break;
			case 31:
				outClass = 'pt-page-rotateBottomSideFirst';
				inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
				break;
			case 32:
				outClass = 'pt-page-flipOutRight';
				inClass = 'pt-page-flipInLeft pt-page-delay500';
				break;
			case 33:
				outClass = 'pt-page-flipOutLeft';
				inClass = 'pt-page-flipInRight pt-page-delay500';
				break;
			case 34:
				outClass = 'pt-page-flipOutTop';
				inClass = 'pt-page-flipInBottom pt-page-delay500';
				break;
			case 35:
				outClass = 'pt-page-flipOutBottom';
				inClass = 'pt-page-flipInTop pt-page-delay500';
				break;
			case 36:
				outClass = 'pt-page-rotateFall pt-page-ontop';
				inClass = 'pt-page-scaleUp';
				break;
			case 37:
				outClass = 'pt-page-rotateOutNewspaper';
				inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
				break;
			case 38:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-moveFromRight';
				break;
			case 39:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-moveFromLeft';
				break;
			case 40:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-moveFromBottom';
				break;
			case 41:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-moveFromTop';
				break;
			case 42:
				outClass = 'pt-page-rotatePushLeft';
				inClass = 'pt-page-rotatePullRight pt-page-delay180';
				break;
			case 43:
				outClass = 'pt-page-rotatePushRight';
				inClass = 'pt-page-rotatePullLeft pt-page-delay180';
				break;
			case 44:
				outClass = 'pt-page-rotatePushTop';
				inClass = 'pt-page-rotatePullBottom pt-page-delay180';
				break;
			case 45:
				outClass = 'pt-page-rotatePushBottom';
				inClass = 'pt-page-rotatePullTop pt-page-delay180';
				break;
			case 46:
				outClass = 'pt-page-rotateFoldLeft';
				inClass = 'pt-page-moveFromRightFade';
				break;
			case 47:
				outClass = 'pt-page-rotateFoldRight';
				inClass = 'pt-page-moveFromLeftFade';
				break;
			case 48:
				outClass = 'pt-page-rotateFoldTop';
				inClass = 'pt-page-moveFromBottomFade';
				break;
			case 49:
				outClass = 'pt-page-rotateFoldBottom';
				inClass = 'pt-page-moveFromTopFade';
				break;
			case 50:
				outClass = 'pt-page-moveToRightFade';
				inClass = 'pt-page-rotateUnfoldLeft';
				break;
			case 51:
				outClass = 'pt-page-moveToLeftFade';
				inClass = 'pt-page-rotateUnfoldRight';
				break;
			case 52:
				outClass = 'pt-page-moveToBottomFade';
				inClass = 'pt-page-rotateUnfoldTop';
				break;
			case 53:
				outClass = 'pt-page-moveToTopFade';
				inClass = 'pt-page-rotateUnfoldBottom';
				break;
			case 54:
				outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomLeftIn';
				break;
			case 55:
				outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomRightIn';
				break;
			case 56:
				outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomTopIn';
				break;
			case 57:
				outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateRoomBottomIn';
				break;
			case 58:
				outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeLeftIn';
				break;
			case 59:
				outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeRightIn';
				break;
			case 60:
				outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeTopIn';
				break;
			case 61:
				outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCubeBottomIn';
				break;
			case 62:
				outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselLeftIn';
				break;
			case 63:
				outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselRightIn';
				break;
			case 64:
				outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselTopIn';
				break;
			case 65:
				outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
				inClass = 'pt-page-rotateCarouselBottomIn';
				break;
			case 66:
				outClass = 'pt-page-rotateSidesOut';
				inClass = 'pt-page-rotateSidesIn pt-page-delay200';
				break;
			case 67:
				outClass = 'pt-page-rotateSlideOut';
				inClass = 'pt-page-rotateSlideIn';
				break;

		}
                
                return anim = {
                    'out': outClass,
                    'in': inClass
                };
        
        } 
        

	return { init : init, updateAnimcursor: updateAnimcursor };

})();



/*
 * 
 *  VC COMPOSER FRONT v4.8
 */



/* Progress bar
 ---------------------------------------------------------- */
if ( 'function' !== typeof(window[ 'vc_progress_bar' ] ) ) {
	window.vc_progress_bar = function () {
		if ( 'undefined' !== typeof(jQuery.fn.waypoint) ) {

			jQuery( '.vc_progress_bar' ).waypoint( function () {
				jQuery( this ).find( '.vc_single_bar' ).each( function ( index ) {
					var $this = jQuery( this ),
						bar = $this.find( '.vc_bar' ),
						val = bar.data( 'percentage-value' );

					setTimeout( function () {
						bar.css( { "width": val + '%' } );
					}, index * 200 );
				} );
			}, { offset: '85%' } );
		}
	}
}

/* Waypoints magic - modify
 ---------------------------------------------------------- */
if ( 'function' !== typeof(window[ 'vc_waypoints' ] ) ) {
	window.vc_waypoints = function () {
		if ( 'undefined' !== typeof(jQuery.fn.waypoint ) ) {
			jQuery( '.wpb_animate_when_almost_visible:not(.wpb_start_animation)' ).waypoint( function () {
				jQuery( this ).addClass( 'wpb_start_animation' );
			}, { offset: '85%',context: '.content' } );
                        
		}
	}
}




window.vcParallaxSkroll = false;
if ( 'function' !== typeof(window[ 'vc_rowBehaviour' ]) ) {
	window.vc_rowBehaviour = function () {
		var $ = window.jQuery;

		function localFunction() {
			var $elements = $( '[data-vc-full-width="true"]' );
			$.each( $elements, function ( key, item ) {
				var $el = $( this );
				$el.addClass( 'vc_hidden' );

				var $el_full = $el.next( '.vc_row-full-width' );
				var el_margin_left = parseInt( $el.css( 'margin-left' ), 10 );
				var el_margin_right = parseInt( $el.css( 'margin-right' ), 10 );
				var offset = 0 - $el_full.offset().left - el_margin_left;
				var width = $( window ).width();
				$el.css( {
					'position': 'relative',
					'left': offset,
					'box-sizing': 'border-box',
                                        'padding-left': $('nav').width(),
					'width': $( window ).width()
				} );
				if ( ! $el.data( 'vcStretchContent' ) ) {
					var padding = (- 1 * offset);
					if ( 0 > padding ) {
						padding = 0;
					}
					var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
					if ( 0 > paddingRight ) {
						paddingRight = 0;
					}
					$el.css( { 'padding-left': padding + 'px', 'padding-right': paddingRight + 'px' } );
				}
				$el.attr( "data-vc-full-width-init", "true" );
				$el.removeClass( 'vc_hidden' );
			} );
		}

		/**
		 * @todo refactor as plugin.
		 * @returns {*}
		 */
		function parallaxRow() {
			var vcSkrollrOptions, vcParallaxSkroll,
				callSkrollInit = false;
			if ( vcParallaxSkroll ) {
				vcParallaxSkroll.destroy();
			}
			$( '.vc_parallax-inner' ).remove();
			$( '[data-5p-top-bottom]' ).removeAttr( 'data-5p-top-bottom data-30p-top-bottom' );
			$( '[data-vc-parallax]' ).each( function () {
				var skrollrSpeed,
					skrollrSize,
					skrollrStart,
					skrollrEnd,
					$parallaxElement,
					parallaxImage,
					youtubeId;
				callSkrollInit = true; // Enable skrollinit;
				if ( 'on' === $( this ).data( 'vcParallaxOFade' ) ) {
					$( this ).children().attr( 'data-5p-top-bottom', 'opacity:0;' ).attr( 'data-30p-top-bottom',
						'opacity:1;' );
				}

				skrollrSize = $( this ).data( 'vcParallax' ) * 100;
				$parallaxElement = $( '<div />' ).addClass( 'vc_parallax-inner' ).appendTo( $( this ) );
				$parallaxElement.height( skrollrSize + '%' );

				parallaxImage = $( this ).data( 'vcParallaxImage' );

				youtubeId = vcExtractYoutubeId( parallaxImage );

				if ( youtubeId ) {
					insertYoutubeVideoAsBackground( $parallaxElement, youtubeId );
				} else if ( 'undefined' !== typeof(parallaxImage) ) {
					$parallaxElement.css( 'background-image', 'url(' + parallaxImage + ')' );
				}

				skrollrSpeed = skrollrSize - 100;
				skrollrStart = - skrollrSpeed;
				skrollrEnd = 0;

				$parallaxElement.attr( 'data-bottom-top', 'top: ' + skrollrStart + '%;' ).attr( 'data-top-bottom',
					'top: ' + skrollrEnd + '%;' );
			} );

			if ( callSkrollInit && window.skrollr ) {
				vcSkrollrOptions = {
					forceHeight: false,
					smoothScrolling: false,
					mobileCheck: function () {
						return false;
					}
				};
				vcParallaxSkroll = skrollr.init( vcSkrollrOptions );
				return vcParallaxSkroll;
			}
			return false;
		}

		/**
		 * @todo refactor as plugin.
		 * @returns {*}
		 */
		function fullHeightRow() {
			$( '.vc_row-o-full-height:first' ).each( function () {
				var $window,
					windowHeight,
					offsetTop,
					fullHeight;
				$window = $( window );
				windowHeight = $window.height();
				offsetTop = $( this ).offset().top;
				if ( offsetTop < windowHeight ) {
					fullHeight = 100 - offsetTop / (windowHeight / 100);
					$( this ).css( 'min-height', fullHeight + 'vh' );
				}
			} );
		}

		function fixIeFlexbox() {
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");

			if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
				$( '.vc_row-o-full-height' ).each( function () {
					if ($( this ).css( 'display') === 'flex') {
						$( this ).wrap('<div class="vc_ie-flexbox-fixer"></div>')
					}
				} );
			}
		}

		$( window ).unbind( 'resize.vcRowBehaviour' ).bind( 'resize.vcRowBehaviour', localFunction );
		$( window ).bind( 'resize.vcRowBehaviour', fullHeightRow );
		localFunction();
		fullHeightRow();
		fixIeFlexbox();
		initVideoBackgrounds(); // must be called before parallax
		parallaxRow();
	}
}


if ( 'function' !== typeof(window[ 'vc_gridBehaviour' ]) ) {
	window.vc_gridBehaviour = function () {
		jQuery.fn.vcGrid && jQuery( '[data-vc-grid]' ).vcGrid();
	}
}
/* Helper
 ---------------------------------------------------------- */
if ( 'function' !== typeof(window[ 'getColumnsCount' ]) ) {
	window.getColumnsCount = function ( el ) {
		var find = false,
			i = 1;

		while ( false === find ) {
			if ( el.hasClass( 'columns_count_' + i ) ) {
				find = true;
				return i;
			}
			i ++;
		}
	}
}

var screen_size = getSizeName();
function getSizeName() {
	var screen_w = jQuery( window ).width();

	if ( 1170 < screen_w ) {
		return 'desktop_wide';
	}

	if ( 960 < screen_w && 1169 > screen_w ) {
		return 'desktop';
	}

	if ( 768 < screen_w && 959 > screen_w ) {
		return 'tablet';
	}

	if ( 300 < screen_w && 767 > screen_w ) {
		return 'mobile';
	}

	if ( 300 > screen_w ) {
		return 'mobile_portrait';
	}

	return '';
}

function loadScript( url, $obj, callback ) {

	var script = document.createElement( "script" );
	script.type = "text/javascript";

	if ( script.readyState ) {  //IE
		script.onreadystatechange = function () {
			if ( "loaded" === script.readyState ||
				"complete" === script.readyState ) {
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {
		//Others
	}

	script.src = url;
	$obj.get( 0 ).appendChild( script );
}

if ( 'function' !== typeof(window[ 'wpb_prepare_tab_content' ]) ) {
	/**
	 * Prepare html to correctly display inside tab container
	 *
	 * @param event - ui tab event 'show'
	 * @param ui - jquery ui tabs object
	 */
	window.wpb_prepare_tab_content = function ( event, ui ) {
		var panel = ui.panel || ui.newPanel,
			$pie_charts = panel.find( '.vc_pie_chart:not(.vc_ready)' ),
			$round_charts = panel.find( '.vc_round-chart' ),
			$line_charts = panel.find( '.vc_line-chart' ),
			$carousel = panel.find( '[data-ride="vc_carousel"]' ),
			$ui_panel, $google_maps;
		vc_carouselBehaviour();
		vc_plugin_flexslider( panel );
		if ( ui.newPanel.find( '.vc_masonry_media_grid, .vc_masonry_grid' ).length ) {
			ui.newPanel.find( '.vc_masonry_media_grid, .vc_masonry_grid' ).each( function () {
				var grid = jQuery( this ).data( 'vcGrid' );
				grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
			} );
		}
		if ( panel.find( '.vc_masonry_media_grid, .vc_masonry_grid' ).length ) {
			panel.find( '.vc_masonry_media_grid, .vc_masonry_grid' ).each( function () {
				var grid = jQuery( this ).data( 'vcGrid' );
				grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
			} );
		}
		$pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat();
		$round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart( { reload: false } );
		$line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart( { reload: false } );
		$carousel.length && jQuery.fn.carousel && $carousel.carousel( 'resizeAction' );
		$ui_panel = panel.find( '.isotope, .wpb_image_grid_ul' ); // why var name '$ui_panel'?
		$google_maps = panel.find( '.wpb_gmaps_widget' );
		if ( 0 < $ui_panel.length ) {
			$ui_panel.isotope( "layout" );
		}
		if ( $google_maps.length && ! $google_maps.is( '.map_ready' ) ) {
			var $frame = $google_maps.find( 'iframe' );
			$frame.attr( 'src', $frame.attr( 'src' ) );
			$google_maps.addClass( 'map_ready' );
		}
		if ( panel.parents( '.isotope' ).length ) {
			panel.parents( '.isotope' ).each( function () {
				jQuery( this ).isotope( "layout" );
			} );
		}
	}
}
function vc_ttaActivation() {
	jQuery( '[data-vc-accordion]' ).on( 'show.vc.accordion', function ( e ) {
		var $ = window.jQuery, ui = {};
		ui.newPanel = $( this ).data( 'vc.accordion' ).getTarget();
		window.wpb_prepare_tab_content( e, ui );
	} );
}

function vc_accordionActivate( event, ui ) {
	if ( ui.newPanel.length && ui.newHeader.length ) {
		var $pie_charts = ui.newPanel.find( '.vc_pie_chart:not(.vc_ready)' ),
			$round_charts = ui.newPanel.find( '.vc_round-chart' ),
			$line_charts = ui.newPanel.find( '.vc_line-chart' ),
			$carousel = ui.newPanel.find( '[data-ride="vc_carousel"]' );
		if ( 'undefined' !== typeof(jQuery.fn.isotope) ) {
			ui.newPanel.find( '.isotope, .wpb_image_grid_ul' ).isotope( "layout" );
		}
		if ( ui.newPanel.find( '.vc_masonry_media_grid, .vc_masonry_grid' ).length ) {
			ui.newPanel.find( '.vc_masonry_media_grid, .vc_masonry_grid' ).each( function () {
				var grid = jQuery( this ).data( 'vcGrid' );
				grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry();
			} );
		}
		vc_carouselBehaviour( ui.newPanel );
		vc_plugin_flexslider( ui.newPanel );
		$pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat();
		$round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart( { reload: false } );
		$line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart( { reload: false } );
		$carousel.length && jQuery.fn.carousel && $carousel.carousel( 'resizeAction' );
		if ( ui.newPanel.parents( '.isotope' ).length ) {
			ui.newPanel.parents( '.isotope' ).each( function () {
				jQuery( this ).isotope( "layout" );
			} );
		}
	}
}

/**
 * Reinitialize all video backgrounds
 */
function initVideoBackgrounds() {
	jQuery( '.vc_row' ).each( function () {
		var $row = jQuery( this ),
			youtubeUrl,
			youtubeId;

		if ( $row.data( 'vcVideoBg' ) ) {
			youtubeUrl = $row.data( 'vcVideoBg' );
			youtubeId = vcExtractYoutubeId( youtubeUrl );

			if ( youtubeId ) {
				$row.find( '.vc_video-bg' ).remove();
				insertYoutubeVideoAsBackground( $row, youtubeId );
			}

			jQuery( window ).on( 'grid:items:added', function ( event, $grid ) {
				if ( ! $row.has( $grid ).length ) {
					return;
				}

				vcResizeVideoBackground( $row );
			} );
		} else {
			$row.find( '.vc_video-bg' ).remove();
		}
	} );
}

/**
 * Insert youtube video into element.
 *
 * Video will be w/o controls, muted, autoplaying and looping.
 */
function insertYoutubeVideoAsBackground( $element, youtubeId, counter ) {
	if ( 'undefined' === typeof( YT.Player ) ) {
		// wait for youtube iframe api to load. try for 10sec, then abort
		counter = 'undefined' === typeof( counter ) ? 0 : counter;
		if ( 100 < counter ) {
			console.warn( 'Too many attempts to load YouTube api' );
			return;
		}

		setTimeout( function () {
			insertYoutubeVideoAsBackground( $element, youtubeId, counter ++ );
		}, 100 );

		return;
	}

	var $container = $element.prepend( '<div class="vc_video-bg"><div class="inner"></div></div>' ).find( '.inner' );

	new YT.Player( $container[ 0 ], {
		width: '100%',
		height: '100%',
		videoId: youtubeId,
		playerVars: {
			playlist: youtubeId,
			iv_load_policy: 3, // hide annotations
			enablejsapi: 1,
			disablekb: 1,
			autoplay: 1,
			controls: 0,
			showinfo: 0,
			rel: 0,
			loop: 1
		},
		events: {
			onReady: function ( event ) {
				event.target.mute().setLoop( true );
			}
		}
	} );

	vcResizeVideoBackground( $element );

	jQuery( window ).bind( 'resize', function () {
		vcResizeVideoBackground( $element );
	} );
}

/**
 * Resize background video iframe so that video content covers whole area
 */
function vcResizeVideoBackground( $element ) {
	var iframeW,
		iframeH,
		marginLeft,
		marginTop,
		containerW = $element.innerWidth(),
		containerH = $element.innerHeight(),
		ratio1 = 16,
		ratio2 = 9;

	if ( ( containerW / containerH ) < ( ratio1 / ratio2 ) ) {
		iframeW = containerH * (ratio1 / ratio2);
		iframeH = containerH;

		marginLeft = - Math.round( ( iframeW - containerW ) / 2 ) + 'px';
		marginTop = - Math.round( ( iframeH - containerH ) / 2 ) + 'px';

		iframeW += 'px';
		iframeH += 'px';
	} else {
		iframeW = containerW;
		iframeH = containerW * (ratio2 / ratio1);

		marginTop = - Math.round( ( iframeH - containerH ) / 2 ) + 'px';
		marginLeft = - Math.round( ( iframeW - containerW ) / 2 ) + 'px';

		iframeW += 'px';
		iframeH += 'px';
	}

	$element.find( '.vc_video-bg iframe' ).css( {
		maxWidth: '1000%',
		marginLeft: marginLeft,
		marginTop: marginTop,
		width: iframeW,
		height: iframeH
	} );
}

/**
 * Extract video ID from youtube url
 */
function vcExtractYoutubeId( url ) {
	if ( 'undefined' === typeof(url) ) {
		return false;
	}

	var id = url.match( /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/ );

	if ( null !== id ) {
		return id[ 1 ];
	}

	return false;
}