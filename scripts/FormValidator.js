export default class FormValidator {
  constructor(validatedForm, settings) {
    this._inputSelector = settings.inputSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._validatedForm = validatedForm;
    this._submitButton = validatedForm.querySelector(settings.submitButtonSelector);
    this._inputList = Array.from(validatedForm.querySelectorAll(settings.inputSelector));
  }

  _validateInput(input, errorElement) {
    if (!input.validity.valid) {
      this._showInputError(input);
      this._showSpanError(input.validationMessage, errorElement);
    } else {
      this._hideInputError(input);
      this._hideSpanError(errorElement);
    }
  };

  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
  };
  
  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
  };

  _showSpanError(validationMessage, errorElement) {
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideSpanError(errorElement) {
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  };

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  };

  _setEventListeners() {
    this._inputList.forEach((input) => {
      const errorElement = this._validatedForm.querySelector(`.${input.id}-error`);
      input.addEventListener('input', () => {
        this._validateInput(input, errorElement);
        this.toggleButtonState();
      });
    });
  };

  clearFormErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
      this._hideSpanError(this._validatedForm.querySelector(`.${input.id}-error`));
    });
  };

  enableValidation() {
    this.toggleButtonState();
    this._setEventListeners();
  };
}
