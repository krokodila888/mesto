import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import { initialCards } from './initialCards.js';
import { Section } from './components/Section.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import './pages/index.css';

const enableValidationClasses = ({
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
  inputErrorBorder: 'popup__input-border',
  }
);

const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const popupMesto = document.querySelector('.popup_mesto');
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_status');
const profileAddButton = document.querySelector('.profile__add-button');
const photoLinkInput = document.querySelector('.popup__input_photo-link');
const photoNameInput = document.querySelector('.popup__input_photo-name');
const cardsHolder = '.elements';
const popupMestoForm = document.querySelector('.popup__mesto-form-container');
const popupProfileForm = document.querySelector('.popup__profile-form-container');
export const cardSelector = '.template-element';
const popupPhoto = document.querySelector('.popup_photo');
const popupImage = popupPhoto.querySelector('.popup__image');
const nameSelector = document.querySelector('.profile__username');
const statusSelector = document.querySelector('.profile__status');
const userInfo = ({userName: nameSelector, userText: statusSelector});
const profile = new UserInfo(userInfo);

function handleCardClick(element) {
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  const popupPicture = new PopupWithImage(popupPhoto, cardName, cardPhoto)
  popupPicture.open();
  popupPicture.setEventListeners();
  popupPhoto.querySelector('.popup__image-text').textContent = cardName.textContent;
  popupImage.src = cardPhoto.src;
  popupImage.alt = cardName.textContent;
};

const cardList = new Section({ 
  data: initialCards, renderer: (item) => {
    const card = new Card(item.name, item.link, cardSelector, { handleCardClick });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  } 
}, cardsHolder);
cardList.renderItem();

const popupAddCard = new PopupWithForm(popupMesto, { 
  callback: (evt) => {
    evt.preventDefault();
    const card = new Card(photoNameInput.value, photoLinkInput.value, cardSelector, { handleCardClick });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
});

const popupUserInfo = new PopupWithForm(popupProfile, { 
  callback: (evt) => {
    evt.preventDefault();
    const userNewData = popupUserInfo.getInputValues();
    profile.setUserInfo(userNewData);
    popupUserInfo.close();
  }
});

profileEditButton.addEventListener('click', function () {
  popupUserInfo.open(); 
  popupUserInfo.setEventListeners();
  const userData = profile.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userText;
  validationProfile.resetValidation()}); 

profileAddButton.addEventListener('click', function () {
  popupAddCard.open(); 
  popupAddCard.setEventListeners();
  validationMesto.resetValidation()}); 

const validationProfile = new FormValidator(enableValidationClasses, popupProfileForm);
const validationMesto = new FormValidator(enableValidationClasses, popupMestoForm);

validationProfile.enableValidation();
validationMesto.enableValidation();

