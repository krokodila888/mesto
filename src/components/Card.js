export class Card {
  constructor(cardText, cardUrl, cardSelector, { handleCardClick } ) {
    this._cardText = cardText;
    this._cardUrl = cardUrl;
    this._cardSelector = cardSelector;
    this.handleCardClick = handleCardClick;
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
    this.likeButton = this._element.querySelector('.element__like-button');
    this._cardImage = this._element.querySelector('.element__photo');
    this._element.querySelector('.element__text').textContent = this._cardText;
    this._cardImage.src = this._cardUrl;
    this._cardImage.alt = this._cardText;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      this.likeButton.classList.toggle('element__like-button_active');
      }
    );
    
    this._element.querySelector('.element__remove-button').addEventListener('click', () => {
      this._element.remove();
      }
    ); 
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._element)
      })
  }
}