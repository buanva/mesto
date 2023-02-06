import { newCardPopupForm } from './constants.js';
import Card from '../components/Card.js';
import { rewriteParamsViewImagePopup } from '../pages/index.js';

export function clearNewCardPopup() {
    newCardPopupForm.reset();
};

export function createCard(name, link) {
   const card = new Card(name, link, '#elements__item-template', handleImageViewPopup);
   return card.generateCard();
};

export function handleImageViewPopup(title, image) {
    rewriteParamsViewImagePopup.open(title, image);
};