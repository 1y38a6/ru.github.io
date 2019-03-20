var sliders;
var slideOnSliders = [];
var slideDir = [];

$(function(){
    sliders = document.getElementsByClassName("yslider");

    let l = sliders.length

    slideOnSliders = new Array(l);

    for(let a = 0; a<slideOnSliders.length; a++){
        slideOnSliders[a] = 1;
    }

    slideDir = new Array(l);

    for(let a = 0; a<slideDir.length; a++){
        slideDir[a] = 1;
    }

    for(let a = 0; a<sliders.length; a++){
        sliders[a].id = a;

        let slides = $("#" + a).find(".yslide");

        let arrows = $("#" + a).find(".slider-arrow");

        for(let b = 0; b<arrows.length; b++){
            let elem = "<p onclick='NextSlide(" + a + ")' class='arrowlink'></p>";

            let fragmentFromString = function (strHTML) {
                return document.createRange().createContextualFragment(strHTML);
              }
            let fragment = fragmentFromString(elem);

            arrows[b].parentElement.append(fragment);
        }

        for(let b = 0; b<slides.length; b++){
            slides[b].id = b +'s';
        }
    }
});

function NextSlide(slider){

    let slides = $("#" + slider).find(".yslide");

    let num = slideOnSliders[slider];

    for(let b = 0; b<slides.length; b++){
        if(b<num){
            slides[b].classList.remove("next-slide");
            slides[b].classList.add("prev-slide");
            slides[b].classList.remove("right-slide");
        }else if(b==num){
            slides[b].classList.remove("next-slide");
            slides[b].classList.remove("prev-slide");
            slides[b].classList.remove("right-slide");
        }else if(b==num+1){
            slides[b].classList.remove("right-slide");
            slides[b].classList.remove("prev-slide");
            slides[b].classList.add("next-slide");
        }else{
            slides[b].classList.add("right-slide");
            slides[b].classList.remove("prev-slide");
            slides[b].classList.remove("next-slide");
        }
    }

    let arrows = $("#" + slider).find(".slider-arrow");

    if(slideOnSliders[slider] >= slides.length-1){
        for(let b = 0; b<arrows.length; b++){
            arrows[b].classList.add('reverse');
        }
    }else if(slideOnSliders[slider] == 0){
        for(let b = 0; b<arrows.length; b++){
            arrows[b].classList.remove('reverse');
        }
    }

    if(slideDir[slider] >= 0){
        slideOnSliders[slider]++;
    }else{
        slideOnSliders[slider]--;
    }

    if(slideOnSliders[slider] >= slides.length-1){
        slideDir[slider]= -1;
    }else if(slideOnSliders[slider] == 0){
        slideDir[slider]= 1;
    }
}

var item = document.getElementById('item');

item.style.left = 20 + "px";

var shiftX = 0, shiftY = 0;

var vwl = -(889-vw(100));


var lastX = 0, xDetla = 0, posx = 0;

var touched = false;

item.addEventListener('touchmove', function(e){
    moveAt(e);
});

item.addEventListener('touchstart', function(e){
    item.style.position = 'absolute';
    touched = true;
    item.style.zIndex = 1000;

    clearInterval(crPos);

    var coords = getCoords(item);
    shiftX = e.targetTouches[0].pageX - coords.left;

    console.log($("#item").offset().left);
    
    
});

var crPos;

item.addEventListener('touchend', function(e){
    posx = $("#item").offset().left;

    if(posx < 20){
        smoothStop();
    }else{
        crPos = setInterval(function(){
            pos = $("#item").offset().left;
            pos = Math.lerp(pos, 19, 0.05);
            item.style.left = pos + "px";

            if($("#item").offset().left < 20){
                clearInterval(crPos);
            }
        }, 10);
    }

    if(posx > vwl){
        smoothStop();
    }else{
        crPos = setInterval(function(){
            pos = $("#item").offset().left;
            pos = Math.lerp(pos, vwl-1, 0.05);
            item.style.left = pos + "px";

            if($("#item").offset().left > vwl){
                clearInterval(crPos);
            }
        }, 10);
    }

    touched = false;
});

var inte = setInterval(function(){
    if(touched){
        lastX = $("#item").offset().left;
    }
}, 10);

function moveAt(e) {
    item.style.left = e.targetTouches[0].pageX - shiftX - item.offsetWidth / 2 + 'px';
}

function smoothStop(){

    xDetla = $("#item").offset().left - lastX;

    var interval = setInterval(function(){
    
        xDetla = Math.lerp(xDetla, 0, 0.05);
        
        item.style.left = $("#item").offset().left + (xDetla/4) + 'px';

        if(xDetla < 0.1 && xDetla > -0.1){
            clearInterval(interval);
            xDetla = 0;
            posx = $("#item").offset().left;

        }
    }, 10);
}

Math.lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

function vw(v) {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (v * w) / 100;
}