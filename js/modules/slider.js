function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
    const slider = document.querySelector(slide),
        slides = document.querySelectorAll(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-dots');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        indicators.append(dot);
        dots.push(dot);

        if (i === 0) {
            dot.classList.add('dot-active');
        }
    };

    function currentSlide() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
    };

    function currentDots() {
        dots.forEach(dot => {
            dot.classList.remove('dot-active');
            dots[slideIndex - 1].classList.add('dot-active');
        });
    };

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

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
        currentDots();
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
        currentDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            const target = e.target;
            const slideTo = target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            currentSlide();
            currentDots();
        });
    });
};

export default slider;