export class Card {
  constructor(cardText, cardUrl, cardSelector, likesCounter, cardOwner, cardID, userID, { handleCardClick }, setLikes, deleteLikes, {confirmRemoving} ) {
    this._cardText = cardText;
    this._cardUrl = cardUrl;
    this._cardSelector = cardSelector;
    this._likesCounter = likesCounter;
    this.handleCardClick = handleCardClick;
    this.setLikes = setLikes;
    this.deleteLikes = deleteLikes;
    this.confirmRemoving = confirmRemoving;
    this._cardOwner = cardOwner._id;
    this._cardID = cardID;
    this._userID = userID;
    this._data = this._cardID;
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
    this.removeButton = this._element.querySelector('.element__remove-button')
    this._cardImage = this._element.querySelector('.element__photo');
    this._element.querySelector('.element__text').textContent = this._cardText;
    this._cardImage.src = this._cardUrl;
    this._cardImage.alt = this._cardText;
    this.likeCounter = this._element.querySelector(".element__like-counter");
    this.likeCounter.textContent = this._likesCounter.length;
    if (this._likesCounter.some(element => element._id === this._userID)) {
      this.likeButton.classList.add('element__like-button_active');
    };
    if (this._cardOwner !== this._userID) {
      this.removeButton.remove()}; 
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this.likeButton.addEventListener('click', () => {
      if (this.likeButton.classList.contains('element__like-button_active')) {
        this.deleteLikes(this._cardID);
      }
      else {
        //this.likeButton.classList.add('element__like-button_active');
        this.setLikes(this._cardID);
      }
    });
    
    this.removeButton.addEventListener('click', () => {
      this.confirmRemoving(this._data, this._element);
    }); 

    this._cardImage.addEventListener('click', () => {
      this.handleCardClick(this._element)
    })
  }

  setLikesCounter(item) {
    this._item = item.likes;
    this._likesCounterRenew = this._item;
    this.likeCounter.textContent = this._likesCounterRenew.length;
    this.likeButton.classList.toggle('element__like-button_active');
  }
}
