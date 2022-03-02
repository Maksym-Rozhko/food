const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current');

let slideIndex = 1;

showSlides(slideIndex);

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = slides.length;
}

function showSlides(n) {
    if (n > slides.length) {
        slideIndex = 1;
    };

    if (n < 1) {
        slideIndex = slides.length;
    };

    slides.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('fade')
    });

    slides[slideIndex - 1].classList.add('fade');
    slides[slideIndex - 1].classList.remove('hide');

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
};

function changeSlide(n) {
    showSlides(slideIndex += n);
};

next.addEventListener('click', () => {
    changeSlide(1);
});

prev.addEventListener('click', () => {
    changeSlide(-1);
});