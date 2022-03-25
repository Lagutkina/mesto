class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name; //
    this._link = link; //
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true);
  }

  _setEventListeners() {
    // Создаем работающий лайк
    const likeButton = this._card.querySelector('.elements__like-icon');
    likeButton.addEventListener('click', function(evt) {
      evt.target.classList.toggle('elements__like-icon_liked');
    });
    //Создаем кнопку удаления
    const deleteButton = this._card.querySelector('.elements__delete');
    deleteButton.addEventListener('click', function(evt) {
      evt.target.closest('.elements__element').remove();
    });

    //Добавляем событие открытие попапа по клику на фото
    this._card
      .querySelector('.elements__photo')
      .addEventListener('click', () => {
        this._handleCardClick();
      });
  }
  renderCard() {
    this._card = this._getTemplate();

    // Создаем карточки и подписи
    const cardPhoto = this._card.querySelector('.elements__photo');
    const cardName = this._card.querySelector('.elements__name');

    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    cardName.textContent = this._name;
    this._setEventListeners();
    return this._card;
  }
}

export { Card };