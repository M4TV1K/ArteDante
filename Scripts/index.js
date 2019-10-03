let currentSlide = 1, liveAnimation = false;
const amountSlides = 6, animationSpeed = 500, time = 100;

window.onload = () => {
    //todo remove comments and add 'hidden' attr where it's needed
    /*add light-up to order btn and action*/
    $('#makeOrderTop').mouseover(() => {
        $('#lightUpTop').css('color', 'black');
        $('#topArrow').css('opacity', '1');
    }).mouseout(() => {
        $('#lightUpTop').css('color', 'white');
        $('#topArrow').css('opacity', '0.75');
    });
    $('#makeOrderSlide').mouseover(() => {
        $('#lightUpSlide').css('color', 'black');
        $('#bottomArrow').css('opacity', '1');
    }).mouseout(() => {
        $('#lightUpSlide').css('color', 'white');
        $('#bottomArrow').css('opacity', '0.75');
    });
    /*-------------------------*/
    /*navigational arrows*/
    $('#leftArrow').click(prevSlide);
    $('#rightArrow').click(nextSlide);
    /*-------------------*/

    /*sound button*/
    const $soundBtn = $('#soundBtn');
    $soundBtn.click(() => {
        if ($soundBtn.css('background-image').toString().includes('mute.svg')){
            $soundBtn.css('background-image', 'url(../ArteDante/Assets/nav-menu/sound.svg)');
            $('#backgroundAudio')[0].play();
        }
        else {
            $soundBtn.css('background-image', 'url(../ArteDante/Assets/nav-menu/mute.svg)');
            $('#backgroundAudio')[0].pause();
        }
    });
    /*------------*/
    /*social media buttons*/
    $('#instagram').click(() => {
        window.open("https://www.instagram.com/rtdnt/", '_blank');
    });
    /*--------------------*/

    /*setTimeout(() => {
        $('#loading').fadeOut();
        $('#nav-menu').fadeIn();
        $('#backgroundVideo').fadeIn();
        $('#slides').fadeIn();
    }, 500);*/
};

//todo assign this function to onmousewheel after loading
/*window.onmousewheel = (evt) => {
    console.log(liveAnimation + " " + currentSlide + "/" + amountSlides);
    console.log(evt.deltaX + ', ' + evt.deltaY);
    if (evt.deltaY > 1) nextSlide();
    else if (evt.deltaY < -1) prevSlide();
};*/

function toTheFirstSlide(slide) {
    setTimeout(() => {
        $('#slide' + slide).animate({
            left: '100%',
        }, animationSpeed);
        if (slide > 2) toTheFirstSlide(slide - 1);
        else {
            $('#currentSlide').text('01');
            liveAnimation = false;
        }
    }, time);
}

function nextSlide() {
    if (!liveAnimation) {
        liveAnimation = true;
        if (currentSlide !== amountSlides) {
            ++currentSlide;
            $('#slide' + currentSlide).animate({
                left: 0
            },{
                duration: animationSpeed,
                complete: () => {
                    $('#currentSlide').text('0' + currentSlide);
                    liveAnimation = false;
                }
            });
        }
        else {
            currentSlide = 1;
            $('#slide' + amountSlides).animate({
                left: '100%'
            }, animationSpeed);
            toTheFirstSlide(amountSlides - 1);
        }
    }
}

function toTheLastSlide(slide = 3) {
    console.log('Scrolling slide: ' + 3);
    setTimeout(() => {
        $('#slide' + slide).animate({
            left: 0
        }, animationSpeed);
        if (slide < amountSlides) toTheLastSlide(slide + 1);
        else {
            $('#currentSlide').text('06');
            liveAnimation = false;
        }
    }, time);
}

function prevSlide() {
    if(!liveAnimation) {
        liveAnimation = true;
        if (currentSlide !== 1) {
            $('#slide' + currentSlide).animate({
                left: '100%'
            },{
                duration: animationSpeed,
                complete: () => {
                    $('#currentSlide').text('0' + currentSlide);
                    liveAnimation = false
                }
            });
            --currentSlide;
        }
        else {
            currentSlide = amountSlides;
            $('#slide2').animate({
                left: 0
            }, animationSpeed);
            toTheLastSlide();
        }
    }
}
