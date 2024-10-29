// const validationConfig = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button-inactive',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active'
// };

function showError(form, input, errorMessage, settings) {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

function hideError(form, input,settings) {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(form, input) {
    if(input.validity.patternMismatch){
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if(!input.validity.valid) {
        showError(form, input, input.validationMessage);
    } else {
        hideError(form, input);
    }
}

function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement){
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement,settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('aria-disabled', 'true');
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.setAttribute('aria-disabled', 'false');
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

function setEventListeners(form, settings) {
    const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
    const buttonElement = form.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach(function(inputELement){
        inputELement.addEventListener('input', function() {
            checkInputValidity(form, inputELement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(function(formElement){
        formElement.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        setEventListeners(formElement);
    })
}

export {showError, hideError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation};