const enableValidation = (elements) => {
    const formElement = document.querySelectorAll(elements.formSelector);
    formElement.forEach((item) => {
        setEventListeners(item, elements.inputSelector, elements.errorClass, elements.inputErrorClass, elements.inactiveButtonClass, elements.submitButtonSelector);
    });
}

const setEventListeners = (formElement, inputSelector, errorClass, inputErrorClass, inactiveButtonClass, submitButtonSelector) => {
    const inputElement = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputElement.forEach((item) => {
        item.addEventListener('input', () => {
            isValid(formElement, item, errorClass, inputErrorClass);
            toggleButtonState(inputElement, buttonElement, inactiveButtonClass);
        });
    });
}

const showInputError = (formElement, element, errorMessage, errorClass, inputErrorClass) => {
    const formError = formElement.querySelector(`.${element.id}-error`);
    formError.textContent = errorMessage;
    element.classList.add(inputErrorClass);
    formError.classList.add(errorClass);
  };
  
  const hideInputError = (formElement, element, errorClass, inputErrorClass) => {
    const formError = formElement.querySelector(`.${element.id}-error`);
    element.classList.remove(inputErrorClass);
    formError.classList.remove(errorClass);
    formError.textContent = '';
  };

const isValid = (formElement, inputElement, errorClass, inputErrorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
      } else {
        hideInputError(formElement, inputElement, errorClass, inputErrorClass);
      }
}

const hasInvalidInput = (inputElement) => {
     return inputElement.some((item) => {
       return !item.validity.valid;
     })
  }; 
  
  const toggleButtonState = (inputElement, buttonElement, inactiveButtonClass) => {
      if (hasInvalidInput(inputElement)) {
            buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
      } else {
            buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
      }
  }; 

  const clearValidation = (formElement, element) => { 
      const inputElement = formElement.querySelectorAll(element.inputSelector);
      const buttonElement = formElement.querySelector(element.submitButtonSelector);
      buttonElement.classList.add(element.inactiveButtonClass);
      inputElement.forEach((item) => {
       hideInputError(formElement,item, element.errorClass, element.inputErrorClass,);
       item.setCustomValidity("");
     });
  };
  
  export { enableValidation, clearValidation };