class Card {
  constructor(
    cardItem,
    templateSelector,
    handleCardClick, //вызов попапа большого по клику
    handleCardDelete, //вызов попапа для подтверждения удаления
    addLike, //апи лайка
    deleteLike, //апи удаления лайка
    deleteCard, // апи удаления карты
    userId // айди моего юзера
  ) {
    this._name = cardItem.name; //
    this._link = cardItem.link; //
    this._likes = cardItem.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._addLike = addLike;
    this._deleteLike = deleteLike;
    this._isLiked = !!cardItem.likes.find(({ _id }) => _id === userId);
    this._userId = userId;
    this._ownerId = cardItem.owner._id;
    this._handleCardDelete = handleCardDelete;
    this._deleteCard = deleteCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.elements__element')
      .cloneNode(true);
  }

  _updateLikes() {
    this._likeCounter.textContent = this._likes ? this._likes : '';
  }

  _toggleLike() {
    // Создаем работающий лайк

    this._isLiked = !this._isLiked;
    let toggleLike;
    if (this._isLiked) {
      toggleLike = this._addLike;
    } else {
      toggleLike = this._deleteLike;
    }
    toggleLike()
      .then((likedCardItem) => {
        this._likes = likedCardItem.likes.length;
        this._syncLike();
        this._updateLikes();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  removeCard() {
    return this._deleteCard().then(() => {
      //удалениие карточки с экрана
      this._card.remove();
      this._card = null;
    });
  }
  _setEventListeners() {
    //ставим слушатель на лайк
    this._likeButton.addEventListener('click', () => {
      this._toggleLike();
    });

    //ставим слушатель на кнопку удаления
    this._deleteButton.addEventListener('click', () =>
      this._handleCardDelete()
    );

    //Добавляем событие открытие попапа по клику на фото
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  _checkOwner() {
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }
  }

  _syncLike() {
    if (this._isLiked) {
      this._likeButton.classList.add('elements__like-icon_liked');
    } else {
      this._likeButton.classList.remove('elements__like-icon_liked');
    }
  }

  renderCard() {
    this._card = this._getTemplate();
    this._cardPhoto = this._card.querySelector('.elements__photo');
    this._likeButton = this._card.querySelector('.elements__like-icon');
    this._likeCounter = this._card.querySelector('.elements__like-counter');
    this._deleteButton = this._card.querySelector('.elements__delete');

    // Создаем карточки и подписи
    const cardName = this._card.querySelector('.elements__name');

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    cardName.textContent = this._name;

    this._syncLike();

    this._updateLikes();
    this._setEventListeners();
    this._checkOwner();
    return this._card;
  }
}

export { Card };