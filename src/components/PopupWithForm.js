import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  open(initialData) {
    if (initialData) {
      this._setInputValues(initialData);
    }

    super.open();
  }

  _setInputValues(initialData) {
    const inputList = Array.from(
      this._popup.querySelectorAll('input[type="text"]')
    );
    inputList.forEach((input) => {
      const inputName = input.getAttribute('name');
      input.value = initialData[inputName];
    });
  }
  _getInputValues() {
    const formData = {};
    const inputList = Array.from(this._popup.querySelectorAll('input'));
    inputList.forEach(
      (input) => (formData[input.getAttribute('name')] = input.value)
    );
    return formData;
  }
  setEventListeners() {
    super.setEventListeners();

    this._popup
      .querySelector('.popup__form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitCallback(this._getInputValues());
        this.close();
      });
  }
  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}