export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  
  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners()
  }
  
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popupSelector.removeEventListener('mousedown', this._handleClickClose);
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
    this._popupSelector.querySelector('.popup__close-button')
      .addEventListener('click', this.close.bind(this));
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      this._handleClickClose(evt)});
  }
} 