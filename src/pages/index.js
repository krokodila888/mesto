import { Card } from '../components/Card.js';
import { PopupRemove } from '../components/PopupRemove.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { bazeUrl, authorization, id, removeConfirmForm, removeConfirmButton, popupRemoveSelector, userAvatar, inputAvatar, popupAvatarForm, popupAvatarSelector, enableValidationClasses, profileEditButton, popupProfileSelector, popupMestoSelector, profileAddButton, cardsHolder, popupMestoForm, popupProfileForm, cardSelector, popupPhotoSelector, nameSelector, statusSelector } from '../utils/constants.js';
import './index.css';

let userID;
userID = id;
console.log(userID);

//попапы и классы
const api = new Api({ bazeUrl, authorization });
const userInfo = ({name: nameSelector, about: statusSelector});
const profile = new UserInfo(userInfo);
const popupPicture = new PopupWithImage(popupPhotoSelector);
popupPicture.setEventListeners();

//создание карточки
function createCard(item) {
  const card = new Card(item.name, item.link, cardSelector, item.likes, /**/ item.owner, item._id, userID,/**/ { handleCardClick },  { setLikes }, { deleteLikes }, item._id, { confirmRemoving });
  const cardElement = card.generateCard();
return cardElement;
}
//пробуем Промис.олл
/*Promis.all([api.getProfileInfo(), api.getInitialCards()])
  .then([user, card] => {

    userID = user._id;
    profile.setUserInfo(user);
    userAvatar.src = user.avatar;
    inputAvatar.value = user.avatar;
    const cardList = new Section({ 
      data: card, renderer: (card) => {
        const cardElement = createCard(card);
      } 
    }, cardsHolder);
    cardList.renderItem(card.reverse())
    .catch(err => console.log(err))
  });*/

//удаление карточки: попап, листенеры, открытие, удаление
const popupRemoveCard = new PopupRemove(popupRemoveSelector, handleConfirm);
popupRemoveCard.setEventListeners();

function confirmRemoving(data, element) {
  popupRemoveCard.open(data, element)
}

function handleConfirm(data, element) {
  popupRemoveCard.renderLoading(true);
  api.removeCard(data);
  element.remove();
  popupRemoveCard.renderLoading(false);
  popupRemoveCard.close();
}

//лайки и дизлайки
function setLikes(data) {
  api.likeCard(data)
  /*.then((res) => {
    console.log(res);
  })
.catch((err) => {
  console.log(err);
})
.finally(() => {
  console.log('iiiiiii');
})*/
}

function deleteLikes(data) {
  api.dislikeCard(data)
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

//получение данных пользователя
api.getProfileInfo()
  .then(res => {return res})
  .then(data => {
    profile.setUserInfo(data);
    userAvatar.src = data.avatar;
    inputAvatar.value = data.avatar})

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

//получение стартовых карточек (все работает)
api.getInitialCards()
  .then(res => {return res})
  .then(items => {
    const cardList = new Section({ 
      data: items, renderer: (item) => {
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
      } 
    }, cardsHolder);
    cardList.renderItem(items.reverse());
  })

  /*function handleSubmitCard(data) {
    api.postNewCard(data).then(res => {
      const card = createCard(res);
      cardList.addItem(card)
    })
    .catch((err) => {
      console.log(err);
    })
  }*/

  //тут все работает: добавление новой карточки
/*const popupAddCard = new PopupWithForm(popupMestoSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    popupAddCard.renderLoading(true);
    const inputValues = popupAddCard.getInputValues();
    inputValues.likes = [];
    api.postNewCard(inputValues)
    //  .then(result => {return result});
          /*.then(obj => {return obj})
      //.then(res => {console.log(res)}
    const cardElement = createCard(inputValues);
    popupAddCard.renderLoading(false);
    const cardList = new Section({ 
      data: inputValues, renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    } 
  }, cardsHolder);
	  cardList.addItem(cardElement);
    popupAddCard.close();
  }
});
*/

function handleSubmitCard(data) {
  api.postNewCard(data).then(res => {
    const card = createCard(res);
    cardList.addItem(card)
  })
  .catch((err) => {
    console.log(err);
  })
}

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
/*
const cardPopup = '.popup_type_add-card';
const popupCardWithForm = new PopupWithForm({
  popupSelector: cardPopup,
  callbackSubmitForm: (evt, data) => {
    evt.preventDefault();
    popupCardWithForm.renderLoading(true);
    api.createCard(data)
      .then((data) => {
        const createdCard = createCard(data)
        section.addItemPrepend(createdCard);
        popupCardWithForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupCardWithForm.renderLoading(false);
      })
  }
})
popupCardWithForm.setEventListeners();*/

/*function addNewCard(inputValues) {
  popupAddCard.renderLoading(true);
  api.postNewCard(inputValues)
  .then(res => {return res})

    .then(cardElement => {
  const newCard = createCard(cardElement);
  const cardList = new Section({ 
    data: inputValues, renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  } 
}, cardsHolder);
  cardList.addItem(cardElement);
  popupAddCard.close();
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(res => {
      popupAddCard.renderLoading(false);
    })
};

const popupAddCard = new PopupWithForm(popupMestoSelector, { 
  callback: (evt) => {
    evt.preventDefault();
    const inputValues = popupAddCard.getInputValues();
    addNewCard(inputValues);}})*/


    //  .then(result => {return result});
          /*.then(obj => {return obj})
      .then(res => {console.log(res)}
    const cardElement = createCard(inputValues);
    popupAddCard.renderLoading(false);
    const cardList = new Section({ 
      data: inputValues, renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    } 
  }, cardsHolder);
	  cardList.addItem(cardElement);
    popupAddCard.close();
  }
});*/


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

