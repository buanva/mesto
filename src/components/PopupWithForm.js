import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, form, handleFormSubmit) {
        super(popupSelector);
        this._form = form;
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

    giveInputValues() {
        return this._getInputValues();
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', this._handleFormSubmit);
        super.setEventListeners();
    }
}


