const TABLE_BODY = document.querySelector(".tableBody");
const BTN_SHOW_LINK_PANEL = document.querySelectorAll(".showLinkPanel");
const POP_UP_LINK = document.querySelector(".popUpLinks");
const BTN_QUIT_LINK_PANEL = document.querySelector(".quitLinkPanel");
// adding DOM ELEMENTS
const BTN_ADD_LINK = document.querySelector(".addReadyLink");
const INPUT_ADD_NAME = document.querySelector(".linkName");
const INPUT_ADD_URL = document.querySelector(".linkUrl");
// edit link panel DOM ELEMENST
const EDIT_LINK_BODY = document.querySelector(".editLinkUl");
const EDIT_LINK_PANEL = document.querySelector(".editPanel");
const EDIT_NAME_INPUT = document.querySelector("input.nameEdit");
const EDIT_URL_INPUT = document.querySelector("input.urlEdit");

// function for copying links
const copyLink = e => {
    const el = document.createElement("textarea");
    el.value = e.target.parentNode.parentNode.querySelector("a").textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    //
    // showing tooltip
    e.target.querySelector("span").classList.add("active");
    setTimeout(() => {
        e.target.querySelector("span").classList.remove("active");
    }, 180);
}; //
// Creating new key for config array. Should be run on each change on config, but not after adding link because its giving correct key to new link object..
const updateLinksKey = () => {
    let index = 0;
    config.forEach(e => {
        e.key = index;
        index++;
    });
};
// function for removing link from config array
const removeLink = e => {
    let index = e.target.dataset.key;
    config.splice(index, 1);
    updateLinksKey();
    upDateLinkList();
};
// // //
// function for showing current array!
// ----------- first way. takes about 20ms to create 400 <tr> ------------------
function upDateLinkList() {
    TABLE_BODY.innerHTML = "";
    let code = "";
    config.forEach(e => {
        code += `<tr class="row">
            <td class="col-6 col-s-12">${e.name}</td>
            <td class="col-6 col-s-12 link-wrapper">
                <a data-key="${e.key}" class="link link-large" href="//${
            e.link
        }" target="_blank">${e.link}</a>
                <span>
                    <i class="icon-links copy" data-key="${e.key}">
                        <span class="tooltip tooltip-copied">Link Copied</span>
                        <span class="tooltip tooltip-copy">Copy link</span>
                    </i>
                    <i class="icon-trash remove" data-key="${e.key}">
                        <span class="tooltip tooltip-remove">Remove link</span>
                 </i>
                </span>
            </td>
        </tr>`;
    });
    TABLE_BODY.innerHTML = code;
    let btnRemove = TABLE_BODY.querySelectorAll(".remove").forEach(e => {
        e.addEventListener("click", removeLink);
    });
    let btnCopy = TABLE_BODY.querySelectorAll(".copy").forEach(e => {
        e.addEventListener("click", copyLink);
    });
}

// show the link panel
function showLinkPanel() {
    POP_UP_LINK.classList.add("active");
    document.body.classList.add("blocked");
    updateEditPanel();
}
``;
//
// ADDING NEW ELEMENT(LINK)
function addLink(e) {
    e.preventDefault();
    let newName = INPUT_ADD_NAME.value;
    let newUrl = INPUT_ADD_URL.value;
    if (newName.length < 3 || newName.length > 15)
        return alert("Name must be longer than 3 letters! And max 15 letters!");
    if (!newUrl.startsWith("www.") && !newUrl.startsWith("WWW."))
        return alert(
            "Add correct website adress, e.g www.site.com. Without https://..."
        );
    const newLink = {
        name: newName,
        link: newUrl,
        key: config.length
    };
    config.push(newLink);
    updateEditPanel();
    INPUT_ADD_NAME.value = "";
    INPUT_ADD_URL.value = "";
    BTN_ADD_LINK.querySelector('span').classList.add('active');
    setTimeout(() => {
        BTN_ADD_LINK.querySelector('span').classList.remove('active');
    }, 300)
}
// UPDATING EDIT PANEL LIST
// second try
function updateEditPanel() {
    EDIT_LINK_BODY.innerHTML = "";
    let fragment = document.createDocumentFragment();
    config.forEach(e => {
        let li = document.createElement('li');
        li.innerHTML = `<span>${
            e.name
        }</span><button  data-key="${
            e.key
        }" class="btnEdit">Edit</button>`
        fragment.appendChild(li)

    });
    EDIT_LINK_BODY.appendChild(fragment)
    EDIT_LINK_BODY.querySelectorAll(".btnEdit").forEach(e =>
        e.addEventListener("click", editLink)
    )
};
// first try, but its not okay //
// }function updateEditPanel() {
//     EDIT_LINK_BODY.innerHTML = "";
//     config.forEach(e => {
//         EDIT_LINK_BODY.innerHTML += `<li><span>${
//             e.name
//         }</span><button  data-key="${
//             e.key
//         }" class="btnEdit">Edit</button></li>`;
//     });

