let currentSlide = 1, liveAnimation = false, currentProject = 1, amountProjects;
const amountSlides = 6, usSlide = 2, portfolioSlide = 5, animationSpeed = 500, projectSlideSpeed = 275, time = 100;

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
    /*navigational buttons*/
    $('#logo').click(() => {
        if (currentSlide !== 1) {
            if (currentSlide > 1 && currentSlide < 5) scrollToGivenSlide(prevSlide, 1);
            else scrollToGivenSlide(nextSlide, 1);
        }
    });
    $('#portfolioBtn').click(() => {
        if (currentSlide !== portfolioSlide) {
            if (currentSlide >=2 && currentSlide < 5) scrollToGivenSlide(nextSlide, portfolioSlide);
            else scrollToGivenSlide(prevSlide, portfolioSlide);
        }
    });
    $('#usBtn').click(() => {
        if (currentSlide !== usSlide) {
            if (currentSlide > 2 && currentSlide <= 5) scrollToGivenSlide(prevSlide, usSlide);
            else scrollToGivenSlide(nextSlide, usSlide);
        }
    });
    $('#contactsBtn').click(() => {
        if (!liveAnimation) {
            if ($('#slideMakeOrder').css('left') === '0px') hideSlide('slideMakeOrder');
            liveAnimation = true;
            $('#slideContacts').animate({
                left: 0
            }, {
                duration: animationSpeed,
                complete: () => liveAnimation = false
            })
        }
    });
    $('.makeOrder').click(() => {
        if (!liveAnimation) {
            liveAnimation = true;
            if ($('#slideContacts').css('left') === '0px') hideSlide('slideContacts');
            $('#slideMakeOrder').animate({
                left: 0
            }, {
                duration: animationSpeed,
                complete: () => liveAnimation = false
            })
        }
    });
    $('#leftArrow').click(prevSlide);
    $('#rightArrow').click(nextSlide);
    /*-------------------*/

    /*sound button*/
    const $soundBtn = $('.soundBtn');
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
    amountProjects = $('.project').length;

    /*submit order*/
    $('#submitOrder').click(() => {
        $('#thankYou').css('display','flex');
        return false;
    });
    /*------------*/
    /*close button*/
    $('#closeBtn').click(() => {
        $('#thankYou').css('display', 'none');
        hideSlide('slideMakeOrder');
    });
    /*------------*/
    /*$.getJSON('Scripts/language.json',(data) => {});*/
    window.onresize = resizeListener;
    resizeListener();

    /*mobile version features*/
    $('#menuButton').click(() => {
        $('#slides').fadeOut();
        $('#backgroundVideo, #mobileTopHeader').css('display','none');
        $('#mobileMenu').css('display', 'flex');
    });
    $('#menuCloseBtn').click(() => {
        $('#mobileMenu').css('display', 'none');
        $('#backgroundVideo, #mobileTopHeader').css('display', 'flex');
        $('#slides').fadeIn();
    });
    $('#makeOrderMobile').click(() => {
        $('.slide, #backgroundVideo, #mobileTopHeader').fadeOut();
        $('#slideMakeOrder').css('display', 'flex').fadeIn();
    });
    /*-----------------------*/
    setTimeout(() => {
        $('#loading').fadeOut();
    }, 50);
};


function scrollListener(evt) {
    if (evt.deltaY > 1) {
        if (currentSlide === 5) {
            if (currentProject === amountProjects) nextSlide();
            else nextProject();
        }
        else nextSlide();

    }
    else if (evt.deltaY < -1) {
        if (currentSlide === 5) {
            if (currentProject === 1) prevSlide();
            else prevProject();
        }
        else prevSlide();
    }
}

function resizeListener() {
    if (window.innerWidth > 1024) window.onmousewheel = scrollListener;
    else window.onmousewheel = null;
}


function scrollToGivenSlide(callback, slide) {
    callback();
    setTimeout(() => {
        if (currentSlide !== slide) scrollToGivenSlide(callback, slide);
    }, 1);
}

function nextProject() {
    if(!liveAnimation) {
        ++currentProject;
        liveAnimation = true;
        $('.project').animate({
            left: '-=32.5vw'
        }, {
            duration: projectSlideSpeed,
            complete: () => liveAnimation = false
        });
    }
}

function prevProject() {
    if(!liveAnimation) {
        --currentProject;
        liveAnimation = true;
        $('.project').animate({
            left: '+=32.5vw'
        }, {
            duration: projectSlideSpeed,
            complete: () => liveAnimation = false
        });
    }
}

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
function hideSlide(slideToHide) {
    $('#' + slideToHide).animate({
        left: '100%'
    }, {
        duration: animationSpeed,
        complete: () => liveAnimation = false
    });
}

function nextSlide() {
    if (!liveAnimation) {
        liveAnimation = true;
        if ($('#slideContacts').css('left') === '0px') hideSlide('slideContacts');
        else if ($('#slideMakeOrder').css('left') === '0px') hideSlide('slideMakeOrder');
        else {
            if (currentSlide !== amountSlides) {
                ++currentSlide;
                $('#slide' + currentSlide).animate({
                    left: 0
                }, {
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
        if ($('#slideContacts').css('left') === '0px') hideSlide('slideContacts');
        else if ($('#slideMakeOrder').css('left') === '0px') hideSlide('slideMakeOrder');
        else {
            if (currentSlide !== 1) {
                $('#slide' + currentSlide).animate({
                    left: '100%'
                }, {
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
}
