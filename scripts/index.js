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
const newCard = document.querySelector('.element');

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

initialCards.forEach(function (element) {
  const templateBlock = document.querySelector('.template-element').content;
  const cardsHolder1 = document.querySelector('.elements');
  const blockToClone = templateBlock.querySelector('.element').cloneNode(true);
  blockToClone.querySelector('.element__text').textContent = element.name; 
  blockToClone.querySelector('.element__photo').src = element.link;
  cardsHolder1.prepend(blockToClone);});

function editProfile() {popupProfile.classList.add('popup_opened')};
editButton.addEventListener('click', editProfile); 


const cardRemoveButtons = document.querySelectorAll('.element__remove-button');
for (const button of cardRemoveButtons) {
  button.addEventListener('click', () => button.closest('.element').remove());
}

const likeButtons = document.querySelectorAll('.element__like-button');
for (const button of likeButtons) {button.addEventListener ('click', function (e) {e.target.classList.toggle('element__like-button_active')})};


let closeButtons = document.querySelectorAll('.popup__close-button');
console.log(closeButtons);
for (const button of closeButtons) {
button.addEventListener('click', () => button.closest('.popup').classList.remove('popup_opened'));
}



function closeProfilePopup() {popupProfile.classList.remove('popup_opened');
nameInput.value = nameText.textContent;
jobInput.value = statusText.textContent;
}
closeButton.addEventListener('click', closeProfilePopup); 

const profileSaveButton = document.querySelector('.popup__profile-save-button');
profileSaveButton.onclick = function (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  statusText.textContent = jobInput.value;
  closeProfilePopup();
};
  


function editMesto() {popupMesto.classList.add('popup_opened')};
addButton.addEventListener('click', editMesto); 

const renderCardButton = document.querySelector('.popup_add-card-button');
const cardName = document.querySelector('.element__text');
const cardPhoto = document.querySelector('.element__photo');
const closeButtonMesto = document.querySelector('.popup__mesto-close-button');
const photoLinkInput = document.querySelector('.popup__input_photo-link');
const photoNameInput = document.querySelector('.popup__input_photo-name');

function closeMestoPopup() {
  popupMesto.classList.remove('popup_opened');
  photoNameInput.value = "";
  photoLinkInput.value = "";
}
closeButtonMesto.addEventListener('click', closeMestoPopup); 


function addCard(photoLinkInput, photoNameInput) {
  const templateBlock = document.querySelector('.template-element').content;
  const cardsHolder = document.querySelector('.elements');
  const blockToClone = templateBlock.querySelector('.element').cloneNode(true);
  blockToClone.querySelector('.element__like-button').addEventListener('click', function (evt) {evt.target.classList.toggle('element__like-button_active');}); 
  blockToClone.querySelector('.element__remove-button').addEventListener('click', function (evt) {evt.target.closest('.element').remove();}); 
   
  blockToClone.querySelector('.element__text').textContent = photoNameInput;
  blockToClone.querySelector('.element__photo').setAttribute('src', photoLinkInput);
  cardsHolder.prepend(blockToClone);
}

  
renderCardButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  const photoLinkInput = document.querySelector('.popup__input_photo-link');
  const photoNameInput = document.querySelector('.popup__input_photo-name');
  addCard(photoLinkInput.value, photoNameInput.value);
     
  photoLinkInput.value = '';
  photoNameInput.value = '';
  closeMestoPopup()
});
  for (const button of cardRemoveButtons) {
  button.addEventListener('click', () => button.closest('.element').remove());
};


 

