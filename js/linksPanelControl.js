const TABLE_BODY = document.querySelector(".tableBody");
const ADD_HEADER = document.querySelector('.addHeader');
// adding DOM ELEMENTS
const BTN_LINK_SUBMIT = document.querySelector(".addReadyLink");
const FORM_LINK = document.querySelector(".addReadyLink");
const INPUT_ADD_NAME = document.querySelector(".linkName");
const INPUT_ADD_URL = document.querySelector(".linkUrl");
// edit link panel DOM ELEMENST
const EDIT_LINK_BODY = document.querySelector(".editLinkUl");
//  start values
let currentEditElementIndex = null;
// function for copying links
const copyLink = e => {
    const el = document.createElement("textarea");
    el.value = e.target.parentNode.parentNode.querySelector("a").textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
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
// function for showing current array!
function upDateLinkList() {
    TABLE_BODY.innerHTML = "";
    let code = "";
    config.forEach(e => {
        code +=
            `<tr class="row">
                <td class="col-6 col-s-12">${e.name}</td>
                <td class="col-6 col-s-12 link-wrapper">
                    <span class="tooltipLinkWrapper"> <a data-key="${e.key}" class="link link-large" href="${e.link}" target="_blank">${e.link}</a>
                    <span class="tooltip">${e.link}</span></span>
                    <span>
                        <i class="icon-links copy" data-key="${e.key}">
                            <span class="tooltip tooltip-copied">Link Copied</span>
                            <span class="tooltip tooltip-copy">Copy link</span>
                        </i>
                        <i class="icon-trash remove" data-key="${e.key}"><span class="tooltip tooltip-remove">Remove link</span></i>
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
// function for giving and iungivi
function toggleClassInput(input, state) {
    state ? input.parentNode.classList.remove('uncorrect') : input.parentNode.classList.add('uncorrect');
}
var refKeeper = {
    fn: [],
    btn: []
}
function initValidation() {
    var isDone = false;
    var succesCounter = 0;
    (function (arguments) {
        for (let i = 0; i < arguments.length; i++) {
            if (!arguments[i].parentNode.classList.contains('active') && arguments[i]) {
                // tu uruchamiać eventy;
                validation(arguments[i])
                refKeeper["btn"][i] = arguments[i];
                var input = refKeeper["btn"][i]
                arguments[i].parentNode.classList.add('active');
                arguments[i].addEventListener('input', refKeeper["fn"][i] = function () {
                    validation(refKeeper["btn"][i])
                }, false)
            }
            if (validation(arguments[i])) {
                ++succesCounter;
            }
            if (succesCounter === arguments.length) isDone = true
        }
    })(arguments)
    function validation(input) {
        var value = input.value;
        var type = input.type;
        let validationCorrect = false;
        if (type === "url") {
            if (value.startsWith("https://") && value.startsWith("https://")) {
                validationCorrect = true
            }
        }
        if (type === "text") {
            if (value.length >= 3 && value.length <= 15) {
                validationCorrect = true;
            }
        }
        /// tu kolejne if dla innych typów inputow ew. dla specjalnych można dać id i wtedy sprawdzać np  type emial lub id pesel
        toggleClassInput(input, validationCorrect)
        return validationCorrect;
    }
    if (isDone) {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].parentNode.classList.remove('active');
            arguments[i].removeEventListener('input', refKeeper["fn"][i], false);
        }
    }
    return isDone;
}
// ADDING OR CHANGNING ELEMENT(LINK)
function submitLink(e) {
    e.preventDefault();
    if (!initValidation(INPUT_ADD_NAME, INPUT_ADD_URL)) {
        return
    }
    //
    let newName = INPUT_ADD_NAME.value;
    let newUrl = INPUT_ADD_URL.value;
    // if its  editing the link
    if (e.target.id === "changeLink") {

        // tutaj zmiana linka
        let index = currentEditElementIndex;
        config[index].name = newName;
        config[index].link = newUrl;
        EDIT_LINK_BODY.querySelector(`[data-key="${index}"]`).textContent = newName;
        document.querySelector('.popUpEdit').classList.add('active');
        setTimeout(() => {
            document.querySelector('.popUpEdit').classList.remove('active');
        }, 1200)
        BTN_LINK_SUBMIT.innerHTML = `Add<span class="tooltip">Link
        added!</span>`;
        cleanInputs()
        BTN_LINK_SUBMIT.id = "";
        ADD_HEADER.textContent = "ADD URL"
        return;
    }
    const newLink = {
        name: newName,
        link: newUrl,
        key: config.length
    };
    config.push(newLink);
    // adding newLink to edit panel 
    function addNewLinkToEditPanel() {
        let li = document.createElement('li');
        li.innerHTML = `<span data-key="${
            config.length - 1
            }">${
            newName
            }</span><button  data-key="${
            config.length - 1
            }" class="btnEdit">Edit</button>`
        EDIT_LINK_BODY.appendChild(li);
        li.addEventListener('click', changeFormToEdit)
    }
    addNewLinkToEditPanel();
    cleanInputs()
    BTN_LINK_SUBMIT.querySelector('span').classList.add('active');
    setTimeout(() => {
        BTN_LINK_SUBMIT.querySelector('span').classList.remove('active');
    }, 300);
}
// UPDATING EDIT PANEL LIST
function cleanInputs() {
    INPUT_ADD_NAME.value = "";
    INPUT_ADD_URL.value = "";
}
function fillEditPanel() {
    EDIT_LINK_BODY.innerHTML = "";
    let fragment = document.createDocumentFragment();
    config.forEach(e => {
        let li = document.createElement('li');
        li.innerHTML = `<span data-key="${
            e.key
            }">${
            e.name
            }</span><button  data-key="${
            e.key
            }" class="btnEdit">Edit</button>`
        fragment.appendChild(li)
    });
    EDIT_LINK_BODY.appendChild(fragment)
    EDIT_LINK_BODY.querySelectorAll(".btnEdit").forEach(e =>
        e.addEventListener("click", changeFormToEdit)
    )
};
// FUNCTION FOR  showing eDITING LINK panel //
const changeFormToEdit = e => {
    let index = e.target.dataset.key;
    currentEditElementIndex = index;
    INPUT_ADD_NAME.value = config[index].name;
    INPUT_ADD_URL.value = config[index].link;
    BTN_LINK_SUBMIT.textContent = "Save";
    BTN_LINK_SUBMIT.setAttribute('id', 'changeLink');
    ADD_HEADER.innerHTML = `Currently chaning: <span style="color: #56819f;">${config[index].name}</span>`
};
// events
document.querySelectorAll(".btnShowLinkPanel").forEach(e => e.addEventListener("click", function () {
    openModal(".panelWrapper");
    fillEditPanel();
}));
FORM_LINK.addEventListener("click", submitLink);
// first creating of list
upDateLinkList();

