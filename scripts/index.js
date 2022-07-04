import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profileName = document.querySelector('.profile__name');
const editButton = document.querySelector('.profile__edit-button');
const profileAbout = document.querySelector('.profile__about-me');
const newCardButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__grid');
const editProfilePopup = document.querySelector('.popup_popup-edit-profile');
const formElement = editProfilePopup.querySelector('.popup__container');
const valueName = editProfilePopup.querySelector('.popup__item_info_name');
const valueAbout = editProfilePopup.querySelector('.popup__item_info_about');
const newCardPopup = document.querySelector('.popup_add-new-card');
const newCardPopupForm = newCardPopup.querySelector('.popup__container');
const newCardFormNameField = newCardPopup.querySelector('.popup__item_info_title');
const newCardFormLinkField = newCardPopup.querySelector('.popup__item_info_link');
const viewImagePopup = document.querySelector('.popup_view-image');
const viewImage = viewImagePopup.querySelector('.popup__image');
const viewImageCaption = viewImagePopup.querySelector('.popup__caption');
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

function handleFormSubmit() {
    profileName.textContent = valueName.value;
    profileAbout.textContent = valueAbout.value;
    closePopup(editProfilePopup);
};

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', function() {
    clearPopupFormErrors(editProfilePopup);

    openPopup(editProfilePopup);

    valueName.value = profileName.textContent;
    valueAbout.value = profileAbout.textContent;

    toggleOpenedPopupButtonState();
});

newCardButton.addEventListener('click', function() {
    clearNewCardPopup();
    openPopup(newCardPopup);
    toggleOpenedPopupButtonState();
});

function clearNewCardPopup() {
    newCardPopupForm.reset();
    clearPopupFormErrors(newCardPopup);
};

function handleNewCardSubmit() {
    const card = new Card(newCardFormNameField.value, newCardFormLinkField.value, '#elements__item-template', handleImageViewPopup);
    const cardElement = card.generateCard();
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

document.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(evt.target.closest('.popup_opened'));
    };
});

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    };
};

function clearPopupFormErrors(popup) {
    const form = popup.querySelector('.popup__container');
    form.querySelectorAll('.popup__item').forEach(function(input) {
        input.classList.remove('popup__item_type_error');
    });
    form.querySelectorAll('.popup__item-error').forEach(function(errorItem) {
        errorItem.classList.remove('popup__item-error_active');
        errorItem.textContent = '';
    });
};

function toggleOpenedPopupButtonState() {
    const popup = document.querySelector('.popup_opened');
    const inputList = Array.from(popup.querySelectorAll('.popup__container .popup__item'));
    const saveButton = popup.querySelector('.popup__save-button');
    if (inputList.some((input) => { return !input.validity.valid; })) {
        saveButton.classList.add('popup__save-button_inactive');
        saveButton.setAttribute('disabled', '');
    } else {
        saveButton.classList.remove('popup__save-button_inactive');
        saveButton.removeAttribute('disabled');
    }
}

initialCards.forEach(function(item) {
    const card = new Card(item.name, item.link, '#elements__item-template', handleImageViewPopup);
    const cardElement = card.generateCard();

    cardsContainer.append(cardElement);
});

Array.from(document.querySelectorAll('.popup__container')).forEach((form) => {
    const validatedForm = new FormValidator(form, {
        formSelector: '.popup__container',
        inputSelector: '.popup__item',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_inactive',
        inputErrorClass: 'popup__item_type_error',
        errorClass: 'popup__item-error_active'
    });
    validatedForm.enableValidation();
});