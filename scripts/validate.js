const showInputError = (errorInfo) => {
  errorInfo.input.classList.add(errorInfo.inputErrorClass);
  errorInfo.errorElement.textContent = errorInfo.errorMessage;
  errorInfo.errorElement.classList.add(errorInfo.errorClass);
};

const hideInputError = (errorInfo) => {
  errorInfo.input.classList.remove(errorInfo.inputErrorClass);
  errorInfo.errorElement.classList.remove(errorInfo.errorClass);
  errorInfo.errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

const toggleButtonState = (button, inactiveClass, isInvalid) => {
  if (isInvalid) {
    button.classList.add(inactiveClass);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(inactiveClass);
    button.removeAttribute('disabled');
  }
};

const setEventListeners = (settings) => {
  const inputList = Array.from(settings.form.querySelectorAll(settings.inputSelector));
  const submitButton = settings.submitButton;

  toggleButtonState(submitButton, settings.inactiveButtonClass, hasInvalidInput(inputList));

  inputList.forEach((input) => {
    const errorElement = settings.form.querySelector(`.${input.id}-error`);
    input.addEventListener('input', () => {
      if (!input.validity.valid) {
        showInputError({
          input: input,
          inputErrorClass: settings.inputErrorClass,
          errorMessage: input.validationMessage,
          errorElement: errorElement,
          errorClass: settings.errorClass
        });
      } else {
        hideInputError({
          input: input,
          inputErrorClass: settings.inputErrorClass,
          errorElement: errorElement,
          errorClass: settings.errorClass
        });
      }

      toggleButtonState(submitButton, settings.inactiveButtonClass, hasInvalidInput(inputList));
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners({
      form: form,
      inputSelector: settings.inputSelector,
      submitButton: form.querySelector(settings.submitButtonSelector),
      inactiveButtonClass: settings.inactiveButtonClass,
      inputErrorClass: settings.inputErrorClass,
      errorClass: settings.errorClass
    });
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
});