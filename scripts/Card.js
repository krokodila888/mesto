import { openPhoto } from './utils.js';

export class Card {
  constructor(cardText, cardUrl, cardSelector) {
    this._cardText = cardText;
    this._cardUrl = cardUrl;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.element__text').textContent = this._cardText;
    this._element.querySelector('.element__photo').src = this._cardUrl;
    this._element.querySelector('.element__photo').alt = this._cardText;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like-button');
    const cardPhoto = this._element.querySelector('.element__photo');

    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('element__like-button_active');
      }
    );
    cardPhoto.addEventListener('click', () => {
      openPhoto(this._element)
      }
    );
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._element.remove();
      }
    ); 
  }
}
