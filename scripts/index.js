const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popupProfile = document.querySelector('.popup_profile');
const popup = document.querySelectorAll('.popup');
const popupMesto = document.querySelector('.popup_mesto');
const saveButton = document.querySelector('.popup__save-button');
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_status');
const nameText = document.querySelector('.profile__username');
const statusText = document.querySelector('.profile__status');
const addButton = document.querySelector('.profile__add-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function editProfile() {popupProfile.classList.add('popup_opened')};
editButton.addEventListener('click', editProfile); 

let closeButtons = document.querySelectorAll('.popup__close-button');
console.log(closeButtons);
for (const button of closeButtons) {
button.addEventListener('click', () => button.closest('.popup').classList.remove('popup_opened'));
}

function closeProfile() {popupProfile.classList.remove('popup_opened');
nameInput.value = nameText.textContent;
jobInput.value = statusText.textContent;
}
closeButton.addEventListener('click', closeProfile); 

let formElement = document.querySelector('.popup__save-button');

formElement.onclick = function (evt) {
    evt.preventDefault();
    nameText.textContent = nameInput.value;
    statusText.textContent = jobInput.value;
    closeProfile();
  };

 let likeButtons = document.querySelectorAll('.element__like-button');
  for (const button of likeButtons) {
  button.addEventListener('click', () => button.classList.toggle('element__like-button_active'));
}

function editMesto() {popupMesto.classList.add('popup_opened')};
addButton.addEventListener('click', editMesto); 


