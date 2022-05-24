let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let saveButton = document.querySelector('.popup__save-button');
let nameInput = document.querySelector('.popup__form-username');
let jobInput = document.querySelector('.popup__form-status');
let nameText = document.querySelector('.profile__username');
let statusText = document.querySelector('.profile__status');

function editProfile() {popup.classList.add('popup_opened')};
editButton.addEventListener('click', editProfile); 

function closeProfile() {popup.classList.remove('popup_opened');
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
