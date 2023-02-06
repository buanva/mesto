import '../pages/index.css'

import { 
    formEditProfile,
    commonFormSelectors,
    newCardPopupForm,
    buttonEditProfile,
    valueName,
    valueAbout,
    newCardButton,
    initialCards,
    newCardFormNameField,
    newCardFormLinkField,
} from '../utils/constants.js';
import {
    clearNewCardPopup,
    createCard
} from '../utils/utils.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';

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
    aboutSelector: '.profile__about-me'
});

export const handleFormEditProfile = new PopupWithForm('.popup_popup-edit-profile', formEditProfile, handleFormSubmit);
handleFormEditProfile.setEventListeners();

export function handleFormSubmit(evt) {
    evt.preventDefault();
    handleUserInfo.setUserInfo(handleFormEditProfile.giveInputValues());
    handleFormEditProfile.close();
};

export const handleFormNewCardSubmit = new PopupWithForm('.popup_add-new-card', newCardPopupForm, handleNewCardSubmit);
handleFormNewCardSubmit.setEventListeners();

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
    data: initialCards,
    renderer: ({ name, link }) => cardList.appendItem(
        createCard(name, link)
    )
  }, '.elements__grid');

cardList.renderItems();

export function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(newCardFormNameField.value, newCardFormLinkField.value);
    cardList.prependItem(cardElement);
    handleFormNewCardSubmit.close();
};