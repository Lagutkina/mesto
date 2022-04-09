import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  open(confirmationOptions) {
    this._confirmationOptions = confirmationOptions;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector('.popup__form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._confirmationOptions);
        this.close();
      });
  }
}