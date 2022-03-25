import './styles/index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import {
  popupFormProfileEdit,
  popupFormElementAdd,
  profileName,
  profileAbout,
  profileEditBtn,
  profileAddBtn,
  initialCards,
  TEMPLATE_SELECTOR,
  popupFormConfig,
} from './constants.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';
import { Section } from './components/Section.js';

//Генерация карточек на страницу

function renderNewCard(name, link) {
  const card = new Card(name, link, TEMPLATE_SELECTOR, () =>
    popupWithImage.open(link, name)
  );
  const newCard = card.renderCard();
  return newCard;
}

const cardList = new Section({
    items: initialCards,
    renderer: ({ name, link }) => {
      const card = renderNewCard(name, link);
      cardList.addItemAppend(card);
    },
  },
  '.elements'
);
cardList.renderItems();

//созданиие экземлпяра класса UserInfo
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
});

//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// Смена информации в профииле

const profileEditPopup = new PopupWithForm('#popup_profile_edit', (formData) =>
  userInfo.setUserInfo(formData)
);
profileEditPopup.setEventListeners();

//функция открытия попапа редактирования профиля

function openProfileEditPopup() {
  const userData = {
    'user-name': profileName.textContent,
    about: profileAbout.textContent,
  };
  profileEditPopup.open(userData);
}
profileEditBtn.addEventListener('click', openProfileEditPopup);

// ПОПАП ДОБАВЛЕНИЯ ФОТО
//создаем экземляр класса PopupWithForm для попапа добавлениия фото и передаем коллбэк для сабмита
const elementAddPopup = new PopupWithForm('#popup_element_add', (formData) => {
  const newCard = renderNewCard(formData['photo-name'], formData['photo-link']);
  cardList.addItemPrepend(newCard);
});
elementAddPopup.setEventListeners();

//функция открытия попапа добавлениия фото
function openElementAddPopup() {
  elementAddValidator.disableButton();
  elementAddPopup.open();
}
//открытие попапа добавления фото по кнопке
profileAddBtn.addEventListener('click', openElementAddPopup);

//ПОПАП С КАРТИНКОЙ
const popupWithImage = new PopupWithImage('#popup_image-popup');
popupWithImage.setEventListeners();

//ВАЛИДАЦИЯ ФОРМ//

const profileEditValidator = new FormValidator(
  popupFormConfig,
  popupFormProfileEdit
);
profileEditValidator.enableValidation();
const elementAddValidator = new FormValidator(
  popupFormConfig,
  popupFormElementAdd
);
elementAddValidator.enableValidation();