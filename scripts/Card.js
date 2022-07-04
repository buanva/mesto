export default class Card {
    constructor(name, link, cardTemplateSelector, imagePopupHandler) {
        this._name = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._imagePopupHandler = imagePopupHandler;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this._cardTemplateSelector)
          .content
          .querySelector('.elements__item')
          .cloneNode(true);
    
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
    
        this._element.querySelector('.elements__image').style.backgroundImage = `url(${this._link})`;
        this._element.querySelector('.elements__title').textContent = this._name;
    
        return this._element;
    }

    _handleTheLikeButton(evt) {
        evt.target.classList.toggle('elements__button-like_active');
    }

    _handleTheDeleteButton() {
        this._element.remove();
    }

    _handleImageViewPopup() {
        this._imagePopupHandler(this._name, this._link);
    };

    _setEventListeners() {
        this._element.querySelector('.elements__button-like').addEventListener('click', this._handleTheLikeButton);

        this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
            this._handleTheDeleteButton()
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleImageViewPopup(); 
        });
    }
}