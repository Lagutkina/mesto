let formConfig;

//показываем ошибку ввода

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formConfig.errorClass);
};

//прячем ошибку ввода

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig.errorClass);
  errorElement.textContent = '';
};

//проверяем валидность введеного в поле

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//проверяем, что НЕ все поля формы валидны
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//функция смены состояния кнопки в зависимости от валидности инпутов
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(formConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

//ставим слушатели на инпуты

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formConfig.inputSelector)
  ); //находим каждый инпут в форме
  const buttonElement = formElement.querySelector(
    formConfig.submitButtonSelector
  ); //находим кнопку сабмит в форме
  toggleButtonState(inputList, buttonElement); //выключаем кнопку с самого начала ()

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement); //для каждого инпута проверяем валидность данных
      toggleButtonState(inputList, buttonElement); //меняем кнопку, если все поля ок
    });
  });
};

// Валидизация всех форм

function enableValidation(config) {
  formConfig = config;
  const formList = Array.from(
    document.querySelectorAll(formConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
}