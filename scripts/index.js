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
const renderCardButton = document.querySelector('.popup__add-card-button');
const cardName = document.querySelector('.element__text');
const cardPhoto = document.querySelector('.element__photo');
const closeButtonMesto = document.querySelector('.popup__mesto-close-button');
const photoLinkInput = document.querySelector('.popup__input_photo-link');
const photoNameInput = document.querySelector('.popup__input_photo-name');
const cardsHolder = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_photo');

/*отсюда создаются начальные карточки*/
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

const openPhoto = function(element) {
  popupPhoto.classList.add('popup_opened');
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  popupPhoto.querySelector('.popup__image-text').textContent = cardName.textContent;
  popupPhoto.querySelector('.popup__image').src = cardPhoto.src;
};

initialCards.forEach(function (element) {
  const templateBlock = document.querySelector('.template-element').content;
  const blockToClone = templateBlock.querySelector('.element').cloneNode(true);
  blockToClone.querySelector('.element__photo').addEventListener('click', function (e) {
  openPhoto(e.target.closest(".element"))});
  blockToClone.querySelector('.element__like-button').addEventListener('click', function (evt) {evt.target.classList.toggle('element__like-button_active');}); 
  blockToClone.querySelector('.element__remove-button').addEventListener('click', function (evt) {evt.target.closest('.element').remove();}); 
  blockToClone.querySelector('.element__text').textContent = element.name; 
  blockToClone.querySelector('.element__photo').src = element.link;
  cardsHolder.prepend(blockToClone);});

/*тут кнопка редактирования профиля*/
function editProfile() {popupProfile.classList.add('popup_opened')};
editButton.addEventListener('click', editProfile); 

/*тут общее правило для закрывающих кнопок*/
let closeButtons = document.querySelectorAll('.popup__close-button');
for (const button of closeButtons) {
button.addEventListener('click', () => button.closest('.popup').classList.remove('popup_opened'));}

/*а тут - без сохранения значения для профиля*/
function closeProfilePopup() {popupProfile.classList.remove('popup_opened');
nameInput.value = nameText.textContent;
jobInput.value = statusText.textContent;}
closeButton.addEventListener('click', closeProfilePopup); 

/*сохранение изменений в профиле*/
const profileSaveButton = document.querySelector('.popup__profile-save-button');
profileSaveButton.onclick = function (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  statusText.textContent = jobInput.value;
  closeProfilePopup();
};

/*открытие попапа добавления фото*/
function editMesto() {popupMesto.classList.add('popup_opened')};
addButton.addEventListener('click', editMesto); 

/*его закрытие с обнулением инпутов*/
function closeMestoPopup() {
  popupMesto.classList.remove('popup_opened');
  photoNameInput.value = "";
  photoLinkInput.value = "";
}
closeButtonMesto.addEventListener('click', closeMestoPopup); 

/*добавление карточки*/
function addCard(photoLinkInput, photoNameInput) {
  const templateBlock = document.querySelector('.template-element').content;
  const blockToClone = templateBlock.querySelector('.element').cloneNode(true);
  blockToClone.querySelector('.element__like-button').addEventListener('click', function (evt) {evt.target.classList.toggle('element__like-button_active');}); 
  blockToClone.querySelector('.element__remove-button').addEventListener('click', function (evt) {evt.target.closest('.element').remove();}); 
  blockToClone.querySelector('.element__text').textContent = photoNameInput;
  blockToClone.querySelector('.element__photo').setAttribute('src', photoLinkInput);
  blockToClone.querySelector('.element__photo').addEventListener('click', function (e) {
    openPhoto(e.target.closest(".element"))});
  cardsHolder.prepend(blockToClone);
}

renderCardButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  addCard(photoLinkInput.value, photoNameInput.value);
  photoLinkInput.value = '';
  photoNameInput.value = '';
  closeMestoPopup()
});
