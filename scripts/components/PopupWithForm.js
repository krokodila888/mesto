import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { callback } ) {
    super(popupSelector);
    this._callback = callback;
    this._inputSelector = '.popup__input',
    this._popupForm = this._popupSelector.querySelector('.popup__form-container');
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      this._callback(evt)
    }, { once: true })
  }

 getInputValues() {
  this._inputList = Array.from(this._popupForm.querySelectorAll(this._inputSelector));
  const inputArray = { userName: this._inputList[0].value, userText: this._inputList[1].value };
  return inputArray;
}

  close() {
    this._popupForm.removeEventListener('submit', (evt) => {
      this._callback(evt)
    });
    super.close();
    this._popupForm.reset()
    
  }
}
