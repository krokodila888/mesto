import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { callback }) {
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
    this._callback = callback;
    this._inputSelector = '.popup__input',
    this._popupForm = this._popup.querySelector('.popup__form-container');
    this._inputList = this._popup.querySelectorAll(this._inputSelector);
    this._saveButton = this._popup.querySelector('.popup__save-button');
    this._initialText = this._saveButton.textContent;
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._callback(evt)
    })
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  } 

  close() {
    super.close();
    this._popupForm.reset()
  }
  
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...'}
    else {
      this._saveButton.textContent = this._initialText;
    }
  }
}

