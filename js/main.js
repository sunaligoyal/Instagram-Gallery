/**
 * @namespace Svg
 * @memberof sunSpr
 * @property {null} property - description of property
 */
var Insta = {};
Insta.Gallery = (function(window, $, namespace) {
    'use strict';

    // public methods
    var init,

        // private methods
        _privateMethod,
        _submitUserForm,
        _getInstaImages,

        // properties
        property = null;

    /**
     * @method _privateMethod
     * @description Description of _privateMethod
     * @memberof sunSpr.Svg
     */


    _submitUserForm = function() {

        $("#image-loader-form").submit(function(e) {
            e.preventDefault();
            _getInstaImages($(".user-input").val());
        });

    };

    _getInstaImages = function(user) {

        var url = "https://igapi.ga/" + user + "/media?callback=";

        $.ajax({
            url: "https://query.yahooapis.com/v1/public/yql?" +
                "q=select%20*%20from%20html%20where%20url%3D%22" +
                encodeURIComponent(url) +
                "%22&format=xml'&callback=?",
            dataType: "jsonp",
            success: function(response) {



                if (response.results.length) {
                    $("#thumbs ul").html("");
                    var _data = JSON.parse(response.results[0].replace("<body>", "").replace("</body>", "")).items;
                    $.each(_data, function(i, v) {

                        $("#thumbs ul").append(`<li>
					<a class="thumb" href="${v.images.standard_resolution.url}" title="Title #0">
						<img src=${v.images.thumbnail.url} alt="Title #0" />
					</a>
				</li>`)

                    });


                    $('div.navigation').css({
                        'width': '300px',
                        'float': 'left'
                    });
                    $('div.content').css('display', 'block');

                    // // We only want these styles applied when javascript is enabled
                    $('div.navigation').css({
                        'width': '300px',
                        'float': 'left'
                    });
                    $('div.content').css('display', 'block');

                    // Initially set opacity on thumbs and add
                    //additional styling for hover effect on thumbs
                    var onMouseOutOpacity = 0.67;
                    $('#thumbs ul.thumbs li').opacityrollover({
                        mouseOutOpacity: onMouseOutOpacity,
                        mouseOverOpacity: 1.0,
                        fadeSpeed: 'fast',
                        exemptionSelector: '.selected'
                    });

                    //Initialize Advanced Galleriffic Gallery
                    var gallery = $('#thumbs').galleriffic({
                        delay: 2500,
                        numThumbs: 15,
                        preloadAhead: 10,
                        enableTopPager: true,
                        enableBottomPager: true,
                        maxPagesToShow: 7,
                        imageContainerSel: '#slideshow',
                        ssControlsContainerSel: '#controls',
                        navControlsContainerSel: '#nav',
                        captionContainerSel: '#caption',
                        loadingContainerSel: '#loading',
                        renderSSControls: true,
                        renderNavControls: true,
                        playLinkText: 'Play Slideshow',
                        pauseLinkText: 'Pause Slideshow',
                        prevLinkText: '&lsaquo; Previous Photo',
                        nextLinkText: 'Next Photo &rsaquo;',
                        nextPageLinkText: 'Next &rsaquo;',
                        prevPageLinkText: '&lsaquo; Prev',
                        enableHistory: false,
                        autoStart: false,
                        syncTransitions: true,
                        defaultTransitionDuration: 900,
                        onSlideChange: function(prevIndex, nextIndex) {
                            //'this' refers to the gallery, which is an extension of $('#thumbs')
                            this.find('ul.thumbs').children()
                                .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
                                .eq(nextIndex).fadeTo('fast', 1.0);
                        },
                        onPageTransitionOut: function(callback) {
                            this.fadeTo('fast', 0.0, callback);
                        },
                        onPageTransitionIn: function() {
                            this.fadeTo('fast', 1.0);
                        }
                    });


                } else {
                    alert("No data found");

                }


            }
        });


    };

    /**
     * @method init
     * @description Description of init
     * @memberof sunSpr.Svg
     * @example
     * sunSpr.Svg.init()
     */
    init = function() {

        _submitUserForm();
        _getInstaImages("davidbeckham");


    };

    // Public API
    return {
        init: init
    };

}(this, jQuery, 'insta'));

jQuery(Insta.Gallery.init());
