function tabs() {
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
};

module.exports = tabs;