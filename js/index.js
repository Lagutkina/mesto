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

//Функция Открытие любого попапа
function openPopup(popup) {
  popup.classList.add('popup_open');
}

// Функция Закрытие любого попапа
function closePopup(popup) {
  popup.classList.remove('popup_open');
}

//закрытие любого попапа по кнопке
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-btn')) {
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
//
const popupFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};
// формы для попапов

//показываем ошибку ввода

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(popupFormConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupFormConfig.errorClass);
};

//прячем ошибку ввода

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(popupFormConfig.inputErrorClass);
  errorElement.classList.remove(popupFormConfig.errorClass);
  errorElement.textContent = '';
};

//проверяем валидность введеного в поле

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//проверяем, что НЕ все поля формы валидны
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//функция смены состояния кнопки в зависимости от валидности инпутов
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(popupFormConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(popupFormConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//ставим слушатели на инпуты

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(popupFormConfig.inputSelector)
  ); //находим каждый инпут в форме
  const buttonElement = formElement.querySelector(
    popupFormConfig.submitButtonSelector
  ); //находим кнопку сабмит в форме
  toggleButtonState(inputList, buttonElement); //выключаем кнопку с самого начала ()

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement); //для каждого инпута проверяем валидность данных
      toggleButtonState(inputList, buttonElement); //меняем кнопку, если все поля ок
    });
  });
};

// Валидизация всех форм

function enableValidation() {
  const formList = Array.from(
    document.querySelectorAll(popupFormConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}

enableValidation();