import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  setEventListeners () {

  }

  _getInputValues() {

  };

 

  }


/*Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять 
обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
Для каждого попапа создавайте свой экземпляр класса PopupWithForm.*/