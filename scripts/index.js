const editProfileButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const popupMesto = document.querySelector('.popup_mesto');
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_status');
const nameText = document.querySelector('.profile__username');
const statusText = document.querySelector('.profile__status');
const addCardButton = document.querySelector('.profile__add-button');
const renderCardButton = document.querySelector('.popup__add-card-button');
const photoLinkInput = document.querySelector('.popup__input_photo-link');
const photoNameInput = document.querySelector('.popup__input_photo-name');
const cardsHolder = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_photo');
const profileSaveButton = document.querySelector('.popup__profile-save-button');
const inputPhotoForm = document.querySelector(".popup__mesto-form-container");
const inputProfileForm = document.querySelector(".popup__profile-form-container");
const templateBlock = document.querySelector('.template-element');

function closePopup(element) {
  element.classList.remove('popup_opened');
};

function openPopup(element) {
  element.classList.add('popup_opened');
};

const openPhoto = function(element) {
  openPopup(popupPhoto);
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  popupPhoto.querySelector('.popup__image-text').textContent = cardName.textContent;
  popupPhoto.querySelector('.popup__image').src = cardPhoto.src;
};

const createCard = function() {
  const newCard = templateBlock.content.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__photo').addEventListener('click', function (e) {
    openPhoto(e.target.closest(".element"))
});
  newCard.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
}); 
  newCard.querySelector('.element__remove-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
}); 
  cardsHolder.prepend(newCard);
  return newCard;
};

function renderCard(photoLinkInput, photoNameInput) {
  const newCard = createCard();
  newCard.querySelector('.element__text').textContent = photoNameInput;
  newCard.querySelector('.element__photo').setAttribute('src', photoLinkInput);
  cardsHolder.prepend(newCard);
};

initialCards.forEach(function (element) {
  const newCard = createCard();
  newCard.querySelector('.element__text').textContent = element.name; 
  newCard.querySelector('.element__photo').src = element.link;
  cardsHolder.prepend(newCard);
});

/*тут кнопка редактирования профиля*/
function editProfile() {
  openPopup(popupProfile);
};
editProfileButton.addEventListener('click', editProfile); 

const closeButtons = document.querySelectorAll('.popup__close-button');
for (const button of closeButtons) 
  button.addEventListener('click', () => button.closest('.popup').classList.remove('popup_opened'));

/*а тут - без сохранения значения для профиля*/
function closeProfilePopup() {
  closePopup(popupProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = statusText.textContent;
};

inputProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  statusText.textContent = jobInput.value;
  closePopup(popupProfile);
});

/*открытие попапа добавления фото*/
function editMesto() {
  openPopup(popupMesto);
  photoLinkInput.value = '';
  photoNameInput.value = '';};
addCardButton.addEventListener('click', editMesto); 

inputPhotoForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(photoLinkInput.value, photoNameInput.value);
  closePopup(popupMesto);
});

