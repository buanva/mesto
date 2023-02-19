export default class UserInfo{
    constructor({ nameSelector, aboutSelector, avatarSelector }, openAvatarPopup) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._avatarElement = document.querySelector(avatarSelector);
        this._id = null;
        this._openAvatarPopup = openAvatarPopup;
        this._setEventListener();
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
            avatar: this._avatarElement,
            id: this._id
        };
    }
    
    setUserInfo({ name, about, avatar, _id }) {
        this._nameElement.textContent = name;
        this._aboutElement.textContent = about;
        this._avatarElement.style.backgroundImage = `url(${avatar})`;
        this._id = _id
    }

    _setEventListener() {
        this._avatarElement.addEventListener('click', this._openAvatarPopup)
    }
}