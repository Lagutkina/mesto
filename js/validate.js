//показываем ошибку ввода

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  formConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formConfig.errorClass);
};

//прячем ошибку ввода

const hideInputError = (formElement, inputElement, formConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formConfig.inputErrorClass);
  errorElement.classList.remove(formConfig.errorClass);
  errorElement.textContent = '';
};

//проверяем валидность введеного в поле

const checkInputValidity = (formElement, inputElement, formConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      formConfig
    );
  } else {
    hideInputError(formElement, inputElement, formConfig);
  }
};

//проверяем, что НЕ все поля формы валидны
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function disableButton(buttonElement, formConfig) {
  buttonElement.classList.add(formConfig.inactiveButtonClass);
  buttonElement.disabled = true;
}

function enableButton(buttonElement, formConfig) {
  buttonElement.classList.remove(formConfig.inactiveButtonClass);
  buttonElement.disabled = false;
}

//функция смены состояния кнопки в зависимости от валидности инпутов
function toggleButtonState(inputList, buttonElement, formConfig) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, formConfig);
  } else {
    enableButton(buttonElement, formConfig);
  }
}

//ставим слушатели на инпуты

const setEventListeners = (formElement, formConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(formConfig.inputSelector)
  ); //находим каждый инпут в форме
  const buttonElement = formElement.querySelector(
    formConfig.submitButtonSelector
  ); //находим кнопку сабмит в форме
  toggleButtonState(inputList, buttonElement, formConfig); //выключаем кнопку с самого начала ()

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, formConfig); //для каждого инпута проверяем валидность данных
      toggleButtonState(inputList, buttonElement, formConfig); //меняем кнопку, если все поля ок
    });
  });
};

// Валидизация всех форм

function enableValidation(formConfig) {
  const formList = Array.from(
    document.querySelectorAll(formConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, formConfig);
  });
}