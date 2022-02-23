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
    
    target === modal || target === modalBtnElemsClose ? closeModal() : false;
});

document.addEventListener('keydown', e => {
    const code = e.code;

    code === 'Escape' && modal.classList.contains('show') ? closeModal() : false;
});

const modalTimerId = setTimeout(showModal, 10000);

window.addEventListener('scroll', showModalByScroll);

// Use class for cards

class MenuCard {
    constructor (src, alt, title, text, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.text = text;
        this.price = price;
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

        card.innerHTML = `
            <div class="menu__item">
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
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
    '.menu__field .container'
);

const card2 = new MenuCard(
    'img/tabs/elite.jpg', 
    'elite', 
    'Меню "Премиум"', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    25, 
    '.menu__field .container'
);

const card3 = new MenuCard(
    'img/tabs/post.jpg', 
    'post', 
    'Меню "Постное"', 
    'В меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    19, 
    '.menu__field .container'
);

card1.render();
card2.render();
card3.render();




// functions constructor

// function User(name, id) {
//     this.name = name;
//     this.id = id;
//     this.human = true;
//     this.hello = function() {
//         console.log(`Hello ${this.name}!`);
//     };
// };

// class User {
//     constructor (name, id) {
//         this.name = name;
//         this.id = id;
//         this.human = true;
//     };
//     hello() {
//         console.log(`Hello ${this.name}!`);
//     };
//     exit() {
//         console.log(`Пользователь ${this.name} покинул чат`);
//     };
// };

// User.prototype.exit = function() {
//     console.log(`Пользователь ${this.name} покинул чат`);
// };

// let newUser1 = new User('David', 28);
// let newUser2 = new User('Alex', 20);

// // newUser2.status = 'merried';

// newUser1.hello();
// newUser2.hello();

// setTimeout(() => {
//     newUser1.exit();
//     newUser2.exit();
// }, 2000);

// console.log(newUser1);
// console.log(newUser2);