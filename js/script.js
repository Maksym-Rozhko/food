// tabs
const tabheaderItemsEl = document.querySelectorAll('.tabheader__item '); 
const tabsContentEl = document.querySelectorAll('.tabcontent');

const removeTabsItem = () => tabheaderItemsEl.forEach(item => item.classList.remove('tabheader__item_active'));

const hideTabContent = () => {
    tabsContentEl.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
};

const showTabContent = (i = 0) => {
    tabsContentEl[i].classList.add('show', 'fade');
    tabsContentEl[i].classList.remove('hide');
};

hideTabContent();
showTabContent();

tabheaderItemsEl.forEach((item, i) => {
    item.addEventListener('click', () => {
        hideTabContent();
        removeTabsItem();
        showTabContent(i);
        item.classList.add('tabheader__item_active');
    });
});

// timer

const deadline = '2022-05-11';

function getTimeRemaining(edntime) {
    const t = Date.parse(edntime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / 1000 / 60 ) % 60),
        seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        days,
        hours,
        minutes,
        seconds,
    };
};

function setTimerClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateTimerClock, 1000);

    updateTimerClock();

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    function updateTimerClock() {
        const t = getTimeRemaining(endtime);

        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        };
    };
};

setTimerClock('.timer', deadline);

//modal 

const modal = document.querySelector('.modal');
const modalBtnElemsTrigger = document.querySelectorAll('[data-modal');
const modalBtnElemsClose = document.querySelector('[data-close');

function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
};

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

modalBtnElemsTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
        showModal();
    });
});

// modalBtnElemsClose.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    const target = e.target;
    
    target === modal || target === modalBtnElemsClose ? closeModal() : false;
});

document.addEventListener('keydown', e => {
    const code = e.code;

    code === 'Escape' && modal.classList.contains('show') ? closeModal() : false;
});