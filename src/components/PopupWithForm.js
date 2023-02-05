import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, form, handleFormSubmit) {
        super(popupSelector);
        this._form = form;
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const data = {};
        Array.from(this._form.elements).forEach(element => {
            if (element.tagName === 'INPUT') {
                data[element.name] = element.value;
            }
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


