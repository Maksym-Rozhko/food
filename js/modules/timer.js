function timer(id, deadline) {

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
    
    setTimerClock(id, deadline);    
};

export default timer;