<<<<<<< HEAD
import { openPhoto } from './utils.js';
/*сделать отдельную handleCardClick не смогла - она отчаянно ругалась тут, что is not a function*/

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
    this._cardImage = this._element.querySelector('.element__photo');
    this._element.querySelector('.element__text').textContent = this._cardText;
    this._cardImage.src = this._cardUrl;
    this._cardImage.alt = this._cardText;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this.likeButton = this._element.querySelector('.element__like-button');

    this.likeButton.addEventListener('click', () => {
      this.likeButton.classList.toggle('element__like-button_active');
      }
    );
    this._cardImage.addEventListener('click', () => {
      openPhoto(this._element)
      }
    );
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._element.remove();
      }
    ); 
  }
}
=======
import { openPhoto } from './utils.js';
/*сделать отдельную handleCardClick не смогла - она отчаянно ругалась тут, что is not a function*/

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
    this._cardImage = this._element.querySelector('.element__photo');
    this._element.querySelector('.element__text').textContent = this._cardText;
    this._cardImage.src = this._cardUrl;
    this._cardImage.alt = this._cardText;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this.likeButton = this._element.querySelector('.element__like-button');

    this.likeButton.addEventListener('click', () => {
      this.likeButton.classList.toggle('element__like-button_active');
      }
    );
    this._cardImage.addEventListener('click', () => {
      openPhoto(this._element)
      }
    );
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._element.remove();
      }
    ); 
  }
}
>>>>>>> 27b3935dc5ca766894c64d777358fe21076411ce
