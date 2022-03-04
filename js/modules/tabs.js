function tabs(tabsSelector, tabsContentSelector, activeClass) {
    const tabheaderItemsEl = document.querySelectorAll(tabsSelector); 
    const tabsContentEl = document.querySelectorAll(tabsContentSelector);

    const removeTabsItem = () => tabheaderItemsEl.forEach(item => item.classList.remove(activeClass));

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
            item.classList.add(activeClass);
        });
    });
};

export default tabs;