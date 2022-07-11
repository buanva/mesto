import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileName = document.querySelector('.profile__name');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileAbout = document.querySelector('.profile__about-me');
const newCardButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__grid');
const popupEditProfile = document.querySelector('.popup_popup-edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__container');
const valueName = popupEditProfile.querySelector('.popup__item_info_name');
const valueAbout = popupEditProfile.querySelector('.popup__item_info_about');
const newCardPopup = document.querySelector('.popup_add-new-card');
const newCardPopupForm = newCardPopup.querySelector('.popup__container');
const newCardFormNameField = newCardPopup.querySelector('.popup__item_info_title');
const newCardFormLinkField = newCardPopup.querySelector('.popup__item_info_link');
const viewImagePopup = document.querySelector('.popup_view-image');
const viewImage = viewImagePopup.querySelector('.popup__image');
const viewImageCaption = viewImagePopup.querySelector('.popup__caption');
const commonFormSelectors = {
    formSelector: '.popup__container',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__item_type_error',
};
const profileValidation = new FormValidator(formEditProfile, commonFormSelectors);
const newCardValidation = new FormValidator(newCardPopupForm, commonFormSelectors);
const initialCards = [
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

function openPopup(popup) {
	popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
};

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = valueName.value;
    profileAbout.textContent = valueAbout.value;
    closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', handleFormSubmit);
buttonEditProfile.addEventListener('click', function() {;
    valueName.value = profileName.textContent;
    valueAbout.value = profileAbout.textContent;

    profileValidation.clearFormErrors();
    profileValidation.toggleButtonState();

    openPopup(popupEditProfile);
});

newCardButton.addEventListener('click', function() {
    clearNewCardPopup();

    newCardValidation.clearFormErrors(); 
    newCardValidation.toggleButtonState();

    openPopup(newCardPopup);
});

function clearNewCardPopup() {
    newCardPopupForm.reset();
};

function createCard(name, link) {
    const card = new Card(name, link, '#elements__item-template', handleImageViewPopup);
    return card.generateCard();
}

function handleNewCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCard(newCardFormNameField.value, newCardFormLinkField.value);
    cardsContainer.prepend(cardElement);
    closePopup(newCardPopup);
};

newCardPopup.querySelector('.popup__container').addEventListener('submit', handleNewCardSubmit);

function handleImageViewPopup(title, image) {
    viewImage.src = ''; // чтобы избежать появления старого изображения из кэша пока грузится новое
    viewImage.src = image;
    viewImageCaption.textContent = title;
    viewImage.setAttribute('alt', title);

    openPopup(viewImagePopup);
};

document.querySelectorAll('.popup').forEach(function (popup) {
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        };
    });
})

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

initialCards.forEach(function(item) {
    cardsContainer.append(createCard(item.name, item.link));
});

profileValidation.enableValidation();
newCardValidation.enableValidation();