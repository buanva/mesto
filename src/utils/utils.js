import { handleUserInfo } from '../pages/index.js';
import { handleFormEditProfile } from '../pages/index.js';
import { newCardPopupForm } from './constants.js';
import Card from '../components/Card.js';
import { newCardFormNameField } from './constants.js';
import { newCardFormLinkField } from './constants.js';
import { cardList } from '../pages/index.js';
import { handleFormNewCardSubmit } from '../pages/index.js';
import { rewriteParamsViewImagePopup } from '../pages/index.js';

export function handleFormSubmit(evt) {
    evt.preventDefault();
    handleUserInfo.setUserInfo(handleFormEditProfile.giveInputValues());
    handleFormEditProfile.close();
};

export function clearNewCardPopup() {
    newCardPopupForm.reset();
};

export function createCard(name, link) {
   const card = new Card(name, link, '#elements__item-template', handleImageViewPopup);
   return card.generateCard();
};

export function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(newCardFormNameField.value, newCardFormLinkField.value);
    cardList.prependItem(cardElement);
    handleFormNewCardSubmit.close();
};

export function handleImageViewPopup(title, image) {
    rewriteParamsViewImagePopup.open(title, image);
};