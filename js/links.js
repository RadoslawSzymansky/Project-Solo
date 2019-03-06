{
    /* <tr class="row">
    <td class="col-6 col-s-12">Blurax</td>
    <td class="col-6 col-s-12 link-wrapper">
        <a class="link link-large" href="http://www.blurax.com" target="_blank">http://www.blurax.com</a>
        <span> <i class="icon-links"></i><i class="icon-trash"></i>
        </span>
    </td>
    </tr> */
}

//
const TABLE_LINKS = document.querySelector('.table');
const BTN_ADD_LINK = document.querySelectorAll('.addLink');
const POP_UP_LINK = document.querySelector('.popUpLinks')

console.log(BTN_ADD_LINK)
// //
function upDateLinkList(){
    TABLE_LINKS.innerHTML = "";
    const {name, link, key} = LINKS;


}




// show the link panel
function addLink() {
    console.log('adduje');
    POP_UP_LINK.classList.add('active')
}

//

BTN_ADD_LINK.forEach(e => e.addEventListener('click', addLink))