window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        timer = require('./modules/timer'),
        modal = require('./modules/modal'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        calc = require('./modules/calculator'),
        slider = require('./modules/slider');

        tabs();
        timer();
        modal();
        cards();
        forms();
        calc();
        slider();
});