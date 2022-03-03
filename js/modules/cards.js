function cards() {
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

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    };

    return await res.json();
};

axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
};

module.exports = cards;