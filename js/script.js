const BURGER = document.querySelector('i.hamburger');
const MENU = document.querySelector('.menu');
const CONTENT = document.querySelector('.content');
const DROP_DOWN = document.querySelector('.dropDown');

const SETTINGS = {
    dropActive: false,
}

const toggleMenu = () => {
    MENU.classList.toggle('dezactive');
    CONTENT.classList.toggle('full')
}

const toggleDropDown = (e) => {
    console.log('aha')
    SETTINGS.dropActive = !SETTINGS.dropActive;
    e.target.parentNode.parentNode.classList.toggle('dropActive')
    if (SETTINGS.dropActive) {
        e.target.className = "icon-arrow-up dropDown";
    } else {
        e.target.className = "icon-arrow-down dropDown"
    }
}
// const hideMenu = () => {

//     if (document.body.offsetWidth < 1600) {
//         console.log('jest')
//         MENU.classList.remove('dezactive');
//         CONTENT.classList.remove('full')
//     }
// }
// events
BURGER.addEventListener('click', toggleMenu);
DROP_DOWN.addEventListener('click', toggleDropDown)
// window.addEventListener('resize', hideMenu)