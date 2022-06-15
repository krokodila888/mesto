const enableValidationClasses = ({
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
});

const showInputError = (formElement, inputElement, errorMessage, dataElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(dataElement.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataElement.errorClass);
};

const hideInputError = (formElement, inputElement, dataElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(dataElement.inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, dataElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, dataElement);
  } else {
    hideInputError(formElement, inputElement, dataElement);
  }
};

const setEventListeners = (formElement, dataElement) => {
  const inputList = Array.from(formElement.querySelectorAll(dataElement.inputSelector));
  const buttonElement = formElement.querySelector(dataElement.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, dataElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, dataElement); toggleButtonState(inputList, buttonElement, dataElement);
    });
  });
};

function enableValidation(dataElement) {
  const formList = Array.from(document.querySelectorAll(dataElement.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  
      setEventListeners(formElement, dataElement);
  })}; 
enableValidation(enableValidationClasses)

function hasInvalidInput(inputList) {  
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

function toggleButtonState(inputList, buttonElement, dataElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(dataElement.inactiveButtonClass); buttonElement.disabled = true;
  }
  else {buttonElement.classList.remove(dataElement.inactiveButtonClass); buttonElement.disabled = false;
  }
};
