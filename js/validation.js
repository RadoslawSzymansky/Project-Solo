"use strict";
var configForm = {};
var updateMessages = {
    required: function (input) {
        return input.value === "" ? "Pole jest wymagane" : null;
    },
    minLength5: function (input) {
        return input.value.length > 0 && input.value.length < 5 ?
            "Min length 5" :
            null;
    },
    maxLength20: function (input) {
        return input.value.length > 0 && input.value.length > 20 ?
            "Max length 5" :
            null;
    },
    minValue1: function (input) {
        return parseFloat(input.value) < 1 ? "Min value is 1" : null;
    },
    email: function (input) {
        var mailReg = new RegExp(
            "^[0-9a-zA-Z_.-]+@[0-9a-zA-Z.-]+.[a-zA-Z]{2,3}$",
            "gi"
        );
        var flag = mailReg.test(input.value);
        return !flag ? "Uncorrect email adress.." : null;
    },
    url: function (input) {
        var flag = input.value.startsWith("https://") && input.value.startsWith("https://");
        return !flag ? "Adress url: https://..." : null;
    }
};

function init() {
    var forms = document.getElementsByTagName("form");
    forms = Array.prototype.slice.call(forms);
    forms.forEach(function (e) {
        if (!configForm.id) configForm[e.id] = {};
        var formElements = Array.prototype.slice.call(e.elements);
        configForm[e.id]["inputs"] = findInputs(formElements);
        configForm[e.id]["inputsForVal"] = findInputsForValidate(
            configForm[e.id]["inputs"]
        );
        configForm[e.id].isSetSubmitted = false;
        configForm[e.id].btnSubmit = findSubmitButton(formElements);
        configForm[e.id].validateForm = function () {
            return this.inputsForVal.every(function (e, i) {
                return !e["input" + i].nextSibling.classList.contains(
                    "validation-active"
                );
            })
        };
        addWatcherInputs(
            configForm[e.id].inputsForVal,
            configForm[e.id].isSetSubmitted
        );
        addSubmitListener(configForm[e.id].btnSubmit);
        createValidationErrorDiv(configForm[e.id]["inputsForVal"]);
        configForm[e.id].validateForm();
    });
}
init();

function findInputs(arr) {
    var inputs = [];
    arr.forEach(function (e) {
        if (e.tagName === "INPUT") inputs.push(e);
    });
    return inputs;
}

function findInputsForValidate(arr) {
    var inputsForVal = [];
    var counter = 0;
    arr.forEach(function (e) {
        if (e.dataset.validation) {
            var obj = {};
            obj["input" + counter] = e;
            obj["validators"] = e.dataset.validation.split(" ");
            inputsForVal.push(obj);
            counter++;
        }
    });
    return inputsForVal;
}

function findSubmitButton(arr) {
    var btn;
    arr.forEach(function (e) {
        if (e.type == "submit") btn = e;
    });
    return btn;
}
// fn for adding watching for input
function addWatcherInputs(inputs, flag) {
    inputs.forEach(function (input, index) {
        input["input" + index].addEventListener("input", function (e) {
            var message = checkInputState(
                input["input" + index],
                input.validators
            );
            e.target.nextSibling.textContent = message || null;
            if (configForm[e.target.parentNode.parentNode.id].isSetSubmitted) {
                message === null ?
                    input["input" + index].nextSibling.classList.remove(
                        "validation-active"
                    ) :
                    input["input" + index].nextSibling.classList.add(
                        "validation-active"
                    );
            }
        });
    });
}

function checkInputState(input, validators) {
    var answer;
    var flag = false;
    validators.forEach(function (validator) {
        if (!updateMessages[validator]) {
            return console.error("Brak walidatora o nazwie " + validator);
        }
        if (!flag) {
            answer = updateMessages[validator](input);
            if (answer !== null) flag = true;
        }
    });
    return answer;
}

function validate(form) {
    form.isSetSubmitted = true;
    showErros(form.inputsForVal);
}

function showErros(inputs) {
    inputs.forEach(function (input, index) {
        var message = checkInputState(
            input["input" + index],
            input.validators
        );
        input["input" + index].nextSibling.innerHTML = message || "";
        var message = checkInputState(
            input["input" + index],
            input.validators
        );
        input["input" + index].nextSibling.textContent = message || null;
        if (configForm[input["input" + index].parentNode.parentNode.id].isSetSubmitted) {
            message === null ?
                input["input" + index].nextSibling.classList.remove(
                    "validation-active"
                ) :
                input["input" + index].nextSibling.classList.add(
                    "validation-active"
                );
        }
    });
}

function createValidationErrorDiv(inputs) {
    inputs.forEach(function (input, index) {
        var msg = document.createElement("div");
        msg.innerHTML = "aha";
        msg.classList.add("validation-hidden");
        input["input" + index].element;
        input["input" + index].parentNode.insertBefore(
            msg,
            input["input" + index].nextSibling
        );
    });
}

function addSubmitListener(btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        var form;
        if (e.target.parentNode.id.includes("form")) {
            form = configForm[e.target.parentNode.id];
        } else if (e.target.parentNode.parentNode.id.includes("form")) {
            form = configForm[e.target.parentNode.parentNode.id];
        } else {
            return console.error(
                "button can be max nested  2 levels in form"
            );
        }
        validate(form);
        if (form.validateForm()) {
            form.isSetSubmitted = false;
        } else {
            return;
        }
        // validation ok, rest of code, you can submit form..
        if (btn.classList.contains("addReadyLink")) submitLink(e);
    });
}