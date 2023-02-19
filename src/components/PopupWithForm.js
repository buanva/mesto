import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, form, handleFormSubmit) {
        super(popupSelector);
        this._form = form;
        var submitButton = this._form.querySelector('button[type=submit]');
        this._submitButton = submitButton;
        this._submitDefaultText = submitButton.textContent;
        this._submitButtonProcessingText = 'Сохранение...';
        this._inputList = Array.from(form.elements).filter(element => {
            if (element.tagName === 'INPUT') {
                return element;
            }
        })
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const data = {};
        this._inputList.forEach(input => {
            data[input.name] = input.value;
        })
        return data
    }

    _resetButtonState() {
        this._submitButton.textContent = this._submitDefaultText;
    }

    giveInputValues() {
        return this._getInputValues();
    }

    open() {
        this._resetButtonState();
        super.open();
    }

    close() {
        this._resetButtonState();
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            this._submitButton.textContent = this._submitButtonProcessingText;
            this._handleFormSubmit(evt);
        });
        super.setEventListeners();
    }
}


