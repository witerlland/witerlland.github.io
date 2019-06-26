(function(){
    'use strict';

    // Script relacionado ao menu da pagina
    let openMenu      = document.getElementById('openMenu');

    function menuClick(){
        var menu    = document.getElementById('menu');
        menu.classList.toggle('active');
    }

    openMenu.addEventListener("click", function(e){
        e.preventDefault();
        menuClick();
    });
})();

// Script de animacao de scroll
(function(){
    'use strict';

    const menuItems = document.querySelectorAll('.scrollTo a[href^="#"]');

    function getScrollTopByHref(element){
        const id = element.getAttribute('href');
        return document.querySelector(id).offsetTop;
    }

    function scrollToPosition(to) {
        // Caso queira o nativo apenas
        // window.scroll({
        // top: to,
        // behavior: "smooth",
        // })
        smoothScrollTo(0, to);
    }

    function scrollToIdOnClick(event) {
        event.preventDefault();
        const to = getScrollTopByHref(event.currentTarget)- 80;
        scrollToPosition(to);
    }
    
    menuItems.forEach(item => {
        item.addEventListener('click', scrollToIdOnClick);
    });

    // Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
    /**
     * Smooth scroll animation
     * @param {int} endX: destination x coordinate
     * @param {int) endY: destination y coordinate
     * @param {int} duration: animation duration in ms
     */
    function smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        duration = typeof duration !== 'undefined' ? duration : 800;

        // Easing function
        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
            return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            const newY = easeInOutQuart(time, startY, distanceY, duration);

            if (time >= duration) {
                clearInterval(timer);
            }
            
            window.scroll(newX, newY);
        }, 2000 / 60); // 60 fps
    };

 })();