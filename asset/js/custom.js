
$(function () {
    var letterLayout = $('[data-layout]');
    var file = 'layout/' + letterLayout.data('layout') + '.html';
    letterLayout.load(file);

    console.log(letterLayout.data('content-file'));

    /*jQuery.get('layout/head.html', function (data) {
        $("head").append(data);
    });*/

    setTimeout(function () {
        var includes = $('[data-include]')
        $.each(includes, function () {
            var file = 'layout/' + $(this).data('include') + '.html';
            $(this).load(file);
        })

        var letterContentFile = 'data/letters/' + letterLayout.data('content-file') + '.html';
        $('[letter-include-file]').load(letterContentFile);

        $('[letter-title]').html(letterLayout.data('title'));

        setTimeout(function () {
            $('[letter-breadcrumb]').html(letterLayout.data('breadcrumb'));
        }, 500);

    }, 500);

})

/*
$(function () {
    var includes = $('[data-include]')
    $.each(includes, function () {
        var file = 'layout/' + $(this).data('include') + '.html'
        $(this).load(file, { name: 'bill' },)
    })
})*/

function Fnslideup() {
    jQuery("html, body").animate({ scrollTop: 0 }, 800);
}

function download_pdf_and_show() {
    var content = jQuery(".content").html();
    content_clone = jQuery(".content").clone();

    /*Replace all input text with div with their values*/
    jQuery("#letters_input").clone().appendTo("#letter_text_print_div");
    jQuery("#letter_text_print_div input").replaceWith(function () {
        return jQuery("<div>" + jQuery(this).val().trim() + "</div>");
    });

    var lightcontent = jQuery("#letter_text_print_div").html();
    var title = jQuery("#letters_title").html();
    lightcontent = lightcontent.replace(/(?:\r\n|\r|\n)/g, "<br />");
    jQuery("#letter_content_value").val(lightcontent);
    jQuery("#title_letters").val(title);
    jQuery("#letter_text_print_div").html(""); // make it empty
    jQuery("form#download_letters").submit()
}

function print_and_show() {
    var content = jQuery(".content").html();
    content_clone = jQuery(".content").clone();

    /*Replace all input text with div with their values*/
    jQuery("#letters_input").clone().appendTo("#letter_text_print_div");
    jQuery("#letter_text_print_div input").replaceWith(function () {
        return jQuery("<span >" + jQuery(this).val().trim() + "</span>");
    });

    var lightcontent = jQuery("#letter_text_print_div").html();
    var title = jQuery("#letters_title").text();
    jQuery("#letter_content_value").val(lightcontent);
    jQuery("#title_letters").val(title);
    jQuery("#letter_text_print_div").html(""); // make it empty
    var oldPage = document.body.innerHTML;
    //Reset the pages HTML with divs HTML only
    document.body.innerHTML = "<html><head><title></title></br></br><p align=center>" +
        title +
        "</p></head><body>" +
        lightcontent +
        "</body></html>";
    //Print Page
    window.print();
    //Restore orignal HTML
    document.body.innerHTML = oldPage;
}