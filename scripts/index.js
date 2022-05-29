const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const newCardPopup = document.querySelector('.popup_add-new-card');
const closeButton = popup.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about-me');
const valueName = popup.querySelector('.popup__item_info_name');
const valueAbout = popup.querySelector('.popup__item_info_about');
const cardsContainer = document.querySelector('.elements__grid');
const newCardButton = document.querySelector('.profile__add-button');


function openProfile() {
    popup.classList.toggle('popup_opened');
 
    let isPopupOpened = popup.classList.contains('popup_opened');

    if (isPopupOpened) {
        valueName.value = profileName.textContent;
        valueAbout.value = profileAbout.textContent;
    }
}

let formElement = popup.querySelector('.popup__container');

function formSubmitHandler(evt) {
    evt.preventDefault();

    if (valueName.value.length !== 0 && valueAbout.value.length !== 0) {
        profileName.textContent = valueName.value;
        profileAbout.textContent = valueAbout.value;
        openProfile();
    } else {
        alert('Пожалуйста, заполните данные профиля');
    }    
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openProfile);
closeButton.addEventListener('click', openProfile);

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

initialCards.forEach(function(card) {
    const cardTitle = card.name;
    const cardImageLink = card.link;
    const cardElement = createCard(cardTitle, cardImageLink);
    addCard(cardElement);
});

function createCard(title, image) {
    const cardTemplate = document.querySelector('#elements__item-template').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);

    cardElement.querySelector('.elements__title').textContent = title;
    cardElement.querySelector('.elements__image').style.backgroundImage = `url(${image})`;

    return cardElement;
};

function addCard(card) {
    cardsContainer.append(card);
};

function toggleNewCardPopup() {
    newCardPopup.classList.toggle('popup_opened');

    if (!newCardPopup.classList.contains('popup_opened')) {
        newCardPopup.querySelector('.popup__item_info_title').value = '';
        newCardPopup.querySelector('.popup__item_info_link').value = '';
    };
};

newCardButton.addEventListener('click', toggleNewCardPopup);
newCardPopup.querySelector('.popup__close-button').addEventListener('click', toggleNewCardPopup);



