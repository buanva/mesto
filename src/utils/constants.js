export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const newCardButton = document.querySelector('.profile__add-button');
export const popupEditProfile = document.querySelector('.popup_popup-edit-profile');
export const formEditProfile = popupEditProfile.querySelector('.popup__container');
export const valueName = popupEditProfile.querySelector('.popup__item_info_name');
export const valueAbout = popupEditProfile.querySelector('.popup__item_info_about');
export const newCardPopup = document.querySelector('.popup_add-new-card');
export const newCardPopupForm = newCardPopup.querySelector('.popup__container');
export const newCardFormNameField = newCardPopup.querySelector('.popup__item_info_title');
export const newCardFormLinkField = newCardPopup.querySelector('.popup__item_info_link');
export const commonFormSelectors = {
    formSelector: '.popup__container',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__item_type_error',
};
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];