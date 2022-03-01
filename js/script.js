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
    clearInterval(modalTimerId);
};

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
};

modalBtnElemsTrigger.forEach(btn => {
    btn.addEventListener('click', showModal);
});

// modalBtnElemsClose.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    const target = e.target;
    
    target === modal || target === modalBtnElemsClose || target.getAttribute('data-close') === '' ? closeModal() : false;
});

document.addEventListener('keydown', e => {
    const code = e.code;

    code === 'Escape' && modal.classList.contains('show') ? closeModal() : false;
});

const modalTimerId = setTimeout(showModal, 50000);

window.addEventListener('scroll', showModalByScroll);

// Use class for cards

class MenuCard {
    constructor (src, alt, title, text, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 29;
        this.changeToUAH();
        this.parent.innerHTML = '';
    };

    changeToUAH() {
        this.price = this.price * this.transfer;
    };

    render() {

        const card = document.createElement('div');

        if (this.classes.length === 0) {
            this.card = 'menu__item';
            card.classList.add(this.card);
        } else {
            this.classes.forEach(className => card.classList.add(className));
        }

        card.innerHTML = `
            <img src="${this.src}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;

        this.parent.append(card);
    };
};

const card1 = new MenuCard(
    'img/tabs/vegy.jpg', 
    'vegy', 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    10, 
    '.menu__field .container',
);

const card2 = new MenuCard(
    'img/tabs/elite.jpg', 
    'elite', 
    'Меню "Премиум"', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    25, 
    '.menu__field .container',
    'menu__item',
);

const card3 = new MenuCard(
    'img/tabs/post.jpg', 
    'post', 
    'Меню "Постное"', 
    'В меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    19, 
    '.menu__field .container',
    'menu__item',
);

card1.render();
card2.render();
card3.render();


// Forms 
const forms = document.querySelectorAll('form');
const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся.',
    failure: 'Что-то пошло не так...',
    preloader: 'icons/spinner.svg',
};

forms.forEach(form => {
    postData(form);
});

function postData(form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.preloader;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        });
        
        fetch('server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        }).then(data => data.text())
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
};

function showThanksModal (message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    prevModalDialog.classList.remove('show');
    showModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
};