import tabs  from './modules/tabs';
import timer from './modules/timer';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import calc from './modules/calculator';
import slider from './modules/slider';
import { showModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 50000);
    
    tabs('.tabheader__item ', '.tabcontent', 'tabheader__item_active');
    timer('.timer', '2022-05-11');
    modal('[data-modal', '.modal', modalTimerId);
    cards();
    forms('form', modalTimerId);
    calc();
    slider({ 
        container: '.offer__slide',
        slide: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
    });
});