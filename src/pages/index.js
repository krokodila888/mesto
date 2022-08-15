import { Card } from '../components/Card.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { bazeUrl, authorization, removeConfirmForm, removeConfirmButton, popupRemoveSelector, userAvatar, avatarSelector, inputAvatar, popupAvatarForm, popupAvatarSelector, enableValidationClasses, profileEditButton, popupProfileSelector, popupMestoSelector, profileAddButton, cardsHolder, popupMestoForm, popupProfileForm, cardSelector, popupPhotoSelector, nameSelector, statusSelector } from '../utils/constants.js';
import './index.css';

let userID;

//попапы и классы
const api = new Api({ bazeUrl, authorization });
const profile = new UserInfo(nameSelector, statusSelector, avatarSelector);
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
    profile.setAvatarInfo(user);
    cardList.renderItem(card.reverse())})
  .catch(err => console.log(err))
  
//удаление карточки: попап, листенеры, открытие, удаление
const popupRemoveCard = new PopupWithConfirmation(popupRemoveSelector, handleConfirm);
popupRemoveCard.setEventListeners();

function confirmRemoving(data, element) {
  popupRemoveCard.open(data, element)
}

//подтверждение удаления и удаление
function handleConfirm(data, element) {
  popupRemoveCard.renderLoading(true);
  api.removeCard(data)
    .then((res) => {
      element.remove();
      popupRemoveCard.close()
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupRemoveCard.renderLoading(false)
    })
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
    popupUserInfo.renderLoading(true)
    const userNewData = popupUserInfo.getInputValues();
    api.editUserInfo(userNewData)
      .then((res) => {
        profile.setUserInfo(res);
        popupUserInfo.close();
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupUserInfo.renderLoading(false)
      })
  }
});

//попап с аватаром    
const popupAvatar = new PopupWithForm(popupAvatarSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    popupAvatar.renderLoading(true);
    const userNewAvatar = popupAvatar.getInputValues();
    api.changeAvatar(userNewAvatar.avatar)
      .then((res) => {
        profile.setAvatarInfo(res);
        popupAvatar.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupAvatar.renderLoading(false)
      })
  }
});
popupAvatar.setEventListeners();

//попап добавления карточки
const popupAddCard = new PopupWithForm(popupMestoSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    popupAddCard.renderLoading(true);
    const inputValues = popupAddCard.getInputValues();
    //handleSubmitCard(inputValues);
    api.postNewCard(inputValues)
      .then(res => {
        const card = createCard(res);
        cardList.addItem(card);
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err)})
      .finally(() => {
      popupAddCard.renderLoading(false);
    })
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