let profileEditBtn = document.querySelector('.profile__edit-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let inputUserName = document.querySelector('.popup__input[name="user-name"]');
let inputAbout = document.querySelector('.popup__input[name="about"]');

let popupForm = document.querySelector('.popup__form');

function popupOpen() {
  inputUserName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  popup.classList.add('popup_open');
}

function popupClose() {
  popup.classList.remove('popup_open');
}

function popupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileAbout.textContent = inputAbout.value;
  popupClose();
}

profileEditBtn.addEventListener('click', popupOpen);

popupCloseBtn.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupSubmit);