const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';

slidesField.style.display = 'flex';
slidesField.style.transition = '.5s all';
slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

function currentSlide() {
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
};

next.addEventListener('click', () => {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }
    
    if (slideIndex === slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
    currentSlide();
});

prev.addEventListener('click', () => {
    if (offset === 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }

    if (slideIndex === 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    currentSlide();
});

// showSlides(slideIndex);

// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`;
// } else {
//     total.textContent = slides.length;
// }

// function showSlides(n) {
//     if (n > slides.length) {
//         slideIndex = 1;
//     };

//     if (n < 1) {
//         slideIndex = slides.length;
//     };

//     slides.forEach(item => {
//         item.classList.add('hide');
//         item.classList.remove('fade')
//     });

//     slides[slideIndex - 1].classList.add('fade');
//     slides[slideIndex - 1].classList.remove('hide');

//     if (slides.length < 10) {
//         current.textContent = `0${slideIndex}`;
//     } else {
//         current.textContent = slideIndex;
//     }
// };

// function changeSlide(n) {
//     showSlides(slideIndex += n);
// };

// next.addEventListener('click', () => {
//     changeSlide(1);
// });

// prev.addEventListener('click', () => {
//     changeSlide(-1);
// });