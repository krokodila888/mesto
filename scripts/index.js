import { Card } from './components/Card.js';
import { closePopup } from './utils.js';
import { FormValidator } from './components/FormValidator.js';
import { initialCards } from './initialCards.js';
import { Section } from './components/Section.js';
import { Popup } from './components/Popup.js';
import { PopupWithImage } from './components/PopupWithImage.js';

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
const nameText = document.querySelector('.profile__username');
const statusText = document.querySelector('.profile__status');
const profileAddButton = document.querySelector('.profile__add-button');
const photoLinkInput = document.querySelector('.popup__input_photo-link');
const photoNameInput = document.querySelector('.popup__input_photo-name');
const cardsHolder = '.elements';
const popupMestoForm = document.querySelector('.popup__mesto-form-container');
const popupProfileForm = document.querySelector('.popup__profile-form-container');
export const cardSelector = '.template-element';
const popupPhoto = document.querySelector('.popup_photo');
const popupImage = popupPhoto.querySelector('.popup__image');


const popup2 = new Popup(popupMesto);
const popup1 = new Popup(popupProfile);

function handleCardClick(element) {
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  const popup3 = new PopupWithImage(popupPhoto, cardName, cardPhoto)
  console.log(popup3);
  popup3.open();
  popupPhoto.querySelector('.popup__image-text').textContent = cardName.textContent;
  popupImage.src = cardPhoto.src;
  popupImage.alt = cardName.textContent;
};

const cardList = new Section({ data: initialCards, renderer: (item) => {
  const card = new Card(item.name, item.link, cardSelector, { handleCardClick });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
} }, cardsHolder);
cardList.renderItem();

/*


const cardList = new Section( { initialCards }, cardsHolder);
console.log(cardList)
cardList.renderItem();*/

/*тут кнопка редактирования профиля*/
function editProfile() {
  popup1.open();
 // popup1.setEventListeners();
  nameInput.value = nameText.textContent;
  jobInput.value = statusText.textContent;
  validationProfile.resetValidation();
};
profileEditButton.addEventListener('click', editProfile); 
//общая функция кнопок закрытия
const buttonsClose = document.querySelectorAll('.popup__close-button');
for (const button of buttonsClose) 
  button.addEventListener('click', () => closePopup(button.closest('.popup')));

popupProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  statusText.textContent = jobInput.value;
  popup1.close();
});

/*открытие попапа добавления фото*/
function addMesto() {
  popup2.open();
  popupMestoForm.reset();
  validationMesto.resetValidation();
};
profileAddButton.addEventListener('click', addMesto); 

popupMestoForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const card1 = new Card(photoNameInput.value, photoLinkInput.value, cardSelector, { handleCardClick });
  const cardElement1 = card1.generateCard();
  cardList.addItem(cardElement1);
  popup2.close();});
/*
    const card = new Card(item.name, item.link, cardSelector
  } }, cardsHolder);/* renderer: (item) => {
    const card = new Card(item.name, item.link, cardSelector/*,  { handleCardClick: (item) => {
      const cardName = item.querySelector('.element__text');
      const cardPhoto = item.querySelector('.element__photo');
      const popup3 = new PopupWithImage(popupPhoto, cardName, cardPhoto);
      popup3.open();}})
      const cardElement = card.generateCard();
      this.addItem(cardElement)}}, cardsHolder);
      console.log(element1)
      element1.renderItem();*/
      
     
    

const validationProfile = new FormValidator(enableValidationClasses, popupProfileForm);
const validationMesto = new FormValidator(enableValidationClasses, popupMestoForm);

validationProfile.enableValidation();
validationMesto.enableValidation();

