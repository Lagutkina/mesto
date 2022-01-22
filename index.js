let profileEditBtn = document.querySelector('.profile__edit-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let inputUserName = document.querySelector('.popup__input[name="user-name"]');
let inputAbout = document.querySelector('.popup__input[name="about"]');

let popupForm = document.querySelector('.popup__form');

function popupOpener() {
  popup.classList.toggle('popup__open');
  inputUserName.setAttribute('value', profileName.textContent);
  inputAbout.setAttribute('value', profileAbout.textContent);
}

function popupSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileAbout.textContent = inputAbout.value;
  popupOpener();
}

profileEditBtn.addEventListener('click', popupOpener);

popupCloseBtn.addEventListener('click', popupOpener);
popupForm.addEventListener('submit', popupSubmit);