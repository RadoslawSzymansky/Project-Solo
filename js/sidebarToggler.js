const BURGER = document.querySelector('i.hamburger');
const MENU = document.querySelector('.menu');
const CONTENT = document.querySelector('.content');
const DROP_DOWN = document.querySelector('.dropDown');

const SETTINGS = {
    dropActive: false,
}

const toggleMenu = () => {
    MENU.classList.toggle('disactive');
    CONTENT.classList.toggle('menuactive');
    BURGER.classList.toggle('menuHidden')
}

const toggleDropDown = (e) => {
    SETTINGS.dropActive = !SETTINGS.dropActive;
    e.target.parentNode.parentNode.classList.toggle('dropActive')
    e.target.className = SETTINGS.dropActive ? "icon-arrow-up dropDown" : "icon-arrow-down dropDown";
}

BURGER.addEventListener('click', toggleMenu);
DROP_DOWN.addEventListener('click', toggleDropDown)
//
// turn off menu if it smaller than 992px width device
if (document.body.offsetWidth < 992) {
    MENU.classList.add('disactive');
    CONTENT.classList.remove('menuactive');
    BURGER.classList.add('menuHidden')
}