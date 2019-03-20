$(function(){
    
});

function SlideUp(){
    $('html, body').animate({
        scrollTop: 0
    }, 2000);
}

function ToAbout(){
    $('html, body').animate({
        scrollTop: $(".about-book").offset().top
    }, 1000);
}

function ToSpoilers(){
    $('html, body').animate({
        scrollTop: $(".spoilers").offset().top
    }, 1000);
}

function ToAuthor(){
    $('html, body').animate({
        scrollTop: $(".about-me").offset().top
    }, 1000);
}

function ToBook(){
    $('html, body').animate({
        scrollTop: $("footer").offset().top
    }, 1000);
}