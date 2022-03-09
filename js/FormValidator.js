export class FormValidator {
  constructor(formConfig, formElement) {
    this._inputSelector = formConfig.inputSelector;
    this._submitButtonSelector = formConfig.submitButtonSelector;
    this._inactiveButtonClass = formConfig.inactiveButtonClass;
    this._inputErrorClass = formConfig.inputErrorClass;
    this._errorClass = formConfig.errorClass;
    this._formElement = formElement;
  }
  enableValidation() {
    this._setEventListeners();
  }

  //показываем ошибку ввода
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //прячем ошибку ввода
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //проверяем валидность введеного в поле
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //проверяем, что НЕ все поля формы валидны
  _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
    // отключаем кнопку
  _disableButton() {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
    // отключаем кнопку публично чтобы работала кнопка добаления карточки
  disableButton() {
      this._disableButton();
    }
    // включаем кнопку

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  //функция смены состояния кнопки в зависимости от валидности инпутов
  _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._disableButton();
      } else {
        this._enableButton();
      }
    }
    //ставим слушатели на инпуты

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    //находим каждый инпут в форме
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    //находим кнопку сабмит в форме
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    //выключаем кнопку с самого начала ()
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement); //для каждого инпута проверяем валидность данных
        this._toggleButtonState(); //меняем кнопку, если все поля ок
      });
    });
  }
}