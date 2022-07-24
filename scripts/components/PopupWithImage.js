import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, cardName, cardPhoto) {
    super(popupSelector);
    this._name = cardName.textContent;
    this._link = cardPhoto.src;
    this._popup = document.querySelector('.popup_photo');
    this._image = this._popup.querySelector('.popup__image')
  }

  open() {
    super.open()
    this._popup.querySelector('.popup__image-text').textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
  };
}