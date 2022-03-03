function modal() {
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
};

module.exports = modal;