import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmCallback = null;
    }

    open(callback) {
        this._confirmCallback = callback;
        super.open();
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__save-button').addEventListener('click', () => {
            if (this._confirmCallback) {
                this._confirmCallback();
                this._confirmCallback = null;
            }
            super.close();
        });
        super.setEventListeners();
    }
}