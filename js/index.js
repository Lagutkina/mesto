const profileEditBtn = document.querySelector('.profile__edit-btn');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn'); //кнопки закрытия в попапах

const popupProfileEdit = document.querySelector('#popup_profile_edit');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputUserName = document.querySelector('.popup__input[name="user-name"]');
const inputAbout = document.querySelector('.popup__input[name="about"]');

const popupFormProfileEdit = document.querySelector(
  '.popup__form[name="profile_edit"]'
);

// Открытие попапа редактирования профиля //

function openPopupProfileEdit() {
  inputUserName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  popupProfileEdit.classList.add('popup_open');
}

// Закрытие попапа //

function closePopup(evt) {
  evt.target.parentElement.parentElement.classList.remove('popup_open');
}

// Смена информации в профииле

function submitPopupProfileEdit(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(evt);
}

profileEditBtn.addEventListener('click', openPopupProfileEdit);

popupCloseBtns.forEach((popupCloseBtn) => {
  popupCloseBtn.addEventListener('click', closePopup);
}); //закрытие любого попапа по кнопке

popupFormProfileEdit.addEventListener('submit', submitPopupProfileEdit);

// попап добавление  фото
const profileAddBtn = document.querySelector('.profile__add-btn');
const popupElementAdd = document.querySelector('#popup_element_add');

const inputPhotoName = document.querySelector(
  '.popup__input[name="photo-name"]'
);
const inputPhotoLink = document.querySelector(
  '.popup__input[name="photo-link"]'
);

// открытие попапа добавления фото
function openPopupElementAdd() {
  inputPhotoName.value = '';
  inputPhotoLink.value = '';
  popupElementAdd.classList.add('popup_open');
}

profileAddBtn.addEventListener('click', openPopupElementAdd);

//объявлениие функции добавления карточки из попапа
function submitPopupElementAdd(evt) {
  evt.preventDefault();
  const card = renderElements(inputPhotoName.value, inputPhotoLink.value);
  elements.prepend(card);
  closePopup(evt);
}

const popupFormElementAdd = document.querySelector(
  '.popup__form[name="element_add"]'
); //кнопка сабмит в форме добавления карточки

popupElementAdd.addEventListener('submit', submitPopupElementAdd); //вызов добавления карточки

//попап фото

const popupImagePopup = document.querySelector('#popup_image-popup');
const popupImage = popupImagePopup.querySelector('.popup__image');
const popupImageName = popupImagePopup.querySelector('.popup__image-name');

function openPopupImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = link;
  popupImageName.textContent = name;
  popupImagePopup.classList.add('popup_open');
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
const elements = document.querySelector('.elements');

// Функция добавления карточек на страницу из массива
function renderElements(name, link) {
  const elementTemplate = document.querySelector('#elements-template').content;
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
    evt.target.parentElement.remove();
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