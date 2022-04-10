import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._submitButton = this._popup.querySelector('input[type="submit"]');
    this._submitButtonText = this._submitButton.value;
    this._inputList = this._popup.querySelectorAll('input');
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  open(initialData) {
    if (initialData) {
      this._setInputValues(initialData);
    }
    this.resetButton();
    super.open();
  }

  _setInputValues(initialData) {
    Array.from(this._inputList).forEach((input) => {
      const inputName = input.getAttribute('name');
      input.value = initialData[inputName];
    });
  }
  _getInputValues() {
    const formData = {};

    Array.from(this._inputList).forEach(
      (input) => (formData[input.getAttribute('name')] = input.value)
    );
    return formData;
  }
  resetButton() {
    this._submitButton.value = this._submitButtonText;
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this._submitButton.value = 'Сохранение...';
    });
  }
  close() {
    super.close();
    this._popupForm.reset();
  }
}