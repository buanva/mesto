import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, imageSelector, captionSelector }) {
        super(popupSelector);
        this._image = this._popupElement.querySelector(imageSelector);
        this._title = this._popupElement.querySelector(captionSelector);
    }

    open(name, link) {
        this._image.src = '';
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
        super.open();
    }
}