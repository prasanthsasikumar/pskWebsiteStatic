/**
 * jquery.hoverdir.js v1.1.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Codrops
 * http://www.codrops.com
 */
!function(t,e){"use strict";t.HoverDir=function(e,i){this.$el=t(i),this._init(e)},t.HoverDir.defaults={speed:300,easing:"ease",hoverDelay:0,inverse:!1},t.HoverDir.prototype={_init:function(e){this.options=t.extend(!0,{},t.HoverDir.defaults,e),this.transitionProp="all "+this.options.speed+"ms "+this.options.easing,this.support=Modernizr.csstransitions,this._loadEvents()},_loadEvents:function(){var e=this;this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir",function(i){var o=t(this),n=o.find("div"),s=e._getDir(o,{x:i.pageX,y:i.pageY}),r=e._getStyle(s);"mouseenter"===i.type?(n.hide().css(r.from),clearTimeout(e.tmhover),e.tmhover=setTimeout(function(){n.show(0,function(){var i=t(this);e.support&&i.css("transition",e.transitionProp),e._applyAnimation(i,r.to,e.options.speed)})},e.options.hoverDelay)):(e.support&&n.css("transition",e.transitionProp),clearTimeout(e.tmhover),e._applyAnimation(n,r.from,e.options.speed))})},_getDir:function(t,e){var i=t.width(),o=t.height(),n=(e.x-t.offset().left-i/2)*(i>o?o/i:1),s=(e.y-t.offset().top-o/2)*(o>i?i/o:1),r=Math.round((Math.atan2(s,n)*(180/Math.PI)+180)/90+3)%4;return r},_getStyle:function(t){var e,i,o={left:"0px",top:"-100%"},n={left:"0px",top:"100%"},s={left:"-100%",top:"0px"},r={left:"100%",top:"0px"},a={top:"0px"},p={left:"0px"};switch(t){case 0:e=this.options.inverse?n:o,i=a;break;case 1:e=this.options.inverse?s:r,i=p;break;case 2:e=this.options.inverse?o:n,i=a;break;case 3:e=this.options.inverse?r:s,i=p}return{from:e,to:i}},_applyAnimation:function(e,i,o){t.fn.applyStyle=this.support?t.fn.css:t.fn.animate,e.stop().applyStyle(i,t.extend(!0,[],{duration:o+"ms"}))}};var i=function(t){e.console&&e.console.error(t)};t.fn.hoverdir=function(e){var o=t.data(this,"hoverdir");if("string"==typeof e){var n=Array.prototype.slice.call(arguments,1);this.each(function(){return o?t.isFunction(o[e])&&"_"!==e.charAt(0)?void o[e].apply(o,n):void i("no such method '"+e+"' for hoverdir instance"):void i("cannot call methods on hoverdir prior to initialization; attempted to call method '"+e+"'")})}else this.each(function(){o?o._init():o=t.data(this,"hoverdir",new t.HoverDir(e,this))});return o}}(jQuery,window);

 
 
 jQuery(document).ready(function () {

    shuffle_init();
    portfolio_hoverdir(); 
  
});

/* 
 * ----------------------------------------------------------
 *   Portfolio load more
 * ----------------------------------------------------------
 */
var $portfolioLoad = jQuery( '.portfolio-load' );
$portfolioLoad.on("click", "a", function () { 

    var elem = jQuery(this),
    $remote = elem.data('remote') || elem.attr('href');

    elem.addClass('btn-load-to-disabled');
    elem.html( '<i class="fa fa-refresh fa-spin"></i> '+elem.attr('data-textloading') );
    
    jQuery.ajax({
        url: $remote,
        data: "ajaxloader=yes&ajaxloadersidebar=yes",
        cache: true,
        context: document.body,
    })
    .done(function (html) {

            var dane = jQuery(html);
            var $items = dane.find('.portfolio-colum figure');
            var load_button = dane.find('.portfolio-load');
            
            $items.imagesLoaded().always( function( instance ) {
                
                jQuery("#portfolio-"+ elem.attr('data-portfolioid') +" .portfolio-colum").append($items).shuffle('appended', $items);
                
                setTimeout(function() {

                   portfolio_hoverdir();
                
                   jQuery("#portfolio-"+ elem.attr('data-portfolioid') +" .portfolio-load").html(load_button['0'].innerHTML);
                
                }, 500);

            });
           

      })
    .fail(function () {

             console.log('Error: Portfolio load more');
             jQuery("#portfolio-"+ elem.attr('data-portfolioid') +" .portfolio-load").html('');

    });

    return false;

});

/* 
 * ----------------------------------------------------------
 *   FUBCTIONS - PORTFOLIO SHUFFLE (requires: jquery.shuffle.min.js )
 * ----------------------------------------------------------
 */
function shuffle_init() {
    
    jQuery('.portfolio').each(function () {
        
        
        var elem = '#'+jQuery(this).attr('id');
 
        var $portfolio_grid = jQuery(elem+' .portfolio-colum'),
        $portfolio_nav = jQuery(elem+' .portfolio-filter-nav');
        
    if ($portfolio_grid) {

        $portfolio_grid.shuffle({
                speed: 500,
                itemSelector: 'figure'
        });
              

    // Get all images inside shuffle
    $portfolio_grid.find('img').each(function() {
        
        var proxyImage;

        // Image already loaded
        if ( this.complete && this.naturalWidth !== undefined ) {
           return;
        }

        // If none of the checks above matched, simulate loading on detached element.
        proxyImage = new Image();
        jQuery( proxyImage ).on('load', function() {
        jQuery(this).off('load');
         $portfolio_grid.shuffle('update');
        });

        proxyImage.src = this.src;
    });

    // Because this method doesn't seem to be perfect.
    setTimeout(function() {
       $portfolio_grid.shuffle('update');
    }, 500);
        
    
    // Navigation Filter
    $portfolio_nav.on("click", ".filter", function (e) {
        e.preventDefault();

        jQuery(elem+' .portfolio-filter-nav .filter').removeClass('active');
        jQuery(this).addClass('active');
        $portfolio_grid.shuffle('shuffle', jQuery(this).attr('data-group') );
     });
        

    }
    
    });
    
 
      
    
}


function portfolio_hoverdir() {
    
    jQuery('.portfolio-hover > figure').each(function () {
        jQuery(this).hoverdir({hoverDelay: 75});
    });
    
}
