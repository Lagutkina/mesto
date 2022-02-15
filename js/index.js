const popups = document.querySelectorAll('.popup'); //все попапы
const profileEditBtn = document.querySelector('.profile__edit-btn'); //кнопка изменения профиля

const popupProfileEdit = document.querySelector('#popup_profile_edit'); //попап изменениия профиля
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputUserName = document.querySelector('.popup__input[name="user-name"]'); //поле ввода в форме изменениия профиля имя
const inputAbout = document.querySelector('.popup__input[name="about"]'); //поле ввода в форме изменениия профиля инфо

const popupFormProfileEdit = document.querySelector(
  '.popup__form[name="profile_edit"]'
); //форма изменения профиля

const elementTemplate = document.querySelector('#elements-template').content; //темплейт
const elements = document.querySelector('.elements'); //грид элементов

const profileAddBtn = document.querySelector('.profile__add-btn'); //кнопка добавления фото
const popupElementAdd = document.querySelector('#popup_element_add'); //попап добавления фото

const inputPhotoName = document.querySelector(
  '.popup__input[name="photo-name"]'
); //поле ввода в форме добавления фото название
const inputPhotoLink = document.querySelector(
  '.popup__input[name="photo-link"]'
); //поле ввода в форме добавления фото ссылка

const popupFormElementAdd = document.querySelector(
  '.popup__form[name="element_add"]'
); //кнопка сабмит в форме добавления карточки

const popupImagePopup = document.querySelector('#popup_image-popup'); //попап откытия большого фото
const popupImage = popupImagePopup.querySelector('.popup__image'); //большое фото
const popupImageName = popupImagePopup.querySelector('.popup__image-name'); //подпись к большому фото

let escListener; //переменная для document.addEventListener

//Функция Открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_open');
  escListener = (evt) => {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  };
  document.addEventListener('keydown', escListener); //слушатель esc для закрытия попапа
}

// Функция Закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', escListener); //удаляем слушатель esc для закрытия попапа
}

//закрытие любого попапа по кнопке
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup);
    }
  });
});

// закрытие попапа нажатием на оверлэй
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
});

// Открытие попапа редактирования профиля //

function openPopupProfileEdit() {
  inputUserName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupProfileEdit);
}

profileEditBtn.addEventListener('click', openPopupProfileEdit);

// Смена информации в профииле

function submitPopupProfileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupProfileEdit);
}
popupFormProfileEdit.addEventListener('submit', submitPopupProfileEdit);

// открытие попапа добавления фото
function openPopupElementAdd() {
  inputPhotoName.value = '';
  inputPhotoLink.value = '';
  openPopup(popupElementAdd);
}

profileAddBtn.addEventListener('click', openPopupElementAdd); //открыте попапа добавления фото по кнопке

//объявлениие функции добавления карточки из попапа
function submitPopupElementAdd(evt) {
  evt.preventDefault();
  const card = renderElements(inputPhotoName.value, inputPhotoLink.value);
  elements.prepend(card);
  closePopup(popupElementAdd);
}

popupFormElementAdd.addEventListener('submit', submitPopupElementAdd); //вызов добавления карточки

//Функция Открытие попапа с большим фото

function openPopupImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = link;
  popupImageName.textContent = name;
  openPopup(popupImagePopup);
}

// Массив карточек для template

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Функция добавления карточек на страницу из массива
function renderElements(name, link) {
  const element = elementTemplate
    .querySelector('.elements__element')
    .cloneNode(true);

  // Создаем карточки и подписи
  const elementsPhoto = element.querySelector('.elements__photo');
  const elementsName = element.querySelector('.elements__name');

  elementsPhoto.src = link;
  elementsPhoto.alt = name;
  elementsName.textContent = name;

  // Создаем работающий лайк
  const likeButton = element.querySelector('.elements__like-icon');
  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('elements__like-icon_liked');
  });
  //Создаем кнопку удаления
  const deleteButton = element.querySelector('.elements__delete');
  deleteButton.addEventListener('click', function(evt) {
    evt.target.closest('.elements__element').remove();
  });

  //Добавляем событие открытие попапа по клику на фото
  elementsPhoto.addEventListener('click', function() {
    openPopupImagePopup(link, name);
  });

  return element;
}
// выводим карточки на страницу
initialCards.forEach((item) => {
  const card = renderElements(item.name, item.link);
  elements.append(card);
});

//ВАЛИДАЦИЯ ФОРМ//

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});