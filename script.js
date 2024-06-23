class Validator {
    constructor(buttonLocker) {
        this.buttonLocker = buttonLocker;
    }

    isEmailValid(emailInput) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let result = regex.test(emailInput.value);
        this.buttonLocker.updateDictionary(emailInput.name, result);
        this.buttonLocker.disableCreateButton();
        return result;
    }

    isPasswordCorrect(confirmPassword, password) {
        let result = confirmPassword.value == password.value;
        this.buttonLocker.updateDictionary(confirmPassword.name, result);
        this.buttonLocker.updateDictionary(password.name, result);
        this.buttonLocker.disableCreateButton();
        return result && confirmPassword.value != "" && password.value != "";
    }

    isAgeCorrect(age) {
        let result = age.value > 18 && age.value < 99;
        this.buttonLocker.updateDictionary(age.name, result);
        this.buttonLocker.disableCreateButton();
        return result;
    }

    isFirstNameCorrect(firstName) {
        return firstName.value != "";
    }

    isLastNameCorrect(lastName) {
        return lastName.value != "";
    }
}

class ButtonLocker {
    elementDictionary = {};

    updateDictionary(elementName, validationResult) {
        this.elementDictionary[elementName] = validationResult;
    }

    disableCreateButton() {
        let isButtonDisabled = Object.values(this.elementDictionary).includes(false);
        document.getElementById("btn-bio").disabled = isButtonDisabled;
    }
}

let buttonLocker = new ButtonLocker();
let validator = new Validator(buttonLocker);



function isEmailValid(emailInput) {
    if (validator.isEmailValid(emailInput)) {
        emailInput.classList.remove("error")
    } else {
        emailInput.classList.add("error");
    }
}

function isPasswordCorrect(confirmPassword, password) {
    if (validator.isPasswordCorrect(confirmPassword, password)) {
        confirmPassword.classList.remove("error");
        if (confirmPassword.getAttribute("submitted") && password.getAttribute("submitted")) {
            confirmPassword.classList.add("correct");
            password.classList.add("correct");
        }
    }
    else {
        confirmPassword.classList.add("error");
    }
}

function isFirstNameValid(name) {
    if (validator.isFirstNameCorrect(name)) {
        name.classList.remove("error");
        if (name.getAttribute("submitted")) {
            name.classList.add("correct");
        }
    }
    else {
        if (name.getAttribute("submitted")) {
            name.classList.remove("correct");
        }
        name.classList.add("error");
    }
}

function isLastNameCorrect(surname) {
    if (validator.isFirstNameCorrect(surname)) {
        surname.classList.remove("error");
        if (surname.getAttribute("submitted")) {
            surname.classList.add("correct");
        }
    }
    else {
        if (surname.getAttribute("submitted")) {
            surname.classList.remove("correct");
        }
        surname.classList.add("error");
    }

}

function isAgeCorrect(age) {
    if (validator.isAgeCorrect(age)) {
        age.classList.remove("error");
    }
    else {
        age.classList.add("error");
    }
}

function submit() {
    let name = document.getElementById("first-name");
    name.setAttribute("submitted", "true");
    let firstNameValidationResult = validator.isFirstNameCorrect(name);
    if (!firstNameValidationResult) {
        name.classList.add("error");
    }

    let surname = document.getElementById("last-name");
    surname.setAttribute("submitted", "true");
    let lastNameValidationResult = validator.isLastNameCorrect(surname);
    if (!lastNameValidationResult) {
        surname.classList.add("error");
    }

    let email = document.getElementById("input-email");
    email.setAttribute("submitted", "true");
    let emailValidationResult = validator.isEmailValid(email);
    if (!emailValidationResult) {
        email.classList.add("error");
    }

    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    password.setAttribute("submitted", "true");
    confirmPassword.setAttribute("submitted", "true");
    let passwordValidationResult = validator.isPasswordCorrect(confirmPassword, password);
    if (!passwordValidationResult) {
        password.classList.add("error");
        confirmPassword.classList.add("error");
    }
}

function setIncome(value) {
    const valueText = document.querySelector("#value");
    valueText.textContent = value;
}