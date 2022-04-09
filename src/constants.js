export const popups = document.querySelectorAll('.popup'); //все попапы
export const profileEditBtn = document.querySelector('.profile__edit-btn'); //кнопка изменения профиля
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__about');
export const profilePhoto = document.querySelector('.profile__photo-container');
export const inputUserName = document.querySelector(
  '.popup__input[name="name"]'
); //поле ввода в форме изменениия профиля имя
export const inputAbout = document.querySelector('.popup__input[name="about"]'); //поле ввода в форме изменениия профиля инфо
export const popupFormProfileEdit = document.querySelector(
  '.popup__form[name="profile_edit"]'
); //форма изменения профиля
export const profileAddBtn = document.querySelector('.profile__add-btn'); //кнопка добавления фото

export const popupFormElementAdd = document.querySelector(
  '.popup__form[name="element_add"]'
); //кнопка сабмит в форме добавления карточки

export const popupFormAvatarChange = document.querySelector(
  '.popup__form[name="change-avatar"]'
);
// селектор темплейта
export const TEMPLATE_SELECTOR = '#elements-template';

//объявление конфигурации для валидации попапов
export const popupFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};