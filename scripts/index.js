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
const popupMestoForm = document.querySelector(".popup__mesto-form-container");
const popupProfileForm = document.querySelector(".popup__profile-form-container");
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

const createCard = function(cardText, cardUrl) {
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
    newCard.querySelector('.element__text').textContent = cardText;
    newCard.querySelector('.element__photo').setAttribute('src', cardUrl);  
  cardsHolder.prepend(newCard);
  return newCard;
};

function renderCard(photoLinkInput, photoNameInput) {
  cardsHolder.prepend(createCard(photoNameInput, photoLinkInput));
};

initialCards.forEach(function (element) {
  cardsHolder.prepend(createCard(element.name, element.link));
});

/*тут кнопка редактирования профиля*/
function editProfile() {
  openPopup(popupProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = statusText.textContent;
};
editProfileButton.addEventListener('click', editProfile); 

const closeButtons = document.querySelectorAll('.popup__close-button');
for (const button of closeButtons) 
  button.addEventListener('click', () => button.closest('.popup').classList.remove('popup_opened'));

popupProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameText.textContent = nameInput.value;
  statusText.textContent = jobInput.value;
  closePopup(popupProfile);
});

/*открытие попапа добавления фото*/
function addMesto() {
  openPopup(popupMesto);
  photoLinkInput.value = '';
  photoNameInput.value = '';
  };
addCardButton.addEventListener('click', addMesto); 

popupMestoForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(photoLinkInput.value, photoNameInput.value);
  closePopup(popupMesto);
});

