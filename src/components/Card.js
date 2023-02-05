export default class Card {
    constructor(name, link, cardTemplateSelector, handleImagePopup) {
        this._name = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleImagePopup = handleImagePopup;
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
    
        this._cardImage.style.backgroundImage = `url(${this._link})`;
        this._element.querySelector('.elements__title').textContent = this._name;
    
        return this._element;
    }

    _handleTheLikeButton() {
        this._likeButton.classList.toggle('elements__button-like_active');
    }

    _handleTheDeleteButton() {
        this._element.remove();
        this._element = null;
    }

    _handleImageViewPopup() {
        this._handleImagePopup(this._name, this._link);
    };

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.elements__button-like');
        this._likeButton.addEventListener('click', () => {
            this._handleTheLikeButton();
        });

        this._element.querySelector('.elements__button-delete').addEventListener('click', () => {
            this._handleTheDeleteButton()
        });

        this._cardImage = this._element.querySelector('.elements__image');
        this._cardImage.addEventListener('click', () => {
            this._handleImageViewPopup(); 
        });
    }
}