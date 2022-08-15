import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._popupForm = this._popup.querySelector('.popup__form-container');
    this._saveButton = this._popup.querySelector('.popup__save-button');
    this._initialText = this._saveButton.textContent;
  }

  setEventListeners () {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm(this.data, this._element);
    });
  }

  open(data, element) {
    this.data = data;
    this._element = element;
    super.open();
  }
  
  renderLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = 'Сохранение...'
    }
    else {
      this._saveButton.textContent = this._initialText;
    }
  }
}