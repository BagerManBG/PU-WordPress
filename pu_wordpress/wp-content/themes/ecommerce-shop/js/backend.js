/*** Image Repeater ***/
jQuery(function($){
    var ecommerce_document = $(document);
    ecommerce_document.on('click','.media-image-upload', function(e){

        // Prevents the default action from occuring.
        e.preventDefault();
        var media_title = $(this).data('title');
        var media_button = $(this).data('button');
        var media_input_val = $(this).prev();
        var media_image_url_value = $(this).prev().prev().children('img');
        var media_image_url = $(this).siblings('.img-preview-wrap');

        meta_image_frame = wp.media.frames.meta_image_frame = wp.media({
            title: media_title,
            button: { text:  media_button },
            library: { type: 'image' }
        });
        // Opens the media library frame.
        meta_image_frame.open();
        // Runs when an image is selected.
        meta_image_frame.on('select', function(){

            // Grabs the attachment selection and creates a JSON representation of the model.
            var media_attachment = meta_image_frame.state().get('selection').first().toJSON();

            // Sends the attachment URL to our custom image input field.
            media_input_val.val(media_attachment.url);
            if( media_image_url_value != null ){
                media_image_url_value.attr( 'src', media_attachment.url );
                media_image_url.show();
            }
            media_input_val.trigger('change');
        });
    });
    // Runs when the image button is clicked.
    ecommerce_document.on('click','.media-image-remove', function(e){
        $(this).siblings('.img-preview-wrap').hide();
        $(this).prev().prev().val('');
    });

});


/*Repeater*/
(function ( $, window, document, undefined ) {
    'use strict';
    var ecommerce_document = $(document);
    /**repeater**/
    /*sortable*/
    var ATREFRESHVALUE = function (wrapObject) {
        wrapObject.find('[name]').each(function(){
            $(this).trigger('change');
        });
    };
    var ATSORTABLE = function () {
        var repeaters = $('.ecommerce-repeater');
        repeaters.sortable({
            orientation: "vertical",
            items: '> .repeater-table',
            placeholder: 'ecommerce-sortable-placeholder',
            update: function( event, ui ) {
                ATREFRESHVALUE(ui.item);
            }
        });
        repeaters.trigger("sortupdate");
        repeaters.sortable("refresh");
    };
    /*replace*/
    var ATREPLACE = function( str, replaceWhat, replaceTo ){
        var re = new RegExp(replaceWhat, 'g');
        return str.replace(re,replaceTo);
    };
    var ATREPEATER =  function (){
        ecommerce_document.on('click','.ecommerce-add-repeater',function (e) {
            e.preventDefault();
            var add_repeater = $(this),
                repeater_wrap = add_repeater.closest('.ecommerce-repeater'),
                code_for_repeater = repeater_wrap.find('.ecommerce-code-for-repeater'),
                total_repeater = repeater_wrap.find('.ecommerce-total-repeater'),
                total_repeater_value = parseInt( total_repeater.val() ),
                repeater_html = code_for_repeater.html();

            total_repeater.val( total_repeater_value +1 );
            var final_repeater_html = ATREPLACE( repeater_html, add_repeater.attr('id'),total_repeater_value );
            add_repeater.before($('<div class="repeater-table"></div>').append( final_repeater_html ));
            var new_html_object = add_repeater.prev('.repeater-table');
            var repeater_inside = new_html_object.find('.ecommerce-repeater-inside');
            repeater_inside.slideDown( 'fast',function () {
                new_html_object.addClass( 'open' );
                ATREFRESHVALUE(new_html_object);
            } );

        });
        ecommerce_document.on('click', '.ecommerce-repeater-top, .ecommerce-repeater-close', function (e) {
            e.preventDefault();
            var accordion_toggle = $(this),
                repeater_field = accordion_toggle.closest('.repeater-table'),
                repeater_inside = repeater_field.find('.ecommerce-repeater-inside');

            if ( repeater_inside.is( ':hidden' ) ) {
                repeater_inside.slideDown( 'fast',function () {
                    repeater_field.addClass( 'open' );
                } );
            }
            else {
                repeater_inside.slideUp( 'fast', function() {
                    repeater_field.removeClass( 'open' );
                });
            }
        });
        ecommerce_document.on('click', '.ecommerce-repeater-remove', function (e) {
            e.preventDefault();
            var repeater_remove = $(this),
                repeater_field = repeater_remove.closest('.repeater-table'),
                repeater_wrap = repeater_remove.closest('.ecommerce-repeater');

            repeater_field.remove();
            ATREFRESHVALUE(repeater_wrap);
        });

        ecommerce_document.on('change', '.ecommerce-select', function (e) {
            e.preventDefault();
            var select = $(this),
                repeater_inside = select.closest('.ecommerce-repeater-inside'),
                postid = repeater_inside.find('.ecommerce-postid'),
                repeater_control_actions = repeater_inside.find('.ecommerce-repeater-control-actions'),
                optionSelected = select.find("option:selected"),
                valueSelected = optionSelected.val();

            if( valueSelected == 0 ){
                postid.remove();
            }
            else{
                postid.remove();
                $.ajax({
                    type      : "GET",
                    data      : {
                        action: 'at_get_edit_post_link',
                        id: valueSelected
                    },
                    url       : ajaxurl,
                    beforeSend: function ( data, settings ) {
                        postid.remove();

                    },
                    success   : function (data) {
                        if( 0 != data ){
                            repeater_control_actions.append( data );
                        }
                    },
                    error     : function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR + " :: " + textStatus + " :: " + errorThrown);
                    }
                });
            }
        });
    };

    /*call all methods on ready*/
    ecommerce_document.ready( function() {
        ecommerce_document.on('widget-added widget-updated, panelsopen', function( event, widgetContainer ) {
            ATSORTABLE();
        });

        /*
         * Manually trigger widget-added events for media widgets on the admin
         * screen once they are expanded. The widget-added event is not triggered
         * for each pre-existing widget on the widgets admin screen like it is
         * on the customizer. Likewise, the customizer only triggers widget-added
         * when the widget is expanded to just-in-time construct the widget form
         * when it is actually going to be displayed. So the following implements
         * the same for the widgets admin screen, to invoke the widget-added
         * handler when a pre-existing media widget is expanded.
         */
        $( function initializeExistingWidgetContainers() {
            var widgetContainers;
            if ( 'widgets' !== window.pagenow ) {
                return;
            }
            widgetContainers = $( '.widgets-holder-wrap:not(#available-widgets)' ).find( 'div.widget' );
            widgetContainers.one( 'click.toggle-widget-expanded', function toggleWidgetExpanded() {
                ATSORTABLE();
            });
        });
        ATREPEATER();
    });
})( jQuery, window, document );