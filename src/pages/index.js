import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/initialCards.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { enableValidationClasses, profileEditButton, popupProfileSelector, popupMestoSelector, profileAddButton, cardsHolder, popupMestoForm, popupProfileForm, cardSelector, popupPhotoSelector, nameSelector, statusSelector } from '../utils/constants.js';
import './index.css';

const userInfo = ({username: nameSelector, status: statusSelector});
const profile = new UserInfo(userInfo);

const popupPicture = new PopupWithImage(popupPhotoSelector);
popupPicture.setEventListeners();

function createCard(item) {
  const card = new Card(item.name, item.link, cardSelector, { handleCardClick });
  const cardElement = card.generateCard();
return cardElement;
}

function handleCardClick(element) {
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  popupPicture.open(cardName, cardPhoto);
};

const cardList = new Section({ 
  data: initialCards, renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  } 
}, cardsHolder);
cardList.renderItem();

const popupAddCard = new PopupWithForm(popupMestoSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    const inputValues = popupAddCard.getInputValues();
    const cardElement = createCard(inputValues);
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
});

popupAddCard.setEventListeners();

const popupUserInfo = new PopupWithForm(popupProfileSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    const userNewData = popupUserInfo.getInputValues();
    profile.setUserInfo(userNewData);
    popupUserInfo.close();
  }
});

popupUserInfo.setEventListeners();

profileEditButton.addEventListener('click', function () {
  popupUserInfo.open(); 
  const userData = profile.getUserInfo();
  popupUserInfo.setInputValues(userData);
  validationProfile.resetValidation()
}); 

profileAddButton.addEventListener('click', function () {
  popupAddCard.open(); 
  validationMesto.resetValidation()}); 

const validationProfile = new FormValidator(enableValidationClasses, popupProfileForm);
const validationMesto = new FormValidator(enableValidationClasses, popupMestoForm);

validationProfile.enableValidation();
validationMesto.enableValidation();