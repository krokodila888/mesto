export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    //без этой строки все ломается
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose);
  }
  
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close()
      }
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close()
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', (evt) => {
      this._handleClickClose(evt)});
  }
} 