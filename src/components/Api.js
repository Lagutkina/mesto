class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(method, path, body) {
    return fetch(`${this._baseUrl}/${path}`, {
      method,
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._fetch('GET', 'cards');
  }
  getUserInfo() {
    return this._fetch('GET', 'users/me');
  }

  updateProfile(name, about) {
    return this._fetch('PATCH', 'users/me', { name, about });
  }
  addNewCard(name, link) {
    return this._fetch('POST', 'cards', { name, link });
  }

  deleteCard(cardId) {
    return this._fetch('DELETE', `cards/${cardId}`);
  }
  addLike(cardId) {
    return this._fetch('PUT', `cards/${cardId}/likes`);
  }
  deleteLike(cardId) {
    return this._fetch('DELETE', `cards/${cardId}/likes`);
  }
  updateAvatar(avatar) {
    return this._fetch('PATCH', 'users/me/avatar', { avatar });
  }
}
export { Api };