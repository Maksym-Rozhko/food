function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
};

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const modalBtnElemsTrigger = document.querySelectorAll(triggerSelector);
    const modalBtnElemsClose = document.querySelector('[data-close');

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    modalBtnElemsTrigger.forEach(btn => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });

    // modalBtnElemsClose.addEventListener('click', closeModal);

    modal.addEventListener('click', e => {
        const target = e.target;
        
        target === modal || target === modalBtnElemsClose || target.getAttribute('data-close') === '' ? closeModal(modalSelector) : false;
    });

    document.addEventListener('keydown', e => {
        const code = e.code;

        code === 'Escape' && modal.classList.contains('show') ? closeModal(modalSelector) : false;
    });

    window.addEventListener('scroll', showModalByScroll);
};

export default modal;
export {showModal};
export {closeModal};