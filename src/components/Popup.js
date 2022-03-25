export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._escClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add('popup_open');
    document.addEventListener('keydown', this._escClose);
  }
  close() {
    console.log('p1p');
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keydown', this._escClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains('popup__close-btn') ||
        evt.target.classList.contains('popup')
      ) {
        this.close();
      }
    });
  }
}