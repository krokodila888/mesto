import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(this._popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._popupText = this._popup.querySelector('.popup__image-text')
  }

  open(cardName, cardPhoto) {
    super.open()
    this._name = cardName.textContent;
    this._link = cardPhoto.src;
    this._popupText.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name
  }
}
