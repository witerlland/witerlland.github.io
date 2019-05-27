(function(){
    'use strict';

    // Script relacionado ao menu da pagina
    let openMenu      = document.getElementById('openMenu');
    let slideIndex    = 0; 

    function menuClick(){
        var menu    = document.getElementById('menu');
        menu.classList.toggle('active');
    }
    // Fim do script relacionado ao menu da pagina

    // Script relacionado ao carousel de projetos
    function slideStartGo(){
        var i;
        var slides = document.getElementsByClassName("projeto");
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }
        slideIndex++;
        if (slideIndex > slides.length){
            slideIndex = 1
        }
        slides[slideIndex-1].classList.add('active');
        setTimeout(slideStartGo, 6000);
    }
    // Fim do script de carousel

    // Script relacionado ao get dos artigos
    function loadPostsFromMedium(){
        fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@witerllandsilva')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // Fillter the array
                const res = data.items //This is an array with the content. No feed, no info about author etc..
                const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !
                
                function toText(node) {
                    let tag = document.createElement('div')
                    tag.innerHTML = node
                    node = tag.innerText
                    return node
                }
                function shortenText(text,startingPoint ,maxLength) {
                return text.length > maxLength?
                    text.slice(startingPoint, maxLength):
                    text
                }
                
                let output = '';
                posts.forEach((item) => {
                    output += `
                    <li class="blog__post">
                        <a href="${item.link}">
                        <img src="${item.thumbnail}" class="blog__topImg"></img>
                        <div class="blog__content">
                            <div class="blog_preview">
                                <h2 class="blog__title">${shortenText(item.title, 0, 30)+ '...'}</h2>
                                <p class="blog__intro">${'...' + shortenText(toText(item.content),60, 300)+ '...'}</p>
                            </div>
                            <hr>
                            <div class="blog__info">
                                <span class="blog__author">${item.author}</span>
                                <span class="blog__date">${shortenText(item.pubDate,0 ,10)}</span>
                            </div>
                        </div>
                        <a/>
                    </li>`
                })
                document.querySelector('.artigos-container').innerHTML = output
            });
    }
    // Fim do script ao get de artigos 

    // Chamadas das funcoes ao startar a pagina
    document.addEventListener("DOMContentLoaded", function(e){
        slideStartGo();
    });

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