export default class Card {
    constructor(data, cardTemplateSelector, handleImagePopup, openPopupDeleteCard, sendLike, ownerId) {
        this._ownerId = ownerId;
        this._name = data.name;
        this._link = data.link;
        this._likesCount = data.likes.length;
        this._likes = data.likes;
        this._isUserCard = data.owner._id !== ownerId;
        this._id = data._id;
        
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleImagePopup = handleImagePopup;
        this._openPopupDeleteCard = openPopupDeleteCard;
        this._sendLike = sendLike;
        
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.elements__image');
        this._likeButton = this._element.querySelector('.elements__button-like');
        this._deleteButton = this._element.querySelector('.elements__button-delete');
        this._cardTitle = this._element.querySelector('.elements__title');
        this._likeCounter = this._element.querySelector('.elements__like-counter');
        
        this._checkLike();
        this._updateTheLikeButton();
        this._updateLikes = this._updateLikes.bind(this);
        this._handleTheDeleteButton = this._handleTheDeleteButton.bind(this);
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
        this._setEventListeners();
    
        this._cardImage.style.backgroundImage = `url(${this._link})`;
        this._cardTitle.textContent = this._name;
        this._likeCounter.textContent = this._likesCount;

        if (this._isUserCard) {
            this._deleteButton.remove();
        }
    
        return this._element;
    }

    _updateLikes(likes) {
        this._likes = likes;
        this._likesCount = likes.length;
        this._likeCounter.textContent = this._likesCount;
        this._checkLike();
        this._updateTheLikeButton();
    }

    _checkLike() {
        const ownerId = this._ownerId;
        this._isLiked = this._likes.find(likeOwner => likeOwner._id === ownerId);
    }

    _updateTheLikeButton() {
        if (this._isLiked) {
            this._likeButton.classList.add('elements__button-like_active');
        } else {
            this._likeButton.classList.remove('elements__button-like_active');
        }
    }

    _handleTheDeleteButton() {
        this._element.remove();
        this._element = null;
    }

    _handleImageViewPopup() {
        this._handleImagePopup(this._name, this._link);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._sendLike(this._isLiked, this._id, this._updateLikes)
        });

        if (!this._isUserCard) {
            this._deleteButton.addEventListener('click', () => {
                this._openPopupDeleteCard(this._id, this._handleTheDeleteButton);
            });
        }

        this._cardImage.addEventListener('click', () => {
            this._handleImageViewPopup(); 
        });
    }
}
