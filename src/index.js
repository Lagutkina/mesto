import './styles/index.css';
import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
import {
  popupFormProfileEdit,
  popupFormElementAdd,
  profileEditBtn,
  profilePhoto,
  profileAddBtn,
  TEMPLATE_SELECTOR,
  popupFormConfig,
  popupFormAvatarChange,
} from './constants.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { PopupWithConfirm } from './components/PopupWithConfirm.js';
import { UserInfo } from './components/UserInfo.js';
import { Section } from './components/Section.js';
import { Api } from './components/Api.js';

//создаем эксзепляр класса апи для нашей магии

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '8a5e8d02-9c7a-4149-95f9-bcf44b03ae6a',
    'Content-Type': 'application/json',
  },
});

//Функция герерации карточек из класса Card Генерация карточек на страницу

function renderNewCard(cardItem, userId) {
  const card = new Card(
    cardItem,
    TEMPLATE_SELECTOR,
    () => popupWithImage.open(cardItem.link, cardItem.name),
    () => popupWithConfirm.open({ removeCard: card.removeCard.bind(card) }),
    () => api.addLike(cardItem._id),
    () => api.deleteLike(cardItem._id),
    () => api.deleteCard(cardItem._id),
    userId
  );
  const newCard = card.renderCard();
  return newCard;
}

//Добавляем массив карточек с сервера
let cardList;
//созданиие экземлпяра класса UserInfo и получениие информации о пользователе с сервера и добавление карточек с сервера
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  photoSelector: '.profile__photo',
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsFromServer]) => {
    userInfo.setUserInfo(userData);
    userInfo.setProfileImage(userData.avatar); // тут установка данных пользователя
    cardList = new Section({
        items: cardsFromServer,
        renderer: (cardItem) => {
          const card = renderNewCard(cardItem, userData._id);
          cardList.addItemAppend(card);
        },
      },
      '.elements'
    );
    cardList.renderItems(); // и тут отрисовка карточек
  })
  .catch((err) => {
    console.log(err);
  });

//ПОПАП СМЕНЫ АВАТАРКИ
const popupChangeAvatar = new PopupWithForm(
  '#popup_change-avatar',
  (formData) => {
    api
      .updateAvatar(formData.link)
      .then(() => {
        userInfo.setProfileImage(formData.link);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(err);
        popupChangeAvatar.resetButton();
      });
  }
);
popupChangeAvatar.setEventListeners();
//открытие попапа смены автарки
function openPopupChangeAvatar() {
  changeAvatarValidator.disableButton();
  popupChangeAvatar.open();
}

profilePhoto.addEventListener('click', openPopupChangeAvatar);

//ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ

// Смена информации в профииле и отправка новой информации о профиле на сервер

const profileEditPopup = new PopupWithForm(
  '#popup_profile_edit',
  (formData) => {
    api
      .updateProfile(formData.name, formData.about)
      .then(() => {
        userInfo.setUserInfo(formData);
        profileEditPopup.close();
      })
      .catch((err) => {
        console.log(err);
        profileEditPopup.resetButton();
      });
  }
);
profileEditPopup.setEventListeners();

//функция открытия попапа редактирования профиля

function openProfileEditPopup() {
  profileEditPopup.open(userInfo.getUserInfo());
}
profileEditBtn.addEventListener('click', openProfileEditPopup);

// ПОПАП ДОБАВЛЕНИЯ ФОТО Добавление нового фота
//создаем экземляр класса PopupWithForm для попапа добавлениия фото и передаем коллбэк для сабмита
const elementAddPopup = new PopupWithForm('#popup_element_add', (formData) => {
  api
    .addNewCard(formData['photo-name'], formData['photo-link'])
    .then((newCardData) => {
      const newCard = renderNewCard(newCardData, newCardData.owner._id);
      cardList.addItemPrepend(newCard);
      elementAddPopup.close();
    })
    .catch((err) => {
      console.log(err);
      elementAddPopup.resetButton();
    });
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

//ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ
const popupWithConfirm = new PopupWithConfirm(
  '#popup_delete-popup',
  ({ removeCard }) => {
    removeCard()
      .then(() => popupWithConfirm.close())
      .catch((err) => {
        console.log(err);
      });
  }
);
popupWithConfirm.setEventListeners();
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

const changeAvatarValidator = new FormValidator(
  popupFormConfig,
  popupFormAvatarChange
);

changeAvatarValidator.enableValidation();