<<<<<<< HEAD
import { Card } from './Card.js';
import { closePopup, openPopup } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

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
const cardsHolder = document.querySelector('.elements');
const popupMestoForm = document.querySelector('.popup__mesto-form-container');
const popupProfileForm = document.querySelector('.popup__profile-form-container');

const createCard = function(cardText, cardUrl, cardSelector='.template-element') {
  const card = new Card(cardText, cardUrl, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
};

function renderCard(element) {
  cardsHolder.prepend(element);
};

initialCards.forEach((item) => {
  renderCard(createCard(item.name, item.link));
  }
);

/*тут кнопка редактирования профиля*/
function editProfile() {
  openPopup(popupProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = statusText.textContent;
  validationProfile.resetValidation();
};
profileEditButton.addEventListener('click', editProfile); 

const buttonsClose = document.querySelectorAll('.popup__close-button');
for (const button of buttonsClose) 
  button.addEventListener('click', () => closePopup(button.closest('.popup')));

popupProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  statusText.textContent = jobInput.value;
  closePopup(popupProfile);
});

/*открытие попапа добавления фото*/
function addMesto() {
  openPopup(popupMesto);
  popupMestoForm.reset();
  validationMesto.resetValidation();
};
profileAddButton.addEventListener('click', addMesto); 

popupMestoForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(createCard(photoNameInput.value, photoLinkInput.value));
  closePopup(popupMesto);
  /*evt.target.reset() при сабмите - отличная идея, спасибо. Но пришлось оставить reset на открытии: при закрытии формы без сабмита "черновик" оставался на месте*/
});

const validationProfile = new FormValidator(enableValidationClasses, popupProfileForm);
const validationMesto = new FormValidator(enableValidationClasses, popupMestoForm);

validationProfile.enableValidation();
validationMesto.enableValidation();

=======
import { Card } from './Card.js';
import { closePopup, openPopup } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

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
const cardsHolder = document.querySelector('.elements');
const popupMestoForm = document.querySelector('.popup__mesto-form-container');
const popupProfileForm = document.querySelector('.popup__profile-form-container');

const createCard = function(cardText, cardUrl, cardSelector='.template-element') {
  const card = new Card(cardText, cardUrl, cardSelector);
  const cardElement = card.generateCard();
  return cardElement;
};

function renderCard(element) {
  cardsHolder.prepend(element);
};

initialCards.forEach((item) => {
  renderCard(createCard(item.name, item.link));
  }
);

/*тут кнопка редактирования профиля*/
function editProfile() {
  openPopup(popupProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = statusText.textContent;
  validationProfile.resetValidation();
};
profileEditButton.addEventListener('click', editProfile); 

const buttonsClose = document.querySelectorAll('.popup__close-button');
for (const button of buttonsClose) 
  button.addEventListener('click', () => closePopup(button.closest('.popup')));

popupProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  statusText.textContent = jobInput.value;
  closePopup(popupProfile);
});

/*открытие попапа добавления фото*/
function addMesto() {
  openPopup(popupMesto);
  popupMestoForm.reset();
  validationMesto.resetValidation();
};
profileAddButton.addEventListener('click', addMesto); 

popupMestoForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(createCard(photoNameInput.value, photoLinkInput.value));
  closePopup(popupMesto);
  /*evt.target.reset() при сабмите - отличная идея, спасибо. Но пришлось оставить reset на открытии: при закрытии формы без сабмита "черновик" оставался на месте*/
});

const validationProfile = new FormValidator(enableValidationClasses, popupProfileForm);
const validationMesto = new FormValidator(enableValidationClasses, popupMestoForm);

validationProfile.enableValidation();
validationMesto.enableValidation();

>>>>>>> 27b3935dc5ca766894c64d777358fe21076411ce
