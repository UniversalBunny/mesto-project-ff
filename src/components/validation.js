function showError(form, input, errorMessage, settings) {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
}

function hideError(form, input, settings) {
    const errorElement = form.querySelector(`.${input.name}-error`);
    input.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(form, input, settings) {
    if(input.validity.patternMismatch){
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity("");
    }

    if(!input.validity.valid) {
        showError(form, input, input.validationMessage, settings);
    } else {
        hideError(form, input, settings);
    }
}

function hasInvalidInput(inputList) {
  return inputList.some(function(inputElement){
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, settings) {
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
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach(function(inputELement){
        inputELement.addEventListener('input', function() {
            checkInputValidity(form, inputELement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        })
    })
}

function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach(function(formElement){
        formElement.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    })
}

function clearValidation(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  
  inputList.forEach(function(inputElement){
    hideError(form, inputElement, settings);
  })

  buttonElement.setAttribute('aria-disabled', 'true');
  buttonElement.classList.add(settings.inactiveButtonClass);

}

export {showError, hideError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, clearValidation};