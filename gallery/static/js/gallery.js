$(document).ready(function() {
    // when a thumbnail is clicked
    $('.gallery-image').click(function () {
        enlarge_image(this);
    });
    // when the picture comes up, the user has to click the grey area to go back to the gallery
    // if the overlay is clicked
    $(document).click(function (event) {
        if ($(event.target).html() == $('div#view-wrapper-outer').html() |
            $(event.target).html() == $('div#arrow-wrapper-left').html() |
            $(event.target).html() == $('div#arrow-wrapper-right').html()) {
            drop_picture();
        }
    });
    $('div#view-wrapper-inner').click(function () {
        if (event.target == this) {
            drop_picture();
        }
    });
    // this is when the right arrow is clicked when an image is enlarged
    $('img#arrow-right').click(function (){
        right_picture();
    });

    // this is when the left arrow is clicked when an image is enlarged
    // see above documentation
    $('img#arrow-left').click(function (){
        left_picture();
    });

    // escape key will remove the picture
    window.onkeyup = function(e) {
        // get the key
        var key = e.keyCode ? e.keyCode : e.which;
        // if its the escape key
        if (key == 27) {
            drop_picture();
        }
        // left arrow
        else if (key == 37){
            left_picture();
        }
        // right arrow
        else if (key == 39){
            right_picture();
        }
    }
});

function right_picture(){
        // get the enlarged image name
        var full = $('img#full-image');
        var img_name = full.attr('src').split("/")[3];
        // find the thumbnail that relates to that image
        var orig_img = $('div#gallery').children().children('img[src$="/static/images/' + img_name + '"]')
        // get the next image just after that thumbnail
        var next_img = orig_img.parent().next().children();
        // get its file name
        if (next_img.attr('src')) {
            var path = next_img.attr('src').split("/")[3];

            // update the enlarged image
            full.attr('src', '/static/images/' + path);

            // check the arrow ends
            check_ends(next_img);
        }
}

function left_picture(){
        var full = $('img#full-image');
        var img_name = full.attr('src').split("/")[3];
        var orig_img = $('div#gallery').children().children('img[src$="/static/images/' + img_name + '"]')
        // get image just before that thumbnail
        var prev_img = orig_img.parent().prev().children();
        if (prev_img.attr('src')) {
            var path = prev_img.attr('src').split("/")[3];

            full.attr('src', '/static/images/' + path);

            check_ends(prev_img);
        }
}


// this function will check to see if there are any more pictures before
// or after the image that is currently being viewed.
// if there are no images after, it turns the right arrow off
// if there are no images before, it turns the left arrow off
function check_ends(img){
    // check for pictures before
    if (img.parent().prev().children().length <= 0){
            $('img#arrow-left').addClass('arrow-hide');
    } else {
        $('img#arrow-left').removeClass('arrow-hide');
    }
    // check before pictures after
    if (img.parent().next().children().length <= 0){
        $('img#arrow-right').addClass('arrow-hide');
    } else {
        $('img#arrow-right').removeClass('arrow-hide');
    }
}

function enlarge_image(thumbnail){
    // if a gallery thumbnail was clicked
    if ($(thumbnail).hasClass('gallery-thumb')) {
        // set the fullscreen img src to the thumbnails src
        var path = $(thumbnail).attr('src').split("/")[3];
        $('img#full-image').attr('src', '/static/images/' + path);
        // turn on the overlay
        $('div#overlay').toggleClass('gallery-overlay-on gallery-overlay-off');
        $('div#view-wrapper-outer').toggleClass('view-wrapper-outer view-wrapper-outer-off');
        $('div#view-wrapper-inner').toggleClass('view-wrapper-inner');
        $('img#arrow-left').toggleClass('arrow-on arrow-off');
        $('img#arrow-right').toggleClass('arrow-on arrow-off');

        // check if at the end for the arrows
        var orig_img = $('div#gallery').children().children('img[src$="/static/images/' + path + '"]')
        check_ends(orig_img);
    }
}

function drop_picture() {
    var full = $('img#full-image');
    if (full.attr('src') != '') {
        full.attr('src', '');
        // turn the overlay off
        $('div#overlay').toggleClass('gallery-overlay-on gallery-overlay-off');
        $('div#view-wrapper-outer').toggleClass('view-wrapper-outer view-wrapper-outer-off');
        $('div#view-wrapper-inner').toggleClass('view-wrapper-inner');
        $('img#arrow-left').toggleClass('arrow-on arrow-off');
        $('img#arrow-right').toggleClass('arrow-on arrow-off');
    }
}