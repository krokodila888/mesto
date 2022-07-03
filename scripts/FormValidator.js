export class FormValidator {
  constructor(dataElement, formElement) {
    this._formElement = formElement;
    this._inputSelector = dataElement.inputSelector;
    this._submitButtonSelector = dataElement.submitButtonSelector;
    this._inactiveButtonClass = dataElement.inactiveButtonClass;
    this._inputErrorClass = dataElement.inputErrorClass;
    this._errorClass = dataElement.errorClass;
    this._setEventListeners();
    }
 
  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('popup__input-error');
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
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
    const inputList = Array.from(this._formElement.querySelectorAll('.popup__input')); 
    this._toggleButtonState(inputList);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._formElement.querySelector('.popup__save-button').classList.add('popup__save-button_disabled'); 
      this._formElement.querySelector('.popup__save-button').disabled = true;
    }
    else {
      this._formElement.querySelector('.popup__save-button').classList.remove('popup__save-button_disabled'); 
      this._formElement.querySelector('.popup__save-button').disabled = false;
    }
  };
}
