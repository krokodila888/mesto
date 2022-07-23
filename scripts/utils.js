/*В слаке на вопрос о том, дублировать код для общих функций или импортировать его из index.js направо и налево наставник написал, что можно создать четвертый файл*/
const popupPhoto = document.querySelector('.popup_photo');
const popupImage = popupPhoto.querySelector('.popup__image');

export function closePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByKey);
  element.removeEventListener('mousedown', closeByClick);
};
  
export function openPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByKey);
  element.addEventListener('mousedown', closeByClick);
};
  
export function closeByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
  
export function closeByKey(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

export const openPhoto = function(element) {
  openPopup(popupPhoto);
  const cardName = element.querySelector('.element__text');
  const cardPhoto = element.querySelector('.element__photo');
  popupPhoto.querySelector('.popup__image-text').textContent = cardName.textContent;
  popupImage.src = cardPhoto.src;
  popupImage.alt = cardName.textContent;
};