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
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', function() {
    openPopup(editProfilePopup);

    valueName.value = profileName.textContent;
    valueAbout.value = profileAbout.textContent;
});
closeButton.addEventListener('click', function() {
    closePopup(editProfilePopup);
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
newCardPopup.querySelector('.popup__close-button').addEventListener('click', function() {
    closePopup(newCardPopup);

    newCardFormNameField.value = '';
    newCardFormLinkField.value = '';
});

function handleNewCardSubmit(evt) {
    evt.preventDefault();

    const title = newCardFormNameField.value;
    const image = newCardFormLinkField.value;

    if (title !== '' && image !== '') {
        cardsContainer.prepend(createCard(title, image));
        closePopup(newCardPopup);
    } else {
        alert('Заполните, пожалуйста, данные');
    };
};

newCardPopup.querySelector('.popup__container').addEventListener('submit', handleNewCardSubmit);

function handleImageViewPopup(title, image) {
    openPopup(viewImagePopup);

    if (viewImagePopup.classList.contains('popup_opened')) {
        viewImage.setAttribute('src', image);
        viewImageCaption.textContent = title;
        viewImage.setAttribute('alt', title);
    } else {
        viewImage.removeAttribute('src', image);
        viewImageCaption.textContent = '';
    };
};

viewImagePopup.querySelector('.popup__close-button').addEventListener('click', function() {
    closePopup(viewImagePopup);
});