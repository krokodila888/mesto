const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const popupMesto = document.querySelector('.popup_mesto');
const nameInput = document.querySelector('.popup__input_username');
const jobInput = document.querySelector('.popup__input_status');
const nameText = document.querySelector('.profile__username');
const statusText = document.querySelector('.profile__status');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCardButton = document.querySelector('.popup__add-card-button');
const photoLinkInput = document.querySelector('.popup__input_photo-link');
const photoNameInput = document.querySelector('.popup__input_photo-name');
const cardsHolder = document.querySelector('.elements');
const popupPhoto = document.querySelector('.popup_photo');
const profileSaveButton = document.querySelector('.popup__profile-save-button');
const popupMestoForm = document.querySelector(".popup__mesto-form-container");
const popupProfileForm = document.querySelector(".popup__profile-form-container");
const elementTemplateBlock = document.querySelector('.template-element');

function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByKey);
  element.removeEventListener('mousedown', closeByClick);
};

function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByKey);
  element.addEventListener('mousedown', closeByClick);
};

function closeByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

function closeByKey(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

const openPhoto = function(element) {
  openPopup(popupPhoto);
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  popupPhoto.querySelector('.popup__image-text').textContent = cardName.textContent;
  popupPhoto.querySelector('.popup__image').src = cardPhoto.src;
  popupPhoto.querySelector('.popup__image').alt = cardName.textContent;
};

const createCard = function(cardText, cardUrl) {
  const elementNewCard = elementTemplateBlock.content.querySelector('.element').cloneNode(true);
  const cardPhoto = elementNewCard.querySelector('.element__photo');
  cardPhoto.addEventListener('click', function (e) {
    openPhoto(e.target.closest(".element"))
  });
  elementNewCard.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  }); 
  elementNewCard.querySelector('.element__remove-button').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  }); 
  elementNewCard.querySelector('.element__text').textContent = cardText;
    cardPhoto.setAttribute('src', cardUrl);
    cardPhoto.setAttribute('alt', cardText); 
   return elementNewCard;
};

function renderCard(element) {
  cardsHolder.prepend(element);
};

initialCards.forEach(function (element) {
  renderCard(createCard(element.name, element.link));
});

/*тут кнопка редактирования профиля*/
function editProfile() {
  openPopup(popupProfile);
  nameInput.value = nameText.textContent;
  jobInput.value = statusText.textContent;
  popupProfile.querySelector('.input-username-error').textContent = "";
  popupProfile.querySelector('.input-status-error').textContent = ""; 
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
  photoLinkInput.value = '';
  photoNameInput.value = '';
  popupCardButton.disabled = true;
  popupCardButton.classList.add('popup__save-button_disabled');
  popupMesto.querySelector('.input-photo-name-error').textContent = "";
  popupMesto.querySelector('.input-photo-link-error').textContent = "";
};
profileAddButton.addEventListener('click', addMesto); 

popupMestoForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(createCard(photoNameInput.value, photoLinkInput.value));
  closePopup(popupMesto);
});




