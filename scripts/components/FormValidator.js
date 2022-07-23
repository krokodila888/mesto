export class FormValidator {
  constructor(dataElement, formElement) {
    this._formElement = formElement;
    this._inputSelector = dataElement.inputSelector;
    this._submitButtonSelector = dataElement.submitButtonSelector;
    this._inactiveButtonClass = dataElement.inactiveButtonClass;
    this._inputErrorClass = dataElement.inputErrorClass;
    this._errorClass = dataElement.errorClass;
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputErrorBorder = dataElement.inputErrorBorder;
  }
 
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorBorder);
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.classList.remove(this._inputErrorBorder);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass); 
      this._submitButton.disabled = true;
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass); 
      this._submitButton.disabled = false;
    }
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
      });
    }
}