//     EDIT_LINK_BODY.querySelectorAll(".btnEdit").forEach(e =>
//         e.addEventListener("click", editLink)
//     );
// }
// FUNCTION FOR EDITING LINK //
const editLink = e => {
    let index = e.target.dataset.key;
    EDIT_LINK_PANEL.classList.add("active");
    EDIT_NAME_INPUT.value = config[index].name;
    EDIT_URL_INPUT.value = config[index].link;
    document.querySelector(".current span").textContent = config[index].name;
    EDIT_LINK_PANEL.querySelector(".saveChange").addEventListener(
        "click",
        () => {
            let newName = EDIT_NAME_INPUT.value;
            let newUrl = EDIT_URL_INPUT.value;
            if (newName.length < 3 || newName.length > 15)
                return alert(
                    "Name must be longer than 3 letters! And max 15 letters!"
                );
            if (!newUrl.startsWith("www."))
                return alert(
                    "Add correct website adress, e.g www.site.com. Without https://..."
                );
            config[index].name = newName;
            config[index].link = newUrl;
            updateEditPanel();
            upDateLinkList();
            document.querySelector('.popUpEdit').classList.add('active');
            setTimeout(() => {
                document.querySelector('.popUpEdit').classList.remove('active');
            }, 1200)
            closeEditPanel();
        }
    );
};
// function for hiding and cleaning edit panel after succesed chaning or closing the links panell
function closeEditPanel() {
    EDIT_LINK_PANEL.classList.remove("active");
    EDIT_NAME_INPUT.value = "";
    EDIT_URL_INPUT.value = "";
}

// events
// --- hide link panel and unlock the body
BTN_QUIT_LINK_PANEL.addEventListener("click", function () {
    POP_UP_LINK.classList.remove("active");
    document.body.classList.remove("blocked");
    upDateLinkList();
});

BTN_SHOW_LINK_PANEL.forEach(e => e.addEventListener("click", showLinkPanel));
BTN_ADD_LINK.addEventListener("click", addLink);

//
// first creating of list
upDateLinkList();
//

// //
// tested functions for changing DOM ELEMENTS: , remove it later after checking..

// ----------- second way . for 400 tr elements its about 30ms to create
// function upDateLinkList() {
//     var fragment = document.createDocumentFragment();
//     TABLE_BODY.innerHTML = "";
//     config.forEach(e => {
//         var trElement = document.createElement("tr");
//         trElement.classList.add("row");
//         trElement.innerHTML += `
//             <td class="col-6 col-s-12">${e.name}</td>
//             <td class="col-6 col-s-12 link-wrapper">
//                 <a data-key="${e.key}" class="link link-large" href="//${
//             e.link
//         }" target="_blank">${e.link}</a>
//                 <span>
//                     <i class="icon-links copy" data-key="${e.key}">
//                         <span class="tooltip tooltip-copied">Link Copied</span>
//                         <span class="tooltip tooltip-copy">Copy link</span>
//                     </i>
//                     <i class="icon-trash remove" data-key="${e.key}">
//                         <span class="tooltip tooltip-remove">Remove link</span>
//                  </i>
//                 </span>
//             </td>
//         `;
//         fragment.appendChild(trElement);
//     });

// ----------- first way. takes about 20ms to create 400 <tr> ------------------
// function upDateLinkList() {
//     TABLE_BODY.innerHTML = "";
//     let code = "";
//     config.forEach(e => {
//             code += `<tr class="row">
//             <td class="col-6 col-s-12">${e.name}</td>
//             <td class="col-6 col-s-12 link-wrapper">
//                 <a data-key="${e.key}" class="link link-large" href="//${
//                 e.link
//             }" target="_blank">${e.link}</a>
//                 <span>
//                     <i class="icon-links copy" data-key="${e.key}">
//                         <span class="tooltip tooltip-copied">Link Copied</span>
//                         <span class="tooltip tooltip-copy">Copy link</span>
//                     </i>
//                     <i class="icon-trash remove" data-key="${e.key}">
//                         <span class="tooltip tooltip-remove">Remove link</span>
//                  </i>
//                 </span>
//             </td>
//         </tr>`;
//     });
//     TABLE_BODY.innerHTML = code;
//     let btnRemove = TABLE_BODY.querySelectorAll(".remove").forEach(e => {
//         e.addEventListener("click", removeLink);
//     });
//     let btnCopy = TABLE_BODY.querySelectorAll(".copy").forEach(e => {
//         e.addEventListener("click", copyLink);
//     });
// }