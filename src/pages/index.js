import { Card } from '../components/Card.js';
import { PopupRemove } from '../components/PopupRemove.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { bazeUrl, authorization, removeConfirmForm, removeConfirmButton, popupRemoveSelector, userAvatar, inputAvatar, popupAvatarForm, popupAvatarSelector, enableValidationClasses, profileEditButton, popupProfileSelector, popupMestoSelector, profileAddButton, cardsHolder, popupMestoForm, popupProfileForm, cardSelector, popupPhotoSelector, nameSelector, statusSelector } from '../utils/constants.js';
import './index.css';

let userID;

//попапы и классы
const api = new Api({ bazeUrl, authorization });
const userInfo = ({name: nameSelector, about: statusSelector});
const profile = new UserInfo(userInfo);
const popupPicture = new PopupWithImage(popupPhotoSelector);
popupPicture.setEventListeners();

//создание карточки
function createCard(item) {
  const card = new Card(item.name, item.link, cardSelector, item.likes, item.owner, item._id, userID, { handleCardClick }, () => {
    api.likeCard(item._id)
      .then((res) => {
        card.setLikesCounter(res)
      })
      .catch((err) => {
        console.log(err);
      })
  }, () => {
    api.dislikeCard(item._id)
      .then((res) => {
        card.setLikesCounter(res)
      })
      .catch((err) => {
        console.log(err);
      })
    }, 
    { confirmRemoving });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section({ 
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  } 
}, cardsHolder);

//пробуем Промис.олл
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([user, card]) => {
    userID = user._id;
    profile.setUserInfo(user);
    userAvatar.src = user.avatar;
    inputAvatar.value = user.avatar;
    cardList.renderItem(card.reverse())})
  .catch(err => console.log(err))
  
//удаление карточки: попап, листенеры, открытие, удаление
const popupRemoveCard = new PopupRemove(popupRemoveSelector, handleConfirm);
popupRemoveCard.setEventListeners();

function confirmRemoving(data, element) {
  popupRemoveCard.open(data, element)
}

//подтверждение удаления и удаление
function handleConfirm(data, element) {
  popupRemoveCard.renderLoading(true);
  api.removeCard(data);
  element.remove();
  popupRemoveCard.renderLoading(false);
  popupRemoveCard.close();
}

//открытие попапа с фото
function handleCardClick(element) {
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  popupPicture.open(cardName, cardPhoto);
};

//попап с данными пользователя
const popupUserInfo = new PopupWithForm(popupProfileSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    const userNewData = popupUserInfo.getInputValues();
    api.editUserInfo(userNewData);
    profile.setUserInfo(userNewData);
    popupUserInfo.close();
  }
});

//попап с аватаром    
const popupAvatar = new PopupWithForm(popupAvatarSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    popupAvatar.renderLoading(true);
    const userNewAvatar = popupAvatar.getInputValues();
    userAvatar.src = userNewAvatar.avatar;
    api.changeAvatar(userNewAvatar.avatar);
    popupAvatar.renderLoading(false);
    popupAvatar.close();
  }
});
popupAvatar.setEventListeners();

//добавление карточки
function handleSubmitCard(data) {
  api.postNewCard(data).then(res => {
    const card = createCard(res);
    cardList.addItem(card)
  })
  .catch((err) => {
    console.log(err);
  })
}

//попап добавления карточки
const popupAddCard = new PopupWithForm(popupMestoSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    popupAddCard.renderLoading(true);
    const inputValues = popupAddCard.getInputValues();
    handleSubmitCard(inputValues);
    popupAddCard.renderLoading(false);
    popupAddCard.close();
  }
});

popupAddCard.setEventListeners();

//слушатель на открытие попапа с аватаркой
userAvatar.addEventListener('click', function () {
  popupAvatar.open();
  inputAvatar.value = userAvatar.src;
  validationAvatar.resetValidation()
});

popupUserInfo.setEventListeners();

//открывается попап редактирования профиля
profileEditButton.addEventListener('click', function () {
  popupUserInfo.open(); 
  const userData = profile.getUserInfo();
  popupUserInfo.setInputValues(userData);
  validationProfile.resetValidation()
}); 

//открывается попап добавления карточки
profileAddButton.addEventListener('click', function () {
  popupAddCard.open(); 
  validationMesto.resetValidation()}); 

//валидация трех форм
const validationProfile = new FormValidator(enableValidationClasses, popupProfileForm);
const validationMesto = new FormValidator(enableValidationClasses, popupMestoForm);
const validationAvatar = new FormValidator(enableValidationClasses, popupAvatarForm);

validationProfile.enableValidation();
validationMesto.enableValidation();
validationAvatar.enableValidation();