import '../pages/index.css'

import Api from '../components/Api.js';

import { 
    formEditProfile,
    commonFormSelectors,
    newCardPopupForm,
    buttonEditProfile,
    valueName,
    valueAbout,
    newCardButton,
    newCardFormNameField,
    newCardFormLinkField,
    updateAvatarForm
} from '../utils/constants.js';
import {
    clearNewCardPopup,
    createCard
} from '../utils/utils.js';

import PopupDeleteCard from '../components/PopupDeleteCard.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';

export const api = new Api({ 
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59/', 
    headers: { authorization: '2b9052ff-e460-4bad-b330-a27d08c51a9c' } 
});
const profileValidation = new FormValidator(formEditProfile, commonFormSelectors);
profileValidation.enableValidation();
const newCardValidation = new FormValidator(newCardPopupForm, commonFormSelectors);
newCardValidation.enableValidation();

export const rewriteParamsViewImagePopup = new PopupWithImage({
  popupSelector: '.popup_view-image',
  imageSelector: '.popup__image',
  captionSelector: '.popup__caption'
});
rewriteParamsViewImagePopup.setEventListeners();
export const handleUserInfo = new UserInfo({
    nameSelector: '.profile__name',
    aboutSelector: '.profile__about-me',
    avatarSelector: '.profile__avatar'
}, function() { updateAvatarPopup.open() });

export const updateAvatarPopup = new PopupWithForm('.popup_update-avatar', updateAvatarForm, function(evt) {
    evt.preventDefault();
    const { link } = updateAvatarPopup.giveInputValues()
    api.editAvatar(link)
    .then(userData => {
        handleUserInfo.setUserInfo(userData);
        updateAvatarPopup.close();
    })
});
updateAvatarPopup.setEventListeners();

export const handleFormEditProfile = new PopupWithForm('.popup_popup-edit-profile', formEditProfile, handleFormSubmit);
handleFormEditProfile.setEventListeners();

export function handleFormSubmit(evt) {
    evt.preventDefault();
    api.editProfile(handleFormEditProfile.giveInputValues())
        .then(userData => {
            handleUserInfo.setUserInfo(userData);
            handleFormEditProfile.close();
        });
    
};

export const handleFormNewCardSubmit = new PopupWithForm('.popup_add-new-card', newCardPopupForm, handleNewCardSubmit);
handleFormNewCardSubmit.setEventListeners();

export const popupDeleteCard = new PopupDeleteCard('.popup_delete-card');
popupDeleteCard.setEventListeners();

buttonEditProfile.addEventListener('click', function() {
    const { name, about } = handleUserInfo.getUserInfo();
    valueName.value = name;
    valueAbout.value = about;

    profileValidation.clearFormErrors();
    profileValidation.toggleButtonState();

    handleFormEditProfile.open();
});

newCardButton.addEventListener('click', function() {
    clearNewCardPopup();

    newCardValidation.clearFormErrors(); 
    newCardValidation.toggleButtonState();

    handleFormNewCardSubmit.open();
});

export const cardList = new Section({
    renderer: (data) => cardList.appendItem(
        createCard(data)
    )
  }, '.elements__grid');

export function handleNewCardSubmit(evt) {
    evt.preventDefault();
    api.addNewCard(newCardFormNameField.value, newCardFormLinkField.value)
        .then(newCardData => {
            const cardElement = createCard(newCardData);
            cardList.prependItem(cardElement);
            handleFormNewCardSubmit.close();
        })
};

api.getCards()
    .then(data => {
        cardList.renderItems(data);
    })

api.getUserInfo()
    .then(data => {
        handleUserInfo.setUserInfo(data)
    })
