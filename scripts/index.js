const profileName = document.querySelector('.profile__name');
const editButton = document.querySelector('.profile__edit-button');
const profileAbout = document.querySelector('.profile__about-me');
const newCardButton = document.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements__grid');
const editProfilePopup = document.querySelector('.popup_popup-edit-profile');
const closeButton = editProfilePopup.querySelector('.popup__close-button');
const formElement = editProfilePopup.querySelector('.popup__container');
const valueName = editProfilePopup.querySelector('.popup__item_info_name');
const valueAbout = editProfilePopup.querySelector('.popup__item_info_about');
const editProfilePopupSaveButton = editProfilePopup.querySelector('.popup__save-button');
const newCardPopup = document.querySelector('.popup_add-new-card');
const newCardFormNameField = newCardPopup.querySelector('.popup__item_info_title');
const newCardFormLinkField = newCardPopup.querySelector('.popup__item_info_link');
const viewImagePopup = document.querySelector('.popup_view-image');
const viewImage = viewImagePopup.querySelector('.popup__image');
const viewImageCaption = viewImagePopup.querySelector('.popup__caption');
const cardTemplateContent = document.querySelector('#elements__item-template').content;
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
};

function closePopup(popup) {
	popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
    evt.preventDefault();

    if (valueName.value.length !== 0 && valueAbout.value.length !== 0) {
        profileName.textContent = valueName.value;
        profileAbout.textContent = valueAbout.value;
        closePopup(editProfilePopup);
    } else {
        alert('Пожалуйста, заполните данные профиля');
    }
};

function toggleEditProfileButtonState(isValid) {
    if (isValid) {
        editProfilePopupSaveButton.classList.remove('popup__save-button_inactive');
        editProfilePopupSaveButton.removeAttribute('disabled');
    } else {
        editProfilePopupSaveButton.classList.add('popup__save-button_inactive');
        editProfilePopupSaveButton.setAttribute('disabled', '');
    }
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', function() {
    openPopup(editProfilePopup);

    valueName.value = profileName.textContent;
    valueAbout.value = profileAbout.textContent;

    toggleEditProfileButtonState(valueName.validity.valid && valueAbout.validity.valid)
});

initialCards.forEach(function(card) {
    const cardTitle = card.name;
    const cardImageLink = card.link;
    const cardElement = createCard(cardTitle, cardImageLink);
    addCard(cardElement);
});

function createCard(title, image) {
    const cardElement = cardTemplateContent.querySelector('.elements__item').cloneNode(true);

    cardElement.querySelector('.elements__title').textContent = title;
    cardElement.querySelector('.elements__image').style.backgroundImage = `url(${image})`;
    cardElement.querySelector('.elements__button-like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('elements__button-like_active');
    });
    cardElement.querySelector('.elements__button-delete').addEventListener('click', function() {
        cardElement.remove();
    });
    cardElement.querySelector('.elements__image').addEventListener('click', function() {
        handleImageViewPopup(title, image);
    });

    return cardElement;
};

function addCard(card) {
    cardsContainer.append(card);
};

newCardButton.addEventListener('click', function() {
    openPopup(newCardPopup);
});

function closeAndClearNewCardPopup() {
    closePopup(newCardPopup);

    newCardFormNameField.value = '';
    newCardFormLinkField.value = '';
    clearPopupFormErrors(newCardPopup);
};

function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const title = newCardFormNameField.value;
    const image = newCardFormLinkField.value;

    if (title !== '' && image !== '') {
        cardsContainer.prepend(createCard(title, image));
        closeAndClearNewCardPopup();
    } else {
        alert('Заполните, пожалуйста, данные');
    };
};

newCardPopup.querySelector('.popup__container').addEventListener('submit', handleNewCardSubmit);

function handleImageViewPopup(title, image) {
    viewImage.src = image;
    viewImageCaption.textContent = title;
    viewImage.setAttribute('alt', title);
    openPopup(viewImagePopup);
};

function closeAndClearViewImagePopup() {
    closePopup(viewImagePopup);

    viewImage.src = '';
    viewImageCaption.textContent = '';
    viewImage.alt = '';
};

const page = document.querySelector('.page');

document.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closeAndClearOpenedPopup();
    };
});

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        closeAndClearOpenedPopup();
    };
});

function closeAndClearOpenedPopup() {
    const popup = document.querySelector('.popup_opened');
    if (!popup) {
        return;
    };

    if (popup === newCardPopup) {
        closeAndClearNewCardPopup();
    } else if (popup === viewImagePopup) {
        closeAndClearViewImagePopup();
    } else {
        closePopup(editProfilePopup);
        clearPopupFormErrors(editProfilePopup);
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