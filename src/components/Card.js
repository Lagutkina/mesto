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
  _toggleLike() {
    // Создаем работающий лайк
    this._likeButton.classList.toggle('elements__like-icon_liked');
  }
  _deleteCard() {
    //удалениие карточки
    this._card.remove();
    this._card = null;
  }
  _setEventListeners() {
    //ставим слушатель на лайк
    this._likeButton.addEventListener('click', () => this._toggleLike());

    //ставим слушатель на кнопку удаления
    this._deleteButton.addEventListener('click', () => this._deleteCard());

    //Добавляем событие открытие попапа по клику на фото
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
  renderCard() {
    this._card = this._getTemplate();
    this._cardPhoto = this._card.querySelector('.elements__photo');
    this._likeButton = this._card.querySelector('.elements__like-icon');
    this._deleteButton = this._card.querySelector('.elements__delete');

    // Создаем карточки и подписи
    const cardName = this._card.querySelector('.elements__name');

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    cardName.textContent = this._name;
    this._setEventListeners();
    return this._card;
  }
}

export { Card };